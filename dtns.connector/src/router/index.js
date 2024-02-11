import Vue from 'vue'
import Router from 'vue-router'
import index from "../pages/index/index.vue"
import form from "../pages/index/form2.vue"
import xform from "../pages/index/Viewer/xformViewer.vue"
import folderViewer from "../pages/index/Viewer/folderViewer.vue"
import httpViewer from "../pages/index/Viewer/httpViewer.vue"
import designViewer from "../pages/index/Viewer/designViewer.vue"
import popViewer from "../pages/index/Viewer/PopViewer.vue"
import xcardViewer from "../pages/index/Viewer/xcardViewer.vue"
import fork from "../pages/index/fork.vue"
import poster from "../pages/index/poster.vue"
import rtcchat from "../pages/rtcchat/RTCChat.vue"
import locationMarker from "../pages/index/Viewer/locationMarker.vue"
import dxibViewer from "../pages/index/Viewer/dxibViewer.vue"
import x3dViewer from "../pages/index/Viewer/3dViewer.vue"
import x3dEditorViewer from "../pages/index/Viewer/3dEditor.vue"
import x3dPlayerViewer from "../pages/index/Viewer/x3dPlayer.vue"
import xdocViewer from "../pages/index/Viewer/xdocViewer.vue"
import fabricViewer from "../pages/index/Viewer/fabricViewer.vue"
import xdrawViewer from "../pages/index/Viewer/xdrawViewer.vue"
import xcadViewer from "../pages/index/Viewer/xcadViewer.vue"
import pdfViewer from "../pages/index/Viewer/pdfViewer.vue"
import excelViewer from "../pages/index/Viewer/excelViewer.vue"
import docxViewer from "../pages/index/Viewer/docxViewer.vue"
import imageViewer from "../pages/index/Viewer/imageViewer.vue"
import mdViewer from "../pages/index/Viewer/mdViewer.vue"
import textViewer from "../pages/index/Viewer/textViewer.vue"
import videoViewer from "../pages/index/Viewer/videoViewer.vue"
import pptxViewer from "../pages/index/Viewer/pptxViewer.vue"
import dwebLister from "../pages/dweb/lister.vue"
import Connection from "../pages/Connection/Connection.vue"
import connect from "../pages/connector/connect.vue" 
import login from "../pages/login/login.vue"
import user from "../pages/user/user.vue"
import wallet from "../pages/user/wallet/wallet.vue"
import register from "../pages/login/register.vue"
import checking from "../pages/login/checking.vue"
import ModifyInformation from "../pages/user/ModifyInformation.vue"
import RmbRecharge from "../pages/user/wallet/RmbRecharge.vue"
import SetUp from "../pages/user/SetUp.vue"
import changeSvrNode from "../pages/user/changeSvrNode.vue"
import integral from "../pages/user/wallet/integral.vue"
import rmb from "../pages/user/wallet/rmb.vue"
import PurchaseMember from "../pages/user/PurchaseMember.vue"
import complete from "../pages/user/complete.vue"
import cancel from "../pages/user/cancel.vue"
import chat from "../pages/index/chat.vue"
import new_file from "../pages/index/new_file.vue"
import perdata from "../pages/Connection/perdata.vue"
import addfriend from "../pages/index/addfriend.vue"
import phoneLogi from "../pages/login/phoneLogi.vue" //手机快捷登录
import GroupChat from "../pages/index/GroupChat.vue"
import perdatas from "../pages/Connection/perdatas.vue"
import joinChat from "../pages/index/joinChat.vue"
import deleteChat from "../pages/index/deleteChat.vue"
import GroupNickname from "../pages/index/GroupInformation/GroupNickname.vue"
import GroupHeads from "../pages/index/GroupInformation/GroupHeads.vue"
import MembershipLevel from "../pages/index/GroupInformation/MembershipLevel.vue"
import ChatLevel from '../pages/index/GroupInformation/ChatLevel.vue'
import LaRank from '../pages/index/GroupInformation/LaRank.vue'
import Administrators from '../pages/index/GroupInformation/Administrators.vue'
import AdministratorsAdd from '../pages/index/GroupInformation/AdministratorsAdd.vue'
import GroupOwner from '../pages/index/GroupInformation/GroupOwner.vue'
import BindMailbox from '../pages/user/BindMailbox'
import scan from '../pages/index/scan.vue'
import scanGroup from '../pages/index/scanGroup.vue'
import QRcode from '../pages/user/QRcode.vue'
import TurnChat from '../pages/index/TurnChat.vue'
import CashWithdrawal from '../pages/user/wallet/CashWithdrawal.vue'
import ErrorLog from '../pages/user/ErrorLog.vue'
import video from '../pages/index/video.vue'
import AboutSoftwar from '../pages/user/AboutSoftwar.vue'
import InvitationList from '../pages/user/InvitationList.vue'
import OppenBroadcast from '../pages/LiveBroadcast/OppenBroadcast.vue'
import GroupBackground from '../pages/index/GroupInformation/GroupBackground.vue'
import GroupSharing from '../pages/index/GroupInformation/GroupSharing.vue'
import SuccessBroadcast from '../pages/LiveBroadcast/SuccessBroadcast.vue'
import ConfigureLive from '../pages/LiveBroadcast/ConfigureLive.vue'
import SetUpGroupSharing from '../pages/index/GroupInformation/SetUpGroupSharing.vue'
import LiveBroadcast from '../pages/LiveBroadcast/LiveBroadcast.vue'
import DownloadStreaming from '../pages/LiveBroadcast/DownloadStreaming.vue'
import videoChat from '../pages/LiveBroadcast/videoChat.vue'
import contacts from '../pages/index/ChatFunction/contacts.vue'
import transactionSell from '../pages/business/TransactionSell.vue'
import ConfirmBuy from '../pages/business/ConfirmBuy.vue'
import userOrdercopy from '../pages/user/userOrder/userOrdercopy.vue'
import sendShop from '../pages/user/userOrder/sendShop.vue'
import updateShop from '../pages/shopBroadcast/updateShop.vue'
import storeList from '../pages/shopBroadcast/storeList.vue'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
window.g_routers = {
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index //首页
    },
    {
      path: '/dweb',
      name: 'dweb',
      component: dwebLister //首页
    },
    {
      path: '/folder',
      name: 'folder',
      component: folderViewer //网盘
    },
    {
      path: '/http',
      name: 'http',
      component: httpViewer //网址
    },
    {
      path: '/design',
      name: 'design',
      component: designViewer //策划设计工具miniPaint
    },
    {
      path: '/popview',
      name: 'popview',
      component: popViewer 
    },
    {
      path: '/xcard',
      name: 'xcard',
      component: xcardViewer 
    },
    {
      path: '/form',
      name: 'form',
      component: form //首页
    },
    {
      path: '/xform',
      name: 'xform',
      component: xform //首页
    },
    {
      path: '/fork',
      name: 'fork',
      component: fork //首页
    },
    {
      path: '/poster/:chatid',
      name: 'poster',
      component: poster //首页
    },
    {
      path: '/rtcchat',
      name: 'rtcchat',
      component: rtcchat //实时聊天
    },
    {
      path:'/lm',
      name:'location_marker', //标记位置 
      component:locationMarker
    },
    {
      path:'/3d/:x',
      name:'x3d',
      component:x3dViewer
    },
    {
      path:'/3de',
      name:'x3de',
      component:x3dEditorViewer
    },
    {
      path:'/3dp',
      name:'x3dp',
      component:x3dPlayerViewer
    },
    {
      path:'/dxib',
      name:'dxib',
      component:dxibViewer
    },
    {
      path:'/xdoc',
      name:'xdoc',
      component:xdocViewer
    },
    {
      path:'/fabric',
      name:'fabric',
      component:fabricViewer
    },
    {
      path:'/xdraw',
      name:'xdraw',
      component:xdrawViewer
    },
    {
      path:'/xcad',
      name:'xcad',
      component:xcadViewer
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: pdfViewer //首页
    },
    {
      path: '/excel',
      name: 'excel',
      component: excelViewer //首页
    },
    {
      path: '/docx',
      name: 'docx',
      component: docxViewer //首页
    },
    {
      path: '/pptx',
      name: 'pptx',
      component: pptxViewer //首页
    },
    {
      path: '/image',
      name: 'image',
      component: imageViewer //首页
    },
    {
      path: '/md',
      name: 'md',
      component: mdViewer //首页
    },
    {
      path: '/text',
      name: 'text',
      component: textViewer //首页
    },
    {
      path: '/video',
      name: 'video',
      component: videoViewer //首页
    },
    {
      path: '/ModifyInformation',
      name: 'ModifyInformation',
      component: ModifyInformation //修改个人信息
    },
    {
      path: '/user/wallet/CashWithdrawal',
      name: 'CashWithdrawal',
      component: CashWithdrawal //提现
    },
    {
      path: '/',
      component: index //登录
    },
    {
      path: '/connect/:ib3id/:incode',
      name: 'connect',
      component: connect //手机快捷登录
    },
    {
      path: '/connect/:ib3id',
      name: 'connect',
      component: connect //手机快捷登录
    },
    {
      path: '/connect',
      name: 'connect',
      component: connect //手机快捷登录
    },
    {
      path: '/phoneLogi',
      name: 'phoneLogi',
      component: phoneLogi //手机快捷登录
    },
    {
      path: '/user/ErrorLog',
      name: 'ErrorLog',
      component: ErrorLog //错误日志
    },
    {
      path: '/video',
      name: 'video',
      component: video //拍摄视频
    },
////
    {
      path: '/index/chat/:token_y',
      name: 'chat',
      component: chat //聊天
    },
    {
      path: '/index/new_file/:token',
      name: 'new_file',
      component: new_file //聊天管理
    },
    {
      path: '/perdata/:user_id',
      name: 'perdata',
      component: perdata //个人信息
    },
    {
      path: '/Connection/perdatas/:user_id',
      name: 'perdatas',
      component: perdatas //联系人个人信息
    },
    {
      path: '/index/addfriend',
      name: 'addfriend',
      component: addfriend //添加好友
    },
    {
      path: '/index/GroupChat',
      name: 'GroupChat',
      component: GroupChat //创建群聊
    },
    {
      path: '/index/joinChat/:chatid',
      name: 'joinChat',
      component: joinChat //拉好友加入群聊
    },
    {
      path: '/index/TurnChat/:chatid',
      name: 'TurnChat',
      component: TurnChat //转让群主
    },
    {
      path: '/index/deleteChat/:chatid',
      name: 'deleteChat',
      component: deleteChat //删除群成员
    },
    {
      path: '/index/GroupInformation/GroupNickname/:chatid',
      name: 'GroupNickname',
      component: GroupNickname //修改群昵称
    },
    {
      path: '/index/GroupInformation/GroupHeads/:chatid',
      name: 'GroupHeads',
      component: GroupHeads //修改群头像
    },
    {
      path: '/index/GroupInformation/MembershipLevel/:chatid',
      name: 'MembershipLevel',
      component: MembershipLevel //修改会员vip等级
    },
    {
      path: '/index/GroupInformation/ChatLevel/:chatid',
      name: 'ChatLevel',
      component: ChatLevel //修改发消息vip等级
    },
    {
      path: '/index/GroupInformation/LaRank/:chatid',
      name: 'LaRank',
      component: LaRank //修改拉人vip等级
    },
    {
      path: '/index/GroupInformation/Administrators/:chatid',
      name: 'Administrators',
      component: Administrators //管理员
    },
    {
      path: '/index/GroupInformation/AdministratorsAdd/:chatid',
      name: 'AdministratorsAdd',
      component: AdministratorsAdd //添加管理员
    },
    {
      path: '/index/GroupInformation/GroupOwner/:user_id',
      name: 'GroupOwner',
      component: GroupOwner //群主
    },
    //////
    {
      path: '/Connection',
      name: 'Connection',
      component: Connection //连线
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/user',
      name: 'user',
      component: user //我的个人信息
    },
    {
      path: '/SetUp',
      name: 'SetUp',
      component: SetUp //我的设置
    },
    {
      path: '/changeSvrNode',
      name: 'changeSvrNode',
      component: changeSvrNode //我的设置
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: wallet //钱包
    },
    {
      path: '/register',
      name: 'register',
      component: register //注册
    },
    {
      path: '/checking',
      name: 'checking',
      component: checking //忘记密码
    },
    {
      path: '/integral',
      name:'integral',
      component: integral //积分余额
    },
    {
      path: '/rmb',
      name:'rmb',
      component: rmb //钱包人民币余额
    },
    {
      path: '/complete',
      name:'complete',
      component: complete //账号与安全
    },
    {
      path: '/cancel',
      name:'cancel',
      component: cancel //我的会员
    },
    {
      path: '/user/wallet/RmbRecharge',
      name:'RmbRecharge',
      component: RmbRecharge //人民币充值
    },
    {
      path: '/user/PurchaseMember',
      name:'PurchaseMember',
      component: PurchaseMember //会员充值
    },
    {
      path: '/index/scan',
      name:'scan',
      component: scan //扫一扫
    },
    {
      path: '/index/scanGroup/:chatid',
      name:'scanGroup',
      component: scanGroup //扫一扫进群
    },
    {
      path: '/user/QRcode',
      name:'QRcode',
      component: QRcode //我的二维码
    },
    {
      path:'/user/complete/BindMailbox',
      name:'BindMailbox',
      component:BindMailbox//绑定邮箱
    },
    {
      path:'/user/AboutSoftwar',
      name:'AboutSoftwar',
      component:AboutSoftwar//关于软件
    },
    {
      path:'/user/InvitationList',
      name:'InvitationList',
      component:InvitationList//邀请明细
    },
    {
      path:'/LiveBroadcast/OppenBroadcast/:type',
      name:'OppenBroadcast',
      props: true,
      component:OppenBroadcast//开直播间
    },
    {
      path:'/index/GroupBackground/:chatid',
      name:'GroupBackground',
      component:GroupBackground//修改群背景
    },
    {
      path:'/index/GroupSharing/:chatid',
      name:'GroupSharing',
      component:GroupSharing//群分享
    },
    {
      path:'/LiveBroadcast/SuccessBroadcast/:chatid',
      name:'SuccessBroadcast',
      component:SuccessBroadcast//直播间开通成功
    },
    {
      path:'/LiveBroadcast/ConfigureLive/:chatid',
      name:'ConfigureLive',
      component:ConfigureLive//直播间配置
    },
    {
      path:'/index/SetUpGroupSharing/:chatid',
      name:'SetUpGroupSharing',
      component:SetUpGroupSharing//设置群分享可见性
    },
    {
      path:'/LiveBroadcast/LiveBroadcast',
      name:'LiveBroadcast',
      component:LiveBroadcast//直播
    },
    {
      path:'/LiveBroadcast/DownloadStreaming',
      name:'DownloadStreaming',
      component:DownloadStreaming//下载推流工具
    },
    {
      path:'/LiveBroadcast/videoChat/:token_y',
      name:'videoChat',
      component:videoChat//直播聊天室
    },
    {
      path:'/index/ChatFunction/contacts/:chat_id',
      name:'contacts',
      component:contacts//群聊发送名片联系人列表
    },
    ///配置开小店
    {
      path: '/shopBroadcast/successSetShop/:chatid',
      name: 'successSetShop',
      component: ()=>import('../pages/shopBroadcast/successSetShop.vue')
    },
    ///发布产品
    {
      path: '/shopBroadcast/issueProduct/:shopid/:chatid',
      name: 'issueProduct',
      component: ()=>import('../pages/shopBroadcast/issueProduct.vue')
    },
    ///设置产品价格
    { 
      name: 'setShopPrice',
      path: '/shopBroadcast/setShopPrice/:shopid/:chatid',
      component: ()=>import('../pages/shopBroadcast/setShopPrice.vue')
    },
    ///管理仓库
    {
      name: 'managegoods',
      path: '/shopBroadcast/managegoods/:shopid/:chatid',
      component: ()=>import('../pages/shopBroadcast/managegoods.vue')
    },
    ///从仓库中上架商品
    {
      name: 'putawaygoods',
      path: '/shopBroadcast/putawaygoods/:shopid/:chatid',
      component: ()=>import('../pages/shopBroadcast/putawaygoods.vue')
    },
    ///货架分类
    {
      name: 'storeClassify',
      path: '/shopBroadcast/storeClassify/:shopid/:chatid',
      component: ()=>import('../pages/shopBroadcast/storeClassify.vue')
    },
    ///产品库
    {
      name: 'store',
      path: '/shopBroadcast/shopStore/:shopid/:chatid',
      component: ()=>import('../pages/shopBroadcast/shopStore.vue')
    },
    ///商品订单
    {
      name: 'shopOrder',
      path: '/shopBroadcast/shopOrder/:chatid',
      component: ()=>import('../pages/shopBroadcast/shopOrder.vue')
    },
      ////商品详情页面啊
    {
      name: 'shopDetail',
      path: '/shopDetail/:product_id',
      props: true,
      component: ()=>import('../pages/shopBroadcast/shopDetail.vue')
    },
  
    ///用户订单
    {
      name: 'userOrder',
      path: '/userOrder',
      component: ()=>import('../pages/user/userOrder/userOrder.vue')
    },
    ///用户订单
    {
      name: 'userOrdercopy',
      path: '/userOrdercopy',
      component: ()=>import('../pages/user/userOrder/userOrdercopy.vue')
    },
    ////订单详情
    {
      name: 'userShopDetail',
      path: '/userShopDetail/:orderId/:state',
      props: true,
      component: ()=> import('../pages/user/userOrder/userShopDetail.vue')
    },
    ///用户购物车
    {
      name: 'userShoppingCart',
      path: '/userShoppingCart/:chatid',
      component: ()=> import('../pages/user/userShoppingCart.vue')
    },
    ///用户收货地址
    {
      name: 'userAddress',
      path: '/userAddress',
      component: ()=>import('../pages/user/userAddress.vue')
    },
    ///增加用户地址
    {
      name: 'addAddress',
      path: '/addAddress',
      component: ()=>import('../pages/user/addAddress.vue')
    },
    ///用户修改地址
    {
      name: 'addAddressEdit',
      path: '/addAddressEdit/:addressId',
      props: true,
      component: ()=>import('../pages/user/addAddress.vue')
    },
  
    ///确认订单页面
    {
      name: 'confirmAnOrder',
      path: '/confirmAnOrder',
      component: ()=> import('../pages/user/confirmAnOrder.vue')
    },
    ///交易中订单
    {
      name: 'transactionSell',
      path: '/transactionSell',
      component: ()=> import('../pages/business/TransactionSell.vue')
    },
    ///待支付订单
    {
      name: 'ConfirmBuy',
      path: '/ConfirmBuy',
      component: ()=> import('../pages/business/ConfirmBuy.vue')
    },
    ///商家填写订单号
    {
      name: 'sendShop',
      path: '/sendShop/:orderId/:shopId',
      component: ()=> import('../pages/user/userOrder/sendShop.vue')
    },
    ///商家修改商品信息
    {
      name: 'updateShop',
      path: '/shopBroadcast/updateShop/:product_id/:chatid',
      component: ()=> import('../pages/shopBroadcast/updateShop.vue')
    },
    ///用户小店列表
    {
      name: 'storeList',
      path: '/storeList',
      component: ()=> import('../pages/shopBroadcast/storeList.vue')
    }
  ]
}
let router = new Router(g_routers)
router.beforeEach((to, from, next)=> {
 let userInfo = localStorage.getItem('userInfo')
 //'login','checking','register','phoneLogi',
 let list = ['checking','connect','chat','GroupSharing','new_file','videoChat','changeSvrNode']
 if (userInfo || list.indexOf(to.name) !== -1) {

   next()
 }
 else {
   next({
     name:'connect'//login
   })
 }
  // next()
})


export default router
