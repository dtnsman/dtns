<!--
 * @Description: RtCode图形识别
 * @Author: poplang
 * @Date: 2024-1-6
 * @LastEditors: 
 * @LastEditTime:
 -->
 <template>
    <div style="width: 100%;height: 100%;padding:0px;margin: 0px;background-repeat: no-repeat;background-size: cover;" ref="rtcodebody">
      <div @click="back" style="color:white;position: fixed;left:8px;top:8px;z-index: 399;"> ❮返回 </div>
      <div style="color:white;position: fixed;left:0;right:0;top:8px;z-index: 359;text-align: center;  font-size: 18px;font-weight: 800;">{{ title }}</div>
      <!-- <div  style="color:white;position: fixed;right:8px;top:8px;z-index: 399;"> 扔一个 </div> -->
      <div style="color:red;position: fixed;right:8px;top:8px;z-index: 399;"><b>[分数] {{ top_cnt }} : {{ success_cnt  }}</b></div>

      <div class="msgb_app-content" ref="appcontent" style="width:100%; float:left; margin-top:3px;position:relative;">
      </div>
      <div style="position: fixed;bottom: 0px;left:0;right: 0;height: auto;text-align: center;padding: 5px;margin-bottom: 2px;">
        <input @keydown.enter="keyDown" style="width:80%; height:29px; padding-bottom:2px; padding-left:5px; border:1px solid #eeeeee; font-size:13px;" v-model="code" />
        <button @click="send" style="margin-top: 5px;color: rgb(255, 255, 255); border-radius: 0px; font-size: 13px; height: 28px; background-color: rgb(18, 173, 245); border: none;">发送</button>
      </div>
    </div>
  </template>
  <script>
//   import rtcodeimg from './rtcode.jpg'
  import rtcodeJson  from './rtcode.json'
  const rtcode_channel_name = 'rtcode-channel'
  const rtcodeimg = rtcodeJson.rtcodeimg
  const fireimg = rtcodeJson.fireimg
  const bigfireimg=rtcodeJson.bigfireimg
  const rewardImg=rtcodeJson.rewardimg
//   const codeimg = rtcodeJson.codeimg
  const codeImgsMap = window.g_codeImgsMap ?  window.g_codeImgsMap: new Map()
  window.g_codeImgsMap = codeImgsMap

  function showCode(xobj)
  {
    if(!xobj) return false

    if(codeImgsMap.has(xobj.codeid+':cnt')) return false
    codeImgsMap.set(xobj.codeid+':cnt','1')

    const imgEle = document.createElement("div");
    // imgEle.src = xobj.data
    imgEle.reward_flag=xobj.reward_flag 
    imgEle.innerHTML = xobj.reward_flag ? '<img src="'+rewardImg+'" width="150px" height="150px"/><br/>'+xobj.data : xobj.data
    let radio = 0.3
    // const width = 1200
    // const height= 780
    imgEle.style.width = '150px'//width*radio +'px' //'120px'
    imgEle.style.height=  xobj.reward_flag  ? '200px' :'50px'//height*radio +'px'//'78px'
    imgEle.style.position = 'fixed'
    const left = parseInt( document.documentElement.clientWidth * Math.random() )
    const direct_flag = left > (document.documentElement.clientWidth/2) ? true : false
    imgEle.style.top =  '50px'//(document.documentElement.clientHeight -50) +'px';// ''+parseInt( document.documentElement.clientHeight * Math.random() )+'px'
    imgEle.style.left= ''+(left<20 ? 20 : (left>document.documentElement.clientWidth-20?document.documentElement.clientWidth-20:left ))+'px'
    imgEle.style['z-index'] = '999'
    // imgEle.onclick = ()=>pick(xobj)
    window.g_rtcodebody.appendChild(imgEle)
    const tid = setInterval(()=>{
    //   radio -= 0.0002
      radio = radio<0.01 ? 0.01 :radio 
    //   imgEle.style.width = width*radio +'px' //'120px'
    //   imgEle.style.height= height*radio +'px'//'78px'
      imgEle.style.top = ''+(parseInt(imgEle.style.top.replace('px',''))+ 3)+'px'
      const left_len = document.documentElement.clientWidth<500 ? 0: parseInt( 10*Math.random())
      const left = (parseInt(imgEle.style.left.replace('px',''))- parseInt(direct_flag?left_len:0-left_len ))
      imgEle.style.left= ''+(left<20 ? 20 : (left>document.documentElement.clientWidth-20?document.documentElement.clientWidth-20:left ))+'px'
    },200)
    setTimeout(()=>clearInterval(tid),80000)
    setTimeout(()=>window.g_rtcodebody.removeChild(imgEle),80000)
    imgEle.tid = tid
    codeImgsMap.set(xobj.codeid,imgEle)
    return true
  }
  function hideCodeImg(xobj)
  {
    if(!xobj ||!xobj.codeid) return false;
    const codeImgEle = codeImgsMap.get(xobj.codeid)
    if(!codeImgEle) return false
    clearInterval(codeImgEle.tid)
    const left = codeImgEle.style.left
    const top = codeImgEle.style.top
    try{
        window.g_rtcodebody.removeChild(codeImgEle)
    }catch(ex){
      console.log('hideCode-codeImgEle:',ex,codeImgEle)
    }
    //显示火图
    const imgEle = document.createElement("img");
    imgEle.style.width = '150px'
    imgEle.style.height= codeImgEle.reward_flag ? '200px': '50px'
    imgEle.style.position = 'fixed'
    imgEle.style.top = top
    imgEle.style.left= left
    imgEle.style['z-index'] = '999'
    imgEle.src = codeImgEle.reward_flag ? bigfireimg: fireimg
    window.g_rtcodebody.appendChild(imgEle)
    try{
        setTimeout(()=>window.g_rtcodebody.removeChild(imgEle),800)
    }catch(ex){
      console.log('hideCode-imgEle:',ex,imgEle)
    }
  }

  async function showCnt(xobj)
  {
    if(!xobj ||!xobj.user_id || xobj.user_id!=localStorage.user_id) return false
    window.g_pop_event_bus.emit('rtcode_show_cnt',xobj)
  }

  export default {
    name: "RtCode",
    props: ["value"],
    components: { },
    data() {
      return {
        title:'RT看得准',
        code:'',
        isLoading:false,
        success_cnt:0,
        top_cnt:0,
      }
    },
    async created()
    {
      this.bindEvent()
      if(!window.g_dtnsManager) return 
      const focusRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchannel/focus',{channel:rtcode_channel_name})
      if(!focusRet ||!focusRet.ret) return this.$toast('订阅频道失败！原因：'+(focusRet?focusRet.msg:'未知网络原因'))
      this.$toast('订阅频道成功')
    },
    mounted(){
      console.log('rtcodeimg:',rtcodeimg,this.h)
      this.$refs.rtcodebody.style.backgroundImage = `url(${rtcodeimg})`
      window.g_rtcodebody = this.$refs.rtcodebody
      // this.$refs.appcontent.style.height = this.h
      console.log('this.$refs.appcontent.style.backgroundImage:',this.$refs.appcontent.style.backgroundImage)
      const This = this
      if(window.g_pop_event_bus)
      window.g_pop_event_bus.on('rtcode_show_cnt',function(data){
        if(!data) return false
        This.success_cnt = data.success_cnt
        This.top_cnt = data.top_cnt
      })
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
                else if(data.notify_type == 'code')
                {
                  showCode(data.xobj)
                }
                else if(data.notify_type == 'code_matched')
                {
                  hideCodeImg(data.xobj)
                }
                else if(data.notify_type =='user_info')
                {
                  showCnt(data.xobj)
                }
              }
            window.g_pop_event_bus.on(rtcode_channel_name,this.event_func)
          }
        },
        async unbindEvent()
        {
          if(window.g_pop_event_bus) window.g_pop_event_bus.removeListener(rtcode_channel_name,this.event_func)
          const unfocusRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchannel/unfocus',{channel:rtcode_channel_name})
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
      