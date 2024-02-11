<template>
<!--可复用的相册组件 这里只完成静态页面 不涉及数据-->
    <div class="box">
        <van-nav-bar
            title="绑定邮箱"
            left-arrow
            @click-left="onClickLeft"
            />
        <div style="width:100%;background-color:#fff;">
            <div style="font-size:15px; padding-top:20px; padding-left:15px;">
                绑定邮箱地址
            </div>
            <van-field v-model="text_code" label="安全邮箱 :" style="margin-top:10px;">
                <!-- <van-button style="background-color:#12adf5; border-radius:4px; color:#fff; font-size:12px;" slot="button" size="small" @click="getCode">{{ btnText }}</van-button> -->
            </van-field>
            <van-field v-model="phone" label="手机号码 :">
                <van-button style="background-color:#12adf5; border-radius:4px; color:#fff; font-size:12px;" slot="button" size="small" @click="getCode">{{ btnText }}</van-button>
            </van-field>
            <van-field v-model="text" label="手机验证 :" />
            <van-field v-model="emails" label="邮箱验证 :" />
            <div class="reset" style="padding-bottom:1px;">
             <van-button style="width: 85%; border-radius:5px; font-size:16px; height:41px;" type="primary" size="normal" @click="email">绑定邮箱</van-button>
            </div>
        </div>
        
    </div>
</template>
<script>
    export default {
     data() {
            return {
               show:false,
               text:'',
               phone:'',
               emails:'',
               btnText:'获取验证码',
               text_code:''
            }
        },
    methods:{
        onClickLeft(){//返回上一层
            this.$router.push('/user');
        },
        async getCode(){//获取验证码
            if(this.text_code == '')
            {
                this.$toast.fail('请输入邮箱')
                return
            }else if(this.phone == '')
            {
                this.$toast.fail('请输入手机号码')
            }
            let random = Math.random()
            let user = {
                user_id:localStorage.user_id,
                s_id:localStorage.s_id,
                email:this.text_code, 
                random:random,
                sign:this.phone
                }
            let res =  await this.$api.network. ChatUserSend_code(user)
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
            },
        async email(){//绑定邮箱
            if(this.text_code == '')
            {
                this.$toast.fail('请输入邮箱')
                return
            }else if(this.phone == '')
            {
                this.$toast.fail('请输入手机号码')
            }else if(this.text == '')
            {
                this.$toast.fail('请输入手机验证码')
            }else
            {
                this.$toast.fail('请输入邮箱验证码')
            }
            let random = Math.random()
            let user = {
                user_id:localStorage.user_id,
                s_id:localStorage.s_id,
                email:this.text_code, 
                email_code:this.emails,
                code:this.text,
                random:random,
                }
            let res =  await this.$api.network.ChatUserEmail(user)
            if(res.ret)
                {
                    this.$toast.success('绑定成功')
                }else
                {
                    this.$toast.fail('绑定失败' + res.msg)
                }
        },
    created(){//进入页面就执行
      },
    }
}
</script>
<style lang="stylus" scoped>
*{
    box-sizing border-box
}
.reset >>> .van-button {
  display: block;
  margin: 30px auto;
  background-color: #15a0e7;
  border:none;

}
.box {
    width 100%;
    height 100%;
    position fixed;
    background-color:#f5f5f5;
}
.box >>> .van-nav-bar .van-icon{
    color:#000
    font-size 1.05rem
}
.van-divider{
    padding 0;
    margin 0;
    border-bottom-width 5px;
}
</style>