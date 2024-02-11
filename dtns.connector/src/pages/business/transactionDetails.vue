<template>
    <div class="otc-list-buy">
        <van-nav-bar
        title="商品详情"
        left-arrow
        @click-left="onClickLeft"
        />
        <p class="text">账户详情</p>
        <div class="content">
            <!-- <van-row type="flex">
                <van-col span="8">卖家用户</van-col>
                <van-col span="18">{{userName}}</van-col>
            </van-row> -->
            <van-row type="flex">
                <van-col span="8">商品名</van-col>
                <van-col span="18">{{rets.otc_name}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">价格</van-col>
                <van-col span="18">{{rets.price}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">最小买入</van-col>
                <van-col span="18">{{rets.minsize}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">最大买入</van-col>
                <van-col span="18">{{rets.maxsize}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">微信账户</van-col>
                <van-col span="18">{{rets.pay_wx}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">支付宝账户</van-col>
                <van-col span="18">{{rets.pay_zfb}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">银行卡账户</van-col>
                <van-col span="18">{{rets.pay_yhk}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">购买数量</van-col>
                <van-col span="18">{{ret.pay_yhk}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">描述</van-col>
                <van-col span="18" class="test" >{{rets.otc_text}}</van-col>
            </van-row>
            <div style="text-align:center; padding:20px 0 0 0;"><van-button disabled type="primary" style="font-size:15px;">等待卖家确认接单</van-button></div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
    export default {
        data(){
            return{
                userName:JSON.parse(localStorage.getItem('userInfo')).user_name,
                number:"",
               ret:{},
               rets:{}

            }
        },
        mounted(){
           this.onLoad()
          //这时候请求后端数据
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            async onLoad(){
                let Data = JSON.parse(localStorage.getItem('userInfo'));
                let userInfo = {
                   order_id: this.$route.params.id,
                   user_id:Data.user_id
                }
                let res = await this.$api.network.OTConeOrder(userInfo);
                this.ret = res.list.ret;
                this.rets = res.list.rets;
               console.log(this.rets)
            },  

        },
        created(){
            // this.userInfo = JSON.parse(localStorage.userInfo);
        },
        // mounted(){
        //   //这时候请求后端数据
        // },
    }
</script>
<style scoped lang="stylus">
.otc-list-buy
    background-color #eee
    margin 0
    padding 0
.van-icon-arrow-left {
    color #000
    font-size 1.2rem
}
.van-nav-bar__title {
    font-size 15px
}
.van-cell__title {
    font-size 15px
}
.text {
    font-size:15px 
    background-color #fff
    margin 10px 0 0 0
    padding 10px 0 0 15px
}
.content {
    width 100%
    background-color #fff
}
.van-col--8 {
    font-size 15px
    color #888 
    padding 8px 0px 8px 15px
}
.van-col--18 {
    font-size 15px
    color #111
    padding 8px 30px 8px 0px
    word-break:break-word;
}
.test {
    letter-spacing 1.2px 
}
.van-button__text[data-v-5b76d910]{
    color #fff
    letter-spacing 2px
    font-weight bold
}
</style>
