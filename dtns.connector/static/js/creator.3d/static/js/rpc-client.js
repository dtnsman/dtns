// const defaultRoomid = 'linkline-svr'
const defaultRoomid = typeof g_default_roomid !='undefined' ? g_default_roomid : 'dtns'//'linkline-svr'
// const TNS_SERVER_URL = 'https://groupbuying.opencom.cn:441'//'http://127.0.0.1:3000'// 'http://127.0.0.1:3000'//
function get_TNS_SERVER_URL()
{
    const TNS_SERVER_URL = g_tns_urls ? g_tns_urls[0] :
        (typeof g_tns_default_url!='undefined' ? g_tns_default_url : 'https://groupbuying.opencom.cn:446')//'https://groupbuying.opencom.cn:446' //'http://192.168.2.7:3000'//'https://groupbuying.opencom.cn:441'// 'http://127.0.0.1:3000'//
    return TNS_SERVER_URL
}

async function queryTurnPwd(mywallet,roomid = null,tns_server_url = null)
{
    if(typeof mywallet == 'undefined' || !mywallet) return null
    var time_x = Date.now()
    var hash = await key_util.hashVal(''+time_x)
    var sign = await key_util.signMsg(hash,mywallet.private_key)

    console.log('hash:',hash,time_x)
     window.g_turn_pwd = await
    new Promise((resolve)=>{
        g_axios.post( (tns_server_url ?tns_server_url : get_TNS_SERVER_URL())+'/c',//?timestamp='+time_x+'&sign='+encodeURIComponent(time_sign_base64), 
        {
            timestamp:time_x ,
            sign: sign,//time_sign_base64
            web3name:!roomid ? rpc_client.roomid :roomid
        },{
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((data)=>{
            resolve(data)
        }).catch((err)=>{
            console.log('queryTurnPwd-exception:',err)
            resolve(null)
        })
    })
    console.log('queryTurnPwd-post-res:',g_turn_pwd)
        
    return window.g_turn_pwd = g_turn_pwd && g_turn_pwd.data ? g_turn_pwd.data :g_turn_pwd
}

const defaultOptions = {config:{
                                iceServers: typeof g_turn_server_config!='undefined' ? g_turn_server_config : [
                                // {
                                //     urls: [
                                //     'stun:1stun.l.google.com:19302',
                                //     'stun:1global.stun.twilio.com:3478'
                                //     ]
                                // },
                                {
                                    urls: [
                                        'turn:groupbuying.opencom.cn:3478',
                                        // 'turn:turn.3dcn.pro:3478'
                                    ],
                                    username: 'user1',
                                    credential: 'YjXverJx231vJPok',
                                }
                                ],
                                sdpSemantics: 'unified-plan'
                            },
                       rejectUnauthorized: false, transports: ['polling', 'websocket'] 
                    }
class RTCClient{
    constructor(roomid=defaultRoomid,tns_server_url=null,options=defaultOptions,peerPoolCnt=1)
    {
        this.roomid = roomid ? roomid:defaultRoomid
        this.tns_server_url = tns_server_url?tns_server_url:get_TNS_SERVER_URL()
        this.options = options ? options:defaultOptions
        this.chunkSize = 150*1024
        this.peerPoolCnt = peerPoolCnt
        let This =this
        this.setWallet(null,function(){
            This.init()
        })
    }
    
    async init()
    {
        while(typeof g_dtnsManager == 'undefined' || !g_dtnsManager.web3apps)
            await this.sleep(100)
        let web3appInfo = await g_dtnsManager.nslookup('dtns://web3:'+g_dtnsManager.getOriginRoomID(this.roomid.startsWith('devtools')?'dtns':this.roomid))
        this.web3appInfo = web3appInfo
        console.log('rpc-client--init--web3appInfo:',web3appInfo,this.roomid)

        this.tns_server_url = web3appInfo  && web3appInfo.network_info 
            && web3appInfo.network_info.tns_urls && web3appInfo.network_info.tns_urls.length>0
            ? web3appInfo.network_info.tns_urls[parseInt(Math.random()*159999)
            %web3appInfo.network_info.tns_urls.length]:this.tns_server_url

        this.roomId = this.roomid
        this.peerMap = new Map()
        this.dataCallBackSession = new Map()
        this.dataCallBackFunctions= new Map()
        this.pingTestCnt = 0
        this.pingTestAllCnt=10
        this.pingpong_flag = false
        this.fastPeer = null
        this.socket = null
        this.client =null
        this.wsMap = new Map()
        await this.join()
    }
    async setWallet(walletInfo = null,next = null)
    {
        while(!iWalletDb.db) await this.sleep(100)
        while(!g_dtnsManager.web3apps) await this.sleep(100)
        if(!walletInfo)
        {
            let mywallet = null// g_mywallet
            mywallet = (await iWalletDb.getDataByKey('mywallet:'+this.roomid));
            console.log('iWalletDb-mywallet:',mywallet)
            if(mywallet) mywallet = mywallet.data
            this.mywallet = mywallet
        }else{
            this.mywallet = Object.assign({},walletInfo)
            this.mywallet.web3name = this.roomid
        }
        if(typeof next == 'function')
        {
            next()
        }
    }
    //判断是否需要重连（可被sendData当peer is closed??!!时调用）
    async check_and_reconnect()
    {
        console.log('into check_and_reconnect',this.is_checking_flag,this.peer())
        if(this.is_checking_flag) return 
        if(this.peer()) return //依然判断是否是peer已连接成功，如未连接成功，
        //而this.socket.connected = true，则依然有机构在5-10秒内进行再次this.init重试peer连接

        this.is_checking_flag = true
        let iCnt = 0
        while(this.is_checking_flag)
        {
            iCnt ++ 
            console.log('check_and_reconnect-iCnt:'+iCnt ,'socket-connected:',
                this.socket && this.socket.connected,'peer:',this.peer())
            await this.init()
            await this.sleep(1000)
            if(this.socket && this.socket.connected)//2023-6-19，只要连接上了socket，则代表不是网络连接的问题 //以是否成功拿到turn-pwd为标志
            {
                await this.sleep(5000) //5秒内是否连是对应的client，如果无法连上，重启连接
                this.is_checking_flag = false// !(this.peer() || false) //如果是peer!=null，is_checking_flag则为false，不再继续循环
            }else{
                await this.sleep(2000)
                this.is_checking_flag = true //继续循环
            }
        }
    }
    async join() {
        let that = this,This = this
        if(this.socket) this.leave()

        // console.log('rpc_client-join-g_mywallet:',typeof g_mywallet)
        // if(typeof g_mywallet == 'undefined' || !g_mywallet)
        // {
        //     while(iWalletDb.db == null) await this.sleep(100)
        //     window.g_mywallet = (await iWalletDb.getDataByKey('g_mywallet'));
        //     window.g_mywallet = g_mywallet ? g_mywallet.data :g_mywallet
        //     console.log('iFileDb-g_mywallet:',g_mywallet)
        // }

        //先获得turn-pwd
        // let mywallet = null// g_mywallet
        // // if(typeof g_mywallet =='undefined' || !g_mywallet|| this.roomId!=g_mywallet.web3name)
        // {
        //     mywallet = (await iWalletDb.getDataByKey('mywallet:'+this.roomId));
        //     if(mywallet) mywallet = mywallet.data
        //     // mywallet = mywallet?mywallet:g_mywallet
        //     // window.g_mywallet = mywallet
        // }
        // this.mywallet = mywallet
        let turnPWD = await queryTurnPwd(this.mywallet,this.roomId,this.tns_server_url)
        console.log('turnPWD:',turnPWD,this.mywallet)
        //仅非devtools的roomid方可
        // if( this.roomId.indexOf('devtools')<0 )
        {
            if((!turnPWD || !turnPWD.ret ) && this.roomId.indexOf('devtools')<0)
            {
                console.log('client-device-id not bind dtns-network')
                return false;
            }
            if(turnPWD){
                this.options.config.iceServers[0].username = turnPWD.username
                this.options.config.iceServers[0].credential = turnPWD.password
            }
            this.options.config.iceServers[0].urls =
                this.web3appInfo && this.web3appInfo.network_info && this.web3appInfo.network_info.turn_urls 
                && this.web3appInfo.network_info.turn_urls.length>0
                 ? this.web3appInfo.network_info.turn_urls : 
                ( g_turn_urls ? g_turn_urls :this.options.config.iceServers[0].urls )
        }
        console.log('rpc_client:this.options:',this.options)
        this.socket = io(this.tns_server_url, this.options);
        this.client = new SimpleSignalClient(this.socket);
        this.client.once('discover', (discoveryData) => {
            that.log('discovered', discoveryData)
            if(!discoveryData.hostid){
                console.log('error: hostid-unexist-in-the-room')
                setTimeout(()=>This.init(),3000)
                return 
            }
            //     discoveryData.peers.forEach((peerID) => that.connectToPeer(peerID));
            // else 
            that.connectToPeer(discoveryData.hostid)
            for(let i=0;i<that.peerPoolCnt-1;i++)
                setTimeout(()=>{
                    that.connectToPeer(discoveryData.hostid)
                },1000*i)

        });
        this.client.on('request', async (request) => {
            that.log('requested', request)
            const { peer } = await request.accept()//{}, that.peerOptions)
            that.log('accepted', peer);

            that.onPeer(peer);
        })
        // this.client.discover(that.roomId);
        this.discoverRoom()
    }
    async discoverRoom()
    {
        let This = this
        if(this.roomId.indexOf('-')>0)
        {
            setTimeout(function(){
                This.client.discover(this.roomId+'::host')
            },300)
        }
        else if(this.roomId.indexOf('devtools') == 0)
        {
            this.client.discover(this.roomId) //roomid自身决定放不放::host
            this.is_devtools_rpc = true
        }
        else{
            let that = this
            let setRoomFunc = async function(){
                //签名，并请求roomid连接
                console.log('mywallet',that.mywallet)
                let roomId = 'web3:'+that.roomId+'|'+ parseInt(Date.now()/1000)
                console.log('web3-roomid:',roomId)
                let hash = await key_util.hashVal(roomId)
                let sign = await key_util.signMsg(hash,that.mywallet.private_key)
                that.client.discover(roomId+'|'+sign)
            }
            if(typeof g_mywallet!='undefined') //仅是判断是否已经初始化了rpc_client
            {
                setRoomFunc()
            }else 
                setTimeout(setRoomFunc,300)
        }
    }
    async connectToPeer(peerID,cnt=0) {
        let that = this
        if (!that.socket || peerID == that.socket.id) return;
        try {
            that.log('Connecting to peer');
            const { peer } = await that.client.connect(peerID, that.roomId, that.options);
            that.log('peer-config:'+JSON.stringify(peer.config))
            // that.videoList.forEach(v => {
            //     if (v.isLocal) {
            //         that.onPeer(peer, v.stream);
            //     }
            // })
            console.log('connected',peer)
            that.onPeer(peer,that.localStream)
            // peer.on('error', (err) => {
            //     that.log('peer error ', err);
            // });
            // peer.onconnectionstatechange = (ev)=>{
            //     that.log('onconnectionstatechange-state:'+peer.connectionState+' ev:'+ev)
            // }
        } catch (e) {
            console.log('Error connecting to peer:'+e,e);
            if(cnt<=3)
            {
                setTimeout(function(){
                    console.log('reconnectToPeer,cnt:',cnt)
                    that.connectToPeer(peerID,cnt+1)
                },1000)
            }
            else {
                console.log('call this.init')
                this.init()
            }
        }
    }
    async dataCallBack(peer,data)
    {
        if(this.dataCallBackFunctions.has(data.callid))
        {
            if(data.ziped)
            {
                let begin = Date.now()
                let zip = new JSZip();
                let oldData = data.data
                let binaryData = this.dataURLtoBinary(oldData).buffer
                let fileZip = await zip.loadAsync(binaryData)//zip.file("tmp.txt",oldData)
                let newData = await (fileZip.file("json.txt").async("string"))
                console.log('zip-oldData-len:',oldData.length)
                console.log('zip-newData-len:',newData.length)
                try{
                    data.data = JSON.parse( newData )
                }catch(ex){
                    console.log('zip-data-JSON.parse-ex:'+x)
                    data.data = newData
                }
                console.log('zip-used-time:'+(Date.now()-begin))
            }
            let callback =  this.dataCallBackFunctions.get(data.callid)
            if(typeof callback == 'function')
            {
                callback(data)
            }
        }
        let that = this
        let usedTime = new Date().getTime()- data.callid
        console.log('usedTime:'+usedTime+' channelName:'+peer.channelName)
        if(that.pingTestCnt > that.pingTestAllCnt) return 

        let timeObj = that.peerMap.get(peer.channelName)
        console.log('timeObj:'+timeObj,peer,timeObj)//onPeer this.peerMap.set(peer.channelName,peer)
        if(!timeObj.usedTime || timeObj.usedTime>usedTime ) timeObj.usedTime = usedTime//(usedTime +(timeObj.usedTime?timeObj.usedTime:0))/2 //更新用时
        
        that.pingTestCnt ++
        if(that.pingTestCnt==that.pingTestAllCnt)
        {
            let keyPeer = null,minTime = 0;
            that.peerMap.forEach(function(value, key) {
                    if(!keyPeer) {
                        keyPeer = key
                        minTime = value.usedTime
                    }else{
                        if(value.usedTime<minTime)
                        {
                            keyPeer = key
                            minTime = value.usedTime
                        }
                    }
                    console.log('key:'+key+' minTime:'+minTime+' value.usedTime:'+value.usedTime)
                })
                that.fastPeer = that.peerMap.get(keyPeer)
                console.log('minTime:'+minTime+' fastPeer:',that.fastPeer)
        }
    }
    getCallSessionData(data)
    {
        if(data.begin_str == '=count')//统计速率
        {
            let timeUsed =  parseInt((new Date().getTime()- data.callid )/1000) //按秒计算
            let radio = Math.round( data.recved_size*1.0 / timeUsed ,2) //速率
            this.dataCallBackSession.set(data.callid+':radio',radio)

            //得到当前的调用的callback.
            let func = this.dataCallBackFunctions.get(data.callid+':check')
            if(typeof func == 'function'){
                func(data)
            }

            return 
        }
        else if(data.begin_str == '=slice')//读取对应的偏移位置的数据。
        {
            // console.log('not need resend by server =slice req!')
            this.sendSliceFile(data.callid,data.read_slice)////已经使用readSlice模式进行每个chunkSize的发送确认，不再需要此重发逻辑
            return ;
        }
        // let This = this
        let posKey = data.callid+':'+data.pos
        let lastData = this.dataCallBackSession.get(data.callid)
        if(!lastData){ 
            data.recved_list = [data]
            this.dataCallBackSession.set(data.callid,data)
            this.dataCallBackSession.set(posKey,'')//first element
            lastData = data
            // let xid = setInterval(function(){
            //     let usedTime = new Date().getTime() - lastData.callsession_last_update_time
            //     if(usedTime >=30000)
            //     {
            //         clearInterval(xid)
            //         console.log('[notice]some error happen: we will clear the call-session-data:'+lastData.callid)
            //         This.dataCallBackSession.delete(lastData.call_xid)
            //     }
            // },5000)
            // lastData.call_xid = xid
        }else{
            if(this.dataCallBackSession.has(posKey)){
                lastData.muti_recved_cnt = lastData.muti_recved_cnt ? lastData.muti_recved_cnt+1 :1
                console.log('this pos is recved, posKey:'+posKey+', size:'+data.data.length)
            }
            else{
                lastData.recved_list.push(data)
                this.dataCallBackSession.set(posKey,'')//not first element
            }   
        }
        console.log('max_pos:'+data.max_pos+' now-recved-list-len:'+lastData.recved_list.length)
        // lastData.callsession_last_update_time = new Date().getTime()

        if(data.max_pos == lastData.recved_list.length)
        {
            let newDataStr ='' , u8arr = data.begin_str=='=file' ?  new Uint8Array(lastData.fileInfo.size):null//data.fileInfo.len ? data.fileInfo.len:
            let recved_list = lastData.recved_list
            recved_list.sort((a,b)=>{
                return a.pos - b.pos
            })
            let s = 0
            for(let i=0;i<recved_list.length;i++)
            {
                if(recved_list[i].pos!=i){
                    for(let k=i;k<recved_list.length;k++)
                        console.log('need-pos:'+k+' but is '+recved_list[k].pos)
                    console.log('recved_list-data-error, by callid:'+lastData.recved_list[i].callid+' pos:'+i+' need-pos:'+lastData.recved_list[i].pos)
                    break;
                } 
                //处理binary-file
                if(u8arr){
                    let tmpData = lastData.recved_list[i].data //避免多次对象访问（减少速度损耗）
                    let n = tmpData.length
                    console.log('lastData',lastData)
                    console.log('n:'+n)
                    u8arr.set(tmpData,s)//直接复制
                    // for(let k=0;k<n;k++){
                    //     u8arr[s+k] = tmpData[k]
                    //     //if(k%10000 ==0) console.log('s:'+s +' now-k:'+k)
                    // }
                    s+=n
                    delete lastData.recved_list[i].data
                }
                else newDataStr += lastData.recved_list[i].data
                this.dataCallBackSession.delete(lastData.recved_list[i].callid+':'+i)
            }
            delete data.data
            delete lastData.recved_list
            clearInterval(lastData.call_xid)
            u8arr = s>0 && s!=u8arr.length ? u8arr.slice(0,s):u8arr //特别针对readSlice--服务端的情况下
            console.log('recved-data-info:'+JSON.stringify(data))
            data.data = u8arr ? u8arr : this.parseJSON( newDataStr)
            this.dataCallBackSession.delete(data.callid)
            console.log('recved-all-data:'+newDataStr.length)//JSON.stringify(data))
            data.muti_recved_cnt = lastData.muti_recved_cnt
            return data;
        }
        return null;
    }
    countPeerCnt()
    {
        let iCnt = 0
        this.peerMap.forEach(()=>iCnt++)
        return iCnt
    }
    parseJSON(d)
    {
        try{
            return JSON.parse(d)
        }catch(ex)
        {
            console.log('parseJSON-ex:'+ex)
            return d
        }
    }
    async testQuery(end){
        // let This = this
        let peerNow = this.fastPeer
        console.log('peers()-:'+this.client.peers())
        if(!peerNow) this.client.peers().forEach(peer => {peerNow=peer})
        if(!peerNow) return null

        let params = {appid:10001,secret_key:'',opcode:'file.download',
                        token_x:'rmb_0000000000000000',token_y:'rmb_0000000000000000',
                        opval:'new',extra_data:'fork-new-rmb-token',begin1:0,len1:3}

                        
       for(let i=0;i<6;i++)
       {
        let list = this.client.peers()
        peerNow = list[i%list.length]
        this.sendData(peerNow,'/chain/query',params,null,function(readData){
            if(typeof end == 'function') end(readData)
            //console.log('test-query-ret-data:'+readData.data.list.length)
        })
        await this.sleep(1000)
        }
    }
    dataURLtoBlob(dataurl,name) {//name:文件名
        var mime = name.substring(name.lastIndexOf('.')+1)//后缀名
        var bstr = atob(dataurl), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
    dataURLtoBinary(dataurl) {//name:文件名
        var bstr = atob(dataurl), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return u8arr
    }
    downloadFile(url,name='默认文件名'){
        var a = document.createElement("a")//创建a标签触发点击下载
        a.setAttribute("href",url)//附上
        a.setAttribute("download",name)
        a.setAttribute("target","_blank")
        let clickEvent = document.createEvent("MouseEvents");
        clickEvent.initEvent("click", true, true);
        a.dispatchEvent(clickEvent);
    }
    //主函数
    downloadFileByBase64(name,base64){
        var myBlob = this.dataURLtoBlob(base64,name)
        var myUrl = URL.createObjectURL(myBlob)
        this.downloadFile(myUrl,name)
    }
    downloadFileByBinary(name,data){
        var mime = name.substring(name.lastIndexOf('.')+1)//后缀名
        let myBlob = new Blob([data], { type: mime });
        var myUrl = URL.createObjectURL(myBlob)
        this.downloadFile(myUrl,name)
    }
    //统计下载速率---DonwloadManager中用于统计下载速率  2023-10-13新增
    downloadRadio(downloadManagerInfo)
    {
        if(!downloadManagerInfo) return 0
        let lastData = this.dataCallBackSession.get(downloadManagerInfo.down_callid)
        if(!lastData) return 0
        let recved_list = lastData.recved_list
        if(!recved_list || recved_list.length==0) return 0
        let tmpData = recved_list[0]
        if(!tmpData || !tmpData.data) return 0
        let sum = tmpData.data.length * recved_list.length // slice-size * list-size
        downloadManagerInfo.down_count_size = downloadManagerInfo.down_count_size ? downloadManagerInfo.down_count_size :0
        downloadManagerInfo.down_count_time = downloadManagerInfo.down_count_time ? downloadManagerInfo.down_count_time : Date.now()-1000
        return (sum - downloadManagerInfo.down_count_size)*1000.0 / (Date.now() -  downloadManagerInfo.down_count_time) //ms 修订为s秒
    }
    downloadCount(downloadManagerInfo)
    {
        let lastData = this.dataCallBackSession.get(downloadManagerInfo.down_callid)
        if(!lastData) return 0
        let recved_list = lastData.recved_list
        if(!recved_list || recved_list.length==0) return 0
        let tmpData = recved_list[0]
        if(!tmpData || !tmpData.data) return 0
        let sum = tmpData.data.length * recved_list.length // slice-size * list-size
        downloadManagerInfo.down_count_size = sum
        downloadManagerInfo.down_count_begin= Date.now()
        return true
    }
    //2023-10-13新增downloadManagerInfo，方便支持下载工具的集成
    async download(params,end,downloadManagerInfo = null,stopCallback = null){
        if(!downloadManagerInfo)
        {
            if(!this.lockDownload){
                this.lockDownload = true
                setTimeout(()=>this.lockDownload = false,3000)
            }
            else{
                console.log('download is lock')
            }
        }
        let This = this;
        let peerNow = this.fastPeer
        if(!peerNow) this.client.peers().forEach(peer => {peerNow=peer})

        let iCnt = 0,begin = 0,len = this.chunkSize, dataList = [],recved_slice_size = 0//,fileInfo = null150*1024*1
        params.len = len
        //断点续传 2023-10-13新增
        if(downloadManagerInfo) 
        {
            downloadManagerInfo.down_flag = true //继续上传
            // begin = downloadManagerInfo.down_begin
            len = this.chunkSize //重置为this.chunkSize
            dataList = downloadManagerInfo.down_data_list ? downloadManagerInfo.down_data_list:[]
            downloadManagerInfo.down_data_list = dataList
            let oldSize = downloadManagerInfo.down_recved_slice_size
            for(let i=0;i<dataList.length;i++)
            {
                recved_slice_size += dataList[i].data.length
            }
            downloadManagerInfo.down_recved_slice_size = recved_slice_size
            begin = recved_slice_size
            console.log('into download:downloadManagerInfo.down_recved_slice_size:',oldSize,'new-size:',recved_slice_size)
            iCnt = dataList.length //当前位置
        }
        // let callData = {callid:new Date().getTime()+'.'+parseInt(Math.random()*1000000000),url:'/file/download',
        //                     max_len:0,len:0,pos:0,max_pos:0,data:params}
        let begin_time = new Date().getTime()
        let unfast_mode = false;
        let fileInfo = null
        while(params && ( (downloadManagerInfo && downloadManagerInfo.down_flag) || !downloadManagerInfo ) )
        {
            if(downloadManagerInfo){ //down_flag = true--不间断继续下载，down_flag下载完当前片段后暂停
                downloadManagerInfo.down_begin = begin //当前下载的位置（可根据此来统计下载百分比）
                downloadManagerInfo.down_len = len  //当前下载的区块大小
                downloadManagerInfo.down_chunk_size = this.chunkSize
                // downloadManagerInfo.down_data_list = dataList
                downloadManagerInfo.down_recved_slice_size = recved_slice_size
                downloadManagerInfo.down_file_info =fileInfo //2023-10-13新增
            }
            params.begin = begin
            params.len = len //滑动窗口控制（当data.muti_recved_cnt<=0时，则+=this.chunkSize，如果>=3则减少一个单位chunkSize
            let data = await new Promise((resolve)=>
            {
                This.sendData(peerNow,params.url ? params.url: '/file/download',params,null,function(readData){
                    resolve(readData)
                },downloadManagerInfo)
                //setTimeout(()=>resolve(null),6000)
            })
            fileInfo = data && !fileInfo  && data.fileInfo? data.fileInfo : fileInfo
            console.log('fileInfo:'+JSON.stringify(fileInfo)+' data.len:'+data.data.length) 
            if(!peerNow._pc) {
                console.log('peerNow is closed!')
                dataList =null
                break
            }
            if(!fileInfo){ 
                console.log('some error happen by download-function')
                break;
            }
            // if(!data || !data.data || !data.data.length) continue
            // if(data.data.length>len){
            //     console.log('function ret data.size > len(per-step)')
            // }
            // if(!data){ 
            //     unfast_mode = true
            //     continue //这里将重试
            // }
            // if(data.data.length!=len && begin+len<data.fileInfo.size)
            // {
            //     unfast_mode = true
            //     continue
            // }
            //收集结果
            dataList.push(data)
            iCnt++
            console.log('file-data-length:'+data.data.length)//+' byte-length:'+data.data.byteLength)
            recved_slice_size+= data.data.length ? data.data.length: 0
            console.log('data-list-cnt:'+ dataList.length+' iCnt:'+iCnt)
            console.log('recved_slice_size:'+recved_slice_size+' begin:'+begin+' file.size:'+fileInfo.size)
            //已收集到足够的结果-----这个是确认成功的结果
            if(recved_slice_size>=fileInfo.size)
            {
                console.log('end the download now:'+data.begin_str)
                if(data.begin_str!='=file')
                {
                    if(typeof end == 'function') end(data)
                }else if(data.begin_str=='=file'){
                    let u8arr = new Uint8Array(fileInfo.size),s=0
                    for(let i=0;i<dataList.length;i++){
                        u8arr.set(dataList[i].data,s)
                        s += dataList[i].data.length
                        delete dataList[i].data
                    }
                    data.data = u8arr
                    if(s!=fileInfo.size)
                    {
                        console.log('reved-size:'+s+' not ok, need file.size:'+fileInfo.size)
                    }
                    if(typeof end == 'function') end(data)
                }
                console.log('download-file-slice-mode usedTime(ms):'+(new Date().getTime()-begin_time))
                break;
            }
            //如果没下载完，继续下载
            begin += len
            // if(unfast_mode){
            //     len=this.chunkSize
            //     continue
            // }
            //【控制代码】2022-12-14以下在Node.js环境下，只有网络环境比较好才非常高效（特别针对网速好的动态提速）
            console.log('data.muti_recved_cnt:'+data.muti_recved_cnt)
            if(!data.muti_recved_cnt || data.muti_recved_cnt <=0)  //滑动窗口控制（当data.muti_recved_cnt<=0时，则+=this.chunkSize，如果>=3则减少一个单位chunkSize
            {
                len+=this.chunkSize
            }else if(data.muti_recved_cnt>=3){
                len-=this.chunkSize
                len = len<=this.chunkSize ? this.chunkSize : len
            }
        }

        if(typeof stopCallback == 'function'){
            console.log('rpc-client->stopCallback() now!')
            stopCallback()
        }
        
    }
    sendFile(fileInfo,callback){
        let peerNow = this.fastPeer
        if(!peerNow) this.client.peers().forEach(peer => {peerNow=peer})

        let params =Object.assign({}, fileInfo)
        delete params.data
        fileInfo.params = params
        let rdata = fileInfo.data 
        delete fileInfo.data //put to the rdata ( in order to split )

        if(fileInfo.encoding!='fromfile_binary')
            this.sendData(peerNow,'/file/upload',rdata,fileInfo,callback)
        else
            this.sendDataBinary(peerNow,'/file/upload',rdata,fileInfo,callback)//sendDataBinaryD
    }
    async sendImage(fileInfo,callback){
        let peerNow = this.fastPeer
        if(!peerNow) this.client.peers().forEach(peer => {peerNow=peer})

        console.log('before-fileInfo.data',fileInfo.data)
        let This = this
        fileInfo.data = await new Promise((res)=>{
            //2023-2-6  以支持动态设置图片上传参数。
            //全局设置
            This.img_q = typeof This.img_q == 'undefined' ? 0.5 :This.img_q
            //局部设置
            let img_q = typeof fileInfo.img_q == 'undefined' ? This.img_q : fileInfo.img_q
            let options = {"strict":true,"checkOrientation":true,"maxWidth":3000,"minWidth":0,"minHeight":0,
                "resize":"none","quality":img_q,"mimeType":"image/webp","convertTypes":"image/png","convertSize":5000000}
            options.success = function(result){
              res(result)
            }
            options.error = function(err){
              console.log(err.message);
              res(null)
            }
            new Compressor(fileInfo.data, options);
          })
        fileInfo.mimetype = fileInfo.data.type
        fileInfo.size = fileInfo.data.size
        fileInfo.originalname = fileInfo.data.name
        const rdata = fileInfo.data  //保存了原始的压缩好的图片数据
        console.log('rpc_client-sendImage-fileInfo.filename:',fileInfo.filename,fileInfo)
        if(fileInfo.filename.indexOf('aes256|')==0
        && fileInfo.filename.indexOf('|') != fileInfo.filename.lastIndexOf('|'))
        {
            let lastStr = fileInfo.filename.substring('aes256|'.length,fileInfo.filename.length)
            let aes256Hash = lastStr.substring(0,lastStr.indexOf('|'))
            console.log('')
            // let msg = lastStr.substring(lastStr.indexOf('|')+1,lastStr.length)
            if(aes256Hash && aes256Hash.length>10)
            {
                let web3key = await g_dchatManager.getWeb3Key(aes256Hash)//await iWalletDb.getDataByKey('web3key_hash:'+aes256Hash)
                if(web3key)
                {
                    console.time()
                    console.log('sendImage-web3key-aes256Hash:',web3key,aes256Hash)
                    let {iv,aeskey} = sign_util.decodeWeb3keyAes256Str(web3key)
                    console.log('rpc_client-sendImage-old-file.size:'+fileInfo.size)
                    
                    //先保存压缩后的origin文件名
                    console.log('rpc_client-sendImage-fileInfo.originalname:',fileInfo.originalname)
                    let en1 = await sign_util.encryptMessage(await sign_util.importSecretKey(aeskey),iv,fileInfo.originalname)
                    fileInfo.filename = 'aes256|'+aes256Hash+'|'+en1
                    fileInfo.originalname = fileInfo.filename
                    console.log('rpc_client-sendImage-fileInfo.originalname--en:',fileInfo.originalname)
                    console.log('1:'+Date.now())
                    var binaryData = await new Promise((res)=>{
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            res(e.target.result);
                        }
                        reader.readAsArrayBuffer(fileInfo.data);
                    })
                    console.log('2:'+Date.now())
                    fileInfo.data = await sign_util.encryptMessage(await sign_util.importSecretKey(aeskey),iv,binaryData,false)
                    console.log('3:'+Date.now())
                    // let testData = await sign_util.decryptMessage(await sign_util.importSecretKey(aeskey),iv,fileInfo.data.buffer,false)
                    console.log('rpc_client-sendImage-new-file-encrypted:',fileInfo.data)//,rdata,testData )
                    fileInfo.data = new Blob([fileInfo.data ], { type: 'application/octet-stream'});//不使用图片格式了（已经加密过）
                    console.log('4:'+Date.now())
                    fileInfo.size = fileInfo.data.size
                    console.log('rpc_client-sendImage-new-file.size:'+fileInfo.size,binaryData)
                    console.timeEnd()
                }else{//从网络中同步和获取
                    console.log('【notice】rpc_client-sendImage-aes-web3key do not int iWalletDb, need load from network ')
                }
            }else{
                console.log('【notice】rpc_client-sendImage-aes-web3key do not have ok aesHash:',aes256Hash)
            }
        }else{
            console.log('【notice】rpc_client-sendImage-aes-web3key do not have ok fileName:',fileInfo.filename.indexOf('aes256|')==0
            && fileInfo.filename.indexOf('|') != fileInfo.filename.lastIndexOf('|'))
        }
        console.log('end-fileInfo.data',fileInfo.data)
        //   console.log('end-data.file',data.file)
        //   let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:data.file.name,
        //                             mimetype:data.file.type,filename:data.file.name,path:'file-path',
        //                             size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
        //                             img_kind:'open',random,
        //                             data:data.file}        

        let xrdata = fileInfo.data
        let params =Object.assign({}, fileInfo)
        delete params.data
        fileInfo.params = params
        
        delete fileInfo.data //put to the rdata ( in order to split )
        let xback = async function(data){
            if(!data ||!data.data || !data.data.ret) return callback(data)
            let img_id = data.data.filename
            if(!img_id) return callback(data)
        
            console.log('sendImage-xback-funcion-img_id:'+img_id)
            // let myBlob = new Blob([data.data], { type:fileInfo.mimetype });
            var base64 = await new Promise((res)=>{
                var reader = new FileReader();
                reader.onload = function (e) {
                    res(e.target.result);
                }
                reader.readAsDataURL(rdata);
            })
            //base64 = base64.split('base64,')[1]
            console.log('sendImage-xback-funcion-base64',base64)
            imageDb.addData({img_id,data:base64})
            return callback(data)//继续回调
        }

        if(fileInfo.encoding!='fromfile_binary')
            this.sendData(peerNow,'/image/upload',xrdata,fileInfo,xback)//callback)
        else
            this.sendDataBinary(peerNow,'/image/upload',xrdata,fileInfo,xback)//callback)//sendDataBinaryD
    }
    async sendSliceFile(callid,pos)
    {
        let This = this
        let {peer,params,file} = this.dataCallBackFunctions.get(callid+':queue')//,{peer,params:backData,file})

        let fileReader = new FileReader();
        let chunkSize = this.chunkSize//150*1024
        fileReader.onerror = error => console.error('Error reading file:', error);
        fileReader.onabort = event => console.log('File reading aborted:', event);
        fileReader.onload =async e => {
            // dc.send(e.target.result);
            let result = new Uint8Array(e.target.result)
            await This.sendSliceFileBinary(peer,params,result,pos)//, send(result)
            console.log('sendSliceFile-length:'+result.length);
            setTimeout(function(){
                This.sendSliceFileBinary(peer,params,result,pos)//, send(result) //发送2次
            },100)
        }
        var readSlice = o => {
            console.log('sendSliceFile-readSlice ', o);
            const slice = file.slice(o, o + chunkSize);
            fileReader.readAsArrayBuffer(slice);
        };
        readSlice(pos*chunkSize)
    }
    async sendSliceFileBinary(peer,backData,data,pos)
    {
        backData.pos = pos
        backData.len = data.length

        console.log('sendSliceFileBinary-pos:'+pos+ ' data-len:'+data.length)

        var encoder = new TextEncoder();
        let jsonStr = JSON.stringify(backData)
        let jsonBuff= encoder.encode(jsonStr)
        // console.log('jsonBuff.len:'+jsonBuff.length)

        let strBegin = '=file'
        let strBeginBuff = encoder.encode(strBegin)
        // console.log('strBeginBuff.len:'+strBeginBuff.length)
        console.log('data.len:'+data.length)

        let writeBuffer = new Uint8Array(strBegin.length+2+(''+jsonBuff.length).length
            +(''+data.length).length)//+jsonStr.length)//+rdata.length)

        
        writeBuffer.set(strBeginBuff,0,strBeginBuff.length)//,'ascii')
        writeBuffer[strBeginBuff.length] = (''+jsonBuff.length).length
        writeBuffer[strBeginBuff.length+1] = (''+data.length).length

        let x = encoder.encode(''+jsonBuff.length)
        let y = encoder.encode(''+data.length)
        console.log('x-len:'+x.length+' y-len:'+y.length)

        writeBuffer.set(x,strBeginBuff.length+2)
        writeBuffer.set(y,strBeginBuff.length+2+x.length)

        let allBuffer = new Uint8Array(writeBuffer.length+jsonBuff.length+data.length)
        allBuffer.set(writeBuffer,0)
        allBuffer.set(jsonBuff,writeBuffer.length)
        allBuffer.set(data,writeBuffer.length+jsonBuff.length)

        //writeBuffer.write(jsonStr,'utf8')
        console.log('allBuffer-len:'+allBuffer.length)
        while(peer._channel.bufferedAmount>10*1024*1024) await this.sleep(5)
        peer.send(allBuffer)//new ArrayBuffer(allBuffer))
        //pos++
    }
    async sendDataBinaryD(peer,url,rdata,fileInfo=null,callback=null)//滑动窗口模式
    {
        if(!peer._pc){
            console.log('peer is closed??!!!')
            return 
        }

        let offset =0 , file = rdata, chunkSize =  this.chunkSize//150*1024
        let max_pos =Math.floor( (fileInfo.size+ chunkSize-1)/chunkSize),pos = 0 
        let backData = {callid:new Date().getTime()+'.'+parseInt(Math.random()*1000000000),url,
                            max_len:fileInfo.size,len:0,pos,max_pos,fileInfo}
        console.log('send-max_pos:'+max_pos+' backData.max_pos:'+max_pos)
        if(callback) this.dataCallBackFunctions.set(backData.callid,callback)
        this.dataCallBackFunctions.set(backData.callid+':queue',{peer,params:backData,file})
        let This = this
        let muti_recved_cnt = 0
        let sendCnt = 1

        // let perLen = 10
        while(offset<file.size)
        {
            muti_recved_cnt = 0
            let recved_cnt = 0
            let recvedMap = new Map()
            let beginPos = pos
            await new Promise((resolve)=>{
                This.dataCallBackFunctions.set(backData.callid+':check',function(cdata){
                    console.log('recved-check-pos:'+cdata.pos+' reved-len:'+cdata.recved_len+' now-pos:'+pos+' max_pos:'+max_pos)
                    if(cdata.pos<beginPos ||  cdata.pos>=beginPos+sendCnt)
                    {
                        console.log('unexcept pos:'+cdata.pos+' sendCnt:'+sendCnt+' beginPos:'+beginPos)
                        return 
                    } 
                    if(recvedMap.has(''+cdata.pos)) muti_recved_cnt++
                    else{
                        recvedMap.set(''+cdata.pos,'')
                        recved_cnt++
                    }
                    console.log('pos-recved_cnt:'+recved_cnt +' sendCnt:'+sendCnt)
                    if(recved_cnt>=sendCnt || pos>=max_pos) resolve(true)
                })
                let xcall = async function(){
                    //先发送一波
                    for(let i=0;i<sendCnt;i++)
                    {
                        var readSlice =async o => {
                            console.log('readSlice ', o);
                            const slice = file.slice(o, o + chunkSize);
                            let fileReader = new FileReader();
                            await new Promise((aresolve)=>{
                                fileReader.onerror = error => console.error('Error reading file:', error);
                                fileReader.onabort = event => console.log('File reading aborted:', event);
                                fileReader.onload =async e => {
                                    // dc.send(e.target.result);
                                    let result = new Uint8Array(e.target.result)
                                    await This.sendSliceFileBinary(peer,backData,result,pos)//, send(result)
                                    console.log('FileRead.onload-result.length:'+result.length +' sended-size:'+(pos*chunkSize+result.length)+' file-size:'+file.size);
                                    pos++
                                    aresolve(true)
                                }
                                fileReader.readAsArrayBuffer(slice);
                            })
                        };
                        let nowOffet = offset+i*chunkSize
                        console.log('nowOffet:',nowOffet,file.size)
                        if(nowOffet<file.size)
                            await readSlice(nowOffet)
                        else 
                            break;
                        // await This.sleep(20)
                    }
                }
                xcall()
            })
                        
                
            
            console.log('upload-D-muti_recved_cnt:'+muti_recved_cnt)
            offset+=sendCnt*chunkSize
            if(muti_recved_cnt<=0) sendCnt++
            else if(muti_recved_cnt>=3 || muti_recved_cnt>=sendCnt) sendCnt--
            sendCnt = sendCnt<=0 ? 1:sendCnt

        }

        this.dataCallBackSession.delete(backData.callid+':radio')
        // this.dataCallBackFunctions.delete(backData.callid)  不在这里调用，不在这里删除
        this.dataCallBackFunctions.delete(backData.callid+':check')
    }
    async sendDataBinary(peer,url,rdata,fileInfo=null,callback=null)
    {
        if(!peer._pc){
            console.log('peer is closed??!!!')
            return 
        }

        let offset =0 , file = rdata, chunkSize =  this.chunkSize//150*1024
        let max_pos =Math.floor( (fileInfo.size+ chunkSize-1)/chunkSize),pos = 0
        let backData = {callid:new Date().getTime()+'.'+parseInt(Math.random()*1000000000),url,
                            max_len:fileInfo.size,len:0,pos,max_pos,fileInfo}
        console.log('send-max_pos:'+max_pos+' backData.max_pos:'+max_pos)
        if(callback) this.dataCallBackFunctions.set(backData.callid,callback)
        this.dataCallBackFunctions.set(backData.callid+':queue',{peer,params:backData,file})
        let This = this
        // let perLen = 10

        let fileReader = new FileReader();
        fileReader.maxRadio = 0
        fileReader.sended_size =0;
        fileReader.onerror = error => console.error('Error reading file:', error);
        fileReader.onabort = event => console.log('File reading aborted:', event);
        fileReader.onload =async e => {
            
            // dc.send(e.target.result);
            let result = new Uint8Array(e.target.result)
            
            await This.sendSliceFileBinary(peer,backData,result,pos)//, send(result)
            let iFailedCnt = 0, begin_count_time = new Date().getTime()
            let flag = await new Promise((resolve)=>{//= pos%perLen ==0 ? 
                let xid = setTimeout(()=>resolve(false),5000)
                this.dataCallBackFunctions.set(backData.callid+':check',function(cdata){
                    console.log('recved-check-pos:'+cdata.pos+' reved-len:'+cdata.recved_len+' now-pos:'+pos)
                    if(cdata.recved_len==pos+1 && cdata.pos == pos) //cdata.pos == pos)
                    {
                        resolve(true)
                        clearTimeout(xid)
                    }
                    else{
                        iFailedCnt++
                        console.log('need-pos:'+pos+' iFailedCnt:'+iFailedCnt)
                        if(new Date().getTime()-begin_count_time>5000){
                            console.log('check-failed, and is timeout, resend now!')
                            resolve(false)
                        }
                    } 
                }) 
                
            })//:true  //每10次确认一次是否成功的包


            // if(pos!=0 && !flag)
            // {
            //     pos -= perLen
            //     offset-=  perLen*chunkSize
            // }
            pos+= flag ? 1:0 //增加
            offset += flag ? e.target.result.byteLength :0
            fileReader.sended_size+= flag ? result.byteLength:0
            console.log('FileRead.onload-byteLength:'+e.target.result.byteLength+' result.length:'+result.length
                +' sended-size:'+fileReader.sended_size+' file-size:'+file.size);
            
            //await This.sleep(100)//控制在1.5M的速率
            // return 
            // if(offset>2*1024*1024) //大于2M才开始计时
            // {
            //     let radio = This.dataCallBackSession.has(backData.callid+':radio') ? 
            //         This.dataCallBackSession.get(backData.callid+':radio'):-1
            //     if(radio >0)
            //     { 
            //         if(fileReader.maxRadio < radio) fileReader.maxRadio = radio
            //         let nowRadio = offset / Math.round((new Date().getTime()-backData.callid)/1000)
            //         console.log('max-radio:'+((fileReader.maxRadio)/1000/1000))
            //         if(nowRadio>fileReader.maxRadio*1.2)
            //         {
            //             let n = fileReader.maxRadio / chunkSize
            //             console.log('max-radio:'+((fileReader.maxRadio)/1000/1000)+'M/s  and n='+n)
            //             if(1000/n >=10) await This.sleep(1000/n)//0.15M/0.005（最大速率维持在了1.5M，如果超速的话）
            //         }
            //     }
            // }
            //递归进行----放在最后进行，否则无法限速
            if (offset < file.size ) {
                readSlice(offset);
            }else{
                This.dataCallBackSession.delete(backData.callid+':radio')
            }
        }

        var readSlice = o => {
            console.log('readSlice ', o);
            const slice = file.slice(offset, o + chunkSize);
            fileReader.readAsArrayBuffer(slice);
        };

        readSlice(0)
    }
    peer(){
        if(!this.client || this.client.peers().length==0) return null;
        let list = this.client.peers()
        return list[parseInt(Math.random()*100000)%list.length]
    }
    async send(url,rdata,fileInfo=null,callback=null)
    {
        let peerNow = this.peer()
        this.sendData(peerNow,url,rdata,fileInfo,callback)
    }
    async ws_send(ws_token,msg)
    {
        let peer = this.peer()
        if(!peer) {
            console.log('ws-send-peer is null',peer)
            return
        } 
        let backData = {msg,ws_token}
                //while(peer._channel.readyState!='open') await str_filter.sleep(5)
        while(peer._channel.bufferedAmount>10*1024*1024) await this.sleep(5)
        peer.send(JSON.stringify(backData))//jsonStr)
    }
    setWs(token,callback=null)
    {
        this.wsMap.set(token,callback)
    }
    qWS(token)
    {
        return  this.wsMap.get(token)
    }
    setPeerRefreshCallback(func)
    {
        this.peerRefreshCallback = func
    }
    async sendData(peer,url,rdata,fileInfo=null,callback=null , downloadManagerInfo = null)
    {
        if(!peer || !peer._pc){
            console.log('peer is closed??!!!')
            //由peer.on('close')实现自动重连，不需在此实现重连 2023-6-17
            // await this.sleep(5000)
            // if(!peer || !peer._pc){
            //     this.init()
            // }
            this.check_and_reconnect()

            if(typeof callback =='function'){
                callback(null)// {data:null,peer:null,peerIsClosed:true} )
            }
            return null
        }
        //let rdataStr = JSON.stringify(rdata)
        let jsonStr =fileInfo?rdata: JSON.stringify(rdata);//JSON.stringify(rdata).length
        let backData = {callid:new Date().getTime()+'.'+parseInt(Math.random()*1000000000),url,
                            max_len:jsonStr.length,len:jsonStr.length,pos:-1,max_pos:-1,fileInfo,data:rdata}
        if(callback) this.dataCallBackFunctions.set(backData.callid,callback)
        if(downloadManagerInfo) downloadManagerInfo.down_callid = backData.callid //当前的下载的callid 2023-10-13新增
        //if(fileInfo) backData.fileInfo = fileInfo
        console.log('sendData()-jsonStr-length:'+jsonStr.length)
        console.log('maxPkgSize:'+peer._pc.sctp.maxMessageSize)
        try{
            if(jsonStr.length<peer._pc.sctp.maxMessageSize-1024*10){
                //while(peer._channel.readyState!='open') await str_filter.sleep(5)
                while(peer._channel.bufferedAmount>10*1024*1024) await this.sleep(5)
                try{
                    peer.send(JSON.stringify(backData))//jsonStr)
                }catch(e){
                    await this.sleep(1000)
                    peer.send(JSON.stringify(backData))
                }
            }
            else{
                console.log('into split rdata')
                //peer.send(JSON.stringify({callid,data:{ret:false,msg:'json-length too length,size:'+jsonStr.length}}))
                let rdataTmpSize =parseInt(peer._pc.sctp.maxMessageSize/2)// parseInt((peer._pc.sctp.maxMessageSize+1023)/1024)*1024/2;// -1024*60 ;//1024*160// parseInt(peer._pc.sctp.maxMessageSize*3/2)//-128
                let max_pos =  Math.floor((jsonStr.length+rdataTmpSize-1) /rdataTmpSize)
                backData.max_pos=max_pos
                for(let pos = 0,i=0;pos<jsonStr.length;pos+=rdataTmpSize,i++)
                {
                    console.log('_channel.bufferedAmount:'+peer._channel.bufferedAmount)
                    backData.pos = i
                    let subStr = jsonStr.substring(pos,pos+rdataTmpSize)
                    backData.len = subStr.length
                    console.log('pos:'+i+' substr.len:'+subStr.length)
                    backData.data = subStr
                    //while(peer._channel.readyState!='open') await str_filter.sleep(5)
                    while(peer._channel.bufferedAmount>10*1024*1024) await this.sleep(5)
                    try{
                        peer.send(JSON.stringify(backData))//jsonStr)
                    }catch(e){
                        await this.sleep(1000)
                        peer.send(JSON.stringify(backData))
                    }
                }
            }
        }catch(ex){
            console.log('peer.send-exception:'+ex)
        }
    }
    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async callPingPong(cnt = 100)
    {
        console.log('call callPingPong-cnt:'+cnt)
        let This = this
        let rdata = await new Promise((resolve)=>{
            This.send('/user/info',{},null,function(data){
                console.log('callPingPong-user/info-data-res:',data)
                resolve(data)
            })
            setTimeout(()=>resolve(null),3000)
        })
        if(rdata && rdata.data){
            this.pingpong_flag = true
        }else if(cnt>0)
        {
            cnt -= 1
            console.log('re-pingpong-test-cnt:'+cnt)
            this.callPingPong(cnt)
        }else{
            console.log('callPingPong last-cnt <= 0')
        }
    }
    onPeer(peer) {
        var that = this, This = this
        that.log('onPeer1111');
        this.peerMap.set(peer.channelName,peer)
        peer.on('error', (err) => {
                console.log('peer error ', err);
                //2023-6-17，无如新的peer.send请求，依然不会导致peer.on('close')
                // try{
                //     that.client.peers().forEach((peer)=>peer.destroy())
                //     that.socket.close()
                // }catch(ex){
                //     console.log('destroy all peers')
                // }
                // // setTimeout(function(){
                // console.log('[restart]reconect peers,socket,etc...')
                // that.init()
            });

        peer.on('connect', () => {
            console.log('peer is connected,pingTestCnt:'+This.pingTestCnt,This.roomid)
            // This.peerMap.set(peer.channelName,peer)
            if(This.pingTestCnt<=1)
            {
                console.log('call peerRefreshCallback',This.roomid)
                if(typeof This.peerRefreshCallback =='function'){
                    This.peerRefreshCallback()
                }
                This.callPingPong()
            }
        })
        peer.on('close', () => {
            console.log('rtc-peer-close now!')
            let closeWSList = peer.closeWSList
            for(let i=0;closeWSList&& i<closeWSList.length;i++ )
            {
                let tmp = closeWSList[i]
                if(typeof tmp.close == 'function')
                    tmp.close()
                tmp.ws.closePeer()//这里使用的是closePeer（on-peer里的close()）
            }
            setTimeout(function(){
                This.init()
            })
        });
        // peer.onconnectionstatechange = (ev)=>{
        //     that.log('onconnectionstatechange-state:'+peer.connectionState+' ev:'+ev)
        // }
        if(!peer.loop_send_data_flag)
        {
            peer.loop_send_data_flag = true;
            let sendData = () => {
                that.log('send msg to peer')
                if(that.fastPeer && that.fastPeer.channelName!=peer.channelName) return ;//过滤，不允许测速较慢的peer发送请求
                try{
                // if(peer.localAddress && peer.remoteAddress && peer.writable)//这里会在部分远程连接那里失效（特别是有公网IP的）
                {
                    //console.log('no')
                    
                    peer.send('my-ip:'+peer.localAddress+'('+peer.localPort+') your-ip:'+peer.remoteAddress+'('+peer.remotePort+')')
                    let obj = {callid:new Date().getTime()+'.'+parseInt(Math.random()*1000000000),url:'/op',
                    data:{appid:10001,secret_key:'39f01b58558ba38d831744a0d353d7a3',opcode:'fork',
                    token_x:'rmb_0000000000000000',token_y:'rmb_0000000000000000',opval:60*60*24,extra_data:'fork-new-rmb-token'}}
                    obj.data.opcode = 'assert'
                    obj.url='/chain/token'
                    obj.data.token = obj.data.token_x
                    obj.data.begin =0
                    obj.data.len =10;//that.pingTestCnt>that.pingTestAllCnt ?  100000:200// 200//


                    //test req-data max-package to split to min-pkg  @2022-12-3
                    // const toHexString = bytes =>bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
                    // obj.data.buffer = toHexString(window.crypto.getRandomValues(new Uint8Array(1024*60)))
                    // for(let i=0;i<2;i++) obj.data.buffer+=obj.data.buffer


                    // obj.url='/fork'
                    obj.url='/op'
                    obj.data.opcode='fork'
                    obj.data.opcode='websocket'

                    obj.url = '/super/websocket/link'
                    obj.data.token = 'wsd3c7510eb4a59e9a9dee868f7f996d406d4f5d0038820a9f17ec230977933c37'
                    // obj.url = '/chain/file/rmb_0000000000000000'
                    // if(that.pingTestCnt>4)
                    {
                        if(that.fastPeer) that.sendData(that.fastPeer,obj.url,obj.data) //that.fastPeer.send(JSON.stringify(obj))
                        else that.sendData(peer,obj.url,obj.data)//peer.send(JSON.stringify(obj))
                    }

                    delete obj.url 
                    obj.ws = true
                    obj.ws_token = 'wsd3c7510eb4a59e9a9dee868f7f996d406d4f5d0038820a9f17ec230977933c37'
                    obj.msg =[]// 'keepalive'

                    {
                        if(that.fastPeer) that.fastPeer.send(JSON.stringify(obj))//that.fastPeer.send(JSON.stringify(obj))
                        else peer.send(JSON.stringify(obj))//peer.send(JSON.stringify(obj))
                    }
                }
                
            }catch(ex)
                {
                    that.log('ex:'+ex)
                    that.log(peer)
                    clearInterval(xid)
                }
            }
            // sendData()
            // let xid = setInterval(sendData, 30000); 
            // let xid2 = setInterval(()=>{
            //     if(!peer.writable || that.pingTestCnt>that.pingTestAllCnt){
            //         clearInterval(xid)
            //         clearInterval(xid2)
            //     } 
            // },5000)
            
            peer.on('data',(data)=>{
                if(that.is_devtools_rpc)//如果是devtools_rpc，则直接返回结果
                {
                    if(typeof that.devtools_rpc_callback =='function')
                    {
                        that.devtools_rpc_callback(data)
                    }
                    return 
                }
                that.log('recv data.len:'+data.length)
                /*
                if(data.indexOf('recv')<0 && peer.writable)
                peer.send('recved---'+data)*/
                let strBegin = '=file'
                // console.log('begin-str-is:'+new String(data.slice(0,strBegin.length)))
                if(data.slice(0,8).indexOf(strBegin)==0){//slice(0,strBegin.length).toString()
                    // console.log('len:'+data.length)
                    // console.log('typeof:'+typeof data)
                    //console.log('charAt[0]:',data)
                    if(data.length<100) //统计接收速度
                    {
                        let cntParams = that.parseJSON(data.slice(strBegin.length,data.length))
                        console.log('recved-cnt-from-server:'+JSON.stringify(cntParams))
                        cntParams.begin_str = cntParams.read_slice ? '=slice' :'=count'
                        // if(cntParams.begin_str=='=slice') return console.log('[Error]not need server-side send =slice pkg')
                        return that.getCallSessionData(cntParams)
                    }
                    let paramsSize =data[strBegin.length]// parseInt()
                    let pkgSize = data[strBegin.length+1]//parseInt(data[])
                    let paramLength = parseInt(''+(data.slice(strBegin.length+2,strBegin.length+2+paramsSize)))
                    let pkgLength = parseInt(''+(data.slice(strBegin.length+2+paramsSize,strBegin.length+2+paramsSize+pkgSize)))
                    let paramStr = data.slice(strBegin.length+2+paramsSize+pkgSize,strBegin.length+2+paramsSize+pkgSize+paramLength)
                    let buff = data.slice(strBegin.length+2+paramsSize+pkgSize+paramLength,strBegin.length+2+paramsSize+pkgSize+paramLength+pkgLength)
                    let params = JSON.parse(paramStr)
                    if(strBegin.length+2+paramsSize+pkgSize+paramLength+pkgLength!= data.length)
                    {
                        console.log('read data pkg error! happen on length:'+(strBegin.length+2+paramsSize+pkgSize+paramLength+pkgLength)+' need:'+data.length+' pos:'+params.pos)
                        
                        let callback =  that.dataCallBackFunctions.get(params.callid)
                        if(typeof callback == 'function')
                        {
                            callback(null)
                        }
                        return //这里数据收集不全，不能进入session记录环节，会导致数据包保存为文件时文件大小出错（也会导致下载失败）。
                    }
                    
                    //console.log('params:'+JSON.stringify(params))
                    params.data =buff// btoa(encodeURI(buff))
                    params.begin_str = '=file'
                    let receivedData= that.getCallSessionData(params)
                    if(receivedData){
                        that.dataCallBack(peer,receivedData)
                    }
                }else if(data.slice(0,2).indexOf('{')==0)
                {
                    console.log('111charAt[0]:',data)
                    //console.log('receivedData:'+data)
                    data = JSON.parse(data)
                    if(data.ws_token)
                    {
                        console.log('recv-websocket-data:'+JSON.stringify(data))
                        let wsMsg = that.qWS(data.ws_token)
                        if(typeof wsMsg == 'function')
                            wsMsg(data.data)
                        else
                            console.log('[Error] websocket have no message-function callback')
                    }
                    else{
                        if(data.len == data.max_len){
                            that.dataCallBack(peer,data)
                        }else{
                            let receivedData= that.getCallSessionData(data)
                            if(receivedData){
                                that.dataCallBack(peer,receivedData)
                            }
                        }
                    }
                }
            })
        }
        //setTimeout(()=>{
        // },5000) 
    }
    leave() {
        if(this.client)
        {
            this.client.peers().forEach(peer => {peer.removeAllListeners();peer.destroy()})
            this.client.destroy();
            this.client = null;
        }
        if(this.socket)
        {
            this.socket.destroy();
            this.socket = null;
        }
        
        this.peerMap = new Map()
        this.fastPeer = null
        this.pingTestCnt = 0
        this.dataCallBackSession = new Map()
    }
    log(message, data) {
        if (this.enableLogs) {
            console.log(message);
            if (data != null) {
                console.log(data);
            }
        }
    }

}

async function testRPC()
{
    const client = new RTCClient('room4')
    while(client.client.peers().length == 0) await client.sleep(500)
    await client.sleep(3000)
    client.download(function(data){
        console.log('download----data-len:'+data.data.length)
        client.downloadFileByBinary(data.fileInfo.originalname,data.data)
    })
}
// testRPC()
