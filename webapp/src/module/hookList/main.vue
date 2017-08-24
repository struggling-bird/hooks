<template>
  <div class="hook-list">
    <div class="top-panel">
      <el-button type="primary" @click="clickCreate"><i class="el-icon-plus el-icon--left"></i>创建</el-button>
      <el-table
        :data="hookList"
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
          label="调用地址"
        >
          <template scope="scope">
            <!--<el-tag color="#F5B95F"></el-tag>-->
            {{getAddr(scope.row)}}
            <el-tag class="copy-btn"
                    :data-clipboard-text="getAddr(scope.row)"
                    @click="handleEdit(scope.$index, scope.row)">
              复制
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="命令详情">
          <template scope="scope">
            <el-tag v-for="(command, i) in scope.row.command"
                    style="margin-right: 5px"
            >{{command}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="描述"
          width="300"
          prop="description"
        ></el-table-column>

        <el-table-column label="操作" width="250">
          <template scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="testOrder(scope.row)"
            >
              调用
            </el-button>
            <el-button
              size="small"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {actions} from '../../store/constants/main'
  import Clipboard from 'clipboard'
  import {ajax} from '../../utils/main'

  export default {
    name: 'main',
    data () {
      return {
        copyRes: 'Copied',
        content: '',
        clipboard: null
      }
    },
    computed: {
      currentUser () {
        return this.$store.state.user.current
      },
      hookList () {
        return this.$store.state.hook.list
      }
    },
    mounted () {
      this.$store.dispatch(actions.hook.query).catch(() => {
        this.$message({
          message: '列表查询失败',
          type: 'error'
        })
      })
      this.clipboard = new Clipboard('.copy-btn')
      const context = this
      this.clipboard.on('success', () => {
        context.copyRes = 'Copied'
        context.showCopyTip = true
        context.$message(context.copyRes)
      })
      this.clipboard.on('error', () => {
        context.copyRes = 'Press Ctrl+C to copy'
        context.showCopyTip = true
        context.$message({
          message: context.copyRes,
          type: 'error'
        })
      })
    },
    methods: {
      getAddr (row) {
        const addr = `${location.protocol}//${this.currentUser.address}${location.port ? (':' + location.port) : ''}/api/${this.currentUser.token}/${row.id}`
        return addr
      },
      handleEdit (row) {
        console.log(row)
      },
      handleDelete (row) {
        this.$store.dispatch(actions.hook.del, row.id).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        })
      },
      clickCreate () {
        this.$router.push({
          name: 'createHook'
        })
      },
      testOrder (row) {
        ajax({
          url: this.getAddr(row),
          method: 'post'
        }).then(res => {
          console.log(res)
          this.$message('调用成功')
        }).catch(error => {
          this.$message({
            message: '调用失败',
            type: 'error'
          })
          console.error('调用失败', error)
        })
      }
    }
  }
</script>

<style lang="sass">
@import "styles/main"
</style>
