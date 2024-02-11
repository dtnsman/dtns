<!--
 * @Descripttion: 
 * @version: 
 * @Author: hengzi
 * @Date: 2020-03-11 17:24:27
 * @LastEditors: hengzi
 * @LastEditTime: 2020-03-21 15:13:18
 -->
<template>
<div class="box" style="width:100%; height:100%; background-color:#fff; position:fixed; top:0;">
      <div>
        <van-nav-bar title="添加群管理员" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
      </div>
      <div v-for="(item,index) in list" :key="index" style="position:relative; width:100%; border-bottom:1px solid #f5f5f5; height:60px; margin-left:15px;">
        <img :src="item.url" alt="" width="45px" height="45px" style="position:absolute; top:7.5px; left:0px;">
        <p style="position:absolute; font-size:15px; left:50px; top:5px;">{{item.user_name}}</p>
        <div style="position:absolute; right:30px; top:20px;">
          <svg @click="minAdd(item)" t="1586759882184" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2404" width="18" height="18"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#12ADF5" p-id="2405"></path><path d="M841.099164 489.366786H533.409797V183.512545A21.409797 21.409797 0 1 0 489.366786 183.512545v305.854241H183.512545a21.409797 21.409797 0 1 0 0 42.819594h305.854241v308.912784a21.409797 21.409797 0 0 0 42.819594 0V533.409797h308.912784a21.409797 21.409797 0 1 0 0-42.819594z" fill="#FFFFFF" p-id="2406"></path></svg>
        </div>
        <!-- <img src="../../../assets/images/delete.png" alt="" style="position:absolute; right:30px; top:19px;"> -->
      </div>
      <div v-show="show" style="font-size:14px; padding-left:15px; color:#222; margin-top:20px;">
        群里还没有任何成员请添加
      </div>
</div>
    

</template>
<script>
export default{
    data(){
        return{
          list:[],
          show:false,
        }
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1)
      },
      Personal(user_id){//点击头像查看个人信息
        this.$router.push(`/Connection/perdatas/${user_id}`)
      },
      //
      async join(){
        let data = JSON.parse(localStorage.getItem('userInfo'));
        let random = Math.random()
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,   
              chatid:this.$route.params.chatid,
              begin:0,
              len:1000
            }
      let res =  await this.$api.network.ChatMamList(user)//群所有成员列表
      this.list = res.list
      if(res.list.length == 0)
      {
        this.show = true
      }else
      {
        this.show = false
      }
      console.log(res)
      let i = 0
      if(res.ret){
        for(i=0; i<res.list.length; i++) {
        this.logo = res.list[i].logo
        this.user_id = res.list[i].user_id
        res.list[i].url =`${this.$baseUrl}/image/view?user_id=`+this.user_id+'&s_id='+localStorage.s_id+'&filename='+this.logo+'&img_kind='+'open'+'&img_p='+'min100'
        // console.log(i)
            }
         }
      },
      //
      async minAdd(item){//添加管理员
        console.log(item)
        let user = {
              user_id:localStorage.user_id,
              s_id:localStorage.s_id,   
              chatid:this.$route.params.chatid,
              mem_user_id:item.user_id
            }
        let res =  await this.$api.network.ChatManagerAdd(user)
        if(res.ret)
        {
            this.$toast.success('添加成功')
        }else if(res.msg == "member error : mem-user-id is already the manager of chatroom ")
        {
            this.$toast.fail('添加失败，该成员已是管理员',2000)
        }else if(res.msg == 'add error : your is already owner of chatroom ')
        {
            this.$toast.fail('添加失败，你是群主不可设置为管理员',2000)
        }else if(res.msg == 'pm error : your is not owner of chatroom ')
        {
          this.$toast.fail('添加失败，只有群主才能操作',2000)
        }else
        {
            this.$toast.fail("添加失败" + res.msg)
        }
      }
    },
    mounted(){
      this.join();
    }
}
</script>

<style lang="stylus" scoped>
.van-nav-bar__text, .van-icon-arrow-left::before{
  color:#222;
  font-size:1rem;
}
#icon{
  font-size 2rem;
}
.van-divider {
  margin 15px 0 0 0
}
.van-divider::after, .van-divider::before {
  border-width 8px
}
*{
  touch-action: pan-y;
}
.topbar >>> .van-nav-bar {
  height: 44px;
  background-color: #fff;
}
.topbar >>> .van-nav-bar__title {
  color: #000;
  line-height: 44px;
  font-size: 16px;
}

.topbar >>> .van-nav-bar__arrow+.van-nav-bar__text {
  line-height: 44px;
  color: #000;
  font-size: 16px;
}

.topbar >>> .van-icon {
  line-height: 44px;
  color: #000;
  font-size: 18px;
}

.topbar >>> .van-nav-bar__text {
  line-height: 44px;
  color: #fff;
  font-size: 18px;
}
.info img{
    width:60px;
    height 60px;
    margin:auto 10px
   line-height 80px
  
   
}
</style>