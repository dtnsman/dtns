<template>


<div>
      <video id="video" controls :poster="poster">
                      <source :src="url" type="video/mp4">
                      <source :src="url" type="video/webm">
                      <source :src="url" type="video/ogg">
                    你的浏览器不支持该功能
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
          player: '',
      }
  },
  methods: {
       client(){
              if(window){
                  return {
                      "width": window.innerWidth,
                      "height": window.innerHeight
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
          }
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
#video {
  max-height 280px;
//   width 50%
  max-width 180px;

}
.video-js.vjs-time-control{display:block;}
.video-js.vjs-remaining-time{display: none;}
</style>