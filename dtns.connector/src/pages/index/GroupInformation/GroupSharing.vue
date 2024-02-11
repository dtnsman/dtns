<template>
    <div class="box">
      <header class="topbar" style="border-bottom:1px solid #eee; height:46px; position:fixed; top:0; background-color:#fff; margin:0 auto; align:center; z-index:99999;">
        <van-nav-bar
          title="群分享"
          right-text="设置"
          left-arrow
          @click-left="back"
          @click-right="onClickRight"
        />
     </header>
     <div style="margin-top:60px;">
       <div style="text-align:center;width:100%; height:213px;margin:0 auto;background-color:#fff;">
         <img :src="url" alt="" height="165px" width="165px" style="margin-top:24px;">
       </div>
       <div v-if="chat_type == 'group_live'" style="margin-top:10px; width:100%; height:210px;background-color:#fff;">
         <div style="font-size:16px;padding-top:10px;padding-left:15px;">群链接 :</div>
         <div style="margin:10px;border:1px solid #bbb;padding:10px;text-align: justify;text-justify: newspaper;word-break: break-all;">{{live_rtmp_url}}</div>
         <div style="text-align:center;padding-top:2px;">
           <button class="InvitationCode_right" @click="copy" :data-clipboard-text="live_rtmp_url" style="width:100px; height:28px; font-size:13px; color:#fff;border-radius:4px;border:none;line-height:22px;background-color:#12adf5">复制分享网址</button>
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
               value:'',
               url:'',
               backgroup_img:'',
               live_rtmp_url:'',
               chat_type:''
            }
        },
        methods: {
            back() {//返回上一层
              this.$router.go(-1)
            },///

            onClickRight(){//跳转群分享设置页面
              this.$router.push(`/index/SetUpGroupSharing/${this.$route.params.chatid}`)
            
            },

           async Qrcode(){//通过聊天id生成二维码
              let random = Math.random()
              // this.url = `${this.$baseUrl}/qrcode/draw?data=`+this.$route.params.chatid+'&random='+random
              
              let img_id = this.$route.params.chatid,This = this
              let item = await imageDb.getDataByKey('qrcode-'+img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
              let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open',qrcode:'yes'}//,img_p:'min200'} 
              this.url = item ? item.data : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
              if(!item) 
              {
                // This.$api.network.getImg(params).then((data)=>{
                //   This.url  ='data:image/png;base64,'+data.data
                //   imageDb.addData({img_id:'qrcode-'+img_id,data:This.url })
                // }).catch((ex)=>{
                //   console.log('load img error',ex)
                // })
                QRCode.toDataURL(img_id)
                  .then(url => {
                    //console.log(url)
                    This.url = url
                    imageDb.addData({img_id:'qrcode-'+img_id,data:This.url })
                  })
                  .catch(err => {
                    console.error(err)
                  })
              }
                //l
            },///

            copy() {  //复制
              var clipboard = new Clipboard('.InvitationCode_right')  
              clipboard.on('success', e => {  
                vant.Toast.success("复制成功");//这里你如果引入了elementui的提示就可以用，没有就注释即可
                      // 释放内存  
                      clipboard.destroy()  
                    })  
            },///

            async Administration(){//查看群信息
              let users = {
                      user_id:localStorage.user_id,
                      s_id:localStorage.s_id,   
                      chatid:this.$route.params.chatid,
                    }
              let ress =  await this.$api.network.ChatInfo(users)//群信息
              this.live_rtmp_url = ress.chat_share_url
              this.chat_type = ress.chat_type
              console.log(ress)
              },
        },
        created(){
          this.Administration()
          this.Qrcode()
            // this.userInfo = JSON.parse(localStorage.userInfo);
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
