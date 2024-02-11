<template>
    <div style="width: 100%; height: 100%;">
        <div v-if="show_op" :id="marker_id" style="width: 100%; height: 100%;"></div>
        <img @click="gotoLM" v-if="!show_op" :src="map_img" width="100%" height="100%"/>
        <textarea v-if="show_op" id="showLngLat" ref="showLngLat" style="width: 100%;height:100px;position: fixed;bottom: 10px;"></textarea>
        <div v-if="show_op" @click="goback" style="position: fixed;top:5px;left:5px;z-index: 99;background-color: aliceblue;opacity: 0.8; width:60px;height: 30px;color:black;line-height: 30px;font-size: 16px;">&lt;&nbsp;返回</div>
        <div v-if="show_op" class="dxibop">
            <span>{{ title }}</span>
            <DXIBOPBanner v-if="this.dxib" :dxib="dxib" style="width: 150px;height: auto;"></DXIBOPBanner>
            <span @click="copyFile">复制</span>
            <span @click="download">下载</span>
        </div>
        <div v-if="show_op" @click="nextItem" style="position: fixed;top:5px;right:5px;z-index: 99;background-color: aliceblue;opacity: 0.8; width:60px;height: 30px;color:black;line-height: 30px;font-size: 16px;">下一个</div>
        <button v-if="show_op" @click="sendXMSG" style="position: fixed;bottom: 15px;right: 15px; z-index: 970;padding: 5px;color: :brown;">发送头榜</button>
        <div v-if="show_op && xitem" style="position: fixed;opacity: 0.9; padding: 10px; width:100%;top:30px;left:0px;z-index: 99;background-color: #656d6f;">
            <!-- <XMsgViewer v-if="xitem" :item="xitem" :xzoom="1" :show_xmsg="true" style="width:100%;color:white"/> -->
            <component
                :is="'XMsgViewer'"
                :item="xitem" :xzoom="1" :show_xmsg="true" style="width:100%;color:white"
            />
            <span @click="closeXItem" style="position: fixed;right: 5px;top:40px;width:30px;height: 30px;line-height: 30px;color:red; display: block;">&nbsp; X &nbsp;</span>
        </div>
    </div>
</template>
<!-- <script type="text/javascript" src="https://webapi.amap.com/maps?v=2.0&key=6b11ade85ab224e16cadec54dfa9bb43"></script> -->
<script >
    // var position = new AMap.LngLat(116.397428, 39.90923);
    // position = new AMap.LngLat(113.103615,23.047549)

    // 创建地图实例
    import staticmap from "../../../../static/images/staticmap.png"
    import goalImg  from "../../../../static/images/dir-marker-goal.png"
    import viaImg  from "../../../../static/images/dir-via-marker.png"
    import redImg from "../../../../static/images/dir-marker-red2.png"
    import DXIBOPBanner from '../../../components/item/DXIBOPBanner.vue'
    // import XMsgViewer from '../../../components/item/XMsgViewer.vue'
    import XMsgViewer from '@/components/item/XMsgViewer'
    export default {
        name: 'LocationMarker',
        components: {
            // XMsgViewer,
            DXIBOPBanner
        },
        props: {
            loc_item: {
                type: Object,
                required: true,
                default: () => {},
            },
            show_op:{
                type:Boolean,
                required:true,
                default:true,
            },
        },
        data() {
            return {
                map_img:staticmap,
                itemsMap:new Map(),
                itemsList:[],
                nowPos:-1,
                xitem:null,
                now_label_type:null,
                title:'查看地图位置',
                vtips:null,//videoTipsJson,
                fullWidth:window.innerWidth,
                fileId:'',
                show_vtips:false,
                dxib:null,
                poplangs: [],
            }
        },
        beforeRouteLeave(to,from,next){
            console.log('into locationMarker beforeRouteLeave')
            this.exit()
            
            next();
        },
        methods:{
            goback(){
                this.$router.go(-1)
            },
            exit()
            {
                if(this.dxibManager)
                {
                    this.dxibManager.exit()//保存saveState，方便下次打开时继续保持history和now_pos等
                    this.dxibManager = null
                    this.dxib = null
                    console.log('locationMarker call dxibManager.exit()')
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
                    this.download()
                }
            },
            async download(){
                if(this.dxibManager)
                {
                    // let dxibObj = this.dxibManager.getDXIBObj()
                    let fileData = this.dxibManager.getDXIBFileData()
                    if(!fileData) return this.$toast('无法下载文件，dxib对象为空或资源文件为空！！')
                    rpc_client.downloadFileByBinary(this.title+'.dxib',fileData)
                }else{
                    let item = this.itemsList && this.itemsList.length>0 ? this.itemsList[0] : this.locObj
                    if(!item) return this.$toast('位置未标注，请您先标注！')

                    if(!confirm('确定生成amap地图位置json源文件吗？')) return 

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
                }
                // else
                //     ;// rpc_client.downloadFileByBinary(this.title,this.filedata)
            },
            async updateActionInfo()
            {
                let This = this
                if(!this.show_op) return 

                //将来自于json文件的内容，转为相应的location位置
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
                    this.filedata= await this.dxibManager.loadActionResFile(this.actionInfo)
                    this.dxibName = !this.dxibManager.getDXIBObj() ?  '查看地图位置': this.dxibManager.getDXIBObj().xmsg ? this.dxibManager.getDXIBObj().xmsg : this.dxibManager.getDXIBObj().name
                    this.title = this.actionInfo.xmsg ? this.actionInfo.xmsg : this.dxibName +'-'+ this.actionInfo.name //this.dxibManager.getDXIBObj() ?this.dxibManager.getDXIBObj().xmsg: 'dxib视频播放'
            
                    try{
                        let utf8decoder = new TextDecoder()
                        let text =  utf8decoder.decode(this.filedata)
                        let json = JSON.parse(text)
                        if(json.xtype == 'amap.location'){
                            console.log('save location into localStorage:',json)
                            localStorage.setItem('location',text)
                        }
                    }catch(ex)
                    {
                        console.log('locationMarker-parseActionInfo-text-json:exception:'+ex,ex)
                    }
                }
                //显示为地图控制
                setTimeout(async ()=>
                {
                    console.log('into mounted:',This.marker_id)
                    let position = null;
                    let init_zoom = 16
                    try{
                        position = JSON.parse( localStorage.getItem('location'))
                        if(position.xmsgid){
                            This.loc_item = position
                            if(position.xmsgid){
                                This.itemsMap.set(position.xmsgid,position)
                                This.itemsList.push(This.loc_item)
                            }
                        } 
                        console.log('location-marker-postion:',position,This.loc_item )
                        position = new AMap.LngLat(position.lng,position.lat)
                        init_zoom = position.zoom ? position.zoom:init_zoom
                        localStorage.removeItem('location')
                    }catch(ex){
                        console.log('parse-location-exception:'+ex,ex)
                    }

                    //这里显示出是控件（显示在xitem中）
                    if(this.position_info)
                    {
                        position = {...this.position_info}
                        init_zoom = position.zoom ? position.zoom:init_zoom
                        position = new AMap.LngLat(position.lng,position.lat)
                    }

                    var map = new AMap.Map(this.marker_id, {
                        zoom:init_zoom,
                        // center: position, //显示为网络状态下的地图所在位置   
                        center:position,
                        resizeEnable: true
                    });
                    This.map = map

                    var markers = []
                    window.markers = markers

                    function clearMarker()
                    {
                        console.log('into clearMarker')
                        map.remove(markers)
                        markers = []
                    }
                    window.clearMarker = clearMarker
                    function intoMarkerItem(xmsgid)
                    {
                        console.log('intoMarkerItem click:',xmsgid)
                        if(!xmsgid) return 
                        This.xitem = This.itemsMap.get(xmsgid)
                        console.log('intoMarkerItem-now-xitem:',This.xitem )
                    }
                    window.intoMarkerItem = intoMarkerItem

                    function showLngLatObj(lnglat,zoom,addr)
                    {
                        if(!This.show_op) return 
                        let obj = {xtype:'amap.location',lng:lnglat.lng,lat:lnglat.lat,zoom,addr}
                        This.$refs.showLngLat.innerText = JSON.stringify(obj)
                        // document.getElementById('showLngLat').innerText = JSON.stringify(obj)
                        This.locObj = obj
                    }

                    async function onClick(e,first_flag = false,mimgUrl = viaImg,xmsgid= null){
                        console.log('into loc-marker-onClick:',e,first_flag)
                        if(!This.show_op && !first_flag){
                            console.log('can not mark the postion, because is xmsgViewer-inner-component')
                            This.gotoLM()
                            return 
                        }
                        console.log('onclick:',e,JSON.stringify(e.lnglat));
                        clearMarker()
                            // 点标记显示内容，HTML要素字符串

                        let img_url = mimgUrl//mimgUrl ? mimgUrl:( first_flag ? goalImg : viaImg)
                        var markerContent = '' +
                            '<div class="custom-content-marker" onclick=intoMarkerItem("'+xmsgid+'")>' +
                            '   <img src="'+img_url+'">' +
                            // (This.show_op?'   <div class="close-btn" onclick="clearMarker()">X</div>':'') +
                            '</div>';

                        var marker = new AMap.Marker({
                            position: e.lnglat,
                            // 将 html 传给 content
                            content: markerContent,
                            // 以 icon 的 [center bottom] 为原点
                            offset: new AMap.Pixel(-13, -30)
                        });
                        if(!first_flag) //显示来源坐标不进行clearMarker
                        markers.push(marker)

                        let res = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/location/lnglat2addr',e.lnglat)

                        // 将 markers 添加到地图
                        map.add(marker);
                        showLngLatObj(e.lnglat,map.getZoom(),res&& res.ret ? res.addr_info.regeocode.formatted_address:'未知地名' )
                        console.log('map-zoom:',map.getZoom())
                        console.log('map-center:',map.getCenter())
                    }
                    // 给地图实例绑定点击事件 onClick
                    map.on('click', onClick);

                    // // 点标记显示内容，HTML要素字符串
                    // var markerContent = '' +
                    //     '<div class="custom-content-marker">' +
                    //     '   <img src="https://a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">' +
                    //     // (This.show_op?'   <div class="close-btn" onclick="clearMarker()">X</div>':'') 
                    //     +'</div>';

                    // var marker = new AMap.Marker({
                    //     position: position,
                    //     // 将 html 传给 content
                    //     content: markerContent,
                    //     // 以 icon 的 [center bottom] 为原点
                    //     offset: new AMap.Pixel(-13, -30)
                    // });

                    // // 将 markers 添加到地图
                    // markers.push(marker)
                    // map.add(marker);
                    // showLngLatObj(position)
                    if(position)
                    setTimeout(()=>onClick({lnglat:position},true,goalImg,This.loc_item ? This.loc_item.xmsgid:null),100) //将postion标记在地图中

                    if(This.loc_item && This.loc_item.xmsgid && This.loc_item.xmsgid.indexOf('xmsgl')>0)
                    {
                        let label_type = This.loc_item.xmsgid
                        This.now_label_type = label_type
                        let res = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/dweb/xmsg/list',{label_type,begin:0,len:100000})
                        console.log('location-marker.vue query-label_type:'+label_type+' res-list:',res)
                        let iCnt = 0;
                        if(res && res.ret && res.list)
                        {
                            let list = res.list
                            for(let i=0;i<list.length;i++ )
                            {
                                let item = list[i]
                                if(item.xtype != 'amap.location') continue
                                iCnt++
                                onClick({lnglat:new AMap.LngLat(item.lng,item.lat)},true,redImg,item.xmsgid) //显示出来
                                This.itemsMap.set(item.xmsgid,item)//保存，以便点击
                                This.itemsList.push(item)
                            }
                        }
                        console.log('location-marker.vue load label_type:'+label_type+' amap-location-cnt:'+iCnt)
                    }
                },100)
            },
            gotoLM(){
                if(!this.show_op)
                {
                    localStorage.setItem('location',JSON.stringify(this.loc_item))
                    this.$router.push('/lm')
                }else{
                    console.log('gotoLM:now is LocationMarker')
                }
            },
            closeXItem(){
                console.log('into closeXItem:',this.xitem)
                this.xitem = null
            },
            nextItem(){
                console.log('into nextItem:',this.itemsList,this.nowPos)
                if(!this.itemsList || this.itemsList.length<=0) return 
                this.nowPos ++
                if(this.nowPos<0) this.nowPos =0 
                this.nowPos = this.nowPos % this.itemsList.length
                this.xitem = this.itemsList[this.nowPos]
                this.$refs.showLngLat.innerText = JSON.stringify(this.xitem)
                this.locObj = this.xitem
                this.map.setCenter([this.xitem.lng,this.xitem.lat],true,300)
            },
            async sendXMSG()
            {
                if(!this.locObj) return this.$toast('请您先点击地图，标记位置！')
                localStorage.setItem('location',JSON.stringify(this.loc_item)) //以便发表头榜后返回当前页面
                try{
                    //获取得到static-map图片
                    let params = {...this.locObj}
                    params.width = 600
                    params.height= 400
                    let res = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/location/lnglat2img',this.locObj)
                    console.log('location to img-data-res:',res)
                    if(!res || !res.ret) console.log('auto-gen-static-map failed:',res)
                    else if(!res.img_data || res.img_data.length<1024)
                    {
                        console.log('res.img_data is too short:',res.img_data.length)
                    }
                    else{//保存图片
                        let u8arr = rpc_client.dataURLtoBinary(res.img_data.substring('data:image/png;base64,'.length,res.img_data.length))
                        var file = new File([u8arr], params.addr+'.png', {type: 'image/png'});
                        // file.lastModifiedDate = new Date();
                        console.log('locationMaker-new-static-map-File:',file)
                        let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:file.name,
                            mimetype:file.type,filename:file.name,path:'file-path',
                            size:file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
                            img_kind:'open',random:Math.random(),
                            data:file,img_q:0.5}
                        let imgRes = await new Promise((resolve)=>{
                            rpc_client.sendImage(fileInfo,function(udata){
                                console.log('sendFile-callback-data:'+JSON.stringify(udata))
                                if(udata && udata.data)
                                    resolve(udata.data)
                                else 
                                    resolve(udata)
                            })
                            setTimeout(()=>resolve(null),5000)
                        })
                        console.log('locationMaker-sendXMSG-imgRes:',imgRes)
                        //保存图片
                        if(!imgRes||!imgRes.ret) console.log('upload locAddr-static-map-image failed:',imgRes)
                        this.locObj.map_img = imgRes.filename 
                    }
                }catch(ex){
                    console.log('locationMarker:lnglat2img-exception:'+ex,ex)
                }
                console.log('save dweb_poster_init_data:',this.locObj)
                let sendObj = {...this.locObj}
                if(sendObj.addr) sendObj.xmsg = sendObj.addr
                delete sendObj.addr
                imDb.addData({key:'dweb_poster_init_data',data:sendObj})
                localStorage.setItem('poster_type','xmsg')
                localStorage.setItem('poster_value','normal')//类型
                if(this.now_label_type) localStorage.setItem('from_label_type',this.now_label_type)
                this.$router.push('/poster/xmsg')
            }
        },
        async created(){
            console.log('into locationMarker-created')
            this.position_info = this.loc_item
            if(this.loc_item )
            {
                this.itemsMap.set(this.loc_item.xmsgid,this.loc_item)
                this.itemsList.push(this.loc_item)
            }
            this.marker_id = 'location_maker_container_'+Date.now()+'_'+Math.random()
            if(!this.show_op)// && this.loc_item.map_img)
            {
                if(!(this.loc_item.map_img)) return 

                let This = this
                let map_img = await imageDb.getDataByKey(this.loc_item.map_img)
                map_img = map_img&& map_img.data ? map_img.data :null
                if(!map_img){//不在缓存中，请求网络
                    let img_id = this.loc_item.map_img
                    let params = img_id && img_id.startsWith('dtns://') ? {}:{user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'}
                    let reqUrl = img_id && img_id.startsWith('dtns://')  ? img_id :''
                    let data = await queryImg(reqUrl,params)
                    console.log('load-from-network-map_img:',data)
                    if(data && data.data){
                        this.map_img ='data:image/png;base64,'+data.data
                        imageDb.addData({img_id,data:this.map_img })
                    }else{
                        console.log('load-failed-map_img:',img_id)
                        this.map_img = staticmap
                    }
                }else{
                    this.map_img = map_img
                }
            }

            this.updateActionInfo()
        },
        async mounted(){
            console.log('into locationMarker-mounted',XMsgViewer)
        }   
    }

</script>
<style scoped rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"/>
<style scoped>
.dxibop {
  height: 30px;color:black;line-height: 30px;
  background-color: aliceblue;opacity: 0.8;
  display: flex;
  position: fixed;justify-content: center; top:5px;left:5px;right:5px;z-index: 98;
}
.dxibop span{display: flex;margin-left:5px;margin-right: 5px;}
</style>