<template>
  <div>
    <div  @click="download(fileInfo)" style="display: inline-block;">
      <svg v-if="fileInfo.type=='folder'" t="1587623540548" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3894" :width="w" :height="h"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#7F46F3" p-id="3895"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#5634D0" p-id="3896"></path></svg>
      <svg v-else-if="!fileInfo.name || fileInfo.name.indexOf('.')<0" t="1587622837875" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2050" :width="w" :height="h"><path d="M510.462462 0H119.927928v1024h777.993994V372.084084" fill="#66A924" p-id="2051"></path><path d="M513.537538 0l3.075075 372.084084h387.459459L513.537538 0z" fill="#54831C" p-id="2052"></path></svg>
      <svg v-else-if="fileInfo.name.split('.')[1][0] === 'a'" t="1587622940022" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2312" :width="w" :height="h"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#F3C346" p-id="2313"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#C1932B" p-id="2314"></path></svg>
            <svg v-else-if="fileInfo.name.split('.')[1][0] === 'b'" t="1587623071394" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2444" :width="w" :height="h"><path d="M510.462462 0H119.927928v1024h777.993994V372.084084" fill="#F446A4" p-id="2445"></path><path d="M513.537538 0l3.075075 372.084084h387.459459L513.537538 0z" fill="#BC2A85" p-id="2446"></path></svg>
            <svg v-else-if="fileInfo.name.split('.')[1][0] === 'c'" t="1587623134223" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2840" :width="w" :height="h"><path d="M510.462462 0H119.927928v1024h777.993994V372.084084" fill="#FF7D02" p-id="2841"></path><path d="M513.537538 0l3.075075 372.084084h387.459459L513.537538 0z" fill="#D55D03" p-id="2842"></path></svg>
            <svg v-else-if="fileInfo.name.split('.')[1][0] === 'd'" t="1587622890499" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2182" :width="w" :height="h"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#2599F7" p-id="2183"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#2A73DD" p-id="2184"></path></svg>
            <svg v-else-if="fileInfo.name.split('.')[1][0] === 'e'" t="1587622837875" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2050" :width="w" :height="h"><path d="M510.462462 0H119.927928v1024h777.993994V372.084084" fill="#66A924" p-id="2051"></path><path d="M513.537538 0l3.075075 372.084084h387.459459L513.537538 0z" fill="#54831C" p-id="2052"></path></svg>
            <svg v-else-if="fileInfo.name.split('.')[1][0] === 'h'" t="1587623334311" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3368" :width="w" :height="h"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#F37746" p-id="3369"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#D05C3D" p-id="3370"></path></svg>
            <svg v-else-if="fileInfo.name.split('.')[1][0] === 'i'" t="1587623447702" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3632" :width="w" :height="h"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#F3C346" p-id="3633"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#C1932B" p-id="3634"></path></svg>
            <svg v-else-if="fileInfo.name.split('.')[1][0] === 'j'" t="1587623178388" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2972" :width="w" :height="h"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#E52940" p-id="2973"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#B52533" p-id="2974"></path></svg>
            <svg v-else-if="fileInfo.name.split('.')[1][0] === 'm'" t="1587623490323" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3764" :width="w" :height="h"><path d="M510.462462 0H119.927928v1024h777.993994V372.084084" fill="#D146F4" p-id="3765"></path><path d="M513.537538 0l3.075075 372.084084h387.459459L513.537538 0z" fill="#9C31C4" p-id="3766"></path></svg>
            <svg v-else-if="fileInfo.name.split('.')[1][0] === 'p'" t="1587623230401" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3104" :width="w" :height="h"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#EE4B4B" p-id="3105"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#C84343" p-id="3106"></path></svg>
            <svg v-else-if="fileInfo.name.split('.')[1][0] === 'r'" t="1587623609597" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4024" :width="w" :height="h"><path d="M510.462462 0H119.927928v1024h777.993994V372.084084" fill="#3D42FF" p-id="4025"></path><path d="M513.537538 0l3.075075 372.084084h387.459459L513.537538 0z" fill="#2A36D1" p-id="4026"></path></svg>
            <svg v-else-if="fileInfo.name.split('.')[1][0] === 'z'" t="1587622940022" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2312" :width="w" :height="h"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#F3C346" p-id="2313"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#C1932B" p-id="2314"></path></svg>
            <svg v-else t="1587623540548" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3894" :width="w" :height="h"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#7F46F3" p-id="3895"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#5634D0" p-id="3896"></path></svg>
        <!-- </div> -->
        {{ fileInfo.name || fileInfo.filename }}{{ fileInfo.file_kind=='aes256'?'🔒':'' }} &nbsp; {{ downloading }} &nbsp; {{ tips }} &nbsp; {{ radio }}
    </div>
    <div v-if="op_edit && fileInfo.name!='..'"  style="display: inline-block;">
      <span @click="deleteOP">删除</span>&nbsp; 
      <span @click="clearOP">清理</span>&nbsp; 
      <span @click="setPM">加锁🔒</span> &nbsp; 
      <span @click="copyOP">复制</span>&nbsp; <span @click="topOP">置顶</span>
    </div>
  </div>
</template>
<script>

export default {
    props: {
        value: {
            default: '12px',
            type: String
        },
        fileInfo:{
            default:null,
            type:Object
        },
        folder_id:{
          type:String,
          default:''
        },
        op_edit:{
          type:Boolean,
          default:false,
        }
    },
    data() {
        return {
            w:'12px',
            h:'12px',
            title:'',
            name:'',
            downloading:'',
            tips:'',
            radio:'',
        }
    },
    async created () {
      this.h = this.w = this.value
      this.title = this.fileInfo.name || this.fileInfo.filename
      this.name = this.fileInfo.name || this.fileInfo.filename
      
      this.showTips()
    },
    methods:{
        async setPM()
        {
          if(this.fileInfo.type == 'folder') return this.$toast('暂不能为文件夹设置权限')
          let fileInfo = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/file/info',{filename:this.fileInfo.url})
          console.log('file-item-setPM:',fileInfo)
          if(!fileInfo) return this.$toast('不能设置权限，查询文件信息失败！原因：'+(fileInfo?fileInfo.msg:'未知网络原因'))
          localStorage.setItem('poster_type','file.item')
          localStorage.setItem('poster_value',JSON.stringify(fileInfo))//类型
          this.$router.push('/poster/file.item')
        },
        async deleteOP()
        {
          if(!confirm('确定删除该文件（夹）?')) return 
          let file_id = this.fileInfo.type == 'folder' ? this.fileInfo.folder_id :this.fileInfo.url
          let params = {folder_id:this.folder_id,file_id}//user_id:localStorage.user_id,s_id:localStorage.s_id,
          let opRet = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/clouddisk/delete',params)
          if(opRet && opRet.ret){
            this.$toast('删除成功！')
            if(typeof g_refresh_folder =='function') g_refresh_folder()
            return
          } 
          else  return this.$toast('删除失败，原因：'+(opRet ? opRet.msg:'未知网络原因！'))
        },
        clearOP()
        {
          if(!confirm('确定清理缓存的文件吗？')) return ;
          g_downManager.clearOP(this.fileInfo.url)
          this.$toast('完成清理缓存文件！')
        },
        async topOP(){
          let file_id = this.fileInfo.type == 'folder' ? this.fileInfo.folder_id :this.fileInfo.url
          let params = {folder_id:this.folder_id,file_id}//user_id:localStorage.user_id,s_id:localStorage.s_id,
          let opRet = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/clouddisk/top',params)
          if(opRet && opRet.ret){
             this.$toast('置顶成功！请刷新文件夹')
             if(typeof g_refresh_folder =='function') g_refresh_folder()
             return
          } 
          else  return this.$toast('置顶失败，原因：'+(opRet ? opRet.msg:'未知网络原因！'))
        },
        async copyOP()
        {
          window.g_folder_copy_data = this.fileInfo
          setTimeout(()=>this.$toast('复制成功！请粘贴至其他文件夹'),300)
        },
        async showTips()
        {
          if(!this.fileInfo.url  || this.fileInfo.type == 'folder'){
            console.log('showTips fileInfo not file:',this.fileInfo.url,this.fileInfo)
            this.downloading = ''
            this.tips = ''
            this.radio = ''
            return false
          }

          let downloadManagerInfo = await g_downManager.getDownloadManagerInfo('dtns://web3:'+rpc_client.roomid+'/file/'+this.fileInfo.url)
          console.log('created-downloadManagerInfo:',downloadManagerInfo)
          if(downloadManagerInfo && downloadManagerInfo.down_file_info)
          {
            downloadManagerInfo.down_recved_slice_size = downloadManagerInfo.down_recved_slice_size ? downloadManagerInfo.down_recved_slice_size :0
            this.tips = Math.round( downloadManagerInfo.down_recved_slice_size*100.0 / downloadManagerInfo.down_file_info.size,2)+'%'
            this.downloading =  '['+(downloadManagerInfo.down_flag ? '下载中':'暂停下载')+']'
            if(downloadManagerInfo.down_file_info && downloadManagerInfo.down_flag)
            {
              let This = this 
              if(!this.tips_id)
              {
                this.last_size = 0
                this.tips_id =  setInterval(()=>{
                  This.tips = Math.round( downloadManagerInfo.down_recved_slice_size*100.0 / downloadManagerInfo.down_file_info.size,2)+'%'
                  // console.log('download-This.tips:',This.tips)
                  let subSize = downloadManagerInfo.down_recved_slice_size - This.last_size
                  if(subSize>=1024*1024)  This.radio =  Math.round((subSize)*1.0 / 1024 / 1024,2) +'MB/s'
                  else if(subSize>1024)  This.radio =  Math.round((subSize)*1.0 / 1024,2) +'KB/s'
                  else This.radio =  subSize +'B/s'
                  This.last_size = downloadManagerInfo.down_recved_slice_size
                },1000)
              }
              return true
            }else if(!downloadManagerInfo.down_flag&& this.tips_id)
            {
              clearInterval(this.tips_id)
              this.tips_id = null
              this.radio =''
              return false
            }
          }else{
            return false
          }
        },
        async download(item){//下载文件
          if(!item.url || item.type == 'folder'){
            console.log('fileItem not file:',item.url,item)
            this.showTips()
            return false
          }
          // this.iframeUrl = item.fileUrl
          //   console.log(item)
          // this.urlname = item.msg_info.body.filename
          ///file/download?user_id=`+localStorage.user_id+`&s_id=`+localStorage.s_id+`&filename=`+
          //list[i].msg_info.body.file_id+'&file_kind='+list[i].msg_info.body.fmt
          let This = this
          let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,
            filename:item.url,file_kind:'file'}
          
          let file_url = 'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.url
          let cachedFileItem = await ifileDb.getDataByKey(file_url)
          if(!cachedFileItem){
            if(g_downManager.isDownloading(file_url))
            {
              console.log('already download:'+item.url)
              let stopRet = await g_downManager.stop(file_url)
              console.log('g_downManager-stopRet:'+stopRet)
              this.showTips()
              return 
            }
            await g_downManager.download(file_url,params,async function(data){
              console.log('g_downManager.download-file-data:',data,data.data,data.data.buffer)
              if(data && data.data){
                console.log('download----data-len:'+data.data.length)
                This.tips = '100%'
                This.downloading = '[下载完成]'
                clearInterval(This.tips_id)
                This.tips_id = null
                This.radio = ''

                let aesWeb3key = item.web3key//await g_dchatManager.getDecryptWeb3Key(data.fileInfo.filename,This.chatWeb3Key)
                let filename = item.filename ? item.filename : item.name;//await g_dchatManager.decryptMsgInfo(data.fileInfo.filename,aesWeb3key)
                if(aesWeb3key && data.data)
                {
                  console.log('into-file-aes-decrypt:')
                  let {iv,aeskey} = sign_util.decodeWeb3keyAes256Str(aesWeb3key)
                  data.data = await sign_util.decryptMessage(await sign_util.importSecretKey(aeskey),iv,data.data.buffer,false)
                  console.log('download-aes-decrypted-len-new:'+data.data?data.data.length:0)
                  data.fileInfo.filename = filename
                }

                //特别针对的是.pop.zip和.xverse.zip
                let now_filename = filename
                let filedata = data.data
                if(filename.endsWith('.pop.zip') || filename.endsWith('.xverse.zip') 
                  || filename.endsWith('.xpaint.zip'))
                {
                  //解压zip文件
                  let zip = new JSZip();
                  let fileZip = await zip.loadAsync(data.data.buffer)//zip.file("tmp.txt",oldData)
                  console.log('fileItem.vue--fileZip:',fileZip)
                  let file = null;
                  for (let zfile in fileZip.files) {
                    file =fileZip.files[zfile] ;
                    break;
                  }
                  console.log('fileItem.vue--fileZip-file-0:',file)
                  now_filename = file.name
                  filedata =  await (file.async('uint8array'))
                  console.log('fileItem.vue--unzip-filedata:',filedata)
                }
                ifileDb.addData({key:file_url,data:{filename:now_filename,filedata:filedata,fileInfo:data.fileInfo}})//添加到缓存
                // data.fileInfo.filename = filename
                // ifileDb.addData({key:params.filename+'-fileInfo',data:data.fileInfo})
                //浏览器直接打开（pdf文件、图片等）
                // const e = new Blob([data.data], {
                //     type:data.fileInfo.mimetype//'application/'+cachedFileItem.data.fileInfo.fmt
                // })
                // // 将 Blob 对象转为 url
                // const link = window.URL.createObjectURL(e)
                // window.open(link,filename)

                rpc_client.downloadFileByBinary(filename,data.data)
              }else{
                This.$toast.fail('下载失败')
              }
            })
            setTimeout(async ()=>{
              let flag = await This.showTips()
              console.log('FileItem-download-file-setTimeout--showTips()-flag:',flag)
              if(!flag){
                setTimeout(()=>This.showTips(),100)
                setTimeout(()=>This.showTips(),200)
                setTimeout(()=>This.showTips(),500)
              }
            },60)
            // setTimeout(async ()=>{
            //   let stopRet = await g_downManager.stop('dtns://web3:'+rpc_client.roomid+'/file/'+params.filename)
            //   console.log('g_downManager-stopRet:'+stopRet)
            // },3000)//3秒后自动暂停(测试断点续传和缓存至ifileDb)
          }else{
            console.log('download fast by ifileDb:',cachedFileItem)
            // //浏览器直接打开（pdf文件、图片等）
            // const e = new Blob([cachedFileItem.data.filedata], {
            //     type:cachedFileItem.data.fileInfo.mimetype//'application/'+cachedFileItem.data.fileInfo.fmt
            // })
            // // 将 Blob 对象转为 url
            // const link = window.URL.createObjectURL(e)
            // window.open(link,cachedFileItem.data.filename)
            let result = cachedFileItem.data//{fileInfo:cachedFileItem.data.fileInfo}
            if(result.fileInfo && result.fileInfo.file_kind=='aes256')
            {
                let web3hash = result.fileInfo.file_lock_hash
                // web3key= await iWalletDb.getDataByKey('web3key_hash:'+aes256Hash)
                let web3key = await g_dchatManager.getWeb3Key(web3hash)
                if(!web3key)
                {
                    let queryLockWeb3keyRet = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/file/lock/get',{filename: result.fileInfo.obj_id})
                    console.log('FileItem-queryLockWeb3keyRet:',queryLockWeb3keyRet)
                    if(queryLockWeb3keyRet && queryLockWeb3keyRet.ret)
                    {
                        web3key = queryLockWeb3keyRet.web3key
                        web3hash= queryLockWeb3keyRet.web3hash
                        iWalletDb.addData({key:'web3key_hash:'+web3hash,data:web3key})
                    }
                }
                if(web3key){
                    let {iv,aeskey} = sign_util.decodeWeb3keyAes256Str(web3key)
                    let newData = await sign_util.decryptMessage(await sign_util.importSecretKey(aeskey),iv,result.filedata,false)
                    console.log('FileItem-decryptMessage-newData:',newData)
                    if(newData && newData.byteLength>0)
                    {
                        result.fileInfo.file_kind = 'open'
                        result.fileInfo.size = newData.byteLength
                        result.filedata = newData
                        console.log('FileItem-decryptMessage-success-and-save-to-ifileDb:',file_url,result)
                        g_downManager.clearOP(item.url)
                        ifileDb.addData({key:file_url,data:result})
                        // setTimeout(()=>,300)
                    }
                }else{
                  this.$toast('解密文件失败，预计无法正常预览该文件！')
                  console.log('解密文件失败，预计无法正常预览该文件！',file_url,result,web3hash,web3key)
                }
            }

            if(cachedFileItem.data.fileInfo.mimetype.indexOf('pdf')>0)
            {
              localStorage.setItem('pdf-filename',params.filename)
              This.$router.push('/pdf')
            }
            else if(cachedFileItem.data.fileInfo.mimetype.indexOf('sheet')>0 || cachedFileItem.data.fileInfo.mimetype.indexOf('excel')>0 )
            {
              localStorage.setItem('excel-filename',file_url)
              localStorage.setItem('excel-fileid',params.filename)
              This.$router.push('/excel')
            }

            else if(cachedFileItem.data.fileInfo.mimetype.indexOf('msword')>0 || cachedFileItem.data.fileInfo.mimetype.indexOf('word')>0 )
            {
              localStorage.setItem('docx-filename',file_url)
              localStorage.setItem('docx-fileid',params.filename)
              This.$router.push('/docx')
            }

            else if(cachedFileItem.data.fileInfo.mimetype.indexOf('presentation')>0)
            {
              localStorage.setItem('pptx-filename',file_url)//params.filename)
              This.$router.push('/pptx')
            }

            else if(cachedFileItem.data.fileInfo.mimetype.indexOf('image')>=0 )
            {
              localStorage.setItem('img-filename',params.filename)
              This.$router.push('/image')
            }
            else if(cachedFileItem.data.filename.indexOf('.md')>0 )
            {
              localStorage.setItem('md-filename',params.filename)
              This.$router.push('/md')
            }
            else if(cachedFileItem.data.filename.endsWith('.xdoc.json'))
            {
              let utf8decoder = new TextDecoder()
              let text =  utf8decoder.decode(cachedFileItem.data.filedata)
              console.log('FileItem-xdoc.json-text:',text,JSON.parse(text))
              window.ifileDb.deleteDataByKey('from.dtns.doc.creator.json');
              window.ifileDb.addData({key:'from.dtns.doc.creator.json',data:JSON.parse(text)})
              localStorage.setItem('xdoc-url',params.filename)
              This.$router.push('/xdoc')
            }
            else if(cachedFileItem.data.filename.endsWith('.fabric.json'))
            {
              let utf8decoder = new TextDecoder()
              let text =  utf8decoder.decode(cachedFileItem.data.filedata)
              console.log('FileItem-fabric.json-text:',text,JSON.parse(text))
              window.ifileDb.deleteDataByKey('from.dtns.fabric.creator.json');
              window.ifileDb.addData({key:'from.dtns.fabric.creator.json',data:{img:null,json:JSON.parse(text)}})
              localStorage.setItem('fabric-url',params.filename)
              This.$router.push('/fabric')
            }
            else if(cachedFileItem.data.filename.endsWith('.xcad.js'))
            {
              console.log('into xcad.js fileViewer---xcadViewer',cachedFileItem.data)
              let utf8decoder = new TextDecoder()
              let text =  utf8decoder.decode(cachedFileItem.data.filedata)
              console.log('FileItem-xcad.js-text:',text)
              // window.ifileDb.deleteDataByKey('from.dtns.doc.creator.json');
              // window.ifileDb.addData({key:'from.dtns.doc.creator.json',data:JSON.parse(text)})
              localStorage.setItem('jscad:script',text)
              localStorage.setItem('xcad-url',params.filename)
              This.$router.push('/xcad')
            }
            else if(cachedFileItem.data.filename.endsWith('.xdraw.json'))
            {
              let utf8decoder = new TextDecoder()
              let text =  utf8decoder.decode(cachedFileItem.data.filedata)
              let json = JSON.parse(text)
              console.log('FileItem-xdraw.json-text:',text,json,typeof filesDb)
              if(typeof filesDb!='undefined') console.log('filesDb.db:',filesDb.db)

              // window.ifileDb.deleteDataByKey('from.dtns.doc.creator.json');
              // window.ifileDb.addData({key:'from.dtns.doc.creator.json',data:JSON.parse(text)})
              try{
                localStorage.setItem('excalidraw',JSON.stringify(json.elements))
                let files = json.files
                for(const key in files)
                {
                  filesDb.addDataByKey(files[key],key)//添加到indexedDb
                  console.log('filesDb.addDataByKey:',key,files[key],filesDb.db)
                }
              }catch(ex)
              {
                console.log('excalidraw-files-exception:'+ex,ex)
                if((''+ex).startsWith('DataError'))
                {
                  // console.log('call filesDb.deleteObjectStore')
                  // let delRet = filesDb.deleteObjectStore()//删除自身
                  // console.log('filesDb.deleteObjectStore-delRet:',delRet)
                  console.log('[filesDb-Error]do the files-db upgrade failed?',filesDb)
                }
              }
              
              let excalidrawState = localStorage.getItem('excalidraw-state')
              if(excalidrawState)
              {
                try{
                  excalidrawState = JSON.parse(excalidrawState)
                }catch(ex)
                {
                  excalidrawState = {}
                  console.log('set excalidraw-state-failed-exception:'+ex,ex)
                }
              }else excalidrawState = {}
              let newExcalidrawState = Object.assign({},excalidrawState,json.appState ? json.appState :{})
              localStorage.setItem('excalidraw-state',JSON.stringify(newExcalidrawState))
              console.log('newExcalidrawState',newExcalidrawState,'excalidrawState',excalidrawState)

              ifileDb.deleteDataByKey('from.dtns.xdraw.creator.json')
              ifileDb.addData({key:'from.dtns.xdraw.creator.json',data:{base64:null,json:json}})
              localStorage.setItem('xdraw-url',params.filename)
              This.$router.push('/xdraw')
            }
            else if(cachedFileItem.data.filename.endsWith('.form.json'))
            {
              localStorage.setItem('xform-url',file_url)
              this.$router.push('/xform') //this.$router.push('/form')
            }
            //地图位置
            else if(cachedFileItem.data.filename.endsWith('.amap.json'))
            {
              let fileItem = null//'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.url//item.xpaint_src_dtns_url ? item.xpaint_src_dtns_url :item.xpaint_src_url
              try{
                  fileItem = JSON.parse(new TextDecoder().decode(cachedFileItem.data.filedata))
              }catch(ex){
                  console.log('json-parse-amap-xfile-failed:'+ex,ex)
                  return this.$toast('解析[地图位置]json源文件失败！')
              }
              localStorage.setItem('location',JSON.stringify(fileItem))
              this.$router.push('/lm') //this.$router.push('/form')
            }
            else if(cachedFileItem.data.filename.endsWith('.link.json'))
            {
              let fileItem = null//'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.url//item.xpaint_src_dtns_url ? item.xpaint_src_dtns_url :item.xpaint_src_url
              try{
                  fileItem = JSON.parse(new TextDecoder().decode(cachedFileItem.data.filedata))
              }catch(ex){
                  console.log('json-parse-news-link-xfile-failed:'+ex,ex)
                  return this.$toast('解析[网址链接]json源文件失败！')
              }
              localStorage.setItem('goto-http',JSON.stringify(fileItem))
              this.$router.push('/http') //this.$router.push('/form')
            }
            else if(cachedFileItem.data.filename.endsWith('.pop.json'))
            {
              let fileItem = null//'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.url//item.xpaint_src_dtns_url ? item.xpaint_src_dtns_url :item.xpaint_src_url
              try{
                  fileItem = JSON.parse(new TextDecoder().decode(cachedFileItem.data.filedata))
              }catch(ex){
                  console.log('json-parse-pop-xfile-failed:'+ex,ex)
                  return this.$toast('解析xpaint源文件失败！')
              }
              localStorage.setItem('canvasData',JSON.stringify(fileItem.data))
              localStorage.setItem('canvasStyle',JSON.stringify(fileItem.style))
              localStorage.setItem('pop-filename',params.filename)//以便复制
              this.$router.push('/3d/creator')
            }
            else if(cachedFileItem.data.filename.endsWith('.xpaint.json'))
            {
              let fileItem = null//'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.url//item.xpaint_src_dtns_url ? item.xpaint_src_dtns_url :item.xpaint_src_url
              try{
                  fileItem = JSON.parse(new TextDecoder().decode(cachedFileItem.data.filedata))
              }catch(ex){
                  console.log('json-parse-xpaint-xfile-failed:'+ex,ex)
                  return this.$toast('解析xpaint源文件失败！')
              }
              ifileDb.deleteDataByKey('from.dtns.design.json')
              ifileDb.addData({key:'from.dtns.design.json',data:fileItem})
              localStorage.setItem('xpaint-filename',params.filename)//以便复制
              this.$router.push('/design')
            }
            else if(cachedFileItem.data.filename.endsWith('.xverse.json'))
            {
              let fileItem = null//'dtns://web3:'+rpc_client.roomid+'/file?filename='+item.url//item.xpaint_src_dtns_url ? item.xpaint_src_dtns_url :item.xpaint_src_url
              try{
                  fileItem = JSON.parse(new TextDecoder().decode(cachedFileItem.data.filedata))
              }catch(ex){
                  console.log('json-parse-xverse-xfile-failed:'+ex,ex)
                  return this.$toast('解析xverse源文件失败！')
              }
              ifileDb.deleteDataByKey('from.dtns.3d.creator.json')
              ifileDb.addData({key:'from.dtns.3d.creator.json',data:fileItem})
              localStorage.setItem('xverse-filename',params.filename)//以便复制

              let xvalue = {
                "xtype":"xverse",
                "xmsg": "我分享的xverse轻应用（文件）",
                //独立的内容位置，不占用图片
                'xverse_src_url':params.filename,
                'xverse_src_dtns_url':'dtns://web3:'+rpc_client.roomid+'/file?filename='+params.filename
              }
              imDb.deleteDataByKey('from.dtns.xverse.xmsg')
              imDb.addData({key:'from.dtns.xverse.xmsg',data:xvalue})

              this.$router.push('/3de')
            }
            else if(cachedFileItem.data.filename.endsWith('.dpkg'))
            {
              //开始解析dpkg-zip文件，然后打开和加载之
              let This = this
              let zip = new JSZip();
              let fileZip = await zip.loadAsync(cachedFileItem.data.filedata)
              let zipResMap = new Map()
              for (let zfile in fileZip.files) {
                  let file =fileZip.files[zfile] ;
                  console.log('jszip-unzip-dpkg-file:',file)
                  zipResMap.set(file.name,file) 
              }
              let fileData = await zipResMap.get('index.json').async('uint8array')
              let jsfileBlob = await zipResMap.get('index.js').async('blob')
              let utf8decoder = new TextDecoder()
              let text =  utf8decoder.decode(fileData)
              let indexJson = JSON.parse(text)
              // if( window.g_existsFilePlugins.has(file_url) )// window['dpkg:'+file_url]) //cachedFileItem.data.filename
              if(window.g_user_plugins_file_url == file_url)
              {
                loadXPlugins(indexJson,file_url)
                This.$router.push(indexJson[0].wordPath)
                return
              }
              // let jstext =  utf8decoder.decode(jsfileData)
              let jsfileURI = window.URL.createObjectURL(jsfileBlob)

              var scriptEle = document.createElement('script')
              scriptEle.src =  jsfileURI//'static/kform/lib/k-form-design.umd.min.js'//'static/js/lib/k-form-design.umd.min.js'
              scriptEle.onload = function() {
                  console.log('js-dpkg加载完了')
                  if(typeof loadXPlugins=='function'){
                    console.log('loadXPlugins:',indexJson)
                    loadXPlugins(indexJson,file_url)
                    This.$toast('加载dpkg插件成功！')
                    window.g_user_plugins_file_url = file_url
                    // window['dpkg:'+file_url]= true //cachedFileItem.data.filename
                    if(indexJson[0].res_id)
                    {
                      window[indexJson[0].res_id] = zipResMap //保存至全局变量中，方便目标页面引用这个资源包的资源（例如图片等）
                    }
                    setTimeout(()=>This.$router.push(indexJson[0].wordPath),1000)
                  }
              }
              document.body.appendChild(scriptEle)
            }
            else if(cachedFileItem.data.filename.endsWith('.dxib'))
            {
              //默认以index.json来启动，如果不行，则下载文件
              let strs = ['','1','2','3','4','5']
              let flag = false
              for(let i=0;i<strs.length;i++)
              {
                try{
                  let dxibItem = {index:'index'+strs[i]+'.json',xtype:'dxib',dxib_url:file_url,xmsg:cachedFileItem.data.filename,name:cachedFileItem.data.filename}
                  let dxibManager =  new DXIBManager(dxibItem)
                  let cnt = await dxibManager.loadRes()
                  console.log('comeDXIB-DXIBManager-loadRes-cnt:',cnt)
                  dxibManager.dxibObj = Object.assign({},dxibItem,{...dxibManager.getIndexJson()})
                  delete dxibManager.dxibObj.actions //清理掉无关紧要的
                  dxibManager.dxibObj.dxib_url = file_url

                  let ret = await dxibManager.start(this)
                  console.log('dxibItem-'+i+'ret:',ret)
                  flag = ret
                  if(ret) break
                }catch(ex)
                {
                  console.log('file-item-load-dxibManager-exception-ex:'+ex,ex)
                }
              }
              //不管是否正常启动，均直接
              if(!flag)
              rpc_client.downloadFileByBinary(cachedFileItem.data.filename,cachedFileItem.data.filedata)
            }
            else if(cachedFileItem.data.fileInfo.mimetype.indexOf('text')==0 )
            /*
            cachedFileItem.data.filename.indexOf('.json')>0||cachedFileItem.data.filename.indexOf('.txt')>0||
            cachedFileItem.data.filename.indexOf('.html')>0||cachedFileItem.data.filename.indexOf('.js')>0||
            cachedFileItem.data.filename.indexOf('.htm')>0 ||cachedFileItem.data.filename.indexOf('.java')>0*/
            {
              localStorage.setItem('text-filename',params.filename)
              This.$router.push('/text')
            }
            else if(cachedFileItem.data.fileInfo.mimetype.indexOf('video')>=0  
              || cachedFileItem.data.fileInfo.mimetype.indexOf('audio')>=0)
            {
              localStorage.setItem('video-filename',params.filename)
              This.$router.push('/video')
            }
            //再次判断是否是文本内容
            else if(cachedFileItem.data.filedata.byteLength<=1024*1024*7)
            {
              let utf8decoder = new TextDecoder()
              let text =  utf8decoder.decode(cachedFileItem.data.filedata)
              let encoder = new TextEncoder()
              let uint8Array = encoder.encode(text)
              console.log('text-coder-encoder:',text.length,uint8Array,cachedFileItem.data.filedata)
              //经检测为文本
              if(uint8Array.length == cachedFileItem.data.filedata.byteLength)
              {
                localStorage.setItem('text-filename',params.filename)
                This.$router.push('/text')
              }else{
                rpc_client.downloadFileByBinary(cachedFileItem.data.filename,cachedFileItem.data.filedata)
              }
            }else{
              rpc_client.downloadFileByBinary(cachedFileItem.data.filename,cachedFileItem.data.filedata)
            }
          }
          return false
        },
    }
}
</script>
