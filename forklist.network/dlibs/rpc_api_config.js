/**
 * Created by lauo.li on 2019/2/16.
 */
// const http_req = require('./libs/http_request')
// const RPCClient = require('./RPCClient')
// const rpc_client = new RPCClient('linkline-cell',null,null,1)

//这里配置6dgs.node的相关节点信息。
const APPID = '10001'
const SECRET_KEY = '0000'
const NODEID= 'chat02G32Zmqgh8P'

const USER_TOKEN_NAME = 'user'
const RMB_TOKEN_NAME = 'rmb'
const GSB_TOKEN_NAME = 'gsb'
const SCORE_TOKEN_NAME = 'score'
const PCASH_TOKEN_NAME = 'pcash'
const VIP_TOKEN_NAME = 'vip'
const ORDER_TOKEN_NAME = 'order'
const MSG_TOKEN_NAME = 'msg'
const OBJ_TOKEN_NAME = 'obj'
const HT_TOKEN_NAME = 'ht'
const DTNS_TOKEN_NAME='dtns'

window.rpc_api_config={
    NODEID,
    //#1 用户模块-user
    RPC_API_BASE:'forklist.dtns',
    USER_API_BASE: 'http://127.0.0.1:59877',//USER_TOKEN_NAME,
    USER_TOKEN_NAME: USER_TOKEN_NAME,
    USER_TOKEN_ROOT:USER_TOKEN_NAME+"_0000000000000000",
    //#2 人民币模块-rmb
    RMB_API_BASE: 'http://127.0.0.1:59874',//'https://c6.forklist.dtns/node.'+NODEID+'.'+RMB_TOKEN_NAME,
    RMB_TOKEN_NAME: RMB_TOKEN_NAME,
    RMB_TOKEN_ROOT:RMB_TOKEN_NAME+"_0000000000000000",

    //#3 共识币模块-gsb
    GSB_API_BASE: 'http://127.0.0.1:59872',//'https://c6.forklist.dtns/node.'+NODEID+'.'+GSB_TOKEN_NAME,
    GSB_TOKEN_NAME: GSB_TOKEN_NAME,
    GSB_TOKEN_ROOT:GSB_TOKEN_NAME+"_0000000000000000",

    //#4 经验值模块-score
    SCORE_API_BASE: 'http://127.0.0.1:59873',//'https://c6.forklist.dtns/node.'+NODEID+'.'+SCORE_TOKEN_NAME,
    SCORE_TOKEN_NAME: SCORE_TOKEN_NAME,
    SCORE_TOKEN_ROOT:SCORE_TOKEN_NAME+"_0000000000000000",

    //#5 代金券模块-pcash
    // PCASH_API_BASE: 'https://c3.6dgs.opencom.org.cn/node.'+NODEID+'.'+PCASH_TOKEN_NAME+':vvvvvvvvvvv',
    // PCASH_TOKEN_NAME: PCASH_TOKEN_NAME,
    // PCASH_TOKEN_ROOT:PCASH_TOKEN_NAME+"_0000000000000000",

    //#6 VIP模块-vip
    VIP_API_BASE: 'http://127.0.0.1:59870',//'https://c6.forklist.dtns/node.'+NODEID+'.'+VIP_TOKEN_NAME,
    VIP_TOKEN_NAME: VIP_TOKEN_NAME,
    VIP_TOKEN_ROOT:VIP_TOKEN_NAME+"_0000000000000000",

    //#7 订单模块-order
    ORDER_API_BASE: 'http://127.0.0.1:59871',//'https://c6.forklist.dtns/node.'+NODEID+'.'+ORDER_TOKEN_NAME,
    ORDER_TOKEN_NAME: ORDER_TOKEN_NAME,
    ORDER_TOKEN_ROOT:ORDER_TOKEN_NAME+"_0000000000000000",

    //#8 消息模块-msg
    MSG_API_BASE: 'http://127.0.0.1:59876',//'https://c6.forklist.dtns/node.'+NODEID+'.'+MSG_TOKEN_NAME,
    MSG_TOKEN_NAME: MSG_TOKEN_NAME,
    MSG_TOKEN_ROOT:MSG_TOKEN_NAME+"_0000000000000000",

    //#9 内容和商品-事物模块-obj
    OBJ_API_BASE:'http://127.0.0.1:59875',// 'https://c6.forklist.dtns/node.'+NODEID+'.'+OBJ_TOKEN_NAME,
    OBJ_TOKEN_NAME: OBJ_TOKEN_NAME,
    OBJ_TOKEN_ROOT:OBJ_TOKEN_NAME+"_0000000000000000",

    //#10 合约/合同模块-ht
    HT_API_BASE: 'https://c6.forklist.dtns/node.'+NODEID+'.'+HT_TOKEN_NAME,
    HT_TOKEN_NAME: HT_TOKEN_NAME,
    HT_TOKEN_ROOT:HT_TOKEN_NAME+"_0000000000000000",

    //#11
    DTNS_API_BASE:'http://127.0.0.1:80',// 'https://c6.forklist.dtns/node.'+NODEID+'.'+OBJ_TOKEN_NAME,
    DTNS_TOKEN_NAME: DTNS_TOKEN_NAME,
    DTNS_TOKEN_ROOT:DTNS_TOKEN_NAME+"_00000000000000000000000000000000",
}

Object.assign(window,window.rpc_api_config)

window.getNodeUrl = getNodeUrl
function getNodeUrl(url)
{
    url = url.split(':')[2]
    url = url.substring(url.indexOf('/'),url.length)
    console.log('getNodeUrl-return-url:'+url)

    return url;
}
/**
 * 封装的rpc请求。
 * @type {rpc_query}
 */
window.rpc_query = rpc_query
async function rpc_query(url,reqdata){
    reqdata = !reqdata ? {}:reqdata;
    if(!reqdata.appid || !reqdata.secret_key) {
        reqdata.appid = APPID
        reqdata.secret_key = SECRET_KEY
    }
    try{
        if(reqdata.begin) reqdata.begin = parseInt(reqdata.begin)
        if(reqdata.len) reqdata.len = parseInt(reqdata.len)
    }catch(ex){
        
    }
    if(url.indexOf(':59877')>0)//'node.'+NODEID+'.user')>0)
    {
        reqdata.appid = '10001'
        reqdata.secret_key = '*'
    }

    if(url.indexOf(':59874')>0)//'node.'+NODEID+'.rmb')>0)
    {
        reqdata.appid = '10001'
        reqdata.secret_key = '*'
    }

    if(url.indexOf(':59872')>0)//'node.'+NODEID+'.gsb')>0)
    {
        reqdata.appid = '10001'
        reqdata.secret_key = '*'
    }


    if(url.indexOf(':59873')>0)//'node.'+NODEID+'.score')>0)
    {
        reqdata.appid = '10001'
        reqdata.secret_key = '*'
    }

    if(url.indexOf('node.'+NODEID+'.pcash')>0)
    {
        reqdata.appid = '10001'
        reqdata.secret_key = '1111111111111111111111111111'
    }

    if(url.indexOf(':59870')>0)//'node.'+NODEID+'.vip')>0)
    {
        reqdata.appid = '10001'
        reqdata.secret_key = '*'
    }

    if(url.indexOf(':59871')>0)//'node.'+NODEID+'.order')>0)
    {
        reqdata.appid = '10001'
        reqdata.secret_key = '*'
    }

    if(url.indexOf(':59876')>0)//'node.'+NODEID+'.msg')>0)
    {
        reqdata.appid = '10001'
        reqdata.secret_key = '*'
    }


    if(url.indexOf(':59875')>0)//'node.'+NODEID+'.obj')>0)
    {
        reqdata.appid = '10001'
        reqdata.secret_key = '*'
    }


    if(url.indexOf('node.'+NODEID+'.ht')>0)
    {
        reqdata.appid = '10001'
        reqdata.secret_key = '*'
    }

    if(url.indexOf(':80')>0)//'node.'+NODEID+'.obj')>0)
    {
        reqdata.appid = '10001'
        reqdata.secret_key = '*'
    }

    let rpc_name = url.split(':')[2]
    rpc_name =  rpc_name ? rpc_name.substring(0,rpc_name.indexOf('/')):null
    reqdata.rpc_name = rpc_name //请求的rpc

    url = getNodeUrl(url)
    // if(url.indexOf('c2.6dgs.opencom')>0)
    // {
    //     url = url.replace('c2.forklist.dtns','c2.6dgs.opencom.vip')
    // }

    // if(url.indexOf('c3.6dgs.opencom')>0)
    // {
    //     url = url.replace('c3.forklist.dtns','c3.6dgs.opencom.org.cn')
    // }
    
    // let ret = await http_req.http_post(url,reqdata);
    let ret = null;
    //url=='/super/websocket/link' || 
    if(
        (url == '/op' && (reqdata.opcode=='file.upload' || reqdata.opcode=='file.download')))
    {
        ret = await new Promise((resolve)=>{
            rpc_client.send(url,reqdata,null,function(rdata){
                // console.log('rpc_client-send-recved-data:'+JSON.stringify(rdata))

                if(rdata)
                    resolve(rdata.data)
                else 
                    resolve(null)
            })
            setTimeout(()=>resolve(null),30000)//30s超时
        })
    }else if(url=='/super/websocket/link' ){
        let req = {url,token:reqdata.token,rpc_name,params:reqdata}
        let ws = {ws_token:req.params.token}
        if(typeof wsPeer == 'undefined'){
            window.wsPeer = {}
        }
        console.log('op-websocket-link-params:'+JSON.stringify(req.params))
        ws.on =function(msg,func){
            switch(msg){
                case 'message':
                    wsPeer.wsMessageMap = wsPeer.wsMessageMap ? wsPeer.wsMessageMap:new Map()
                    wsPeer.wsMessageMap.set(ws.ws_token,func)
                    break;
                case 'close':
                    wsPeer.closeWSList = wsPeer.closeWSList ? wsPeer.closeWSList:[];//break;
                    wsPeer.closeWSList.push({ws,close:func})
                    break;
            }
        }
        //返回结果。
        ws.send = function(msg)
        {
            console.log('ws-send:'+JSON.stringify(msg))
            msg = str_filter.parseJSON(msg)
            let msgObj = {ws:true,ws_token:ws.ws_token,data:msg}
            //wsPeer.send(JSON.stringify(msgObj))
            let wsMsg = rpc_client.qWS(msgObj.ws_token)
            if(typeof wsMsg == 'function')
                wsMsg(msgObj.data)
            else
            console.log('[Error] websocket have no message-function callback')
        }
        ws.close = function(){
            console.log('ws-close is called! on peer we will do nothing !!!')
        }
        ws.closePeer=function(){
            console.log('peer-ws-close is called!')
            if(wsPeer && wsPeer.wsMessageMap)
            wsPeer.wsMessageMap.delete(ws.ws_token)

            let closeWSList = wsPeer.closeWSList
            let tmpCloseWSList = []
            for(let i=0;closeWSList&& i<closeWSList.length;i++ )
            {
                let tmp = closeWSList[i]
                if(tmp.ws != ws) tmpCloseWSList.push(tmp)
            }
            wsPeer.closeWSList = tmpCloseWSList
        }
        if(defaultRTC.rpc(req.rpc_name))
            return defaultRTC.rpc(req.rpc_name).websocket_c.svr_service(ws,req)  //this.rpc.websocket_c.svr_service(ws,req)       
        else
            return res.json({ret:false,msg:'[error]can not find matched-rpc'})
    }
    else{
        let req = {url,rpc_name,params:reqdata}
        ret = await new Promise((resolve)=>{
            defaultRTC.rpc_index_call(req,{is_dnalink_node_manager:true,json:function(obj){
                resolve(obj)
            }})
            setTimeout(()=>resolve(null),30000)
        })
    }

    console.log("rpc_query-url:"+url)
    console.log("rpc_query-reqdata:"+JSON.stringify(reqdata))
    // console.log("rpc_query-ret:"+ret)
    // try {
    // if (ret && ret.length != ('' + ret).length)
    console.log("rpc_query-ret:" + JSON.stringify(ret))
    // }catch(ex)
    // {
    //     console.log('ex:'+ex)
    // }

    return ret;
}
window.uploadFile = uploadFile
async function uploadFile(fileInfo)
{
    // let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:'SecureCRT-2021-4-7.zip',
    //                             mimetype:'zip',filename:'SecureCRT-2021-4-7.zip',path:'file-path',size:29252796,
    //                             data:'D:\\工作软件\\SecureCRT-2021-4-7.zip'}
    let data = {appid:10001,secret_key:'*',opcode:'file.upload',
                    token_x:fileInfo.obj_id,token_y:fileInfo.obj_id,opval:'new',
                    extra_data:'upload-token', rpc_name:'59875'}
    if(fileInfo.s_id) delete fileInfo.s_id
    return await new Promise((resolve)=>{
        rpc_client.sendFile(data,fileInfo,function(updata){
            console.log('rpcClient---sendFile-callback-data:'+JSON.stringify(updata))
            resolve(updata && updata.data ? updata.data : updata)
        })
    })
}
window.downloadFile = downloadFile
async function downloadFile(fileInfo)
{
    let params = {appid:10001,secret_key:'*',opcode:'file.download',
                        token_x:fileInfo.obj_id,token_y:fileInfo.obj_id,opval:'download',
                        extra_data:'download', rpc_name:'59875',begin:fileInfo.begin,len:fileInfo.len}
    console.log('rpc-client-downloadFile-params:'+JSON.stringify(params))
    return await new Promise((resolve)=>{
        // rpc_client.download(params,function(data){
        //     if(data) console.log('rpcClient---download-callback-data:'+data.length)
        //     else console.log('rpcClient---download-callback-data:'+data)
        //     if(data.begin_str!='file'){
        //         data.data = Buffer.from(data.data,'base64')
        //     }
        //     resolve(data)
        // })
        rpc_client.sendData(rpc_client.peer(),params.rpc_name+'::/op',params,null,function(readData){
            if(readData.begin_str!='file'){
                readData.data = Buffer.from(readData.data,'base64')
            }
            resolve(readData)
        })
        //setTimeout(()=>resolve(null),unfast_mode ? 60000:6000)
    })
    /*
    function(data){
            console.log('download-data-len:'+data.data.length+' begin_str:'+data.begin_str)
            if(data.begin_str!='file'){
                data.data = Buffer.from(data.data,'base64')
            }
            let stream = require('fs').createWriteStream('C:\\Users\\LMC\\Downloads\\download--'+new Date().getTime()+'--'+data.fileInfo.originalname)
            stream.write(data.data)
            stream.end()
        }
        */
}

// window.rpc_client = rpc_client