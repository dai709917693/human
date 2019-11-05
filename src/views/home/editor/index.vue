<template>
  <div class="editor">
    <menu-header class="editor__header"></menu-header>
    <div class="editor__body">
      <menu-left class="editor__left"></menu-left>
      <menu-right class="editor__right"></menu-right>
      <div class="editor__main"
           @dragover="allowDrop"
           @drop="drop">
        <div ref="editorContent"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { CreateElement, VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { editorModule, treeData } from '@/store/modules/editor'
import menuHeader from './menu-header.vue'
import menuLeft from './menu-left/index.vue'
import menuRight from './menu-right/index.vue'
@Component({
  components: {
    menuHeader,
    menuLeft,
    menuRight
  }
})
export default class Editor extends Vue {
  get editorContent () {
    return editorModule.editorContent
  }
  get editorRefresh () {
    return editorModule.editorRefresh
  }
  paintPage () {
    console.log('绘制')
    let parent = this.$refs.editorContent
    let self = this
    var MyComponent = new Vue({
      render (h) {
        let eles = self.editorContent.map(node => {
          return self.s(node, h)
        })
        let pEle = h('div', {
          style:
            { width: '100%', height: '100%' },
          props: {
            update: self.editorRefresh
          }
        }, eles)
        return pEle
      }
    }).$mount((parent as any))
  }
  s (node: treeData, h: CreateElement) {
    let children: VNode[] = []
    if (node.children.length > 0) {
      node.children.forEach(childNode => {
        children.push(this.s(childNode, h))
      })
    }
    let newNode = h(node.value, { props: node.compProps }, children)
    node.vnode = newNode
    return newNode
  }
  parseVnode (vnode: VNode) {
    let tag = vnode.componentOptions && vnode.componentOptions.tag ? vnode.componentOptions.tag : vnode.tag ? vnode.tag : 'unknow'
    let res: treeData = { value: tag, label: tag, vnode: null, compProps: {}, nativeProps: {}, children: [] }
    if (vnode.children) {
      vnode.children.forEach(childNode => {
        if (vnode.children && vnode.children.length > 0) {
          res.children.push(this.parseVnode(childNode))
        }
      })
    }
    return res
  }
  allowDrop (event: DragEvent) {
    event.preventDefault()
  }
  drop (event: DragEvent) {
    if (!event) {
      return
    }
    try {
      let data = JSON.parse(event.dataTransfer.getData('Text'))

      // event.clientX
      // event.clientY
      // event.shiftKey
      // event.ctrlKey
      console.log(data)
      let node = { value: data.value, label: data.value, vnode: null, compProps: {}, nativeProps: {}, children: [] }
      this.pushEditorContent(node)
      this.paintPage()
    } catch (e) {
      console.log(e)
    }
  }
  setEditorContent (content: treeData[]) {
    editorModule.setEditorContent(content)
  }
  pushEditorContent (node: treeData) {
    editorModule.pushEditorContent(node)
  }
}
</script>
<style scoped lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {
    .editor {
      position: relative;
      height: 100%;
      .editor__header {
        position: absolute;
        top: 0;
        width: 100%;
        height: map-get($map: $theme, $key: 'editor__menuHeader-height');
      }
      .editor__body {
        position: absolute;
        top: 0;
        margin-top: map-get($map: $theme, $key: 'editor__menuHeader-height');
        bottom: 0;
        width: 100%;
      }
      .editor__left {
        float: left;
      }
      .editor__right {
        float: right;
      }
      .editor__main {
        height: 100%;
        background-color: #000;
        padding-left: map-get($map: $theme, $key: 'editor__menuLeft-width');
        padding-right: map-get($map: $theme, $key: 'editor__menuRight-width');
      }
    }
  }
}
</style>