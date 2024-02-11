<template>
   <MyBox title="管理货架" @back="$router.go(-1)">
       <template slot="rightContent">
           <van-icon name="add-o" size="20px" @click="addClassify" />
       </template>
       <template slot="content">
            <van-cell-group>
           
                    <van-cell :title="item.classify_name" v-for="(item,index) in list" :key="index">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #right-icon>
                        <svg @click="ClassifyDelete(item, index)" t="1590658968565" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2861" width="20" height="20"><path d="M515.06377 0.009143a511.992381 511.992381 0 1 0 508.944807 511.992381A511.992381 511.992381 0 0 0 515.06377 0.009143z m323.042812 533.325397H188.973384a24.38059 24.38059 0 0 1-21.333016-21.333016 21.333016 21.333016 0 0 1 21.333016-21.333016h649.133198a21.333016 21.333016 0 0 1 21.333015 21.333016 24.38059 24.38059 0 0 1-21.333015 21.333016z" fill="#F00945" p-id="2862"></path></svg>
                        <!-- <van-icon name="add" size="20px" color="#60f009" /> -->
                    </template>
                    </van-cell>

            </van-cell-group>
       </template>
   </MyBox>
</template>
<script>
export default {
    data () {
        return {
            list:[]
        }
    },
    methods: {
        addClassify () {
            this.$router.push('/shopBroadcast/storeClassify/'+ this.$route.params.shopid + "/" + this.$route.params.chatid)
        },
        async ClassificationList() {//查询分类列表
            let random = Math.random()
            let user = {
            user_id:localStorage.user_id,
            s_id:localStorage.s_id,
            shop_id:this.$route.params.shopid,
            random:random,
            }
            let res =  await this.$api.network.ClassifyList(user)
            this.list = res.list
            console.log(res)
        },
        
        async ClassifyDelete(item,index) {//删除分类
        // console.log(item,index)
            let random = Math.random()
            let user = {
            user_id:localStorage.user_id,
            s_id:localStorage.s_id,
            shop_id:this.$route.params.shopid,
            classify_id:item.classify_id,
            random:random,
            }
            let res =  await this.$api.network.ClassifyDelete(user)
            if(res.ret){
                this.$toast.success('删除成功')
                this.list.splice(index,1)

            }else{
                this.$toast.fail('失败' + res.msg)
            }
            console.log(res)
        },
    },
    mounted() {//进来就执行
        this.ClassificationList();
    }
}
</script>
<style lang="stylus" scoped>

</style>