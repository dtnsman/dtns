/**
 * 2023.4.6
 * 将browser浏览器版本改为node.js版本的文件（static）。
 * @type {*|exports}
 */
globalThis.window = globalThis

window.crypto = require('crypto')
const eccryptoJS =  require('eccrypto-js')
window.eccryptoJS = eccryptoJS
const bs58 = require(`bs58`);
window.bs58 = bs58
const BigNumber = require('bignumber.js');
window.BigNumber = BigNumber

const JSZip = require(`jszip`);
window.JSZip = JSZip

require('./static/SQLDB')


require('./static/str_filter')
// window.str_filter = str_filter

const http_req = require('./dlibs/http_request')
window.http_req = http_req
require('./static/key_util_eccryptojs')
console.log('key_util',key_util)
require('./static/sign_util')
console.log('sign_util',sign_util)
window.groupchat_c = null

require('./config_roomid.js')
// window.defaultRTCRoomID =  'forklist'//'dtns'// 'forklist'//'nftlist'//'ld'
// window.ll_config = {roomid:defaultRTCRoomID,redis_key:'FORKList_key:'}


async function queryUrls()
{
    let tnsUrls = await
    http_req.http_get( typeof g_tns_nslookup_url!='undefined' ? g_tns_nslookup_url : 'https://static.yunapi.org/tns-urls.json')//?timestamp='+time_x+'&sign='+encodeURIComponent(time_sign_base64), )
    window.g_tns_urls = tnsUrls ? (tnsUrls.data ? tnsUrls.data :tnsUrls) :null

    let turnUrls = await
    http_req.http_get( typeof g_turn_nslookup_url!='undefined' ? g_turn_nslookup_url : 'https://static.yunapi.org/turn-urls.json')//?timestamp='+time_x+'&sign='+encodeURIComponent(time_sign_base64), 
    window.g_turn_urls = turnUrls ? (turnUrls.data ? turnUrls.data :turnUrls) :null
    console.log('g_tns_urls:',g_tns_urls,'g_turn_urls:',g_turn_urls)
}

async function main_now(){

await queryUrls()

require('./dlibs/ifiledb')
window.ifileDb = new IFileIndexDB()
require('./dlibs/localstorage')

// require("./static/sql-wasm.js")
require("./static/SQLDB.js")
// <!-- require("./static/str_filter.js")
// require("./static/key_util_eccryptojs.js") -->
// <!-- require("./static/key_util.js") -->
require("./static/lx/lianxian_gsb_59872.js")
require("./static/lx/lianxian_msg_59876.js")
require("./static/lx/lianxian_obj_59875.js")
require("./static/lx/lianxian_order_59871.js")
require("./static/lx/lianxian_rmb_59874.js")
require("./static/lx/lianxian_score_59873.js")
require("./static/lx/lianxian_user_59877.js")
require("./static/lx/lianxian_vip_59870.js")
require("./static/dtns/dtns-score.js")
require("./static/dnalink_api_util.js")
require("./static/pop_runtime2.js")
require("./static/dnalink_dao_chain.js")
require("./static/dnalink_dao_wallet.js")
require("./static/dnalink_protocol.js")
require("./static/dnalink_engine.js")
// <!-- require("./static/dnalink_rtc_client.js") -->
require("./static/str_filter.js")
require("./static/lx_all.js")
require("./static/dtns_all.js")

// require('./static/dnalink_api_util')
// require('./static/dnalink_dao_chain')
// require('./static/dnalink_dao_wallet')
// require('./static/dnalink_engine')
// require('./static/dnalink_protocol')
// require('./static/dnalink_rpc')
// require('./static/dnalink_rtc_client')
// require('./static/dnalink_rtc_service')
// require('./static/dnalink_super_file')
// require('./static/dnalink_super_meta')
// require('./static/dnalink_super_websocket')
// require('./static/SQLDB')
// require('./static/dtns/dtns-score')
// require('./static/dtns_all')

// require('./static/nftlist/NFTList-obj')
// require('./static/nftlist/NFTList-user')
// require('./static/nftlist/NFTList-rmb')
// require('./static/nftlist/NFTList-order')
// require('./static/nftlist_all')

const config = require('./config').config;
// window.config = config
//引入重新定义的forklist_c.js
// require('./controller/forklist_c')
// require('./controller/fork_order_c')
// require('./controller/forklist_pay_c')

// const routes = require('./routes');
// window.rpc_query = require('./rpc_api_config').rpc_query
// console.log('window-rpc_query:',typeof rpc_query,typeof window.rpc_query)

// require('./static/lx/middleware/common_interceptor')
// require('./static/lx/controller/mc_logos.js')
// require('./static/lx/controller/fengjing_imgs.js')
// require('./static/lx/controller/address_c.js')
// require('./static/lx/controller/cashout_c.js')
// require('./static/lx/controller/classify_c.js')
// require('./static/lx/controller/console_c.js')
// require('./static/lx/controller/customer_c.js')
// require('./static/lx/controller/fapiao_c.js')
// require('./static/lx/controller/feedback_c.js')
// require('./static/lx/controller/file_c.js')
// require('./static/lx/controller/groupchat_c.js')
// // <!-- require('./static/lx/controller/groupchat_live_c.js') -->
// require('./static/lx/controller/gsbshop_c.js')
// require('./static/lx/controller/manager_c.js')
// require('./static/lx/controller/menu_c.js')
// require('./static/lx/controller/obj_c.js')
// require('./static/lx/controller/order_c.js')
// require('./static/lx/controller/post_c.js')
// require('./static/lx/controller/product_c.js')
// // <!-- require('./static/lx/controller/pusher_c.js') -->
// // <!-- require('./static/lx/controller/qrcode_c.js') -->
// require('./static/lx/controller/shop_c.js')
// require('./static/lx/controller/shopping_c.js')
// require('./static/lx/controller/srcshop_c.js')
// require('./static/lx/controller/store_c.js')
// require('./static/lx/controller/user_c.js')
// // <!-- require('./static/lx/controller/user_weixin_c.js') -->
// require('./static/lx/routes/index.js')
// //------lx-dnalink.node-----------------//
// //------lx-dnalink.node-----------------//
// require('./static/lx/lianxian_gsb_59872')
// require('./static/lx/lianxian_msg_59876')
// // require('./static/lx/lianxian_obj_59875')
// // require('./static/lx/lianxian_order_59871')
// // require('./static/lx/lianxian_rmb_59874')
// require('./static/lx/lianxian_score_59873')
// // require('./static/lx/lianxian_user_59877')
// require('./static/lx/lianxian_vip_59870')
// require('./static/lx_all')

require('./static/DTNSManager')
// require('./dlibs/RPCHost')
// require('./dlibs/RPCClient')
require('./static/dnalink_rtc_client')


// //配置积分合约的名称、符号、汇率agio等
// window.g_score_setting = {
//     openflag:true,//是否启用
//     name:'',symbol:'$',emoji:'',logo:'',agio:100,//agio是1RMB->agio-$
//     web3app_token:dtns_root_keys.token,//fxradio
// }

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

// global.ErrorLog = require('./libs/ErrorLog');

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(express.static('dist'))
app.use('/h5',express.static('h5'))

// const defaultRTC = new RTCService(defaultRTCRoomID)
// window.defaultRTC = defaultRTC

// let time_i = Date.now()
// var time_hash = sign_util.getInnerMsgSign(''+time_i, g_dtns_network_hmac_key)// CryptoJS.HmacSHA256(''+time_i, g_dtns_network_hmac_key);
// var time_sign_base64 = time_hash//time_hash.toString(CryptoJS.enc.Base64)
// console.log('time_sign_base64:',time_sign_base64,time_i)

// if(defaultRTCRoomID=='dtns')
// {
//     //连接的是公网（包含可同步文件等完全的rtc-service）
//     const defaultDTNSRTC = new RTCService('dtns.network|host|'+time_i+'|'+time_sign_base64+'|',null,null,false)
//     window.defaultDTNSRTC = defaultDTNSRTC
// }

// app.use(express.static('public'))
window.g_axios = {get:async function(url,options){
    return http_req.http_get(url,options ? options.params: {})
}}
const dtnsManager = new DTNSManager()
window.g_dtnsManager = dtnsManager
console.log('ok-g_dtnsManager:',g_dtnsManager)
window.g_loginDtnsAndForklist = loginDtnsAndForklist
window.g_loginDtnsAndForklist_started = false

const rpc_client = new RTCClient(defaultRTCRoomID,null,null,false)//new RPCClient(defaultRTCRoomID,null,null,1)
window.rpc_client = rpc_client
//groupchat_c.js
rpc_client.setPeerRefreshCallback(async function(){
    // groupchat_c.wait()
    console.log('now call g_bakdb_start2:',g_bakdb_start2)

    let forklist_user =  g_forklist_user

    let web3name = defaultRTCRoomID///'nftlist'
    let timestamp = parseInt( Date.now()/1000)
    let hash = await key_util.hashVal(web3name+':'+timestamp)
    let sign = await key_util.signMsg(hash,forklist_user.private_key) //使用的是dtns-device-id设备id的密钥

    let ret = await g_dtnsManager.run('dtns://web3:'+web3name+'/user/device/login',{timestamp,web3name,sign})
    console.log(web3name+'-/user/device/login--ret:'+JSON.stringify(ret))

    if(!ret || !ret.ret) return 
    window.g_forklist_user_session = ret
    localStorage.setItem('userInfo',JSON.stringify(ret))

    await g_sync_web3keys()
    // process.exit(1)
    //return 

    window.m_onbeforeunload_results = []
    g_bakdb_start2()
})

dtnsManager.addRPCClient(rpc_client)

window.bakDbStart = bakDbStart
function bakDbStart(defaultRTCRoomID = 'dtns')
{
    let roomid= defaultRTCRoomID
    
    //lx_all.js
    main(defaultRTCRoomID)

    if(roomid=='dtns')
    {
        //启动dtns_all
        dtns_main(defaultRTCRoomID)
    }
    else{
        dtns_main('dtns.network')
    }
}
//将所有的同步数据保存到indexDb中（ifileDb）
function save(alertFlag = false)
{
    window.m_onbeforeunload_results = []
    let flag = false
    if(typeof m_onbeforeunload == 'function'){
        m_onbeforeunload()
        if(alertFlag) alert('保存成功')
        console.log('保存成功')
        flag = true
    }else{
        console.log('保存函数不存在')
    }
    return {ret:flag,list:m_onbeforeunload_results,msg:flag ? 'success':'save failed'}
}
window.m_onbeforeunload_save = save
async function updateKeys(tokenName,private_key,public_key)
{
    window.m_onbeforeunload_results = []
    let flag = false
    if(typeof m_onbeforeunload == 'function'){
        await m_onbeforeunload({token_name:tokenName,private_key,public_key})
        // if(alertFlag) alert('设置成功')
        console.log('设置成功')
        flag = true
    }else{
        console.log('设置函数不存在')
    }
    return {ret:flag,list:m_onbeforeunload_results,msg:flag ? 'success':'save failed'}
}
window.g_update_keys = updateKeys

//同步密钥的函数
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
    let dtns_wallet_keys = window.g_dtns_web3app_creator_keys 
    //查询得到private_key
    let keys = dtns_wallet_keys//await iWalletDb.getAllDatas()
    if(keys && keys.public_key== dtns_public_key) dtns_private_key = keys.private_key

    // console.log('keys:',keys)
    // for(let i=0;i<keys.length;i++)
    // {
    //     if(keys[i].data && keys[i].data.public_key == dtns_public_key)
    //     {
    //         dtns_private_key = keys[i].data.private_key
    //         break;
    //     }
    // }
    window.g_sync_web3keys_results = null
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
    if(results && results.length>0)
    {
        window.g_sync_web3keys_results = results
    }

    console.log('g_sync_web3keys_results:',results)
    return results

    // let xresults = []
    // for(let i=0;i<results.length;i++)
    // {
    //     let obj = results[i]
    //     let uret = null;
    //     if(obj && obj.token && obj.private_key && obj.public_key)
    //     {
    //         console.log('now update-keys:',obj.token.split('_')[0],obj.private_key , obj.public_key)
    //         uret = await g_update_keys(obj.token.split('_')[0], obj.private_key , obj.public_key)
    //         console.log('now update-keys-uret:',uret)
    //     }
    //     xresults.push(uret)
    // }

    // return xresults
}

window.g_bakdb_start = function()
{
    bakDbStart(rpc_client.roomid)
}

window.g_bakdb_start2 = function()
{
    window.g_sync_files_flag = true
    bakDbStart(rpc_client.roomid)
}

// nftlist_main()
// lx_main()

// if(defaultRTCRoomID=='dtns')
// {
//     window.dtns_root_keys = undefined
//     delete window.dtns_root_keys
//     window.g_dtns_network_client = undefined
//     delete window.g_dtns_network_client

//     //启动dtns_all
//     dtns_main(defaultRTCRoomID)
//     //me:  app.js
//     // let time_i = Date.now()
//     // var time_hash = CryptoJS.HmacSHA256(''+time_i, 'GhFyf9JhRp5Pi3JuUfjLG');
//     // var time_sign_base64 = time_hash.toString(CryptoJS.enc.Base64)
//     // console.log('time_sign_base64:',time_sign_base64,time_i)
//     const rpcDTNSInnerHost = new RTCHost('dtns-inner-room|host|'+time_i+'|'+time_sign_base64+'|')
//     routes(rpcDTNSInnerHost)
//     rpcDTNSInnerHost.setChatC(groupchat_c)
//     window.rpcDTNSInnerHost = rpcDTNSInnerHost

//     //rpcDTNSInnerHost连接成功后，再设置rpcHost（因为这个依赖于此）
//     rpcDTNSInnerHost.setPeerRefreshCallback(function(){
//         const rpcHost = new RTCHost(defaultRTCRoomID)
//         routes(rpcHost)
//         rpcHost.setChatC(groupchat_c)
//         window.rpcHost = rpcHost

//         //用于内部连接用（http请求当前的rpcHost服务）
//         const http_client = new RPCClient(defaultRTCRoomID,null,null,1)
//         window.http_client = http_client    
//     })
// }else
// {
//     dtns_main('dtns.network')    
//     const rpcHost = new RTCHost(defaultRTCRoomID)
//     rpcHost.setChatC(groupchat_c)
//     routes(rpcHost)
//     lx_routes(rpcHost)
//     window.rpcHost = rpcHost
// }


async function loginDtnsAndForklist()
{
    if(defaultRTCRoomID=='nftlist')
        return ;

    window.g_loginDtnsAndForklist_started = true
    console.log('ok2-g_dtnsManager:',g_dtnsManager)
}

// 路由
// routes(app);
// lx_routes(app)

app.listen(8000, () => {
    console.log("You can debug your app with http://127.0.0.1:8000");
});
global.error_log = config.errorLogfile;
global.ErrorLog = config.errorLogfile;

/**
 * 可供本地调用的交互接口
 * 2023-6-25新增
 */
app.all('/save',async function(req,res){
    window.m_onbeforeunload_results = []
    await m_onbeforeunload()
    if(m_onbeforeunload_results.length>0)
    {
        res.json({ret:true,msg:'success',results:m_onbeforeunload_results})
    }else{
        res.json({ret:false,msg:'save failed!'})
    }
})


//错误处理
process.on('uncaughtException', function(err) {
    console.log('uncaughtException:',err);
    console.log('uncaughtException:',err.stack);
    ErrorLog.write('uncaughtException:'+err);
    ErrorLog.write('uncaughtException:'+err.stack);
})

process.on('unhandledRejection', (reason, p) => {
    p.catch((err) => {
        console.log('unhandledRejection:',err);
        console.log(err ? err.stack:err+'unhandledRejection'+null);
        ErrorLog.write(err ? err.stack:err+'unhandledRejection'+null); //本地错误日志
    })
});


//2019.1.14重载console.log日志（这个挺有用的）
// console.log = (function (oriLogFunc) {
//     return function () {

//     var cache = new Map()
//       //[timeStr,...arguments]
//       var str = JSON.stringify(arguments, function(key, value) {
//           if (typeof value === 'object' && value !== null) {
//               if (cache.has(value)) //cache.indexOf(value) !== -1) 
//               {
//                   // 移除
//                   return;
//               }
//               // 收集所有的值
//               //cache.push(value);
//               cache.set(value,'')
//             //   if(value.length && value.length>1024*100)
//             //     return Buffer.from([])
//           }
//           return value;
//       });

//         if(config.debug)
//         {
//             ErrorLog.write("[" + new Date() + "]:" +str)
//             oriLogFunc.call(console, "[" + new Date() + "]:" ,...arguments);

//             if(str && str.indexOf('cannot signal after peer is destroyed')>=0){
//                 process.exit(1);
//             }
//         }
//     }
// })(console.log);

}

main_now()