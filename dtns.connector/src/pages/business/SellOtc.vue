<template>
    <div class="otc-list-buy">
        <van-nav-bar
        title="商品出售"
        left-arrow
        @click-left="onClickLeft"
        />
        <van-field v-model="otc_name" label="标题 :" />
        <van-field v-model="otc_text" label="描述信息 :" />
        <van-cell-group title="收款方式最少填写一种"/>
            <van-field v-model="pay_zfb" label="支付宝账号 :" />
            <van-field v-model="pay_wx" label="微信账号 :" />
            <van-field v-model="pay_yhk" label="银行卡账号 :" />
            <van-field v-model="minsize" label="单笔最小 :" />
            <van-field v-model="maxsize" label="单笔最大 :" />
            <van-field v-model="price" label="拍卖价格 :" />
        <div style="text-align:center; padding-top:20px; padding-bottom:20px;">
            <van-button color="#2e6ce8" size="large" @click="onLoad" style="width:95%; border-radius:5px;">发布</van-button>
        </div>
        
    </div>
</template>

<script>
    import Vue from 'vue';
    import Vant from 'vant';
    // import 'vant/lib/index.css';
    // import urls from '../../api/teaback/url'
    export default {
        data(){
            return{
                radio: '1',

                otc_name:"",
                otc_text:"",
                pay_zfb:"",
                pay_wx:"",
                pay_yhk:"",
                minsize:"",
                maxsize:"",
                price:"",
            }
        },
        created(){
            // this.userInfo = JSON.parse(localStorage.userInfo);
        },
        mounted(){
            // this.onLoad()
          //这时候请求后端数据
        },
        methods:{
            onClickLeft() {
               this.$router.push('/business/otcwhole')
            },
            async onLoad(){
                // if(this.pay_zfb.length != 11) {
                //     vant.Toast.fail("支付宝格式错误");
                //     return;
                // }
                // if(this.pay_yhk.length < 15) {
                //     vant.Toast.fail("银行卡格式错误");
                //     return;
                // }
                if(this.otc_name == "") {
                    vant.Toast.fail("请输入物品名称")
                    return;
                }
                if(this.otc_text == "") {
                    vant.Toast.fail("请输入物品信息")
                    return;
                }
                if(this.pay_zfb=="" && this.pay_wx=="" && this.pay_yhk==""){
                    vant.Toast.fail("请输入收款方式最少一种");
                    return;
                }
                if(this.minsize == "") {
                    vant.Toast.fail("请输入单笔最小");
                    return;
                }
                if(this.maxsize == "") {
                    vant.Toast.fail("请输入单笔最大");
                    return;
                }
                if(this.minsize*1 > this.maxsize*1){
                    vant.Toast.fail("单笔最小输入有误请重新输入");
                    return;
                }
                if(this.price == "") {
                    vant.Toast.fail("请输入价格")
                    return;
                }
                let data = JSON.parse(localStorage.getItem('userInfo'));
                // console.log(data.s_id)
                let Random = Math.round(Math.random());
                // console.log(data)
                let userInfo = {
                   user_id:data.user_id,
                   otc_name:this.otc_name,
                   otc_text:this.otc_text,
                   pay_zfb:this.pay_zfb,
                   pay_wx:this.pay_wx,
                   pay_yhk:this.pay_yhk,
                   minsize:this.minsize,
                   maxsize:this.maxsize,
                   price:this.price,
                   random:Random,
                   s_id:data.s_id
                }
                // console.log(userInfo.user_id)
                let res = await this.$api.network.OTCnew(userInfo);
                let Data = res.ret;
                // localStorage.Order = JSON.stringify(res);
                // console.log(Data)
                if(Data) {
                    vant.Toast.success("上架成功");
                    this.$router.go(-1)
                }else {
                    vant.Toast.fail("上架失败" + res.msg)
                }
                // consloe.log("123"+res)
            },
        }
    }
</script>
<style scoped lang="stylus">
.otc-list-buy

.van-icon-arrow-left::before {
    color #000
    font-size 1.2rem
}
.van-cell {
    font-size 15px
}
</style>
