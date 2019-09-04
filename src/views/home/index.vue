<!--
 * @description: human
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-09-04 08:47:54
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-09-04 09:03:00
 -->
<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container class="container">
      <el-aside width="200px">
        <left-side></left-side>
      </el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import leftSide from './left-side.vue'
@Component({
  components: {
    leftSide
  }
})
export default class home extends Vue {
}
</script>