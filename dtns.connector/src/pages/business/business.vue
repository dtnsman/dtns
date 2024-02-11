<template>
    <div class="box">
        <div class="header">
            <p class="title">交易管理</p>
        </div>
        <!-- 交易类型 -->
    <div style="padding-top:45px;">    
        <van-tabs v-model="activeName" @change="handlecClick">
            <van-tab title="全部商品" name="otcwhole"></van-tab>
            <van-tab title="买入管理" name="otcsell"></van-tab>
            <van-tab title="卖出管理" name="otcbuy"></van-tab>
        <router-view/>
        </van-tabs>
    </div>
        <floor></floor>
    </div>
</template>
<script>
import Vant from "vant";
import floor from "../../components/floor/floor.vue";
export default {
    components: {
        floor,
    },
    data() {
     return {
         activeName: 'otcwhole',
    //   value1: 'otcwhole',
      option1: [
        { text: '全部商品', value: 'otcwhole'},
        { text: '出售', value: 'otcbuy' },
        { text: '买', value: 'otcsell' },
        // { text: 'OTC 交易', value: 3 }
      ],
    }
  },
  methods: {   
      handlecClick () {
          this.$router.push({
              name: this.activeName
          })
      }
  }
}
</script>

<style scoped>
    * {
        padding:0;
        margin:0 auto;
    }

    .box {
        width: 100%;
        background-color:#eee;
    }

    .header {
        position:fixed;
        z-index: 1000;
        float: left;
        width: 100%;
        height: 45px;
        background-color: #3178d4;
        text-align: center;
        float: left;
    }

    .title {
        font-weight: bold;
        letter-spacing: 2px;
        color:#fff;
        font-size: 1rem;
        margin-top: 10px;
        
    }

    input {
        width:70%;
        height: 30px;
        float: left;
        margin-left:5%;
        margin-top:18px;
        font-size: 14px;
        border-radius: 50px;
        border:none;
        padding-left: 20px;
        line-height: 30px;
        background-color:#ddd;
    }

    .search {
        line-height: 65px;
        color:#eee;
        font-size: 15px;
    }
 .box >>>   .van-tabs__wrap {
       margin-bottom: 10px;
    }
    
</style>