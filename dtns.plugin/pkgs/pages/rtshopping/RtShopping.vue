<!--
 * @Description: RtCode图形识别
 * @Author: poplang
 * @Date: 2024-1-6
 * @LastEditors: 
 * @LastEditTime:
 -->
 <template>
    <div style="width: 100%;height: 100%;padding:0px;margin: 0px;background-repeat: no-repeat;background-size: cover;" ref="rtshoppingbody">
      <div @click="back" style="color:white;position: fixed;left:8px;top:8px;z-index: 399;"> ❮返回 </div>
      <div style="color:#202020;position: fixed;left:0;right:0;top:5px;z-index: 359;text-align: center;  font-size: 18px;font-weight: 800;">{{ title }}</div>
      <div @click.stop="buyed" style="color:white;position: fixed;right:8px;top:8px;z-index: 399;"> 已购 </div>
      <!-- <div style="color:red;position: fixed;right:8px;top:8px;z-index: 399;"><b>[分数] {{ top_cnt }} : {{ success_cnt  }}</b></div> -->

      <div class="msgb_app-content" ref="appcontent" style="width:100%; float:left; margin-top:3px;position:relative;">
      </div>
      <div style="position: fixed;bottom: 0px;left:0;right: 0;height: auto;text-align: center;padding: 5px;margin-bottom: 2px;">
        <input @keydown.enter="keyDown" style="width:80%; height:29px; padding-bottom:2px; padding-left:5px; border:1px solid #eeeeee; font-size:13px;" v-model="code" />
        <button @click="send" style="margin-top: 5px;color: rgb(255, 255, 255); border-radius: 0px; font-size: 13px; height: 28px; background-color: rgb(18, 173, 245); border: none;">抢买</button>
      </div>
    </div>
  </template>
  <script>
//   import rtshoppingimg from './rtshopping.jpg'
  import rtshoppingJson  from './rtshopping.json'
  const rtshopping_channel_name = 'rtshopping-channel'
  const rtshoppingimg = rtshoppingJson.rtshoppingimg
  const fireimg = rtshoppingJson.fireimg
  const defaultimg=rtshoppingJson.defaultimg
//   const codeimg = rtshoppingJson.codeimg
  const rtshoppingImgsMap = window.g_rtshoppingImgsMap ?  window.g_rtshoppingImgsMap: new Map()
  window.g_rtshoppingImgsMap = rtshoppingImgsMap

  async function queryLogo(logo)
  {
    if(!logo) return defaultimg
    const img_id = 'dtns://web3:'+window.rpc_client.roomid+'/image/view?filename='+logo+'&img_kind=open'// logo
    console.log('rtshopping-queryLogo-img_id:',img_id)
    const item = await window.imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
    if(item) return item.data
    else{
      const ret = await window.g_dtnsManager.run(img_id,{})
      if(ret && ret.ret && ret.data) {
        const data = 'data:image/png;base64,'+ret.data
        window.imageDb.addData({img_id,data})
        return data
      }
      return defaultimg
    }
  }
  async function showCode(xobj)
  {
    if(!xobj) return false
    if(!xobj.markInfo) return false

    if(rtshoppingImgsMap.has(xobj.codeid+':cnt')) return false
    rtshoppingImgsMap.set(xobj.codeid+':cnt','1')

    const logoData = await queryLogo(xobj.markInfo.logo)
    const imgEle = document.createElement("div");
    // imgEle.src = xobj.data
    imgEle.innerHTML = "<span style='line-height:30px;font-size:18px;font-weight:800;color:red;backgroundColor:#f0f0f0;width:150px'>价格："+xobj.markInfo.std_price+"$ &nbsp;mark:"+xobj.mark+"</span>"+'<img src="'+logoData+'" width="150px" height="150px"/>'+xobj.data
    let radio = 0.3
    // const width = 1200
    // const height= 780
    imgEle.style.width = '150px'//width*radio +'px' //'120px'
    imgEle.style.height= '230px'//height*radio +'px'//'78px'
    imgEle.style.position = 'fixed'
    const left = parseInt( document.documentElement.clientWidth * Math.random() )
    const direct_flag = left > (document.documentElement.clientWidth/2) ? true : false
    imgEle.style.top =  '50px'//(document.documentElement.clientHeight -50) +'px';// ''+parseInt( document.documentElement.clientHeight * Math.random() )+'px'
    imgEle.style.left= ''+(left<20 ? 20 : (left>document.documentElement.clientWidth-20?document.documentElement.clientWidth-20:left ))+'px'
    imgEle.style['z-index'] = '999'
    // imgEle.onclick = ()=>pick(xobj)
    window.g_rtshoppingbody.appendChild(imgEle)
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
    setTimeout(()=>window.g_rtshoppingbody.removeChild(imgEle),80000)
    imgEle.tid = tid
    rtshoppingImgsMap.set(xobj.codeid,imgEle)
    return true
  }
  function hideCodeImg(xobj)
  {
    if(!xobj ||!xobj.codeid) return false;
    if(!rtshoppingImgsMap.has(xobj.codeid)) return false
    const codeImgEle = rtshoppingImgsMap.get(xobj.codeid)
    if(!codeImgEle) return false
    rtshoppingImgsMap.delete(xobj.codeid)
    clearInterval(codeImgEle.tid)
    const left = codeImgEle.style.left
    const top = codeImgEle.style.top
    try{
        window.g_rtshoppingbody.removeChild(codeImgEle)
    }catch(ex){
      console.log('hideCode-codeImgEle:',ex,codeImgEle)
    }
    //显示火图
    const imgEle = document.createElement("img");
    imgEle.style.width = '150px'
    imgEle.style.height= '230px'
    imgEle.style.position = 'fixed'
    imgEle.style.top = top
    imgEle.style.left= left
    imgEle.style['z-index'] = '999'
    imgEle.src = fireimg
    window.g_rtshoppingbody.appendChild(imgEle)
    try{
        setTimeout(()=>window.g_rtshoppingbody.removeChild(imgEle),800)
    }catch(ex){
      console.log('hideCode-imgEle:',ex,imgEle)
    }
  }
  export default {
    name: "RtShopping",
    props: ["value"],
    components: { },
    data() {
      return {
        title:'RT抢着买',
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
      const focusRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchannel/focus',{channel:rtshopping_channel_name})
      if(!focusRet ||!focusRet.ret) return this.$toast('订阅频道失败！原因：'+(focusRet?focusRet.msg:'未知网络原因'))
      this.$toast('订阅频道成功')
    },
    mounted(){
      console.log('rtshoppingimg:',rtshoppingimg)
      this.$refs.rtshoppingbody.style.backgroundImage = `url(${rtshoppingimg})`
      window.g_rtshoppingbody = this.$refs.rtshoppingbody
      // this.$refs.appcontent.style.height = this.h
      console.log('this.$refs.appcontent.style.backgroundImage:',this.$refs.appcontent.style.backgroundImage)
      // const This = this
      // if(window.g_pop_event_bus)
      // window.g_pop_event_bus.on('rtshopping_show_cnt',function(data){
      //   if(!data) return false
      //   This.success_cnt = data.success_cnt
      //   This.top_cnt = data.top_cnt
      // })
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
            }
            window.g_pop_event_bus.on(rtshopping_channel_name,this.event_func)
          }
        },
        async unbindEvent()
        {
          if(window.g_pop_event_bus) window.g_pop_event_bus.removeListener(rtshopping_channel_name,this.event_func)
          const unfocusRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchannel/unfocus',{channel:rtshopping_channel_name})
          console.log('unfocusRet:',unfocusRet)
        },
        buyed()
        {
          this.$router.push('/rtstd')
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
            if(!code) return this.$toast('请您输入验证码的内容！')
            this.code = ''
            const sendRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtshopping/send',{code})
            if(!sendRet ||!sendRet.ret){
                return this.$toast('抢买失败！原因：'+(sendRet?sendRet.msg:'未知网络原因'))
            }
            this.$toast('抢买成功！')
        }
    }
  }
  </script>
<style scoped>
</style>
      