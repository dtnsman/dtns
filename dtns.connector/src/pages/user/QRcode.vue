<template>
  <!--个人信息组件-->
  <div class="box">
    <div class="topbar">
      <van-nav-bar title="我的二维码" right-text="邀请明细" left-arrow @click-left="back" @click-right="lnvitationList" />
    </div>
    <div class="logo">
      <div class="img">
        <img v-image-preview :src="url" alt="" />
        <!-- <p v-if="show">{{ head }}</p> -->
      </div>
      <div class="InvitationCode">
          <div class="InvitationCode_left">
            <p style="float:left; font-size:14px; line-height:35px; padding-left:5px;background-color:transparent;">我的邀请码:</p>
              <p style="float:left; font-size:14px; color:#25a0e7; line-height:35px; padding-left:5px;background-color:transparent;">{{invite_code}}</p>
          </div>
        <div class="InvitationCode_right" @click="copy"  :data-clipboard-text="invite_code">复制</div>
      </div>

    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
export default {
   data() {
            return {
                url:'',
                invite_code:''
            }
        },
  mounted() {
  },
  methods: {
    back() {//返回上一层
      this.$router.push('/user');
    },///

    lnvitationList(){//跳转邀请明细页面
      this.$router.push('/user/InvitationList')
    },///

    copy() {  
          var clipboard = new Clipboard('.InvitationCode_right')  
          clipboard.on('success', e => {  
            vant.Toast.success("复制成功");//这里你如果引入了elementui的提示就可以用，没有就注释即可
                  // 释放内存  
                  clipboard.destroy()  
                })  
        },///
  },
  async created(){//进入页面就执行
      this.invite_code = localStorage.invite_code
      let random = Math.random()
      // this.url = `${this.$baseUrl}/qrcode/draw?data=`+localStorage.user_id+'&random='+random //通过聊天室id生成二维码
      // console.log(this.url)
      let img_id = localStorage.user_id,This = this
      let item = await imageDb.getDataByKey('qrcode-'+img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
      let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open',qrcode:'yes'}//,img_p:'min200'} 
      this.url = item  && item.data ? item.data : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
      if(!item) 
      {
        QRCode.toDataURL(img_id)
          .then(url => {
            //console.log(url)
            This.url = url
            imageDb.addData({img_id:'qrcode-'+img_id,data:This.url })
          })
          .catch(err => {
            console.error(err)
          })
        // This.$api.network.getImg(params).then((data)=>{
        //   if(data && data.data)
        //   {
        //     This.url  ='data:image/png;base64,'+data.data
        //     imageDb.addData({img_id:'qrcode-'+img_id,data:This.url })
        //   }
        // }).catch((ex)=>{
        //   console.log('load img error',ex)
        // })
      }
    },
};
</script>

<style lang="stylus" scoped>
.box {
  width 100%;
  height 100%;
  position fixed;
  background-color #fff;
}
.box >>> .van-nav-bar__text {
  font-size:16px;
}
.InvitationCode {
    width 90%
    height 35px
    margin-top 10px
    margin:auto;
}
.InvitationCode_left {
    width 78%
    height 35px
    float left
    border 1px solid #aaa
    box-sizing border-box
    
}
.InvitationCode_right {
    width 22%
    height 35px
    float left
    box-sizing border-box
    background-color #15a0e7
    line-height 33px
    color #fff
}
.input {
width:90%; height:29px; padding-bottom:2px; padding-left:5px; border:1px solid #eeeeee; font-size:13px;
}
.logo[data-v-16247baa] .van-button__text{
  background-color rgb(21, 160, 231)
}
* {
  background-color: #fff;
  touch-action: pan-y;
}
.van-divider{
  border-top-width 5px
}
.topbar >>> .van-nav-bar {
  height: 44px;
  margin-bottom: 40px;
  background-color #fff
}
.logo[data-v-287f5d15]{
  margin-bottom 0
}

.topbar[data-v-287f5d15] .van-nav-bar__title {
  background-color #fff
}
.box >>> .van-nav-bar__arrow{
  color:#000
}
.logo {
  margin-bottom: 50px;
  text-align:center;
}

.logo .img {
  width: 200px;
  height: 200px;
  margin: 30px auto;
}

.logo img {
  width: 100%;
  height: 100%;
  display: block;
}

.logo >>> .van-uploader {
  width: 100%;
  display: flex;
  justify-content: center;
}

.logo >>> .van-button--primary {
  background-color: #07c160;
  color: #999;
  margin: 0 auto;
}

.logo >>> .van-button {
  margin: 0 auto;
}

.logo >>> .van-button__icon {
  background-color: #07c160;
  color: #fff;
}

.logo >>> .van-button__text {
  background-color: #07c160;
  color: #fff;
}

.hr >>> .van-divider {
  margin-bottom: 40px;
}

.change >>> .van-cell {
  border: 1px solid #eee;
  width: 300px;
  margin: 0 auto;
}

.change button {
  display: block;
  margin: 40px auto;
  background-color: #07c160;
  color: #fff;
  border: none;
  width: 100px;
  height: 40px;
}
.img{
  position:relative;
}
.img >>> p{
  position:absolute;
  top:30px;
  left:43px;
  font-size:22px;
  background-color :#f44
}
</style>
