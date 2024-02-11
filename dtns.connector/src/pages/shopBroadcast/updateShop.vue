<template>
    <div class="box">
        <van-sticky>
        <header class="topbar">
        <div style="margin:0 auto;height:46px;" align="center">
          <span style="font-size:16px; line-height:43px;margin-right:2px;">修改商品信息</span>
          <svg v-if="type === 'group_live'" style="width:17px;height:17px;top:14px; position:absolute; margin-left:2px;" t="1589772060484" class="icon" viewBox="0 0 1451 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2816" width="20" height="20"><path d="M911.266055 93.944954a93.944954 93.944954 0 0 0-93.944954-93.944954H93.944954a93.944954 93.944954 0 0 0-93.944954 93.944954v836.110092a93.944954 93.944954 0 0 0 93.944954 93.944954h723.376147a93.944954 93.944954 0 0 0 93.944954-93.944954V352.293578zM1427.963303 84.550459a42.275229 42.275229 0 0 0-46.972477 0l-403.963303 230.165137v394.568808l403.963303 234.862385h46.972477a56.366972 56.366972 0 0 0 23.486238-42.275229V122.12844a46.972477 46.972477 0 0 0-23.486238-37.577981z" fill="#12adf5" p-id="2817"></path></svg>
          <svg v-else t="1590461422341" style="width:17px;height:17px;top:14px; position:absolute; margin-left:2px;" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3302" width="20" height="20"><path d="M1008.995228 367.590465L840.204205 15.004772a26.256381 26.256381 0 0 0-22.50547-15.003647H210.051051a30.007293 30.007293 0 0 0-26.256381 15.003647L18.754558 367.590465a153.787377 153.787377 0 0 0-18.754558 71.267321c0 97.523702 105.025526 172.541935 232.556521 172.541935a296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205 296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205c131.281907 0 232.556521-75.018233 232.556521-172.541935a153.787377 153.787377 0 0 0-18.754558-71.267321zM660.160447 648.908837a243.809256 243.809256 0 0 1-146.285554 48.761851 255.061991 255.061991 0 0 1-146.285553-48.761851 236.307433 236.307433 0 0 1-146.285554 48.761851 277.567461 277.567461 0 0 1-123.780084-33.758204v326.329311a30.007293 30.007293 0 0 0 26.256382 33.758205h780.189619a30.007293 30.007293 0 0 0 26.256381-33.758205v-326.329311a262.563814 262.563814 0 0 1-123.780084 33.758204 243.809256 243.809256 0 0 1-146.285553-48.761851z" fill="#12ADF5" p-id="3303"></path></svg>
        </div>
        <div @click="back" style="position:absolute; top:14px; left:15px;">
          <van-icon style="font-size:17px;" name="arrow-left" />
        </div>
        <!-- <div style="position:absolute; top:0; right:15px;">
          <van-icon style="font-size:20px;" @click="pageset(token)" name="ellipsis" slot="right" />
        </div> -->
        </header>
        </van-sticky>
    
      <div class="body">
        <div style="background-color:#fff;height:214px;text-align:center;width:100%;border-radius:5px;">
        <van-uploader :after-read="afterRead" :name="type === 'group_live'?'backgroup_img':'chatlogo'">
            <van-image fit="cover" v-if="url !== ''" :src="img+url" alt="" style="width:90px; height:120px;border-radius:5px;margin:0 auto;margin-top:47px;background-color:#f5f5f5;line-height:120px;font-size:14px;"/>
            <div v-if="url == ''" 
            style="width:120px; height:120px;border-radius:5px;margin:0 auto;margin-top:47px;background-color:#f5f5f5;
            line-height:120px;font-size:14px;color:#7b7b7b">上传产品图片</div>
        </van-uploader>
        </div>
        <div>
            <div  style="margin-top:12px;border:1px sold;background-color:#fff;margin:20px 0px 0px 0px; border-radius:5px;padding-top:30px;padding-bottom:15px;">
                <div style="font-size:16px; padding-left:15px;">产品名称:</div>
                <div style="text-align:center;margin-top:10px;box-sizing:border-box;padding:0 10px">
                <van-field
                    style="border:1px solid #e8e8e8;border-radius:5px;"
                    v-model="name"
                    autosize
                    placeholder="请输入商品名称"
                />
                </div>
            </div>
            <div style="border:1px sold;padding-top:15px;background-color:#fff;margin-top:15px;padding-bottom:15px;">
                <div style="font-size:16px; padding-left:15px;">产品特色:</div>
                <div style="text-align:center;margin-top:10px;box-sizing:border-box;padding:0 10px">
                <van-field
                    style="border:1px solid #e8e8e8;border-radius:5px;"
                    v-model="feature"
                    rows="3"
                    autosize
                    type="textarea"
                    placeholder="好吃不用刀切"
                />
                </div>
            </div>
              <div style="border:1px sold;background-color:#fff; padding-top:15px;padding-bottom:15px;">
                <div style="font-size:16px; padding-left:15px;">产品简介:</div>
                <div style="text-align:center;margin-top:10px;box-sizing:border-box;padding:0 10px">
                <van-field
                    style="border:1px solid #e8e8e8;border-radius:5px;"
                    v-model="desc"
                    rows="3"
                    autosize
                  
                    type="textarea"
                    placeholder="好吃不用刀切"
                />
                </div>
            </div>
        </div>
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
            <!-- <div class="btns">
                <van-button class="btn" type="info" @click="next">下一步(上架商品)</van-button>
                <van-button class="btn" type="info" @click="next1">完成</van-button>
            </div> -->
         <van-button @click="updateProductInfo" style="font-size:17px;background-color:#12adf5;margin:15px auto;color:#fff;border-radius:5px;" block>立即修改</van-button>
        </div>
        
     
        
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Vue from 'vue';
import Vant from 'vant';
    export default {
      props: {
        type: String,
        product_id:''
      },
      components: {
        Multiselect
    },
        data(){
            return{
               value:'',
               url:'',
               backgroup_img:'',
               chatid:'',
               chatlogo: '',
               feature: '',
               desc: '',
               price: '',
               name: '',
               filename:'',
               img:'',
               data:{},
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
            async fetch() {
                let params = {
                    user_id: localStorage.user_id,
                    s_id: localStorage.s_id,
                    product_id: this.$route.params.product_id
                }
                let res = await this.$api.network.queryProductInfo(params)
                if(res && res.ret) {
                    this.img = this.$img
                    this.data = res
                    this.url = res.product_image
                    this.name = res.product_name
                    this.price = res.product_price
                    this.feature= res.product_ad
                    this.desc= res.product_desc
                }
                console.log(res)
                
            },
            back() {//返回上一层
              this.$router.go(-1)
            },///
            async save(){//创建群聊
                ///保存数据
                let that = this
                if (!that.chatlogo) return that.$toast('请上传产品图片')
                try {
                  localStorage.setItem('newShop', JSON.stringify({
                    name: that.value,
                    chatlogo: that.chatlogo,
                    feature: that.feature,
                    desc: that.desc
                  }))
                } catch (error) {
                  
                }
                this.$router.push(`/shopBroadcast/setShopPrice/${this.$route.params.shopid}/${
                  this.$route.params.chatid
                }`)
            },
        async afterRead(data, name) {//上传背景图片
           let res = await this.$uploadImg(data.file)
        //    console.log(res)
            // this.url = res.url
            this[name.name] = res.filename
            this.url = res.filename
        },
        updateSelected (value) {
            console.log(value)
            console.log(this.vipDiscount)
        },
        async updateProductInfo () {//
            let shopData = this.data
            let that = this
            let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            if (that.price === '' ) return that.$toast('请输入价格')
             if (!that.vipDiscount) return that.$toast('请输入会员折扣')
            let params = {
                user_id: shopData.user_id,
                s_id:userInfo.s_id,
                product_id:shopData.product_id,
                shop_id: shopData.shop_id,
                product_desc: that.desc,
                product_price: that.price,
                product_image: that.url,
                product_vip_rate: !that.vipDiscount.value?0:that.vipDiscount.value,
                product_ad: that.feature,
                product_name: that.name

            }
            let res = await this.$api.network.updateProductInfo(params)
            console.log(res)
            if (res.ret) {
                this.$toast('修改成功')
                this.$router.go(-1)
                
            }else {
                this.$toast('修改失败')
            }
            return res.ret
            this.$router.push(`/shopBroadcast/shopStore/${shopData.shop_id}/${this.$route.params.chatid}`)
        },
        
            

        // },
        // async next1 () {
        //     //  前往产品管理页面
        //      let res = await this.save()
        //       if (res) {
        //          this.$router.push(`/shopBroadcast/putawaygoods/${this.$route.params.shopid}/${
        //           this.$route.params.chatid
        //         }`)
        //       }
             
        // }
    
        },
        created(){
            this.fetch()
            // this.userInfo = JSON.parse(localStorage.userInfo);
        },
        mounted(){
          //这时候请求后端数据
          console.log(this.type)
        },
    }
</script>
<style scoped lang="stylus">
// 高度不能随便给
.box {
  width 100%
  // height 100%
  background-color:#f5f5f5
  // overflow auto
}
.body {
  box-sizing border-box 
  padding  15px
  border-radius 10px
}
.topbar {
  height 46px
  background-color:#fff;
}
.box >>> .van-icon{
  font-size:15px;
}
// .box {
//   width 100%
//   height 100%
 
//   // position fixed
//   background-color:#f5f5f5
// }
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
