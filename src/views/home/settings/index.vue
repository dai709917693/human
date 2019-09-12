<!--
 * @description: human
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-09-11 08:52:42
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-09-12 09:30:16
 -->
<template>
  <div>
    <el-button class="setting__visibility__button"
    :class="sideRightVisible ? 'setting__visibility__button-inside' : 'setting__visibility__button-outside'"
               type="info"
               icon="el-icon-s-tools"
               @click="handleVisibility"></el-button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class settings extends Vue {
  @Prop(Boolean) sideRightVisible!: boolean
  handleVisibility () {
    this.$emit('update:sideRightVisible', !this.sideRightVisible)
  }
}
</script>
<style scoped lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {
    .setting__visibility__button {
      position: absolute;
      left: 0;
      top: 10px;
    }
    .setting__visibility__button-outside {
      @include collapse-left-to-right;
    }
    .setting__visibility__button-inside {
      @include collapse-back-to-original;
    }
  }
}
</style>
