const defaultRoomid = 'linkline-svr'
const TNS_SERVER_URL = 'https://groupbuying.opencom.cn:441'//'http://127.0.0.1:3000'// 'http://127.0.0.1:3000'//
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
    constructor(roomid=defaultRoomid,tns_server_url=TNS_SERVER_URL,options=defaultOptions,peerPoolCnt=1)
    {
        this.roomid = roomid ? roomid:defaultRoomid
        this.tns_server_url = tns_server_url?tns_server_url:TNS_SERVER_URL
        this.options = options ? options:defaultOptions
        this.chunkSize = 150*1024
        this.peerPoolCnt = peerPoolCnt
        this.init()
    }
    init()
    {
        this.roomId = this.roomid
        this.peerMap = new Map()
        this.dataCallBackSession = new Map()
        this.dataCallBackFunctions= new Map()
        this.pingTestCnt = 0
        this.pingTestAllCnt=10
        this.fastPeer = null
        this.socket = null
        this.client =null
        this.wsMap = new Map()
        this.join()
    }
    async join() {
        let that = this,This = this
        if(this.socket) this.leave()

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
        this.client.discover(that.roomId);
    }
    async connectToPeer(peerID) {
        let that = this
        if (peerID == that.socket.id) return;
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
            console.log('Error connecting to peer:'+e);
            this.init()
        }
    }
    dataCallBack(peer,data)
    {
        if(this.dataCallBackFunctions.has(data.callid))
        {
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
    async download(params,end){
        if(!this.lockDownload){
            this.lockDownload = true
            setTimeout(()=>this.lockDownload = false,3000)
        }
        else{
            console.log('download is lock')
        }
        let This = this;
        let peerNow = this.fastPeer
        if(!peerNow) this.client.peers().forEach(peer => {peerNow=peer})

        let iCnt = 0,begin = 0,len = this.chunkSize, dataList = [],recved_slice_size = 0//,fileInfo = null150*1024*1
        params.len = len
        // let callData = {callid:new Date().getTime()+'.'+parseInt(Math.random()*1000000000),url:'/file/download',
        //                     max_len:0,len:0,pos:0,max_pos:0,data:params}
        let begin_time = new Date().getTime()
        let unfast_mode = false;
        let fileInfo = null
        while(params)
        {
            params.begin = begin
            params.len = len //滑动窗口控制（当data.muti_recved_cnt<=0时，则+=this.chunkSize，如果>=3则减少一个单位chunkSize
            let data = await new Promise((resolve)=>
            {
                This.sendData(peerNow,'/file/download',params,null,function(readData){
                    resolve(readData)
                })
                //setTimeout(()=>resolve(null),6000)
            })
            fileInfo = data && !fileInfo  && data.fileInfo? data.fileInfo : fileInfo
            console.log('fileInfo:'+JSON.stringify(fileInfo)+' data.len:'+data.data.length) 
            if(!peerNow._pc) {
                console.log('peerNow is closed!')
                dataList =null
                break
            }
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
            recved_slice_size+= data.data.length
            console.log('data-list-cnt:'+ dataList.length+' iCnt:'+iCnt)
            console.log('recved_slice_size:'+recved_slice_size+' begin:'+begin+' file.size:'+fileInfo.size)
            //已收集到足够的结果-----这个是确认成功的结果
            if(recved_slice_size>=data.fileInfo.size)
            {
                console.log('end the download now:'+data.begin_str)
                if(data.begin_str!='=file')
                {
                    if(typeof end == 'function') end(data)
                }else if(data.begin_str=='=file'){
                    let u8arr = new Uint8Array(data.fileInfo.size),s=0
                    for(let i=0;i<dataList.length;i++){
                        u8arr.set(dataList[i].data,s)
                        s += dataList[i].data.length
                        delete dataList[i].data
                    }
                    data.data = u8arr
                    if(s!=data.fileInfo.size)
                    {
                        console.log('reved-size:'+s+' not ok, need file.size:'+data.fileInfo.size)
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
    sendImage(fileInfo,callback){
        let peerNow = this.fastPeer
        if(!peerNow) this.client.peers().forEach(peer => {peerNow=peer})

        let params =Object.assign({}, fileInfo)
        delete params.data
        fileInfo.params = params
        let rdata = fileInfo.data 
        delete fileInfo.data //put to the rdata ( in order to split )

        if(fileInfo.encoding!='fromfile_binary')
            this.sendData(peerNow,'/image/upload',rdata,fileInfo,callback)
        else
            this.sendDataBinary(peerNow,'/image/upload',rdata,fileInfo,callback)//sendDataBinaryD
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
    async sendData(peer,url,rdata,fileInfo=null,callback=null)
    {
        if(!peer || !peer._pc){
            console.log('peer is closed??!!!')
            return 
        }
        //let rdataStr = JSON.stringify(rdata)
        let jsonStr =fileInfo?rdata: JSON.stringify(rdata);//JSON.stringify(rdata).length
        let backData = {callid:new Date().getTime()+'.'+parseInt(Math.random()*1000000000),url,
                            max_len:jsonStr.length,len:jsonStr.length,pos:-1,max_pos:-1,fileInfo,data:rdata}
        if(callback) this.dataCallBackFunctions.set(backData.callid,callback)
        //if(fileInfo) backData.fileInfo = fileInfo
        console.log('sendData()-jsonStr-length:'+jsonStr.length)
        console.log('maxPkgSize:'+peer._pc.sctp.maxMessageSize)
        try{
            if(jsonStr.length<peer._pc.sctp.maxMessageSize-1024*10){
                //while(peer._channel.readyState!='open') await str_filter.sleep(5)
                while(peer._channel.bufferedAmount>10*1024*1024) await this.sleep(5)
                peer.send(JSON.stringify(backData))//jsonStr)
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
                    peer.send(JSON.stringify(backData))
                }
            }
        }catch(ex){
            console.log('peer.send-exception:'+ex)
        }
    }
    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    onPeer(peer) {
        var that = this, This = this
        that.log('onPeer1111');
        this.peerMap.set(peer.channelName,peer)
        peer.on('error', (err) => {
                that.log('peer error ', err);
                try{
                    that.client.peers().forEach((peer)=>peer.destroy())
                    that.socket.close()
                }catch(ex){
                    console.log('destroy all peers')
                }
                // setTimeout(function(){
                console.log('[restart]reconect peers,socket,etc...')
                that.init()
            });

        peer.on('connect', () => {
            console.log('peer is connected,pingTestCnt:'+This.pingTestCnt)
            // This.peerMap.set(peer.channelName,peer)
            if(This.pingTestCnt<=1)
            {
                console.log('call peerRefreshCallback')
                if(typeof This.peerRefreshCallback =='function'){
                    This.peerRefreshCallback()
                }
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
        this.client.peers().forEach(peer => {peer.removeAllListeners();peer.destroy()})
        this.client.destroy();
        this.client = null;
        this.socket.destroy();
        this.socket = null;
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
