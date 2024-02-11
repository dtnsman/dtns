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
      </label>
    </div>
  
    <div class="app-content" style="position: fixed;top:53px;bottom: 0px;left: 0;right: 0">
        <iframe ref="xcadIF" :src="url" style="width: 100%;height: 100%;" allow='microphone;camera;midi;encrypted-media;'></iframe>
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
        title:'xcad编辑器',
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
      console.log('into xcadViewer beforeRouteLeave')
      this.exit()
      next();
    },
    async created(){
      if(typeof window.g_xcad_onPopCreatorMessage == 'function')
      {
        window.removeEventListener('message',g_xcad_onPopCreatorMessage)
      }
      window.g_xcad_onPopCreatorMessage = this.onPopCreatorMessage
      window.addEventListener('message',this.onPopCreatorMessage, false);

      this.updateActionInfo()
    },
    async mounted(){
        console.log('xcadViewer is mounted now!')
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
          console.log('xcadViewer call dxibManager.exit()')
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
          // this.src = this.filedata
          let utf8decoder = new TextDecoder()
          let text =  utf8decoder.decode(this.filedata)
          localStorage.setItem('jscad:script',text)
          localStorage.setItem('xcad-url',this.actionInfo.url)
          this.isLoading = false
        }
        else{
          this.isLoading = false
        }
        this.url = 'static/js/creator.xcad/demo.html'
      },
      async onPopCreatorMessage(e){//目标，保存来自pop-creator的数据，并保存为文件，然后进入minicard-poster页面进行上传
        console.log('xcadViewer.vue recv-message:',e.data,e)
        try{
          await this.processMessage(e)
        }catch(ex){
          console.log('onPopCreatorMessage-exception:'+ex,ex)
        }
        
      },
      async processMessage(e)
      {
        if(!this.url) {
            console.log('this xcadViewer.vue is closed')
            return 
        }
        let This = this
        let msgObj= null
        try{
          msgObj = JSON.parse(e.data)
        }catch(ex){
          console.log('xcadViewer.vue-onPopCreatorMessage-exception:'+ex,ex)
        }
        //进入的是3dEditor的处理浏览
        if(msgObj && msgObj.xtype=='dtns.xcad.creator2xcad')
        {
            let jsonItem = await ifileDb.getDataByKey('from.dtns.xcad.creator.data')
            //data:{path,blob,script,videoBlob}
            //   let webpItem = await ifileDb.getDataByKey('from.dtns.3d.creator.img')
            if(!jsonItem || !jsonItem.data)
            {
                return this.$toast('xcad.creator：发送头榜不能为空数据！')
            }
            //上传，推送至头榜
            let filename = '在线xcad文档'+Date.now()+'.xcad.js'
            const encoder = new TextEncoder();
            let u8arr = encoder.encode(jsonItem.data.script)
            // if(!confirm('确定上传xcad文件吗？大小为：'+(Math.round(u8arr.byteLength*1.0/1024/1024,2)+'MB')))
            // {
            //   return ;
            // }
            this.lastUploadTime = Date.now()
            let file = new File([u8arr], filename, {type: 'text/javscript'});

            let data = {file}
            let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:filename,
                mimetype:data.file.type,filename,path:'file-path',
                size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
                file_kind:'file',random:Math.random(),data:data.file}

            console.log('xcad-json-File:',data.file)
            if(this.is_xcad_locked) return console.log('this.is_xcad_locked is true')
            this.is_xcad_locked = true
            let res = await new Promise((resolve)=>{
                rpc_client.sendFile(fileInfo,function(udata){
                    console.log('sendFile-callback-data:'+JSON.stringify(udata))
                    if(udata && udata.data) resolve(udata.data)
                    else resolve(null)
                })
            })

            console.log('send-xcad-file-res:',res)
            this.is_xcad_locked = false
            if(!res || !res.ret){
                return this.$toast.fail('上传xcad文档失败' +(res ?res.msg:'未知网络错误'),3000)
            }
            fileInfo.url = res.filename //主要是粘贴这个file-id（即url）
        
            window.g_folder_copy_data = {url:res.filename} //用于dfolder文件夹粘贴

            let webm_url = null
            let webm_filename = 'xcad-'+Date.now()+'.xcad.webm'
            if(jsonItem && jsonItem.data && jsonItem.data.videoBlob && jsonItem.data.videoBlob.size>100)
            {
                // let base64 = jsonItem.data.base64 
                // let u8arr = rpc_client.dataURLtoBinary(base64.substring('data:image/webp;base64,'.length,base64.length))
                let file = jsonItem.data.videoBlob //new File([u8arr],img_filename , {type: 'image/webp'});

                let data = {file}
                let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:webm_filename,
                mimetype:data.file.type,filename:webm_filename,path:'file-path',
                size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
                file_kind:'file',random:Math.random(),data:data.file}

                console.log('xcadViewer-webm-File:',file)
                let res = await new Promise((resolve)=>{
                    rpc_client.sendFile(fileInfo,function(udata){
                        console.log('sendFile-callback-data:'+JSON.stringify(udata))
                        if(udata && udata.data) resolve(udata.data)
                        else resolve(null)
                    })
                })
                console.log('xcadViewer-webm-send-res:',res)
                webm_url = res && res.ret ? res.filename : null
            }

            let obj_url = null
            let obj_filename = 'xcad-'+Date.now()+jsonItem.data.path
            obj_filename = obj_filename.replace('/','').replace('\\','')
            if(jsonItem && jsonItem.data && jsonItem.data.blob && jsonItem.data.blob.size>100)
            {
                // let base64 = jsonItem.data.base64 
                // let u8arr = rpc_client.dataURLtoBinary(base64.substring('data:image/webp;base64,'.length,base64.length))
                let file = jsonItem.data.blob //new File([u8arr],img_filename , {type: 'image/webp'});

                let data = {file}
                let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:obj_filename,
                mimetype:data.file.type,filename:obj_filename,path:'file-path',
                size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
                file_kind:'file',random:Math.random(),data:data.file}

                console.log('xcadViewer-obj-File:',file)
                let res = await new Promise((resolve)=>{
                    rpc_client.sendFile(fileInfo,function(udata){
                        console.log('sendFile-callback-data:'+JSON.stringify(udata))
                        if(udata && udata.data) resolve(udata.data)
                        else resolve(null)
                    })
                })
                console.log('xcadViewer-obj-send-res:',res)
                obj_url = res && res.ret ? res.filename : null
            }

            window.g_folder_copy_data = fileInfo //用于dfolder文件夹粘贴
            let xvalue = {
                "xtype":"normal",
                "xmsg": "我分享的xcad文档",
                "files": [
                    {
                    "type": "file",
                    "name": webm_filename,
                    "status": "done",
                    "uid": "vc-upload-'"+Date.now()+"'-6",
                    "url": webm_url,
                    "dtns_url":"dtns://web3:"+rpc_client.roomid+'/file?filename='+webm_url
                    },
                    {
                    "type": "file",
                    "name": obj_filename,
                    "status": "done",
                    "uid": "vc-upload-'"+Date.now()+"'-6",
                    "url": obj_url,
                    "dtns_url":"dtns://web3:"+rpc_client.roomid+'/file?filename='+obj_url
                    },
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

            let img_url = null
            let img_filename = 'xcad-'+Date.now()+'.webp'
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

                console.log('xcadViewer-webp-File:',file)
                let res = await new Promise((resolve)=>{
                rpc_client.sendImage(fileInfo,function(udata){
                    console.log('xcadViewer-sendImg-callback-data:'+JSON.stringify(udata))
                    if(udata && udata.data) resolve(udata.data)
                    else resolve(null)
                })
                })
                console.log('xcadViewer-webp-send-res:',res)
                img_url = res && res.ret ? res.filename : null
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
          console.log('xcad-onPopCreatorMessage-error-xtype:',msgObj?msgObj.xtype:'null',msgObj)
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
          if(!localStorage.getItem('xcad-url')) return this.$toast('无法复制文件，该文件URL为空！')
          window.g_folder_copy_data = {url:localStorage.getItem('xcad-url')}
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
          let fileItem = await window.ifileDb.getDataByKey(localStorage.getItem('xcad-url'));
          if(!fileItem || !fileItem.data || !fileItem.data.filedata)
          {
            this.$toast('无法获得文件内容！')
            return 
          }
          rpc_client.downloadFileByBinary('xcad-'+Date.now()+'.xcad.js',fileItem.data.filedata)
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