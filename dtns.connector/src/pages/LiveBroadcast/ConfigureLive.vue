<template>
    <div class="box">
      <header class="topbar" style="border-bottom:1px solid #eee; height:46px; position:fixed; top:0; background-color:#fff; margin:0 auto; align:center; z-index:99999;">
        <div style="margin:0 auto;height:46px;" align="center">
          <span style="font-size:16px; line-height:43px;margin-right:2px;">配置直播间</span>
          <svg style="width:17px;height:17px;top:14px; position:absolute; margin-left:2px;" t="1589772060484" class="icon" viewBox="0 0 1451 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2816" width="20" height="20"><path d="M911.266055 93.944954a93.944954 93.944954 0 0 0-93.944954-93.944954H93.944954a93.944954 93.944954 0 0 0-93.944954 93.944954v836.110092a93.944954 93.944954 0 0 0 93.944954 93.944954h723.376147a93.944954 93.944954 0 0 0 93.944954-93.944954V352.293578zM1427.963303 84.550459a42.275229 42.275229 0 0 0-46.972477 0l-403.963303 230.165137v394.568808l403.963303 234.862385h46.972477a56.366972 56.366972 0 0 0 23.486238-42.275229V122.12844a46.972477 46.972477 0 0 0-23.486238-37.577981z" fill="#12adf5" p-id="2817"></path></svg>
        </div>
        <div @click="back" style="position:absolute; top:14px; left:15px;">
          <van-icon style="font-size:17px;" name="arrow-left" />
        </div>
     </header>
      <div style="width:100%;box-sizing:border-box;
  padding:0 15px">
        <div style="width:100%;height:205px;background;background-color:#fff;margin-top:62px;border-radius:5px;">
          <div style="padding-top:10px;padding-left:10px;">直播间-推流网址 :</div>
          <div style="width:90%;border:1px solid #aaa;margin:auto;margin-top:10px;border-radius:5px;padding:10px;text-align: justify;text-justify: newspaper;word-break: break-all;">
            {{website}}
          </div>
          <div style="margin-top:12px;text-align:center;">
            <van-button class="InvitationCode_right" @click="copy" :data-clipboard-text="website" style="width:120px;height:35px;font-size:12px;background-color:#12adf5;border-radius:5px;color:#fff;margin-right:10px;line-height:35px;">复制推流地址</van-button>
            <van-button @click="DownloadStreaming" style="width:120px;height:35px;font-size:12px;background-color:#12adf5;border-radius:5px;color:#fff;margin-left:10px;line-height:35px;">下载推流工具</van-button>
          </div>
        </div>
      </div>
       <div style="width:100%;box-sizing:border-box;
  padding:0 15px">
        <div style="width:100%;background;background-color:#fff;margin-top:10px;border-radius:5px;">
          <div style="padding-top:10px;padding-left:10px;">直播小店 :</div>
           <div v-for="(item,index) in shoplist" :key="index">
              <div style="margin-top:10px">
                  <van-card
                   :centered="true"
                  
                    :thumb="img+item.shop_img"
                  >
                  <template slot="price">
                     <div style="font-size:12px;padding:2px 0">
                        {{item.shop_desc}}
                     </div>
                  </template>
                  <template slot="title">
                     <div style="font-size:14px;padding:2px 0">
                       {{item.shop_name}}
                     </div>
                  </template>
                  </van-card>
              </div>
              <div style="display:flex;justify-content:flex-end">
                  <van-button v-if="item.status == 0" @click="getbindShop(item.shop_id)" color="#F00945" style="margin:10px;border-radius:5px ">绑定</van-button>
                  <van-button v-else-if="item.status == 1" disabled @click="getbindShop(item.shop_id)" color="#F00945" style="margin:10px;border-radius:5px ">已绑定</van-button>
                  <van-button v-else disabled @click="getbindShop(item.shop_id)" color="#F00945" style="margin:10px;border-radius:5px ">绑定</van-button>
                  <van-button @click="delbindShop(item.shop_id)" color="#12ADF5" style="margin:10px;border-radius:5px">解绑</van-button>
              </div>
           </div>
        </div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
import Clipboard from 'clipboard';
    export default {
        data(){
            return{
              chatname:'',
              website:'http://hl.opencom.cn/',
              shoplist:[],
              img:'',
              shopid:'',
              chatInfo:{},
            }
        },
        methods: {
            back() {//返回首页
              this.$router.go(-1)
            },///

            copy() {  //点击复制
              var clipboard = new Clipboard('.InvitationCode_right')  
              clipboard.on('success', e => {  
                vant.Toast.success("复制成功");//这里你如果引入了elementui的提示就可以用，没有就注释即可
                      // 释放内存  
                      clipboard.destroy()  
                    })  
            },///

            DownloadStreaming(){//点击跳转下载推流工具页面
              this.$router.push('/LiveBroadcast/DownloadStreaming')
            },
            async Administration(){//查看群信息
              let users = {
                      user_id:localStorage.user_id,
                      s_id:localStorage.s_id,   
                      chatid:this.$route.params.chatid,
                    }
              let ress =  await this.$api.network.ChatInfo(users)//群信息
              this.website = ress.live_rtmp_url
              console.log(ress)
              this.chatInfo = ress
              },
              async upgetShopList(){
                let params = {
                   user_id:localStorage.user_id,
                   s_id:localStorage.s_id,
                  //  begin:'1',
                  //  len:'100',
                }
                let res =  await this.$api.network.getShopList(params)//小店列表
                console.log(res)
                // this.shoplist = res.shoplist
                let shoplist = res.shoplist
                let chatInfo = this.chatInfo
                let goodlist = []
                this.img = this.$img
                if('shop_id' in chatInfo){
                  for(var i=0;i<shoplist.length;i++){
                    let shopid = chatInfo.shop_id
                    let shop_id = shoplist[i].shop_id
                    let list = shoplist[i]
                    if(shopid === shoplist[i].shop_id){
                      list['status'] = 1
                      goodlist.push(list)
                    }else{
                      list['status'] = 3
                      goodlist.push(list)
                    }
                  }
                }else{
                  shoplist.forEach(item => {
                    item.status = 0
                  })
                }
                this.shoplist = shoplist
                console.log(this.shoplist)
              },
              async getbindShop(shopid){
                let chat_shopidaa = 'msg_' + shopid.split('_')[1]
                console.log(shopid)
                let params = {
                   user_id:localStorage.user_id,
                   s_id:localStorage.s_id,
                   chatid:this.$route.params.chatid,
                   chat_shopid:chat_shopidaa
                }
                let res =  await this.$api.network.getbindShop(params)
                console.log(res)
                if(res.ret){
                  this.$toast.success('绑定小店成功')
                  this.upgetShopList()
                  this.Administration();
                }else{
                  this.$toast.fail('绑定小店失败')
                }
                
              },
              async delbindShop(shopid){
                let chat_shopidaa = 'msg_' + shopid.split('_')[1]
                console.log(shopid)
                let params = {
                   user_id:localStorage.user_id,
                   s_id:localStorage.s_id,
                   chatid:this.$route.params.chatid,
                   chat_shopid:chat_shopidaa
                }
                let res =  await this.$api.network.delboundShop(params)
                console.log(res)
                if(res.ret){
                  this.$toast.success('解绑小店成功')
                  this.upgetShopList()
                  this.Administration();
                }else{
                  this.$toast.fail('解绑小店失败')
                }
              }
        },
        created(){
          this.Administration();
          this.upgetShopList();
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
  // position fixed
  // margin-top 46px
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
