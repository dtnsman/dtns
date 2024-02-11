<template>
  <div class="box">
      <van-nav-bar title="注册" left-arrow @click-left="back"/>
    <div class="textarea">
      <van-field
        required
        placeholder="请输入手机号"
        size="large"
        v-model="phone"
        oninput="if(value.length>11) value=value.slice(0,11)"
        style="width: 100%;"
      />
      <van-field required style="width: 100%;" placeholder="请输入短信验证码" v-model="sms_code">
        <van-button slot="button" size="small" type="primary" @click="getCode">{{ btnText }}</van-button>
      </van-field>
	  <!-- <van-cell title="" value="" style="padding: 0; margin: 0;" /> -->
     <van-field required style="width: 100%;" placeholder="请输入密码" size="large" v-model="pwd" type="password" />
      <van-field required style="width: 100%;" placeholder="请输入昵称" size="large" v-model="user_name"  />
      <van-field :required="required" v-if="this.invite_type !==1"  style="width: 100%;" :placeholder="InvitationCode" size="large" v-model="invite_code"  />
      <van-cell title="" value="" style="padding: 0; margin: 0;" />
    </div>
    <div class="register" style="text-align: center;" >
      <van-button style="width: 95%; border-radius:5px; font-size:16px;" @click="register">注册</van-button>
      <!-- <van-button @click="change" style="width:95%; border-radius:5px; font-size:16px;  margin-top:15px; border:none;">切换</van-button> -->
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            InvitationCode:'邀请码(选填)',
            required:false,
            invite_type:0,
            phone:'',
            sms_code:'',
            pwd:'',
            invite_code:'',
            user_name:'',
            btnDisabled: false,
            btnText :'获取验证码'

        }
    },
  methods: {
	right(){

	},
  change(){
      this.$router.push("/changeSvrNode");
    },
    back(){
      this.$router.go(-1);
    },
    async register(){
          let random = Math.random();
          let nation_code = 86;
          if(this.phone==''){this.$toast("请输入您的手机号码");return;}
          if(this.sms_code==''){this.$toast("请输入验证码");return;}
          if(this.pwd=='' || this.confirm_pwd==''){this.$toast("请输入密码");return;}
          if(this.user_name==''){this.$toast("请输入昵称");return;}
          if(this.invite_type ==2 && this.invite_code==''){this.$toast('请输入邀请码');return;}
          if(this.phone!=='' || this.sms_code!=='' || this.pwd !==''  ||this.user_name!==''){
          this.pwd = this.$md5(this.pwd);
          let info = {
            phone:this.phone,
            sms_code:this.sms_code,
            invite_code:this.invite_code,
            pwd:this.pwd,
            user_name:this.user_name,
            random:random,
            // nation_code:'86'
          }
          let res =  await this.$api.network.userRegisterUrl(info)
          if(res.ret){
            this.$toast.success("注册成功")
            localStorage.setItem("s_id", res.s_id);
            localStorage.setItem("user_id", res.user_id);
            localStorage.setItem("userInfo",JSON.stringify(res))
            // this.$toast.success("登录成功",1000);
            this.$router.push('/index',1500);
          }else{
            this.$toast.fail("注册失败" + res.msg)
          }
          }

      },
      getSecond(s) {
      let _this = this;
      let _s = s;
      if (s == 0) {
        this.btnDisabled = false;
        this.btnText = "获取验证码";
        s = _s;
      } else {
        this.btnDisabled = true;
        this.btnText = "" + s + "s后获取";
        s--;
        setTimeout(function() {
          _this.getSecond(s);
        }, 1000);
      }
    },
      async getCode(){
         if (this.btnDisabled) {
        return;
      }

        let random = Math.random();
        if(this.phone==''){
          this.$toast("您还没输入手机号呢");
          return;
          }
          let reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
          if(reg.test(this.phone)){
            let info = {
              // nation_code:86,
              phone:this.phone,
              random:random
            }
            let res =  await this.$api.network.sendSms(info)
              // this.$axios.get('http://182.61.13.123:9000/user/send_sms?phone='+this.phone+'&nation_code=86&random='+this.random)
            if(res.ret){
              this.getSecond(60);
              this.$toast('获取验证码成功',3000);
            }else if(res.msg == "send sms failed")
            {
              this.$toast.fail('验证码获取失败,请重新尝试')
            }else
            {
              this.$toast.fail("获取验证码失败" + res.msg)
            }
          }
      },///

    async ChatSettingQuery(){//邀请码配置信息
      let res =  await this.$api.network.ChatSettingQuery({})
      this.invite_type = res.invite_type
      if(this.invite_type == 2){
        this.required = true
        this.InvitationCode = '邀请码(必填)'
      }
      console.log(res)
    }

  },

  created(){//进入页面便执行
    this.ChatSettingQuery()
  }
}
</script>
<style lang="stylus" scoped>
.box{
  width:100%;
  height 100%;
  background-color:#fff;
  position fixed
}
.van-ellipsis{
	font-size 1rem
	font-weight bold
}
.box >>> .van-nav-bar__text {
	color #000000
	font-size 1rem
	font-weight bold
}

.box >>> .van-icon-arrow-left{
	font-size 1rem
	color #000000
}
.topbar >>> .van-nav-bar {
  height: 44px;
  margin-bottom: 40px;
  background-color #15a0e7

}
.topbar >>> .van-nav-bar__title{
  height:44px;
  line-height 44px
  color:#fff
}
.topbar >>> .van-nav-bar .van-icon {
  color:#fff
}
.textarea >>> .van-field {
  width: 350px;
  margin:15px auto;
}
.textarea >>> .van-button {
  background-color: #15a0e7;
  border:none;

}

.register >>> .van-button{
  display: block;
  margin: 30px auto;
  width: 300px;
  background-color: #15a0e7;
  color:#fff
}
</style>
