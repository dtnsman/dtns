/**
 * Created by container:192.168.1.25:62000 on 2020-05-29 12:04
 */
// const str_filter = require('./libs/str_filter');
// const HOST_SPACE = str_filter.getIPAdress();
const TOKEN_NAMESPACE_PRE_FIX="rmbtest_"
const TOKEN_NAMESPACE='rmb'

const rmb_protocol_config = {}
window.rmb_protocol_config = rmb_protocol_config
rmb_protocol_config.fsm_config = {
    FSM_CONTRACT_KEY:'FSM_CONTRACT_KEY',

    OP_ROOT: 'root', //创世区块token-root（0）【初始化】
    OP_FORK: 'fork', //分叉操作-----最常用操作（1）
    OP_RELATE: 'relate', //因任意的本链操作，所导致的数据同步过来产生的高度变化（在父链中会有relate操作来记录该子链的信息）。
    OP_SEND: 'send',//发送数据（msg）或者coin ----最常用操作（2）
    OP_SETKEY: 'setkey',//设置密钥（public_key），初始化密钥----最常用操作（3）

    //以下用得比较少
    OP_CHKEY: 'chkey',//修改密钥
    OP_JOIN: 'join', //加入token合约
    OP_HOLD: 'hold', //拥有token合约
    OP_FSM: 'fsm',  //状态机设定相关（保留）
    //关于token
    OP_PHONE: 'phone',//这里配置相应的手机号码
    OP_CONFIG: 'config',//这里设置配置文件。例如token_root的配置文件。
    OP_ASSERT: 'assert',//声明（针对token自身的声明）
    OP_NOTICE:'notice',//公告，与声明类似
    OP_SMS:'sms',
    OP_PAY:'pay',
    OP_MAIL:'mail',
    OP_WSLISTEN:'wslisten',
    // OP_EMAIL:'email',
    // OP_FILE:'file',
    // OP_PAY:'pay',
    //以下是关系扩展（2019-8-6）新增。
    OP_RELA:'rela',
    OP_RELB:'relb',
    OP_RELC:'relc',
    OP_RELD:'reld',
    OP_RELE:'rele',
    OP_RELF:'relf',
    OP_RELG:'relg',
    OP_RELH:'relh',
    OP_RELI:'reli',
    OP_RELJ:'relj',
    OP_RELK:'relk',
    OP_RELL:'rell',
    OP_RELM:'relm',
    OP_RELN:'reln',
    OP_RELO:'relo',
    OP_RELP:'relp',
    OP_RELQ:'relq',
    OP_RELR:'relr',
    OP_RELS:'rels',
    OP_RELT:'relt',
    OP_RELU:'relu',
    OP_RELV:'relv',
    OP_RELW:'relw',
    OP_RELX:'relx',
    OP_RELY:'rely',
    OP_RELZ:'relz',
    //新增映射2021-4-2
    OP_MAP:'map',
    //新增文件相关指令2022-8-3
    OP_FILE:'file',//纪录文件版本数据等，索引存储路径等
    OP_FILE_UP:'file.upload',//文件上传的指令（对外）---返回json
    OP_FILE_DOWN:'file.download',//文件下载的指令（对外）---返回文件下载流(//当opval与OP_FILE_DOWN一致时,下载附件模式,否则图片/html/文本/视频预览模式)
    OP_FILE_LOG:'file.download.log',//文件下载的纪录数据，与file指令类似
    //新增webscoket指令 2022-8-4
    OP_WEBSOCKET:'websocket',//获得websocket的连接token
    OP_WEBSOCKET_TOKEN:'websocket.token',//将包含有token的数据纪录同步给token----先生成websocket-token
    //write权限会生成一个write-token-map or list----以便进行多节点同步。需要定义write协议（可考虑与read协议相同或类似）
    //写时：token只能管理自己的child-token的sign和opval等，而不能管理非子token的opval等值（需要进行同步管理）
    //跨区域同步，最好使用parent或者token_root节点进行。---可以简化写操作。
    //算法高效性：区域分割（根据有写权限的token及其子群，然后同步到其他关联的父token即可）----可以控制write的跨子群同步权限
    //***** 目前需要token_root的全局节点权限（方便构建可信的token-write节点列表）
    OP_WEBSOCKET_TOKEN_WRITE:'websocket.token.write',//【写权限】批量写和单条交易纪录写入。需要：token_key或者access_key或者secret_key权限
    //新增access指令
    OP_ACCESS:'access',//一般用于日志？!
    OP_ACCESS_SUPER:'access.super',//仅访问super接口---返回access_token
    OP_ACCESS_CHAIN:'access.chain',//仅访问chain接口---返回access_token
    //设置chain接口完全开放，让opval=OP_ACCESS_CHAIN_OPEN时放开，非时关闭
    //token_x或者token_y参数必须有一个是TOKEN_ROOT
    OP_ACCESS_CHAIN_OPEN:'access.chain.open',
    OP_ACCESS_ALL:'access.all',//所有接口均可访问---返回access_token
    OP_ACCESS_BAN:'access.ban',//禁用特定的access_key（暂时不使用）
    OP_ACCESS_ONCE:'access.once',//仅允许特定接口访问一次（例如/fork接口---使用access-token）---返回access_token
    
    //新增token指令
    OP_TOKEN:'token',//---返回token_key
    OP_TOKEN_ACCESS:'token.key',//能访问自身的所有接口和子token的所有接口(不包含super接口)//---返回token_key
    OP_TOKEN_BAN:'token.key.ban',//禁用了特定的token_key
    //新增crypto
    OP_WEB3:'web3',
    //OP_WEB3_KEY将新的public_key放在opval中
    OP_WEB3_KEY:'web3.key',//【复合接口--简化为单一权限接口，使用token.key实现多权限控制】设置token的新密钥web3.key--唯一一个（公钥，私钥是保存在用户手中的-用来做签名，公钥保存在这里可以用于接口校验）
    //OP_WEB3_BAN:'web3.key.ban',//禁用命令，用于清理web3.key或者禁用private_key的使用。----web3.key只能有一个,并且优先使用web3.key（>private_key）
    OP_WEB3_TOKEN_OPEN:'web3.token.open',//是否开放token（例如token_root就很典型）的fork权限。opval=open为开放，其他为关闭。
    //超维状态下，运行和设置元宇宙超维合约（基于webkitGTK）---声明和调用合约JSON-API
    OP_WEB3_META:'web3.meta',//保存meta文件?---将file设置为web3.meta（可供web3.meta.call调用，声明jsonp--JSONP定义的函数，以便调用之）。
    //常见函数screenshot--给画面拍照---生成file返回？（嗯，需要生成久化证明文件）
    //常见函数view---返回meta的file文件（使用download方法返回，如果是文本直接显示--可用于前端加载）
    //*支持web3.meta.files--多文件（调用不同文件里的函数---好像可以由单文件构成--引用更多文件）
    //*支持web3.meta.dns---域名管理（统一全局映射：使用meta.pop.cn的web3.meta.dns.global？
    //支持web3.meta.call：{func:func_name,params:[]}
    //*是否支持web3.meta.websocket，还是由底层websocket提供默认支持（以方便游戏等复杂合约的开发）
    //需要考虑电子证书、电子合同、元宇宙互动游戏（渲染、动作、WEB3用户参与）等多个场景。
    //需要对./进行一定的替换为本地host（经过授权后无须进行密钥重新摘取等）
    //格式规范：token_x（user-id）  call（function） token_y（web3.meta）----需要开放 web3.meta的权限。
    OP_WEB3_META_SET:'web3.meta.set',
    OP_WEB3_META_CALL:'web3.meta.call',//调用函数，传递参数---亦可通过升级websocket全双工进行（进行结果返回？）。
    //公共资源库。
    OP_WEB3_PUBLIC:'web3.meta.public',//将xxx设置为合约数据公开？---可使用access.chain.open设置为全局公开。
    //用途：电子证书生成、简单图片或者3d模型NFT算法生成、游戏、defi等。
    OP_WEB3_RESULT:'web3.meta.result',//得到call的结果？
    OP_WEB3_COPY:'web3.meta.copy',//如何支持meta元素的完整copy？

    //以下直接内置集成了一个pop批处理的函数调用的方法。
    OP_WEB3_POP:'web3.pop',//---批量执行的定义（重复定义会清空context），包含函数定义、函数调用（这里要考虑是否清空旧的context，还是继续使用！）
    OP_WEB3_POP_CALL:'web3.pop.call',//函数调用（调用指定的函数）opval=funcname----此方法无参数传入，需要参数传入使用web.pop.once处理。
    OP_WEB3_POP_ONCE:'web3.pop.once',//执行一次批处理，但是不清空context（这里事实上已经可以取代web3.pop.call）
    OP_WEB3_POP_SCRIPT:'web3.pop.script',//执行一次脚本处理。
    OP_WEB3_POP_NODE_FUNC:'web3.pop.node.func',//设置对应的node_func
    // OP_WEB3_POP_CUR:'web3.pop.cur',//context为当前token---批量执行，包含函数定义、函数调用
    // OP_WEB3_POP_CUR_CALL:'web3.pop.cur.call',//函数调用（调用指定的函数）
    // OP_WEB3_POP_GLOBAL:'web3.pop.global',//context为global（全局）---批量执行，包含函数定义、函数调用
    // OP_WEB3_POP_GLOBAL_CALL:'web3.pop.cur.call',//函数调用（调用指定的函数）
    //是否统一为web3.pop和web3.pop.call两个即可（由opval的对象指定环境变量，这样可能会更优化一些）。例如{poplines:[],context_type}
};


rmb_protocol_config.root_config={
    route_module_path:'',
    //需要TOKEN_ID_LENGTH的长度（指是的token_id的id长度）
    TOKEN_ROOT:TOKEN_NAMESPACE+'_0000000000000000',
        /**
         * token_root数量（可以创建多token_root），以实现多币种（危害性：跨链send及其他操作）。
         * 一般默认为1，后续版本考虑升级支持2的操作（主要是跨链支持与数据隔离---提供云服务等。
         */
        TOKEN_ROOT_NUM:1,
    /**
     * token的状态机
     */
    TOKEN_FSM:'dtns.fsm',//（使用TOKEN_VAL_TYPE进行真正的fms-state计算）
    // TOKEN_OPLIST:JSON.stringify(oplist),
    /**
     * token的主要数值类型NUM
     */
    TOKEN_VAL_TYPE:'SCORE', //这里一旦初始化不能修改（否则会导致状态机出问题）
    ///**
    // * 创世区块高度（也就是高度之前，可以由token_root派发币）----容易导致销毁问题，从而导致总数不为COIN_TOP_VAL
    // */
    //TOKEN_BASE_HEIGHT:10,
    TOKEN_BURN_FLAG:false,

    /**
     * 影响token_id
     * token_id = token_name+"_"+{token_ID_length}
     */
    TOKEN_NAME:TOKEN_NAMESPACE,
    TOKEN_NAME_PREFIX:TOKEN_NAMESPACE_PRE_FIX,
    TNS_NAMESPACE:TOKEN_NAMESPACE_PRE_FIX,
    /**
     * token_ID的长度（一般16位左右就足够了）
     */
    TOKEN_ID_LENGTH:16,
    /**
     * coin的总数额（只有coin的时候才会声明）
     * 21000000
     * 或者
     * 100*10000*10000 = 100亿
     *
     * 或者是-1（无限制）
     */
    COIN_TOP_VAL:0,

    /**
     * 币的最高精度（参照比特币）----这里可动态调整（数据库存储的是文本文字串，避免大数据精度问题）
     * 0.1^0 = 1
     * 0.1^1 = 0.1（代表着coin_num* COIN_MAX_PRECISION为真实值 ）
     */
    COIN_PRECISION_MAX:4,
    //COIN_PRECISION_UNIT_10:10,
    //COIN_PRECISION_UNIT:0.1,

    TOKEN_ROOT_HOST:'127.0.0.1:88',
    DOMAIN_PORT:80,
    /**
     * 域名
     * 这里会影响db与redis的访问
     *
     * DOMAIN_dtns:'coin.dtns.opencom.cn',
     */
    DOMAIN_dtns:'coin.dtns.opencom.cn',
    /**
     * 全功能节点的端口（各个rcp_server保持一致性，这里可以优化和改进---以在一台机器上部署多个node进程）
     * 如果使用nginx重定向域名的话，可以指向不同的半功能节点，但是对外的全节点功能依然以该端口为核心。
     */
    TOKEN_GROUP:'dtns.opencom.cn',

    appids:[10001],
    secret_keys:["39f01b58558ba38d831744a0d353d7a3"],
}
