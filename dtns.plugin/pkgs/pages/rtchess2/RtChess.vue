<!--
 * @Description: RtChess
 * @Author: poplang
 * @Date: 2024-1-19
 * @LastEditors: 
 * @LastEditTime:
 -->
 <template>
  <div style="width: 100%;height: 100%;padding:0px;margin: 0px;background-repeat: no-repeat;background-size: cover;" ref="rtbody">
    <div @click="back" style="color:#202020;position: fixed;left:8px;top:8px;z-index: 399;"> ❮返回 </div>
    <div style="color:#202020;position: fixed;left:0;right:0;top:8px;z-index: 359;text-align: center;  font-size: 18px;font-weight: 800;">{{ title }}</div>
    <div style="color:#202020;position: fixed;right:8px;top:8px;z-index: 399;"><span @click="reqView">旁观</span>&nbsp; &nbsp;<span @click="reqMatch">匹配</span></div>
    <!-- <div style="color:red;position: fixed;right:8px;top:8px;z-index: 399;"><b>[分数] {{ top_cnt }} : {{ success_cnt  }}</b></div> -->
    <div style="position: fixed;z-index: 99;display: flex;flex-wrap: wrap;align-items: left;justify-content: left; left:0px;right: 0px;top:50px;bottom: 0px;">
      <div :style="msgbox">
        <div :style="msg_list_style" ref="msglist">
          <div v-for="(item,index) in msg_list" :key="index" style="width:100%;text-align: left;margin-top: 5px;margin-bottom: 5px;border-radius: 0px; " >
            <span style="color:red">{{ item.name }}：</span><span>{{ item.msg }}</span>
          </div>
        </div>
        <div style="display: flex;height: 28px;width: 100%;text-align: center;padding: 5px;margin-bottom: 2px;">
          <input @keydown.enter="keyDown" style="width:100%;height:28px; padding-bottom:2px; padding-left:5px; border:1px solid #eeeeee; font-size:13px;" v-model="msg" />
          <button @click="send" style="width:80px;margin-top: 0px;color: rgb(255, 255, 255); border-radius: 0px; font-size: 13px; height: 28px; background-color: rgb(18, 173, 245); border: none;">发送</button>
          <img @click="changeAudioStatus" :src="audioImgSrc" width="30px" height="30px"/>
        </div>
      </div>
      <canvas ref="canvas" :height="chessW" :width="chessW" :style="mystyle" ></canvas>
    </div>
    <!-- <div style="position: fixed;bottom: 0px;left:0;right: 0;height: auto;text-align: center;padding: 5px;margin-bottom: 2px;">
      <input @keydown.enter="keyDown" style="width:80%; height:29px; padding-bottom:2px; padding-left:5px; border:1px solid #eeeeee; font-size:13px;" v-model="code" />
      <button @click="send" style="margin-top: 5px;color: rgb(255, 255, 255); border-radius: 0px; font-size: 13px; height: 28px; background-color: rgb(18, 173, 245); border: none;">发送</button>
    </div> -->
    <div style="display: none;">
      <RtAudio ref="rtaudio"
          :roomId="chess_id"
          :enableLogs="true"
          :enableVideo="false"
          :enableAudio="enableAudio"
          :socketURL = "socketURL"
          :cameraHeight="100"
          />
    </div>
  </div>
</template>
<script>
import RtAudio  from './RtAudio.vue'
import rtchessJson  from './rtchess.json'
console.log('rtchessJson:',rtchessJson)
const bgimg = rtchessJson.bgimg
const jueimg= rtchessJson.jueimg
const chiimg= rtchessJson.chiimg
const jiangimg=rtchessJson.jiangimg
const micimg= rtchessJson.micimg
const miccloseimg=rtchessJson.miccloseimg
const audioimg=rtchessJson.audioimg
const audiocloseimg=rtchessJson.audiocloseimg
const rtchess_gifts = ['flower','bicycle','motorcycle','car','roadster','jets']
const rtchess_prices= [0.1,1,10,30,100,500]
const rtchess_gifts_map= {'flower':'花','bicycle':'自行车','motorcycle':'摩托车','car':'小汽车',
  'roadster':'跑车','jets':'飞机'}
const rtchess_gifts_map_zh= {'花':'flower','自行车':'bicycle','摩托车':'motorcycle','小汽车':'car',
'跑车':'roadster','飞机':'jets'}
import * as ZhChess from './zh-chess.es.js'
const rtchess_channel_name = 'rtchess-channel'
function playMp3(type = 'move'){
  const strs= ['eat','move','moveFail','over','trouble','victory']
  const mp3s = [rtchessJson.eat,rtchessJson.move,rtchessJson.moveFail,rtchessJson.over,rtchessJson.trouble,rtchessJson.victory]
  const mp3 = strs.indexOf(type) >=0 ? mp3s[strs.indexOf(type)]:null
  if(!mp3) return false
  const ele = document.createElement('audio')
  ele.src = 'data:audio/mpeg;base64,'+mp3
  ele.play()
}

export default {
  name: "RtChess",
  props: ["value"],
  components: {RtAudio},
  data() {
    return {
      title:'RT象棋大师',
      bgimg:bgimg,
      audioImgSrc:audiocloseimg,
      audioCloseFlag:true,
      enableAudio:false,
      socketURL:window.g_rtchat_tns_url ? window.g_rtchat_tns_url : "https://groupbuying.opencom.cn:441",//"http://192.168.2.102:3000","http://127.0.0.1:3000",//
      chessW:0,
      mystyle:'display: flex;',
      msgbox:'display:flex',
      msg_list_style:'display:flex',
      // send_box_style:'',
      gameW:0,
      isLoading:false,
      chess_id:null,
      chessInfo:null,
      msg:null,
      name:null,
      msg_list:[],
      msgMap:new Map(),
    }
  },
  async created()
  {
    this.gameW = Math.min( document.documentElement.clientWidth ,document.documentElement.clientHeight) - (document.documentElement.clientWidth > document.documentElement.clientHeight ? 50 :0)
    const os_type = this.gameW == document.documentElement.clientWidth ? 'mobile':'pc'
    this.mystyle = 'display: flex;width:'+this.gameW+'px;height:'+this.gameW+'px;'
    this.msgbox  = os_type=='pc' ? 'display: flex;width:'+(document.documentElement.clientWidth - this.gameW)+'px;height:'+(document.documentElement.clientHeight-50)+'px;':
    'display: flex;width:'+(document.documentElement.clientWidth)+'px;height:'+(document.documentElement.clientHeight-50-this.gameW)+'px;'
    this.msgbox +=';flex-wrap: wrap;align-items: left;justify-content: left;background-color: #baebd7;'//rgb(32,32,32,0.1)
    this.msg_list_style=os_type=='pc' ? 'background-color: rgb(200,200,200,0.1);width:'+(document.documentElement.clientWidth - this.gameW)+'px;height:'+(document.documentElement.clientHeight-95)+'px;':
    'background-color: rgb(200,200,200,0.1); width:'+(document.documentElement.clientWidth)+'px;height:'+(document.documentElement.clientHeight-95-this.gameW)+'px;'
    this.msg_list_style +=';padding:5px;overflow-y:auto;overflow-x:hidden;font-size:13px;'//display: flex;flex-wrap: wrap;
    // this.send_box_style='width:'+(os_type=='pc' ? document.documentElement.clientWidth - this.gameW - 38 : document.documentElement.clientWidth -38 )+'px;height:28px; padding-bottom:2px; padding-left:5px; border:1px solid #eeeeee; font-size:13px;'
    this.chessW = parseInt( this.gameW*5)

    this.bindEvent()
    if(!window.g_dtnsManager) return 
    const focusRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchannel/focus',{channel:rtchess_channel_name})
    if(!focusRet ||!focusRet.ret) return this.$toast('订阅频道失败！原因：'+(focusRet?focusRet.msg:'未知网络原因'))
    this.$toast('订阅频道成功')
  },
  mounted(){
    // const This = this
    this.$refs.rtbody.style.backgroundImage = `url(${bgimg})`
    if(window.chess_id)
    {
      this.chess_id = window.chess_id
      this.reqChessInfo(window.chess_info && window.chess_info.view_flag)
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
        const This = this  
        if(window.g_pop_event_bus)
        {
          this.event_func = function(data){
              console.log('data:',data)
              if(!data ||!data.notify_type) return false 
              else if(data.notify_type == 'chess_matched')
              {
                if(data.xobj && [data.xobj.user_id,data.xobj.chess_user_id].indexOf(localStorage.user_id)>=0)
                  This.doMatched(data.xobj)
                else
                  console.log('not my chessInfo:',data)
              }
              else if(data.notify_type =='chess_moved')
              {
                if(data.xobj && data.xobj.chess_id==This.chess_id)
                  This.doMoved(data.xobj)
                else
                  console.log('not my chess-move-info:',data)
              }
              else if(data.notify_type == 'msg')
              {
                if(!data || !data.xobj ||data.xobj.chess_id != This.chess_id) return false
                if(This.msgMap.has(data.msgid)) return false
                This.addMsg(data.xobj)
              }
              else if(data.notify_type == 'gift')
              {
                // showCode(data.xobj)
                if(!data || !data.xobj ||data.xobj.chess_id != This.chess_id) return false
                // if(This.msgMap.has(data.msgid)) return false
                This.addMsg({name:'系统消息',msg:data.xobj.name+'赠送了主播礼物-'+rtchess_gifts_map[data.xobj.gift]+'！'})
              }
            }
          window.g_pop_event_bus.on(rtchess_channel_name,this.event_func)
        }
      },
      async unbindEvent()
      {
        this.onLeave()
        if(this.game) this.game.op_is_finished= true
        if(window.zhchess_game) window.zhchess_game.op_is_finished = true
        window.zhchess_game = null
        
        if(window.g_pop_event_bus) window.g_pop_event_bus.removeListener(rtchess_channel_name,this.event_func)
        const unfocusRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchannel/unfocus',{channel:rtchess_channel_name})
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
        // if(!this.audioCloseFlag && !this.rtaudio_started)
        // {
        //   this.rtaudio_started = true
        // }
        this.addMsg({name:'系统消息',msg:this.audioCloseFlag ? '已关闭！':'已启用'})
        this.showAudioStatus()
      },
      showAudioStatus(onLeaveCalling = false)
      {
        if(!this.chessInfo ||!this.chess_id) return this.audioImgSrc = audiocloseimg
        if(this.chessInfo.view_flag){
          this.enableAudio = false
          if(this.audioCloseFlag){
            this.audioImgSrc = audiocloseimg
            if(!onLeaveCalling)
            this.onLeave()
          } 
          else{
            this.audioImgSrc = audioimg
            this.chanageAudioSetting(this.enableAudio)//永远都是关闭状态的开启onJoin
          }
        }
        else{
          if(this.audioCloseFlag){
            this.enableAudio = false
            this.audioImgSrc = miccloseimg
          } 
          else{
            this.audioImgSrc = micimg
            this.enableAudio = true //fix the bug 
          } 
          //可以使用mic
          this.chanageAudioSetting(this.enableAudio)
        }
      },
      chanageAudioSetting(newEnableAudio,rejoin = false) 
      {
        // if(!this.$refs.rtaudio.localStream) return false //如果麦克风或者喇叭未打开，则不进行配置这个newEnableAudio
        const newEnableVideo = false
        console.log('chanageAudioSetting:'+newEnableVideo+' '+newEnableAudio+' rejoin:'+rejoin)
        const localStream = this.$refs.rtaudio.localStream
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
            // if(this.rtaudio_started)
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
          if(!this.$refs.rtaudio.signalClient)//localStream)
          {
            this.$refs.rtaudio.join()
            //------------------------------------------------
            //旧的如是播放器状态，依然会打开录音功能！
            // // const oldFlag = this.enableAudio
            // this.enableAudio= true //务必启用，否则不会启用连接，先启用后关闭
            // setTimeout(()=>this.$refs.rtaudio.join(),10)
            // const This = this
            // if(this.chessInfo.view_flag)//如果是audio模式（喇叭模式）
            // setTimeout(()=>{
            //   // This.enableAudio = oldFlag
            //   This.chanageAudioSetting(false)
            // },1500)
          }
      },
      onLeave() 
      {
        try{
          this.join_flag  = false
          this.$refs.rtaudio.leave();
          this.$refs.rtaudio.localStream = null
          this.$refs.rtaudio.screenStream = null

          //修复更新新局时，旧的未关闭的问题
          this.audioCloseFlag = true
          this.showAudioStatus(true)//会调用onLeave，故应该等等 this.chessInfo = null之后，方进行设置
        }catch(ex){
            console.log('onLeave-exception:'+ex,ex)
        }
    },
      showStatusImg(type='chi')
      {
        const This = this
        if(!this.status_list) this.status_list = []
        this.status_list.push(type)
        setTimeout(()=>
        {
          if(This.status_list.length>1)
          {
            This.showStatusImgNow(This.maxStatus())
          }else if(This.status_list.length ==1)
          {
            This.showStatusImgNow(This.status_list[0])
          }
          This.status_list = []
        },100)//延时100ms显示
      },
      maxStatus()
      {
        let status = this.status_list[0]
        for(let i=1;i<this.status_list.length;i++)
        {
          if(this.status_list[i] > status) status = this.status_list[i]
        }
        return status
      },
      showStatusImgNow(type)
      {
        if(type == 'chi') playMp3('eat')
        else if(type=='jiang') playMp3('trouble')

        const types = ['chi','jue','jiang']
        const imgs  = [chiimg,jueimg,jiangimg]
        const imgSrc  = imgs[types.indexOf(type)]
        const imgEle = document.createElement('img')
        // imgEle.width = '100px'
        // imgEle.height= '100px'
        imgEle.src   = imgSrc
        const left = parseInt( document.documentElement.clientWidth / 2 - 100)
        const top =  parseInt((document.documentElement.clientHeight-50) / 2 - 100) +25
        imgEle.style = 'position:fixed;left:'+left+'px;top:'+top+'px;z-index:199;width:200px;height:200px'
        // if(type!='jue') 
        this.$refs.rtbody.appendChild(imgEle) //立即显示
        // else setTimeout(()=>this.$refs.rtbody.appendChild(imgEle),500) //绝杀等500ms过后再显示
        this.jueImgEle = imgEle
        if(type=='jue')
        {
          imgEle.addEventListener('click', this.chessInfo && this.chessInfo.view_flag ? this.reqView : this.reqMatch)
        }
        if(type!='jue')
        setTimeout(()=>this.$refs.rtbody.removeChild(imgEle),500)
      },
      startGame(chessInfo)
      {
        const This = this
        if(!chessInfo) return false
        if(window.zhchess_game)
        {
          window.zhchess_game.op_is_finished = true
          window.zhchess_game = null
        }
        const app = this.$refs.canvas// document.getElementById("canvas")
        const ctx = app.getContext("2d")
        console.log('ctx.funcs:',Object.keys(CanvasRenderingContext2D),ctx)
        const zhchess = new ZhChess.default({
            ctx,
            gameWidth: this.gameW,
            gameHeight: this.gameW,
            scaleRatio:5,
            duration:50
        })
        // 绑定点击事件
        app.addEventListener("click", async function(e){
          if(zhchess.op_is_finished){
            return false
          }
          if(!This.chess_id || !This.chessInfo)
          {
            return false
          }
          const { offsetX: x, offsetY: y } = e
          if (!zhchess.checkGameState().flag) {
          return
          }
          const clickPoint = zhchess.getGridPosition({ x, y })
          if (!clickPoint) {
          const msg = '点击的位置未找到棋子'
          console.log(msg)
          return
          }
          const choosePiece = zhchess.getChoosePieceVal()
          const isChoose = choosePiece!=null//Boolean(choosePiece)
          const pos = isChoose ? {x:choosePiece.x ,y: choosePiece.y }: clickPoint
          const mov = isChoose ? clickPoint : null
          const side = zhchess.getCurrentSideVal()
          console.log('move-pos:',pos,mov,side)
          if(This.chessInfo && side==This.chessInfo.my_side)
          {
            // zhchess.listenClickAsync(e)
            zhchess.listenClickAsync(e)
            const flag = await This.reqMove(pos,mov)
            console.log('reqMove-flag:',flag)

            // if(pos && mov)
            // {
            //   const pen_code = zhchess.getCurrentPenCode(side)
            //   const flag = await This.reqMove(pos,mov)
            //   if(!flag){
            //     zhchess.setPenCodeList(pen_code)
            //   }
            // }
            // else zhchess.listenClickAsync(e)
          }
          else{
            console.log('call please() function:')
            if(This.chessInfo &&!This.chessInfo.view_flag)//旁观不能催促
            This.please()
          }
          // if(pos && !mov) playMp3('choose')
          // if(mov && pos)
          // setTimeout(()=>{
          // zhchess.changePlaySide('BLACK')},1500) //可以切换至目标视角，方便进行坐标相等的匹配（坐标系匹配）

        })
        //上面已经绑定处理（不能自己同时下两方棋）
        // app.addEventListener("click", zhchess.listenClickAsync, false)
        app.addEventListener("click", function(){
            const flag = zhchess.gameOver()
            console.log('over-flag:',flag)
            console.log('side:',zhchess.currentGameSide)
            const state = zhchess.checkGameState()
            console.log('state:',state)
            if(state && state.flag)
            console.log('pencode:',zhchess.getCurrentPenCode())
            else
                ;//playMp3('moveFail')
        }, false)

        // zhchess.gameStart(chessInfo.my_side) // 开始游戏
        zhchess.gameStart(chessInfo.start_side)
        // setTimeout(()=>{
        //   zhchess.changePlaySide(chessInfo.my_side) //偏向自己一侧
        //   zhchess.changeCurrentPlaySide(chessInfo.start_side)
        // },300)
        // setTimeout(()=>{
          zhchess.changePlaySide(chessInfo.my_side) //偏向自己一侧
        // },0)
        // setTimeout(()=>{
          zhchess.changeCurrentPlaySide(chessInfo.start_side)
        // },1)
        if(chessInfo.now_pen_code)
        // setTimeout(()=>
        {
          zhchess.setPenCodeList(chessInfo.now_pen_code)
          zhchess.checkDraw()
        }
        // ,5)
        // zhchess.moveStr("炮2平5", "RED") // 移动棋子
        zhchess.on('moveFail',function(e,x){
            console.log('moveFail-e,x:',e,x)
            if(e && x){
              playMp3('moveFail')
              This.addMsg({name:'系统消息',msg:'你的棋步不ok！'})
            }
        })
        zhchess.on("move", function(e,x){
            console.log('move-e,x:',e,x)
            const state = zhchess.checkGameState()
            console.log('state:',state)
            if(state && state.flag)
            console.log('pencode:',zhchess.getCurrentPenCode())
            if(e && x)
            {
              playMp3('move')
              // This.addMsg({name:'系统消息',msg:'你的棋步不ok！'})
            }
        })
        zhchess.on("log",function(e,x){
            console.log('log-e,x:',e,x)
            // const side = This.game.getCurrentSideVal()
            // const role = side == 'BLACK' ? '[红方]':'[黑方]'
            if(''+e.indexOf('吃了')>=0){
              // playMp3('eat')
              This.showStatusImg('chi')
              // This.addMsg({name:'系统消息',msg:role+'吃棋！'})
            } 
            if(''+e.indexOf('将军')>=0){
              // playMp3('trouble')
              This.showStatusImg('jiang')
              // This.addMsg({name:'系统消息',msg:role+'将军！'})
            } 
        })
        zhchess.on("over",function(e,x){
            console.log('over-e,x:',e,x)
            // console.log('winer:',zhchess.winnerSide())
            if(e != This.chessInfo.my_side)
                playMp3('over')
            else
                playMp3('victory')

            This.showStatusImg('jue')
            This.chessInfo.game_over = true
            This.addMsg({name:'系统消息',msg:'棋局结束了！'})
            const msg = e=='BLACK' ? '[黑方]胜利！':'[红方]胜利！'
            This.addMsg({name:'系统消息',msg})
        })
        zhchess.on("error",function(e,x){
            console.log('error-e,x:',e,x)
            // playMp3('moveFail')
        })
        this.game = zhchess
        window.zhchess_game = zhchess
        // zhchess.changePlaySide('BLACK')
      },
      clearChessInfo()
      {
        console.log('into clearChessInfo:')
        this.onLeave()
        this.name = null
        this.msg_list=[]
        this.chess_id = null
        this.chessInfo=null
        window.chess_id=null
        window.chess_info=null
        try{
          if(this.jueImgEle) this.$refs.rtbody.removeChild(this.jueImgEle)
          this.jueImgEle = null
        }catch(ex){
          console.log('removeChild-ex:'+ex,ex)
        }
      },
      async reqMatch()
      {
        this.clearChessInfo()
        this.$toast('匹配棋局...')
        this.addMsg({name:'系统消息',msg:'匹配棋局...'})
        this.startGame({start_side:'RED',my_side:'RED'})
        const matchRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchess/match',{})
        if(!matchRet ||!matchRet.ret){
            return this.$toast('匹配失败！原因：'+(matchRet?matchRet.msg:'未知网络原因'))
        }
        else if(matchRet.matched)
        {
          // if(this.chess_id && matchRet.game_over) return this.$toast('')
          // this.$toast('匹配成功！',2000)
          this.doMatched(matchRet)
        }
      },
      async reqChessInfo(view_flag = false)
      {
        this.$toast('进入棋局...')
        this.addMsg({name:'系统消息',msg:'进入棋局...'})
        this.startGame({start_side:'RED',my_side:'RED'})
        const infoRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchess/info',{chess_id:this.chess_id})
        if(!infoRet ||!infoRet.ret){
          this.reqMatch()
          return this.$toast('查询失败！原因：'+(infoRet?infoRet.msg:'未知网络原因'))
        }
        else if(infoRet.user_id && infoRet.chess_user_id)
        {
          if(this.chess_id && infoRet.game_over){
            this.reqMatch()
            return false
          }
          this.$toast('连接成功！',2000)
          this.addMsg({name:'系统消息',msg:'连接成功'})
          if(view_flag) infoRet.view_flag = true
          this.doMatched(infoRet)
        }else{
          this.reqMatch()
        }
      },
      async reqMove(pos,mov)
      {
        if(!pos ||!mov) return false
        const moveRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchess/action',{x0:pos.x,y0:pos.y,x1:mov.x,y1:mov.y,chess_id:this.chess_id})
        if(!moveRet ||!moveRet.ret){
            //return this.$toast('移动失败！原因：'+(moveRet?moveRet.msg:'未知网络原因'))
            if(''+JSON.stringify(moveRet).indexOf('no pm to op')>=0 && moveRet && moveRet.now_pen_code && this.game)
            {
              this.game.setPenCodeList(moveRet.now_pen_code)//避免错误移动棋盘
              this.game.checkDraw()
            }
            return false
        }
        else
        {
          //this.$toast('移动成功！',2000)
          return true
        }
      },
      async reqView()
      {
        this.clearChessInfo()
        const viewRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchess/view',{})
        console.log('viewRet:',viewRet)
        if(!viewRet ||!viewRet.ret){
          return this.$toast('旁观失败！原因：'+(viewRet?viewRet.msg:'未知网络原因'))
        }
        else
        {
          this.$toast('旁观成功！',2000)
          this.addMsg({name:'系统消息',msg:'旁观成功'})
          this.doMatched(viewRet)
          return true
        }
      },
      async please()
      {
        {
          this.msg = '快点了，等得花儿都谢了！'
          this.send()
        }
        if(this.please_lock) return false
        this.please_lock = true
        setTimeout(()=>this.please_lock = false,2000)
        const pleaseRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchess/please',{chess_id:this.chess_id})
        console.log('pleaseRet:',pleaseRet)
        // if(pleaseRet && pleaseRet.ret)
      },
      async doMatched(chessInfo)
      {
        if(!chessInfo ||!chessInfo.chess_id) return false
        // if(this.chess_id && this.chess_id == chessInfo.chess_id) return true
        this.$toast('匹配成功！')
        this.addMsg({name:'系统消息',msg:'匹配成功！'})
        this.chess_id = chessInfo.chess_id
        window.chess_id = this.chess_id
        window.chess_info=chessInfo
        this.chessInfo = chessInfo
        window.imDb.deleteDataByKey('chess-info:'+this.chess_id)
        window.imDb.addData({key:'chess-info:'+this.chess_id,data:chessInfo})
        if(!chessInfo.view_flag)
        chessInfo.my_side = localStorage.user_id == chessInfo.user_id ? chessInfo.user_side : chessInfo.chess_side
        this.startGame(chessInfo)
        this.showAudioStatus()
        this.showGiftList()
      },
      async doMoved(movedInfo)
      {
        if(!movedInfo) return false
        if(!this.game) return false
        const {x0,y0,x1,y1,user_side,chess_side,user_id,user_pen_code} = movedInfo
        console.log('doMoved:',x0,y0,x1,y1,user_side,chess_side,user_id,user_pen_code,movedInfo)
        const res = this.game.update({x:x0,y:y0},{x:x1,y:y1},user_side,true)
        if(res && res.flag) this.game.checkDraw()
        else if(this.chessInfo.view_flag)
        {
          this.game.setPenCodeList(user_pen_code)
          this.game.checkDraw()
        }
        console.log('doMoved-res:',res,movedInfo)
        return res
      },
      showGiftList(zh = true)
      {
        let msg = '可赠送礼物清单：'
        for(let i=0;i<rtchess_gifts.length;i++)
        {
          const gift = zh ? rtchess_gifts_map[ rtchess_gifts[i] ] : rtchess_gifts[i] 
          const price= rtchess_prices[i]
          msg += gift+'$'+price+'；'
        }
        this.addMsg({name:'系统消息',msg})
      },
      async send()
      {
        console.log('msg:',this.msg)
        if(!this.msg) return this.$toast('请输入要发送的消息！')
        if(!this.chessInfo) return this.$toast('待匹配棋局...')
        if(this.chessInfo.game_over) return this.$toast('游戏已结束！')
        const msg = this.msg
        this.msg = ''

        if(!this.name)
        {
          let side = null , role = null
          if(this.chessInfo.view_flag) side = null
          else
          switch(localStorage.user_id){
            case this.chessInfo.user_id: side = this.chessInfo.user_side;break;
            case this.chessInfo.chess_user_id: side = this.chessInfo.chess_side;break;
            default: side = null
          }
          switch(side){
            case 'BLACK': role='[黑方]';break;
            case 'RED': role='[红方]';break;
            default: role = '[观众]'
          }
          //得到this.name
          try{
            const userInfo = JSON.parse(localStorage.userInfo)
            this.name = userInfo.user_name + role
          }catch(ex)
          {
            this.name = '用户-'+ parseInt(Math.random()*10000)+role
          }
        }
        
        const sendRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchess/send',{chess_id:this.chess_id,msg,name:this.name})
        console.log('sendRet:',sendRet)
        if(!sendRet ||!sendRet.ret){
            return this.$toast('发送失败！原因：'+(sendRet?sendRet.msg:'未知网络原因'))
        }
        if(rtchess_gifts_map[msg] || rtchess_gifts_map_zh[msg])
        {
          let gift = msg
          if(rtchess_gifts_map_zh[msg]) gift = rtchess_gifts_map_zh[msg]
          const sendGiftRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchess/gift/send',{gift,chess_id:this.chess_id,user_name:this.name})
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
      }
  }
}
</script>
<style scoped>
</style>
    