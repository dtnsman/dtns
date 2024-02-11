<template>
    <div @click="onClick" @mouseenter="onMouseEnter" @mouseup='doThis' ref="myDiv">
        <component
            :is="config.component"
            v-if="config.component.startsWith('SVG')"
            ref="component"
            class="component"
            :style="getSVGStyle(config.style)"
            :prop-value="config.propValue"
            :element="config"
            :request="config.request"
            :linkage="config.linkage"
        />

        <component
            :is="config.component"
            v-else
            ref="component"
            class="component"
            :style="getStyle(config.style)"
            :prop-value="config.propValue"
            :element="config"
            :request="config.request"
            :linkage="config.linkage"
        />
        <span>{{ errMsg }}</span>
    </div>
</template>

<script>
import { getStyle, getSVGStyle } from '@/utils/style'
import runAnimation from '@/utils/runAnimation'
import { mixins } from '@/utils/events'
import eventBus from '@/utils/eventBus'
// import PopRuntime from '../../../static/js/static/pop_runtime2'

export default {
    mixins: [mixins],
    props: {
        config: {
            type: Object,
            required: true,
            default: () => {},
        },
        // event: {
        //     type: String,
        //     required: true,
        //     default: 'click',
        // },
    },
    data() {
        return {
            errMsg:''
        }
    },
    beforeCreate() {},
    created() {},
    beforeMount() {
        // 开始绑定pop.lang
        // console.log('this.config:' + JSON.stringify(this.config))
        // this.poplang = new PopRuntime(this.config)
        // this.config.poplang = this.poplang
        // const protocolCache = localStorage.getItem('protocol_config')
        // // console.log('protocolCache:' + JSON.stringify(protocolCache))

        // if (protocolCache) {
        //     this.poplang.setProtocol(JSON.parse(protocolCache))
        //     this.isok = 'ok'
        // } else {
        //     this.isok = false
        // }
    },
    async mounted() {
        console.log('ComponentWrapper-mounted...')
        try {
            if(this.$refs  && this.$refs.component && this.$refs.component.$el && this.config )
            runAnimation(this.$refs.component.$el, this.config.animations)
        } catch (ex) {
            console.log('runAnimation-ex:' + ex)
        }

        if(!this.config) return 
        const events = this.config.events
        Object.keys(events).forEach(event => {
            if (event == 'code') { 
                // // eslint-disable-next-line
                // this[event](events[event])
                // // eslint-disable-next-line
                // eval(events[event])
                // // eval(this[event])
            }
        })
        if (true) return 

        let script = `
        //使用宏函数来做为事件处理函数
        pop.func.define kdfunc
            $.console.log $event_params
            = kdevent $event_params
            $.console.log kdevent
            set i 0
            // $$.length kdevent i
            @ kdevent i kde
            $.console.log kde
            // $.console.log $ret
            object.get kde.code xcode
            this.assign {"abc":{"c":123}}
            object.get abc.c xc
            $.console.log abc
            $.console.log xc
            $.console.log xcode
            . kde
            $.console.log code
            ..
            object.get kde.key xkey
            $.console.log xkey
            // = event $ret
            // $.console.log event
            // $.JSON.stringify kdevent
            // $.console.log $ret
            // $.alert $ret
            // set tips 键盘事件
            // $.alert tips
        pop.func.end
        set kd keydown
        $.document.addEventListener kd @kdfunc
        `
        document.addEventListener('keydown', (e) => { 
            // eslint-disable-next-line 
            console.log('e-keydown:' + e.code + ' other:' + e['code'])
        })
        await this.poplang.runScript(null, script)
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    errorCaptured(err,vm,info)
    {
        this.errMsg = 'ComponentWrapper-errorCaptured:'+err.toString()+'\ninfo:'+info
        console.log('ComponentWrapper-errorCaptured:'+err.toString()+'\ninfo:'+info)
        alert('ComponentWrapper-errorCaptured:'+err.toString()+'\ninfo:'+info)
        return false
    },
    methods: {
        getStyle,
        getSVGStyle,
        doThis(e) {
            console.log('Editor/ComponeentWrapper.vue-doThis:' + JSON.stringify(e))
        },
        async onClick() {
            const events = this.config.events
            Object.keys(events).forEach(event => {
                this[event](events[event])
            })

            console.log('this.config.id:' + this.config.id)
            eventBus.$emit('v-click', this.config.id)

            // let el = this.$refs.myDiv
            
            // if(el.isFull) return 
            // //全屏显示图片的代码
            // el.isFull = true
            // el.requestFullscreen()
            // document.onclick = function(){
            //     el.isFull = false
            //     document.exitFullscreen()
            //     document.onclick = null
            // }

            if (true) return 
 
            let a = await this.poplang.op(null, 'this.get')
            console.log('a:' + JSON.stringify(a))

            await this.poplang.op(null, '.', 'propValue')
            a = await this.poplang.op(null, 'this.get')
            console.log('a:' + JSON.stringify(a))

            await this.poplang.op(null, '..')
            // 通过config--亦即element修改了对应的属性值，从而影响到控件
            // a = await this.poplang.op(null, 'set', 'propValue', '' + this.config.id)
            a = await this.poplang.op(null, '$.JSON.stringify', 'propValue')
            console.log('a:' + JSON.stringify(a))
            await this.poplang.op(null, '$.alert', '$ret')

            let script = `
            typeof propValue typeval
            $.alert typeval
            //判断是否是字符串
            set str string
            == typeval str is_str
            $.alert is_str
            // 如果是字符串就alert
            pop.ifelse is_str $.alert $.JSON.stringify propValue
            //如果 $.JSON.stringify的返回值为真，则直接alert，否则不做任何处理##是注释
            pop.ifelse $ret $.alert ## $ret
            `
            await this.poplang.runScript(null, script)
        },
        // 这里植入code的代码。
        onCode() {
            
        },

        onMouseEnter() {
            eventBus.$emit('v-hover', this.config.id)
        },
    },
}
</script>

<style lang="scss" scoped>
.component {
    position: absolute;
}
</style>
