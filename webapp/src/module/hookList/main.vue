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

        <el-table-column label="操作" width="250">
          <template scope="scope">
            <el-button
              size="small"
              type="primary"
              :loading="callLoading[scope.row.id]"
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
              @click="onDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="showDelWarning"
      size="tiny">
      <span>确定要删除配置"{{toDel && toDel.name}}"吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDelWarning = false">取 消</el-button>
        <el-button type="primary" @click="onConfirmDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {actions} from '../../store/constants/main'
  import Clipboard from 'clipboard'
  import {ajax} from '../../utils/main'
  import Vue from 'vue'

  export default {
    name: 'main',
    data () {
      return {
        copyRes: 'Copied',
        content: '',
        clipboard: null,
        showDelWarning: false,
        toDel: null,
        callLoading: {}
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
    watch: {
      hookList (list) {
        list.forEach((item) => {
          Vue.set(this.callLoading, item.id, false)
        }, this)
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
      onDel (row) {
        this.toDel = row
        this.showDelWarning = true
      },
      onConfirmDel () {
        this.$store.dispatch(actions.hook.del, this.toDel.id).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        })
        this.showDelWarning = false
      },
      clickCreate () {
        this.$router.push({
          name: 'createHook'
        })
      },
      testOrder (row) {
        this.callLoading[row.id] = true
        ajax({
          url: this.getAddr(row),
          method: 'post'
        }).then(res => {
          this.callLoading[row.id] = false
          this.$message('调用成功')
          console.log(res.data || res.message)
        }).catch(error => {
          this.callLoading[row.id] = false
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
