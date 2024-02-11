<template>
    <div class="otc-list-buy">
        <van-nav-bar
        title="联系客服"
        left-arrow
        @click-left="onClickLeft"
        />
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
import images from '../images/2.png';
    export default {
        data(){
            return{
                notCredential:[{
                    price:'2.00',
                    desc:"描述信息",
                    title:'标题',
                }],
              img:images
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            }
        },
        created(){
            // this.userInfo = JSON.parse(localStorage.userInfo);
        },
        mounted(){
          //这时候请求后端数据
        },
    }
</script>
<style scoped lang="stylus">
.otc-list-buy
    background-color #eee
    margin 0
    padding 0
</style>
