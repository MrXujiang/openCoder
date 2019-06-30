<template>
    <div class="up-laoder-box">
        <el-upload
            class="uploader"
            :action="action"
            ref="upload"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleOnChange"
            :before-upload="beforeUpload">
            <img v-if="imageUrl" :src="imageUrl" class="pic">
            <i v-else class="el-icon-plus uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
export default {
    props: {
        action: String,
        imgUrl: String   // 接受图片绝对地址
    },
    data() {
      return {
        imageUrl: this.imgUrl || '',
        value: null
      };
    },
    created() {

    },
    watch: {
        imgUrl(newValue, oldValue) {
            if(newValue !== oldValue) {
                this.imageUrl = newValue;
            }
        }
    },
    methods: {
      // 上传成功的操作
      handleSuccess(res, file) {
        
      },

      handleOnChange(file, fileList) {
          let fileReader = new FileReader();
            // 读取完成触发的事件
            fileReader.onload = () => {
                this.imageUrl = fileReader.result;
            }
            fileReader.readAsDataURL(file.raw);
            // 如果不支持分布上传，将file数据传递给vaule
            this.value = file.raw;
      },

      // 如果不支持分布上传，在父组件中可手动上获取的file数据，类似submitUpload()方法
      getFileData() {
          return this.value
      },

      // 上传之前的验证
      beforeUpload(file) {
        
      },

      // 删除上一次上传未提交的文件
      deleteDile() {
        this.$refs.upload.clearFiles();
      },

      // 手动上传，在父组件中手动触发该方法提交，父组件使用ref来触发子组件的方法this.$refs.upload.submitUpload()
      submitUpload() {
        this.$refs.upload.submit();
      }
    }
}
</script>

<style lang="stylus">
.uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.uploader .el-upload:hover {
    border-color: #409EFF;
}
.uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.pic {
    width: 178px;
    height: 178px;
    display: block;
}
</style>


