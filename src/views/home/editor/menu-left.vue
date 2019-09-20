<template>
  <div class="editor__menu__left-vertical">
    <div class="menu__left__item"
         v-for="menuItem in menuList"
         :key="menuItem.value">{{menuItem.label}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
interface menuList {
  label: string,
  value: string | number
}
@Component
export default class MenuLeft extends Vue {
  menuList: menuList[] = [{
    label: 'div',
    value: 'div'
  },
  {
    label: 'p',
    value: 'p'
  }]
}
</script>
<style scoped lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {
    .editor__menu__left-vertical {
      width: 50px;
      background-color: #ebeef5;
      .menu__left__item {
        text-align: center;
        line-height: 50px;
        height: 50px;
        color: #909399;
        &:not(:last-child) {
          border-bottom: 1px solid #909399
        }
      }
    }
  }
}
</style>