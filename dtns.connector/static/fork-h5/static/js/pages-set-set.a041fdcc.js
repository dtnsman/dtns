(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-set-set"],{"593b":function(t,a,e){"use strict";e.d(a,"b",(function(){return i})),e.d(a,"c",(function(){return l})),e.d(a,"a",(function(){}));var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"container"},[e("v-uni-view",{staticClass:"list-cell b-b m-t",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.navTo("/pages/user/info")}}},[e("v-uni-text",{staticClass:"cell-tit"},[t._v("个人资料")]),e("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),e("v-uni-view",{staticClass:"list-cell",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.navTo("实名认证")}}},[e("v-uni-text",{staticClass:"cell-tit"},[t._v("实名认证")]),e("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),e("v-uni-view",{staticClass:"list-cell m-t b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.navTo("清除缓存")}}},[e("v-uni-text",{staticClass:"cell-tit"},[t._v("清除缓存")]),e("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),e("v-uni-view",{staticClass:"list-cell b-b",attrs:{"hover-class":"cell-hover","hover-stay-time":50},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.navTo("关于Dcloud")}}},[e("v-uni-text",{staticClass:"cell-tit"},[t._v("关于NFTList")]),e("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),e("v-uni-view",{staticClass:"list-cell"},[e("v-uni-text",{staticClass:"cell-tit"},[t._v("检查更新")]),e("v-uni-text",{staticClass:"cell-tip"},[t._v("当前版本 1.0.0")]),e("v-uni-text",{staticClass:"cell-more yticon icon-you"})],1),e("v-uni-view",{staticClass:"list-cell log-out-btn",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.toLogout.apply(void 0,arguments)}}},[e("v-uni-text",{staticClass:"cell-tit"},[t._v("退出登录")])],1)],1)},l=[]},"5f3b":function(t,a,e){"use strict";e.r(a);var i=e("593b"),l=e("a5e0");for(var n in l)["default"].indexOf(n)<0&&function(t){e.d(a,t,(function(){return l[t]}))}(n);e("fb0f");var c=e("f0c5"),s=Object(c["a"])(l["default"],i["b"],i["c"],!1,null,"fb86a9ca",null,!1,i["a"],void 0);a["default"]=s.exports},"66aa":function(t,a,e){"use strict";e("7a82");var i=e("4ea4").default;Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=i(e("5530")),n=e("26cb"),c={data:function(){return{}},computed:(0,l.default)({},(0,n.mapState)(["hasLogin","userInfo"])),methods:(0,l.default)((0,l.default)({},(0,n.mapMutations)(["logout"])),{},{navTo:function(t){this.hasLogin||(t="/pages/public/connect"),uni.navigateTo({url:t})},toLogout:function(){var t=this;uni.showModal({content:"确定要退出登录么",success:function(a){a.confirm&&(t.logout(),setTimeout((function(){uni.reLaunch({url:"/pages/public/connect"})}),200))}})},switchChange:function(t){var a=t.detail.value?"打开":"关闭";this.$api.msg("".concat(a,"消息推送"))}})};a.default=c},a5e0:function(t,a,e){"use strict";e.r(a);var i=e("66aa"),l=e.n(i);for(var n in i)["default"].indexOf(n)<0&&function(t){e.d(a,t,(function(){return i[t]}))}(n);a["default"]=l.a},b2d0:function(t,a,e){var i=e("d0a5");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var l=e("4f06").default;l("02773bab",i,!0,{sourceMap:!1,shadowMode:!1})},d0a5:function(t,a,e){var i=e("24fb");a=i(!1),a.push([t.i,'@charset "UTF-8";\n/* uni.scss */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-fb86a9ca]{background:#f8f8f8}body.?%PAGE?%[data-v-fb86a9ca]{background:#f8f8f8}.list-cell[data-v-fb86a9ca]{display:flex;align-items:baseline;padding:%?20?% %?30?%;line-height:%?60?%;position:relative;background:#fff;justify-content:center}.list-cell.log-out-btn[data-v-fb86a9ca]{margin-top:%?40?%}.list-cell.log-out-btn .cell-tit[data-v-fb86a9ca]{color:#fa436a;text-align:center;margin-right:0}.list-cell.cell-hover[data-v-fb86a9ca]{background:#fafafa}.list-cell.b-b[data-v-fb86a9ca]:after{left:%?30?%}.list-cell.m-t[data-v-fb86a9ca]{margin-top:%?16?%}.list-cell .cell-more[data-v-fb86a9ca]{align-self:baseline;font-size:%?32?%;color:#909399;margin-left:%?10?%}.list-cell .cell-tit[data-v-fb86a9ca]{flex:1;font-size:%?30?%;color:#303133;margin-right:%?10?%}.list-cell .cell-tip[data-v-fb86a9ca]{font-size:%?28?%;color:#909399}.list-cell uni-switch[data-v-fb86a9ca]{-webkit-transform:translateX(%?16?%) scale(.84);transform:translateX(%?16?%) scale(.84)}',""]),t.exports=a},fb0f:function(t,a,e){"use strict";var i=e("b2d0"),l=e.n(i);l.a}}]);