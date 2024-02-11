<template>
   <MyBox title="货架分类" @back="$router.go(-3)">
       <template slot="icon">
             <!-- <svg  t="1589772060484" class="icon" viewBox="0 0 1451 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2816" width="20" height="20"><path d="M911.266055 93.944954a93.944954 93.944954 0 0 0-93.944954-93.944954H93.944954a93.944954 93.944954 0 0 0-93.944954 93.944954v836.110092a93.944954 93.944954 0 0 0 93.944954 93.944954h723.376147a93.944954 93.944954 0 0 0 93.944954-93.944954V352.293578zM1427.963303 84.550459a42.275229 42.275229 0 0 0-46.972477 0l-403.963303 230.165137v394.568808l403.963303 234.862385h46.972477a56.366972 56.366972 0 0 0 23.486238-42.275229V122.12844a46.972477 46.972477 0 0 0-23.486238-37.577981z" fill="#12adf5" p-id="2817"></path></svg> -->
                <svg t="1590545087440" style="width:17px;height:17px;top:13px; position:absolute; margin-left:2px;"   viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2758" width="20" height="20"><path d="M1008.995228 367.590465L840.204205 15.004772a26.256381 26.256381 0 0 0-22.50547-15.003647H210.051051a30.007293 30.007293 0 0 0-26.256381 15.003647L18.754558 367.590465a153.787377 153.787377 0 0 0-18.754558 71.267321c0 97.523702 105.025526 172.541935 232.556521 172.541935a296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205 296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205c131.281907 0 232.556521-75.018233 232.556521-172.541935a153.787377 153.787377 0 0 0-18.754558-71.267321zM660.160447 648.908837a243.809256 243.809256 0 0 1-146.285554 48.761851 255.061991 255.061991 0 0 1-146.285553-48.761851 236.307433 236.307433 0 0 1-146.285554 48.761851 277.567461 277.567461 0 0 1-123.780084-33.758204v326.329311a30.007293 30.007293 0 0 0 26.256382 33.758205h780.189619a30.007293 30.007293 0 0 0 26.256381-33.758205v-326.329311a262.563814 262.563814 0 0 1-123.780084 33.758204 243.809256 243.809256 0 0 1-146.285553-48.761851z" fill="#12ADF5" p-id="2759"></path></svg>
           
       </template>
       <!-- <template slot="rightContent">
           <van-icon name="add-o" size="20px" />
       </template> -->
       <template slot="content">
          <div class="content">
            <div class="body">
               <MyInput :value.sync="value" title="货架分类">

               </MyInput>
                <van-button @click="addGoods" type="info" color="#12adf5" class="btn">新增货架</van-button>
               <!-- <van-button @click="getValue">获取value</van-button> -->
           </div>
          </div>
       </template>
   </MyBox>
</template>
<script>
export default {
    data () {
        return {
            value: ''
        }
    },
    methods: {
        getValue() {
            console.log(this.value)
        },
        async addGoods () {//添加分类
            let random = Math.random()
            let user = {
            user_id:localStorage.user_id,
            s_id:localStorage.s_id,
            shop_id:this.$route.params.shopid,
            random:random,
            classify_name:this.value
            }
            let res =  await this.$api.network.ClassifyNew(user)
            if(res.ret){
                this.$toast.success('添加成功')
                this.$router.go(-1)
            }else{
                this.$toast.fail('失败' + res.msg)
            }
            console.log(res)
        }
    }
}
</script>
<style lang="stylus" scoped>
.content {
    box-sizing border-box
    margin-top 15px
    padding 0 10px
}
.body {
    border-radius: 5px;
    overflow hidden
    box-sizing border-box
   
    // padding 0px 15px
    background-color #fff
}
.btn {
    display:block;
    margin: auto;
    // margin-top:10px;
    margin-bottom 15px
    border-radius 5px
}
</style>