<template>
    <MyBox :title="addressId?'修改收货地址':'新增收货地址'" @back="comfirmAddress">
            <template slot="content">
                 <div class="content">
                        <van-address-edit
                        ref="address"
                        @focus="focus"
                        :area-list="areaList"
                        delete-button-text="删除该地址"
                        :show-delete="info.id?true:false"
                        :address-info="info"
                        show-set-default
                        :area-columns-placeholder="['请选择', '请选择', '请选择']"
                        :show-postal="true"
                        @save="onSave"
                        @delete="onDelete"
                        @change-detail="onChangeDetail"
                        @change-area="onChange"
                      />
                 </div>
            </template>
    </MyBox> 
</template>
<script>
import areaList from '../../../static/js/area'
export default {
    props: {
        ///收货id
        addressId: ''
    },
    data () {
        return {
            info: {
                id: this.addressId,
                name: '',
                tel: '',
                province: '',
                city: '',
                county: '',
                addressDetail: '',
                areaCode: '',
                isDefault: false,
               
            },
             uploadCount:0,
             isValid: false,
            area: [],
            ///省市区对应的code码
            ///地区选择列表
            areaList: areaList,
            // searchResult: [
            //     {
            //         name: '黄龙万科中心',
            //         address: '杭州市西湖区',
            //     },
            // ]
        }
    },
    methods: {
        ///获取地址
        async getAddrsssMessage () {
            const that = this
            let params = {
                address_id: that.addressId,
                user_id: localStorage.user_id,
                s_id:localStorage.s_id
            }
            let res = await that.$api.network.queryAddressInfo(params)
            let {address_id,user_name,phone,province,city,district,
            district_id,mail_code,province_id,address,address_detail,
            city_id
            } = res
            that.info = Object.assign({}, {
                id: address_id,
                name: user_name,
                tel: phone,
                province: province,
                city: city,
                county: district,
                addressDetail: address_detail,
                areaCode:district_id,
                postalCode: mail_code,
               
            })
             that.area = [{
                    name: province,
                    code: province_id
                },
                {
                    name: city,
                    code:city_id
                },
                {
                    name: district,
                    code: district_id
                }
                ]
            // this.info =  Object.assign({},{
            //     address_id: '',
            //     name: '哈哈',
            //     tel: '18316294097',
            //     province: '广东省',
            //     city: '广州市',
            //     county: '白云区',
            //     addressDetail: '广东省广州市白云区b街道',
            //     areaCode: '440111',
            //     isDefault: false,
            //     postalCode: 527400,
            //      area: [{
            //         code:"440000",
            //         name:"广东省"
            //     },
            //     {
            //          code:"440100",
            //         name:"广州市"
            //     },
            //     {
            //         code: "440112",
            //         name: '黄埔区'
            //     }
                
            //     ]
            // })
        },
        // 保存地址
        async onSave (data) {
            this.isValid = true
            console.log(data)
            let that = this
            that.info = data
            let info =  that.info 
            console.log(info)
            let params = {
                address_id: info.id,
                user_id: localStorage.user_id,
                s_id:localStorage.s_id,
                user_name: info.name,
                phone: info.tel,
                province: that.area[0].name,
                province_id: that.area[0].code,
                city: that.area[1].name,
                city_id: that.area[1].code,
                district: that.area[2].name,
                district_id:that.area[2].code,
                address_detail: info.addressDetail,
                address:  info.addressDetail,
                mail_code:info.postalCode,
                random: Math.random()
            }
            console.log(params)
            let res = ''
            if (that.info.id) {
                res = await this.$api.network.updateAddressInfo({
                    ...params,
                    address_id: that.info.id
                })
                console.log(res)
                if (res && res.ret) {
                     that.$toast('修改成功')
                     this.uploadCount = 0
                    //  that.$router.go(-1)
                 }else {
                     that.$toast('修改失败')
                 }
            }else {
                res = await this.$api.network.addAddress(params)
                console.log(res)
                 if (res && res.ret) {
                     that.info.id = res.address_id
                     that.$toast('添加成功')
                     this.uploadCount = 0
                    
                    //  that.$router.go(-1)
                 }else {
                     that.$toast('添加失败')
                 }
            }
            this.$router.go(-1)
           return res
        },
        async onDelete (value) {
            console.log(value)
            let params = {
                address_id: value.id,
                user_id: localStorage.user_id, 
                s_id: localStorage.s_id
            }
            let res = await this.$api.network.deleteAddressInfo(params)
            if (res && res.ret) {
                this.$toast('删除成功')
                this.$router.go(-1)
            }else {
                this.$toast('删除失败')
            }
        },
        onChangeDetail () {
            this.searchResult = [
                 {
                    name: '黄龙万科中心1',
                    address: '杭州市西湖区',
                 }
            ]
        },
        onAreaConfirm (val) {
            console.log(val)
        },
        onChange (val){
            console.log(val)
            this.area = val
            console.log(this.info)
        },
        async comfirmAddress() {
          console.log(this.$refs.address)
            // this.$refs.address.onSave()
            if(this.uploadCount) {
               let confirm = await this.$dialog.confirm({
                title: '是否保存本次编辑'
                }).catch(()=> {})
                if(confirm === 'confirm') {
                  await this.$refs.address.onSave()
                  if(this.isValid) {
                       this.$router.go(-1)
                  }
                    // this.$router.go(-1)
                }else {
                     this.$router.go(-1)
                }
             
                console.log(confirm)
            }else {
                 this.$router.go(-1)
            }
           
            
        },
        focus () {
           
            this.uploadCount++
            console.log( this.uploadCount)
        }
        
    },
    async created () {
       this.info.id&&this.getAddrsssMessage ()
    //    console.log(JSON.stringify({"linkMan":"哈哈","mobile":"18316294097","provinceId":"440000","cityId":"440100","districtId":"440112","address":"广东省广州市白云区b街道","code":527400}))
    }
}
</script>
<style lang="stylus" scoped>
.content >>>  .van-button--round {
    border-radius 5px
}
.content >>> .van-switch--on {
    background-color  #12ADF5
}
.content >>> .van-address-edit__buttons .van-button:nth-child(1) {
    background-color #12ADF5
    border-color #12ADF5
}
.content >>> .van-address-edit__buttons .van-button:nth-child(2) {
    background-color #F00945
    color #fff
}
// .content >>> .van-switch {
//     height .9rem
//     overflow auto

// }
// .content >>>  .van-switch__node {
//     top -50%
//     width 2rem
//     border 1px solid 
// }
</style>