<template>
  <el-aside :class="{'mini':minify}" class="left-aside" :key='renderKey'>
    <el-menu v-if="!minify" :default-openeds="defaultOpen">
      <el-submenu
       v-for="(route,index) in menu" :key="index" :index="index+1+''">
        <template slot="title">
          <span>{{route.meta.title}}</span>
        </template>
        <el-menu-item
          :class="{'is-active':isCurrent(subRoute.path)}"
          v-for="(subRoute,_index) in route.children"
          :key="_index"
          :index="(index+1)+'-'+(_index+1)"
          @click='goToRoute(route,subRoute)'
        >
          <span>{{subRoute.meta.title}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="minify" @click="minify=!minify">
      <i class="icon" :class="{'el-icon-arrow-left':!minify, 'el-icon-arrow-right':minify}"></i>
    </div>
  </el-aside>
</template>

<script>
export default {
  name: 'LeftNav',
  data() {
    const ROUTES = Object.seal(this.$router.options.routes[0].children);
    return {
      defaultOpen: [],
      activeItem: null,
      currentPath: '',
      menu: ROUTES,
      minify: false,
      renderKey: 0, // menu-item的is-active有bug,用这个强制重新渲染菜单可以消除这个bug
    };
  },
  mounted() {
    this.init();
    this.$router.afterEach(() => {
      setTimeout(() => {
        this.init();
        this.renderKey += 1;
      }, 0);
    });
  },
  methods: {
    isCurrent(path) {
      return this.currentPath.includes(path);
    },
    goToRoute(route, subRoute) {
      if (subRoute.path !== this.currentPath) {
        this.$router.push(`${route.path}/${subRoute.path}`);
      }
    },
    init() {
      const { path } = this.$route;
      for (const i in this.menu) {
        if (path.indexOf(this.menu[i].path) === 0) {
          this.defaultOpen = [`${(i - 0) + 1}`];
          this.currentPath = path.replace(`${this.menu[i].path}/`, '');
          break;
        }
      }
    },
  },
};
</script>
<style lang='scss'>
  .el-submenu .el-menu-item{
    padding: 0;
    min-width: 0;
  }
</style>
<style lang="scss" scoped>
body .mini{
  width:20px !important;
  /deep/.el-menu{
    opacity: 0;
  }
  &:hover{
    background-color: #999;
    &>.minify{
    color: #fff !important;
    }
  }
}
.left-aside{
 width: 180px !important;
 height:100vh !important;
 background-color: #f8f8f8;
 position: relative;
 transition: all 0.5s;
 &:hover{
   .minify{
     display: block;
   }
 }
 .minify{
   position: absolute;
   top:50%;
   right: 0;
   width: 20px;
   height: 20px;
   color: #999;
   font-size: 20px;
   display: none;
   cursor: pointer;
 }
}
</style>
