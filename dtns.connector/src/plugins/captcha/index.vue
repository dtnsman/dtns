<template>
    <div class="box" style="width:100%; height:100%; position:absolute;overflow-y: auto;overflow-x: hidden;">
      <van-nav-bar title="请输入验证码" left-arrow  @click-left="back" fixed="true"/>
      <div class="mybtnbox" style="width:100%;padding-top: 56px;text-align: center;">
        <span ref="svgCaptchaImg" @click="update"></span><br/>
        验证码：<input class="input" width="120px" height="23px" v-model="code" style="margin-top: 10px;margin-bottom: 10px;"  /><br/>
        <button @click="send">提交验证</button>
      </div>
    </div>
</template>

<script>
// setTimeout(()=>g_pop_event_bus.on('monitor-agent',function(data){
//     console.log('monitor-agent-data:',data)
//     if(data.notify_type=='need_captcha'){
//         console.log('notify_type=need_captcha, goto /captcha')
//         g_dchatManager.viewContext.$router.push('/captcha')
//     }
// }),5000)
  export default {
    components: {
    },
  data(){
    return{
      data : null,
      code:"",
    }
  },

  methods: {
      back(){
        // this.$router.push('/user');
        this.$router.go(-1)
      },
      async update()
      {
        let ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/captcha/question')
        if(ret && ret.ret)
        {
            this.data = ret.data
            this.$refs.svgCaptchaImg.innerHTML = ret.data
        }else{
            this.$toast('获取验证码失败！原因为：'+(ret?ret.msg:'未知网络原因'))
        }
      },
      async send()
      {
        if(!this.code) return this.$toast('请输入验证码')
        let ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/captcha/answer',{code:this.code})
        if(ret && ret.ret)
        {
            this.$toast('验证成功！')
            this.back()
        }else{
            this.$toast('验证失败！')
        }
      },
    },
 mounted(){
    this.update()
  }
}
</script>
<style lang="stylus" scoped>
.van-nav-bar__title{
  font-size:16px;
  font-weight:bold;
}
*[data-v-29a9d548][data-v-29a9d548]{
  color #222
}
.box >>> .van-nav-bar .van-icon{
  font-size 1.2rem
  color #222
}

* {
  background-color: #fff;
  touch-action: pan-y;
}

.topbar >>> .van-nav-bar {
  height: 60px;
  margin-bottom: 10px;
}

.topbar >>> .van-nav-bar__title {
  line-height: 60px;
  height: 60px;
  letter-spacing: 2px;
  font-weight: bold;
}

.topbar >>> .van-icon-arrow-left {
  height: 60px;
  line-height: 60px;
}

.topbar >>> .van-nav-bar .van-icon {
  color: #7c7f84;
}

.mybtnbox{}
.mybtnbox button {color: rgb(255, 255, 255); border-radius: 4px; font-size: 13px; height: 28px; background-color: rgb(18, 173, 245); border: none;}
.input {
  width:90%; height:29px; padding-bottom:2px; padding-left:5px; border:1px solid #eeeeee; font-size:13px;
  }
</style>
