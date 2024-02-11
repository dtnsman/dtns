<template>
    <div>
    <div class="app-header" style="position: fixed;top: 0px;left:0;right:0px;z-index:99 ;">
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
  
        <label class="right">
          <DXIBOPBanner v-if="this.dxib" :dxib="dxib" style="width: 150px;height: auto;"></DXIBOPBanner>
          <span @click="copyFile">复制</span>&nbsp; &nbsp;
          <span @click="download">下载</span>
        </label>
      </template>
    </div>
  
    <div class="app-content" style="position: fixed;top:53px;left:0;right: 0px;bottom: 0px;">
        <video
            :id="myplayer"
            class="video-js"
            controls
            preload="auto"
            :width="w"
            :height="h-53"
            :poster="poster"
            ref="playerEle"
            >
            <source ref="srcElem" id="srcElemID" src="" type="video/mp4" />
            <p class="vjs-no-js">
                如果想使用video.js，请确保浏览器可以运行JavaScript，并且支持
                <a href="https://videojs.com/html5-video-support/" target="_blank"
                >HTML5 video</a>
            </p>
            </video>
    </div>
      <div v-if="show_vtips" style="position:fixed;height: auto;top:45%;left:0;right:0;width: 100%;z-index: 199;">
        <!-- <x-msg-viewer :item="vtips" :show_xmsg="false" style="width:100%"></x-msg-viewer> -->
        <PopComponent style="width:100%;" :xitem="vtips" :dxib="dxib" :fileId="fileId" :zoom="1" :fullWidth="fullWidth">
            </PopComponent>
      </div>
    </div>
  </template>
  
  <script>
  import poster from "../../../../static/images/oceans.png"
  import videoTipsJson from '../datajson/videoTips.json'
  import PopComponent from '@/components/Item/PopComponent'
  import DXIBOPBanner from '../../../components/item/DXIBOPBanner.vue'
  export default {
    name:'videoViewer',
    components: {
      PopComponent,
      DXIBOPBanner
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
        title:'',
        minetype:'video/mp4',
        poster:poster,
        myplayer:'player'+Date.now(),
        player:null,
        videoSrc:null,
        h:window.innerHeight,
        w:window.innerWidth,
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
        await this.updateActionInfo()
    },beforeDestroy () {
        console.log('into beforeDestroy()')
        if(this.player)
        {
            console.log('stop the player')
            this.player.pause()
            this.player = null
        }
    },
    beforeRouteLeave(to,from,next){
      console.log('into beforeRouteLeave')
      this.exit()
      
      next();
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
          console.log('videoViewer call dxibManager.exit()')
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
      /**
       * 用于状态通知给所有的poplangs
       * @param {*} duration 
       * @param {*} currentTime 
       */
      async noticeProgress(duration,currentTime)
      {
        //时间过滤，避免使得poplang执行过于频繁
        if(this.last_call_notice_process && Date.now()-this.last_call_notice_process>1000 || !this.last_call_notice_process)
        {
          this.last_call_notice_process = Date.now()
        }
        else{
          console.log('noticeProgress < 1s')
          return 
        }
        console.log('noticeProgress-poplangs:',this.poplangs)
        //轮询
        for(let i=0;i<this.poplangs.length;i++)
        {
          if(this.poplangs[i]){
            if(this.poplangs[i].context){
              this.poplangs[i].context.duration = duration
              this.poplangs[i].context.curTime = currentTime
            }
            let noticeProgressRet =await this.poplangs[i].op(null,'onprogress')//,duration,currentTime)
            console.log('noticeProgressRet-'+i,noticeProgressRet)
          }
        }
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
      showVideo()
      {
        // if(this.player)
        // {
        //   this.player.dispose()
        //   this.player = null
        //   this.myplayer = 'player'+Date.now()
        // }

        let options =  {
            controlBar: {
                fullscreenToggle: true
            },
            userActions: {
                doubleClick: true
            }
        };
        let This = this
        This.show_vtips = false
        if(!this.player)
        this.player = videojs(this.myplayer, options, function onPlayerReady() {
            videojs.log('播放器准备好了!');

            // In this context, `this` is the player that was created by Video.js.
            this.play();

            this.on('ended', function() {
                videojs.log('播放结束!');
                This.vtips = This.endedVTIPS
                This.show_vtips = This.vtips ? true:false
                console.log('ended-This.show_vtips:',This.show_vtips,This.vtips,This.endedVTIPS)

                if(This.player.isFullscreen_)
                This.player.exitFullscreen()
            });


            this.on("play", function(){
              console.log("视频开始播放")
              This.show_vtips = false
            });
            this.on('loadstart', function(event) {
              console.log('loadstart',This.player,this)
            });
            this.on('loadedmetadata', function(event) {
              console.log('loadedmetadata-视频源数据加载完成',This.player,this,event)
              console.log('loadedmetadata:',this.children_[0].duration,this.children_[0].currentTime)
              //设置上次播放时间lastLearnTime(秒)
              // myPlayer.currentTime(lastLearnTime);
            });
            this.on('loadeddata', function(event) {
              console.log('loadeddata-渲染播放画面',This.player,this,event); //autoPlay必须为false
            });
            this.on('progress', function(event) {
              console.log('progress-加载过程',This.player,this,event)
              console.log('progress:',this.children_[0].duration,this.children_[0].currentTime)
            });
          
            //播放时长(秒)
            var totalTime = 0;
            // 监听播放进度
            this.on('timeupdate', function() {
              //当前播放时长(秒)
              console.log('timeupdate:',this.children_[0].duration,this.children_[0].currentTime)
              This.noticeProgress(this.children_[0].duration,this.children_[0].currentTime)//通知进度
              if(this.children_[0].currentTime+5>this.children_[0].duration)
              {
                This.vtips = This.endedVTIPS
                This.show_vtips = This.vtips ? true:false
                console.log('timeupdate last 5s:',This.show_vtips,This.vtips,This.endedVTIPS)
                
                if(This.player.isFullscreen_)
                This.player.exitFullscreen()
              }
            })

            this.on('fullscreenchange', (e) => {
              console.log('fullscreenchange:',e,this,This.player)
            })


            // try{
            //   console.log('This.player:',This.player)
            //   This.player.addEventListener('loadedmetadata', function () { //加载数据
            //       //视频的总长度
            //       console.log(this.duration);
            //   });

            //   This.player.addEventListener("timeupdate", function(){
            //       //获取当前播放位置的秒数，并设置localStorage
            //       var currentTime = this.currentTime;
            //       console.log('timeupdate:',currentTime)
            //     })
            // }catch(ex)
            // {
            //   console.log('add this.player listener exception:'+ex,ex)
            // }
        });
        //加载视频源
        this.player.src([{src:this.videoSrc,type: "video/mp4"}])
        this.player.play()
        setTimeout(()=>this.player.play(),0)
        setTimeout(()=>this.player.play(),300)
        this.isLoading = false
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

          //先不显示vtips
          this.vtips = null
          this.show_vtips = false
          this.endedVTIPS = null //避免被上一个初步的endedVTIPS-json干扰
          this.poplangs = []
          if(this.actionInfo.ended)
          try{
            this.ended =  this.dxibManager.playAction(this.actionInfo.ended,false)
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
          this.minetype = 'video/mp4'
          this.dxibName = !this.dxibManager.getDXIBObj() ?  'dxib视频播放': this.dxibManager.getDXIBObj().xmsg ? this.dxibManager.getDXIBObj().xmsg : this.dxibManager.getDXIBObj().name
          this.title = this.actionInfo.xmsg ? this.actionInfo.xmsg : this.dxibName +'-'+ this.actionInfo.name //this.dxibManager.getDXIBObj() ?this.dxibManager.getDXIBObj().xmsg: 'dxib视频播放'
          this.filedata= await this.dxibManager.loadActionResFile(this.actionInfo)
          let blob = new Blob([this.filedata], { type: this.minetype });
          // this.src  = URL.createObjectURL(blob);
          let src = URL.createObjectURL(blob);
          this.videoSrc= src
          this.$refs.srcElem.src = src
        }
        else{
          let params = {filename:localStorage.getItem('video-filename')}
          let file_url = 'dtns://web3:'+rpc_client.roomid+'/file?filename='+params.filename
          let cachedFileItem = await ifileDb.getDataByKey(file_url)
          // let cachedFileItem = await ifileDb.getDataByKey(params.filename)//await ifileDb.getDataByKey(params.filename)
          console.log('download fast by ifileDb:',cachedFileItem)
          if(!cachedFileItem ){
              this.isLoading = false
              return this.$toast.fail('查看失败:音频文件不存在');
          } 

          this.minetype = cachedFileItem.data.fileInfo.minetype
          this.title = cachedFileItem.data.filename
          this.filedata=cachedFileItem.data.filedata
          let blob = new Blob([cachedFileItem.data.filedata], { type: cachedFileItem.data.fileInfo.minetype });
          // this.src  = URL.createObjectURL(blob);
          let src = URL.createObjectURL(blob);
          this.$refs.srcElem.src = src
          this.videoSrc= src
        }

        this.showVideo()
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
          if(!localStorage.getItem('video-filename')) return this.$toast('无法复制文件，该文件URL为空！')
          window.g_folder_copy_data = {url:localStorage.getItem('video-filename')}
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
  padding: 24px 16px;
}

.right {
  float: right;
  display: flex;
}
</style>