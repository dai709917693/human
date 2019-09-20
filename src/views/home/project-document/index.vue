<!--
 * @description: human
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-09-16 09:08:40
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-09-19 08:36:56
 -->
<template>
  <div v-html="document">
  </div>
</template>
<script lang="ts">
var marked = require('marked')
import { Component, Prop, Vue } from 'vue-property-decorator'
import axios from 'axios'
@Component
export default class ProjectDocument extends Vue {
  document: string = ''
  created () {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight (code: string) {
        return require('highlight.js').highlightAuto(code).value
      },
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    })
    axios.get('/document.md').then(res => {
      let cont = marked(res.data)
      this.document = cont
    })
  }
}
</script>