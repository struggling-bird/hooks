<template>
  <div class="layout">
    <div class="left">
      <div class="logo">
        <img src="../../assets/images/logo.png"/>
        HOOKS
      </div>
      <el-menu default-active="1" theme="dark" :router="true">
        <el-menu-item index="1" :route="{name: 'hookList'}"
        ><i class="el-icon-menu"></i>列表</el-menu-item>
        <el-menu-item index="2" :route="{name: 'history'}"
        ><i class="el-icon-document"></i>日志查询</el-menu-item>
        <el-menu-item index="3"
        ><i class="el-icon-setting"></i>退出</el-menu-item>
      </el-menu>
    </div>
    <div class="center">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'main',
    data () {
      return {
        msg: 'main'
      }
    }
  }
</script>

<style lang="sass">
@import "styles/main"
</style>
