(function(t,e){"object"===typeof exports&&"object"===typeof module?module.exports=e():"function"===typeof define&&define.amd?define([],e):"object"===typeof exports?exports["dtns-plugin"]=e():t["dtns-plugin"]=e()})("undefined"!==typeof self?self:this,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="fb15")}({"230e":function(t,e,n){var r=n("d3f4"),o=n("7726").document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},"6a99":function(t,e,n){var r=n("d3f4");t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},7726:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},"79e5":function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},"7f7f":function(t,e,n){var r=n("86cc").f,o=Function.prototype,i=/^\s*function ([^ (]*)/,c="name";c in o||n("9e1e")&&r(o,c,{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(t){return""}}})},"86cc":function(t,e,n){var r=n("cb7c"),o=n("c69a"),i=n("6a99"),c=Object.defineProperty;e.f=n("9e1e")?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return c(t,e,n)}catch(u){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},8875:function(t,e,n){var r,o,i;(function(n,c){o=[],r=c,i="function"===typeof r?r.apply(e,o):r,void 0===i||(t.exports=i)})("undefined"!==typeof self&&self,(function(){function t(){var e=Object.getOwnPropertyDescriptor(document,"currentScript");if(!e&&"currentScript"in document&&document.currentScript)return document.currentScript;if(e&&e.get!==t&&document.currentScript)return document.currentScript;try{throw new Error}catch(h){var n,r,o,i=/.*at [^(]*\((.*):(.+):(.+)\)$/gi,c=/@([^@]*):(\d+):(\d+)\s*$/gi,u=i.exec(h.stack)||c.exec(h.stack),a=u&&u[1]||!1,f=u&&u[2]||!1,s=document.location.href.replace(document.location.hash,""),l=document.getElementsByTagName("script");a===s&&(n=document.documentElement.outerHTML,r=new RegExp("(?:[^\\n]+?\\n){0,"+(f-2)+"}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*","i"),o=n.replace(r,"$1").trim());for(var p=0;p<l.length;p++){if("interactive"===l[p].readyState)return l[p];if(l[p].src===a)return l[p];if(a===s&&l[p].innerHTML&&l[p].innerHTML.trim()===o)return l[p]}return null}}return t}))},"96cf":function(t,e){!function(e){"use strict";var n,r=Object.prototype,o=r.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},c=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",a=i.toStringTag||"@@toStringTag",f="object"===typeof t,s=e.regeneratorRuntime;if(s)f&&(t.exports=s);else{s=e.regeneratorRuntime=f?t.exports:{},s.wrap=b;var l="suspendedStart",p="suspendedYield",h="executing",d="completed",y={},v={};v[c]=function(){return this};var m=Object.getPrototypeOf,g=m&&m(m(N([])));g&&g!==r&&o.call(g,c)&&(v=g);var w=j.prototype=_.prototype=Object.create(v);E.prototype=w.constructor=j,j.constructor=E,j[a]=E.displayName="GeneratorFunction",s.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===E||"GeneratorFunction"===(e.displayName||e.name))},s.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,j):(t.__proto__=j,a in t||(t[a]="GeneratorFunction")),t.prototype=Object.create(w),t},s.awrap=function(t){return{__await:t}},L(O.prototype),O.prototype[u]=function(){return this},s.AsyncIterator=O,s.async=function(t,e,n,r){var o=new O(b(t,e,n,r));return s.isGeneratorFunction(e)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},L(w),w[a]="Generator",w[c]=function(){return this},w.toString=function(){return"[object Generator]"},s.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},s.values=N,M.prototype={constructor:M,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,o){return u.type="throw",u.arg=t,e.next=r,o&&(e.method="next",e.arg=n),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var c=this.tryEntries[i],u=c.completion;if("root"===c.tryLoc)return r("end");if(c.tryLoc<=this.prev){var a=o.call(c,"catchLoc"),f=o.call(c,"finallyLoc");if(a&&f){if(this.prev<c.catchLoc)return r(c.catchLoc,!0);if(this.prev<c.finallyLoc)return r(c.finallyLoc)}else if(a){if(this.prev<c.catchLoc)return r(c.catchLoc,!0)}else{if(!f)throw new Error("try statement without catch or finally");if(this.prev<c.finallyLoc)return r(c.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var c=i?i.completion:{};return c.type=t,c.arg=e,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),k(n),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;k(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:N(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),y}}}function b(t,e,n,r){var o=e&&e.prototype instanceof _?e:_,i=Object.create(o.prototype),c=new M(r||[]);return i._invoke=S(t,n,c),i}function x(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}function _(){}function E(){}function j(){}function L(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function O(t){function e(n,r,i,c){var u=x(t[n],t,r);if("throw"!==u.type){var a=u.arg,f=a.value;return f&&"object"===typeof f&&o.call(f,"__await")?Promise.resolve(f.__await).then((function(t){e("next",t,i,c)}),(function(t){e("throw",t,i,c)})):Promise.resolve(f).then((function(t){a.value=t,i(a)}),c)}c(u.arg)}var n;function r(t,r){function o(){return new Promise((function(n,o){e(t,r,n,o)}))}return n=n?n.then(o,o):o()}this._invoke=r}function S(t,e,n){var r=l;return function(o,i){if(r===h)throw new Error("Generator is already running");if(r===d){if("throw"===o)throw i;return $()}n.method=o,n.arg=i;while(1){var c=n.delegate;if(c){var u=P(c,n);if(u){if(u===y)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=d,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=h;var a=x(t,e,n);if("normal"===a.type){if(r=n.done?d:p,a.arg===y)continue;return{value:a.arg,done:n.done}}"throw"===a.type&&(r=d,n.method="throw",n.arg=a.arg)}}}function P(t,e){var r=t.iterator[e.method];if(r===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=n,P(t,e),"throw"===e.method))return y;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var o=x(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,y;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,y):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,y)}function T(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function M(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function N(t){if(t){var e=t[c];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var r=-1,i=function e(){while(++r<t.length)if(o.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=n,e.done=!0,e};return i.next=i}}return{next:$}}function $(){return{value:n,done:!0}}}(function(){return this}()||Function("return this")())},"9e1e":function(t,e,n){t.exports=!n("79e5")((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},c69a:function(t,e,n){t.exports=!n("9e1e")&&!n("79e5")((function(){return 7!=Object.defineProperty(n("230e")("div"),"a",{get:function(){return 7}}).a}))},cb7c:function(t,e,n){var r=n("d3f4");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},d3f4:function(t,e){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},fb15:function(t,e,n){"use strict";if(n.r(e),n.d(e,"install",(function(){return m})),n.d(e,"TestPage",(function(){return y})),"undefined"!==typeof window){var r=window.document.currentScript,o=n("8875");r=o(),"currentScript"in document||Object.defineProperty(document,"currentScript",{get:o});var i=r&&r.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);i&&(n.p=i[1])}n("7f7f");var c=function(){var t=this,e=t._self._c;return e("div",[e("h1",[t._v("测试页面")]),e("span",{on:{click:function(e){t.cnt++}}},[t._v(t._s(t.cnt))])])},u=[];n("96cf");function a(t,e,n,r,o,i,c){try{var u=t[i](c),a=u.value}catch(f){return void n(f)}u.done?e(a):Promise.resolve(a).then(r,o)}function f(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function c(t){a(i,r,o,c,u,"next",t)}function u(t){a(i,r,o,c,u,"throw",t)}c(void 0)}))}}window.g_pop_event_bus&&window.g_pop_event_bus.on("init-poplang",(function(t){return!!t&&(t.binderAddOpcode("ib3.test.page",function(){var t=f(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e["$ret"]=!0,alert("from TestPage.vue:call ib3.test.page now!");case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),!0)}));var s={name:"TestPage",props:["value"],components:{},data:function(){return{cnt:0}},methods:{}},l=s;function p(t,e,n,r,o,i,c,u){var a,f="function"===typeof t?t.options:t;if(e&&(f.render=e,f.staticRenderFns=n,f._compiled=!0),r&&(f.functional=!0),i&&(f._scopeId="data-v-"+i),c?(a=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(c)},f._ssrRegister=a):o&&(a=u?function(){o.call(this,(f.functional?this.parent:this).$root.$options.shadowRoot)}:o),a)if(f.functional){f._injectStyles=a;var s=f.render;f.render=function(t,e){return a.call(e),s(t,e)}}else{var l=f.beforeCreate;f.beforeCreate=l?[].concat(l,a):[a]}return{exports:t,options:f}}var h=p(l,c,u,!1,null,null,null),d=h.exports,y=d,v=[y],m=function t(e){t.installed||(t.installed=!0,v.map((function(t){e.component(t.name,t)})))};"undefined"!==typeof window&&window.Vue&&m(window.Vue);var g={install:m};e["default"]=g}})}));