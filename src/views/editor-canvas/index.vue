<template>
  <div class="editor__canvas">
    <el-button-group>
      <el-button type="primary"
                 @click="drawRect">矩形</el-button>
      <el-button type="primary">圆形</el-button>
      <el-button type="primary"
                 @click="drawLine">线</el-button>
      <el-button type="primary"
                 @click="drawText">文本</el-button>
    </el-button-group>
    <div ref="editor2dCanvas"
         class="editor2dCanvas"></div>
  </div>
</template>
<script lang="ts">
import { editor } from './editor/index'
import { Component, Prop, Vue, Ref } from 'vue-property-decorator'
@Component
export default class EditorCanvas extends Vue {
  editor = editor
  @Ref('editor2dCanvas') readonly editor2dCanvas!: HTMLElement
  mounted () {
    this.editor2dCanvas.appendChild(this.editor.canvas)
    this.editor.drawingCanvas.resize()
    window.aaa = this.editor
  }
  drawRect () {
    this.editor.setDrawRectMode()
  }
  drawLine () {
    this.editor.setDrawLineMode()
  }
  drawText () {
    this.editor.setDrawTextMode()
  }
}
</script>
<style lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {
    .editor__canvas {
      padding: 50px;
    }
    .editor2dCanvas {
      border: 1px solid #000;
      width: 700px;
      height: 700px;
    }
  }
}
</style>4
