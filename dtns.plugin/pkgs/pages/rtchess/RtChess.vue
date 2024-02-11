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
    <!-- <div  style="color:white;position: fixed;right:8px;top:8px;z-index: 399;"> 扔一个 </div> -->
    <!-- <div style="color:red;position: fixed;right:8px;top:8px;z-index: 399;"><b>[分数] {{ top_cnt }} : {{ success_cnt  }}</b></div> -->
    <div style="position: fixed;z-index: 99;display: flex;flex-wrap: wrap;align-items: center;justify-content: center; left:0px;right: 0px;top:50px;bottom: 0px;">
    <canvas ref="canvas" :height="chessW" :width="chessW" :style="mystyle" ></canvas>
    </div>
    <!-- <div style="position: fixed;bottom: 0px;left:0;right: 0;height: auto;text-align: center;padding: 5px;margin-bottom: 2px;">
      <input @keydown.enter="keyDown" style="width:80%; height:29px; padding-bottom:2px; padding-left:5px; border:1px solid #eeeeee; font-size:13px;" v-model="code" />
      <button @click="send" style="margin-top: 5px;color: rgb(255, 255, 255); border-radius: 0px; font-size: 13px; height: 28px; background-color: rgb(18, 173, 245); border: none;">发送</button>
    </div> -->
  </div>
</template>
<script>
import rtchessJson  from './rtchess.json'
console.log('rtchessJson:',rtchessJson)
const bgimg = rtchessJson.bgimg
const jueimg= rtchessJson.jueimg
const chiimg= rtchessJson.chiimg
const jiangimg=rtchessJson.jiangimg
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
  components: { },
  data() {
    return {
      title:'RT中国象棋',
      code:'',
      bgimg:bgimg,
      chessW:0,
      mystyle:'display: flex;',
      gameW:0,
      isLoading:false,
      success_cnt:0,
      top_cnt:0,
    }
  },
  async created()
  {
    this.gameW = Math.min( document.documentElement.clientWidth ,document.documentElement.clientHeight) - (document.documentElement.clientWidth > document.documentElement.clientHeight ? 50 :0)
    this.mystyle = 'display: flex;width:'+this.gameW+'px;height:'+this.gameW+'px;'
    this.chessW = parseInt( this.gameW*1.5)

    this.bindEvent()
    if(!window.g_dtnsManager) return 
    // const focusRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchannel/focus',{channel:rtchess_channel_name})
    // if(!focusRet ||!focusRet.ret) return this.$toast('订阅频道失败！原因：'+(focusRet?focusRet.msg:'未知网络原因'))
    // this.$toast('订阅频道成功')
  },
  mounted(){
    const This = this
    this.$refs.rtbody.style.backgroundImage = `url(${bgimg})`
  //   console.log('rtcodeimg:',rtcodeimg,this.h)
  //   this.$refs.rtcodebody.style.backgroundImage = `url(${rtcodeimg})`
  //   window.g_rtcodebody = this.$refs.rtcodebody
  //   // this.$refs.appcontent.style.height = this.h
  //   console.log('this.$refs.appcontent.style.backgroundImage:',this.$refs.appcontent.style.backgroundImage)
  //   const This = this
  //   if(window.g_pop_event_bus)
  //   window.g_pop_event_bus.on('rtcode_show_cnt',function(data){
  //     if(!data) return false
  //     This.success_cnt = data.success_cnt
  //     This.top_cnt = data.top_cnt
  //   })
      const app = this.$refs.canvas// document.getElementById("canvas")
      const ctx = app.getContext("2d")
      console.log('ctx.funcs:',Object.keys(CanvasRenderingContext2D),ctx)
      const zhchess = new ZhChess.default({
          ctx,
          gameWidth: this.gameW,
          gameHeight: this.gameW,
          scaleRatio:1.5,
          duration:50
      })
      // 绑定点击事件
      app.addEventListener("click", function(e){
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
          // if(pos && !mov) playMp3('choose')
          // if(mov && pos)
          // setTimeout(()=>{
          // zhchess.changePlaySide('BLACK')},1500) //可以切换至目标视角，方便进行坐标相等的匹配（坐标系匹配）
      })
      app.addEventListener("click", zhchess.listenClickAsync, false)
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
      zhchess.gameStart("RED") // 开始游戏
      // zhchess.moveStr("炮2平5", "RED") // 移动棋子
      zhchess.on('moveFail',function(e,x){
          console.log('moveFail-e,x:',e,x)
          if(e && x)
          playMp3('moveFail')
      })
      zhchess.on("move", function(e,x){
          console.log('move-e,x:',e,x)
          const state = zhchess.checkGameState()
          console.log('state:',state)
          if(state && state.flag)
          console.log('pencode:',zhchess.getCurrentPenCode())
          if(e && x)
          playMp3('move')
      })
      zhchess.on("log",function(e,x){
          console.log('log-e,x:',e,x)
          if(''+e.indexOf('吃了')>=0){
            // playMp3('eat')
            This.showStatusImg('chi')
          } 
          if(''+e.indexOf('将军')>=0){
            // playMp3('trouble')
            This.showStatusImg('jiang')
          } 
      })
      zhchess.on("over",function(e,x){
          console.log('over-e,x:',e,x)
          // console.log('winer:',zhchess.winnerSide())
          if(e == 'BLACK')
              playMp3('over')
          else
              playMp3('victory')
          This.showStatusImg('jue')
      })
      zhchess.on("error",function(e,x){
          console.log('error-e,x:',e,x)
          // playMp3('moveFail')
      })
      // zhchess.changePlaySide('BLACK')
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
          this.event_func = function(data){
              console.log('data:',data)
              if(!data ||!data.notify_type) return false 
              // else if(data.notify_type == 'code')
              // {
              //   showCode(data.xobj)
              // }
              // else if(data.notify_type == 'code_matched')
              // {
              //   hideCodeImg(data.xobj)
              // }
              // else if(data.notify_type =='user_info')
              // {
              //   showCnt(data.xobj)
              // }
            }
          window.g_pop_event_bus.on(rtchess_channel_name,this.event_func)
        }
      },
      async unbindEvent()
      {
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
        if(type!='jue')
        setTimeout(()=>this.$refs.rtbody.removeChild(imgEle),500)
      },
      async send()
      {
          // this.$router.push('/msgbottle/send')
          const code = this.code.trim()
          if(!code) return this.$toast('请您输入验证的内容！')
          this.code = ''
          const sendRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtcode/send',{code})
          if(!sendRet ||!sendRet.ret){
              return this.$toast('验证失败！原因：'+(sendRet?sendRet.msg:'未知网络原因'))
          }
          const reward_tips = sendRet.reward_ret ?'奖励:'+sendRet.reward :''
          this.$toast('验证成功！'+reward_tips,2000)
      }
  }
}
</script>
<style scoped>
</style>
    