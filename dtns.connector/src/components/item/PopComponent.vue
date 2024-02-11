<template>
<div style="width:100%;" >
    <!-- @click="clickFull"> -->
          <div v-if="item"
              class="canvas"
              :style="{
                  ...getCanvasStyle(item.style),
                  width: (item.style.width-10) + 'px',
                  height: item.style.height + 'px',
                  zoom:  (fullWidth)*zoom / (item.style.width-10)   ,
                  'transform-origin': 'left top'
              }">
                <ComponentWrapper
                    v-for="(subitem, subindex) in item.data"
                    :key="subindex"
                    :config="subitem"
                />
          </div>
          <div v-else @click="switchIB3Now">
            {{ loadingText }}
          </div>
  </div>
</template>
<script>
import { getStyle, getCanvasStyle } from '@/utils/style'
import { changeStyleWithScale } from '@/utils/translate'
import ComponentWrapper from '@/components/Item/ComponentWrapper'
import runAnimation from '@/utils/runAnimation'

export default {
    name: 'PopComponent',
    components: {
        ComponentWrapper,
      },
    props: {
        xitem: {
            type: Object,
            required: true,
            default: () => {},
        },
        fullWidth:{
            type:Number,
            required:true,
            default:window.fullWidth
        },
        zoom:{
            type:Number,
            required:true,
            default:0
        },
        fileId:{
            type:String,
            required:false,
            default:null
        },
        dxib:{
            type: Object,
            required: false,
            default: () => {},
        },
    },
    data() {
        return {
            errMsg:'',
            copyData: [],
            componentData: null,
            canvasStyleData: null,
            loadingText:'【loading】mini-card文件加载中...',
            item:null,
            myfileId:'',
        }
    },
    beforeCreate() {
        console.log('canvasStyleData:' + JSON.stringify(this.canvasStyleData))
    },
    async created() {
        console.log('into PopComponent.created')
        // this.restore()
        
        // console.log('tmpJson:' + JSON.stringify(deepCopy(this.componentData)))
        // this.$set(this, 'copyData', deepCopy(this.componentData))
        if(this.xitem)
        {
            this.item = this.xitem
            this.callPoplang()
        }
        else  if(this.fileId)
        {
            this.myfileId = this.fileId
            // this.queryMiniCardFileInfo()
            let fileId = this.fileId
            let reqUrl = null
            if(fileId && fileId.startsWith('dtns://')){
                reqUrl = fileId
            }
            else //使用传统方式进行
            {
                reqUrl = 'dtns://web3:'+rpc_client.roomid+'/file?filename='+fileId
            }
            this.fileId = reqUrl

            let fileItem = await g_dchatManager.queryXFileInfo(this.fileId)
            console.log('query-minicard-fileItem-res:',fileItem)

            if(fileItem) //return this.$toast('加载minicard源文件失败！')
            try{
                fileItem = JSON.parse(new TextDecoder().decode(fileItem))
            }catch(ex){
                console.log('json-parse-xverse-xfile-failed:'+ex,ex)
            }
            if(!fileItem){ 
                console.log('加载minicard源文件失败:',this.fileId)
                this.loadingText = '[Notice]PopComponent-data-item is null（fileId:'+this.fileId+'）, maybe need'
                 + (this.fileId && this.fileId.startsWith('dtns://') ? ' switchIB3 now !':' download network-data , try refresh again! ')
            }
            else{
                this.item = fileItem
                this.callPoplang()
            }
        }
        // // 开始绑定pop.lang
        // console.log('this.config:' + JSON.stringify(this.canvasStyleData))
        // // eslint-disable-next-line
        // this.poplang = new PopRuntime(this.canvasStyleData)
        // window.poplang = this.poplang // 这里设置为全局对象。
        // // 不使用this.canvasStyleDate.poplang（会导致无限重绘，导致堆栈崩溃）
        // const protocolCache = localStorage.getItem('protocol_config')
        // console.log('protocolCache:' + JSON.stringify(protocolCache))

        // if (protocolCache) {
        //     this.poplang.setProtocol(JSON.parse(protocolCache))
        //     this.isok = 'ok'
        // } else {
        //     this.isok = false
        // }
        // await this.poplang.runScript(null, this.canvasStyleData.code, true)
        // await this.poplang.op(null, 'beforeCreate')

        // this.poplang.op(null, 'created')
    },
    beforeMount() {
        // this.poplang.op(null, 'beforeMount')
    },
    async mounted() {
        console.log('PopComponent-mounted...')
        try {
            if(this.$refs  && this.$refs.component && this.$refs.component.$el && this.config )
            runAnimation(this.$refs.component.$el, this.config.animations)
        } catch (ex) {
            console.log('runAnimation-ex:' + ex)
        }

        if(!this.config) return 
        const events = this.config.events
        if(!events) return 
        Object.keys(events).forEach(event => {
            if (event == 'code') { 
            }
        })
        if (true) return 
    },
    beforeDestroy() {
        // this.poplang.op(null, 'beforeDestroy')
    },
    destroyed() {
        // this.poplang.op(null, 'destroyed')
    },
    beforeUpdate() {},
    updated() {},
    errorCaptured(err,vm,info)
    {
        this.errMsg = 'PopComponent-errorCaptured:'+err.toString()+'\ninfo:'+info
        console.log('PopComponent-errorCaptured:'+err.toString()+'\ninfo:'+info)
        alert('PopComponent-errorCaptured:'+err.toString()+'\ninfo:'+info)
        return false
    },
    methods: {
        getStyle,
        getCanvasStyle,
        changeStyleWithScale,
        
        async switchIB3Now()
        {
            console.log('switchIB3Now clicked:',this.myfileId)
            if(!this.myfileId || !this.myfileId.startsWith('dtns://')) return 
            let {params,web3name} =  g_dtnsManager.nslookupIB3ID(this.myfileId)
            if(confirm('确定切换至目标ib3智体节点吗？目标IB3.node：'+web3name))
            {
               let ret = await g_dchatManager.switchIB3(web3name,this)
               console.log('switchIB3Now-ret:',ret,this.myfileId)
            }
        },
        async onClick() {
            
        },

        onMouseEnter() {
            eventBus.$emit('v-hover', this.config.id)
        },
        initDXIBRuntime(poplang)
        {
            if(!poplang) return false
            if(!this.dxib) return false
            if(typeof this.dxib.initDXIBRuntime !='function') return false
            this.dxib.initDXIBRuntime(poplang)
            return true
        },
        async callPoplang()
        {
            this.copyData = this.item.data //deepCopy(this.componentData)
            this.canvasStyleData = this.item.style
            this.config = this.item.style

            // 开始绑定pop.lang
            console.log('this.config:' + JSON.stringify(this.canvasStyleData))
            // eslint-disable-next-line
            this.poplang = new PopRuntime({})
            let initDXIBRuntimeRet =  this.initDXIBRuntime(this.poplang)
            console.log('call-poplang-initDXIBRuntimeRet:',initDXIBRuntimeRet)
            // window.poplang = this.poplang // 这里设置为全局对象。
            // // 不使用this.canvasStyleDate.poplang（会导致无限重绘，导致堆栈崩溃）
            // const protocolCache = localStorage.getItem('protocol_config')
            // console.log('protocolCache:' + JSON.stringify(protocolCache))

            // if (protocolCache) {
            //     this.poplang.setProtocol(JSON.parse(protocolCache))
            //     this.isok = 'ok'
            // } else {
            //     this.isok = false
            // }
            let This = this
            await this.poplang.runScript(null, this.canvasStyleData.code, true)
            let beforeCreateRet = await this.poplang.op(null, 'beforeCreate')
            console.log('beforeCreateRet:', beforeCreateRet, '$ret:', this.poplang.context.$ret, this.poplang.context)
            
            for (let i = 0; i < this.copyData.length; i++) {
                let item = this.copyData[i]
                try{
                    item.xdata = { ...this.poplang.context.$ret } // Object.assign({}, this.poplang.context.$ret)
                }catch(ex){
                    console.log('poplang-xdata-expand-exception:'+ex,ex)
                    item.xdata = {}
                }
                if (item.poplang) {
                    let initDXIBRuntimeRet =  this.initDXIBRuntime(item.poplang)
                    console.log('item-initDXIBRuntimeRet:',initDXIBRuntimeRet)
                    let opRet = await item.poplang.op(null, 'init')
                    console.log('item.poplang.op-ret:',opRet)
                    // setTimeout(() => {
                    //     item.poplang.runScript(null, item.code)
                    // }, 100)
                }else{
                    setTimeout(async ()=>{
                        console.log('timeout 10ms to run init')
                        if(item.poplang)
                        {
                            let initDXIBRuntimeRet =  This.initDXIBRuntime(item.poplang)
                            console.log('item-initDXIBRuntimeRet:',initDXIBRuntimeRet)

                            let opRet =await item.poplang.op(null, 'init')
                            console.log('item.poplang.op-ret:',opRet)
                        }else{
                            console.log('item.poplang is empty--100ms')
                            setTimeout(async ()=>{
                                console.log('timeout 1s to run init')
                                if(item.poplang)
                                {
                                    let initDXIBRuntimeRet =  This.initDXIBRuntime(item.poplang)
                                    console.log('item-initDXIBRuntimeRet:',initDXIBRuntimeRet)

                                    let opRet =await item.poplang.op(null, 'init')
                                    console.log('item.poplang.op-ret:',opRet)
                                }else{
                                    console.log('item.poplang is empty--1s')
                                }
                            },1000)
                        }
                    },100)
                }
            }
            
            this.poplang.op(null, 'created')
        },
        async queryMiniCardFileInfo(){
            // if(this.fileId)//下载到json文件,然后显示出来
            // {
                let This = this
                let fileId = this.myfileId//this.fileId
                console.log('queryMiniCardFileInfo-fileId:',fileId)
                // if(fileId && fileId.indexOf('dtns://')){
                //     let {params} = g_dtnsManager.nslookupIB3ID(fileId)
                //     fileId = params ?  params.filename :null
                // }
                let cachedFileItem = await ifileDb.getDataByKey(fileId) //dtns://协议的文件依然保存在此
                if(!cachedFileItem || !cachedFileItem.data)
                {
                    //不管是谁，均采用此
                    let reqUrl = null
                    if(fileId && fileId.startsWith('dtns://')){
                        reqUrl = fileId
                    }
                    else //使用传统方式进行
                    {
                        reqUrl = 'dtns://web3:'+rpc_client.roomid+'/file?filename='+fileId
                        // let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:fileId,file_kind:'file'}
                        // rpc_client.download(params,async function(data){
                        //     console.log('rpc_client.download-file-data:',data.data,data.data.buffer)
                        //     if(data && data.data){
                        //         This.item = JSON.parse(new TextDecoder().decode(data.data))
                        //         This.callPoplang()
                        //         ifileDb.addData({key:fileId,data:{filename:data.fileInfo.filename,filedata:data.data ,fileInfo:data.fileInfo}})//添加到缓存
                        //     }else{
                        //     console.log('download-mini-card-file-failed:',fileId)
                        //     This.loadingText = '[Error]download-mini-card-file-failed:'+fileId
                        //     // This.$toast.fail('下载失败')
                        //     }
                        // })
                    }
                    let data = await g_dtnsManager.run(reqUrl,{})
                    if(data && data.data){
                        This.item = JSON.parse(new TextDecoder().decode(data.data))
                        This.callPoplang()
                        ifileDb.addData({key:fileId,data:{filename:data.fileInfo.filename,filedata:data.data ,fileInfo:data.fileInfo}})//添加到缓存
                    }else{
                        console.log('download-mini-card-[dfile]-failed:',this.myfileId)
                        // This.loadingText = '[Error]download-mini-card-[dfile]-failed:'+fileId
                        this.loadingText = '[Notice]PopComponent-data-item-file load failed!（fileId:'+this.myfileId+'）, maybe need'
                        + (this.myfileId&& this.myfileId.startsWith('dtns://') ? ' switchIB3 now !':' download network-data , try refresh again! ')
                    }
                }
                else{
                    this.item = JSON.parse(new TextDecoder().decode(cachedFileItem.data.filedata))
                    This.callPoplang()
                }
            // }
        }
    },
}
</script>

<style lang="scss" scoped>
.component {
    position: absolute;
}
</style>
