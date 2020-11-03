<template>
    <div>
        <el-upload
            class="upload-demo"
            :action="action"
            :on-remove="handleRemove"
            :on-success='uploaded'
            :on-error='error'
            :on-progress="progress"
            :limit="1"
            :with-credentials='true'
            :on-preview='preview'
            :disabled='disabled'
            :file-list="fileList">
            <el-button size="small"
              v-loading='loading'
              type="primary"
              :disabled='fileList.length > 0'>
                点击上传
            </el-button>
        </el-upload>
    </div>
</template>

<script>
import INPUT_BASE from './INPUT_BASE';

export default {
  extends: INPUT_BASE,
  name: 'file-input',
  data() {
    return {
      action: `${process.env.VUE_APP_API_BASE_URL}/cos/upload`,
      fileList: this.value ? [{ name: this.value, url: this.value }] : [],
      loading: false,
    };
  },
  watch: {
    value(val) {
      if (!val) this.fileList = [];
      else this.fileList = [{ name: val, url: val }];
    },
  },
  methods: {
    error() {
      this.loading = false;
      this.$message({
        type: 'error',
        message: '上传失败',
      });
    },
    progress() {
      this.loading = true;
    },
    uploaded(response) {
      this.loading = false;
      this.$emit('change', response.data);
    },
    handleRemove() {
      this.fileList = [];
      this.$emit('change', '');
    },
    preview({ url }) {
      window.open(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-demo{
  width:208px;
  height: auto;
}
</style>
