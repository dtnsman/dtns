<template>
    <div class="input">
        <div style="font-size:16px; ">{{title}}</div>
            <div style="text-align:center;margin-top:15px;font-size:14px;">
            <slot>
                <van-field
                 style="border:1px solid #e8e8e8;border-radius:5px;"
                 v-model="val"  :type="type" :placeholder="placeholder" :row="row"/>
            </slot>
           </div>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            default: '',
            type: String
        },
        title: {
            default: '',
            type: String
        },
        placeholder: {
            default: '',
            type: String
        },
        type: {
            default: 'text',
            type: String
        },
        row: {
            default: "1"
        }
    },
    data () {
        return {
            val: this.value
        }
    },
    watch: {
        ///双向数据绑定update,实时更新value值，不用函数触发修改值
        val () {
            this.$emit('update:value',this.val)
        }
    }
    
}
</script>
<style lang="stylus" scoped>
.input {
    background-color:#fff; 
    border-radius:5px;
    box-sizing border-box
    padding 15px 10px
}
input {
    width:100%; height:35px;
    border:1px solid  #e8e8e8;
     border-radius:5px;
     font-size:14px;
     box-sizing border-box
     padding 0 10px
}
</style>