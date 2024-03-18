const  HttpApi = require('./http-api')
// const http2 = require('http2-wrapper');

globalThis.window = globalThis
window.BASE_URL= 'https://aws.okex.com/'//null//'https://aws.okex.com/'
window.API_KEY = "*"// '*' 
window.API_SECRET= "*"//'*' 
window.API_PASS= '*'//'*' 
const opt = window.BASE_URL ? { baseURL: window.BASE_URL } : {};

const httpApi = new HttpApi(window.API_KEY, window.API_SECRET, window.API_PASS, { ...opt})//, transport: http2 });
// const wsApi = window.g_stop_ws_flag ?  null: new WsApi(window.API_KEY, window.API_SECRET, window.API_PASS, false);

module.exports = { httpApi}//s, wsApi };
//*
// apikey = "*"
// secretkey = "*"
// IP = "***"
// 备注名 = "hk-web"
// 权限 = "读取"