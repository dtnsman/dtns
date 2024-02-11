<template>
   <MyBox title="产品管理" @back="$router.go(-1)">
       <template slot="rightContent">
            <div @click="$router.push(`/shopBroadcast/putawaygoods/${$route.params.shopid}/${$route.params.chatid}`)">产品库</div>&nbsp;
           <!-- <div @click="$router.push(`/shopBroadcast/managegoods/${$route.params.shopid}/${$route.params.chatid}`)">货架</div> -->
       </template>
       <template slot="content">
          <div class="content">
             <van-tabs offset-top="46" v-model="active" sticky swipeable @click="onClick" 
             title-active-color="#12acf4" color="#12acf4" @change="handChange">
                <van-tab v-for="item of classifyList" 
                :title="item.label" :name="item.value"
                 :key="item.value" 
                  >
                   <div :style="{'height':!item.list.length?getHeight():''}" class="listContent">
                   <!-- <van-pull-refresh v-model="item.refreshing" @refresh="onRefresh(item)"> -->
                        <van-list
                        :immediate-check="false"
                            v-model="item.loading"
                            :finished="item.finished"
                            finished-text="没有更多了"
                            @load="onLoad(item)"
                            >
                                <van-card
                            class="van-hairline--bottom card"
                            v-for="(item1,index1) of item.list"
                            :key="item1.product_id"
                            :thumb="item1.product_img"
                            @click="updateShop(item1.product_id)">
                            <template slot="title">
                                <span class="van-ellipsis title">{{item1.product_name}}</span>
                            </template>
                            <template slot="desc">
                                <div class="van-multi-ellipsis--l2 desc">
                                    {{item1.product_desc}}
                                </div>
                            </template>
                            <template slot="price">
                                
                                <span>
                                    <span class="num price">￥{{item1.product_price}}</span>
                                </span>
                                <span style="margin-left:0px">
                                    <span><svg style="transform:translateY(2px)" t="1590561013246" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2974" width="14" height="14"><path d="M512.409161 0a511.992571 511.992571 0 1 0 511.591008 511.992571A512.394134 512.394134 0 0 0 512.409161 0z" fill="#12ADF5" p-id="2975"></path><path d="M471.851318 803.125602a27.30627 27.30627 0 0 1-8.031256 0 40.15628 40.15628 0 0 1-30.920335-28.912522L332.910589 392.326856H238.944894a40.15628 40.15628 0 0 1 0-80.31256h124.886031a40.15628 40.15628 0 0 1 40.15628 29.715648l86.737565 332.493999 264.228323-346.548698a40.15628 40.15628 0 0 1 63.848485 48.589099l-315.226798 412.003434a40.15628 40.15628 0 0 1-31.723462 14.857824z" fill="#FFFFFF" p-id="2976"></path></svg></span>
                                    <span class="num vprice" style="padding-left:0">￥{{item1.product_price - (item1.product_price * (Number(item1.product_vip_rate)/100)).toFixed(1)}}</span>
                                    
                                </span>
                            </template>
                            <template slot="num">
                                <div style="display:flex;flex-direction:column;justify-content:center;position:relative;">
                                        <div>
                                        <svg  @click="handleAdd" t="1590560281620" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584" width="19" height="19"><path d="M515.06377 0.009143a511.992381 511.992381 0 1 0 508.944807 511.992381A511.992381 511.992381 0 0 0 515.06377 0.009143z m323.042812 533.325397h-301.709796v301.709796a24.38059 24.38059 0 0 1-21.333016 21.333016 21.333016 21.333016 0 0 1-21.333016-21.333016v-301.709796h-304.75737a24.38059 24.38059 0 0 1-21.333016-21.333016 21.333016 21.333016 0 0 1 21.333016-21.333016h304.75737v-304.75737a21.333016 21.333016 0 0 1 21.333016-21.333016 24.38059 24.38059 0 0 1 21.333016 21.333016v304.75737h301.709796a21.333016 21.333016 0 0 1 21.333015 21.333016 24.38059 24.38059 0 0 1-21.333015 21.333016z" fill="#60F009" p-id="2585"></path></svg>
                                        </div>
                                        <div>
                                            <svg @click="handleDel(item,item1,index1)" t="1590560294988" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2833" width="19" height="19"><path d="M515.06377 0.009143a511.992381 511.992381 0 1 0 508.944807 511.992381A511.992381 511.992381 0 0 0 515.06377 0.009143z m323.042812 533.325397H188.973384a24.38059 24.38059 0 0 1-21.333016-21.333016 21.333016 21.333016 0 0 1 21.333016-21.333016h649.133198a21.333016 21.333016 0 0 1 21.333015 21.333016 24.38059 24.38059 0 0 1-21.333015 21.333016z" fill="#F00945" p-id="2834"></path></svg>
                                        </div>
                                </div>
                            </template>
                        </van-card>
                        </van-list>
                   </van-pull-refresh>
                     <van-empty v-if="!item.list.length" image="https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/7360411bba14d403e70b36948a61144ac075b14f1a9d93ebd8b6bc65caddb0c5dda961f539f24c3e2b25e4aff5a57516?pictype=scale&from=30113&version=3.3.3.3&uin=1173908229&fname=%E6%82%A8%E8%BF%98%E6%B2%A1%E6%9C%89%E4%B8%8A%E6%9E%B6%E5%95%86%E5%93%81%402400x-8.png&size=750" description="没有更多商品" class="sky-s" />
                     
                   </div>

                </van-tab>
            </van-tabs>
          </div>
       </template>
   </MyBox>
</template>
<script>
export default {
    data () {
        return {
          userInfo: JSON.parse(localStorage.userInfo),
          active: 0,
          classifyList: [],
        }
    },
    methods: {
      async fetchClassifyList() {
        let that = this
        let params = {
                user_id:that.userInfo.user_id,
                s_id: that.userInfo.s_id,
                shop_id: that.$route.params.shopid,
            }
            let res = await this.$api.network.ClassifyList(params)
            console.log(res)
            if (res.ret) {
                that.classifyList = res.list.map(item=> {
                 return {
                        value: item.classify_id,
                        label: item.classify_name,
                        list:[],
                        begin:1,
                        len: 10,
                        finished: false,
                        loading: false,
                        refreshing: false
                 }
                })
                that.active = that.classifyList[0].value
                console.log(that.active)
                that.fectchProuct (this.active)
            }
             console.log(res)
             console.log(that.active)
      },
      async fectchProuct (classify_id) {
          console.log(classify_id)
          let that = this
          let classifyItem = that.classifyList.find(item=> item.value == classify_id)
          console.log(classifyItem)
          let params = {
                user_id:that.userInfo.user_id,
                s_id: that.userInfo.s_id,
                shop_id: that.$route.params.shopid,
                classify_id:classifyItem.value,
                secret_key:classifyItem.value,
                begin: classifyItem.begin,
                len: classifyItem.len
               
          }
          let res = await that.$api.network.ClassifyProductList(params)
          if (res.ret && res.list.length) {


            for(let i=0;i<res.list.length;i++)
            {
                //加载图片
                let info = res.list[i]
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

              console.log(res)
              classifyItem.list = classifyItem.list.concat(res.list)
              classifyItem.begin+=classifyItem.len
          }
          return {
              
              length: res.list.length,
              list: res.list
          }
          console.log(res)
      },
      onClick(value,label) {
        //   console.log(name,title)
        let that = this
        let classify = that.classifyList.find(item=> item.value === value)
        console.log(classify)
        if(!classify.list.length) {
            that.fectchProuct(value)
        }
      },
      handChange(name,title) {
          console.log(name,title)
      }, 
      async onLoad (item) {
         let finished = await this.fectchProuct(item.value)
         if (!finished.length) {
             item.finished = true
         }
      },
      async onRefresh (item) {
          let that = this
          item.finished = false
          item.begin = 1
          item.len = 10
        //    item.loading = true
         let res =  await that.fectchProuct(this.active)
         if (!res.length) {
             item.finished = true
         }else {
              item.list = res.list
         }
         item.refreshing = false
         item.loading = false

      },
      getHeight () {
          let height = document.documentElement.clientHeight? document.documentElement.clientHeight: document.body.clientHeight;
          height -=90
          console.log(height)
          return height + 'px'
      },
      handleAdd () {
          console.log('添加')
      },
      async handleDel (item,item1,index1) {
           let that = this
           let params = {
                user_id:that.userInfo.user_id,
                s_id: that.userInfo.s_id,
                product_id: item1.product_id,
                classify_id: item.value
           }
           let res =  await that.$api.network.ClassifyProductDel(params)
           console.log(res)
           if(res&&res.ret) {
               this.$toast('下架成功')
               item.list.splice(index1,1)
               return
           }
            this.$toast.fail(('下架失败'))
      },
      updateShop(product_id){//修改商品信息
        this.$router.push(`/shopBroadcast/updateShop/${product_id}/${this.$route.params.chatid}`)
        // this.$router.push({path:'/shopBroadcast/updateShop/'+product_id})
      }
      
    },
    created () {
        this.fetchClassifyList()
    },
    mounted () {
        console.log(this.active)
     
    }
}
</script>
<style lang="stylus" scoped>
.content {
    box-sizing border-box
    background-color #f5f5f5
    // height 100%;
}
.content >>> .van-card {
    margin-top: 0
    padding 16px
    width 100%
}
.title {
    display block
    font-size: 16px
    font-weight bold
    margin-bottom 4px
}
// .desc {
//     max-width 200px
// }
.listContent {
    position relative
    
}
.card {
    height 120px
}
.num {
    font-weight bold
    font-size: 14px
    padding 35px 8px
    padding-left 0
    
}
.van-card__price
   transform  translateY(10px)
.price {
    color: #f2104b
}
.vprice {
    color: #12acf4
}
.listContent {
    width 100%;
    display flex;
    align-items center;
}
// .van-empty{
//     width 100%;
// }
.sky-s >>> .van-empty__image {
    width: 26%;
    height: 100%;
  }
  .box,.van-list{
      min-height 500px;
      width:100%
  }
// /deep/ .van-pull-refresh{
//     width 100%
// }
</style>