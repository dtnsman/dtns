<template>
    <div class="otc-list-buy">
        <van-grid :column-num="3">
            <van-grid-item icon="todo-list" text="交易中" to="/TransactionSell" :info="length1" style="color:#97694f">
            </van-grid-item>
            <van-grid-item icon="column" text="未发送凭证" to="/voucher" :info="length2" />
            <van-grid-item icon="card" text="待卖家确认" to="/ToBeConfirmed" :info="length3" />
        </van-grid>
        <van-grid :column-num="3">
            <van-grid-item icon="label" text="仲裁中" to="/Arbitration" :info="length4" />
            <van-grid-item icon="smile" text="交易成功" to="/SuccessfulTrade" />
            <van-grid-item icon="bag" text="全部订单" to="/SellAllOrders" />
        </van-grid>
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';

    export default {
        data(){
            return{
              length1:0,
              length2:0,
              length3:0,
              length4:0,
            }
        },
      methods:{
          async onLoad() {
               let data = {
                    user_id:JSON.parse(localStorage.getItem('userInfo')).user_id,
                    s_id :JSON.parse(localStorage.getItem('userInfo')).s_id
               }
                let res = await this.$api.network.OTCORderbuy(data);
                let i = 0;
                for(i;i<res.list.length; i++){
                    let leng = res.list[i].state;
                    if(leng==1){
                        this.length1++;
                    }else if(leng==2){
                        this.length2++;
                    }else if(leng==3){
                        this.length3++;
                    }else if(leng==4){
                        this.length4++;
                    }
                    // console.log(res.list.length)
                }
                console.log(res)
           }
         
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
.otc-list-buy >>> .van-grid-item__content::after {
    border-width 2px 2px 0px 2px
}
.otc-list-buy >>> .van-icon-column {
    color #ff7700
}
.otc-list-buy >>> .van-icon-card {
    color #ff5500
}
.otc-list-buy >>> .van-icon-label {
    color #ff3300
}
.otc-list-buy >>> .van-icon-smile {
    color green
}
.otc-list-buy >>> .van-icon-friends {
    color #246bc5
}
.otc-list-buy >>> .van-icon-bag {
    color #e64646
}

</style>
