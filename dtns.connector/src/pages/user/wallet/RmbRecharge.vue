<template>
    <div style="position:absolute; height:100%; background-color:#fff; width:100%;">
        <div style="margin-bottom:46px;">
            <van-nav-bar
            title="选择充值金额"
            left-arrow
            @click-left="onClickLeft"
            :fixed="true"
            />
        </div>
        <div v-for="(item,index) in list" @click="Recharge(item)" :key="index" style="position:relative; border:1px solid #fff;border-bottom:1px solid #f5f5f5; height:58px;">
            <svg t="1586833829791" style="position:absolute; left:15px; top:18px; z-index:1" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1586" width="20" height="20"><path d="M513.839521 0a512 512 0 1 0 513.532934 512A513.532934 513.532934 0 0 0 513.839521 0z m0 981.077844a468.464671 468.464671 0 1 1 469.997605-469.077844A469.997605 469.997605 0 0 1 513.839521 981.077844z" p-id="1587"></path><path d="M799.578443 435.65988h-229.633533L740.713772 275.928144a21.767665 21.767665 0 0 0 0-30.658683 22.074251 22.074251 0 0 0-30.658682 0l-201.120958 187.017964L308.732934 245.269461a21.767665 21.767665 0 0 0-30.658683 0 22.074251 22.074251 0 0 0 0 30.658683l170.768863 158.811976H227.794012a21.767665 21.767665 0 1 0 0 43.535329h260.905389v125.394012H306.586826a21.767665 21.767665 0 0 0 0 43.535329h183.952096v173.834731a21.767665 21.767665 0 0 0 43.535329 0v-172.91497h190.083833a21.767665 21.767665 0 0 0 0-43.535329h-190.083833v-125.394012h267.343713a21.767665 21.767665 0 1 0 0-43.53533z" p-id="1588"></path></svg>
            <van-cell title="充值金额" is-link :value="item.number + '元'" style="margin-top:6px; padding-left:42px; font-size:13px;" />
        </div>
        <div style="font-size:13px; color:#222; margin:20px 0; text-align:center;">
            充值后可用于购买会员，进入会员群
        </div>
        <van-popup v-model="show" closeable  position="bottom" style="height: 30% ;">
            <div style="width:100%; height:100px; backaround-color:#393d49;">
                <!-- <div style="font-size:16px; width:90%; margin:0; padding-top:20px;padding-left:5%;">你确定充值{{vip}}会员，为期1年吗？</div> -->
                <!-- <div style="font-size:14px; padding-left:15px; margin-top:5px;">权益:{{vip_rights}}</div> -->
                <div style="font-size:16px; width:90%; margin:0 auto; padding-top:20px;">充值到余额 : {{prace}}元</div>
            </div>
            <div style="margin-top:10px; text-align:center;">
                <van-button @click="payRmb" style="width:90%;color:#fff; background-color:#12adf5; margin-top:20px; font-weight:bold; font-size:15px; border-radius:5px;">确认充值</van-button>
            </div>
        </van-popup>
        <!-- <van-popup v-model="show1" closeable  position="bottom" style="height: 30% ;"> -->
        <iframe @load="Inpayment" v-show="show1" :src="rmb" frameborder="0" scrolling="no" width="0" height="0"></iframe>
        <!-- </van-popup> -->
    </div>
</template>
<script>
export default {
    data() {
        return{
            cloud_pay_order_id:'',
            rmb:'',
            order_id:'',
            show1:false,
            RmbUrl:'',
            show:false,
            prace:'',
            show:false,
            list:[
                {number:10},
                {number:30},
                {number:50},
                {number:100},
                {number:200},
                {number:300},
                {number:500},
            ],
            time: ''
        }
    },
    methods:{
        onClickLeft(){//点击返回上一步
            // this.$router.push('/rmb')
            this.$router.go(-1)
            clearInterval(this.time)
        },
        async Recharge(item){//创建人民币充值订单
            this.prace = item.number
            // console.log(this.prace)
            let random = Math.random()
            let user = {
                order_name:'余额充值',
                order_type:'rmb',
                pay_money:item.number,
                pay_type:'rmb',
                user_id:localStorage.user_id,
                s_id:localStorage.s_id,
                extra_data:'充值余额' + item.number + '元',
                random:random
            }
            let res =  await this.$api.network.ChatRmbNew(user)
            this.order_id = res.order_id
            this.cloud_pay_order_id = res.go_url.split('?')[1]
            this.RmbUrl = res.go_url
            this.show = true
            
        },
        async payRmb(){//确认充值
            this.rmb = this.RmbUrl
            console.log(this.rmb)
            this.show = false
            this.show1 = true
            if(this.rmb !== '')
            {
                this.time =   setInterval(() => {
                    this.RmbResult()
                }, 1000);
            }
        },
        Inpayment(){
            setTimeout(()=>{
                this.rmb = ''
           },3000)
        },
        async RmbResult(){//充值结果
            let user = {
                order_id:this.order_id,
                cloud_pay_order_id:this.cloud_pay_order_id,
            }
            let res =  await this.$api.network.ChatWxQuery(user)
            if(res.ret){
                this.$toast.success('充值成功',1000)
                clearInterval(this.time)
            }
        }
    },
    created(){//进入页面就加载

    },
}
</script>
<style lang="stylus" scoped>
*{
    box-sizing:border-box
}
.van-nav-bar__arrow{
    color:#000
    font-size:1.05rem
}
</style>