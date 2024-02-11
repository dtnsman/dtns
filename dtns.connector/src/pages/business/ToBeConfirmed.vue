<template>
    <div class="otc-list-buy">
        <van-nav-bar
        title="待卖家确认订单"
        left-arrow
        @click-left="onClickLeft"
        />
        <div v-for="(item,index) in notCredential" :key="index" class="credential" style="background-color:#fff;" @click="toSellerConfirmationDetail(item.this_order_id)">
            <van-row style="text-align:center; background-color:#fff;">
                <van-col span="8">
                    <van-icon name="friends-o" size="25px" color="#333" style="float:left; padding-left:15px;" />
                    <div style="float:left; padding-top:9px; font-size:15px; color:#333;">小猫咪</div>
                </van-col>
                <van-col span="8"></van-col>
                <van-col span="8" style="font-size:15px; color:orange; padding-top:8px;">未确认</van-col>
            </van-row>
            <van-card
            :thumb="img"
            />
            <van-row type="flex" style="padding:0 0 15px 15px;">
                <van-col span="6">订单id</van-col>
                <van-col span="18">{{item.this_order_id}}</van-col>
            </van-row>
            <van-row type="flex" style="padding:0 0 15px 15px;">
                <van-col span="6">购买数量</van-col>
                <van-col span="18">{{item.number}}</van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
import images from '../images/2.png';
    export default {
        data(){
            return{
                notCredential:[],
                this_order_id:'',
              img:images
            }
        },
        methods: {
            onClickLeft() {
               this.$router.push('/business/otcwhole')
            },
            toSellerConfirmationDetail (id) {
                this.$router.push({
                     path: '/business/otcbuy/SellerConfirmationDetail/'+ id ///待卖家确认订单
                
                })
            },
            async onLoad() {
                let Data = JSON.parse(localStorage.getItem('userInfo'));
                let userInfo = {
                    user_id:Data.user_id,
                    s_id:Data.s_id,
                }
                let res = await this.$api.network.OTCorderupload(userInfo);
                this.notCredential = res.list;
                // this.this_order_id = res.list.this_order_id;
                console.log(this.notCredential)
                console.log(res)
                },
               
        },
        created(){
            // this.userInfo = JSON.parse(localStorage.userInfo);
        },
        mounted(){
          this.onLoad()
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
.credential >>> .van-image__img {
    text-align center
    width 50px
    height 50px
}
.credential {
    margin 10px 0px 0px 0px
    padding 0
    border-bottom 1px solid #eee
}
.van-icon-friends-o::before{
    padding-top 8px
}
</style>