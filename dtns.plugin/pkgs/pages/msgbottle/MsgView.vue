<template>
    <div @click.stop="true == true" style="width: 100%;height: 100%;text-align: center;padding: 5px;">
        <div style="background-color: #f0f0f0;margin-top: 5px;margin-bottom: 10px;width: 100%;">
            <span><b>[{{ my_msg_flag?'我':'@' }}]{{ text_msg }}</b></span>
        </div>
        <div  v-for="(item,index) in replys" :key="index" style="background-color: #303030;margin-top: 5px;margin-bottom: 5px;border-radius: 0px;color: white;" >
            <span :style="item.gift?'color:red;':''">{{ item.my_msg_flag ? '我：':'@：' }}{{ item.gift ? '赠送了'+showGift(item.gift)+'!':item.text_msg }}</span>
        </div>
        <!-- <span style="position:fixed;right: 5px;top:5px" @click="hide">关闭</span> -->
        <textarea @keydown.enter="keyDown" @click.stop="h=1" style="background-color: #f0f0f0;width: 100%;height: 65px;width:100%;border-radius:15px; padding-bottom:2px; padding-left:5px; border:1px solid #eeeeee; font-size:15px;" v-model="msg" :placeholder="giftTips">
        </textarea>
        <button @click.stop="send" style="margin-top: 5px; color: rgb(255, 255, 255); border-radius: 4px; font-size: 13px; height: 28px; background-color: rgb(18, 173, 245); border: none;">回复（漂流瓶）</button>
    </div>
</template>
<script>
  const rtmsgbottle_gifts = ['flower','bicycle','motorcycle','car','roadster','jets']
  const rtmsgbottle_prices= [0.1,1,10,30,100,500]
  const rtmsgbottle_gifts_map= {'flower':'花','bicycle':'自行车','motorcycle':'摩托车','car':'小汽车',
    'roadster':'跑车','jets':'飞机'}
  const rtmsgbottle_gifts_map_zh= {'花':'flower','自行车':'bicycle','摩托车':'motorcycle','小汽车':'car',
  '跑车':'roadster','飞机':'jets'}
    export default {
        name: "MsgView",
        props: ["msgsMap","xmsgid"],
        components: {  },
        data() {
            return {
                h: document.documentElement.clientHeight-56,
                msg:window.g_msgbottle_msg_reply ? window.g_msgbottle_msg_reply:'',
                text_msg:'',
                msgbody:null,
                m_xmsgid:null,
                replys:[],
                my_msg_flag:false,
                giftTips:'',
            }
        },
        watch: {
            msg(oldVal,newVal) {
                window.g_msgbottle_msg_reply = newVal
                console.log('msg-newVal:',newVal)
            }
        },
        async created()
        {
            this.showGiftList()
            console.log('msg-view-created-xmsgid:',this.xmsgid)
            this.m_xmsgid = this.xmsgid
            this.updateInfo()
            const This = this
            if(window.g_pop_event_bus)
            window.g_pop_event_bus.on('msgbottle_show_msg',function(xmsgid){
                This.m_xmsgid = xmsgid
                setTimeout(()=> This.updateInfo(),300)
            })
        },
        mounted(){
            console.log('msg-view-mounted-xmsgid:',this.xmsgid)
        },
        methods: {
            back(){
                this.$router.go(-1)
            },
            hide()
            {
                if(window.g_pop_event_bus)
                window.g_pop_event_bus.emit('msgbottle_sended')
            },
            showGiftList(zh = true)
            {
                let msg = '可赠送礼物清单：'
                for(let i=0;i<rtmsgbottle_gifts.length;i++)
                {
                    const gift = zh ? rtmsgbottle_gifts_map[ rtmsgbottle_gifts[i] ] : rtmsgbottle_gifts[i] 
                    const price= rtmsgbottle_prices[i]
                    msg += gift+'$'+price+'；'
                }
                this.giftTips = msg
            },
            showGift(gift)
            {
                if(rtmsgbottle_gifts_map[gift]) return rtmsgbottle_gifts_map[gift]
                else if(rtmsgbottle_gifts_map_zh[gift]) return rtmsgbottle_gifts_map_zh[gift]
                return gift
            },
            async updateInfo()
            {
                console.log('updateInfo:',this.m_xmsgid)
                let msgbody = await window.imDb.getDataByKey('msgbottle:'+this.m_xmsgid)
                if(!msgbody) return false
                msgbody = msgbody.data
                console.log('updateInfo-msgbody:',msgbody)
                this.my_msg_flag = msgbody.my_msg_flag
                this.msgbody = msgbody
                this.text_msg = msgbody.text_msg
                if(msgbody.gift)
                {
                    this.text_msg = rtmsgbottle_gifts_map[msgbody.gift]
                }
                this.replys = this.msgbody.replys
            },
            GetDateFormat(timestr,format) {
                let data = new Date();;
                if (timestr) {
                    data = new Date(timestr * 1000);
                }
                let t = data.getFullYear() + "-" + (data.getMonth() < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1)) + "-" + (data.getDate() < 10 ? '0' + data.getDate() : data.getDate());
                t = t + " " + (data.getHours() < 10 ? '0' + data.getHours() : data.getHours()) + ':' + (data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes()) + ':' + (data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds());
                if (format == 'y-m') {
                    t = data.getFullYear() + "-" + (data.getMonth() < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1));
                }
                if (format == 'y-m-d') {
                    t = data.getFullYear() + "-" + (data.getMonth() < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1)) + "-" + (data.getDate() < 10 ? '0' + data.getDate() : data.getDate());
                }
                return t;
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
                if(!this.msgbody) return this.$toast('漂流瓶错误')
                if(!this.msgbody.web3key)return this.$toast('未能正确打开漂流瓶，密钥不存在！')

                // this.$router.push('/msgbottle/send')
                const msg = this.msg.trim()
                if(!msg) return this.$toast('请您输入内容！')
                const xmsgid = this.m_xmsgid
                // xmsgid,time_i,sign,en_msg
                const time_i = parseInt(Date.now()/1000) 
                const web3key= this.msgbody.web3key
                const private_key=this.msgbody.private_key
                const {iv,aeskey} = window.sign_util.decodeWeb3keyAes256Str(web3key)
                console.log('import-key:',await window.sign_util.importSecretKey(aeskey))
                const en_msg =  await window.sign_util.encryptMessage(await window.sign_util.importSecretKey(aeskey),iv,msg)
                const sign = await window.key_util.signMsg(await window.key_util.hashVal(xmsgid+':'+time_i),private_key)
                const msgbody = {xmsgid,time_i,en_msg,sign}
                const msgbodyCopy = Object.assign({},msgbody)
                const sendRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtmsgbottle/reply',msgbody)
                if(!sendRet ||!sendRet.ret){
                    return this.$toast('回复漂流瓶失败！原因：'+(sendRet?sendRet.msg:'未知网络原因'))
                }
                //保存在本地
                msgbody.text_msg = msg
                msgbody.my_msg_flag = true
                msgbody.public_key = this.msgbody.public_key
               
                if(!this.msgbody.replys) this.msgbody.replys = [msgbody]
                else this.msgbody.replys.push(msgbody)
                window.imDb.deleteDataByKey('msgbottle:'+xmsgid)
                window.imDb.addData({key:'msgbottle:'+xmsgid,data:this.msgbody})

                this.$toast('回复漂流瓶成功！')
                this.replys = [].concat(this.msgbody.replys)//更新列表
                this.msg = ''
                window.g_msgbottle_msg_reply = ''

                if(rtmsgbottle_gifts_map[msg] || rtmsgbottle_gifts_map_zh[msg])
                {
                    msgbodyCopy.gift = msg
                    if(rtmsgbottle_gifts_map_zh[msg]) msgbodyCopy.gift = rtmsgbottle_gifts_map_zh[msg]
                    const sendGiftRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtmsgbottle/gift/send',msgbodyCopy)
                    if(!sendGiftRet || !sendGiftRet.ret) return this.$toast('赠送礼物失败！原因：'+(sendGiftRet?sendGiftRet.msg:'未知网络原因'))
                    this.$toast('赠送礼物成功！')
                }
                // if(window.g_pop_event_bus)
                // window.g_pop_event_bus.emit('msgbottle_sended')
            }
        }
    }
  </script>