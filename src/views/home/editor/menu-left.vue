<template>
  <div class="editor__menu__left-vertical">
    <div class="menu__left__item"
         draggable
         v-for="menuItem in menuList"
         :key="menuItem.value"
         @dragstart="dragstart($event, menuItem)">{{menuItem.label}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
interface menuItem {
  label: string,
  value: string | number
}
@Component
export default class MenuLeft extends Vue {
  menuList: menuItem[] = [{
    label: 'div',
    value: 'div'
  },
  {
    label: 'p',
    value: 'p'
  },
  {
    label: 'el-button',
    value: 'el-button'
  }]
  dragstart (event: DragEvent, menuItem: menuItem) {
    event.dataTransfer.setData('Text', JSON.stringify(menuItem))
  }
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
      .menu__left__item {
        background-color: map-get(
          $map: $theme,
          $key: 'editor__menuLeft__menuItem-background'
        );
        text-align: center;
        height: map-get($map: $theme, $key: 'editor__menuLeft-width');
        display: flex;
        justify-content: center;
        align-items: center;
        color: map-get($map: $theme, $key: 'editor__menuLeft__menuItem-color');
        &:not(:last-child) {
          border-bottom: 1px
            solid
            map-get($map: $theme, $key: 'editor__menuLeft__menuItem-color');
        }
      }
    }
  }
}
</style>