<template>
  <div id="login">
    <div class="login-box">
      <div class="login-title">
        <h2>OpenCoder</h2>
        <h2>后台管理系统</h2>
      </div>
      <div class="login-operating-area">
        <a-form :form="form">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="Name"
          >
            <a-input
              v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your name' }]}
        ]"
              placeholder="Please input your name"
            />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="Nickname"
          >
            <a-input
              v-decorator="[
          'nickname',
          {rules: [{ required: checkNick, message: 'Please input your nickname' }]}
        ]"
              placeholder="Please input your nickname"
            />
          </a-form-item>
          <a-form-item
            :label-col="formTailLayout.labelCol"
            :wrapper-col="formTailLayout.wrapperCol"
          >
            <a-checkbox :checked="checkNick" @change="handleChange">Nickname is required</a-checkbox>
          </a-form-item>
          <a-form-item
            :label-col="formTailLayout.labelCol"
            :wrapper-col="formTailLayout.wrapperCol"
          >
            <a-button type="primary" @click="check">Check</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
};
export default {
  name: "login",
  data() {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this)
    };
  },
  methods: {
    check() {
      this.form.validateFields(err => {
        if (!err) {
          console.info("success");
        }
      });
    },
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(["nickname"], { force: true });
      });
    }
  }
};
</script>

<style lang="less">
#login {
  width: 100%;
  height: 100%;
  background-color: #eceef1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
    width: 430px;
    height: 500px;
}

.login-title {
    text-align: center;
    height: 120px;
    background-color: #0E2E5A;
    padding-top: 10px;
}

.login-title h2 {
    font-size: 36px;
    color: #fff;
    line-height: 38px;
}
</style>
