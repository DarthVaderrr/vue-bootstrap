<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 15:57:16
 * @LastEditTime: 2019-09-18 18:41:03
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="custom-wapper">
    <Crumb :showBackBtn='showBackBtn'></Crumb>
    <div class="bgw">
      <slot></slot>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Wrapper',
  props: ['showBackBtn'],
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
.bgw{
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  width: 100%;
  height: calc( 100vh - 165px );
  overflow-y: scroll;
}

</style>
