<template>
    <div class="otc-list-buy">
        <van-nav-bar
        title="交易中订单"
        left-arrow
        @click-left="onClickLeft"
        />
        <div v-for="(item,index) in notCredential" :key="index" class="credential" style="background-color:#fff;" @click="toTransactionBuyDetail(item.this_order_id)" >
            <van-row style="text-align:center; background-color:#fff;">
                <van-col span="8">
                    <van-icon name="friends-o" size="25px" color="#333" style="float:left; padding-left:15px;" />
                    <div style="float:left; padding-top:9px; font-size:15px; color:#333;">{{userName}}</div>
                </van-col>
                <van-col span="8"></van-col>
                <van-col span="8" style="font-size:15px; color:orange; padding-top:8px;">交易中</van-col>
            </van-row>
           <div style="text-align: right; padding:15px; font-size: 15px;">
                  <van-row style="text-align: left;">
                    <van-col span="8" style="color:#555555;">购买数量</van-col>
                    <van-col span="8">{{item.number}}</van-col>
                    <van-col span="8"></van-col>
                  </van-row>
                  <van-row style="text-align: left; padding:10px 0px 5px 0;">
                     <van-col span="8" style="color:#555555;">订单</van-col>
                     <van-col span="8">{{item.this_order_id}}</van-col>
                     <van-col span="8" style="text-align: center;">
                     </van-col>
                  </van-row>
                  <!-- <van-row style="text-align: left; padding:5px 0px 0px 0;">
                     <van-col span="8" style="color:#555555;">价格</van-col>
                     <van-col span="8">{{item.price}}</van-col>
                     <van-col span="8" style="text-align: center;">
                     </van-col>
                  </van-row> -->
                  
                </div>
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
                userName:JSON.parse(localStorage.getItem('userInfo')).user_name,
                notCredential:[],
                img:images
            }
        },
        methods: {
            onClickLeft() {
                this.$router.push('/business/otcwhole')
            },
            toTransactionBuyDetail (id) {
                   this.$router.push(`/transactionDetails/${id}`)
                // this.$router.push({
                //     path:'/transactionDetails/'+ id
                // })
            },
            async onLoad() {
               let data = {
                    user_id:JSON.parse(localStorage.getItem('userInfo')).user_id,
                    s_id :JSON.parse(localStorage.getItem('userInfo')).s_id
               }
                let res = await this.$api.network.OTCorderBuy(data);
                    this.notCredential = res.list;
                    console.log(this.notCredential)
            }
        },
        created(){
            // this.userInfo = JSON.parse(localStorage.userInfo);
            this.onLoad()
        },
        mounted(){
          //这时候请求后端数据
        },
    }
</script>
<style scoped lang="stylus">
.van-card__thumb {
    width 50px
    height 50px
}
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
