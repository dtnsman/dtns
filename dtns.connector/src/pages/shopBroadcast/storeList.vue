<template>
    <MyBox title="我的小店" @back="$router.go(-1)">
    <template slot="content">
        <div class="content">
            <div class="card" @click="getshopStote(item.shop_id)" v-for="item in data" :key="item.shop_id">
                <div class="flex-sta" style="padding:5px;">
                    <div style="width:20%;">
                        <van-image v-if="item.shop_img" round width="4rem" height="4rem" :src="img+item.shop_img"/>
                        <van-image v-else round width="4rem" height="4rem" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                    </div>
                    <div style="width:70%;margin-left:2%;">
                        <div style="font-size:18px;font-weight:800;">{{item.shop_name}}</div>
                        <div class="desc" style="font-size:14px;margin-top:5px;">{{item.shop_desc}}</div>
                    </div>
                    <div class="flex-center" style="width:3%;margin-left:1%">
                        <van-icon name="arrow" />
                    </div>
                </div>
            </div>
            <van-empty
            v-if="data.length == 0"
                class="custom-image"
                image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                description="您还没有创建小店"
                />
        </div>
    </template>
    </MyBox>
</template>
<script>
export default {
    data () {
        return {
            data:[],
            img:'',

        }
    },
    methods: {
        async getShopList(){//小店列表
          let params ={
                user_id:localStorage.user_id,
                s_id: localStorage.s_id,
          }
          let res = await this.$api.network.getShopList(params)
          console.log(res)
          this.img=this.$img
          if(res.res){
              this.data = res.shoplist
            //   console.log(this.data)
          }else{
              
          }
      },
    //     async queryMyShops(){//小店列表
    //       let params = {
    //             user_id:localStorage.user_id,
    //             s_id: localStorage.s_id,
    //             begin:'0',
    //             len:'1000'
    //       }
    //       let res = await this.$api.network.queryMyShops(params)
    //       console.log(res)
    //   },
    async getshopStote(shopid){
        let chat_id ='msg_'+shopid.split('_')[1]
        console.log(chat_id)
        localStorage.setItem('shopid',shopid)
        this.$router.push(`/shopBroadcast/SuccessSetShop/${chat_id}`)
    },
        
    },
    created(){
        // this.ShoppingOrderInfo()
        this.getShopList()
        // this.queryMyShops()
        // this.getChatList()
    }

}
</script>
<style lang="stylus" scoped>
.content {
    // width 100%;
    // height 100%
    overflow hidden
    box-sizing border-box
    padding  15px
    padding-bottom 18px
}
.card {
    background-color #fff
    border-radius 5px
    padding 6px
    margin-bottom 10px
    
}
.flex-sta {
    width  100%
    display flex
    // align-items center
    justify-content flex-start
}
.flex-center {
    width  100%
    display flex
    align-items center
    justify-content center
}
.desc{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
/deep/ .van-empty__image {
    width: 90px;
    height: 90px;
  }
</style>