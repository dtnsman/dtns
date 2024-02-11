<template>
    <div class="box">
        <van-sticky>
            <header class="topbar" style="background-color:#fff;">
                <div style="margin:0 auto;height:46px;" align="center">
                <span style="font-size:16px; line-height:43px;margin-right:2px;">
                    <span style="font-weight:bold">{{title}}</span>
                    <slot name="icon"></slot>
                </span>
                   
                </div>
                <div @click="back" style="position:absolute; top:14px; left:15px;">
                <van-icon style="font-size:17px;" name="arrow-left" />
                </div>
                <div class="right" style="  position:absolute; 
    top:50%; 
    right:15px;
    transform translateY(-50%)">
                <slot name="rightContent"></slot>
                </div>
            </header>
        </van-sticky>
         <slot name="content"></slot>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            default: '标题',
            type: String
        },

    },
    data () {
        return {
            title1: this.title
        }
    },
    methods: {
        back () {
            this.$emit('back')
        }
    },
    watch: {
        title (newVal,oldVal) {
            this.title1 = newVal
        }
    }
}
</script>
<style lang="stylus" scoped>
 .box {
  width 100%
  height:100%
  overflow-x:hidden
  overflow-y:scroll
//   height auto
 
  // position fixed
  background-color:#f5f5f5
 }
 .topbar {
  height 46px
  
  position relative
}
.right {
    position:absolute; 
    top:50%; 
    right:15px;
    transform translateY(-50%)
}
</style>
