<template>
    <div>
        <nav class="navbar navbar-light bg-light">
                <span @click="back"> ❮返回 </span><span>实时聊天（视频/语音）</span><span> &nbsp; </span>
        </nav>
        <div class="container" style="padding-top: 50px;position: fixed;top:0px;left:0;right:0;bottom: 0;overflow: hidden auto;">
            <div class="row">
                <div class="col-md-12 my-3">
                    <h2>房间号</h2>
                    <input v-model="roomId" disabled>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="">
                        <my-vue-webrtc ref="webrtc"
                                    width="100%"
                                    :roomId="roomId"
                                    :enableLogs="true"
                                    :enableVideo="enableVideo"
                                    :enableAudio="enableAudio"
                                    :socketURL = "socketURL"
                                    :cameraHeight="cameraHeight"
                                    v-on:joined-room="logEvent"
                                    v-on:left-room="logEvent"
                                    v-on:opened-room="logEvent"
                                    v-on:share-started="logEvent"
                                    v-on:share-stopped="logEvent"
                                    @error="onError" />
                    </div>
                    <div class="row">
                        <div class="col-md-12 my-3">
                            <button type="button" class="btn btn-primary" @click="onJoin">开始</button>
                            <button type="button" class="btn btn-primary" @click="onLeave">离开</button>
                            <button type="button" class="btn btn-primary" @click="onCapture">截图</button>
                            <button type="button" class="btn btn-primary" @click="onShareScreen">{{ btnText }}</button>
                            <!-- <button type="button" class="btn btn-primary" @click="onCopy">分享聊天链接</button>
                            <button type="button" class="btn btn-primary" @click="onDownload">下载安卓应用</button>
                            <button type="button" class="btn btn-primary" @click="onDownload2">下载PC电脑版</button>
                            <button type="button" class="btn btn-primary" @click="onUpload">上传文件</button>
                            <button type="button" class="btn btn-primary" @click="onDownloadFile">下载文件</button> -->
                            <!-- v-on:click="chanageSetting" -->
                            <span v-on:click="enableVideo=!enableVideo">开启视频</span><input type="checkbox" class="btn btn-primary" v-model="enableVideo" checked> &nbsp; 
                            <span v-on:click="enableAudio=!enableAudio">开启音频</span><input type="checkbox" v-model="enableAudio" class="btn btn-primary" checked>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <h2>截图</h2>
                    <figure class="figure">
                        <img :src="img" class="img-responsive" />
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import  VueWebRTC  from './my-vue-webrtc';
    // import useClipboard from 'vue-clipboard3'
    // import URLJS from 'url-js'

    const { toClipboard } = {}// useClipboard()

    // var code = URLJS.parseUrl(location.href, "query", true).roomid
    // code = !code ?'':code
    // var baseUrl = URLJS.parseUrl(location.href, "origin") 
    // var shareUrl = baseUrl+'?code='+encodeURI(code)

    export default {
        name: 'demo',
        components: {
            'my-vue-webrtc': VueWebRTC,
        },
        data() {
            return {
                img: null,
                cameraHeight:'500',
                roomId: localStorage.getItem('chatid'),//code?code:"房间号19302（可自行修改）",
                enableAudio:true,
                enableVideo:true,
                enableScreen:false,
                btnText:'共享屏幕',
                shareUrl:'',
                socketURL:typeof g_rtchat_tns_url !='undefined' ? g_rtchat_tns_url : "https://groupbuying.opencom.cn:441",//"http://192.168.2.102:3000","http://127.0.0.1:3000",//
            };
        },
        mounted: function () {
        },
        computed: {
        },
        watch: {
            enableAudio(newEnableAudio ,oldEnableAudio){
                console.log('enableAudio:'+newEnableAudio+' '+oldEnableAudio)
                console.log('enableAudio:'+this.enableAudio)
                this.chanageSetting(this.enableVideo,newEnableAudio,!oldEnableAudio && this.enableVideo)
            },
            enableVideo(newEnableVideo ,oldEnableVideo){
                console.log('enableVideo:'+newEnableVideo+' '+oldEnableVideo)
                console.log('enableVideo:'+this.enableVideo)
                this.chanageSetting(newEnableVideo,this.enableAudio,!oldEnableVideo && this.enableAudio)
            },
        },
        beforeDestroy () {
            console.log('into beforeDestroy()')
            this.onLeave()
        },
        methods: {
            back(){
                this.onLeave()
                this.$router.go(-1)
            },
            chanageSetting(newEnableVideo,newEnableAudio,rejoin) {
                console.log('chanageSetting:'+newEnableVideo+' '+newEnableAudio+' rejoin:'+rejoin)
                let localStream = this.$refs.webrtc.localStream
                if(localStream) {
                
                 localStream.getAudioTracks().forEach(t => {
                     console.log('t:'+t)
                     t.enabled  = newEnableAudio
                    //  t.applyConstraints({video: newEnableVideo,audio: newEnableAudio})
                 })

                 localStream.getVideoTracks().forEach(t => {
                     console.log('t:'+t)
                     t.enabled  = newEnableVideo
                    //  t.applyConstraints({video: newEnableVideo,audio: newEnableAudio})
                 })
                }
                else{
                    if(this.join_flag  )
                    {
                        let that = this
                        setTimeout(()=>{
                            that.onJoin()
                        },300)
                        
                    }
                }

                // let screenStream = this.$refs.webrtc.screenStream
                // if(screenStream )
                // {
                //     localStream.getTracks().forEach(t=>{//getAudioTracks().forEach(t => {
                //         console.log('t:'+t)
                //         t.stop()
                //        // t.enabled  = newEnableVideo
                //         //  t.applyConstraints({video: newEnableVideo,audio: newEnableAudio})
                //     })
                // }
            }, 
            onCapture() {
                this.img = this.$refs.webrtc.capture();
            },
            onJoin() {
                this.join_flag = true
                if(!this.$refs.webrtc.localStream)
                this.$refs.webrtc.join();
            },
            onLeave() {
                try{
                    this.join_flag  = false
                    this.$refs.webrtc.leave();
                    this.$refs.webrtc.localStream = null
                    this.$refs.webrtc.screenStream = null
                }catch(ex){
                    console.log('onLeave-exception:'+ex,ex)
                }
            },
            onShareScreen() {
                //if(!this.$refs.webrtc.screenStream)
                    this.img = this.$refs.webrtc.shareScreen();
                    this.enableScreen = !this.enableScreen
                    this.btnText = this.enableScreen ?'退出共享':'共享屏幕'
                   // this.$refs.shareBtn.html()
                    
                //else

                // if(!this.enableScreen)
                // {
                //     if(!this.$refs.webrtc.screenStream)
                //         this.img = this.$refs.webrtc.shareScreen();
                //     else{
                //         this.$refs.webrtc.screenStream.getVideoTracks().forEach(t => {
                //             console.log('t:'+t)
                //             t.enabled  = true;// !
                //             //  t.applyConstraints({video: newEnableVideo,audio: newEnableAudio})
                //         })
                //     }
                //     this.enableScreen = true
                // }else{
                //     this.$refs.webrtc.screenStream.getVideoTracks().forEach(t => {
                //             console.log('t:'+t)
                //             t.enabled  = false;// !
                //             //  t.applyConstraints({video: newEnableVideo,audio: newEnableAudio})
                //         })
                //     this.enableScreen = false
                // }

                

                // this.enableScreen = !this.enableScreen
            },
            onError(error, stream) {
                console.log('On Error Event', error, stream);
            },
            logEvent(event) {
                console.log('Event : ', event);
            },
            async onCopy () {
                // code = !this.roomId ?'public-room-1':this.roomId
                // baseUrl = location.href.split('?')[0]//URLJS.parseUrl(location.href, "origin") 
                // baseUrl = baseUrl.indexOf('127.0.0.1')>=0 || baseUrl.indexOf('http')!=0
                //             ? 'https://groupbuying.opencom.cn:442/':baseUrl
                // shareUrl =  baseUrl+'?roomid='+encodeURI(code)
                // console.log('shareUrl:'+shareUrl)
                // await toClipboard(shareUrl)
                alert('复制成功！\n请粘贴到分享对话框，链接为：'+shareUrl)
                console.log('复制成功！')
            },
            onCPError () {
                console.log('复制失败！')
            },
            onDownload()
            {
                window.location.href='https://groupbuying.opencom.cn:442/'+encodeURI('RChat.apk')
            },
            onDownload2()
            {
                window.location.href='https://groupbuying.opencom.cn:442/'+encodeURI('RChat.zip')
            },
            dataURLtoBlob(dataurl,name) {//name:文件名
                var mime = name.substring(name.lastIndexOf('.')+1)//后缀名
                var bstr = atob(dataurl), n = bstr.length, u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], { type: mime });
            },
            downloadFile(url,name='默认文件名'){
                var a = document.createElement("a")//创建a标签触发点击下载
                a.setAttribute("href",url)//附上
                a.setAttribute("download",name)
                a.setAttribute("target","_blank")
                let clickEvent = document.createEvent("MouseEvents");
                clickEvent.initEvent("click", true, true);
                a.dispatchEvent(clickEvent);
            }
            //主函数
            ,downloadFileByBase64(name,base64){
                var myBlob = this.dataURLtoBlob(base64,name)
                var myUrl = URL.createObjectURL(myBlob)
                this.downloadFile(myUrl,name)
            },downloadFileByBinary(name,data){
                var mime = name.substring(name.lastIndexOf('.')+1)//后缀名
                let myBlob = new Blob([data], { type: mime });
                var myUrl = URL.createObjectURL(myBlob)
                this.downloadFile(myUrl,name)
            },
            onDownloadFile()
            {
                let This = this
                This.$refs.webrtc.download(function(data){
                    if(data.begin_str=='=file')
                        This.downloadFileByBinary(data.fileInfo.originalname,data.data)
                    else
                        This.downloadFileByBase64(data.fileInfo.originalname,data.data)
                    delete data.data
                })
                //
            },
            onUpload()
            {
                const a = document.createElement('input')
                a.setAttribute('type', 'file')
                let This = this
                // console.log('this:' + this.)

                // let pkey = newPrivateKey()
                // console.log('pkey:'+pkey)
                a.addEventListener('change', async function selectedFileChanged() {
                    console.log('data:' + this.files)
                    if (this.files.length == 0) return alert('请选择文件')

                    console.log('upload-files:' + JSON.stringify(this.files[0].name))
                    console.log('upload-files:' + JSON.stringify(this.files[0].size))
                    console.log('upload-files:' + JSON.stringify(this.files[0].mimetype))
                    console.log('upload-files:' + window.btoa(this.files[0].file))

                    //let that =this;
                    let nowFile = this.files[0]

                    if(nowFile.size>150*1024)
                    {
                        nowFile.mimetype = nowFile.name.substring(nowFile.name.lastIndexOf('.')+1)//base64file.substring(base64file.indexOf(':')+1,base64file.indexOf(';'))))
                        let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:nowFile.name,
                            mimetype:nowFile.mimetype,filename:nowFile.name,path:'file-path',size:nowFile.size,
                            data:nowFile}
                        This.$refs.webrtc.sendFile(fileInfo)
                    }else{//小文件不用二进制
                        const reader = new FileReader()
                        reader.onload = async function fileReadCompleted() {
                            let base64file = reader.result
                            nowFile.mimetype = base64file.substring(base64file.indexOf(':')+1,base64file.indexOf(';'))
                            console.log('result:' + reader.result)
                            console.log('upload-files:' + JSON.stringify(nowFile.mimetype))

                            let fileInfo = {fieldname:"file",encoding:'fromfile_base64',originalname:nowFile.name,
                                mimetype:nowFile.mimetype,filename:nowFile.name,path:'file-path',size:nowFile.size,
                                data:base64file.substring(base64file.indexOf(',')+1,base64file.length)}
                            //This.downloadFileByBase64(that.files[0].name,base64file.substring(base64file.indexOf(',')+1,base64file.length))
                            This.$refs.webrtc.sendFile(fileInfo)
                        }
                        reader.readAsDataURL(this.files[0])
                    }
                    // let nowFile = this.files[0]
                    // if(typeof This.sendFile =='function')
                    // This.sendFile(this.files[0])
                    
                    // This.propCTX['file'] = this.files[0]
                    // await This.poplang.op(null,'set','filename',this.files[0].name)
                    // let uploadRet = await This.poplang.op(null,'file.upload','x','x','x','x','file','upload_ret')
                    // This.poplang.op(null,'del','upload_ret')
                    // console.log('uploadRet:'+JSON.stringify(uploadRet))

                    //"fileInfo":{"fieldname":"file","originalname":"rmb_test.db","encoding":"7bit","mimetype":"application/octet-stream",
                    //"filename":"e15826645652bfaec0aeab454e9a109c","path":"56b706bd84a4146dab91d0cbcd737e17fd0bb9db954539d692fafe4d8956491a",
                    //"size":27889664,"file_id":"rmb_file32ZpQARSRr8S","fmt":"db","hash_type":"sha256",
                    //"hash":"56b706bd84a4146dab91d0cbcd737e17fd0bb9db954539d692fafe4d8956491a","save_time":1670062002},"data":"U1FMaXRlI

                    //read txt file  ---config file
                    // const reader = new FileReader()
                    // reader.onload = async function fileReadCompleted() {
                    //     console.log('result:' + reader.result)
                    //     let protocol0 = JSON.parse(reader.result)
                    //     This.poplang.setProtocol(protocol0) 
                    //     await This.poplang.op(null, 'set', 'token', protocol0.root_config.TOKEN_ROOT)
                    //     await This.poplang.op(null, 'set', 'opval', 60 * 60 * 24 * 100)
                    //     let result = await This.poplang.op(null, 'token.key', 'token', 'token', 'opval', 'token')
                    //     console.log('token-key-result:' + JSON.stringify(result))

                    //     // await This.poplang.op(null, 'set', 'n', 'new')
                    //     // let forkResult = await This.poplang.op(null, 'fork', 'n', 'token', 'opval', 'token')
                    //     // console.log('private_key:' + forkResult.private_key)
                    //     // console.log('fork-result:' + JSON.stringify(forkResult))

                    //     if (result.ret && result.rpc_func_ret && result.rpc_func_ret) {
                    //         This.isok = 'ok'
                    //         This.token_key = result.rpc_func_ret.token_key
                    //         This.protocol = protocol0
                    //         delete protocol0.root_config.appids
                    //         delete protocol0.root_config.secret_keys
                    //         delete protocol0.root_config.private_key
                    //         protocol0.root_config.token_key = result.rpc_func_ret.token_key

                    //         localStorage.setItem('protocol_config', JSON.stringify(protocol0))
                    //         console.log('protocol-cached:' + JSON.stringify(protocol0))
                    //     }
                    //     // var aestext = CryptoJS.AES.encrypt(reader.result, '302').toString();
                    //     // console.log('aestext:'+aestext)
                    //     // var decodeText =  CryptoJS.AES.decrypt(aestext,'302').toString(CryptoJS.enc.Utf8)
                    //     // console.log('decodeText:'+decodeText)
                    //     // console.log('text-md5:'+ md5(decodeText))
                    //     // console.log('text-sha256:'+sha256(decodeText))

                    //     // console.log('text:' + reader.result
                    //     // let { style, data } = JSON.parse(reader.result)
                    //     // // This.canvasStyleData = style
                    //     // console.log('style:' + JSON.stringify(style))
                    //     // This.$store.commit('setCanvasStyle', style)
                    //     // This.$store.commit('setComponentData', data)
                    // }

                    // reader.readAsText(this.files[0])
                })

                a.click()
            }
        }
    };
</script>
<style scoped src="../../../static/css/bootstrap.min.css">
</style>
<style scoped>
    
    .btn {
       margin-right: 8px;
    }
</style>
<!-- <style scoped>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style> -->
