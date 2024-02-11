<template>
<ul class="filelist">
              <!-- @click="openPicViewer(eachPic.url)" -->
    <li v-for="(eachFile,index) in list">
        <div  @click="visitFolder(eachFile,false,true)">
        <file-item :fileInfo="eachFile" :op_edit="edit_op" :folder_id="folder_id"></file-item>
    </div>
    </li>
</ul>
</template>
<script>
import filesJson from './files.json'
import FileItem from "./FileItem.vue"
export default {
    props: {
        value: {
            default: '12px',
            type: String
        },
        files:{
            default:[],
            type:Array
        },
        folder:{
            default:null,
            type:Object
        },
        edit_op:{
          default:false,
          type:Boolean,
        }
    },
    data() {
        return {
            w:'12px',
            h:'12px',
            list:[],
            folderInfoMap:new Map(),
            folder_id:null,
            parentFolderQueue:[],
            p_now_item:null,
        }
    },
    components: {
        // loading,
        FileItem
      },
    activated(){
        console.log('into activated:')
        this.visitFolder(this.now_item)
    },
    async created () {
        this.h = this.w = this.value
        // this.list = this.files
        // this.list = await this.expandList(filesJson.list)
        this.now_item = this.folder
        this.folderInfoMap.set(this.folder.folder_id,this.folder)
        if(this.folder && this.folder.folder_id)
        {
            this.visitFolder(this.folder,true)
        }
        let This = this
        window.g_refresh_folder = function(){
          console.log('call g_refresh_folder:')
          // setTimeout(()=>This.visitFolder(This.now_item),300)
          setTimeout(()=>This.visitFolder(This.now_item),500)
          // setTimeout(()=>This.visitFolder(This.now_item),1000)
        }
    },
    methods:{
        async visitFolder(item,isRoot=false,clickEventFlag = false){//下载文件
          console.log('visitFolder:',item)
          this.folder_id = item.folder_id
          if(!item || !item.type || item.type!='folder')
            return false

          // if(item.folder_id == this.now_item.folder_id)
          // {
          //   console.log('【注意】folder即是当前目录，folder-id未有变化')
          //   return false
          // }

          if(clickEventFlag && this.edit_op) return this.$toast('请您先点击[退出编辑]模式！')
          let intoFolderRet = await this.$api.network.clouddiskFiles({folder_id:item.folder_id})
          console.log('intoFolderRet:',intoFolderRet)
          //2023-10-18修复粘贴文件夹至其他文件夹的问题（p_folder_id不可靠，是依赖于rel***来进行关联父目录的）
          let is_parent_dir = item.is_parent_dir 
          let p_item = is_parent_dir ? this.parentFolderQueue.pop(): {...this.now_item}//item && this.folderInfoMap.has(item.p_folder_id) ?  Object.assign({},this.folderInfoMap.get(item.p_folder_id)) :null//this.now_item && this.folderInfoMap.has(this.now_item.folder_id) ?  Object.assign({},this.folderInfoMap.get(this.now_item.folder_id)) :null
          let old_p_now_item = this.p_now_item
          if(p_item){
            p_item.origin_name = p_item.origin_name ? p_item.origin_name : p_item.name
            p_item.name = '..'
            this.p_now_item = p_item
          }else{
            this.p_now_item = null
          }
          let parentDir = isRoot || item.folder_id ==this.folder.folder_id || !p_item ? [] :[p_item]// [{type:'folder',name:'..',folder_id:item.p_folder_id}]
          if(intoFolderRet  && intoFolderRet.ret && intoFolderRet.list && intoFolderRet.list.length>0)
          {
            //..可返回上一个文件夹（是一个嵌套用法）
            this.list = await this.expandList( parentDir.concat(intoFolderRet.list))
          }else{
            this.list = parentDir
          }
        //   this.folder.now_folder = item
          let old_now_item =  old_p_now_item//{...this.now_item}
          this.now_item = item
          if(item.is_parent_dir) {
            this.now_item.is_parent_dir = false
          }else{
            // if(item.folder_id != this.now_item.folder_id)
            if(!old_now_item || this.parentFolderQueue.length>0 && 
              this.parentFolderQueue[this.parentFolderQueue.length-1].folder_id == old_now_item.folder_id)
            {
              console.log('FileList-visitFolder-push into parentFolderQueue not ok! new item equal to last item:',old_now_item)
            }else{
              console.log('FileList-visitFolder-push into parentFolderQueue ok! push-item:',old_now_item)
              old_now_item.is_parent_dir = true
              this.parentFolderQueue.push(old_now_item) //父级增加一个
            }
            p_item.is_parent_dir = true //这个会从下级返回至本级
          }
          if(typeof this.folder.updateNowFolderFunc == 'function')
          {
            this.folder.updateNowFolderFunc(item)
          }
        },
        async expandList(list)
        {
            if(!list || list.length<=0) return list
            for(let i=0;i<list.length;i++)
            {
                let item = list[i]
                if(!item || item.type=='folder'){
                    if(item){
                      this.folderInfoMap.set(item.folder_id,item)
                      item.url = item.folder_id
                    } 
                    continue
                } 
                item.url = item.obj_id
                if(item.filename.startsWith('aes256|')){
                    let web3key = await g_dchatManager.getDecryptWeb3Key(item.filename)
                    item.filename = await g_dchatManager.decryptMsgInfo(item.filename,web3key)
                    item.web3key = web3key
                }
            }
            return list
        }
    }
}
</script>
<style scoped>
  .filelist{
    margin-top:.4375rem;
    width:100%;
    overflow:hidden;
  }
</style>
