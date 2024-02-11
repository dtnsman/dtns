<script>
/* eslint-disable */ 
</script>
<template>
    <div class="circle-shape" @click="clickNow">
        <v-text :prop-value="element.propValue" :element="element" />
    </div>
</template>

<script>
import OnEvent from '../common/OnEvent'

export default {
    extends: OnEvent,
    props: {
        propValue: {
            type: String,
            required: true,
            default: '',
        },
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
.circle-shape {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: auto;
}
</style>
