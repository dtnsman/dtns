"use strict";(self["webpackChunkdtns_creator"]=self["webpackChunkdtns_creator"]||[]).push([[723],{2689:function(t,e,n){n.d(e,{Z:function(){return h}});var l,i,o=n(4003),s={props:{linkage:{type:Object,default:()=>{}},element:{type:Object,default:()=>{}}},created(){this.linkage?.data?.length&&(o.Z.$on("v-click",this.onClick),o.Z.$on("v-hover",this.onHover))},mounted(){const{data:t,duration:e}=this.linkage||{};t?.length&&(this.$el.style.transition=`all ${e}s`)},beforeDestroy(){this.linkage?.data?.length&&(o.Z.$off("v-click",this.onClick),o.Z.$off("v-hover",this.onHover))},methods:{changeStyle(t=[]){t.forEach((t=>{t.style.forEach((t=>{t.key&&(this.element.style[t.key]=t.value)}))}))},onClick(t){const e=this.linkage.data.filter((e=>e.id===t&&"v-click"===e.event));this.changeStyle(e)},onHover(t){const e=this.linkage.data.filter((e=>e.id===t&&"v-hover"===e.event));this.changeStyle(e)}}},a=s,r=n(1001),c=(0,r.Z)(a,l,i,!1,null,null,null),h=c.exports},5723:function(t,e,n){n.r(e),n.d(e,{default:function(){return h}});var l=function(){var t=this,e=t._self._c;return e("div",{staticClass:"svg-triangle-container",on:{click:t.clickNow}},[e("svg",{attrs:{version:"1.1",baseProfile:"full",xmlns:"http://www.w3.org/2000/svg"}},[e("polygon",{ref:"triangle",attrs:{points:t.points,stroke:t.element.style.borderColor,fill:t.element.style.backgroundColor,"stroke-width":"1"}})]),e("v-text",{attrs:{"prop-value":t.element.propValue,element:t.element}})],1)},i=[],o=n(2689),s={extends:o.Z,props:{propValue:{type:String,required:!0,default:""},element:{type:Object,default:()=>{}}},data(){return{points:""}},watch:{"element.style.width":function(){this.draw()},"element.style.height":function(){this.draw()}},mounted(){this.draw()},async created(){this.poplang=new PopRuntime(this),this.poplang.binderAddOpcode("init",(async()=>{this.xdata=this.element.xdata,console.log("this.xdata:",this.xdata),await this.poplang.runScript(null,this.element.code),console.log("code:"+this.element.code,"mtext:",this.mtext)})),this.element.poplang=this.poplang},methods:{async clickNow(t){let e=await this.poplang.op(null,"onclick");console.log("VText-onclick-ret:",e)},draw(){const{width:t,height:e}=this.element.style;this.drawTriangle(t,e)},drawTriangle(t,e){const n=[[.5,.05],[1,.95],[0,.95]],l=n.map((n=>t*n[0]+" "+e*n[1]));this.points=l.toString()}}},a=s,r=n(1001),c=(0,r.Z)(a,l,i,!1,null,"1d2d1cea",null),h=c.exports}}]);
//# sourceMappingURL=723.e00e0d84.js.map