<template>
    <div>
        <video ref="exampleVideo" width=250 height=300 class="video-js vjs-default-skin" controls>
          <!-- <source :src="url" type="video/mp4">
            <source :src="url" type="video/webm">
            <source :src="url" type="video/ogg">
            <source  :src="url + '&flv=1'"  type="video/flv"> -->
      </video>
         
    </div>
</template>
<script>
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
            initPlayer () {
       let that = this
       that.player = videojs(that.$refs.exampleVideo, {
            controls: true, 
            preload: "metadata", // 预加载视频元数据
            muted: false, 
            
            poster: that.poster, // 视频封面
            sources: [
                { src: that.url, type: "video/mp4" },
                { src: that.url, type: "video/webm" },
                 { src: that.url, type: "video/ogg" },
                { src: that.url + '&flv=1', type: "video/flv" }
            ],
            flash: {
                swf: "https://cdn.bootcdn.net/ajax/libs/videojs-swf/5.2.0/video-js.swf"
            },
       })

    },
    isIos () {
         if (window.navigator) {
        //       var ua = window.navigator.userAgent.toLowerCase();
        //     if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        //         return true;
        //     } else {
        //         return false;
        // 　   }
            // let u = navigator.userAgent, app = navigator.appVersion;
            // let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
            //  if (isIOS) {
            //      return true
            //  }
            //  return false 

             let UA = window.navigator.userAgent
             if (UA.match(/iPad/) || UA.match(/iPhone/) || UA.match(/iPod/)) {
                 return true
             }else {
                 return false
             }
         }
     }
    },
    mounted () {
        this.initPlayer()
    }
}
</script>
<style lang="stylus" scoped>

</style>