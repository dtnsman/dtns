<template>

    <div class="box">
      <header class="topbar" style="border-bottom:1px solid #eee; height:46px; position:fixed; top:0; background-color:#fff; margin:0 auto; align:center; z-index:99999;">
        <van-nav-bar
          title="群分享"
          left-arrow
          @click-left="back"
        />
     </header>
     <div>
       <video style="width= 100%; height=100%;" id="test" class="video-js vjs-default-skin vjs-big-play-centered"></video>
     </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
              
            }
        },
        methods: {
            back() {//返回上一层
              this.$router.go(-1)
            },///

            async Administration(){//查看群信息
              let users = {
                      user_id:localStorage.user_id,
                      s_id:localStorage.s_id,   
                      chatid:this.$route.params.chatid,
                    }
              let ress =  await this.$api.network.ChatInfo(users)//群信息
              this.live_rtmp_url = this.$route.params.chatid
              console.log(ress)
              },
        },
        created(){
          // this.Administration()
        },
        mounted(){
          let url = window.location.href;
          let chatid = url.split('?')[1]
          hwplayerloaded(function () {
            let width = window.screen.width
            let height = window.screen.height
            console.log(width)
            console.log(height)
              let options = {
                //是否显示控制栏，包括进度条，播放暂停按钮，音量调节等组件
                controls: true, 
                width: width,
                height: height,
              };
              let player = new HWPlayer('test', options, function () {
                //播放器已经准备好了
                player.src({src:"http://cdn.pusher.opencom.org.cn/live/msg_chat02LzHEuS8nA4/index.m3u8",type: 'application/x-mpegURL'});
                // "this"指向的是HWPlayer的实例对象player
                player.play();
                // 使用事件监听
                player.on('ended', function () {
                //播放结束了
                  });
                });
            });
        },
    }
</script>
<style scoped lang="stylus">
.box {
  width 100%
  height 100%
  position fixed
  background-color:#f5f5f5
}
.topbar {
  position fixed
  top 0
  width 100%
  z-index 99
  height 46px
  background-color:#fff;
}
.box >>> .van-nav-bar__arrow {
  font-size:16px;
  color:#000
}
.box >>> .van-nav-bar__text{
  color:#000
  font-size: 16px;
}
</style>
