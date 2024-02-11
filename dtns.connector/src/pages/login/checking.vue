<template>
  <div class="box">
    <div class="topbar">
      <van-nav-bar title="找回密码" left-arrow @click-left="back"/>
    </div>
    <div class="content">
      <van-field style="width:100%;" placeholder="输入手机号码" v-model="phone" />
      <van-field center clearable placeholder="输入短信验证码" v-model="code" style="width: 100%;">
        <van-button slot="button" size="small" type="primary" @click="getCode">{{ btnText }}</van-button>
      </van-field>
      <van-field style="width:100%; margin-top:15px;" placeholder="输入密码" v-model="pwd" type="password" />
      <van-field style="width:100%; margin-top:15px;" placeholder="确认密码" v-model="confirm_pwd" type="password" />
      <van-cell title="" value="" style="padding: 0; margin: 0;" />
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
      if (
        this.phone != "" &&
        this.code != "" &&
        this.pwd != "" &&
        this.confirm_pwd != ""
      ) {
        if (this.pwd !== this.confirm_pwd) {
          this.$toast("您两次输入的密码不一致呢",1000);return;
        }
        this.pwd = this.$md5(this.pwd);
        let random = Math.random();
        let info = {
          pwd:this.pwd,
          sms_code:this.code,
          phone:this.phone,
          random:random
        }
        let res =  await this.$api.network.changePassword(info)
        // let res=await this.$axios.get("/user/modify_user_pwd_sms?phone=" +
        //       this.phone +
        //       "&pwd=" +
        //       this.pwd +
        //       "&random=" +
        //       random +
        //       "&sms_code=" +
        //       this.code
        //   )
          .then(res => {
            if(res.ret){
              this.$toast.success("修改成功",1000);
              this.$router.push('/');
            }else{
              this.$toast.fail("修改失败" + res.msg)
            }
          });
      }
    },
    async getCode() {
      if(this.phone==''){this.$toast("请输入手机号",1000);return;}
      let random = Math.random();
      let info = {
        // nation_code:86,
        phone:this.phone,
        random:random
      }
      let res =  await this.$api.network.sendSms(info)
      if(res.ret){
        this.$toast.success("发送成功",1000);
        this.getSecond(60);
      }else if(res.msg == "send sms failed")
      {
        this.$toast.fail('验证码获取失败,请重新尝试')
      }else{
        this.$toast.fail("发送失败" + res.msg);
      }
      
      // this.$axios
      //   .get("/user/send_sms?phone=" +
      //       this.phone +
      //       "&nation_code=86&random=" +
      //       random +
      //       ""
      //   )
        // .then(res => {
        //   console.log(res);
        // });
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
  width: 300px;
  background-color: #15a0e7;
  border:none;

}
</style>
