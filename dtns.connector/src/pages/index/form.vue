<template>
  <div id="app1">
      <header class="topbar" style="border-bottom:1px solid #eee; height:56px; position:fixed; top:0; background-color:#fff; margin:0 auto; align:center; z-index:999;">
      <div style="margin:0 auto;height:56px;text-align:center">
        <span style="margin-left:24px; font-size:16px; line-height:56px;">表单设计器</span>
      </div>
      <div @click="back" style="position:absolute; line-height:44px;top:6px; left:15px;">
        <van-icon name="arrow-left" />
      </div>
    </header>
    <iframe id="iframe" src="static/kform.html" width="100%" :height="ih"></iframe>
    <!-- <k-form-design :showBtnList="[
        'preview',
        'importJson',
        'exportJson',
        'exportCode',
        'reset',
        ]" title="表单设计器 -自定义标题"></k-form-design> -->
  </div>
</template>
<script>
    let jsonData = { list: [{ "type": "input", "name": "单行文本", "options": { "width": "100%", "defaultValue": "", "placeholder": "请输入", "disabled": false }, "model": "input_1574002292465", "key": "input_1574002292465", "rules": [{ "required": false, "message": "必填项" }] }], "config": { "layout": "horizontal", "labelCol": { "span": 4 }, "wrapperCol": { "span": 18 }, "hideRequiredMark": false, "width": "100%", "marginTop": "0px", "marginRight": "0px", "marginBottom": "0px", "marginLeft": "0px" } }
    export default {
      data(){
        return {
        jsonData,url:'',ih:960
      }},
      created(){
        let This = this
        this.onresize = () => {
          return (() => {
            window.fullHeight = document.documentElement.clientHeight;
            This.ih = fullHeight
            console.log('window.fullHeight:'+fullHeight)
            console.log('this.ih:'+This.ih)
          })();
        };
        this.onresize()
        window.addEventListener('resize',this.onresize,true)
      },
      methods: {
        handleSubmit() {
        },
        back(){
          this.$router.back()
        }
      }
    }
    // let vm = new Vue({
    //   el: '#app1',
    //   data: {
    //     jsonData
    //   },
    //   methods: {
    //     handleSubmit() {
    //     }
    //   }
    // })
  </script>
<style lang="stylus" scoped>

.topbar {
  position fixed
  top 0
  width 100%
  z-index 99
}
</style>