<template>
  <div class="box">

      <div>
        <van-nav-bar
        :title="inviteFriend2chatStr"
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
      join_uids:[],
      inviteFriend2chatStr:'邀请好友加入群聊',
      okStr:'确认',
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
    ////
    async onClickRight(){//将联系人拉近群聊
      let data = JSON.parse(localStorage.getItem('userInfo'));
      let random = Math.random()
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              random:random,
              join_uids:JSON.stringify(this.join_uids),
              chatid:this.$route.params.chatid,
            }
      let res =  await this.$api.network.ChatByContact(user)
      if(res.ret){
        this.$toast.success('邀请成功')

        //将被邀请人的web3hash密钥，设置为xxxx.
        console.log('now to set join-uids web3key:')
        let web3keyInfoRet = await this.$api.network.queryChatWeb3key({list_id:this.$route.params.chatid,
              user_id:localStorage.user_id,
              s_id:localStorage.s_id})
        console.log('web3keyInfoRet:',web3keyInfoRet)
        if(web3keyInfoRet && web3keyInfoRet.ret)
        {
          let web3key_hash = web3keyInfoRet.web3key_hash
          let web3key = await iWalletDb.getDataByKey('web3key_hash:'+web3key_hash)
          if(!web3key)
          {
            this.$toast.fail('【注意】设置新拉进群成员的密钥失败，原因为：您没有该聊天室的加密密钥！')
            return ;
          }
          web3key = web3key.data
          console.log('now set-join-uids-web3-key:',web3key,web3key_hash)

          //设置新的aes-key
          let users = this.join_uids
          
          if(users.length<=0){
            console.log('[Error]chat-mems-list is empty',users)
            return
          }
          let userPubkeysRet = await this.$api.network.queryUsersPubkeys({users:JSON.stringify(users),user_id:localStorage.user_id,
                  s_id:localStorage.s_id})
          console.log('userPubkeysRet',userPubkeysRet)
          if(!userPubkeysRet || !userPubkeysRet.ret || !userPubkeysRet.list) {
            console.log('【注意】设置新拉进群成员的密钥失败，原因为获取成员公钥列表失败！')
            this.$toast.fail('【注意】设置新拉进群成员的密钥失败，原因为获取成员公钥列表失败！')
            return ;
          }
          let pubkeys = userPubkeysRet.list
      
          let need_set_flag = false
          for(let i=0;i<pubkeys.length;i++)
          {
            if(pubkeys[i] && pubkeys[i].public_key)
            {
              pubkeys[i].encrptoKeyText =await sign_util.encryptSomethingInfo(web3key,pubkeys[i].public_key)
              need_set_flag = pubkeys[i].encrptoKeyText ? true :false
            }else{
              console.log('pubkeys-i:'+i+'.public_key is empty:',pubkeys[i])
            }
          }

          if(!need_set_flag)
          {
            console.log('【注意】设置聊天室相应的chatWeb3Key失败，原因：使用公钥加密聊天密钥失败！')
            this.$toast('【注意】设置聊天室相应的chatWeb3Key失败，原因：使用公钥加密聊天密钥失败！')
            return ;
          }

          //设置密钥
          let setWeb3keysRet = await this.$api.network.setUsersWeb3keys(
            {list_id:this.$route.params.chatid,list:JSON.stringify(pubkeys),user_id:localStorage.user_id,
                  s_id:localStorage.s_id,web3key_hash,set_chat_web3key_hash_flag:true})
          //{user_id,s_id,list,list_id} 
          console.log('setWeb3keysRet',setWeb3keysRet)
          if(setWeb3keysRet && setWeb3keysRet.ret){
            // iWalletDb.addData({key:'web3key_hash:'+web3key_hash,data:web3key})//添加到iwallet
            this.chatWeb3Key = web3key
          }else{
            console.log('【错误】批量设置user-web3keys失败！出错信息：'+JSON.stringify(setWeb3keysRet))
            this.$toast('【错误】批量设置user-web3keys失败！出错信息：'+JSON.stringify(setWeb3keysRet))
            return 
          }
        }else{
          console.log('【错误】聊天密钥hash可能还未设置!')
          this.$toast('【错误】聊天密钥hash可能还未设置!')
        }
        setTimeout(()=>this.$router.go(-1),1000)
      }else{
        this.$toast.fail('邀请失败' +res.msg)
      }
      console.log(res)
    },
    ////
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
      // let ress =  await this.$api.network.UserInfoto({
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
      let This = this
      let data = JSON.parse(localStorage.getItem('userInfo'));//联系过的所有用户
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              begin:0,
              len:1000,
            }
      let res =  await this.$api.network.ChatList(user)
    console.log(res)
    let i = 0
    
    for(i; i<res.list.length; i++){
	   //res.list[i].url = 'api/image/view?user_id='+res.list[i].user_id+'&s_id='+res.list[i].s_id+'&filename='+ res.list[i].logo+'&img_kind='+'open'+'&img_p='+'min100'
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
     // let item = localStorage.getItem('img-'+img_id)
    // if(item) res.list[i].url = item
    // else
    // {
    //   let data = await This.$api.network.getImg(params)
    //   res.list[i].url ='data:image/png;base64,'+data.data
    //   localStorage.setItem('img-'+img_id,res.list[i].url)
    //   this.chatRexord =  This.chatRexord
    // }
  
    }
    this.list = res.list
    },
    translate()
    {
      // inviteFriend2chatStr:'邀请好友加入群聊',
      // okStr:'确认',
        this.inviteFriend2chatStr = g_dtnsStrings.getString('/index/chat/invite/friend')
        this.okStr    =g_dtnsStrings.getString('/index/chat/invite/ok')
    }
  },
  created () {
    if(typeof g_pop_event_bus!='undefined')
    {
      g_pop_event_bus.on('update_dtns_loction',this.translate)
    }
    this.translate()

    this.chatlist()
  },
  beforeDestroy () {
    console.log('into beforeDestroy()')
    if(typeof g_pop_event_bus!='undefined')
    {
      g_pop_event_bus.removeListener('update_dtns_loction',this.translate)
    }
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