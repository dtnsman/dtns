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
          <span @click="edit">编辑</span>
          <span @click="getData">发布</span>
        </label>
      </template>
    </div>
  
    <div class="app-content">
        <!-- <img v-if="this.dxib" width="100%" :src="src"/>  v-else  -->
        <!-- <img width="100%" v-lazy="src"/> -->
        <k-form-build v-if="formJson" ref="KFB" :value="formJson" :defaultValue="formValue" @submit="handleSubmit"  ></k-form-build>
    </div>
    </div>
  </template>
  
  <script>
  import DXIBOPBanner from '../../../components/item/DXIBOPBanner.vue'
  export default {
    name:'xform',
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
        formJson:null,
        formValue:null,
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
      this.p_xmsgid = localStorage.getItem('p_xmsgid')
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


          this.dxibName = !this.dxibManager.getDXIBObj() ?  'xform表单': this.dxibManager.getDXIBObj().xmsg ? this.dxibManager.getDXIBObj().xmsg : this.dxibManager.getDXIBObj().name
          this.title = this.actionInfo.xmsg ? this.actionInfo.xmsg : this.dxibName +'-'+ this.actionInfo.name //this.dxibManager.getDXIBObj() ?this.dxibManager.getDXIBObj().xmsg: 'dxib视频播放'
          this.filedata= await this.dxibManager.loadActionResFile(this.actionInfo)
          this.xform_url = this.actionInfo.url
          try{
            let utf8decoder = new TextDecoder()
            let text =  utf8decoder.decode(this.filedata)
            let jsonR = JSON.parse(text)
            this.formJson = jsonR && jsonR.json ? jsonR.json : jsonR
            this.formValue= jsonR && jsonR.value? jsonR.value: null
          }catch(ex)
          {
            console.log('xform-formData-exception:'+ex,ex)
          }
          this.isLoading =false
        }
        else{
          this.isLoading = false
          this.title = 'xform表单'

          let file_url = localStorage.getItem('xform-url')//'dtns://web3:'+rpc_client.roomid+'/file?filename='+params.filename
          this.xform_url = file_url
          let cachedFileItem = await ifileDb.getDataByKey(file_url)
          // let cachedFileItem = await ifileDb.getDataByKey(params.filename)//await ifileDb.getDataByKey(params.filename)
          console.log('download fast by ifileDb:',cachedFileItem)
          if(!cachedFileItem || !cachedFileItem.data){
              this.isLoading = false
              return this.$toast.fail('查看失败:xform表单文件不存在');
          }
          try{
            let utf8decoder = new TextDecoder()
            let text =  utf8decoder.decode(cachedFileItem.data.filedata)
            let jsonR = JSON.parse(text)
            this.formJson = jsonR && jsonR.json ? jsonR.json : jsonR
            this.formValue= jsonR && jsonR.value? jsonR.value: null
          }catch(ex)
          {
            console.log('xform-formData-exception:'+ex,ex)
          }
          this.title = cachedFileItem.data.filename ? cachedFileItem.data.filename : 
            (cachedFileItem.data.fileInfo ? cachedFileItem.data.fileInfo.filename: this.title)
          this.filedata=cachedFileItem.data.filedata
        }
      },
      async post(jsonData,xformRes)
      {
        console.log('form2.vue-post-jsonData:',jsonData,xformRes)
        if(!jsonData) return this.$toast('上传的json文件不能为空！')

        const encoder = new TextEncoder();
        let u8arr = encoder.encode(JSON.stringify( {value:xformRes,json:jsonData} ))
        if(u8arr.byteLength >= 500*1024 && !confirm('确定上传xform表单文件吗？大小为：'+(Math.round(u8arr.byteLength*1.0/1024/1024,2)+'MB')))
        {
            return ;
        }
        let file = new File([u8arr], filename, {type: 'application/json'});

        let filename = '表单文件-'+Date.now()+'.form.json'
        let data = {file}
        let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:filename,
            mimetype:data.file.type,filename,path:'file-path',
            size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
            file_kind:'file',random:Math.random(),data:data.file}

        console.log('form2.vue-send-File:',data.file)
        let res = await new Promise((resolve)=>{
            rpc_client.sendFile(fileInfo,function(udata){
                console.log('sendFile-callback-data:'+JSON.stringify(udata))
                if(udata && udata.data) resolve(udata.data)
                else resolve(null)
            })
        })

        console.log('send-xform-file-res:',res)
        if(!res || !res.ret){
            return this.$toast.fail('上传xform的表单json文件失败' +(res ?res.msg:'未知网络错误'),3000)
        }
        let xvalue = {
            "xtype": "normal",
            "xmsg": "我分享的xform表单文件",
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
        if(this.p_xmsgid)
        {
          xvalue.xtype = 'reply'
          xvalue.p_xmsgid = this.p_xmsgid //关联父xmsg（使之评论之）
        }
        imDb.addData({key:'dweb_poster_init_data',data:xvalue})
        localStorage.setItem('poster_type','xmsg')
        localStorage.setItem('poster_value','normal')//类型
        // if(this.now_label_type) localStorage.setItem('from_label_type',this.now_label_type)
        this.$router.push('/poster/xmsg')
      },
      handleSubmit(p) {
        let This = this
          // 通过表单提交按钮触发，获取promise对象
          p().then(async (res) => {
            // 获取数据成功
            // alert(JSON.stringify(res))
            This.post(res)
          })
            .catch(err => {
              console.log(err, '校验失败')
            })
      },
      getData() {
        // if(this.share_xmsg)
        // {
        //     this.cancelDWeb()
        //     return 
        // }
        
        let This = this
        // 通过函数获取数据
        this.$refs.KFB.getData().then(res => {
        // 获取数据成功
        //alert(JSON.stringify(res))
          console.log('xform-getData-this.p_xmsgid:',This.p_xmsgid,res)
          // if(This.p_xmsgid)
          //  res.p_xmsgid = This.p_xmsgid
          This.post(This.formJson,res)
        })
        .catch(err => {
            console.log(err, '校验失败')
        })
      },
      edit()
      {
        localStorage.setItem('xform-url',this.xform_url)
        this.$router.push('/form')
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
          if(!localStorage.getItem('xform-url')) return this.$toast('无法复制文件，该文件URL为空！')
          window.g_folder_copy_data = {url:localStorage.getItem('xform-url')}
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