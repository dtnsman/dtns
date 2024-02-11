/* eslint-disable */ 
// import url from 'url'
// import http from 'http'
// const http_req = null;//require('../libs/http_request')
// import {TXUtil,TokenUtil} from './DNALinkProtocol'

// const url = null;
// const http =null
// const http_req = null
// const TXUtil = null, TokenUtil = null;

import CryptoJS from 'crypto-js'
import sha256 from 'crypto-js/sha256'
import md5 from 'crypto-js/md5'
// import { bs58Encode } from '../../utils/key_util'
import bs58 from 'bs58'

function newWeb3ID()
{
    const txidBuf = window.crypto.getRandomValues(new Uint8Array(32))
    const txidKey = Secp256k1.uint256(txidBuf, 16)
    const txid = bs58.encode( new Uint8Array((''+txidKey.toString(16)).match(/.{1,2}/g).map(byte => parseInt(byte, 16)))).substring(0,16)
    console.log('txid:'+txid+' len:'+txid.length)
    console.log('txidKey:'+txidKey.toString(16)+' len:'+txidKey.toString(16).length)
    return txid
}

function createWeb3Keys()
{
    const privateKeyBuf = window.crypto.getRandomValues(new Uint8Array(32))
    let privateKey = Secp256k1.uint256(privateKeyBuf, 16)
    let prikey = bs58.encode( new Uint8Array((''+privateKey.toString(16)).match(/.{1,2}/g).map(byte => parseInt(byte, 16))))
    console.log('privateKey:'+privateKey.toString(16)+' len:'+privateKey.toString(16).length)
    // privateKey ='9a9a6539856be209b8ea2adbd155c0919646d108515b60b7b13d6a79f1ae5174'
    // console.log('privateKey:'+privateKey+' len:'+privateKey.length)
    // prikey = bs58.encode( new Uint8Array((privateKey).match(/.{1,2}/g).map(byte => parseInt(byte, 16))) )
    console.log('prikey:'+prikey+' len:'+prikey.length)

    /**https://www.programcreek.com/python/example/94569/secp256k1.PublicKey
     * out = b"\x04"
			out += pubkey.x.to_bytes(32, 'big')
			out += pubkey.y.to_bytes(32, 'big')
			self.pubkey = PublicKey(out, raw=True) 

            https://learnblockchain.cn/article/1526
            未压缩格式：G=04 79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798 483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8
压缩格式：
G = 02 79BE667E F9DCBBAC 55A06295 CE870B07 029BFCDB 2DCE28D9 59F2815B 16F81798
压缩格式中标志位是02，可知G点y坐标是偶数。
至于为什么选择02，03，04作为标志呢？工程实现习惯而已，不必纠结。由于椭圆曲线中公钥是一个点，所以一般公钥表示使用压缩格式
https://learnblockchain.cn/article/1526    

参照：
https://blog.csdn.net/QQ604666459/article/details/82497414
Private key: 9a9a6539856be209b8ea2adbd155c0919646d108515b60b7b13d6a79f1ae5174
Public key : [X(188ac3f1c6bbbc336fdc33cb5e605ff7c3ee2d36249933b0322220a616a11fb3):
    Y(40a609475afa1f9a784cad0db5d5ba7dbaab2147a5d7b9bbde4d1334a0e40a5e)]
Compressed key  : 0340a609475afa1f9a784cad0db5d5ba7dbaab2147a5d7b9bbde4d1334a0e40a5e
Uncompressed key: 0440a609475afa1f9a784cad0db5d5ba7dbaab2147a5d7b9bbde4d1334a0e40a5e188ac3f1c6bbbc336fdc33cb5e605ff7c3ee2d36249933b0322220a616a11fb3
————————————————
*/
    // Generating public key
    const publicKey = Secp256k1.generatePublicKeyFromPrivateKeyData(Secp256k1.uint256(new Uint8Array((''+privateKey.toString(16)).match(/.{1,2}/g).map(byte => parseInt(byte, 16)))),16)//privateKey)
    const pubX = Secp256k1.uint256(publicKey.x, 16)
    // const pubY = Secp256k1.uint256(publicKey.y, 16)
    console.log('publicKey:'+JSON.stringify(publicKey))
    console.log('pubX-16:'+JSON.stringify(pubX.toString(16)))
    let puby = (''+publicKey.y)
    let flagStr = puby.substring(puby.length-2,puby.length)
    const flagInt =  Secp256k1.uint256(flagStr, 16)
    console.log('flagInt:'+flagInt+' %2:'+(flagInt%2))
    const flagT = flagInt%2 == 0 ?'02':'03'
    console.log(puby+' publicKey.y.len：'+puby.length+' flag-str:'+puby.substring(puby.length-2,puby.length))  
    //let flag =  publicKey.y.substring()
    let pubXStr = bs58.encode( new Uint8Array((flagT+pubX.toString(16)).match(/.{1,2}/g).map(byte => parseInt(byte, 16))))
    // let pubYStr = bs58.encode( new Uint8Array((''+pubY.toString(16)).match(/.{1,2}/g).map(byte => parseInt(byte, 16))))
    // let pubkey = bs58.encode( new Uint8Array((publicKey.x+publicKey.y).match(/.{1,2}/g).map(byte => parseInt(byte, 16))))
    console.log('pubXStr:'+pubXStr+' len:'+pubXStr.length)
    // console.log('pubYStr:'+pubYStr+' len:'+pubYStr.length)
    // console.log('pubkey:'+pubkey+' len:'+pubkey.length)
    console.log('prikey:'+prikey+' len:'+prikey.length)
    return {private_key:prikey,public_key:pubXStr}
}
createWeb3Keys()
class RPCApiUtil{
    constructor(protocol){
        this.protocol = protocol
        this.root_config = this.protocol.root_config
        this.fsm_config = this.protocol.fsm_config
        // this.fsm_p = new DNALinkFSMContractProcessor(this.protocol)
        // this.tx_util = null;//new TXUtil(this.protocol)
        // this.token_util = null;//new TokenUtil(this.protocol)
        //this.coin_num_util = new CoinNumUtil(this.protocol)
        this.TOKEN_NAME = this.root_config.TOKEN_NAME
        this.TOKEN_ROOT = this.root_config.TOKEN_ROOT
        this.TOKEN_ID_LENGTH = this.root_config.TOKEN_ID_LENGTH
        this.DOMAIN_PORT = this.root_config.DOMAIN_PORT
        this.appids     = this.root_config.appids
        this.secret_keys= this.root_config.secret_keys
        this.token_key = this.root_config.token_key
        this.private_key = this.root_config.private_key

        this.baseUrlHost ='127.0.0.1' 
        // this.xhr = new XMLHttpRequest();
    }
    async queryData(url,params)
    {
        var xhr = new XMLHttpRequest()//qxhr//this.xhr  //否则将因为xhr的回收，而导致无法收到resolve信息
        xhr.timeout = 30000;
        xhr.ontimeout = function (event) {
            console.log("connect timeout");
        }
        var formData = new FormData();
        //let pstr = ''
        for(var key in params)
        {
            formData.append(key,params[key]);
           // pstr+=key+'='+params[key]+'&'
        }
        // if(fileobj)//添加文件
        // formData.append('file',fileobj)
        //console.log('pstr:'+pstr)
        let ret = null;

        
        let rstr = url;// url+'?'+pstr//'http://'+this.baseUrlHost+ url+'?'+pstr
        console.log('rstr:'+rstr)
        // xhr.open('GET',rstr);
        // xhr.send();//formData
        xhr.open('Post',rstr);
        xhr.send(formData)

        return await new Promise((resolve)=>{
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log('query-ret:'+xhr.responseText);
                    resolve(JSON.parse(xhr.responseText))
                }
                else if(xhr.readyState ==4){
                    resolve( 'error:'+xhr.statusText)
                }
            }})
    }



    async http_post(url,params)
    {
        let ret =await this.queryData(url,params)
        return ret;
    }

    toTXJSONString(TXINFO)
    {
        let {txid,token_x,token_y,opcode,opval,token_state,token_height,pre_txid,extra_data,timestamp_i}=TXINFO;
        let TXINFO_JSON = {txid:""+txid,token_x:""+token_x,token_y:""+token_y,opcode:""+opcode,opval:""+opval,extra_data:""+extra_data,timestamp_i:""+timestamp_i};

        if(TXINFO.hasOwnProperty("token_state"))
        {
            TXINFO_JSON.token_state = ""+TXINFO.token_state
        }
        if(TXINFO.hasOwnProperty('token_height'))
        {
            TXINFO_JSON.token_height = TXINFO.token_height
        }
        if(TXINFO.hasOwnProperty('public_key'))
        {
            TXINFO_JSON.public_key = TXINFO.public_key
        }
        if(TXINFO.pre_txid)
        {
            TXINFO_JSON.pre_txid = TXINFO.pre_txid
        }

        return JSON.stringify(TXINFO_JSON);
    }

    /**
     * 封装的rpc请求。
     * @type {rpc_query}
     */
    async rpc_query(url,reqdata){
        console.log("rpc_query-url:"+url+" reqdata:"+JSON.stringify(reqdata))
        reqdata = !reqdata ? {}:reqdata;

        url = (''+url).indexOf('http')!=0 ? 'http://127.0.0.1:'+this.DOMAIN_PORT+url:url;

        let private_key = this.private_key
        let public_key = null;

        reqdata.token_x  = reqdata.token_x == 'root' ? this.protocol.root_config.TOKEN_ROOT:reqdata.token_x
        reqdata.token_y  = reqdata.token_y == 'root' ? this.protocol.root_config.TOKEN_ROOT:reqdata.token_y
                    

        if((!reqdata.token_key || !reqdata.access_key) && (!reqdata.appid || !reqdata.secret_key) || (reqdata.token_x == 'new' ) && reqdata.opcode=='fork') {
            reqdata.appid = this.appids ? this.appids[0] :null
            reqdata.secret_key = this.secret_keys ? this.secret_keys[0]:null

            if(!reqdata.appid || !reqdata.secret_key){
                if(this.token_key &&!((reqdata.token_x == 'new' ) && reqdata.opcode=='fork'))
                {
                    reqdata.token_key = this.token_key
                }else{
                    //2022-11-10新增，用于使用web3_sign来fork新的token（可以完全没有this.private_key）
                    //|| !reqdata.token_X
                    if((reqdata.token_x == 'new' ) && reqdata.opcode=='fork')
                    {
                        reqdata.token_x = reqdata.token_y.split('_')[0]+'_'+newWeb3ID()
                        let keys = createWeb3Keys()
                        private_key = keys.private_key
                        public_key = keys.public_key
                        reqdata.opval= public_key //这里因为无法保存到public_key，所以必须为fork，否则对账会出问题（因opval不是public_key的原因）
                    }
                    try{
                        let TXINFO = {txid:'txid_'+newWeb3ID(),token_x:reqdata.token_x,token_y:reqdata.token_y,
                            opcode:reqdata.opcode,opval:reqdata.opval,extra_data:reqdata.extra_data,
                            timestamp_i:parseInt(new Date().getTime()/1000)}
                        let TXJSON = this.toTXJSONString(TXINFO);//序列化。
                        console.log('TXJSON:'+TXJSON)
                        let hash =''+sha256(TXJSON);// (''+sha256(TXJSON)).toUpperCase();//得到hash值
                        console.log('hash:'+hash+' len:'+hash.length+' keys-secp256k1:'+(Object.keys(Secp256k1)))
                        //console.log('hex-len:'+('483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8').length)
                        const digest = Secp256k1.uint256(hash, 16)
                        let prikey = Secp256k1.uint256(bs58.decode(private_key),16)//
                        console.log('hash:'+hash+' digest:'+digest+' this.private_key:'+this.private_key+' private_key:'+private_key+' prikey:'+prikey)
                        
                        let sign = Secp256k1.ecsign(prikey, digest)//key_util.signMsg(hash,'4bmmY1VEj8FjAVLGYhrt4AtvMisXRj2YDNNYHryjogPV');
                        console.log('sign:'+JSON.stringify(sign))
                        reqdata.web3_sign= bs58.encode( new Uint8Array((sign.r+sign.s).match(/.{1,2}/g).map(byte => parseInt(byte, 16))))
                        reqdata.timestamp_i = TXINFO.timestamp_i //req_time = TXINFO.timestamp_i
                        reqdata.txid = TXINFO.txid
                        console.log("rpc_query-url:"+url+" reqdata:"+JSON.stringify(reqdata))
                    }catch(ex){console.log('ex:'+ex)}
                }
            }
        }

        let ret = await this.http_post(url,reqdata);
        if(ret && (this.private_key!=private_key && reqdata.opcode == 'fork') && ret.ret) ret.private_key = private_key
        console.log("rpc_query-url:"+url)
        console.log("rpc_query-reqdata:"+JSON.stringify(reqdata))
        // console.log("rpc_query-ret:"+ret)
        // try {
        // if (ret && ret.length != ('' + ret).length)
        console.log("rpc_query-ret:" + JSON.stringify(ret))

        // this.$http.post('/try/ajax/demo_test_post.php',{name:"菜鸟教程",url:"http://www.runoob.com"},{emulateJSON:true}).then(function(res){
        //             document.write(res.body);    
        //         },function(res){
        //             console.log(res.status);
        //         });
        // }catch(ex)
        // {
        //     console.log('ex:'+ex)
        // }
    
        return ret;
    }
    async rpc_file(url,reqdata,filename,isTextFlag = false){
        reqdata = !reqdata ? {}:reqdata;

        url = (''+url).indexOf('http')!=0 ? 'http://127.0.0.1:'+this.DOMAIN_PORT+url:url;

        if((!reqdata.token_key || !reqdata.access_key) && (!reqdata.appid || !reqdata.secret_key)) {
            reqdata.appid = this.appids ? this.appids[0] :null
            reqdata.secret_key = this.secret_keys ? this.secret_keys[0]:null

            if(!reqdata.appid || !reqdata.secret_key)
            {
                reqdata.token_key = this.token_key
            }//无需像rpc-query一样通过web3签名接口来获得token_key
        }


        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.send(reqdata)
            
        //xhr.setRequestHeader("Content-type", "application/*")//x-www-form-urlencoded");
        xhr.responseType = "blob";

        let fileNameRet = await new Promise((resolve)=>{
        xhr.onload = function (oEvent) {
                if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                        //从header中获取
                    let fileName = filename//'download.jpg'//decodeURI(xhr.getResponseHeader('filename'));
                    fileName = !fileName ? 'download.jpg':fileName
 
                    console.log('fileName:'+fileName);
                
 
                    //校验是否下载参数
                    var content = xhr.response;
                    // var myReader = new FileReader();
                    // if(isTextFlag)
                    // {
                    //     if(!fileName || fileName === 'null') {
                            
                    //         myReader.addEventListener("loadend", function(e){
                    //             var msg = e.srcElement.result;
                    //             console.log('msg:'+msg)
                    //             // Dialogs.showWarn(msg);
                    //         });
                    //         myReader.readAsText(content);
                    //         return;
                    //     }
                    // }
 
                    //数据转换为文件下载
                    var elink = document.createElement('a');
                    elink.download = fileName || 'download';
                    elink.style.display = 'none';
                    var blob = new Blob([content]);
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    document.body.removeChild(elink);


                    // let blob = new Blob([content], { type: '' })
                    // //  {type: "text/plain;charset=utf-8"}  //保存为txt文件（记事本）
                    // // 保存为json文件
                    // saveAs(blob, fileName+'.jpg')//'store-' + timeStr + '.json') 
                    resolve(fileName)
                    //关闭等待
                } else {
                    resolve(false)
                }
            };})
            console.log('fileNameRet:'+fileNameRet)

        return fileNameRet
        // let ret = await http_req.http_file(url,reqdata,path);
        // console.log("rpc_query-url:"+url)
        // console.log("rpc_query-reqdata:"+JSON.stringify(reqdata))
        // // console.log("rpc_query-ret:"+ret)
        // // try {
        // // if (ret && ret.length != ('' + ret).length)
        // console.log("rpc_query-ret:" + JSON.stringify(ret))
        // }catch(ex)
        // {
        //     console.log('ex:'+ex)
        // }

        // return ret;
    }

    async postReq(reqUrl,postData) {
        let urlObj = url.parse(reqUrl)
        let  boundaryKey = '';
        if((''+postData).length>6)
        {
            let fixBoundaryKey = (''+postData).split("\r\n")[0]
            boundaryKey = fixBoundaryKey.substring(2,fixBoundaryKey.length)
        }
        console.log('postReq-host:'+urlObj.hostname+' port:'+urlObj.port+' path:'+urlObj.path)
        var options = {
            host:urlObj.hostname,//远端服务器域名
            port:urlObj.port,
            method:'POST',
            path:urlObj.path,//上传服务路径
            headers:{
                'Content-Type':'multipart/form-data; boundary=' + boundaryKey,
                'Connection':'keep-alive'
            }
        };
        let ret = null;
        await new Promise((resolve, reject) => {
            var req = http.request(options,function(res){
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    //resolve(chunk)
                    ret = chunk
                    console.log('body: ' + chunk);
                });
                res.on('end',function(){
                    resolve(ret)
                    console.log('res end.res:'+JSON.stringify(ret));
                });
            });
            req.end(postData);
        }).then((data)=>{
            console.log('http-req-res-data:'+data)
            ret = data;
        }).catch((ex)=>{
            console.log('http-req-res-ex:'+ex)
        })
        try{
            ret = JSON.parse(ret)
        }catch(ex)
        {
            console.log('ret-json failed,ex:'+ex)
        }
        return ret;
    }
    /**
     * 创建类似xxx_00000000userlist的token-id
     */
    create_token_name_last(TOKEN_ROOT,name)
    {
        if(!name) return name;
        let TOKEN_NAME = TOKEN_ROOT.split('_')[0]

        let len = name.length;
        if(len>0) return TOKEN_NAME+"_"+TOKEN_ROOT.substring((TOKEN_NAME+"_").length+len,TOKEN_ROOT.length)+name

        return name;
    }
    /**
     * 创建类似xxx_userlist00000000的token-id
     */
    create_token_name_pre(TOKEN_ROOT,name)
    {
        if(!name) return name;
        let TOKEN_NAME = TOKEN_ROOT.split('_')[0]

        let len = name.length;
        if(len>0) return TOKEN_NAME+"_"+name+TOKEN_ROOT.substring((TOKEN_NAME+"_").length+len,TOKEN_ROOT.length)

        return name;
    }
    /**
     * 按模板生成token-id
     * @type {s_query_token_id}
     */
    async s_query_token_id(API,ROOT,DST_TOKEN_NAME)
    {
        let TOKEN_NAME_PREFIX = ROOT.split('_')[0]
        let TOKEN_NAME = DST_TOKEN_NAME.length > 16 ? TOKEN_NAME_PREFIX+'_'+DST_TOKEN_NAME.split('_')[1] : TOKEN_NAME_PREFIX+'_'+DST_TOKEN_NAME
        let queryRet = await rpc_query(API+'/chain/opcode',{token:TOKEN_NAME,opcode:'fork',begin:0,len:1})
        if(!queryRet ||!queryRet.ret)
        {
            let forkRet = await rpc_query(API+'/fork',{token:ROOT,dst_token:TOKEN_NAME})
            if(!forkRet ||!forkRet.ret) return null;
        }
        return TOKEN_NAME;
    }

    /**
     * 创建一个新的token_id
     * @type {s_fork_token_id}
     */   
    async s_fork_token_id(API,ROOT,space)
    {
        let forkRet = await this.rpc_query(API+'/fork',{token:ROOT,space:space})
        if(!forkRet ||!forkRet.ret) return null;

        return forkRet.token_x;
    }

    /**
     * 保存数据
     * @type {s_save_token_info}
     */
    async s_save_token_info(API,ROOT,token,opcode,opval,extra_data)
    {
        let opRet = await this.rpc_query(API+'/op',{token_x:ROOT,token_y:token,opcode:opcode,opval:opval,extra_data:extra_data})
        if(!opRet ||!opRet.ret) return false;

        return true;
    }
    // app.all(MODULE_PATH+"/chain/relations/exists", chain_c.check_token_relations);
    /**
     * 判断是否相关。
     * @type {function(*, *=, *=, *=): *}
     */
    async s_check_token_list_related(API,token_x,token_y,opcode)
    {
        let existsRet = await this.rpc_query(API+'/chain/relations/exists',{token_x:token_x,token_y:token_y,opcode:opcode})
        return existsRet && existsRet.ret;
    }


    /**
     * 由/chain/relations查询list
     * @type {function(*, *=): Array}
     */
    async s_query_token_list(API, list_id,opcode,begin,len,isy,queryInfoFunc)
    {
        let isx = !isy ? true: false;
        begin = begin-0;
        len = !len ? 100000 :len
        let listRet = await this.rpc_query(API+'/chain/relations',{token:list_id,opcode:opcode,isx,begin:begin,len:len})
        let list = !listRet ||!listRet.ret ? [] : listRet.list;

        let objs = []
        let queryObjInfoP = []
        let i = 0
        for(;i<list.length;i++)
        {
            let info = list[i]
            // orderInfo.order_time = str_filter.GetDateTimeFormat(orderInfo.order_time)
            //放到数组中，等待处理。
            let q_token_id = isy ? info.token_x: info.token_y
            //queryInfoFunc = null;
            queryObjInfoP.push(queryInfoFunc ?  queryInfoFunc(q_token_id): this.s_query_token_info(API,q_token_id,'assert'))
                //rpc_query(API+'/chain/opcode',{token:isy ? info.token_x: info.token_y,opcode:'assert',begin:0,len:1}))

            objs.push(info)
        }

        let newObjs = []
        //查询分类数据
        await Promise.all(queryObjInfoP).then(function(rets){
            console.log('queryOrderInfoP-rets:'+JSON.stringify(rets))
            let i =0;
            for(;i<objs.length;i++)
            {
                if(rets[i] ) {//&& rets[i].ret && rets[i].list && rets[i].list[0].txjson
                    try {
                        //console.log("opval:"+JSON.parse(rets[i].list[0].txjson).opval)
                        let newInfo = rets[i];//JSON.parse(JSON.parse(rets[i].list[0].txjson).opval)
                        newInfo.token_y = list[i].token_y
                        newInfo.token_X = list[i].token_X
                        newObjs.push(newInfo)
                        continue;
                    }catch(e){
                        //newObjs.push(objs[i])
                        console.log('excaption:'+e)
                    }
                }
                else 
            // newObjs.push({main_id:objs[i].token_y})
                newObjs.push(objs[i])
            }
        })
        return newObjs;
    }

    /**
     * 保存到列表
     * @type {s_save_into_token_list}
     */
    async s_save_into_token_list(API, token_x,token_y,opcode,extra_data)
    {
        let opRet = await this.rpc_query(API+'/op',{token_x:token_x,token_y:token_y,opcode:opcode,opval:'add',extra_data:extra_data})
        if(!opRet ||!opRet.ret) return false;

        return true;
    }

    /**
     * 移出list
     * @type {s_save_into_token_list}
     */
    async s_del_from_token_list(API, token_x,token_y,opcode,extra_data)
    {
        let opRet = await this.rpc_query(API+'/op',{token_x:token_x,token_y:token_y,opcode:opcode,opval:'del',extra_data:extra_data})
        if(!opRet ||!opRet.ret) return false;

        return true;
    }

    /**
     * 查询token的info
     * @type {s_query_token_info}
     */
    async s_query_token_info(API, token,opcode)
    {
        let infoRet = await this.rpc_query(API+'/chain/opcode',{token: token,opcode:opcode,begin:0,len:1})
        if(!infoRet || !infoRet.ret) return null;

        let obj = null;
        try{
            obj = JSON.parse(JSON.parse(infoRet.list[0].txjson).opval);
        }catch(ex)
        {
            try{
                obj = JSON.parse(infoRet.list[0].txjson).opval
                console.log('token:'+token+" txjson:"+infoRet.list[0].txjson)
            }catch(ex0){}
        }
        return obj;//JSON.parse(JSON.parse(infoRet.list[0].txjson).opval)
    }

    /**
     * 得到内置一个relate-id（以便作为队列list-id存在）
     * @type {s_query_token_innerid}
     */
    async s_query_token_innerid(INFO_API,INFO_ROOT,API,ROOT,tokenid,opcode,innerIDName)
    {
        let info = await this.s_query_token_info(INFO_API,tokenid,opcode)
        if(!info) return null;//res.json({ret:false,msg:"info is empty"})
        // let mainProductListName = innerIDName;
        if(!info[innerIDName] || info[innerIDName].split('_')[1].length!=16) {
            // info[innerIDName] = await s_query_token_id(API,ROOT,create_token_name_pre(ROOT,innerIDName))//这里有一个严重的bug（会大量重复，只能用于一个main-id中）
            info[innerIDName] = await this.s_fork_token_id(API,ROOT,innerIDName)
            if(!info[innerIDName]) return   null;

            let updateRet = await this.s_save_token_info(INFO_API,INFO_ROOT,tokenid,opcode,JSON.stringify(info),info[innerIDName])
            if(!updateRet)   return null;
        }
        return info[innerIDName]
    }

    async s_query_token_innerid_space(INFO_API,INFO_ROOT,API,ROOT,tokenid,opcode,innerIDName)
    {
        let info = await this.s_query_token_info(INFO_API,tokenid,opcode)
        if(!info) return null;//res.json({ret:false,msg:"info is empty"})
        // let mainProductListName = innerIDName;
        if(!info[innerIDName] || info[innerIDName].split('_')[1].length!=16) {
            info[innerIDName] = await this.s_fork_token_id(API,ROOT,innerIDName)
            if(!info[innerIDName]) return   null;

            let updateRet = await this.s_save_token_info(INFO_API,INFO_ROOT,tokenid,opcode,JSON.stringify(info),info[innerIDName])
            if(!updateRet)   return null;
        }
        return info[innerIDName]
    }
}

export default RPCApiUtil