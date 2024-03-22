/**
 * 初始化配置加载
 */

// const pkg = require('./package.json');
// const str_filter = require("./libs/str_filter")

const config = {
    debug: true,
    host: '127.0.0.1',
    port: 8088,
    name: 'FORKList',
    redis_key:'FORKList_key:',
    version: '1.0.1',//pkg.version,
    file_temp:__dirname+'/file_temp/',
    dtns_db_path:__dirname+'/data/',
    hub_db_path:__dirname+'/data/',
    log_path:__dirname+"/logs/",
}

const fs = require('fs');
const errorLogfile = fs.createWriteStream(config.log_path + str_filter.GetDateFormat('y-m-d')+'.log',
    { flags: 'a', encoding: null, mode: 0777 });

//2023-6-20新增，支持public-node全公开节点（检验vip权限 或 普通用户权限即可--甚至无须登录）
window.g_dnalink_node_allow_user_sync= true
window.g_dnalink_node_allow_user_sync_no_login = true 
window.g_dnalink_node_allow_vip_sync = false
window.g_dnalink_node_allow_vip_sync_params_chatid = null
window.g_sync_files_flag = true
window.g_dnalink_node_auto_gen_keys = false//true

window.g_tns_nslookup_url = 'https://static.yunapi.org/tns-urls.json'
window.g_turn_nslookup_url= 'https://static.yunapi.org/turn-urls.json'
window.g_tns_default_url = 'https://groupbuying.opencom.cn:446'
window.g_phones_default_url='https://static.yunapi.org/phones.json'
window.g_dtns_nslookup_static_urls = ['http://static.dtns.opencom.cn','http://static.dtns.forklist.opencom.cn']


var forklist_user = {private_key:'*',
    public_key:'*',
    web3name:'dev00app'}
window.g_forklist_user = forklist_user

window.g_dtns_web3app_creator_keys = {private_key:'*',
    public_key:'*'}
   

window.g_turn_server_config = [
    {
      urls:[
          'turn:groupbuying.opencom.cn:3478',
        ],
        username: 'user1',
        credential: 'YjXverJx231vJPok',
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

} 

// const sqldb = new SQLDB()
// sqldb.initDB({type:'buffer',buffer:null,dbtype:'sqljs'},null,//{type:'file',filepath:'rmb_test.db',dbtype:'sqlite3'},//filepath:'db1.1.data',dbtype:'sqlite3'
//                         {type:'level',path:'user_cache',vtype:'json'})
config.errorLogfile = errorLogfile
module.exports.config = config;
// // module.exports.db_cloud = db_cloud;
// module.exports.user_redis = sqldb;
// window.user_redis = sqldb
module.exports.errorLogfile = errorLogfile;

