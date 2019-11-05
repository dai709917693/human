<template>
  <el-tabs class="editor__structure"
           type="border-card">
    <el-tab-pane label="页面">

    </el-tab-pane>
    <el-tab-pane label="组件">

    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Structure extends Vue {
}
</script>
<style lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {
    .editor__structure {
      height: 100%;
      display: flex;
      flex-direction: column;
      .el-tabs__content {
        flex: 1;
        overflow: auto;
      }
    }
  }
}
</style>