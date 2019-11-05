<!--
 * @description: 创建应用中 上传 应用小图标
 * @version: 0.0.1
 * @Author: ma_yanzhao
 * @Date: 2019-07-13 10:55:58
 * @LastEditors: dai_zheng
 * @LastEditTime: 2019-07-19 10:09:21
 -->
<template>
  <el-upload class="avatar-uploader"
             :action="action"
             :show-file-list="false"
             :on-success="handleAvatarSuccessIcon"
             :before-upload="beforeAvatarUploadIcon"
             :on-progress="handleAvatarProgress"
             :on-remove="handleRemoveUpload"
             :on-error="handleAvatarErrorIcon"
             :file-list="model">
    <el-progress v-if="uploadImgLoading"
                 type="circle"
                 :width="progressWidth"
                 :percentage="uploadImgLoadPercent"
                 :status="uploadImgLoadStatus"></el-progress>
    <img v-else-if="uploadImg"
         :src="uploadImg"
         :style="{width:iconWidth,height:iconHeight}"
         class="avatar">
    <i :style="{width:iconWidth,height:iconHeight,lineHeight:iconHeight}"
       v-else
       class="el-icon-plus avatar-uploader-icon"></i>
    <div slot="tip"
         class="upload__tips">{{ tips }}</div>
  </el-upload>
</template>
<script>
import mixin from './mixin'
export default {
  name: 'upload-apply-icon',
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
     * @description: 图标宽度
     */
    iconWidth: String,
    /**
     * @description: 图标高度
     */
    iconHeight: String
  },
  data () {
    return {
      uploadImgLoadPercent: 50, // 图标上传进度
      uploadImgLoading: false, // 图标上传中
      uploadImgLoadStatus: null // 图标上传状态
    }
  },
  computed: {
    progressWidth () {
      return parseInt(this.iconWidth) || 126
    }
  },
  watch: {
    value (v) {
      this.model = v
      if (this.model.length === 0) {
        this.uploadImg = null
      } else {
        // 当有默认值时，初始化显示图片
        v[0].url && (this.uploadImg = v[0].url)
      }
    }
  },
  methods: {
    // 图标上传
    handleAvatarSuccessIcon (res, file, fileList) {
      this.uploadImgLoadPercent = 100
      this.uploadImgLoadStatus = 'success'
      this.uploadImgLoading = false
      this.uploadImg = URL.createObjectURL(file.raw)
      this.model = [file]
      this.handleSuccessUpload(res, file, [file])
    },
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
    handleAvatarProgress (event, file, fileList) {
      this.uploadImgLoadPercent = 50
      this.uploadImgLoadStatus = null
      this.uploadImgLoading = true
    },
    // 删除文件
    handleRemoveUpload (file, fileList) {
      this.$emit('input', fileList)
      this.$emit('change', fileList)
    },
    handleAvatarErrorIcon () {
      this.uploadImgLoadStatus = 'exception'
      this.uploadImgLoading = false
      this.$message.error('上传失败')
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

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
</style>
