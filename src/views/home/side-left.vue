<!--
 * @description: 左侧菜单
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-09-04 09:00:42
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-09-27 16:47:12
 -->
<template>
  <div>
    <el-menu class="side__left__menus"
             text-color="#fff"
             :router="true">
      <el-menu-item v-for="menuItem in menuList"
                    :key="menuItem.path"
                    :index="menuItem.path">{{menuItem.label}}</el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { layoutModule } from '@/store/modules/layout'
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class SideLeft extends Vue {
  menuList = [{
    label: '编辑器',
    path: '/editor'
  }, {
    label: '项目说明',
    path: '/project-document'
  }]
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
