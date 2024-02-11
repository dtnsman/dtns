<template>
    <div>
        <video ref="videoElement" width=200 height=300 controls :poster="poster" :muted="false" ></video>
    </div>
</template>
<script>
import flv from '../../../static/js/flv'
export default {
     props: {
      url: {
          default: '',
          type: String
      },
      poster: {
          default: '',
          type: String
      }
  },
    data () {
        return {
            player: ''
        }
        
    },
    methods: {
      initPlayer(leixing) {
            let that = this
            let  videoElement = that.$refs.videoElement
                if (flv.isSupported()) {
                   
                    var flvPlayer = flv.createPlayer(leixing)
                    flvPlayer.attachMediaElement(videoElement)
                    flvPlayer.load();
                    // flvPlayer.play();
                }else {
                    // videoElement.src = that.url
                }
                
            },
            setPlayer () {
                let that = this
                 let leixing = {
                type: 'mp4',
                url: that.url
                }
                if (that.isIos()) {
                    leixing = {
                        type: 'flv',
                        url: that.url + '&flv=1'
                    }
                }
                console.log( leixing)
                that.initPlayer(

                 leixing
                )
            },
            isIos () {
            let u = navigator.userAgent, app = navigator.appVersion;
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
             if (isIOS) {
                 return true
             }
             return false 
            //   let UA = window.navigator.userAgent
            //  if (UA.match(/iPad/) || UA.match(/iPhone/) || UA.match(/iPod/)) {
            //      return true
            //  }else {
            //      return false
            //  }
             }
        },
    mounted () {
       this.setPlayer()
       
    }
}
</script>
<style lang="stylus" scoped>

</style>