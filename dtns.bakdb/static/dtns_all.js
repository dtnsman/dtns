/**
 * Created by poplang on 2023/3/13
 */

class DTNSRPCMain
{
    constructor(protocol)
    {
        this.protocol = protocol;
        this.root_config = this.protocol.root_config
        this.DOMAIN_PORT = this.root_config.DOMAIN_PORT
    // this.rpc = new DNALinkRPC(this.protocol)
    }
    async init(dbopt,kvopt)
    {
        let db = new SQLDB();
        await db.initDB(dbopt,'',kvopt)
        let chainDao = new DNALinkChainDAO(db,this.protocol)
        let walletDao = new DNALinkWalletDAO(db,this.protocol)//与
        this.engine = new DNALinkEngine(db,walletDao,chainDao,this.protocol)


        //在窗口关闭前，保存数据库。
        let that  = this
        if(typeof onbeforeunload_list =='undefined')
        {
            window.onbeforeunload_list = []
        }
        //window.onbeforeunload = 
        let xfunc = async function(obj = null){
            if(obj)
            {
                console.log('[notice]now update-token-root-keys,token_name:',that.protocol.root_config.TOKEN_NAME)
                let ret =null
                if(that.protocol.root_config.TOKEN_NAME==obj.token_name)
                {
                    let {private_key,public_key} = obj
                    ret = await walletDao.saveTokenSignKeys(that.protocol.root_config.TOKEN_ROOT,private_key,public_key)
                }
                if(m_onbeforeunload_results){
                    //保存到results，以便返回。
                    m_onbeforeunload_results.push({key:that.protocol.root_config.TOKEN_NAME,ret})
                }
                console.log('[notice]now update-token-root-keys,token_name:result:',that.protocol.root_config.TOKEN_NAME,ret)
            }
            else{
                console.log('[notice]save db-data before close window,token_name:',that.protocol.root_config.TOKEN_NAME)
                // let dbname = that.protocol.roomid+'_'+that.protocol.root_config.TOKEN_NAME+'.db'
                // let data = chainDao.db_chain.export()
                // console.log('save-db-data:',data)
                // let bakName = dbname+'.'+new Date().getTime()+'.bak'
                // let flag = ifileDb.addData({key:bakName,data:data})
                // let item_name = that.protocol.roomid+'_'+that.protocol.root_config.TOKEN_NAME+'_last_db'
                // localStorage.setItem(item_name,bakName)
                // if(m_onbeforeunload_results){
                //     //保存到results，以便返回。
                //     m_onbeforeunload_results.push({key:bakName,data:null,size:data.length})
                // }
            }
            // localStorage.setItem(item_name+'-size',''+data.length)
            // localStorage.setItem(item_name+'-flag',''+flag)
            // ifileDb.deleteDataByKey(dbname)
            // ifileDb.addData({key:dbname,data:data})
            // ifileDb.updateData({key:dbname,data:data})
        }
        this.engine.dnalink_node_download_ended_save = xfunc
        onbeforeunload_list.push(xfunc)
        window.m_onbeforeunload = async function(obj = null){
            //遍历
            if(onbeforeunload_list && onbeforeunload_list.length>0)
            for(let i=0;i<onbeforeunload_list.length;i++)
            {
                await onbeforeunload_list[i](obj)
                // alert('i:'+i)
            }
            // await str_filter.sleep(10000)
            // ifileDb.closeDB()
        }
        console.log('onbeforeunload_list-len:'+onbeforeunload_list.length)



        try{
            let testEnvFlag = await this.engine.testEnv();
            console.log('testEnvFlag:'+JSON.stringify(testEnvFlag))
        }catch(ex){console.log('ex:'+ex)}
        chainDao.setEngine(this.engine)//用于清理cache时使用到。

        let cntRet = await chainDao.db_chain.query('select count(1) as cnt from token_chain')
        console.log('cntRet:'+JSON.stringify(cntRet))

        cntRet = await chainDao.db_chain.query('select * from token_config')
        console.log('cntRet:'+JSON.stringify(cntRet))

        cntRet = await chainDao.db_chain.query('select count(1) as cnt from token_chain')
        console.log('cntRet:'+JSON.stringify(cntRet))
    }
}

async function loadDB2Buffer(roomid,TOKEN_NAME)
{
    return null
    console.log('load sqljs-dbBuffer now:')
    //加载缓存
    let item_name = roomid+'_'+TOKEN_NAME+'_last_db'
    console.log('item_name:'+item_name)
    let bakName = localStorage.getItem(item_name) 
    console.log('bakName:'+bakName)
    let dbBuff = await ifileDb.getDataByKey(bakName)
    dbBuff = dbBuff ? dbBuff.data :[]
    console.log('item_name:'+item_name)
    console.log('db:'+bakName+'----cached-buffer.len:'+(dbBuff?dbBuff.length:0))
    return dbBuff
}
// module.exports= RPCMain

async function dtns_main(defaultRTCRoomID = 'room')
{
    while(!ifileDb.db)  await str_filter.sleep(100)
    await str_filter.sleep(300)

    dtns_config.dbBuff = await loadDB2Buffer(defaultRTCRoomID,dtns_config.root_config.TOKEN_NAME)
    let config = dtns_config//require('../dnalink.protocol/lianxian_gsb_59872')
    protocol = new DNALinkProtocol(config.root_config,config.fsm_config)
    protocol.roomid= defaultRTCRoomID
    rpcm = new DTNSRPCMain(protocol)
    await rpcm.init({type:'file',filepath:require('../config.js').config.dtns_db_path+'dtns.db',dbtype:'sqlite3'},//filepath:'db1.1.data',dbtype:'sqlite3'
                 {type:'map',path:'leveldb_cache1',vtype:'json'})
    // await rpcm.init({type:'buffer',buffer:config.dbBuff,dbtype:'sqljs'},//{type:'file',filepath:'chat02G32Zmqgh8P_gsb.db',dbtype:'sqlite3'},//filepath:'db1.1.data',dbtype:'sqlite3'
    //             {type:'map',path:'leveldb_cache1',vtype:'json'})// {type:'sql',path:'leveldb_cache1',vtype:'json'})//'map'

    delete dtns_config.dbBuff
}

// main()
window.dtns_main = dtns_main

 

 