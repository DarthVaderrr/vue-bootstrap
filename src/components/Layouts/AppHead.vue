<template>
    <div class="head align">
        <img src="../../assets/img/logo.png" class="logo"/>
        <h1>后台管理系统</h1>
        <div class="user f1 end align">
            <img class="avatar center" src="../../assets/img/admin.png" />
            <div class="username">{{username}}</div>
            <div class="btn">
                <el-button size="mini" @click="logout">退出</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AppHead',
  data() {
    return {
      username: (this.$store.state.login.userInfo ?? {}).realName,
    };
  },
  methods: {
    logout() {
      this.$confirm('确定退出?').then(() => {
        this.$store.commit('logout');
      }).catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.head{
    height: 100px;
    width: 100%;
    background-color: #333;
    color: azure;
    padding: 20px;
    .user{
        .avatar{
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
        .username{
            margin: 20px;
        }
        .btn{

        }
    }
    .logo{
        border: 1px solid #eee;
        height: 50px;
        background: #fff;
        margin-right: 1em
    }
}
</style>
