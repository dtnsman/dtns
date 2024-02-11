/*
 * @Descripttion:
 * @version:
 * @Author: hengzi
 * @Date: 2019-12-12 14:58:13
 * @LastEditors  : hengzi
 * @LastEditTime : 2020-01-14 10:44:04
 */
import config from '../../../vue.config';
const defaultServerIP = '182.61.13.123';
const url = process.env.NODE_ENV === "production" ? "http://182.61.13.123:9000" : "api";//
// const url = process.env.NODE_ENV === "production" ? "http://192.168.150.154:9000" : "api";
const baseUrl = config.publicPath + url;
// const baseUrl = config.publicPath

// const  baseUrl = '106.12.119.162:8008'
export default {
    baseUrl: baseUrl,
    //用户消息列表websocket
    ws_host_path_0:'ws://'+defaultServerIP+':63333',
    ws_user_listen:baseUrl+'/chat/ws/user/listen',
    //聊到室监听websocket
    ws_chatroom_listen:baseUrl+'/chat/ws/listen',
    // 图片列表
    photos: baseUrl + '/image/view?img_kind=open&filename=',//图片的地址

    sendTest:  baseUrl + '/tea/test',

    sendSms:  baseUrl + '/user/send_sms',//发送验证码

    changePassword: baseUrl + '/user/modify_user_pwd_sms',//修改密码

    userRegisterUrl: baseUrl + '/user/regist_phone_user',//用户注册

    testRegisterUrl: baseUrl + '/user/test/registerByPhone',//测试用户注册

    userLoginByPwdUrl: baseUrl +"/user/login_user_pwd",//密码登陆

    userLoginSms : baseUrl + '/user/login_user_sms',

    userInviteListUrl: baseUrl + '/user/getInviteList',//获取用户邀请的用户


   
    OTCimg : baseUrl + '/image/upload',//图片上传

    Chatfile: baseUrl + '/file/upload',//上传文件
    
    userCashoutNew : baseUrl + '/user/cashout/new',//提现
    
    userCashoutOrderList : baseUrl + '/user/cashout/order/user/list',//提现记录

    UserInfo : baseUrl + '/user/info/query/phone',//手机号码查看用户信息

    UserInfoto : baseUrl + '/user/info',//通过userid查询用户信息

    ChatLogoMod : baseUrl + '/user/info/logo/mod',//修改上传头像

    imgLook : baseUrl + '/image/view',//查找图片
    imgScan : baseUrl + '/image/scan',//识别图片

    ChatuserName : baseUrl + '/user/info/name/mod',//修改昵称

    ChatSingle : baseUrl + '/chat/single',//创建单聊

    Chatgroup : baseUrl + '/chat/group',//创建群聊
    
    Chatjoin : baseUrl + '/chat/join',//加入群聊 

    ChatUnjoin : baseUrl + '/chat/unjoin',//退出群聊

    ChatSendText : baseUrl + '/chat/msg/send/text',//发送消息

    ChatList : baseUrl + '/contact/list',//联系人列表

    ChatmsgList : baseUrl + '/chat/msg/list',//获得聊天室的消息列表

    ChatRecentMsgs : baseUrl + '/chat/user/recent/msgs',//得到最新的聊天窗口，包括聊天信息

    ChatMsgInfo : baseUrl + '/chat/msg/info',//得到消息体

    ChatMamList : baseUrl + '/chat/mem/list',//聊天成员列表

    ChatUnjoin : baseUrl + '/chat/unjoin',//退出群聊
	////
	ChatContactAdd : baseUrl + '/contact/add',//添加联系人 
	
	ChatContactDel : baseUrl + '/contact/del',//删除联系人
	
	ChatModLogo : baseUrl + '/chat/mod/logo',//修改群头像
	
    ChatModName : baseUrl + '/chat/mod/name',//修改群名称 
    
    ChatModVip : baseUrl + '/chat/mod/vip_level',//修改群聊会员等级
	
    ChatByContact : baseUrl + '/chat/group/by/contact',//将联系人添加到群聊
    
    ChatMemDel : baseUrl + '/chat/mem/del',//删除群成员
	
	ChatMsgLink : baseUrl + '/chat/msg/send/link',//发链接（新闻等网页链接）
	
    ChatMsgSendFile : baseUrl + '/chat/msg/send/file',//发文件
    
    ChatFileDownload : baseUrl + '/file/download',//下载文件
	
	ChatMsgSendImg : baseUrl + '/chat/msg/send/img',//发图片
	
    ChatMsgSendRecord : baseUrl + '/chat/msg/send/record',//发送语音

    ChatMsgSendVideo : baseUrl + '/chat/msg/send/video',//发送长视频
    ChatMsgSendVideoSmall: baseUrl + '/chat/msg/send/short_video', ///发送短视频
    
    ChatQrcodeScan : baseUrl + '/qrcode/scan',//扫一扫（将二维码图片上传上来，然后解析得到字符串内容 ）

    ChatQrcodeDraw : baseUrl + '/qrcode/draw',//将data内容生成对应的二维码图片

    ChatInfo : baseUrl + '/chat/info',//查看群信息
    ChatForkidsMod:baseUrl+'/chat/mod/forkids',//修改群的forkids

    ChatManagerList : baseUrl + '/chat/manager/list',//查找管理员列表

    ChatManagerAdd : baseUrl + '/chat/manager/add',//添加管理员

    ChatManagerDel : baseUrl + '/chat/manager/del',//删除管理员

    ChatManagerChange : baseUrl + '/chat/owner/change',//转让群主

    ChatVipPrices_and_rights : baseUrl + '/user/vip/prices_and_rights',//获取vip的价格和权益信息

    ChatRmbNew : baseUrl + '/order/rmb/new',//人民币充值创建订单

    ChatRmbPay : baseUrl + '/order/rmb/pay',//人民币支付回调

    ChatRmbList : baseUrl + '/order/rmb/list',//人民币充值记录

    ChatGsbList : baseUrl + '/user/gsb/list',//GSB交易记录

    ChatWxQuery : baseUrl + '/wx/query_order_state',//查询订单状态(如查询成功，会即刻充值)

    ChatVipNew : baseUrl + '/order/vip/new',//创建一个VIP充值订单

    ChatVipPay : baseUrl + '/order/vip/pay',//支付一个VIP订单

    ChatAccountInfo : baseUrl + '/user/account/info',//查询用户的accout资料

    ChatUserSend_code : baseUrl + '/user/send_code',//邮箱验证

    ChatUserEmail : baseUrl + '/user/email/bind',//绑定邮箱

    ChatMsgRecall : baseUrl + '/chat/msg/recall',//撤回消息

    ChatConsoleQuery : baseUrl + '/chat/console/app/about/query',//关于软件的信息

    ChatConsole_user : baseUrl + '/chat/console/all/console_user',//所有客服用户

    ChatUserInvites : baseUrl + '/user/invites',//查询邀请了哪些用户

    ChatSettingQuery : baseUrl + '/chat/console/invite/setting/query',//配置邀请码设置

    ChatBackground : baseUrl + '/chat/mod/backgroup',//修改群背景

    ChatModShare_pm : baseUrl + '/chat/mod/share_pm',//修改群分享权限

    CharStreamInfo : baseUrl + '/chat/live/stream/basic/info',//查看是否在直播中
    
    ChataliveCnt : baseUrl + '/chat/info/alive/cnt',//查看聊天室有多少人在线

    ChatSendNamecard : baseUrl + '/chat/msg/send/namecard',//发送名片
    
    productNew: baseUrl + '/product/new',  ///新建产品
    productList: baseUrl + '/product/list', ////查询自己的产品
    
    addProduct: baseUrl + '/classify/product/add', ///上架产品
    productList: baseUrl + '/product/list', ////查询自己的产品
    queryProductInfo: baseUrl + '/product/info',///查询商品详情
    ///////货架
    ClassifyNew : baseUrl + '/classify/new',//新建分类
    ClassifyList : baseUrl + '/classify/list',//查询分类列表
    ClassifyUpdate : baseUrl + '/classify/update',//更新分类
    ClassifyDelete : baseUrl + '/classify/delete',//删除分类
    ClassifyInfo : baseUrl + '/classify/info',//查询分类资料
    ClassifyProductAdd : baseUrl + '/classify/product/add',//货架添加产品
    ClassifyProductUp : baseUrl + '/classify/product/up',//前置到最顶部
    ClassifyProductDel : baseUrl + '/classify/product/del',//从货架上删除产品
    ClassifyProductList : baseUrl + '/classify/product/list',//得到货架的产品

    ////商铺
    queryMyShops:baseUrl + '/shop/list',  ////我的商铺列表
    queryShopInfo:baseUrl+ '/shop/info', ///我的商铺信息
    deleteShop:baseUrl+ '/shop/delete', ///删除店铺
    getChatList: baseUrl + '/chat/list', ///获取商铺列表
    getShopList:baseUrl + '/shop/getshoplist', ///获取全部小店
    ///地址
    addAddress:baseUrl + '/user/address/add', ///添加地址
    updateAddressInfo: baseUrl + '/user/address/update', ///修改地址信息
    deleteAddressInfo: baseUrl + '/user/address/del', ///删除地址
    queryAddressList: baseUrl + '/user/address/list', ///地址列表
    queryAddressInfo: baseUrl + '/user/address/info', ///根据地址id查找信息
    topaddress:baseUrl+'/user/address/up2list', ///地址前置到最顶部
    //绑定小店
    getbindShop:baseUrl + '/chat/mod/bindShop',//绑定小店
    delboundShop:baseUrl + '/chat/mod/unBoundShop',//绑定小店
    // 购物车
    createOrder: baseUrl + '/user/shopping/order/create',///新建一个订单
    UserShoppingOrderPay: baseUrl + '/user/shopping/order/pay',//支付订单
    UserShoppingOrderDel: baseUrl + '/user/shopping/order/del',//删除订单信息
    UserShoppingOrderRecv: baseUrl + '/user/shopping/order/recv',//确认收货
    UserShoppingOrderComment: baseUrl + '/user/shopping/order/comment',//评价订单
    UserShoppingOrderInfo: baseUrl + '/user/shopping/order/info',//查询订单信息
    UserShoppingOrderList: baseUrl + '/user/shopping/order/list',//查询订单列表
    UserShoppingOrderProductList: baseUrl + '/user/shopping/product/comment/list',//查询商品评价列表
    ///阅后即焚
    msgburnTime: baseUrl + '/chat/mod/burntime',

    // 管理订单
    ShoppingOrderDel: baseUrl + '/shopping/order/del',//删除订单
    ShoppingOrderRefund: baseUrl + '/shopping/order/refund',//订单退款
    ShoppingOrderInfo: baseUrl + '/shopping/order/info',//查询订单信息
    ShoppingOrderList: baseUrl + '/shopping/order/list',//查询订单列表
    ShoppingOrderSend: baseUrl + '/shopping/order/kd/send',//填写快递单号
    updateProductInfo: baseUrl + '/product/update',//修改产品信息
    //用户
    queryOrders: baseUrl + '/user/orders',//查询用户订单清单
    querySMSPhones: typeof g_phones_default_url !='undefined' ? g_phones_default_url : 'https://static.yunapi.org/phones.json',
    userLoginBySafeDeviceUrl:baseUrl+'/user/device/login',
    userSendWeb3NoticeUrl:baseUrl+'/user/web3/notice',
    userWeb3NoticeQueryUrl:baseUrl+'/user/web3/notice/list',
    usersPubKeysQueryUrl:baseUrl+'/user/pubkeys/query',
    usersPubkeysSetUrl:baseUrl+'/user/web3keys/set',
    userWeb3keyQueryUrl:baseUrl+'/user/web3key/query',
    chatWeb3keySet:baseUrl+'/obj/web3key/set',
    chatWeb3keyQuery:baseUrl+'/obj/web3key/query',
    setDTNSNetworkConfigUrl:baseUrl+'/user/dtns/network/config',
    setWe3appSettingUrl:baseUrl+'/user/web3app/setting/set',
    web3appCreateUrl:baseUrl+'/user/web3app/create',
    web3appSetPubkeyUrl:baseUrl+'/user/web3app/pubkey/set',
    sendXMSGUrl:baseUrl+'/dweb/xmsg/send',
    listXMSGUrl:baseUrl+'/dweb/xmsg/list',
    listUserForkListUrl:baseUrl+'/obj/fork/queryUserNFTBuyedObjs',
    clouddiskFolderCreateUrl:baseUrl+'/clouddisk/folder/create',
    clouddiskFileAddUrl:baseUrl+'/clouddisk/folder/file/add',
    clouddiskFilesUrl:baseUrl+'/clouddisk/folder/files',
    clouddiskFolderMyUrl:baseUrl+'/clouddisk/folder/my',
    formengineTemplateUrl:baseUrl+'/formengine/template',
    formengineDataSaveUrl:baseUrl+'/formengine/data/save',
    formengineDataAllUrl:baseUrl+'/formengine/data/all',
}
