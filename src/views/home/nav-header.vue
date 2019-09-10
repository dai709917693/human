<!--
 * @description: 导航头
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-09-09 08:45:18
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-09-09 08:47:30
 -->
<template>
  <div class="nav__header__container">
    <h3 class="nav__header__brand">Nav Header</h3>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class navHeader extends Vue {
}
</script>
<style scoped lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {
    .nav__header__container {
      height: 100%;
      line-height: map-get($map: $theme, $key: 'navHeader-height');
      color: map-get($map: $theme, $key: 'navHeader-color');
    }
    .nav__header__brand {
      font-size: map-get($map: $theme, $key: 'navHeader-brand-fontSize');
      margin: 0;
    }
  }
}
</style>
