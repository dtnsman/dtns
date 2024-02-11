/**
 * create by poplang , 2022/9/22
 */
class DNALinkEngine
{
    constructor(kvdb,wallet_m,chain_m,protocol)
    {
        this.kvdb = kvdb
        this.wallet_m = wallet_m
        this.chain_m = chain_m

        this.protocol = protocol
        this.root_config = this.protocol.root_config
        this.fsm_config = this.protocol.fsm_config
    
        this.TOKEN_NAME = this.root_config.TOKEN_NAME
        this.TOKEN_ROOT = this.root_config.TOKEN_ROOT
        this.TOKEN_ID_LENGTH = this.root_config.TOKEN_ID_LENGTH
    }
    async dtns_network_client_sync_files(records)
    {
        let This = this
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        console.log('into dtns_network_client_sync_files now: g_sync_files_flag:',typeof g_sync_files_flag)
        if(typeof g_sync_files_flag =='undefined') return console.log('g_sync_files_flag is undefined ',this.roomid)
        console.log('into dtns_network_client_sync_files now:')
        let rows = records
        let iCnt = 0
        let hashMap = new Map()
        for(let i=0;i<rows.length;i++)
        {
            let info = null;
            try{ 
                info = JSON.parse(rows[i]);
            }catch(ex){
                info = rows[i]
            }
            
            // if(typeof info.txjson.token_x !='undefined' ) info.txjson = JSON.stringify(info.txjson)
            let txinfo =  this.chain_m.getTXInfo(info) 
            let opJSON = null;
            try{
                opJSON = JSON.parse(txinfo.opval)
            }catch(ex){
                continue
            }
           if(opJSON.hash && (opJSON.fmt  || opJSON.file_kind || opJSON.img_kind || txinfo.opcode == 'file'))
           {
                let hash = opJSON.hash
                console.log('dtns_network_client_sync_files-hash-map:',hash,hashMap.has(hash))
                if(hashMap.has(hash)) continue
                hashMap.set(hash,'')
                let hashFile = await ifileDb.getDataByKey(hash)
                console.log('dtns_network_client_sync_files-hash-file:',hash,hashFile)
                if(hashFile && hashFile.data) continue

                let params = {user_id:userInfo.user_id,s_id:userInfo.s_id,hash,url:'/user/file/sync' }
                console.log('dtns_network_client_sync_files----syncFile-hash:'+hash,opJSON,txinfo,rows[i])

                try{
                    let downloadFlag = await new Promise((resolve)=>{
                        rpc_client.download(params,async function(data){
                            console.log('dtns_network_client_sync_files---rpc_client.download-file-data:',data.data,data.data.buffer)
                            if(data && data.data){
                            console.log('dtns_network_client_sync_files---download----data-len:'+data.data.length)
                            ifileDb.addData({key:hash,data:data.data})
                            resolve(true)
                            }else{
                            console.log('dtns_network_client_sync_files---下载失败,',hash,opJSON,data)
                            resolve(false)
                            }
                        })
                    })
                    iCnt += downloadFlag ? 1:0
                }catch(ex){
                    console.log('dtns_network_client_sync_files---ex:'+ex,ex)
                }
           }
        }
        console.log('dtns_network_client_sync_files-download-iCnt:'+iCnt)
        return iCnt
    }
    async dtns_network_client_sync()
    {
        console.log('into dtns_network_client_sync')
        if(!localStorage.getItem('userInfo')) {
            console.log('dtns_network_client_sync:user is not logined')
            return 
        }
        let This = this
        let web3name = rpc_client.roomid
        //如果是dtns_network_client客户端，则连接，并且请求获得同步的节点数据。
        // if(typeof g_dtns_network_client!='undefined' && g_dtns_network_client && this.protocol.roomid=='dtns.network')
        // {
        //     console.log('into dtns_network_client_sync')
        //     //连接服务端
        //     let dtns_roomid = 'dtns.network'
        //     console.log('dtns_root_keys',dtns_root_keys)
        //     let roomid = dtns_roomid+'|'+ parseInt(Date.now()/1000)
        //     console.log('dtns-roomid:',roomid)
        //     let hash = await key_util.hashVal(roomid)
        //     let sign = await key_util.signMsg(hash,dtns_root_keys.private_key)
        //     let protocol = Object.assign({},this.protocol)
        //     protocol.roomid = roomid+'|'+sign+'|'+dtns_root_keys.token

        //     let This = this
        //     this.dtns_network_rtc_api = new RPCApiUtil(protocol,false)
        //     window.dtns_network_rtc_api = this.dtns_network_rtc_api
        //     this.dtns_network_rtc_api.rtc_client.setPeerRefreshCallback(async function(){
                //使用chain/query获得全部数据
                // let ret = await dtnsManager.run('dtns://web3:dtns/user/device/login',{timestamp,web3name,sign})
                let userInfo = JSON.parse(localStorage.getItem('userInfo'))
                let client = g_dtnsManager.connect('dtns://web3:'+web3name)
                let chainAllRecords = await g_dtnsManager.run('dtns://web3:'+web3name+'/chain/query',
                    {begin:0,len:1000000000000,user_id:userInfo.user_id,s_id:userInfo.s_id,
                        rpc_port:this.root_config.DOMAIN_PORT})
                console.log('dtns_network_rtc_api-chainAllRecords:',chainAllRecords)
                if(chainAllRecords && chainAllRecords.ret && chainAllRecords.list)
                {
                    let list = chainAllRecords.list
                    list.sort(function(a,b){
                        return a.create_time_i - b.create_time_i
                    })
                    await This.chain_m.saveTXQueue2TokenChain(list,true)
                    This.dtns_network_client_sync_files(list)
                }
                //请求设定websocket等
                let token = this.TOKEN_ROOT //dtns_root_keys.token
                let timestamp_i = parseInt(Date.now()/1000)
                let TXINFO = {//txid:This.tx_util.newTXID(),
                    token_x:token,token_y:token,
                    opcode:This.fsm_config.OP_WEBSOCKET,opval:'op',extra_data:token,timestamp_i}
                
                //不需要websocket以及listen权限
                // let TXJSON = This.tx_util.toTXJSONString(TXINFO);//序列化。
                // console.log('TXJSON:'+TXJSON)
                // let hash = await key_util.hashVal(TXJSON);//得到hash值
                // let sign = await key_util.signMsg(hash,dtns_root_keys.private_key)
                // TXINFO.web3_sign = sign

                TXINFO.user_id = userInfo.user_id
                TXINFO.s_id = userInfo.s_id
                TXINFO.rpc_port = this.root_config.DOMAIN_PORT

                let websocketRet = await g_dtnsManager.run('dtns://web3:'+web3name+'/op',TXINFO)
                console.log('dtns_network_rtc_api-op:websocket-ret:',websocketRet)
                if(!websocketRet || !websocketRet.ret  || !websocketRet.rpc_func_ret 
                    || !websocketRet.rpc_func_ret.token){
                    return 
                }
                console.log('link to dtns.network:')
                let link_token = websocketRet.rpc_func_ret.token
                client.setWs(link_token,async function(data){
                    console.log(web3name+'-backDb-'+This.TOKEN_NAME+'-recv-data:',data)
                    try{
                        data = JSON.parse(data)
                    }catch(ex){
                        console.log('parse-rows failed,ex:'+ex)
                    }
                    try{
                        //return false;//现在有了global-write-map
                        //应该还要进行校验。如果签名成功，写入到持久化队列
                        //不核验是没办法敢于写入数据的，特别是要判断全部是子token数据
                        let iNum = await This.chain_m.saveTXQueue2TokenChain(data,true);//这个格式可能还需要判断2022-8-15
                        console.log('save parent-token-rows-iNum:'+iNum)
                        // This.ws.send(JSON.stringify({ret:true,num:iNum,msg:'success'}))
                    }catch(ex)
                    {
                        console.log('tx-rows from parent write to mydisk failed,ex:'+ex)
                    }
                })
                //得到同步的数据请求
                g_dtnsManager.run('dtns://web3:'+web3name+'/super/websocket/link',
                    {token:link_token,user_id:userInfo.user_id,s_id:userInfo.s_id,
                        rpc_port:this.root_config.DOMAIN_PORT})
        //     })
        //     return true
        // }
        // else 
        //     return false;
    }
    //对环境进行自检和安装
    async s_validateEnvAndInstall() {
        let data = await this.chain_m.queryTokenStates(this.TOKEN_ROOT)
        if(data && data.height >=0)
        {
            return {ret:true,msg:'environment is ok! ----root-token exists in the chain'}
        }

        console.log("root_token unexists")
        console.log("run install now:")   

        await this.chain_m.initAllTB()
        await this.wallet_m.initWalletDb();

        let ret = await this.dtns_network_client_sync()
        // if(!ret) ret = await this.root_token();
        return ret;
    }

    //就否已经安装
    async s_checkEnvInstall()
    {
        let row = await this.chain_m.db_chain.queryOne("select count(1) as cnt from token_chain")
        return row && row.cnt >0
    }
    /**
     * 环境初始化和校验。
     */
    async testEnv() {
        let bInstallFlag = await this.s_checkEnvInstall();
        console.log("testEnv-bInstallFlag:"+bInstallFlag)

        if(!bInstallFlag)
        {
            let installRet = await this.s_validateEnvAndInstall();
            console.log('installRet:'+JSON.stringify(installRet))
        }else{
            await this.dtns_network_client_sync() //无论如何都将同步
        }

        let check_flag = await this.s_checkEnvInstall();
        if (!check_flag) {
            console.log("run dnalink.engine env unsafe!")
        }

        return check_flag
    }
}
