<script>
/* eslint-disable */ 
</script>

<template>
    <div class="video-list">
        
        <div :style="item.isLocal ? 'border:0px solid blue':'border:0px solid lightblue'"
            v-for="item in videoList"
             v-bind:video="item"
             v-bind:key="item.id"
             class="video-item">
            <video controls autoplay playsinline ref="videos" style="width: 100%;" :muted="item.muted" :id="item.id"></video>
            <!-- <div width='100%'>{{ item.isLocal ? '自己的音视频':'对方的音视频' }}</div> -->
        </div>
        <!-- <button @click="showList">查看摄像头和麦克风</button> -->
        <!-- <select name="microPhone" v-model="microPhone" ref="microPhone">
            <option value="" disabled selected>请选择麦克风</option>
            <option :value="item.id" v-for="(item,index) of microPhoneList" :key="index">{{item.label}}</option>
        </select> -->
        <div style="width:100%">
        <select name="camera" :style="creator ? '':'display:none'"  v-model="camera" ref="camera">
            <option value="" disabled selected>请选择摄像头</option>
            <option :value="item.id" v-for="(item,index) of cameraList" :key="index">{{item.label}}</option>
        </select>
        </div>
    </div>
</template>

<script>
    // import { defineComponent } from 'vue';
    // import { io } from "socket.io-client";
    // import adapter from 'webrtc-adapter';
    // const SimpleSignalClient = require('simple-signal-client');

    // console.log(adapter.browserDetails.browser);
    // console.log(adapter.browserDetails.version);
    export default {
        name: 'RtAudio',
        components: {
        },
        data() {
            return {
                signalClient: null,
                videoList: [],
                canvas: null,
                socket: null,
                microPhone:'',
                microPhoneList:[],
                camera:'',
                cameraList:[],
                peerMap:new Map(),
                chunkSize:150*1024,
            }
        },
        props: {
            creator:{
                type:Boolean,
                default:false,
            },
            roomId: {
                type: String,
                default: 'public-room-v2'
            },
            socketURL: {
                type: String,
                default: 'https://weston-vue-webrtc-lobby.azurewebsites.net'
                //default: 'https://localhost:3000'
                //default: 'https://192.168.1.201:3000'
            },
            cameraHeight: {
                type: [Number, String],
                default: 160
            },
            autoplay: {
                type: Boolean,
                default: true
            },
            screenshotFormat: {
                type: String,
                default: 'image/jpeg'
            },
            enableAudio: {
                type: Boolean,
                default: true
            },
            enableVideo: {
                type: Boolean,
                default: true
            },
            enableLogs: {
                type: Boolean,
                default: false
            },
            peerOptions: {
                type: Object,  // NOTE: use these options: https://github.com/feross/simple-peer
                default() {
                    return  {config:{
                                iceServers: typeof g_rtchat_turn_server_config!='undefined' ? g_rtchat_turn_server_config : [
                                // {
                                //     urls: [
                                //     'stun:1stun.l.google.com:19302',
                                //     'stun:1global.stun.twilio.com:3478'
                                //     ]
                                // },
                                // {
                                //     urls: [
                                //         'turn:127.0.0.1:3478'
                                //     ],
                                //     username: 'user1',
                                //     credential: 'YjXverJx231vJPok',
                                // }
                                {
                                    urls: [
                                        // 'turn:groupbuying.opencom.cn:3478',
                                        'turn:static.yunapi.org:3478'
                                    ],
                                    username: 'user1',//'1678502396:user1',
                                    credential:'YjXverJx231vJPok',//'LIb3/pUnzapcQ4Kw/v5F9SN5jRQ='// 'Bkj46bOLbCaC2wmmWEOSLndQtxs'//'YjXverJx231vJPok',
                                }
                                ],
                                sdpSemantics: 'unified-plan'
                            }}//{};
                }
            },
            ioOptions: {
                type: Object,  // NOTE: use these options: https://socket.io/docs/v4/client-options/
                default() {
                    return { rejectUnauthorized: false, transports: ['polling', 'websocket'] };
                }
            },
            deviceId: {
                type: String,
                default: null
            }
        },
        watch: {
        },
        mounted() {
            this.showList()
        },
        methods: {
            async join() {
                const that = this;
                this.log('join');
                let dId =  this.camera && this.camera.length>0 ? this.camera:this.deviceId
                // alert(dId)
                console.log('dID:'+dId)
                
                let constraints = {
                    video: that.enableVideo|| that.enableAudio,
                    audio: that.enableVideo|| that.enableAudio//that.enableAudio
                };
                if (dId&& that.enableVideo) {
                    constraints.video = { deviceId: { exact: dId } };
                }
                //2022-11-15新增（支持了视频、语音同时设置为false，只使用了消息通道）
                //---这个是stun、simple-peer、simple-signal-server和socket.io.client综合实现的p2p-msg消息服务。
                if(that.enableAudio || that.enableVideo)
                {
                    let localStream = null;
                    try{
                        localStream =  await navigator.mediaDevices.getUserMedia(constraints);
                    }catch(ex){
                        alert(''+ex)
                    }
                    this.localStream = localStream
                    if(!that.enableVideo)
                    {
                         localStream.getVideoTracks().forEach(t => {
                            console.log('t:'+t)
                            t.enabled  = false
                        })
                    }
                    if(!that.enableAudio)
                    {
                         localStream.getAudioTracks().forEach(t => {
                            console.log('t:'+t)
                            t.enabled  = false
                        })
                    }
                    
                    this.log('opened', localStream);
                    this.joinedRoom(localStream, true);
                }
                else{
                    this.localStream = null
                    let info =this.socket // {id:'id'+Math.random()}
                    this.log('opened',info);

                    this.joinedRoom(null,true)
                }

                if(!this.signalClient)
                {
                    this.socket = io(this.socketURL, this.ioOptions);
                    this.signalClient = new SimpleSignalClient(this.socket);
                    this.signalClient.once('discover', (discoveryData) => {
                        that.log('discovered', discoveryData)
                        async function connectToPeer(peerID) {
                            if (peerID == that.socket.id) return;
                            try {
                                that.log('Connecting to peer');
                                const { peer } = await that.signalClient.connect(peerID, that.roomId, that.peerOptions);
                                that.log('peer-config:'+JSON.stringify(peer.config))
                                // that.videoList.forEach(v => {
                                //     if (v.isLocal) {
                                //         that.onPeer(peer, v.stream);
                                //     }
                                // })
                                console.log('connected',peer)
                                that.onPeer(peer,that.localStream)
                                if(that.screenStream) that.onPeer(peer,that.screenStream)
                                peer.on('error', (err) => {
                                    that.log('peer error ', err);
                                });
                                // peer.onconnectionstatechange = (ev)=>{
                                //     that.log('onconnectionstatechange-state:'+peer.connectionState+' ev:'+ev)
                                // }
                            } catch (e) {
                                that.log('Error connecting to peer');
                            }
                        }
                        if(!discoveryData.hostid)
                            discoveryData.peers.forEach((peerID) => connectToPeer(peerID));
                        else connectToPeer(discoveryData.hostid)

                        that.$emit('opened-room', that.roomId);
                    });
                    this.signalClient.on('request', async (request) => {
                        that.log('requested', request)
                        const { peer } = await request.accept()//{}, that.peerOptions)
                        that.log('accepted', peer);

                        that.onPeer(peer, that.localStream);
                        if(that.screenStream) that.onPeer(peer,that.screenStream)
                        // that.videoList.forEach(v => {
                        //     if (v.isLocal) {
                        //         that.onPeer(peer, v.stream);
                        //     }
                        // })
                        // peer.on('error', (err) => {
                        //     that.log('peer error ', err);
                        // });
                        // peer.onconnectionstatechange = (ev)=>{
                        // that.log('onconnectionstatechange-state:'+peer.connectionState+' ev:'+ev)
                        // }
                    })
                    this.signalClient.discover(that.roomId);
                }
            },
            parseJSON(d)
            {
                try{
                    return JSON.parse(d)
                }catch(ex)
                {
                    console.log('parseJSON-ex:'+ex)
                    return d
                }
            },
            sleep(ms){
                return new Promise(resolve => setTimeout(resolve, ms));
            },
            onPeer(peer, localStream) {
                var that = this;
                that.log('onPeer1111');
                this.peerMap.set(peer.channelName,peer)

                peer.on('stream', (remoteStream) => {
                    console.log('remoteStream:',remoteStream)
                    //这里要特别注意，fix the bug 2024-1-29
                    if( !that.localStream || remoteStream.id !=that.localStream.id)
                    {
                        that.joinedRoom(remoteStream, false);
                        peer.on('close', () => {
                            var newList = [];
                            that.videoList.forEach(function (item) {
                                if (item.id !== remoteStream.id) {
                                    newList.push(item);
                                }
                            });
                            that.videoList = newList;
                            that.$emit('left-room', remoteStream.id);
                        });
                    }
                    // peer.on('error', (err) => {
                    //     that.log('peer error ', err);
                    // });
                });
                peer.on('error', (err) => {
                        that.log('peer error ', err);
                    });

                if(localStream)
                peer.addStream(localStream);
                //setTimeout(()=>{
               // },5000) 
            },
            joinedRoom(stream, isLocal) {
                if(!stream) return 
                console.log('isLocal:'+isLocal+' stream-id:'+stream.id)
                var that = this;
                let found = that.videoList.find(video => {
                    return video.id === stream.id
                })
                // if(found) return   //2022-11-24fix the bug （local播放器被同样的stream-id设置为黑屏）---被remoteStream误引入，原因在于peer.addTrack(track,stream);
                // let iPos = 0;
                if (found === undefined) {
                    let video = {
                        id: stream.id,
                        muted: isLocal,
                        stream: stream,
                        isLocal: isLocal
                    };

                    that.videoList.push(video);
                    // iPos = that.videoList.length - 1
                }

                setTimeout(function () {
                    // that.$refs.videos[iPos].srcObject = stream;
                    for (var i = 0, len = that.$refs.videos.length; i < len; i++) {
                        if (that.$refs.videos[i].id === stream.id){// && that.$refs.videos[i].isLocal == isLocal) {
                            that.$refs.videos[i].srcObject = stream;
                            break;
                        }
                    }
                    //2022-11-24新增，重新添加音视频轨道
                    //if(!isLocal)
                    that.signalClient.peers().forEach(peer => {

                        for (const track of stream.getTracks()) {
                            try{
                                peer.addTrack(track,stream);
                            }catch(ex)
                            {
                                console.log('joinedRoom-addTrack-ex:'+ex)
                            }
                        }
                    })
                }, 100);

                that.$emit('joined-room', stream.id);
            },
            leave() {
                //if(this.enableAudio || this.enableVideo)
                // {
                    this.videoList.forEach((v) => {
                        try{
                        v.stream.getTracks().forEach(t => t.stop())
                        }catch(ex){console.log('ex:'+ex)}
                    });


                    this.videoList = [];
                // }

                try{
                    this.signalClient.peers().forEach(peer => {peer.removeAllListeners();peer.destroy()})
                    this.signalClient.destroy();
                 }catch(ex)
                {
                    console.log('leave-remove-this.signalClient-peers-exception:'+ex,ex)
                }
                
                this.signalClient = null;
                try{
                    this.socket.destroy();
                }catch(ex)
                {
                    console.log('leave-this.socket.destroy-peers-exception:'+ex,ex)
                }
                this.socket = null;
                this.peerMap = new Map()
                
            },
            capture() {
                return this.getCanvas().toDataURL(this.screenshotFormat);
            },
            getCanvas() {
                let video = this.$refs.videos[0];
                if (video !== null && !this.ctx) {
                    let canvas = document.createElement('canvas');
                    canvas.height = video.clientHeight;
                    canvas.width = video.clientWidth;
                    this.canvas = canvas;
                    this.ctx = canvas.getContext('2d');
                }
                const { ctx, canvas } = this;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                return canvas;
            },
            async shareScreen() {
                var that = this;
                if(!this.screenStream)
                {
                    if (navigator.mediaDevices == undefined) {
                        that.log('Error: https is required to load cameras');
                        return;
                    }

                    try {
                        var screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio:false})// that.enableAudio });
                        this.screenStream = screenStream
                        this.joinedRoom(screenStream, true);
                        that.$emit('share-started', screenStream.id);
                        that.signalClient.peers().forEach(p => that.onPeer(p, screenStream));
                        return this.screenStream
                    } catch (e) {
                        that.log('Media error: ' + JSON.stringify(e));
                    }
                }
                else{
                    this.screenStream.getTracks().forEach(t => t.stop())
                    let vlist = []
                    for(let i=0; this.videoList && i<this.videoList.length;i++)
                    {
                        if(this.videoList[i] == this.screenStream) continue
                        else vlist.push(this.videoList[i])
                    }
                    this.videoList = vlist
                    this.screenStream = null
                }
            },
            log(message, data) {
                if (this.enableLogs) {
                    console.log(message);
                    if (data != null) {
                        console.log(data);
                    }
                }
            },

             showList() {
                 var audioSelect = []
                 var videoSelect = []
            navigator.mediaDevices
                .enumerateDevices()
                .then((deviceInfos)=>{
                    this.microPhoneList = [];
                    this.cameraList = [];
                    for (let i = 0; i !== deviceInfos.length; ++i) {
                        let deviceInfo = deviceInfos[i];
                        let option = {};
                        option.id = deviceInfo.deviceId;
                        if (deviceInfo.kind === "audioinput") {
                            option.label =
                                deviceInfo.label ||
                                "microphone " + (audioSelect.length + 1);
                            this.microPhoneList.push(option);
                            audioSelect.push(option)
                        } else if (deviceInfo.kind === "videoinput") {
                            option.label =
                                deviceInfo.label ||
                                "camera " + (videoSelect.length + 1);
                            this.cameraList.push(option);
                            videoSelect.push(option)
                        } else {
                            console.log(
                                "Found one other kind of source/device: ",
                                deviceInfo
                            );
                        }
                    }
                    // this.microPhone = this.microPhoneList[this.microPhoneList.length-1].id;
                    // this.camera = this.cameraList[this.cameraList.length-1].id;
                    // this.videoStart();
                })
                .then(()=>{
                    // this.removeEvent(this.$refs.microPhone,"change",this.videoStart);
                    // this.addEvent(this.$refs.microPhone,'change',this.videoStart);
                    // this.removeEvent(this.$refs.camera,"change",this.videoStart);
                    // this.addEvent(this.$refs.camera,'change',this.videoStart);
                })
                .catch((err)=>{
                    console.log(err);
                });
        },

        }
    }
</script>
<style scoped>
    .video-list {
        background: whitesmoke;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
    }

        .video-list div {
            padding: 0px;
        }

    .video-item {
        background: #c5c4c4;
        display: inline-block;
    }
</style>
