<template>
  <div class="box">
      <div class="add-friend">
      <van-nav-bar
        title="发起群聊"
        right-text="确认"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        :fixed="true"
        />
    <div style="height:46px;"></div>
    <div style="width:100%; margin:0;">
      <div class="search-line" style=" float:left;height:35px; padding-left:15px; background-color:#fff; margin:0; border:none;">
        <van-icon name="search" style="float:left; margin-top:2px;" />
        <input type="text" placeholder="搜索" v-model="txt" style=" float:left;font-size:14px; background-color:#fff; padding-left:4px; margin-top:-2px;" />
      </div>
    </div>
    <van-divider />
    <van-checkbox-group v-model="result">
        <van-cell-group>
            <van-cell
            v-for="(item, index) in list"
            clickable
            :key="index"
            @click="toggle(item.user_id)"
            >
            <div style="float:left;">
                <img :src="item.url" alt="" style="width:30px; height:30px; border-radius:50%; margin-top:5px;">
            </div>
            <div style="font-sisz:14px; padding-left:10px; float:left; margin-top:10px;">{{item.user_name}}</div>
            <template #right-icon>
            <van-checkbox :name="item" ref="checkboxes" />
            </template>
            </van-cell>
        </van-cell-group>
    </van-checkbox-group>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Checkbox,CheckboxGroup } from 'vant';
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
export default {
  data() {
    return {
      list: [],
      result: [],
      txt:'',
      user_id:[],
      logo:[],
      listchat:[],
      join_uids:[]
    };
  },
  methods: {
    Personal() {
      this.$router.push('/perdata')
    },
    onClickLeft(){
      this.$router.go(-1)
    },
    toggle(index) {//复选框选中时拿到user_id
      let b = true
      let int = -1
      if(this.join_uids!=null){
        for(let i = 0; i<this.join_uids.length;i++){
          if(this.join_uids[i]==index) {
            b=false
            int = i
          }
        }
      }
      if(b){
        this.join_uids.push(index)
      }else{
        this.join_uids.pop(int)
      }
      console.log(this.join_uids)
      
    },

    async onClickRight(){//创建群聊
      let data = JSON.parse(localStorage.getItem('userInfo'));
      let random = Math.random()
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              join_uids:JSON.stringify(this.join_uids),
              random:random
            }
      let res =  await this.$api.network.Chatgroup(user)
      if(res.ret){
        this.$toast.success('群聊创建成功')
        this.$router.push('/index')
      }else{
        this.$toast.fail('群聊创建失败' + res.msg)
      }
      // console.log(res)
    },
    async handleaa (user_id,s_id,list) {
     console.log('handleaa-list:',list)
      // if(!localStorage.getItem('imgList')) {
      //     let list1 = []
      //     localStorage.setItem('imgList',JSON.stringify(list1))
      // }
      // let imglist = JSON.parse(localStorage.getItem('imgList'))
       
      // let item = imglist.filter(item=> {
      //   return item.id === list.user_b
      // })
      // if (item.length) {
      //   console.log(item[0])
      //   list.url =  item[0].url 
      //   console.log(list.url)
      //    return
      // }
      // let ress =  await this.$api.network.UserInfo({
      //   user_id:user_id,
      //   s_id:s_id,
      //   dst_user_id:list.user_b
      // })
      // let url = `${this.$baseUrl}/image/view?user_id=`+user_id+'&s_id='+s_id+'&filename='+ ress.logo+'&img_kind='+'open'+'&img_p='+'min100'
      
      
      let img_id = list.logo,This = this
      let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'}
      let imgItem = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
      list.url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
      // let json = {
      //   id: list.user_b,
      //   url: list.url
      // }
      if(imgItem && imgItem.data)  list.url  = imgItem.data
      else{
        This.$api.network.getImg(params).then((data)=>{
          list.url  ='data:image/png;base64,'+data.data
          // setTimeout(()=>This.sendOuts(),200)
          imageDb.addData({img_id,data:list.url })
        //setTimeout(()=>This.chatRexord =  This.chatRexord,100)
        }).catch((ex)=>{
          console.log('load img error',ex)
        })
        //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
      }
    //  let newList = JSON.parse(localStorage.getItem('imgList'))
    //  newList.push(json)
    //  localStorage.setItem('imgList',JSON.stringify(newList))
    //  list.url = url
    },
    async chatlist(){
      let data = JSON.parse(localStorage.getItem('userInfo'));//联系过的所有用户
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              begin:0,
              len:1000,
            }
      let res =  await this.$api.network.ChatList(user)
      console.log('chatlist',res)
    console.log(res)
    let i = 0
    // this.list = res.list
    for(i; i<res.list.length; i++){
	   //res.list[i].url = `${this.$baseUrl}/image/view?user_id=`+res.list[i].user_id+'&s_id='+res.list[i].s_id+'&filename='+ res.list[i].logo+'&img_kind='+'open'+'&img_p='+'min100'
      let img_id = res.list[i].logo
      // let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:res.list[i].logo,img_kind:'open'}//,img_p:'min200'}
      let item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
      if(item && item.data) res.list[i].url  = item.data
      else{
        // let data = await this.$api.network.getImg(params)
        // res.list[i].url  ='data:image/png;base64,'+data.data
        // imageDb.addData({img_id,data:res.list[i].url })
        this.handleaa(localStorage.user_id,localStorage.s_id,res.list[i])
        //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
      }
    }
    this.list = res.list
      // let i = 0;
      // for(i;i<res.list.length; i++){
      //   let chat_type = res.list[i].chat_type
      //   if(chat_type == "single"){
      //     this.list.push(res.list[i])
      //     // this.user_id = this.list[i].user_a
      //   }
      // }
      // let a = 0;
      // for(a; a<this.list.length; a++){
      //   this.handleaa(localStorage.user_id,localStorage.s_id,this.list[a])
      //   }
      
    },
  },
  created () {
        this.chatlist()
  },
  mounted() {
  },
};
</script>
<style lang="stylus" scoped>
.box >>> .van-nav-bar__text{
  color #222;
  font-size 16px
  // background-color #15a0e7;
  height 30px;
  line-height 30px;
  // margin-right 0px;
  // margin-bottom 3px;
  // border-radius 3px;
}
.van-cell--clickable{
    padding: 5px 15px
}
.box >>> .van-divider {
    clear both
    margin:0;
    padding:0;
    border-top-width:5px;
}
.van-icon-search[data-v-78e97786]::before{
    margin-top:5px;
}
.box {
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
    border-radius: 80px;
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