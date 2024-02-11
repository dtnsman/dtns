// 购物车
<template>
  <div>
        <MyBox title="购物车" @back="$router.go(-1)">
       <template slot="content">
           <div class="content">
           
               <!-- <div class="LC"  v-for="(item,index) of  goodsList" :key="item.goodsId">
                    <div v-show="item.result.length === item.items.length" style="cursor:pointer;border-bottom:1px solid #f5f5f5;padding-bottom:10px" @click="checkAll(item.goodsId,index,true)">
                         <svg  style="transform:translateY(5px)" t="1590736679393" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2627" width="20" height="20"><path d="M512.313069 0a511.992516 511.992516 0 1 0 511.687031 511.992516A512.603485 512.603485 0 0 0 512.313069 0z" fill="#12ADF5" p-id="2628"></path><path d="M442.357052 744.160959a21.383936 21.383936 0 0 1-14.663271-5.804211l-249.275592-232.473928a21.383936 21.383936 0 0 1 0-30.54848 21.68942 21.68942 0 0 1 30.54848 0l233.695867 218.421628 349.16912-365.970783a21.68942 21.68942 0 0 1 30.54848 0 21.383936 21.383936 0 0 1 0 30.548479L458.547746 737.745779a21.383936 21.383936 0 0 1-16.190694 6.41518z" fill="#FFFFFF" p-id="2629"></path></svg>
                      
                         <span>{{item.tradeName}}</span>
                    </div>
                    <div v-show="item.result.length !== item.items.length || item.result.length === 0 " style="cursor:pointer;border-bottom:1px solid #f5f5f5;padding-bottom:10px" @click="checkAll(item.goodsId,index,false)">
                         <svg  style="transform:translateY(5px)" t="1590737040091" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3269" width="20" height="20"><path d="M512.312974 0a511.992516 511.992516 0 1 0 511.687031 511.992516A512.603485 512.603485 0 0 0 512.312974 0z" fill="#999999" p-id="3270"></path><path d="M442.356956 744.160959a21.383936 21.383936 0 0 1-14.66327-5.804211l-249.275593-232.473928a21.383936 21.383936 0 0 1 0-30.54848 21.68942 21.68942 0 0 1 30.54848 0l233.695868 218.421628 349.16912-365.970783a21.68942 21.68942 0 0 1 30.548479 0 21.383936 21.383936 0 0 1 0 30.548479L458.54765 737.745779a21.078451 21.078451 0 0 1-16.190694 6.41518z" fill="#FFFFFF" p-id="3271"></path></svg>                       
                        
                          <span>{{item.tradeName}}</span>
                    </div> -->
                    
                    <van-checkbox-group v-model="result" ref="shopList"  @change="changeCheckBox">
                        <div class="shop-che">
                            <div class="shop-title">{{chatname}}</div>
                        </div>
                        <van-checkbox  class="car-aa" :name="items" style="width:100%" v-for="items of goodsList" :key="items.product_id">
                                  <!-- 自定义图标 -->
                                  <!-- <template #icon="props">
                                    <van-icon name="checked" v-show="props.checked" color="#12ACF4" />
                                    <van-icon name="circle" v-show="!props.checked" color="#8C9198" /> -->
                                    <!-- <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" /> -->
                                    <!-- <svg v-show="props.checked" t="1590736679393" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2627" width="20" height="20"><path d="M512.313069 0a511.992516 511.992516 0 1 0 511.687031 511.992516A512.603485 512.603485 0 0 0 512.313069 0z" fill="#12ADF5" p-id="2628"></path><path d="M442.357052 744.160959a21.383936 21.383936 0 0 1-14.663271-5.804211l-249.275592-232.473928a21.383936 21.383936 0 0 1 0-30.54848 21.68942 21.68942 0 0 1 30.54848 0l233.695867 218.421628 349.16912-365.970783a21.68942 21.68942 0 0 1 30.54848 0 21.383936 21.383936 0 0 1 0 30.548479L458.547746 737.745779a21.383936 21.383936 0 0 1-16.190694 6.41518z" fill="#FFFFFF" p-id="2629"></path></svg> -->
                                    <!-- <svg v-show="!props.checked" t="1590736714990" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2877" width="20" height="20"><path d="M512.312974 0a511.992516 511.992516 0 1 0 511.687031 511.992516A512.603485 512.603485 0 0 0 512.312974 0z" fill="#999999" p-id="2878"></path><path d="M442.356956 744.160959a21.383936 21.383936 0 0 1-14.66327-5.804211l-249.275593-232.473928a21.383936 21.383936 0 0 1 0-30.54848 21.68942 21.68942 0 0 1 30.54848 0l233.695868 218.421628 349.16912-365.970783a21.68942 21.68942 0 0 1 30.548479 0 21.383936 21.383936 0 0 1 0 30.548479L458.54765 737.745779a21.078451 21.078451 0 0 1-16.190694 6.41518z" fill="#FFFFFF" p-id="2879"></path></svg> -->
                                  <!-- </template> -->
                                   <van-card
                                        class="van-hairline--bottom van-ellipsis"
                                        :thumb="items.product_img"
                                        >
                                        <div slot="price" class="car-price">
                                            <div style="" class="car-price-aa">
                                                <span style="font-size:14px;margin-right:10px;color:#000000;">×{{items.number}}</span>
                                                <span style="font-size:14px;color:#F00945">￥{{items.product_price}}</span>
                                            </div>
                                        </div>
                                        <div slot="num" class="car-num">
                                            <div @click.stop style="display:flex;align-items:center;">
                                                   <span @click="comp(items,false)" v-if="items.number>1"><svg style="transform:translateY(3px)" t="1590743671137" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2875" width="22" height="22"><path d="M515.02777 0.009035a511.99232 511.99232 0 1 0 508.980601 511.99232A511.99232 511.99232 0 0 0 515.02777 0.009035z" fill="#F5F5F5" p-id="2876"></path><path d="M834.27004 533.083392H192.773781a24.093756 24.093756 0 0 1-21.082037-21.082037 21.082037 21.082037 0 0 1 21.082037-21.082036h641.496259a21.082037 21.082037 0 0 1 21.082037 21.082036 24.093756 24.093756 0 0 1-21.082037 21.082037z" fill="#B2B2B2" p-id="2877"></path></svg></span>
                                                   <span v-else><svg style="transform:translateY(3px)" t="1590739454462" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3465" width="20" height="20"><path d="M515.06377 0.009143a511.992381 511.992381 0 1 0 508.944807 511.992381A511.992381 511.992381 0 0 0 515.06377 0.009143z m323.042812 533.325397H188.973384a24.38059 24.38059 0 0 1-21.333016-21.333016 21.333016 21.333016 0 0 1 21.333016-21.333016h649.133198a21.333016 21.333016 0 0 1 21.333015 21.333016 24.38059 24.38059 0 0 1-21.333015 21.333016z" fill="#F5F5F5" p-id="3466"></path></svg></span>
                                                    <span style="font-size:14px;margin:0 12px">{{items.number}}</span>
                                                    <!-- <span><svg  t="1590739746633" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4612" width="25" height="25"><path d="M515.02777 0.009035a511.99232 511.99232 0 1 0 508.980601 511.99232A511.99232 511.99232 0 0 0 515.02777 0.009035z m0 978.808847A469.828247 469.828247 0 1 1 981.844297 512.001355 469.828247 469.828247 0 0 1 515.02777 978.817882z" p-id="4613" fill="#f5f5f5"></path><path d="M834.27004 490.919319h-298.160233v-301.171953a24.093756 24.093756 0 0 0-21.082037-21.082037 21.082037 21.082037 0 0 0-21.082036 21.082037v301.171953h-301.171953a21.082037 21.082037 0 0 0-21.082037 21.082036 24.093756 24.093756 0 0 0 21.082037 21.082037h301.171953v298.160233a21.082037 21.082037 0 0 0 21.082036 21.082037 24.093756 24.093756 0 0 0 21.082037-21.082037v-298.160233h298.160233a24.093756 24.093756 0 0 0 21.082037-21.082037 21.082037 21.082037 0 0 0-21.082037-21.082036z" p-id="4614" fill="#f5f5f5"></path></svg></span> -->
                                                      <span @click="comp(items,true)"><svg style="transform:translateY(3px)"  t="1590743611388" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2686" width="20" height="20"><path d="M515.02777 0.009035a511.99232 511.99232 0 1 0 508.980601 511.99232A511.99232 511.99232 0 0 0 515.02777 0.009035z" fill="#F5F5F5" p-id="2687"></path><path d="M834.27004 533.083392H192.773781a24.093756 24.093756 0 0 1-21.082037-21.082037 21.082037 21.082037 0 0 1 21.082037-21.082036h641.496259a21.082037 21.082037 0 0 1 21.082037 21.082036 24.093756 24.093756 0 0 1-21.082037 21.082037z" fill="#B2B2B2" p-id="2688"></path><path d="M515.02777 852.325662a21.082037 21.082037 0 0 1-21.082036-21.082037V189.747366a21.082037 21.082037 0 0 1 21.082036-21.082037 24.093756 24.093756 0 0 1 21.082037 21.082037v641.496259a24.093756 24.093756 0 0 1-21.082037 21.082037z" fill="#B2B2B2" p-id="2689"></path></svg></span>
                                            </div>
                                        </div>
                                        <!-- <template slot="title">
                                          <div class="van-ellipsis" style="">{{items.product_name}}</div>
                                        </template> -->
                                        <template slot="desc">
                                            <div class="van-multi-ellipsis--l2 desc">{{items.product_name}}&nbsp;{{items.product_desc}}
                                            </div>
                                        </template>
                                    </van-card>
                        
                        </van-checkbox>
                    </van-checkbox-group>
               
           </div>
       </template>
   </MyBox>
   <van-submit-bar  :price="countPrice*100" button-text="去结算" @submit="onSubmit" >
    <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
export default {
    data () {
        return {
            goodsList: [],
            result:[],
            checked: false,
            chatname:'',
            order_id:'',
            addressList:{
                address: '',
                num: '',
                name: '',
                phone:'',
            },
            addlist:[],
            goodlist:[],
            // countPrice:'',
            checkeds:false
        }
    },
    methods: {
        
        changeCheckBox (event) {
            console.log(event)
            this.goodlist = event
           if(this.result.length === 0) {
               this.checked = false
                this.goodsList.forEach(item=> {
                     item.checked = false
                })
           }else if(this.result.length === this.goodsList.length) {
             this.checked = true
             this.goodsList.forEach(item=> {
                    item.checked = true
                })
           }else if(this.result.length === this.goodlist.length){
               this.goodlist.forEach(item=> {
                    item.checked = true
                })
           }
        },
        onSubmit () {
            // this.$toast('提交订单')
            let goodsList = this.goodsList.filter(item=>item.checked === true)
            if(this.result.length === 0) {
               this.$toast('请选择商品')
           }else {
            this.comfirmOrder()
                
           }
            
        },
        async ShoppingCart(){
            let that = this
            let list = JSON.parse(localStorage.getItem('shopCard')).map(item=> {
                return {
                    ...item,
                    checked:false
                }
            })
            for(let i=0;i<list.length;i++)
            {
                //加载图片
                let info = list[i]
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
            }
            
            that.goodsList = list
        },
        async Administration(){//获取小店名称
              let shopid = localStorage.getItem('shopid')
              console.log(shopid)
              let params={
                  user_id:localStorage.user_id,
                    s_id: localStorage.s_id,
                    shop_id: shopid,
              }
            let res = await this.$api.network.queryShopInfo(params)
            console.log(res)
            this.chatname=res.shop_name
          },
        comp (items,flag) {
            if(!flag) {
                items.number--
            }else {
                items.number++
            }
            let shopCard = JSON.parse(localStorage.getItem('shopCard'))
            let index = shopCard.findIndex(item=> item.product_id === items.product_id)
            shopCard[index].number =  items.number
            localStorage.shopCard = JSON.stringify(shopCard)
        },
        countSum () {
             let count = 0
             console.log(this.goodsList)
             this.goodsList.forEach(item=> {
               console.log(item)
               let itemCount = 0
                
               if(item.checked) {
                     itemCount = item.number*item.product_price
               }
               count +=itemCount//价格
               console.log(count)
            })
            // this.countPrice = count
            return count
        },
        async comfirmOrder () {
          let shopCard = this.goodlist
            //地址
            // let params =  {
            //     user_id:localStorage.user_id,
            //     s_id: localStorage.s_id,
            //     shop_id: shopid,
            //     address_info: JSON.stringify(addresssList),
            //     goods: JSON.stringify(this.goods),
            //     note: "楼上的快乐付款",
            //     random:random
            // }
            // let res = await this.$api.network.createOrder(params)
            // console.log(res)
            // this.order_id=res.order_id
            // console.log(this.order_id)
            // localStorage.setItem('upParams',params)
            localStorage.setItem('goods',JSON.stringify(this.goodlist))
            this.$router.push({path:"/confirmAnOrder"}) 
        },
    
    },
    created () {
        ///获取购物车列表
        // this.queryAddress()
        this.ShoppingCart()
        this.Administration()
    },
    computed: {
        countPrice () {
            return this.countSum()
        },
        
    },
    watch: {
        checked () {
            if(this.checked) {
                 this.goodsList.forEach(item=> {
                     item.checked = true
                })
                this.$refs.shopList.toggleAll(true)
            }else {
                 this.goodsList.forEach(item=> {
                     item.checked = false
                })
                this.$refs.shopList.toggleAll(false)
            }
        }
    },
}
</script>
<style lang="stylus" scoped>
.content {
    box-sizing border-box
    padding 9px .6rem
    margin 10px 15px 0 15px
    background-color #ffffff
    border-radius 10px
}
// .LC {
//     box-sizing border-box
//     background-color #ffffff
//     padding 20px .6rem
//     padding-top 10px
//     border-radius 10px
//     margin-bottom 20px
// }
.content >>> .van-checkbox {
    width: 100%
    // height 100px
    display:flex
    justify-content flex-start
    overflow:hidden; //超出的文本隐藏
    text-overflow:ellipsis; //溢出用省略号显示
    white-space:wrap; //溢出不换行 
}
.content >>> .van-card {
    width: 100%
    overflow:hidden; //超出的文本隐藏
    text-overflow:ellipsis; //溢出用省略号显示
    white-space:nowrap; //
    background-color white
}
/deep/ .van-card__thumb{
    width 72.3px;
    height 72.3px;
    display flex
    align-items:center;
    justify-content:center;
}
/deep/ .van-card__header{
    width 100%
    display:flex
    align-items:center;
    justify-content:center;
}
/deep/ .van-hairline--bottom::after {
    border-bottom-width: 0px;
}
.content >>> .van-card__content {
    width 210px
    font-size 12px
    font-weight 600
    padding-top 10px
    overflow hidden
    height 72.3px
    position relative
}
.desc{
    width 100%
    display: -webkit-box;
    overflow hidden
    white-space pre-line
    text-overflow: ellipsis;
    height 40px
}
.car-aa >>> .van-checkbox__label{
    width 100%;
    overflow hidden
}
.car-aa{
    height 100px
    border-top  1px solid #F5F5F5
}
.shop-che{
    margin-bottom 5px;
}
.shop-title{
    font-size 16px;
    font-weight 600;
    padding 8px 0 10px 16px;
}
/deep/ .van-card__bottom{
    position absolute
    top 62px
    display flex
    width 100%
    align-items:center;
    justify-content space-between
}
/deep/ .van-card__thumb img{
    border-radius 5px;
}
/deep/ .van-button--round{
    border-radius 5px;
}
/deep/ .van-card{
    padding 8px 5px;
}
</style>