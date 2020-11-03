<template>
  <div class="crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :key="index" v-for="(route,index) in path">
        <router-link :to="route.path" :exact="route.exact">{{route.meta.title}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="button" @click="goBack" v-if="showBackBtn">
      <el-button>返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Crumb',
  props: ['showBackBtn'],
  data() {
    return {
      path: [],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    init() {
      this.path         = this.$route.matched;
      const titlePath   = this.path.slice(1) || []; // 去掉首页这级
      const pageTitle   = titlePath.map((i) => i.meta.title).join('-');
      this.path[0].path = '/';
      document
        .head
        .querySelector('title')
        .innerHTML = pageTitle;
    },
  },
  mounted() {
    this.init();
    this.$router.afterEach(() => {
      setTimeout(() => {
        this.init();
      }, 0);
    });
  },
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
.button {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
}
.crumbs {
  position: relative;
  padding:0 10px;
}
body .el-table th.gutter {
  display: table-cell !important;
}
</style>
