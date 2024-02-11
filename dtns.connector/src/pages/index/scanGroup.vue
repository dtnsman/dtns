<template>
  <div class="box" height="100%">
    <header class="topbar">
      <van-nav-bar :title="chatName" left-arrow @click-left="back" />
    </header>
    <div style="width:100%; height:45px; background-color:#fff;"></div>
    <div style="text-align:center; background-color:#fff; padding-bottom:33px;">
      <img v-lazy="img" alt="" width="81px" height="81px" style="border-radius:50%;">
    </div>
    <van-cell title="群名称" :value="chatName"  style="font-size:13px;"  />
      <div style="width:100%; margin:0; padding:0; position:relative;">
        <van-cell title="访问权限"  :value="vip" style="font-size:13px;"  />
        <div style="position:absolute;top:11px; right:50px;" v-show="vip1">
          <svg t="1586487023024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1495" width="14" height="20"><path d="M512.409161 0a511.992571 511.992571 0 1 0 511.591008 511.992571A512.394134 512.394134 0 0 0 512.409161 0z" fill="#12ADF5" p-id="1496"></path><path d="M471.851318 803.125602a27.30627 27.30627 0 0 1-8.031256 0 40.15628 40.15628 0 0 1-30.920335-28.912522L332.910589 392.326856H238.944894a40.15628 40.15628 0 0 1 0-80.31256h124.886031a40.15628 40.15628 0 0 1 40.15628 29.715648l86.737565 332.493999 264.228323-346.548698a40.15628 40.15628 0 0 1 63.848485 48.589099l-315.226798 412.003434a40.15628 40.15628 0 0 1-31.723462 14.857824z" fill="#FFFFFF" p-id="1497"></path></svg>
        </div>
      </div>
      <div style="width:100%; margin:0; padding:0; position:relative;">
        <van-cell title="消息权限"  :value="news" style="font-size:13px;"  />
        <div style="position:absolute;top:11px; right:50px;" v-show="news1">
          <svg t="1586487023024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1495" width="14" height="20"><path d="M512.409161 0a511.992571 511.992571 0 1 0 511.591008 511.992571A512.394134 512.394134 0 0 0 512.409161 0z" fill="#12ADF5" p-id="1496"></path><path d="M471.851318 803.125602a27.30627 27.30627 0 0 1-8.031256 0 40.15628 40.15628 0 0 1-30.920335-28.912522L332.910589 392.326856H238.944894a40.15628 40.15628 0 0 1 0-80.31256h124.886031a40.15628 40.15628 0 0 1 40.15628 29.715648l86.737565 332.493999 264.228323-346.548698a40.15628 40.15628 0 0 1 63.848485 48.589099l-315.226798 412.003434a40.15628 40.15628 0 0 1-31.723462 14.857824z" fill="#FFFFFF" p-id="1497"></path></svg>
        </div>
      </div>
      <div style="width:100%; margin:0; padding:0; position:relative;">
        <van-cell title="邀请权限"  :value="Invitation" style="font-size:13px;"  />
        <div style="position:absolute;top:11px; right:50px;" v-show="Invitation1">
          <svg t="1586487023024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1495" width="14" height="20"><path d="M512.409161 0a511.992571 511.992571 0 1 0 511.591008 511.992571A512.394134 512.394134 0 0 0 512.409161 0z" fill="#12ADF5" p-id="1496"></path><path d="M471.851318 803.125602a27.30627 27.30627 0 0 1-8.031256 0 40.15628 40.15628 0 0 1-30.920335-28.912522L332.910589 392.326856H238.944894a40.15628 40.15628 0 0 1 0-80.31256h124.886031a40.15628 40.15628 0 0 1 40.15628 29.715648l86.737565 332.493999 264.228323-346.548698a40.15628 40.15628 0 0 1 63.848485 48.589099l-315.226798 412.003434a40.15628 40.15628 0 0 1-31.723462 14.857824z" fill="#FFFFFF" p-id="1497"></path></svg>
        </div>
      </div>
      <van-cell title="管理员"  :value="Administrators"  style="font-size:13px;"  />
    <div style="text-align:center; padding-top:30px;">
        <van-button @click="Chatjoin(token_y)" size="small" style="width:110px; background-color:#12adf5; color:#fff; border-radius:4px;">加入群聊</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name:'',
      tel:'',
      logo:'',
      img:'',
      chatName:'',
      vip:0,
      vip1:true,
      news:'',
      news1:true,
      Invitation:0,
      Invitation1:true,
      Administrators:0,
      token_y:'',
    };
  },
  methods:{
    back(){
      this.$router.push('/index')
    },
    async Administration(){//查看群信息
      let users = {
              user_id:localStorage.user_id,
              s_id:localStorage.s_id,   
              chatid:this.$route.params.chatid,
            }
      let ress =  await this.$api.network.ChatInfo(users)//群信息
      console.log('这是群信息' + ress)
      this.token_y = this.$route.params.chatid
      this.img = ress.chatlogo// `${this.$baseUrl}/image/view?user_id=`+ress.create_user_id+'&filename='+ress.chatlogo+'&img_kind='+'open'+'&img_p='+'min200'
      console.log('这是群头像' + this.img)
       this.chatName = ress.chatname
       this.is_join = ress.is_join
       this.is_manager = ress.is_manager
       this.is_owner = ress.is_owner
       this.GroupOwner_id = ress.create_user_id
      //  console.log(this.GroupOwner_id)
	   if(ress.vip_level==null){//访问权限
	   		   this.vip = "普通"
			   this.vip1 = false
	   }else if(ress.vip_level == 0){
	   		   this.vip = "普通"
			   this.vip1 = false
	   }else if(ress.vip_level == 10){
	   		   this.vip = '管理员'
			   this.vip1 = false
	   }else{
	   		   this.vip = 'VIP' + ress.vip_level
			   this.vip1 = true
	   }
       // this.news = ress.send_vip_level
	   if(ress.send_vip_level==null){//发消息权限
	   		   this.news = "普通"
			   this.news1 = false
	   }else if(ress.send_vip_level == 0){
	   		   this.news = "普通"
			   this.news1 = false
	   }else if(ress.send_vip_level == 10){
	   		   this.news = '管理员'
			   this.news1 = false
	   }else{
	   		   this.news = 'VIP' + ress.send_vip_level
			   this.news1 = true
	   }
       // this.Invitation = ress.invite_vip_level
	   if(ress.invite_vip_level==null){//邀请权限
	   		   this.Invitation = "普通"
			   this.Invitation1 = false
	   }else if(ress.invite_vip_level == 0){
	   		   this.Invitation = "普通"
			   this.Invitation1 = false
	   }else if(ress.invite_vip_level == 10){
	   		   this.Invitation = '管理员'
			   this.Invitation1 = false
	   }else{
            this.Invitation = 'VIP' + ress.invite_vip_level
            // console.log(this.Invitation)
			   this.Invitation1 = true
	   }
       localStorage.setItem("chatname",this.chatName)
    },
    async joins(){//管理员列表
        let data = JSON.parse(localStorage.getItem('userInfo'));
        let random = Math.random()
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,   
              chatid:this.$route.params.chatid,
              begin:0,
              len:100
            }
      let res =  await this.$api.network.ChatManagerList(user)
      this.Administrators = res.list.length
      console.log(res.list.length)
     },
     async Chatjoin(token_y){//加入群聊
        let random = Math.random()
            let user = {
              user_id:localStorage.user_id,
              s_id:localStorage.s_id,   
              chatid:this.$route.params.chatid,
            }
      let res =  await this.$api.network.Chatjoin(user)
      console.log('这是加入群聊' + res)
      if(res.ret)
      {
          this.$toast.success('加入成功')
          this.$router.push(`/index/chat/${this.token_y}`);
      }else{
          this.$toast.fail('加入失败' + res.msg)
      }
     },
  },
  mounted() {
    this.Administration();
    this.joins()
  }
};
</script>
<style lang="stylus" scoped>
.van-divider[data-v-1fca2002]{
  margin  0
  padding 0
}
.van-divider{
  margin  0
  padding 0
  border-bottom-width 5px
}
.van-icon-arrow-left::before{
  color:#000
}
.van-nav-bar__title {
  font-weight bold
}
.box{
  position:fixed;
  width 100%
  height 100%
  background-color:#fff
}
</style>