<template>
    <div>
    <div class="app-header">
      <span @click="back"> ❮返回 </span> &nbsp;
      <!-- <template v-if="isLoading"> Loading... </template> -->
      <template><span>{{ title }}</span>
      </template>
      <label class="right">
        <DXIBOPBanner v-if="this.dxib" :dxib="dxib" style="width: 150px;height: auto;"></DXIBOPBanner>
        <span @click="copyFile">复制</span>
        <span @click="download">下载</span>
        <span v-if="!recording" @click="startRecordEditor">编辑录制</span>
        <span v-if="!recording" @click="startRecord">录制</span>
        <span v-if="recording" @click="endRecord">结束录制</span>
      </label>
    </div>
  
    <div class="app-content" style="position: fixed;top:53px;bottom: 0px;left: 0;right: 0">
        <iframe ref="xdrawIF" :src="url" style="width: 100%;height: 100%;" allow='microphone;camera;midi;encrypted-media;'></iframe>
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
       //   'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
        title:null,
        ih:window.innerHeight,
        url:null,
        lastUploadTime:0,
        recording:false,
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
      console.log('into xdrawViewer beforeRouteLeave')
      this.exit()
      next();
    },
    async created(){
      if(typeof window.g_xdraw_onPopCreatorMessage == 'function')
      {
        window.removeEventListener('message',g_xdraw_onPopCreatorMessage)
      }
      window.g_xdraw_onPopCreatorMessage = this.onPopCreatorMessage
      window.addEventListener('message',this.onPopCreatorMessage, false);

      this.updateActionInfo()
    },
    async mounted(){
        console.log('xdrawViewer is mounted now!')
    },
    beforeRouteLeave(to,from,next){
      window.removeEventListener('message',this.onPopCreatorMessage)
      this.url = null
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
          console.log('xdrawViewer call dxibManager.exit()')
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
          if(!localStorage.getItem('xdraw-url')) return this.$toast('无法复制文件，该文件URL为空！')
          window.g_folder_copy_data = {url:localStorage.getItem('xdraw-url')}
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
        else{
          let fileItem = await window.ifileDb.getDataByKey('from.dtns.xdraw.creator.json');
          if(!fileItem || !fileItem.data || !fileItem.data.json)
          {
            this.$toast('无法获得xdraw源文件内容！')
            return 
          }
          let encoder = new TextEncoder()
          let uint8Array = encoder.encode(JSON.stringify(fileItem.data.json))
          rpc_client.downloadFileByBinary('xdraw-'+Date.now()+'.xdraw.json',uint8Array)
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


          this.dxibName = !this.dxibManager.getDXIBObj() ?  '查看文档': this.dxibManager.getDXIBObj().xmsg ? this.dxibManager.getDXIBObj().xmsg : this.dxibManager.getDXIBObj().name
          this.title = this.actionInfo.xmsg ? this.actionInfo.xmsg : this.dxibName +'-'+ this.actionInfo.name //this.dxibManager.getDXIBObj() ?this.dxibManager.getDXIBObj().xmsg: 'dxib视频播放'
          //加载json至fileDb的相关字段
          this.filedata= await this.dxibManager.loadActionResFile(this.actionInfo)
          
          //解析数据，得到xdraw的相应配置项
          let utf8decoder = new TextDecoder()
          let text =  utf8decoder.decode(this.filedata)
          let json = JSON.parse(text)
          console.log('xdrawViewer-xdraw.json-text:',text,json,typeof filesDb)
          if(typeof filesDb!='undefined') console.log('filesDb.db:',filesDb.db)

          try{
            localStorage.setItem('excalidraw',JSON.stringify(json.elements))
            let files = json.files
            for(const key in files)
            {
              filesDb.addDataByKey(files[key],key)//添加到indexedDb
              console.log('filesDb.addDataByKey:',key,files[key],filesDb.db)
            }
          }catch(ex)
          {
            console.log('excalidraw-files-exception:'+ex,ex)
            if((''+ex).startsWith('DataError'))
            {
              console.log('[filesDb-Error]do the files-db upgrade failed?',filesDb)
            }
          }
          
          let excalidrawState = localStorage.getItem('excalidraw-state')
          if(excalidrawState)
          {
            try{
              excalidrawState = JSON.parse(excalidrawState)
            }catch(ex)
            {
              excalidrawState = {}
              console.log('set excalidraw-state-failed-exception:'+ex,ex)
            }
          }else excalidrawState = {}
          let newExcalidrawState = Object.assign({},excalidrawState,json.appState ? json.appState :{})
          localStorage.setItem('excalidraw-state',JSON.stringify(newExcalidrawState))
          console.log('newExcalidrawState',newExcalidrawState,'excalidrawState',excalidrawState)

          ifileDb.deleteDataByKey('from.dtns.xdraw.creator.json')
          ifileDb.addData({key:'from.dtns.xdraw.creator.json',data:{base64:null,json:json}})

          localStorage.setItem('xdraw-url',this.actionInfo.url)
        }
        else{
          this.title = 'xdraw手绘文档编辑器'
        }
        this.isLoading = false
        this.url = 'static/js/creator.xdraw/index.html'
      },
      startRecordEditor()
      {
        console.log('startRecordEditor:',this.recording)
        if(this.recording) return 
        this.recording = true
        this.$refs.xdrawIF.contentWindow.postMessage(JSON.stringify({type:'g_xdraw_start_record_editor',params:null}),'*')
      },
      startRecord(){
        console.log('startRecord:',this.recording)
        if(this.recording) return 
        this.recording = true
        this.$refs.xdrawIF.contentWindow.postMessage(JSON.stringify({type:'g_xdraw_start_record',params:null}),'*')
      },
      async endRecord(){
        console.log('endRecord:',this.recording)
        if(!this.recording) return
        this.recording = false
        this.$refs.xdrawIF.contentWindow.postMessage(JSON.stringify({type:'g_xdraw_stop_record',params:null}),'*')
      },
      async onPopCreatorMessage(e){//目标，保存来自pop-creator的数据，并保存为文件，然后进入minicard-poster页面进行上传
        console.log('xdrawViewer.vue recv-message:',e.data,e)
        try{
          await this.processMessage(e)
        }catch(ex){
          console.log('onPopCreatorMessage-exception:'+ex,ex)
        }
        
      },
      async processMessage(e)
      {
        if(!this.url) {
            console.log('this drawViewer.vue is closed')
            return 
        }
        let This = this
        let msgObj= null
        try{
          msgObj = JSON.parse(e.data)
        }catch(ex){
          console.log('xdrawViewer.vue-onPopCreatorMessage-exception:'+ex,ex)
        }
        //进入的是3dEditor的处理浏览
        if(msgObj && msgObj.xtype=='dtns.xdraw.creator2xdraw')
        {
            if(Date.now()  - this.lastUploadTime <=5000)
            {
                this.Toast('请不要短时间内重复上传！')
                return 
            }
            let jsonItem = await ifileDb.getDataByKey('from.dtns.xdraw.creator.json')
            //   let webpItem = await ifileDb.getDataByKey('from.dtns.3d.creator.img')
            if(!jsonItem || !jsonItem.data)
            {
                return this.$toast('doc.creator：发送头榜不能为空数据！')
            }
            //上传，推送至头榜
            let filename = '在线xdraw文档'+Date.now()+'.xdraw.json'
            const encoder = new TextEncoder();
            let u8arr = encoder.encode(JSON.stringify(jsonItem.data.json))
            if(!confirm('确定上传xdraw文件吗？大小为：'+(Math.round(u8arr.byteLength*1.0/1024/1024,2)+'MB')))
            {
              return ;
            }
            this.lastUploadTime = Date.now()
            let file = new File([u8arr], filename, {type: 'application/json'});

            let data = {file}
            let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:filename,
                mimetype:data.file.type,filename,path:'file-path',
                size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
                file_kind:'file',random:Math.random(),data:data.file}

            console.log('xdraw-json-File:',data.file)
            if(this.is_xdraw_locked) return console.log('this.is_xdoc_locked is true')
            this.is_xdraw_locked = true
            let res = await new Promise((resolve)=>{
                rpc_client.sendFile(fileInfo,function(udata){
                    console.log('sendFile-callback-data:'+JSON.stringify(udata))
                    if(udata && udata.data) resolve(udata.data)
                    else resolve(null)
                })
            })

            console.log('send-xdraw-file-res:',res)
            this.is_xdraw_locked = false
            if(!res || !res.ret){
                return this.$toast.fail('上传xdraw文档失败' +(res ?res.msg:'未知网络错误'),3000)
            }
            fileInfo.url = res.filename //主要是粘贴这个file-id（即url）
        
            window.g_folder_copy_data = {url:res.filename} //用于dfolder文件夹粘贴

            let img_url = null
            let img_filename = 'xdraw-'+Date.now()+'.xdraw.webp'
            if(jsonItem && jsonItem.data && jsonItem.data.base64 && jsonItem.data.base64.length>100)
            {
                let base64 = jsonItem.data.base64 
                let u8arr = rpc_client.dataURLtoBinary(base64.substring('data:image/webp;base64,'.length,base64.length))
                let file = new File([u8arr],img_filename , {type: 'image/webp'});
                let data = {file}
                let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:data.file.name,
                mimetype:data.file.type,filename:data.file.name,path:'file-path',
                size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
                img_kind:'open',random:Math.random(),data:data.file,img_q:1}

                console.log('xdrawViewer-webp-File:',file)
                let res = await new Promise((resolve)=>{
                rpc_client.sendImage(fileInfo,function(udata){
                    console.log('xdrawViewer-sendImg-callback-data:'+JSON.stringify(udata))
                    if(udata && udata.data) resolve(udata.data)
                    else resolve(null)
                })
                })
                console.log('xdrawViewer-webp-send-res:',res)
                img_url = res && res.ret ? res.filename : null
            }

            window.g_folder_copy_data = fileInfo //用于dfolder文件夹粘贴
            let xvalue = {
                "xtype":"normal",
                "xmsg": "我分享的xdraw手绘文档",
                "files": [
                    {
                    "type": "file",
                    "name": filename,
                    "status": "done",
                    "uid": "vc-upload-'"+Date.now()+"'-6",
                    "url": res.filename,
                    "dtns_url":"dtns://web3:"+rpc_client.roomid+'/file?filename='+res.filename
                    }
                ]
            }

            if(img_url)
            {
                xvalue.pics = [
                    {
                        url:img_url,
                        name:img_filename,
                        dtns_url:'dtns://web3:'+rpc_client.roomid+'/image/view?filename='+img_url+'&img_kind=open'
                    }
                ]
            }
            //走的是普通的协议（体验更佳）
            imDb.addData({key:'dweb_poster_init_data',data:xvalue})
            localStorage.setItem('poster_type','xmsg')
            localStorage.setItem('poster_value','normal')//类型
            localStorage.setItem('from_label_type','new_xmsg')
            // if(this.now_label_type) localStorage.setItem('from_label_type',this.now_label_type)
            this.$router.push('/poster/xmsg')
        }
        else if(msgObj && msgObj.xtype=='dtns.xdraw.creator2xdraw.record.xmsg')
        {
          let jsonItem = await ifileDb.getDataByKey('from.dtns.xdraw.creator.recorder')
          console.log('xtype:dtns.xdraw.creator2xdraw.record.xmsg',jsonItem)
            //   let webpItem = await ifileDb.getDataByKey('from.dtns.3d.creator.img')
          if(!jsonItem || !jsonItem.data)
          {
              return this.$toast('doc.creator：发送头榜不能为空数据！')
          }
          //上传，推送至头榜
          let filename = '在线xdraw文档-录制的视频'+Date.now()+'.webm'
          let u8arr = jsonItem.data.video_data
          if(!confirm('确定上传xdraw录制视频文件吗？大小为：'+(Math.round(u8arr.byteLength*1.0/1024/1024,2)+'MB')))
          {
            return ;
          }
          this.lastUploadTime = Date.now()
          let file = new File([u8arr], filename, {type: 'video/webm'});

          let data = {file}
          let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:filename,
              mimetype:data.file.type,filename,path:'file-path',
              size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
              file_kind:'file',random:Math.random(),data:data.file}

          console.log('xdraw-record-File:',data.file)
          if(this.is_xdraw_record_locked) return console.log('this.is_xdoc_locked is true')
          this.is_xdraw_record_locked = true
          let res = await new Promise((resolve)=>{
              rpc_client.sendFile(fileInfo,function(udata){
                  console.log('sendFile-callback-data:'+JSON.stringify(udata))
                  if(udata && udata.data) resolve(udata.data)
                  else resolve(null)
              })
          })

          console.log('send-xdraw-record-file-res:',res)
          this.is_xdraw_record_locked = false
          if(!res || !res.ret){
              return this.$toast.fail('上传xdraw的录制视频失败' +(res ?res.msg:'未知网络错误'),3000)
          }
          fileInfo.url = res.filename //主要是粘贴这个file-id（即url）
      
          window.g_folder_copy_data = {url:res.filename} //用于dfolder文件夹粘贴

          let img_url = null
          let img_filename = 'xdraw-'+Date.now()+'.record.webp'
          if(jsonItem && jsonItem.data && jsonItem.data.base64 && jsonItem.data.base64.length>100)
          {
              let base64 = jsonItem.data.base64 
              let u8arr = rpc_client.dataURLtoBinary(base64.substring('data:image/webp;base64,'.length,base64.length))
              let file = new File([u8arr],img_filename , {type: 'image/webp'});
              let data = {file}
              let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:data.file.name,
              mimetype:data.file.type,filename:data.file.name,path:'file-path',
              size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
              img_kind:'open',random:Math.random(),data:data.file,img_q:1}

              console.log('xdrawViewer-webp-File:',file)
              let res = await new Promise((resolve)=>{
              rpc_client.sendImage(fileInfo,function(udata){
                  console.log('xdrawViewer-sendImg-callback-data:'+JSON.stringify(udata))
                  if(udata && udata.data) resolve(udata.data)
                  else resolve(null)
              })
              })
              console.log('xdrawViewer-webp-send-res:',res)
              img_url = res && res.ret ? res.filename : null
          }

          window.g_folder_copy_data = fileInfo //用于dfolder文件夹粘贴
          let xvalue = {
              "xtype":"normal",
              "xmsg": "我分享的xdraw手绘文档-录制的视频",
              "files": [
                  {
                  "type": "file",
                  "name": filename,
                  "status": "done",
                  "uid": "vc-upload-'"+Date.now()+"'-6",
                  "url": res.filename,
                  "dtns_url":"dtns://web3:"+rpc_client.roomid+'/file?filename='+res.filename
                  },
                  {
                  "type": "file",
                  "name": filename+'-xdraw源文件.xdraw.json',
                  "status": "done",
                  "uid": "vc-upload-'"+Date.now()+"'-7",
                  "url": localStorage.getItem('xdraw-url'),
                  "dtns_url":"dtns://web3:"+rpc_client.roomid+'/file?filename='+localStorage.getItem('xdraw-url')
                  }
              ]
          }

          if(img_url)
          {
              xvalue.pics = [
                  {
                      url:img_url,
                      name:img_filename,
                      dtns_url:'dtns://web3:'+rpc_client.roomid+'/image/view?filename='+img_url+'&img_kind=open'
                  }
              ]
          }
          //走的是普通的协议（体验更佳）
          imDb.addData({key:'dweb_poster_init_data',data:xvalue})
          localStorage.setItem('poster_type','xmsg')
          localStorage.setItem('poster_value','normal')//类型
          localStorage.setItem('from_label_type','new_xmsg')
          // if(this.now_label_type) localStorage.setItem('from_label_type',this.now_label_type)
          this.$router.push('/poster/xmsg')
        }
        else{
          console.log('onPopCreatorMessage-error-xtype:',msgObj?msgObj.xtype:'null',msgObj)
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
  <style >
body {
  margin: 0;
  padding: 0;
  background-color: #ccc;
}

/* .vue-pdf-embed > div {
  margin-bottom: 8px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
} */

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
.right button {padding:5px;color: rgb(255, 255, 255); border-radius: 4px; font-size: 13px; height: 28px; background-color: rgb(18, 173, 245); border: none;}
</style>