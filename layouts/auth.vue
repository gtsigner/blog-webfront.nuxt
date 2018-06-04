<template>
  <div class="auth-view d-flex justify-content-center">
    <div class="auth-box">
      <div class="auth-header">
        <h3 class="text-center">易猿博客</h3>
        <p>记录知识，与她共享。</p>
      </div>
      <nuxt/>
      <p class="text-left mt-4">
        <small>第三方登录：</small>
      </p>
      <div class="auth-partner d-flex justify-content-between">
        <div class="partner-item">
          <img src="https://gold-cdn.xitu.io/v3/static/img/weibo.fa758eb.svg" alt="">
        </div>
        <div class="partner-item">
          <img src="https://gold-cdn.xitu.io/v3/static/img/wechat.e0ff124.svg" alt="">
        </div>
        <div class="partner-item">
          <img src="../assets/icons/429-steam.svg" alt="steam">
        </div>
        <div class="partner-item">
          <img src="../assets/icons/QQ.svg" alt="QQ">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .auth-view {
    text-align: center;
    position: absolute;
    flex: 1 1 auto;
    width: 100%;
    margin-top: 50px;
    .auth-box {
      background: #fff;
      width: 400px;
      padding: 20px;
      align-self: center;
      align-content: center;
      .auth-header {
        h3 {
          font-size: 40px;
          color: $blue-500;
          margin: 0;
          line-height: 80px;
        }
        p {
          color: $blue-500;
        }
        margin-bottom: 40px;
      }
    }
    .auth-partner {
      padding: 0 20px;
      .partner-item {
        cursor: pointer;
        padding: 10px;
        background: $grey-200;
        border-radius: 50%;
        img {
          height: 30px;
          width: 30px;
        }
      }
    }
    .login-type {
      color: $grey-700;
      span {
        cursor: pointer;
      }
    }
  }
</style>
