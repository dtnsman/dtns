(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-list-list"],{"2e60":function(t,a,e){"use strict";e.r(a);var i=e("459d"),n=e("3596");for(var o in n)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return n[t]}))}(o);e("83ec");var d=e("f0c5"),s=Object(d["a"])(n["default"],i["b"],i["c"],!1,null,"fadd47d8",null,!1,i["a"],void 0);a["default"]=s.exports},"2f6f":function(t,a,e){"use strict";var i=e("b827"),n=e.n(i);n.a},3569:function(t,a,e){"use strict";e("7a82"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i={name:"uni-load-more",props:{status:{type:String,default:"more"},showIcon:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{}}};a.default=i},3596:function(t,a,e){"use strict";e.r(a);var i=e("68b3"),n=e.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return i[t]}))}(o);a["default"]=n.a},3685:function(t,a,e){"use strict";e.d(a,"b",(function(){return i})),e.d(a,"c",(function(){return n})),e.d(a,"a",(function(){}));var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"uni-load-more"},[e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:"loading"===t.status&&t.showIcon,expression:"status === 'loading' && showIcon"}],staticClass:"uni-load-more__img"},[e("v-uni-view",{staticClass:"load1"},[e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}})],1),e("v-uni-view",{staticClass:"load2"},[e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}})],1),e("v-uni-view",{staticClass:"load3"},[e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}})],1)],1),e("v-uni-text",{staticClass:"uni-load-more__text",style:{color:t.color}},[t._v(t._s("more"===t.status?t.contentText.contentdown:"loading"===t.status?t.contentText.contentrefresh:t.contentText.contentnomore))])],1)},n=[]},"414c":function(t,a,e){var i=e("e725");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=e("4f06").default;n("6d4bc1f7",i,!0,{sourceMap:!1,shadowMode:!1})},"459d":function(t,a,e){"use strict";e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return o})),e.d(a,"a",(function(){return i}));var i={uniLoadMore:e("9c7f").default},n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"navbar",style:{position:t.headerPosition,top:t.headerTop}},[e("v-uni-view",{staticClass:"nav-item",class:{current:0===t.filterIndex},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.tabClick(0)}}},[t._v("综合排序")]),e("v-uni-view",{staticClass:"nav-item",class:{current:1===t.filterIndex},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.tabClick(1)}}},[t._v("销量优先")]),e("v-uni-view",{staticClass:"nav-item",class:{current:2===t.filterIndex},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.tabClick(2)}}},[e("v-uni-text",[t._v("价格")]),e("v-uni-view",{staticClass:"p-box"},[e("v-uni-text",{staticClass:"yticon icon-shang",class:{active:1===t.priceOrder&&2===t.filterIndex}}),e("v-uni-text",{staticClass:"yticon icon-shang xia",class:{active:2===t.priceOrder&&2===t.filterIndex}})],1)],1),e("v-uni-text",{staticClass:"cate-item yticon icon-fenlei1",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.toggleCateMask("show")}}})],1),e("v-uni-view",{staticClass:"goods-list"},t._l(t.goodsList,(function(a,i){return e("v-uni-view",{key:i,staticClass:"goods-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navToDetailPage(a)}}},[e("v-uni-view",{staticClass:"image-wrapper"},[e("v-uni-image",{attrs:{src:a.image,mode:"aspectFill"}})],1),e("v-uni-text",{staticClass:"title clamp"},[t._v(t._s(a.title))]),e("v-uni-view",{staticClass:"price-box"},[e("v-uni-text",{staticClass:"price"},[t._v(t._s(a.price))]),e("v-uni-text",[t._v("已售 "+t._s(a.sales))])],1)],1)})),1),e("uni-load-more",{attrs:{status:t.loadingType}}),e("v-uni-view",{staticClass:"cate-mask",class:0===t.cateMaskState?"none":1===t.cateMaskState?"show":"",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.toggleCateMask.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"cate-content",on:{click:function(a){a.stopPropagation(),a.preventDefault(),arguments[0]=a=t.$handleEvent(a),t.stopPrevent.apply(void 0,arguments)},touchmove:function(a){a.stopPropagation(),a.preventDefault(),arguments[0]=a=t.$handleEvent(a),t.stopPrevent.apply(void 0,arguments)}}},[e("v-uni-scroll-view",{staticClass:"cate-list",attrs:{"scroll-y":!0}},t._l(t.cateList,(function(a){return e("v-uni-view",{key:a.id},[e("v-uni-view",{staticClass:"cate-item b-b two"},[t._v(t._s(a.name))]),t._l(a.child,(function(a){return e("v-uni-view",{key:a.id,staticClass:"cate-item b-b",class:{active:a.id==t.cateId},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeCate(a)}}},[t._v(t._s(a.name))])}))],2)})),1)],1)],1)],1)},o=[]},"4ce2":function(t,a,e){var i=e("24fb");a=i(!1),a.push([t.i,".uni-load-more[data-v-76b7c960]{display:flex;flex-direction:row;height:%?80?%;align-items:center;justify-content:center}.uni-load-more__text[data-v-76b7c960]{font-size:%?28?%;color:#999}.uni-load-more__img[data-v-76b7c960]{height:24px;width:24px;margin-right:10px}.uni-load-more__img>uni-view[data-v-76b7c960]{position:absolute}.uni-load-more__img>uni-view uni-view[data-v-76b7c960]{width:6px;height:2px;border-top-left-radius:1px;border-bottom-left-radius:1px;background:#999;position:absolute;opacity:.2;-webkit-transform-origin:50%;transform-origin:50%;-webkit-animation:load-data-v-76b7c960 1.56s ease infinite;animation:load-data-v-76b7c960 1.56s ease infinite}.uni-load-more__img>uni-view uni-view[data-v-76b7c960]:nth-child(1){-webkit-transform:rotate(90deg);transform:rotate(90deg);top:2px;left:9px}.uni-load-more__img>uni-view uni-view[data-v-76b7c960]:nth-child(2){-webkit-transform:rotate(180deg);transform:rotate(180deg);top:11px;right:0}.uni-load-more__img>uni-view uni-view[data-v-76b7c960]:nth-child(3){-webkit-transform:rotate(270deg);transform:rotate(270deg);bottom:2px;left:9px}.uni-load-more__img>uni-view uni-view[data-v-76b7c960]:nth-child(4){top:11px;left:0}.load1[data-v-76b7c960],\n.load2[data-v-76b7c960],\n.load3[data-v-76b7c960]{height:24px;width:24px}.load2[data-v-76b7c960]{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.load3[data-v-76b7c960]{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.load1 uni-view[data-v-76b7c960]:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s}.load2 uni-view[data-v-76b7c960]:nth-child(1){-webkit-animation-delay:.13s;animation-delay:.13s}.load3 uni-view[data-v-76b7c960]:nth-child(1){-webkit-animation-delay:.26s;animation-delay:.26s}.load1 uni-view[data-v-76b7c960]:nth-child(2){-webkit-animation-delay:.39s;animation-delay:.39s}.load2 uni-view[data-v-76b7c960]:nth-child(2){-webkit-animation-delay:.52s;animation-delay:.52s}.load3 uni-view[data-v-76b7c960]:nth-child(2){-webkit-animation-delay:.65s;animation-delay:.65s}.load1 uni-view[data-v-76b7c960]:nth-child(3){-webkit-animation-delay:.78s;animation-delay:.78s}.load2 uni-view[data-v-76b7c960]:nth-child(3){-webkit-animation-delay:.91s;animation-delay:.91s}.load3 uni-view[data-v-76b7c960]:nth-child(3){-webkit-animation-delay:1.04s;animation-delay:1.04s}.load1 uni-view[data-v-76b7c960]:nth-child(4){-webkit-animation-delay:1.17s;animation-delay:1.17s}.load2 uni-view[data-v-76b7c960]:nth-child(4){-webkit-animation-delay:1.3s;animation-delay:1.3s}.load3 uni-view[data-v-76b7c960]:nth-child(4){-webkit-animation-delay:1.43s;animation-delay:1.43s}@-webkit-keyframes load-data-v-76b7c960{0%{opacity:1}100%{opacity:.2}}",""]),t.exports=a},6192:function(t,a,e){"use strict";e.r(a);var i=e("3569"),n=e.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return i[t]}))}(o);a["default"]=n.a},"68b3":function(t,a,e){"use strict";e("7a82");var i=e("4ea4").default;Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,e("4de4"),e("d3b7"),e("159b"),e("4e82"),e("99af");var n=i(e("c7eb")),o=i(e("1da1")),d=i(e("9c7f")),s={components:{uniLoadMore:d.default},data:function(){return{cateMaskState:0,headerPosition:"fixed",headerTop:"0px",loadingType:"more",filterIndex:0,cateId:0,priceOrder:0,cateList:[],goodsList:[]}},onLoad:function(t){this.headerTop=document.getElementsByTagName("uni-page-head")[0].offsetHeight+"px",this.cateId=t.tid,this.loadCateList(t.fid,t.sid),this.loadData()},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},onPullDownRefresh:function(){this.loadData("refresh")},onReachBottom:function(){this.loadData()},methods:{loadCateList:function(t,a){var e=this;return(0,o.default)((0,n.default)().mark((function a(){var i,o;return(0,n.default)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.$api.json("cateList");case 2:i=a.sent,o=i.filter((function(a){return a.pid==t})),o.forEach((function(t){var a=i.filter((function(a){return a.pid==t.id}));t.child=a})),e.cateList=o;case 6:case"end":return a.stop()}}),a)})))()},loadData:function(){var t=arguments,a=this;return(0,o.default)((0,n.default)().mark((function e(){var i,o,d;return(0,n.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(i=t.length>0&&void 0!==t[0]?t[0]:"add",o=t.length>1?t[1]:void 0,"add"!==i){e.next=8;break}if("nomore"!==a.loadingType){e.next=5;break}return e.abrupt("return");case 5:a.loadingType="loading",e.next=9;break;case 8:a.loadingType="more";case 9:return e.next=11,a.$api.json("goodsList");case 11:d=e.sent,"refresh"===i&&(a.goodsList=[]),1===a.filterIndex&&d.sort((function(t,a){return a.sales-t.sales})),2===a.filterIndex&&d.sort((function(t,e){return 1==a.priceOrder?t.price-e.price:e.price-t.price})),a.goodsList=a.goodsList.concat(d),a.loadingType=a.goodsList.length>20?"nomore":"more","refresh"===i&&(1==o?uni.hideLoading():uni.stopPullDownRefresh());case 18:case"end":return e.stop()}}),e)})))()},tabClick:function(t){this.filterIndex===t&&2!==t||(this.filterIndex=t,this.priceOrder=2===t?1===this.priceOrder?2:1:0,uni.pageScrollTo({duration:300,scrollTop:0}),this.loadData("refresh",1),uni.showLoading({title:"正在加载"}))},toggleCateMask:function(t){var a=this,e="show"===t?10:300,i="show"===t?1:0;this.cateMaskState=2,setTimeout((function(){a.cateMaskState=i}),e)},changeCate:function(t){this.cateId=t.id,this.toggleCateMask(),uni.pageScrollTo({duration:300,scrollTop:0}),this.loadData("refresh",1),uni.showLoading({title:"正在加载"})},navToDetailPage:function(t){var a=t.title;uni.navigateTo({url:"/pages/list/listDetails?id=".concat(a)})},stopPrevent:function(){}}};a.default=s},"83ec":function(t,a,e){"use strict";var i=e("414c"),n=e.n(i);n.a},"9c7f":function(t,a,e){"use strict";e.r(a);var i=e("3685"),n=e("6192");for(var o in n)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return n[t]}))}(o);e("2f6f");var d=e("f0c5"),s=Object(d["a"])(n["default"],i["b"],i["c"],!1,null,"76b7c960",null,!1,i["a"],void 0);a["default"]=s.exports},b827:function(t,a,e){var i=e("4ce2");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=e("4f06").default;n("142b599e",i,!0,{sourceMap:!1,shadowMode:!1})},e725:function(t,a,e){var i=e("24fb");a=i(!1),a.push([t.i,'@charset "UTF-8";\n/* uni.scss */\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-fadd47d8], .content[data-v-fadd47d8]{background:#f8f8f8}body.?%PAGE?%[data-v-fadd47d8]{background:#f8f8f8}.content[data-v-fadd47d8]{padding-top:%?96?%}.navbar[data-v-fadd47d8]{position:fixed;left:0;top:var(--window-top);display:flex;width:100%;height:%?80?%;background:#fff;box-shadow:0 %?2?% %?10?% rgba(0,0,0,.06);z-index:10}.navbar .nav-item[data-v-fadd47d8]{flex:1;display:flex;justify-content:center;align-items:center;height:100%;font-size:%?30?%;color:#303133;position:relative}.navbar .nav-item.current[data-v-fadd47d8]{color:#fa436a}.navbar .nav-item.current[data-v-fadd47d8]:after{content:"";position:absolute;left:50%;bottom:0;-webkit-transform:translateX(-50%);transform:translateX(-50%);width:%?120?%;height:0;border-bottom:%?4?% solid #fa436a}.navbar .p-box[data-v-fadd47d8]{display:flex;flex-direction:column}.navbar .p-box .yticon[data-v-fadd47d8]{display:flex;align-items:center;justify-content:center;width:%?30?%;height:%?14?%;line-height:1;margin-left:%?4?%;font-size:%?26?%;color:#888}.navbar .p-box .yticon.active[data-v-fadd47d8]{color:#fa436a}.navbar .p-box .xia[data-v-fadd47d8]{-webkit-transform:scaleY(-1);transform:scaleY(-1)}.navbar .cate-item[data-v-fadd47d8]{display:flex;justify-content:center;align-items:center;height:100%;width:%?80?%;position:relative;font-size:%?44?%}.navbar .cate-item[data-v-fadd47d8]:after{content:"";position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);border-left:1px solid #ddd;width:0;height:%?36?%}\n/* 分类 */.cate-mask[data-v-fadd47d8]{position:fixed;left:0;top:var(--window-top);bottom:0;width:100%;background:transparent;z-index:95;transition:.3s}.cate-mask .cate-content[data-v-fadd47d8]{width:%?630?%;height:100%;background:#fff;float:right;-webkit-transform:translateX(100%);transform:translateX(100%);transition:.3s}.cate-mask.none[data-v-fadd47d8]{display:none}.cate-mask.show[data-v-fadd47d8]{background:rgba(0,0,0,.4)}.cate-mask.show .cate-content[data-v-fadd47d8]{-webkit-transform:translateX(0);transform:translateX(0)}.cate-list[data-v-fadd47d8]{display:flex;flex-direction:column;height:100%}.cate-list .cate-item[data-v-fadd47d8]{display:flex;align-items:center;height:%?90?%;padding-left:%?30?%;font-size:%?28?%;color:#555;position:relative}.cate-list .two[data-v-fadd47d8]{height:%?64?%;color:#303133;font-size:%?30?%;background:#f8f8f8}.cate-list .active[data-v-fadd47d8]{color:#fa436a}\n/* 商品列表 */.goods-list[data-v-fadd47d8]{display:flex;flex-wrap:wrap;padding:0 %?30?%;background:#fff}.goods-list .goods-item[data-v-fadd47d8]{display:flex;flex-direction:column;width:48%;padding-bottom:%?40?%}.goods-list .goods-item[data-v-fadd47d8]:nth-child(2n+1){margin-right:4%}.goods-list .image-wrapper[data-v-fadd47d8]{width:100%;height:%?330?%;border-radius:3px;overflow:hidden}.goods-list .image-wrapper uni-image[data-v-fadd47d8]{width:100%;height:100%;opacity:1}.goods-list .title[data-v-fadd47d8]{font-size:%?32?%;color:#303133;line-height:%?80?%}.goods-list .price-box[data-v-fadd47d8]{display:flex;align-items:center;justify-content:space-between;padding-right:%?10?%;font-size:%?24?%;color:#909399}.goods-list .price[data-v-fadd47d8]{font-size:%?32?%;color:#fa436a;line-height:1}.goods-list .price[data-v-fadd47d8]:before{content:"￥";font-size:%?26?%}',""]),t.exports=a}}]);