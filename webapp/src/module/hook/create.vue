<template>
  <div class="create-hook">
    <label @click="clickReturn" class="btn-return"><i class="el-icon-arrow-left"></i>返回</label>

    <div class="center-panel">
      <el-card class="left">
        <div slot="header" class="header">远程终端</div>
        <code class="terminal-panel" @click="focusToInput" ref="terminalPanel">
          <ul v-for="(item, index) in inputHistory">
            <li><i class="arrow">➜</i>{{item.order}}</li>
            <li v-for="(res, i) in response(item.response)" v-html="res"></li>
          </ul>
          <div class="input">
            <label class="pwd"><i class="arrow">➜</i>{{getCwd()}}</label>
            <input
              type="text" autofocus
              ref="terminalInput"
              @keyup.ctrl.75="onClearHistory"
              @keyup.enter="onEnterOrder">
          </div>
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
        <el-button class="btn-default" type="primary" @click="onGenerateDefault">生成默认命令集</el-button>
      </el-card>
    </div>

    <el-button type="primary" class="btn-save" @click="dialogFormVisible = true">保存</el-button>

    <el-dialog title="保存" :visible.sync="dialogFormVisible" size="tiny">
      <el-form label-width="90px" v-model="form" @submit.prevent="onSave">
        <el-form-item label="HOOK名称">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" :rows="4"></el-input>
        </el-form-item>
        <el-button type="primary" native-type="submit" @click.prevent="onSave">确 定</el-button>
        <el-button @click="onReset">取 消</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import io from 'socket.io-client'
  import {actions} from '../../store/constants/main'

  var socket = null
  export default {
    name: 'create',
    data () {
      return {
        dialogFormVisible: false,
        /**
         * 历史输入及输出信息
         * {type:'', content: ''}
         * type: order, output
         */
        inputHistory: [],
        cwd: '',
        results: [

        ],
        form: {
          name: '',
          description: ''
        }
      }
    },
    mounted () {
      const context = this
      socket = io('/')
      socket.on('terminal', (data) => {
        context.inputHistory.push(data)
        context.cwd = data.cwd || context.cwd
        setTimeout(() => {
          context.$refs.terminalPanel.scrollTop = 999999
        })
      })
    },
    methods: {
      clickReturn () {
        this.$router.replace({name: 'hookList'})
      },
      /**
       * 点击命令panel，使输入框直接获取焦点
       */
      focusToInput () {
        this.$refs.terminalInput.focus()
      },
      /**
       * 输入命令事件处理
       */
      onEnterOrder () {
        const order = this.$refs.terminalInput.value
        if (!order) return
        socket.emit('terminal', {
          order,
          cwd: this.cwd
        })
        this.$refs.terminalInput.value = ''
      },
      response (res) {
        let arr = res.split(/\n/)
        return arr.map((content) => {
          return content
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\s/g, '&nbsp')
        })
      },
      getCwd () {
        let path = this.cwd.split('/')
        return path[path.length - 1]
      },
      onGenerateDefault () {
        this.results = this.inputHistory.map((item) => {
          return item.order
        })
      },
      onClearHistory () {
        this.inputHistory = []
      },
      onReset () {
        this.dialogFormVisible = false
        this.form.name = ''
        this.form.description = ''
      },
      onSave () {
        this.$store.dispatch(actions.hook.create, {
          name: this.form.name,
          command: JSON.stringify(this.results),
          description: this.form.description
        }).then(() => {
          this.onReset()
          this.$router.push({
            name: 'hookList'
          })
        }).catch(() => {
          this.$message({
            message: '创建失败',
            type: 'error'
          })
        })
      }
    }
  }
</script>

<style lang="sass">
@import "styles/create"
</style>
