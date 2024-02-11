<template>
  <!--个人信息组件-->
  <div class="box" style="width:100%; height:100%;position:fixed; background-color:#fff;">
    <div class="topbar">
      <van-nav-bar title="个人信息修改" left-arrow @click-left="back" />
    </div>
    <div class="logo">
      <div class="img">
        <img v-if="url" v-lzlogo="url" alt="" />
        <!-- <p v-if="show">{{ head }}</p> -->
      </div>

      <van-uploader :after-read="upload">
        <button size="small" style=" line-height: 0px; height: 28px; border-radius:3px; font-size:13px; background-color:#15a0e7; border:none; color: #fff;">上传新头像</button>
      </van-uploader>
    </div>
    <van-divider />
    <div class="change">
      <div style="text-align:center;">
        <span style="font-size: 14px;">修改昵称</span><br/><br/>
        <input text="text" placeholder="输入昵称" v-model="changetext" class="input" />
      </div>
      <button @click="confirm" style="width:85px; height:30px; font-size:13px; line-height:29px; background-color:#15a0e7; margin-top:20px; border-radius:3px;">保存</button>
    </div>
    <van-divider />
    <div class="change">
      <div style="text-align:center;">
        <span style="font-size: 14px;"> 查看信息 </span><br/><br/>
        <span style="font-size: 14px;">手机号：{{ phone }}</span><br/>
        <span style="font-size: 14px;">用户ID：{{ user_id }}</span><br/>
        <span style="font-size: 14px;">公钥：{{ public_key }}</span><br/>
        <span style="font-size: 14px;">手机Hash：{{ phoneHash }}</span><br/>
      </div>
     </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
export default {
   data() {
            return {
              filename:'',
              url: "",
              changetext: "",
              head:'',
              // show:true,
              arr:[],
              logo:'',
              user_id:'',
              public_key:'',
              phoneHash:'',
              phone:''
            }
        },
  mounted() {
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
   async upload(data) {//上传头像
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
      // let res =  await this.$api.network.OTCimg(formData)
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
      // console.log(res)
      this.filename = res.data.filename/////////////
      let img_p = "min1000";//头像
      // let txurl = `${this.$baseUrl}/image/view?user_id=`+localStorage.user_id+'&s_id='+localStorage.s_id+'&filename='+this.filename+'&img_kind='+'open'+'&img_p='+img_p;
      // this.url = txurl
      // localStorage.setItem("user_logo",txurl)
      let img_id = this.filename ,This = this
      this.url = null
      setTimeout(()=>this.url = img_id,10)
      // let item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
      // let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'} 
      // this.url = item&& item.data ? item.data : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
     
      // if(!item) 
      // {
      //   This.$api.network.getImg(params).then((data)=>{
      //     if(data && data.data)
      //     {
      //       This.url  ='data:image/png;base64,'+data.data
      //       imageDb.addData({img_id,data:This.url })
      //       localStorage.setItem("user_logo",This.url)
      //     }
      //   }).catch((ex)=>{
      //     console.log('load img error',ex)
      //   })
      //   //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
      // }
        if(res.data.ret)
        {
          let user = {
            user_id:localStorage.user_id,
            s_id:localStorage.s_id,
            logo:this.filename,
          }
          let ress =  await this.$api.network.ChatLogoMod(user)
          console.log(ress)
          if(ress.ret){
            localStorage.setItem("user_logo",this.filename)
           this.$toast.success('头像修改成功')
          }else{
           this.$toast.fail('修改失败' + ress.msg)
          }
        }
      },
      async confirm() {//保存及昵称
        let user = {
          user_id:localStorage.user_id,
          s_id:localStorage.s_id,
          user_name:this.changetext
        }
        if(!user.user_name || user.user_name.length<=0){
          return this.$toast.fail('[Error]请输入正确的昵称（不能为空）')
        }
        let res =  await this.$api.network.ChatuserName(user)
        if(res.ret){
          this.$toast.success('修改成功')
          this.$router.go(-1)
          let data = JSON.parse(localStorage.getItem('userInfo'));
          data.user_name = this.changetext
          window.localStorage.removeItem("userInfo");
          localStorage.setItem("userInfo",JSON.stringify(data))
        }else{
          this.$toast.fail('修改失败' + res.msg)
        }
      }
  },
  async created(){//进入页面就执行
        // if(localStorage.user_logo && localStorage.user_logo.indexOf('http')==0)
        // {
        //   let data = JSON.parse(localStorage.getItem('userInfo'));
        //   let img_id =  data.logo,This = this
        //   let item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
        //   let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'} 
        //   this.url = item&& item.data ? item.data : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
        
        //   if(!item) 
        //   {
        //     This.$api.network.getImg(params).then((data)=>{
        //       if(data && data.data)
        //       {
        //         This.url  ='data:image/png;base64,'+data.data
        //         imageDb.addData({img_id,data:This.url })
        //         localStorage.setItem("user_logo",This.url)
        //       }
        //     }).catch((ex)=>{
        //       console.log('load img error',ex)
        //     })
        //     //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
        //   }
        // }
        // else 
        this.url = localStorage.user_logo
        let userInfo =JSON.parse( localStorage.getItem('userInfo'))
        this.changetext = userInfo.user_name
        let g_mywallet = await iWalletDb.getDataByKey('g_mywallet')
        this.user_id=userInfo.user_id
        this.phoneHash = userInfo.phoneHash
        let phoneEnInfo = userInfo.phoneEnInfo
        this.phone = userInfo.phone
        let tmpPhone = null
        let keys = await iWalletDb.getAllDatas()
        console.log('keys:',keys)
        let dtns_private_key = null;
        for(let i=0;i<keys.length;i++)
        {
            if(keys[i].data && keys[i].data.public_key == userInfo.public_key)
            {
                dtns_private_key = keys[i].data.private_key
                break;
            }
        }
        console.log('user-information:dtns_private_key:',dtns_private_key,userInfo.public_key,userInfo)
        if(dtns_private_key)
        {
          try{
            tmpPhone =  await sign_util.decryptSomethingInfo(phoneEnInfo,dtns_private_key)
            if(tmpPhone)
            {
              this.phone = tmpPhone
              userInfo.phone = tmpPhone
              //保存到cached中
              localStorage.setItem('userInfo',JSON.stringify(userInfo))
              console.log('user-information-updated-phone:',userInfo)
            }
          }catch(ex)
          {
            console.log('user-information-decrypto-phone-eninfo failed, exception:'+ex)
          }
        }

        if(g_mywallet)
        {
          this.public_key =  g_mywallet.data.public_key
        }
        // console.log(data)
      },
};
</script>

<style lang="stylus" scoped>
.input {
width:90%; height:29px; padding-bottom:2px; padding-left:5px; border:1px solid #eeeeee; font-size:13px;
}
.logo[data-v-16247baa] .van-button__text{
  background-color rgb(21, 160, 231)
}
* {
  background-color: #fff;
  touch-action: pan-y;
}
.van-divider{
  border-top-width 5px
}
.topbar >>> .van-nav-bar {
  height: 44px;
  margin-bottom: 40px;
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
  margin-bottom: 50px;
  text-align:center;
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
