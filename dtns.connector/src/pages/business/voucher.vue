<template>
    <div class="otc-list-buy">
        <van-nav-bar
        title="未发送凭证订单"
        left-arrow
        @click-left="onClickLeft"
        />
        <div v-for="(item,index) in notCredential" :key="index" class="credential" style="background-color:#fff;">
            <van-row style="text-align:center; background-color:#fff;">
                <van-col span="8">
                    <van-icon name="friends-o" size="25px" color="#333" style="float:left; padding-left:15px;" />
                    <div style="float:left; padding-top:9px; font-size:15px; color:#333;">小猫咪</div>
                </van-col>
                <van-col span="8"></van-col>
                <van-col span="8" style="font-size:15px; color:orange; padding-top:8px;">未发送凭证</van-col>
            </van-row>
                <div style="text-align: right; padding:15px; font-size: 15px;">
                  <van-row style="text-align: left;">
                    <van-col span="8" style="color:#555555;">购买数量</van-col>
                    <van-col span="8">{{item.number}}</van-col>
                    <van-col span="8"></van-col>
                  </van-row>
                  <van-row style="text-align: left; padding:5px 0 15px;">
                     <van-col span="8" style="color:#555555;">交易状态</van-col>
                     <van-col span="8">卖家已确认接单</van-col>
                     <van-col span="8" style="text-align: center;">
                        <van-button type="info" @click.stop="toUploadCedentials(item.token_y)">发送凭证</van-button>
                     </van-col>
                  </van-row>
                </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Row, Col, Card, Button } from 'vant';
Vue.use(Row).use(Col).use(Card).use(Button)
import images from '../images/2.png';
    export default {
        data(){
            return{
                notCredential:[],
              img:images
            }
        },
        methods: {
            onClickLeft() {
               this.$router.push('/business/otcwhole')
            },
            toUploadCedentials (id) {
                this.$router.push(`business/otcbuy/voucher/UploadCedentials/${id}`)
                // this.$router.push({
                //  path: '/business/otcbuy/voucher/UploadCedentials/'+ id
                // })
            },
            toOrderDetail (id) {
                this.$router.push({
                    path: '/business/otcbuy/CedentialsDetail/'+ id
                })
            },
            async onLoad() {
                let data = JSON.parse(localStorage.getItem('userInfo'));
                let userInfo = {
                    user_id:data.user_id,
                    s_id:data.s_id,
                }
                let res = await this.$api.network.OTCcacceptybuy(userInfo);
                this.notCredential = res.list;
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
