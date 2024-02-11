<template>
    <div>
    <div class="app-header">
      <span @click="back"> ❮返回 </span> &nbsp;
      <template v-if="isLoading"> Loading... </template>
      <template v-else><span>{{ title }}</span>
        <label class="right">
          <DXIBOPBanner v-if="this.dxib" :dxib="dxib" style="width: 150px;height: auto;"></DXIBOPBanner>
          <span @click="copyFile">复制</span>
          <span @click="download">下载</span>
          <span @click="refresh">刷新</span>
          <span @click="newWin">新窗口</span>
        </label>
      </template>
    </div>
  
    <div class="app-content">
        <!-- <div :id="divID"></div> -->
        <iframe v-if="src" id="iframe" ref="httpIF" :src="src" width="100%" :height="ih-53"></iframe>
    </div>
    </div>
  </template>
  
  <script>
  import DXIBOPBanner from '../../../components/item/DXIBOPBanner.vue'
  export default {
    name:'httpViewer',
    components: {
      DXIBOPBanner
    },
    data() {
      return {
        isLoading: true,
        page: null,
        pageCount: 1,
        src:null,
        httpInfo:null,
        scale:5,
        rotation:0,
       //   'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
        showAllPages: true,
        title:'',
        divID:'pptxDIV'+Date.now()
        ,ih:window.innerHeight,
        vtips:null,//videoTipsJson,
        fullWidth:window.innerWidth,
        fileId:'',
        show_vtips:false,
        dxib:null,
        poplangs: [],
      }
    },
    watch: {
      showAllPages() {
        this.page = this.showAllPages ? null : 1
      }
    },
    async created(){
        let This = this
        this.onresize = () => {
          return (() => {
            window.fullHeight = document.documentElement.clientHeight;
            This.ih = fullHeight
            console.log('window.fullHeight:'+fullHeight)
            console.log('this.ih:'+This.ih)
          })();
        };
        this.onresize()
        window.addEventListener('resize',this.onresize,true)

        this.updateActionInfo()
    },
    mounted(){
      console.log('into /http mounted')
      // this.$refs.httpIF.addEventListener("load", function() {
      //   console.log('stoped httpIF.history')
      //   iframe.contentWindow.history.replaceState(null, null, iframe.src);
      // });
    },
    beforeRouteLeave(to,from,next){
      console.log('into httpViewer beforeRouteLeave')
      this.exit()
      
      next();
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
          console.log('httpViewer call dxibManager.exit()')
        }
      },
      async updateActionInfo()
      {
        console.log('into updateActionInfo')
        let This = this

        try{
            this.httpInfo = JSON.parse(localStorage.getItem('goto-http'))
        }catch(ex){
            console.log('parse-httpInfo-ex:'+ex,ex)
        }

        if(window.g_now_action_info)
        {
            this.actionInfo = window.g_now_action_info.actionInfo
            this.dxibManager = window.g_now_action_info.context
            //更新之下,不用修改dxib的指向
            //initDXIBRuntime:this.initDXIBRuntime
            this.dxib = this.dxib?this.dxib: {actionInfo:this.actionInfo,context:this.dxibManager,viewThis:this}
            this.dxib.actionInfo = this.actionInfo
            // window.g_now_action_info = null

            console.log('g_now_action_info:',this.actionInfo,this.dxibManager,this.actionInfo.ended)
            this.filedata= await this.dxibManager.loadActionResFile(this.actionInfo)
            this.dxibName = !this.dxibManager.getDXIBObj() ?  '查看网址链接': this.dxibManager.getDXIBObj().xmsg ? this.dxibManager.getDXIBObj().xmsg : this.dxibManager.getDXIBObj().name
            this.title = this.actionInfo.xmsg ? this.actionInfo.xmsg : this.dxibName +'-'+ this.actionInfo.name //this.dxibManager.getDXIBObj() ?this.dxibManager.getDXIBObj().xmsg: 'dxib视频播放'
      
            try{
                let utf8decoder = new TextDecoder()
                let text =  utf8decoder.decode(this.filedata)
                let json = JSON.parse(text)
                if(json.xtype == 'news'){
                    console.log('save news-link into localStorage:',json)
                    localStorage.setItem('goto-http',text)
                }
            }catch(ex)
            {
                console.log('locationMarker-parseActionInfo-text-json:exception:'+ex,ex)
            }
        }else{
          this.title= this.httpInfo ? this.httpInfo.title :'查看网址链接'
        }

        this.isLoading = false
        this.refresh()

        this.isLoading = false
      },
      newWin()
      {
        if(this.httpInfo && this.httpInfo.news_url)
        {
          window.open(this.httpInfo.news_url,'_blank')
        }
      },
      refresh(){
        this.src = ''
        if(this.httpInfo && this.httpInfo.news_url)
        {
          // this.title = this.httpInfo.title
          setTimeout(()=> this.src = this.httpInfo.news_url,100)
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
          this.download()
        }
      },
      async download(){
        if(this.dxibManager)
        {
          // let dxibObj = this.dxibManager.getDXIBObj()
          let fileData = this.dxibManager.getDXIBFileData()
          if(!fileData) return this.$toast('无法下载文件，dxib对象为空或资源文件为空！！')
          rpc_client.downloadFileByBinary(this.title+'.dxib',fileData)
        }
        else{
          if(!confirm('确定生成[网址链接]json源文件吗？')) return 
          let item = this.httpInfo// this.share_xmsg

          let filename = '网址链接'+Date.now()+'.link.json'
          const encoder = new TextEncoder();
          let u8arr = encoder.encode(JSON.stringify(item))
          let file = new File([u8arr], filename, {type: 'application/json'});

          let data = {file}
          let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:filename,
              mimetype:data.file.type,filename,path:'file-path',
              size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
              file_kind:'file',random:Math.random(),data:data.file}

          console.log('news-json-File:',data.file)
          let res = await new Promise((resolve)=>{
              rpc_client.sendFile(fileInfo,function(udata){
                  console.log('sendFile-callback-data:'+JSON.stringify(udata))
                  if(udata && udata.data) resolve(udata.data)
                  else resolve(null)
              })
          })

          console.log('send-news-json-file-res:',res)
          if(!res || !res.ret){
              return this.$toast.fail('上传网址链接json源文件失败' +(res ?res.msg:'未知网络错误'),3000)
          }
          window.g_folder_copy_data = {url: res.filename} //主要是粘贴这个file-id（即url）
          rpc_client.downloadFileByBinary(filename,u8arr)
          this.$toast('上传网址链接json源文件成功，你也要复制粘贴至文件夹！')
        }
        // else 
        //   rpc_client.downloadFileByBinary(this.title,this.filedata)
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
      
      rendered() {
        this.isLoading  =false
        console.log("渲染完成")
        this.$toast('渲染完成')
        },
        errorHandler() {
            this.isLoading  =false
            console.log("渲染失败")
            this.$toast('渲染失败')
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
  padding:0px;
}

.right {
  float: right;
}
</style>