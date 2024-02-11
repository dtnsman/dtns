<template>
    <div @click.stop="true == true" style="width: 100%;height: 100%;text-align: center;padding: 10px;display: flex;flex-wrap: wrap;align-items: left;justify-content: left;background-color: #f0f0f0;">
        <div style="background-color: #f0f0f0;margin-top: 5px;margin-bottom: 10px;width: 100%;line-height: 30px;height: 30px;">
            <span>RT语聊房</span>
        </div>
        <div @click="gotoItem(item)"  v-for="(item,index) in list" :key="index" style="margin:5px;border-radius: 4px; border-radius: 0px; width: 150px;height: 180px;" >
            <img :src="item.logo_src" width="150px" height="150px"/><br/>
            <span style="display:inline-block;line-height: 30px; color: black; width: 150px; text-overflow: clip; overflow: hidden;word-break: break-all;white-space: nowrap;">{{ item.room_name }}</span>
        </div>
    </div>
</template>
<script>
  import rtaudioroomJson  from './rtaudioroom.json'
  const defaultlogo=rtaudioroomJson.defaultlogo
    export default {
        name: "RoomList",
        props: [],
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
            window.g_pop_event_bus.on('rtaudioroom_show_list',function(){
                setTimeout(()=> This.updateInfo(),10)
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
                // if(window.g_pop_event_bus)
                // window.g_pop_event_bus.emit('msgbottle_sended')
            },
            async gotoItem(item)
            {
                console.log('goto-item:',item)
                if(!item ||!item.room_id) return false

                if(window.g_pop_event_bus )
                window.g_pop_event_bus.emit('rtaudioroom_into_room',item)
            },
            async updateInfo()
            {
                const roomsRet = await window.g_dtnsManager.run('dtns://web3:'+window.rpc_client.roomid+'/rtaudioroom/rooms',{})
                console.log('updateInfo-roomsRet:',roomsRet)
                if(!roomsRet ||!roomsRet.ret || !roomsRet.rooms) return this.$toast('查询房间列表失败！原因：'+(roomsRet?roomsRet.msg:'未知网络原因'))
        
                const list = roomsRet.rooms
                if(!list) return this.list = []
                this.list = list
                for(let i=0;i<list.length;i++)
                {
                    //查询得到logo
                    list[i].logo_src = await this.queryImg(list[i].logo)
                }
                this.list = list.slice(0,list.length)
            },
            async queryImg(logo)
            {
                let imgSrc = null
                const item = await window.imageDb.getDataByKey(logo)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
                if(item && item.data) return imgSrc  = item.data
                else{
                    const params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:logo,img_kind:'open',img_p:'min200'}
                    const data = await new Promise((resolve,reject)=>{
                        if(!params || !params.filename) return resolve({ret:false,msg:'param(filename) is null'})
                        window.rpc_client.send('/image/view',params,null,function(rdata){
                        console.log('rdata:'+JSON.stringify(rdata))
                            resolve(rdata.data)
                        })
                        setTimeout(()=>reject(null),30000)
                    })

                    if(!data ||!data.data)
                    {
                        return imgSrc = defaultlogo
                    }
                    imgSrc  ='data:image/png;base64,'+data.data
                    window.imageDb.addData({img_id:logo,data:imgSrc })
                    return imgSrc
                }
            }
        }
    }
  </script>