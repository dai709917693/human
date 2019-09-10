<!--
 * @description: human
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-09-04 08:47:54
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-09-09 10:13:36
 -->
<template>
  <el-container>
    <el-header class="nav__header">
      <nav-header></nav-header>
    </el-header>
    <el-container class="home__container">
      <el-aside class="side__left">
        <side-left></side-left>
      </el-aside>
      <el-container>
        <el-main>
          <main-content></main-content>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { layoutModule } from '@/store/modules/layout'
import { Component, Prop, Vue } from 'vue-property-decorator'
import sideLeft from './side-left.vue'
import navHeader from './nav-header.vue'
import mainContent from './main-content.vue'


@Component({
  components: {
    sideLeft,
    navHeader,
    mainContent
  }
})
export default class home extends Vue {

}
</script>
<style scoped lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {
    $sideLeft-width: map-get($theme, $key: 'sideLeft-width');
    $sideLeft-collapse-width: map-get($theme, $key: 'sideLeft-collapse-width');
    .home__container {
      position: absolute;
      margin-top: 60px;
      top: 0;
      left: 0;
      bottom: 0;
      padding-left: $sideLeft-collapse-width;
      width: 100%;
    }
    .nav__header {
      height: map-get($map: $theme, $key: 'navHeader-height') !important;
      background-color: map-get($map: $theme, $key: 'navHeader-background');
    }
    .side__left {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: $sideLeft-width !important;
      background-color: map-get($map: $theme, $key: 'sideLeft-background');
      @include collapse-left-to-right(
        $sideLeft-collapse-width - $sideLeft-width
      );
      &:hover {
        @include collapse-left-to-right-show;
      }
    }
  }
}
</style>