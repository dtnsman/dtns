<template>
    <div>
        <!-- <header class="topbar" style="border-bottom:1px solid #eee; height:56px; position:fixed; top:0; background-color:#fff; margin:0 auto; align:center; z-index:999;">
        <div style="margin:0 auto;height:56px;text-align:center">
          <span style="margin-left:24px; font-size:16px; line-height:56px;">福刻FORK</span>
        </div>
        <div @click="back" style="position:absolute; line-height:44px;top:6px; left:15px;">
          <van-icon name="arrow-left" />
        </div> 
      </header> -->
      <!-- <div @click="back" style="position:absolute; line-height:44px;top:6px; left:15px;padding-left: 10px;padding-right: 10px;">
          <van-icon name="arrow-left" />
        </div>  -->
      <iframe src="static/fork-h5/index.html" width="100%" :height="ih" ></iframe> 
      <!-- style="margin-top: 56px;" -->
    </div>
  </template>
  <script>
       export default {
        data(){
          return {
          ih:960
        }},
        created(){
          let This = this
          this.onresize = () => {
            return (() => {
              window.fullHeight = document.documentElement.clientHeight;
              This.ih = fullHeight //- 56
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
    </script>
  <style lang="stylus" scoped>
  
  .topbar {
    position fixed
    top 0
    width 100%
    z-index 99
  }
  </style>