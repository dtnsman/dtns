<!--
 * @Descripttion:
 * @version:
 * @Author: hengzi
 * @Date: 2020-03-02 10:42:23
 * @LastEditors: hengzi
 * @LastEditTime: 2020-03-10 17:49:44
 -->
<template>
    <!--设置 组件-->
    <div class="setting">
        <header style="position fixed">
            <van-nav-bar
            title="查看日志"
            left-arrow
            @click-left="onClickLeft"
            /></header>
        <div style="background-color:#fff;">
          <div>
              <div v-for="(item,index) in list" :key="index"   >
                <div v-if="item!==null" style="padding:10px; 15px 10px 15px; border-bottom:1px solid #f5f5f5; font-size:14px;white-space:normal; word-break:break-all;overflow:hidden;">
                    {{item}}
                </div>
            </div>
          </div>
        </div>
        <div v-show="show" style="font-size:14px; padding:15px;">暂无日志信息</div>
        <!-- <van-divider /> -->
      

    </div>
</template>
<script>
import header from '../../components/header/header.vue';
    export default {
  components: { header },
        data(){
            return{
                list:[],
                show:false,
            }
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1)
            },
            Signout(){//退出登录删除缓存
                let storage = window.localStorage;
                storage.clear()
                this.$router.push('/login')
             },
        },
        created(){
          if(typeof g_logs_opened == 'undefined')
          {
            window.g_logs_opened =  true;
            return 
          }
          let tmpList = []
          for(let i=0;i<g_logs.length;i++)
          {
            var cache = new Map()
            var str = JSON.stringify(g_logs[i], function(key, value) {
                if (typeof value === 'object' && value !== null) {
                    if (cache.has(value)) //cache.indexOf(value) !== -1) 
                    {
                        // 移除
                        return;
                    }
                    // 收集所有的值
                    //cache.push(value);
                    cache.set(value,'')
                }
                return value;
            });
            tmpList.push(str)
            cache = null; 
          }
          this.list = tmpList// g_logs//JSON.parse(localStorage.getItem('error'))
        //   console.log(this.list)
          if(this.list.length == 0){
              this.show = true
          }else{
              this.show = false
          }
        }
    }
</script>
<style lang="stylus" scoped>

.setting {
    width 100%
    height 100%
    background-color #ffffff
}
.setting >>> .van-nav-bar__arrow{
    color #000
}
</style>
