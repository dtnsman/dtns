<!--
 * @Description: RtVideoRoom语聊房
 * @Author: poplang
 * @Date: 2024-1-6
 * @LastEditors: 
 * @LastEditTime:
 -->
 <template>
    <div style="width: 100%;height: 100%;padding:0px;margin: 0px;background-repeat: no-repeat;background-size: cover;" ref="rtvideoroombody">
      <div @click="back" style="color:white;position: fixed;left:8px;top:8px;z-index: 399;"> ❮返回 </div>
      <div style="color:white;position: fixed;left:0;right:0;top:8px;z-index: 359;text-align: center;  font-size: 18px;font-weight: 800;">{{ title }}</div>
      <div  style="color:white;position: fixed;right:8px;top:8px;z-index: 399;"> <span @click="reqCreate">创建</span>&nbsp; &nbsp;<span @click="reqMatch">匹配</span>&nbsp; &nbsp;<span @click="reqRooms">房间</span></div>
      <!-- <div style="color:red;position: fixed;right:8px;top:8px;z-index: 399;"><b>[分数] {{ top_cnt }} : {{ success_cnt  }}</b></div> -->

      <div :style="content_style">
        <img :src="imgSrc" width="150px" height="150px" style="display:none;border-radius: 75px;border:1px solid #ffffff"/>
        <div :style="msg_list_style" ref="msglist">
          <div v-for="(item,index) in msg_list" :key="index" style="width:100%;text-align: left;margin-top: 5px;margin-bottom: 5px;border-radius: 0px; " >
            <span style="color:red">{{ item.name }}：</span><span>{{ item.msg }}</span>
          </div>
        </div>
      </div>
      <div style="position: fixed;z-index: 199; display:flex;bottom: 5px;left:0;right: 0;height: auto;text-align: center;margin-bottom: 2px;padding:0px 10px 0px 10px;">
        <input @keydown.enter="keyDown" style="width:100%; height:28px; padding-left:5px; border:1px solid #eeeeee; font-size:13px;" v-model="msg" />
        <button @click="send" style="color: rgb(255, 255, 255);width:70px;border-radius: 0px; font-size: 13px; height: 28px; background-color: rgb(18, 173, 245); border: none;">发送</button>
        <!-- <img :src="audioImgSrc" width="30px" height="30px"/> -->
      </div>
      <div @click="showList=false" v-if="showList" style="position: fixed;z-index: 999;display: flex;align-items: center;justify-content: center; left:0;right: 0;top:0;bottom: 0;background-color: rgba(0, 0, 0, 0.6);overflow-y:auto;overflow-x:hidden;flex-wrap: wrap;">
        <RoomList style="width: 360px;height: auto;"></RoomList>
      </div>
      <div style="position:fixed;top: 50px;bottom: 0px;left: 0px;right: 0px;z-index: 9;overflow-x: hidden;overflow-y: auto;">
        <RtVideo ref="rtvideo"
            :creator="creator"
            :roomId="room_id"
            :enableLogs="true"
            :enableVideo="enableAudio"
            :enableAudio="enableAudio"
            :socketURL = "socketURL"
            :cameraHeight="100"
            style="width: 100%;height: 100%;"
            />
      </div>
    </div>
  </template>
  <script>
  import RtVideo  from './RtVideo.vue'
  import RoomList from './RoomList.vue'
//   import rtvideoroomimg from './rtvideoroom.jpg'
  import rtvideoroomJson  from './rtvideoroom.json'
  const rtvideoroom_channel_name = 'rtvideoroom-channel'
  const rtvideoroomimg = rtvideoroomJson.rtvideoroomimg
  // const micimg= rtvideoroomJson.micimg
  // const miccloseimg=rtvideoroomJson.miccloseimg
  const audioimg=rtvideoroomJson.audioimg
  const defaultlogo=rtvideoroomJson.defaultlogo

  const rtvideoroom_gifts = ['flower','bicycle','motorcycle','car','roadster','jets']
  const rtvideoroom_prices= [0.1,1,10,30,100,500]
  const rtvideoroom_gifts_map= {'flower':'花','bicycle':'自行车','motorcycle':'摩托车','car':'小汽车',
    'roadster':'跑车','jets':'飞机'}
  const rtvideoroom_gifts_map_zh= {'花':'flower','自行车':'bicycle','摩托车':'motorcycle','小汽车':'car',
  '跑车':'roadster','飞机':'jets'}
  // const audiocloseimg=rtvideoroomJson.audiocloseimg

  export default {
    name: "RtVideoRoom",
    props: ["value"],
    components: { RtVideo , RoomList},
    data() {
      return {
        title:'RT直播间',
        audioImgSrc:audioimg,
        audioCloseFlag:false,
        enableAudio:false,
        socketURL:window.g_rtchat_tns_url ? window.g_rtchat_tns_url : "https://groupbuying.opencom.cn:441",//"http://192.168.2.102:3000","http://127.0.0.1:3000",//
        msg_list_style:'display:flex', 
        content_style:'',
        msg:'',
        name:null,
        msg_list:[],
        msgMap:new Map(),
        room_id:null,
        room_name:null,
        roomInfo:null, 
        logo:'null',
        imgSrc:defaultlogo,
        showList:false,
        user_id:null,
        creator:false,
      }
    },
    async created()
    {
      this.user_id = localStorage.user_id
      this.content_style = 'position: fixed;z-index: 99;display: flex;flex-wrap: wrap;align-items: center;justify-content: center; left:0px;right: 0px;bottom:50px;height:202px;'
      // const os_type = this.gameW == document.documentElement.clientWidth ? 'mobile':'pc'
      this.msg_list_style='background-color: rgb(200,200,200,0);width:'+(document.documentElement.clientWidth)+'px;height:200px;'
      // 'background-color: rgb(200,200,200,0.1); width:'+(document.documentElement.clientWidth)+'px;height:'+(document.documentElement.clientHeight-95)+'px;'
      this.msg_list_style +=';padding:5px;overflow-y:auto;overflow-x:hidden;font-size:13px;color:white;padding-bottom:8px'//display: flex;flex-wrap: wrap;
      
      this.bindEvent()
      if(!window.g_dtnsManager) return 
      const focusRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchannel/focus',{channel:rtvideoroom_channel_name})
      if(!focusRet ||!focusRet.ret) return this.$toast('订阅频道失败！原因：'+(focusRet?focusRet.msg:'未知网络原因'))
      this.$toast('订阅频道成功')
    
    },
    mounted(){
      console.log('rtvideoroomimg:',rtvideoroomimg,this.h)
      this.$refs.rtvideoroombody.style.backgroundImage = `url(${rtvideoroomimg})`
      window.g_rtvideoroombody = this.$refs.rtvideoroombody

      if(window.rtvideoroomInfo && window.rtvideoroomInfo.room_id)
      {
        this.room_id = window.rtvideoroomInfo.room_id
        this.reqRoomInfo()
      }
      else{
        this.reqMatch()
      }
    },
    beforeRouteLeave(to,from,next){
      console.log('into beforeRouteLeave')
      this.unbindEvent()
      next();
    },
    methods: {
        back(){
            this.$router.go(-1)
            this.unbindEvent()
        },
        bindEvent()
        {
          if(window.g_pop_event_bus)
          {
            const This = this
            this.event_func = function(data){
                console.log('data:',data)
                if(!data ||!data.notify_type) return false 
                else if(data.notify_type == 'msg')
                {
                  // showCode(data.xobj)
                  if(!data ||!data.xobj) return false
                  if(!This.room_id) return false
                  if(data.xobj.room_id !=This.room_id) return false
                  This.addMsg(data.xobj)
                }
                else if(data.notify_type == 'gift')
                {
                  // showCode(data.xobj)
                  if(!data ||!data.xobj) return false
                  if(!This.room_id) return false
                  if(data.xobj.room_id !=This.room_id) return false
                  This.addMsg({name:'系统消息',msg:data.xobj.name+'赠送了主播礼物-'+rtvideoroom_gifts_map[data.xobj.gift]+'！'})
                }
              }
            window.g_pop_event_bus.on(rtvideoroom_channel_name,this.event_func)
            window.g_pop_event_bus.on('rtvideoroom_into_room',this.intoRoom)
          }
        },
        async unbindEvent()
        {
          this.onLeave()
          if(window.g_pop_event_bus)
          {
            window.g_pop_event_bus.removeListener(rtvideoroom_channel_name,this.event_func)
            window.g_pop_event_bus.removeListener('rtvideoroom_into_room',this.intoRoom)
          } 
          const unfocusRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchannel/unfocus',{channel:rtvideoroom_channel_name})
          console.log('unfocusRet:',unfocusRet)
        },
        keyDown(e)
        {
            console.log('keyDown-e:',e)
            if(e.keyCode==13)
            {   //用户点击了ctrl+enter触发
                this.send()
            }
        },
        changeAudioStatus()
        {
          this.audioCloseFlag = !this.audioCloseFlag
          // if(!this.audioCloseFlag && !this.rtvideo_started)
          // {
          //   this.rtvideo_started = true
          // }
          this.addMsg({name:'系统消息',msg:this.audioCloseFlag ? '已关闭！':'已启用'})
          this.showAudioStatus()
        },
        showAudioStatus(onLeaveCalling = false)
        {
          if(!this.roomInfo ||!this.room_id) {
            if(!onLeaveCalling) this.onLeave()
            return false//this.audioImgSrc = audiocloseimg
          }
          else
          {
            // if(this.audioCloseFlag){
            //   this.enableAudio = false
            //   this.audioImgSrc = miccloseimg
            // } 
            // else{
            //   this.audioImgSrc = micimg
            //   this.enableAudio = true //fix the bug 
            // } 
            //可以使用mic
            this.enableAudio = this.roomInfo.user_id == localStorage.user_id
            this.audioCloseFlag= false
            this.chanageAudioSetting(this.enableAudio)
          }
        },
        chanageAudioSetting(newEnableAudio,rejoin = false) 
        {
          // if(!this.$refs.rtvideo.localStream) return false //如果麦克风或者喇叭未打开，则不进行配置这个newEnableAudio
          const newEnableVideo = newEnableAudio;//this.creator//true;//false
          console.log('chanageAudioSetting:'+newEnableVideo+' '+newEnableAudio+' rejoin:'+rejoin)
          const localStream = this.$refs.rtvideo.localStream
          if(localStream) {
            localStream.getAudioTracks().forEach(t => {
                console.log('t:'+t)
                t.enabled  = newEnableAudio
              //  t.applyConstraints({video: newEnableVideo,audio: newEnableAudio})
            })
            localStream.getVideoTracks().forEach(t => {
                console.log('t:'+t)
                t.enabled  = newEnableVideo
              //  t.applyConstraints({video: newEnableVideo,audio: newEnableAudio})
            })
          }
          else{
              // if(this.join_flag  )
              // if(this.rtvideo_started)
              if(!this.audioCloseFlag) //得开启状态，才会进入到启用peer连接
              {
                const that = this
                setTimeout(()=>{
                    that.onJoin()
                },300)
              }
          }
        },
        onJoin() {
            this.join_flag = true
            if(!this.$refs.rtvideo.signalClient)//localStream)
            {
              this.$refs.rtvideo.join()
            }
        },
        onLeave() 
        {
          this.queryUserName()
          this.msg = '我退出了房间！'
          this.send()
          this.msg_list = []

          this.roomInfo = null
          this.room_id = null
          this.room_name=null

          try{
            this.join_flag  = false
            this.$refs.rtvideo.leave();
            this.$refs.rtvideo.localStream = null
            this.$refs.rtvideo.screenStream = null

            //修复更新新局时，旧的未关闭的问题
            // this.audioCloseFlag = true
            this.showAudioStatus(true)//会调用onLeave，故应该等等 this.chessInfo = null之后，方进行设置
          }catch(ex){
              console.log('onLeave-exception:'+ex,ex)
          }
        },
        async reqMatch()
        {
          window.rtvideoroomInfo = null
          this.onLeave()
          // this.$toast('匹配棋局...')
          this.addMsg({name:'系统消息',msg:'RT直播间，匹配中...'})
          const matchRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtvideoroom/match',{})
          if(!matchRet ||!matchRet.ret){
              return this.$toast('匹配失败！原因：'+(matchRet?matchRet.msg:'未知网络原因'))
          }
          else 
          {
            this.addMsg({name:'系统消息',msg:'RT直播间，匹配成功！'})
            this.addMsg({name:'系统消息',msg:'房名：'+matchRet.room_name})
            this.room_id = matchRet.room_id
            this.room_name=matchRet.room_name
            this.roomInfo =matchRet
            window.rtvideoroomInfo = this.roomInfo
            this.creator= this.user_id == this.roomInfo.user_id
            this.logo = matchRet.logo
            this.queryImg()
            this.showAudioStatus()
            this.queryUserName()
            this.msg = '我进入了房间！'
            await this.send()
            this.showGiftList()
          }
        },
        async reqCreate()
        {
          window.rtvideoroomInfo = null
          this.onLeave()
          // this.$toast('匹配棋局...')
          this.addMsg({name:'系统消息',msg:'RT直播间，创建中...'})
          let logo = null, user_name = null
          try{
            const userInfo = JSON.parse(localStorage.userInfo)
            logo = userInfo.logo
            user_name=userInfo.user_name
          }catch(ex)
          {
            console.log('user_name and logo is empty')
          }

          const createRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtvideoroom/create',{user_name,logo})
          if(!createRet ||!createRet.ret){
              return this.$toast('创建失败！原因：'+(createRet?createRet.msg:'未知网络原因'))
          }
          else 
          {
            this.addMsg({name:'系统消息',msg:'RT直播间，创建成功！'})
            this.addMsg({name:'系统消息',msg:'房名：'+createRet.room_name})
            this.room_id = createRet.room_id
            this.room_name=createRet.room_name
            this.roomInfo =createRet
            window.rtvideoroomInfo = this.roomInfo
            this.creator= this.user_id == this.roomInfo.user_id
            this.logo = createRet.logo
            this.queryImg()
            this.showAudioStatus()
            this.showGiftList()
          }
        },
        async reqRoomInfo()
        {
          this.addMsg({name:'系统消息',msg:'重新进入房间...'})
          const infoRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtvideoroom/info',{room_id:this.room_id})
          if(!infoRet ||!infoRet.ret){
            this.reqMatch()
            return this.$toast('查询失败！原因：'+(infoRet?infoRet.msg:'未知网络原因'))
          }
          else if(infoRet.user_id && infoRet.room_id)
          {
            this.addMsg({name:'系统消息',msg:'连接成功'})
            this.addMsg({name:'系统消息',msg:'房名：'+infoRet.room_name})
            this.room_id = infoRet.room_id
            this.room_name=infoRet.room_name
            this.roomInfo =infoRet
            window.rtvideoroomInfo = this.roomInfo
            this.creator= this.user_id == this.roomInfo.user_id
            this.logo = infoRet.logo
            this.queryImg()
            this.showAudioStatus()
            this.msg = '我重新进入了房间！'
            await this.send()
            this.showGiftList()
          }else{
            this.reqMatch()
          }
        },
        async reqRooms()
        {
          this.showList = true
          if(window.g_pop_event_bus)
            setTimeout(()=> window.g_pop_event_bus.emit('rtvideoroom_show_list',{}),100)
        },
        intoRoom(roomInfo)
        {
          if(!roomInfo ||!roomInfo.room_id) return false
          this.showList = false
          this.onLeave()
          this.addMsg({name:'系统消息',msg:'进入房间成功！'})
          this.addMsg({name:'系统消息',msg:'房名：'+roomInfo.room_name})
          this.room_id = roomInfo.room_id
          this.room_name=roomInfo.room_name
          this.roomInfo =roomInfo
          window.rtvideoroomInfo = this.roomInfo
          this.creator= this.user_id == this.roomInfo.user_id
          this.logo = roomInfo.logo
          this.queryImg()
          this.showAudioStatus()
          this.msg = '我进入了房间！'
          this.send()
          this.showGiftList()
        },
        queryUserName()
        {
          if(!this.name)
          try{
            const userInfo = JSON.parse(localStorage.userInfo)
            this.name = userInfo.user_name
          }catch(ex)
          {
            this.name = '用户-'+ parseInt(Math.random()*10000)
          }
        },
        showGiftList(zh = true)
        {
          let msg = '可赠送礼物清单：'
          for(let i=0;i<rtvideoroom_gifts.length;i++)
          {
            const gift = zh ? rtvideoroom_gifts_map[ rtvideoroom_gifts[i] ] : rtvideoroom_gifts[i] 
            const price= rtvideoroom_prices[i]
            msg += gift+'$'+price+'；'
          }
          this.addMsg({name:'系统消息',msg})
        },
        async send()
        {
          if(!this.roomInfo || !this.room_id) return false;// this.$toast('请先匹配房间或创建房间后，再行发送消息内容！')
          // this.$router.push('/msgbottle/send')
          const msg = this.msg.trim()
          if(!msg) return this.$toast('请您输入消息内容！')

          this.msg = ''
          this.queryUserName()

          const sendRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtvideoroom/send',{msg,room_id:this.room_id,name:this.name})
          if(!sendRet ||!sendRet.ret){
              return this.$toast('发送失败！原因：'+(sendRet?sendRet.msg:'未知网络原因'))
          }
          if(rtvideoroom_gifts_map[msg] || rtvideoroom_gifts_map_zh[msg])
          {
            let gift = msg
            if(rtvideoroom_gifts_map_zh[msg]) gift = rtvideoroom_gifts_map_zh[msg]
            const sendGiftRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtvideoroom/gift/send',{gift,room_id:this.room_id,user_name:this.name})
            if(!sendGiftRet || !sendGiftRet.ret) return this.$toast('赠送礼物失败！原因：'+(sendGiftRet?sendGiftRet.msg:'未知网络原因'))
            this.$toast('赠送主播礼物成功！')
          }
        },
        addMsg(data)
        {
          // if(!data || !data.xobj ||data.xobj.chess_id != this.chess_id) return false
          this.msg_list = this.msg_list.concat([data])
          const This = this
          setTimeout(()=>{
            This.$refs.msglist.scrollTop = This.$refs.msglist.scrollHeight 
            console.log('to-bottom:',This.$refs.msglist)
          },10)
        },
        async queryImg()
        {
          const This = this
          const item = await window.imageDb.getDataByKey(this.logo)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
          if(item) this.imgSrc  = item.data
          else{
            const params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:this.logo,img_kind:'open',img_p:'min200'}
            new Promise((resolve,reject)=>{
                if(!params || !params.filename) return resolve({ret:false,msg:'param(filename) is null'})
                window.rpc_client.send('/image/view',params,null,function(rdata){
                console.log('rdata:'+JSON.stringify(rdata))
                    resolve(rdata.data)
                })
                setTimeout(()=>reject(null),30000)
            }).then((data)=>{
              if(!data ||!data.data)
              {
                return This.imgSrc = defaultlogo
              }
              This.imgSrc  ='data:image/png;base64,'+data.data
              window.imageDb.addData({img_id:This.logo,data:This.imgSrc })
            }).catch((ex)=>{
              console.log('load img error',ex)
            })
          }
        }
    }
  }
  </script>
<style scoped>
</style>