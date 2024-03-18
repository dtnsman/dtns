/**
 * Created by  lauo.li on 2019/3/21
 * 初始化配置加载
 */

const pkg = require('./package.json');
const str_filter = require("./libs/str_filter")

const config = {
    debug: true,
    host: '127.0.0.1',
    port: 8088,
    name: 'FORKList',
    redis_key:'FORKList_key:',
    version: pkg.version,
    file_temp:__dirname+'/file_temp/',
    log_path:__dirname+"/logs/",
}

const fs = require('fs');
const errorLogfile = fs.createWriteStream(config.log_path + str_filter.GetDateFormat('y-m-d')+'.log',
    { flags: 'a', encoding: null, mode: 0777 });

//2023-6-20新增，支持public-node全公开节点（检验vip权限 或 普通用户权限即可--甚至无须登录）
window.g_ib3_node_open_inner_chain_flag = true
window.g_dnalink_node_allow_user_sync= true
window.g_dnalink_node_allow_user_sync_no_login = true 
window.g_dnalink_node_allow_vip_sync = false
window.g_dnalink_node_allow_vip_sync_params_chatid = null
window.g_sync_files_flag = false
window.g_dweb_fee = 1
window.g_system_tax = 0.3
window.g_system_tax_gas = 1
window.g_system_tax_setting = null
window.g_system_tax_setting_map = {'tax:svr':[{token:'mark_svr000000000000000000000000000',tax:0.3,type:'tax'}]}
window.g_rt_chess_robot_env_ok = true

window.g_tns_nslookup_url = 'https://static.yunapi.org/tns-urls.json'
window.g_turn_nslookup_url= 'https://static.yunapi.org/turn-urls.json'
window.g_tns_default_url = 'https://groupbuying.opencom.cn:446'
window.g_phones_default_url='https://static.yunapi.org/phones.json'
window.g_dtns_nslookup_static_urls = ['http://static.dtns.forklist.opencom.cn','http://static.dtns.opencom.cn']//['http://static.dtns.nftlist.com.cn','http://static.dtns.forklist.nftlist.com.cn']

//一些全局的配置信息
var forklist_user = {private_key:'*',
    public_key:'*',
    token:'dtns_nftlist1d00037KU38X3CkS16XE55T7x',
    forkid:'FORKFamwBeQxUW3GJmA9b3A66022716C7C172F08F805CBE67F47816AAC',//'FORK8ND2VxMq2hTR3Khxj44EC53375A74A410D7A17FFFCAC4EB30C18C7',//'FORK8ND2VxMq2hTR3Khxj44EC53375A74A410D7A17FFFCAC4EB30C18C7',
    web3name:'nftlist'}
window.g_forklist_user = forklist_user
window.g_system_send_notice_login_device_notice_flag = true

window.dtns_root_keys = {private_key:'HHiEmv6Z1peZumkzirfwAxagZJgwu4XEaCSkaZWhbT5P',
            public_key:'cfMPiN9Hh5dG2vfbbS18yCgiJZRvSEF1JPuoSWUbKHn2',
            token:'dtns_svr000app2QChoYph6z3yN4e2k5D66md'}

window.g_dtns_network_client = true
window.g_dtns_network_client_not_sync = true

window.g_dtns_network_hmac_key = '***'
window.g_dtns_hmac_key = '***'

//配置积分合约的名称、符号、汇率agio等
window.g_score_setting = {
    openflag:false,//true,,//是否启用
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
    ldx:{
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
    "v.dtns":{
        "turn_urls": [
            "turn:static.yunapi.org:3478"
        ],
        "tns_urls": [
            "http://127.0.0.1:3100"
        ],
        "phones_urls": [
            "https://static.yunapi.org/phones.json"
        ],
        "network": "v.dtns"
    },
    svr:{
        "turn_urls": [
            "turn:static.yunapi.org:3478"
        ],
        "tns_urls": [
            "http://127.0.0.1:3100"
        ],
        "phones_urls": [
            "https://static.yunapi.org/phones.json"
        ],
        "network": "v.dtns"
    },
    svrdev:{
        "turn_urls": [
            "turn:static.yunapi.org:3478"
        ],
        "tns_urls": [
            "http://dev.dtns.yunapi.org"
        ],
        "phones_urls": [
            "https://static.yunapi.org/phones.json"
        ],
        "network": "v.dtns"
    },
    svrdev0:{
        "turn_urls": [
            "turn:static.yunapi.org:3478"
        ],
        "tns_urls": [
            "http://dev.dtns.yunapi.org"
        ],
        "phones_urls": [
            "https://static.yunapi.org/phones.json"
        ],
        "network": "v.dtns"
    },
    svrdev1:{
        "turn_urls": [
            "turn:static.yunapi.org:3478"
        ],
        "tns_urls": [
            "http://dev.dtns.yunapi.org"
        ],
        "phones_urls": [
            "https://static.yunapi.org/phones.json"
        ],
        "network": "v.dtns"
    },
    svrdev2:{
        "turn_urls": [
            "turn:static.yunapi.org:3478"
        ],
        "tns_urls": [
            "http://dev.dtns.yunapi.org"
        ],
        "phones_urls": [
            "https://static.yunapi.org/phones.json"
        ],
        "network": "v.dtns"
    },
    "dev.dtns":{
        "turn_urls": [
            "turn:static.yunapi.org:3478"
        ],
        "tns_urls": [
            "http://dev.dtns.yunapi.org"
        ],
        "phones_urls": [
            "https://static.yunapi.org/phones.json"
        ],
        "network": "dev.dtns"
    },
    "dtns.network":{
        "turn_urls": [
            "turn:groupbuying.opencom.cn:3478"
        ],
        "tns_urls": [
            "https://tns.yunapi.org"
        ],
        "phones_urls": [
            "https://static.yunapi.org/phones.json"
        ],
        "network": "x.dtns"
    }
} 

// const db_config = require('./db_config');
// const DB = require('./libs/DB');
// const db_cloud = new DB(db_config);


// const redis_config = require('./redis_config');
// const RedisClient = require('./libs/RedisClient');
// const user_redis = new RedisClient(redis_config);

const sqldb = new SQLDB()
sqldb.initDB({type:'buffer',buffer:null,dbtype:'sqljs'},null,//{type:'file',filepath:'rmb_test.db',dbtype:'sqlite3'},//filepath:'db1.1.data',dbtype:'sqlite3'
                        {type:'level',path:__dirname+'/user_cache',vtype:'json'})

const sqldb2 = new SQLDB()
sqldb2.initDB({type:'file',filepath: __dirname+'/static/lx/kmm.db',dbtype:'sqlite3-better'},null,//{type:'buffer',buffer:config.dbBuff,dbtype:'sqljs'},//{type:'file',filepath:'chat02G32Zmqgh8P_gsb.db',dbtype:'sqlite3'},//filepath:'db1.1.data',dbtype:'sqlite3'
                    {type:'sql',path:'leveldb_cache1',vtype:'json'})

module.exports.config = config;
module.exports.user_redis = sqldb;
window.user_redis = sqldb
window.kmmDb = sqldb2
module.exports.errorLogfile = errorLogfile;

