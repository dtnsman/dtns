/**
 * 新增一个DChat聊天管理器（使用了DTNSManager作为网络中台/数据中台,构建多实例的分布式聊天系统
 * --整合dtns.connector的所有的api和功能等）---api版本的dtns.connector(无界面版本)
 * on 2023/3/27
 * 
 * class类名称:分布式聊天管理器(确实是一个管理器)
 * 替代:this.$api.teaback.xxxx等等
 */
class DChatManager{
    constructor(dtnsManager)
    {
        this.dtnsManager = dtnsManager
        this.restart_time = 1000
        this.websocks = new Map()
        this.web3keysMap = new Map()
        this.imDbs = new Map()
        console.log('DChatManager-init:this.websocks',this.websocks)
    }
    //2023-10-7新增
    setViewContext(viewContext)
    {
      this.viewContext = viewContext
    }
    async getWeb3Key(aes256Hash)
    {
        let web3key = this.web3keysMap.get(aes256Hash);
        if(!web3key){
            web3key= await iWalletDb.getDataByKey('web3key_hash:'+aes256Hash)
            if(!web3key) return null
            web3key = web3key.data
            this.web3keysMap.set(aes256Hash,web3key)
        }
        return web3key
    }
    isEncrypted(msg)
    {
      if(msg && msg.indexOf('aes256|')==0 
            && msg.indexOf('|') != msg.lastIndexOf('|'))
      {
        let lastStr = msg.substring('aes256|'.length,msg.length)
        let aes256Hash = lastStr.substring(0,lastStr.indexOf('|'))
        return aes256Hash && aes256Hash.length>10 
      }else{
        return false;
      }
    }
    async getDecryptWeb3Key(msg,chatWeb3Key=null)
    {
      // console.log('getDecryptWeb3Key-msg:',msg)
      if(msg && msg.indexOf('aes256|')==0 
            && msg.indexOf('|') != msg.lastIndexOf('|'))
      {
        let lastStr = msg.substring('aes256|'.length,msg.length)
        let aes256Hash = lastStr.substring(0,lastStr.indexOf('|'))
        if(aes256Hash && aes256Hash.length>10 )
        {
          if(chatWeb3Key && aes256Hash == await sign_util.hashVal(chatWeb3Key) )
          {
            return chatWeb3Key 
          }else{
            let web3key = await this.getWeb3Key(aes256Hash)
            if(web3key)
            {
              return web3key
            }else{//从网络中同步和获取
              console.log('【notice】aes-web3key do not in iWalletDb, need load from network ')
            //   this.$toast('【notice】aes-web3key do not in iWalletDb, need load from network ')
              return null
            }
          }
        }
      }
      return null
    }
    async decryptMsgInfo(msg,chatWeb3Key = null)
    {
      // console.log('decryptMsgInfo-msg:',msg)
      if(msg && msg.indexOf('aes256|')==0 
            && msg.indexOf('|') != msg.lastIndexOf('|'))
      {
        let lastStr = msg.substring('aes256|'.length,msg.length)
        let aes256Hash = lastStr.substring(0,lastStr.indexOf('|'))
        let xmsg = lastStr.substring(lastStr.indexOf('|')+1,lastStr.length)
        if(aes256Hash && aes256Hash.length>10 )
        {
          if(chatWeb3Key && aes256Hash == await sign_util.hashVal(chatWeb3Key) )
          {
            let {iv,aeskey} = sign_util.decodeWeb3keyAes256Str(chatWeb3Key)
            let text = await sign_util.decryptMessage(await sign_util.importSecretKey(aeskey),iv,xmsg)
            msg = text
            return msg
          }else{
            let web3key = await this.getWeb3Key(aes256Hash)
            if(web3key)
            {
              let {iv,aeskey} = sign_util.decodeWeb3keyAes256Str(web3key)
              let text = await sign_util.decryptMessage(await sign_util.importSecretKey(aeskey),iv,xmsg)
              msg = text
              return msg
            }else{//从网络中同步和获取
              console.log('【notice】aes-web3key do not in iWalletDb, need load from network ')
            //   this.$toast('【notice】aes-web3key do not in iWalletDb, need load from network ')
              return msg
            }
          }
        }
      }
      return msg
    }
    notice_user_ws_status(status)
    {
        console.log('DChatManager:into notice_user_ws_status,',status)
        // const client = window.rpc_client
        // user_keepalive = websock && client.qWS(websock.ws_token) ? 1:0//status;
        // for(let i=0;i<user_keepalive_funcs.length;i++)
        // {
        //     // console.log('user_keepalive_funcs:'+user_keepalive_funcs[i])
        //     user_keepalive_funcs[i](user_keepalive)
        // }
    }
    async initWebSocket(web3name){
        let websock = this.websocks.get(web3name)
        console.log('DChatManager:into initWebSocket function',websock,web3name)
        const client =await this.dtnsManager.connect('dtns://web3:'+web3name)
        console.log('DChatManager:initWebSocket-client:',client,client?client.roomid:'web3name is null')
        if(websock && client.qWS(websock.ws_token))
        {
            this.notice_user_ws_status(user_keepalive)
            return ;
        }
        // if(typeof(WebSocket) === "undefined"){
        //     console.error("您的浏览器不支持WebSocket")
        //     return false
        // }
        let This = this
        try{
            let sessionInfo = await iSessionDb.getDataByKey('session:'+web3name)
            if(!sessionInfo){
                console.log('DChatManager:sessionInfo is null,web3name:',web3name)
                return ;
            }
            sessionInfo = sessionInfo.data
            let params = {user_id:sessionInfo.user_id,s_id:sessionInfo.s_id};
            let tokenRet = await this.dtnsManager.run('dtns://web3:'+web3name+'/chat/ws/user/listen',params);//token
            console.log('DChatManager:index.js-websocket-lisenret:',tokenRet)
            if(tokenRet && tokenRet.ret && tokenRet.listen_token)
            {
                // let wsuri = urls.ws_host_path_0+'/userchatlist/ws/svr?token='+tokenRet.listen_token;
                client.setWs(tokenRet.listen_token,function(data){
                    This.websocketonmessage(data,web3name)
                })
                client.setPeerRefreshCallback(function(){
                    This.initWebSocket();
                    // if(typeof initChatWebsocket == 'function')
                    // {
                    //     initChatWebsocket()
                    // }
                })
                this.dtnsManager.run('dtns://web3:'+web3name+'/userchatlist/ws/svr',{token:tokenRet.listen_token})
                websock =  {ws_token:tokenRet.listen_token}
                this.websocks.set(web3name,websock)
                // websock = new WebSocket(wsuri)
                // websock.onopen = websocketonopen
                // websock.onmessage = websocketonmessage
                // websock.onerror = websocketonerror
                // websock.onclose = websocketclose
            }else{
                console.log('DChatManager:initWebSocket-get-ws-token failed:'+JSON.stringify(tokenRet))
                websock  = null;
                this.websocks.delete(web3name)
                setTimeout(this.initWebSocket,this.restart_time);
            }   
        }catch(ex){
            websock = null
            this.websocks.delete(web3name)
            console.log('DChatManager:start websocket-exception:'+ex)
            setTimeout(this.initWebSocket,this.restart_time);
        }
    }
    async websocketonmessage(e,web3name){ 
        let data = e// e.data;
        console.log('DChatManager:backgroud-index----websocketonmessage:',data,web3name)
    
        this.user_keepalive = 1;
        this.notice_user_ws_status(this.user_keepalive)
    
        let dataJson = data;
        if(!data.msg)
        try{
            dataJson = JSON.parse(data)
        }catch(ex){
            // console.log('dataJson parse failed:'+ex)
        }
    
        // console.log('dataJSON:'+JSON.stringify(dataJson))
        // if(newMsgObjFunc) newMsgObjFunc(dataJson)
        // else console.log('newMsgObjFunc is undefined')
        let need_public_key = null
        let private_key = null
        let msgObj = null;
        if(dataJson.opval.type=='text')
        {
            try{
                msgObj = JSON.parse(dataJson.opval.msg)
            }catch(Ex){
            }
            console.log('DChatManager:msgObj:',msgObj)
            if(msgObj.notice_msg_type=='query_ecc_keys_notice')
            {
                need_public_key = msgObj.need_public_key

                let keys = await iWalletDb.getAllDatas()
                console.log('keys:',keys)
                for(let i=0;i<keys.length;i++)
                {
                    if(keys[i].data && !keys[i].data.public_key)
                    {
                        try{
                            keys[i].data.public_key =  key_util.getPublicKey( keys[i].data.private_key )
                            iWalletDb.deleteDataByKey(keys[i].key)
                            iWalletDb.addData({key:keys[i].key,data:keys[i].data})
                            console.log('recreate-public_key:',keys[i])
                        }catch(exx){}
                    }
                    if(keys[i].data && keys[i].data.public_key == need_public_key)
                    {
                        private_key = keys[i].data.private_key
                        console.log('finded private-key from iWalletDb:'+private_key)
                        break;
                    }
                }
            }else if(msgObj.notice_msg_type=='query_ecc_keys_result_notice'){
                //如果得到结果,则解析结果
                let result = msgObj.notice_result
                let decrypt_public_key = msgObj.decrypt_public_key
                let keys = await iWalletDb.getAllDatas()
                console.log('keys:',keys)
                //hack the g_mywallet's bug
                if(!g_mywallet.public_key)
                {
                    try{
                    g_mywallet.public_key = key_util.getPublicKey( g_mywallet.private_key )
                    }catch(exxxx){}
                }
                if(decrypt_public_key == g_mywallet.public_key)
                {
                    private_key = g_mywallet.private_key
                }
                if(!private_key)
                for(let i=0;i<keys.length;i++)
                {
                    if(keys[i].data && keys[i].data.public_key == decrypt_public_key)
                    {
                        private_key = keys[i].data.private_key
                        console.log('finded decrypt_public_key-private-key from iWalletDb:'+private_key)
                        break;
                    }
                }
                if(private_key){
                    let need_private_key = await sign_util.decryptSomethingInfo(result,private_key)
                    let saveKeys = {private_key:need_private_key,public_key:msgObj.need_public_key}
                    iWalletDb.deleteDataByKey('net_mywallet:'+saveKeys.public_key)
                    iWalletDb.addData({key:'net_mywallet:'+saveKeys.public_key,data:saveKeys})//key:net_mywallet
                    console.log('[success]save-keys:',saveKeys)
                }else{
                    console.log('[error]:find decrypt_public_key-private-key failed',private_key)
                }
            }
        }
        console.log('DChatManager:keys:',need_public_key,private_key)
    
        if(bgMp3 && dataJson.txjson && need_public_key && private_key){
            bgMp3.play()
            console.log('DChatManager:call bgMp3.play()')
            if(typeof g_showTips == 'function'){
                //提示授权信息,并发送授权通知
                g_showTips(dataJson.opval.msg,function(){
                    return private_key
                })
            }
        }
        // 在这里使用后端返回的数据，对数据进行处理渲染
    }

    /**
     * 发送DTNS通知
     * @param {*} msgWrapFunc 将消息转码
     * @param {*} failed 
     * @param {*} ok 
     * @returns 
     */
    async sendNotice(msgWrapFunc,failed,ok)
    {
        let mywallet = await iWalletDb.getDataByKey('g_mywallet')
          if(mywallet) mywallet = mywallet.data
          if(!mywallet){
            console.log('[Error]mywallet is empty')
            console.log('【错误】无法获得解析aes-key所用的私钥钱包!')
            // this.$toast('【错误】无法获得解析aes-key所用的私钥钱包!')
            // this.publicKeyNoticeMap.delete(public_key)
            if(typeof failed == 'function') failed('【错误】无法获得解析aes-key所用的私钥钱包!')
            return 
          }

          ///chat/msg/send/text
          ///chat/single
          let sessionInfo =null
          if(rpc_client.roomid =='dtns')
          {
            try{
            sessionInfo = JSON.parse(localStorage.getItem('userInfo'))
            }catch(ex){}
          }else{
            sessionInfo = await iSessionDb.getDataByKey('session:dtns')
            sessionInfo = sessionInfo ? sessionInfo.data:null
          }
          if(!sessionInfo)
          {
            let web3name = 'dtns'
            let timestamp = parseInt( Date.now()/1000)
            let hash = await key_util.hashVal(web3name+':'+timestamp)
            let sign = await key_util.signMsg(hash,mywallet.private_key) //使用的是dtns-device-id设备id的密钥

            //如未登录,则登录之
            sessionInfo = await this.dtnsManager.run('dtns://web3:dtns/user/device/login',{timestamp,web3name,sign})
            iSessionDb.deleteDataByKey('session:'+web3name)
            iSessionDb.addData({key:'session:'+web3name,data:sessionInfo}) 
            iSessionDb.addData({key:'session:'+web3name+':'+Date.now(),data:sessionInfo})
          }
          if(!sessionInfo)
          {
            console.log('【错误】无法发送ecc-private-key的notice授权请求,原因:登录失败!')
            // this.$toast('【错误】无法发送ecc-private-key的notice授权请求,原因:登录失败!')
            // this.publicKeyNoticeMap.delete(public_key)
            if(typeof failed == 'function') failed('【错误】无法发送ecc-private-key的notice授权请求,原因:登录失败!')
            return 
          }
          //发送单聊信息(自己给自己发送通知---多设备同步---优势)
          let chatRet = await this.dtnsManager.run('dtns://web3:dtns/chat/single',
            {user_id:sessionInfo.user_id,s_id:sessionInfo.s_id,user_b:sessionInfo.user_id,random:Date.now()})
          // let cReq = {params:{user_id:obj.user_id,s_id,user_b:obj.user_id,random:Date.now()}}
          if(!chatRet || !chatRet.ret)
          {
            console.log('【错误】无法发送ecc-private-key的notice授权请求,原因:创建通知用的聊天室失败!')
            // this.$toast('【错误】无法发送ecc-private-key的notice授权请求,原因:创建通知用的聊天室失败!')
            // this.publicKeyNoticeMap.delete(public_key)
            if(typeof failed == 'function') failed('【错误】无法发送ecc-private-key的notice授权请求,原因:创建通知用的聊天室失败!')
            return 
          }

          //发送的消息obj内容:请求private_key(请求的public_key对应的private_key,decrypt_public_key为结果解密public_key)
          let nowDeviceInfo = null;
          try{
            nowDeviceInfo = Object.assign({}, sessionInfo)//JSON.parse(localStorage.getItem('userInfo'))
          }catch(exxx){
          }
          // let obj =  {public_key,decrypt_public_key:g_mywallet.public_key,
          //     notice_msg_type:'query_ecc_keys_notice'}
        //   nowDeviceInfo.need_public_key = public_key
        //   nowDeviceInfo.notice_msg_type = 'query_ecc_keys_notice'
        //   nowDeviceInfo.s_id = null//没必要暴露这个session-id(安全起见)
        console.log('DChatManager:msgWrapFunc:',typeof msgWrapFunc)
          if(typeof msgWrapFunc =='function') await msgWrapFunc(nowDeviceInfo)
          let sendNoticeRet = await this.dtnsManager.run('dtns://web3:dtns/chat/msg/send/text',
            {user_id:sessionInfo.user_id,s_id:sessionInfo.s_id,chatid:chatRet.chatid,msg:JSON.stringify(nowDeviceInfo),random:Date.now()})
          console.log('DChatManager:sendNoticeRet:',sendNoticeRet)
          if(!sendNoticeRet|| !sendNoticeRet.ret)
          {
            // this.publicKeyNoticeMap.delete(public_key)
            if(typeof failed == 'function') failed('【错误】发送通知消息失败!')
          }
          if(typeof ok == 'function') ok()
    }
  //拿到私信的chatid
  async talk2user(userb,that)
  {
    that = !that ? this.viewContext : that
    let params = {
      user_id:localStorage.user_id,
      s_id:localStorage.s_id,
      user_b:userb,
      random:Math.random()
    }
    let res = null, singleCache = await imDb.getDataByKey('single-to-'+userb),fromNetFlag = false
    if(singleCache && singleCache.data && 
      (singleCache.data.user_a == userb || singleCache.data.user_b == userb))//该语句避免引入错误的缓存（切换两个账号时出现错误缓存）
    {
      res = singleCache.data
    }else{
      console.log('talk2user-singleCache is empty, load from network')
      res = await that.$api.network.ChatSingle(params)
      fromNetFlag = true
    }
    console.log('talk2user-res:',res,fromNetFlag)
    // alert('chat-res:'+JSON.stringify (res))
    if(!res || !res.ret) return that.$toast.fail('【网络错误】无法联系他/她，可能网络出了问题，麻烦重试')
    if(fromNetFlag){
      imDb.addData({key:'single-to-'+userb,data:res})
    }
    if(res.ret){
      return res.chatid
      // this.$router.push(`/index/chat/${this.token_y}`)
    }else{
      // this.$toast.fail("失败" + res.msg)
      console.log('talk2user failed:',res ? res.msg:'未知网络原因',res)
      return null
    }
  }
  //发送文本消息【通知】给指定的chatid---主要用于订单付款通知【店长】、纯【文本】消息通知（不经aes256加密--主要用于通知）
  async sendTextMsg2User(msg,chatid,that)
  {
    that = !that ? this.viewContext : that
    let params = {
      user_id:localStorage.user_id,
      s_id:localStorage.s_id,
      chatid,
      msg,//this.txt,
      random:Math.random()
    }
    let res =  await that.$api.network.ChatSendText(params)
    console.log('sendTextMsg2User-res:',res)
    return res
  }
  //发送订单已付款的订单消息
  async sendOrderNotice(orderid,xmsg,that)
  {
    that = !that ? this.viewContext : that
    //2023-10-18 自动发送【私信通知】至【店长】
    let params = {
      user_id:localStorage.user_id,
      s_id: localStorage.s_id,
      order_id:orderid
    }
    //查询订单信息
    let res = await that.$api.network.UserShoppingOrderInfo(params)
    console.log('before-sendNotice2owner---query-order-info:',res,params)
    if(!res || !res.ret || !res.shop_id) return false
    let shop_id = res.shop_id

    params = {
      user_id:localStorage.user_id,
      s_id:localStorage.s_id,   
      chatid:shop_id.replace('obj_','msg_'),
    }
    //查询根据订单的shop-id商铺信息
    let shopRet =  await that.$api.network.ChatInfo(params)
    console.log('sendOrderNotice-chatinfo-ret:',shopRet,params)
    if(!shopRet || !shopRet.ret || !shopRet.create_user_id){
        return false
    }
    //根据小店信息，与店长私信--创建了私信chatid（或根据历史纪录得以chatid）
    let chatid = await this.talk2user(shopRet.create_user_id,that)
    console.log('sendOrderNotice---notice-chatid:'+chatid)
    if(!chatid) return false
    //给查询到的chatid发送消息

    let noticeXMSGObj = {xtype:'order_notice',xmsg,orderid}
    let sendRet = await this.sendTextMsg2User(JSON.stringify(noticeXMSGObj),chatid,that)
    console.log('sendOrderNotice--sendRet:',sendRet,noticeXMSGObj)
    if(!sendRet || !sendRet.ret) return false
    return true
  }
  async queryXFileInfo(fileId){
    console.log('queryXFileInfo-fileId:',fileId)
    let item = null
    let cachedFileItem = await ifileDb.getDataByKey(fileId) //dtns://协议的文件依然保存在此
    if(!cachedFileItem || !cachedFileItem.data)
    {
        //不管是谁，均采用此
        let reqUrl = null
        let params = {}
        if(fileId && fileId.startsWith('dtns://')){
            reqUrl = fileId
            params = {user_id:localStorage.user_id,s_id:localStorage.s_id,file_kind:'file'}
        }
        else //使用传统方式进行
        {
            reqUrl = 'dtns://web3:'+rpc_client.roomid+'/file?filename='+fileId
            params = {user_id:localStorage.user_id,s_id:localStorage.s_id,
              filename:fileId,file_kind:'file'}
        }
        // let data = await g_dtnsManager.run(reqUrl,{})
        //采用g_downManager来实现下载
        let data = await new Promise((resolve)=>{
          g_downManager.download(reqUrl,params,resolve)
        })
        
        if(data && data.data){
            item = data.data //JSON.parse(new TextDecoder().decode(data.data))
            ifileDb.addData({key:fileId,data:{filename:data.fileInfo.filename,filedata:data.data ,fileInfo:data.fileInfo}})//添加到缓存
        }else{
            console.log('download-xfile-[dfile]-failed:',fileId)
            item = null
        }
    }
    else{
        item = cachedFileItem.data.filedata//JSON.parse(new TextDecoder().decode(cachedFileItem.data.filedata))
    }
    return item
  }
  async switchApp(dstWeb3name,invite_code = null)
  {
    console.log('into switchApp:',dstWeb3name)
    let web3name = 'dtns'
    if(web3name==dstWeb3name)
    {
      console.log('dtns is dstWeb3name')
      return true;
    }
    // let timestamp = parseInt( Date.now()/1000)
    // let hash = await key_util.hashVal(web3name+':'+timestamp)
    // let sign = await key_util.signMsg(hash,dtnsClient.mywallet.private_key) //使用的是dtns-device-id设备id的密钥

    // let ret = await this.dtnsManager.run('dtns://web3:dtns/user/device/login',{timestamp,web3name,sign})
    // console.log('/user/device/login--ret:'+JSON.stringify(ret))

    // if(!ret || !ret.ret) return 
    // if(true)
    // {
    //     console.log('[dtns]session:'+web3name+' save now:',ret)
    //     iSessionDb.deleteDataByKey('session:'+web3name)
    //     iSessionDb.addData({key:'session:'+web3name,data:ret}) 
    //     iSessionDb.addData({key:'session:'+web3name+':'+Date.now(),data:ret})
    // }

    // //启动dtns的消息接收器
    // dchatManager.initWebSocket(web3name)

    let dtns_private_key = null ;// dtnsClient.mywallet.private_key
    let dtnsUserInfo  = null
    let ret =await iSessionDb.getDataByKey('session:'+web3name)
    if(ret && ret.data){
        dtnsUserInfo = ret.data
        console.log('dtnsUserInfo:',dtnsUserInfo)
        let keys = await iWalletDb.getAllDatas()
        console.log('keys:',keys)
        for(let i=0;i<keys.length;i++)
        {
          if(keys[i].data && keys[i].data.public_key == dtnsUserInfo.public_key)
          {
            dtns_private_key = keys[i].data.private_key
            break;
          }
        }
    }
    if(!dtns_private_key){
      console.log('user-sesstion match private-key is null')
      return false;
    }
    
    if(!dtnsUserInfo){
      console.log('dtns-user-info is null')
      return false;
    }

    console.log('dtns-root-ecc-keys:',{private_key:dtns_private_key,public_key:dtnsUserInfo.public_key})

    //自动化创建新设备（并绑定）2023-10-7
    // if(true) return 
    // connectIBChatSvr()
    let Ret =dtnsUserInfo
    if(true){
        let user_id = Ret.user_id
        let s_id = Ret.s_id
        let deviceInfo = device.os +'-'+device.type +
                '('+ (Math.floor(new Date().getTime()/1000)).toString(36) +')'+ (invite_code?'@'+invite_code:'' )
        let keyPair = eccryptoJS.generateKeyPair()
        console.log('dtnsManager-connect->keyPair:',keyPair)
        let private_key = bs58.encode( keyPair.privateKey)
        let public_key = bs58.encode( eccryptoJS.getPublicCompressed(keyPair.privateKey))
        const msg = eccryptoJS.utf8ToBuffer(deviceInfo);
        let hash = await eccryptoJS.sha256(msg)
        let sign = bs58.encode( await eccryptoJS.sign(keyPair.privateKey,hash,true))
        let sign2 = bs58.encode( await eccryptoJS.sign(bs58.decode(dtns_private_key),hash,true))

        let splitStr = '|'
        let copyData = splitStr+sign+splitStr
            +public_key.substring(public_key.length-4,public_key.length)
            +splitStr+deviceInfo+ splitStr+dstWeb3name+splitStr
        console.log('dtnsClient-connect-copyData:'+copyData)

        // phoneHash,deviceName,sign,phoneEnInfo,public_key,web3name,invite_code
        let ret = await this.dtnsManager.run('dtns://web3:dtns/user/device/bind',
            {deviceName: deviceInfo ,public_key:public_key,web3name:dstWeb3name,sign:sign,sign2:sign2,user_id,s_id})
        console.log('/user/device/bind--ret:'+JSON.stringify(ret))
        if(!ret || !ret.ret) return 
        //保存钱包信息
        // if(web3name != dstWeb3name) //不要重复保存
        web3name = dstWeb3name //变更为目标web3name
        {
            iWalletDb.deleteDataByKey('mywallet:'+web3name)
            ret.private_key = private_key
            ret.public_key = public_key
            ret.web3name = web3name
            console.log('mywallet:'+web3name+' save now:',ret)
            iWalletDb.addData({key:'mywallet:'+web3name,data:ret}) 
            iWalletDb.addData({key:'mywallet:'+web3name+':'+Date.now(),data:ret})
        }
        //这下子可以登录了。。。。
        let mywalletInfo = await iWalletDb.getDataByKey('mywallet:'+web3name)
        console.log('login-web3name:'+web3name+' mywalletInfo:',mywalletInfo)
        if(!mywalletInfo || !mywalletInfo.data) {
          console.log('query-mywallet-'+web3name+' is empty')
          return false
        }
        mywalletInfo = mywalletInfo.data

        let timestamp = parseInt( Date.now()/1000)
        hash = await key_util.hashVal(web3name+':'+timestamp)
        sign = await key_util.signMsg(hash,mywalletInfo.private_key)

        let web3Url = 'dtns://web3:'+web3name+'/user/device/login'
        let tmpClient = await this.dtnsManager.connect(web3Url) ///
        console.log('web3url and tmpClient:',web3Url,tmpClient)
        if(!tmpClient){
          console.log('connect to '+web3Url+' get-rpc-client failed:',tmpClient,web3name)
          return false
        }

        console.log('web3name:'+web3name+' tmpClient.is_logined:',tmpClient.is_logined)
        if(tmpClient.is_logined)
        {
            return true
        }

        let iCnt = 100
        while(!tmpClient.pingpong_flag && iCnt>=0){
          await rpc_client.sleep(50)
          iCnt--
        } 
        if(iCnt<0)
        {
          console.log('switch-app connect to web3Url:',web3Url+' failed!')
          return false;
        }

        await tmpClient.sleep(1000) //1秒的同步时间

        // if(tmpClient) tmpClient.setPeerRefreshCallback(async function(){
        ret = await this.dtnsManager.run(web3Url,{timestamp,web3name,sign})
        console.log(web3name+' /user/device/login--ret:'+JSON.stringify(ret))
        let flag = true
        if(ret && ret.ret){ 
            flag = false
            ret.web3name = web3name
        }
        // ret.login_private_key = private_key  （sesssion中不保存private，需要在iwalletdb中查询）

        //这里要重点考虑一下，如何处理（是保存在iwallet中还是其他的）
        if( ret && ret.ret) //不要重复保存
        {
          flag = true
            console.log('session:'+web3name+' save now:',ret)
            iSessionDb.deleteDataByKey('session:'+web3name)
            iSessionDb.addData({key:'session:'+web3name,data:ret}) 
            iSessionDb.addData({key:'session:'+web3name+':'+Date.now(),data:ret})
            tmpClient.is_logined = true
        }
        console.log('switch-app-logined-ret:',flag,ret)
        return true
    }
  }
  async switchAppNow(dstWeb3name,nowThis,gotoConnectFlag = true,invite_code = null)
  {
    nowThis = nowThis ? nowThis : this.viewContext
    let This = nowThis
    if(await this.switchApp(dstWeb3name,invite_code))
    {
      console.log('g_dchatManager.switchApp is true')
      //
      let sessionInfo = await iSessionDb.getDataByKey('session:'+dstWeb3name)
      if(sessionInfo && sessionInfo.data)
      {
        let res = sessionInfo.data
        {
          // if(typeof g_connectIBChatSvr == 'function') g_connectIBChatSvr()
          localStorage.setItem('newDWebFlag','1')
              
          localStorage.setItem("s_id", res.s_id);
          localStorage.setItem("user_id", res.user_id);
          localStorage.setItem("userInfo",JSON.stringify(res))
          This.$toast.success("登录成功",1000);

          This.$api.network.startWebSocket();
          window.rpc_client =await this.dtnsManager.connect('dtns://web3:'+dstWeb3name)
          let new_mywallet = rpc_client.mywallet // await iWalletDb.getDataByKey('mywallet:'+this.changetext)
          console.log('new_mywallet:',new_mywallet)
          // new_mywallet = new_mywallet ? new_mywallet.data:null
          if(new_mywallet)
          {
            iWalletDb.deleteDataByKey('g_mywallet')
            iWalletDb.addData({key:'g_mywallet',data:new_mywallet})
            window.g_mywallet = rpc_client.mywallet
          }
          // console.log(s_id);
          await rpc_client.sleep(30)//500)
          //this.$router.push('/index')
          This.$router.push({name:"index",params:{noCache:true}});//清理掉缓存
        }
        return true
      }else{
        console.log('g_dchatManager.switchApp session is null')
      }
    }
    if(gotoConnectFlag){
      await rpc_client.sleep(30)
      This.$router.push('/connect'+(invite_code ? '/'+dstWeb3name+'/'+invite_code :''))
    }
  }

  switchIMDB(dstWeb3name)
  {
    if(this.imDbs.has(dstWeb3name))
    {
      console.log('switchIMDB-imDbs.has:',dstWeb3name)
      let imDb = this.imDbs.get(dstWeb3name)
      window.imDb = imDb
      return imDb
    }
    console.log('switchIMDB-imDbs.not-has:',dstWeb3name,' renew imDb now!')
    //如果未初始化过，则进行初始化
    const imDb =new IMIndexDB('imdb:'+dstWeb3name)
    this.imDbs.set(dstWeb3name,imDb) //缓存起来
    imDb.openDB()
    window.imDb = imDb
    return imDb
  }

  async switchIB3(dstWeb3name,nowThis,gotoConnectFlag = true,invite_code = null) //切换节点
  {
    nowThis = nowThis ? nowThis : this.viewContext
    let This = nowThis
    let storage = window.localStorage;
    let dark_mode = localStorage.getItem('dark_mode')
    storage.clear() //清理掉登录信息
    if(dstWeb3name!=rpc_client.roomid){
      this.switchIMDB(dstWeb3name) //直接重新配置，不清理
      // imDb.clear()  //清理掉配置信息。
    }
    if(dark_mode)  localStorage.setItem('dark_mode',dark_mode)

    //切换一下rpc_client
    // let oldWeb3name = rpc_client.roomid
    localStorage.setItem('now_roomid',dstWeb3name)
    //获得rpc-client
    let client = await g_dtnsManager.connect('dtns://web3:'+dstWeb3name)
    console.log('switchIB3-connector-client:',client)
    if(client)
    {
      window.rpc_client = client  //切换（旧的并不关闭和清理--连接需要【网络代价】）
      console.log('new-rpc_client:',client)
    }else{
      //2023-10-9
      //不会因connect生成的client为null而返回失败---这是切换的原则（因connect.vue或index.vue中也会进行new RTCClient连接）
      window.rpc_client = new RTCClient(dstWeb3name)
      g_dtnsManager.addRPCClient(rpc_client) //务必添加至此，否则会多次创建client,导致过量的重复连接
      console.log('create-new-RTCClient to window.rpc_client')
      // console.log('[Error]use new rpc-client failed!')
      // This.$toast('切换RPCCLient失败')
      // if(gotoConnectFlag){
      //   await rpc_client.sleep(1000)
      //   This.$router.push('/connect'+(invite_code ? '/'+dstWeb3name+'/'+invite_code :''))
      // }
      // return ;
    }

    This.$toast.success('切换节点成功！')
    let sessionInfo = await iSessionDb.getDataByKey('session:'+dstWeb3name)
    if(sessionInfo && sessionInfo.data)
    {
      let res = sessionInfo.data
      {
        localStorage.setItem('newDWebFlag','1')
        localStorage.setItem("s_id", res.s_id);
        localStorage.setItem("user_id", res.user_id);
        localStorage.setItem("userInfo",JSON.stringify(res))
        This.$toast.success("登录成功",1000);
        This.$api.network.startWebSocket();
        let new_mywallet = rpc_client.mywallet // await iWalletDb.getDataByKey('mywallet:'+this.changetext)
        console.log('new_mywallet:',new_mywallet)
        if(new_mywallet)
        {
          iWalletDb.deleteDataByKey('g_mywallet')
          iWalletDb.addData({key:'g_mywallet',data:new_mywallet})
          window.g_mywallet = rpc_client.mywallet
        }
        // console.log(s_id);
        await rpc_client.sleep(30)//500)
        This.$router.push({name:"index",params:{noCache:true}});//清理掉缓存
      }
    }
    else{
      await this.switchAppNow(dstWeb3name,This,gotoConnectFlag,invite_code)
    }
  }
  /**
   * 登录ib3device---/user/device/login
   * @param {*} web3name 
   * @returns 
   */
  async loginIB3Device(web3name)
  {
    let client = await this.dtnsManager.connect('dtns://web3:'+web3name)
    if(!client) return {ret:false,msg:'dtns-manager-connect return client is null'}

    let timestamp =parseInt( Date.now()/1000 );
    let hash = await key_util.hashVal(web3name+':'+timestamp)
    let sign = await key_util.signMsg(hash,client.mywallet.private_key) 
    let qSessionRet = await this.dtnsManager.run('dtns://web3:'+client.roomid+'/user/device/login',{timestamp,web3name,sign})
    //得到登录态
    if(qSessionRet && qSessionRet.ret)
    {
        iSessionDb.deleteDataByKey('session:'+web3name)
        iSessionDb.addData({key:'session:'+web3name,data:qSessionRet}) 
        iSessionDb.addData({key:'session:'+web3name+':'+Date.now(),data:qSessionRet})
        return qSessionRet
    }
    return {ret:false,msg:qSessionRet?qSessionRet.msg:'未知网络原因',qSessionRet}
  }

  //用于生成pop-runtime相关的函数2023-10-7
  initAppRuntime(poplang)
  {
    if(!poplang) return false
    let This = this.viewContext
    let that = this

    //添加函数list....

    poplang.binderAddOpcode('ib3.switch',async function(context,opcode,token_x,token_y,opval,extra_data){
      context['$ret'] = await that.switchIB3(context[token_x] ?context[token_x]:token_x ,This,true,context[token_y] ?context[token_y]:token_y)
      console.log('g_dchatManager.switchIB3--ret:',context['$ret'])
      return context['$ret']
    })

    poplang.binderAddOpcode('ib3.goto',async function(context,opcode,token_x,token_y,opval,extra_data){
      This.$router.push(context[token_x] ?context[token_x]:token_x)//跳转页面
      context['$ret'] = true
      console.log('g_dchatManager.switchIB3--ret:',context['$ret'])
      return context['$ret']
    })

    poplang.binderAddOpcode('ib3.device.login',async function(context,opcode,token_x,token_y,opval,extra_data){
      context['$ret'] = await that.loginIB3Device(context[token_x] ?context[token_x]:token_x)
      return context['$ret']
    })

    poplang.binderAddOpcode('ib3.wallet.import',async function(context,opcode,token_x,token_y,opval,extra_data){
      context['$ret'] = await that.importWalletKeys()
      return context['$ret']
    })

    poplang.binderAddOpcode('ib3.wallet.export',async function(context,opcode,token_x,token_y,opval,extra_data){
      context['$ret'] = await that.exportWalletKeys()
      return context['$ret']
    })

    return true

  }
  
  //2023-10-8新增
  async getWalletIB3List(bGetKeys = false){
    let keys = await iWalletDb.getAllDatas()
    console.log('keys:',keys)
    let result = []
    let keyMap = new Map()

    if(bGetKeys){
      //先行处理mywallet:web3name的所有纪录（确保是最新的）---再行去备份g_mywallet以及mywallet-timestamp备份的密钥
      let web3names = await this.getWalletIB3List()
      for(let i=0;web3names && i<web3names.length;i++)
      {
        let data = await iWalletDb.getDataByKey('mywallet:'+web3names[i])
        if(data && data.data)
        {
          keyMap.set(data.data.private_key + data.data.public_key,'1') //缓存中存储
          result.push(data) //result中存储
        }
      }
    }

    for(let i=0;i<keys.length;i++)
    {
      let key = keys[i].key
      let data = keys[i].data
      //判断是否重复，不重复则继续  
      //得到的是{key,data:wallet-key-info}
      if(bGetKeys && data && data.private_key && data.public_key && !keyMap.has(data.private_key + data.public_key))
      {
        keyMap.set(data.private_key + data.public_key,'1')
        result.push(keys[i])
      }
      //必须前置判断!bGetKeys
      else if(!bGetKeys && key &&key.indexOf('mywallet:')==0 && key.indexOf(':')>0 && key.indexOf(':') == key.lastIndexOf(':') )
      {
        let web3name = key.split(':')[1]
        if(web3name == 'undefined' ) continue
        result.push(web3name) //得到的是web3name
      }
    }
    return result
  }
  /**
   * 导入iWalletDb数据
   */
  async importWalletKeys()
  {
    alert('请选择钱包密钥JSON配置文件（注意：须同时包含private-key和public-key）')
    let jsonText = await new Promise((resolve)=>{
      const a = document.createElement('input')
      a.setAttribute('type', 'file')
      a.addEventListener('change', async function selectedFileChanged() {
          console.log('data:' + this.files)
          if (this.files.length == 0){
            resolve(null)
            return alert('请选择JSON文件!')
          }
          console.log('upload-files:' + JSON.stringify(this.files[0].name))
          const reader = new FileReader()
          reader.onload = async function fileReadCompleted() {
            console.log('readAsText = result:' + reader.result)
            resolve(reader.result)
          }
          reader.readAsText(this.files[0])
      })
      a.click()
    })
    console.log('importWalletKeys--jsonText:',jsonText)
    if(!jsonText) return false
    let walletJSON = null;
    try{
      walletJSON = JSON.parse(jsonText)
    }catch(ex){
      console.log('parse walletJSON exception:'+ex,ex)
      alert('无法解析json')
      return false;
    }
    let walletKeys = []
    for(let i=0;i<walletJSON.length;i++)
    {
      let keyData = walletJSON[i]
      if(!keyData.key || !keyData.data) continue
      let {private_key,public_key} = keyData.data
      if(!private_key || !public_key) continue
      let bFlag = key_util.invalidateKeys(private_key,public_key)
      if(!bFlag) continue

      walletKeys.push(keyData)
      //保存至其中（生成时间序列）
      iWalletDb.deleteDataByKey(keyData.key)
      iWalletDb.addData({key:keyData.key,data:keyData.data}) 
      // iWalletDb.addData({key:keyData.key+':'+Date.now(),data:keyData.data})//这里会导致多次添加时间戳
    }

    if(walletKeys && walletKeys.length>0){
      this.viewContext.$toast('[success]导入成功！数量：'+walletKeys.length)
    }else{
      this.viewContext.$toast('[failed]导入失败：密钥列表为空 或 格式有误！')
      return 
    }
    let encoder = new TextEncoder();
    console.log('import-keys-success-results:',JSON.stringify(walletKeys),walletKeys,walletKeys.length)
    rpc_client.downloadFileByBinary('import-keys-success-results.json',encoder.encode(JSON.stringify(walletKeys)))
    
    //支持跳转shareText页面（查看导入成功的wallet-keys）
    imDb.deleteDataByKey('sharetext')
    imDb.addData({key:'sharetext',data:JSON.stringify(walletKeys)})
    localStorage.setItem('poster_type','sharetext')
    this.viewContext.$router.push('/poster/sharetext')

    return walletKeys
  }
  /**
   * 备份钱包iWalletDb数据
   */
  async exportWalletKeys()
  {
    let keys =await this.getWalletIB3List(true)
    console.log('exportWalletKeys-keys:',keys)
    if(keys && keys.length>0){
      this.viewContext.$toast('[success]导出成功！数量：'+keys.length)
    }else{
      this.viewContext.$toast('[failed]导出失败：密钥列表为空！')
      return 
    }
    //下载文件
    let encoder = new TextEncoder();
    rpc_client.downloadFileByBinary('export-keys.json',encoder.encode(JSON.stringify(keys)))
    //支持跳转shareText页面
    imDb.deleteDataByKey('sharetext')
    imDb.addData({key:'sharetext',data:JSON.stringify(keys)})
    localStorage.setItem('poster_type','sharetext')
    this.viewContext.$router.push('/poster/sharetext')
    return keys
  }
}