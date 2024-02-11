<!--
 * @Description: MsgBottle漂流瓶插件
 * @Author: poplang
 * @Date: 2024-1-3
 * @LastEditors: 
 * @LastEditTime:
 -->
 <template>
    <div style="width: 100%;height: 100%;padding:0px;margin: 0px;background-repeat: no-repeat;background-size: cover;" ref="msgbottlebody">
      <!-- <div class="msgb_app-header" style="padding-top: 8px;display: flex; width: 100%;color:#303030">
        <span @click="back" style="display: flex;width: 25%;padding-left: 8px; align-items: center;justify-content: left;"> ❮返回 </span> &nbsp;
        <span style="font-weight: 800; display: flex;align-items: center;justify-content: center;width: 50%;font-size: 18px;">{{ title }}</span>
        <span @click="showBoxNow" style="display: flex;width: 25%;padding-right: 8px; align-items: center;justify-content: right;">扔一个</span>
      </div> -->
      <div @click="back" style="position: fixed;left:8px;top:8px;z-index: 399;"> ❮返回 </div>
      <div style="position: fixed;left:0;right:0;top:8px;z-index: 359;text-align: center; color: #303030; font-size: 18px;font-weight: 800;">{{ title }}</div>
      <div @click="showBoxNow" style="position: fixed;right:8px;top:8px;z-index: 399;"> 扔一个 </div>

      <div class="msgb_app-content" ref="appcontent" style="width:100%; float:left; margin-top:3px;position:relative;">
      </div>
      <div @click="showBox=false" v-if="showBox" style="position: fixed;z-index: 999;display: flex;align-items: center;justify-content: center; left:0;right: 0;top:0;bottom: 0;background-color: rgba(0, 0, 0, 0.6);">
        <MsgBox ref="msgBoxEle" :msgsMap="msgsMap" style="width: 310px;height: 260px;"></MsgBox>
      </div>
      <div @click="showMsg=false" v-if="showMsg" style="position: fixed;z-index: 999;display: flex;align-items: center;justify-content: center; left:0;right: 0;top:0;bottom: 0;background-color: rgba(0, 0, 0, 0.6);overflow-y:scroll;overflow-x:hidden;flex-wrap: wrap;">
        <MsgView :msgsMap="msgsMap" :xmsgid="xmsgid" style="width: 310px;height: auto;"></MsgView>
      </div>
      <div @click="showList=false" v-if="showList" style="position: fixed;z-index: 999;display: flex;align-items: center;justify-content: center; left:0;right: 0;top:0;bottom: 0;background-color: rgba(0, 0, 0, 0.6);overflow-y:scroll;overflow-x:hidden;flex-wrap: wrap;">
        <MsgList :msgsMap="msgsMap" style="width: 310px;height: auto;"></MsgList>
      </div>
      <div @click="showListNow" style="color:#f0f0f0;text-align: center;left:0;right: 0;height: 20px;line-height: 20px;font-size: 15px;position: fixed;z-index: 990;bottom:3px">🧂我的瓶子🧂</div>
    </div>
  </template>
  <script>
//   import msgbottleimg from './msgbottle.jpg'
  import msgbottleJson  from './msgbottle.json'
  import MsgBox from './MsgBox.vue'
  import MsgView from './MsgView.vue'
  import MsgList from './MsgList.vue'
  const msgbottle_channel_name = 'rtmsgbottle-channel'
  const msgbottleimg = msgbottleJson.msgbottleimg
  const bottleimg = msgbottleJson.bottleimg
  const msgsMap = new Map()
  // const pageStatus={exit_flag:false}

  const bottlesMap = window.g_bottlesMap ? window.g_bottlesMap : new Map()
  window.g_bottlesMap = bottlesMap

  async function sendWeb3key2Picker(picker_public_key,xobj)
  {
    let msgbody = await window.imDb.getDataByKey('msgbottle:'+xobj.xmsgid)
    if(!msgbody) return false
    msgbody = msgbody.data
    const en_msg = await window.sign_util.encryptSomethingInfo( msgbody.web3key,picker_public_key)
    const body = {xmsgid:xobj.xmsgid,en_msg,time_i:parseInt(Date.now()/1000)}
    const private_key = msgbody.private_key
    body.sign     = await window.key_util.signMsg(await window.key_util.hashVal(xobj.xmsgid+':'+body.time_i),private_key)
    const sendRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtmsgbottle/web3key/sync',body)
    console.log('sendWeb3key2Picker:sendRet:',sendRet)
    return sendRet
  }
  async function readWeb3key(xobj)
  {
    let msgbody = await window.imDb.getDataByKey('msgbottle:'+xobj.xmsgid)
    if(!msgbody) return false
    msgbody = msgbody.data
    //使用自己的private_key进行解密
    msgbody.web3key = await window.sign_util.decryptSomethingInfo( xobj.en_msg,msgbody.private_key)
    console.log('readWeb3key:',msgbody.web3key)
    const {iv,aeskey} = window.sign_util.decodeWeb3keyAes256Str(msgbody.web3key)
    console.log('readWeb3key-import-key:',await window.sign_util.importSecretKey(aeskey))
    msgbody.text_msg =  await window.sign_util.decryptMessage(await window.sign_util.importSecretKey(aeskey),iv,msgbody.en_msg)
    console.log('readWeb3key-decryptMessage:',msgbody.text_msg)
    window.imDb.deleteDataByKey('msgbottle:'+xobj.xmsgid)
    window.imDb.addData({key:'msgbottle:'+xobj.xmsgid,data:msgbody})
    msgsMap.set(xobj.xmsgid,msgbody)
    window.g_pop_event_bus.emit('msgbottle_show_msg',xobj.xmsgid)
    window.g_pop_event_bus.emit('msgbottle_list_add',msgbody)
    return true
  }

  function showBottle(xobj)
  {
    if(!xobj) return false
    // if(pageStatus.exit_flag)
    // {
    //   console.log('showBottle-pageStatus.exit_flag == true :',pageStatus)
    //   return false
    // }

    if(bottlesMap.has(xobj.xmsgid+':cnt')) return false
    bottlesMap.set(xobj.xmsgid+':cnt','1')

    const imgEle = document.createElement("img");
    imgEle.src = bottleimg
    let radio = 0.3
    const width = 1200
    const height= 780
    imgEle.style.width = width*radio +'px' //'120px'
    imgEle.style.height= height*radio +'px'//'78px'
    imgEle.style.position = 'fixed'
    const left = parseInt( document.documentElement.clientWidth * Math.random() )
    const direct_flag = left > (document.documentElement.clientWidth/2) ? true : false
    imgEle.style.top = (document.documentElement.clientHeight -50) +'px';// ''+parseInt( document.documentElement.clientHeight * Math.random() )+'px'
    imgEle.style.left= ''+(left<20 ? 20 : (left>document.documentElement.clientWidth-20?document.documentElement.clientWidth-20:left ))+'px'
    imgEle.style['z-index'] = '999'
    imgEle.onclick = ()=>pick(xobj)
    window.g_msgbottlebody.appendChild(imgEle)
    const tid = setInterval(()=>{
      radio -= 0.0002
      radio = radio<0.01 ? 0.01 :radio 
      imgEle.style.width = width*radio +'px' //'120px'
      imgEle.style.height= height*radio +'px'//'78px'
      imgEle.style.top = ''+(parseInt(imgEle.style.top.replace('px',''))- 3)+'px'
      const left_len = document.documentElement.clientWidth<500 ? 0: parseInt( 10*Math.random())
      const left = (parseInt(imgEle.style.left.replace('px',''))- parseInt(direct_flag?left_len:0-left_len ))
      imgEle.style.left= ''+(left<20 ? 20 : (left>document.documentElement.clientWidth-20?document.documentElement.clientWidth-20:left ))+'px'
    },200)
    setTimeout(()=>clearInterval(tid),80000)
    setTimeout(()=>window.g_msgbottlebody.removeChild(imgEle),80000)
    imgEle.tid = tid
    bottlesMap.set(xobj.xmsgid,imgEle)
    return true
  }
  function hideBottle(xobj)
  {
    if(!xobj ||!xobj.xmsgid) return false;
    // if(pageStatus.exit_flag)
    // {
    //   console.log('hideBottle-pageStatus.exit_flag == true :',pageStatus)
    //   return false
    // }
    const bottle = bottlesMap.get(xobj.xmsgid)
    if(!bottle) return false
    clearInterval(bottle.tid)
    try{
      window.g_msgbottlebody.removeChild(bottle)
    }catch(ex){
      console.log('hideBottle:',ex,bottle)
    }
  }
  async function pick(xobj)
  {
    const This = window.g_dchatManager.viewContext
    console.log('into pick:',xobj)
    const xmsgid = xobj.xmsgid
    const msgbody = msgsMap.get(xmsgid)
    console.log('into pick:msgbody:',msgbody)
    // if(!msgbody) return this.$toast('该漂流瓶内容为空！')
    if(msgbody && msgbody.my_msg_flag){
      window.g_pop_event_bus.emit('msgbottle_show_msg',xmsgid)
      return This.$toast('这是自己的漂流瓶！')
    } 
    const time_i = parseInt(Date.now()/1000) 
    const private_key = window.key_util.newPrivateKey()
    const public_key  = window.key_util.getPublicKey(private_key)
    const picker_sign = await window.key_util.signMsg(await window.key_util.hashVal(xmsgid+':'+time_i),private_key)
    const infoRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtmsgbottle/info',{xmsgid})
    if(!infoRet ||!infoRet.ret) return This.$toast('查询漂流瓶的摘要信息失败！原因：'+(pickRet?pickRet.msg:'未知网络原因'))
    delete infoRet.ret
    delete infoRet.msg
    infoRet.private_key = private_key
    infoRet.public_key  = public_key
    msgsMap.set(xobj.xmsgid,infoRet)
    window.imDb.deleteDataByKey('msgbottle:'+xobj.xmsgid)
    window.imDb.addData({key:'msgbottle:'+xobj.xmsgid,data:infoRet})
    const pickRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtmsgbottle/pick',{xmsgid,time_i,picker_sign})
    if(!pickRet ||!pickRet.ret) return This.$toast('拾取漂流瓶失败！原因：'+(pickRet?pickRet.msg:'未知网络原因'))
    This.$toast('拾取漂流瓶成功')
    // window.g_pop_event_bus.emit('msgbottle_show_msg',xmsgid)
  }

  const replysMap = new Map()
  window.g_bottle_replysMap = window.g_bottle_replysMap ? window.g_bottle_replysMap : replysMap
  async function recordReply(xobj)
  {
    if(!xobj ||!xobj.xmsgid) return false
    const {xmsgid,time_i,en_msg,sign,is_picker} = xobj
    console.log('recordReply:',xmsgid,time_i,en_msg,sign,is_picker)
    const rkey = 'reply:'+time_i+':'+en_msg+':'+xobj.gift
    console.log('recordReply-rkey1:',rkey,window.g_bottle_replysMap.has(rkey))
    if(window.g_bottle_replysMap.has(rkey)) return false
    window.g_bottle_replysMap.set(rkey,'ok')
    console.log('recordReply-rkey2:',rkey,window.g_bottle_replysMap.has(rkey))

    let msgbottleInfo = await window.imDb.getDataByKey('msgbottle:'+xmsgid)
    if(!msgbottleInfo) return false
    msgbottleInfo = msgbottleInfo.data

    // xmsgid,time_i,sign,en_msg
    const web3key= msgbottleInfo.web3key
    const {iv,aeskey} = window.sign_util.decodeWeb3keyAes256Str(web3key)
    console.log('import-key:',await window.sign_util.importSecretKey(aeskey))
    const text_msg = await window.sign_util.decryptMessage(await window.sign_util.importSecretKey(aeskey),iv,en_msg)
    const msgbody = Object.assign({},xobj)
    msgbody.text_msg = text_msg
    msgbody.my_msg_flag = xobj.gift ? xobj.gift_owner : false
    if(xobj.gift)
    msgbody.gift = xobj.gift

    if(!msgbottleInfo.replys) msgbottleInfo.replys = [msgbody]
    else msgbottleInfo.replys.push(msgbody)
    window.imDb.deleteDataByKey('msgbottle:'+xmsgid)
    window.imDb.addData({key:'msgbottle:'+xmsgid,data:msgbottleInfo})

    window.g_pop_event_bus.emit('msgbottle_show_msg',xmsgid)
  }

  export default {
    name: "MsgBottle",
    props: ["value"],
    components: { MsgBox,MsgView,MsgList},
    data() {
      return {
        title:'RT漂流瓶',
        isLoading:false,
        showBox:false,
        showMsg:false,
        showList:false,
        h: document.documentElement.clientHeight-56,
        msgsMap:msgsMap
      }
    },
    async created()
    {
      this.bindEvent()
      if(!window.g_dtnsManager) return 
      const focusRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchannel/focus',{channel:msgbottle_channel_name})
      if(!focusRet ||!focusRet.ret) return this.$toast('订阅RT漂流瓶频道失败！原因：'+(focusRet?focusRet.msg:'未知网络原因'))
      this.$toast('订阅RT漂流瓶频道成功')
    },
    mounted(){
      console.log('msgbottleimg:',msgbottleimg,this.h)
      this.$refs.msgbottlebody.style.backgroundImage = `url(${msgbottleimg})`
      window.g_msgbottlebody = this.$refs.msgbottlebody
      // this.$refs.appcontent.style.height = this.h
      console.log('this.$refs.appcontent.style.backgroundImage:',this.$refs.appcontent.style.backgroundImage)
      const This = this
      if(window.g_pop_event_bus)
      window.g_pop_event_bus.on('msgbottle_sended',function(data){
        console.log('data:',data)
        This.showBox = false
        This.showMsg = false
        This.showList= false
      })
      if(window.g_pop_event_bus)
      window.g_pop_event_bus.on('msgbottle_show_msg',function(xmsgid){
        This.xmsgid = xmsgid
        This.showMsgNow()
      })
      if(window.g_pop_event_bus)
      window.g_pop_event_bus.on('msgbottle_list_add',function(data){
        This.addItemToList(data)
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
            if(data.notify_type == 'need_aes256key')
            {
              const picker_public_key = data.xobj.picker_public_key
              sendWeb3key2Picker(picker_public_key,data.xobj)
            }
            else if(data.notify_type == 'sync_aes256key')
            {
              readWeb3key(data.xobj)
            }
            else if(data.notify_type == 'msgbottle')
            {
              showBottle(data.xobj)
            }
            else if(data.notify_type == 'picked')
            {
              hideBottle(data.xobj)
            }
            else if(data.notify_type =='reply')
            {
              recordReply(data.xobj)
            }
            else if(data.notify_type =='gift')
            {
              recordReply(data.xobj)
            }
          }
          window.g_pop_event_bus.on(msgbottle_channel_name,this.event_func)
        }
      },
      async unbindEvent()
      {
        //确保能记录到reply事件的内容
        // if(window.g_pop_event_bus) window.g_pop_event_bus.removeListener(msgbottle_channel_name,this.event_func)
        // pageStatus.exit_flag = true
        const unfocusRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtchannel/unfocus',{channel:msgbottle_channel_name})
        console.log('unfocusRet:',unfocusRet)
      },
      showMsgNow()
      {
        this.showBox = false
        this.showMsg = true
        this.showList= false
      },
      showBoxNow()
      {
        this.showBox = true
        this.showMsg = false
        this.showList= false
      },
      showListNow()
      {
        this.showBox = false
        this.showMsg = false
        this.showList= true
        window.g_pop_event_bus.emit('msgbottle_show_list')
      },
      async send()
      {
        console.log('use MsgBox.vue.send函数')
      },
      async addItemToList(item)
      {
        console.log('addItemToList:',item)
        if(!item || !item.xmsgid) return []

        if(bottlesMap.has(item.xmsgid+':into:list')) return []
        bottlesMap.set(item.xmsgid+':into:list','ok')

        let list = await window.imDb.getDataByKey('msgbottle-msg-list')
        if(!list) list =[]
        else list = list.data
        list = [item].concat(list)
        window.imDb.deleteDataByKey('msgbottle-msg-list')
        window.imDb.addData({key:'msgbottle-msg-list',data:list})
        return list
      }
    }
  }
  </script>
<style scoped>
body {
    margin: 0;
    padding: 0;
    background-color: #ccc;
}
.app-header {
    padding: 16px;
    box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
    background-color: #555;
    color: #ddd;
}

.app-content {
    padding: 24px 16px;
}

.right {
    float: right;
}
</style>
      