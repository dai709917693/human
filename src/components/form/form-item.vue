<!--
 * @description: json项生成的表单项
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-07-08 16:49:11
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-08-14 15:14:46
 -->

<template>
  <el-form-item ref="formItem"
                :label="title"
                v-bind="template"
                :prop="prop">
    <div v-if="template.component.name === 'text'">{{model}}</div>
    <el-input v-else-if="(!template.component) ||((!template.component.name) && (!template.component.render)) || template.component.name === 'el-input'"
              v-model="model"
              :placeholder="placeholder"
              v-bind="template.component"
              @change="change">
    </el-input>
    <el-input-number class="widthFull"
                     v-else-if="template.component.name === 'el-input-number'"
                     v-model="model"
                     v-bind="template.component"
                     @change="change">
    </el-input-number>
    <el-radio-group v-else-if="template.component.name === 'el-radio'"
                    v-model="model"
                    v-bind="template.component"
                    @change="change">
      <template v-if="template.component.buttonMode">
        <el-radio-button v-for="option in template.component.options"
                         :key="option.value"
                         :label="option.value">
          {{option.label}}
        </el-radio-button>
      </template>
      <template v-else>
        <el-radio v-for="option in template.component.options"
                  :key="option.value"
                  :label="option.value">
          {{option.label}}
        </el-radio>
      </template>
    </el-radio-group>
    <el-checkbox-group v-else-if="template.component.name === 'el-checkbox'"
                       v-model="model"
                       v-bind="template.component"
                       @change="change">
      <template v-if="template.component.buttonMode">
        <el-checkbox-button v-for="option in template.component.options"
                            :key="option.value"
                            :label="option.value">
          {{option.label}}
        </el-checkbox-button>
      </template>
      <template v-else>
        <el-checkbox v-for="option in template.component.options"
                     :key="option.value"
                     :label="option.value">
          {{option.label}}
        </el-checkbox>
      </template>
    </el-checkbox-group>
    <el-select class="widthFull"
               v-else-if="template.component.name === 'el-select'"
               v-model="model"
               :placeholder="placeholder"
               v-bind="template.component"
               @change="change">
      <el-option v-for="option in template.component.options"
                 :key="option.value"
                 v-bind="option">
      </el-option>
    </el-select>
    <el-cascader v-else-if="template.component.name === 'el-cascader'"
                 class="widthFull"
                 v-model="model"
                 :placeholder="placeholder"
                 v-bind="template.component"
                 @change="change">
    </el-cascader>
    <el-switch v-else-if="template.component.name === 'el-switch'"
               v-model="model"
               v-bind="template.component"
               @change="change">
    </el-switch>
    <el-slider v-else-if="template.component.name === 'el-slider'"
               v-model="model"
               v-bind="template.component"
               @change="change">
    </el-slider>
    <el-time-select v-else-if="template.component.name === 'el-time-select'"
                    class="widthFull"
                    v-model="model"
                    v-bind="template.component"
                    @change="change">
    </el-time-select>
    <el-time-picker v-else-if="template.component.name === 'el-time-picker'"
                    v-model="model"
                    v-bind="template.component"
                    @change="change">
    </el-time-picker>
    <el-date-picker v-else-if="template.component.name === 'el-date-picker'"
                    class="widthFull"
                    v-model="model"
                    v-bind="template.component"
                    @change="change">
    </el-date-picker>
    <el-rate class="form-rate-middle"
             v-else-if="template.component.name === 'el-rate'"
             v-model="model"
             v-bind="template.component"
             @change="change">
    </el-rate>
    <el-color-picker v-else-if="template.component.name === 'el-color-picker'"
                     v-model="model"
                     v-bind="template.component"
                     @change="change">
    </el-color-picker>
    <upload-apply-icon v-else-if="template.component.name === 'upload-apply-icon'"
                       v-model="model"
                       v-bind="template.component"
                       @change="change"></upload-apply-icon>
    <upload-apply-pictures v-else-if="template.component.name === 'upload-apply-pictures'"
                           v-model="model"
                           v-bind="template.component"
                           @change="change"></upload-apply-pictures>
    <render-custom-component v-else-if="template.component.name"
                             v-model="model"
                             @change="change"
                             :component-name="template.component.name"
                             :props="template.component.props ? template.component.props : null">
    </render-custom-component>
    <render-component v-else-if="template.component.render"
                      :render-function="template.component.render"
                      :scope="model">
    </render-component>
  </el-form-item>
</template>
<script>
// 上传图标
import uploadApplyIcon from './upload/upload-apply-icon'
// 上传图册列表
import uploadApplyPictures from './upload/upload-apply-pictures'
import renderComponent from './renderComponent.vue'
import renderCustomComponent from './renderCustomComponent.vue'
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    /**
     * @description: 表单项模板
     */
    template: {
      type: Object,
      required: true,
      default: null
    },
    /**
     * @description: 表单项字段
     */
    prop: {
      type: String,
      required: true,
      default: null
    },
    /**
     * @description: 表单项数据绑定值
     */
    value: null
  },
  components: {
    uploadApplyIcon,
    uploadApplyPictures,
    renderComponent,
    renderCustomComponent
  },
  data () {
    return {
      /**
       * @description: 表单项数据
       */
      model: null
    }
  },
  computed: {
    title () {
      return this.template.title ? `${this.template.title}:` : null
    },
    placeholder () {
      let tip = '请输入'
      switch (this.template.component.name) {
        case 'el-input':
          tip = '请输入'
          break
        case 'el-select':
        case 'el-cascader':
          tip = '请选择'
          break
      }
      if (this.template.component.disabled) {
        return ''
      } else {
        return typeof this.template.component.placeholder !== 'undefined'
          ? this.template.component.placeholder
          : `${tip}${this.template.title || ''} `
      }
    }
  },
  watch: {
    value (v) {
      this.model = v
    }
  },
  created () {
    this.model = this.value
  },
  methods: {
    /**
     * @description: element表单项值被改变时，同步修改父元素表单项绑定值并触发父元素change事件
     * @param {any} v
     * @return: null
     */
    change (v) {
      this.$emit('input', v)
      this.$emit('change', v)
      // 清除验证提示
      this.$refs.formItem.clearValidate()
    },
    /**
     * @description: 手动触发model值改变
     */
    changeModel (v) {
      this.model = v
    }
  }
}
</script>
<style lang="scss" scoped>
.widthFull {
  width: 100%;
}
.el-checkbox {
  vertical-align: middle;
}
</style>
<style lang="scss">
.form-rate-middle {
  .el-rate__icon {
    line-height: 40px;
  }
  .el-rate__decimal {
    line-height: 40px;
  }
}
</style>
