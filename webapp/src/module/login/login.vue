<template>
  <div class="login">
    <div class="panel">
      <el-form v-model="user" @submit.prevent="login">
        <div class="item">
          <el-input
            name="hooksUsername"
            size="large"
            placeholder="用户名或邮箱"
            :autofocus="true"
            auto-complete="off"
            v-model="user.name"
          ></el-input>
        </div>
        <div class="item">
          <el-input
            name="hooksPwd"
            size="large"
            placeholder="密码"
            type="password"
            auto-complete="off"
            v-model="user.password"
          ></el-input>
        </div>
        <el-button type="primary" native-type="submit" @click.prevent="login">登录</el-button>
        <el-checkbox>记住密码</el-checkbox>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        user: {
          name: '',
          password: ''
        }
      }
    },
    methods: {
      login () {
        const context = this
        this.$store.dispatch('login', this.user).then(() => {
          context.$router.replace({name: 'hookList'})
        }).catch(() => {
          context.$message({
            message: '用户名或密码错误',
            type: 'error'
          })
        })
      }
    }
  }
</script>

<style lang="sass">
@import "styles/main"
</style>
