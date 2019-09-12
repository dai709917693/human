<!--
 * @description: human
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-09-04 08:47:54
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-09-12 09:25:13
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
      <el-aside class="side__right"
                :class="sideRightVisible ? 'side__right-show' : 'side__right-hide'">
        <settings :sideRightVisible.sync="sideRightVisible"></settings>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { layoutModule } from '@/store/modules/layout'
import { Component, Prop, Vue } from 'vue-property-decorator'
import sideLeft from './side-left.vue'
import navHeader from './nav-header.vue'
import mainContent from './main-content.vue'
import settings from './settings/index.vue'

@Component({
  components: {
    sideLeft,
    navHeader,
    mainContent,
    settings
  }
})
export default class home extends Vue {
  sideRightVisible: boolean = false
  visibilitySideRightSet () {
    this.sideRightVisible = !this.sideRightVisible
  }
}
</script>
<style scoped lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {
    $sideLeft-width: map-get(
      $map: $theme,
      $key: 'sideLeft-width'
    );
    $sideLeft-collapse-width: map-get(
      $map: $theme,
      $key: 'sideLeft-collapse-width'
    );
    $sideRight-width: map-get(
      $map: $theme,
      $key: 'sideRight-width'
    );

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
        @include collapse-back-to-original;
      }
    }
    .side__right {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: $sideRight-width !important;
      background-color: map-get($map: $theme, $key: 'sideRight-background');
      overflow: initial;
    }
    .side__right-hide {
      @include collapse-right-to-left;
    }
    .side__right-show {
      @include collapse-back-to-original;
    }
  }
}
</style>