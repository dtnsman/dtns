<template>
  <div class="box">

      <div>
        <van-nav-bar
        :title="removeFriendFromChatStr"
        :right-text="okStr"
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
            @click="toggle(item.user_id)"
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
      join_uids:'',
      removeFriendFromChatStr:'删除群成员',
      okStr:'确认'
    };
  },
  methods: {
    Personal() {
      this.$router.push('/perdata')
    },
    onClickLeft(){
      this.$router.go(-1)
    },
    toggle(index) {//单选框选中时拿到user_id
    this.join_uids = index
    //   console.log(this.join_uids)
      
    },
    ////
    async onClickRight(){//删除群成员
      let data = JSON.parse(localStorage.getItem('userInfo'));
      let random = Math.random()
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              random:random,
              mem_user_id:this.join_uids,
              chatid:this.$route.params.chatid,
            }
      let res =  await this.$api.network.ChatMemDel(user)
      if(res.ret){
        this.$toast.success('成功')
        this.$router.go(-1)
      }else if(res.msg == 'error: can not del yourself'){
        this.$toast.fail('该成员是群主不可删除')
      }else{
        this.$toast.fail('失败' +res.msg)
      }
    //   console.log(res)
    },
    //
    async chatlist(){
      let data = JSON.parse(localStorage.getItem('userInfo'));//群成员列表
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              chatid:this.$route.params.chatid,
              begin:0,
              len:1000,
            }
      let res =  await this.$api.network.ChatMamList(user)
    console.log(res)
    let i = 0
    this.list = res.list
    for(i; i<res.list.length; i++){
	   res.list[i].url = `${this.$baseUrl}/image/view?user_id=`+res.list[i].user_id+'&s_id='+res.list[i].s_id+'&filename='+ res.list[i].logo+'&img_kind='+'open'+'&img_p='+'min300'
    }
    },
    translate()
    {
      // removeFriendFromChatStr:'删除群成员',
      // okStr:'确认'
        this.removeFriendFromChatStr = g_dtnsStrings.getString('/index/chat/friend/remove')
        this.okStr    =g_dtnsStrings.getString('/index/chat/invite/ok')
    }
  },
  created () {
        this.chatlist()
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