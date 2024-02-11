<template>
    <div ref="content">
    <div class="app-header" :style="pObj">
      <span @click="back"> ❮返回 </span> &nbsp;
      <template v-if="isLoading"> Loading... </template>
      
      <template v-else>
        <span>{{ title }}</span> &nbsp; 
        <span @click="copyFile">复制</span> &nbsp;
        <span @click="download">下载</span> &nbsp;
        <span @click="rotationAdd"> 旋转rolate </span> &nbsp;
        <span @click="scaleAdd"> 放大max </span> &nbsp;
        <span @click="scaleSub"> 缩小min </span> &nbsp;
        <span v-if="showAllPages"> {{ pageCount }} 页page(s) </span>
  
        <span v-else style="color:aqua">
          <button :disabled="page <= 1" @click="page--">❮</button>
  
          {{ page }} / {{ pageCount }}
  
          <button :disabled="page >= pageCount" @click="page++">❯</button> &nbsp; <button @click="gotoPage">跳转</button>
        </span>
      </template>
      <label v-if="!isLoading" class="right">
          <DXIBOPBanner v-if="this.dxib" :dxib="dxib" style="width: 150px;height: auto;"></DXIBOPBanner>
          <span><input v-model="showArrow" type="checkbox" :disabled="showAllPages"/>翻页箭头</span>
          <span><input v-model="showAllPages" type="checkbox" />全部页</span>
      </label>
    </div>
  
    <div class="app-content">
      <vue-pdf-embed
        ref="pdfRef"
        :source="pdfSource"
        :page="page"
        :rotation="rotation"
        :scale="scale"
        @password-requested="handlePasswordRequest"
        @rendered="handleDocumentRender"
      />
    </div>
    <img v-if="showArrow && !showAllPages" @click="page >1 ? page-- :1" src="../../../../static/images/left-arrow.png" width="30px" height="30px" style="position: fixed;top:48%;left:10px;opacity:0.4"/>
    <img v-if="showArrow && !showAllPages" @click="page <pageCount ? page++ :pageCount" src="../../../../static/images/right-arrow.png" width="30px" height="30px" style="position: fixed;top:48%;right:10px;opacity:0.4"/>
    </div>
  </template>
  
  <script>
//   import VuePdfEmbed from 'vue-pdf-embed'
  
  // OR THE FOLLOWING IMPORT FOR VUE 2
  import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
  import DXIBOPBanner from '../../../components/item/DXIBOPBanner.vue'
  export default {
    name:'pdfViewer',
    components: {
      VuePdfEmbed,
      DXIBOPBanner
    },
    data() {
      return {
        isLoading: true,
        page: 1,
        pageCount: 1,
        pdfSource:null,
        scale:5,
        rotation:0,
       //   'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
        showAllPages: false,
        showArrow:true,
        title:'',
        pObj:{},
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
        this.page =  this.showAllPages ? null : 1
      }
    },
    beforeRouteLeave(to,from,next){
      console.log('into pdfViewer beforeRouteLeave')
      this.exit()
      
      next();
    },
    async created(){
      this.updateActionInfo()
    },
    mounted(){
      let This = this
      this.$nextTick(() => {
        console.log('This.$refs.content:',This.$refs.content)
        document.addEventListener('scroll', function(){
          let scrollTop = document.documentElement.scrollTop// This.$refs.content.scrollTop
          if(scrollTop>1){
            This.pObj = {
              position:'fixed',top:'0px',width:'100%','z-index':'99'
            }
          }else{
            This.pObj = {
              position:'relative'
            }
          }
          console.log('scrollTop:',scrollTop,This.pObj)
        })
      })
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

          this.dxibName = !this.dxibManager.getDXIBObj() ?  '查看文本': this.dxibManager.getDXIBObj().xmsg ? this.dxibManager.getDXIBObj().xmsg : this.dxibManager.getDXIBObj().name
          this.title = this.actionInfo.xmsg ? this.actionInfo.xmsg : this.dxibName +'-'+ this.actionInfo.name //this.dxibManager.getDXIBObj() ?this.dxibManager.getDXIBObj().xmsg: 'dxib视频播放'
          this.filedata= await this.dxibManager.loadActionResFile(this.actionInfo)
          
          this.pdfSource = this.filedata

          this.isLoading =false
        }
        else{
          let params = {filename:localStorage.getItem('pdf-filename')}
          let file_url = 'dtns://web3:'+rpc_client.roomid+'/file?filename='+params.filename
          let cachedFileItem = await ifileDb.getDataByKey(file_url)
          // let cachedFileItem = await ifileDb.getDataByKey(params.filename)
          console.log('download pdf by ifileDb:',cachedFileItem)
          if(!cachedFileItem ) return this.$toast.fail('查看失败:pdf文件不存在');
          this.pdfSource = cachedFileItem.data.filedata
          this.title = cachedFileItem.data.filename
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
          if(!localStorage.getItem('pdf-filename')) return this.$toast('无法复制文件，该文件URL为空！')
          window.g_folder_copy_data = {url:localStorage.getItem('pdf-filename')}
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
          rpc_client.downloadFileByBinary(this.title,this.pdfSource)
      },
      gotoPage(){
        let num = prompt('跳转的页码goto page number：',''+this.page)
        num = parseInt(num)
        if(!isNaN(num))
        {
          num = num>= this.pageCount ? this.pageCount :num
          num = num<=0 ? 1:num
          this.page = num
        } 
      },
      rotationAdd()
      {
        // this.page ++
        // return 
        this.rotation += 90
      },
      rotationSub()
      {
        // this.page -- 
        // this.page = this.page<=0 ? 1:this.page
        // return 
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
        console.log('pdf.pageCount:',this.pageCount)
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
  width: 100%;
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
  