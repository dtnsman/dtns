"use strict";(self["webpackChunkdtns_creator"]=self["webpackChunkdtns_creator"]||[]).push([[60],{1060:function(e,t,n){n.r(t),n.d(t,{default:function(){return r}});n(6699);var l=function(){var e=this,t=e._self._c;return t("el-collapse-item",{staticClass:"linkage-container",attrs:{title:"组件联动（预览生效）",name:"linkage"}},[t("el-form",[e._l(e.linkage.data,(function(n,l){return t("div",{key:l,staticClass:"linkage-component"},[t("div",{staticClass:"div-guanbi",on:{click:function(t){return e.deleteLinkageData(l)}}},[t("span",{staticClass:"iconfont icon-guanbi"})]),t("el-select",{staticClass:"testtest",attrs:{placeholder:"请选择联动组件"},model:{value:n.id,callback:function(t){e.$set(n,"id",t)},expression:"item.id"}},e._l(e.componentData,(function(n,l){return t("el-option",{key:n.id,attrs:{value:n.id,label:n.label}},[t("div",{on:{mouseenter:function(t){return e.onEnter(l)},mouseout:function(t){return e.onOut(l)}}},[e._v(e._s(n.label))])])})),1),t("el-select",{attrs:{placeholder:"请选择监听事件"},model:{value:n.event,callback:function(t){e.$set(n,"event",t)},expression:"item.event"}},e._l(e.eventOptions,(function(e){return t("el-option",{key:e.value,attrs:{value:e.value,label:e.label}})})),1),t("p",[e._v("事件触发时，当前组件要修改的属性")]),e._l(n.style,(function(l,a){return t("div",{key:a,staticClass:"attr-container"},[t("el-select",{on:{change:function(e){l.value=""}},model:{value:l.key,callback:function(t){e.$set(l,"key",t)},expression:"e.key"}},e._l(Object.keys(e.curComponent.style),(function(n){return t("el-option",{key:n,attrs:{value:n,label:e.styleMap[n]}})})),1),e.isIncludesColor(l.key)?t("el-color-picker",{attrs:{"show-alpha":""},model:{value:l.value,callback:function(t){e.$set(l,"value",t)},expression:"e.value"}}):e.selectKey.includes(l.key)?t("el-select",{model:{value:l.value,callback:function(t){e.$set(l,"value",t)},expression:"e.value"}},e._l(e.optionMap[l.key],(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1):t("el-input",{attrs:{type:"number",placeholder:"请输入"},model:{value:l.value,callback:function(t){e.$set(l,"value",e._n(t))},expression:"e.value"}}),t("span",{staticClass:"iconfont icon-shanchu",on:{click:function(t){return e.deleteData(n.style,a)}}})],1)})),t("el-button",{on:{click:function(t){return e.addAttr(n.style)}}},[e._v("添加属性")])],2)})),t("el-button",{staticStyle:{"margin-bottom":"10px"},on:{click:e.addComponent}},[e._v("添加组件")]),t("p",[e._v("过渡时间（秒）")]),t("el-input",{staticClass:"input-duration",attrs:{placeholder:"请输入"},model:{value:e.linkage.duration,callback:function(t){e.$set(e.linkage,"duration",t)},expression:"linkage.duration"}})],2)],1)},a=[],o=n(973),s={data(){return{optionMap:o.JY,selectKey:o.OA,styleMap:o.Ve,eventOptions:[{label:"点击",value:"v-click"},{label:"悬浮",value:"v-hover"}],oldOpacity:"",oldBackgroundColor:""}},computed:{linkage(){return this.$store.state.curComponent.linkage},componentData(){return this.$store.state.componentData},curComponent(){return this.$store.state.curComponent}},methods:{onEnter(e){this.oldOpacity=this.componentData[e].style.opacity,this.oldBackgroundColor=this.componentData[e].style.backgroundColor,this.componentData[e].style.opacity=".3",this.componentData[e].style.backgroundColor="#409EFF"},onOut(e){this.componentData[e].style.opacity=this.oldOpacity,this.componentData[e].style.backgroundColor=this.oldBackgroundColor},isIncludesColor(e){return e.toLowerCase().includes("color")},addAttr(e){e.push({key:"",value:""})},addComponent(){this.linkage.data.push({id:"",event:"",style:[{key:"",value:""}]})},deleteData(e,t){e.splice(t,1)},deleteLinkageData(e){this.linkage.data.splice(e,1)}}},i=s,c=n(1001),u=(0,c.Z)(i,l,a,!1,null,"017b510c",null),r=u.exports}}]);
//# sourceMappingURL=60.a47926fc.js.map