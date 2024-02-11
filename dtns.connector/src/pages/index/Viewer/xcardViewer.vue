<template>
    <div>
      <div class="app-header">
        <span @click="back"> ❮返回 </span> &nbsp;
        <template v-if="isLoading"> Loading... </template>
        <template v-else>
          <span>{{ title }}</span>
          <label class="right">
            <DXIBOPBanner v-if="this.dxib" :dxib="dxib" style="width: 150px;height: auto;"></DXIBOPBanner>
            <span @click="copyFile">复制</span>&nbsp; &nbsp;
            <span @click="download">下载</span>
            </label>
        </template>
      </div>
      <div v-if="xitem" class="app-content" style="width:100%;float:left; margin-top:0px;position:relative;">
          <PopComponent style="width:100%;" :xitem="xitem" :dxib="dxib" :zoom="1" :fullWidth="fullWidth">
          </PopComponent>
      </div>
      <div v-if="show_vtips" style="position:fixed;height: auto;top:45%;left:0;right:0;width: 100%;z-index: 199;">
        <!-- <x-msg-viewer :item="vtips" :show_xmsg="false" style="width:100%"></x-msg-viewer> -->
        <PopComponent style="width:100%;" :xitem="vtips" :dxib="dxib" :fileId="fileId" :zoom="1" :fullWidth="fullWidth">
        </PopComponent>
      </div>
    </div>
  </template>
  
  <script>
  import PopComponent from '@/components/Item/PopComponent'
  import DXIBOPBanner from '../../../components/item/DXIBOPBanner.vue'
  export default {
    name:'xcardViewer',
    components: {
      PopComponent,
      DXIBOPBanner
    },
    data() {
      return {
        isLoading: true,
        showAllPages: true,
        title:'',
        xitem:null,
        vtips:null,//videoTipsJson,
        fullWidth:window.innerWidth,
        fileId:'',
        show_vtips:false,
        dxib:null,
        poplangs: [],
        dxibManager:null,
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
        this.isLoading = false
        this.title='xcardViewer'
        //重新获得全屏宽度，以便zoom计算MsgItem的宽度缩放比
        let This = this
        this.onresize = () => {
          return (() => {
            window.fullWidth = document.documentElement.clientWidth;
            This.fullWidth = fullWidth
            console.log('window.fullWidth:'+fullWidth)
            console.log('this.isFull:'+This.isFull)
          })();
        };
        this.onresize()
        window.addEventListener('resize',this.onresize,true)

        this.updateActionInfo()

        // let userInfoJsonStr = JSON.stringify(popUserInfoJson)
        // userInfoJsonStr = userInfoJsonStr.replace('$user_id',localStorage.user_id)
        // this.xitem = JSON.parse(userInfoJsonStr)
    },
    methods: {
        back(){
          // if(this.dxib)
          // {
          //   this.$router.push('/index')
          //   return 
          // }
            this.$router.go(-1)
        },
        exit()
        {
          if(this.dxibManager)
          {
            this.dxibManager.exit()//保存saveState，方便下次打开时继续保持history和now_pos等
            this.dxibManager = null
            this.dxib = null
            console.log('xcardViewer call dxibManager.exit()')
          }
        },
        initDXIBRuntime(poplang)
      {
        console.log('xcard.vue-initDXIBRuntime:',poplang,this.dxibManager,this.dxib)
        if(!this.dxibManager) return false
        let ret = this.dxibManager.initDXIBRuntime(poplang,this.dxib)
        if(this.poplangs.indexOf(poplang)<0)
        {
          this.poplangs.push(poplang)
        }
        console.log('initDXIBRuntime-poplangs:',this.poplangs)
        return ret
      },
      //支持多重显示（关闭旧的显示新的）
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
      async updateActionInfo()
      {
        console.log('into updateActionInfo')
        if(window.g_now_action_info)
        {
          this.actionInfo = window.g_now_action_info.actionInfo
          this.dxibManager = window.g_now_action_info.context
          //更新之下,不用修改dxib的指向
          this.dxib = this.dxib?this.dxib: {initDXIBRuntime:this.initDXIBRuntime,actionInfo:this.actionInfo,context:this.dxibManager,viewThis:this}
          this.dxib.actionInfo = this.actionInfo
          // window.g_now_action_info = null

          console.log('g_now_action_info:',this.actionInfo,this.dxibManager,this.actionInfo.ended)
        
          this.xitem  = null
          this.fileData= null
          try{
            this.fileData =await this.dxibManager.loadActionResFile(this.actionInfo)//得到mini-card-info的文件数据
            let utf8decoder = new TextDecoder()
            let text =  utf8decoder.decode(this.fileData)
            this.xitem = JSON.parse(text)
            console.log('xcardView.vue-loadActionResFile-fileData:',fileData,text,this.xitem)
          }catch(ex)
          {
            console.log('parse-actionInfo-fileData-exception:'+ex,ex)
          }

          //先不显示vtips
          this.vtips = null
          this.show_vtips = false
          this.endedVTIPS = null //避免被上一个初步的endedVTIPS-json干扰
          this.poplangs = []
          if(this.actionInfo.ended)
          try{
            this.ended =  this.dxibManager.playAction(this.actionInfo.ended)
            console.log('ended-actionInfo:',this.ended)
            this.endedFileData =await this.dxibManager.loadActionResFile(this.ended.actionInfo)//得到mini-card-info的文件数据
            let utf8decoder = new TextDecoder()
            let text =  utf8decoder.decode(this.endedFileData)
            this.vtips = JSON.parse(text)
            this.endedVTIPS = this.vtips
            console.log('load-xcard-ended-vtips:',this.vtips)
          }catch(ex)
          {
            console.log('get-ended-vtips-json-failed-exception:'+ex,ex)
          }

          this.isLoading = false
          this.dxibName = !this.dxibManager.getDXIBObj() ?  'dxib视频播放': this.dxibManager.getDXIBObj().xmsg ? this.dxibManager.getDXIBObj().xmsg : this.dxibManager.getDXIBObj().name
          this.title = this.actionInfo.xmsg ? this.actionInfo.xmsg : this.dxibName +'-'+ this.actionInfo.name //this.dxibManager.getDXIBObj() ?this.dxibManager.getDXIBObj().xmsg: 'dxib视频播放'
        }
        else{
          this.$toast('无法打开xcard页面，参数g_action_info为空！')
        }
      },
      copyFile()
      {
        if(this.dxibManager)
        {
          let dxibObj = this.dxibManager.getDXIBObj()
          if(!dxibObj || !dxibObj.dxib_url) return this.$toast('无法复制文件，dxib对象为空或资源链接为空！！')
          window.g_folder_copy_data = {url:dxibObj.dxib_url}
          this.$toast('复制成功，请切换到文件夹目录粘贴！')
        }else{
          // if(!localStorage.getItem('video-filename')) return this.$toast('无法复制文件，该文件URL为空！')
          // window.g_folder_copy_data = {url:localStorage.getItem('video-filename')}
          this.$toast('无法复制文件，文件源为空！')
        }
      },
      download(){
        if(this.dxibManager)
        {
          // let dxibObj = this.dxibManager.getDXIBObj()
          let fileData = this.dxibManager.getDXIBFileData()
          if(!fileData) return this.$toast('无法下载文件，dxib对象为空或资源文件为空！！')
          rpc_client.downloadFileByBinary(this.title+'.dxib',fileData)
        }
        else
          rpc_client.downloadFileByBinary(this.title,this.filedata)
      },
      rotationAdd()
      {
        this.rotation += 90
      },
      rotationSub()
      {
        if(this.rotation>=90)
            this.rotation -= 90
        else
            this.rotation = 0
      },
      scaleAdd()
      {
        this.scale++
      },
      scaleSub(){
        if(this.scale>=2) this.scale -- 
        else this.scale =1
      },
      
      handleDocumentRender(args) {
        console.log(args)
        this.isLoading = false
        this.pageCount = this.$refs.pdfRef.pageCount
      },
      handlePasswordRequest(callback, retry) {
        callback(prompt(retry ? 'Enter password again' : 'Enter password'))
      }
    }
  }
  </script>
  <style>
body {
  margin: 0;
  padding: 0;
  background-color: #ccc;
}

.vue-pdf-embed > div {
  margin-bottom: 8px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
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
  display: flex;
}
</style>
  