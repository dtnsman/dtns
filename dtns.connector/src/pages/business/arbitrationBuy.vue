<template>
    <div class="otc-list-buy">
        <van-nav-bar
        title="所有仲裁中订单"
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
                <van-col span="8" style="font-size:15px; color:orange; padding-top:8px;">等待仲裁结果</van-col>
            </van-row>
                <div style="text-align: right; padding:15px; font-size: 15px;">
                  <van-row style="text-align: left;">
                    <van-col span="8" style="color:#555555;">购买数量</van-col>
                    <van-col span="8">{{item.number}}</van-col>
                    <van-col span="8"></van-col>
                  </van-row>
                  <van-row style="text-align: left; padding:5px 0px 0px 0;">
                     <van-col span="8" style="color:#555555;">订单</van-col>
                     <van-col span="8">{{item.this_order_id}}</van-col>
                     <van-col span="8" style="text-align: center;">
                     </van-col>
                  </van-row>
                  <van-row style="text-align: left; padding:5px 0px 0px 0;">
                     <van-col span="8" style="color:#555555;">交易状态</van-col>
                     <van-col span="8">仲裁中</van-col>
                     <van-col span="8" style="text-align: center;">
                        <van-button type="info" color="green">仲裁中</van-button>
                     </van-col>
                  </van-row>
                  
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
                notCredential:[],
              img:images
            }
        },
        methods: {
            onClickLeft() {
                this.$router.push('/business/otcwhole')
            },
            // toArbitrationDetail(id) {
            //     this.$router.push({
            //         path: '/business/otcbuy/ArbitrationDetail/'+id

            //     })
            // },
            async onLoad() {
                let Data = JSON.parse(localStorage.getItem('userInfo'));
                let userInfo = {
                    user_id:Data.user_id,
                    s_id:Data.s_id,
                }
                let res = await this.$api.network.OTcAppealsells(userInfo);
                this.notCredential = res.list
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
