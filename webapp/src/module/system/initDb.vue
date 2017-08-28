<template>
  <div class="init-db">
    <h2 class="title">初始化数据库配置</h2>
    <el-form label-width="90px"
             :model="form"
             ref="form"
             :rules="rules">

      <el-form-item label="host" prop="host">
        <el-input v-model="form.host" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="port" prop="port">
        <el-input v-model="form.port" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="user" prop="user">
        <el-input v-model="form.user" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="password" prop="password">
        <el-input v-model="form.password" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="database" prop="database">
        <el-input v-model="form.database" auto-complete="off"></el-input>
      </el-form-item>

      <el-button type="primary" native-type="submit" @click.prevent="onSave">确 定</el-button>
      <el-button @click="onReset">取 消</el-button>
    </el-form>
  </div>
</template>

<script>
//  import {ajax} from '../../utils/main'
  export default {
    name: 'initDb',
    data () {
      const validator = {
        host (rule, value, callback) {
          if (!value) {
            callback(new Error('host地址不能为空'))
          } else {
            callback()
          }
        },
        port (rule, value, callback) {
          if (!value) {
            callback(new Error('端口号不能为空'))
          } else {
            callback()
          }
        },
        user (rule, value, callback) {
          if (!value) {
            callback(new Error('用户名不能为空'))
          } else {
            callback()
          }
        },
        password (rule, value, callback) {
          if (!value) {
            callback(new Error('密码不能为空'))
          } else {
            callback()
          }
        },
        database (rule, value, callback) {
          if (!value) {
            callback(new Error('默认数据库不能为空'))
          } else {
            callback()
          }
        }
      }
      return {
        form: {
          host: '',
          port: '',
          user: '',
          password: '',
          database: ''
        },
        rules: {
          host: [
            {required: true, validator: validator.host}
          ],
          port: [
            {required: true, validator: validator.port}
          ],
          user: [
            {required: true, validator: validator.user}
          ],
          password: [
            {required: true, validator: validator.password}
          ],
          database: [
            {required: true, validator: validator.database}
          ]
        }
      }
    },
    methods: {
      onReset () {
        this.form = {
          host: '',
          port: '',
          user: '',
          password: '',
          database: ''
        }
      },
      onSave () {
        this.$refs.form.validate(valid => {
          console.log(this)
        })
//        for (let key in this.form) {
//          if (!this.form[key]) {
//            this.$message({
//              message: `${key}值不能为空`,
//              type: 'error'
//            })
//            return
//          }
//        }
      }
    }
  }
</script>

<style lang="sass">
@import "styles/initDb"
</style>
