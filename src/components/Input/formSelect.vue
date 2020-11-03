<template>
        <el-select v-model='val' @change="change" :disabled='disabled'>
            <el-option
            v-for="item of options"
            :label='item.label'
            v-model='item.value'
            :key="item.value"></el-option>
        </el-select>
</template>

<script>
import INPUT_BASE from './INPUT_BASE';

export default {
  name: 'form-select',
  extends: INPUT_BASE,
  props: ['options'],
};
</script>
