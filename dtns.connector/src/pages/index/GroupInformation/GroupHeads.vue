<template>
  <!--个人信息组件-->
  <div class="box" style="width:100%; height:100%; background-color:#f5f5f5; position:fixed;">
    <div style="background-color:#fff;">
      <van-nav-bar title="修改群头像" left-arrow @click-left="back" right-text="确认" @click-right="onClickRight" />
      <div class="logo">
        <div class="img">
          <img :src="url" alt="" />
        </div>
        <van-uploader :after-read="upload">
          <button size="small" style=" line-height: 0px; height: 28px; border-radius:3px; font-size:13px; background-color:#15a0e7; border:none; color: #fff;">上传新头像</button>
        </van-uploader>
      </div>
    <!-- <van-divider /> -->
     </div>
    </div>

</template>
<script>
export default {
   data() {
            return {
                url:''
            }
        },
  mounted() {
  },
  methods: {
    back(){
        this.$router.go(-1)
      },
    async upload(data) {//上传头像
      let random = Math.random();
      let img_kind = data.file;
      // // console.log(img_kind);
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
      console.log('upload-image-ret:'+JSON.stringify(res))
      if(!res.data.ret){
        this.$toast.fail('上传失败' +res.data.msg,3000)
      }
      console.log('upload-image:',res)
      this.filename = res.data.filename/////////////
      let img_p = "min1000";//头像
      // let txurl = await img//`${this.$baseUrl}/image/view?user_id=`+localStorage.user_id+'&s_id='+localStorage.s_id+'&filename='+this.filename+'&img_kind='+'open'+'&img_p='+img_p;
      // this.url = txurl
      let url =await imageDb.getDataByKey(this.filename)
      this.url = url ? url.data :'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='

      localStorage.setItem("chatlogo",this.url)
      },
    async onClickRight(){//确认修改群头像
        let user = {
          user_id:localStorage.user_id,
          s_id:localStorage.s_id,
          logo:this.filename,
          chatid:this.$route.params.chatid,
        }
        let ress =  await this.$api.network.ChatModLogo(user)
        console.log(ress)
        if(ress.ret){
          this.$toast.success('修改成功')
          this.$router.go(-1)
        }else{
          this.$toast.fail('修改失败' + ress.msg)
        }
    }
  },
  created(){//进入页面就执行
        let data = localStorage.chatlogo;
        this.url = data
        console.log(data)
      },
};
</script>

<style lang="stylus" scoped>
.box >>> .van-nav-bar__text {
  color:#111;
  font-size:16px;
}
.input {
  width:90%; 
  height:29px; padding-bottom:2px; padding-left:5px; border:1px solid #eeeeee; font-size:13px;
}
.logo[data-v-16247baa] .van-button__text{
  background-color rgb(21, 160, 231)
}
* {
  background-color: #fff;
  touch-action: pan-y;
}
.box >>> .van-divider{
  border-top-width 5px
}
.box >>> .van-nav-bar {
  height: 44px;
  background-color #fff
}
.logo[data-v-287f5d15]{
  margin-bottom 0
}

.topbar[data-v-287f5d15] .van-nav-bar__title {
  background-color #fff
}
.box >>> .van-nav-bar__arrow{
  color:#000
}
.logo {
  padding-bottom: 40px;
}

.logo .img {
  width: 81px;
  height: 81px;
  margin: 30px auto;
}

.logo img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius 50%
}

.logo >>> .van-uploader {
  width: 100%;
  display: flex;
  justify-content: center;
}

.logo >>> .van-button--primary {
  background-color: #07c160;
  color: #999;
  margin: 0 auto;
}

.logo >>> .van-button {
  margin: 0 auto;
}

.logo >>> .van-button__icon {
  background-color: #07c160;
  color: #fff;
}

.logo >>> .van-button__text {
  background-color: #07c160;
  color: #fff;
}

.hr >>> .van-divider {
  margin-bottom: 40px;
}

.change >>> .van-cell {
  border: 1px solid #eee;
  width: 300px;
  margin: 0 auto;
}

.change button {
  display: block;
  margin: 40px auto;
  background-color: #07c160;
  color: #fff;
  border: none;
  width: 100px;
  height: 40px;
}
.img{
  position:relative;
}
.img >>> p{
  position:absolute;
  top:30px;
  left:43px;
  font-size:22px;
  background-color :#f44
}
</style>
