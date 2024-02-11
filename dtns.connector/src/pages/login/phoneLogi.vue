<template>
  <div class="box">
    <div class="topbar">
      <van-nav-bar title="手机快捷登录" right-text="密码登录" left-arrow @click-left="back"/>
    </div>
    <div class="content">
      <van-field style="width:100%;" placeholder="输入手机号码" v-model="phone" />
      <van-field center clearable placeholder="输入短信验证码" v-model="code" style="width: 100%;">
        <van-button slot="button" size="small" type="primary" @click="getCode">{{ btnText }}</van-button>
      </van-field>
      <!-- <van-field style="width:100%; margin-top:15px;" placeholder="输入密码" v-model="pwd" type="password" />
      <van-field style="width:100%; margin-top:15px;" placeholder="确认密码" v-model="confirm_pwd" type="password" /> -->
      <van-cell title="" value="" style="padding: 0; margin: 0;" />
      <div style="margin-top:10px; padding-left:15px;">
          <div style="color:#333; font-size:12px;">
              温馨提示 : 未注册**账号的手机账号，登录时自动注册
          </div>
      </div>
    </div>
    <div class="reset">
      <van-button style="width: 95%; border-radius:5px; font-size:16px;" type="primary" size="normal" @click="resetpwd">确认</van-button>
    </div>
  </div>
</template>
<script>
import { NavBar, Field, Button } from "vant";
export default {
  data() {
    return {
      phone: "",
      code: "",
      pwd: "",
      confirm_pwd: "",
      btnText: "获取验证码",
      btnDisabled: false
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button
  },
  methods: {
    back(){
      this.$router.go(-1);
    },
    async resetpwd() {
        let random = Math.random();
        let info = {
          pwd:this.pwd,
          sms_code:this.code,
          phone:this.phone,
          random:random,
          nation_code:86
        }
        let res =  await this.$api.network.userLoginSms(info)
        if(res.ret){
              localStorage.setItem("s_id", res.s_id);
              localStorage.setItem("user_id", res.user_id);
              localStorage.setItem("userInfo",JSON.stringify(res))
              this.$toast.success("登录成功",1000);
              // console.log(s_id);
              this.$router.push("/index");
            } else {
             this.$toast.fail("登录失败" + res.msg);
            }
    },
    async getCode() {
      if (this.btnDisabled) {
        return;
      }
      let random = Math.random();
      if(this.phone==''){this.$toast("请输入手机号",1000);return;}
      let info = {
        nation_code:86,
        phone:this.phone,
        random:random
      }
      let res =  await this.$api.network.sendSms(info)
      if(res.ret){
        this.getSecond(60);
        this.$toast.success('发送成功')
      }else{
        this.$toast.fail('发送失败' + res.msg)
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
    }
  }
};
</script>
<style lang="stylus" scoped>
.box{
  width:100%;
  height 100%;
  background-color:#fff;
  position fixed
}
.box >>> .van-nav-bar__title,.van-nav-bar__text {
    font-size 1rem
    font-weight bold
    color #222
}
.topbar[data-v-4f639d78] .van-nav-bar{
  background-color #fff
}
* {
  touch-action: pan-y;
}
.van-icon-arrow-left::before {
	color #000000
	font-size 1.1rem
}
.topbar[data-v-d75781d2] .van-nav-bar__title {
	color #000000
	font-size 1rem
	font-weight bold
}
.topbar[data-v-d75781d2] .van-nav-bar {
	background-color #fff
}
body{
  background-color :#fff;
}

.topbar >>> .van-nav-bar .van-icon {
  color:#000
}
.topbar >>> .van-nav-bar__title{
  height:44px;
  line-height 44px
  color:#000
}

.content >>> .van-cell {
  width: 350px;
  margin: 10px auto;
}

.content >>> .van-button {
  background-color: #15a0e7;
  border:none;
}

.reset >>> .van-button {
  display: block;
  margin: 30px auto;
  background-color: #15a0e7;
  border:none;

}
</style>
