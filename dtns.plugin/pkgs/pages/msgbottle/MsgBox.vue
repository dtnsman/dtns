<template>
    <div @click.stop="true == true" style="width: 100%;height: 100%;text-align: center;padding: 5px;">
        <!-- <span style="position:fixed;right: 5px;top:5px" @click="hide">关闭</span> -->
        <textarea @keydown.enter="keyDown" @click.stop="h=1" style="background-color: #f0f0f0;width: 100%;height: 80%;width:100%;border-radius:15px; padding-bottom:2px; padding-left:5px; border:1px solid #eeeeee; font-size:15px;" v-model="msg">
        </textarea>
        <button @click.stop="send" style="margin-top: 5px;color: rgb(255, 255, 255); border-radius: 4px; font-size: 13px; height: 28px; background-color: rgb(18, 173, 245); border: none;">扔一个（漂流瓶）</button>
    </div>
</template>
<script>
    export default {
        name: "MsgBox",
        props: ["msgsMap"],
        components: {  },
        data() {
            return {
                h: document.documentElement.clientHeight-56,
                msg:window.g_msgbottle_msg_write ? window.g_msgbottle_msg_write:'',
            }
        },
        watch: {
            msg(oldVal,newVal) {
                window.g_msgbottle_msg_write = newVal
                console.log('msg-newVal:',newVal)
            }
        },
        async created()
        {
        },
        mounted(){
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
                const msg = this.msg.trim()
                if(!msg) return this.$toast('请您输入内容！')
                const xmsgid = window.sign_util.newTXID().replace('txid_','xmsgid_')
                const web3key= window.sign_util.getWeb3keyAes256()
                const {iv,aeskey} = window.sign_util.decodeWeb3keyAes256Str(web3key)
                console.log('import-key:',await window.sign_util.importSecretKey(aeskey))
                const en_msg =  await window.sign_util.encryptMessage(await window.sign_util.importSecretKey(aeskey),iv,msg)
                const web3key_hash = await window.key_util.hashVal(web3key)
                const private_key = window.key_util.newPrivateKey()
                const public_key  = window.key_util.getPublicKey(private_key)
                const xtype = 'text'
                const time_i = parseInt(Date.now()/1000)
                const msg_sign = await window.key_util.signMsg(await window.key_util.hashVal(xmsgid+':'+time_i),private_key)
                const msgbody = {xmsgid,xtype,time_i,en_msg,web3key_hash,msg_sign}
                msgbody.my_msg_flag = true
                this.msgsMap.set(msgbody.xmsgid,msgbody)
                const sendRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtmsgbottle/send',msgbody)
                if(!sendRet ||!sendRet.ret){
                return this.$toast('扔漂流瓶失败！原因：'+(sendRet?sendRet.msg:'未知网络原因'))
                }
                msgbody.private_key = private_key
                msgbody.public_key = public_key
                msgbody.web3key = web3key
                msgbody.text_msg = msg
                window.imDb.addData({key:'msgbottle:'+xmsgid,data:msgbody})

                //添加至历史纪录
                window.g_pop_event_bus.emit('msgbottle_list_add',msgbody)

                this.$toast('扔漂流瓶成功！')
                this.msg = ''
                window.g_msgbottle_msg_write = ''
                if(window.g_pop_event_bus)
                window.g_pop_event_bus.emit('msgbottle_sended')
            }
        }
    }
  </script>