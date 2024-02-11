<template>
  <div class="box" height="100%">
    <header class="topbar">
      <van-nav-bar title="查看联系人" left-arrow @click-left="back" />
    </header>
    <div style="width:100%; height:45px; background-color:#fff;"></div>
    <div style="text-align:center; background-color:#fff; ">
      <img v-image-preview :src="url" alt="" width="81px" height="81px" style="border-radius:50%;">
      <div style="margin-top:12px;">名字 :{{name}}</div>
      <div style="margin-top:12px; padding-bottom: 20px;">tel :{{tel}}</div>
    <van-divider />
    </div>
	<div style="background-color:#fff; width:100%; height:50px; border-bottom:1px solid #F5F5F5" @click="addTo">
	  <van-row>
	    <van-col span="11" style="text-align:right; padding-right:8px; padding-top:16px;">
        <svg t="1590831959145" class="icon" viewBox="0 0 1189 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5295" width="21" height="21"><path d="M993.290652 700.993289l-89.342282-34.362417c-48.107383-17.181208-113.395973-37.798658-137.449664-61.852349a30.926174 30.926174 0 0 1-17.181208-27.489932 51.543624 51.543624 0 0 1 20.61745-37.798658c61.852349-58.416107 151.194631-134.013423 151.194631-254.281879A288.644295 288.644295 0 0 0 632.485283 0a285.208054 285.208054 0 0 0-285.208053 285.208054c0 113.395973 75.597315 188.993289 144.322147 250.845637a65.288591 65.288591 0 0 1 24.053691 44.671141c0 6.872483 0 13.744966-13.744966 24.053691a491.38255 491.38255 0 0 1-127.14094 58.416108 432.966443 432.966443 0 0 0-96.214765 37.798658c-113.395973 61.852349-171.812081 123.704698-171.81208 182.120805a144.322148 144.322148 0 0 0 140.885906 140.885906h804.080537a140.885906 140.885906 0 0 0 137.449664-140.885906c0-75.597315-120.268456-147.758389-195.865772-182.120805z m58.416108 254.281879H247.626223a75.597315 75.597315 0 0 1-72.161074-72.161074c0-20.61745 37.798658-68.724832 137.449664-123.704698l82.469799-34.362416a477.637584 477.637584 0 0 0 151.194631-65.288591 103.087248 103.087248 0 0 0 37.798658-79.033557 130.577181 130.577181 0 0 0-48.107383-96.214765c-61.852349-54.979866-120.268456-113.395973-120.268456-199.302013A216.483221 216.483221 0 0 1 632.485283 68.724832a219.919463 219.919463 0 0 1 219.919463 216.483222c0 82.469799-58.416107 137.449664-130.577181 202.738255a123.704698 123.704698 0 0 0-41.234899 92.778523 99.651007 99.651007 0 0 0 41.234899 79.033557 594.469799 594.469799 0 0 0 161.503356 72.161074 474.201342 474.201342 0 0 1 79.033557 30.926175c103.087248 51.543624 158.067114 103.087248 158.067114 120.268456a72.161074 72.161074 0 0 1-68.724832 72.161074z" p-id="5296" fill="#222222"></path><path d="M127.357766 611.651007a30.926174 30.926174 0 0 0 34.362417 34.362416 34.362416 34.362416 0 0 0 34.362416-34.362416v-85.906041h82.469798a34.362416 34.362416 0 0 0 34.362416-34.362416 30.926174 30.926174 0 0 0-34.362416-34.362416H196.082599v-89.342282a34.362416 34.362416 0 0 0-34.362416-34.362416 30.926174 30.926174 0 0 0-34.362417 34.362416v89.342282H34.579243a30.926174 30.926174 0 0 0-34.362416 34.362416 34.362416 34.362416 0 0 0 34.362416 34.362416h92.778523z" p-id="5297" fill="#222222"></path></svg>
	    </van-col>
	    <van-col span="13" style="text-align:left; padding-top:15px;">
	      <div style="font-size:15px;" >添加好友</div>
	    </van-col>
	  </van-row>
	 </div>
	 <van-divider />
    <div style="background-color:#fff; width:100%; height:50px;" @click="chat(token_y)">
      <van-row>
        <van-col span="11" style="text-align:right; padding-right:8px; padding-top:16px;">
          <svg t="1590831896737" class="icon" viewBox="0 0 1190 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4948" width="20" height="20"><path d="M149.128451 1023.56346a54.228528 54.228528 0 0 1-33.89283-6.778566c-44.060679-30.503547-33.89283-94.899923-27.114263-155.907017a179.631998 179.631998 0 0 0 6.778565-81.342791A457.553202 457.553202 0 0 1 0 505.003164C0 227.08196 267.753356 0 593.124522 0s596.513805 227.08196 596.513804 505.003164-267.753356 505.003164-596.513804 505.003164a623.628069 623.628069 0 0 1-250.806941-47.449961 325.371166 325.371166 0 0 0-84.732074 30.503547 311.814034 311.814034 0 0 1-108.457056 30.503546zM593.124522 67.78566C305.035468 67.78566 67.78566 264.364073 67.78566 505.003164a376.210411 376.210411 0 0 0 81.342791 233.860526c23.724981 30.503547 16.946415 81.342792 6.778566 132.182036a247.417658 247.417658 0 0 0-3.389283 84.732075 325.371166 325.371166 0 0 0 81.342792-27.114264c61.007094-23.724981 101.678489-40.671396 132.182036-27.114264a640.574483 640.574483 0 0 0 227.08196 40.671396c291.478336 0 528.728145-193.18913 528.728145-437.217505S884.602858 67.78566 593.124522 67.78566z" p-id="4949" fill="#222222"></path></svg>
        </van-col>
        <van-col span="13" style="text-align:left; padding-top:15px;">
          <div style="font-size:15px;">开始聊天</div>
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
import Clipboard from 'clipboard';
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
      this.$router.go('-1')
    },
    async addTo (){//添加好友
      let user = {
            user_id:localStorage.user_id,
            s_id:localStorage.s_id,
            user_b:this.userb
        }
      let res =  await this.$api.network.ChatContactAdd(user)
      if(res.ret){
        this.$toast.success('添加成功')
        this.$router.go('-2')
      }else{
        this.$toast.fail('添加失败' + msg)
      }
    },
    async search(){
      let data = JSON.parse(localStorage.getItem('userInfo'));//查找个人用户信息
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              dst_user_id:this.$route.params.user_id
            }
      let res =  await this.$api.network.UserInfoto(user)
      this.name = res.user_name
      this.tel = res.phone
      this.logo = res.logo
      this.userb = res.user_id
      console.log(res)
      
      let img_p = "min1000";
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
  margin  0
  padding 0
}
.van-divider{
  margin  0
  padding 0
  border-bottom-width 5px
}
.box >>> .van-nav-bar__left{
  color:#000
}
.box >>> .van-nav-bar .van-icon{
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