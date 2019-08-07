<template>
  <div id="login">
    <div class="login-box">
      <div class="login-title">
        <h2>OpenCoder</h2>
        <h2>后台管理系统</h2>
      </div>
      <div class="login-operating-area">
        <a-form :form="form">
          <a-form-item :wrapper-col="formItemLayout.wrapperCol">
            <a-input
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入用户名' }]}
              ]"
              placeholder="请输入用户名"
            />
          </a-form-item>
          <a-form-item :wrapper-col="formItemLayout.wrapperCol">
            <a-input
              v-decorator="[
                'nickname',
                {rules: [{ required: true, message: '请输入密码' }]}
              ]"
              placeholder="请输入密码"
            />
          </a-form-item>
          <a-form-item :wrapper-col="formTailLayout.wrapperCol">
            <a-button class="login-form-button" type="primary" @click="check">登陆</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
const formItemLayout = {
  wrapperCol: { span: 12, offset: 6 }
};
const formTailLayout = {
  wrapperCol: { span: 12, offset: 6 }
};
export default {
  name: "login",
  data() {
    return {
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

<style lang="less" scoped>
#login {
  width: 100%;
  height: 100%;
  background-color: #eceef1;
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  border-radius: 0px;
}

.login-box {
  width: 430px;
  height: 500px;
}

.login-title {
  text-align: center;
  height: 120px;
  background-color: #0e2e5a;
  padding-top: 10px;
}

.login-title h2 {
  font-size: 36px;
  color: #fff;
  line-height: 38px;
}

.login-operating-area {
  background-color: #fff;
  padding: 50px 0 50px 0;
}

.login-box .login-form-button {
  width: 100%;
  border-radius: 0px;
  background-color: #0e2e5a;
}
</style>
