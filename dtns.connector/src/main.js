// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "@babel/polyfill";

import Vue from 'vue'
import App from './App'
import router from './router'
import loadPlugins from './plugins/loadPlugins'
import store from './store'
import api from './api/install'
import url from './api/network/url'
import md5 from 'js-md5'
import axios from 'axios'
import'./assets/icon/iconfont.css';
//引入svg
import './icons'
// import 'vant/lib/index.css'

// import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
// import 'vue-directive-image-previewer/dist/assets/style.css'

import '../static/css/flv.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import 'vant/lib/index.css';
// Vue.use(VueDirectiveImagePreviewer,{
//   zIndex:'99999',//图片放大层次最高
//   maxWidth:'100%',  maxHeight:'100%'
// }) 
import imageLazyLoad from './api/imageLazyLoad'
Vue.use(imageLazyLoad)

import ElementUI from 'element-ui'
import '@/custom-component' // 注册自定义组件
// import '@/assets/iconfont/iconfont.css'
// import '@/styles/animate.scss'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/styles/reset.css'
// import '@/styles/global.scss'
Vue.use(ElementUI, { size: 'small' })

// import ComponentWrapper from './components/item/ComponentWrapper'
// Vue.use('ComponentWrapper',ComponentWrapper)

import MyBox from './components/Box/Box'
import myInput from './components/input/myInput'
Vue.component("MyBox",MyBox)
Vue.component('MyInput', myInput)
import XMsgViewer from './components/item/XMsgViewer.vue'
Vue.component('XMsgViewer', XMsgViewer)
import PopInit from './components/item/PopInit.vue'
Vue.component('PopInit', PopInit)

Vue.use(api)
Vue.prototype.$md5 = md5
Vue.prototype.$axios = axios
Vue.prototype.$baseUrl = url.baseUrl
Vue.prototype.$img = url.photos
import common from '../static/js/common'
Vue.prototype.$uploadImg = common.uploadImg
import {
Uploader,Loading ,PullRefresh,Cell,CellGroup,Tabbar,Tag,
TabbarItem,NavBar,Icon,Panel,Collapse,CollapseItem,DropdownMenu,
DropdownItem,Row, Col ,Field , Button, 
Divider, Toast,Grid,GridItem,Image,Radio,RadioGroup,Tab,
Tabs,Card,ImagePreview,Popup,CountDown,
PasswordInput,NumberKeyboard,Dialog,
Sticky, Picker,Empty, Steps, Step,SubmitBar,
Stepper, AddressList,AddressEdit, List, Overlay,
IndexAnchor ,IndexBar,ActionSheet,SwipeCell, Swipe, SwipeItem, Sku,GoodsAction, GoodsActionIcon, GoodsActionButton
} from 'vant';

Vue.use(Button).use(Loading).use(PullRefresh).use(Uploader).use(Cell).use(CellGroup).use(Tag).use(Tabbar).use(TabbarItem).use(NavBar).use(Icon).use(Panel).use(Collapse).use(CollapseItem).use(DropdownMenu).use(DropdownItem).use(Row).use(Col).use(Field).use(Divider).use(Toast).use(Grid).use(GridItem).use(Image).use(Dialog).use(Radio).use(RadioGroup).use(Tab).use(Tabs).use(ImagePreview)
.use(Card).use(Popup ).use(CountDown).use(PasswordInput).use(NumberKeyboard)
.use(Sticky).use(Picker).use(Empty).use(Steps).use(Step).use(SubmitBar).use(Stepper)
.use(AddressList).use(AddressEdit).use(List).use(Overlay).use(IndexBar).use(IndexAnchor).use(ActionSheet)
.use(SwipeCell).use(Swipe).use(SwipeItem).use(Sku).use(GoodsAction).use(GoodsActionButton).use(GoodsActionIcon)

import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer)

window.Vue = Vue
var scriptEle = document.createElement('script')
scriptEle.src = 'static/kform/lib/k-form-design.umd.min.js'//'static/js/lib/k-form-design.umd.min.js'
scriptEle.onload = function() {
    console.log('k-form-design-js加载完了')
}
document.body.appendChild(scriptEle)
// // 预加载组件
// import "../packages/core/preUseComponents";
// // 懒加载组件
// // import "../packages/core/useComponents";
// // import { nodeSchema } from "../packages/mini";
// import {KFormDesign} from "../packages";
// import "../packages/core/useComponents";
// import { nodeSchema } from "../packages/mini";
// import KFormDesign from "../packages/use";

// const Cmp = {
//   label: "cmp",
//   render: function(h) {
//     return h("div", "我是自定义组件");
//   }
// };

// // 添加字段
// nodeSchema.addSchemas([
//   {
//     type: "demo", // 表单类型
//     label: "自定义组件", // 标题文字
//     icon: "icon-gallery",
//     component: Cmp,
//     options: {
//       defaultValue: undefined,
//       multiple: false,
//       disabled: false,
//       width: "100%",
//       clearable: true,
//       placeholder: "请选择",
//       showSearch: false,
//       showLabel: true
//     },
//     model: "",
//     key: "",
//     rules: [
//       {
//         required: false,
//         message: "必填项"
//       }
//     ]
//   }
// ]);

// // 添加分组
// nodeSchema.addSchemaGroup({
//   title: "自定义组件",
//   list: ["demo"]
// });

// Vue.use(KFormDesign);

// Vue.use(KFormDesign)
// import {KFormDesign,KFormBuild} from 'k-form-design/packages/use.js'
// import 'k-form-design/lib/k-form-design.css'
// // Vue.use(KFormBuild)
// // Vue.use(KFormDesign)
// import "../packages/core/preUseAntd";
// import "../packages/core/preUseComponents";
// import KFormDesign from "../packages/use";
// console.log('KFormDesign',KFormDesign)

// import { nodeSchema } from "../packages/mini";


// const Cmp = {
//   label: "cmp",
//   render: function(h) {
//     return h("div", "我是自定义组件");
//   }
// };

// // 添加字段
// nodeSchema.addSchemas([
//   {
//     type: "demo", // 表单类型
//     label: "自定义组件", // 标题文字
//     icon: "icon-gallery",
//     component: Cmp,
//     options: {
//       defaultValue: undefined,
//       multiple: false,
//       disabled: false,
//       width: "100%",
//       clearable: true,
//       placeholder: "请选择",
//       showSearch: false,
//       showLabel: true
//     },
//     model: "",
//     key: "",
//     rules: [
//       {
//         required: false,
//         message: "必填项"
//       }
//     ]
//   }
// ]);

// // 添加分组
// nodeSchema.addSchemaGroup({
//   title: "自定义组件",
//   list: ["demo"]
// });
Vue.config.productionTip = false

// Vue.config.errorHandler =  (err, vm, info) => {
//   let errMsg = 'Vue.config.errorHandler-getErrMsg:'+err.toString()+'\ninfo:'+info+' vm:'+vm
//   console.log('errMsg:'+errMsg,'vm',vm)
//   // alert(errMsg)
// }
window.onerror = function(message, source, lineno, colno, error) { 
  console.log('window.onerror:',message,lineno,colno,error)
  // alert('window-onError:'+message)
}
//实现了一个全局日志的变量，方便在客户端app上查看日志 on 2023-3-28
window.g_logs = []
console.log = (function (oriLogFunc) {
  return function () {
    let timeStr = "[" + new Date() + "]:"

    //发送给所有的客户端
    if(typeof g_devtools_rpc !='undefined' && g_devtools_rpc.client)
    {
      var cache = new Map()
      //[timeStr,...arguments]
      var str = JSON.stringify(arguments, function(key, value) {
          if (typeof value === 'object' && value !== null) {
              if (cache.has(value)) //cache.indexOf(value) !== -1) 
              {
                  // 移除
                  return;
              }
              // 收集所有的值
              //cache.push(value);
              cache.set(value,'')
          }
          return value;
      });
      try{
        g_devtools_rpc.client.peers().forEach(async function( peer){
          if(peer){
            let page_len = 100*1024
            let max_len = page_len*3
            if(str.length>page_len)
            {
              for(let i=0;i<str.length && i<max_len;i+=page_len)
              {
                while(peer._channel && peer._channel.bufferedAmount>10*1024*1024) await g_devtools_rpc.sleep(5)
                try{
                peer.send(str.substring(i,i+page_len))
                }catch(e){}
              }
              //如果太长，直接截断（没必要传输太长的log过去）
              if(str.length>max_len){
                while(peer._channel && peer._channel.bufferedAmount>10*1024*1024) await g_devtools_rpc.sleep(5)
                try{
                  peer.send('logstr max than '+max_len+', logstr.len is ('+str.length+')')
                }catch(e){}
              }
            }
            else{
                while(peer._channel && peer._channel.bufferedAmount>10*1024*1024) await g_devtools_rpc.sleep(5)
               try{
                peer.send(str)
                }catch(e){}
            }
            // peer.send(timeStr)
          }
        })
      }catch(ex){}
    }
    //判断是否收集日志。
    try{
    if(typeof g_logs_opened !='undefined')
    {
        //ErrorLog.write("[" + new Date() + "]:" + str)
        g_logs.push([timeStr,...arguments])
        let max_len =100
        if(g_logs.length>max_len)
        {
          window.g_logs =  g_logs.slice(max_len-g_logs.length,g_logs.length)
        }
        oriLogFunc.call(console, timeStr,...arguments);
    }else{
      oriLogFunc.call(console, timeStr,...arguments);
    }
    }catch(ex){
      oriLogFunc.call(console, timeStr,'log-exception:'+ex)
    }
  }
})(console.log);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
