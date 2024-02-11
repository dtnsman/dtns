<template>
  <!--个人信息组件-->
  <div class="box" style="width:100%; height:100%; background-color:#fff; position:fixed;">
    <van-nav-bar title="修改群昵称" left-arrow @click-left="back" right-text="确认" @click-right="onClickRight" />
      <div style="text-align:center; float:left; padding-left:15px; margin:15px 0 15px 0; border-bottom:1px solid #f5f5f5; padding-bottom:15px; width:100%;">
        <div style="font-size:14px; float:left; margin:0; padding:0; line-height:32px;">群昵称</div>
        <div style="float:left; width:70%;">
          <input text="text" v-model="changetext" class="input"/>
        </div>
    </div>
  </div>
</template>
<script>
export default {
   data() {
            return {
              changetext:'',
              chatName:'',
              web3key_hash:null
            }
        },
  mounted() {
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
      async onClickRight() {//修改群昵称
        this.changetext = this.changetext.trim()
        if(!this.changetext ) return this.$toast('【错误】群名称不能为空！')

        let chatName = this.changetext
        if(this.web3key_hash)
        {
          this.chatWeb3Key = await g_dchatManager.getWeb3Key(this.web3key_hash)
          let {iv,aeskey} = sign_util.decodeWeb3keyAes256Str(this.chatWeb3Key)
          console.log('import-key:',await sign_util.importSecretKey(aeskey))
          let en1= await sign_util.encryptMessage(await sign_util.importSecretKey(aeskey),iv,this.changetext)
          if(en1) chatName = 'aes256|'+this.web3key_hash+'|'+en1
        }
        let user = {
          user_id:localStorage.user_id,
          s_id:localStorage.s_id,
          chatid:this.$route.params.chatid,
          name:chatName,
        }
        let res =  await this.$api.network.ChatModName(user)
        if(res.ret){
          this.$toast.success('修改成功')
          this.$router.go(-1)
        }else{
          this.$toast.fail('修改失败' + res.msg)
        }
      }
  },
  async created(){//进入页面就执行
        let data = localStorage.chatname;
        this.changetext = await g_dchatManager.decryptMsgInfo(data)
        console.log('this.changetext:',this.changetext)

        let web3keyInfoRet = await this.$api.network.queryChatWeb3key({list_id:this.$route.params.chatid,user_id:localStorage.user_id,
              s_id:localStorage.s_id})
        console.log('web3keyInfoRet:',web3keyInfoRet)
        if(!web3keyInfoRet || !web3keyInfoRet.ret) return 
        this.web3key_hash = web3keyInfoRet.web3key_hash
        console.log('this.web3key_hash:',this.web3key_hash)
  }
}
</script>

<style lang="stylus" scoped>
.box >>> .van-nav-bar__text {
  color:#111;
  font-size:16px;
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
  font-size:1.1rem;
}
.logo {
  margin-bottom: 50px;
}

.logo .img {
  width: 81px;
  height: 81px;
  margin: 30px auto;
}

.logo img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius 50%
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
