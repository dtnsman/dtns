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
        <van-nav-bar title="管理员" right-text="添加" left-arrow @click-left="onClickLeft"  @click-right="onClickRight(chatid)">
        </van-nav-bar>
      </div>
      <div v-for="(item,index) in list" :key="index" style="position:relative; width:100%; border-bottom:1px solid #f5f5f5; height:60px; margin-left:15px;">
        <img :src="item.url" alt="" width="45px" height="45px" style="position:absolute; top:7.5px; left:0px;">
        <p style="position:absolute; font-size:15px; left:50px; top:5px;">{{item.user_name}}</p>
        <div style="position:absolute; right:30px; top:20px;">
          <svg @click="deletemin(item)" t="1586750386598" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2274" width="18" height="18"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#12ADF5" p-id="2275"></path><path d="M841.099164 533.409797H183.512545A21.409797 21.409797 0 1 1 183.512545 489.366786h657.586619a21.409797 21.409797 0 1 1 0 42.819594z" fill="#FFFFFF" p-id="2276"></path></svg>
        </div>
        <!-- <img src="../../../assets/images/delete.png" alt="" style="position:absolute; right:30px; top:19px;"> -->
      </div>
      <div v-show="show" style="font-size:14px; padding-left:15px; color:#222; margin-top:20px;">
        暂无管理员
      </div>
</div>
    

</template>
<script>
export default{
    data(){
        return{
          list:[],
          chatid:'',
          show:false,
        }
    },
    components:{
        // [NavBar.name]: NavBar
    },
    
    methods:{
      onClickLeft(){
        this.$router.go(-1)
      },
      onClickRight(chatid){//跳转添加页面
        this.$router.push(`/index/GroupInformation/AdministratorsAdd/${chatid}`)
      },
      ///
      async join(){//管理员列表
        let data = JSON.parse(localStorage.getItem('userInfo'));
        let random = Math.random()
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,   
              chatid:this.$route.params.chatid,
              begin:0,
              len:1000
            }
      this.chatid = this.$route.params.chatid
      let res =  await this.$api.network.ChatManagerList(user)
      this.list = res.list
      console.log(res)
      if(res.ret){
        if(res.list.length == 0)
      {
        this.show = true
      }else if(res.msg == 'pm error : your is not owner of chatroom ')
        {
          this.$toast.fail('添加失败，只有群主才能操作',2000)
        }else
      {
        this.show = false
      }
      
      let i = 0
      if(res.ret){
        for(i=0; i<res.list.length; i++) {
        this.logo = res.list[i].logo
        this.user_id = res.list[i].user_id
        res.list[i].url =`${this.$baseUrl}/image/view?user_id=`+this.user_id+'&s_id='+localStorage.s_id+'&filename='+this.logo+'&img_kind='+'open'+'&img_p='+'min100'
        // console.log(i)
        }
       }
      }else if(res.msg == 'user-id is not chat mem'){
        this.$toast.fail(res.msg)
      }else{}
      
      },
      //
      async deletemin(item){//删除管理员
         console.log(item)
        let user = {
              user_id:localStorage.user_id,
              s_id:localStorage.s_id,   
              chatid:this.$route.params.chatid,
              mem_user_id:item.user_id
            }
        let res =  await this.$api.network.ChatManagerDel(user)
        if(res.ret)
        {
            this.$toast.success('删除成功')
            this.join()
        }else
        {
            this.$toast.fail('删除失败' + res.msg)
        }
      }
    },
    mounted(){
      this.join();
    }
}
</script>

<style lang="stylus" scoped>
.box >>> .van-nav-bar__text, .box >>> .van-icon-arrow-left::before{
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