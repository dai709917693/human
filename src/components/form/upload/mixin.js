export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    /**
     * @description: 表单项值
     */
    value: Array,
    /**
     * @description: 底部提示
     */
    tips: String,
    /**
     * @description: 文件大小限制
     */
    uploadSize: Number,
    /**
     * @description: 上传个数限制
     */
    limit: Number,
    /**
     * @description: 上传路径接口地址
     */
    action: String
  },
  data () {
    return {
      model: [],
      uploadImg: null // 上传的图片显示
    }
  },
  created () {
    /**
     * @description: 初始化表单值
     */
    this.model = this.value
  },
  methods: {
    /**
     * @description: 成功处理
     */
    handleSuccessUpload (res, file, fileList) {
      this.$message.success('上传成功')
      this.$emit('input', fileList)
      this.$emit('change', fileList)
    }
  }
}
