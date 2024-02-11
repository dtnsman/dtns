<template>
    <div>
    <div class="app-header">
      <span @click="back"> ❮返回 </span> &nbsp;
      <template v-if="isLoading"> Loading... </template>
      <template v-else><span>{{ title }}</span>
        <label class="right">
          <span @click="op_edit=!op_edit">{{op_edit?'退出编辑':'编辑'}}</span>
          <span @click="pasteOP">粘贴</span>
          <span @click="createDXIB">合成dxib</span>
          <span @click="shareFolder">分享</span>
          <span @click="addFolder">新建</span>
          <span  @click="addFile">添加</span>
        </label>
      </template>
    </div>
  
    <div class="app-content" v-if="okFlag">
        <file-list :folder="folderInfo" :edit_op="op_edit"></file-list>
    </div>
    </div>
  </template>
  
  <script>
import FileList from '../../../components/file/FileList.vue'
import toolbarJson from '../datajson/toolbar.json'
  
  export default {
    name: 'folder',
    components: {
        FileList
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
        folderInfo:null,
        now_folder:null,
        op_edit:false,
      }
    },
    watch: {
      showAllPages() {
        this.page = this.showAllPages ? null : 1
      }
    },
    async created(){
      this.start()
    },
    activated(){
        console.log('into folderViewer activated:')
        if(!this.folderInfo){
          this.start()
        }
    },
    methods: {
        back(){
          this.folderInfo  = null;//Object.assign({},this.folderInfo)
          this.okFlag = false
          this.isLoading = true
          this.title = ''
          this.$router.go(-1)
          // setTimeout(()=>this.$router.go(-1),100)
        },
      async start()
      {
        let This = this
        let queryMyFolder = await this.$api.network.clouddiskFolderMy({user_id:localStorage.user_id,s_id:localStorage.s_id})
        if(!queryMyFolder || !queryMyFolder.ret || !queryMyFolder.folderInfo) return this.$toast('查询我的文件夹信息失败，原因：'+(queryMyFolder?queryMyFolder.msg:'未知网络原因'))
        queryMyFolder.folderInfo.updateNowFolderFunc = function(item){
          This.now_folder = item
          This.title = item.origin_name? item.origin_name: item.name
        }
        this.folderInfo = queryMyFolder.folderInfo
        this.okFlag = true
        this.isLoading  =false
        this.title = this.folderInfo.name
      },
      async pasteOP(){
        let ditem = window.g_folder_copy_data ? g_folder_copy_data : null
        if(!ditem) return this.$toast('请先进入编辑模式【复制】文件或文件夹！')
        if(!ditem.url){
          return console.log('paseOP-item-url is null ', ditem)
        }

        //针对dxib等的场景下复制的dtns-url指向的文件
        if(ditem.url.startsWith('dtns://'))
        {
          let result =  g_dtnsManager.nslookupIB3ID(ditem.url)
          if(!result) return this.$toast('无法识别复制粘贴的dtns-url链接')
          if(result.web3name!=rpc_client.roomid) return this.$toast('暂时无法跨节点复制dtns-url指向的文件！')
          ditem.dtns_url = ditem.url
          if(!result.params || !result.params.filename) return this.$toast('无法识别复制粘贴的dtns-url链接，文件ID为空')
          ditem.url = result.params.filename
        }

        if(!this.now_folder || !this.now_folder.folder_id)
        return console.log('paseOP-now-folder is null ', this.now_folder)
        let ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/clouddisk/folder/file/add',
          {folder_id:this.now_folder.folder_id,file_id:ditem.url})
        if(ret && ret.ret){
          this.$toast('粘贴成功，请刷新当前文件夹！')
          if(typeof g_refresh_folder == 'function') g_refresh_folder()
          window.g_folder_copy_data  = null
          return 
        }else{
          this.$toast('粘贴失败，原因：'+(ret ? ret.msg:'未知网络原因'))
        }
      },
      addFile(){
        localStorage.setItem('poster_type','folder_add_files')
        localStorage.setItem('poster_value',this.now_folder && this.now_folder.folder_id ? this.now_folder.folder_id:  this.folderInfo.folder_id)
        this.$router.push('/poster/folder_add_files')
      },
      addFolder(){
        localStorage.setItem('poster_type','folder_new')
        localStorage.setItem('poster_value',this.now_folder && this.now_folder.folder_id ? this.now_folder.folder_id:  this.folderInfo.folder_id)
        this.$router.push('/poster/folder_new')
      },
      async shareFolder()
      {
        // let {user_id, s_id,chatid,xtype,xmsg,p_xmsgid,xobj,random,good_fee}
        let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,xtype:'folder',
          xmsg:this.title,xobj:JSON.stringify(this.now_folder),random:Math.random()}
        let ret = await this.$api.network.sendXMSG(params)
        if(!ret || !ret.ret) return this.$toast('分享失败，原因：'+(ret && ret.msg ? ret.msg:'未知网络原因'))
        this.$toast('分享成功！1秒后将自动跳转至头榜...')
        localStorage.setItem('newDWebFlag','1')
        setTimeout(()=>this.$router.push('/dweb'),1000)
      },
      async createDXIB(){
        let intoFolderRet = await this.$api.network.clouddiskFiles({folder_id:this.now_folder.folder_id})
        if(intoFolderRet  && intoFolderRet.ret && intoFolderRet.list && intoFolderRet.list.length>0)
        {
          this.list = intoFolderRet.list
        }else{
          this.list = null
          return this.$toast('文件夹为空，无法合成dxib应用！')
        }
        console.log('createDXIB-this.list:',this.list)
        //生成actions和dxib的obj对象
        //遍历第一次（形成actions-files）
        let actions = []
        let logoUrl = null
        let imgUrl = null
        // let indexJSONUrl = 'index.json'
        let mainName = null
        let xmsg = this.title
        let endedActions = new Map()
        //合并folder
        for(let i=0;i<this.list.length;i++)
        {
          let item = this.list[i]
          if(item.type == 'folder')
          {
            intoFolderRet = await this.$api.network.clouddiskFiles({folder_id:item.folder_id})
            if(intoFolderRet  && intoFolderRet.ret && intoFolderRet.list && intoFolderRet.list.length>0)
            {
              this.list = this.list.concat(intoFolderRet.list) //追加到末尾
            }else{
              console.log('query-sub-folder-failed:',intoFolderRet,item.folder_id)
            }
          }
        }
        let toolbarExistFlag = false
        //进行生成dxib操作--actions和logoUrl、imgUrl、mainName等
        for(let i=0;i<this.list.length;i++)
        {
          let item = this.list[i]
          if(item.type == 'folder') continue //暂时无法处理文件夹（避免死循环）
          //处理文件
          let filename = item.filename
          let mimetype = item.mimetype ? item.mimetype:''

          let addAction = null
          if(mimetype && mimetype.startsWith('image/'))
          {
            if(!logoUrl && filename.startsWith('logo')) logoUrl = 'dtns://web3:'+rpc_client.roomid+'/image/view?filename='+item.obj_id+'&img_kind=open'
            else{
              //11-10新增图片项目
              addAction = {
                name:'@'+filename.substring(0,filename.indexOf('.')),
                url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,//用于文件下载
                img_url: 'dtns://web3:'+rpc_client.roomid+'/image/view?filename='+item.obj_id+'&img_kind=open',
                xtype:'image',
                // deps:[],
                history:true
              }
            }
            if(!imgUrl) imgUrl = 'dtns://web3:'+rpc_client.roomid+'/image/view?filename='+item.obj_id+'&img_kind=open'
          }
          if(filename.endsWith('.xverse.zip') || filename.endsWith('.xverse.json'))
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'xverse',
              // deps:[],
              history:true
            }
          }
          else if(filename.endsWith('.pop.zip') || filename.endsWith('.pop.json'))
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'minicard',
              // deps:[],
              history:true
            }
          }
          //新增包含了mp3等语音
          else if(mimetype && (mimetype.startsWith('video/') || mimetype.startsWith('audio') ))
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'video',
              ended:null, //有视频结束的mini-card
              // deps:[],
              history:true
            }
          }
          //pdf
          else if(mimetype && mimetype.indexOf('pdf')>=0 )
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'pdf',
              // deps:[],
              history:true
            }
          }
          else if(mimetype && (mimetype.indexOf('sheet')>0 || mimetype.indexOf('excel')>0 ) )
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'excel',
              // deps:[],
              history:true
            }
          }
          else if(mimetype && (mimetype.indexOf('msword')>0 || mimetype.indexOf('word')>0 ) )
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'docx',
              // deps:[],
              history:true
            }
          }

          else if( mimetype && mimetype.indexOf('presentation')>0)
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'pptx',
              // deps:[],
              history:true
            }
          }
          else if(filename && filename.endsWith('.xcad.js'))
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'xcad',
              // deps:[],
              history:true
            }
          }
          else if(filename && filename.endsWith('.xdraw.json'))
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'xdraw',
              // deps:[],
              history:true
            }
          }
          else if(filename && ( filename.endsWith('.xpaint.json') || filename.endsWith('.xpaint.zip')))
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'xpaint',
              // deps:[],
              history:true
            }
          }
          //md
          else if(filename && filename.indexOf('.md')>=0)
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'md',
              // deps:[],
              history:true
            }
          }
          else if(filename && filename.endsWith('.form.json'))
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'xform',
              // deps:[],
              history:true
            }
          }
          else if(filename && filename.endsWith('.xdoc.json'))
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'xdoc',
              // deps:[],
              history:true
            }
          }
          else if(filename && filename.endsWith('.fabric.json'))
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'fabric',
              // deps:[],
              history:true
            }
          }
          else if(filename && filename.endsWith('.amap.json'))
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'amap.location',
              // deps:[],
              history:true
            }
          }
          else if(filename && filename.endsWith('.link.json'))
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'link',
              // deps:[],
              history:true
            }
          }
          //支持了打开跨dxib应用的能力！
          else if(filename && filename.endsWith('.dxib'))
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'dxib',
              // deps:[],
              history:true //false //务必是false，不能记录入history中（否则会有BUG）
            }
          }
          //text含js等
          else if(mimetype && mimetype.indexOf('text')==0 || filename.endsWith('.json') )
          {
            addAction = {
              name:'@'+filename.substring(0,filename.indexOf('.')),
              url:'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.obj_id,
              xtype:'text',
              // deps:[],
              history:true
            }
          }
          if(!addAction) continue

          //生成ended
          //#1当前的action-name带有ended---判断actions列表中是否已经有对应的主action
          if(addAction.name.endsWith('_ended'))
          {
            for(let x=0;x<actions.length;x++)
            {
              if(addAction.name == actions[x].name+'_ended')
              {
                actions[x].ended = addAction.name
              }
            }
          }
          //#2 ended-action已经在map中了，当前的action为主
          if(endedActions.has(addAction.name+'_ended'))
          {
            addAction.ended = addAction.name+'_ended'// endedActions.get(addAction.name+'_ended')
          }

          //生成deps（可以不用生成）
          //添加新的action
          actions.push(addAction)
          if(addAction.name.endsWith('_ended')) //备份到endedActions列表中
          {
            endedActions.set(addAction.name,addAction)
          }
          
          if(addAction && addAction.name == '@main' ) mainName = addAction.name //存在@main，优先使用@main
          if(!mainName && addAction && addAction.name.startsWith('@main')) mainName = addAction.name
          //如果包含了.0h.的文件名，则代表不使用history（问题：是否在filename中编码deps？哈哈）
          if(filename.indexOf('.0h.')>=0) addAction.history = false
          else addAction.history = true
          if(addAction.name=='@toolbar') toolbarExistFlag = true //用于判断是否需自动生成toolbar
        }//end the for

        if(actions && actions.length<1)
        {
          return this.$toast('合成dxib应用失败，生成的页面列表actions为空！')
        }

        //确保能获取到mainName
        if(!mainName){
          mainName = actions[0].name
        }
        //确保能获取到logo
        if(!logoUrl){
          logoUrl = imgUrl
        }

        //生成dxib对象
        let dxibObj = {
          "main":mainName,
          "index":'index.json',
          "name":xmsg,
          "xmsg":xmsg, 
          "logo":logoUrl, 
          "xtype":"dxib",
          "dxib_url":null,//暂时不可知
          actions
        }
        console.log('folderViewer.vue-dxibObj:',dxibObj)
        //生成一个xxxx.dxib文件
        let dxibFilename = this.title+'.dxib'
        let zip = new JSZip();
        //自动集成默认的toolbar
        if(!toolbarExistFlag && actions && actions.length>1 && confirm('是否自动配置toolbar工具条（建议是）？'))
        {
          actions.push({
              name:'@toolbar',
              url:'toolbar.json', //直接引用.dxib文件zip压缩包中的文件（不使用dtns://协议指向）
              xtype:'minicard',
              history:false
          })
          zip.file('toolbar.json',JSON.stringify(toolbarJson))//配置第一个文件
        }
        zip.file('index.json',JSON.stringify(dxibObj))//配置index.json文件
        //生成blob以上传文件
        let zipFileBlob = await zip.generateAsync({type:"blob",compression: "DEFLATE", 
            compressionOptions: {
              level: 1 
            }})
        console.log('folderViewer.vue--dxib-sendXMSG->zipFileBlob:',zipFileBlob)
        let data = {file:zipFileBlob}
        let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:dxibFilename,
          mimetype:data.file.type,filename:dxibFilename,path:'file-path',
          size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
          file_kind:'file',random:Math.random(),data:data.file}

        console.log('folderViewer-dxib-File:',data.file)
        let res = await new Promise((resolve)=>{
          rpc_client.sendFile(fileInfo,function(udata){
              console.log('sendFile-callback-data:'+JSON.stringify(udata))
              if(udata && udata.data) resolve(udata.data)
              else resolve(null)
          })
        })
        console.log('send-dxib-file-res:',res)
        if(!res || !res.ret){
          return this.$toast.fail('上传dxib应用文件失败' +(res ?res.msg:'未知网络错误'),3000)
        }
        //发送头榜
        let dxib_url = 'dtns://web3:'+rpc_client.roomid+'/file?filename='+res.filename
        dxibObj.dxib_url = dxib_url //dxib资源URL（指向的是一个zip-dtns-url文件）
        delete dxibObj.actions
        //发送头榜
        imDb.deleteDataByKey('dweb_poster_init_data')
        imDb.addData({key:'dweb_poster_init_data',data:dxibObj})
        localStorage.setItem('poster_type','xmsg')
        localStorage.setItem('poster_value','dxib')//类型
        this.$router.push('/poster/xmsg')
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
.right span{display: flex;margin-left:5px;margin-right:5px}
</style>