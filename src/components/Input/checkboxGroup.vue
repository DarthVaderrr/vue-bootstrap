<template>
        <el-checkbox-group v-model='val' @change="change" :disabled='disabled'>
            <el-checkbox
            v-for="item of options"
            :label='item.value'
            :key="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
</template>

<script>
import INPUT_BASE from './INPUT_BASE';

export default {
  name: 'checkbox-group',
  extends: INPUT_BASE,
  props: ['options'],
};
</script>
