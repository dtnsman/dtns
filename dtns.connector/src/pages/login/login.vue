<template>
  <div class="box">
      <van-nav-bar right-text="注册" @click-right="register" />
    <div class="logo" style="text-align: left; padding-left:15px; margin-top:20px; font-size:24px;">
      欢迎登录
    </div>
    <!-- <div class="textarea"> -->
      <van-field placeholder="输入手机号" size="large" v-model="phone" style="padding-top:40px; width:100%;" />
      <van-field placeholder="输入密码" size="large" v-model="pwd" type="password" style="padding-top:20px; width:100%;" />
    <!-- </div> -->
    <div style="font-size:14px; padding:5px 15px 5px 15px;">
      <!-- <p style="float: left;" @click="phonelogin">手机号快捷登录</p> -->
      <p style="float: right;" @click="forgetpwd">忘记密码</p>
    </div>
    <div style="text-align:center;">
      <van-button type="primary" @click="login" style="width:95%; border-radius:5px; font-size:16px; background-color:#15a0e7; margin-top:15px; border:none;">登录</van-button>
      <van-button  @click="change" style="width:95%; border-radius:5px; font-size:16px;  margin-top:15px; border:none;">切换</van-button>
    </div>
  </div>
</template>

<script>
import { Field, NavBar, Button, Cell } from "vant";
export default {
  data() {
    return {
      phone: "",
      pwd: ""
    };
  },
  methods: {
    phonelogin(){
      console.log("ddddddddddddddddd")
      this.$router.push("/phoneLogi");
      
    },
    register() {
      this.$router.push("/register");
    },
    change(){
      this.$router.push("/changeSvrNode");
    },
    async login() {
      if(this.phone==""){this.$toast("请输入手机号",1000);return;}
      if(this.pwd==""){this.$toast("请输入密码",1000);return;}
      if (this.phone !== "" || this.pwd !== "") {
        this.pwd = this.$md5(this.pwd);
        let random = Math.random();
        let info = {
          phone : this.phone,
          pwd : this.pwd,
          random : random
        }
        let res =  await this.$api.network.userLoginByPwdUrl(info)
          .then(res => {
            console.log(res);
            if (res.ret == true) {
              // alert("登陆成功");
              // console.log(res.data.user_id)
              // console.log(res.data.s_id)
              // console.log(res);
              localStorage.setItem("s_id", res.s_id);
              localStorage.setItem("user_id", res.user_id);
              localStorage.setItem("userInfo",JSON.stringify(res))
              this.$toast.success("登录成功",1000);
              // console.log(s_id);
              this.$router.push("/index");
            } else {
             this.$toast("您输入的用户名或密码有误",20000);
            }
          });
      }
    },
    forgetpwd() {
      this.$router.push("/checking");
    }
  }
};
</script>
<style lang="stylus" scoped>
.box {
  width:100%;
  height 100%;
  background-color:#fff;
  position fixed
}
.box >>> .van-nav-bar__text{
  color #000
  font-size 15px
}

* {
  touch-action: pan-y;
}

.textarea >>> .van-cell {
  width: 350px;
  margin:30px auto;
}

.submit >>> .van-button {
  display: block;
  margin: 0 auto;
  background-color: #15a0e7;
  border:none;

}
.logo {
  text-align center;
  font-size:20px;
}
.info >>> .van-cell{
  background-color:#f5f5f5;
}
</style>
