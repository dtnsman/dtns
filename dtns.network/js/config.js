/**
 * Created by dtns.network
 * 初始化配置加载
 */

// const pkg = require('./package.json');
// const str_filter = require("./libs/str_filter")


const __dirname__ = ''
const ll_config = {
    debug: true,
    host: '127.0.0.1',
    port: 9000,//8080,
    ws_port:63333,
    live_rtmp_port:1935,
    live_http_port:8000,
    live_api_user:'apiuser',
    live_api_pass:'???',
    live_api_auth_flag:true,
    live_play_auth_flag:true,
    live_publish_auth_flag:false,
    live_auth_secret:'?????',
    live_rtmp_url:'rtmp://pusher.dtns.live/live/',
    live_http_url:'http://pusher.dtns.live/live/',
    live_cdn_url:'http://cdn.pusher.dtns.live/live/',
    chat_share_url : 'http://pop.dtns/#/LiveBroadcast/videoChat/',
    live_ffmpeg_bin:'/data/ffmpeg-4.2.2-i686-static/ffmpeg',
    //客服系统
    init_console_user:'user_2wvk4sYNGWhsng6R',
    //port: 80,
    name: 'dtns.network',
    redis_key:'dtnsnetwork_key:',
    deploy_interval_time:10000,
    version:100,// pkg.version,
    file_temp:__dirname+'/file_temp/',
    log_path:__dirname+"/logs/",
    //2023-1-6
    roomid:'dtns-cell',
    defaultRTCRoomID:'dtns-cell',
    // file_temp:__dirname+'/Users/opencom/groupchat/source/service-src/file_temp/',
    // log_path:__dirname+"/Users/opencom/groupchat/source/service-src/logs/",
}

// const fs = require('fs');
// const errorLogfile = fs.createWriteStream(config.log_path + str_filter.GetDateFormat('y-m-d')+'.log',
//     { flags: 'a', encoding: null, mode: 0777 });//679 
// const errorLogfile = fs.createWriteStream(config.log_path + str_filter.GetDateFormat('y-m-d')+'.log',
//     { flags: 'a', encoding: null, mode: 679 });//0777

// const db_config = require('./db_config');
// const DB = require('./libs/DB');
// const db_cloud = new DB(db_config);

//2023-6-20新增，支持public-node全公开节点（检验vip权限 或 普通用户权限即可--甚至无须登录）
window.g_dnalink_node_allow_user_sync= true
window.g_dnalink_node_allow_user_sync_no_login = true 
window.g_dnalink_node_allow_vip_sync = false
window.g_dnalink_node_allow_vip_sync_params_chatid = null
window.g_sync_files_flag = false // true
window.g_dweb_fee = 1

window.g_tns_nslookup_url = 'https://static.yunapi.org/tns-urls.json'
window.g_turn_nslookup_url= 'https://static.yunapi.org/turn-urls.json'
window.g_static_dtns_network_nslookup_url= 'https://static.yunapi.org/static-dtns-network.json'
window.g_tns_default_url = 'https://groupbuying.opencom.cn:446'
window.g_phones_default_url='https://static.yunapi.org/phones.json'
window.g_dtns_nslookup_static_urls = ['http://static.dtns.forklist.opencom.cn','http://static.dtns.opencom.cn']//['http://static.dtns.nftlist.com.cn','http://static.dtns.forklist.nftlist.com.cn']

let forklist_user = {private_key:'*',
        public_key:'*',
        token:'*',
        forkid:'*',
        web3name:'*'}
window.g_forklist_user = forklist_user

window.dtns_root_keys = {private_key:'*',
            public_key:'*',
            token:'*'}

window.g_dtns_network_hmac_key = '*'
window.g_dtns_hmac_key = '*'

//配置积分合约的名称、符号、汇率agio等
window.g_score_setting = {
    openflag:true,//是否启用
    name:'',symbol:'$',emoji:'',logo:'',agio:100,//agio是1RMB->agio-$
    web3app_token:dtns_root_keys.token,//fxradio
}
window.g_dtns_network_client = true

window.g_turn_server_config = [
    {
      urls:[
          'turn:groupbuying.opencom.cn:3478',
        ],
        username: 'user1',
        credential: '*',
    }
  ]

//静态的dtns.network的urls之指向
window.g_dtns_network_static_hosts = {
    //主网的默认配置在此（用于误设置时恢复使用）
    main:{
        "turn_urls": [
            "turn:groupbuying.opencom.cn:3478"
        ],
        "tns_urls": [
            "https://groupbuying.opencom.cn:446"
        ],
        "phones_urls": [
            "https://static.yunapi.org/phones.json"
        ],
        "network": "main.dtns"
    },
    //以下是各个web3name被强制指向
    ld:{
        "turn_urls": [
            "turn:groupbuying.opencom.cn:3478"
        ],
        "tns_urls": [
            "http://tns.yunapi.org"
        ],
        "phones_urls": [
            "https://static.yunapi.org/phones.json"
        ],
        "network": "x.dtns"
    },
    // "dtns.network":{
    //     "turn_urls": [
    //         "turn:groupbuying.opencom.cn:3478"
    //     ],
    //     "tns_urls": [
    //         "https://tns.yunapi.org"
    //     ],
    //     "phones_urls": [
    //         "https://static.yunapi.org/phones.json"
    //     ],
    //     "network": "x.dtns"
    // }
} 

// const redis_config = require('./redis_config');
// const RedisClient = require('./libs/RedisClient');
async function initConfigDb(name='')
{
    // const SQLDB = require('./libs/SQLDB')
    const sqldb = new SQLDB()

    while(!ifileDb.db)  await str_filter.sleep(100)
    await str_filter.sleep(300)

    let buffer = []
    if(true)//!dbopt || !dbopt.buffer || dbopt.buffer.length==0 )
    {
        console.log('load LX-sqljs-dbBuffer now:')
        //加载缓存
        let item_name = ll_config.roomid+'_last_db'+name
        let bakName = localStorage.getItem(item_name) 
        let dbBuff = await ifileDb.getDataByKey(bakName)
        dbBuff = dbBuff ? dbBuff.data :null
        console.log('LX-db:'+bakName+'----cached-buffer.len:'+(dbBuff?dbBuff.length:0))
        // if(dbopt) dbopt.buffer = dbBuff
        buffer = dbBuff
    }
    
    // let that  = this
    if(typeof onbeforeunload_list =='undefined')
    {
        window.onbeforeunload_list = []
    }
    //window.onbeforeunload = 
    let xfunc = function(){
        console.log('[lx-notice]save db-data before close window')
        let dbname = 'lx'+ll_config.roomid+'.db'
        let data = sqldb.export()
        console.log('save-db-data:',data)
        let bakName = dbname+'.'+new Date().getTime()+'.bak'
        ifileDb.addData({key:bakName,data:data})
        let item_name = ll_config.roomid+'_last_db'+name
        localStorage.setItem(item_name,bakName)
    }
    onbeforeunload_list.push(xfunc)
    window.m_onbeforeunload = function(){
        //遍历
        if(onbeforeunload_list && onbeforeunload_list.length>0)
        for(let i=0;i<onbeforeunload_list.length;i++)
        {
            onbeforeunload_list[i]()
        }
    }
    console.log('onbeforeunload_list-len:'+onbeforeunload_list.length)

    await sqldb.initDB({type:'buffer',buffer:buffer,dbtype:'sqljs'},null,//{type:'file',filepath:'rmb_test.db',dbtype:'sqlite3'},//filepath:'db1.1.data',dbtype:'sqlite3'
                        {type:'sql',path:'leveldb_cache1',vtype:'json'})//'sql'
    // sqldb.initDB(null,'',{type:'level',path:__dirname+'/leveldb-storage',vtype:'json'})
    return sqldb
}
async function configLDB()
{
    const user_redis_ = {}//new RedisClient(redis_config);
    // window.db_cloud = db_cloud;
    window.user_redis = await initConfigDb();
    window.kmmDb      = await initConfigDb('_kmm')
    window.burnlist_redis = user_redis_; //主要用于处理阅兵即焚消息（待后续使用leveldb改进）
    // window.errorLogfile = errorLogfile;
}

window.ll_config = ll_config;
// configLDB()