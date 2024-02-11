<template>
<!--可复用的相册组件 这里只完成静态页面 不涉及数据-->
    <div class="box">
        <van-nav-bar
            title="账号与安全"
            left-arrow
            @click-left="onClickLeft"
            />
        <div>
            <van-cell title="手机号" is-link :value="phone" />
            <van-cell to="/user/complete/BindMailbox" title="邮箱" is-link :value="emails" />
            <van-divider />
            <van-cell title="修改密码" is-link  to="/checking" />
        </div>
        <!-- <van-popup v-model="show" style="width:70%; height:160px; border-radius:5px;">
            <div style="text-align:center; font-size:14px; font-weight:bold; margin-top:15px;">
                绑定邮箱地址
            </div>
            <div style="text-align:center; margin-top:5px;">
                <input v-model="text" type="text" style="width:85%; border:none; border-bottom:1px solid #ddd; font-size:13px;">
            </div>
            <div style="width:100%;margin:0 auto;">
                <div style="width:86%; margin:0 auto; font-size:12px; margin-top:6px;">
                    请输入您的邮箱地址
                </div>
            </div>
            <div style="width:100%; height:45px; border-top:1px solid #eee; position:fixed; bottom:0; float:left; font-size:15px;">
                <div @click="cancel" style="width:50%; float:left; border-right:1px solid #eee; height:45px; text-align:center; line-height:42px;color:#111;font-weight:bold;">
                    取消
                </div>
                <div @click="Determine" style="width:50%; float:left; height:45px;text-align:center; line-height:42px; color:#12adf5; font-weight:bold;">
                    确认
                </div>
            </div>
        </van-popup> -->
    </div>
</template>
<script>
    export default {
     data() {
            return {
               show:false,
               emails:'',
               phone:''
            }
        },
    methods:{
        onClickLeft(){//返回上一层
            this.$router.push('/user');
        },
    },
    created(){//进入页面就执行
        let data = JSON.parse(localStorage.getItem('userInfo'));//查找个人用户信息
        console.log(data)
        this.phone = data.phone
        if(this.emails !== '')
        {
            this.emails = data.emails
        }else
        {
            this.emails = '未绑定'
        }
      },
}
</script>
<style lang="stylus" scoped>
*{
    box-sizing border-box
}
.box {
    width 100%;
    height 100%;
    position fixed;
    background-color:#f5f5f5;
}
.box >>> .van-nav-bar .van-icon{
    color:#000
    font-size 1.05rem
}
.van-divider{
    padding 0;
    margin 0;
    border-bottom-width 5px;
}
</style>