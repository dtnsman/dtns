<template>
    <div class="otc-list-buy">
        <van-grid :column-num="3">
            <van-grid-item icon="cart" text="出售" to="/SellOtc" />
            <van-grid-item icon="bill" text="已上架商品" to="/OnShelves" :info="length"/>
            <van-grid-item icon="todo-list" text="交易中" to="/TransactionBuy" :info="length1" />
        </van-grid>
        <van-grid :column-num="3">
            <van-grid-item icon="card" text="待确认" to="/ConfirmBuy" :info="length2" />
            <van-grid-item icon="label" text="仲裁中" to="/arbitrationBuy" :info="length3" />
            <van-grid-item icon="smile" text="交易成功" to="/SuccessfulTradeBuy"  />
        </van-grid>
        <van-grid :column-num="3">
            <van-grid-item icon="bag" text="全部订单" to="/AllOrdersBuy" />
            <van-grid-item/>
            <van-grid-item/>
        </van-grid>
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';

    export default {
        data(){
            return{
                length:'',
              length1:0,
              length2:0,
              length3:0,
            //   length4:0,
            //   length5:0,
            }
        },
        methods:{
            async onLoad() {
               let data = {
                    user_id:JSON.parse(localStorage.getItem('userInfo')).user_id,
                    s_id :JSON.parse(localStorage.getItem('userInfo')).s_id
               }
                let res = await this.$api.network.OTCORdersell(data);
                let i = 0;
                for(i;i<res.list.length; i++){
                    let leng = res.list[i].state;
                    if(leng==1){
                        this.length1++;
                    }else if(leng==3){
                        this.length2++;
                    }else if(leng==4){
                        this.length3++;
                    }
                }
                    // console.log(res.list.length)
                let Data = JSON.parse(localStorage.getItem('userInfo'));
                let userInfo = {
                    user_id:Data.user_id,
                    s_id:Data.s_id,
                    begin:0,
                    len:1
                }
                let ress = await this.$api.network.OTCall(userInfo);
                this.length = ress.list.length
                console.log(ress)
                
                
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
.otc-list-buy >>> .van-icon-cart {
    color orange
}
.otc-list-buy >>> .van-icon-bill {
    color #cd7f32
}
.otc-list-buy >>> .van-icon-todo-list {
    color #97694f
}
</style>
