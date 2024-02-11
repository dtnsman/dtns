<template>
    <div class="opbanner">
      <div class="opitem" @click="back">
        &lt;后退
      </div>
      <div class="opitem" @click="refresh">
        刷新R
      </div>
      <div class="opitem" @click="forward">
        前进&gt;
      </div>
    </div>
  </template>
  <script>
    export default{
        name:'DXIBOPBanner',
        components: {
        },
        props: {
            dxib: {
                type: Object,
                required: true,
                default: () => {},
            },
        },
        data() {
            return {
                errMsg:'',
            }
        },
        async created() {
            console.log('into opbanner.created')
        },
        async mounted() {
            console.log('into opbanner-mounted...')
        },
        methods: {
            async back()
            {
                console.log('call opbanner-back',this.dxib)
                if(!this.dxib || !this.dxib.context) return false
                this.dxib.context.go(-1)
                this.playAction()
                return true
            },
            async forward()
            {
                console.log('call opbanner-forward',this.dxib)
                if(!this.dxib || !this.dxib.context) return false
                this.dxib.context.go(1)
                this.playAction()
                return true
            },
            refresh()
            {
                console.log('call opbanner-refresh',this.dxib)
                if(!this.dxib || !this.dxib.context) return false
                this.dxib.context.refresh()
                this.playAction()
                return true
            },
            playAction()
            {
                if(!this.dxib || !this.dxib.context) return false
                let startRet = this.dxib.context.start(this.dxib.viewThis)
                console.log('opbanner-playAction-startRet:',startRet)
                return true
            }
        }
    }
  </script>
  <style scoped>
  .opbanner{display: flex;}
  .opbanner .opitem{display: flex;width:45px;height: 30px;line-height: 30x;color:aqua;font-size: 14px;text-align: center;}
  </style>
  