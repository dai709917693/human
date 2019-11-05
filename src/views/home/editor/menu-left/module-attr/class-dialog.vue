<template>
  <el-dialog title="添加类"
             :visible.sync="dialogVisible"
             width="500px"
             @closed="handleClosed">
    <hm-form ref="form"
             :formOptions="formOptions"
             :template="formTpl"></hm-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="handleSure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref } from 'vue-property-decorator'
import { editorModule } from '@/store/modules/editor'
import hmForm from '@/components/form/index.vue'
@Component
export default class ClassDialog extends Vue {
  dialogVisible: boolean = false
  @Ref('form') readonly formComponent !: any
  formOptions = {
    labelWidth: '50px',
    labelPosition: 'right'
  }
  formTpl = {
    className: {
      title: '类名',
      component: {
        name: 'el-input'
      }
    },
    content: {
      title: '内容',
      component: {
        name: 'el-input',
        type: 'textarea',
        rows: 5
      }
    }
  }
  get editorCommonClass () {
    return editorModule.editorCommonClass
  }
  open () {
    this.dialogVisible = true
  }
  handleSure () {
    let formData = (this.formComponent as any).formData
    editorModule.addEditorCommonClass({ name: formData.className, value: formData.content })
    this.dialogVisible = false
  }
  handleClosed () {
    (this.formComponent as any).resetFields()
  }
}
</script>