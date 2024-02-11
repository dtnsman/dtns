<template>
    <div class="otc-list-buy">
        <van-nav-bar
        title="所有订单"
        left-arrow
        @click-left="onClickLeft"
        style="background-color:#eee"
        />
        <div>
            <van-cell title="交易成功订单" is-link to="/SuccessfulTradeBuy"></van-cell>
            <van-cell title="仲裁中订单" is-link to="/Arbitration"></van-cell>
            <van-cell title="交易中订单" is-link to="/TransactionBuy"></van-cell>
            <van-cell title="待确认" is-link to="/ConfirmBuy"></van-cell>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
    export default {
        data(){
            return{
               
            }
        },
        methods: {
            onClickLeft() {
              this.$router.push('/business/otcwhole')
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
.van-icon-arrow-left {
    color #000
    font-size 1.3rem
}
.van-nav-bar__title {
    font-size 15px
}
.van-cell__title {
    font-size 15px
}
</style>
