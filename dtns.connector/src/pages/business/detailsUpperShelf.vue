<template>
    <div class="otc-list-buy">
        <van-nav-bar
        title="商品详情"
        left-arrow
        @click-left="onClickLeft"
        />
        <p class="text">商品信息</p>
        <div class="content">
            <van-row type="flex">
                <van-col span="8">订单</van-col>
                <van-col span="18" style="color:#222;" >{{ress.this_order_id}}</van-col>
            </van-row>
            <!-- <van-row type="flex">
                <van-col span="8">商品名</van-col>
                <van-col span="18">{{}}</van-col>
            </van-row> -->
            <van-row type="flex">
                <van-col span="8">购买数量</van-col>
                <van-col span="18" style="color:#222;" >{{ress.number}}</van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="8">价格</van-col>
                <van-col span="18" style="color:#222;">{{ress.price}}</van-col>
            </van-row>
            
            <!-- <van-row type="flex">
                <van-col span="8">描述</van-col>
                <van-col span="18" class="test" >{{}}</van-col>
            </van-row> -->
            <p style="padding:0 0 15px 15px; font-size:15px; color:#222">付款凭证:</p>
            <div style="display:flex;justify-content:center;width:100%">
                <div style="width:70%"><img :src="i" alt="" @click="show = true" style="width:100%;"></div>
            </div>
            <van-image-preview v-model="show" :images="images" :closeable="true" :showIndex="false">
            </van-image-preview>

        </div>
        <div style="background-color:#fff; text-align:right; padding-right:20px;padding-top:20px;">
            <div style="padding-bottom:10px; font-size:13px; color:#222;">凭证信息有误</div>
            <van-button type="primary" @click="shenshuClick" size="small" style="font-size:14px; border-radius:2px; background-color:#2369ec; border:0px; color:#fff;" >点击申诉</van-button>
        </div>
        <div style="text-align:center; background-color:#fff; width:100%; padding:20px 0 0 0">
            <van-button type="primary" @click="onClick" size="large" style="width:95%; border-radius:6px; background-color:#17c160; border:0px; color:#fff;" >确认收款</van-button>
        </div>
        
    </div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
import img from '../images/1.jpg'
    export default {
        data(){
            return{
                rest:"",
                ress:"",
                number:'',
                otc_id:'',
                show: false,
                images: [img],
                img_id:'',
                i:''
                
            }
        },
        mounted(){
           this.onLoad()
          //这时候请求后端数据
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            async onLoad(){
                let Random = Math.round(Math.random());
                let data = JSON.parse(localStorage.getItem('userInfo'));
                let userInfo = {
                    user_id:data.user_id,
                   s_id:data.s_id,
                   order_id: this.$route.params.id
                }
                let res = await this.$api.network.OTCquerone(userInfo);
                this.ress = res.list.ret;
                this.rest = res.list.rest;
                this.number = res.list.ret.number
                this.otc_id = res.list.ret.otc_id
                console.log(res)
                console.log(res.list.ret.img_id)
                this.img_id = res.list.ret.img_id

                 let img_p = "min100";
                let img_kind = "open";
                await this.$axios
                  .get(
                    "http://182.61.13.123:50001/image/view?user_id=" +
                      data.user_id +
                      "&s_id=" +
                      data.s_id +
                      "&filename=" +
                      this.img_id +
                      "&img_p=" +
                      img_p +
                      "&img_kind=" +
                      img_kind
                  )
                  .then(res => {
                    console.log(res);
                    this.i = res.config.url;
                    console.log(this.i);
                  });

                // let user = {
                //     user_id:data.user_id,
                //     s_id:data.s_id,
                //     filename:this.img_id,
                //     img_kind:img_kind,
                //     img_p:img_p
                //     // random:Random,
                //     // img_p:"min400"
                // }
                // let ret = await this.$api.network.OTCimgsell(user);
                // console.log(ret)
                

            },

            async shenshuClick (){
                let data = JSON.parse(localStorage.getItem('userInfo'));
                let use = {
                    user_id:data.user_id,
                   s_id:data.s_id,
                   order_id:this.$route.params.id,
                }
                let res = await this.$api.network.OTCappealSell(use);
                if(res.ret){
                    this.$router.go(-2)
                    vant.Toast.success("申诉成功")
                }else {
                    vant.Toast.fail("申诉失败" + res.msg)
                }
            },
            async onClick () {
                // alert("你好")
                let data = JSON.parse(localStorage.getItem('userInfo'));
                // console.log(data)
                let Random = Math.round(Math.random());
                let user= {
                   user_id:data.user_id,
                   s_id:data.s_id,
                   order_id:this.$route.params.id,
                   number:this.number,
                   random:Random,
                }
                let res = await this.$api.network.OTCcomplete(user);
                // this.data = res.ret;
                console.log(res)
                if(res.ret){
                    vant.Toast.success("确认成功")
                    this.$router.go(-2)
                }else {
                    vant.Toast.fail("确认失败" + res.msg)
                }
            }

        },
        created(){
            // this.userInfo = JSON.parse(localStorage.userInfo);
        },
        // mounted(){
        //   //这时候请求后端数据
        // },
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
