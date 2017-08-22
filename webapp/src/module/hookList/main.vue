<template>
  <div class="hook-list">
    <div class="top-panel">
      <el-button type="primary" @click="clickCreate"><i class="el-icon-plus el-icon--left"></i>创建</el-button>
      <el-table
        :data="hookList"
        border
        stripe
        highlight-current-row
        current-row-key="0"
        row-key="id"
        style="width: 100%">

        <!--<el-table-column-->
          <!--label="id"-->
          <!--prop="id"-->
          <!--width="70">-->
        <!--</el-table-column>-->

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

        <el-table-column
          label="描述"
          width="300"
          prop="description"
        ></el-table-column>

        <el-table-column label="操作" width="150">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="terminal-panel">
      <el-card class="detail-panel">
        <label>命令详情</label>
        <code class="content">
          ll
        </code>
      </el-card>
      <el-card class="run-panel">
        <el-tag>运行</el-tag>
        <code class="content">
          ➜  ~ ll <br>
          total 16<br>
          drwx------   4 yqdong  staff   136B  6  4  2015 Applications<br>
          drwx------+ 20 yqdong  staff   680B  8  4 15:38 Desktop<br>
          drwx------+ 27 yqdong  staff   918B  8  9 10:37 Documents<br>
          drwx------+ 30 yqdong  staff   1.0K  8 10 10:48 Downloads<br>
          drwx------@ 73 yqdong  staff   2.4K  7 28 18:06 Library<br>
          drwx------+  3 yqdong  staff   102B  1 24  2016 Movies<br>
          drwx------+  5 yqdong  staff   170B 11 15  2016 Music<br>
          drwx------+  9 yqdong  staff   306B 10 11  2015 Pictures<br>
          drwxr-xr-x+  5 yqdong  staff   170B  5 17  2015 Public<br>
          drwxr-xr-x  10 yqdong  staff   340B  7 22 21:54 WebstormProjects<br>
          -rw-r--r--   1 yqdong  staff     0B  7 28 18:06 default.txaPackage<br>
          drwxr-xr-x  20 yqdong  staff   680B  7 28 14:15 git_workspace<br>
          drwxr-xr-x  21 yqdong  staff   714B  8  4 16:09 github<br>
          drwxr-xr-x  16 yqdong  staff   544B  8  2 15:23 gitlab<br>
          drwxr-xr-x   8 yqdong  staff   272B  2  7  2017 programFile<br>
          drwxr-xr-x  10 yqdong  staff   340B  2 16 15:03 release<br>
          -rw-r--r--   1 yqdong  staff   737B  4 18  2016 release15.sh<br>
          -rw-r--r--   1 yqdong  staff   157B  4 12  2016 releaseBeta.sh<br>
          drwxr-xr-x  12 yqdong  staff   408B  2  9 17:29 wx<br>
        </code>
      </el-card>
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
      this.$store.dispatch(actions.hook.query)
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
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      clickCreate () {
        this.$router.push({
          name: 'createHook'
        })
      },
      testOrder (row) {
        console.log('test order', this.getAddr(row))
        ajax({
          url: this.getAddr(row),
          method: 'post'
        }).then(res => {
          console.log(res)
        }).catch(error => {
          console.error(error)
        })
      }
    }
  }
</script>

<style lang="sass">
@import "styles/main"
</style>
