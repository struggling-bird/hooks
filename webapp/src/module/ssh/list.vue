<template>
  <div class="ssh">
    <el-button type="primary" @click="showDialog = true">新增</el-button>

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

    <el-dialog title="创建SSH配置" :visible.sync="showDialog" size="tiny">
      <el-form label-width="90px" v-model="createForm">
        <el-form-item label="名称">
          <el-input v-model="createForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="IP">
          <el-input v-model="createForm.ip" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="端口">
          <el-input v-model="createForm.port" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="createForm.userName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="createForm.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="密匙地址">
          <el-input v-model="createForm.privateKey" auto-complete="off"></el-input>
        </el-form-item>

        <el-button type="primary" native-type="submit" @click.prevent="onSave">确 定</el-button>
        <el-button @click="onReset">取 消</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {actions} from '../../store/constants/main'
  export default {
    name: 'list',
    data () {
      return {
        showDialog: false,
        createForm: {
          name: '',
          ip: '',
          port: 20,
          userName: '',
          password: '',
          privateKey: ''
        }
      }
    },
    computed: {
      list () {
        return this.$store.state.ssh.list
      }
    },
    mounted () {
      this.$store.dispatch(actions.ssh.query)
    },
    methods: {
      onDel (row) {
        console.log(row)
      },
      onSave () {
        console.log('save')
        this.onReset()
        this.showDialog = false
      },
      onReset () {
        this.createForm = {
          name: '',
          ip: '',
          port: 20,
          userName: '',
          password: '',
          privateKey: ''
        }
      }
    }
  }
</script>

<style lang="sass">
@import "styles/main"
</style>
