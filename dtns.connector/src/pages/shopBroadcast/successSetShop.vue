<template>
    <div class="box">
      <header class="topbar" style="border-bottom:1px solid #eee; height:46px; position:fixed; top:0; background-color:#fff; margin:0 auto; align:center; z-index:99999;">
        <div style="margin:0 auto;height:46px;" align="center">
          <span style="font-size:16px; line-height:43px;margin-right:2px;">开通小店(成功)</span>
        </div>
        <div @click="back" style="position:absolute; top:14px; left:15px;">
          <van-icon style="font-size:17px;" name="arrow-left" />
        </div>
     </header>
     <div style="margin-top:60px;font-size:13px;text-align:center;">
       <div>恭喜你!</div>
       <div style="margin-top:4px;">成功开通了“{{chatname}}”小店!</div>
     </div>
     <div style="font-size:16px;width:100%;">
       <div @click="issueProduct"  class="SetUp">1-发布产品</div>
       <div @click="productStore" class="SetUp">2-产品库</div>
       <div @click="orderList" class="SetUp">3-订单管理</div>
       <div @click="adminSet" class="SetUp">4-设置管理员</div>
       <div @click="shareShop" class="SetUp">5-分享小店</div>
     </div>
     <div @click="turnBroad" style="text-align:center;margin-top:20px;color:#333333;font-size:14px;cursor:pointer;">返回小店</div>
     <!-- <div @click="deleteShop" style="text-align:center;margin-top:20px;color:#333333;font-size:14px;cursor:pointer;">删除小店</div> -->
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
    export default {
        data(){
            return{
              chatname:'',
              shop_id: ''
            }
        },
        methods: {
            issueProduct(){//跳转发布产品页面
              this.$router.push(`/shopBroadcast/issueProduct/${this.shop_id}/${this.$route.params.chatid}`)
            },

            productStore(){//产品库
                console.log(this.shop_id)
                console.log(this.$route.params.chatid)
                 this.$router.push(`/shopBroadcast/shopStore/${this.shop_id}/${this.$route.params.chatid}`)
              },

            orderList(chatid){//产品订单
              this.$router.push(`/shopBroadcast/shopOrder/${this.shop_id}`)
            },

            adminSet(chatid){//跳转设置管理员
                this.$router.push(`/index/GroupInformation/Administrators/${this.shop_id}`)
            },///

            shareShop(chatid){//跳转群分享页面
              this.$router.push(`/index/GroupSharing/${this.shop_id}`)
            },///
            turnBroad(){//返回小店直播间
              this.$router.push(`/LiveBroadcast/videoChat/${this.$route.params.chatid}`)
            },
             back() {//返回首页
              this.$router.go(-1)
            },///

            async Administration(){//查看直播间信息
              let users = {
                      user_id:localStorage.user_id,
                      s_id:localStorage.s_id,   
                      chatid:this.$route.params.chatid,
                    }
              let ress =  await this.$api.network.ChatInfo(users)//群信息
              console.log(ress)
              this.chatname = ress.chatname
              this.shop_id = ress.shop_id
          },
          // async deleteShop(){//删除店铺
            // let users = {
            //     user_id:localStorage.user_id,
            //     s_id:localStorage.s_id,   
            //     obj_id:null,
            //   }
            // let ress =  await this.$api.network.deleteShop(users)
            // console.log(ress)
          //   this.$toast.fail('该功能还没有开放')
          // },
          // async queryShopInfo(){
          //   let users = {
          //       user_id:localStorage.user_id,
          //       s_id:localStorage.s_id,   
          //       shop_id:this.shop_id,
          //     }
          //   let ress =  await this.$api.network.queryShopInfo(users)
          //   console.log(ress)
          // }
         
        },
        created(){
            this.Administration()
            
        },
        mounted(){
          //这时候请求后端数据
          console.log(this.$uplaodImg)
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
.SetUp:active{
  background-color:#12ADF5;
  color:#fff;
}
</style>
