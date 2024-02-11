<template>
    <div>
    <div class="app-header">
      <span @click="back"> ❮返回 </span> &nbsp;
      <template v-if="isLoading"> Loading... </template>
      <template v-else><span>{{ title }}</span>
        <label class="right">
          <DXIBOPBanner v-if="this.dxib" :dxib="dxib" style="width: 150px;height: auto;"></DXIBOPBanner>
          <!-- <span @click="refresh">刷新</span>
          <span @click="newWin">新窗口</span> -->
          <DXIBOPBanner v-if="this.dxib" :dxib="dxib" style="width: 150px;height: auto;"></DXIBOPBanner>
          <span @click="copyFile">复制</span>
          <span @click="download">下载</span>
        </label>
      </template>
    </div>
  
    <div class="app-content">
        <!-- <div :id="divID"></div> -->
        <iframe id="iframe" :src="src" width="100%" :height="ih"></iframe>
    </div>
    </div>
  </template>
  
  <script>
  import DXIBOPBanner from '../../../components/item/DXIBOPBanner.vue'
  export default {
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
        title:null,
        divID:'pptxDIV'+Date.now()
        ,ih:960,
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
    beforeRouteLeave(to,from,next){
      console.log('into designViewer beforeRouteLeave')
      this.exit()
      next();
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

        if(typeof window.g_design_onPopCreatorMessage == 'function')
        {
          window.removeEventListener('message',g_design_onPopCreatorMessage)
        }
        window.g_design_onPopCreatorMessage = this.onXPaintMessage
        window.addEventListener('message',this.onXPaintMessage, false);

        this.updateActionInfo()
        
        // this.isLoading = false
        // this.refresh()

        // this.isLoading = false
    },
    beforeRouteLeave(to,from,next){
      window.removeEventListener('message',this.onXPaintMessage)
      this.is_leaved = true
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
          console.log('designViewer call dxibManager.exit()')
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
          if(!localStorage.getItem('xpaint-filename')) return this.$toast('无法复制文件，该文件URL为空！')
          window.g_folder_copy_data = {url:localStorage.getItem('xpaint-filename')}
          this.$toast('复制成功，请切换到文件夹目录粘贴！')
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
        else
        {
          let fileItem = await window.ifileDb.getDataByKey('from.dtns.design.json');
          if(!fileItem || !fileItem.data)
          {
            this.$toast('无法获得文件内容！')
            return 
          }
          let encoder = new TextEncoder()
          let uint8Array = encoder.encode(JSON.stringify(fileItem.data))
          rpc_client.downloadFileByBinary('xpaint-'+Date.now()+'.json',uint8Array)
        }
      },
      async onXPaintMessage(e){//目标，保存来自pop-creator的数据，并保存为文件，然后进入minicard-poster页面进行上传
        if(this.is_leaved ) return 
        console.log('designViewer.vue recv-message:',e.data,e)
        let msgObj= null
        try{
          msgObj = JSON.parse(e.data)
        }catch(ex){
          console.log('3dViewer.vue-onPopCreatorMessage-exception:'+ex,ex)
        }
        //进入的是minicard的处理浏览
        if(msgObj && msgObj.xtype=='dtns.design2xpaint')
        {
          let jsonItem = await ifileDb.getDataByKey('from.dtns.design.json')
          let webpItem = await ifileDb.getDataByKey('from.dtns.design.webp')
          if(!jsonItem || !jsonItem.data)
          {
            return this.$toast('发送头榜不能为空数据！')
          }

          let zip = new JSZip();
          let filename ='xverse-'+Date.now()+'.xpaint.zip'
          zip.file('xpaint-'+Date.now()+'.xpaint.json',JSON.stringify(jsonItem.data))
          let zipFileBlob = await zip.generateAsync({type:"blob",compression: "DEFLATE", 
              compressionOptions: {
                 level: 1 
              }})
          console.log('xpaint-sendXMSG->zipFileBlob:',zipFileBlob)
          // var myUrl = URL.createObjectURL(zipFileBlob)
          // rpc_client.downloadFile(myUrl,'xpaint-'+Date.now()+'.zip')

          // const encoder = new TextEncoder();
          // let u8arr = encoder.encode(JSON.stringify(jsonItem.data))
          // var file = new File([u8arr], 'xpaint-'+Date.now()+'.json', {type: 'application/json'});
          let data = {file:zipFileBlob}
          let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:filename,
            mimetype:data.file.type,filename,path:'file-path',
            size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
            file_kind:'file',random:Math.random(),data:data.file}

          console.log('designViewer-xpaint-File:',data.file)

          let res = await new Promise((resolve)=>{
            rpc_client.sendFile(fileInfo,function(udata){
                console.log('sendFile-callback-data:'+JSON.stringify(udata))
                if(udata && udata.data) resolve(udata.data)
                else resolve(null)
            })
          })

          console.log('send-xpaint-file-res:',res)
          if(!res || !res.ret){
            return this.$toast.fail('上传源码文件失败' +(res ?res.msg:'未知网络错误'),3000)
          }

          let img_url = null
          if(webpItem && webpItem.data && webpItem.data.length>100)
          {
            let u8arr = rpc_client.dataURLtoBinary(webpItem.data.substring('data:image/webp;base64,'.length,webpItem.data.length))
            let file = new File([u8arr], 'xpaint-'+Date.now()+'.webp', {type: 'image/webp'});
            let data = {file}
            let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:data.file.name,
              mimetype:data.file.type,filename:data.file.name,path:'file-path',
              size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
              img_kind:'open',random:Math.random(),data:data.file,img_q:1}

            console.log('designViewer-xpaint-webp-File:',file)
            let res = await new Promise((resolve)=>{
              rpc_client.sendImage(fileInfo,function(udata){
                  console.log('designViewer-sendImg-callback-data:'+JSON.stringify(udata))
                  if(udata && udata.data) resolve(udata.data)
                  else resolve(null)
              })
            })
            console.log('designViewer-xpaint-webp-send-res:',res)
            img_url = res && res.ret ? res.filename : null
          }
      
          let xvalue = {
              "xtype":"xpaint",
              "xmsg": "我分享的xpaint图像源码",
              //独立的内容位置，不占用图片
              'xpaint_src_url':res.filename,
              'xpaint_src_dtns_url':'dtns://web3:'+rpc_client.roomid+'/file?filename='+res.filename
              // "files": [
              //   {
              //     "type": "file",
              //     "name": file.name,
              //     "status": "done",
              //     "uid": "vc-upload-'"+Date.now()+"'-0",
              //     "url": res.filename
              //   }
              // ]
            }
          if(img_url)
          {
            xvalue = Object.assign({},xvalue,
              {'xpaint_img_url':img_url,
              'xpaint_img_dtns_url':'dtns://web3:'+rpc_client.roomid+'/image/view?filename='+img_url+'&img_kind=open'})
            // xvalue.pics = [
            //       {
            //         "type": "img",
            //         "name": file.name,
            //         "status": "done",
            //         "uid": "vc-upload-"+Date.now()+"-8",
            //         "url": img_url,
            //         "thumbUrl":null
            //       }
            //     ]
          }
          // localStorage.setItem('poster_value',JSON.stringify(xvalue))
          imDb.addData({key:'dweb_poster_init_data',data:xvalue})
          localStorage.setItem('poster_type','xpaint')
          localStorage.setItem('poster_value','xpaint')
          this.$router.push('/poster/xmsg')
        }else{
          console.log('onXPaintMessage-error-xtype:',msgObj ? msgObj.xtype:'null',msgObj)
        }
      },
      async updateActionInfo()
      {
        console.log('into updateActionInfo')
        let This = this
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


          this.dxibName = !this.dxibManager.getDXIBObj() ?  'xpaint设计工具': this.dxibManager.getDXIBObj().xmsg ? this.dxibManager.getDXIBObj().xmsg : this.dxibManager.getDXIBObj().name
          this.title = this.actionInfo.xmsg ? this.actionInfo.xmsg : this.dxibName +'-'+ this.actionInfo.name //this.dxibManager.getDXIBObj() ?this.dxibManager.getDXIBObj().xmsg: 'dxib视频播放'
          //加载json至fileDb的相关字段
          this.filedata= await this.dxibManager.loadActionResFile(this.actionInfo)


          let fileItem = null//'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.url//item.xpaint_src_dtns_url ? item.xpaint_src_dtns_url :item.xpaint_src_url
          try{
              fileItem = JSON.parse(new TextDecoder().decode(this.filedata))
          }catch(ex){
              console.log('json-parse-xpaint-xfile-failed:'+ex,ex)
              return this.$toast('解析xpaint源文件失败！')
          }
          ifileDb.deleteDataByKey('from.dtns.design.json')
          ifileDb.addData({key:'from.dtns.design.json',data:fileItem})
          localStorage.setItem('xpaint-filename',this.actionInfo.url)//以便复制
        }
        else{
          this.title = 'xpaint设计工具'
        }
        this.isLoading = false
        this.src = 'static/miniPaint/index.html'
        // this.url = 'static/js/office-js/vue-office/index.html?docx'
      },
      newWin()
      {
        // if(this.httpInfo && this.httpInfo.news_url)
        {
          window.open(this.src,'_blank')
        }
      },
      refresh(){
        // this.src = ''
        // if(this.httpInfo && this.httpInfo.news_url)
        {
        //   this.title = this.httpInfo.title
          setTimeout(()=> this.src = ''+this.src,100)
        }
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
  float: right;display: flex;
}
.right span{display: flex;margin-left:5px;margin-right: 5px;}
</style>