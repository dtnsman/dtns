(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-public-connect"],{"0735":function(e,t,n){var a=n("6155");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("8435b21c",a,!0,{sourceMap:!1,shadowMode:!1})},"17ed":function(e,t,n){e.exports=n.p+"static/img/connect-mini.dec06390.jpg"},6155:function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,".box[data-v-79b17028]{width:100%;height:100%;background-color:#fff;position:fixed}.box[data-v-79b17028] .van-nav-bar__text{color:#000;font-size:15px}*[data-v-79b17028]{touch-action:pan-y}.textarea[data-v-79b17028] .van-cell{width:350px;margin:30px auto}.submit[data-v-79b17028] .van-button{display:block;margin:0 auto;background-color:#15a0e7;border:none}.logo[data-v-79b17028]{text-align:center;font-size:20px}.info[data-v-79b17028] .van-cell{background-color:#f5f5f5}",""]),e.exports=t},8809:function(e,t,n){"use strict";n.r(t);var a=n("f2d3"),i=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},"8c4b":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"box"},[n("v-uni-view",{staticStyle:{position:"fixed",right:"0px",margin:"5px","font-size":"15px"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.refresh.apply(void 0,arguments)}}},[e._v("重新登录")]),n("v-uni-view",{staticClass:"logo",staticStyle:{"text-align":"center","padding-left":"15px","margin-top":"20px","font-size":"24px"}},[n("img",{staticStyle:{border:"2px solid #e0e0e0","margin-bottom":"18px"},attrs:{src:e.imgUrl,width:"117px",height:"85px"}}),n("br"),e._v("连接DTNS.network")]),n("v-uni-view",{staticStyle:{"text-align":"left","padding-left":"15px","margin-top":"20px","font-size":"13px"}},[e._v("设备："+e._s(e.deviceInfo))]),n("v-uni-view",{staticStyle:{"text-align":"left","padding-left":"15px","margin-top":"20px","font-size":"13px"}},[e._v("公钥："+e._s(e.public_key))]),n("v-uni-view",{staticStyle:{"text-align":"left","padding-left":"15px","margin-top":"20px","font-size":"13px"}},[e._v("签名："+e._s(e.sign))]),n("v-uni-view",{staticStyle:{"text-align":"left","padding-left":"15px","margin-top":"20px","font-size":"13px"}},[e._v("汇总："),n("br"),n("v-uni-text",{attrs:{selectable:"true"}},[e._v(e._s(e.copyData))])],1),n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:e.notPhone,expression:"notPhone"}],staticStyle:{"text-align":"left","padding-left":"15px","margin-top":"20px","font-size":"13px"}},[e._v("请使用手机扫一扫复制内容，发送至手机号码："+e._s(e.phone)),n("v-uni-view",{staticStyle:{"text-align":"center",width:"100%",height:"213px",margin:"0 auto","background-color":"#fff"}},[n("img",{staticStyle:{"margin-top":"24px"},attrs:{src:e.url,alt:"",height:"165px",width:"165px"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.copy.apply(void 0,arguments)}}}),n("br"),e._v("注意：点击图片可复制短信内容")])],1),n("v-uni-view",{staticStyle:{"text-align":"center"}},[n("v-uni-button",{staticClass:"add-btn",staticStyle:{width:"95%","border-radius":"5px","font-size":"16px","background-color":"#15a0e7","margin-top":"15px",border:"none"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.connect.apply(void 0,arguments)}}},[e._v("连接DTNS（发送汇总）")]),n("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],staticClass:"add-btn",staticStyle:{width:"95%","border-radius":"5px","font-size":"16px","background-color":"#15a0e7","margin-top":"15px",border:"none"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.ok.apply(void 0,arguments)}}},[e._v("确认已发送（短信）")]),n("v-uni-button",{staticStyle:{width:"95%","border-radius":"5px","font-size":"16px","margin-top":"15px",border:"none"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.change.apply(void 0,arguments)}}},[e._v("切换节点")])],1)],1)},i=[]},afc4:function(e,t,n){"use strict";n.r(t);var a=n("8c4b"),i=n("8809");for(var o in i)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("fb2b");var r=n("f0c5"),l=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"79b17028",null,!1,a["a"],void 0);t["default"]=l.exports},f2d3:function(e,t,n){"use strict";n("7a82");var a=n("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("e25e"),n("d401"),n("d3b7"),n("25f0"),n("14d9");var i=a(n("3835")),o=a(n("5530")),r=a(n("c7eb")),l=a(n("1da1")),c=a(n("17ed")),s=n("26cb"),p={data:function(){return{public_key:"",private_key:"",sign:"",keyPair:null,deviceInfo:"",copyData:"",smsUrl:"",url:"",phones:[],phone:"",notPhone:!1,imgUrl:c.default}},mounted:function(){var e=this;return(0,l.default)((0,r.default)().mark((function t(){return(0,r.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.connectInfo();case 2:e.$toast=console.log;case 3:case"end":return t.stop()}}),t)})))()},activated:function(){return(0,l.default)((0,r.default)().mark((function e(){return(0,r.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},methods:(0,o.default)((0,o.default)({},(0,s.mapMutations)(["login"])),{},{refresh:function(){var e=this;return(0,l.default)((0,r.default)().mark((function t(){var n,a,i,o;return(0,r.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=rpc_client.roomid,t.next=3,iSessionDb.getDataByKey("session:"+n);case 3:if(a=t.sent,!a||!a.data){t.next=16;break}return i=a.data,e.$api.msg("登录成功",1e3),e.login(i),o=rpc_client.mywallet,console.log("new_mywallet:",o),o&&(iWalletDb.deleteDataByKey("g_mywallet"),iWalletDb.addData({key:"g_mywallet",data:o}),window.g_mywallet=rpc_client.mywallet),t.next=13,rpc_client.sleep(30);case 13:uni.switchTab({url:"/pages/index/index"}),t.next=17;break;case 16:e.$api.msg("登录失败，原因：会话session不存在",2e3);case 17:case"end":return t.stop()}}),t)})))()},ok:function(){var e=arguments,t=this;return(0,l.default)((0,r.default)().mark((function n(){var a,o,l,c,s,p,u;return(0,r.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:a=e.length>0&&void 0!==e[0]&&e[0],o=t,"yes"==a?(window.g_mywallet=null,rpc_client.setWallet(g_mywallet),window.g_mywallet=rpc_client.mywallet):(window.g_mywallet={private_key:t.private_key,public_key:t.public_key,web3name:rpc_client.roomid},rpc_client.setWallet(g_mywallet)),console.log("connect-ok() -> xflag",a,"g_mywallet:",g_mywallet),!0,rpc_client.init(),l=0;case 7:if(!(l<30)||rpc_client.pingpong_flag){n.next=14;break}return l++,l%10==0&&o.$api.msg("连接服务节点重试中",800),n.next=12,rpc_client.sleep(100);case 12:n.next=7;break;case 14:if(!(l>=30)){n.next=17;break}return o.$api.msg("连接服务节点失败",1e3),n.abrupt("return");case 17:return c=rpc_client.roomid?rpc_client.roomid:g_web3name,s=parseInt(Date.now()/1e3),n.next=21,key_util.hashVal(c+":"+s);case 21:return p=n.sent,n.next=24,key_util.signMsg(p,rpc_client.mywallet.private_key);case 24:u=n.sent,uni.request({url:o.$baseUrl+"/user/device/login",params:{web3name:c,sign:u,timestamp:s}}).then((function(e){console.log("ok->userLoginBySafeDevice-res:",e);var t=(0,i.default)(e,2),n=(t[0],t[1]),a=n.data;if(a&&a.ret){console.log("登录成功"),console.log("[ok]session:"+r+" save now:",a),o.login(a);var r=g_web3name;iSessionDb.deleteDataByKey("session:"+r),iSessionDb.addData({key:"session:"+r,data:a}),iSessionDb.addData({key:"session:"+r+":"+Date.now(),data:a}),window.g_mywallet=rpc_client.mywallet,iWalletDb.deleteDataByKey("g_mywallet"),iWalletDb.addData({key:"g_mywallet",data:rpc_client.mywallet}),iWalletDb.addData({key:"g_mywallet:"+Date.now(),data:rpc_client.mywallet}),iWalletDb.deleteDataByKey("mywallet:"+r),iWalletDb.addData({key:"mywallet:"+r,data:rpc_client.mywallet}),iWalletDb.addData({key:"mywallet:"+r+":"+Date.now(),data:rpc_client.mywallet}),o.$api.msg("登录成功");var l=getCurrentPages().length;console.log("不执行:"+l),setTimeout((function(){uni.switchTab({url:"/pages/index/index"})}),2e3),!1}else o.$api.msg("登录失败！原因：DTNS.network数据未同步",2e4)}));case 26:case"end":return n.stop()}}),n)})))()},copy:function(){try{navigator.clipboard.writeText(this.copyData),console.log("短信内容已复制"),this.$api.msg("短信内容已复制",5e3)}catch(e){console.log("copy-exception:"+e),this.$api.msg("短信内容复制失败，原因（可能无权限）",5e3)}},connectInfo:function(){var e=this;return(0,l.default)((0,r.default)().mark((function t(){var n,a,i,o,l,c;return(0,r.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.notPhone="mobile"!=device.type,e.deviceInfo=device.os+"-"+device.type+"("+Math.floor((new Date).getTime()/1e3).toString(36)+")",e.keyPair=eccryptoJS.generateKeyPair(),e.private_key=bs58.encode(e.keyPair.privateKey),e.public_key=bs58.encode(eccryptoJS.getPublicCompressed(e.keyPair.privateKey)),n=eccryptoJS.utf8ToBuffer(e.deviceInfo),t.next=8,eccryptoJS.sha256(n);case 8:return a=t.sent,t.t0=bs58,t.next=12,eccryptoJS.sign(e.keyPair.privateKey,a,!0);case 12:if(t.t1=t.sent,e.sign=t.t0.encode.call(t.t0,t.t1),"|",e.copyData="|"+e.sign+"|"+e.public_key.substring(e.public_key.length-4,e.public_key.length)+"|"+e.deviceInfo+"|"+rpc_client.roomid+"|",console.log("copyData:"+e.copyData),e.phones=null,!("undefined"!=typeof g_axios&&rpc_client.web3appInfo&&rpc_client.web3appInfo.network_info&&rpc_client.web3appInfo.network_info.phones_urls&&rpc_client.web3appInfo.network_info.phones_urls.length>0)){t.next=27;break}return i=rpc_client.web3appInfo.network_info.phones_urls[parseInt(1599999*Math.random())%rpc_client.web3appInfo.network_info.phones_urls.length],t.next=22,g_axios.get(i);case 22:o=t.sent,e.phones=o&&o.data?o.data:o,console.log("phonesUrl:",i,o),t.next=31;break;case 27:return t.next=29,g_axios.get("undefined"!=typeof g_phones_default_url?g_phones_default_url:"https://static.yunapi.org/phones.json");case 29:e.phones=t.sent,e.phones=e.phones&&e.phones.data?e.phones.data:e.phones;case 31:if(console.log("phones:",e.phones),e.phones&&!(e.phones.length<=0)){t.next=35;break}return e.$toast("无法获取connect-url（原因：上行通道的手机号码列表为空）",5e3),t.abrupt("return");case 35:e.phone=e.phones[parseInt(Math.floor(199999999*Math.random()))%e.phones.length],l="sms:"+e.phone+"?"+e.copyData,console.log("connect-url:"+l),e.smsUrl=l,c=e,QRCode.toDataURL(e.copyData).then((function(e){c.url=e})).catch((function(e){console.error(e)}));case 41:case"end":return t.stop()}}),t)})))()},change:function(){this.$router.push("/pages/public/changeSvrNode")},connect:function(){var e=this;return(0,l.default)((0,r.default)().mark((function t(){var n,a;return(0,r.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.phones&&!(e.phones.length<=0)){t.next=3;break}return e.$toast("无法获取connect-url（原因：上行通道的手机号码列表为空）",5e3),t.abrupt("return");case 3:n=document.createElement("a"),n.setAttribute("href",e.smsUrl),n.setAttribute("target","_blank"),a=document.createEvent("MouseEvents"),a.initEvent("click",!0,!0),n.dispatchEvent(a);case 9:case"end":return t.stop()}}),t)})))()}})};t.default=p},fb2b:function(e,t,n){"use strict";var a=n("0735"),i=n.n(a);i.a}}]);