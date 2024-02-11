<template>
    <div @click="switchIB3">
        <img :src="dtnsIcon" width="21" height="21" style="border: 1px solid #f0f0f0;"/>
        <span style="line-height: 18px;">{{ nowIB3name }}</span>
    </div>
</template>
<script>
import dtnsImgUrl from "../../../static/images/connect-mini.jpg"
export default {
    name: 'ib3status',
    data() {
    return {
      nowIB3name:'',
      dtnsIcon:dtnsImgUrl,
    };
    },
    methods: {
        switchIB3(){
            this.$router.push('/changeSvrNode')
        }
    },
    mounted() {
        if(rpc_client && rpc_client.roomid)
        this.nowIB3name = rpc_client.roomid
    },
    activated(){
        if(rpc_client && rpc_client.roomid)
        this.nowIB3name = rpc_client.roomid
    }
}
</script>
