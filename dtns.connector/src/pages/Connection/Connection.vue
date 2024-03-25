<template>
  <div class="box" style="position:fixed;overflow-y:scroll;top:46px;bottom:50px;left:0;right:0;">
    <header class="topbar" style="border-bottom:1px solid #eee; height:46px; position:fixed; top:0; background-color:#fff; margin:0 auto; align:center; z-index:999;">
      <div style="margin:0 auto;height:46px;" align="center">
        <svg v-if="imgStatus == true" style="width:17px;height:17px;top:13px; position:absolute;" t="1590975627508" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5496" width="17" height="17"><path d="M514.752467 0.007392a511.992334 511.992334 0 1 0 509.254407 511.992334A511.992334 511.992334 0 0 0 514.752467 0.007392z m375.095988 528.419896A752.929903 752.929903 0 0 1 659.862593 574.972045a301.171961 301.171961 0 0 1-101.303296-16.427561c-8.213781 128.682565-161.537688 276.530619-183.441103 295.696107a21.903415 21.903415 0 0 1-19.165489 5.475854 30.117196 30.117196 0 0 1-19.165488-8.213781 27.379269 27.379269 0 0 1 2.737927-38.330977c54.758538-52.020611 188.916957-199.868665 161.537688-290.220253-71.1861-62.972319-262.840984-5.475854-331.289157 21.903415a27.379269 27.379269 0 0 1-35.59305-16.427561 24.641342 24.641342 0 0 1 13.689635-35.59305c24.641342-8.213781 224.510007-84.875734 347.716718-38.330977 8.213781-128.682565 147.848054-268.316838 167.013542-287.482327a30.117196 30.117196 0 0 1 38.330977 2.737927 27.379269 27.379269 0 0 1 0 38.330977c-49.282685 49.282685-169.751469 191.654884-150.58598 282.006473 73.924027 60.234392 254.627203 10.951708 320.337449-13.689635a27.379269 27.379269 0 1 1 19.165489 52.020612z" fill="#1afa29" p-id="5497"></path></svg>
        <svg v-if="imgStatus == false" style="width:17px;height:17px;top:13px; position:absolute;" t="1590976113043" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5679" width="17" height="17"><path d="M514.752467 0.007392a511.992334 511.992334 0 1 0 509.254407 511.992334A511.992334 511.992334 0 0 0 514.752467 0.007392z m375.095988 528.419896A752.929903 752.929903 0 0 1 659.862593 574.972045a301.171961 301.171961 0 0 1-101.303296-16.427561c-8.213781 128.682565-161.537688 276.530619-183.441103 295.696107a21.903415 21.903415 0 0 1-19.165489 5.475854 30.117196 30.117196 0 0 1-19.165488-8.213781 27.379269 27.379269 0 0 1 2.737927-38.330977c54.758538-52.020611 188.916957-199.868665 161.537688-290.220253-71.1861-62.972319-262.840984-5.475854-331.289157 21.903415a27.379269 27.379269 0 0 1-35.59305-16.427561 24.641342 24.641342 0 0 1 13.689635-35.59305c24.641342-10.951708 224.510007-84.875734 347.716718-38.330977 8.213781-128.682565 147.848054-268.316838 167.013542-287.482327a30.117196 30.117196 0 0 1 38.330977 2.737927 27.379269 27.379269 0 0 1 0 38.330977c-49.282685 49.282685-169.751469 191.654884-150.58598 282.006473 73.924027 60.234392 254.627203 10.951708 320.337449-13.689635a27.379269 27.379269 0 1 1 19.165489 52.020612z" fill="#F00945" p-id="5680"></path></svg>
        <span style="margin-left:24px; font-size:16px; line-height:43px;-webkit-user-select:none;user-select:none;">{{ contactStr }}</span>
      </div>
      <ib3status style="position:absolute; top:12px; left:15px;z-index:999" />
      <div style="position:absolute; top:14px; right:15px;z-index:999">
        <van-icon name="plus" slot="right" @click="pageset"/>
      </div>
    </header>
    <div v-if="add" style="font-size:14px; padding-top:10px; padding-left:15px;background-color:#f5f5f5;">
      {{ noFriendsStr }}
    </div>

    <!-- <div style="height:46px;"></div> -->
    <div style="">
      <div class="list" v-for="(item,index) in list" :key="index" @click="come(item.user_id)">
        <div style="position:relative;width:100%;height:100%;padding:0 15px 0 15px;border-bottom: 1px solid #f5f5f5;">
          <div>
            <img v-lzlogo="item.logo" style="width:40px; height:40px;">
          </div>
          <div class="name">{{item.user_name}}</div>
        </div>
      </div>
      <!-- <div style="height:50px;float:left;width:100%;background-color:#f5f5f5;"></div> -->
    </div>
    <div v-show="addshow" @click="addshow = false" style="background:transparent;position:fixed; z-index:888; width:100%; height:100%;top:0;left:0">
    </div>
    <div class="box_x" style="filter: invert(1) hue-rotate(180deg);" v-show="addshow">
      <div style="float:left; border-bottom:1px solid #666;width:100%;" @click="chat">
        <img src="../../assets/images/groupChat.png" alt="" width="20px;" style="float:left; margin:11px 0 10px 15px;">
        <p style="color:#fff; font-size:14px; float:left; padding:11px 0 0 9px; margin:0;">{{newGroupChatStr}} </p>
      </div>
      <div style="float:left; border-bottom:1px solid #666;width:100%;" @click="friend">
        <img src="../../assets/images/friend.png" alt="" width="20px;" style="float:left; margin:10px 0 10px 15px;">
        <p style="color:#fff; font-size:14px; float:left; padding:10px 0 0 8px; margin:0;">{{ addContactStr }} </p>
      </div>
      <div style="float:left;border-bottom:1px solid #666; width:100%;" @click="scan">
        <img src="../../assets/images/scan.png" alt="" width="20px;" style="float:left; margin:10px 0 0 15px;">
        <p style="color:#fff; font-size:14px; float:left; padding:10px 15px 10px 8px; margin:0;">{{scanStr}} </p>
      </div>
      <div style="float:left;border-bottom:1px solid #666; width:100%;" @click="sendDtns">
        <img src="../../assets/images/address.png" alt="" width="20px;" style="float:left; margin:10px 0 0 15px;">
        <!-- <svg style="color:black;float:left; margin:10px 0 0 15px;" t="1589768344498" class="icon" viewBox="0 0 1324 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4061" width="22" height="22"><path d="M1257.485342 303.530945h-33.355049V66.710098a66.710098 66.710098 0 0 0-66.710098-66.710098H66.710098a66.710098 66.710098 0 0 0-66.710098 66.710098v890.579804a66.710098 66.710098 0 0 0 66.710098 66.710098h1090.710097a66.710098 66.710098 0 0 0 66.710098-66.710098v-236.820847h33.355049a66.710098 66.710098 0 0 0 66.710098-66.710097v-283.517916a66.710098 66.710098 0 0 0-66.710098-66.710097z m-100.065147 653.758957H66.710098V66.710098h1090.710097v236.820847H763.830619a66.710098 66.710098 0 0 0-66.710098 66.710097v283.517916a66.710098 66.710098 0 0 0 66.710098 66.710097h393.589576z m-393.589576-303.530944v-283.517916h493.654723v283.517916z" p-id="4062"></path></svg> -->
        <p style="color:#fff; font-size:14px; float:left; padding:10px 15px 10px 8px; margin:0;">{{payQRcodeStr}} </p>
      </div>
      <div style="float:left;border-bottom:1px solid #666; width:100%;" @click="broadcast('group_live')">
        <svg style="float:left; margin:10px 0 0 15px;" t="1589768344498" class="icon" viewBox="0 0 1451 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2504" width="20" height="20"><path d="M911.266055 93.944954a93.944954 93.944954 0 0 0-93.944954-93.944954H93.944954a93.944954 93.944954 0 0 0-93.944954 93.944954v836.110092a93.944954 93.944954 0 0 0 93.944954 93.944954h723.376147a93.944954 93.944954 0 0 0 93.944954-93.944954V352.293578zM1427.963303 84.550459a42.275229 42.275229 0 0 0-46.972477 0l-403.963303 230.165137v394.568808l403.963303 234.862385h46.972477a56.366972 56.366972 0 0 0 23.486238-42.275229V122.12844a46.972477 46.972477 0 0 0-23.486238-37.577981z" fill="#FFFFFF" p-id="2505"></path></svg>
        <p style="color:#fff; font-size:14px; float:left; padding:10px 15px 10px 8px; margin:0;">{{newBroadcastStr}} </p>
      </div>
       <div style="float:left;border-bottom:0px solid #666; width:100%;" @click="broadcast('group_shop')">
        <svg style="float:left; margin:10px 0 10 15px;" t="1590460171190" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2965" width="18" height="18"><path d="M1008.995228 367.590465L840.204205 15.004772a26.256381 26.256381 0 0 0-22.50547-15.003647H210.051051a30.007293 30.007293 0 0 0-26.256381 15.003647L18.754558 367.590465a153.787377 153.787377 0 0 0-18.754558 71.267321c0 97.523702 105.025526 172.541935 232.556521 172.541935a296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205 296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205c131.281907 0 232.556521-75.018233 232.556521-172.541935a153.787377 153.787377 0 0 0-18.754558-71.267321zM660.160447 648.908837a243.809256 243.809256 0 0 1-146.285554 48.761851 255.061991 255.061991 0 0 1-146.285553-48.761851 236.307433 236.307433 0 0 1-146.285554 48.761851 277.567461 277.567461 0 0 1-123.780084-33.758204v326.329311a30.007293 30.007293 0 0 0 26.256382 33.758205h780.189619a30.007293 30.007293 0 0 0 26.256381-33.758205v-326.329311a262.563814 262.563814 0 0 1-123.780084 33.758204 243.809256 243.809256 0 0 1-146.285553-48.761851z" fill="#FFFFFF" p-id="2966"></path></svg>
        <p style="color:#fff; font-size:14px; float:left; padding:10px 0 0 9px; margin:0;">{{newMallStr}} </p>
      </div>
      <!-- <div style="float:left;" @click="createGNode()">
        <svg style="float:left; margin:10px 0 0 15px;" t="1590460171190" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="703" width="17" height="17"><path d="M882.1914 744.849921c-60.501005 0-112.097749 38.645092-131.425292 92.560342H244.912146c-80.468136 0-145.955927-62.61964-145.955926-139.570043 0-77.000371 65.487791-139.570043 145.955926-139.570043h136.312143c19.497433 53.585462 70.934281 91.950735 131.205434 91.950735 60.241173 0 111.688014-38.375266 131.205434-91.950735h136.452052C914.210763 558.280171 1023.340425 453.92743 1023.340425 325.660102S914.210763 93.040033 780.077216 93.040033H273.093982c-19.197627-54.165089-70.944274-93.040033-131.595182-93.040033C64.508422 0 1.928757 62.569672 1.928757 139.560049c0 76.950403 62.579665 139.570043 139.570043 139.570043 60.640915 0 112.377569-38.894931 131.585189-93.040033h506.993227c80.468136 0 145.955927 62.61964 145.955927 139.570043 0 77.000371-65.487791 139.570043-145.955927 139.570043H644.414655c-18.887826-54.734722-70.924287-94.139324-131.974938-94.139325-61.090625 0-113.097105 39.394609-131.974938 94.139325H244.912146c-134.133547 0-243.263209 104.352741-243.263209 232.620069 0 128.267328 109.129663 232.620069 243.263209 232.620069h505.524174c19.057717 54.394941 70.9043 93.529717 131.75508 93.529717 76.950403 0 139.570043-62.61964 139.570043-139.570043 0.009994-77.000371-62.61964-139.580036-139.570043-139.580036zM141.428845 207.036558c-37.166045 0-67.376574-30.230515-67.376574-67.376573 0-37.166045 30.210528-67.376574 67.376574-67.376574 37.146058 0 67.376574 30.210528 67.376573 67.376574 0 37.146058-30.230515 67.376574-67.376573 67.376573z m371.000878 236.257725c37.146058 0 67.376574 30.210528 67.376574 67.376574 0 37.146058-30.230515 67.376574-67.376574 67.376573-37.166045 0-67.376574-30.230515-67.376574-67.376573 0.009994-37.176039 30.210528-67.376574 67.376574-67.376574z m369.761677 508.502254c-37.166045 0-67.376574-30.230515-67.376574-67.376573 0-37.166045 30.210528-67.376574 67.376574-67.376574 37.146058 0 67.376574 30.210528 67.376574 67.376574 0 37.146058-30.230515 67.376574-67.376574 67.376573z" p-id="6194" fill="#FFFFFF"></path></svg>
        <p style="color:#fff; font-size:14px; float:left; padding:10px 0 0 9px; margin:0;">创建G节点 </p>
      </div> -->
       <!-- <div style="float:left;" @click="goShopping">
        <svg style="float:left; margin:10px 0 0 15px;" t="1590460171190" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2965" width="18" height="18"><path d="M1008.995228 367.590465L840.204205 15.004772a26.256381 26.256381 0 0 0-22.50547-15.003647H210.051051a30.007293 30.007293 0 0 0-26.256381 15.003647L18.754558 367.590465a153.787377 153.787377 0 0 0-18.754558 71.267321c0 97.523702 105.025526 172.541935 232.556521 172.541935a296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205 296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205c131.281907 0 232.556521-75.018233 232.556521-172.541935a153.787377 153.787377 0 0 0-18.754558-71.267321zM660.160447 648.908837a243.809256 243.809256 0 0 1-146.285554 48.761851 255.061991 255.061991 0 0 1-146.285553-48.761851 236.307433 236.307433 0 0 1-146.285554 48.761851 277.567461 277.567461 0 0 1-123.780084-33.758204v326.329311a30.007293 30.007293 0 0 0 26.256382 33.758205h780.189619a30.007293 30.007293 0 0 0 26.256381-33.758205v-326.329311a262.563814 262.563814 0 0 1-123.780084 33.758204 243.809256 243.809256 0 0 1-146.285553-48.761851z" fill="#FFFFFF" p-id="2966"></path></svg>
        <p style="color:#fff; font-size:14px; float:left; padding:10px 0 0 9px; margin:0;">购物车测试</p>
      </div> -->
    </div>
    <floor></floor>
  </div>
</template>
<script>
import imgOnLine from "../../assets/images/onLine.png";
import imgOffLine from "../../assets/images/offLine.png";
import floor from "../../components/floor/floor.vue";
import ib3status  from "../../components/header/ib3status.vue"

export default {
  components: {
      floor,
      ib3status
  },
  data() {
    return {
      imgStatus:true,
      addshow:false,
      list:[],
      add:false,
      phone:'',
      contactStr:'联系',
      noFriendsStr:'暂无联系人',
      newGroupChatStr:'发起群聊',
      addContactStr:'添加联系人',
      scanStr:'扫一扫',
      payQRcodeStr:'收付款',
      newBroadcastStr:'开直接间',
      newMallStr:'开通小店',
    };
  },
  mounted() {
    this.$api.network.addUserKeepAliveStatusFunc(this.change) 
    this.chatlist()
  },
  created(){
    this.imgStatus = window.rpc_client ? rpc_client.pingpong_flag :false
  },
  methods: {
    LiveBroadcast(){//开直播
      this.$router.push('/LiveBroadcast/OppenBroadcast')
    },///

    pageset(){
      console.log(this.addshow)
        this.addshow = !this.addshow  
    },
    chat(){ //添加群聊
      this.$router.push('/index/GroupChat')
    },
    friend(){ //添加朋友
      this.$router.push('/index/addfriend')
    },
    broadcast(type){//开直播/开小店
      this.$router.push('/LiveBroadcast/OppenBroadcast/'+type)
    },
    change(user_keepalive){//判断是否掉线
      // console.log(user_keepalive + '++++++++++++++++++++++')
      if(user_keepalive==1)
      {
        this.imgStatus = true;
      }else{
        this.imgStatus = false;
      }
    },

    scan(){ //扫一扫
      this.$router.push('/index/scan')
    },
    sendDtns()
    {
      this.$router.push('/wallet')
      this.addshow  = !this.addshow 
    },
    async come(user_id) {
      this.$router.push(`/index/GroupInformation/GroupOwner/${user_id}`)
      },
    async chatlist(refresh = true){
      let data = JSON.parse(localStorage.getItem('userInfo'));//
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              begin:0,
              len:5000,
            }
      // let res =  await this.$api.network.ChatList(user)

      while(!imageDb.db)  await rpc_client.sleep(100)
      while(!imDb.db)  await rpc_client.sleep(100)
      
      //localStorage.getItem('recentmsgs_cached')
      let res = null ,friendsCached= await imDb.getDataByKey('friends_cached'),that = this,fromNetFlag = false
      if(friendsCached && friendsCached.data)
      {
        try{
          res = friendsCached.data

          if(refresh)
          this.$api.network.ChatList(user).then((d)=>{
            if(d && d.ret){
              imDb.deleteDataByKey('friends_cached')
              imDb.addData({key:'friends_cached',data:d})
              that.chatlist(false)
            }else{
              //that.$toast.fail('更新联系人列表失败')
              console.log('update-connect-people-failed!更新联系人列表失败')
            }
          })
        }catch(ex){
          // console.log('[Error]parse recentmsgs_cached_str error')
          //localStorage.removeItem('recentmsgs_cached')
          imDb.deleteDataByKey('friends_cached')
          //通过网络获取
          res = await this.$api.network.ChatList(user)
          fromNetFlag = true
        }
      }
      else res = await this.$api.network.ChatList(user),fromNetFlag=true
      console.log('connection-chatlist-res:',res)
      if(!res || !res.ret) return 
      if(fromNetFlag){
        imDb.deleteDataByKey('friends_cached')
        imDb.addData({key:'friends_cached',data:res})
      }

      if(res.list.length == 0){
        this.add = true
      }else{
        this.add = false
      }
        console.log(res)
      
      let i = 0
      let This = this
      for(i; i<res.list.length; i++){
          res.list[i].ret = true
          res.list[i].is_contact = true
          imDb.addData({key:'userInfo-'+res.list[i].user_id,data:res.list[i]})
      }
      this.list = res.list
    },
    translate()
    {
      // contactStr:'联系',
      // noFriendsStr:'暂无联系人',
      // newGroupChatStr:'发起群聊',
      // addContactStr:'添加联系人',
      // scanStr:'扫一扫',
      // payQRcodeStr:'收付款',
      // newBroadcastStr:'开直接间',
      // newMallStr:'开通小店',

        this.contactStr = g_dtnsStrings.getString('/index/contact/title')
        this.noFriendsStr=g_dtnsStrings.getString('/index/friends/nomore')
        this.newGroupChatStr = g_dtnsStrings.getString('/index/groupchat/new')
        this.addContactStr = g_dtnsStrings.getString('/index/contact/add')
        this.scanStr = g_dtnsStrings.getString('/index/scan')
        this.payQRcodeStr = g_dtnsStrings.getString('/index/account/qrcode/into')
        this.newBroadcastStr = g_dtnsStrings.getString('/index/broadcast/new')
        this.newMallStr = g_dtnsStrings.getString('/index/mall/new')
    }
  },
  async created() {
    if(typeof g_pop_event_bus!='undefined')
    {
      g_pop_event_bus.on('update_dtns_loction',this.translate)
    }
    this.translate()
  },
  beforeDestroy () {
    console.log('into beforeDestroy()')
    if(typeof g_pop_event_bus!='undefined')
    {
      g_pop_event_bus.removeListener('update_dtns_loction',this.translate)
    }
  },
};
</script>
<style lang="stylus" scoped>
.box{
  width:100%;
  background-color:#fff;
}
.box_x {
  position:fixed; z-index:999; width:120px; height:242px; background-color:#333;border-radius:5px;
  right 10px;
  top:56px;
}
.box >>> .van-nav-bar__title {
  font-size 16px
  font-weight bold
}
.box >>> .van-nav-bar .van-icon{
  font-size 1.1rem
  color #000
}
.topbar {
  position fixed
  top 0
  width 100%
  z-index 99
}
.list {
  width: 100%;
  height: 60px;
  // border:1px solid black
  // display: flex;
  // border-bottom: 1px solid #f5f5f5;
  background-color: #fff;
  float:left;
}

.list img {
  // width: 40px;
  // height: 40px;
  // border:1px solid #ccc
  margin-top: 10px;
  border-radius:6px;
}

.name {
  left:60px;
  font-size: 15px;
  top:20px;
  // border:1px solid;
  position:absolute;
}
</style>
