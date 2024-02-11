<template>
    <div>
    <div class="app-header">
      <span @click="back"> ❮返回 </span> &nbsp;
      <!-- <template v-if="isLoading"> Loading... </template> -->
      <template><span>{{ title }}</span>
      </template>
    </div>
  
    <div class="xverse" ref="xdocument">

    </div>
    </div>
  </template>
  <script>
// import VueOfficeDocx from '@vue-office/docx'
// import '@vue-office/docx/lib/index.css'
   
    
    import * as THREE from '../../../../static/js/creator.3d/build/three.module.js';
			// alert('keys-three:'+Object.keys(THREE))

    import { Editor } from '../../../../static/js/creator.3d/editor/js/Editor.js';
    // alert('keys-Editor:'+Object.keys(Editor))
    import { Viewport } from '../../../../static/js/creator.3d/editor/js/Viewport.js';
    import { Toolbar } from '../../../../static/js/creator.3d/editor/js/Toolbar.js';
    import { Script } from '../../../../static/js/creator.3d/editor/js/Script.js';
    import { Player } from '../../../../static/js/creator.3d/editor/js/Player.js';
    import { Sidebar } from '../../../../static/js/creator.3d/editor/js/Sidebar.js';
    import { Menubar } from '../../../../static/js/creator.3d/editor/js/Menubar.js';
    import { Resizer } from '../../../../static/js/creator.3d/editor/js/Resizer.js';
    import { VRButton } from '../../../../static/js/creator.3d/examples/jsm/webxr/VRButton.js';

    
  export default {
    components: {
        // VueOfficeDocx
    },
    data() {
      return {
        isLoading: true,
       //   'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
        title:'3D.creator'
      }
    },
    watch: {
      showAllPages() {
        this.page = this.showAllPages ? null : 1
      }
    },
    async created(){
      if(typeof window.g_x3deditor_onPopCreatorMessage == 'function')
      {
        window.removeEventListener('message',g_x3deditor_onPopCreatorMessage)
      }
      window.g_x3deditor_onPopCreatorMessage = this.onPopCreatorMessage

      window.addEventListener('message',this.onPopCreatorMessage, false);
      window.g_3dplayer_mode = 'normal' //重置为普通模式！（避免退出后再进入异常）
      window.isPlaying = false
    },
    async mounted(){
        console.log('3dEditor is mounted now!')
        window.xdocument = this.$refs.xdocument
        console.log('mounted-xdocument:',xdocument)
        this.onMountEditor()

        window.g_3d_editor_stop_record_push_dweb = this.sendRecordVideo
    },
    beforeRouteLeave(to,from,next){
      window.removeEventListener('message',this.onPopCreatorMessage)
      this.is_leaved = true
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

        async sendRecordVideo(blobFile,bPlayer = false)
        {
          if(!confirm('确定上传录制的视频吗（upload now）? 文件大小：'+ Math.round(blobFile.size*1.0/1024/1024,2)+'MB'))
          {
            return console.log('not upload xverse-record-video:',blobFile)            
          }
          //上传，推送至头榜
          let filename = '录制的xverse轻应用视频'+(!bPlayer?'（编辑）':'')+'.webm'
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
              "xmsg": "我分享的xverse轻应用（录制的视频"+(!bPlayer?'-编辑':'')+"）",
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
            xvalue.isProduct = bPlayer
          } 
          imDb.addData({key:'dweb_poster_init_data',data:xvalue})
          localStorage.setItem('poster_type','xmsg')
          localStorage.setItem('poster_value','normal')//类型
          // if(this.now_label_type) localStorage.setItem('from_label_type',this.now_label_type)
          this.$router.push('/poster/xmsg')
        }
        ,

        onMountEditor(){
            async function loadData() {
                while ( ! ifileDb.db ) {

                    await msleep( 100 );
                    console.log( 'ifileDb.db:', ifileDb.db );

                }
                while(typeof g_3d_editor=='undefined'){
                    await msleep(100)
                    console.log('typeof g_3d_editor:',typeof g_3d_editor)
                } 
                while(!window.g_state_recover_ended_flag)
                {
                    await msleep(100)
                    console.log('window.g_state_recover_ended_flag:',window.g_state_recover_ended_flag)
                }
                await msleep(1500)
                let json = await ifileDb.getDataByKey('from.dtns.3d.creator.json')
                console.log('index.html--from.dtns.design.json:',json)
                if(json && json.data) {
                    json = json.data
                    console.log('index.html--load----from.dtns.design.json:',json)
                    console.log('3d-editor:',g_3d_editor)

                    // setTimeout(()=>{
                    g_3d_editor.clear();
                    g_3d_editor.loader.handleJSON(json);
                    // },5000)
                    // g_3d_editor.storage.set( json );
                    // FileOpen.load_json(json)
                    
                }
            }
            async function msleep(ms){
                return new Promise((resolve)=>{
                    setTimeout(()=>resolve(true),ms)
                })
            }
            loadData();

            window.URL = window.URL || window.webkitURL;
            window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

            Number.prototype.format = function () {

                return this.toString().replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1,' );

            };

            //

            const editor = new Editor();
            window.g_3d_editor = editor;
            // alert('keys-editor:'+Object.keys(editor))
            // alert('keys-g_3d_editor:'+Object.keys(g_3d_editor))

            window.editor = editor; // Expose editor to Console
            window.THREE = THREE; // Expose THREE to APP Scripts and Console
            window.VRButton = VRButton; // Expose VRButton to APP Scripts

            const viewport = new Viewport( editor );
            xdocument.appendChild( viewport.dom );

            const toolbar = new Toolbar( editor );
            xdocument.appendChild( toolbar.dom );

            const script = new Script( editor );
            xdocument.appendChild( script.dom );

            const player = new Player( editor );
            xdocument.appendChild( player.dom );
            window.g_3d_player = player;

            const sidebar = new Sidebar( editor );
            xdocument.appendChild( sidebar.dom );

            const menubar = new Menubar( editor );
            xdocument.appendChild( menubar.dom );

            const resizer = new Resizer( editor );
            xdocument.appendChild( resizer.dom );

            //

            editor.storage.init( function () {

                editor.storage.get( function ( state ) {

                    if ( isLoadingFromHash ) return;

                    if ( state !== undefined ) {

                        editor.fromJSON( state );

                    }

                    const selected = editor.config.getKey( 'selected' );

                    if ( selected !== undefined ) {

                        editor.selectByUuid( selected );

                    }
                    window.g_state_recover_ended_flag = true

                } );

                //

                let timeout;

                function saveState() {

                    if ( editor.config.getKey( 'autosave' ) === false ) {

                        return;

                    }

                    clearTimeout( timeout );

                    timeout = setTimeout( function () {

                        editor.signals.savingStarted.dispatch();

                        timeout = setTimeout( function () {

                            editor.storage.set( editor.toJSON() );

                            editor.signals.savingFinished.dispatch();

                        }, 100 );

                    }, 1000 );

                }

                const signals = editor.signals;

                signals.geometryChanged.add( saveState );
                signals.objectAdded.add( saveState );
                signals.objectChanged.add( saveState );
                signals.objectRemoved.add( saveState );
                signals.materialChanged.add( saveState );
                signals.sceneBackgroundChanged.add( saveState );
                signals.sceneEnvironmentChanged.add( saveState );
                signals.sceneFogChanged.add( saveState );
                signals.sceneGraphChanged.add( saveState );
                signals.scriptChanged.add( saveState );
                signals.historyChanged.add( saveState );

            } );

            //

            document.addEventListener( 'dragover', function ( event ) {

                event.preventDefault();
                event.dataTransfer.dropEffect = 'copy';

            } );

            document.addEventListener( 'drop', function ( event ) {

                event.preventDefault();

                if ( event.dataTransfer.types[ 0 ] === 'text/plain' ) return; // Outliner drop

                if ( event.dataTransfer.items ) {

                    // DataTransferItemList supports folders

                    editor.loader.loadItemList( event.dataTransfer.items );

                } else {

                    editor.loader.loadFiles( event.dataTransfer.files );

                }

            } );

            function onWindowResize() {

                editor.signals.windowResize.dispatch();

            }

            window.addEventListener( 'resize', onWindowResize );

            onWindowResize();

            //

            let isLoadingFromHash = false;
            const hash = window.location.hash;

            if ( hash.slice( 1, 6 ) === 'file=' ) {

                const file = hash.slice( 6 );

                if ( confirm( 'Any unsaved data will be lost. Are you sure?' ) ) {

                    const loader = new THREE.FileLoader();
                    loader.crossOrigin = '';
                    loader.load( file, function ( text ) {

                        editor.clear();
                        editor.fromJSON( JSON.parse( text ) );

                    } );

                    isLoadingFromHash = true;

                }

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
        //进入的是3dEditor的处理浏览
        if(msgObj && msgObj.xtype=='dtns.3d.creator2xverse2')
        {
          let jsonItem = await ifileDb.getDataByKey('from.dtns.3d.creator.json')
          let webpItem = await ifileDb.getDataByKey('from.dtns.3d.creator.img')
          if(!jsonItem || !jsonItem.data)
          {
            return this.$toast('3d.creator：发送头榜不能为空数据！')
          }

          let zip = new JSZip();
          zip.file('xverse-'+Date.now()+'.xverse.json',JSON.stringify(jsonItem.data))
          let filename ='xverse-'+Date.now()+'.xverse.zip'
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

          window.g_folder_copy_data = {url:res.filename} //用于dfolder文件夹粘贴

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
          if(msgObj.isProduct){
            xvalue.isProduct = true
            xvalue.xmsg = '我分享的xverse轻应用'
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
<!-- <style src="../../../../static/js/creator.3d/editor/css/main.css" scoped></style> -->
<!-- <style src="../../../../static/js/creator.3d/editor/js/libs/codemirror/codemirror.css" scoped></style>
<style src="../../../../static/js/creator.3d/editor/js/libs/codemirror/theme/monokai.css" scoped></style>
<style src="../../../../static/js/creator.3d/editor/js/libs/codemirror/addon/dialog.css" scoped></style>
<style src="../../../../static/js/creator.3d/editor/js/libs/codemirror/addon/show-hint.css" scoped></style>
<style src="../../../../static/js/creator.3d/editor/js/libs/codemirror/addon/tern.css" scoped></style>
   -->
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
  float: right;
}
</style>