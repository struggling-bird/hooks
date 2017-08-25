<template>
  <div class="layout">
    <div class="left">
      <div class="logo" @click="onClickLogo">
        HOOKS
      </div>
      <el-menu default-active="1" theme="dark" :router="true">
        <el-menu-item index="1" :route="{name: 'hookList'}"
        ><i class="el-icon-menu"></i>列表</el-menu-item>
        <el-menu-item index="2" :route="{name: 'ssh'}"
        ><i class="el-icon-menu"></i>SSH</el-menu-item>
        <!--<el-menu-item index="3" :route="{name: 'history'}"-->
        <!--&gt;<i class="el-icon-document"></i>日志查询</el-menu-item>-->
        <el-menu-item index="4" @click="logout"
        ><i class="el-icon-setting"></i>退出</el-menu-item>
      </el-menu>
    </div>
    <div class="center">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {ajax} from '../../utils/main'
  export default {
    name: 'main',
    methods: {
      onClickLogo () {
        this.$router.push('/')
      },
      logout () {
        ajax({
          url: '/users/logout',
          method: 'post'
        }).then(() => {
          this.$router.push('/login')
        }).catch(() => {
          this.$message({
            message: '退出失败',
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
