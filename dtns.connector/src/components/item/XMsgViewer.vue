<template>
    <div style="width:100%;" >
        <p v-if="show_xmsg" class="default-content" v-html="item.xmsg"></p>
        <div v-if="item.pics.length===1" class="single-pic">
            <!-- :src="item.mblog.pics[0].url" -->
            <img v-lazy="item.pics[0].dtns_url ? item.pics[0].dtns_url:item.pics[0].url">
        </div>
        <ul v-if="item.pics.length>=2" class="pic-list">
            <!-- @click="openPicViewer(eachPic.url)" -->
            <li v-for="(eachPic,index) in item.pics" ><img v-lazy="eachPic.dtns_url ? eachPic.dtns_url: eachPic.url"></li>
        </ul>
        <ul v-if="item.files.length>=1" class="file-list">
            <!-- @click="openPicViewer(eachPic.url)" -->
            <li v-for="(eachFile,index) in item.files" >
            <file-item :fileInfo="eachFile"></file-item>
            </li>
        </ul>
        <div v-if="item.xtype=='folder'">
            <file-list :folder="item"></file-list>
        </div>
        <div v-if="item.xtype=='user'">
            <div class="drecord" style="height:80px;width:200px;padding:0px 10px 0px 15px;" @click.stop="card_name(item)">
                <div style="border-bottom:1px solid #f5f5f5;line-height:30px;font-size:12px;color:#999999">联系人</div>
                <div style="float:left;"><img v-lazy="item.img" style="width:30px; height:30px; border-radius:5px;margin-top:9px;" alt=""></div>
                <div style="width:140px;float:left;padding-left:12px;font-size:15px;padding-top:13px;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">{{item.title}}</div>
            </div>
        </div>
        <div v-if="item.xtype=='chat'"  @click.stop="come(item)" style="width:45%;float:left;position:relative;">
            <PopComponent style="width:100%;" :xitem="item.xitem" :zoom="0.45" :fullWidth="fullWidth">
            </PopComponent>
        </div>
        <div v-if="item.xtype=='minicard'"  style="width:95%;float:left;position:relative;">
            <PopComponent style="width:100%;" :xitem="item.xitem" :fileId="item.fileId" :zoom="xzoom?xzoom:0.95" :fullWidth="fullWidth">
            </PopComponent>
        </div>
        <div v-if="item.xtype=='order_notice'" style="width:95%;float:left;position:relative;">
            <OrderNotice style="width:100%;" :orderid="item.orderid"/>
        </div>
        <div v-if="item.xtype=='news'"  @click.stop="comeNews(item)" style="width:65%;float:left;position:relative;">
            <PopComponent style="width:100%;" :xitem="item.xitem" :zoom="0.65" :fullWidth="fullWidth">
            </PopComponent>
        </div>
        <div v-if="item.xtype=='amap.location'" style="width:300px;height:200px;float:left;position:relative;">
            <LocationMarker style="width:100%;height: 100%;" :loc_item="item" :show_op="false">
            </LocationMarker>
        </div>
        <div v-if="item.xtype=='xpaint'" @click.stop="comeXPaint(item)" style="width:100%;float:left;position:relative;">
            <span>[ xpaint绘图应用 ] &nbsp; {{ downloading }} &nbsp; {{ tips }} &nbsp; {{ radio }}</span><br/>
            <div v-if="item.xpaint_img_url || item.xpaint_img_dtns_url" class="single-pic">
            <!-- :src="item.mblog.pics[0].url" -->
                <img :src="this.ximg" />
            </div><br/>
            <!-- <button >查看xpaint源码</button> -->
        </div>
        <div v-if="item.xtype=='xverse'" @click.stop="comeXVerse(item)" style="width:100%;float:left;position:relative;">
            <span>[ xverse-3d应用 ] &nbsp; {{ downloading }} &nbsp; {{ tips }} &nbsp; {{ radio }}</span><br/>
            <div v-if="item.xverse_img_url || item.xverse_img_dtns_url" class="single-pic">
            <!-- :src="item.mblog.pics[0].url" -->
                <img :src="this.ximg" />
            </div><br/>
            <!-- <button >查看xpaint源码</button> -->
        </div>
        <div v-if="item.xtype=='dxib'" @click.stop="comeDXIB(item)" style="width:100%;float:left;position:relative;">
            <span>[ DXIB超级智体应用 ] &nbsp; {{ downloading }} &nbsp; {{ tips }} &nbsp; {{ radio }}</span><br/>
            <div v-if="item.logo" class="single-pic">
            <!-- :src="item.mblog.pics[0].url" -->
                <img :src="this.ximg" />
            </div><br/>
            <!-- <button >查看xpaint源码</button> -->
        </div>
    </div>
</template>

<script>
import FileItem from "../../components/file/FileItem.vue"
import FileList from "../../components/file/FileList.vue";
import PopComponent from '@/components/Item/PopComponent'
import LocationMarker from '@/pages/index/Viewer/LocationMarker'
import sharechatjson  from '@/pages/dweb/data/sharechat.json'
import OrderNotice from '@/components/Item/OrderNotice'
import sharenewsjson from '@/pages/dweb//data/sharenews.json'
import netlinkImg  from '@/assets/images/net-link.png'

const netlinkBase64 = netlinkImg //imgUrlToBase64(netlinkImg);
console.log('netlinkBase64:',netlinkBase64)

export default {
    name: 'XMsgViewer',
    components: {
    PopComponent,
    LocationMarker,
    FileItem,
    FileList,
    OrderNotice,
},
    props: {
        item: {
            type: Object,
            required: true,
            default: () => {},
        },
        show_xmsg:{
            type:Boolean,
            required:true,
            default:false,
        },
        fullWidth:{
            type:Number,
            required:false,
            default:window.fullWidth
        },
        xzoom:{
            type:Number,
            required:false,
            default:0
        },
        fileId:{
            type:String,
            required:false,
            default:null
        }
    },
    data() {
        return {
            errMsg:'',
            loadingText:'【loading】mini-card文件加载中...',
            ximg:null,
            downloading:'',
            tips:'',
            radio:'',
        }
    },
    beforeCreate() {
    },
    async created() {
        console.log('into XMsgViewer.created')
        let tmp = this.item
        tmp.pics = tmp.pics ? tmp.pics : []
        tmp.files = tmp.files ? tmp.files : []
        if(tmp.xtype=='chat')
        {
            // tmp.xitem = {chatid:tmp.chatid,img:tmp.img,shop_id:tmp.shop_id,chat_type:tmp.chat_type,
            //   desc:tmp.desc,title:tmp.title}
            tmp.xitem  = JSON.parse(  JSON.stringify(sharechatjson).replace('$title',tmp.title)
                .replace('$img',tmp.img).replace('$desc',tmp.desc) )
        }

        if(tmp.xtype=='news')
        {
            // tmp.xitem = {chatid:tmp.chatid,img:tmp.img,shop_id:tmp.shop_id,chat_type:tmp.chat_type,
            //   desc:tmp.desc,title:tmp.title}
            if(!tmp.img) tmp.img =netlinkBase64
            tmp.xitem  = JSON.parse(  JSON.stringify(sharenewsjson).replace('$title',tmp.title)
                .replace('$img',tmp.img).replace('$desc',tmp.desc) )
        }

        else if(tmp.xtype=='minicard')
        {
            let fileId = tmp.xfile ? tmp.xfile.url :null
            if(tmp.xfile && tmp.xfile.dfile_url && tmp.xfile.dfile_url.startsWith('dtns://'))
            {
                fileId = tmp.xfile.dfile_url //使用的是dfile_url
            }
            tmp.fileId = fileId
            tmp.xitem = null
        }
        else if(tmp.xtype == 'order_notice')
        {
            //不做处理，直接提供给item.orderid
        }
        else if(tmp.xtype=='xpaint' || tmp.xtype=='xverse')
        {
            let img_id = tmp.xtype=='xpaint' ? tmp.xpaint_img_dtns_url : tmp.xverse_img_dtns_url
            let flag = await this.getXImg(img_id,tmp.xtype)
            console.log('getXImg-flag:',flag)
            this.showTips()
        }
        else if(tmp.xtype =='dxib')
        {
            let img_id = tmp.logo// : tmp.xverse_img_dtns_url
            let flag = await this.getXImg(img_id,tmp.xtype)
            console.log('getXImg-flag:',flag)
            this.showTips()
        }
    },
    beforeMount() {
        // this.poplang.op(null, 'beforeMount')
    },
    async mounted() {
        console.log('XMsgViewer-mounted...')
    },
    beforeDestroy() {
        // this.poplang.op(null, 'beforeDestroy')
    },
    destroyed() {
        // this.poplang.op(null, 'destroyed')
    },
    methods: {
        async showTips()
        {
          let fileId = null;
          let item = this.item
          if(item.xtype=='xpaint') fileId = item.xpaint_src_dtns_url ? item.xpaint_src_dtns_url :item.xpaint_src_url
          else if(item.xtype =='xverse') fileId = item.xverse_src_dtns_url ? item.xverse_src_dtns_url :item.xverse_src_url
          else if(item.xtype == 'dxib') fileId = item.dxib_url
          else {
            this.tips = ''
            this.radio= ''
            this.downloading=''
            return 
          }

          console.log('showTips-fileId:',fileId,item)

          let downloadManagerInfo = await g_downManager.getDownloadManagerInfo(fileId)
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
        async getXImg(img_id,tips)
        {
            if(img_id) img_id=img_id.replace('&amp;','&')
            let item = await imageDb.getDataByKey(img_id)
            console.log('XMSGViewer-'+tips+'-imageDb-getimg-item:',item)
            if(item && item.data)
            {
                this.ximg =  item.data
                return true
            }else{
                let data = await queryImg(img_id,{img_kind:'open'})
                console.log('XMSGViewer-load-from-network-'+tips+'-img:',data)
                if(data && data.data){
                    this.ximg ='data:image/png;base64,'+data.data
                    imageDb.addData({img_id,data:this.ximg })
                    return true
                }else{
                    console.log('XMSGViewer-load-failed-'+tips+'-img:',img_id)
                    this.ximg = null
                    return false
                }
            }
        },
        card_name(item){///点击进入名片联系人的个人信息
          console.log('card_name:',item)
          this.$router.push(`/index/GroupInformation/GroupOwner/${item.dst_user_id}`)
        },
        // showMK(item){
        //     localStorage.setItem('location',JSON.stringify(item))
        //     this.$router.push('/lm')
        // },
        async comeXPaint(item)
        {
            let fileId = item.xpaint_src_dtns_url ? item.xpaint_src_dtns_url :item.xpaint_src_url
            this.showTips()
            let fileItem = await g_dchatManager.queryXFileInfo(fileId)
            console.log('comeXPaint-fileItem-res:',fileItem)
            if(!fileItem) return this.$toast('加载xpaint的源文件失败！')
            try{
                fileItem = JSON.parse(new TextDecoder().decode(fileItem))
            }catch(ex){
                console.log('json-parse-xpaint-xfile-failed:'+ex,ex)
                return this.$toast('解析xpaint源文件失败！')
            }
            ifileDb.deleteDataByKey('from.dtns.design.json')
            ifileDb.addData({key:'from.dtns.design.json',data:fileItem})
            localStorage.setItem('xpaint-filename',item.xpaint_src_url)//以便复制
            this.$router.push('/design')
        },
        async comeXVerse(item)
        {
            let fileId = item.xverse_src_dtns_url ? item.xverse_src_dtns_url :item.xverse_src_url
            this.showTips()
            let fileItem = await g_dchatManager.queryXFileInfo(fileId)
            console.log('comeXVerse-fileItem-res:',fileItem)
            if(!fileItem) return this.$toast('加载xverse的3D模型源文件失败！')
            try{
                fileItem = JSON.parse(new TextDecoder().decode(fileItem))
            }catch(ex){
                console.log('json-parse-xverse-xfile-failed:'+ex,ex)
                return this.$toast('解析xverse的3D模型源文件失败！')
            }
            ifileDb.deleteDataByKey('from.dtns.3d.creator.json')
            ifileDb.addData({key:'from.dtns.3d.creator.json',data:fileItem})
            imDb.deleteDataByKey('from.dtns.xverse.xmsg')
            imDb.addData({key:'from.dtns.xverse.xmsg',data:item.origin_xmsg})
            localStorage.setItem('xverse-filename',item.xverse_src_url)
            if(item.isProduct)
                this.$router.push('/3dp')
            else
                this.$router.push('/3de')//'/3d/3d'
        },
        async comeDXIB(item)
        {
            let fileId = item.dxib_url//xverse_src_dtns_url ? item.xverse_src_dtns_url :item.xverse_src_url
            this.showTips()
            let fileItem = await g_dchatManager.queryXFileInfo(fileId)
            console.log('comeDXIB-fileItem-res:',fileItem,fileId,item)
            if(!fileItem) return this.$toast('加载dxib源文件失败！')
            
            this.dxibManager =  new DXIBManager(item)
            let cnt = await this.dxibManager.loadRes()
            console.log('comeDXIB-DXIBManager-loadRes-cnt:',cnt)

            localStorage.setItem('p_xmsgid',item.xmsgid)
            await this.dxibManager.start(this)
            // let actionInfoW = await this.dxibManager.play()
            // console.log('XMSGViewer.vue-dxibManager-play-actionInfo:',actionInfoW)
            // if(!actionInfoW)
            // {
            //     return this.$toast('无法加载dxib-main入口action!')
            // }

            // let dxibActionFileData = await this.dxibManager.loadActionResFile(actionInfoW.actionInfo)
            // console.log('XMSGViewer-dxibActionFileData:',dxibActionFileData,actionInfoW)

            // window.g_now_action_info = actionInfoW//包含了context
            
            // if(actionInfoW.actionInfo.xtype == 'video')
            //     this.$router.push('/video')
            // else
            //     this.$router.push('/3de')//'/3d/3d'
        },
        async comeNews(item)
        {
          console.log('come-news:',item)
          let gotoInfo=Object.assign({},item)
          delete gotoInfo.xitem
          console.log('comeNews-gotoInfo:',gotoInfo)
          localStorage.setItem('goto-http',JSON.stringify(gotoInfo))
          this.$router.push('/http')
        },
        async come(item) {//跳转进入聊天室
          console.log(item)
          let shop_id = item.shop_id
          localStorage.setItem('shopid',shop_id)
          console.log(shop_id)
          let chatname = item.title
          console.log(chatname)
          localStorage.setItem("chatname",chatname)

          let random = Math.random()
          let user = {
            user_id:localStorage.user_id,
            s_id:localStorage.s_id,   
            chatid:item.share_chatid,
          }
          let res =  await this.$api.network.Chatjoin(user)
          console.log('这是加入群聊' + res)
          if(!res || !res.ret)
          {
          //     this.$toast.success('加入成功')
          // }else{
              this.$toast.fail('加入失败:' + res.msg)
              return 
          }

          // imDb.addData({key:item.token_y,data:item})
          if(item.chat_type =='group_live' || item.chat_type == "group_shop"){
            this.$router.push(`/LiveBroadcast/videoChat/${item.share_chatid}`)
          }
          else{
            this.$router.push(`/index/chat/${item.share_chatid}`)
          }
        },
    },
}
</script>

<style lang="stylus" scoped>
  .pic-list
    margin-top .4375rem
    width: 15.5rem
    overflow hidden
    & li
      float: left
    & img
      width 4.75rem
      height 4.75rem
      margin-right .25rem
  .file-list
    margin-top .4375rem
    width: 100%
    overflow hidden
  
  .single-pic
    margin-top .3125rem
    max-height 12.5rem
    overflow hidden
    text-align left
    & img
      width: 11.25rem
      vertical-align top


.drecord{
    background-color: #f0f0f0;
    padding: 8px 8px;
    border-radius: 4px;
    display:inline-block
    position: relative;
    font-size:14px;
    //margin:25px 35px 0px 0; 
    word-break: break-all
    word-wrap: break-word
    // white-space: pre-wrap
}
.drecord::after{
    content: '';
    border: 8px solid #f0f0f000;
    border-right: 8px solid #fff;
    position: absolute;
    top: 6px;
    left: -16px;
}
</style>
