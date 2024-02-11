<!--
 * @Descripttion: 
 * @version: 
 * @Author: hengzi
 * @Date: 2020-03-11 17:24:27
 * @LastEditors: hengzi
 * @LastEditTime: 2020-03-21 15:13:18
 -->
<template>
<div class="box" style="width:100%; height:100%; background-color:#fff;">
    <header class="topbar">
      <van-nav-bar title="聊天管理" :fixed="true" left-arrow @click-left="onClickLeft" @click-right="onClickRight(chatid)">
        <template #right>
          <div style="font-size:15px;" v-if="is_owner == true">转让</div>
        </template>
      </van-nav-bar>
    </header>
	<div style="height: 44px;"></div>
    <div>
        <div style="padding-left:6px; padding-right:10px;">
          <van-row>
          <div v-for="(item,index) in list" :key="index" @click="Personal(item.user_id)">
            <van-col span="4" style="text-align:center; font-size:12px; color:#555; padding:15px 0 0 0;">
              <img :src="item.url" alt="" style="width:2.65rem; height:2.65rem; border-radius:4px;">
              <div style="padding:0; width:2.8rem; margin:0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.user_name}}</div>
            </van-col>
         </div>
            <van-col span="4" style="text-align:center; font-size:12px; color:#555; padding:1rem 0 0 0;" @click="joinS">
                <div style="margin:0 auto; width:2.65rem; height:2.65rem; border:1px solid #bbb; border-radius:5px; box-sizing: border-box;">
                  <div style="padding-top:4px;">
                    <van-icon name="plus" id="icon" />
                  </div>
                </div>
                <div style="text-align: center;">
                  <p style="padding-top:2px; margin:0;">邀请</p>
              </div>
            </van-col>
          <van-col v-show="show" span="4" style="text-align:center; font-size:12px; color:#555; padding:1rem 0 0 0;" @click="deleteChat">
              <div style="align: center; width: 100%;">
                <div style=" margin:0 auto; width:2.65rem; height:2.65rem; border:1px solid #bbb; border-radius:6px; box-sizing: border-box; ">
                  <div style="padding-top:9px;">
                    <svg t="1586943105006" class="icon" viewBox="0 0 13071 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1500" width="22" height="22"><path d="M12559.36 1024H512a512 512 0 0 1 0-1024h12047.36a512 512 0 0 1 0 1024z" p-id="1501"></path></svg>
                    <!-- <van-icon name="cross" id="icon" /> -->
                  </div>
                </div>
              </div>
              <p style="padding-top:2px;margin:0;">删除</p>
          </van-col>
      </van-row>   
        </div>
      
      <van-divider :style="{color:'red', height:'5px'}" />
      <van-cell title="群名称" :value="chatName" is-link style="font-size:14px;" @click="nickname(chatid)" />
      <div v-show="show" style="width:100%; margin:0; padding:0;position:relative;">
        <van-cell title="群头像" is-link style="font-size:14px;" @click="chatPortrait(chatid)" />
        <div style="position:absolute;top:5px; right:38px;">
          <img :src="img" alt="" width="32px;" height="32px;" style="border-radius:5px;" >
        </div>
      </div>
      <div style="width:100%; margin:0; padding:0;position:relative;">
        <van-cell title="群背景" is-link style="font-size:14px;" @click="GroupBackground(chatid)" />
        <div style="position:absolute;top:5px; right:38px;">
          <img :src="backgroup_img" alt="" :width="bgw" :height="bgh" style="border-radius:5px;" >
        </div>
      </div>
      <div v-show="show" style="width:100%; margin:0; padding:0; position:relative;">
        <van-cell title="福刻访问权限" is-link :value="forkids" @click="poster(chatid)" style="font-size:14px;"  />
      </div>
      <div v-show="show" style="width:100%; margin:0; padding:0; position:relative;">
        <van-cell title="头榜访问权限" is-link :value="xmsgids" @click="poster_xmsgids(chatid)" style="font-size:14px;"  />
      </div>
      <div v-show="show" style="width:100%; margin:0; padding:0; position:relative;">
        <van-cell title="VIP访问权限" is-link :value="vip" @click="RevisionMember(chatid)" style="font-size:14px;"  />
        <div style="position:absolute;top:11px; right:70px;" v-show="vip1">
          <svg t="1586487023024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1495" width="14" height="20"><path d="M512.409161 0a511.992571 511.992571 0 1 0 511.591008 511.992571A512.394134 512.394134 0 0 0 512.409161 0z" fill="#12ADF5" p-id="1496"></path><path d="M471.851318 803.125602a27.30627 27.30627 0 0 1-8.031256 0 40.15628 40.15628 0 0 1-30.920335-28.912522L332.910589 392.326856H238.944894a40.15628 40.15628 0 0 1 0-80.31256h124.886031a40.15628 40.15628 0 0 1 40.15628 29.715648l86.737565 332.493999 264.228323-346.548698a40.15628 40.15628 0 0 1 63.848485 48.589099l-315.226798 412.003434a40.15628 40.15628 0 0 1-31.723462 14.857824z" fill="#FFFFFF" p-id="1497"></path></svg>
        </div>
      </div>
      <div v-show="show" style="width:100%; margin:0; padding:0; position:relative;">
        <van-cell title="消息权限" is-link :value="news" @click="ChatLevel(chatid)" style="font-size:14px;"  />
        <div style="position:absolute;top:11px; right:70px;" v-show="news1">
          <svg t="1586487023024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1495" width="14" height="20"><path d="M512.409161 0a511.992571 511.992571 0 1 0 511.591008 511.992571A512.394134 512.394134 0 0 0 512.409161 0z" fill="#12ADF5" p-id="1496"></path><path d="M471.851318 803.125602a27.30627 27.30627 0 0 1-8.031256 0 40.15628 40.15628 0 0 1-30.920335-28.912522L332.910589 392.326856H238.944894a40.15628 40.15628 0 0 1 0-80.31256h124.886031a40.15628 40.15628 0 0 1 40.15628 29.715648l86.737565 332.493999 264.228323-346.548698a40.15628 40.15628 0 0 1 63.848485 48.589099l-315.226798 412.003434a40.15628 40.15628 0 0 1-31.723462 14.857824z" fill="#FFFFFF" p-id="1497"></path></svg>
        </div>
      </div>
      <div v-show="show" style="width:100%; margin:0; padding:0; position:relative;">
        <van-cell title="邀请权限" is-link :value="Invitation" @click="LaRank(chatid)" style="font-size:14px;"  />
        <div style="position:absolute;top:11px; right:70px;" v-show="Invitation1">
          <svg t="1586487023024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1495" width="14" height="20"><path d="M512.409161 0a511.992571 511.992571 0 1 0 511.591008 511.992571A512.394134 512.394134 0 0 0 512.409161 0z" fill="#12ADF5" p-id="1496"></path><path d="M471.851318 803.125602a27.30627 27.30627 0 0 1-8.031256 0 40.15628 40.15628 0 0 1-30.920335-28.912522L332.910589 392.326856H238.944894a40.15628 40.15628 0 0 1 0-80.31256h124.886031a40.15628 40.15628 0 0 1 40.15628 29.715648l86.737565 332.493999 264.228323-346.548698a40.15628 40.15628 0 0 1 63.848485 48.589099l-315.226798 412.003434a40.15628 40.15628 0 0 1-31.723462 14.857824z" fill="#FFFFFF" p-id="1497"></path></svg>
        </div>
      </div>
      <van-cell v-show="show" title="管理员" is-link :value="Administrators" @click="Administratorss(chatid)" style="font-size:14px;"  />
      <div v-show="show" style="width:100%; margin:0; padding:0;position:relative;">
        <van-cell title="群主" is-link :value="GroupOwner" @click="GroupOwners(GroupOwner_id)" style="font-size:14px;"  />
        <div style="position:absolute;top:5px; right:38px;">
          <img :src="GroupOwner_img" alt="" width="32px;" height="32px;" style="border-radius:5px;" >
        </div>
      </div>
      <div style="width:100%; margin:0; padding:0;position:relative;margin-bottom:2px;">
        <van-cell title="群分享" is-link style="font-size:14px;" @click="GroupSharing(chatid)" />
        <div style="position:absolute;top:5px; right:38px;">
          <img :src="url" alt="" width="32px;" height="32px;" style="border-radius:5px;" >
        </div>
      </div>
       <div>
        <van-cell title="开启阅后即焚" is-link style="font-size:14px;" @click="clickBurnTime" />
        <div style="position:absolute;top:5px; right:38px;">
          <!-- <img :src="url" alt="" width="32px;" height="32px;" style="border-radius:5px;" > -->
        </div>
      </div>
      <!-- <div>
        <p style="font-size:13px; color:#353535; padding-left:15px;">群二维码</p>
        <div style="text-align:center;">
          <img v-image-preview :src="url" alt="" style="width:120px; height:120px;">
        </div>
      </div> -->
      <div @click="SignOut" style="font-size:14px; color:red; height:50px; position:fixed; bottom:0; text-align:center; border-top:5px solid #f5f5f5; width:100%; line-height:45px; z-index:999; background-color:#fff;">
        退出群聊
      </div>
    </div>
    <van-popup v-model="showx" position="bottom" @close="clikcBurnTime">
      <van-radio-group v-model="burn">
        <van-cell-group>
          <van-cell :title="item.label" v-for="item of burnTime" :key="item.name" @click="burn = item.name;unshowPopup(item.label,item.name)">
            <template #right-icon>
              <van-radio :name="item.name"/>
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
        <!-- <van-radio-group v-model="burn">
          <van-radio :name="item.name" checked-color="#07c160" v-for="item of burnTime" :key="item.name">{{item.label}}</van-radio>
      </van-radio-group> -->
    </van-popup>
</div>
    

</template>
<script>
import { Dialog } from 'vant';

export default{
    data(){
        return{
          showx:false,
          show:true,
          GroupOwner_img:'',
          Invitation:0,
		      Invitation1:true,
          news:0,
		      news1:true,
          GroupOwner_id:'',
          Administrators:0,
          GroupOwner:'',
          is_owner:true,
          is_manager:true,
          is_join:true,
          forkids:null,
          xmsgids:null,
          vip:0,
		      vip1:true,
          chatName:'',
          invite_vip_level:'',
          user_vip_level:0,
          img:'',
          backgroundImg:'',
          url:'',
          value:'',
          list:[],
          logo:[],
          user_id:[],
          chat_type:'',
          share_pm:'',
          share_userid:false,
          backgroup_img:'',
          bgw:'0px',bgh:'0px',
          show: false,
          burn: '',
          names:'',
          burnTime:[
             {
            name: 0,
            label: '关闭阅后即焚'
          },
            {
            name: 5,
            label: '5秒'
          },
            {
            name: 60,
            label: '一分钟'
          },
          {
            name: 1800,
            label: '半小时'
          },
          {
            name: 3600,
            label: '一小时'
          },
          {
            name: 43200,
            label: '半天'
          },
          {
              name: 86400,
              label: '一天'
          },
          {
            name: 604800,
            label: '一周'
          }
          ]
        }
    },
    components:{
      [Dialog.Component.name]: Dialog.Component,
        // [NavBar.name]: NavBar
    },
    
    methods:{
        unshowPopup(label,burnTimename){
        this.burn = burnTimename
        localStorage.setItem('burnTimename',burnTimename)
        this.showx = !this.showx;
        if(label!=="关闭阅后即焚"){
          Dialog.alert({
          message: `消息失效时间已设置为：${label}`,
          }).then(() => {
        // on close
        });
        }
        else{
          Dialog.alert({
          message: "已关闭阅后即焚",
          }).then(() => {
        // on close
        });
        }
      },
      GroupSharing(chatid){//跳转群分享页面
        // console.log(this.user_id)
        let i = 0;
        for(i=0;i<this.user_id.length;i++){
          if(this.user_id[i] == localStorage.user_id){
            this.share_userid = true
          }
        }
        console.log(this.share_userid)
        if(this.share_pm == 0 && this.share_userid !== true){
          this.$toast.fail('仅该群的群成员可访问')
          return
        }else{
          this.$router.push(`/index/GroupSharing/${chatid}`)
        }
      },

      GroupBackground(chatid){//跳转修改群背景页面
        this.$router.push(`/index/GroupBackground/${chatid}`)
      },///

      onClickRight(chatid){//跳转转让群主页面
        this.$router.push(`/index/TurnChat/${chatid}`)
      },///

      nickname(chatid){//跳转修改昵称页面
        if(this.is_owner == true){
          this.$router.push(`/index/GroupInformation/GroupNickname/${chatid}`)
        }else if(this.is_manager == true){
          this.$router.push(`/index/GroupInformation/GroupNickname/${chatid}`)
        }else{
          this.$toast.fail('操作失败，你没有该权限',2000)
        }
      },///

      chatPortrait(chatid){//跳转修改群头像
        if(this.is_owner == true){
          this.$router.push(`/index/GroupInformation/GroupHeads/${chatid}`)
        }else if(this.is_manager == true){
          this.$router.push(`/index/GroupInformation/GroupHeads/${chatid}`)
        }else{
          this.$toast.fail('操作失败，你没有该权限',2000)
        }
      },///
      poster(chatid){
        localStorage.setItem('poster_type','FORKIDS')
        localStorage.setItem('poster_value',this.forkids ? this.forkids:'')
        if(this.is_owner == true){
          this.$router.push(`/poster/${chatid}`)
        }else if(this.is_manager == true){
          this.$router.push(`/poster/${chatid}`)
        }else{
          this.$toast.fail('操作失败，你没有该权限',2000)
        }
      },
      poster_xmsgids(chatid){
        localStorage.setItem('poster_type','xmsgids')
        localStorage.setItem('poster_value',this.xmsgids ? this.xmsgids:'')
        if(this.is_owner == true){
          this.$router.push(`/poster/${chatid}`)
        }else if(this.is_manager == true){
          this.$router.push(`/poster/${chatid}`)
        }else{
          this.$toast.fail('操作失败，你没有该权限',2000)
        }
      },
      RevisionMember(chatid){//跳转设置群权限
        if(this.is_owner == true){
          this.$router.push(`/index/GroupInformation/MembershipLevel/${chatid}`)
        }else if(this.is_manager == true){
          this.$router.push(`/index/GroupInformation/MembershipLevel/${chatid}`)
        }else{
          this.$toast.fail('操作失败，你没有该权限',2000)
        }
      },///

      ChatLevel(chatid){//跳转修改聊天权限页面
        if(this.is_owner == true){
          this.$router.push(`/index/GroupInformation/ChatLevel/${chatid}`)
        }else if(this.is_manager == true){
          this.$router.push(`/index/GroupInformation/ChatLevel/${chatid}`)
        }else{
          this.$toast.fail('操作失败，你没有该权限',2000)
        }
      },///

      LaRank(chatid){//跳转修改邀请权限页面
        if(this.is_owner == true){
          this.$router.push(`/index/GroupInformation/LaRank/${chatid}`)
        }else if(this.is_manager == true){
          this.$router.push(`/index/GroupInformation/LaRank/${chatid}`)
        }else{
          this.$toast.fail('操作失败，你没有该权限',2000)
        }
      },///

      Administratorss(chatid){//跳转管理员页面
        this.$router.push(`/index/GroupInformation/Administrators/${chatid}`)
      },///

      GroupOwners(user_id){//跳转群主页面
        this.$router.push(`/index/GroupInformation/GroupOwner/${user_id}`)
      },///

      onClickLeft(){//返回上一层
        this.$router.go(-1)
      },///

      Personal(user_id){//点击头像查看个人信息
        this.$router.push(`/index/GroupInformation/GroupOwner/${user_id}`)
      },
      async joinS(){//邀请好友加入群聊
        if(this.chat_type == 'single')
        {
          this.$router.push('/index/GroupChat')
          return;
        }
        if(this.is_owner == true){
          this.$router.push(`/index/joinChat/${this.chatid}`)
        }else if(this.invite_vip_level <= this.user_vip_level){
            console.log(this.invite_vip_level)
          this.$router.push(`/index/joinChat/${this.chatid}`)
        }else{
          console.log(this.invite_vip_level)
          this.$toast.fail('本群邀请需要VIP' + this.invite_vip_level + ',你的会员为VIP' + this.user_vip_level + ',请充值',2000)
        }
      },
      async deleteChat(){//删除群成员
        if(this.is_owner == true){
          this.$router.push(`/index/deleteChat/${this.chatid}`)
        }else if(this.is_manager == true){
          this.$router.push(`/index/deleteChat/${this.chatid}`)
        }else{
          this.$toast.fail('操作失败，你没有该权限',2000)
        }
        
      },
      //
      async SignOut(){//退出群聊 
        let random = Math.random()
          let user = {
              user_id:localStorage.user_id,
              s_id:localStorage.s_id,   
              chatid:this.$route.params.token,
              random:random,
            }
        let res =  await this.$api.network.ChatUnjoin(user)
        this.$dialog.alert({
                title: "退出群聊", //加上标题
                message: "是否确认退出群聊？", //改变弹出框的内容
                showCancelButton: true,//展示取水按钮
                width: 300
        })
        .then(() => { //点击确认按钮后的调用
                  if(res.ret){
                  this.$toast.success("退出成功")
                  this.$router.go(-2)
                }else if(res.msg == "can't unjoin single-chat"){
                  this.$toast.fail('失败，无法退出个人聊天')
                }else{
                  this.$toast.fail('退出失败' + res.msg)
                }
        })
        .catch(() => { //点击取消按钮后的调用
                // console.log("点击了取消按钮噢")
        })
       
      },
      ///
      async join(){
        let data = JSON.parse(localStorage.getItem('userInfo'));
        let random = Math.random()
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,   
              chatid:this.$route.params.token,
              begin:0,
              len:20
            }
      this.burn = parseInt(localStorage.getItem('burnTimename'))
      this.chatid = this.$route.params.token
      let res =  await this.$api.network.ChatMamList(user)//群所有成员列表
      this.list = res.list
      console.log(res)
      let i = 0
      if(res.ret){
        for(i=0; i<res.list.length; i++) {
        this.logo = res.list[i].logo
        this.user_id.push(res.list[i].user_id)
        // res.list[i].url =`${this.$baseUrl}/image/view?user_id=`+this.user_id+'&s_id='+localStorage.s_id+'&filename='+this.logo+'&img_kind='+'open'+'&img_p='+'min200'
        // console.log(this.user_id)

        let img_id = this.logo,tmp = res.list[i],This = this
        let item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
        // .then((item)=>{
        let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'} 
        tmp.url = item ? item.data : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
        if(!item) 
        {
          This.$api.network.getImg(params).then((data)=>{
            tmp.url  ='data:image/png;base64,'+data.data
            imageDb.addData({img_id,data:tmp.url })
          }).catch((ex)=>{
            console.log('load img error',ex)
          })
          //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
        }
      }
      }
    ////
      // this.url = `${this.$baseUrl}/qrcode/draw?data=`+this.$route.params.token+'&random='+random //通过聊天室id生成二维码
      // console.log(this.url)
      let img_id = this.$route.params.token,This = this
      let item = await imageDb.getDataByKey('qrcode-'+img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
      // .then((item)=>{
      let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open',qrcode:'yes'}//,img_p:'min200'} 
      this.url = item ? item.data : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
      if(!item) 
      {
        // This.$api.network.getImg(params).then((data)=>{
        //   This.url  ='data:image/png;base64,'+data.data
        //   imageDb.addData({img_id:'qrcode-'+img_id,data:This.url })
        // }).catch((ex)=>{
        //   console.log('load img error',ex)
        // })

        QRCode.toDataURL(img_id)
          .then(url => {
            //console.log(url)
            This.url = url
            imageDb.addData({img_id:'qrcode-'+img_id,data:This.url })
          })
          .catch(err => {
            console.error(err)
          })
        //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
      }
      },
   async Administration(){//查看群信息
      let users = {
              user_id:localStorage.user_id,
              s_id:localStorage.s_id,   
              chatid:this.$route.params.token,
            }
      let ress =  await this.$api.network.ChatInfo(users)//群信息
      // this.img = `${this.$baseUrl}/image/view?user_id=`+ress.create_user_id+'&filename='+ress.chatlogo+'&img_kind='+'open'+'&img_p='+'min1000'
      
      let img_id = ress.chatlogo,This = this
      let item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
      // .then((item)=>{
      let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'} 
      this.img = item ? item.data : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
      if(!item) 
      {
        This.$api.network.getImg(params).then((data)=>{
          if(data  && data.data)
          {
            This.img  ='data:image/png;base64,'+data.data
            imageDb.addData({img_id:ress.chatlogo,data:This.img })
          }
        }).catch((ex)=>{
          console.log('load img error',ex)
        })
        //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
      }
      

      console.log("ChatInfo:");
      console.log(ress)
       localStorage.setItem("chatlogo",this.img)
       this.chatName =await g_dchatManager.decryptMsgInfo(ress.chatname) // ress.chatname
       this.is_join = ress.is_join
       this.is_manager = ress.is_manager
       this.is_owner = ress.is_owner
       this.GroupOwner_id = ress.create_user_id
       this.chat_type = ress.chat_type
       this.share_pm = ress.share_pm
       //this.backgroup_img = `${this.$baseUrl}/image/view?user_id=`+ress.create_user_id+'&filename='+ress.backgroup_img+'&img_kind='+'open'+'&img_p='+'min1000'
       
      img_id = ress.backgroup_img//,This = this
      item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
      // .then((item)=>{
      params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'} 
      if(item&& item.data)  this.bgh='32px',this.bgw = '32px'
      this.backgroup_img = item && item.data ? item.data : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
      if(!item) 
      {
        this.bgh='0px',this.bgw = '0px'
        This.$api.network.getImg(params).then((data)=>{
          if(data.ret)
          {
            This.bgh='32px',This.bgw = '32px'
            This.backgroup_img  ='data:image/png;base64,'+data.data
            imageDb.addData({img_id:ress.backgroup_img,data:This.backgroup_img })
          }
        }).catch((ex)=>{
          console.log('load img error',ex)
        })
        //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
      }
       
       
       
       
       if(ress.invite_vip_level == '' || ress.invite_vip_level == null)
       {
         this.invite_vip_level = 0
       }else{
         this.invite_vip_level = ress.invite_vip_level
       }
      //  console.log(this.invite_vip_level + '++++++++++++++++++')

       if(this.chat_type == "single")
      {
        this.show = false
        // console.log(this.show + '+++++++++++++++')
      }else
      {
        this.show = true
        // console.log(this.show + '-----------')
      }
      //  console.log(this.GroupOwner_id)
      this.forkids = ress.forkids
      this.xmsgids = ress.xmsgids
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
      //  console.log(this.news)

    let data = JSON.parse(localStorage.getItem('userInfo'));//查找群主个人用户信息
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              dst_user_id :this.GroupOwner_id
            }
      let res =  await this.$api.network.UserInfoto(user)
      // this.GroupOwner_img = `${this.$baseUrl}/image/view?user_id=`+this.GroupOwner_id+'&filename='+res.logo+'&img_kind='+'open'+'&img_p='+'min1000'
     
      img_id = res.logo//,This = this
      item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
      // .then((item)=>{
      params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'} 
      this.GroupOwner_img = item ? item.data : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
      if(!item) 
      {
        This.$api.network.getImg(params).then((data)=>{
          This.GroupOwner_img  ='data:image/png;base64,'+data.data
          imageDb.addData({img_id:ress.logo,data:This.GroupOwner_img })
        }).catch((ex)=>{
          console.log('load img error',ex)
        })
        //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
      }
     
     
     
      // console.log(this.GroupOwner_img)
   },
    async joins(){//管理员列表
        let data = JSON.parse(localStorage.getItem('userInfo'));
        let random = Math.random()
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,   
              chatid:this.$route.params.token,
              begin:0,
              len:100
            }
      let res =  await this.$api.network.ChatManagerList(user)
      this.Administrators = res.list.length
      // console.log(res.list.length)
     },
     async account(){//个人会员等级信息
        let random = Math.random()
        console.log(random)
        let user = {
          user_id:localStorage.user_id,
          s_id:localStorage.s_id,
          random:random
        }
        let res = await this.$api.network.ChatAccountInfo(user)
        console.log("VIP：");
        console.log(res);
        if(res.ret){
          this.user_vip_level = res && res.vip_info ? res.vip_info.vip_level :0
        }else{}
        
          // console.log(this.user_vip_level)
     },
     clickBurnTime () {
       this.showx = true
     },
    //  burn(name){
    //    localStorage.setItem('burntime',name)
    //    this.burn = localStorage.getItem('burntime')
    //  },
      async clikcBurnTime () {
        let burn = ''
        if(this.burn == 0){
          burn = ''
        }else{
          burn = this.burn
        }
        if(this.burn == 0){
          burn = ''
        }else{
          burn = this.burn
        }
       let params = {
         user_id:localStorage.user_id,
         s_id: localStorage.s_id,
         burn_time_type: burn,
         chatid: this.$route.params.token
       }
       let res = await this.$api.network.msgburnTime(params)
       console.log(res)
       this.showx = false
       console.log("burn2:")
       console.log(this.burn)
      //  let burnTime = localStorage.getItem('burnTime')
      //  console.log(burnTime)
      //  this.burn = burnTime
     }
    },
    mounted(){
      this.Administration();
      this.join();
      this.joins();
      this.account()
    }
}
</script>

<style lang="stylus" scoped>
#icon{
  font-size 2rem;
}
.box >>> .van-divider {
  margin 15px 0 0 0
}
.box >>> .van-divider::after, .van-divider::before {
  border-width 5px
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
/deep/ .van-cell {
  padding 10px 15px;
}
/deep/ .van-cell:not(:last-child)::after{
  left 0px
}
</style>