import axios from './axios'

let instance = axios()
window.g_axios = instance

//fix the bug ，首次进入
localStorage.removeItem('dxib-now-url') 

const dtnsManager = new DTNSManager()
window.g_dtnsManager = dtnsManager
const downloadManager = new DownloadManager()
window.g_downManager = downloadManager

window.g_tns_urls = null
window.g_turn_urls = null
async function queryUrls()
{
    let tnsUrls = await
    g_axios.get( typeof g_tns_nslookup_url!='undefined' ? g_tns_nslookup_url : 'https://static.yunapi.org/tns-urls.json')//?timestamp='+time_x+'&sign='+encodeURIComponent(time_sign_base64), )
    window.g_tns_urls = tnsUrls && tnsUrls.data ? tnsUrls.data : tnsUrls

    let turnUrls = await
    g_axios.get( typeof g_turn_nslookup_url!='undefined' ? g_turn_nslookup_url : 'https://static.yunapi.org/turn-urls.json')//?timestamp='+time_x+'&sign='+encodeURIComponent(time_sign_base64), 
    window.g_turn_urls = turnUrls && turnUrls.data  ? turnUrls.data: turnUrls

    let staticDtnsNetworkUrls = await
    g_axios.get( typeof g_static_dtns_network_nslookup_url!='undefined' ? g_static_dtns_network_nslookup_url : 'https://static.yunapi.org/static-dtns-network.json')//?timestamp='+time_x+'&sign='+encodeURIComponent(time_sign_base64), 
    window.g_dtns_nslookup_static_urls = staticDtnsNetworkUrls && staticDtnsNetworkUrls.data ? staticDtnsNetworkUrls.data:staticDtnsNetworkUrls
    console.log('g_tns_urls:',g_tns_urls,'g_turn_urls:',g_turn_urls,'g_dtns_nslookup_static_urls:',g_dtns_nslookup_static_urls)
}
queryUrls()

//用于backDb-订阅dnalink.node节点
const ifileDb = new IFileIndexDB('ifiledb','ifilecache')
ifileDb.openDB()
window.ifileDb = ifileDb

const filesDb = new IFileIndexDB('files-db','files-store',false,11);
filesDb.openDB();
window.filesDb = filesDb;

const iWalletDb = new IFileIndexDB('iwalletdb','iwalletcache')
iWalletDb.openDB()
window.iWalletDb = iWalletDb

const iSessionDb = new IFileIndexDB('isessiondb','isessioncache')
iSessionDb.openDB()
window.iSessionDb = iSessionDb

let myroomid = localStorage.getItem('now_roomid')
const client = myroomid && myroomid.length>=1 ? new RTCClient(myroomid) : new RTCClient()//-svr')
window.rpc_client = client
client.setPeerRefreshCallback(function(){
    console.log('rpc_client-setPeerRefreshCallback-called,typeof g_networkApiObj:',typeof g_networkApiObj)
     //启动的是
     if(typeof g_networkApiObj!='undefined')
        g_networkApiObj.startWebSocket()
})

dtnsManager.addRPCClient(client)
const dchatManager = new  DChatManager(dtnsManager)
window.g_dchatManager = dchatManager

if(localStorage.getItem('userInfo'))
setTimeout(async function(){
console.log('now connect to web3:dtns:')
const dtnsClient =await dtnsManager.connect('dtns://web3:dtns')
console.log('dtnsClient:',dtnsClient)

//启动备份进程
// setTimeout(function(){
//     window.g_sync_files_flag = true
//     bakDbStart(rpc_client.roomid)
// },8000)
window.g_bakdb_start = function()
{
    bakDbStart(rpc_client.roomid)
}

window.g_bakdb_start2 = function()
{
    window.g_sync_files_flag = true
    bakDbStart(rpc_client.roomid)
}


window.g_sync_web3keys = async function()
{
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let tmp_private_key = key_util.newPrivateKey()
    let tmp_public_key = key_util.getPublicKey(tmp_private_key)
    let time_i = Date.now()
    let hash = await key_util.hashVal(''+time_i)
    //从网络查询对应的dtns_public_key
    let dtnsUserStates = await dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/chain/states',
            {token:userInfo.dtns_user_id,rpc_port:80,user_id:userInfo.user_id,s_id:userInfo.s_id})
    console.log('g_sync_web3keys-dtnsUserStates:',dtnsUserStates)
    let dtns_public_key = dtnsUserStates.web3_key ? dtnsUserStates.web3_key  :dtnsUserStates.public_key
    let dtns_private_key = null;
    //查询得到private_key
    let keys = await iWalletDb.getAllDatas()
    console.log('keys:',keys)
    for(let i=0;i<keys.length;i++)
    {
        if(keys[i].data && keys[i].data.public_key == dtns_public_key)
        {
            dtns_private_key = keys[i].data.private_key
            break;
        }
    }
    if(!dtns_private_key) return {ret:false,msg:'dtns_private_key is null'}
    let sign = await key_util.signMsg(hash,dtns_private_key)
    let rets = await dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/user/web3keys/sync',
        {user_id:userInfo.user_id,s_id:userInfo.s_id,
            encrypt_public_key:tmp_public_key,time_i,sign} )
    console.log('g_sync_web3keys-sync-keys-rets:',rets)
    if(!rets || !rets.ret) return rets
    let jsonStr = null;
    let results = null;
    try{
        jsonStr = await sign_util.decryptSomethingInfo(rets.en_text,tmp_private_key)
        console.log('g_sync_web3keys-sync-decrypt-jsonStr:',jsonStr)
        results = JSON.parse(jsonStr)
        console.log('g_sync_web3keys-sync-parse-results:',results)
    }catch(ex)
    {
        console.log('g_sync_web3keys-decryptSomethingInfo-exception:'+ex)
        return {ret:false,msg:'decryptSomethingInfo en_text failed'}
    }
    let xresults = []
    for(let i=0;i<results.length;i++)
    {
        let obj = results[i]
        let uret = null;
        if(obj && obj.token && obj.private_key && obj.public_key)
        {
            console.log('now update-keys:',obj.token.split('_')[0],obj.private_key , obj.public_key)
            uret = await g_update_keys(obj.token.split('_')[0], obj.private_key , obj.public_key)
            console.log('now update-keys-uret:',uret)
        }
        xresults.push(uret)
    }

    return xresults
}

async function connectIBChatSvr()
{
    console.log('into connectIBChatSvr:')
    window.g_ibchat_roomid = null //重新开始获取
    //登录ld（验证使用ecc-keys绑定的设备可以成功登录目标设备）--需要轮询--确保同步状态完成
    let flag = rpc_client.roomid !='ld'//true
    let iCnt = 100
    while(flag && iCnt>0){
        // await rpc_client.sleep(3000)

        //检测是否采用rpc_roomid作为g_ibchat_roomid
        let userInfoStr = localStorage.getItem('userInfo')
        if(userInfoStr){
            let userInfo = null
            try{
                userInfo = JSON.parse(userInfoStr)
                let params = {user_id:userInfo.user_id,s_id:userInfo.s_id,prompt:'test',random:Math.random() }
                let testIBchatUrlRes = await g_dtnsManager.run('dtns://ibapp:'+rpc_client.roomid
                    +'/ibchat/talk/res',params) ;
                console.log('testIBchatUrlRes---res:',testIBchatUrlRes)
                if(testIBchatUrlRes && testIBchatUrlRes.msg && !(testIBchatUrlRes.msg.indexOf('no pm error')>=0 
                 || testIBchatUrlRes.msg.indexOf('unmatch')>=0) )
                {
                    window.g_ibchat_roomid = rpc_client.roomid
                    return ;
                }
            }catch(ex){
                console.log('userInfoStr parse failed-exception:'+ex,ex)
            }
        }

        let web3name = 'ld'
        let mywalletInfo = await iWalletDb.getDataByKey('mywallet:'+web3name)
        console.log('login-web3name:'+web3name+' mywalletInfo:'+mywalletInfo)
        if(!mywalletInfo || !mywalletInfo.data) break;
        mywalletInfo = mywalletInfo.data

        let timestamp = parseInt( Date.now()/1000)
        let hash = await key_util.hashVal(web3name+':'+timestamp)
        let sign = await key_util.signMsg(hash,mywalletInfo.private_key)

        let web3Url = 'dtns://web3:'+web3name+'/user/device/login'
        let tmpClient = await dtnsManager.connect(web3Url) ///
        console.log('web3url and tmpClient:',web3Url,tmpClient)

        console.log('web3name:'+web3name+' tmpClient.is_logined:',tmpClient.is_logined)
        if(tmpClient.is_logined)
        {
            return 
        }
        // if(tmpClient) tmpClient.setPeerRefreshCallback(async function(){
        let ret = await dtnsManager.run(web3Url,{timestamp,web3name,sign})
        console.log(web3name+' /user/device/login--ret:'+JSON.stringify(ret))
        if(ret && ret.ret){ 
            flag = false
            ret.web3name = web3name
        }
        // ret.login_private_key = private_key  （sesssion中不保存private，需要在iwalletdb中查询）

        //这里要重点考虑一下，如何处理（是保存在iwallet中还是其他的）
        if(web3name != rpc_client.roomid && !flag) //不要重复保存
        {
            console.log('session:'+web3name+' save now:',ret)
            iSessionDb.deleteDataByKey('session:'+web3name)
            iSessionDb.addData({key:'session:'+web3name,data:ret}) 
            iSessionDb.addData({key:'session:'+web3name+':'+Date.now(),data:ret})
            tmpClient.is_logined = true
        }
        iCnt -- 
        
        break;
        // })   
    }
}
window.g_connectIBChatSvr = connectIBChatSvr

//连接websocket和登录dtns操作
if(rpc_client.roomid=='dtns')
{
    //启动dtns的消息接收器
    setTimeout(function(){
        dchatManager.initWebSocket('dtns')//照样创建多一个后台用的websocket，用于监听【请求授权信息】
        // connectIBChatSvr()
    },3000)
}
else
dtnsClient.setPeerRefreshCallback(async function(){
    //2023-10-7 避免dtns-device-id重新多次绑定，不利于管理（导致通知消息过量等问题）
    dchatManager.initWebSocket(web3name)
    return 
    console.log('into dtns-tns-server-connected callback:')
    let web3name = 'dtns'
    let timestamp = parseInt( Date.now()/1000)
    let hash = await key_util.hashVal(web3name+':'+timestamp)
    let sign = await key_util.signMsg(hash,dtnsClient.mywallet.private_key) //使用的是dtns-device-id设备id的密钥

    let ret = await dtnsManager.run('dtns://web3:dtns/user/device/login',{timestamp,web3name,sign})
    console.log('/user/device/login--ret:'+JSON.stringify(ret))

    if(!ret || !ret.ret) return 
    if(true)
    {
        console.log('[dtns]session:'+web3name+' save now:',ret)
        iSessionDb.deleteDataByKey('session:'+web3name)
        iSessionDb.addData({key:'session:'+web3name,data:ret}) 
        iSessionDb.addData({key:'session:'+web3name+':'+Date.now(),data:ret})
    }

    //启动dtns的消息接收器
    dchatManager.initWebSocket(web3name)

    let dtns_private_key = dtnsClient.mywallet.private_key
    if(ret){
        let dtnsUserInfo = ret
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

    //不再自动化创建新设备（并绑定）2023-3-29
    // if(true) return 
    // connectIBChatSvr()

    if(false){
        let user_id = ret.user_id
        let s_id = ret.s_id
        let deviceInfo = device.os +'-'+device.type +
                '('+ (Math.floor(new Date().getTime()/1000)).toString(36) +')'
        let keyPair = eccryptoJS.generateKeyPair()
        console.log('dtnsManager-connect->keyPair:',keyPair)
        let private_key = bs58.encode( keyPair.privateKey)
        let public_key = bs58.encode( eccryptoJS.getPublicCompressed(keyPair.privateKey))
        const msg = eccryptoJS.utf8ToBuffer(deviceInfo);
        hash = await eccryptoJS.sha256(msg)
        sign = bs58.encode( await eccryptoJS.sign(keyPair.privateKey,hash,true))
        let sign2 = bs58.encode( await eccryptoJS.sign(bs58.decode(dtns_private_key),hash,true))

        let splitStr = '|'
        let copyData = splitStr+sign+splitStr
            +public_key.substring(public_key.length-4,public_key.length)
            +splitStr+deviceInfo+splitStr+rpc_client.roomid+splitStr
        console.log('dtnsClient-connect-copyData:'+copyData)

        // phoneHash,deviceName,sign,phoneEnInfo,public_key,web3name,invite_code
        ret = await dtnsManager.run('dtns://web3:dtns/user/device/bind',
            {deviceName: deviceInfo ,public_key:public_key,web3name:'ld',sign:sign,sign2:sign2,user_id,s_id})
        console.log('/user/device/bind--ret:'+JSON.stringify(ret))
        if(!ret || !ret.ret) return 
        //保存钱包信息
        if(web3name != rpc_client.roomid) //不要重复保存
        {
            iWalletDb.deleteDataByKey('mywallet:'+web3name)
            ret.private_key = private_key
            ret.public_key = public_key
            ret.web3name = web3name
            console.log('mywallet:'+web3name+' save now:',ret)
            iWalletDb.addData({key:'mywallet:'+web3name,data:ret}) 
            iWalletDb.addData({key:'mywallet:'+web3name+':'+Date.now(),data:ret})
        }
    }
})

},1000)

//2023-2-6，此处有个全局的b_img_q 压缩象素率（默认为0.5，建议手机端图片较大，可设置为0.1，可以对比0.5减少75%的体积大小）
let b_img_q = localStorage.getItem('b_img_q')
b_img_q = !b_img_q ? 0.5 :b_img_q
rpc_client.img_q = b_img_q

const imageDb =new ImageIndexDB()
imageDb.openDB()
window.imageDb = imageDb

// const imDb =new IMIndexDB()
// imDb.openDB()
// window.imDb = imDb
if(rpc_client && rpc_client.roomid){
    g_dchatManager.switchIMDB(rpc_client.roomid)
}

function  queryImg(url, params) {
    console.log('getImg-params:'+url+' params:'+JSON.stringify(params))
    // if(url && url.indexOf('9000')) url = url.split('9000')[1]
    params = !params ?{}:params
    url = url && url.startsWith('dtns://') ? url:''
    // if(!params || !params.filename) return {ret:false,msg:'param(filename) is null'}
    const xclient = window.rpc_client
    return g_dtnsManager.run(url ?url: 'dtns://web3:'+xclient.roomid+'/image/view',params) //2023-10-15直接使用g_dtnsManager.run执行之
    // return new Promise((resolve,reject)=>{
    //     if(!params || !params.filename) return resolve({ret:false,msg:'param(filename) is null'})
    //     xclient.send('/image/view',params,null,function(rdata){
    //     console.log('rdata:'+JSON.stringify(rdata))
    //         resolve(rdata.data)
    //     })
    //     setTimeout(()=>reject(null),30000)
    // })
}
window.queryImg = queryImg

window.g_pop_event_bus = new PopEventBus()
//这里须全局监听的monitor-agent事件
g_pop_event_bus.on('monitor-agent',function(data){
    console.log('monitor-agent-data:',data)
    if(data.notify_type=='need_captcha'){
        console.log('notify_type=need_captcha, goto /captcha')
        g_dchatManager.viewContext.$router.push('/captcha')
    }
})
window.g_dtnsStrings = new DTNSStrings()
function process_notify_callback(data)
{
    console.log('process_notify_callback:',data)
    if(data.notify_type =='rtchannel')
    {
        //通过event-bus通知---可on更多的lisenter
        g_pop_event_bus.emit(data.channel,data)

        if(typeof g_rtchannel_notify_callback == 'function')
            g_rtchannel_notify_callback(data)
    }
    else if(data.channel=='rtmarket-channel')
    {
        //通过event-bus通知---可on更多的lisenter
        g_pop_event_bus.emit(data.channel,data)
        if(typeof g_rtmarket_notify_callback == 'function')
            g_rtmarket_notify_callback(data)
    }
    else if(data.channel.startsWith('rtstandard-channel'))
    {
        //通过event-bus通知---可on更多的lisenter
        g_pop_event_bus.emit('rtstandard-channel',data)
        if(typeof g_rtstandard_notify_callback == 'function')
            g_rtstandard_notify_callback(data)
    }
    else{
        //可以绑定多个事件，特别用于互动游戏、互动教育、互动mini-card、dxib应用中等
        g_pop_event_bus.emit(data.channel,data)
    }
}
window.g_notify_callback = process_notify_callback

export default {
    getImg (url, params) {
        //console.log('getImg-params:'+url+' params:'+JSON.stringify(params))
        return queryImg(url,params)
    },
    get (url, params, headers) {
        console.log('axios-get-url:'+url+' params:'+JSON.stringify(params))
        if(typeof g_notice_network_status == 'function') g_notice_network_status()
        if(!(url && (url.indexOf('https://static')>=0 || url.indexOf('http://static')>=0 
            ||url.indexOf('http://localhost')==0 ||url.indexOf('http://127.0.0.1')==0 
            || url.indexOf('http://192.168.2.7')==0 )))
        {
            const xclient = window.rpc_client
            if(url && url.indexOf('9000')>0) url = url.split('9000')[1]
            if(url && url.indexOf('/api')==0) url = url.split('/api')[1]
            return g_dtnsManager.run('dtns://web3:'+xclient.roomid+url,params) //2023-10-15直接使用g_dtnsManager.run执行之
            // return new Promise((resolve,reject)=>{
            //     xclient.send(url,params,null,function(rdata){
            //     console.log('rdata:'+JSON.stringify(rdata))
            //         if(rdata)
            //             resolve(rdata.data)
            //         else
            //             resolve(null)
            //     })
            //     setTimeout(()=>reject(null),30000)
            // })
        }
        let options = {}
        if (params) {
            options.params = params
        }
        if (headers) {
            options.headers = headers
        }
        return instance.get(url, options)
    },
    post (url, params, headers) {
        if(typeof g_notice_network_status == 'function') g_notice_network_status()
        console.log('axios-post-url:'+url+' params:'+JSON.stringify(params))
        if(url && url.indexOf('9000')>0) url = url.split('9000')[1]
        // console.log('url:'+url)
        if(url && url.indexOf('/api')==0) url = url.substring('/api'.length,url.length)
        // console.log('url:'+url)
        const xclient = window.rpc_client
        return g_dtnsManager.run('dtns://web3:'+xclient.roomid+url,params) //2023-10-15直接使用g_dtnsManager.run执行之
        // return new Promise((resolve,reject)=>{
        //     xclient.send(url,params,null,function(rdata){
        //         console.log('rdata:'+JSON.stringify(rdata))
        //         if(rdata)
        //             resolve(rdata.data)
        //         else
        //             resolve(null)
        //     })
        //     setTimeout(()=>reject(null),30000)
        // })


        let options = {}
        if (headers) {
            options.headers = headers
        }
        return instance.post(url, params, options)
    },
    put  (url, params, headers) {
        if(url && url.indexOf('9000')>0) url = url.split('9000')[1]
        if(url && url.indexOf('/api')==0) url = url.split('/api')[1]
        const xclient = window.rpc_client
        return g_dtnsManager.run('dtns://web3:'+xclient.roomid+url,params) //2023-10-15直接使用g_dtnsManager.run执行之
        // return new Promise((resolve,reject)=>{
        //     xclient.send(url,params,null,function(rdata){
        //     console.log('rdata:'+JSON.stringify(rdata))
        //         resolve(rdata.data)
        //     })
        //     setTimeout(()=>reject(null),30000)
        // })

        let options = {}
        if (headers) {
            options.headers = headers
        }
        return instance.put(url, params, options)
    },
    delete (url, params, headers) {
        if(url && url.indexOf('9000')>0) url = url.split('9000')[1]
        if(url && url.indexOf('/api')==0) url = url.split('/api')[1]
        const xclient = window.rpc_client
        return g_dtnsManager.run('dtns://web3:'+xclient.roomid+url,params) //2023-10-15直接使用g_dtnsManager.run执行之
        // return new Promise((resolve,reject)=>{
        //     xclient.send(url,params,null,function(rdata){
        //     console.log('rdata:'+JSON.stringify(rdata))
        //         resolve(rdata.data)
        //     })
        //     setTimeout(()=>reject(null),30000)
        // })
        let options = {}
        if (params) {
            options.params = params
        }
        if (headers) {
            options.headers = headers
        }
        return instance.delete(url, options)
    }
}