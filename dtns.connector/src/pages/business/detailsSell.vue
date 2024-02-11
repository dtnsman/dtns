<template>
    <div class="otc-list-buy">
        <van-nav-bar
        title="交易中订单"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="credential" style="background-color:#fff;">
            <van-row style="text-align:center; background-color:#fff;">
                <van-col span="8">
                    <van-icon name="friends-o" size="25px" color="#333" style="float:left; padding-left:15px;" />
                    <div style="float:left; padding-top:9px; font-size:15px; color:#333;">小猫咪</div>
                </van-col>
                <van-col span="8"></van-col>
                <van-col span="8" style="font-size:15px; color:orange; padding-top:8px;">交易中</van-col>
            </van-row>
            <van-cell-group>
                <van-field label="卖出数量" :value="number" disabled style="padding:5px 0 0 15px;" />
            </van-cell-group>
            <van-cell-group>
                <van-field label="订单" :value="otc_id" disabled style="padding:2px 0 0 15px;" />
            </van-cell-group>
            <div style="display:flex;justify-content:flex-end; padding:10px 15px 10px 0;">
                <van-button type="primary" size="small" style="margin-right:10px; font-size:14px;" @click="onclickCancel">取消</van-button>
                <van-button type="primary" size="small" style="font-size:14px;" @click="onclickReceipt" >接单</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
import {NavBar,Uploader, Toast} from 'vant'
Vue.use(NavBar).use(Uploader).use(Toast)
    export default {
        data(){
            return{
                number:0,
                otc_id:''
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            // onClick() {
            //     this.$router.push({
            //         path:"detailsSell"
            //     })
            // },
            async onLoad() {
                let userInfo = {
                    order_id:this.$route.params.id
                }
                let res = await this.$api.network.OTConeOrder(userInfo);
                console.log(res)
                this.number = res.list.ret.number
                this.otc_id = res.list.ret.this_order_id
                },
            async  onclickCancel() {
                let Data = JSON.parse(localStorage.getItem('userInfo'));
                console.log(Data)
                let Random = Math.round(Math.random());
                let userInfo = {
                    user_id:Data.user_id,
                    order_id:this.$route.params.id,
                    s_id:Data.s_id,
                    random:Random,
                }
                let res = await this.$api.network.OTCorderCancel(userInfo);
                 if(res.ret){
                    Toast.success("取消成功")
                    this.$router.push({
                            path: '/business/otcwhole'
                        })
                }else {
                    Toast.fail("取消失败"+ res.msg)
                }
                
            },
            async onclickReceipt() {
                let Data = JSON.parse(localStorage.getItem('userInfo'));
                let Random = Math.round(Math.random());
                let user = {
                            user_id:Data.user_id,
                            order_id:this.$route.params.id,
                            user_otc_id:this.otc_id,
                            number:this.number,
                            s_id:Data.s_id,
                            random:Random,
                        }
                let res = await this.$api.network.OTCorderAccept(user);
                if(res.ret){
                    Toast.success("接单成功")
                    this.$router.push({
                            path: '/business/otcwhole'
                        })
                }else {
                    Toast.fail("接单失败"+ res.msg)
                }
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
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
    border-width 0px
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
