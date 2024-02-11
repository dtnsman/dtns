<template>
    <div class="otc-list-buy">
        <van-nav-bar
        title="商品详情"
        left-arrow
        @click-left="onClickLeft"
        />
        <p class="text">账户详情</p>
        <div class="content">
            <van-row type="flex">
                <van-col span="8">商品名</van-col>
                <van-col span="18">{{data.otc_name}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">价格</van-col>
                <van-col span="18">{{data.price}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">最小买入</van-col>
                <van-col span="18">{{data.minsize}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">最大买入</van-col>
                <van-col span="18">{{data.maxsize}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">微信账户</van-col>
                <van-col span="18">{{data.pay_wx}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">支付宝账户</van-col>
                <van-col span="18">{{data.pay_zfb}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">银行卡账户</van-col>
                <van-col span="18">{{data.pay_yhk}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">描述</van-col>
                <van-col span="18" class="test" >{{data.otc_text}}</van-col>
            </van-row>
            <van-field v-model="number" type="number" label="购买数量 :" />
        </div>
        <div style="background-color:#fff;  display:flex; justify-content:center; padding-top:20px; width:100%;">
            <van-button  @click="buy" type="primary"  style="float:right; font-size:16px;letter-spacing:2px; width:95%; border-radius:5px;" >立即购买</van-button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
    export default {
        data(){
            return{
                number:"",
               data:"",
               Data:'',
               price:''

            }
        },
        mounted(){
           this.onLoad()
          //这时候请求后端数据
        },
        methods: {

            async buy() {
                    if(this.number=="") {
                        vant.Toast.fail("请输入数量")
                        return;
                    }
                    let Data = JSON.parse(localStorage.getItem('userInfo'));
                    let Random = Math.round(Math.random());
                    let userIn = {
                        number:this.number,
                        user_id:Data.user_id,
                        otc_id:this.$route.params.id,
                        s_id:Data.s_id,
                        random:Random,
                        price:this.price,
                    }
                    // this.$axios.get('http://192.168.101.15:50001/otc/order/news?number='+this.number+'&user_id='+Data.user_id+'&otc_id='+this.$route.params.id+'&s_id='+Data.s_id+'&random='+Random+'&price='+this.price)
                    let res = await this.$api.network.OTCorderNew(userIn);

                    // console.log(res)
                    // alert("你好")
                    if(res.ret){
                        vant.Toast.success("购买申请成功")
                        this.$router.push('/business/otcwhole')
                    
                    }else {
                        vant.Toast.fail("购买失败" + res.msg)
                    }
                //  alert("aj")
                //  vant.Toast.success("购买申请成功")
                
            },
            onClickLeft() {
                this.$router.push('/business/otcwhole')
            },
        
            async onLoad(){
                let userInfo = {
                   order_id:this.$route.params.id
                }
                let res = await this.$api.network.OTCquerone(userInfo);
                console.log(res)
                this.data = res.list.ret;
                this.Data = res.list.rets;
                this.price = res.list.ret.price;
                // console.log(this.data.user_name)
            },

            
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
    font-size 1.2rem
}
.van-nav-bar__title {
    font-size 15px
}
.van-cell__title {
    font-size 15px
}
.text {
    font-size:15px 
    background-color #fff
    margin 10px 0 0 0
    padding 10px 0 0 15px
}
.content {
    width 100%
    background-color #fff
}
.van-col--8 {
    font-size 15px
    color #888 
    padding 8px 0px 8px 15px
}
.van-col--18 {
    font-size 15px
    color #111
    padding 8px 30px 8px 0px
    word-break:break-word;
}
.test {
    letter-spacing 1.2px 
}
.van-button__text[data-v-5b76d910]{
    color #fff
    letter-spacing 2px
    font-weight bold
}
</style>
