<template>
  <div class="editor">
    <menuLeft class="editor__left"></menuLeft>
    <div class="editor__main"></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import menuLeft from './menu-left.vue'
@Component({
  components: {
    menuLeft
  }
})
export default class Editor extends Vue {

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
      .editor__main {
        padding-left: 50px;
        height: 100%;
      }
    }
  }
}
</style>