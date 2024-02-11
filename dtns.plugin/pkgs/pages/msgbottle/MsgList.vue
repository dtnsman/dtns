<template>
    <div @click.stop="true == true" style="width: 100%;height: 100%;text-align: center;padding: 5px;">
        <div style="background-color: #f0f0f0;margin-top: 5px;margin-bottom: 10px;width: 100%;">
            <span>🧂我的瓶子🧂</span>
        </div>
        <div @click="gotoItem(item)"  v-for="(item,index) in list" :key="index" style="background-color: #f0f0f0;margin-top: 5px;margin-bottom: 5px;border-radius: 4px; border-radius: 0px; " >
            <span>[ {{ item.my_msg_flag ? '我':'@' }} ] {{ item.text_msg }}</span>
        </div>
        <!-- <span style="position:fixed;right: 5px;top:5px" @click="hide">关闭</span> -->
        <!-- <textarea @click.stop="h=1" style="background-color: #f0f0f0;width: 100%;height: 80%;width:100%;border-radius:15px; padding-bottom:2px; padding-left:5px; border:1px solid #eeeeee; font-size:15px;" v-model="msg">
        </textarea> -->
        <button @click.stop="clearList" style="margin-top: 5px; color: rgb(255, 255, 255); border-radius: 4px; font-size: 13px; height: 28px; background-color: rgb(18, 173, 245); border: none;">清空（漂流瓶）</button>
    </div>
</template>
<script>
    export default {
        name: "MsgList",
        props: ["msgsMap"],
        components: {  },
        data() {
            return {
                list:[],
            }
        },
        async created()
        {
            this.updateInfo()
            const This = this
            if(window.g_pop_event_bus)
            window.g_pop_event_bus.on('msgbottle_show_list',function(){
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
            async gotoItem(item)
            {
                console.log('goto-item:',item)
                if(!item ||!item.xmsgid) return false

                let msgbody = await window.imDb.getDataByKey('msgbottle:'+item.xmsgid)
                if(!msgbody) return false
                msgbody = msgbody.data
                console.log('gotoItem-msgbody:',msgbody)

                const xmsgid = item.xmsgid
                const time_i = parseInt(Date.now()/1000) 
                const private_key= msgbody.private_key
                const sign = await window.key_util.signMsg(await window.key_util.hashVal(xmsgid+':'+time_i),private_key)
                const body = {xmsgid,time_i,sign} 
                const sendRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtmsgbottle/reconnect',body)
                if(!sendRet ||!sendRet.ret){
                    this.$toast('重连漂流瓶失败！原因：'+(sendRet?sendRet.msg:'未知网络原因'))
                }

                if(window.g_pop_event_bus )
                window.g_pop_event_bus.emit('msgbottle_show_msg',item.xmsgid)
            },
            async updateInfo()
            {
                console.log('updateInfo:',this.m_xmsgid)
                let list = await window.imDb.getDataByKey('msgbottle-msg-list')
                if(!list) return this.list = []
                list = list.data

                console.log('updateInfo-list:',list)
                this.list = list
            },
            clearList()
            {
                if(!confirm('确定清空所有的瓶子吗？清空后无法恢复！')) return false
                window.imDb.deleteDataByKey('msgbottle-msg-list')
                this.list = [];
                return true
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
            async send()
            {
            }
        }
    }
  </script>