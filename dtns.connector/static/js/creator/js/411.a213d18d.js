"use strict";(self["webpackChunkdtns_creator"]=self["webpackChunkdtns_creator"]||[]).push([[411],{411:function(e,t,l){l.r(t),l.d(t,{default:function(){return u}});var o=function(){var e=this,t=e._self._c;return t("div",{staticClass:"attr-list"},[t("CommonAttr")],1)},n=[],a=l(7619),r={components:{CommonAttr:a.Z}},i=r,c=l(1001),s=(0,c.Z)(i,o,n,!1,null,null,null),u=s.exports},7619:function(e,t,l){l.d(t,{Z:function(){return u}});l(6699);var o=function(){var e=this,t=e._self._c;return t("div",{staticClass:"v-common-attr"},[t("el-collapse",{attrs:{accordion:""},on:{change:e.onChange},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[t("el-collapse-item",{attrs:{title:"通用样式",name:"style"}},[t("el-form",e._l(e.styleKeys,(function({key:l,label:o},n){return t("el-form-item",{key:n,attrs:{label:o}},[e.isIncludesColor(l)?t("el-color-picker",{attrs:{"show-alpha":""},model:{value:e.curComponent.style[l],callback:function(t){e.$set(e.curComponent.style,l,t)},expression:"curComponent.style[key]"}}):e.selectKey.includes(l)?t("el-select",{model:{value:e.curComponent.style[l],callback:function(t){e.$set(e.curComponent.style,l,t)},expression:"curComponent.style[key]"}},e._l(e.optionMap[l],(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1):t("el-input",{attrs:{type:"number"},model:{value:e.curComponent.style[l],callback:function(t){e.$set(e.curComponent.style,l,e._n(t))},expression:"curComponent.style[key]"}})],1)})),1)],1),e.curComponent.request?t("Request"):e._e(),e.curComponent.linkage?t("Linkage"):e._e(),t("el-collapse-item",{attrs:{name:"editor",title:"编辑$pop.lang源码（按Esc键全屏）"}},[t("div",{staticClass:"editor"},[e.editor?t("CodeEditor",{ref:"coder",staticStyle:{height:"100%",width:"100%"},attrs:{language:"poplang",value:e.curComponent.code,element:e.curComponent},on:{input:e.changeTextarea}}):e._e(),t("span",{staticStyle:{"font-size":"12px",color:"#303133"}},[e._v("注意：使用F7-F10快捷键影响代码字体大小；F7：15px；F8：13px（默认大小）；F9：缩小1px；F10：放大1px")])],1)])],1)],1)},n=[],a=l(973),r={components:{Linkage:()=>l.e(60).then(l.bind(l,1060)),Request:()=>l.e(903).then(l.bind(l,2903)),CodeEditor:()=>l.e(378).then(l.bind(l,8378))},data(){return{code:"",codeInfo:a.codeInfo,editor:!0,optionMap:a.JY,styleData:a.g2,textAlignOptions:a.xr,borderStyleOptions:a.pt,verticalAlignOptions:a.D0,selectKey:a.OA,activeName:"style"}},computed:{styleKeys(){if(this.curComponent){const e=Object.keys(this.curComponent.style);return this.styleData.filter((t=>e.includes(t.key)))}return[]},curComponent(){return this.$store.state.curComponent}},created(){this.activeName=this.curComponent.collapseName},beforeUpdate(){},mounted(){},methods:{showEditor(){},onChange(){console.log("this.activeName:"+this.activeName),this.curComponent.collapseName=this.activeName,this.editor="editor"==this.activeName},changeTextarea(e){console.log("changeTextarea-val:"+e)},isIncludesColor(e){return e.toLowerCase().includes("color")}}},i=r,c=l(1001),s=(0,c.Z)(i,o,n,!1,null,null,null),u=s.exports},973:function(e,t,l){l.d(t,{D0:function(){return i},JY:function(){return s},OA:function(){return c},Ve:function(){return n},g2:function(){return o},pt:function(){return r},xr:function(){return a}});const o=[{key:"left",label:"x 坐标"},{key:"top",label:"y 坐标"},{key:"rotate",label:"旋转角度"},{key:"width",label:"宽"},{key:"height",label:"高"},{key:"color",label:"颜色"},{key:"backgroundColor",label:"背景色"},{key:"borderWidth",label:"边框宽度"},{key:"borderStyle",label:"边框风格"},{key:"borderColor",label:"边框颜色"},{key:"borderRadius",label:"边框半径"},{key:"fontSize",label:"字体大小"},{key:"fontWeight",label:"字体粗细"},{key:"lineHeight",label:"行高"},{key:"letterSpacing",label:"字间距"},{key:"textAlign",label:"左右对齐"},{key:"verticalAlign",label:"上下对齐"},{key:"opacity",label:"不透明度"}],n={left:"x 坐标",top:"y 坐标",rotate:"旋转角度",width:"宽",height:"高",color:"颜色",backgroundColor:"背景色",borderWidth:"边框宽度",borderStyle:"边框风格",borderColor:"边框颜色",borderRadius:"边框半径",fontSize:"字体大小",fontWeight:"字体粗细",lineHeight:"行高",letterSpacing:"字间距",textAlign:"左右对齐",verticalAlign:"上下对齐",opacity:"不透明度"},a=[{label:"左对齐",value:"left"},{label:"居中",value:"center"},{label:"右对齐",value:"right"}],r=[{label:"实线",value:"solid"},{label:"虚线",value:"dashed"}],i=[{label:"上对齐",value:"top"},{label:"居中对齐",value:"middle"},{label:"下对齐",value:"bottom"}],c=["textAlign","borderStyle","verticalAlign"],s={textAlign:a,borderStyle:r,verticalAlign:i}}}]);
//# sourceMappingURL=411.a213d18d.js.map