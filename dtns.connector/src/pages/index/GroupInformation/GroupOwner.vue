<template>
  <div class="box" height="100%">
    <header class="topbar">
      <van-nav-bar title="查看联系人" left-arrow @click-left="back" :right-text="mymark" @click-right="viewMarkList"/>
    </header>
  <div ref="scrollEle" class="home" style="position:fixed;overflow-x:hidden;overflow-y:scroll;top:50px;bottom:50px;left:0;right:0;" >
    <div style="width:100%; height:45px; background-color:#fff;"></div>
    <div style="text-align:center; background-color:#fff; ">
      <img v-lzlogo="logo"  width="81px" height="81px" style="border-radius:50%;">
      <div style="margin-top:12px;">名字 :{{name}}</div>
      <div style="margin-top:12px; padding-bottom: 20px;">tel :{{tel}}</div>
    </div>
  <van-divider v-show="add" />
	<div style="background-color:#fff; width:100%; height:50px; border-bottom:1px solid #F5F5F5" v-show="add">
	  <van-row>
	    <van-col span="11" style="text-align:right; padding-right:8px; padding-top:15px;">
        <svg t="1590831454183" class="icon" viewBox="0 0 1189 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3455" width="21" height="21"><path d="M993.290652 700.993289l-89.342282-34.362417c-48.107383-17.181208-113.395973-37.798658-137.449664-61.852349a30.926174 30.926174 0 0 1-17.181208-27.489932 51.543624 51.543624 0 0 1 20.61745-37.798658c61.852349-58.416107 151.194631-134.013423 151.194631-254.281879A288.644295 288.644295 0 0 0 632.485283 0a285.208054 285.208054 0 0 0-285.208053 285.208054c0 113.395973 75.597315 188.993289 144.322147 250.845637a65.288591 65.288591 0 0 1 24.053691 44.671141c0 6.872483 0 13.744966-13.744966 24.053691a491.38255 491.38255 0 0 1-127.14094 58.416108 432.966443 432.966443 0 0 0-96.214765 37.798658c-113.395973 61.852349-171.812081 123.704698-171.81208 182.120805a144.322148 144.322148 0 0 0 140.885906 140.885906h804.080537a140.885906 140.885906 0 0 0 137.449664-140.885906c0-75.597315-120.268456-147.758389-195.865772-182.120805z m58.416108 254.281879H247.626223a75.597315 75.597315 0 0 1-72.161074-72.161074c0-20.61745 37.798658-68.724832 137.449664-123.704698l82.469799-34.362416a477.637584 477.637584 0 0 0 151.194631-65.288591 103.087248 103.087248 0 0 0 37.798658-79.033557 130.577181 130.577181 0 0 0-48.107383-96.214765c-61.852349-54.979866-120.268456-113.395973-120.268456-199.302013A216.483221 216.483221 0 0 1 632.485283 68.724832a219.919463 219.919463 0 0 1 219.919463 216.483222c0 82.469799-58.416107 137.449664-130.577181 202.738255a123.704698 123.704698 0 0 0-41.234899 92.778523 99.651007 99.651007 0 0 0 41.234899 79.033557 594.469799 594.469799 0 0 0 161.503356 72.161074 474.201342 474.201342 0 0 1 79.033557 30.926175c103.087248 51.543624 158.067114 103.087248 158.067114 120.268456a72.161074 72.161074 0 0 1-68.724832 72.161074z" p-id="3456" fill="#222222"></path><path d="M127.357766 611.651007a30.926174 30.926174 0 0 0 34.362417 34.362416 34.362416 34.362416 0 0 0 34.362416-34.362416v-85.906041h82.469798a34.362416 34.362416 0 0 0 34.362416-34.362416 30.926174 30.926174 0 0 0-34.362416-34.362416H196.082599v-89.342282a34.362416 34.362416 0 0 0-34.362416-34.362416 30.926174 30.926174 0 0 0-34.362417 34.362416v89.342282H34.579243a30.926174 30.926174 0 0 0-34.362416 34.362416 34.362416 34.362416 0 0 0 34.362416 34.362416h92.778523z" p-id="3457" fill="#222222"></path></svg>
	    </van-col>
	    <van-col span="13" style="text-align:left; padding-top:15px;">
	      <div style="font-size:15px;" @click="addTo">添加好友</div>
	    </van-col>
	  </van-row>
	 </div>
   <van-divider v-show="dele" />
   <div style="background-color:#fff; width:100%; height:50px;" v-show="dele" @click="DeleteContact(token_y)">
      <van-row>
        <van-col span="11" style="text-align:right; padding-right:8px; padding-top:15px;">
          <svg t="1590831518417" class="icon" viewBox="0 0 1189 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4297" width="21" height="21"><path d="M1051.70676 1024H247.626223a144.322148 144.322148 0 0 1-140.885906-140.885906c0-58.416107 58.416107-120.268456 171.81208-182.120805a432.966443 432.966443 0 0 1 96.214765-37.798658 491.38255 491.38255 0 0 0 127.14094-58.416108c13.744966-10.308725 13.744966-17.181208 13.744966-24.053691a65.288591 65.288591 0 0 0-24.053691-44.671141c-68.724832-61.852349-144.322148-137.449664-144.322147-250.845637A285.208054 285.208054 0 0 1 632.485283 0a288.644295 288.644295 0 0 1 288.644296 285.208054c0 120.268456-89.342282 195.865772-151.194631 254.281879a51.543624 51.543624 0 0 0-20.61745 37.798658 30.926174 30.926174 0 0 0 17.181208 27.489932c24.053691 24.053691 89.342282 44.671141 137.449664 61.852349l89.342282 34.362417c75.597315 34.362416 195.865772 106.52349 195.865772 182.120805a140.885906 140.885906 0 0 1-137.449664 140.885906zM632.485283 68.724832a216.483221 216.483221 0 0 0-216.483221 216.483222c0 85.90604 58.416107 144.322148 120.268456 199.302013a130.577181 130.577181 0 0 1 48.107383 96.214765 103.087248 103.087248 0 0 1-37.798658 79.033557 477.637584 477.637584 0 0 1-151.194631 65.288591l-82.469799 34.362416c-99.651007 54.979866-137.449664 103.087248-137.449664 123.704698a75.597315 75.597315 0 0 0 72.161074 72.161074h804.080537a72.161074 72.161074 0 0 0 68.724832-72.161074c0-17.181208-54.979866-68.724832-158.067114-120.268456a474.201342 474.201342 0 0 0-79.033557-30.926175 594.469799 594.469799 0 0 1-161.503356-72.161074 99.651007 99.651007 0 0 1-41.234899-79.033557 123.704698 123.704698 0 0 1 41.234899-92.778523c72.161074-65.288591 130.577181-120.268456 130.577181-202.738255A219.919463 219.919463 0 0 0 632.485283 68.724832z" p-id="4298" fill="#222222"></path><path d="M278.552397 525.744966H34.579243a34.362416 34.362416 0 0 1-34.362416-34.362416 30.926174 30.926174 0 0 1 34.362416-34.362416h243.973154a30.926174 30.926174 0 0 1 34.362416 34.362416 34.362416 34.362416 0 0 1-34.362416 34.362416z" p-id="4299" fill="#222222"></path></svg>
        </van-col>
        <van-col span="13" style="text-align:left; padding-top:15px;">
          <div style="font-size:15px;">删除联系人</div>
        </van-col>
      </van-row>
	 </div>
   <van-divider />
    <div style="background-color:#fff; width:100%; height:50px;" @click="chat(token_y)">
      <van-row>
        <van-col span="11" style="text-align:right; padding-right:8px; padding-top:15px;">
          <svg t="1590831575968" class="icon" viewBox="0 0 1190 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4601" width="20" height="20"><path d="M149.128451 1023.56346a54.228528 54.228528 0 0 1-33.89283-6.778566c-44.060679-30.503547-33.89283-94.899923-27.114263-155.907017a179.631998 179.631998 0 0 0 6.778565-81.342791A457.553202 457.553202 0 0 1 0 505.003164C0 227.08196 267.753356 0 593.124522 0s596.513805 227.08196 596.513804 505.003164-267.753356 505.003164-596.513804 505.003164a623.628069 623.628069 0 0 1-250.806941-47.449961 325.371166 325.371166 0 0 0-84.732074 30.503547 311.814034 311.814034 0 0 1-108.457056 30.503546zM593.124522 67.78566C305.035468 67.78566 67.78566 264.364073 67.78566 505.003164a376.210411 376.210411 0 0 0 81.342791 233.860526c23.724981 30.503547 16.946415 81.342792 6.778566 132.182036a247.417658 247.417658 0 0 0-3.389283 84.732075 325.371166 325.371166 0 0 0 81.342792-27.114264c61.007094-23.724981 101.678489-40.671396 132.182036-27.114264a640.574483 640.574483 0 0 0 227.08196 40.671396c291.478336 0 528.728145-193.18913 528.728145-437.217505S884.602858 67.78566 593.124522 67.78566z" p-id="4602" fill="#222222"></path></svg>
        </van-col>
        <van-col span="13" style="text-align:left; padding-top:15px;">
          <div style="font-size:15px;">开始聊天</div>
        </van-col>
      </van-row>
	 </div>
   <van-divider />
   <div style="background-color:#fff; width:100%; height:50px;" @click="gotoDWebUserPage">
      <div style="text-align:center; width:100% ;font-size:15px;padding:17px 0 0 0">
      发布的头榜
      </div>
   </div>
   <van-divider />
   <div v-if="forklist && forklist.length>0" style="background-color:#fff; width:100%; height:50px;">
    <div style="text-align:center; width:100% ;font-size:15px;padding:17px 0 0 0">
      持有的福刻FORK
      </div>
   </div>
   <div v-for="(item,index) in forklist" @click="come(index)"  :key="index" style="width:45%;float:left; margin-left:3%;position:relative;">
      <PopComponent style="width:100%;" :xitem="item" :zoom="0.45" :fullWidth="fullWidth">
      </PopComponent>  
      <!-- <div style="width:100%;" @click="come(index)" >
           @click="clickFull">
                <div v-if="typeof item !='undefined'"
                    class="canvas"
                    :style="{
                        ...getCanvasStyle(item.style),
                        width: (item.style.width-10) + 'px',
                        height: item.style.height + 'px',
                        zoom:  (fullWidth)*0.45 / (item.style.width-10)   ,
                        'transform-origin': 'left top'
                    }">
                      <ComponentWrapper
                          v-for="(subitem, subindex) in item.data"
                          :key="subindex"
                          :config="subitem"
                      />
                </div>
                <div v-else>
                  [Error]ComponentWrapper-data-item is null
                </div>
        </div> -->
    </div>


  </div>

    <div @click="shareUser" style="text-align:center; position:fixed; width:100%; height:50px; background-color:#fff; bottom:0px;">
      <div style="line-height:50px; font-size:15px; color:red;">
        推送至头榜
      </div>
    </div>
    <!--举报该用户-->
    
    
    </div>
    
  <!-- </div> -->
</template>
<script>
import Clipboard from 'clipboard';
import { getStyle, getCanvasStyle } from '@/utils/style'
import { changeStyleWithScale } from '@/utils/translate'
import ComponentWrapper from '@/components/Item/ComponentWrapper'
import PopComponent from '@/components/Item/PopComponent'
import forklistUserOwnListJSON  from '../datajson/forklistUserOwnList.json'
export default {
  components: {
     ComponentWrapper,
     PopComponent,
  },
  data() {
    return {
      add:true,
      dele:true,
      name:'',
      tel:'',
      logo:'',
      url:'',
      userb:'',
      token_y:'',
      forklist:null,
      userForkids:null,
      fullWidth:window.fullWidth,
      isFull: false,
      mymark:'',
    };
  },
  methods:{
    getStyle,
    getCanvasStyle,
    changeStyleWithScale,
    back(){
      this.$router.go('-1')
    },
    async gotoDWebUserPage()
    {
      //dweb-into-user-info
      let dstUserInfo = {user_name:this.name,url:this.logo,user_id:this.userb}
      localStorage.setItem('dweb-into-user-info',JSON.stringify(dstUserInfo))
      this.$router.push('/dweb')
    },
    async come(index) {//跳转进入聊天室
      console.log('come-index:'+index,this.userForkids && this.userForkids.length>index ? this.userForkids[index]:null)
      if(this.userForkids && this.userForkids.length>index)
      {
        localStorage.setItem('fork-goto-id',this.userForkids[index])
        this.$router.push('/fork')
      }else{
        console.log('come-userForkids is empty:',this.userForkids)
      }
        // this.$router.push(`/LiveBroadcast/videoChat/${item.token_y}`)
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
        this.$router.push('/index')
      }else{
        this.$toast.fail('添加失败' + msg)
      }
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
            this.$router.push('/index')
        }else{
            this.$toast.fail("删除失败" + msg)
            
        }
        console.log(res)
    },
    async search(refresh = true){
      let data = JSON.parse(localStorage.getItem('userInfo'));//查找个人用户信息
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              dst_user_id :this.$route.params.user_id
            }
      let res =await imDb.getDataByKey('userInfo-'+user.dst_user_id),that = this,fromNetFlag = false// await this.$api.network.UserInfoto(user),from
      if(res &&res.data){
        res = res.data
        if(refresh)
        this.$api.network.UserInfoto(user).then((d)=>{
          console.log('UserInfoto api-ret:',d)
          if(d && d.ret){
            imDb.addData({key:'userInfo-'+user.dst_user_id,data:d})
            that.search(false)
          }
        })
      }
      else res = await this.$api.network.UserInfoto(user),fromNetFlag = true
      if(!res ||!res.ret) return 
      if(fromNetFlag){
        imDb.addData({key:'userInfo-'+user.dst_user_id,data:res})
      }

      console.log(res.is_contact)
      if(res.is_contact)
      {
        this.add = false
        this.dele = true
      }else
      {
        this.add = true
        this.dele = false
      }
      this.name = res.user_name
      this.tel = res.phone
      this.logo = res.logo
      this.userb = res.user_id
      console.log(res)
      //this.url = `${this.$baseUrl}/image/view?user_id=`+localStorage.user_id+'&s_id='+localStorage.s_id+'&filename='+this.logo+'&img_kind='+'open'+'&img_p='+img_p
    },
    async chat(refresh = true){
      let data = JSON.parse(localStorage.getItem('userInfo'));//开始聊天
      let random = Math.random()
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              user_b:this.userb,
              random:random
            }

      // let res = await this.$api.network.ChatSingle(user)
      let res = null, singleCache = await imDb.getDataByKey('single-to-'+this.userb),fromNetFlag = false,that= this
      if(singleCache && singleCache.data && 
        (singleCache.data.user_a == this.userb || singleCache.data.user_b == this.userb))//该语句避免引入错误的缓存（切换两个账号时出现错误缓存）
      {
        res = singleCache.data
      }else{
        res = await this.$api.network.ChatSingle(user)
        fromNetFlag = true
      }
      console.log('chat-res:'+JSON.stringify (res))
      // alert('chat-res:'+JSON.stringify (res))
      if(!res || !res.ret) return this.$toast.fail('【网络错误】无法联系他/她，可能网络出了问题，麻烦重试')
      if(fromNetFlag){
        imDb.addData({key:'single-to-'+this.userb,data:res})
      }
      if(res.ret){
        this.token_y = res.chatid
        this.$router.push(`/index/chat/${this.token_y}`)
      }else{
        this.$toast.fail("失败" + res.msg)
      }
    },
    async shareUser(){
      let sharechat = {dst_user_id:this.userb,img:this.logo,
          title:this.name,share_user_id:localStorage.user_id}
      let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,xtype:'user',
        xmsg:'我分享了一个用户：',xobj:JSON.stringify(sharechat),random:Math.random()}
      let ret = await this.$api.network.sendXMSG(params)
      if(!ret || !ret.ret) return this.$toast('分享失败，原因：'+(ret && ret.msg ? ret.msg:'未知网络原因'))
      this.$toast('分享成功！1秒后将自动跳转至头榜...')
      localStorage.setItem('newDWebFlag','1')
      setTimeout(()=>this.$router.push('/dweb'),1000)
    },
    viewMarkList(){
      if(localStorage.user_id != this.$route.params.user_id) return 
      let dstUserInfo = {user_name:this.name,url:this.logo,user_id:this.userb,label_type:'relf'}
      localStorage.setItem('dweb-into-user-info',JSON.stringify(dstUserInfo))
      this.$router.push('/dweb')
    }
    
  },
  async mounted() {
    this.mymark = localStorage.user_id == this.$route.params.user_id ? '我的收藏':''
    this.search();

    let userForkListRet = await this.$api.network.listUserForkList({user_id:localStorage.user_id,s_id:localStorage.s_id,dst_user_id:this.$route.params.user_id,begin:0,len:1000})
    console.log('userForkListRet:',userForkListRet)
    if(!userForkListRet || !userForkListRet.ret || !userForkListRet.list)
      return 
    let list = userForkListRet.list
    this.userForkList = list
    console.log('this.userForkList:',this.userForkList)
    let forklist = []
    let objids = []
    let templateStr = JSON.stringify(forklistUserOwnListJSON)
    for(let i=0;i<list.length;i++)
    {
      let info = list[i]
      if(!info.nft_status || info.nft_status != 'ok')
      {
        console.log('list-i:'+i,info,'---error-fork-status:'+info.nft_status)
        continue
      }
      let str = templateStr.replace('$title',info.work_name)
      str = str.replace('$image_url',info.work_image)
      str = str.replace('$forkid',info.FORKID)
      try{
        forklist.push(JSON.parse(str))
        objids.push(info.obj_id)
      }catch(ex){
        console.log('forklist.push-obj-parse failed:'+ex,ex)
      }
    }
    this.forklist = forklist
    this.userForkids = objids
    console.log('this.forklist:',forklist)
  },
  async created() {
    //重新获得全屏宽度，以便zoom计算MsgItem的宽度缩放比
    let This = this
    this.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth;
          This.fullWidth = fullWidth
          console.log('window.fullWidth:'+fullWidth)
          console.log('this.isFull:'+This.isFull)
      })();
    };
    this.onresize()
    window.addEventListener('resize',this.onresize,true)
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
.box >>> .van-icon-arrow-left::before{
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