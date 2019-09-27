<template>
  <div class="
       editor__menu__right-vertical"></div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
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
  }
}
</style>