<template>
  <el-tabs class="editor__module__attr"
           tab-position="left"
           type="border-card">
    <el-tab-pane label="类">
        <div v-for="item in editorCommonClass" :key="item.name">{{item.name}}</div>
      <el-button class="editor__module__attr__plus__button"
                 type="danger"
                 icon="el-icon-plus"
                 circle
                 @click="addClass"></el-button>
      <class-dialog ref="classDialog"></class-dialog>
    </el-tab-pane>
    <el-tab-pane label="属性">
      <el-button class="editor__module__attr__plus__button"
                 type="success"
                 icon="el-icon-plus"
                 circle></el-button>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref } from 'vue-property-decorator'
import { editorModule } from '@/store/modules/editor'
import classDialog from './class-dialog.vue'
@Component({
  components: {
    classDialog
  }
})
export default class ModuleAttr extends Vue {
  get editorCommonClass () {
    return editorModule.editorCommonClass
  }
  @Ref() readonly classDialog!: classDialog
  addClass () {
    this.classDialog.open()
  }
}
</script>
<style lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {
    .editor__module__attr {
      height: 100%;
      display: flex;
      .el-tabs__content {
        flex: 1;
        overflow: auto;
      }
    }
    .editor__module__attr__plus__button {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
}
</style>