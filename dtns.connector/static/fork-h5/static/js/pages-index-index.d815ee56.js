(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"2e02":function(e,n,t){"use strict";t.r(n);var a=t("d336"),i=t.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return a[e]}))}(o);n["default"]=i.a},"3c22":function(e,n,t){"use strict";var a=t("6146"),i=t.n(a);i.a},"3e4f":function(e,n,t){"use strict";t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return o})),t.d(n,"a",(function(){return a}));var a={uWaterfall:t("4731").default,uLine:t("15e8").default,uLoadmore:t("cc03").default,uBackTop:t("db9a").default},i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-uni-view",{staticClass:"wrap"},[t("u-waterfall",{ref:"uWaterfall",scopedSlots:e._u([{key:"left",fn:function(n){var a=n.leftList;return e._l(a,(function(n,a){return t("v-uni-view",{key:a,staticClass:"demo-warter",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.navToDetailPage(n)}}},[t("v-uni-view",{staticClass:"demo-img-wrap"},[t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.album_image,expression:"item.album_image"}],staticClass:"demo-image",staticStyle:{"min-height":"50px",width:"100%",height:"auto","max-height":"300px"},attrs:{mode:"widthFix"}})]),t("v-uni-view",{staticClass:"body"},[t("v-uni-view",{staticClass:"demo-title oneOver"},[e._v(e._s(n.album_name))]),t("v-uni-view",{staticClass:"dome_user"},[t("v-uni-view",{staticStyle:{position:"relative"}},[t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.forkUserInfo.logo,expression:"item.forkUserInfo.logo"}],staticStyle:{width:"26px",height:"26px","margin-right":"10px","border-radius":"50%"},attrs:{mode:"widthFix"}})]),t("v-uni-text",{staticStyle:{"font-size":"12px",color:"#999"}},[e._v(e._s(n.forkUserInfo.user_name))])],1),t("u-line",{attrs:{color:"#9e9e9e"}}),t("v-uni-view",{staticClass:"demo-desc threeOver"},[e._v(e._s(e._f("ToText")(n.album_introduction)))])],1)],1)}))}},{key:"right",fn:function(n){var a=n.rightList;return e._l(a,(function(n,a){return t("v-uni-view",{key:a,staticClass:"demo-warter",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.navToDetailPage(n)}}},[t("v-uni-view",{staticClass:"demo-img-wrap"},[t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.album_image,expression:"item.album_image"}],staticClass:"demo-image",staticStyle:{"min-height":"50px",width:"100%",height:"auto","max-height":"300px"},attrs:{mode:"widthFix"}})]),t("v-uni-view",{staticClass:"body"},[t("v-uni-view",{staticClass:"demo-title oneOver"},[e._v(e._s(n.album_name))]),t("v-uni-view",{staticClass:"dome_user"},[t("v-uni-view",{staticStyle:{position:"relative"}},[t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.forkUserInfo.logo,expression:"item.forkUserInfo.logo"}],staticStyle:{width:"26px",height:"26px","margin-right":"10px","border-radius":"50%"}})]),t("v-uni-text",{staticStyle:{"font-size":"12px",color:"#999"}},[e._v(e._s(n.forkUserInfo.user_name))])],1),t("u-line",{attrs:{color:"#9e9e9e"}}),t("v-uni-view",{staticClass:"demo-desc threeOver"},[e._v(e._s(e._f("ToText")(n.album_introduction)))])],1)],1)}))}}]),model:{value:e.flowList,callback:function(n){e.flowList=n},expression:"flowList"}}),t("u-loadmore",{attrs:{"bg-color":"rgb(240, 240, 240)",status:e.loadStatus},on:{loadmore:function(n){arguments[0]=n=e.$handleEvent(n),e.addRandomData.apply(void 0,arguments)}}}),t("u-back-top",{staticStyle:{height:"70rpx",width:"70rpx"},attrs:{"scroll-top":e.scrollTop,top:"1000","icon-style":{fontSize:"40rpx"}}})],1)},o=[]},"4d81":function(e,n,t){"use strict";t.r(n);var a=t("3e4f"),i=t("2e02");for(var o in i)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return i[e]}))}(o);t("3c22"),t("db2b");var r=t("f0c5"),s=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"367ef463",null,!1,a["a"],void 0);n["default"]=s.exports},"532d":function(e,n,t){var a=t("24fb");n=a(!1),n.push([e.i,'@charset "UTF-8";\n/* uni.scss */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */.demo-warter[data-v-367ef463]{border-radius:8px;margin:5px 3px;background-color:#fff;position:relative;overflow:hidden}.u-close[data-v-367ef463]{position:absolute;top:%?32?%;right:%?32?%}.demo-image[data-v-367ef463]{width:100%;border-radius:4px}.body[data-v-367ef463]{padding:10px}.demo-title[data-v-367ef463]{font-size:%?30?%;margin-top:5px;color:#303133;overflow:hidden}.oneOver[data-v-367ef463]{display:inline-block;overflow:hidden;text-overflow:ellipsis}.demo-desc[data-v-367ef463]{font-size:%?20?%;margin-top:5px;color:#999;overflow:hidden}.threeOver[data-v-367ef463]{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;text-overflow:ellipsis;overflow:hidden;white-space:pre-line}.dome_user[data-v-367ef463]{display:flex;justify-content:flex-start;align-items:center;margin-top:7px}.dome_price[data-v-367ef463]{margin-top:10px;display:flex;justify-content:space-between;align-items:center}.dome_price .left[data-v-367ef463]{color:#bb3835;font-size:19px;font-weight:550}.dome_price .right[data-v-367ef463]{display:flex;justify-content:space-between;align-items:center}.demo-tag[data-v-367ef463]{display:flex;margin-top:5px}.demo-tag-owner[data-v-367ef463]{background-color:#fa3534;color:#fff;display:flex;align-items:center;padding:%?4?% %?14?%;border-radius:%?50?%;font-size:%?20?%;line-height:1}.demo-tag-text[data-v-367ef463]{border:1px solid #2979ff;color:#2979ff;margin-left:10px;border-radius:%?50?%;line-height:1;padding:%?4?% %?14?%;display:flex;align-items:center;border-radius:%?50?%;font-size:%?20?%}.demo-price[data-v-367ef463]{font-size:%?30?%;color:#fa3534;margin-top:5px}.demo-shop[data-v-367ef463]{font-size:%?22?%;color:#909399;margin-top:5px}',""]),e.exports=n},6146:function(e,n,t){var a=t("d0b3");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=t("4f06").default;i("81d67878",a,!0,{sourceMap:!1,shadowMode:!1})},bdbd:function(e,n,t){var a=t("532d");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=t("4f06").default;i("62ac3aa4",a,!0,{sourceMap:!1,shadowMode:!1})},d0b3:function(e,n,t){var a=t("24fb");n=a(!1),n.push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* page不能写带scope的style标签中，否则无效 */uni-page-body[data-v-367ef463]{background-color:#f0f0f0}body.?%PAGE?%[data-v-367ef463]{background-color:#f0f0f0}",""]),e.exports=n},d336:function(e,n,t){"use strict";t("7a82");var a=t("4ea4").default;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(t("c7eb")),o=a(t("3835")),r=a(t("1da1"));t("ac1f"),t("5319"),t("d3b7"),t("99af"),t("e9c4"),t("14d9");var s={filters:{ToText:function(e){var n=e;return n.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,"").replace(/<[^>]+?>/g,"").replace(/\s+/g," ").replace(/ /g," ").replace(/>/g," ").replace(/(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]+/g,"")}},data:function(){return{loadStatus:"loadmore",flowList:[],group:0,scrollTop:0}},onPageScroll:function(e){this.scrollTop=e.scrollTop},onLoad:function(){this.loadData()},onReachBottom:function(){var e=this;this.loadStatus="loading",setTimeout((function(){e.loadData(),e.loadStatus="loadmore"}),1e3)},beforeDestroy:function(){console.log("into beforeDestroy()"),"function"==typeof clearImageLazyData&&clearImageLazyData()},methods:{loadData:function(){var e=this;return(0,r.default)((0,i.default)().mark((function n(){var t,a;return(0,i.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:t={begin:e.group,len:10};case 1:if(iWalletDb.db){n.next=6;break}return n.next=4,rpc_client.sleep(100);case 4:n.next=1;break;case 6:if(rpc_client.client){n.next=11;break}return n.next=9,rpc_client.sleep(200);case 9:n.next=6;break;case 11:!1,rpc_client.client.peers().length<1;case 13:if(!(rpc_client.client.peers().length<1)){n.next=18;break}return n.next=16,rpc_client.sleep(50);case 16:n.next=13;break;case 18:if(rpc_client.pingpong_flag){n.next=23;break}return n.next=21,rpc_client.sleep(50);case 21:n.next=18;break;case 23:return a=localStorage.getItem("fork-goto-id"),a&&a.length>6&&(localStorage.removeItem("fork-goto-id"),setTimeout((function(){return uni.navigateTo({url:"/pages/list/forkDetails?id=".concat(a)})}),500)),n.next=27,new Promise((function(n,a){uni.request({url:e.$baseUrl+"/obj/album/queryAllAlbumH5",method:"GET",data:t}).then((function(n){var t=(0,o.default)(n,2),a=t[0],i=t[1];return a?console.log(a.errMsg):200!==i.statusCode?console.log(i.data.msg):(e.group++,void(e.flowList=e.flowList.concat(i.data.list)))}))}));case 27:return n.abrupt("return",n.sent);case 28:case"end":return n.stop()}}),n)})))()},navToDetailPage:function(e){var n=e.obj_id;uni.navigateTo({url:"/pages/list/listDetails?id=".concat(n)})},addRandomData:function(){for(var e=0;e<10;e++){var n=this.$u.random(0,this.list.length-1),t=JSON.parse(JSON.stringify(this.list[n]));t.id=this.$u.guid(),this.flowList.push(t)}},remove:function(e){this.$refs.uWaterfall.remove(e)},clear:function(){this.$refs.uWaterfall.clear()}}};n.default=s},db2b:function(e,n,t){"use strict";var a=t("bdbd"),i=t.n(a);i.a}}]);