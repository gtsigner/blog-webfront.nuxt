<template>
  <div class="login-wrapper">
    <el-form label-width="80px" :model="user" ref="loginForm" :rules="rules">
      <el-form-item prop="username">
        <el-input
          placeholder="请输入用户名 / 邮箱 / 手机号"
          class="auth-input"
          size="large"
          auto-complete="off"
          v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          class="auth-input"
          size="large"
          auto-complete="off"
          v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="login"
          :disabled="isChecking"
          size="large"
          class="btn-block"
          type="primary">
          <span>
            <i v-if="isChecking" class="el-icon-loading"></i> 登录
          </span>
        </el-button>
      </el-form-item>
    </el-form>
    <div class="tips d-flex justify-content-between">
      <div>没有账号?
        <nuxt-link to="/auth/register">注册</nuxt-link>
      </div>
      <nuxt-link to="/auth/reset-password">忘记密码?</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "auth-login",
    layout: 'auth',
    head() {
      return {
        title: '登录'
      }
    },
    data() {
      return {
        loginType: 0,
        isChecking: false,
        user: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    watch: {},
    methods: {
      async login() {
        //validate
        this.$refs['loginForm'].validate(async (valid) => {
          if (valid) {
            this.isChecking = true;
            let res = await this.$store.dispatch('login', this.user);
            this.$notify({
              title: '登录通知',
              message: res.message,
              type: res.code === this.$api.codes.SUCCESS ? 'success' : 'error'
            });
            this.isChecking = false;
            if (res.code === this.$api.codes.SUCCESS) {
              return this.$router.replace('/');
            }
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .tips {
    font-size: 15px;
  }
</style>
