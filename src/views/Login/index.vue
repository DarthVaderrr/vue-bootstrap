<template>
  <div class="login center">
    <div class="column align form">
      <h1>登录</h1>
      <h1>后台管理系统</h1>
      <el-input
      placeholder="请输入用户名"
      v-model="userName"
      autofocus
      prefix-icon="el-icon-user-solid"
      clearable
      autocompletetype="text"></el-input>
      <el-input
      placeholder="请输入密码"
      v-model="password"
      prefix-icon="el-icon-unlock"
      clearable
      autocomplete
      type="password"></el-input>
      <div class="btns wf align center" v-loading='loading'>
          <el-button @click="login" class="wf" type="primary">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@api/user';

export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      password: '',
      loading: false,
    };
  },
  methods: {
    async login() {
      this.loading                 = true;
      const { userName, password } = this;
      const res                    = await login({ userName, password });
      this.loading                 = false;
      if (res) this.$store.commit('login', res);
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #333;
  color: #fff;
  .form{
      &>*{
          margin-bottom: 20px;
      }
  }
}
</style>
