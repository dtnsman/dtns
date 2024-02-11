<template>
    <div class="v-common-attr">
        <el-collapse v-model="activeName" accordion @change="onChange">
            <el-collapse-item title="通用样式" name="style">
                <el-form>
                    <el-form-item v-for="({ key, label }, index) in styleKeys" :key="index" :label="label">
                        <el-color-picker v-if="isIncludesColor(key)" v-model="curComponent.style[key]" show-alpha></el-color-picker>
                        <el-select v-else-if="selectKey.includes(key)" v-model="curComponent.style[key]">
                            <el-option
                                v-for="item in optionMap[key]"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-input v-else v-model.number="curComponent.style[key]" type="number" />
                    </el-form-item>
                    <!-- <el-form-item>
                        <input value="请您输入$pop.lang的源码">
                    </el-form-item> -->
                    <!-- <el-form-item>
                        
                    </el-form-item> -->
                </el-form>
            </el-collapse-item>
            <Request v-if="curComponent.request"></Request>
            <Linkage v-if="curComponent.linkage"></Linkage>
        
            <!-- <el-collapse-item name='editor' title="编辑$pop.lang源码（按Esc键全屏）">
                <div class='editor' >
                    <CodeEditor v-if="editor" 
                                language='poplang' 
                                ref='coder'
                                :value="curComponent.code" 
                                :element="curComponent"
                                @input="changeTextarea" 
                                style="height: 100%;width:100%"></CodeEditor>
                    <span style='font-size:12px; color:#303133'>注意：使用F7-F10快捷键影响代码字体大小；F7：15px；F8：13px（默认大小）；F9：缩小1px；F10：放大1px</span>
                </div>
            </el-collapse-item> -->
        </el-collapse>
    </div>
</template>

<script>
import { codeInfo, styleData, textAlignOptions, borderStyleOptions, verticalAlignOptions, selectKey, optionMap } from '@/utils/attr'
// import Request from './Request'
// import Linkage from './Linkage'
// import CodeEditor from '@/components/Editor/CodeEditor.vue'

export default {
    components: {
        Linkage: () => import('./Linkage'),
        Request: () => import('./Request'),
        // CodeEditor: () => import('@/components/Editor/CodeEditor.vue'),
    },
    data() {
        return {
            code: '',
            codeInfo,
            editor: true,
            optionMap,
            styleData,
            textAlignOptions,
            borderStyleOptions,
            verticalAlignOptions,
            selectKey,
            activeName: 'style',
        }
    },
    computed: {
        styleKeys() {
            if (this.curComponent) {
                const curComponentStyleKeys = Object.keys(this.curComponent.style)
                return this.styleData.filter(item => curComponentStyleKeys.includes(item.key))
            }
            
            return []
        },
        curComponent() {
            // this.$refs.editor.
            return this.$store.state.curComponent
        },
    },
    created() {
        this.activeName = this.curComponent.collapseName
    },
    beforeUpdate() {
        // this.editor = !this.editor
        // console.log('beforeUpdate:' + this.code)
        // this.code = this.curComponent.propValue.code
        // console.log('beforeUpdate:' + this.code)
        // this.code = Math.random()
        // this.editor = !this.editor
        // let This = this
        // let i = setInterval(() => {
        //     This.editor = !This.editor
        //     clearInterval(i)
        // }, 300)
    },
    mounted() {
        /* eslint-disable */ 
    },
    methods: {
        showEditor() {
            // this.$nextTick(() => {
            //     this.$refs.coder.focus()
            // })
            // this.$refs.coder.focus()
            //alert('请输入源码')
            //this.editor = !this.editor
            // let This = this
            // setTimeout(()=>{
            //     This.curComponent.code = ''+This.curComponent.code
            // },300)

            
            //console.log('this.editor:' + this.editor)
        },
        onChange() {
            console.log('this.activeName:' + this.activeName )
            this.curComponent.collapseName = this.activeName
            this.editor =  this.activeName == 'editor'
        },
        changeTextarea(val) {
            //事件没有生效，在CodeEditor中会有对应的on('change')事件，也是改变了this.curComponent.propValue.code
            console.log('changeTextarea-val:'+val)
            //只在在Json中的修改源码内容
            // this.curComponent.propValue.code = val
        },
        isIncludesColor(str) {
            return str.toLowerCase().includes('color')
        },
    },
}
</script>

<style lang="scss">
.v-common-attr {
    .el-input-group__prepend {
        padding: 0 10px;
    }
}
</style>
<style>
.editor0
{
    height:55vh;padding:5px;width:100%
}
.editor
{
    height:100%;padding:5px;width:100%
}
</style>
