
<template>
    <!--设置 组件-->
    <div class="setting">
        <header>
            <van-nav-bar
            title="关于软件"
            left-arrow
            @click-left="onClickLeft"
            />
        </header>
        <div class="logo" style="padding-top:20px;">
          <div style="width:100%; margin:auto; text-aling:center;">
            <!-- <div class="img"> -->
            <!-- <img style="width:80px; border-radius:5px;" src="../../assets/images/hualianx.png" alt=""> -->
            <svg t="1589247473484" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2354" width="70" height="70"><path d="M512 0a512 512 0 1 0 512 512A512.802508 512.802508 0 0 0 512 0z m372.76489 541.69279a737.103448 737.103448 0 0 1-230.721003 44.940439 301.742947 301.742947 0 0 1-85.868338-10.833856c-21.266458 128-160.501567 263.222571-181.366772 280.877743a40.125392 40.125392 0 0 1-54.570532-58.583072c70.62069-66.206897 172.539185-194.206897 156.890282-267.636364-59.786834-45.742947-219.084639-8.827586-308.965518 26.884013a40.125392 40.125392 0 0 1-52.163009-22.47022A40.125392 40.125392 0 0 1 150.470219 481.504702c24.476489-9.630094 207.047022-80.250784 331.836991-43.335423 20.062696-124.789969 148.865204-253.99373 166.520376-271.247649a40.125392 40.125392 0 0 1 56.175549 57.37931C661.266458 268.037618 546.909091 401.253918 561.755486 485.115987c68.61442 48.15047 240.752351 2.407524 296.125392-18.45768a40.125392 40.125392 0 1 1 27.68652 75.034483z" fill="#12ADF5" p-id="2355"></path></svg>
            <!-- </div> -->
          </div>
          <div style="margin-top:10px;padding-left:15px; padding-right:15px;">{{name}}</div>
        </div>
        <div style="margin-top:12px;padding-left:1px;padding-right:1px;">
          <van-cell title="最近更新" :value="time" />
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                name:'',
                time:''
            }
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1)
            },
            async ChatQuery() {//关于软件信息
                // alert()
                let res = await this.$api.network.ChatConsoleQuery({})
                this.name = res.info
                this.time = res.update_time
                console.log(res)
             },
            

        },
        created(){//进入页面就执行
            this.ChatQuery();
        },
    }
</script>
<style lang="stylus" scoped>
.setting {
    position fixed
    width 100%
    height 100%
    background-color #fff
}
.van-divider{
    padding 0
    margin 0
    border-bottom-width 5px
}
.setting >>> .van-nav-bar__arrow{
    color #000
}
.logo {
  text-align:center;
  margin:0 auto;
}
.img >>> img {
    width 70px;
    height 70px;
    border-radius:5px;
}
</style>
