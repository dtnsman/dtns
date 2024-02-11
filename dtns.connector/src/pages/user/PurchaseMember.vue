<template>
    <div style="position:fixed; width:100%; height:100%; background-color:#fff;">
        <van-nav-bar
            title="购买会员"
            left-arrow
            @click-left="onClickLeft"
            :fixed="true"
            />
        <div style="text-align:center; margin:0 auto;">
          <div style="margin-top:76px;">
              <svg t="1586764345866" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2576" width="70" height="70"><path d="M512.409161 0a511.992571 511.992571 0 1 0 511.591008 511.992571A512.394134 512.394134 0 0 0 512.409161 0z" fill="#12ADF5" p-id="2577"></path><path d="M471.851318 803.125602a27.30627 27.30627 0 0 1-8.031256 0 40.15628 40.15628 0 0 1-30.920335-28.912522L332.910589 392.326856H238.944894a40.15628 40.15628 0 0 1 0-80.31256h124.886031a40.15628 40.15628 0 0 1 40.15628 29.715648l86.737565 332.493999 264.228323-346.548698a40.15628 40.15628 0 0 1 63.848485 48.589099l-315.226798 412.003434a40.15628 40.15628 0 0 1-31.723462 14.857824z" fill="#FFFFFF" p-id="2578"></path></svg>
          </div>
          <div style="font-size:18px; margin-top:18px;">VIP0</div>
          <div style="font-size:12px; margin-top:23px;">到账时间： 2020-10-11</div>
          <div style="font-size:12px; margin-top:10px;">权益：进入所有的普通群聊</div>
          <van-button type="primary" style="width:90%; margin-top:30px; font-weight:bold; font-size:15px; border-radius:5px;">立即支付10元</van-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
            list:[1,2]
        }
    },
    methods:{
        onClickLeft(){//点击返回上一步
            this.$router.go(-1)
        }
    },
    created(){//进入页面就加载

    },
}
</script>
<style lang="stylus" scoped>
*{
    box-sizing:border-box
}
.van-nav-bar__arrow{
    color:#000
    font-size:1.05rem
}
</style>