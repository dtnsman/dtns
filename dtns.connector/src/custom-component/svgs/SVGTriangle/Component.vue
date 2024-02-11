<script>
/* eslint-disable */ 
</script>
<template>
    <div class="svg-triangle-container" @click="clickNow">
        <svg
            version="1.1"
            baseProfile="full"
            xmlns="http://www.w3.org/2000/svg"
        >
            <polygon
                ref="triangle"
                :points="points"
                :stroke="element.style.borderColor"
                :fill="element.style.backgroundColor"
                stroke-width="1"
            />
        </svg>
        <v-text :prop-value="element.propValue" :element="element" />
    </div>
</template>

<script>
import OnEvent from '../../common/OnEvent'

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
    data() {
        return {
            points: '',
        }
    },
    watch: {
        'element.style.width': function () {
            this.draw()
        },
        'element.style.height': function () {
            this.draw()
        },
    },
    mounted() {
        this.draw()
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
    methods: {
        async clickNow(e) {
            let ret = await this.poplang.op(null, 'onclick')
            console.log('VText-onclick-ret:', ret)
        },
        draw() {
            const { width, height } = this.element.style
            this.drawTriangle(width, height)
        },

        drawTriangle(width, height) {
            // 五角星十个坐标点的比例集合
            const points = [
                [0.5, 0.05],
                [1, 0.95],
                [0, 0.95],
            ]

            const coordinatePoints = points.map(point => width * point[0] + ' ' + height * point[1])
            this.points = coordinatePoints.toString()
        },
    },
}
</script>

<style lang="scss" scoped>
.svg-triangle-container {
    width: 100%;
    height: 100%;

    svg {
        width: 100%;
        height: 100%;
    }

    .v-text {
        position: absolute;
        top: 72%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        height: 40%;
    }
}
</style>
