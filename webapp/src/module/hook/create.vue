<template>
  <div class="create-hook">
    <label @click="clickReturn" class="btn-return"><i class="el-icon-arrow-left"></i>返回</label>

    <div class="center-panel">
      <el-card class="left">
        <div slot="header" class="header">远程终端</div>
        <code class="terminal-panel">
          [root@test3 ~]# cd /var/www/html/webapp<br>
          [root@test3 webapp]# ll<br>
          总用量 12072<br>
          -rw-r--r--  1 root root  214428 8月   3 14:16 addInfo.min.js<br>
          -rw-r--r--  1 root root  518160 8月   3 14:16 appSetting.min.js<br>
          -rw-r--r--  1 root root  653271 8月   3 14:16 boardView.min.js<br>
          [root@test3 webapp]# git pull<br>
          Already up-to-date.<br>
          [root@test3 webapp]#
        </code>
      </el-card>

      <el-card class="right">
        <div slot="header" class="header">目标命令栏</div>
        <div class="result-panel">
          <el-tag v-for="(item, index) in results">
            <el-tooltip :content="item" placement="left">
              <label>{{item}}</label>
            </el-tooltip>
            <i class="el-icon-document"></i>
            <i class="el-icon-delete"></i>
          </el-tag>
        </div>
        <el-button class="btn-default" type="primary">生成默认命令集</el-button>
      </el-card>
    </div>

    <el-button type="primary" class="btn-save">保存</el-button>
  </div>
</template>

<script>
  export default {
    name: 'create',
    data () {
      return {
        results: [
          'cd /var/html/webapp',
          'git pull',
          'exit'
        ]
      }
    },
    methods: {
      clickReturn () {
        this.$router.replace({name: 'hookList'})
      }
    }
  }
</script>

<style lang="sass">
@import "styles/create"
</style>
