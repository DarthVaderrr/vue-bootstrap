<template>
    <el-input type="textarea" v-model="val" @change="change" :disabled='disabled'></el-input>
</template>

<script>
import INPUT_BASE from './INPUT_BASE';

export default {
  name: 'form-textarea',
  extends: INPUT_BASE,
};
</script>

<style lang="scss" scoped>

</style>
