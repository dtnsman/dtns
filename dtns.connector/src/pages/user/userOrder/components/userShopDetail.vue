<template>
   <MyBox title="订单详情" @back="$router.go(-1)">
       <template slot="content">
           <div class="content">
                <div class="card address">
                    <van-steps :active="active"  active-color="#12ACF4">
                        <van-step>待支付</van-step>
                        <van-step>待发货</van-step>
                        <van-step>待收货</van-step>
                        <van-step>待评价</van-step>
                        <van-step>已完成</van-step>
                    </van-steps>
                    <van-cell-group>
                    <van-cell :title="'快递单号: '+id" icon="location-o" :center="true">
                        <template #icon>
                            
                        </template>
                    </van-cell>
                     <van-cell :title="name+' '+phone" icon="location-o" :center="true"
                     :label="address"
                     >
                        <template #icon>
                            
                        </template>
                    </van-cell>
                    </van-cell-group>
                </div>
                <div class="card">
                    <span>商品信息</span>
                    <div class="orderList">
                        <van-card
                        class="van-hairline--top"
                       
                        v-for="(item, index) of orderList"
                        :key="index"
                        :num="item.num"
                        :price="item.price"
                        :desc="item.desc"
                        :title="item.title"
                        :thumb="item.img"
                        >
                            <template slot="price">
                                ×{{item.num}}
                            </template>
                             <template slot="num">
                                ￥{{item.price}}
                            </template>
                             <template slot="title">
                            <span class="van-ellipsis title">{{item.title}}</span>
                            </template>
                            <template slot="desc">
                                <div class="van-multi-ellipsis--l2 desc">
                                    {{item.desc}}
                                </div>
                            </template>
                        </van-card>
                    </div>
                    <div>
                        <slot></slot>
                    </div>
                </div>
                <div class="card">
                    <van-cell title="商品金额" :value="countPrice"></van-cell>
                    <van-cell title="运费" :value="freight"></van-cell>
                    <van-cell title="运费" :value="freight+countPrice"></van-cell>
                </div>
           </div>
       </template>
   </MyBox>
</template>
<script>
export default {
    data () {
        return {
            isShowBottom: true,
            ///当前步骤
            active: 0,
            address: '广东省广州市天河区',
            id: '1548122',
            name: 'Molly cheng',
            phone:'13771027410',
            orderList: [
                {
                    num: 2,
                    price: 10,
                    desc: '小芒果爱的色放按时返回的是案发时啥的官方阿嘎但是阿斯蒂芬撒地方撒旦啊手动阀手动阀氨法沙发沙发案发时',
                    title: '标题saf',
                    img: 'https://img.yzcdn.cn/vant/ipad.jpeg'
                },
                 {
                    num: 2,
                    price: 10,
                    desc: '小芒果',
                    title: '标题',
                    img: 'https://img.yzcdn.cn/vant/ipad.jpeg'
                }
            ],
            freight: 15
        }
    },
    methods: {
  
    },
    computed: {
        countPrice () {
            return this.orderList.reduce((a,b)=> {
                 return Number(a.price)*Number(a.num) +Number(b.price)*Number(b.num)
            })
        }
    },
}
</script>
<style lang="stylus" scoped>
.content {
    box-sizing border-box
    padding  15px
}
.card {
    background-color #fff
    border-radius 5px
    padding 10px
    margin-bottom 10px
}
.content >>> .van-card {
    background-color #fff
}
    
.orderList {
    margin-top 10px
}
.title {
     display block
    font-size: 14px
    font-weight bolder
    margin-bottom 4px
}
</style>