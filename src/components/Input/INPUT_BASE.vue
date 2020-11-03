<script>
import { cloneDeep } from 'lodash';

export default {
  props: ['value', 'disabled'],
  model: {
    prop: 'value',
    event: 'change',
  },
  data() {
    return {
      val: cloneDeep(this.value),
    };
  },
  watch: {
    value(value) {
      this.val = cloneDeep(value);
    },
  },
  methods: {
    change() {
      this.$emit('change', this.val);
    },
  },
};
</script>
