<template>
    <div class="otc-list-buy">
        <van-nav-bar
        title="已上架物品"
        left-arrow
        @click-left="onClickLeft"
        />
        <div v-for="(item,index) in notCredential" :key="index" class="credential" style="background-color:#fff;" @click="onClick(item.token_y)" >
            <van-row style="text-align:center; background-color:#fff;">
                <van-col span="8">
                    <van-icon name="friends-o" size="25px" color="#333" style="float:left; padding-left:15px;" />
                    <div style="float:left; padding-top:9px; font-size:15px; color:#333;">{{userName}}</div>
                </van-col>
                <van-col span="8"></van-col>
                <van-col span="8" style="font-size:15px; color:orange; padding-top:8px;">已上架</van-col>
            </van-row>
           <div style="text-align: right; padding:15px; font-size: 15px;">
                  <van-row style="text-align: left;">
                    <van-col span="8" style="color:#555555;">商品名</van-col>
                    <van-col span="8">{{item.otc_name}}</van-col>
                    <van-col span="8"></van-col>
                  </van-row>
                  <van-row style="text-align: left; padding:10px 0px 5px 0;">
                     <van-col span="8" style="color:#555555;">最大买入</van-col>
                     <van-col span="8">{{item.maxsize}}</van-col>
                     <van-col span="8" style="text-align: center;">
                     </van-col>
                  </van-row>
                  <van-row style="text-align: left; padding:5px 0px 0px 0;">
                     <van-col span="8" style="color:#555555;">最小买入</van-col>
                     <van-col span="8">{{item.minsize}}</van-col>
                     <van-col span="8" style="text-align: center;">
                     </van-col>
                  </van-row>
                  <van-row style="text-align: left; padding:5px 0px 0px 0;">
                     <van-col span="8" style="color:#555555;">价格</van-col>
                     <van-col span="8">{{item.price}}</van-col>
                     <van-col span="8" style="text-align: center;">
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
                userName:JSON.parse(localStorage.getItem('userInfo')).user_name,
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
                this.$router.push(`/ConfirmReceipt/${id}`)
            },
            async onLoad() {
                let Data = JSON.parse(localStorage.getItem('userInfo'));
                let userInfo = {
                    user_id:Data.user_id,
                    s_id:Data.s_id,
                    begin:0,
                    len:1
                }
                let res = await this.$api.network.OTCall(userInfo);
                this.notCredential = res.list;
              
                console.log(res)
            }
        },
        created(){
            // this.userInfo = JSON.parse(localStorage.userInfo);
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
