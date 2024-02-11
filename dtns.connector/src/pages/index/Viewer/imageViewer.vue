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
        </label>
      </template>
    </div>
  
    <div class="app-content" v-if="okFlag">
        <!-- <img v-if="this.dxib" width="100%" :src="src"/>  v-else  -->
        <img width="100%" v-lazy="src"/>
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
        scale:5,
        rotation:0,
       //   'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
        showAllPages: true,
        title:'',
        okFlag:false,
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
      console.log('into imageViewer beforeRouteLeave')
      this.exit()
      
      next();
    },
    async created(){
      this.updateActionInfo()
      // this.src = cachedFileItem.data.filedata
    },
    methods: {
        back(){
          // this.exit()
          this.$router.go(-1)
        },
      exit()
      {
        if(this.dxibManager)
        {
          this.dxibManager.exit()//保存saveState，方便下次打开时继续保持history和now_pos等
          this.dxibManager = null
          this.dxib = null
          console.log('imageViewer call dxibManager.exit()')
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


          this.dxibName = !this.dxibManager.getDXIBObj() ?  '查看图片': this.dxibManager.getDXIBObj().xmsg ? this.dxibManager.getDXIBObj().xmsg : this.dxibManager.getDXIBObj().name
          this.title = this.actionInfo.xmsg ? this.actionInfo.xmsg : this.dxibName +'-'+ this.actionInfo.name //this.dxibManager.getDXIBObj() ?this.dxibManager.getDXIBObj().xmsg: 'dxib视频播放'
          this.filedata= await this.dxibManager.loadActionResFile(this.actionInfo)
          let myBlob = new Blob([ this.filedata], { type:'image/png'});
          let reader=new FileReader();
          reader.onload=function(e)
          {
              let base64 = this.result
              console.log('this.ixdb--imageViewer-data-to-base64:',base64)
              // imageDb.addData({img_id:params.filename,data:base64 })
              This.src = base64
              console.log('imageViewer-this.src(actionInfo):',This.src )
              // This.isLoading = false
              // This.src = params.filename
              This.isLoading =false
              This.okFlag = true
          }
          reader.readAsDataURL(myBlob);
          // this.src = URL.createObjectURL(myBlob);
          // if(this.src){
          //   this.src = null 
          //   setTimeout(()=>this.src = this.actionInfo.img_url ?  this.actionInfo.img_url: this.actionInfo.url,0)
          // } 
          // else this.src = this.actionInfo.img_url ?  this.actionInfo.img_url: this.actionInfo.url //图片链接支持了dtns方式访问
          console.log('imageViewer-this.src(actionInfo):',this.src )
          this.isLoading =false
          // this.okFlag = true
        }
        else{
          let params = {filename:localStorage.getItem('img-filename')}
          this.src = params.filename
          this.isLoading = false
          this.title = '查看图片'

          let file_url = 'dtns://web3:'+rpc_client.roomid+'/file?filename='+params.filename
          let cachedFileItem = await ifileDb.getDataByKey(file_url)
          // let cachedFileItem = await ifileDb.getDataByKey(params.filename)//await ifileDb.getDataByKey(params.filename)
          console.log('download fast by ifileDb:',cachedFileItem)
          if(!cachedFileItem || !cachedFileItem.data){
              this.isLoading = false
              return this.$toast.fail('查看失败:图片文件不存在');
          } 

          let imageData = await imageDb.getDataByKey(params.filename)
          if(!imageData || !imageData.data)
          {
            let myBlob = new Blob([ cachedFileItem.data.filedata], { type:cachedFileItem.data.fileInfo.mimetype});
            let reader=new FileReader();
            reader.onload=function(e)
            {
                let base64 = this.result
                console.log('imageViewer-data-to-base64:',base64)
                imageDb.addData({img_id:params.filename,data:base64 })
                // This.src = base64
                // This.isLoading = false
                This.src = params.filename
                This.okFlag = true
            }
            reader.readAsDataURL(myBlob);
          }else{
            this.src = params.filename
            this.okFlag = true
          }
          this.title = cachedFileItem.data.filename ? cachedFileItem.data.filename : 
            (cachedFileItem.data.fileInfo ? cachedFileItem.data.fileInfo.filename: this.title)
          this.filedata=cachedFileItem.data.filedata
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
          if(!localStorage.getItem('img-filename')) return this.$toast('无法复制文件，该文件URL为空！')
          window.g_folder_copy_data = {url:localStorage.getItem('img-filename')}
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
.right span{display: flex;margin-left:5px;margin-right: 5px;}
</style>