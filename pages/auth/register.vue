<template>
  <div class="login-wrapper">
    <el-form label-width="80px" :model="user" ref="loginForm" :rules="rules">
      <el-form-item prop="username">
        <el-input
          placeholder="请输入用户名"
          class="auth-input"
          size="large"
          auto-complete="off"
          v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item hidden prop="smsCode">
        <el-input
          placeholder="验证码"
          class="auth-input"
          size="large"
          auto-complete="off"
          v-model="user.smsCode">
          <span @click="getSMSCode" v-if="!sms.isSend" slot="suffix" class="get-vcode">
            获取验证码
          </span>
          <span v-if="sms.isSend" slot="suffix" class="get-vcode active">
            {{sms.interval}}秒后可获取
          </span>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          class="auth-input"
          size="large"
          auto-complete="off"
          v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请重复输入密码"
          class="auth-input"
          size="large"
          auto-complete="off"
          v-model="user.repassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="login"
          :disabled="isChecking"
          size="large"
          class="btn-block"
          type="primary">
          <i v-if="isChecking" class="el-icon-loading"></i> 注册
        </el-button>
      </el-form-item>
    </el-form>
    <div class="tips">
      <p class="text-center">
        <nuxt-link to="/auth/login">已有账号登录</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "auth-register",
    layout: 'auth',
    head() {
      return {
        title: '注册'
      }
    },
    data() {
      return {
        sms: {
          isSend: false,
          interval: 80,
          counter: 80,
        },
        loginType: 0,
        isChecking: false,
        user: {
          username: '',
          password: '',
          repassword: '',
          smsCode: '1231'
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 6, max: 16, message: '请输入6-16位用户名', trigger: 'blur'},
          ],
          smsCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            //{type: 'number', message: '请输入一个正确的验证码'}
            {min: 4, max: 4, message: '请输入4位短信验证码', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      setInterval(() => {
        if (this.sms.isSend === true) {
          this.sms.interval--;
        }
        if (this.sms.interval <= 0) {
          this.sms.isSend = false;
          this.sms.interval = this.sms.counter;
        }
      }, 1000);

    },
    methods: {
      async getSMSCode() {
        this.sms.isSend = true;
        let res = await this.$api.http.post(`portal/sendSmsCode`, {
          phone: this.user.username
        });
      },
      async login() {
        //validate
        this.$refs['loginForm'].validate(async (valid) => {
          if (!valid) return false;
          this.isChecking = true;
          let res = await this.$store.dispatch('register', this.user);
          this.$notify({
            title: '通知',
            message: res.message,
            type: res.code === this.$api.codes.SUCCESS ? 'success' : 'warning'
          });
          this.isChecking = false;
          if (res.code === this.$api.codes.SUCCESS) {
            return this.$router.replace('/');
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

  .get-vcode {
    margin-right: 5px;
    font-size: 15px;
    cursor: pointer;
    color: $blue-500;
    &.active {
      cursor: default;
      color: $grey-400;
    }
  }
</style>
