<template>
    <van-sticky>
        <header class="topbar">
        <div style="margin:0 auto;height:46px;" align="center">
          <span style="font-size:16px; line-height:43px;margin-right:2px;">{{title}}</span>
          <slot name="icon"></slot>
        </div>
        <div @click="back" style="position:absolute; top:14px; left:15px;">
          <van-icon style="font-size:17px;" name="arrow-left" />
        </div>
        <div style="position:absolute; top:0; right:15px;">
           <slot name="rightContent"></slot>
        </div>
        </header>
    </van-sticky>
</template>
<script>
export default {
    props: {
        title: {
            default: '标题',
            type: String
        },

    },
    methods: {
        back () {
            this.$emit('back')
        }
    }
}
</script>
