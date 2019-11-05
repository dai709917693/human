<template>
  <div class="editor__menu__left-vertical">
    <div class="editor__strucure__container">
      <structure></structure>
    </div>
    <div class="editor__module__attr__container">
      <module-attr></module-attr>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import structure from './structure.vue'
import moduleAttr from './module-attr/index.vue'
@Component({
  components: {
    structure,
    moduleAttr
  }
})
export default class MenuLeft extends Vue {

}
</script>
<style scoped lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {
    .editor__menu__left-vertical {
      width: map-get($map: $theme, $key: 'editor__menuLeft-width');
      height: 100%;
      background-color: map-get(
        $map: $theme,
        $key: 'editor__menuLeft-background'
      );
    }
    .editor__strucure__container {
      height: 40%;
    }
    .editor__module__attr__container {
      height: 60%;
    }
  }
}
</style>