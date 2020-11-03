<template>
  <div class="wf">
    <AppHead></AppHead>
    <el-container class="wf flex strech">
      <LeftNav></LeftNav>
      <el-main class="main-content">
        <Wrapper :showBackBtn='false'>
          <router-view></router-view>
        </Wrapper>
      </el-main>
    </el-container>
    <Loading></Loading>
  </div>
</template>
<script>
export default {
  name: 'AppConatiner',
};
</script>
<style lang="scss" scoped>
.app-container {
  padding: 10px;
}
.main-content{
  padding-left:0;
  height: calc( 100vh - 100px );
  background-color: #f4f6fd;
}
</style>
<style lang="css">
  html,body{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
