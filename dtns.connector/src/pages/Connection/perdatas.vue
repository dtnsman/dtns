<template>
  <div class="box" height="100%">
    <header class="topbar">
      <van-nav-bar title="查看联系人" left-arrow @click-left="back" />
    </header>
    <div style="width:100%; height:45px; background-color:#fff;"></div>
    <div style="text-align:center; background-color:#fff; ">
      <img :src="url" alt="" width="81px" height="81px" style="border-radius:50%;">
      <div style="margin-top:12px;">名字 :{{name}}</div>
      <div style="margin-top:12px; padding-bottom: 20px;">tel :{{tel}}</div>
    <van-divider />
    </div>
	<div style="background-color:#fff; width:100%; height:50px; border-bottom:1px solid #F5F5F5">
	  <van-row>
	    <van-col span="11" style="text-align:right; padding-right:8px; padding-top:16px;">
	      <img src="../../assets/images/liaotian.png" alt="" width="20px" height="20px" @click="chat">
	    </van-col>
	    <van-col span="13" style="text-align:left; padding-top:15px;">
	      <div style="font-size:15px;" @click="DeleteContact">删除联系人</div>
	    </van-col>
	  </van-row>
	 </div>
	 <van-divider />
    <div style="background-color:#fff; width:100%; height:50px;">
      <van-row>
        <van-col span="11" style="text-align:right; padding-right:8px; padding-top:16px;">
          <img src="../../assets/images/liaotian.png" alt="" width="20px" height="20px" @click="chat">
        </van-col>
        <van-col span="13" style="text-align:left; padding-top:15px;">
          <div style="font-size:15px;" @click="chat(token_y)">发消息</div>
        </van-col>
      </van-row>
	 </div>
    <div style="text-align:center; position:fixed; width:100%; height:50px; background-color:#fff; bottom:0px;">
      <div style="line-height:50px; font-size:15px; color:red;">
        举报该用户
      </div>
    </div>
    </div>
  <!-- </div> -->
</template>
<script>
export default {
  data() {
    return {
      name:'',
      tel:'',
      logo:'',
      url:'',
      userb:'',
      token_y:'',
    };
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
   async DeleteContact(){ //删除联系人
        let user = {
            user_id:localStorage.user_id,
            s_id:localStorage.s_id,
            user_b:this.userb
        }
        let res =  await this.$api.network.ChatContactDel(user)
        if(res.ret){
            this.$toast.success("删除成功")
            this.$router.push('/shopping')
        }else{
            this.$toast.fail("删除失败" + msg)
            
        }
        console.log(res)
    },
    async search(){
      let data = JSON.parse(localStorage.getItem('userInfo'));//查找个人用户信息
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              dst_user_id :this.$route.params.user_id
            }
      let res =  await this.$api.network.UserInfoto(user)
      this.name = res.user_name
      this.tel = res.phone
      this.logo = res.logo
      this.userb = res.user_id
      console.log(res)
      
      let img_p = "min100";
      this.url = `${this.$baseUrl}/image/view?user_id=`+localStorage.user_id+'&s_id='+localStorage.s_id+'&filename='+this.logo+'&img_kind='+'open'+'&img_p='+img_p
    },
    async chat(id){
      let data = JSON.parse(localStorage.getItem('userInfo'));//开始聊天
      let random = Math.random()
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              user_b:this.userb,
              random:random
            }
      let res =  await this.$api.network.ChatSingle(user)
      console.log(res)
      if(res.ret){
        this.token_y = res.chatid
        this.$router.push(`/index/chat/${this.token_y}`)
      }else{
        this.$toast.fail("失败" + res.msg)
      }
    },
    
  },
  mounted() {
    this.search();
  }
};
</script>
<style lang="stylus" scoped>
.van-divider[data-v-1fca2002]{
  border-width 8px
}
.van-divider{
  margin  0
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
  background-color:#f5f5f5
}
</style>