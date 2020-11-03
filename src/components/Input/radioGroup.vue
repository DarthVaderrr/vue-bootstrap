<template>
        <el-radio-group v-model='val' @change="change">
            <el-radio
            v-for="item of options"
            :label='item.value'
            v-model='item.value'
            :key="item.value">{{item.label}}</el-radio>
        </el-radio-group>
</template>

<script>
import INPUT_BASE from './INPUT_BASE';

export default {
  name: 'radio-group',
  extends: INPUT_BASE,
  props: ['options'],
};
</script>
