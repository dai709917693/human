<template>
  <div class="editor">
    <menu-left class="editor__left"></menu-left>
    <menu-right class="editor__right"></menu-right>
    <div class="editor__main"
         @dragover="allowDrop"
         @drop="drop">
      <div ref="editorContent"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { CreateElement } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import menuLeft from './menu-left.vue'
import menuRight from './menu-right.vue'
@Component({
  components: {
    menuLeft,
    menuRight
  }
})
export default class Editor extends Vue {
  editorContent: string[] = []
  paintPage () {
    let parent = this.$refs.editorContent
    let self = this
    var MyComponent = new Vue({
      render (h) {
        let eles = self.editorContent.map(tag => {
          return h(tag)
        })
        return h('div', {
          style:
            { width: '100%', height: '100%' }
        }, eles)
      }
    }).$mount((parent as any))
  }
  newC (h: CreateElement, tag: string) {
    return h(tag)
  }
  allowDrop (event: DragEvent) {
    event.preventDefault()
  }
  drop (event: DragEvent) {
    try {
      let data = JSON.parse(event.dataTransfer.getData('Text'))

      // event.clientX
      // event.clientY
      // event.shiftKey
      // event.ctrlKey
      console.log(data)
      this.editorContent.push(data.value)
      this.paintPage()
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
<style scoped lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {
    .editor {
      height: 100%;
      .editor__left {
        float: left;
      }
      .editor__right {
        float: right;
      }
      .editor__main {
        background-color: #000;
        padding-left: map-get($map: $theme, $key: 'editor__menuLeft-width');
        padding-right: map-get($map: $theme, $key: 'editor__menuRight-width');
        height: 100%;
      }
    }
  }
}
</style>