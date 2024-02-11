<template>
    <div>
      <div class="app-header">
        <span @click="back"> ❮返回 </span> &nbsp;
        <template v-if="isLoading"> Loading... </template>
        
        <template v-else>
          <span>{{ title }}</span>
          <!-- <span @click="download">下载文件</span>
          <span @click="rotationAdd"> 旋转rolate </span> &nbsp;
          <span @click="scaleAdd"> 放大max </span> &nbsp;
          <span @click="scaleSub"> 缩小min </span> &nbsp;
          <span v-if="showAllPages"> {{ pageCount }} 页page(s) </span>
    
          <span v-else>
            <button :disabled="page <= 1" @click="page--">❮</button>
    
            {{ page }} / {{ pageCount }}
    
            <button :disabled="page >= pageCount" @click="page++">❯</button>
          </span> -->
    
          <!-- <label class="right">
            <input v-model="showAllPages" type="checkbox" />
    
            显示所有页Show all pages
          </label> -->
        </template>
      </div>
    
      <div v-if="typeof xitem!=undefined" class="app-content" style="width:100%;float:left; margin-top:3px;position:relative;">
          <PopComponent style="width:100%;" :xitem="xitem" :zoom="1" :fullWidth="fullWidth">
          </PopComponent>
      </div>
    </div>
  </template>
  
  <script>
//   import VuePdfEmbed from 'vue-pdf-embed'
  
  // OR THE FOLLOWING IMPORT FOR VUE 2
//   import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
import { getStyle, getCanvasStyle } from '@/utils/style'
import { changeStyleWithScale } from '@/utils/translate'
// import ComponentWrapper from '@/components/Item/ComponentWrapper'
import PopComponent from '@/components/Item/PopComponent'
import popUserInfoJson from '../datajson/popUserInfo.json'
  export default {
    components: {
        PopComponent
    },
    data() {
      return {
        isLoading: true,
        page: null,
        pageCount: 1,
        pdfSource:null,
        scale:5,
        rotation:0,
       //   'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
        showAllPages: true,
        title:'',
        fullWidth:window.fullWidth,
        xitem:null,
      }
    },
    watch: {
      showAllPages() {
        this.page = this.showAllPages ? null : 1
      }
    },
    async created(){
        this.isLoading = false
        this.title='popViewer'
        //重新获得全屏宽度，以便zoom计算MsgItem的宽度缩放比
        let This = this
        this.onresize = () => {
          return (() => {
            window.fullWidth = document.documentElement.clientWidth;
            This.fullWidth = fullWidth
            console.log('window.fullWidth:'+fullWidth)
            console.log('this.isFull:'+This.isFull)
          })();
        };
        this.onresize()
        window.addEventListener('resize',this.onresize,true)

        let userInfoJsonStr = JSON.stringify(popUserInfoJson)
        userInfoJsonStr = userInfoJsonStr.replace('$user_id',localStorage.user_id)
        this.xitem = JSON.parse(userInfoJsonStr)
    },
    methods: {
        getStyle,
        getCanvasStyle,
        changeStyleWithScale,
        back(){
            this.$router.go(-1)
        },
      download(){
        rpc_client.downloadFileByBinary(this.title,this.pdfSource)
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
      
      handleDocumentRender(args) {
        console.log(args)
        this.isLoading = false
        this.pageCount = this.$refs.pdfRef.pageCount
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
}
</style>
  