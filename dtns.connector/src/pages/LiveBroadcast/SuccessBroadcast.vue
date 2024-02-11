<template>
    <div class="box">
      <header class="topbar" style="border-bottom:1px solid #eee; height:46px; position:fixed; top:0; background-color:#fff; margin:0 auto; align:center; z-index:99999;">
        <div style="margin:0 auto;height:46px;" align="center">
          <span style="font-size:16px; line-height:43px;margin-right:2px;">开直播间(成功)</span>
        </div>
        <div @click="back" style="position:absolute; top:14px; left:15px;">
          <van-icon style="font-size:17px;" name="arrow-left" />
        </div>
     </header>
     <div style="margin-top:60px;font-size:13px;text-align:center;">
       <div>恭喜你!</div>
       <div style="margin-top:4px;">成功开通了“{{chatname}}”直播间!</div>
     </div>
     <div style="font-size:16px;width:100%;">
       <div @click="ConfigureLive" style="width:90%;height:70px;background-color:#12adf5;border-radius:5px;margin:0 auto;margin-top:20px;text-align:center;line-height:70px;color:#fff;cursor:pointer;">1-配置直播间</div>
       <div @click="joinS" class="SetUp">2-直播间拉人</div>
       <div @click="RevisionMember" class="SetUp">3-设置群权限</div>
       <div @click="Administratorss" class="SetUp">4-设置群管理</div>
       <div @click="GroupSharing" class="SetUp">5-分享直播间</div>
     </div>
     <div @click="turnBroad" style="text-align:center;margin-top:20px;color:#12adf5;cursor:pointer;">返回直播间</div>
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
    export default {
        data(){
            return{
              chatname:'',
            }
        },
        methods: {
            ConfigureLive(){//跳转直播间配置
              this.$router.push(`/LiveBroadcast/ConfigureLive/${this.$route.params.chatid}`)
            },

            joinS(){//邀请好友加入群聊
                this.$router.push(`/index/joinChat/${this.$route.params.chatid}`)
              },

            GroupSharing(chatid){//跳转群分享页面
              this.$router.push(`/index/GroupSharing/${this.$route.params.chatid}`)
            },

            RevisionMember(chatid){//跳转设置群权限
                this.$router.push(`/index/GroupInformation/MembershipLevel/${this.$route.params.chatid}`)
            },///

            Administratorss(chatid){//跳转设置群管理页面
              this.$router.push(`/index/GroupInformation/Administrators/${this.$route.params.chatid}`)
            },///

            back() {//返回首页
              this.$router.go(-1)
            },///

            turnBroad(){//返回直播间
              this.$router.push(`/index/chat/${this.$route.params.chatid}`)
            },

            async Administration(){//查看直播间信息
              let users = {
                      user_id:localStorage.user_id,
                      s_id:localStorage.s_id,   
                      chatid:this.$route.params.chatid,
                    }
              let ress =  await this.$api.network.ChatInfo(users)//群信息
              console.log(ress)
              this.chatname = ress.chatname
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
.box >>> .van-icon{
  font-size:15px;
}
.SetUp {
  width:90%;height:70px;background-color:#fff;border-radius:5px;margin:0 auto;margin-top:20px;text-align:center;line-height:70px;cursor:pointer;
}
</style>
