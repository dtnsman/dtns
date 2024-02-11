<template>
  <div class="box">
    <div class="add-friend">
    <van-nav-bar
      title="添加联系人"
      left-arrow
      @click-left="onClickLeft"
      />
    <div style="width:100%; height:70px;">
      <div class="search-line" style=" float:left; width:75%; height:24px; padding-left:15px; margin-left:5%; border-radius:25px; background-color:#eaeaea;">
        <van-icon name="search" style="float:left;" @click="search" />
        <input  @keyup.enter="search" type="text" placeholder="请输入手机号码" v-model="txt" style=" float:left;font-size:14px; background-color:#eaeaea; padding-left:4px; margin-top:-2px;" />
      </div>
      <div style="float:left; width:15%; margin-top:20px; height:24px text-align:center; line-height:12px;">
        <p style="text-align:center; font-size:13px; color:#222;" @click="search">搜索</p>
      </div>
    </div>
    <div style="width:100%; height:85px;" v-show="shows" @click="Personal(form)">
      <img :src="url" alt="" style="width:50px; height: 50px;margin-top:15px; margin-left:15px; float:left; border-radius:5px; border:none;">
      <p style="float:left; margin-top:31px; padding-left:10px; font-size:15px;">{{userName}}</p>
      <img src="../../assets/images/chat.png" alt="" style="width:25px; height:25px; float:right; margin-right:15px; margin-top:25px;">
    </div>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shows:false,
      another:[],
      txt:'',
      userName:'',
      logo:'',
      url:'',
      form:''
    };
  },
  methods: {
    async search(form){
      let data = JSON.parse(localStorage.getItem('userInfo'));//查找个人用户信息
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              phone:this.txt
            }
      let res =  await this.$api.network.UserInfo(user)
      this.userName = res.user_name
      this.logo = res.logo
      if(res.ret){
        this.shows = true
        this.form = res.user_id
      }else{
        this.$toast.fail("该用户不存在")
        this.shows = false
      }
      console.log(this.form)

      let img_id = res.logo,This = this
      let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'}
      let item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
      this.url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
      if(item) this.url  = item.data
      else{
        This.$api.network.getImg(params).then((data)=>{
          This.url  ='data:image/png;base64,'+data.data
          // setTimeout(()=>This.sendOuts(),200)
          imageDb.addData({img_id,data:This.url })
        //setTimeout(()=>This.chatRexord =  This.chatRexord,100)
        }).catch((ex)=>{
          console.log('load img error',ex)
        })
        //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
      }
      // let img_p = "min200";
      // this.url = `${this.$baseUrl}/image/view?user_id=`+localStorage.user_id+'&s_id='+localStorage.s_id+'&filename='+res.logo+'&img_kind='+'open'+'&img_p='+img_p
    },
    Personal() {
      this.$router.push(`/perdata/${this.form}`)
      // this.$router.push('/perdata' + form)
    },
    onClickLeft(){
      this.$router.go(-1)
    },
  }
};
</script>
<style lang="stylus" scoped>
.box {
  position fixed;
  width 100%
  height 100%
  background-color #fff
}
.box >>> .van-icon-arrow-left::before{
  color #000
}
.sub-page {
  background #fff;
}
.van-icon-search::before{
  font-size:1.4rem;
  color:#555;
}
.add-friend .search-line {
  position: relative;
  height: 50px;
  padding-left: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #fff;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  margin-top: 20px;
}

// .add-friend .icon-search {
//   color: #40b938;
// }

.add-friend .search-line input {
  width: calc(100% - 30px);
  font-size: 16px;
  height: 100%;
  border: 0;
  outline: none;
  vertical-align: middle;
}

.add-friend .weui-cell__hd img {
  width: 35px;
  display: block;
  margin-right: 10px;
}

.add-friend .weui-cell__bd p:last-child {
  font-size: 14px;
  color: #b7b7b7;
}

.add-friend.weui-cell__bd p:first-child {
  font-size: 15px;
}
.search_user {
  height: 100px;
//   border: 1px solid black;
  margin-top: 30px;
  background-color: #fff 
  display flex
}
.search_user img{
    width:80px;
    height:80px;
    border-radius: 5px;
    display:block
    margin:auto 20px
    flex:1;
}
.search_user span{
    display block
    margin:auto 10px
    font-size:16px
    flex:3
}
.search_user >>> .van-icon{
    font-size: 30px
    margin:auto 10px
    
    
}
</style>