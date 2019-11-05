<template>
  <div class="
       editor__menu__right-vertical">
    <div class="editor__property__container">
      <editor-property></editor-property>
    </div>
    <div class="editor__tree__container">
      <editor-tree></editor-tree>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import editorTree from './tree.vue'
import editorProperty from './property.vue'

@Component({
  components: {
    editorTree,
    editorProperty
  }
})
export default class MenuRight extends Vue {

}
</script>
<style scoped lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {
    .editor__menu__right-vertical {
      background-color: map-get(
        $map: $theme,
        $key: 'editor__menuRight-background'
      );
      width: map-get($map: $theme, $key: 'editor__menuRight-width');
      height: 100%;
    }
    .editor__property__container {
      height: 40%;
    }
    .editor__tree__container {
      overflow: auto;
      height: 60%;
    }
  }
}
</style>

