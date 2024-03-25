const io = require('socket.io-client')
const SimpleSignalClient = require('simple-signal-client')
// For testing on node, we must provide a WebRTC implementation
const wrtc = require('wrtc')
const str_filter = require('./libs/str_filter')
const file_util = require('./libs/file_util')
const { resolve } = require('bluebird')
const TNS_SERVER_URL = 'https://groupbuying.opencom.cn:441'//'http://127.0.0.1:3000'// 'http://127.0.0.1:3000'//

const iceconfig = {
    iceServers: [
      {
        urls: [
            'turn:groupbuying.opencom.cn:3478',
          ],
          username: 'user1',
          credential: 'YjXverJx231vJPok',
      }
    ],
    sdpSemantics: 'unified-plan'
  }
const defaultRoomid = 'room'
const defaultOptions = { wrtc,forceNew:true,reconnection: true,timeout:3000,rejectUnauthorized: false,
    transports: ['polling', 'websocket'],config:iceconfig }

const defaultRPCName = 'default'
class RTCService
{
    constructor(roomid,tns_server_url,options)
    {
        this.roomid = roomid ? roomid:defaultRoomid
        this.tns_server_url = tns_server_url?tns_server_url:TNS_SERVER_URL
        this.options = options ? options:defaultOptions
        this.options.wrtc = wrtc
        this.initSvr()
    }
    // setRPC(rpc,name=defaultRPCName)
    // {
    //     this.rpcMap.set(name,rpc)
    //     //this.rpc = rpc
    // }
    // rpc(name=defaultRPCName){
    //     return this.rpcMap.get(name)
    // }

    all(url,...etc)
    {
        this.rounterMap.set(url,async function(req,res){
            let i = 1, flag = true
            while(etc[i] && flag){
                if(i!=etc.length-1)
                {
                    flag = false
                    await new Promise((resolve)=>{
                        etc[i](req,res,function(){
                            flag = true
                            resolve(true)
                        })
                        setTimeout(()=>resolve(false),60000)
                    })
                }
                else etc[i](req,res)
                i++
            }
        })
    }


    initSvr()
    {
        if(this.socket){
            this.socket.close()
        }
        this.socket =  io.connect(this.tns_server_url,this.options)
        this.dataCallBackSession = new Map()
        this.rpcMap = new Map()
        this.rounterMap = new Map()

        let This =this;
        this.socket.on("connection", (socket) => {
            console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
          });
        this.socket.on("connect_error", (err) => {
            //reconnection: true  保证了自动重连
            console.log('connect_error:'+JSON.stringify(err))
            // setTimeout(()=>This.initSvr(),3000)
        });
          
        // client-side
        this.socket.on("connect", () => {
            console.log('socket-connected:'+This.socket.id); // ojIckSD2jqNzOqIrAGzL

            //重连之后，要汇报当前的socket-id @2022-12-14-2
            this.client.discover(this.roomid+'::host')
        });
        
        console.log('io-connect:yes')
        this.client = new SimpleSignalClient(this.socket)
        console.log('SimpleSignalClient:yes')
        this.peerMap = new Map()
        
        this.client.on('request', async (request) => {
            console.log('request.initiator:'+JSON.stringify(request.initiator))
            console.log('request.metadata:'+JSON.stringify(request.metadata))
        
            // const { peer, metadata } = await request.accept({ test: 'b' }, config)
            // peer.on('connect', () => { // connect event still fires
            // })
        
            console.log('requested', request)
            const { peer } = await request.accept({}, This.options)
            let obj = {remoteAddress:peer.remoteAddress,remotePort:peer.remotePort}
            console.log('accepted:'+ JSON.stringify(obj));
            // if(obj.remoteAddress)
                This.onPeer(peer)
            // else{
            //-----------2022-12-14不再创建多个peer（特别是host-client方向的peer）--一个就很稳定可靠
                // if(peer.remoteAddress!='127.0.0.1')
                // setTimeout(async function(){
                //     let newPeer = await This.connectToPeer(request.initiator)
                //     console.log('newPeer:'+newPeer)
                //     This.onPeer(newPeer)
                // },1500)
            // }
            //     try{
            //         peer.destroy()
            //     }catch(ex){console.log('peer.destory()-ex:'+ex)}
            // }
        })

        this.client.discover(this.roomid+'::host')
    }

    async connectToPeer(peerID) {
        if (peerID == this.socket.id) return;
        try {
            console.log('Connecting to peer');
            const { peer } = await this.client.connect(peerID, this.roomid, this.options);
            this.peerMap.set(peer.channelName,peer)//将peer保存在map中，避免被回收。
            this.onPeer(peer)
            return peer
        } catch (e) {
            console.log('Error connecting to peer:'+e);
            return null;
        }
    }

    async getCallSessionData(data)
    {
        // let This = this
        let posKey = data.callid+':'+data.pos
        let writerKey = data.callid+':writer'
        let lastData = this.dataCallBackSession.get(data.callid)
        if(lastData=='') return //判断是否被清空，代表是重传的数据，不保存
        if(!lastData){ 
            data.recved_list = [data]
            this.dataCallBackSession.set(data.callid,data)
            this.dataCallBackSession.set(posKey,data)//first element
            lastData = data
            lastData.recved_size = data.len
            if(data.begin_str=='=file'){
                let file_temp = __dirname + '/file_temp/'+data.callid+'-'+Math.random()
                let stream = require('fs').createWriteStream(file_temp)
                let writer = {nowPos:-1,file_temp,stream,fileInfo:data.fileInfo,saved_size:0}
                this.dataCallBackSession.set(writerKey,writer)

                stream.on('open', () => {
                    console.log('文件已被打开', stream.pending)
                })
                stream.on('ready', () => {
                    console.log('文件已为写入准备好', stream.pending)
                })
                stream.on('close', () => {
                    console.log('文件已被关闭')
                    console.log("总共写入:"+ stream.bytesWritten)
                    console.log('写入的文件路径是'+ stream.path)
                    if(typeof stream.endCallback == 'function')
                    {
                        console.log('call stream-endCallback function now!')
                        stream.endCallback()
                    }else{
                        console.log('do not have stream-endCallback function, stream may close not correct??!!!')
                    }
                })
            }
            // //如果长期收不到消息，将自动清理（因udp速度传输非常快，如果30s都恢复不了，则清理掉session-data--避免内存满）
            // let xid = setInterval(function(){
            //     let usedTime = new Date().getTime() - lastData.callsession_last_update_time
            //     if(usedTime >=30000)
            //     {
            //         clearInterval(xid)
            //         console.log('[notice]some error happen: we will clear the call-session-data:'+lastData.callid)
            //         This.dataCallBackSession.delete(xid)
            //     }
            // },5000)
        }else{
            lastData.recved_size0 += data.len
            if(this.dataCallBackSession.has(posKey))
                console.log('this pos is recved, posKey:'+posKey)
            else{
                lastData.recved_size += data.len
                lastData.recved_list.push(data)
                this.dataCallBackSession.set(posKey,data)//not first element
            }   
        }
        lastData.callsession_last_update_time = new Date().getTime()

        let recved_list=  lastData.recved_list
        let writer = this.dataCallBackSession.get(writerKey)
        //遍历快速写入数据
        if(data.begin_str=='=file' && this.dataCallBackSession.has(writerKey)){
            let {nowPos,stream} = writer
            //先写入当前试试（如果pos不对，再遍历查询一次至多次）
            nowPos++//查找下一个
            let nowData = data.pos == nowPos ? data : null
            while(this.dataCallBackSession.has(data.callid+':'+nowPos)){//原来是true
                if(!nowData) nowData = this.dataCallBackSession.get(data.callid+':'+nowPos)
                // for(let i=0;i<recved_list.length;i++){ //因为没有排序之前，是乱序的，所有i=0开始查找
                //     if(nowPos == recved_list[i].pos){
                //         nowData = recved_list[i]
                //         break
                //     }
                // }
                if(nowData){ //成功写入数据
                    stream.write(nowData.data)
                    writer.saved_size += nowData.data.length
                    console.log('当前写入：'+nowData.data.length)
                    this.dataCallBackSession.set(data.callid+':'+nowPos,'') //清理掉关联映射的data，但是依然保留pos位置判断
                    writer.nowPos++ //成功的计数
                    nowPos++//查找下一个
                    delete nowData.data //释放内存
                    nowData.data = null
                    nowData = null
                }
                else{
                    console.log('unmatch pos:'+nowPos)
                    break
                } 
            }
        }

        if(data.max_pos == lastData.recved_list.length)
        {
            let newDataStr ='' //, u8arr = data.begin_str=='=file' ?  new Uint8Array(data.fileInfo.size):null
            recved_list.sort((a,b)=>{
                return a.pos - b.pos
            })
            if(lastData.begin_str!='=file'){
                for(let i=0,s=0;i<recved_list.length;i++)
                {
                    if(recved_list[i].pos!=i){
                        console.log('recved_list-data-error, by callid:'+recved_list[i].callid+' pos:'+i+' need-pos:'+lastData.recved_list[i].pos)
                        break;
                    } 
                    //处理binary-file
                    // if(u8arr){
                    //     let tmpData = recved_list[i].data //避免多次对象访问（减少速度损耗）
                    //     let n = tmpData.length
                    //     u8arr.set(tmpData,s)//直接复制
                    //     // for(let k=0;k<n;k++){
                    //     //     u8arr[s+k] = tmpData[k]
                    //     //     //if(k%10000 ==0) console.log('s:'+s +' now-k:'+k)
                    //     // }
                    //     s+=n
                    //     delete recved_list[i].data
                    // }
                    // else 
                    newDataStr += recved_list[i].data

                    this.dataCallBackSession.delete(recved_list[i].callid+':'+i)
                }
            }
            else{
                if(writer.nowPos+1!= lastData.max_pos || data.fileInfo.size != writer.saved_size)
                {
                    console.log('recved_list-data-error, unsaved enough data. now-saved-size:'+writer.saved_size+' need:'+data.fileInfo.size)
                }
                //等待文件正确的写入完整，然后关闭之。
                await new Promise((resolve)=>{
                    writer.stream.endCallback = function(){
                        resolve(true)
                    }
                    writer.stream.end()
                    writer.stream.close()
                })
            }
            delete data.data
            delete lastData.recved_list
            
            console.log('recved-data-info:'+JSON.stringify(data))
            if(data.begin_str =='=file') data.fileInfo.file_temp = writer.file_temp
            else data.data = this.parseJSON( newDataStr)//u8arr ? u8arr : this.parseJSON( newDataStr)//this.parseJSON( newDataStr)
            console.log('recved-data-info:'+JSON.stringify(data))
            // this.dataCallBackSession.delete(data.callid)
            this.dataCallBackSession.set(data.callid,'') //清空了
            // let This = this
            // setTimeout(function(){ //10s后再清理，因为有部分重传的包会导致重复出现文件打开和写入问题（网络不好的情况下问题较严重）
            //     delete lastData.recved_list
            //     This.dataCallBackSession.delete(data.callid)
            // },10000)

            console.log('recved-all-data:'+(data.fileInfo ? data.fileInfo.size:newDataStr.length))
            // let recvedData
            // console.log('recved-all-data:'+JSON.stringify(data).substring(0,10))
            return data;
        }

        return null;
    }
    async dataCallBack(peer,xdata)
    {
        let This = this
        // let xdata = this.parseJSON(data)
        let callid = xdata.callid
        console.log('dataCallBack-xdata-url:'+xdata.url+' callid:'+callid)
        if(xdata.url )//&& xdata.url.indexOf('/')==0)
        {
            let req = {params:xdata.data,files:[xdata.fileInfo]}
            if(xdata.fileInfo && xdata.fileInfo.size>0 && xdata.fileInfo.filename)
            {
                xdata.fileInfo.data = xdata.data
                delete xdata.data
                req.params = xdata.fileInfo.params //recover from the fileInfo
                //let fileInfo = {fieldname:"file",originalname:nowFile.name,mimetype:nowFile.mimetype,filename:nowFile.name,path:'file-path',size:nowFile.size,
                //data:base64file.substring(base64file.indexOf(',')+1,base64file.length)}
                xdata.fileInfo.originalname = xdata.fileInfo.originalname ? xdata.fileInfo.originalname : xdata.fileInfo.filename
                if(xdata.begin_str=='=file')
                {
                    //已经流式写入，不需要在一个地方统一写入了（减少时间等待和内存损耗）2022-12-6
                    xdata.fileInfo.path =  xdata.fileInfo.file_temp//
                    delete xdata.fileInfo.file_temp //删除掉
                }else{
                    //转存文件(base64)
                    let buff =  Buffer.from(xdata.fileInfo.data, 'base64'); 
                    let file_temp = __dirname+'/../dnalink.rpc/superdimension/file/file_temp/'+xdata.callid+'.'+Math.random()
                    xdata.fileInfo.path =  file_temp//在上述地方采用random来防止多个写入导致了问题
                    await file_util.writeFile(file_temp,buff) //wait write file end!
                }
                delete xdata.fileInfo.data // must delete , if not ,will save to the token-chain-opval-fileInfo
            }
            let res = {}
            let func =async function(rdata,fileInfo=null)
            {
                if(!peer._pc){
                    console.log('peer is closed??!!!')
                    return 
                }
                //let rdataStr = JSON.stringify(rdata)
                let jsonStr =fileInfo?rdata: JSON.stringify(rdata);//JSON.stringify(rdata).length
                let backData = {callid,max_len:jsonStr.length,len:jsonStr.length,pos:-1,max_pos:-1,fileInfo,data:rdata}
                //if(fileInfo) backData.fileInfo = fileInfo
                console.log('token_op_block-res.json:'+jsonStr.length)
                console.log('maxPkgSize:'+peer._pc.sctp.maxMessageSize)
                try{
                    if(jsonStr.length<peer._pc.sctp.maxMessageSize-1024*10){
                        //while(peer._channel.readyState!='open') await str_filter.sleep(5)
                        while(peer._channel.bufferedAmount>10*1024*1024) await str_filter.sleep(5)
                        //console.log('req.url:'+req.url+' ret-json:'+JSON.stringify(backData))
                        peer.send(JSON.stringify(backData))//jsonStr)
                    }
                    else{
                        console.log('into split rdata')
                        //peer.send(JSON.stringify({callid,data:{ret:false,msg:'json-length too length,size:'+jsonStr.length}}))
                        let rdataTmpSize =parseInt(peer._pc.sctp.maxMessageSize/2)+50*1024// parseInt((peer._pc.sctp.maxMessageSize+1023)/1024)*1024/2;// -1024*60 ;//1024*160// parseInt(peer._pc.sctp.maxMessageSize*3/2)//-128
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
                            while(peer._channel.bufferedAmount>10*1024*1024) await str_filter.sleep(5)
                            peer.send(JSON.stringify(backData))
                        }
                    }
                }catch(ex){
                    console.log('peer.send-exception:'+ex)
                }
            }
            res.json = res.file = func
            res.stream = async function(rdata,pos,max_pos,fileInfo)
            {
                if(!peer._pc){
                    console.log('peer is closed??!!!')
                    return 
                }
                if(pos==-1)
                {
                    console.log('res.stream end.')
                    return 
                }
                //let rdataStr = JSON.stringify(rdata)
                let jsonStr =rdata//: JSON.stringify(rdata);//JSON.stringify(rdata).length
                let backData = {callid,max_len:fileInfo.size,
                    len:parseInt(rdata.length/4*3),pos,max_pos,fileInfo,data:rdata}
                //if(fileInfo) backData.fileInfo = fileInfo
                console.log('res.stream:'+jsonStr.length)
                console.log('maxPkgSize:'+peer._pc.sctp.maxMessageSize)
                try{
                    if(jsonStr.length<peer._pc.sctp.maxMessageSize-1024*10)
                    {
                        //while(peer._channel.readyState!='open') await str_filter.sleep(5)
                        while(peer._channel.bufferedAmount>10*1024*1024) await str_filter.sleep(5)
                        console.log('req.url:'+req.url+' ret-stream:'+rdata.length)
                        peer.send(JSON.stringify(backData))//jsonStr)
                    }else{
                        console.log('res.stream error:maxPkgSize > peer._pc.sctp.maxMessageSize??!!')
                    }
                }catch(ex){
                    console.log('peer.send-exception:'+ex)
                }
            }
            //未经base64转码的二进制字节流
            res.streamByte = async function(rdata,pos,max_pos,fileInfo)
            {
                if(!peer._pc){
                    console.log('peer is closed??!!!')
                    return 
                }
                if(pos==-1)
                {
                    console.log('res.stream end.')
                    return 
                }
                //let rdataStr = JSON.stringify(rdata)
                //let jsonStr =rdata//: JSON.stringify(rdata);//JSON.stringify(rdata).length
                let backData = {callid,max_len:fileInfo.size,
                    len:rdata.length,pos,max_pos,fileInfo}
                let jsonStr = JSON.stringify(backData)
                let jsonBuff= Buffer.from(jsonStr,'utf8')
                let strBegin = '=file'
                let writeBuffer = Buffer.alloc(strBegin.length+2+(''+jsonBuff.length).length//原来是jsonStr.length，这里在遇到utf8时有ubg
                    +(''+rdata.length).length)//+jsonStr.length)//+rdata.length)
                writeBuffer.write(strBegin,0,strBegin.length,'ascii')
                writeBuffer.writeUInt8((''+jsonBuff.length).length,strBegin.length)//write-length-string.size
                writeBuffer.writeUInt8((''+rdata.length).length,strBegin.length+1)
                writeBuffer.write(''+jsonBuff.length,strBegin.length+2,(''+jsonBuff.length).length,'ascii')//write-length-string
                writeBuffer.write(''+rdata.length,strBegin.length+2+(''+jsonBuff.length).length,
                    strBegin.length+2+(''+jsonBuff.length).length+(''+rdata.length).length,'ascii')
                //writeBuffer.write(jsonStr,'utf8')
                writeBuffer = Buffer.concat([writeBuffer, jsonBuff,rdata])

                //if(fileInfo) backData.fileInfo = fileInfo
                console.log('res.streamByte:'+writeBuffer.length)
                console.log('maxPkgSize:'+peer._pc.sctp.maxMessageSize)
                try{
                    if(writeBuffer.length<peer._pc.sctp.maxMessageSize-1024*10)
                    {
                        //while(peer._channel.readyState!='open') await str_filter.sleep(5)
                        while(peer._channel.bufferedAmount>10*1024*1024) await str_filter.sleep(5)
                        console.log('req.url:'+req.url+' ret-stream-len:'+writeBuffer.length)
                        peer.send(writeBuffer)//jsonStr)
                    }else{
                        console.log('res.stream error:maxPkgSize > peer._pc.sctp.maxMessageSize??!!')
                    }
                }catch(ex){
                    console.log('peer.send-exception:'+ex)
                }
                // await str_filter.sleep(100)
            }
            // this.rpc.token_op_block(req,res)
            if(!xdata.rpc_name)//优先从req中读取。
                req.rpc_name = xdata.url.indexOf('::')>0 ? xdata.url.split('::')[0]:defaultRPCName
            else req.rpc_name = xdata.rpc_name
            req.url = xdata.url.indexOf('::')>0 ?xdata.url.split('::')[1]:xdata.url
            
            //由于websocket的Link连接使用的是token校验，不需要使用common_interceptor进行鉴权
            ///groupchat/ws/svr  ---聊天室。
            ///userchatlist/ws/svr  用户列表
            if(req.url.indexOf('/ws/svr')>=0)
            {
                let ws = {ws_token:req.params.token}
                console.log('op-websocket-link-params:'+JSON.stringify(req.params))
                ws.on =function(msg,func){
                    switch(msg){
                        case 'message':
                            peer.wsMessageMap = peer.wsMessageMap ? peer.wsMessageMap:new Map()
                            peer.wsMessageMap.set(ws.ws_token,func)
                            break;
                        case 'close':
                            peer.closeWSList = peer.closeWSList ? peer.closeWSList:[];//break;
                            peer.closeWSList.push({ws,close:func})
                            break;
                        default:console.log('ws.on-'+msg)
                    }
                }
                //返回结果。
                ws.send = function(msg)
                {
                    console.log('ws-send:'+JSON.stringify(msg))
                    msg = This.parseJSON(msg)
                    let msgObj = {ws:true,ws_token:ws.ws_token,data:msg}
                    peer.send(JSON.stringify(msgObj))
                }
                ws.close = function(){
                    console.log('ws-close is called! on peer we will do nothing !!!')
                }
                ws.closePeer=function(){
                    console.log('peer-ws-close is called!')
                    if(peer && peer.wsMessageMap)
                    peer.wsMessageMap.delete(ws.ws_token)

                    let closeWSList = peer.closeWSList
                    let tmpCloseWSList = []
                    for(let i=0;closeWSList&& i<closeWSList.length;i++ )
                    {
                        let tmp = closeWSList[i]
                        if(tmp.ws != ws) tmpCloseWSList.push(tmp)
                    }
                    peer.closeWSList = tmpCloseWSList
                }
                if(this.groupchat_c)
                    return this.groupchat_c.websocket_add_listener(ws,req)  //this.rpc.websocket_c.svr_service(ws,req)       
                else
                    return res.json({ret:false,msg:'[error]can not find matched-groupchat-websocket-controller'})
            }else{
                //先进行common_interceptor的过滤器和权限判断（含web3）2022-12-2
                console.log('now call common_interceptor, rpc_name:'+req.rpc_name+' req.url='+req.url)
                if(this.rounterMap.has(req.url))
                {
                    let func = this.rounterMap.get(req.url)
                    if(typeof func =='function')
                    {
                        func(req,res)
                    }
                    else res.json({ret:false,msg:'[error]url-router-func is not function'})
                }else{
                    res.json({ret:false,msg:'[error]url-router unmatch  url:'+req.url})
                }
            }   
        }
    }
    //关联
    setChatC(groupchat_c)
    {
        this.groupchat_c = groupchat_c
    }
    onPeer(peer) {
        try{
            var This = this;
            console.log('onPeer1111');
            peer.on('error',(err)=>{
                console.log('error:'+err)
            })
            peer.on('close', () => {
                console.log('rtc-peer-close now!')
                This.peerMap.delete(peer.channelName)

                let closeWSList = peer.closeWSList
                for(let i=0;closeWSList&& i<closeWSList.length;i++ )
                {
                   let tmp = closeWSList[i]
                   if(typeof tmp.close == 'function')
                        tmp.close()
                   tmp.ws.closePeer()//这里使用的是closePeer（on-peer里的close()）
                }
            });
            /*let xid = setInterval(() => {
                if(!peer.writable) clearInterval(xid)
                console.log('send msg to peer')
                try{
                    if(peer.localAddress && peer.remoteAddress && peer.writable)
                    peer.send('my-ip:'+peer.localAddress+'('+peer.localPort+') your-ip:'+peer.remoteAddress+'('+peer.remotePort+')')
                    // var crypto = require('crypto');
                    // var buf = crypto.randomBytes(1024*30)
                    // peer.send(buf.toString('hex'))
                    //支持发送大文本数据
                }catch(ex)
                {
                    console.log('ex:'+ex)
                    console.log(peer)
                    clearInterval(xid)
                }
            }, 3000);
    
            peer.on('data',(data)=>{
                    console.log('recv data:'+data)
                    if(data.indexOf('recv')<0 && peer.writable)
                    peer.send('recved---'+data)
                    // that.log(peer)
                })
                */
            peer._channel.onerror = (event) => { 
                console.log('_channel.onerror',event)
            };
            peer.on('data', async (data)=>{
                console.log('recv data:'+data.length)//+' is:'+data.slice(0,2).indexOf('{'))
                if(data.slice(0,2).indexOf('{')==0)//.indexOf('{')==0)
                {
                    data = This.parseJSON(data)
                    console.log('data-ws_token:'+data.ws_token)
                    if(data.ws_token && (data.ws_token).length>12)//判断是否是websocket的标志。
                    {
                        if(!peer.wsMessageMap){
                            peer.send(JSON.stringify({ws_token:data.ws_token,
                                ret:false,msg:'websocket not link'}))
                            return 
                        }
                        let recv = peer.wsMessageMap.get(data.ws_token)
                        if(typeof recv !='function'){
                            peer.send(JSON.stringify({ws_token:data.ws_token,
                                ret:false,msg:'websocket not link, recv-function undefined'}))
                            return 
                        }
                        //收到消息
                        recv(data.msg)
                    }
                    //处理普通消息----主要是其他的url的其他消息
                    else{
                        if(data.len == data.max_len){
                            This.dataCallBack(peer,data)
                        }else{
                            let receivedData= await This.getCallSessionData(data)
                            console.log('receivedData:'+JSON.stringify(receivedData))
                            if(receivedData){
                                This.dataCallBack(peer,receivedData)
                            }
                        }
                    }
                }else if(data.slice(0,8).indexOf('=file')==0){
                    console.log('recv-binary:'+data.length)
                    // console.log('typeof'+(typeof data))
                    let strBegin='=file'
                    let paramsSize =data.readUInt8(strBegin.length)//strBegin.length]// parseInt()
                    let pkgSize = data.readUInt8(strBegin.length+1)//data[strBegin.length+1]//parseInt(data[])
                    // console.log('paramsSize:'+paramsSize)
                    // console.log('pkgSize:'+pkgSize)

                    let paramLength = parseInt(data.slice(strBegin.length+2,strBegin.length+2+paramsSize).toString('ascii'))
                    let pkgLength = parseInt(data.slice(strBegin.length+2+paramsSize,strBegin.length+2+paramsSize+pkgSize).toString('ascii'))
                    // console.log('paramLength:'+paramLength)
                    // console.log('pkgLength:'+pkgLength)
                    
                    let paramStr = data.slice(strBegin.length+2+paramsSize+pkgSize,strBegin.length+2+paramsSize+pkgSize+paramLength).toString()
                    let buff = data.slice(strBegin.length+2+paramsSize+pkgSize+paramLength,strBegin.length+2+paramsSize+pkgSize+paramLength+pkgLength)
                    
                    let params = JSON.parse(paramStr)
                    if(strBegin.length+2+paramsSize+pkgSize+paramLength+pkgLength!= data.length && !This.dataCallBackSession.has(params.callid+':'+params.pos))
                    {
                        console.log('read data pkg error! happen on length:'+(strBegin.length+2+paramsSize+pkgSize+paramLength+pkgLength)+' need:'+data.length)
                        console.log('params-len:'+params.len+' buff-length:'+buff.length+' pos:'+params.pos)
                        
                        if(!peer._pc){
                            console.log('peer is closed??!!! send readSlice back')
                            return 
                        }
                        // 这里使用readslice模式进行判断了，不再需要此处逻辑
                        //let strBegin = '=file'

                        // if(This.dataCallBackSession.has(params.callid)){
                        //     console.log('read data pkg error! but this pos has already recved, pos='+params.pos)
                        //     return 
                        // } 

                        let strParams = JSON.stringify({callid:params.callid,read_slice:params.pos})
                        let writeBuffer = Buffer.alloc(strBegin.length+strParams.length)
                        writeBuffer.write(strBegin,0,strBegin.length,'ascii')
                        writeBuffer.write(strParams,strBegin.length,strBegin.length+strParams.length,'ascii')
                        peer.send(writeBuffer)
                        // setTimeout(function(){
                        //     peer.send(writeBuffer)
                        // },100)//100ms后再发送一次，共发送两次（确保能收到readSlice消息）

                        return //这里数据收集不全，不能进入session记录环节，会导致数据包保存为文件时文件大小出错（也会导致下载失败）。
                    }
                    //console.log('params:'+JSON.stringify(params))
                    params.data =buff// btoa(encodeURI(buff))
                    params.begin_str = '=file'
                    
                    let receivedData= await This.getCallSessionData(params)
                    //console.log('receivedData:'+JSON.stringify(receivedData))
                    // let cntID = null, nowListLen = 0, failedCnt = 0
                    if(receivedData){
                        console.log('receivedData:'+JSON.stringify(receivedData))
                        clearInterval(receivedData.cntID)
                        This.dataCallBack(peer,receivedData)
                    }
                    // else
                    {//返回速度计算（每收到一个包，就返回一个确认包，确保上传的正确性
                        let lastData = This.dataCallBackSession.get(params.callid)//params;//
                        if(lastData=='') { //hack the data  ；返回确认的结果（避免使用setTimeout函数）
                            lastData = {callid:params.callid,recved_size:params.max_len,recved_list:{length:params.max_pos}}
                        } 
                        // if(!lastData.cntID)
                        {
                            // lastData.nowListLen = 0
                            // lastData.failedCnt = 0
                            // lastData.cntID = setInterval(function(){
                                if(!peer._pc){
                                    console.log('peer is closed??!!! send cnt back')
                                    return 
                                }
                                //if(!lastData || !lastData.recved_list || lastData.recved_list.length<=1) return 
                                let strBegin = '=file'
                                let strParams = JSON.stringify({callid:lastData.callid,
                                    recved_size:lastData.recved_size,recved_len:lastData.recved_list.length,pos:params.pos})
                                let writeBuffer = Buffer.alloc(strBegin.length+strParams.length)
                                writeBuffer.write(strBegin,0,strBegin.length,'ascii')
                                writeBuffer.write(strParams,strBegin.length,strBegin.length+strParams.length,'ascii')
                                peer.send(writeBuffer)
                                // if(lastData.nowListLen==lastData.recved_list.length) {
                                //     lastData.failedCnt++
                                //     if(lastData.failedCnt>10){
                                //         console.log('failed is count than 10 times, some error happen! failedCnt:'+lastData.failedCnt+' cntID:'+lastData.cntID)
                                //     }
                                //     if(lastData.failedCnt>20){
                                //         let x = clearInterval(lastData.cntID)//自动结束
                                //         console.log('clearInterval-x:'+x)
                                //     } 
                                //     return 
                                // }
                                // lastData.failedCnt =0 
                                // lastData.nowListLen = lastData.recved_list.length
                            // },1000)//1秒返回一次统计结果
                            // console.log('lastData.cntID:'+lastData.cntID+' callid:'+lastData.callid)
                        }
                    }
                }
            })
            this.peerMap.set(peer.channelName,peer)
        }catch(ex)
        {
            console.log('ex:'+ex)
        }
    }
    rpc_index_call(req,res)
    {
        if(!this.rpc(req.rpc_name)) return res.json({ret:false,msg:'inner error:RPC instance not inited'})
        switch(req.url)
        {
            case '/fork':return this.rpc(req.rpc_name).fork_token_block(req,res);
            case '/send':return this.rpc(req.rpc_name).token_send_block(req,res);
            case '/op':return this.rpc(req.rpc_name).token_op_block(req,res);
            case '/chain/query':return this.rpc(req.rpc_name).query_chain(req,res);
            case '/chain/opcode':return this.rpc(req.rpc_name).query_token_chain_bytoken_opcode(req,res);
            case '/chain/relations':return this.rpc(req.rpc_name).query_token_relations(req,res);
            case '/chain/relations/exists':return this.rpc(req.rpc_name).check_token_relations(req,res);
            case '/chain/map/keys':return this.rpc(req.rpc_name).query_token_map_keys(req,res);
            case '/chain/map/values':return this.rpc(req.rpc_name).query_token_map_key_values(req,res);
            case '/chain/map/value':return this.rpc(req.rpc_name).query_token_map_value(req,res);
            case '/chain/token':return this.rpc(req.rpc_name).query_token_chain_bytoken(req,res);
            case '/chain/txid':return this.rpc(req.rpc_name).query_token_chain_bytxid(req,res);
            case '/chain/states':return this.rpc(req.rpc_name).query_token_states(req,res);
            default:
                if(req.url.indexOf('/chain/file/')==0)return this.rpc(req.rpc_name).file_c.download_file(req,res);
                else return res.json({ret:false,msg:'url:'+req.url+' have no rpc-function'})
        }
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
}

module.exports= RTCService