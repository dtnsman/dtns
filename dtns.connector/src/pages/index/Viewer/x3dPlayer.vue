<template>
    <div>
    <div class="app-header">
      <span @click="back"> ❮返回 </span> &nbsp;
      <!-- <template v-if="isLoading"> Loading... </template> -->
      <template><span>{{ title }}</span>
      </template>
      <label class="right">
        <DXIBOPBanner v-if="this.dxib" :dxib="dxib" style="width: 150px;height: auto;"></DXIBOPBanner>
        <span @click="copyFile">复制</span>&nbsp; &nbsp;
        <span @click="download">下载</span>&nbsp; &nbsp;
        <span @click="setPlayer">玩家</span>&nbsp; &nbsp;
        <span v-if="!recording" @click="startRecord">录制</span>
        <span v-if="recording" @click="endRecord">结束</span>
      </label>
    </div>
  
    <div class="xverse" ref="xdocument">

    </div>
    <div v-if="show_vtips" style="position:fixed;height: auto;top:45%;left:0;right:0;width: 100%;z-index: 199;">
        <!-- <x-msg-viewer :item="vtips" :show_xmsg="false" style="width:100%"></x-msg-viewer> -->
        <PopComponent style="width:100%;" :xitem="vtips" :dxib="dxib" :fileId="fileId" :zoom="1" :fullWidth="fullWidth">
        </PopComponent>
      </div>
    </div>
  </template>
  <script>
  import * as THREE from '../../../../static/js/creator.3d/build/three.module.js';
  import { APP } from '../../../../static/js/creator.3d/editor/js/libs/app.js';
  import { VRButton } from '../../../../static/js/creator.3d/examples/jsm/webxr/VRButton.js';
  window.THREE = THREE; // Used by APP Scripts.
	window.VRButton = VRButton; // Used by APP Scripts.

  import PopComponent from '@/components/Item/PopComponent'
  import DXIBOPBanner from '../../../components/item/DXIBOPBanner.vue'
    
  export default {
    name:'x3dPlayer',
    components: {
      PopComponent,
      DXIBOPBanner
    },
    data() {
      return {
        isLoading: true,
       //   'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
        title:'3D.player',
        recording:false,
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
    async created(){
      if(typeof window.g_x3dplayer_onPopCreatorMessage == 'function')
      {
        window.removeEventListener('message',g_x3dplayer_onPopCreatorMessage)
      }
      window.g_x3dplayer_onPopCreatorMessage = this.onPopCreatorMessage
      window.addEventListener('message',this.onPopCreatorMessage, false);
      window.g_3dplayer_mode = 'normal' //重置为普通模式！（避免退出后再进入异常）
      window.isPlaying = false
    },
    async mounted(){
        console.log('3dEditor is mounted now!')
        // window.xdocument = this.$refs.xdocument
        console.log('mounted-xdocument:',this.$refs.xdocument)
        // this.onMountPlayer()
        this.updateActionInfo()
    },
    beforeRouteLeave(to,from,next){
      window.removeEventListener('message',this.onPopCreatorMessage)
      this.is_leaved = true

      console.log('into beforeRouteLeave')
     
      this.exit()

      if(typeof g_player_stop_func =='function'){
        console.log('3dEdtior leave now ,remove the lisenter:',g_player_stop_func)
        g_player_stop_func(true)
      }
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
            console.log('x3dPlayerViewer call dxibManager.exit()')
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
            if(!localStorage.getItem('xverse-filename')) return this.$toast('无法复制文件，该文件URL为空！')
            window.g_folder_copy_data = {url:localStorage.getItem('xverse-filename')}
            this.$toast('复制成功，请切换到文件夹目录粘贴！')
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
          {
            if(!this.xverse_json){
              return this.$toast('无法获得文件内容！')
            }
            let encoder = new TextEncoder()
            let uint8Array = encoder.encode(JSON.stringify(this.xverse_json))
            rpc_client.downloadFileByBinary('xverse-'+Date.now()+'.json',uint8Array)
          }
        },
        setPlayer()
        {
          if(window.g_3d_editor_stop_player_flag){
            if(typeof window.g_3d_player_start_player == 'function'){
              window.g_3d_player_start_player()
              this.$toast('启用玩家视角！')
            }
          }else{
            if(typeof window.g_3d_player_stop_player == 'function'){
              window.g_3d_player_stop_player()
              this.$toast('关闭玩家视角！')
            }
          }
        },
        startRecord(){
          if(typeof g_3d_player_start_record=='function'){
            g_3d_player_start_record()
            this.recording = true
          }
        },
        async endRecord(){
          if(typeof g_3d_player_stop_record=='function'){
            let blobFile = g_3d_player_stop_record()
            console.log('3dPlayer.vue-blobFile:',blobFile)
            this.recording = false

            if(!confirm('确定上传录制的视频吗（upload now）? 文件大小：'+ Math.round(blobFile.size*1.0/1024/1024,2)+'MB'))
            {
              return console.log('not upload xverse-record-video:',blobFile)            
            }
            //上传，推送至头榜
            let filename = '录制的xverse轻应用视频.webm'
            let data = {file:blobFile}
            let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:filename,
              mimetype:data.file.type,filename,path:'file-path',
              size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
              file_kind:'file',random:Math.random(),data:data.file}

            console.log('3dPlayer-xverse-File:',data.file)
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
            this.is_xverse_locked = false
            if(!res || !res.ret){
              return this.$toast.fail('上传xverse轻应用录屏视频失败' +(res ?res.msg:'未知网络错误'),3000)
            }
            let xvalue = {
                "xtype":"normal",
                "xmsg": "我分享的xverse轻应用（录制的视频）",
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
              let xmsgItem = await imDb.getDataByKey('from.dtns.xverse.xmsg')
              console.log('from.dtns.xverse.xmsg:xmsgItem:',xmsgItem)
              if(xmsgItem && xmsgItem.data){
                xvalue = Object.assign({},xmsgItem.data,xvalue)
                xvalue.xtype = 'xverse'
              } 
              imDb.addData({key:'dweb_poster_init_data',data:xvalue})
              localStorage.setItem('poster_type','xmsg')
              localStorage.setItem('poster_value','normal')//类型
              // if(this.now_label_type) localStorage.setItem('from_label_type',this.now_label_type)
              this.$router.push('/poster/xmsg')
            }
        },
        initDXIBRuntime(poplang)
        {
          console.log('3dPlayer.vue-initDXIBRuntime:',poplang,this.dxibManager,this.dxib)
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
          
            this.fileData= null
            this.xverse_json = null
            try{
              this.fileData =await this.dxibManager.loadActionResFile(this.actionInfo)//得到mini-card-info的文件数据
              let utf8decoder = new TextDecoder()
              let text =  utf8decoder.decode(this.fileData)
              this.xverse_json = JSON.parse(text)
              console.log('3dPlayer.vue-loadActionResFile-fileData:',this.fileData,text,this.xitem)
            }catch(ex)
            {
              console.log('parse-actionInfo-fileData-exception:'+ex,ex)
            }

            //显示3dPlayer
            this.onMountPlayer()

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
              console.log('load-video-ended-vtips:',this.vtips)
            }catch(ex)
            {
              console.log('get-ended-vtips-json-failed-exception:'+ex,ex)
            }

            this.isLoading = false
            this.dxibName = !this.dxibManager.getDXIBObj() ?  'dxib视频播放': this.dxibManager.getDXIBObj().xmsg ? this.dxibManager.getDXIBObj().xmsg : this.dxibManager.getDXIBObj().name
            this.title = this.actionInfo.xmsg ? this.actionInfo.xmsg : this.dxibName +'-'+ this.actionInfo.name //this.dxibManager.getDXIBObj() ?this.dxibManager.getDXIBObj().xmsg: 'dxib视频播放'
          }
          else{
            this.onMountPlayer()
            // this.$toast('无法打开xcard页面，参数g_action_info为空！')
          }
        },
        onMountPlayer(){
            const player = new APP.Player();
            this.$refs.xdocument.innerHTML = '' //empty();
            this.$refs.xdocument.appendChild( player.dom );
            let This = this
            async function loadData() {
                while ( ! ifileDb.db ) {

                    await msleep( 100 );
                    console.log( 'ifileDb.db:', ifileDb.db );

                }
                await msleep(100)
                //如果不是来源自dxib，则加载自此的json文件
                let json = null
                if(!This.xverse_json )
                {
                  json = await ifileDb.getDataByKey('from.dtns.3d.creator.json')
                  console.log('index.html--from.dtns.design.json:',json)
                  if(json && json.data) {
                      json = json.data
                      console.log('index.html--load----from.dtns.design.json:',json)
                      This.xverse_json = json
                  }
                }

                if(!This.xverse_json ) return This.$toast('出错了，无法加载json源文件')
                json = This.xverse_json
                // console.log('3d-editor:',g_3d_editor)

                // g_3d_editor.clear();
                // g_3d_editor.loader.handleJSON(json);

                console.log('3dPlayer.vue-g_3d_player_showMode:',typeof g_3d_player_showMode)
                if(typeof g_3d_player_showMode=='function'){
                    g_3d_player_showMode('free')//自由视角
                } 

                player.load( json , This.dxib);
                player.setSize( window.innerWidth, window.innerHeight );
                player.play();
            }
            async function msleep(ms){
                return new Promise((resolve)=>{
                    setTimeout(()=>resolve(true),ms)
                })
            }
            loadData();
            // window.g_3d_player = player;
            window.addEventListener( 'resize', function () {
                player.setSize( window.innerWidth, window.innerHeight );
            } );
        },
        
      async onPopCreatorMessage(e){//目标，保存来自pop-creator的数据，并保存为文件，然后进入minicard-poster页面进行上传
        if(this.is_leaved) return 
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
        return 
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

.xverse{width:100%}

.right {
  float: right;
  display: flex;
}
.right button {padding:5px;color: rgb(255, 255, 255); border-radius: 4px; font-size: 13px; height: 28px; background-color: rgb(18, 173, 245); border: none;}
</style>