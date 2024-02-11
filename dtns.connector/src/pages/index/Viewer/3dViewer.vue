<template>
    <div>
    <div class="app-header">
      <span @click="back"> ❮返回 </span> &nbsp;
      <template v-if="isLoading"> Loading... </template>
      <template v-else><span>{{ title }}</span>
      <!-- </template> -->
      <!-- <template v-else> -->
        <!-- <span @click="rotationAdd"> 旋转rolate </span> &nbsp;
        <span @click="scaleAdd"> 放大max </span> &nbsp;
        <span @click="scaleSub"> 缩小min </span> &nbsp;
        <span v-if="showAllPages"> {{ pageCount }} 页page(s) </span>
  
        <span v-else>
          <button :disabled="page <= 1" @click="page--">❮</button>
  
          {{ page }} / {{ pageCount }}
  
          <button :disabled="page >= pageCount" @click="page++">❯</button>
        </span> -->
  
        <!-- <label class="right" @click="download">
          下载文件
        </label> -->
      </template>
    </div>
  
    <div class="app-content">
        <!-- <vue-office-docx :src="src" @rendered="rendered"/> -->
        <!-- <div id="container" ref="docxEle" style="width:100%;height:100%"></div> -->
        <!-- <iframe id="iframe" src="static/js/office-js/docx.html" width="100%" :height="ih"></iframe> -->
        <iframe id="iframe" :src="url" width="100%" :height="ih" allow='microphone;camera;midi;encrypted-media;'></iframe>
    </div>
      <div v-if="showX" style="overflow-x: hidden;overflow-y: scroll; position: fixed;z-index: 100;top:53px;bottom: 0;left:0;right: 0;background-color: white;">
        <button @click="showX=false" style="position: fixed;z-index: 101;top: 55px;right: 8px;">关闭</button>
        <PopComponent style="width:100%;" :xitem="xitem" :zoom="0.95" :fullWidth="fullWidth">
        </PopComponent>
      </div>
    </div>
  </template>
  
  <script>
  import PopComponent from '@/components/Item/PopComponent'
  export default {
    components: {
      PopComponent
    },
    data() {
      return {
        isLoading: true,
        page: null,
        pageCount: 1,
        src:null,
        scale:5,
        rotation:0,
       //   'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
        showAllPages: true,
        title:'',ih:960,
        url:'',
        xPath:this.$route.params.x,
        gameUrl:'static/js/three-js/index.html',
        x3dUrl:'static/js/creator.3d/editor/index.html',
        x3dTestUrl:'static/js/creator.3d/editor/test.html',
        editorUrl:'https://groupbuying.opencom.cn:4450/editor/',
        kformUrl:'static/kform/index.html',
        forkUrl:'static/fork-h5/index.html',
        creatorUrl:'static/js/creator/index.html',
        fullWidth:window.fullWidth,
        xitem:null,
        showX:false,
      }
    },
    watch: {
      showAllPages() {
        this.page = this.showAllPages ? null : 1
      }
    },
    beforeRouteLeave(to,from,next){
      console.log('into 3dViewer beforeRouteLeave')
      this.exit()
      next();
    },
    async created(){
        if(this.xPath=='3d' || this.xPath=='xverse'){
            this.url = this.x3dUrl
            this.title = '3D.creator'
        }
        if(this.xPath=='3dtest'){
            this.url = this.x3dTestUrl
            this.title = '3D.creator.es6.test'
        }
        else if(this.xPath == 'game'){
            this.url = this.gameUrl
            this.title = '3D游戏'
        }else if(this.xPath == '3x'){
            this.url = this.editorUrl
            this.title = '3D编辑器'
        }else if(this.xPath == 'form' || this.xPath == '2x')
        {
            this.url = this.kformUrl
            this.title = '2D编辑器'
        }
        else if(this.xPath == 'fx')
        {
            this.url = this.forkUrl
            this.title = '福刻利市FORKList'
        }
        else if(this.xPath == 'creator')
        {
            this.url = this.creatorUrl
            this.title = 'dtns.creator德塔世界创造引擎'
        }
        // else if(this.xPath == 'ib')
        // {
        //   this.title = 'AI姿式识别'
        // }
        else if(this.xPath == 'pose')
        {
          this.url = 'https://pose.opencom.cn:4451/index.html?model=posenet'
          this.title = 'AI姿式识别'
        }
        else if(this.xPath == 'face')
        {
          this.url = 'https://face.opencom.cn:4451/'
          this.title = 'AI人脸识别'
        }

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

        this.isLoading = false

        if(typeof window.g_x3dviewer_onPopCreatorMessage == 'function')
        {
          window.removeEventListener('message',g_x3dviewer_onPopCreatorMessage)
        }
        window.g_x3dviewer_onPopCreatorMessage = this.onPopCreatorMessage
        window.addEventListener('message',this.onPopCreatorMessage, false);
        

        // let params = {filename:localStorage.getItem('docx-filename')}
        // let cachedFileItem = await ifileDb.getDataByKey(params.filename)
        // console.log('download fast by ifileDb:',cachedFileItem)
        // if(!cachedFileItem ) return this.$toast.fail('查看失败:DOCX文件不存在');
        // // this.src = cachedFileItem.data.filedata
        // this.title = cachedFileItem.data.filename
        // this.isLoading = false

        // docx.renderAsync(this.src,this.$refs.docxEle)
        //     .then((x) => {
        //       console.log("docx: finished",x)
        //       this.isLoading = false
        //     });
    },
    beforeRouteLeave(to,from,next){
      window.removeEventListener('message',this.onPopCreatorMessage)
      this.is_leaved = true
      next();
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
      exit()
      {
        if(true)
        {
          console.log('3dViewer call dxibManager.exit()')
        }
      },
      async onPopCreatorMessage(e){//目标，保存来自pop-creator的数据，并保存为文件，然后进入minicard-poster页面进行上传
        if(this.is_leaved ) return 
        console.log('3dViewer.vue recv-message:',e.data,e)
        try{
          await this.processMessage(e)
        }catch(ex){
          console.log('onPopCreatorMessage-exception:'+ex,ex)
          //避免死锁
          this.is_xverse_locked = false
          this.is_minicard_locked = false
        }
        
      },
      async processMessage(e)
      {
        let This = this
        let msgObj= null
        try{
          msgObj = JSON.parse(e.data)
        }catch(ex){
          console.log('3dViewer.vue-onPopCreatorMessage-exception:'+ex,ex)
        }
        //进入的是minicard的处理浏览
        if(msgObj && msgObj.xtype=='pop.creator2minicard')
        {
          let data = localStorage.getItem('canvasData')
          let style= localStorage.getItem('canvasStyle')
          if(!data || !style) return this.$toast('[failed]收到pop.creator的minicard轻应用数据不完整！')
          let fileItem = null
          try{
            fileItem = {style:JSON.parse(style),data:JSON.parse(data)}
          }catch(ex){
            console.log('parse-mini-card-fileItem-exception:'+ex,ex)
            return this.$toast('[error]收到pop.creator的minicard轻应用数据不完整！')
          }

          //保存为文件
          let str_data = JSON.stringify(fileItem)
          let filename ='minicard-'+Date.now()+'.pop.zip'
          let zip = new JSZip();
          zip.file('minicard-'+Date.now()+'.pop.json',str_data)
          let zipFileBlob = await zip.generateAsync({type:"blob",compression: "DEFLATE", 
              compressionOptions: {
                 level: 1 
              }})
          console.log('minicard-sendXMSG->zipFileBlob:',zipFileBlob)
          // var myUrl = URL.createObjectURL(zipFileBlob)
          // rpc_client.downloadFile(myUrl,'minicard-'+Date.now()+'.zip')

          // const encoder = new TextEncoder();
          // let u8arr = encoder.encode(str_data)
          // var file = new File([u8arr], 'minicard.json', {type: 'application/json'});
          data = {file:zipFileBlob}
          let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:filename,
            mimetype:data.file.type,filename,path:'file-path',
            size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
            file_kind:'file',random:Math.random(),data:data.file}
          console.log('3dViewer-pop.creator-minicard-File:',data.file)

          if(this.is_minicard_locked) return console.log('this.is_minicard_locked is true')
          this.is_minicard_locked = true
          let res = await new Promise((resolve)=>{
            rpc_client.sendFile(fileInfo,function(udata){
                console.log('sendFile-callback-data:'+JSON.stringify(udata))
                if(udata && udata.data) resolve(udata.data)
                else resolve(null)
            })
          })
          console.log('send-3dView-mini-card-file-res:',res)
          this.is_minicard_locked = false
          if(!res || !res.ret){
            this.$toast.fail('上传失败' +res.msg,3000)
          }

          window.g_folder_copy_data = {url:res.filename} //用于dfolder文件夹粘贴

          localStorage.setItem('poster_type','minicard')
          let xvalue = {
              "xmsg": "我分享的minicard轻应用",
              "files": [
                {
                  "type": "file",
                  "name": filename,
                  "status": "done",
                  "uid": "vc-upload-'"+Date.now()+"'-6",
                  "url": res.filename
                }
              ]
            }
          localStorage.setItem('poster_value',JSON.stringify(xvalue))
          localStorage.setItem('poster_type','minicard')
          this.$router.push('/poster/minicard')
        }else if(msgObj && msgObj.xtype=='dtns.3d.creator2xverse')
        {
          let jsonItem = await ifileDb.getDataByKey('from.dtns.3d.creator.json')
          let webpItem = await ifileDb.getDataByKey('from.dtns.3d.creator.img')
          if(!jsonItem || !jsonItem.data)
          {
            return this.$toast('3d.creator：发送头榜不能为空数据！')
          }

          let zip = new JSZip();
          zip.file('xverse-'+Date.now()+'.json',JSON.stringify(jsonItem.data))
          let filename ='xverse-'+Date.now()+'.zip'
          let zipFileBlob = await zip.generateAsync({type:"blob",compression: "DEFLATE", 
              compressionOptions: {
                 level: 1 
              }})
          console.log('xverse-sendXMSG->zipFileBlob:',zipFileBlob)
          // var myUrl = URL.createObjectURL(zipFileBlob)
          // rpc_client.downloadFile(myUrl,filename)

          // const encoder = new TextEncoder();
          // let u8arr = encoder.encode(JSON.stringify(jsonItem.data))
          // var file = new File([u8arr], 'xverse-'+Date.now()+'.json', {type: 'application/json'});
          let data = {file:zipFileBlob}
          let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:filename,
            mimetype:data.file.type,filename,path:'file-path',
            size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
            file_kind:'file',random:Math.random(),data:data.file}

          console.log('3dViewer-xverse-File:',data.file)
          if(this.is_xverse_locked) return console.log('this.is_xverse_locked is true')
          this.is_xverse_locked = true
          let res = await new Promise((resolve)=>{
            rpc_client.sendFile(fileInfo,function(udata){
                console.log('sendFile-callback-data:'+JSON.stringify(udata))
                if(udata && udata.data) resolve(udata.data)
                else resolve(null)
            })
          })

          console.log('send-xverse-file-res:',res)
          if(!res || !res.ret){
            this.is_xverse_locked = false
            return this.$toast.fail('上传xverse源码文件失败' +(res ?res.msg:'未知网络错误'),3000)
          }

          let img_url = null
          if(webpItem && webpItem.data && webpItem.data.length>100)
          {
            let u8arr = rpc_client.dataURLtoBinary(webpItem.data.substring('data:image/webp;base64,'.length,webpItem.data.length))
            let file = new File([u8arr], 'xverse-'+Date.now()+'.webp', {type: 'image/webp'});
            let data = {file}
            let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:data.file.name,
              mimetype:data.file.type,filename:data.file.name,path:'file-path',
              size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
              img_kind:'open',random:Math.random(),data:data.file,img_q:1}

            console.log('3dViewer-xverse-webp-File:',file)
            let res = await new Promise((resolve)=>{
              rpc_client.sendImage(fileInfo,function(udata){
                  console.log('designViewer-sendImg-callback-data:'+JSON.stringify(udata))
                  if(udata && udata.data) resolve(udata.data)
                  else resolve(null)
              })
            })
            console.log('3dViewer-xverse-webp-send-res:',res)
            img_url = res && res.ret ? res.filename : null
          }
          this.is_xverse_locked = false
      
          let xvalue = {
              "xtype":"xverse",
              "xmsg": msgObj.showHelpTools ?  "我分享的xverse-3d模型源码（编辑截图）":"我分享的xverse-3d模型源码（预览截图）",
              //独立的内容位置，不占用图片
              'xverse_src_url':res.filename,
              'xverse_src_dtns_url':'dtns://web3:'+rpc_client.roomid+'/file?filename='+res.filename
            }
          if(img_url)
          {
            xvalue = Object.assign({},xvalue,
              {'xverse_img_url':img_url,
              'xverse_img_dtns_url':'dtns://web3:'+rpc_client.roomid+'/image/view?filename='+img_url+'&img_kind=open'})
          }
          // localStorage.setItem('poster_value',JSON.stringify(xvalue))
          imDb.addData({key:'dweb_poster_init_data',data:xvalue})
          localStorage.setItem('poster_type','xverse')
          localStorage.setItem('poster_value','xverse')
          this.$router.push('/poster/xmsg')
        }
        else if(msgObj && msgObj.xtype=='pop.preview')
        {
          console.log('show pop-mini-card-preview:',msgObj.xitem)
          this.xitem = msgObj.xitem
          this.showX = true
        }
        else{
          console.log('onPopCreatorMessage-error-xtype:',msgObj?msgObj.xtype:'null',msgObj)
        }
      },
      download(){
        rpc_client.downloadFileByBinary(this.title,this.src)
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