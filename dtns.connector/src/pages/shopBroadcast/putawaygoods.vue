<template>
    <div>
          <MyBox title="产品上架" @back="$router.go(-3)">
       <template slot="rightContent">
        <div @click="$router.push(`/shopBroadcast/managegoods/${$route.params.shopid}/${$route.params.chatid}`)">货架</div>
           <!-- <van-icon name="add-o" size="20px" @click="addClassify" /> -->
       </template>
       <template slot="content">
           <div>
                  <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            >
                <van-cell-group>
                  <van-cell :title="item.product_name" v-for="item of list" :key="item.token_y">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #right-icon>
                        <svg @click="openConfirm(item.product_id)" t="1590660009542" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3659" width="20" height="20"><path d="M515.06377 0.009143a511.992381 511.992381 0 1 0 508.944807 511.992381A511.992381 511.992381 0 0 0 515.06377 0.009143z m323.042812 533.325397h-301.709796v301.709796a24.38059 24.38059 0 0 1-21.333016 21.333016 21.333016 21.333016 0 0 1-21.333016-21.333016v-301.709796h-304.75737a24.38059 24.38059 0 0 1-21.333016-21.333016 21.333016 21.333016 0 0 1 21.333016-21.333016h304.75737v-304.75737a21.333016 21.333016 0 0 1 21.333016-21.333016 24.38059 24.38059 0 0 1 21.333016 21.333016v304.75737h301.709796a21.333016 21.333016 0 0 1 21.333015 21.333016 24.38059 24.38059 0 0 1-21.333015 21.333016z" fill="#60F009" p-id="3660"></path></svg>
                        <!-- <van-icon name="add" size="20px" color="#60f009" /> -->
                    </template>
                </van-cell>
               </van-cell-group>
            </van-list>
           </div>
            </template>
          </MyBox>
          <van-overlay :show="show">
            <div class="wrapper">
                <div class="block">
                    <div style="padding-bottom:20px">选择货架</div>
                    <div>
                        <multiselect v-model="Classify" 
                            :options="ClassifyList" label="label" track-by="value"
                            placeholder="请选择货架"
                            :searchable="false"
                        ></multiselect>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin:15px 0">
                        <van-button @click="show = false" >取消</van-button>
                        <van-button @click="addProduct" color="#12ADF5">确定</van-button>
                    </div>
                </div>
            </div>
          </van-overlay>
          <!-- <van-dialog v-model="show" title="选择货架" show-cancel-button @confirm="addProduct">
               
                  <multiselect v-model="Classify" 
                     :options="ClassifyList" label="label" track-by="value"
                     placeholder="请选择货架"
                     :searchable="false"
                 ></multiselect>
         </van-dialog> -->
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
            loading: false,
            finished: false,
            list: [],
            begin: 1,
            len: 20,
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            show: false,
            ClassifyList: [],
            Classify: {
                // label: 无
            },
            nowProductId: ''
        }
    },
    methods: {
        addClassify () {
            this.$router.push('/shopBroadcast/storeClassify/'+this.$route.params.shopid + '/' + this.$route.params.chatid)
        },
        async onLoad () {
            // that.finished = false
            let that = this
            let params = {
                user_id:that.userInfo.user_id,
                s_id: that.userInfo.s_id,
                begin: that.begin,
                len: that.len,
                shop_id: that.$route.params.shopid,
                random: Math.random(),
                sign: ''
            }
            let res = await this.$api.network.productList(params)
            console.log(res)
            if (res && res.list) {
               
                if (!res.list.length)  return that.finished = true 
                that.list = that.list.concat(res.list)
                that.begin +=that.len
            }
            if (res&&res.list&&!res.list.length) {
                that.finished = true
            }
            // that.loading = true
            // that.finished = true
        },
        async getClassifyList () {
            let that = this
            let params = {
                user_id:that.userInfo.user_id,
                s_id: that.userInfo.s_id,
                shop_id: that.$route.params.shopid,
            }
            let res = await this.$api.network.ClassifyList(params)
            console.log(res)
            that.ClassifyList = res.list.map(item=> {
                return {
                    value: item.classify_id,
                    label: item.classify_name
                }
            })
            console.log(that.ClassifyList)
            if(res.list.length>=1) {
               that.Classify = that.ClassifyList[0]
            }
        },
        async openConfirm (id) {
              let that = this
                if(!that.ClassifyList.length) {
                return  that.$dialog.alert({
                        title: '提示',
                        message: '暂无货架，请先新建货架',
                        }).then(() => {
                        that.addClassify()
                    });
                }
                that.nowProductId = id
                that.show = true
        },
        async addProduct () {
            let that = this
            let params = {
                user_id:that.userInfo.user_id,
                s_id: that.userInfo.s_id,
                shop_id: that.$route.params.shopid,
                product_id:that.nowProductId,
                random: Math.random(),
                classify_id: that.Classify&&that.Classify.value?that.Classify.value:'',
                sign: '',

            }
            // if (that.Classify.value)
            console.log(params)
            let res =  await this.$api.network.addProduct(params)
            console.log(res)
            if(!res.ret) {
                return that.$toast.fail('添加失败,'+res.msg)
            }
            that.$toast.success('添加成功')
            that.show = false
        }
    },
    async created () {
        console.log( this.$route.params.shopid)
        this.getClassifyList()
        this.onLoad()
         let params =  {
           user_id: "user_272P3Dwj4THtUARK",
           s_id: "baa04970232c9d45d910b81c478ad78f",
           shop_id: "obj_chat02S25rek7hFx",
           calculate: true,
           address_info: JSON.stringify({"linkMan":"哈哈","mobile":"18316294097","provinceId":"440000","cityId":"440100","districtId":"440112","address":"广东省广州市白云区b街道","code":527400}),
           goods: JSON.stringify([
               {
               goodsId: "obj_pd271PEvkz7KBNL1",
               pic: "obj_imgopen272ueJAMi",
               name: "100",
               propertyChildIds: "",
               label: '',
               price: 100,
               vip_price: 70,
               left: "",
               active: true,
               number: 2,
               logisticsType: ""
           }
           ]),
           note: "熟的",
           random: 0.5482112
       }
       let res = await this.$api.network.createOrder(params)
       console.log(res)
    }
}
</script>
<style lang="stylus" scoped>
 .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align  center
   
  }

  .block {
    width 50%
    // height: 120px;
    background-color: #fff;
     border-radius 5px
     padding 15px 
  }
</style>