<template>
  <div class="box">

      <div>
        <van-nav-bar
        title="选择联系人"
        right-text="确认"
        :fixed="true"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        />
    <div style="width:100%; margin:0; padding:0;">
      <div class="search-line" style=" width:100%; height:35px;  background-color:#fff; margin:0; border:none;">
        <van-icon name="search" style="float:left; margin-top:5px;" />
        <input type="text" placeholder="搜索" v-model="txt" style=" float:left;font-size:14px; background-color:#fff; padding-left:4px; margin-top:-2px;" />
      </div>
    </div>
    <van-divider />
    <van-radio-group v-model="result">
        <van-cell-group>
            <van-cell
            v-for="(item, index) in list"
            clickable
            :key="index"
            @click="toggle(item)"
            >
            <div style="float:left;">
                <img :src="item.url" alt="" style="width:30px; height:30px; border-radius:50%; margin-top:5px;">
            </div>
            <div style="font-sisz:14px; padding-left:10px; float:left; margin-top:10px;">{{item.user_name}}</div>
            <template #right-icon>      
                <van-radio :name="item" />
            </template>
            </van-cell>
        </van-cell-group>
    </van-radio-group>
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
      card_name:'',
      logox:'',
      user_id:'',
      logo_url:'',
      chat_type:''
    };
  },
  methods: {
    Personal() {
      this.$router.push('/perdata')
    },
    onClickLeft(){
      this.$router.go(-1)
    },
    toggle(item) {//单选框选中时拿到user_id
      console.log(item)
      this.card_name = item.user_name
      this.logox = item.logo
      this.user_id = item.user_id
      this.logo_url = item.logo_url
      // this.msg = item.user_name + '发送了一张名片'
      
    },
    ////
    async onClickRight(){//发送联系人名片
      let data = JSON.parse(localStorage.getItem('userInfo'));//查找个人用户信息
      let random = Math.random()
            let user = {
              user_id:localStorage.user_id, 
              s_id:localStorage.s_id,
              chatid:this.$route.params.chat_id,
              msg:data.user_name + '发送了一个联系人',
              name:this.user_id,
              logo:this.logox,
              logo_url:this.logo_url,
              card_type:this.chat_type,
              card_name:this.card_name,
              random:random,
            }
      let res =  await this.$api.network.ChatSendNamecard(user)
      if(res.ret){
        // this.$toast.success('分享成功')
        this.$router.go(-1)
      }else{
        this.$toast.fail('失败' +res.msg)
      }
    //   console.log(res)
    },
    //
    async chatlist(){
      let data = JSON.parse(localStorage.getItem('userInfo'));//
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              begin:0,
              len:5000,
            }
      let res =  await this.$api.network.ChatList(user)
      if(res.list.length == 0){
        this.add = true
      }else{
        this.add = false
      }
	  this.list = res.list
      console.log(res)
    
    let i = 0
    for(i; i<res.list.length; i++){
      res.list[i].url = `${this.$baseUrl}/image/view?user_id=`+res.list[i].user_id+'&s_id='+res.list[i].s_id+'&filename='+ res.list[i].logo+'&img_kind='+'open'+'&img_p='+'min100'
    }
    },
    async Administration(){//查看群信息
      let users = {
              user_id:localStorage.user_id,
              s_id:localStorage.s_id,   
              chatid:this.$route.params.chat_id,
            }
      let ress =  await this.$api.network.ChatInfo(users)//群信息
      console.log(ress)
      this.chat_type = ress.chat_type
   },
  },
  created () {
        this.chatlist()
        this.Administration()
  },
  mounted() {
  },
};
</script>
<style lang="stylus" scoped>
.van-nav-bar__text{
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
.box >>> s.van-icon-search::before{
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
.box >>> .van-nav-bar__text{
  color:#000;
}
.search_user >>> .van-icon{
    font-size: 30px
    margin:auto 10px
    
    
}
</style>