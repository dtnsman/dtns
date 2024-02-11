<template>
    <div class="box">
        <van-sticky>
        <header class="topbar">
        <div style="margin:0 auto;height:46px;" align="center">
          <span style="font-size:16px; line-height:43px;margin-right:2px;">发布产品</span>
    
          <svg t="1590461422341" style="width:17px;height:17px;top:14px; position:absolute; margin-left:2px;" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3302" width="20" height="20"><path d="M1008.995228 367.590465L840.204205 15.004772a26.256381 26.256381 0 0 0-22.50547-15.003647H210.051051a30.007293 30.007293 0 0 0-26.256381 15.003647L18.754558 367.590465a153.787377 153.787377 0 0 0-18.754558 71.267321c0 97.523702 105.025526 172.541935 232.556521 172.541935a296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205 296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205c131.281907 0 232.556521-75.018233 232.556521-172.541935a153.787377 153.787377 0 0 0-18.754558-71.267321zM660.160447 648.908837a243.809256 243.809256 0 0 1-146.285554 48.761851 255.061991 255.061991 0 0 1-146.285553-48.761851 236.307433 236.307433 0 0 1-146.285554 48.761851 277.567461 277.567461 0 0 1-123.780084-33.758204v326.329311a30.007293 30.007293 0 0 0 26.256382 33.758205h780.189619a30.007293 30.007293 0 0 0 26.256381-33.758205v-326.329311a262.563814 262.563814 0 0 1-123.780084 33.758204 243.809256 243.809256 0 0 1-146.285553-48.761851z" fill="#12ADF5" p-id="3303"></path></svg>
        </div>
        <div @click="back" style="position:absolute; top:14px; left:15px;">
          <van-icon style="font-size:17px;" name="arrow-left" />
        </div>
      
        </header>
        </van-sticky>
        <div class="body">
             <div  style="border:1px sold;background-color:#fff; border-radius:5px;padding-top:20px;padding-bottom:15px;">
                <div style="font-size:16px; padding-left:15px;">产品价格:</div>
                <div style="text-align:center;margin-top:10px;padding:0 10px;font-size:14px;">
                <van-field
                   style="border:1px solid  #e8e8e8; border-radius:5px;"
                    v-model="price"
                >
                <template #button>
                   元
                </template>
                </van-field>
                <!-- <input v-model="price" style="width:90%; height:35px;border:1px solid  #e8e8e8; border-radius:5px;padding-left:10px;font-size:14px;" type="text"> -->
                </div>
            </div>
             <div  style="border:1px sold;background-color:#fff; border-radius:5px;">
                <div style="font-size:16px; padding-left:15px;">会员折扣:</div>
                <div class="select">
                    <!-- <select name="public-choice" v-model="vipDiscount" @change="getCouponSelected" style=" outline: none;">                                        
                    <option :value="coupon.value" v-for="coupon of columns" :key="coupon.value">{{coupon.label}}</option>                                    
                    </select> -->
                     <multiselect v-model="vipDiscount" 
                     :options="columns" label="label" track-by="value"
                     placeholder="请选择折扣"
                     :searchable="false"
                     @input="updateSelected"
                     ></multiselect>
                </div>
                <!-- <input v-model="vipDiscount" style="width:90%; height:35px;border:1px solid  #e8e8e8; border-radius:5px;padding-left:10px;font-size:14px;" type="text"> -->
            </div>
             <div class="btns">
                <van-button class="btn" type="info" @click="next">下一步(上架商品)</van-button>
                <van-button class="btn" type="info" @click="next1">完成</van-button>
            </div>
          </div>
           
        </div>

</template>
<script>
import Multiselect from 'vue-multiselect'
export default {
    components: {
        Multiselect
    },
    data () {
        return {
            price: '',
            vipDiscount: {
                value: '',
                 label: "无"
            },
             columns: [{
                 value: 0,
                 label: "无"
             },
            {
                 value: 9,
                 label: '九折'
             },
               {
                 value: 8,
                 label: '八折'
             },
              {
                 value: 7,
                 label: '七折'
             },
                {
                 value: 6,
                 label: '六折'
             },
           
             {
                 value: 5,
                 label: '五折'
             },
       
               {
                 value: 4,
                 label: '四折'
             },
          
                {
                 value: 3,
                 label: "三折"
             },
          
               {
                 value: 2,
                 label: "二折"
             },
    
              {
                 value: 1,
                 label: "一折"
             },
             ],
            showPicker: false,
        }
    },
    methods: {
        back () {
            this.$router.go(-1)
        },
        updateSelected (value) {
            console.log(value)
            console.log(this.vipDiscount)
        },
        async save () {
            ///保存数据
            let that = this
            let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            if (that.price === '' ) return that.$toast('请输入价格')
             if (!that.vipDiscount) return that.$toast('请输入会员折扣')
        
                 let storage = JSON.parse(localStorage.getItem('newShop'))
                 console.log(storage)
                 let params = {
                     user_id: userInfo.user_id,
                     s_id:userInfo.s_id,
                     shop_id: that.$route.params.shopid,
                     product_desc: storage.desc,
                     product_price: that.price,
                     product_image: storage.chatlogo,
                     product_vip_rate: !that.vipDiscount.value?0:that.vipDiscount.value,
                     product_ad: storage.feature,
                     product_name: storage.name

                 }
                 console.log(params)
            let res = await this.$api.network.productNew(params)
            console.log(res)
            if (res.ret) {
                this.$toast('发布成功')
               
            }else {
                this.$toast('发布失败')
            }
            return res.ret
        },
        async next () {
            ///前往仓库上架页面
            let res = await this.save()
            if (res) {
                setTimeout(()=>this.$router.push(`/shopBroadcast/putawaygoods/${this.$route.params.shopid}/${
                  this.$route.params.chatid
                }`),1000)
            }
        },
        async next1 () {
            //  前往产品管理页面
             let res = await this.save()
              if (res) {
                 this.$router.push(`/shopBroadcast/putawaygoods/${this.$route.params.shopid}/${
                  this.$route.params.chatid
                }`)
              }
             
        }
    },
    created () {
    }
}
</script>
<style lang="stylus" scoped>
.box {
  width 100%
  height 100%
 
  // position fixed
  background-color:#f5f5f5
}
.topbar {
  height 46px
  background-color:#fff;
}
.body {
    border-radius: 20px;
    // overflow hidden
    box-sizing border-box
    margin-top 15px
    padding 0px 15px
}
.btns {
    display flex
    justify-content space-around
    align-content center
    background-color:#fff; 
    padding-bottom 20px
    padding-top 10px
}
.btn {
    
    border-radius 5px
    background-color #12adf5
    border-color #12adf5
}
select,input {
    appearance:none;
    width: 100%
    height 35px
    padding 4px
    border-radius 5px
    tap-highlight-color: rgba(0, 0, 0, 0);
    // color: #aaa
 }
.select {
    box-sizing border-box
    padding 10px 13px
  
}
</style>