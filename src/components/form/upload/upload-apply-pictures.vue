<!--
 * @description: 创建应用中 上传 应用介绍
 * @version: 0.0.1
 * @Author: ma_yanzhao
 * @Date: 2019-07-13 10:55:58
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-08-29 13:55:59
 -->
<template>
  <div>
    <el-upload :action="action"
               :limit="limit"
               list-type="picture-card"
               :before-upload="beforeAvatarUploadIcon"
               :on-remove="handleRemoveUpload"
               :on-success="handleSuccessUpload"
               :on-preview="handlePictureCardPreview"
               :on-exceed="handleExceedUpload"
               :file-list="model">
      <i class="el-icon-plus"></i>
      <div slot="tip"
           class="upload__tips">{{ tips }}</div>
    </el-upload>
    <!-- dialogNesting属性代表是否需要dialog嵌套 -->
    <el-dialog width="600px"
               :visible.sync="dialogImgVisible"
               :append-to-body="true">
      <img width="100%"
           :src="uploadImg"
           alt="">
    </el-dialog>
  </div>
</template>
<script>
import mixin from './mixin'
export default {
  name: 'upload-apply-pictures',
  mixins: [mixin],
  props: {
    /**
    * @description: 文件大小限制，KB
    */
    uploadSize: {
      type: Number,
      default: 200
    },
    /**
     * @description: 上传个数限制
     */
    limit: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      dialogImgVisible: false // 模态框显示
    }
  },
  watch: {
    value () {
      this.model = this.value
    }
  },
  methods: {
    beforeAvatarUploadIcon (file) {
      const isIMG = file.type === 'image/jpeg' || file.type === 'image/png'
      var limit = this.uploadSize || 200
      const isLt = file.size / 1024 < limit

      if (!isIMG) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
      }
      if (!isLt) {
        this.$message.error(`上传图片大小不能超过 ${limit}KB!`)
      }
      return isIMG && isLt
    },
    // 删除文件
    handleRemoveUpload (file, fileList) {
      this.$emit('input', fileList)
      this.$emit('change', fileList)
    },
    // 照片墙上传
    handlePictureCardPreview (file) {
      this.uploadImg = file.url
      this.dialogImgVisible = true
    },
    // 超出文件个数限制函数
    handleExceedUpload () {
      this.$message.warning(`只能上传${this.limit}个文件!`)
    }
  }
}
</script>
<style scoped>
.upload__tips {
  margin-top: 6px;
  line-height: 1;
  font-size: 12px;
}
</style>
