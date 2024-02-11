<template>
    <div class="box">
      <header class="topbar">
        <div style="margin:0 auto;height:46px;" align="center">
          <span style="font-size:16px; line-height:43px;margin-right:2px;">{{type === 'group_live'?'开直播':'开通小店'}}</span>
          <svg v-if="type === 'group_live'" style="width:17px;height:17px;top:14px; position:absolute; margin-left:2px;" t="1589772060484" class="icon" viewBox="0 0 1451 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2816" width="20" height="20"><path d="M911.266055 93.944954a93.944954 93.944954 0 0 0-93.944954-93.944954H93.944954a93.944954 93.944954 0 0 0-93.944954 93.944954v836.110092a93.944954 93.944954 0 0 0 93.944954 93.944954h723.376147a93.944954 93.944954 0 0 0 93.944954-93.944954V352.293578zM1427.963303 84.550459a42.275229 42.275229 0 0 0-46.972477 0l-403.963303 230.165137v394.568808l403.963303 234.862385h46.972477a56.366972 56.366972 0 0 0 23.486238-42.275229V122.12844a46.972477 46.972477 0 0 0-23.486238-37.577981z" fill="#12adf5" p-id="2817"></path></svg>
          <svg v-else t="1590461422341" style="width:17px;height:17px;top:14px; position:absolute; margin-left:2px;" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3302" width="20" height="20"><path d="M1008.995228 367.590465L840.204205 15.004772a26.256381 26.256381 0 0 0-22.50547-15.003647H210.051051a30.007293 30.007293 0 0 0-26.256381 15.003647L18.754558 367.590465a153.787377 153.787377 0 0 0-18.754558 71.267321c0 97.523702 105.025526 172.541935 232.556521 172.541935a296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205 296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205c131.281907 0 232.556521-75.018233 232.556521-172.541935a153.787377 153.787377 0 0 0-18.754558-71.267321zM660.160447 648.908837a243.809256 243.809256 0 0 1-146.285554 48.761851 255.061991 255.061991 0 0 1-146.285553-48.761851 236.307433 236.307433 0 0 1-146.285554 48.761851 277.567461 277.567461 0 0 1-123.780084-33.758204v326.329311a30.007293 30.007293 0 0 0 26.256382 33.758205h780.189619a30.007293 30.007293 0 0 0 26.256381-33.758205v-326.329311a262.563814 262.563814 0 0 1-123.780084 33.758204 243.809256 243.809256 0 0 1-146.285553-48.761851z" fill="#12ADF5" p-id="3303"></path></svg>
        </div>
        <div @click="back" style="position:absolute; top:14px; left:15px;">
          <van-icon style="font-size:17px;" name="arrow-left" />
        </div>
        <!-- <div style="position:absolute; top:0; right:15px;">
          <van-icon style="font-size:20px;" @click="pageset(token)" name="ellipsis" slot="right" />
        </div> -->
     </header>
      <div class="body">
         <div v-if="type === 'group_live'" style="border:1px sold;background-color:#fff;margin-bottom:10px; border-radius:5px;padding-top:15px;padding-bottom:15px;">
       <div style="font-size:16px; padding-left:15px;">直播间名字</div>
       <div style="text-align:center;margin-top:10px;">
         <input v-model="value" style="width:90%; height:35px;border:1px solid #aaa; border-radius:5px;padding-left:10px;font-size:14px;" type="text">
       </div>
     </div>
     <div style="background-color:#fff;height:214px;text-align:center;width:100%;border-radius:5px;">
       <van-uploader :after-read="afterRead" :name="type === 'group_live'?'backgroup_img':'chatlogo'">
         <img v-if="url !== ''" :style="{'height': type === 'group_live'?'120px': '90px', }" :src="url" alt="" style="width:90px;border-radius:5px;margin:0 auto;margin-top:47px;background-color:#f5f5f5;line-height:90px;font-size:14px;">
         <div v-if="url == ''" :style="{'height': type === 'group_live'?'120px': '90px','lineHeight': type === 'group_live'?'120px':'90px' }" style="width:90px; border-radius:5px;margin:0 auto;margin-top:47px;background-color:#f5f5f5;line-height:90px;font-size:14px;">{{type === 'group_live'?'上传背景图':'上传小店图标'}}</div>
       </van-uploader>
     </div>
     <div  v-if="type === 'group_shop'" style="border-radius:5px;">
          <div  style="margin-top:8px;border:1px sold;background-color:#fff;margin:10px 0px 0px 0px; border-radius:5px;padding-top:15px;padding-bottom:15px;">
            <div style="font-size:16px; padding-left:15px;border-color:#c8c9cc">小店名称:</div>
            <div style="text-align:center;margin-top:10px;">
              <MyInput :value.sync="value" placeholder="请输入名称" style=" border-radius:5px;padding:0;padding:0 10px;font-size:14px;" />
            </div>
          </div>
          <!-- <div style="border:1px sold;background-color:#fff; padding-top:15px;padding-bottom:15px;">
            <div style="font-size:16px; padding-left:15px;">小店特色:</div>
            <div style="text-align:center;margin-top:10px;">
              <input v-model="desc" placeholder="这里专门销售儿童玩具" style="width:90%; height:35px;border:1px solid #aaa; border-radius:5px;padding-left:10px;font-size:14px;" type="textarea">
            </div>
          </div> -->
          <MyInput :row="3" title="小店特色" :value.sync="desc" type="textarea" placeholder="这里专门销售儿童玩具"></MyInput>
      </div>
     </div>
      <van-button @click="CreateLive" style="font-size:17px;background-color:#12adf5;width:95%;margin:10px auto;color:#fff;border-radius:5px;" block>{{type === 'group_live'?'创建直播间':'创建小店'}}</van-button>
      <!-- <van-button @click="ceshi">模拟开小店流程</van-button> -->
     
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
    export default {
      props: {
        type: String
      },
        data(){
            return{
               value:'',
               url:'',
               backgroup_img:'',
               chatid:'',
               chatlogo: '',
               feature: '',
               desc: ''
            }
        },
        methods: {
            back() {//返回上一层
              this.$router.go(-1)
            },///
            async CreateLive(){//创建群聊
            
            if(!this.value){return this.$toast.fail(this.type === 'group_live'?'请输入直播间名字':'请输入小店名称')}
           if (this.type === 'group_live') {
               if(this.backgroup_img == ''){return this.$toast.fail('请上传背景图片')}
           }else if(this.type === 'group_shop') {
              if(this.chatlogo == ''){return this.$toast.fail('请上传小店图标')}
           }
            let data = JSON.parse(localStorage.getItem('userInfo'));
            let random = Math.random()
                  let user = {
                    user_id:data.user_id,
                    s_id:data.s_id,
                    // join_uids:JSON.stringify(this.join_uids),
                    group_type:this.type,
                    desc: this.desc,
                    random:random,
                    chatname:this.value,
                    backgroup_img:this.backgroup_img,
                    chatlogo: this.chatlogo
                  }
            let res =  await this.$api.network.Chatgroup(user)
            this.chatid = res.chatid
            console.log(this.chatid)
            console.log(res)
            if(res.ret){
              if (this.type === 'group_live') {
                this.$toast.success('直播间创建成功')
                this.$router.push(`/LiveBroadcast/SuccessBroadcast/${this.chatid}`)
              }else if(this.type === 'group_shop') {
                this.$toast.success('小店创建成功')
                // let shop_id = res.shop_id
                // console.log(shop_id)
                // localStorage.setItem('newShop', JSON.stringify({shop_id}))
                this.$router.push(`/shopBroadcast/successSetShop/${this.chatid}`)
              }
            }else{
              this.$toast.fail(this.type === 'group_live'?'直播间创建失败'  + res.msg:'小店创建失败' + res.msg)
            }
            console.log(res)
            },
          async afterRead(data, name) {//上传背景图片
          //  let res = await this.$uploadImg(data.file)
          //  console.log(res)
          //   this.url = res.url
          //   this[name.name] = res.filename
              let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:data.file.name,
                                    mimetype:data.file.type,filename:data.file.name,path:'file-path',
                                    size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
                                    img_kind:'open',random:Math.random(),
                                    data:data.file}
              let res = await new Promise((resolve)=>{
                rpc_client.sendImage(fileInfo,function(udata){
                    console.log('sendFile-callback-data:'+JSON.stringify(udata))
                    resolve(udata)
                })
              })
              console.log('upload-file-ret:'+JSON.stringify(res))
              if(!res.data.ret){
                return this.$toast.fail('上传失败' +res.data.msg,3000)
              }
              
              let img_id = res.data.filename,This = this
              let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'}
              let item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
              // .then((item)=>{
              this[name.name] = img_id
              this.url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
              if(item) this.url  = item.data
              else{
                This.$api.network.getImg(params).then((data)=>{
                  This.url  ='data:image/png;base64,'+data.data
                  imageDb.addData({img_id,data:This.url })
                }).catch((ex)=>{
                  console.log('load img error',ex)
                })
                //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
              }

            },
            ////先做页面做的调试按钮
            ceshi () {
                // this.$router.push(`/shopBroadcast/successSetShop/${this.chatid}`)
                 this.$router.push(`/shopBroadcast/successSetShop/${123456}`)
            }
        },
        created(){
            // this.userInfo = JSON.parse(localStorage.userInfo);
        },
        mounted(){
          //这时候请求后端数据
          console.log(this.type)
        },
    }
</script>
<style scoped lang="stylus">
.box {
  width 100%
  height 100%
 
  // position fixed
  background-color:#f5f5f5
}
.body {
  box-sizing border-box 
  padding 16px 15px 0px  15px 
  border-radius 30px
  overflow hidden
}
.topbar {
  height 46px
  background-color:#fff;
}
.box >>> .van-icon{
  font-size:16px;
  color:000;
}
</style>
