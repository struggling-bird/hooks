<template>
  <div class="ssh">
    <el-button type="primary">新增</el-button>

    <el-table
      :data="list"
      border
      stripe
      highlight-current-row
      height="100%"
      style="width: 100%">

      <el-table-column
        label="名称"
        prop="name"
        width="130">
      </el-table-column>

      <el-table-column
        label="IP"
        prop="ip"
        width="130">
      </el-table-column>

      <el-table-column
        label="端口"
        prop="port"
        width="130">
      </el-table-column>

      <el-table-column
        label="用户名"
        prop="userName"
        width="130">
      </el-table-column>

      <el-table-column
        label="密码"
        prop="password"
        width="130">
      </el-table-column>

      <el-table-column
        label="密匙地址"
        prop="privateKey">
      </el-table-column>

      <el-table-column label="操作" width="250">
        <template scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'list',
    data () {
      return {
        list: [{
          name: '15测试机',
          ip: '192.168.0.15',
          port: 20,
          userName: 'root',
          password: 'fdi92ufjej',
          privateKey: '/Users/yqdong/.ssh/id_rsa'
        }]
      }
    },
    methods: {
      onDel (row) {
        console.log(row)
      }
    }
  }
</script>

<style lang="sass">
@import "styles/main"
</style>
