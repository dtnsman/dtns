<template>
  <!--个人信息组件-->
  <div class="box">
    <van-nav-bar title="修改邀请人VIP等级" left-arrow @click-left="back" right-text="确认" @click-right="onClickRight" />
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="普通" clickable @click="radio = '0'">
          <template #right-icon>      
            <van-radio name="0" />
          </template>
        </van-cell>
        <van-cell title="VIP1" clickable @click="radio = '1'">
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell title="VIP2" clickable @click="radio = '2'">
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
        <van-cell title="VIP3" clickable @click="radio = '3'">
          <template #right-icon>
            <van-radio name="3" />
          </template>
        </van-cell>
        <van-cell title="VIP4" clickable @click="radio = '4'">
          <template #right-icon>
            <van-radio name="4" />
          </template>
        </van-cell>
        <van-cell title="VIP5" clickable @click="radio = '5'">
          <template #right-icon>
            <van-radio name="5" />
          </template>
        </van-cell>
        <van-cell title="VIP6" clickable @click="radio = '6'">
          <template #right-icon>
            <van-radio name="6" />
          </template>
        </van-cell>
        <van-cell title="VIP7" clickable @click="radio = '7'">
          <template #right-icon>
            <van-radio name="7" />
          </template>
        </van-cell>
        <van-cell title="VIP8" clickable @click="radio = '8'">
          <template #right-icon>
            <van-radio name="8" />
          </template>
        </van-cell>
        <van-cell title="VIP9" clickable @click="radio = '9'">
          <template #right-icon>
            <van-radio name="9" />
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell title="管理员" clickable @click="radio = '10'">
          <template #right-icon>
            <van-radio name="10" />
          </template>
        </van-cell>
    </van-radio-group>
  </div>
</template>
<script>
import vant from "vant"
export default {
   data() {
            return {
              radio:'0',
            }
        },
  mounted() {
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
      async onClickRight() {//修改会员等级
        let user = {
          user_id:localStorage.user_id,
          s_id:localStorage.s_id,
          chatid:this.$route.params.chatid,
          vip_level:this.radio,
          vip_type:'invite_vip_level'
        }
        let res =  await this.$api.network.ChatModVip(user)
        if(res.ret){
          this.$toast.success('修改成功')
          this.$router.go(-1)
        }else{
          this.$toast.fail('修改失败' + res.msg)
        }
      }
  },
  created(){//进入页面就执行
        let data = localStorage.user_logo;
        this.url = data
        // console.log(data)
      },
};
</script>

<style lang="stylus" scoped>
.box >>> .van-nav-bar__text {
  color:#111;
  font-size:16px;
}

.logo[data-v-16247baa] .van-button__text{
  background-color rgb(21, 160, 231)
}
* {
  background-color: #fff;
  touch-action: pan-y;
}
.van-divider{
  border-top-width 5px
}
.topbar >>> .van-nav-bar {
  height: 44px;
  margin-bottom: 40px;
  background-color #fff
}
.logo[data-v-287f5d15]{
  margin-bottom 0
}

.topbar[data-v-287f5d15] .van-nav-bar__title {
  background-color #fff
}
.box >>> .van-nav-bar__arrow{
  color:#000
}
.logo {
  margin-bottom: 50px;
}

.logo .img {
  width: 81px;
  height: 81px;
  margin: 30px auto;
}

.logo img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius 50%
}

.logo >>> .van-uploader {
  width: 100%;
  display: flex;
  justify-content: center;
}

.logo >>> .van-button--primary {
  background-color: #07c160;
  color: #999;
  margin: 0 auto;
}

.logo >>> .van-button {
  margin: 0 auto;
}

.logo >>> .van-button__icon {
  background-color: #07c160;
  color: #fff;
}

.logo >>> .van-button__text {
  background-color: #07c160;
  color: #fff;
}

.hr >>> .van-divider {
  margin-bottom: 40px;
}

.change >>> .van-cell {
  border: 1px solid #eee;
  width: 300px;
  margin: 0 auto;
}

.change button {
  display: block;
  margin: 40px auto;
  background-color: #07c160;
  color: #fff;
  border: none;
  width: 100px;
  height: 40px;
}
.img{
  position:relative;
}
.img >>> p{
  position:absolute;
  top:30px;
  left:43px;
  font-size:22px;
  background-color :#f44
}
</style>
