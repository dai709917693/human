<!--
 * @description: 左侧菜单
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-09-04 09:00:42
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-09-16 09:11:58
 -->
<template>
  <div>
    <el-menu class="side__left__menus"
             default-active="1-4-1"
             text-color="#fff">
      <el-menu-item index="1-1">选项1</el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { layoutModule } from '@/store/modules/layout'
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class SideLeft extends Vue {

}
</script>
<style scoped lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {
    .side__left__menus {
      background-color: map-get($map: $theme, $key: 'sideLeft-background');
      border-right: none;
      .el-menu-item {
        /**
         * @description: 菜单项选中，移入时切换颜色
         */
        &:hover,
        &:focus {
          background-color: map-get($map: $theme, $key: 'sideLeft-background');
        }
        /**
         * @description: 菜单项点击时
         */
        &.is-active {
          color: #fff;
        }
      }
    }
  }
}
</style>
