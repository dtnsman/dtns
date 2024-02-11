/**
 * create by dtns.connector
 * 2023-6-14
 * 用途：主要用于dtns.connector全局配置项
 */
window.g_default_roomid = 'dtns'
window.g_ibapp_status_urls = ['https://groupbuying.opencom.cn:446/hosts']

window.g_tns_nslookup_url = 'https://static.yunapi.org/tns-urls.json'
window.g_turn_nslookup_url= 'https://static.yunapi.org/turn-urls.json'
window.g_tns_default_url = 'https://groupbuying.opencom.cn:446'
window.g_phones_default_url='https://static.yunapi.org/phones.json'
window.g_dtns_nslookup_static_urls = ['http://static.dtns.forklist.opencom.cn','http://static.dtns.opencom.cn']//['http://static.dtns.nftlist.com.cn','http://static.dtns.forklist.nftlist.com.cn']
// let forklist_user = {}
// window.g_forklist_user = forklist_user
// window.dtns_root_keys = {}
// window.dtns_root_keys = {}

window.g_dtns_network_hmac_key = '***'
window.g_dtns_hmac_key = '***'

//配置积分合约的名称、符号、汇率agio等
// window.g_score_setting = {
//     openflag:true,//是否启用
//     name:'',symbol:'$',emoji:'',logo:'',agio:100,//agio是1RMB->agio-$
//     web3app_token:dtns_root_keys.token,//fxradio
// }
// window.g_dtns_network_client = true

window.g_turn_server_config = [
    {
      urls:[
          'turn:groupbuying.opencom.cn:3478',
        ],
        username: 'user1',
        credential: 'YjXverJx231vJPok',
    }
  ]

//webrtc-chat  import rtcchat from "../pages/rtcchat/RTCChat.vue"
window.g_rtchat_turn_server_config = [
    {
        urls: [
            // 'turn:groupbuying.opencom.cn:3478',
            'turn:static.yunapi.org:3478'
        ],
        username: 'user1',//'1678502396:user1',
        credential:'YjXverJx231vJPok',//'LIb3/pUnzapcQ4Kw/v5F9SN5jRQ='// 'Bkj46bOLbCaC2wmmWEOSLndQtxs'//'YjXverJx231vJPok',
    }
    ]
window.g_rtchat_tns_url = "https://groupbuying.opencom.cn:441"

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
    }

} 