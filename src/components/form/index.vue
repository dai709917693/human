<!--
 * @description: 通过json配置生成表单
 * @version: 0.0.1
 * @Author: dai_zheng
 * @Date: 2019-07-03 09:55:53
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-09-02 16:51:56
 -->
<template>
  <el-form ref="form"
           :model="formData"
           :rules="rules"
           v-bind="formOptions">
    <template v-if="formOptions.inline">
      <form-item v-for="(value, key) in formData"
                 :key="key"
                 :template="handleFormTemplateMode(key)"
                 @change="change(arguments[0], key)"
                 v-model="formData[key]"
                 :prop="key"></form-item>
    </template>
    <el-row v-else
            v-bind="formOptions">
      <template v-for="(value, key) in formData">
        <el-col v-if="handleFormTemplateMode(key).component ? handleAttribute(handleFormTemplateMode(key).component.show, true) : true"
                :span="handleFormTemplateMode(key).component ? handleAttribute(handleFormTemplateMode(key).component.span, 24) : 24"
                :offset="handleFormTemplateMode(key).component ? handleAttribute(handleFormTemplateMode(key).component.offset, 0) : 0"
                :key="key">
          <form-item :ref="'formItem__'+key"
                     :template="handleFormTemplateMode(key)"
                     @change="change(arguments[0], key)"
                     v-model="formData[key]"
                     :prop="key"></form-item>
        </el-col>
      </template>
    </el-row>
    <slot></slot>
  </el-form>
</template>
<script>
import { forEach as _forEach, cloneDeep as _clonedeep } from 'lodash'
import formItem from './form-item'
export default {
  props: {
    /**
     * @description 表单配置
     */
    formOptions: {
      type: Object,
      default: null
    },
    /**
     * @description 表单校验规则
     */
    rules: {
      type: Object,
      default: null
    },
    /**
     * @description 表单模板
     */
    template: {
      type: Object,
      default: null
    }
  },
  components: { formItem },
  data () {
    return {
      /**
       * @description 表单数据
       */
      formData: {}
    }
  },
  watch: {
    template: {
      deep: true,
      handler () {
        this.init()
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.formData = this.template ? _clonedeep(this.template) : {}
      _forEach(this.formData, (value, key) => {
        this.formData[key] = typeof value.value !== 'undefined' ? value.value : ''
      })
    },
    /**
     * @description: 触发form-data-change事件
     * @param {*} v
     * @param {string} key
     * @return: null
     */
    change (v, key) {
      this.$emit('form-data-change', { key, value: v, template: this.template[key] })
    },
    /**
     * @description: 根据表单字段拷贝表单项值
     * @param {string} key
     * @return: null
     */
    copy (key) {
      this.$refs[key][0].$el.getElementsByTagName('input')[0].select()
      document.execCommand('Copy')
    },
    /**
     * @description: 设置表单数据
     * @param {object} data
     * @return: null
     */
    setFormData (data) {
      this.$nextTick(() => {
        _forEach(data, (value, key) => {
          /**
           * @description: 手动触发表单值改变,防止表单动态变化时表单项绑定失效
           */
          this.$refs[`formItem__${key}`][0].changeModel(value)
          this.formData[key] = value
        })
      })
    },
    /**
     * @description: 校验表单
     * @param {function} callback
     * @return: null
     */
    validate (callback) {
      return this.$refs.form.validate(callback)
    },
    /**
     * @description: 清空表单
     * @return: null
     */
    resetFields () {
      return this.$refs.form.resetFields()
    },
    /**
     * @description: 清除验证
     * @param {array | string} props
     * @return: null
     */
    clearValidate (props) {
      return this.$refs.form.clearValidate(props)
    },
    /**
     * @description: 渲染不同表单组件
     * @param {string} key
     * @return: object
     */
    handleFormTemplateMode (key) {
      return this.template[key]
    },
    /**
     * @description: 组件属性默认值
     * @param {*} attribute
     * @param {*} defaultValue
     * @return: *
     */
    handleAttribute (attribute, defaultValue) {
      if (attribute === false || attribute === 0 || attribute === '') {
        return attribute
      }
      return attribute || defaultValue
    }
  }
}
</script>
