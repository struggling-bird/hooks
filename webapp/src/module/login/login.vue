<template>
  <div class="login">
    <div class="panel">
      <div class="item">
        <el-input
          name="hooksUsername"
          size="large"
          placeholder="用户名或邮箱"
          :autofocus="true"
          auto-complete="off"
        ></el-input>
      </div>
      <div class="item">
        <el-input
          name="hooksPwd"
          size="large"
          placeholder="密码"
          type="password"
          auto-complete="off"
        ></el-input>
      </div>
      <el-button type="primary">登录</el-button>
      <el-checkbox>记住密码</el-checkbox>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        msg: 'login'
      }
    }
  }
</script>

<style lang="sass">
@import "styles/main"
</style>
