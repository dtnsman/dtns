<template>
    <div class="box">
      <header>
        <van-nav-bar
          title="下载推流工具"
          left-arrow
          @click-left="onClickLeft"
        />
     </header>
     <div style="width:100%;">
       <div class="modelText" style="">
         <div style="height:43px; width:100%;">
           <div style="font-size:20px;line-height:40px;padding-left:10px;">PC电脑 :</div>
         </div>
         <div style="height:130px; width:100%;">
           <a href="https://obsproject.com/"><img src="../../assets/images/apiOBS.png" alt="" width="100%" height="100%" class="imgx"></a>
         </div>
       </div>
       <div class="modelText" style="">
         <div style="height:43px; width:100%;">
           <div style="font-size:20px;line-height:40px;padding-left:10px;">安卓手机 :</div>
         </div>
         <div style="height:130px; width:100%;">
           <a href="http://dldir1.qq.com/hudongzhibo/xiaozhibo/rtmpdemo.apk"><img src="../../assets/images/apiTX.png" alt="" width="100%" height="100%" class="imgx"></a>
         </div>
       </div>
       <div class="modelText" style="">
         <div style="height:43px; width:100%;">
           <div style="font-size:20px;line-height:40px;padding-left:10px;">苹果手机 :</div>
         </div>
         <div style="height:130px; width:100%;">
           <a href="https://mirrors.huaweicloud.com/videocloudsdk/ios_push_sdk/ios_pusher_1.1.5.4.zip"><img src="../../assets/images/apiPC.png" alt="" width="100%" height="100%" class="imgx"></a>
         </div>
       </div>
     </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
import Clipboard from 'clipboard';
    export default {
        data(){
            return{
              
            }
        },
        methods: {
            onClickLeft() {//返回首页
              this.$router.go(-1)
            },///

            copy() {  //点击复制
              var clipboard = new Clipboard('.InvitationCode_right')  
              clipboard.on('success', e => {  
                vant.Toast.success("复制成功");//这里你如果引入了elementui的提示就可以用，没有就注释即可
                      // 释放内存  
                      clipboard.destroy()  
                    })  
            },///

            
        },
        created(){
          
        },
        mounted(){
          //这时候请求后端数据
        },
    }
</script>
<style scoped lang="stylus">
.box {
  width 100%
  height 100%
  position fixed
  background-color:#f5f5f5
  margin:0 auto;
}
.topbar {
  position fixed
  top 0
  width 100%
  z-index 99
  height 46px
  background-color:#fff;
}
.box >>> .van-icon{
  font-size:16px;
}
.modelText{
  width:92%;height:173px;border-radius:5px;background-color:#fff;margin-left:4%;margin-top:12px;float:left;
}
.box >>> .van-nav-bar__arrow{
  color:#000;
}
.imgx{
  border-bottom-right-radius:5px;border-bottom-left-radius:5px;
}
</style>
