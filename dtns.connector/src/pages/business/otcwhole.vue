<template>
    <div class="otc-list-buy">
<!-- 
        <van-list
                v-model="loading"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                @load="onLoad"
        > -->
            <div v-for="(item,index) in skuTreeList" :key="index" class="transactionList" @click="CommodityDetails(item.token_y)" style="background-color:#fff;border-bottom:1px solid #eee;">
                <div class="itemContent">
                    <div class="itemLeft">
                       <div style="width: 2rem">
<!--                           <van-icon name="points" size="30" color="#ffdd75" />-->
                           <img src="../images/2.png" alt="">
                       </div>
                      
                        <div class="flex data">
                            <!-- <div class="title1"> {{item.otc_name}} </div> -->
                            <div class="title2"> {{item.otc_name}} </div>
                            <!-- <div class="label">{{ getPayType(item.bePayType)}}</div> -->
                            <!-- <div class="label" v-if="item.bePayType.length">{{ getPayType(item.bePayType)}}</div> -->
                        </div>
                    </div>
                    <div class="transactionAmount">
                        {{item.price}}
                    </div>
                 </div>
                 <van-row style="padding:0 0 5px 15px; font-size:15px; color:#222; text-align:left;">
                    <van-col span="6" style="font-s">最大买入</van-col>
                    <van-col span="18">{{item.maxsize}}</van-col>
                 </van-row>
                 <van-row style="padding:0 0 5px 15px; font-size:14px; color:#222; text-align:left;">
                    <van-col span="6" style="font-s">最小买入</van-col>
                    <van-col span="18">{{item.minsize}}</van-col>
                 </van-row>
                 <van-row style="padding:0 15px 15px 15px; font-size:14px; color:#222; text-align:left;">
                    <van-col span="6" style="font-s">商品描述</van-col>
                    <van-col span="18">{{item.otc_text}}</van-col>
                 </van-row>
            </div>
        <!-- </van-list> -->
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Card ,Tab, Tabs, List, Search,Button, Tag, PullRefresh } from 'vant';
    // import 'vant/lib/index.css';
    // import urls from '../../api/teaback/url'

    Vue.use(Tab).use(Tabs).use(Search).use(Card).use(Button).use(Tag).use(List).use(PullRefresh);

    export default {

        data(){
            return{
                userInfo:"",
                skuTreeList:[],
                //下拉刷新
                pullLoading:false
            }
        },
        created(){
            // this.userInfo = JSON.parse(localStorage.userInfo);
        },
        mounted(){
           this.onLoad()
          //这时候请求后端数据
        },
        methods:{
            async onLoad(){
                let userInfo = {
                    len:10,
                    begin: 0,
                }
                let res = await this.$api.network.OTCqueryall(userInfo);
                this.skuTreeList = res.list;
                console.log(res)
                // localStorage.userInfo = JSON.stringify(res);
                // console.log(localStorage.userInfo)
            },
            CommodityDetails(id) {
                this.$router.push(`/CommodityDetails/${id}`)
            }
        }
    }
</script>
<style scoped lang="stylus">
.otc-list-buy
    background-color #eee

 .itemContent
    border-radius 6px
    box-sizing border-box
    background-color #fff
   
    padding .8rem
    display flex
    margin 0px 0px 0px 0px
    align-items center
    justify-content space-between
    .itemLeft
        display flex
    .data
        flex-flow column
        text-align left 
        padding-left:.4rem
        div 
            padding .15rem
        .title1
          font-weight bold
          font-size 15px
          letter-spacing 1px
          color #111
        .title2
            font-size 16px
            float left
            text-indent 25px
            letter-spacing 1px
            color #000
        .label
          color #666
          font-size: 8px
    .transactionAmount
        color #fd3535
        font-weight bold
        font-size 16px
.userSession >>> .van-icon
    background-color #ffdd75
</style>
