<template>
  <el-tabs class="editor__property"
           type="border-card">
    <el-tab-pane label="组件属性">
      <hm-form :formOptions="formOptions"
               :template="compFormTpl"
               @form-data-change="compFormChange"></hm-form>
    </el-tab-pane>
    <el-tab-pane label="原生属性">
      <hm-form :formOptions="formOptions"
               :template="nativeFormTpl"
               @form-data-change="nativeFormChange"></hm-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
import { forEach as _forEach } from 'lodash'
import { editorModule, treeData } from '@/store/modules/editor'
import { Component, Prop, Vue } from 'vue-property-decorator'
let options: any = {
  'boolean': {
    component: {
      name: 'el-select',
      options: [{ value: true, label: 'true' }, { value: false, label: 'false' }]
    }
  },
  'string': {
    component: {
      name: 'el-input'
    }
  },
  'undefined': {
    component: {
      name: 'el-input'
    }
  }
}
@Component
export default class EditorProperty extends Vue {
  formOptions = {
    labelWidth: '100px',
    labelPosition: 'right'
  }
  nativeFormTpl = {
    className: {
      title: '类',
      component: {
        name: 'el-input'
      }
    },
    style: {
      title: '样式',
      component: {
        name: 'el-input'
      }
    }
  }
  get compFormTpl () {
    let template: any = {}
    if (this.editorCurrentData && this.editorCurrentData.vnode && this.editorCurrentData.vnode.componentInstance) {
      let compProperty = this.editorCurrentData.vnode.componentInstance.$props
      _forEach(compProperty, (value, key) => {
        let option = options[typeof value]
        template[key] = {
          title: key,
          value: value,
          ...option
        }
      })
    }
    return template
  }
  get editorCurrentData () {
    return editorModule.editorCurrentData
  }

  /**
   * @description: 重绘页面
   */
  repaint () {
    editorModule.repaint()
  }
  /**
   * @description: 组件属性改变
   */
  compFormChange ({ key, value }: { key: string, value: any }) {
    this.editorCurrentData && (this.editorCurrentData.compProps[key] = value)
    this.repaint()
  }
  nativeFormChange ({ key, value }: { key: string, value: any }) {
    this.editorCurrentData && (this.editorCurrentData.nativeProps[key] = value)
    this.repaint()
  }
}
</script>
<style lang="scss">
@each $theme-className, $theme in $themes {
  .#{$theme-className} {
    .editor__property {
      height: 100%;
      display: flex;
      flex-direction: column;
      .el-tabs__content {
        flex: 1;
        overflow: auto;
      }
    }
  }
}
</style>
