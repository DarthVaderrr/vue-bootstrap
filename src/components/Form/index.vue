<template>
  <div class="form wf" :class="layout">
    <el-form label-width='120px' ref="form" :size='size' :rules="rules" :model="formData">
      <el-form-item
      v-for='item of items'
      :key="item.key"
      v-show='!item.hide'
      :label="item.label"
      :prop="item.key">
        <component
        :size='size'
        start-placeholder='开始日期/时间'
        end-placeholder='结束日期/时间'
        :is="item.type"
        :clearable='true'
        v-model="item.value"
        :options='item.options'
        :disabled="item.disabled"
        :value-format='item.valueFormate'
        :type='item.pickerType'
        :format='item.format'
        :placeholder="item.placeholder || '请输入' + item.label">
        </component>
      </el-form-item>
    </el-form>

    <slot></slot>

    <div class="wf btns">
      <el-button @click="resetOrClose" :size="size">{{btnNames[0]}}</el-button>
      <el-button type="primary" :size="size" @click="submit">{{btnNames[1]}}</el-button>
    </div>
  </div>
</template>

<script>
/**
 * =====================================================================
 * 参数items:
 * 对象数组,内含表单项的配置,包括组件类型,默认值,选项,占位符,校验规则等,例如:
 * [ {
 *    value:1,
 *    key:'gender',
 *    type:'form-select',
 *    label:'性别',
 *    options:[ { value:1, label:'男'}, { value:0, label:'女'} ],
 *       // options也可以使用对象格式: { 0:'温度', 1:'湿度', 10:'气压' }
 *    disabled:false,
 *    hide:true  这个字段是否展示
 *
 *    如果type为el-date-picker,  可能需要提供以下属性:
 *    valueFormate:'timestamp', 指定输出值的格式
 *    format:'yyyy-MM-dd',       指定时间显示的格式
 *    pickerType:'date',        指定time-picker的具体类型
 *
 *    resetValue: 重置后的值,如果不提供,则重置为value的初始值,对于编辑来说,比较实用
 *    validator:Validator对象数组, 如果不提供,则默认不校验
 * } ]
 *
 * 可以使用插槽插入额外的内容,但它们不受此组件控制
 * =====================================================================
 */

export default {
  name: 'ulab-form',
  props: {
    layout: {
      type: String,
      default: 'vertical', // 布局方式: vertical 一行一个 列居中  inline: 行内两边对齐 一行若干个  splite: 一行两个,左对齐
    },
    size: {
      type: String,
      default: 'mini',
    },
    btnNames: {
      type: Array,
      default: () => ['重置', '确认'],
    },
    inline: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultValueMap: {},
    };
  },
  watch: {
    // 监听表单项数组,存储表单项的初始值,以便重置表单时使用
    items: {
      deep: false,
      immediate: true,
      handler(items) {
        const map = {};
        for (const i of items) {
          map[i.key] = i.value;
          if (i.options && !Array.isArray(i.options)) {
            // 把键值对的option转换成数组格式
            const obj = i.options;
            const arr = mapToArr(obj);
            this.$set(i, 'options', arr);
          }
        }
        this.defaultValueMap =  map;
      },
    },
  },
  computed: {
    rules() {
      const { items } = this;
      const rules     = {};
      for (const i of items) {
        rules[i.key] = i.validator;
      }
      return rules;
    },
    formData() {
      const { items } = this;
      const formData  = {};
      for (const i of items) {
        if (i.keyMin) {
          const values       = i.value ?? ['', ''];
          formData[i.keyMin] = values[0];
          formData[i.keyMax] = values[1];
        } else {
          formData[i.key] = i.value ?? '';
        }
      }
      return formData;
    },
  },
  methods: {
    submit() {
      let isAllValid = true;
      this.$refs.form.validate((valid) => {
        isAllValid = valid;
      });
      if (isAllValid) {
        this.$emit('submit', this.formData);
      }
    },
    resetOrClose() {
      if (this.btnNames[0] === '重置') this.reset();
      else this.close();
    },
    close() {
      // 假设此表单是内嵌在el-dialog内的
      const closeBtn = this.$parent.$el.querySelector('.el-dialog__headerbtn');
      if (closeBtn) {
        closeBtn.dispatchEvent(new Event('click'));
      } else {
        this.$emit('cancel');
      }
    },
    reset() {
      this.$refs.form.resetFields(); // 这个api无效,需要手动实现reset
      const { defaultValueMap } = this;
      this.items.forEach((i) => {
        i.value = i.resetValue ?? defaultValueMap[i.key];
      });
    },
  },
};
function mapToArr(obj) {
  const values = Object.keys(obj);
  if (values.every((v) => !/\D/.test(v))) {
    return values.map((k) => ({ value: k - 0, label: obj[k] }));
  }
  return values.map((k) => ({ value: k, label: obj[k] }));
}
</script>

<style lang="less" scoped>
.form{
  /deep/ .el-input{
    width: unset;
    .el-input__inner{
      width: unset;
    }
  }
  .el-radio-group,.el-checkbox-radio{
    width: 193px;
  }
  /deep/ .el-form-item--large{
    width: 100%;
    .el-input,.el-input__inner{
      width: 100%;
    }
    .el-textarea__inner{
      min-height: 100px !important;
    }
  }
}
.vertical{
  /deep/.el-form{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .el-form-item{
        margin-top: 10px;
      }
    }
  .btns{
    display: flex;
    justify-content: center;
  }
}
.inline{
  /deep/ .el-form{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .el-form-item{
      margin-right: 10px;
    }
  }
    .btns{
    display: flex;
    justify-content: flex-end;
  }
}
.splite{
  /deep/ .el-form{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .el-form-item{
      width: 40%;
    }
  }
  .btns{
    display: flex;
    justify-content: center;
  }
}
</style>
