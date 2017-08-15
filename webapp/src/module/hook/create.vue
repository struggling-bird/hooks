<template>
  <div class="create-hook">
    <label @click="clickReturn" class="btn-return"><i class="el-icon-arrow-left"></i>返回</label>

    <div class="center-panel">
      <el-card class="left">
        <div slot="header" class="header">远程终端</div>
        <code class="terminal-panel" @click="focusToInput" ref="terminalPanel">
          <ul v-for="(item, index) in inputHistory">
            <li>➜{{item.order}}</li>
            <li v-for="(res, i) in response(item.response)" v-html="res"></li>
          </ul>
          <div class="input">
            <label class="pwd">➜{{getCwd()}}</label>
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

    <el-button type="primary" class="btn-save">保存</el-button>
  </div>
</template>

<script>
  import io from 'socket.io-client'
  var socket = null
  export default {
    name: 'create',
    data () {
      return {
        /**
         * 历史输入及输出信息
         * {type:'', content: ''}
         * type: order, output
         */
        inputHistory: [],
        cwd: '',
        results: [

        ]
      }
    },
    mounted () {
      const context = this
      socket = io('/')
      socket.on('connect', () => {
        socket.on('terminal', (data) => {
          context.inputHistory.push(data)
          context.cwd = data.cwd
          setTimeout(() => {
            context.$refs.terminalPanel.scrollTop = 999999
          })
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
      }
    }
  }
</script>

<style lang="sass">
@import "styles/create"
</style>
