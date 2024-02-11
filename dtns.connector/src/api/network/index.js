/*
 * @Descripttion:
 * @version:
 * @Author: hengzi
 * @Date: 2019-12-12 14:58:07
 * @LastEditors  : hengzi
 * @LastEditTime : 2020-01-14 10:44:55
 */
import api from '../index'
import urls from './url'
let config = {
    headers: {
        'Content-Type':'multipart/form-data'
    }
       
  };

let uinfoLocks = {}; 
let user_keepalive_funcs = [];
let user_keepalive =0;
let websock = null;
let newMsgObjFunc = {};
let indexObj = {}
let initChatWebsocket = null

function notice_user_ws_status(status)
{
    const client = window.rpc_client
    user_keepalive = client.pingpong_flag ? 1:0// websock && client.qWS(websock.ws_token) ? 1:0//status;
    console.log('network-status:',user_keepalive)
    for(let i=0;i<user_keepalive_funcs.length;i++)
    {
        // console.log('user_keepalive_funcs:'+user_keepalive_funcs[i])
        user_keepalive_funcs[i](user_keepalive)
    }
}
window.g_notice_network_status = notice_user_ws_status


const restart_time = 1000;
async function initWebSocket(){
    console.log('into initWebSocket function',websock)

    //建立在背景连接之下
    // if(typeof g_connectIBChatSvr == 'function') g_connectIBChatSvr()

    const client = window.rpc_client
    console.log('initWebSocket-client:',client,client?client.roomid:'web3name is null')
    if(websock && client.qWS(websock.ws_token))
	{
        notice_user_ws_status(user_keepalive)
        return ;
    }
    // if(typeof(WebSocket) === "undefined"){
    //     console.error("您的浏览器不支持WebSocket")
    //     return false
    // }

    try{
        let params = {user_id:localStorage.user_id,s_id:localStorage.s_id};
        let tokenRet = await api.post(urls.ws_user_listen,params,{'Content-Type': 'application/x-www-form-urlencoded'});//token
		console.log('index.js-websocket-lisenret:',tokenRet)
        if(tokenRet && tokenRet.ret && tokenRet.listen_token)
        {
            // let wsuri = urls.ws_host_path_0+'/userchatlist/ws/svr?token='+tokenRet.listen_token;
            client.setWs(tokenRet.listen_token,websocketonmessage)
            client.setPeerRefreshCallback(function(){
                initWebSocket();
                if(typeof initChatWebsocket == 'function')
                {
                    initChatWebsocket()
                }
            })
            client.send('/userchatlist/ws/svr',{token:tokenRet.listen_token})
            websock =  {ws_token:tokenRet.listen_token}
            // websock = new WebSocket(wsuri)
            // websock.onopen = websocketonopen
            // websock.onmessage = websocketonmessage
            // websock.onerror = websocketonerror
            // websock.onclose = websocketclose
        }else{

            if(tokenRet && tokenRet.msg && tokenRet.msg.indexOf('session error')>=0)
            {
                console.log('[Error] initWebsocket--user session error, relogin now!')
                //使用密钥重新登录
                let web3name =  rpc_client.roomid ? rpc_client.roomid : 'dtns'
                let timestamp = parseInt( Date.now()/1000)
                let hash = await key_util.hashVal(web3name+':'+timestamp)
                let sign = await key_util.signMsg(hash,rpc_client.mywallet.private_key)
                let res =  await g_networkApiObj.userLoginBySafeDevice({web3name,sign,timestamp})

                console.log('initWebscoket-userLoginBySafeDevice--login-res',res)
                if(res && res.ret)
                {
                //   This.$api.network.startWebSocket();
                  // if(typeof g_connectIBChatSvr == 'function') g_connectIBChatSvr()
                  localStorage.setItem('newDWebFlag','1')
                  
                  localStorage.setItem("s_id", res.s_id);
                  localStorage.setItem("user_id", res.user_id);
                  localStorage.setItem("userInfo",JSON.stringify(res))
                //   This.$toast.success("登录成功",1000);
                  console.log('initWebscoket-userLoginBySafeDevice--login success')

                  console.log('[ok]session:'+web3name+' save now:',res)
                  iSessionDb.deleteDataByKey('session:'+web3name)
                  iSessionDb.addData({key:'session:'+web3name,data:res}) 
                  iSessionDb.addData({key:'session:'+web3name+':'+Date.now(),data:res})

                  setTimeout(initWebSocket, 30);
                  return 
                }
            }


            console.log('initWebSocket-get-ws-token failed:'+JSON.stringify(tokenRet))
            websock  = null;
            setTimeout(initWebSocket,restart_time);
        }   
    }catch(ex){
        websock = null
        console.log('start websocket-exception:'+ex)
        setTimeout(initWebSocket,restart_time);
    }
}
// let keepalive_id = null;
// function callKeepAlive()
// {
//     killKeepAlive();
//     keepalive_id = setInterval(function(){
//         if(websock) websock.send('keepalive')
//     },9000)

//     if(websock) websock.send('keepalive')
// }
// function killKeepAlive()
// {
//     if(keepalive_id) clearInterval(keepalive_id)
//     keepalive_id = null;
// }
//连接成功
// function websocketonopen(){ 
//     console.log('WebSocket连接成功')
//     user_keepalive = 1;
//     notice_user_ws_status(user_keepalive)
//     callKeepAlive();

// }//接收后端返回的数据
function websocketonmessage(e){ 
    let data = e// e.data;
    console.log('backgroud-index----websocketonmessage:',data)

    user_keepalive = 1;
    notice_user_ws_status(user_keepalive)

    let dataJson = data;
    if(!data.msg)
    try{
        dataJson = JSON.parse(data)
    }catch(ex){
        // console.log('dataJson parse failed:'+ex)
    }

    // console.log('dataJSON:'+JSON.stringify(dataJson))
    if(typeof newMsgObjFunc =='function') newMsgObjFunc(dataJson)
    else console.log('newMsgObjFunc is undefined')

    if(bgMp3 && dataJson.txjson && dataJson.txjson.extra_data && dataJson.txjson.extra_data !=localStorage.user_id){
        bgMp3.play()
        console.log('call bgMp3.play()')
    }

    // 在这里使用后端返回的数据，对数据进行处理渲染
}
// //连接建立失败重连
// function websocketonerror(e){
//     console.log(`连接失败的信息：`, e)
//     //this.initWebSocket() // 连接失败后尝试重新连接
//     user_keepalive = 0;
//     notice_user_ws_status(user_keepalive)
//     websock  = null;
//     setTimeout(initWebSocket,restart_time);
//     killKeepAlive();
// }
// //关闭连接
// function websocketclose(e){ 
//     console.log('断开连接',e)
//     websock  = null;
//     user_keepalive = 0;
//     notice_user_ws_status(user_keepalive)
//     setTimeout(initWebSocket,restart_time);
//     killKeepAlive();
// }


let total_unread_num_func = [];
var networkApiObj = {
    getImgDB()
    {
        if(imageDB) return imageDB
        else{
            imageDB = new ImageIndexDB()
            let instance = imageDB.openDB()
            console.log('opendb:',instance)
            return imageDB
            // db.addData({img_id:'img0',data:'base000001'})
            // db.addData({img_id:'img1',data:'base000002'})
            // db.addData({img_id:'img2',data:'base000003'})
            // db.addData({img_id:'img3',data:'base000004'})
            // let data = await db.getDataByKey('img3')
            // console.log('data:'+JSON.stringify(data))
            // let list = await db.getAllDatas()
            // console.log('list:',list)
        }
    },
    getImg(params)
    {
        return api.getImg('/image/view',params)
    },
    setTotalUnreadNum(func)
    {
        let exists = false
        if(total_unread_num_func.length>=3)
        for(let i=2;i<total_unread_num_func.length;i++)
        {
            total_unread_num_func.pop()
        }
            // if(total_unread_num_func[i] == func){
            //     exists = true
            //     break
            // }
        //if(!exists)
        total_unread_num_func.push( func)
    },
    updateTotalUnreadNum(){
        if(total_unread_num_func.length>0)
        for(let i=0;i<total_unread_num_func.length;i++)
            total_unread_num_func[i]();
    },
    addUserKeepAliveStatusFunc(func)
    {
        if(func) user_keepalive_funcs.push(func)
    },
    async startWebSocket(){
        initWebSocket();
    },
    stopWebSocket()
    {
        console.log('call stopWebSocket()')
        const client = window.rpc_client
        if(this.websock)
        {
            let link_token = this.websock.ws_token
            if(link_token && client.qWS(link_token))
            {
                client.wsMap.delete(link_token)
            }
            this.websock = null
        }
    },
    setNewMsgObjFunc(func)
    {
        newMsgObjFunc = func;
    },
    setIndexObj(obj)
    {
        indexObj = obj;
    },
    getIndexObj(obj)
    {
        return indexObj
    },
    setRetInitChatWebsocketFunc(func)
    {
        initChatWebsocket = func;
    },
    //uinfoLocks为加锁操作
    async s_queryUserInfo(dst_user_id,callback)
    {
        // console.log('s_queryUserInfo:'+dst_user_id)

        // console.log('user_keepalive_funcs:'+user_keepalive_funcs)
        if(dst_user_id==localStorage.user_id){
            let str = localStorage.getItem('userInfo')
            if(str){
                try{
                    let userInfo = JSON.parse(str)   
                    if(typeof callback=='function') callback(userInfo)
                    return userInfo;
                }catch(ex){
                }
            }
        }
    
        let userInfoStr = await imDb.getDataByKey('userinfo_cache_'+dst_user_id)  // localStorage.getItem('userinfo_cache_'+dst_user_id);
        // console.log('userinfo_cache_'+dst_user_id+':'+userInfoStr)
        let userInfo = null;
        if(userInfoStr && userInfoStr.data) {
            try{
                userInfo = userInfoStr.data//JSON.parse(userInfoStr)   
                if(typeof callback=='function') callback(userInfo)
                return userInfo;
            }catch(ex)
            {
                // console.log(JSON.stringify(ex))
            }
        }

        //使用网络请求拿到值
        console.log('uinfoLocks-'+dst_user_id+':'+uinfoLocks[dst_user_id])
        // if(!uinfoLocks[dst_user_id])
        {
            // uinfoLocks[dst_user_id] = true;
            let user_id = localStorage.user_id
            let param = {user_id,s_id:localStorage.s_id,random:Math.random(),dst_user_id}

            return await new Promise((rex)=>{
                api.post(urls.UserInfoto,param,{'Content-Type': 'application/x-www-form-urlencoded'}).then(res=>
                {
                    if(res && res.ret)
                    {
                        userInfo = res;
                        //localStorage.setItem('userinfo_cache_'+dst_user_id,JSON.stringify(res));
                        imDb.addData({key:'userinfo_cache_'+dst_user_id,data:res})
                    }else{
                        userInfo = null;
                    }
    
                    // uinfoLocks[dst_user_id] = false;
    
                    //回调得到结果
                    if(typeof callback=='function') callback(userInfo)
                    rex(userInfo)
                })
            })
        }

        return null;
    },
    getChatRoomWebSocketListenToken(param) {
        return api.post(urls.ws_chatroom_listen,param,{'Content-Type': 'application/x-www-form-urlencoded'});//获取chatroom-ws-listen-token
    },
    createWSChatListenUrl(token)
    {
        return urls.ws_host_path_0+'/groupchat/ws/svr?token='+token;
    },
    OTCorder(params) {
        return api.get(urls.OTCorder,params,"");//
    },
    getTest(params){
        return api.get(urls.sendTest,params,"");
    },
    sendSms(params){
        return api.post(urls.sendSms,params,{'Content-Type': 'application/x-www-form-urlencoded'});//获取验证码
    },
    changePassword(params){
        return api.post(urls.changePassword,params,{'Content-Type': 'application/x-www-form-urlencoded'});
    },
    userLoginByPwdUrl(params){
        return api.get(urls.userLoginByPwdUrl,params,"");//登录
    },
    userLoginBySafeDevice(params){
        return api.get(urls.userLoginBySafeDeviceUrl,params,"");//登录
    },
    OTCquerone(params){
        return api.get(urls.OTCquerone,params,"");//密码登录
    },
    userLoginSms(params){
        return api.get(urls.userLoginSms,params,"");//短信登录
    },
    userCashoutNew(params){
        return api.get(urls.userCashoutNew,params,"");//提现
    },
    userCashoutOrderList(params){
        return api.get(urls.userCashoutOrderList,params,"");//提现记录
    },
    ChatLogoMod(params){
        return api.get(urls.ChatLogoMod,params,"");//确认上传头像
    },
    ChatuserName(params){
        return api.get(urls.ChatuserName,params,"");//修改昵称
    },
    UserInfo(params){
        return api.get(urls.UserInfo,params,"");//手机号码查看用户信息
    },
    UserInfoto(params){
        return api.get(urls.UserInfoto,params,"");//userid查看用户信息
    },
    imgLook(params){
        return api.get(urls.imgLook,params,"multipart/form-data");//查找图片
    },
    imgScan(params){
        return api.get(urls.imgScan,params,"");//识别图片（二维码）
    },
    ChatSingle(params){
        return api.get(urls.ChatSingle,params,"");//创建单聊
    },
    Chatgroup(params){
        return api.get(urls.Chatgroup,params,"");//创建群聊 
    },
    Chatjoin(params){
        return api.get(urls.Chatjoin,params,"");//加入群聊
    },
    ChatUnjoin(params){
        return api.get(urls.ChatUnjoin,params,"");//退出群聊
    },
    ChatList(params){
        return api.get(urls.ChatList,params,"");//聊天室列表
    },
    ChatmsgList(params){
        return api.get(urls.ChatmsgList,params,"");//得到聊天室的消息列表
    },
    ChatRecentMsgs(params){
        return api.get(urls.ChatRecentMsgs,params,"");//得到最新的聊天窗口，包括聊天信息
    },
    ChatMsgInfo(params){
        return api.get(urls.ChatMsgInfo,params,"");//得到消息体
    },
    ChatSendText(params){
        return api.get(urls.ChatSendText,params,"");//发送消息
    },
    ChatMamList(params){
        return api.get(urls.ChatMamList,params,"");//聊天成员列表
    },
    ChatUnjoin(params){
        return api.get(urls.ChatUnjoin,params,"");//聊天成员列表
    },
	//
	ChatContactAdd(params){
	    return api.get(urls.ChatContactAdd,params,"");//添加联系人
	},
	ChatContactDel(params){
	    return api.get(urls.ChatContactDel,params,"");//删除联系人
	},
	ChatModLogo(params){
	    return api.get(urls.ChatModLogo,params,"");//修改群头像
	},
	ChatModName(params){
	    return api.get(urls.ChatModName,params,"");//修改群名字
    },
    ChatModVip(params){
	    return api.get(urls.ChatModVip,params,"");//修改群聊会员等级
	},
	ChatByContact(params){
	    return api.get(urls.ChatByContact,params,"");//将联系人添加到群聊
    },
    ChatMemDel(params){
	    return api.get(urls.ChatMemDel,params,"");//删除群成员
	},
	ChatMsgLink(params){
	    return api.get(urls.ChatMsgLink,params,"");//发链接新闻等
	},
	ChatMsgSendFile(params){
	    return api.get(urls.ChatMsgSendFile,params,"");//发文件
    },
    ChatFileDownload(params){
	    return api.get(urls.ChatFileDownload,params,"");//下载文件
	},
	ChatMsgSendImg(params){
	    return api.get(urls.ChatMsgSendImg,params,"");//发图片
	},
	ChatMsgSendRecord(params){
	    return api.get(urls.ChatMsgSendRecord,params,"");//发语音
    },
    ChatMsgSendVideo(params){
	    return api.get(urls.ChatMsgSendVideo,params,"");//发送视频
    },
    ChatMsgSendVideoSmall(params) {
        return api.get(urls.ChatMsgSendVideoSmall,params,"");
    },
    ChatQrcodeScan(params){
	    return api.get(urls.ChatQrcodeScan,params,"");//扫一扫（将二维码图片上传上来，然后解析得到字符串内容 ）
    },
    ChatQrcodeDraw(params){
	    return api.get(urls.ChatQrcodeDraw,params,"");//将data内容生成对应的二维码图片
    },
    ChatInfo(params){
	    return api.get(urls.ChatInfo,params,"");//查看群信息
    },
    ChatForkidsMod(params){
	    return api.get(urls.ChatForkidsMod,params,"");//查看群信息
    },
    ChatManagerList(params){
	    return api.get(urls.ChatManagerList,params,"");//查看管理员列表
    },
    ChatManagerAdd(params){
	    return api.get(urls.ChatManagerAdd,params,"");//添加管理员
    },
    ChatManagerDel(params){
	    return api.get(urls.ChatManagerDel,params,"");//删除管理员
    },
    ChatManagerChange(params){
	    return api.get(urls.ChatManagerChange,params,"");//转让群主
    },
    ChatVipPrices_and_rights(params){
	    return api.get(urls.ChatVipPrices_and_rights,params,"");//获取vip的价格和权益信息
    },
    ChatRmbNew(params){
	    return api.get(urls.ChatRmbNew,params,"");//人民币充值创建订单
    },
    ChatRmbPay(params){
	    return api.get(urls.ChatRmbPay,params,"");//人民币充值回调
    },
    ChatWxQuery(params){
	    return api.get(urls.ChatWxQuery,params,"");//查询订单状态(如查询成功，会即刻充值)
    },
    ChatVipNew(params){
	    return api.get(urls.ChatVipNew,params,"");//创建一个VIP充值订单
    },
    ChatVipPay(params){
	    return api.get(urls.ChatVipPay,params,"");//支付一个VIP订单
    },
    ChatAccountInfo(params){
	    return api.get(urls.ChatAccountInfo,params,"");//支付一个VIP订单
    },
    ChatUserSend_code(params){
	    return api.get(urls.ChatUserSend_code,params,"");//邮箱验证码
    },
    ChatUserEmail(params){
	    return api.get(urls.ChatUserEmail,params,"");//绑定邮箱
    },
    ChatRmbList(params){
	    return api.get(urls.ChatRmbList,params,"");//人民币交易记录
    },
    ChatGsbList(params){
	    return api.get(urls.ChatGsbList,params,"");//GSB交易记录
    },
    ChatMsgRecall(params){
	    return api.get(urls.ChatMsgRecall,params,"");//撤回消息
    },
    ChatConsoleQuery(params){
	    return api.get(urls.ChatConsoleQuery,params,"");//关于软件的信息
    },
    ChatConsole_user(params){
	    return api.get(urls.ChatConsole_user,params,"");//所有客服用户
    },
    ChatUserInvites(params){
	    return api.get(urls.ChatUserInvites,params,"");//查询邀请了哪些用户
    },
    ChatSettingQuery(params){
	    return api.get(urls.ChatSettingQuery,params,"");//邀请码设置查询
    },
    ChatBackground(params){
	    return api.get(urls.ChatBackground,params,"");//修改群背景
    },
    ChatModShare_pm(params){
	    return api.get(urls.ChatModShare_pm,params,"");//修改群分享权限
    },
    CharStreamInfo(params){
	    return api.get(urls.CharStreamInfo,params,"");//查看直播间是否在直播
    },
    ChataliveCnt(params){
	    return api.get(urls.ChataliveCnt,params,"");//查看聊天室有多少人在线
    },
    ///货架
    ClassifyNew(params){
	    return api.get(urls.ClassifyNew,params,"");//新建分类
    },
    ClassifyList(params){
	    return api.get(urls.ClassifyList,params,"");//查询分类列表
    },
    ClassifyUpdate(params){
	    return api.get(urls.ClassifyUpdate,params,"");//更新分类
    },
    ClassifyDelete(params){
	    return api.get(urls.ClassifyDelete,params,"");//删除分类
    },
    ClassifyInfo(params){
	    return api.get(urls.ClassifyInfo,params,"");//查询分类资料
    },
    ClassifyProductAdd(params){
	    return api.get(urls.ClassifyProductAdd,params,"");//货架添加产品
    },
    ClassifyProductUp(params){
	    return api.get(urls.ClassifyProductUp,params,"");//前置到最顶部
    },
    ClassifyProductDel(params){
	    return api.get(urls.ClassifyProductDel,params,"");//从货架上删除产品
    },
    ClassifyProductList(params){
	    return api.get(urls.ClassifyProductList,params,"");//得到货架的产品
    },
    
    //商铺
    queryShopInfo(params){
        return api.get(urls.queryShopInfo,params,"");//商铺信息
    },
    getShopList(params){
        return api.get(urls.getShopList,params,"");//获取全部小店
    },
    getChatList(params){
        return api.get(urls.getChatList,params,"");//获取全部小店
    },
    deleteShop(params){
        return api.get(urls.deleteShop,params,"");//删除店铺
    },
    queryMyShops(params){
        return api.get(urls.queryMyShops,params,"");//获取全部小店
    },
    //直播间绑定小店
    getbindShop(params){
        return api.get(urls.getbindShop,params,"");//绑定小店
    },
    delboundShop(params){
        return api.get(urls.delboundShop,params,"");//绑定小店
    },
    // 购物车
    UserShoppingCreate(params){
	    return api.get(urls.UserShoppingCreate,params,"");//新增一个订单
    },
    UserShoppingPay(params){
	    return api.get(urls.UserShoppingPay,params,"");//订单支付
    },
    UserShoppingDel(params){
	    return api.get(urls.UserShoppingDel,params,"");//删除订单信息
    },
    UserShoppingRecv(params){
	    return api.get(urls.UserShoppingRecv,params,"");//确认收货
    },
    UserShoppingComment(params){
	    return api.get(urls.UserShoppingComment,params,"");//评价订单
    },
    UserShoppingInfo(params){
	    return api.get(urls.UserShoppingInfo,params,"");//查询订单信息
    },
    UserShoppingList(params){
	    return api.get(urls.UserShoppingList,params,"");//查询列表
    },
    UserShoppingProductList(params){
	    return api.get(urls.UserShoppingProductList,params,"");//查询商品的评价列表
    },
    ChatSendNamecard(params){
	    return api.get(urls.ChatSendNamecard,params,"");//发送名片
    },
    // 管理订单
    ShoppingOrderDel(params){
	    return api.get(urls.ShoppingOrderDel,params,"");//删除订单
    },
    ShoppingOrderRefund(params){
	    return api.get(urls.ShoppingOrderRefund,params,"");//订单退款
    },
    ShoppingOrderInfo(params){
	    return api.get(urls.ShoppingOrderInfo,params,"");//查询订单信息
    },
    ShoppingOrderList(params){
	    return api.get(urls.ShoppingOrderList,params,"");//查询订单列表
    },
    ShoppingOrderSend(params){
	    return api.get(urls.ShoppingOrderSend,params,"");//填写快递单号
    },
    updateProductInfo(params){
	    return api.get(urls.updateProductInfo,params,"");//修改产品信息
    },

    // 购物车
    UserShoppingOrderPay(params){
	    return api.get(urls.UserShoppingOrderPay,params,"");//支付订单
    },
    UserShoppingOrderDel(params){
	    return api.get(urls.UserShoppingOrderDel,params,"");//删除订单信息
    },
    UserShoppingOrderRecv(params){
	    return api.get(urls.UserShoppingOrderRecv,params,"");//确认收货
    },
    UserShoppingOrderComment(params){
	    return api.get(urls.UserShoppingOrderComment,params,"");//评价订单
    },
    UserShoppingOrderInfo(params){
	    return api.get(urls.UserShoppingOrderInfo,params,"");//查询订单信息
    },
    UserShoppingOrderList(params){
	    return api.get(urls.UserShoppingOrderList,params,"");//查询订单列表
    },
    UserShoppingOrderProductList(params){
	    return api.get(urls.UserShoppingOrderProductList,params,"");//查询商品的评价列表
    },
    queryOrders(params){
        return api.get(urls.queryOrders,params,"");//查询用户订单清单
    },
    



    OTCimg(params){
        return api.post(urls.OTCimg,params,config)//上传
    },
    // OTCimgsell(params){
    //     return api.post(urls.OTCimgsell,params,{'Content-Type': 'application/x-www-form-urlencoded'})//查找
    // },
    userRegisterUrl(params){
        return api.post(urls.userRegisterUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    testRegister(params){
        return api.post(urls.testRegisterUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    userLoginByPwd(params){
        return api.post(urls.userLoginByPwdUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    userInviteList(params){
        return api.post(urls.userInviteListUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    productNew(params) {
        return api.get(urls.productNew,params, {'Content-Type': 'application/x-www-form-urlencoded'})
    },
    productList(params) {
        return api.get(urls.productList,params, {'Content-Type': 'application/x-www-form-urlencoded'})
    },
    queryProductInfo(params) {
        return api.get(urls.queryProductInfo,params, {'Content-Type': 'application/x-www-form-urlencoded'})
    },
    queryAddressList (params) {
        return api.get(urls.queryAddressList,params, {'Content-Type': 'application/x-www-form-urlencoded'})
    },
    deleteAddressInfo(params) {
        return api.get(urls.deleteAddressInfo,params, {'Content-Type': 'application/x-www-form-urlencoded'})
    },
    queryAddressInfo(params) {
        return api.get(urls.queryAddressInfo,params, {'Content-Type': 'application/x-www-form-urlencoded'})
    },
    updateAddressInfo(params) {
        return api.get(urls.updateAddressInfo,params, {'Content-Type': 'application/x-www-form-urlencoded'})
    },
    addAddress(params) {
        return api.get(urls.addAddress,params, {'Content-Type': 'application/x-www-form-urlencoded'})
    },
    topaddress(params){
        return api.get(urls.topaddress,params, {'Content-Type': 'application/x-www-form-urlencoded'})//地址前置
    },
    storeProductList(params) {
        return api.get(urls.storeProductList,params, {'Content-Type': 'application/x-www-form-urlencoded'})
    },
    createOrder (params) {
        return api.get(urls.createOrder,params, {'Content-Type': 'application/x-www-form-urlencoded'})
    },
    addProduct(params) {
        return api.get(urls.addProduct,params, {'Content-Type': 'application/x-www-form-urlencoded'})
    },
    msgburnTime(params) {
        return api.get(urls.msgburnTime,params, {'Content-Type': 'application/x-www-form-urlencoded'})
    },
    queryPopSafeSmsPhones(params){
        params = !params ? {}:params
        return api.get(urls.querySMSPhones,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },

    sendUserWeb3Notice(params){
        params = !params ? {}:params
        return api.get(urls.userSendWeb3NoticeUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    }
    ,
    queryUserWeb3NoticeList(params){
        params = !params ? {}:params
        return api.get(urls.userWeb3NoticeQueryUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    }
    ,
    setUsersWeb3keys(params){
        params = !params ? {}:params
        return api.get(urls.usersPubkeysSetUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    queryUsersPubkeys(params){
        params = !params ? {}:params
        return api.get(urls.usersPubKeysQueryUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    }
    ,
    setUsersWeb3keys(params){
        params = !params ? {}:params
        return api.get(urls.usersPubkeysSetUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    queryUsersWeb3key(params){
        params = !params ? {}:params
        return api.get(urls.userWeb3keyQueryUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    setChatWeb3key(params){
        params = !params ? {}:params
        return api.get(urls.chatWeb3keySet,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    }
    ,
    queryChatWeb3key(params){
        params = !params ? {}:params
        return api.get(urls.chatWeb3keyQuery,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    setDTNSNetworkConfig(params){
        params = !params ? {}:params
        return api.get(urls.setDTNSNetworkConfigUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    setWe3appSetting(params){
        params = !params ? {}:params
        return api.get(urls.setWe3appSettingUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    web3appCreate(params){
        params = !params ? {}:params
        return api.get(urls.web3appCreateUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    web3appSetPubkey(params){
        params = !params ? {}:params
        return api.get(urls.web3appSetPubkeyUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    sendXMSG(params){
        params = !params ? {}:params
        return api.get(urls.sendXMSGUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    listXMSG(params){
        params = !params ? {}:params
        return api.get(urls.listXMSGUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    listUserForkList(params){
        params = !params ? {}:params
        return api.get(urls.listUserForkListUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    clouddiskFolderCreate(params){
        params = !params ? {}:params
        return api.get(urls.clouddiskFolderCreateUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    clouddiskFileAdd(params){
        params = !params ? {}:params
        return api.get(urls.clouddiskFileAddUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    clouddiskFiles(params){
        params = !params ? {}:params
        return api.get(urls.clouddiskFilesUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    clouddiskFolderMy(params){
        params = !params ? {}:params
        return api.get(urls.clouddiskFolderMyUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    formengineTemplate(params){
        params = !params ? {}:params
        return api.get(urls.formengineTemplateUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    formengineDataSave(params){
        params = !params ? {}:params
        return api.get(urls.formengineDataSaveUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    },
    formengineDataAll(params){
        params = !params ? {}:params
        return api.get(urls.formengineDataAllUrl,params,{'Content-Type': 'application/x-www-form-urlencoded'})
    }
}
window.g_networkApiObj = networkApiObj
export default networkApiObj



