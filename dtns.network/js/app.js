/**
 * 2019.1.28
 * 将java版本改为node.js版本的文件。
 * @type {*|exports}
 */
// const config = require('./config').config;

//const x6gs_config = require('../dtns.coin/root/root_config')
//console.log("x6gs_config:"+JSON.stringify(x6gs_config));
//
//var arguments = process.argv.splice(2);
//console.log('所传递的参数是：', arguments);


// const express = require('express');
// const app = express();

// const cors = require('cors');
// app.use(cors());

// const bodyParser = require('body-parser');
// const routes = require('./routes');

// global.ErrorLog = require('./libs/ErrorLog');
// app.use(bodyParser.urlencoded({ extended: false }));
//require('./libs/prototype_add');

// app.use(express.static('public'))
// app.use(express.static('layui-pro/start'))
// app.use(express.static('www'))

async function http_post(url,params){
    console.log('http_post-url:'+url+' params:'+JSON.stringify(params))
    if(!url) return null
    url = url.split(':'+ll_config.port)[1]
    if(!url) return null

    params = !params ?{}:params
    return new Promise((resolve,reject)=>{
        http_client.send(url,params,null,function(rdata){
        console.log('rdata:'+JSON.stringify(rdata))
            resolve(rdata.data)
        })
        setTimeout(()=>reject(null),30000)
    })
}

// 路由
// routes(app);
window.g_axios = axios
const dtnsManager = new DTNSManager()
window.g_dtnsManager = dtnsManager
console.log('ok-g_dtnsManager:',g_dtnsManager)
window.g_loginDtnsAndForklist = loginDtnsAndForklist
window.g_loginDtnsAndForklist_started = false


async function loginDtnsAndForklist()
{
    console.log('into loginDtnsAndForklist:',ll_config.defaultRTCRoomID)
    if(ll_config.defaultRTCRoomID=='nftlist')
        return ;

    window.g_loginDtnsAndForklist_started = true
    console.log('ok2-g_dtnsManager:',g_dtnsManager)

    // let roomId = 'web3:'+that.roomId+'|'+ parseInt(Date.now()/1000)
    // console.log('web3-roomid:',roomId)
    // let hash = await key_util.hashVal(roomId)
    // let sign = await key_util.signMsg(hash,that.mywallet.private_key)
    // that.client.discover(roomId+'|'+sign)

    if(typeof g_forklist_user=='undefined') return
    let forklist_user =  g_forklist_user
    
    let dtns_roomid = 'dtns'
    let dtns_roomid_m = 'web3:'+dtns_roomid+'|'+ parseInt(Date.now()/1000)
    console.log('dtns_roomid_m:',dtns_roomid_m)
    let hash = await key_util.hashVal(dtns_roomid_m)
    let sign = await key_util.signMsg(hash,forklist_user.private_key)
    let dtns_protocol_roomid = dtns_roomid_m+'|'+sign +'|'+forklist_user.token
    let dtns_p_client = new RTCClient(dtns_protocol_roomid,null,null,false)
    dtns_p_client.origin_roomid = dtns_roomid
    let addFlag =false
    if(typeof g_dtnsManager!='undefined') addFlag = g_dtnsManager.addRPCClient(dtns_p_client)
    console.log('add-dtns-client:',addFlag)

    let forklist_roomid = 'nftlist'
    let roomid = 'web3:'+ forklist_roomid+'|'+ parseInt(Date.now()/1000)
    console.log('forklist_roomid:',roomid)
    hash = await key_util.hashVal(roomid)
    sign = await key_util.signMsg(hash,forklist_user.private_key)
    let protocol_roomid = roomid+'|'+sign+'|'+forklist_user.token
    let p_client = new RTCClient(protocol_roomid,null,null,false)
    p_client.origin_roomid = forklist_roomid
    if(typeof g_dtnsManager!='undefined') addFlag= g_dtnsManager.addRPCClient(p_client)
    console.log('add-ld-client:',addFlag)

    await dtns_p_client.sleep(3000)

    let web3name = 'dtns'
    let timestamp = parseInt( Date.now()/1000)
    hash = await key_util.hashVal(web3name+':'+timestamp)
    sign = await key_util.signMsg(hash,forklist_user.private_key) //使用的是dtns-device-id设备id的密钥

    let ret = await g_dtnsManager.run('dtns://web3:dtns/user/device/login',{timestamp,web3name,sign})
    console.log(web3name+'-/user/device/login--ret:'+JSON.stringify(ret))

    // if(!ret || !ret.ret) return 

    web3name = 'nftlist'
    timestamp = parseInt( Date.now()/1000)
    hash = await key_util.hashVal(web3name+':'+timestamp)
    sign = await key_util.signMsg(hash,forklist_user.private_key) //使用的是dtns-device-id设备id的密钥

    ret = await g_dtnsManager.run('dtns://web3:'+web3name+'/user/device/login',{timestamp,web3name,sign})
    console.log(web3name+'-/user/device/login--ret:'+JSON.stringify(ret))

    if(!ret || !ret.ret) return 
    window.g_forklist_user_session = ret

    ret = await g_dtnsManager.run('dtns://web3:'+web3name+'/forklist/pay/channel',{web3name:ll_config.defaultRTCRoomID})
    console.log(web3name+'-/forklist/pay/channel--ret:'+JSON.stringify(ret))

    //启动dtns的消息接收器
    // dchatManager.initWebSocket(web3name)

    // let dtns_private_key = forklist_user.private_key

    // //不再自动化创建新设备（并绑定）2023-3-29
    // // if(true) return 

    // let user_id = ret.user_id
    // let s_id = ret.s_id
    // let deviceInfo = 'nodejs-desktop' +
    //         '('+ (Math.floor(new Date().getTime()/1000)).toString(36) +')'
    // let keyPair = eccryptoJS.generateKeyPair()
    // console.log('dtnsManager-connect->keyPair:',keyPair)
    // let private_key = bs58.encode( keyPair.privateKey)
    // let public_key = bs58.encode( eccryptoJS.getPublicCompressed(keyPair.privateKey))
    // const msg = deviceInfo//await key_util.hashVal(deviceInfo) //eccryptoJS.utf8ToBuffer(deviceInfo);
    // hash =  await key_util.hashVal(deviceInfo) //await eccryptoJS.sha256(msg)
    // sign = await key_util.signMsg(hash,private_key) //bs58.encode( await eccryptoJS.sign(keyPair.privateKey,hash,true))
    // let sign2 =  await key_util.signMsg(hash,forklist_user.private_key)// bs58.encode( await eccryptoJS.sign( bs58.decode(dtns_private_key),hash,true))

    // let splitStr = '|'
    // let copyData = splitStr+sign+splitStr
    //     +public_key.substring(public_key.length-4,public_key.length)
    //     +splitStr+deviceInfo+splitStr+rpc_client.roomid+splitStr
    // console.log('dtnsClient-connect-copyData:'+copyData)

    // // phoneHash,deviceName,sign,phoneEnInfo,public_key,web3name,invite_code
    // ret = await g_dtnsManager.run('dtns://web3:dtns/user/device/bind',
    //     {deviceName: deviceInfo ,public_key:public_key,web3name:'ld',sign:sign,sign2:sign2,user_id,s_id})
    // console.log('forklist-/user/device/bind--ret:'+JSON.stringify(ret))

    // if(ret && ret.ret){
    //     window.g_forklist_private_key = private_key
    //     window.g_forklist_public_key = public_key
    //     window.g_forklist_session = ret
    //     console.log('g_forklist_session:',g_forklist_session)
    // }
}

// const RTCHost = require('./RPCHost')
window.lxStart = lxStart
function lxStart(roomid = ll_config.roomid,defaultRTCRoomID = ll_config.defaultRTCRoomID)
{
    //config.js
    ll_config.roomid = roomid
    ll_config.defaultRTCRoomID = defaultRTCRoomID
    configLDB()
    //lx_all.js
    const defaultRTC = new RTCService(defaultRTCRoomID)
    window.defaultRTC = defaultRTC

    let time_i = Date.now()
    var time_hash = CryptoJS.HmacSHA256(''+time_i, g_dtns_network_hmac_key);
    var time_sign_base64 = time_hash.toString(CryptoJS.enc.Base64)
    console.log('time_sign_base64:',time_sign_base64,time_i)
    
    if(roomid=='dtns')
    {
        //连接的是公网（包含可同步文件等完全的rtc-service）
        window.g_defaultDTNSRTCArray =  [] //defaultDTNSRTC
        if(typeof g_tns_urls!='undefined')
        for(let i=0;i<g_tns_urls.length;i++)
        {
            const defaultDTNSRTC = new RTCService('dtns.network|host|'+time_i+'|'+time_sign_base64+'|',g_tns_urls[i],null,false)
            g_defaultDTNSRTCArray.push(defaultDTNSRTC)
        }
        console.log('dtns.network-defaultDTNSRTCArray:',g_defaultDTNSRTCArray)
    }

    //rpc_api_config.js
    const rpc_client = new RPCClient(defaultRTCRoomID,null,null,1)
    window.rpc_client = rpc_client

    //groupchat_c.js
    rpc_client.setPeerRefreshCallback(function(){
        groupchat_c.wait()
        // wait()
    })

    //lx_all.js
    main(defaultRTCRoomID)

    if(roomid=='dtns')
    {
        window.dtns_root_keys = undefined
        delete window.dtns_root_keys
        window.g_dtns_network_client = undefined
        delete window.g_dtns_network_client

        //启动dtns_all
        dtns_main(defaultRTCRoomID)
        //me:  app.js
        // let time_i = Date.now()
        // var time_hash = CryptoJS.HmacSHA256(''+time_i, 'GhFyf9JhRp5Pi3JuUfjLG');
        // var time_sign_base64 = time_hash.toString(CryptoJS.enc.Base64)
        // console.log('time_sign_base64:',time_sign_base64,time_i)
        const rpcDTNSInnerHost = new RTCHost('dtns-inner-room|host|'+time_i+'|'+time_sign_base64+'|')
        routes(rpcDTNSInnerHost)
        rpcDTNSInnerHost.setChatC(groupchat_c)
        window.rpcDTNSInnerHost = rpcDTNSInnerHost

        //rpcDTNSInnerHost连接成功后，再设置rpcHost（因为这个依赖于此）
        rpcDTNSInnerHost.setPeerRefreshCallback(function(){
            // const rpcHost = new RTCHost(roomid)
            // routes(rpcHost)
            // rpcHost.setChatC(groupchat_c)
            // window.rpcHost = rpcHost
            window.g_rpcHostArray =  [] 
            if(typeof g_tns_urls!='undefined')
            for(let i=0;i<g_tns_urls.length;i++)
            {
                const rpcHost = new RTCHost(roomid,g_tns_urls[i])
                routes(rpcHost)
                rpcHost.setChatC(groupchat_c)
                g_rpcHostArray.push(rpcHost)
                window.rpcHost = rpcHost
            }
            console.log('dtns-g_rpcHostArray:',g_rpcHostArray)

            //用于内部连接用（http请求当前的rpcHost服务）
            const http_client = new RPCClient(roomid,null,null,1)
            window.http_client = http_client    

            console.log('into rpcDTNSInnerHost-peerRefreshCallback and call loginDtnsAndForklist()')
            loginDtnsAndForklist()
        })
    }
    else{
        //roomid is ld  the dtns-root-keys
        
        dtns_main('dtns.network')//须连接dtns.network（这个是内网状态）---如设置了g_dtns_network_client，为client模式。

        // const rpcHost = new RTCHost(roomid)
        // routes(rpcHost)
        // rpcHost.setChatC(groupchat_c)
        // window.rpcHost = rpcHost
        window.g_rpcHostArray =  [] 
        let len = typeof g_rpc_host_muti_flag !='undefined' && g_rpc_host_muti_flag  ? g_tns_urls.length :1
        if(typeof g_tns_urls!='undefined')
        for(let i=0;i<len;i++)
        {
            const rpcHost = new RTCHost(roomid,g_tns_urls[i])
            routes(rpcHost)
            rpcHost.setChatC(groupchat_c)
            g_rpcHostArray.push(rpcHost)
            window.rpcHost = rpcHost
        }
        console.log('dtns-g_rpcHostArray:',g_rpcHostArray)

        //用于内部连接用（http请求当前的rpcHost服务）
        const http_client = new RPCClient(roomid,null,null,1)
        window.http_client = http_client    
    }
}


// app.listen(config.port, () => {
//     console.log("You can debug your app with http://" + config.host + ':' + config.port);
// });
// global.error_log = ErrorLog;
////错误处理
//process.on('uncaughtException', function(err) {
//    console.log(err);
//    error_log.write(err);
//})
//
//process.on('unhandledRejection', (reason, p) => {
//    p.catch((err) => {
//        console.log(err);
//        error_log.write(err.stack); //本地错误日志
//    })
//});
//
//
//
//const error_log = require('./libs/error_log');
//global.error_log = error_log;

//错误处理
// process.on('uncaughtException', function(err) {
//     console.log(err);
//     console.log(err.stack);
//     ErrorLog.write(err);
//     ErrorLog.write(err.stack);
// })

// process.on('unhandledRejection', (reason, p) => {
//     p.catch((err) => {
//         console.log(err);
//         console.log(err.stack);
//         ErrorLog.write(err.stack); //本地错误日志
//     })
// });


//2019.1.14重载console.log日志（这个挺有用的）
// console.log = (function (oriLogFunc) {
//     return function (str) {
//         //if(config.debug)
//         {
//             // ErrorLog.write("[" + new Date() + "]:" + str)
//             oriLogFunc.call(console, "[" + new Date() + "]:" + str);
//         }
//     }
// })(console.log);

//用于调试JSON解析，较为容易出现问题地方2019-1-24
//JSON.parse = (function (originFunc) {
//    return function (str) {
//        console.log("[JSON.parse]:" + str)
//        if (!str) return {}
//        return originFunc.call(JSON, str);
//    }
//})(JSON.parse);
//
//
////改善字符串的处理。
//JSON.stringify = (function (originFunc) {
//    return function (str) {
//
//        //console.log("[JSON.stringify]:" + str+" typeof:"+(typeof str))
//
//        if((typeof str)=='string')
//            return str;
//        else
//            return originFunc.call(JSON, str);
//    }
//})(JSON.stringify);




//初始化表。
// require('./model/clt_user_m').initDb();
// require('./model/clt_recharge_m').initDb();
// require('./model/clt_music_m').initDb();
// require('./model/clt_touzi_m').initDb();
// require('./model/clt_download_m').initDb();
// require('./model/clt_reward_m').initDb();
// require('./model/clt_config_m').initDb();

//初始化风景图（用于群聊的默认图片）
// const fengjing_imgs = require('./fengjing_imgs').get_list()
// //初始化萌宠图（用于注册新用户的默认图片）
// const mc_logos = require('./mc_logos').get_list()