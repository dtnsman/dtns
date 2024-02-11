// 导入样式
// import "../styles/form-design.less";
// // 导入antD样式
// import "./core/antdStyle";

// 导出本地iconfont
// import "../static/icons/iconfont";
// import { pluginManager, nodeSchema } from "./utils/index";
// 导入ant组件
// import "./core/useComponents";

// 导入单个组件
// import TestPage from "./pages/test/index";
import MsgBottle from "./pages/msgbottle/index";
const components = [MsgBottle]
// import FintechSdk from "./pages/fintechsdk/FintechSdk.vue";
// const components = [FintechSdk]// [MsgBottle,TestPage];
// import RtCode from "./pages/rtcode/RtCode.vue";
// const components = [RtCode]// [MsgBottle,TestPage];
// import RtShopping from "./pages/rtshopping/RtShopping.vue";
// const components = [RtShopping]// [MsgBottle,TestPage];
// import RtChess from "./pages/rtchess/RtChess.vue";
// const components = [RtChess]
// import RtChess from "./pages/rtchess2/RtChess.vue";
// const components = [RtChess]
// import RtAudioRoom from "./pages/rtaudioroom/RtAudioRoom.vue";
// const components = [RtAudioRoom]
// import RtVideoRoom from "./pages/rtvideoroom/RtVideoRoom.vue";
// const components = [RtVideoRoom]


const install = function(Vue) {
  // use ant组件
  // if (install.installed) return;
  // install.installed = true;
  //如重名，覆盖之
  console.log('into install:')
  components.map(component => {
    console.log('load-component:',component.name,component)
    Vue.component(component.name, component);
  });
  console.log('end install')
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install
};

export {
  install
};
