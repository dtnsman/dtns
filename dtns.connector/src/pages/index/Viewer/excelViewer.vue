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
  
    <div class="app-content">
        <!-- <vue-office-excel
        :src="excel"
        style="height: 100vh;"
        @rendered="renderedHandler"
        @error="errorHandler"
        /> -->
        <!-- <div ref="excelEle" style="width:100%;height:100%"></div> -->
        <!-- <iframe id="iframe" src="static/js/office-js/xlsx.html" width="100%" :height="ih"></iframe> -->
        <iframe id="iframe" :src="url" width="100%" :height="ih"></iframe>
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
        excel:null,
        scale:5,
        rotation:0,
       //   'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
        showAllPages: true,
        title:'',
        ih:960,
        url:null,
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
      console.log('into excelViewer beforeRouteLeave')
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

        this.updateActionInfo()
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
          console.log('excelViewer call dxibManager.exit()')
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
          if(!localStorage.getItem('excel-filename')) return this.$toast('无法复制文件，该文件URL为空！')
          window.g_folder_copy_data = {url:localStorage.getItem('excel-filename')}
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
          rpc_client.downloadFileByBinary(this.title,this.excel)
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
          this.excel = this.filedata

          localStorage.setItem('excel-filename',this.actionInfo.url)

          this.isLoading = false
        }
        else{
          this.isLoading = false
          this.title = '查看表格'

          let params = {filename:localStorage.getItem('excel-filename')}
          let file_url = params.filename//'dtns://web3:'+rpc_client.roomid+'/file?filename='+params.filename
          let cachedFileItem = await ifileDb.getDataByKey(file_url)
          // console.log('download fast by ifileDb:',cachedFileItem)
          if(!cachedFileItem ) return this.$toast.fail('查看失败:XLS文件不存在');
          this.excel = cachedFileItem.data.filedata
          this.title = cachedFileItem.data.filename
        }
        this.url = 'static/js/office-js/vue-office/index.html'
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
      
      renderedHandler() {
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
  float: right;display: flex;
}
.right span{display: flex;margin-left:5px;margin-right: 5px;}
</style>
  