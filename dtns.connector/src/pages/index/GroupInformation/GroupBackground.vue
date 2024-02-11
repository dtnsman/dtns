<template>
    <div class="box">
      <header class="topbar" style="border-bottom:1px solid #eee; height:46px; position:fixed; top:0; background-color:#fff; margin:0 auto; align:center; z-index:99999;">
        <div style="margin:0 auto;height:46px;" align="center">
          <span style="font-size:16px; line-height:43px;margin-right:2px;">设置群背景</span>
        </div>
        <div @click="back" style="position:absolute; top:14px; left:15px;">
          <van-icon style="font-size:17px;" name="arrow-left" />
        </div>
     </header>
     <div style="width:100%;margin-top:66px;">
       <div style="width:90%;margin:auto;background-color:#fff;height:220px;border-radius:5px;">
       <div style="background-color:#fff;text-align:center;float:left;width:100%;">
       <van-uploader :after-read="afterRead" accept="image/*">
         <img v-if="url !== ''" :src="url" alt="" style="width:98px; height:120px;border-radius:5px;margin:0 auto;margin-top:20px;background-color:#f5f5f5;line-height:120px;font-size:14px;">
         <div v-if="url == ''" style="width:98px; height:120px;border-radius:5px;margin:0 auto;margin-top:20px;background-color:#f5f5f5;line-height:120px;font-size:14px;">上传背景图</div>
       </van-uploader>
        </div>
        <div style="width:100%;float:left;margin-top:15px;">
          <van-button @click="CreateLive" style="font-size:15px;background-color:#12adf5;width:100px;margin:0 auto;color:#fff;border-radius:5px;height:40px;line-height:35px;" block>确认修改</van-button>
        </div>
      </div>
     </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
    export default {
        data(){
            return{
               value:'',
               url:'',
               backgroup_img:''
            }
        },
        methods: {
            back() {//返回上一层
              this.$router.go(-1)
            },///

            async CreateLive(){//修改群背景
            if(this.backgroup_img == ''){return this.$toast.fail('请上传背景图片')};
            let data = JSON.parse(localStorage.getItem('userInfo'));
            let random = Math.random()
                  let user = {
                    user_id:data.user_id,
                    s_id:data.s_id,
                    chatid:this.$route.params.chatid,
                    backgroup_img:this.backgroup_img,
                    random:random
                  }
            let res =  await this.$api.network.ChatBackground(user)
            if(res.ret){
              this.$toast.success('修改成功')
              this.$router.push('/index')
            }else{
              this.$toast.fail('修改失败' + res.msg)
            }
            console.log(res)
          },///

          async afterRead(data) {//上传背景图片
            let This = this
            let random = Math.random();
            let img_kind = data.file;
            // console.log(img_kind);
            // let formData = new FormData();
            // formData.append("user_id",localStorage.user_id);
            // formData.append("s_id", localStorage.s_id);
            // formData.append("random", random);
            // formData.append("img_kind", "open");
            // formData.append("file", img_kind);
            // let config = {
            //   headers: {
            //     enctype: "multipart/form-data"
            //   }
            // };
            // let res = await this.$axios.post(`${this.$baseUrl}/image/upload`, formData, config)
            // console.log(res)
            // this.filename = res.data.filename/////////////
            // let img_p = "min1000";//头像
            // let txurl = `${this.$baseUrl}/image/view?user_id=`+localStorage.user_id+'&s_id='+localStorage.s_id+'&filename='+this.filename+'&img_kind='+'open'+'&img_p='+img_p;
            let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:data.file.name,
                                mimetype:data.file.type,filename:data.file.name,path:'file-path',
                                size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
                                img_kind:'open',random,
                                data:data.file}
            let res = await new Promise((resolve)=>{
              rpc_client.sendImage(fileInfo,function(udata){
                  console.log('sendFile-callback-data:'+JSON.stringify(udata))
                  resolve(udata)
              })
            })
            console.log('upload-file-ret:'+JSON.stringify(res))
            if(!res.data.ret){
              this.$toast.fail('上传失败' +res.data.msg,3000)
            }
            
            // this.url = //txurl
            let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:res.data.filename,img_kind:'open'}//,img_p:'min200'}
            let xdata = await this.$api.network.getImg(params)
            This.url  ='data:image/png;base64,'+xdata.data
            imageDb.addData({img_id:res.data.filename,data:This.url })
            this.backgroup_img = res.data.filename
              //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
            
            // This.$api.network.getImg(params).then((data)=>{
            //   This.url ='data:image/png;base64,'+data.data//'+data.fileInfol.fmt+'
            //   localStorage.setItem('img-'+img_id,This.url)
            // }).catch((err)=>console.log('load img error',err))
          
            },

            async Administration(){//查看群信息
              let users = {
                      user_id:localStorage.user_id,
                      s_id:localStorage.s_id,   
                      chatid:this.$route.params.chatid,
                    }
              let ress =  await this.$api.network.ChatInfo(users)//群信息
              console.log(ress)
              if(ress.backgroup_img ==null || ress.backgroup_img == undefined || ress.backgroup_img == ''){
                return;
              }else{
                this.url = `${this.$baseUrl}/image/view?user_id=`+ress.create_user_id+'&filename='+ress.backgroup_img+'&img_kind='+'open'+'&img_p='+'min1000'
                console.log(this.url)
              }
              
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
</style>
