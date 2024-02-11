<template>
    <div style="height: 0px;width: 0px;"></div>
</template>
<script>
export default {
    name: 'PopInit',
    components: {
      },
    data() {
        return {
            errMsg:'',
        }
    },
    beforeCreate() {
        console.log('canvasStyleData:' + JSON.stringify(this.canvasStyleData))
    },
    async created() {
        console.log('into PopInit.created')
        // this.restore()
    },
    async mounted()
    {
        console.log('into PopInit.mounted')
        while(typeof g_dchatManager=='undefined')
        {
            console.log('PopInit wait g_dchatManager is ok')
            await rpc_client.sleep(300)
        }
        //
        console.log('call g_dchatManager.setViewContext')
        g_dchatManager.setViewContext(this)
    },
}
</script>
