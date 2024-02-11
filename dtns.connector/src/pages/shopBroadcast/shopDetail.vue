<!--  -->
<template>
   <MyBox @back="$router.go(-1)" title="商品详情">
       <template slot="content">
         <div class="content">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
                <van-swipe-item>
                    <img alt="加载失败" :src="data.product_img" width="100%" />
                </van-swipe-item>
                <!-- <van-swipe-item>
                    <img alt="加载失败" :src="data.product_image" width="100%" />
                </van-swipe-item>
                <van-swipe-item>
                    <img alt="加载失败" :src="data.product_image" width="100%" />
                </van-swipe-item> -->

            </van-swipe>
            <div class="body">
                
                <div class="title">
                {{data.product_ad}}{{data.product_name}}
                </div>
        
                <div class="order van-hairline--bottom">
                    <div class="detail-price">
                        ￥{{data.product_price}}
                    </div>
                    <!-- <div>包邮</div>
                    <div>广州</div> -->
                </div>
                <div class="info van-hairline--bottom">
                    <div class="detail-desc">商品介绍</div>
                    <p >
                       {{data.product_desc}}
                    </p>
                </div>
                <div class="comment">
                    <div class="detail-desc">商品评论</div>
                    <div class="classifyBtn">
                        <van-tabs type="card" class="tab-card" animated>
                            <van-tab :title="'全部'+allCom.length" class="tab-a">
                                <div class="commentList" v-for="(i,index) in allCom" :key="index">
                                    <div class="van-hairline--bottom commendItem">
                                        <div class="top">
                                            <van-image
                                            round=""
                                            width="40px"
                                            height="40px"
                                            fit="cover"
                                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                                            />
                                            <div style="display:flex;flex-direction:column;margin-left:5px">
                                                <div style="font-size:15px;color:#666666;font-weight:800;">{{i.address_info.user_name}}</div>
                                                <div  style="font-size:12px;color:#666666">{{i.comment_time | formatDate}}</div>
                                            </div>
                                        </div>
                                        <div class="text">
                                            {{i.comment}}
                                        </div>
                                        <div class="image">
                                            <van-image class="detail-img"
                                            radius="5px"
                                            fit="cover"
                                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <van-empty v-if="allCom.length == 0" description="暂时没有评论" />
                            </van-tab>
                            <van-tab :title="'好评'+goodCom.length">
                                <div class="commentList" v-for="(i,index) in goodCom" :key="index">
                                    <div class="van-hairline--bottom commendItem">
                                        <div class="top">
                                            <van-image
                                            round=""
                                            width="40px"
                                            height="40px"
                                            fit="cover"
                                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                                            />
                                            <div style="display:flex;flex-direction:column;margin-left:5px">
                                                <div style="font-size:15px;color:#666666;font-weight:800;">{{i.address_info.user_name}}</div>
                                                <div  style="font-size:12px;color:#666666">{{i.comment_time | formatDate}}</div>
                                            </div>
                                        </div>
                                        <div class="text">
                                            {{i.comment}}
                                        </div>
                                        <div class="image">
                                            <van-image class="detail-img"
                                            radius="5px"
                                            fit="cover"
                                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <van-empty v-if="goodCom.length == 0" description="暂时没有评论" />
                            </van-tab>
                            <van-tab :title="'中评'+inCom.length">
                                <div class="commentList" v-for="(i,index) in inCom" :key="index">
                                    <div class="van-hairline--bottom commendItem">
                                        <div class="top">
                                            <van-image
                                            round=""
                                            width="40px"
                                            height="40px"
                                            fit="cover"
                                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                                            />
                                            <div style="display:flex;flex-direction:column;margin-left:5px">
                                                <div style="font-size:15px;color:#666666;font-weight:800;">{{i.address_info.user_name}}</div>
                                                <div  style="font-size:12px;color:#666666">{{i.comment_time | formatDate}}</div>
                                            </div>
                                        </div>
                                        <div class="text">
                                            {{i.comment}}
                                        </div>
                                        <div class="image">
                                            <van-image class="detail-img"
                                            radius="5px"
                                            fit="cover"
                                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <van-empty v-if="inCom.length == 0" description="暂时没有评论" />
                            </van-tab>
                            <van-tab :title="'差评'+badCom.length">
                                <div class="commentList" v-for="(i,index) in badCom" :key="index">
                                    <div class="van-hairline--bottom commendItem">
                                        <div class="top">
                                            <van-image
                                            round=""
                                            width="40px"
                                            height="40px"
                                            fit="cover"
                                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                                            />
                                            <div style="display:flex;flex-direction:column;margin-left:5px">
                                                <div style="font-size:15px;color:#666666;font-weight:800;">{{i.address_info.user_name}}</div>
                                                <div  style="font-size:12px;color:#666666">{{i.comment_time | formatDate}}</div>
                                            </div>
                                        </div>
                                        <div class="text">
                                            {{i.comment}}
                                        </div>
                                        <div class="image">
                                            <van-image class="detail-img"
                                            radius="5px"
                                            fit="cover"
                                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <van-empty v-if="badCom.length == 0" description="暂时没有评论" />
                            </van-tab>
                        </van-tabs>
                    </div>
                    
                    
                </div>
            </div>
            <div class="submit">
                  <div class="sub-left">
                    <div class="sub-svg">
                            <div>
                                <svg t="1591414742932" class="icon" viewBox="0 0 1104 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4314" width="19" height="19"><path d="M1097.562253 562.022343a120.643539 120.643539 0 0 0-70.620609-105.930913C994.573865 200.091724 791.539616 0 547.310012 0S100.046158 200.091724 67.678379 459.033955A111.815963 111.815963 0 0 0 0.000296 562.022343 120.643539 120.643539 0 0 0 126.528886 676.780831v-208.9193C153.011614 238.344554 332.505661 58.850507 547.310012 58.850507s414.896075 197.149199 426.666176 447.263854v58.850507A488.459209 488.459209 0 0 1 803.309717 912.18286h-20.597677a55.907982 55.907982 0 1 0 55.907982 52.965456 526.712038 526.712038 0 0 0 176.551521-288.367485 114.758489 114.758489 0 0 0 82.39071-114.758488z" p-id="4315"></path><path d="M903.355579 491.401734a356.045568 356.045568 0 1 0-356.045567 356.045568 356.045568 356.045568 0 0 0 356.045567-356.045568z m-150.068793 135.356166a238.344554 238.344554 0 0 1-409.011024 0 29.425254 29.425254 0 0 1 8.827576-41.195355 29.425254 29.425254 0 0 1 38.25283 11.770102 188.321623 188.321623 0 0 0 155.953844 85.333235 176.551521 176.551521 0 0 0 155.953843-88.275761 29.425254 29.425254 0 1 1 50.022931 32.367779z" p-id="4316"></path></svg>
                            </div>
                            <div class="sub-word">客服</div>
                    </div>
                    <div class="sub-svg" @click="shopCar">
                            <div>
                                <svg t="1591414706632" class="icon" viewBox="0 0 1200 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4071" width="19" height="19"><path d="M1192.110761 161.570745c-4.366706-8.733412-8.733412-8.733412-17.466825-8.733412H205.235186l-43.667061-131.001183a26.200237 26.200237 0 0 0-26.200236-21.83353H30.566943a30.566943 30.566943 0 0 0-30.566943 30.566943 30.566943 30.566943 0 0 0 30.566943 30.566942h82.967415l213.968598 707.406386a30.566943 30.566943 0 0 0 30.566943 21.83353h668.106031a30.566943 30.566943 0 1 0 0-61.133885H379.903429l-26.200236-87.334122h689.939561a21.83353 21.83353 0 0 0 21.83353-13.100118l131.001183-449.770727c4.366706-4.366706 0-13.100118-4.366706-17.466824zM462.870845 834.043482a96.067534 96.067534 0 1 0 0 187.768362 96.067534 96.067534 0 0 0 0-187.768362zM921.374984 834.043482a96.067534 96.067534 0 1 0 0 187.768362 91.700828 91.700828 0 0 0 91.700827-91.700828 91.700828 91.700828 0 0 0-91.700827-96.067534z" p-id="4072"></path></svg>
                            </div>
                            <div class="sub-word">购物车</div>
                    </div>
                  </div>
                  <div class="sub-right">
                      <div class="btns">
                        <van-button class="sub-car" color="#F08409" @click="showSku = true">加入购物车</van-button>
                        <van-button class="sub-shop" color="#F00945" @click="showSku = true">立即购买</van-button>
                      </div>
                  </div>
            </div>
            <!-- <van-goods-action>
                <van-goods-action-icon icon="service" text="客服" />
                <van-goods-action-icon icon="shop-o" text="店铺" />
                <van-goods-action-button color="#F08409" type="warning" text="加入购物车" />
                <van-goods-action-button color="#F00945" type="danger" text="立即购买" />
            </van-goods-action> -->
            
            <!-- 购买框 -->
            <div>
                <van-sku
                class="sub-sku"
                :close-on-click-overlay= "true"
                v-model="showSku"
                :sku="sku"
                :goods="goods"
                :goods-id="goodsId"
                :quota="quota"
                :quota-used="quotaUsed"
                :hide-stock="sku.hide_stock"
                reset-stepper-on-hide
                :initial-sku="initialSku"
                safe-area-inset-bottom
                @buy-clicked="onBuyClicked"
                @add-cart="setShopCard"
        >
        <!-- <van-stepper v-model="value" integer /> -->
        </van-sku>
            </div>
             
        
         </div>
       </template>
   </MyBox>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import 'vant/lib/icon/local.css';
import { formatDate } from '@/common/date.js'
export default {
//import引入的组件需要注入到对象中才能使用
props: {
    product_id: ''
},
components: {},
filters: {
      formatDate(time) {
        time = time * 1000
        let date = new Date(time)
        // console.log(new Date(time))
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
},
data() {
//这里存放数据
return {
    data: '',
    shopId:this.$route.params.id,
    userInfo:"",
    showSku: false,
    goodsInfo:{},
    quota:0,//限购的数量，0为不限购
    quotaUsed:0,//已经购买的数量
    baseProfit:'1',
    sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [

        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
            {
                id: 2259, // skuId，下单时后端需要
                price: 100, // 价格（单位分）
                s1: '0', // 规格类目 k_s 为 s1 的对应规格值 id
                s2: '0', // 规格类目 k_s 为 s2 的对应规格值 id
                s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                stock_num: 110 // 当前 sku 组合对应的库存
            }
        ],
        price: '1.00', // 默认价格（单位元）
        stock_num: 9999, // 商品总库存
        // collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: true, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
    },
    goods: {},
    goodsId:this.$route.params.id,
    messageConfig: {
        // 数据结构见下方文档
    },
    initialSku : {
        selectedNum: 1
    },
    allCom:[],
    goodCom:[],
    inCom:[],
    badCom:[]
    }
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    async fetch() {
        let params = {
            user_id: localStorage.user_id,
            s_id: localStorage.s_id,
            product_id: this.product_id
        }
        let res = await this.$api.network.queryProductInfo(params)
        if(res && res.ret) {
            //product_image  2023-9-22修改新增
            let info = res
            info.product_img = null;
            let imgdata =  await  imageDb.getDataByKey(info.product_image)
            if(imgdata && imgdata.data) info.product_img = imgdata.data
            else{
            let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:info.product_image,img_kind:'open'}//,img_p:'min200'}
                queryImg('',params).then((data)=>{
                if(data && data.data){
                    info.product_img ='data:image/png;base64,'+data.data
                    imageDb.addData({img_id,data:info.product_img })
                }
                }).catch((ex)=>{
                    console.log('load img error',ex)
                })
            }
            
            this.data = res
            this.goods.picture = res.product_img//this.$img + res.product_image
            this.goodsId = res.product_id
            this.goods.title = res.product_name
            this.sku.price = res.product_price
        }
        console.log(res)
        
    },
    setShopCard (data) {//加入购物车
        console.log(data)
        let that = this
        let shopCard = JSON.parse(localStorage.getItem('shopCard'))
        console.log(shopCard)
        if(!shopCard) {
            shopCard = []
            // console.log(shopCard)
            // localStorage.setItem(shopCard,JSON.stringify([]))
        }
        //  console.log(shopCard)
        let flag = shopCard.findIndex((item)=> item.product_id == that.data.product_id)
        console.log(flag)
        if(flag === -1) {
            this.$toast('添加成功')
            that.data.number = data.selectedNum
            shopCard.push(that.data)
            // console.log(shopCard)
            this.$router.push(`/userShoppingCart/${this.$route.query.chatid}`)
        }else {
            this.$toast('加购成功')
            shopCard[flag].number+=data.selectedNum
            this.$router.push(`/userShoppingCart/${this.$route.query.chatid}`)
        }
        localStorage.setItem("shopCard",JSON.stringify(shopCard))
    },
    onBuyClicked (data) {//立即购买
        let goods = []
        Vue.set(this.data,'number',data.selectedNum)
        goods.push(this.data)
        localStorage.setItem('goods',JSON.stringify(goods))
        this.$router.push({path:"/confirmAnOrder"}) 
        },
    shopCar(){
        this.$router.push(`/userShoppingCart/${this.$route.query.chatid}`)
    },
    async UserShoppingOrderProductList(){
        let params = {
            user_id: localStorage.user_id,
            s_id: localStorage.s_id,
            product_id: this.product_id,
            begin:'0',
            len:'1000'
        }
        let res = await this.$api.network.UserShoppingOrderProductList(params)
        console.log(res);
        // console.log(res.list);
        let comUserList = []
        let comUserList1 = []
        let comUserList2 = []
        let comUserList3 = []
        let comList1 = []
        
        if(res.ret){
            let comList = res.list
            for(var i=0;i<comList.length;i++){
                comList1.push(JSON.parse(comList[i].txjson))
            }
            for(var j=0;j<comList1.length;j++){
                comUserList.push(JSON.parse(comList1[j].opval))
                if(comUserList[j].rank == '3'){
                    comUserList1.push(JSON.parse(comList1[j].opval))
                }else if(comUserList[j].rank == '2'){
                    comUserList2.push(JSON.parse(comList1[j].opval))
                }else if(comUserList[j].rank == '1'){
                    comUserList3.push(JSON.parse(comList1[j].opval))
                }else{}
            }
            this.allCom = comUserList
            this.goodCom = comUserList1
            this.inCom = comUserList2
            this.badCom = comUserList3
        }else{
            // this.$toast.fail('该商品还没有评价')
        }
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    console.log(this.product_id)
    this.UserShoppingOrderProductList()
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
 this.fetch()
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='stylus' scoped>
.content {
    background-color #fff
}
.body {
    box-sizing:border-box
    padding 8pt 15pt 0 15pt;
}
.title {
    font-size 16px;
    font-weight bold
    padding-top 5px
    padding-bottom 10px
    // margin-left -5pt;
}
.detail-desc{
    margin-top 10pt;
    font-size 16px;
    font-weight bold
    // font-family 'PingFang SC';
}
.info p {
    font-size 12px;
    line-height 20px;
    padding-bottom 15px
}
.order {
    display flex
    font-size 16px;
    justify-content space-between
    // margin-bottom 20px
    padding-bottom 14px
    // padding-left 7px;
    
}
.order div:nth-child(1) {
    color #F20845
    font-weight bold
}
.classifyBtn {
    padding-top 18px
    padding-bottom 18.5px
}
.classifyBtn .van-button{
    border-radius:3px;
    width:70px;
    height:25px;
    font-size 12px;
}
.classifyBtn .van-button--normal{
    padding 0;
}
.classifyBtn .van-button:nth-child(1){
    background-color #12ACF4;
}

.commentList {
    padding-bottom 48pt
}
.commendItem {
    display flex
    flex-direction column
    padding-bottom 20px
    // background-color red
}
.commendItem .top {
    display flex
    align-items center

}
.text {
    font-size 14px;
    margin 14px 0 
}
.image{
    display flex;
    justify-content flex-start;
    width 100%;
}
.detail-img{
    width 33%;
    height 108.3px;
    margin-left 1.5%;
}
.detail-img:nth-child(1){
    margin-left 0;
}
.submit {
    position fixed
    bottom 0
    left 0
    right 0
    height 48px
    display flex
    width 100%
    justify-content flex-start
    box-sizing border-box
    padding 5pt
    background-color #fff

}
.sub-left{
    display flex
    width 42%
    justify-content center
}
.sub-right{
    display flex
    width 58%
}
.sub-svg{
    box-sizing:border-box;
    // padding: 0 .5rem;
    text-align :center;
    width 40%
    color #000000
}
.sub-word{
    font-size 12px
}
.submit .sub-right .btns {
    display flex 
    border-radius 5px
    overflow hidden
    height 35px
    line-height 35px
    justify-content start
    width 100%
}
/deep/ .van-button{
    border-radius 0;
}
.sub-car,.sub-shop{
    height 35px
}
.sub-right >>> .van-button--normal{
    padding 0;
} 
.submit .sub-right  >>> .van-button--default{
    width 50%
}
.van-tab__pane{
    margin-top 15px;
}
.tab-card >>> .van-tabs__wrap .van-tabs__nav--card{
    margin 0;
    border: 0
    display flex
    height 28px
    width 100%
    justify-content flex-start
}
.tab-card >>> .van-tabs__wrap .van-tabs__nav--card .van-tab{
    width 70px;
    color black
    margin-right 8px;
    border-radius 5px;
    border 1px solid #ccc;
}
.tab-card >>> .van-tabs__wrap .van-tabs__nav--card .van-tab span{
    font-size 14px
    height 28px
}
.tab-card >>> .van-tabs__wrap .van-tabs__nav--card .van-tab--active{
    color white
    background-color: #12ACF4
    border: 1px solid #12ACF4;
}
.tab-a >>> .van-tab__pane{
    margin-top 12px;
}
/deep/ .van-stepper__minus::before,
/deep/ .van-stepper__plus::before{
    top 11%
}
/deep/ .van-stepper__plus::after{
    left 5%
    transform: translate(-6%,-42%);
}
</style>