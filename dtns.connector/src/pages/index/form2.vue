<template>
    <div id="app1">
        <header class="topbar" style="border-bottom:1px solid #eee; height:56px; position:fixed; top:0; background-color:#fff; margin:0 auto; align:center; z-index:999;">
        <div style="margin:0 auto;height:56px;text-align:center">
          <span style="margin-left:24px; font-size:16px; line-height:56px;">表单设计器</span>
        </div>
        <div @click="back" style="position:absolute; line-height:44px;top:6px; left:15px;">
          <van-icon name="arrow-left" />
        </div>
      </header>
      <k-form-design ref="mykform" />
    </div>
  </template>
  <script>
      import jsonData  from  './datajson/formDefault.json' // { list: [{ "type": "input", "name": "单行文本", "options": { "width": "100%", "defaultValue": "", "placeholder": "请输入", "disabled": false }, "model": "input_1574002292465", "key": "input_1574002292465", "rules": [{ "required": false, "message": "必填项" }] }], "config": { "layout": "horizontal", "labelCol": { "span": 4 }, "wrapperCol": { "span": 18 }, "hideRequiredMark": false, "width": "100%", "marginTop": "0px", "marginRight": "0px", "marginBottom": "0px", "marginLeft": "0px" } }
      export default {
        data(){
          return {
          formData:null,
          url:'',ih:960
        }},
        created(){
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

          window.g_export_form_json_func = this.post
          // window.g_export_form_json_func = function(jsonData)
          // {
          //   console.log('form.vue-g_export_form_json_func-jsonData:',jsonData)
          // }
        },
        async mounted(){
          console.log('into form.vue mounted',jsonData,this.$refs.mykform,typeof this.$refs.mykform.setFormDesignConfig)
          // if(typeof this.$refs.mykform.setFormDesignConfig=='function')
          // this.$refs.mykform.setFormDesignConfig(jsonData)
          let file_url = localStorage.getItem('xform-url')
          let cachedFileItem = await ifileDb.getDataByKey(file_url)
          console.log('form2-xform-url:',file_url,cachedFileItem)
          if(!cachedFileItem ||!cachedFileItem.data){
            return 
          }
          try{
            let utf8decoder = new TextDecoder()
            let text =  utf8decoder.decode(cachedFileItem.data.filedata)
            let jsonR = JSON.parse(text)
            this.formData = jsonR && jsonR.json ? jsonR.json : jsonR
            this.$refs.mykform.data = this.formData//jsonData //有效
          }catch(ex)
          {
            console.log('form2-formData-exception:'+ex,ex)
          }
        },
        methods: {
          handleSubmit() {
          },
          back(){
            this.$router.back()
          },
          async post(jsonData)
          {
            console.log('form2.vue-post-jsonData:',jsonData)
            if(!jsonData) return this.$toast('上传的json文件不能为空！')

            const encoder = new TextEncoder();
            let u8arr = encoder.encode(JSON.stringify( {value:null,json:JSON.parse(jsonData)} ))
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

            console.log('form2.vue-xverse-File:',data.file)
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
                "xtype":"normal",
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
            imDb.addData({key:'dweb_poster_init_data',data:xvalue})
            localStorage.setItem('poster_type','xmsg')
            localStorage.setItem('poster_value','normal')//类型
            // if(this.now_label_type) localStorage.setItem('from_label_type',this.now_label_type)
            this.$router.push('/poster/xmsg')
          }
        }
      }
      // let vm = new Vue({
      //   el: '#app1',
      //   data: {
      //     jsonData
      //   },
      //   methods: {
      //     handleSubmit() {
      //     }
      //   }
      // })
    </script>
  <!-- <style scoped src="../../../static/js/lib/k-form-design.css"></style> -->
  <style lang="stylus" scoped>
  
  .topbar {
    position fixed
    top 0
    width 100%
    z-index 99
  }
  </style>