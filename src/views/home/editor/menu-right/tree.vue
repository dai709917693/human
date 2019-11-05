<template>
  <el-tree class="editor__tree"
           :data="editorContent"
           default-expand-all
           draggable
           @node-drop="nodeDrop"
           @node-click="nodeClick">
  </el-tree>
</template>
<script lang="ts">
import { editorModule, treeData } from '@/store/modules/editor'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { TreeNode } from 'element-ui/types/tree'
import { ElButton } from 'element-ui/types/button'
@Component
export default class EditorTree extends Vue {
  get editorContent () {
    return editorModule.editorContent
  }
  nodeDrop () {
    console.log('拖拽节点')
  }
  nodeClick (data: treeData, node: TreeNode<string, treeData>) {
    this.setEditorCurrentData(data)
  }
  setEditorCurrentData (data: treeData) {
    editorModule.setEditorCurrentData(data)
  }
}
</script>

<style lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {
    .editor__tree {
      background-color: map-get(
        $map: $theme,
        $key: 'editor__menuRight-background'
      );
      .el-tree-node > .el-tree-node__children {
        overflow: initial !important;
      }
    }
  }
}
</style>