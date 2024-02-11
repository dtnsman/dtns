<script>
/* eslint-disable */ 
</script>
<template>
    <div class="group" @click="clickNow">
        <div>
            <component
                :is="item.component"
                v-for="item in propValue"
                :id="'component' + item.id"
                :key="item.id"
                class="component"
                :style="item.groupStyle"
                :prop-value="item.propValue"
                :element="item"
                :request="item.request"
            />
        </div>
    </div>
</template>

<script>
import OnEvent from '../common/OnEvent'
/* eslint-disable */ 

export default {
    extends: OnEvent,
    props: {
        propValue: {
            type: Object, 
            default: () => [],
        },
        /** 2022-11-7  原来是：Array，在拖动控件的过程中会出现一大堆错误提示，故此修改
            vue.runtime.esm.js?c320:4560 
       [Vue warn]: Invalid prop: type check failed for prop "propValue". Expected Array, got Object 

found in

---> <Group> at src/custom-component/common/OnEvent.vue
       <Shape> at src/components/Editor/Shape.vue
         <Editor> at src/components/Editor/index.vue
           <Home> at src/views/Home.vue
             <App> at src/App.vue
               <Root>
                */
        element: {
            type: Object,
            default: () => {},
        },
    },

    methods: {
        async clickNow(e) {
            let ret = await this.poplang.op(null, 'onclick')
            console.log('VText-onclick-ret:', ret)
        },
    },
    async created() {
        this.poplang = new PopRuntime(this)
        this.poplang.binderAddOpcode('init', async () => {
            this.xdata = this.element.xdata
            console.log('this.xdata:', this.xdata)
            await this.poplang.runScript(null, this.element.code)
            console.log('code:' + this.element.code, 'mtext:', this.mtext)
        })
        this.element.poplang = this.poplang
        
        if (true) return 
    },
}
</script>

<style lang="scss" scoped>
.group {
    & > div {
        position: relative;
        width: 100%;
        height: 100%;

        .component {
            position: absolute;
        }
    }
}
</style>
