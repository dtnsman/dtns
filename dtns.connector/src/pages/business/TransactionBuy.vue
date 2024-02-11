<template>
    <div class="otc-list-buy">
        <van-nav-bar
        title="交易中订单"
        left-arrow
        @click-left="onClickLeft"
        />
        <div v-for="(item,index) in notCredential" :key="index" class="credential" style="background-color:#fff;" @click="onClick(item.this_order_id)" >
            <van-row style="text-align:center; background-color:#fff;">
                <van-col span="8">
                    <van-icon name="friends-o" size="25px" color="#333" style="float:left; padding-left:15px;" />
                    <div style="float:left; padding-top:9px; font-size:15px; color:#333;">小猫咪</div>
                </van-col>
                <van-col span="8"></van-col>
                <van-col span="8" style="font-size:15px; color:orange; padding-top:8px;">交易中</van-col>
            </van-row>
            <van-row style="padding:10px 15px 10px 15px; text-align:left;">
                <van-col span="7" style="text-align:left; font-size:15px;">卖出数量 :</van-col>
                <van-col span="6" style="font-size:16px; text-align:left;">{{item.number}}</van-col>
                <van-col span="6">
                </van-col>
                <van-col span="5">
                </van-col>
            </van-row>
            <van-row style="padding:0px 15px 10px 15px; text-align:left;">
                <van-col span="8" style="text-align:left; font-size:15px;">价格 :</van-col>
                <van-col span="8" style="font-size:16px; text-align:left;">{{item.price}}</van-col>
                <van-col span="8">
                </van-col>
            </van-row>
            <van-row style="padding:0 15px 20px 15px; text-align:left;">
                <van-col span="6" style="text-align:left; font-size:15px;">订单 :</van-col>
                <van-col span="12" style="font-size:16px; text-align:left;">{{item.this_order_id}}</van-col>
                <van-col span="6">
                </van-col>
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
              img:images
            }
        },
        mounted(){
            this.onLoad()
          //这时候请求后端数据
        },
        methods: {
            onClickLeft() {
              this.$router.push('/business/otcwhole')
            },
            onClick(id) {
                this.$router.push(`/detailsSell/${id}`)
                // this.$router.push({
                //     path:"detailsSell"
                // })
            },
            async onLoad() {
                let Data = JSON.parse(localStorage.getItem('userInfo'));
                let userInfo = {
                    user_id:Data.user_id,
                    s_id:Data.s_id,
                }
                let res = await this.$api.network.OTCorderSell(userInfo);
                this.notCredential = res.list;
                console.log(this.notCredential)
            }
        },
        created(){
            // this.userInfo = JSON.parse(localStorage.userInfo);
            //   this.onLoad()
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
    width 60px
    height 60px
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
