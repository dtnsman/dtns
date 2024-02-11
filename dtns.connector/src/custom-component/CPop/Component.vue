<template>
    <div class="area"></div>
</template>

<script>
import OnEvent from '../common/OnEvent'

export default {
    extends: OnEvent,
}
</script>

<style lang="scss" scoped>
.area {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>
