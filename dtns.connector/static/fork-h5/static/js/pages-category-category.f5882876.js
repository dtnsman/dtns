(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-category-category"],{"0dc9":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* uni.scss */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-74897de1],\n.content[data-v-74897de1]{height:100%;background-color:#f8f8f8}body.?%PAGE?%[data-v-74897de1]{background-color:#f8f8f8}.content[data-v-74897de1]{display:flex}.left-aside[data-v-74897de1]{flex-shrink:0;width:%?200?%;height:100%;background-color:#fff}.f-item[data-v-74897de1]{display:flex;align-items:center;justify-content:center;width:100%;height:%?100?%;font-size:%?28?%;color:#606266;position:relative}.f-item.active[data-v-74897de1]{color:#fa436a;background:#f8f8f8}.f-item.active[data-v-74897de1]:before{content:"";position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);height:%?36?%;width:%?8?%;background-color:#fa436a;border-radius:0 4px 4px 0;opacity:.8}.right-aside[data-v-74897de1]{flex:1;overflow:hidden;padding-left:%?20?%}.s-item[data-v-74897de1]{display:flex;align-items:center;height:%?70?%;padding-top:%?8?%;font-size:%?28?%;color:#303133}.t-list[data-v-74897de1]{display:flex;flex-wrap:wrap;width:100%;background:#fff;padding-top:%?12?%}.t-list[data-v-74897de1]:after{content:"";flex:99;height:0}.t-item[data-v-74897de1]{flex-shrink:0;display:flex;justify-content:center;align-items:center;flex-direction:column;width:%?176?%;font-size:%?26?%;color:#666;padding-bottom:%?20?%}.t-item uni-image[data-v-74897de1]{width:%?140?%;height:%?140?%}',""]),t.exports=e},"18f3":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-scroll-view",{staticClass:"left-aside",attrs:{"scroll-y":!0}},t._l(t.flist,(function(e){return i("v-uni-view",{key:e.id,staticClass:"f-item b-b",class:{active:e.id===t.currentId},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.tabtap(e)}}},[t._v(t._s(e.name))])})),1),i("v-uni-scroll-view",{staticClass:"right-aside",attrs:{"scroll-with-animation":!0,"scroll-y":!0,"scroll-top":t.tabScrollTop},on:{scroll:function(e){arguments[0]=e=t.$handleEvent(e),t.asideScroll.apply(void 0,arguments)}}},t._l(t.slist,(function(e){return i("v-uni-view",{key:e.id,staticClass:"s-list",attrs:{id:"main-"+e.id}},[i("v-uni-text",{staticClass:"s-item"},[t._v(t._s(e.name))]),i("v-uni-view",{staticClass:"t-list"},t._l(t.tlist,(function(a){return a.pid===e.id?i("v-uni-view",{key:a.id,staticClass:"t-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.navToList(e.id,a.id)}}},[i("v-uni-image",{attrs:{src:a.picture}}),i("v-uni-text",[t._v(t._s(a.name))])],1):t._e()})),1)],1)})),1)],1)},n=[]},"260a":function(t,e,i){"use strict";i.r(e);var a=i("b862"),n=i.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},7980:function(t,e,i){"use strict";var a=i("c168"),n=i.n(a);n.a},b862:function(t,e,i){"use strict";i("7a82");var a=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("d3b7"),i("159b"),i("14d9"),i("c740"),i("26e9"),i("4de4"),i("ac1f"),i("99af");var n=a(i("c7eb")),s=a(i("1da1")),c={data:function(){return{sizeCalcState:!1,tabScrollTop:0,currentId:1,flist:[],slist:[],tlist:[]}},onLoad:function(){this.loadData()},methods:{loadData:function(){var t=this;return(0,s.default)((0,n.default)().mark((function e(){var i;return(0,n.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.json("cateList");case 2:i=e.sent,i.forEach((function(e){e.pid?e.picture?t.tlist.push(e):t.slist.push(e):t.flist.push(e)}));case 4:case"end":return e.stop()}}),e)})))()},tabtap:function(t){this.sizeCalcState||this.calcSize(),this.currentId=t.id;var e=this.slist.findIndex((function(e){return e.pid===t.id}));this.tabScrollTop=this.slist[e].top},asideScroll:function(t){this.sizeCalcState||this.calcSize();var e=t.detail.scrollTop,i=this.slist.filter((function(t){return t.top<=e})).reverse();i.length>0&&(this.currentId=i[0].pid)},calcSize:function(){var t=0;this.slist.forEach((function(e){var i=uni.createSelectorQuery().select("#main-"+e.id);i.fields({size:!0},(function(i){e.top=t,t+=i.height,e.bottom=t})).exec()})),this.sizeCalcState=!0},navToList:function(t,e){uni.navigateTo({url:"/pages/product/list?fid=".concat(this.currentId,"&sid=").concat(t,"&tid=").concat(e)})}}};e.default=c},c168:function(t,e,i){var a=i("0dc9");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("3247b6b2",a,!0,{sourceMap:!1,shadowMode:!1})},eb06:function(t,e,i){"use strict";i.r(e);var a=i("18f3"),n=i("260a");for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("7980");var c=i("f0c5"),o=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,"74897de1",null,!1,a["a"],void 0);e["default"]=o.exports}}]);