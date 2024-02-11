<template>
        <div class="container" v-show="isShowRecordVideo">
                <div  class="videosContainer">
                    <!-- 关闭按钮 -->
                    <div @click="closeRecordVideo" class="close"><van-icon name="close" size="40px" /></div>
                    <!-- 摄像头对应的摄像头 -->
                    <video src="" ref="video" :muted="true" :controls="false"></video>
                    <div ></div>
                     <div class="operation" :style="{'justifyContent': isRecord===0?'center': 'space-between'}">
                         <!-- 重新录制 -->
                        <div @click="onresetRecord" v-show="isRecord !== 0" class="reset"><van-icon name="clear" size="40px"  /></div>
                        <!-- 开始录制 -->
                        <van-button @click="startRecord" class="start" v-show="isRecord === 0">开始</van-button>
                        <!-- 暂停录制  -->
                        <van-button  @click="pauseRecord" v-show="isRecord === 1">暂停</van-button>
                        <van-button  @click="onresumeRecord" v-show="isRecord === 2">继续</van-button>
                        <van-button @click="changeLoaction">切换</van-button>
                        <!-- 发送录制的视频 -->
                        <div  @click="send" class="send"  v-show="isRecord !== 0"><van-icon name="checked" size="40px" /></div> 
                    </div>
                </div>
               
        </div>
</template>
<script>
import Vue from 'vue'
import { Button,Toast, Icon } from 'vant'
// import func from '../../../vue-temp/vue-editor-bridge'
import recordVideoImg from '../../../static/images/recordvideo.png'
Vue.use(Button).use(Icon).use(Toast)
export default {
   data () {
       return {
           ///显示录像机
           isShowRecordVideo: false,
           ////默认后置摄像头
           location: {facingMode: { exact: "environment" }},
           isLocation: true, 
           ///记录的媒体流
           mediaStream: '',
           ////媒体获取器
           mediaRecorder: '',
           ///获取到的媒体转化为file
           recorderFile: '',
           ////停止的回调函数
           stopRecordCallback: '',
           ///开始 和停止和继续的切换的切换 0 开始  1 暂停  2 继续
           isRecord: 0,
           ///开始录制时的数据流
           chunks: [],
           isPlay: undefined
       }
   },
   methods: {
       async open () {
        let that = this
          that.openCamera()
          that.isShowRecordVideo = true

       },
       closeRecordVideo () {
           let that = this
           if (that.mediaRecorder.state === 'inactive') {
                 that.isShowRecordVideo = false
           }else {
               that.stopRecord(function() {
               
                that.isShowRecordVideo = false
                
            }) 
           }
            that.isRecord = 0
            
           
           

       },
       ///计算摄像头的高度
       client(){
              if(window){
                  return {
                      "width": window.innerWidth,
                      "height": window.innerHeight-100
                  }
              }else if(document.documentElement){
                  return {
                      "width": document.documentElement.innerWidth,
                      "height": document.documentElement.innerHeight
                  }
              }else{
                  return {
                      "width": document.body.innerWidth,
                      "height": document.body.innerHeight
                  }
              }
          },
       ///打开摄像头
            openCamera(){
                let that = this
                let video = this.$refs.video
                video.width = that.client().width;
                video.height = that.client().height;
                video.controls = false;
                video.muted = true;
                that.getUserMedia(true, true, function (err, stream) {
                    if (err) {
                        Toast.fail('请打开摄像头和录音的权限')
                        throw err;
                    } else {
                        // 通过 MediaRecorder 记录获取到的媒体流
                        that.mediaRecorder = new MediaRecorder(stream);
                        that.mediaStream = stream;
                        var chunks = []
                        var startTime = 0
                        video.poster = recordVideoImg
                        video.srcObject = stream;
                        that.isPlay = video.play()
                        that.mediaRecorder.ondataavailable = function(e) {
                        that.mediaRecorder.blobs.push(e.data);
                            that.chunks.push(e.data);
                        };
                        that.mediaRecorder.blobs = [];
                        ///录像停止时触发
                        that.mediaRecorder.onstop = function (e) {
                            that.isPlay = video.pause()
                            that.recorderFile = new Blob(that.chunks, { 'type' : that.mediaRecorder.mimeType });
                            that.chunks = [];
                            if (null != that.stopRecordCallback) {
                                that['stopRecordCallback']();
                            }
                        };
                        that.mediaRecorder.onstart = function (){
                             video.srcObject = stream;
                             if(video.paused) {
                                  that.isPlay = video.play()
                             }
                        }
                        that.mediaRecorder.onpause = function () {
                          that.isPlay =  video.pause()
                        }
                        that.mediaRecorder.onresume = function () {
                           that.isPlay = video.play()
                        }
                }
                });
            },
            ///停止录制并获取视频数据流
            stopRecord(callback= function(){}) {
                let that = this
              
                that.stopRecordCallback = callback;
                // 终止录制器
                that.mediaRecorder.stop();
                // 关闭媒体流
                that.closeStream(that.mediaStream);
            },
            ///获取用户设备
            getUserMedia (videoEnable, audioEnable, callback) {
                   let that = this
                    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
                    || navigator.msGetUserMedia || window.getUserMedia;
                    var constraints = {video: that.location, audio: audioEnable};
                    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                        callback(false, stream);
                    })['catch'](function(err) {
                        callback(err);
                    });
                    } else if (navigator.getUserMedia) {
                        navigator.getUserMedia(constraints, function (stream) {
                        callback(false, stream);
                    }, function (err) {
                        callback(err);
                    });
                } else {
                    callback(new Error('Not support userMedia'));
                }
            },
            closeStream (stream) {
                    if (typeof stream.stop === 'function') {
                        stream.stop();
                    }
                    else {
                        let trackList = [stream.getAudioTracks(), stream.getVideoTracks()];
                        
                        for (let i = 0; i < trackList.length; i++) {
                            let tracks = trackList[i];
                            if (tracks && tracks.length > 0) {
                                for (let j = 0; j < tracks.length; j++) {
                                    let track = tracks[j];
                                    if (typeof track.stop === 'function') {
                                        track.stop();
                                    }
                                }
                            }
                        }
                    }
            },
            ///开始录制
            startRecord() {
                let that = this
                that.isRecord = 1
                that.mediaRecorder.start()
               
            },
            ///暂停录制
            pauseRecord () {
               let that = this
               that.isRecord = 2
               that.mediaRecorder.pause()
            },
            ///继续录制
            onresumeRecord () {
                let that = this 
                that.isRecord = 1
                that.mediaRecorder.resume()
            },
            ///重置录像 
            onresetRecord () {
                let that = this
                that.isRecord = 0
                if (that.mediaRecorder && that.mediaRecorder.state !== 'inactive') {
                     that.stopRecord(function () {
                         that.openCamera()
                    })
                }
               
               
            },
            ///切换摄像头
            changeLoaction () {
                let that = this 
                that.isLocation = !that.isLocation
                if (!that.isLocation) {
                    that.location = {'facingMode': "user" }
                } else {
                      that.location = { facingMode: { exact: "environment" } }
                }
               that.mediaRecorder = null
            //    that.$refs.video.load()
            //    that.isPlay = that.$refs.video.pause()
            //    if (that.isPlay !== undefined) {
            //         that.isPlay.then(() => {
            //          that.$refs.video.pause()
            //         }).catch(()=> {
            //             console.log("错误")
            //              that.$refs.video.play()
            //         })
            //     }
           
                    
              
               that.openCamera()
               that.isRecord = 0
              
            
            },
            send(){
                 let that = this
                 that.stopRecord(function() {
                
                    var file = new File([that.recorderFile], 'msr-' + (new Date).toISOString().replace(/:|\./g, '-') + '.mp4', {
                        type: 'video/mp4'
                    });
                    that.$emit('sendVideo', {
                        file: file
                    })
                    that.isShowRecordVideo = false
                    that.isRecord = 0
                    Toast.success('录制成功')
                })
             }

    
        }
}
</script>
<style lang="stylus" scoped>
    .container
        position fixed
        top: 0
        left: 0
        right 0
        bottom 0
        z-index 999999
        background-color #000
        .videosContainer
          width: 100%;
          position relative
          overflow: hidden
          .operation
            box-sizing border-box
            padding 0 25px
            position: absolute
            bottom 4rem
            left 0 
            right 0
            display flex
            justify-content space-between
            align-items center
            z-index 9999
            color #fff
           .close
              display flex
              justify-content flex-end
              color #fff
                
video {
    // border 1px solid 

}
</style>