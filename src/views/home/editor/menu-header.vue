<template>
  <div class="editor__menu__header-horizontal">
    <div class="menu__header__item"
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
export default class MenuHeader extends Vue {
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
    if (!event) {
      return
    }
    event.dataTransfer.setData('Text', JSON.stringify(menuItem))
  }
}
</script>
<style lang="scss">
@each $theme-className, $theme in $themes {
  $editor__menuHeader-height: map-get(
    $map: $theme,
    $key: 'editor__menuHeader-height'
  );
  .#{$theme-className} {
    .editor__menu__header-horizontal {
      background-color: map-get(
        $map: $theme,
        $key: 'editor__menuHeader-background'
      );
    }
    .menu__header__item {
      box-sizing: border-box;
      float: left;
      background-color: map-get(
        $map: $theme,
        $key: 'editor__menuHeader__menuItem-background'
      );
      text-align: center;
      width: $editor__menuHeader-height;
      height: $editor__menuHeader-height;
      display: flex;
      justify-content: center;
      align-items: center;
      color: map-get($map: $theme, $key: 'editor__menuHeader__menuItem-color');
      border: 1px
        solid
        map-get($map: $theme, $key: 'editor__menuHeader__menuItem-color');
    }
  }
}
</style>