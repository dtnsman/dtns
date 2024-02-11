<template>
    <div class="box">
      <header class="topbar" style="border-bottom:1px solid #eee; height:46px; position:fixed; top:0; background-color:#fff; margin:0 auto; align:center; z-index:99999;">
        <van-nav-bar
          title="分享设置"
          left-arrow
          @click-left="back"
        />
     </header>
     <div style="margin-top:60px;width:100%;">
       <div style="width:95%;height:150px;background-color:#fff;margin-left:2.5%;border-radius:5px;">
         <div style="padding-top:10px; padding-left:10px;font-size:15px;">分享设置 :</div>
         <van-radio-group  v-model="radio" direction="horizontal" style="margin-top:20px;">
           <van-row style="width:100%;">
            <van-col @click="a" span="12"><van-radio label-position="left" name="0" style="padding-left:10px;">群成员可见</van-radio></van-col>
            <van-col @click="a" span="12"><van-radio label-position="left" name="1" >公开可见</van-radio></van-col>
          </van-row>
          </van-radio-group>
          <div style="text-align:left;padding-left:10px;">
            <van-button @click="confirm" style="background-color:#12adf5;border-radius:5px;color:#fff;height:40px;width:120px;margin-top:20px;line-height:38px;">确认修改</van-button>
          </div>
       </div>
       
     </div>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
import Vue from 'vue';
import Vant from 'vant';
    export default {
        data(){
            return{
               radio:'1',
            }
        },
        methods: {
          a(){
            console.log(this.radio)
          },
            back() {//返回上一层
              this.$router.go(-1)
            },///

            async confirm(){//修改群分享权限
              if(this.radio == ''){return this.$toast.fail('请选择分享类型')}
              let random = Math.random()
              let user = {
                user_id:localStorage.user_id,
                s_id:localStorage.s_id,
                chatid:this.$route.params.chatid,
                random:random,
                share_pm:this.radio,
              }
              let res =  await this.$api.network.ChatModShare_pm(user)
              console.log(res)
              if(res.ret){
                this.$toast.success('设置成功')
                this.$router.go(-2)
              }else{
                this.$toast.fail('失败' +res.msg)
              }
            },

            async Administration(){//查看群信息
              let users = {
                      user_id:localStorage.user_id,
                      s_id:localStorage.s_id,   
                      chatid:this.$route.params.chatid,
                    }
              let ress =  await this.$api.network.ChatInfo(users)//群信息
              console.log(ress)
              this.radio = '' + ress.share_pm
              console.log(this.radio)
          },
        },
        created(){
         this.Administration()
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
