<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/index" >首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/shopping">商城</van-tabbar-item>
      <van-tabbar-item icon="friends-o"  to="/business" >交易</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/user" >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style >

</style>