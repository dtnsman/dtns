<template>
    <div style="width: 100%;height: 100%;overflow-y: scroll;overflow-x: hidden;">
        <x3dPlayer v-if="xtype=='xverse'" ref="xverse" :key="'xverse'+mykey" style="width: 100%;height: 100%;"></x3dPlayer>
        <xcardViewer v-if="xtype=='minicard' || xtype=='xcard'" ref="xcard" :key="'xcard'+mykey"  style="width: 100%;height: 100%;"></xcardViewer>
        <videoViewer v-if="xtype=='video'" ref="video" :key="'video'+mykey" style="width: 100%;height: 100%;"></videoViewer> 
        <imageViewer v-if="xtype=='image'" ref="image" :key="'image'+mykey" style="width: 100%;height: 100%;"></imageViewer> 
        <pdfViewer v-if="xtype=='pdf'" ref="pdf" :key="'pdf'+mykey"  style="width: 100%;height: 100%;"></pdfViewer>
        <mdViewer v-if="xtype=='md'" ref="md" :key="'md'+mykey" style="width: 100%;height: 100%;"></mdViewer> 
        <textViewer v-if="xtype=='text'" ref="text" :key="'text'+mykey" style="width: 100%;height: 100%;"></textViewer> 
        <xformViewer v-if="xtype=='xform'" ref="xform" :key="'xform'+mykey" style="width: 100%;height: 100%;"></xformViewer> 
        <xdocViewer v-if="xtype=='xdoc'" ref="xdoc" :key="'xdoc'+mykey" style="width: 100%;height: 100%;"></xdocViewer> 
        <fabricViewer v-if="xtype=='fabric'" ref="fabric" :key="'fabric'+mykey" style="width: 100%;height: 100%;"></fabricViewer> 
        <docxViewer v-if="xtype=='docx'" ref="docx" :key="'docx'+mykey" style="width: 100%;height: 100%;"></docxViewer> 
        <excelViewer v-if="xtype=='excel'" ref="excel" :key="'excel'+mykey" style="width: 100%;height: 100%;"></excelViewer> 
        <pptxViewer v-if="xtype=='pptx'" ref="pptx" :key="'pptx'+mykey" style="width: 100%;height: 100%;"></pptxViewer> 
        <xcadViewer v-if="xtype=='xcad'" ref="xcad" :key="'xcad'+mykey" style="width: 100%;height: 100%;"></xcadViewer> 
        <designViewer v-if="xtype=='xpaint'" ref="xpaint" :key="'xpaint'+mykey" style="width: 100%;height: 100%;"></designViewer> 
        <xdrawViewer v-if="xtype=='xdraw'" ref="xdraw" :key="'xdraw'+mykey" style="width: 100%;height: 100%;"></xdrawViewer> 
        <LocationMarker v-if="xtype=='amap.location'" ref="amap" :key="'amap'+mykey" style="width: 100%;height: 100%;"></LocationMarker> 
        <httpViewer v-if="xtype=='link'" ref="link" :key="'link'+mykey" style="width: 100%;height: 100%;"></httpViewer> 
        <div v-if="show_vtips" style="position:fixed;height: auto;bottom:20px;left:0;right:0;width: 100%;z-index: 299;">
            <!-- <x-msg-viewer :item="vtips" :show_xmsg="false" style="width:100%"></x-msg-viewer> -->
            <PopComponent style="width:100%;" :xitem="vtips" :dxib="dxib" :fileId="fileId" :zoom="1" :fullWidth="fullWidth">
            </PopComponent>
        </div>
    </div>
</template>
<script>
import x3dPlayer from './x3dPlayer.vue'
import xcardViewer from './xcardViewer.vue'
import videoViewer from './videoViewer.vue'
import imageViewer from './imageViewer.vue'
import pdfViewer from './pdfViewer.vue'
import mdViewer from './mdViewer.vue'
import textViewer from './textViewer.vue'
import xformViewer from './xformViewer.vue'
import xdocViewer from './xdocViewer.vue'
import fabricViewer from './fabricViewer.vue'
import docxViewer from './docxViewer.vue'
import excelViewer from './excelViewer.vue'
import pptxViewer from './pptxViewer.vue'
import xcadViewer from './xcadViewer.vue'
import designViewer from './designViewer.vue'
import xdrawViewer from './xdrawViewer.vue'
import LocationMarker from './LocationMarker.vue'
import httpViewer from './httpViewer.vue'
import PopComponent from '@/components/Item/PopComponent'

export default {
    name:'dxib',
    components: {
        x3dPlayer,
        xcardViewer,
        videoViewer,
        imageViewer,
        pdfViewer,
        mdViewer,
        textViewer,
        xformViewer,
        xdocViewer,
        fabricViewer,
        docxViewer,
        excelViewer,
        pptxViewer,
        xcadViewer,
        designViewer,
        xdrawViewer,
        LocationMarker,
        httpViewer,
        PopComponent
    },
    data() {
      return {
        isLoading: true,
        title:'',
        xitem:null,
        vtips:null,//videoTipsJson,
        show_vtips:false,
        dxib:null,
        poplangs: [],
        dxibManager:null,
        xtype:null,
        mykey:Date.now()+'-'+Math.random(),
        fileId:null,
      }
    },
    watch: {
      showAllPages() {
        this.page = this.showAllPages ? null : 1
      }
    },
    beforeRouteLeave(to,from,next){
      console.log('into beforeRouteLeave')

      this.exit()
      
      next();
    },
    async created(){
        // this.isLoading = false
        // this.title='dxibViewer'
        console.log('into dxibViewer created()')
        this.p_xmsgid = localStorage.getItem('p_xmsgid')
        this.updateActionInfo()
    },
    activated(){
        console.log('into dxibViewer activated()')
        this.p_xmsgid = localStorage.getItem('p_xmsgid')
        this.updateActionInfo()
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
      exit()
      {
        if(this.dxibManager)
        {
          this.dxibManager.exit()//保存saveState，方便下次打开时继续保持history和now_pos等
          this.dxibManager = null
          this.dxib = null
          console.log('dxibViewer call dxibManager.exit()')
        }
      },
      initDXIBRuntime(poplang)
      {
        console.log('videoViewer.vue-initDXIBRuntime:',poplang,this.dxibManager,this.dxib)
        if(!this.dxibManager) return false
        let ret = this.dxibManager.initDXIBRuntime(poplang,this.dxib)
        if(this.poplangs.indexOf(poplang)<0)
        {
          this.poplangs.push(poplang)
        }
        console.log('initDXIBRuntime-poplangs:',this.poplangs)
        return ret
      },
      async showVTIPS(vtipsJson)
      {
        console.log('into showVTIPS() now')
        //关闭
        if(!vtipsJson) 
        {
          this.vtips = null
          this.show_vtips = false
          return true
        }
        this.vtips  = null
        this.show_vtips =false
        //打开
        this.vtips = vtipsJson
        setTimeout(()=>this.show_vtips = true,5)//延迟打开
        return true
      },
      async updateActionInfo(forceUpdate = false)
      {
        console.log('into updateActionInfo')
        if(window.g_now_action_info)
        {
          this.actionInfo = window.g_now_action_info.actionInfo
          this.dxibManager = window.g_now_action_info.context
          this.dxibManager.setDXIBViewerUpdateFunc(this.updateActionInfo,this)

          let switchDXIBFlag = window.g_now_action_info.context.getDXIBObj().dxib_url!=localStorage.getItem('dxib-now-url') //!this.dxibManager ? false : (this.dxibManager.getDXIBObj().dxib_url != window.g_now_action_info.context.getDXIBObj().dxib_url)
          console.log('dxibViewer-switchDXIBFlag:',switchDXIBFlag,localStorage.getItem('dxib-now-url'),window.g_now_action_info.context.getDXIBObj().dxib_url)
          //切换---删除掉旧的缓存
          if(switchDXIBFlag || forceUpdate)
          {
            this.mykey = Date.now()+'-'+Math.random()
            // if(this.$refs.xverse) this.$refs.xverse.exit()
            // if(this.$refs.xcard) this.$refs.xcard.exit()
            // if(this.$refs.video) this.$refs.video.exit()

            //仅在切换时显示（不切换时默认保持）
            if(!forceUpdate){
                this.dxib = {initDXIBRuntime:this.initDXIBRuntime,actionInfo:this.actionInfo,context:this.dxibManager,viewThis:this}
                //先不显示vtips
                this.vtips = null
                this.show_vtips = false
                this.poplangs = []
                this.toolbarActionW =  this.dxibManager.playAction('@toolbar',false)//仅指定显示@toolbar
                console.log('dxibViewer-toolbarActionW:',this.toolbarActionW)
                if(this.toolbarActionW)
                try{
                    
                    console.log('toolbarActionW:',this.toolbarActionW)
                    this.toolbarFileData =await this.dxibManager.loadActionResFile(this.toolbarActionW.actionInfo)//得到mini-card-info的文件数据
                    let utf8decoder = new TextDecoder()
                    let text =  utf8decoder.decode(this.toolbarFileData)
                    this.vtips = JSON.parse(text)
                    this.show_vtips = true//默认显示出来
                    console.log('load-toolbar-vtips:',this.vtips)
                }catch(ex)
                {
                    console.log('parse-toolbar-vtips-json-failed-exception:'+ex,ex)
                }
            }
          }//end the switchDXIBFlag
          localStorage.setItem('dxib-now-url',this.dxibManager.getDXIBObj().dxib_url)

          if(this.p_xmsgid)
          {
            localStorage.setItem('p_xmsgid',this.p_xmsgid)
          }
          this.xtype = this.actionInfo.xtype
          console.log('g_now_action_info:',this.actionInfo,this.dxibManager,this.actionInfo.ended)
        }
        else{
          this.$toast('无法打开dxib页面，参数g_action_info为空！')
        }
      },
    }
  }
  </script>
<style>
</style>
  
