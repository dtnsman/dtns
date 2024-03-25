<template>
    <div class="box" style="width:100%;height:100%;overflow-x: hidden;overflow-y: scroll;">
    <van-nav-bar :title="title" left-arrow @click-left="back" :right-text="okTips" @click-right="getData" />
        <div class="kbox">
            <k-form-build v-if="formJson" ref="KFB" :value="formJson" :defaultValue="formValue" @submit="handleSubmit"  ></k-form-build>
        </div>
        <div v-if="share_xmsg" class="mybtnbox">
            <button v-if="share_xmsg_is_mini_card" @click="viewMiniCard" style="padding: 5px;margin-bottom: 15px;">编辑minicard轻应用源码</button>
            <button v-if="share_xmsg_is_xverse" @click="viewXVerse" style="padding: 5px;margin-bottom: 15px;">编辑xverse轻应用源码</button>
            <button v-if="share_xmsg_is_amap_location" @click="viewAMap" style="padding: 5px;margin-bottom: 15px;">生成并复制[地理位置]JSON源码文件</button>
            <button v-if="share_xmsg_is_news" @click="viewNews" style="padding: 5px;margin-bottom: 15px;">生成并复制[网址链接]JSON源码文件</button>
            <k-form-build v-if="labelsJson" ref="labelsForm" :value="labelsJson" @submit="handleLabelsSubmit"  ></k-form-build>
            <button style="padding: 5px;" @click="addLabelOP">关联该标签</button>
            <button v-if="share_xmsg_is_user_label" style="margin-left: 15px; padding: 5px; color:brown;" @click="removeUserLabel">移除标签</button>
            <button v-if="share_xmsg_is_user_label" style="margin-left: 15px; padding: 5px; color:brown;" @click="setLabelAsUser">恢复标签</button>
            <button v-if="share_xmsg_is_label" style="margin-left: 15px; padding: 5px; color:brown;" @click="removeLabel">删除该标签</button>
            <button v-if="share_xmsg_is_label" style="margin-left: 15px; padding: 5px; color:brown;" @click="setLabelAsOfficial">系统化标签</button>
            <button style="margin-left: 15px; padding: 5px; color:blueviolet;" @click="mark">收藏至我的</button>
        </div>
        <div v-if="share_xmsg || posterType == 'xmsg'" style="text-align: center;width: 100%;height: 20px;line-height: 20px;font-size: 15px;position: fixed;z-index: inherit;990;bottom:0px">
            <span @click="mypostViewOP">{{ myPostStr }}</span>
        </div>
    </div>
</template>
<script>

import chatFORKIDVisitPMJson  from './datajson/chatFORKIDVisitPM.json'
import chatXMSGIDSJson  from './datajson/chatXMSGIDS.json'
import dtnsConfigJson from './datajson/dtnsConfig.json'
import dwebXMsgJson from './datajson/dwebXMsg.json'
import dwebXMsgLabelsJson from './datajson/dwebXMsgLabels.json'
import dwebXMsgMiniJson from './datajson/dwebXMsgMini.json'
import dwebXMsgMiniEnJson from './datajson/dwebXMsgMini_en.json'
import web3appJson from './datajson/web3app.json'
import web3appKeyJson from './datajson/web3appKey.json'
import web3appSettingJson from './datajson/web3appSetting.json'
import folderNewJson from './datajson/folderNew.json'
import folderAddFilesJson from './datajson/folderAddFiles.json'
import newsXMsgJson  from './datajson/newsXMsg.json'
import miniCardXMsgJson from './datajson/miniCardXMsg.json'
import shareTextJson from './datajson/shareText.json'
import dtnsSendJson from './datajson/dtnsSend.json'
import fileItemPMJson from './datajson/fileItemPM.json'

export default {
    data() {
      return {
        title:'提交表单信息',
        okTips:'确认',
        chatid:this.$route.params.chatid,
        formJson:null,
        formValue:null,
        modFORKIDSTitle:'修改福刻访问权限',
        modDTNSNetworkTitle:'修改DTNS网络配置',
        FORIDSJson :chatFORKIDVisitPMJson,
        DTNSConfigJson:dtnsConfigJson,
        DWEBXMsgJson: JSON.parse( JSON.stringify( dwebXMsgJson ) ),
        DWEBXMsgLabelsJson:JSON.parse( JSON.stringify(dwebXMsgLabelsJson)),
        DWEBXMsgJsonMini:JSON.parse( JSON.stringify( dwebXMsgMiniJson ) ),
        DWEBXMsgJsonMiniEn:JSON.parse( JSON.stringify( dwebXMsgMiniEnJson ) ),
        xlabels:[],
        labelsJson:null,
        share_xmsg_is_label:false,
        share_xmsg_is_user_label:false,
        share_xmsg_is_mini_card:false,
        share_xmsg_is_xverse:false,
        share_xmsg_is_amap_location:false,
        share_xmsg_is_news:false,
        sendDwebXmsgStr:'发布头榜',
        okPostStr:'确认',
        myPostStr:'我的稿箱',
        }
    },
    async created(){
        if(typeof g_pop_event_bus!='undefined')
        {
        g_pop_event_bus.on('update_dtns_loction',this.translate)
        }
        this.translate()

        let posterType = localStorage.getItem('poster_type')
        this.posterType = posterType
        let posterValue = localStorage.getItem('poster_value')
        console.log('poster-type-value:',posterType,posterValue)
        this.posterValue = posterValue
        switch(posterType){
            case 'FORKIDS':
                this.title = this.modFORKIDSTitle
                this.formValue={forkids:posterValue}
                this.formJson = this.FORIDSJson
                break;
            case 'xmsgids':
                this.title = '修改群访问权限（购买的头榜）'
                this.formValue={xmsgids:posterValue}
                this.formJson = chatXMSGIDSJson
                break;
            case 'DTNSNetwork':
                this.title = this.modDTNSNetworkTitle
                this.formValue = {network:posterValue}
                this.formJson = this.DTNSConfigJson
                break;
            case '3s':
                this.title = '配置ibapp智体应用'
                // this.formValue = {network:posterValue}
                this.formJson = web3appSettingJson
                break
            case 'folder_new':
                this.title = '新建文件夹'
                this.formJson = folderNewJson
                break
            case 'folder_add_files':
                this.title = '添加文件'
                let defaultLockFlag = await imDb.getDataByKey('file_lock_default')
                this.formValue= {lock_flag: defaultLockFlag && defaultLockFlag.data}
                this.formJson = folderAddFilesJson
                break
            case 'dtns':
                this.title = '转账'
                this.formJson = dtnsSendJson
                if(posterValue && posterValue.startsWith('dtns_'))
                {
                    this.formValue = {token_y:posterValue}
                }
                break
            case 'file.item':
                this.title = '设置文件锁🔒'
                this.formJson = fileItemPMJson
                if(posterValue && posterValue.startsWith('{'))
                {
                    try{
                    this.formValue = JSON.parse(posterValue)
                    this.filename = this.formValue.obj_id
                    this.fileInfo = Object.assign({}, this.formValue)
                    }catch(ex)
                    {
                        console.log('set-fileItem-pm-parse-posterValue-json-exception:'+ex,ex)
                    }
                }
                break
            case 'xpaint':
            case 'xverse':
            case 'xmsg':
                this.title = !posterValue || posterValue=='normal' ?  this.sendDwebXmsgStr :
                    (posterValue == 'retw' ? '转发头榜' : (posterValue == 'reply' ? '评论头榜' : posterValue == 'rels' ?'购买头榜':'发表头榜'))
                this.xtype = posterValue
                if(posterValue == 'retw') this.formValue = {xmsg:'转发了'}
                if(posterValue == 'rels'){
                    this.formValue = {xmsg:'感觉这个很不错！'}
                } 
                if(['retw','good','reply','rels'].indexOf(this.xtype)>=0)
                {
                    this.p_xmsg_info = JSON.parse(localStorage.getItem('dweb_p_xmsg_info'))
                    localStorage.removeItem('dweb_p_xmsg_info')
                }
                if(this.xtype == 'xpaint') this.title = '分享xpaint源码'
                if(this.xtype == 'xpaint') this.title = '分享xverse-3d模型源码'

                let from_label_type = localStorage.getItem('from_label_type')
                localStorage.removeItem('from_label_type')
                let initData = await imDb.getDataByKey('dweb_poster_init_data')
                console.log('poster.vue-xmsg-init-data:',initData)
                if(initData && initData.data){
                    if(from_label_type!='new_xmsg')
                    {
                        this.formValue = {xmsg:JSON.stringify(initData.data),label_type:from_label_type ? from_label_type:''}
                    }else{
                        this.formValue = initData.data//{xmsg:JSON.stringify(initData.data),label_type:from_label_type ? from_label_type:''}
                    }
                    localStorage.removeItem('from_label_type')
                    imDb.deleteDataByKey('dweb_poster_init_data')//删除掉，避免污染Poster.vue 
                    
                }else if(from_label_type){
                    this.formValue = {label_type:from_label_type}
                }
                //统一使用mini，因为富文本会转义html（形成<p></p>以及图片url的&amp;链接问题  2024-1-8
                this.formJson = localStorage.getItem('dtns-location')=='en'? this.DWEBXMsgJsonMiniEn: this.DWEBXMsgJsonMini// posterValue == 'reply' || device.type=='mobile' ? this.DWEBXMsgJsonMini : this.DWEBXMsgJson
                this.labelsJson = this.formJson //this.DWEBXMsgLabelsJson
                let qparams = {user_id:localStorage.user_id,s_id:localStorage.s_id,begin:0,len:1000000,label_type:'list'}
                let labelsRet = await this.$api.network.listXMSG(qparams)
                await this.mergeLabels(labelsRet)
                qparams.label_type = 'rell' //用户标签
                labelsRet = await this.$api.network.listXMSG(qparams)
                await this.mergeLabels(labelsRet)
                labelsRet = await this.$api.network.getChatList({begin:0,len:100000})
                await this.mergeLabels(labelsRet)
                break;
            case 'ibapp':
                this.title = '创建智体应用（IBApp）'
                this.formJson = web3appJson
                break;
            case 'appkey':
                this.title = '修改智体应用（IBApp）的公钥'
                this.formJson = web3appKeyJson
                break;
            case 'formengine':
                this.title = '填写表单'
                let templateJSON = await imDb.getDataByKey('form-engine-'+this.posterValue)
                if(templateJSON){ 
                    this.formJson = templateJSON.data 
                }else{
                    this.$toast('表单模板加载失败！')
                    console.log('templateJSON:',templateJSON)
                }
                break
            case 'news':
                this.title = '分享链接'
                this.formJson = newsXMsgJson
                this.xtype = 'news'
                break;
            case 'minicard':
                this.title = 'mini-card应用分享'
                if(this.posterValue)
                try{
                    this.formValue = JSON.parse(this.posterValue)
                }catch(ex){
                    console.log('parse-mini-card-poster-value:',this.posterValue,'exception:'+ex,ex)
                }
                this.formJson = miniCardXMsgJson
                this.xtype = 'minicard'
                break
            case 'sharetext':
                this.title = '请复制文本内容'
                let sharedata = await imDb.getDataByKey('sharetext')
                if(sharedata && sharedata.data)
                this.formValue = {sharetext:sharedata.data}
                this.formJson = shareTextJson
                imDb.deleteDataByKey('sharetext')
                try{
                    this.share_xmsg = JSON.parse(sharedata.data)
                    if(this.share_xmsg && this.share_xmsg.xmsgid )
                    {
                        if(this.share_xmsg.xmsg) this.share_xmsg.xmsg = this.share_xmsg.xmsg.replace('<p>','').replace('</p>','')
                        this.share_xmsg_is_label = this.share_xmsg.xmsgid.indexOf('xmsglm')>0 || this.share_xmsg.xmsgid.indexOf('xmsglp')>0 
                        this.share_xmsg_is_user_label= this.share_xmsg.xmsgid.indexOf('xmsglu')>0
                        this.share_xmsg_is_mini_card = this.share_xmsg.xtype == 'minicard'
                        this.share_xmsg_is_xverse    = this.share_xmsg.xtype == 'xverse'
                        this.share_xmsg_is_amap_location=this.share_xmsg.xtype=='amap.location'
                        this.share_xmsg_is_news = this.share_xmsg.xtype=='news'
                        let tipsEnd = ''
                        if(this.share_xmsg.label_type && this.share_xmsg.label_type.indexOf('xmsglu')>0) tipsEnd='[用户标签]'
                        else if(this.share_xmsg.label_type && this.share_xmsg.label_type.indexOf('xmsgl')>0) tipsEnd='[系统标签]'
                        else if(this.share_xmsg.label_type && this.share_xmsg.label_type.indexOf('chat02')>0) tipsEnd='[群标签]'
                        else if(this.share_xmsg.label_type=='relf') tipsEnd = '[收藏]'
                        else if(this.share_xmsg.label_type=='relp') tipsEnd = '[稿箱]'
                        else if(this.share_xmsg.label_type=='rels') tipsEnd = '[子榜]'
                        this.okTips = '下榜'+tipsEnd
                        this.title = '复制头榜JSON发送至【群聊】【头榜】等'
                        this.labelsJson = this.DWEBXMsgLabelsJson
                        let qparams = {user_id:localStorage.user_id,s_id:localStorage.s_id,begin:0,len:1000000,label_type:'list'}
                        let labelsRet = await this.$api.network.listXMSG(qparams)
                        await this.mergeLabels(labelsRet)
                        qparams.label_type = 'rell' //用户标签
                        labelsRet = await this.$api.network.listXMSG(qparams)
                        await this.mergeLabels(labelsRet)
                        labelsRet = await this.$api.network.getChatList({begin:0,len:100000})
                        await this.mergeLabels(labelsRet)
                    }else{
                        this.share_xmsg = null
                    }
                }catch(ex){
                    console.log('parse share-xmsg failed-exception:'+ex,ex)
                }
                break;
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        async mergeLabels(labelsRet)
        {
            if(labelsRet && labelsRet.ret && labelsRet.list)
            {
                this.xlabels = labelsRet.list
                let label_type_obj = this.findLabelTypeOptions(this.labelsJson)
                let options  = label_type_obj.options ? label_type_obj.options.options :[]
                options = options ? options:[]
                for(let i=0;i<labelsRet.list.length;i++){
                    let obj = labelsRet.list[i]
                    //判断是否是群
                    if(obj && obj.chat_type && obj.token_y && obj.token_y.indexOf('chat02')>0 )
                    {
                        //判断是否需要解密aes256
                        if(obj.chatname && obj.chatname.startsWith('aes256|'))
                        {
                            obj.chatname = await g_dchatManager.decryptMsgInfo(obj.chatname) 
                        }
                        this.addLabelTypeOption(options,{value:obj.token_y,label:'[标签]'+obj.chatname+'（群）'})
                        continue
                    }
                    if(obj && !obj.xmsgid || !obj)
                    {
                        console.log('merge-error-obj:',obj)
                        continue
                    }
                    this.addLabelTypeOption(options,{value:obj.xmsgid,label:'[标签]'+obj.xmsg.replace('<p>','').replace('</p>','')+(obj.xmsgid.indexOf('xmsglp')>0?'（公共）':(obj.xmsgid.indexOf('xmsglu')>0 ? '（用户）':'（管理员）'))})
                }
                label_type_obj.options.options = options
                this.labelsJson = {...this.labelsJson}
            }
            console.log('poster.vue--labelsRet:',labelsRet,this.xlabels,this.labelsJson)
        },
        findLabelTypeOptions(formjson)
        {
            if(!formjson || !formjson.list) return {}
            for(let i=0;i<formjson.list.length;i++)
            {
                if(formjson.list[i].model=='label_type'){
                    return formjson.list[i]
                }
            }
            return {}
        },
        addLabelTypeOption(options,obj)
        {
            if(!options || !obj) return false
            for(let i=0;i<options.length;i++)
            {
                if(options[i].value == obj.value) return false
            }
            options.push(obj)
            return true
        },
        async mark(){
            if(!this.share_xmsg) return 
            let markRet = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/dweb/xmsg/label/add',{xmsgid:this.share_xmsg.xmsgid, label_type:'relf'})
            console.log('markRet:',markRet)
            if(markRet && markRet.ret) return this.$toast('[success]收藏至我的成功了！')
            else return this.$toast('[failed]收藏至我的失败了！原因:'+(markRet ? markRet.msg:'未知网络原因'))
        },
        async post(res){
            console.log('poster-get-data-json-value-res:',res)
            res.chatid = this.chatid
            res.user_id = localStorage.user_id
            res.s_id = localStorage.s_id
            console.log('poster-post-params:',res)
            if(this.posterType == 'FORKIDS')
            {
                if(!res.forkids || res.forkids.trim().length<=0)
                    delete res.forkids 
                let ret = await this.$api.network.ChatForkidsMod(res)
                if(ret && ret.ret){
                    this.$toast('修改成功')
                }else{
                    this.$toast('修改失败，原因：'+(ret ? ret.msg:'未知网络原因'))
                }
            }
            if(this.posterType == 'xmsgids')
            {
                if(!res.xmsgids || res.xmsgids.trim().length<=0)
                    delete res.xmsgids 
                res.chatid = this.chatid
                let ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/chat/mod/xmsgids',res)
                if(ret && ret.ret){
                    this.$toast('修改成功')
                }else{
                    this.$toast('修改失败，原因：'+(ret ? ret.msg:'未知网络原因'))
                }
            }
            else if(this.posterType == 'DTNSNetwork')
            {
                res.web3name = res.network
                let ret = await this.$api.network.setDTNSNetworkConfig(res)
                if(ret && ret.ret){
                    this.$toast('修改成功')
                }else{
                    this.$toast('修改失败，原因：'+(ret ? ret.msg:'未知网络原因'))
                }
            }
            else if(this.posterType == 'folder_new')
            {
                if(!res.chatid.startsWith('msg_')) delete res.chatid
                res.folder_id = this.posterValue
                let ret = await this.$api.network.clouddiskFolderCreate(res)
                if(ret && ret.ret)
                {
                    this.$toast('新建文件夹成功！')
                    setTimeout(()=>this.back(),1000)
                }else{
                    this.$toast('修改失败，原因：'+(ret ? ret.msg:'未知网络原因'))
                }
            }
            else if(this.posterType == 'folder_add_files')
            {
                if(!res || !res.files  || res.files.length<=0)
                    return this.$toast('文件列表为空，请上传文件')
                let reqs = [] , file_cnt = res.files.length
                let param = {folder_id:this.posterValue,user_id:res.user_id,s_id:res.s_id}//,chatid:res.chatid}
                for(let i=0;i<file_cnt;i++)
                {
                    param.file_id = res.files[i].url
                    reqs.push(this.$api.network.clouddiskFileAdd(Object.assign({},param)))
                }
                if(res.lock_flag)
                {
                    imDb.addData({key:'file_lock_default',data:true})
                    console.log('into folder_add_files-set-file-lock:')
                    for(let i=0;i<file_cnt;i++)
                    {
                        reqs.push(g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/file/lock/set',{filename:res.files[i].url,chatids:'1'}))
                    }
                }else{
                    imDb.deleteDataByKey('file_lock_default')
                }
                let rets = await Promise.all(reqs)
                let iCnt = 0 , lock_cnt = 0;
                for(let i=0;rets && i<file_cnt;i++)
                {
                    if(rets[i] && rets[i].ret) 
                        iCnt ++
                }
                for(let i=file_cnt;res.lock_flag && i<rets.length;i++)
                {
                    if(rets[i] && rets[i].ret) 
                        lock_cnt ++
                }
                if(iCnt != file_cnt && iCnt>0)
                {
                    this.$toast('文件部分添加成功，数量为：'+iCnt+'，请返回文件夹查看！'+(res.lock_flag?'加锁成功数量：'+lock_cnt:""))
                    setTimeout(()=>this.back(),1000)
                }else if(iCnt == file_cnt)
                {
                    this.$toast('文件全部添加成功，数量为：'+iCnt+'，请返回文件夹查看！'+(res.lock_flag?'加锁成功数量：'+lock_cnt:""))
                    setTimeout(()=>this.back(),1000)
                }else{
                    this.$toast('全部文件均添加失败！'+(res.lock_flag?'加锁成功数量：'+lock_cnt:""))
                }
            }
            else if(this.posterType == 'dtns')
            {
                let dtns_int_id = null
                let userInfo = null
                try{
                    userInfo = JSON.parse(localStorage.getItem('userInfo'))
                }catch(ex)
                {
                    console.log('poster.vue-parse-userInfo-exception:'+ex,ex)
                    return this.$toast('未能成功获取userInfo信息')
                }
                dtns_int_id = userInfo.dtns_int_id
                let public_key = userInfo.public_key
                let private_key = await g_dchatManager.getPrivateKeyByPublicKey(public_key)
                console.log('poster.vue-user-public-key:',public_key,private_key,dtns_int_id)
                // private_key = rpc_client.mywallet.private_key ;
                if(!private_key) return this.$toast('未能成功获取私钥！')
                console.log('poster.vue-user-public-key:',public_key,private_key,dtns_int_id)

                let timestamp_i = parseInt(Date.now()/1000)
                let TXINFO = {txid:sign_util.newTXID() ,token_x:dtns_int_id,token_y:res.token_y,
                    opcode:'send',opval:res.opval,extra_data:"client-send",timestamp_i}
                let TXJSON = sign_util.toTXJSONString(TXINFO);//序列化。
                console.log('poster.vue-send-dtns-TXJSON:'+TXJSON)
                let hash = await key_util.hashVal(TXJSON);//得到hash值
                let sign = await key_util.signMsg(hash,private_key)
                TXINFO.web3_sign = sign
                TXINFO.rpc_port = 80

                let sendRet = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/op',TXINFO)
                if(sendRet && sendRet.ret){
                    this.$toast('转账成功！')
                    this.$router.push('/rmb')
                }else{
                    this.$toast('转账失败！原因：'+(sendRet ? sendRet.msg:'未知网络原因'))
                }
            }
            else if(this.posterType == 'file.item')
            {
                res.filename = this.filename
                if(this.fileInfo && this.fileInfo.user_id!=localStorage.user_id && !confirm('不是您上传的文件，是否继续尝试设置/清除文件锁权限？')) return 
                let sendRet = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/file/lock/set',res)
                if(sendRet && sendRet.ret){
                    this.$toast('设置文件权限成功！')
                    this.$router.go(-1)
                }else{
                    this.$toast('设置文件权限失败！原因：'+(sendRet ? sendRet.msg:'未知网络原因'))
                }
            }
            else if(this.posterType == 'xmsg' || this.posterType == 'xpaint' || this.posterType == 'xverse') 
            {
                res.xtype = this.xtype
                res.xobj = Object.assign({},res)
                delete res.xobj.s_id
                delete res.xobj.user_id
                //如果不是群聊，则如此操作
                if(!this.chatid.startsWith('msg_chat'))
                {
                    delete res.xobj.chatid
                    delete res.chatid
                }
                if(this.chatid.startsWith('msg_xmsg'))
                {
                    //回复或者转发
                    res.p_xmsgid = this.chatid
                }

                let pics = []
                for(let i=0;res.xobj.pics && i<res.xobj.pics.length;i++)
                {
                    delete res.xobj.pics[i].thumbUrl
                    pics.push( {url:res.xobj.pics[i].url,name:res.xobj.pics[i].name,
                        dtns_url:'dtns://web3:'+rpc_client.roomid+'/image/view?filename='+res.xobj.pics[i].url+'&img_kind=open'})
                }
                res.xobj.pics = pics

                //直接复制json-object（来自于share-text）2023-10-16新增，比改造mini-card的发布要简单，并且兼容更多的未来的现在的xtype类型
                let xmsgObj = null
                let xmsg = ''
                try{
                    if( res.xobj.xmsg && res.xobj.xmsg.startsWith('<p>')){
                        xmsg = res.xobj.xmsg.replace('<p>','').replace('</p>','')
                    }else{ //fix the bug ----phone device not have '<p>...</p>' 2023-10-16
                        xmsg = res.xobj.xmsg 
                    }
                    xmsgObj = JSON.parse (xmsg )
                }catch(ex){
                    console.log('xmsg is not json-object:'+ex,ex)
                }
                console.log('poster-xmsg-xmsgObj:',xmsgObj)
                if(xmsgObj && xmsgObj.xtype){ //不仅仅是复制mini-card//这里的xtype原来是xmsgid（无必要，是以xtype为核心的）
                    console.log('poster-xmsg-copy-now:')
                    if(!xmsgObj.paste_xmsg_id)
                    {
                        xmsgObj.paste_xmsg_id = xmsgObj.xmsgid
                        xmsgObj.paste_origin_user_id = xmsgObj.user_id
                        xmsgObj.paste_origin_time_i = xmsgObj.time_i
                        // xmsgObj.paste_origin_p_xmsg_info = xmsgObj.p_xmsg_info
                        xmsgObj.paste_time_str = xmsgObj.time_str
                    }else{
                        console.log('xmsgObj already have paste_xmsg_id, do not cover it!')
                    }
                    delete xmsgObj.user_id
                    delete xmsgObj.xmsgid
                    delete xmsgObj.time_i
                    delete xmsgObj.time_str
                    delete xmsgObj.p_xmsg_info //由ib3.node-service自动获取
                    delete xmsgObj.token_y
                    res.xobj = Object.assign({},res.xobj,xmsgObj) //复制过去，以便形成新的xmsg-obj
                    res.xmsg = xmsgObj.xmsg //这里须注意
                    res.xtype = xmsgObj.xtype
                    res.chatid = xmsgObj.chatid
                    res.p_xmsgid = xmsgObj.p_xmsgid
                    res.good_fee = xmsgObj.good_fee
                }
                //end the pase of xmsg
                console.log('xmsg-res.xobj:',res.xobj)
                res.xobj = JSON.stringify(res.xobj)

                if(res.xobj.indexOf('thumbUrl')>0){
                    this.$toast('错误：未能清理表单的图片预览数据--thumbUrl')
                    return 
                }
                console.log('sendXMSG-params:',res)

                let ret = await this.$api.network.sendXMSG(res)
                console.log('sendXMSG-ret:',ret)
                if(ret && ret.ret){
                    this.$toast('发布成功')
                    //评论、点赞、转发
                    let xobj = JSON.parse(res.xobj)
                    if( ['retw','good','reply'].indexOf(this.xtype)>=0){
                        let sendObj = Object.assign({},xobj,{xtype:this.xtype,xmsg,p_xmsg_info:this.p_xmsg_info,p_xmsgid:this.p_xmsg_info.xmsgid})
                        let sendNoticeRet = await g_dchatManager.sendXtypeMsgObj(this.p_xmsg_info.user_id,sendObj,this)
                        console.log('评论或转发头榜-sendNoticeRet:',sendNoticeRet,sendObj)
                    }
                    if( ['rels'].indexOf(this.xtype)>=0)//this.title == '购买头榜')
                    {
                        let sendObj = Object.assign({},xobj,{xtype:'normal',xmsg,p_xmsg_info:this.p_xmsg_info,p_xmsgid:this.p_xmsg_info.xmsgid,xbuyed:true,xbuyed_xprice:this.p_xmsg_info.xprice})
                        let sendNoticeRet = await g_dchatManager.sendXtypeMsgObj(this.p_xmsg_info.user_id,sendObj,this)
                        console.log('购买头榜-sendNoticeRet:',sendNoticeRet,sendObj)
                    }
                    localStorage.setItem('newDWebFlag','1')
                    this.$router.go(-1);
                }else{
                    this.$toast('发布失败，原因：'+(ret ? ret.msg:'未知网络原因'))
                }
            }
            else if(this.posterType == 'news')
            {
                console.log('news-form-res:',res)
                res.xtype = this.xtype
                res.xobj = Object.assign({},res)
                delete res.xobj.s_id
                delete res.xobj.user_id
                //如果不是群聊，则如此操作
                if(!this.chatid.startsWith('msg_chat'))
                {
                    delete res.xobj.chatid
                    delete res.chatid
                }
                // if(this.chatid.startsWith('msg_xmsg'))
                // {
                //     //回复或者转发
                //     res.p_xmsgid = this.chatid
                // }
                let pics = []
                for(let i=0;res.xobj.pics && i<res.xobj.pics.length;i++)
                {
                    delete res.xobj.pics[i].thumbUrl
                    pics.push( {url:res.xobj.pics[i].url,name:res.xobj.pics[i].name})
                }
                //res.xobj.pics = pics
                delete res.xobj.pics
                if(pics.length>0) res.xobj.img = pics[0].url
                res.xobj = JSON.stringify(res.xobj)

                if(res.xobj.indexOf('thumbUrl')>0){
                    this.$toast('错误：未能清理表单的图片预览数据--thumbUrl')
                    return 
                }
                console.log('sendXMSG-params:',res)
                res.xmsg = '分享一个链接：'
                let ret = await this.$api.network.sendXMSG(res)
                console.log('sendXMSG-ret:',ret)
                if(ret && ret.ret){
                    this.$toast('发布成功')
                    localStorage.setItem('newDWebFlag','1')
                    this.$router.go(-1);
                }else{
                    this.$toast('发布失败，原因：'+(ret ? ret.msg:'未知网络原因'))
                }
            }
            else if(this.posterType == 'ibapp')
            {
                let pics = []
                for(let i=0;res.pics && i<res.pics.length;i++)
                {
                    pics.push( {url:res.pics[i].url,name:res.pics[i].name})
                }
                res.pics = pics
                //得到logo
                if(res.logo && res.logo.length>0)
                {
                    res.logo = res.logo[0].url
                }else{
                    delete res.logo
                }
                console.log('createIbapp-params:',res)
                let pubkey = res.pubkey
                console.log('pubkey:',pubkey)

                let ret = await this.$api.network.web3appCreate(res)
                console.log('createIbapp-ret:',ret)
                if(ret && ret.ret){
                    this.$toast('创建智体应用IBapp成功')
                    this.$router.go(-1);
                }else{
                    this.$toast('创建智体应用失败，原因：'+(ret ? ret.msg:'未知网络原因'))
                }
            }
            else if(this.posterType == '3s')
            {
                let pics = []
                for(let i=0;res.pics && i<res.pics.length;i++)
                {
                    pics.push( {url:res.pics[i].url,name:res.pics[i].name})
                }
                res.pics = pics
                if(pics.length<=0) delete res.pics

                //得到logo
                if(res.logo && res.logo.length>0)
                {
                    res.logo = res.logo[0].url
                }else{
                    delete res.logo
                }
                console.log('poster-3s-params:',res)
                let pubkey = res.pubkey
                console.log('pubkey:',pubkey)

                let ret = await this.$api.network.setWe3appSetting(res)
                console.log('poster-3s--ret:',ret)
                if(ret && ret.ret){
                    this.$toast('修改智体应用IBapp的配置成功')
                    this.$router.go(-1);
                }else{
                    this.$toast('修改智体应用IBapp的配置失败，原因：'+(ret ? ret.msg:'未知网络原因'))
                }
            }
            else if(this.posterType == 'appkey')
            {
                console.log('setIbappKey-params:',res)
                let ret = await this.$api.network.web3appSetPubkey(res)
                console.log('setIbappKey-ret:',ret)
                if(ret && ret.ret){
                    this.$toast('设置智体应用IBapp公钥成功')
                    this.$router.go(-1);
                }else{
                    this.$toast('设置智体应用IBapp公钥失败，原因：'+(ret ? ret.msg:'未知网络原因'))
                }
            }else if(this.posterType == 'formengine')
            {
                let params = Object.assign({},res)
                delete params.user_id
                delete params.s_id
                let ret = await this.$api.network.formengineDataSave({user_id:res.user_id,
                        s_id:res.s_id,template_name:this.posterValue,data:JSON.stringify(params)})
                if(ret && ret.ret){
                    this.$toast('提交表单成功')
                }else{
                    this.$toast('提交表单失败，原因：'+(ret ? ret.msg:'未知网络原因'))
                }
            }
            else if(this.posterType == 'minicard')
            {
                res.xtype = this.xtype
                res.xobj = Object.assign({},res)
                delete res.xobj.s_id
                delete res.xobj.user_id
                //如果不是群聊，则如此操作
                if(!this.chatid.startsWith('msg_chat'))
                {
                    delete res.xobj.chatid
                    delete res.chatid
                }
                if(this.chatid.startsWith('msg_xmsg'))
                {
                    //回复或者转发
                    res.p_xmsgid = this.chatid
                }

                // let pics = []
                // for(let i=0;res.xobj.pics && i<res.xobj.pics.length;i++)
                // {
                //     delete res.xobj.pics[i].thumbUrl
                //     pics.push( {url:res.xobj.pics[i].url,name:res.xobj.pics[i].name})
                // }
                // res.xobj.pics = pics
                if(res.xobj.files && res.xobj.files.length>0){
                    res.xobj.xfile = res.xobj.files[0] //保存在xfile中
                    // res.xobj.xfile.filename = res.xobj.xfile.url
                    res.xobj.xfile.dfile_url = 'dtns://web3:'+rpc_client.roomid+'/file?filename='+res.xobj.xfile.url
                    delete res.xobj.files
                }
                res.xobj = JSON.stringify(res.xobj)

                if(res.xobj.indexOf('thumbUrl')>0){
                    this.$toast('错误：未能清理表单的图片预览数据--thumbUrl')
                    return 
                }
                console.log('sendXMSG-params:',res)

                let ret = await this.$api.network.sendXMSG(res)
                console.log('sendXMSG-ret:',ret)
                if(ret && ret.ret){
                    this.$toast('发布成功')
                    localStorage.setItem('newDWebFlag','1')
                    this.$router.go(-1);
                }else{
                    this.$toast('发布失败，原因：'+(ret ? ret.msg:'未知网络原因'))
                }
            }
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
        handleLabelsSubmit(p) {
            let This = this
          // 通过表单提交按钮触发，获取promise对象
          p().then(async (res) => {
            // 获取数据成功
            // alert(JSON.stringify(res))
            This.postLabels(res)
          })
            .catch(err => {
              console.log(err, '校验失败')
            })
        },
        async viewMiniCard(){
            if(!this.share_xmsg) return 
            let tmp = this.share_xmsg
            let fileId = tmp.xfile ? tmp.xfile.url :null
            if(tmp.xfile && tmp.xfile.dfile_url && tmp.xfile.dfile_url.startsWith('dtns://'))
            {
                fileId = tmp.xfile.dfile_url //使用的是dfile_url
            }
            console.log('viewMiniCard-onclick:',fileId)
            let item = await g_dchatManager.queryXFileInfo(fileId)
            console.log('viewMiniCard-queryXFileInfo:',item)
            if(!item) return this.$toast('获取minicard轻应用文件失败')
            //转码为文本内容（原来是u8arr)
            item = JSON.parse(new TextDecoder().decode(item))

            localStorage.setItem('canvasData', JSON.stringify(item.data))
            localStorage.setItem('canvasStyle', JSON.stringify(item.style))
            this.$toast('成功获取minicard文件，跳转pop.creator')
            imDb.addData({key:'sharetext',data:JSON.stringify(this.share_xmsg)})
            this.$router.push('/3d/creator')
        },
        async viewXVerse()
        {
            if(!this.share_xmsg) return 
            let item = this.share_xmsg
            let fileId = item.xverse_src_dtns_url ? item.xverse_src_dtns_url :item.xverse_src_url
            let fileItem = await g_dchatManager.queryXFileInfo(fileId)
            console.log('viewXVerse-fileItem-res:',fileItem)
            if(!fileItem) return this.$toast('加载xverse的3D模型源文件失败！')
            try{
                fileItem = JSON.parse(new TextDecoder().decode(fileItem))
            }catch(ex){
                console.log('json-parse-xverse-xfile-failed:'+ex,ex)
                return this.$toast('解析xverse的3D模型源文件失败！')
            }
            ifileDb.deleteDataByKey('from.dtns.3d.creator.json')
            ifileDb.addData({key:'from.dtns.3d.creator.json',data:fileItem})
            this.$router.push('/3de')
        },
        /**
         * 用于生成amap.json文件
         */
        async viewAMap()
        {
            if(!confirm('确定生成amap地图位置json源文件吗？')) return 
            let item = this.share_xmsg

            let filename = '地图位置'+Date.now()+'.amap.json'
            const encoder = new TextEncoder();
            let u8arr = encoder.encode(JSON.stringify(item))
            let file = new File([u8arr], filename, {type: 'application/json'});

            let data = {file}
            let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:filename,
                mimetype:data.file.type,filename,path:'file-path',
                size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
                file_kind:'file',random:Math.random(),data:data.file}

            console.log('amap-json-File:',data.file)
            let res = await new Promise((resolve)=>{
                rpc_client.sendFile(fileInfo,function(udata){
                    console.log('sendFile-callback-data:'+JSON.stringify(udata))
                    if(udata && udata.data) resolve(udata.data)
                    else resolve(null)
                })
            })

            console.log('send-amap-json-file-res:',res)
            if(!res || !res.ret){
                return this.$toast.fail('上传地图位置json源文件失败' +(res ?res.msg:'未知网络错误'),3000)
            }
            window.g_folder_copy_data = {url: res.filename} //主要是粘贴这个file-id（即url）
            rpc_client.downloadFileByBinary(filename,u8arr)
            this.$toast('上传地图位置json源文件成功，你也要复制粘贴至文件夹！')
        },
        async viewNews()
        {
            if(!confirm('确定生成[网址链接]json源文件吗？')) return 
            let item = this.share_xmsg

            let filename = '网址链接'+Date.now()+'.link.json'
            const encoder = new TextEncoder();
            let u8arr = encoder.encode(JSON.stringify(item))
            let file = new File([u8arr], filename, {type: 'application/json'});

            let data = {file}
            let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:filename,
                mimetype:data.file.type,filename,path:'file-path',
                size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
                file_kind:'file',random:Math.random(),data:data.file}

            console.log('news-json-File:',data.file)
            let res = await new Promise((resolve)=>{
                rpc_client.sendFile(fileInfo,function(udata){
                    console.log('sendFile-callback-data:'+JSON.stringify(udata))
                    if(udata && udata.data) resolve(udata.data)
                    else resolve(null)
                })
            })

            console.log('send-news-json-file-res:',res)
            if(!res || !res.ret){
                return this.$toast.fail('上传网址链接json源文件失败' +(res ?res.msg:'未知网络错误'),3000)
            }
            window.g_folder_copy_data = {url: res.filename} //主要是粘贴这个file-id（即url）
            rpc_client.downloadFileByBinary(filename,u8arr)
            this.$toast('上传网址链接json源文件成功，你也要复制粘贴至文件夹！')
        },
        addLabelOP()
        {
          let This = this
            // 通过函数获取数据
          this.$refs.labelsForm.getData().then(res => {
            // 获取数据成功
            //alert(JSON.stringify(res))
            This.postLabels(res)
          })
            .catch(err => {
              console.log(err, '校验失败')
            })
        },
        async postLabels(res){
            if(!this.share_xmsg) return 
            if(!res.label_type) return this.$toast('请选择关联的标签！')
            let addLabelRet = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/dweb/xmsg/label/add',{xmsgid:this.share_xmsg.xmsgid, label_type:res.label_type})
            console.log('addLabelRet:',addLabelRet)
            if(addLabelRet && addLabelRet.ret) return this.$toast('[success]关联标签成功了！')
            else return this.$toast('[failed]关联标签失败了！原因:'+(addLabelRet ? addLabelRet.msg:'未知网络原因'))
        },
        mypostViewOP(){
            console.log('mypostViewOP clicked')
            let userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) :null
            if(!userInfo) return this.$toast('user-info is empty?')
            let dstUserInfo = {user_name:userInfo.user_name,url:userInfo.logo,user_id:userInfo.user_id,label_type:'relp'}
            localStorage.setItem('dweb-into-user-info',JSON.stringify(dstUserInfo))
            this.$router.push('/dweb')
        },
        cancelDWebXmsg(){

        },
        async removeUserLabel(){
            let flag = confirm('确定删除该用户标签['+this.share_xmsg.xmsg+']吗？')
            if(!flag) return false
            let ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/dweb/xmsg/cancel',{xmsgid:this.share_xmsg.xmsgid, label_type:'rell'})
            console.log('removeLabel-ret:',ret)
            if(ret && ret.ret)
            {
                this.$toast('[success]删除用户标签['+this.share_xmsg.xmsg+']成功！')
            }else{
                this.$toast('[failed]删除用户标签['+this.share_xmsg.xmsg+']失败！原因为：'+(ret ? ret.msg:'未知网络原因'))
            }
            return ret
        },
        async setLabelAsUser(){
            let flag = confirm('确定将该标签['+this.share_xmsg.xmsg+']设置为用户标签吗？')
            if(!flag) return false
            let ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/dweb/xmsg/label/add',{xmsgid:this.share_xmsg.xmsgid, label_type:'rell'})
            console.log('removeLabel-ret:',ret)
            if(ret && ret.ret)
            {
                this.$toast('[success]设为用户标签成功！')
            }else{
                this.$toast('[failed]设为用户标签失败！原因为：'+(ret ? ret.msg:'未知网络原因'))
            }
            return ret
        },
        async removeLabel(){
            let flag = confirm('确定删除该标签['+this.share_xmsg.xmsg+']吗？')
            if(!flag) return false
            let ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/dweb/xmsg/cancel',{xmsgid:this.share_xmsg.xmsgid, label_type:'list'})
            console.log('removeLabel-ret:',ret)
            if(ret && ret.ret)
            {
                this.$toast('[success]删除标签['+this.share_xmsg.xmsg+']成功！')
            }else{
                this.$toast('[failed]删除标签['+this.share_xmsg.xmsg+']失败！原因为：'+(ret ? ret.msg:'未知网络原因'))
            }
            return ret
        },
        async setLabelAsOfficial()
        {
            let flag = confirm('确定将该标签['+this.share_xmsg.xmsg+']设置为系统化标签吗？')
            if(!flag) return false
            let ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/dweb/xmsg/label/add',{xmsgid:this.share_xmsg.xmsgid, label_type:'list'})
            console.log('removeLabel-ret:',ret)
            if(ret && ret.ret)
            {
                this.$toast('[success]系统化标签['+this.share_xmsg.xmsg+']成功！')
            }else{
                this.$toast('[failed]系统化标签['+this.share_xmsg.xmsg+']失败！原因为：'+(ret ? ret.msg:'未知网络原因'))
            }
            return ret
        },
        async cancelDWeb(){
            let flag = confirm('确定撤消该头榜吗？')
            if(!flag) return false
            let ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/dweb/xmsg/cancel',
                {user_id:localStorage.user_id,s_id:localStorage.s_id,xmsgid:this.share_xmsg.xmsgid,label_type:this.share_xmsg.label_type})
            console.log('cancelDWeb-ret:',ret)
            if(ret && ret.ret)
            {
                this.$toast('[success]撤消头榜成功！')
            }else{
                this.$toast('[failed]撤消头榜失败！原因为：'+(ret ? ret.msg:'未知网络原因'))
            }
            return ret
        },
        getData() {
            if(this.share_xmsg)
            {
                this.cancelDWeb()
                return 
            }
            let This = this
          // 通过函数获取数据
          this.$refs.KFB.getData().then(res => {
            // 获取数据成功
            //alert(JSON.stringify(res))
            This.post(res)
          })
            .catch(err => {
              console.log(err, '校验失败')
            })
        },
        translate()
        {
        // sendDwebXmsgStr
        //okPostStr:'确认',
        // myPostStr:'我的稿箱',

            this.sendDwebXmsgStr = g_dtnsStrings.getString('/index/poster/dweb/send')
            this.okPostStr = g_dtnsStrings.getString('/index/poster/dweb/ok')
            this.okTips = this.okPostStr
            this.myPostStr = g_dtnsStrings.getString('/index/poster/dweb/mypost')
        }
    },
    beforeDestroy () {
        console.log('into beforeDestroy()')
        if(typeof g_pop_event_bus!='undefined')
        {
            g_pop_event_bus.removeListener('update_dtns_loction',this.translate)
        }
    },
}
</script>
<style scoped>
.kbox{padding:10px}
.mybtnbox{padding:0 10px 10px 10px}
.mybtnbox button {color: rgb(255, 255, 255); border-radius: 4px; font-size: 13px; height: 28px; background-color: rgb(18, 173, 245); border: none;}
</style>
