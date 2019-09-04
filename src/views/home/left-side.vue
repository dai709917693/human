<!--
 * @description: human
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-09-04 09:00:42
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-09-04 09:13:32
 -->
<template>
  <el-menu default-active="1-4-1"
           class="el-menu-vertical-demo"
           @open="handleOpen"
           @close="handleClose"
           :collapse="isCollapse">
    <el-menu-item index="1-1">选项1</el-menu-item>
  </el-menu>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class leftSide extends Vue {
}
</script>