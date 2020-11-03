<template>
  <div class="wf" :class="color">
    <section class="outter">
      <div class="title">{{title}}</div>
      <div class="conditions wf">
        <slot></slot>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BlockContainer',
  props: {
    color: {
      type: String,
      default: 'dark',
    },
    title: {
      type: String,
      default: '搜索条件',
    },
  },
};
</script>

<style lang="scss" scoped>
.dark{
  .title{
    border-color: 1px solid #ddd;
    background-color: #f5f5f5;
  }
  .conditions{
    border-color: #eee;
  }
}
.light-blue{
  .title{
      background-color: var(--light-blue);
      color: #fff;
  }
  .conditions{
      border-color: var(--light-blue);
    }
}
.blue{
  .title{
      background-color: var(--blue);
      color: #fff;
  }
  .conditions{
      border-color: var(--blue);
    }
}
.title {
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  color: #333;
  font-weight: 400;
  font-size: 14px;
}
.conditions {
  padding: 10px;
  border:1px solid #eee;
  border-top: none;
  padding-bottom: 2em;
  border-bottom-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
</style>
