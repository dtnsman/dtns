<template>
    <div class="otc-list-buy">
        <van-nav-bar
        title="联系客服"
        left-arrow
        @click-left="onClickLeft"
        />
        <van-row style="text-align:center;">
            <van-col span="5" style=" height:36px; line-height:32px;">span: 4</van-col>
            <van-col span="14"><input type="text" style="width:100%; height:30px;"></van-col>
            <van-col span="5" style="background-color:green; height:36px; line-height:32px;">发送</van-col>
        </van-row>
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
import images from '../images/2.png';
    export default {
        data(){
            return{
               
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
