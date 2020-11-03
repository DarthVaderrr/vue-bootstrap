<template>
    <div class="loading-container" v-show="loading">
        <div class="loading-lock column center" v-if="loading.lock" @touchmove.prevent @scroll.prevent>
            <i class="icon el-icon-loading"></i>
            <span>{{loading.text}}</span>
        </div>
        <div class="loading column align" v-else>
            <i class="icon el-icon-loading"></i>
            <span>{{loading.text}}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Loading',
  computed: {
    loading() {
      return this.$store.state.global.loading;
    },
  },
};
</script>

<style lang="scss" scoped>
%loading-fix{
  position: fixed;
  z-index: 9999;
  transform: translateZ(10px);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.loading{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,1px);
  color: #333;
  .icon{
    font-size: 2em;
  }
}
.loading-lock{
  @extend %loading-fix;
  background-color: rgba(0,0,0,0.2);
  color: #fff;
  .icon{
    font-size: 2em;
  }
}
</style>
