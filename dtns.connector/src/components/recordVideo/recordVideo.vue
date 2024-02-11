<template>
        <div class="container" v-show="isShowRecordVideo">
               <!-- <video  id="video1" :muted="true"  :controls="true" loop  style="position:fixed;width:100px;height:100px;z-index:999"></video> -->
                <div  class="videosContainer" @touchmove.prevent>
                    <!-- 关闭按钮 -->
                    <van-nav-bar
                    style="background-color:#000;border:0;color:#fff"
                    left-arrow
                    @click-left="closeRecordVideo"
                    @click-right=" changeLoaction "
                    >
                    <div slot="right">
                       <svg  t="1590028822370"  autoplay style=" vertical-align:middle" class="icon" viewBox="0 0 1126 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2441" width="32" height="32"><path d="M1004.365512 157.706722h-192.947139L724.789045 12.011944a23.62618 23.62618 0 0 0-23.62618-11.81309h-275.63877a23.62618 23.62618 0 0 0-23.626181 11.81309L315.268587 157.706722H122.321447A129.943992 129.943992 0 0 0 0.252849 295.526107v590.654508A129.943992 129.943992 0 0 0 122.321447 1024h882.044065a129.943992 129.943992 0 0 0 122.068598-137.819385v-590.654508A129.943992 129.943992 0 0 0 1004.365512 157.706722z m-220.511016 500.087483a244.137196 244.137196 0 0 1-27.563877 74.816238h-3.937697a204.760229 204.760229 0 0 1-39.376967 43.314664H709.038258l-27.563877 19.688483h-3.937697l-31.501573 15.750787-31.501574 7.875394h-39.376967a216.573319 216.573319 0 0 1-208.697926-153.570172H354.645554a19.688484 19.688484 0 0 1-19.688484-11.81309 23.62618 23.62618 0 0 1-3.937697-27.563877l23.626181-43.314664a31.501574 31.501574 0 0 1 19.688483-19.688484 35.43927 35.43927 0 0 1 27.563877 11.81309l35.439271 47.252361a23.62618 23.62618 0 0 1 3.937696 27.563877 19.688484 19.688484 0 0 1-19.688483 15.750787 157.507869 157.507869 0 0 0 153.570172 110.255508H630.284324l23.62618-11.81309 19.688484-15.750787h3.937696a165.383262 165.383262 0 0 0 55.127755-94.504721 27.563877 27.563877 0 0 1 31.501573-19.688484 23.62618 23.62618 0 0 1 19.688484 23.62618z m0-66.940844a27.563877 27.563877 0 0 1-15.750787 19.688484h-27.563877l-47.252361-43.314664a19.688484 19.688484 0 0 1-7.875393-23.62618 19.688484 19.688484 0 0 1 15.750787-19.688484 157.507869 157.507869 0 0 0-169.320959-82.691631 145.694779 145.694779 0 0 0-118.130902 94.504721 31.501574 31.501574 0 0 1-39.376967 11.81309 23.62618 23.62618 0 0 1-11.81309-35.43927 204.760229 204.760229 0 0 1 157.507869-126.006295 212.635623 212.635623 0 0 1 232.324106 118.130901h7.875394a39.376967 39.376967 0 0 1 27.563877 7.875394 19.688484 19.688484 0 0 1 7.875393 23.62618z" fill="#ffffff" p-id="2442"></path></svg>
                    </div>
                   </van-nav-bar>
                    <!-- <div @click="closeRecordVideo" style="position:absolute;left:10px;top:10px;z-index:10" class="close"><van-icon name="arrow-left" size="40px" /></div> -->
                    <!-- 摄像头对应的摄像头 -->
                    <video src="" ref="video"  :muted="true" :controls="false" loop :width="client().width" :height="client().height"></video>
                    
                    
                    <div ></div>
                     <div class="operation" :style="{'justifyContent': isRecord === 0?'center':'space-between'}">
                         <!-- 重新录制 -->
                        <div @click="onresetRecord" v-show="isRecord !== 0" class="reset"><van-icon name="clear" size="60px"  /></div>
                        <!-- 开始录制 -->
                     <div @touchstart.prevent="touchstart" @touchmove="touchmove" @touchend="touchend" v-show="isRecord === 0">
                        <van-circle
                        v-model="currentRate"
                        :rate="rate"
                        size="80px"
                        layer-color="#fff"
                        stroke-linecap="butt"
                        color="#25BAF4"
                       
                        fill="#fff">
                        <div slot="default" style="position:absolute;top:50%;left:50%;border-radius:100%;background-color:#25BAF4;transition all 5s linear;width:70%;
                         height:70%"
                        :style="{transform}"
                        >
                        </div>
                        </van-circle>
                     </div>
                        <!-- <div @click="rate+=10">哈哈</div> -->
                        <!-- <van-circle v-model="currentRate" :rate="rate" layer-color="#cc0001"  size="50px"  /> -->
                        <!-- <van-button @click="startRecord" class="start" v-show="isRecord === 0" >开始</van-button> -->
                        <!-- 暂停录制  -->
                        <!-- <van-button  @click="pauseRecord" v-show="isRecord === 1">暂停</van-button> -->
                        <van-button  @click="onresumeRecord" v-show="isRecord === 2">继续</van-button>
                        <!-- <van-button @click="changeLoaction">切换</van-button> -->
                        <!-- 发送录制的视频 -->
                        <div  @click="send" class="send"  v-show="isRecord !== 0"><van-icon name="checked" size="60px" /></div> 
                    </div>
                </div>
               
        </div>
</template>
<script>
import Vue from 'vue'
import { Button,Toast, Icon,Circle} from 'vant'
import recordVideoImg from '../../../static/images/recordvideo.png'
// import mp4 from './video.mp4'
Vue.use(Button).use(Icon).use(Toast).use(Circle)
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
           isPlay: undefined,
           currentRate: 0,
           rate: 0,
           timer: '',
            transform:"translate(-50%,-50%) scale(1,1)",
            url1: '',
            // mp4: mp4
       }
   },
   methods: {
       async open () {
        let that = this
        //   that.isShowRecordVideo = true
          that.openCamera()
         

       },
       closeRecordVideo () {
           console.log(123)
           let that = this
           if (!that.mediaRecorder) return that.isShowRecordVideo = false
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
                      "height": window.screen.availHeight
                  }
              }else if(document.documentElement){
                  return {
                      "width": document.documentElement.innerWidth,
                      "height": screen.availHeight
                  }
              }else{
                  return {
                      "width": document.body.innerWidth,
                      "height": screen.availHeight
                  }
              }
          },
       ///打开摄像头
            openCamera(){
                let that = this
                let video = this.$refs.video
                // video.width = that.client().width;
                // video.height = that.client().height;
                video.controls = false;
                video.muted = true;
                that.getUserMedia(true, true, function (err, stream) {
                    if (err) {
                        
                        Toast.fail('请打开摄像头和录音的权限')
                         throw err;
                    } else {
                        // that.isShowRecordVideo = true
                        // 通过 MediaRecorder 记录获取到的媒体流
                        that.mediaRecorder = new MediaRecorder(stream);
                        that.mediaStream = stream;
                        var chunks = []
                        var startTime = 0
                        video.poster = recordVideoImg
                        video.srcObject = stream;
                        that.isPlay = video.play()
                        that.isShowRecordVideo = true
                        that.mediaRecorder.ondataavailable = function(e) {
                        that.mediaRecorder.blobs.push(e.data);
                            that.chunks.push(e.data);
                        };
                        that.mediaRecorder.blobs = [];
                        ///录像停止时触发
                        that.mediaRecorder.onstop = function (e) {
                            // that.isPlay = video.pause()
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
                        //   that.isPlay =  video.pause()
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
                that.mediaRecorder.start()
                
            },
            ///暂停录制
            pauseRecord (callback) {
               let that = this
               
               that.mediaRecorder.pause()
               if(callback) {
                   callback()
               }
            },
            ///继续录制
            onresumeRecord () {
                let that = this 
               
                that.mediaRecorder.resume()
            },
            ///重置录像 
            onresetRecord () {
                let that = this
                that.isRecord = 0
                 that.mediaStream = ''
                 that.recorderFile = ''
                 that.openCamera()
                // if (that.mediaRecorder && that.mediaRecorder.state !== 'inactive') {
                //    that
                // }else {
                //      that.$refs.vidoe.play()
                // }
               
               
               
            },
            ///切换摄像头
            changeLoaction () {
                let that = this 
                that.isLocation = !that.isLocation
                if (!that.isLocation) {
                    that.location = {'facingMode': "user" }
                } else {
                      that.location = { "facingMode":"environment" }
                }
                that.isRecord = 0
                that.openCamera()
                
               
            
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
                    that.isRecord = 0
                    that.isShowRecordVideo = false
                 
                    Toast.success('录制成功')
                })
             },
             async touchstart () {
                 let that = this
                 let time = 0
                 that.transform = "translate(-50%,-50%) scale(.5,.5)"
                 that.startRecord()
                 that.timer = setInterval(() => {
                     time +=1000
                     if (time === 60000) {
                         clearInterval(that.timer)
                         that.timer = null
                         that.rate = 0
                         that.currentRate = 0
                         that.isRecord = 1
                        var file = new File([that.recorderFile], 'msr-' + (new Date).toISOString().replace(/:|\./g, '-') + '.mp4', {
                            type: 'video/mp4'
                         });

                        //  that.pauseRecord()
                         ////修改
                        //  var file = new File([that.recorderFile], 'msr-' + (new Date).toISOString().replace(/:|\./g, '-') + '.mp4', {
                        //     type: 'video/mp4'
                        //  });
                         
                        //  that.send()
                     }else {
                         that.rate = (time / 60000) * 100
                     }
                 }, 1000);
                 console.log(that.rate)
             },
             touchmove () {

             },
             touchend() {
                 let that = this
                 if (that.timer) {
                      clearInterval(that.timer)
                      that.timer = null
                      that.rate = 0
                      that.currentRate = 0
                      that.isRecord = 1
                     
                   that.pauseRecord(function(){
                       that.$refs.video.pause()
                    })
                    // this.$refs.video.pause()
            
                    
                   
                    
                    //   that.send()
                 }
                  that.transform = "translate(-50%,-50%) scale(1,1)"
                 
               
             }

    
        },
        computed: {
             
        },
        beforeDestroy () {
            let that = this
            that.mediaRecorder = ''
            that.mediaStream = ''
            that.recorderFile = ''
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
            bottom 20%
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
.van-hairline--bottom::after
    border-bottom-width 0px

.container >>> .van-nav-bar .van-icon
    color: #fff
</style>