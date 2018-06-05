<template>
  <div class="view-container">
    <div class="nav-container">
      <div class="nav-wrapper ">
        <div class="container d-flex justify-content-between">
          <nav class="nav nav-bar oeygame-bar">
            <nuxt-link class="nav-logo" to="/">
              <img src="" alt="">
            </nuxt-link>
            <nuxt-link class="nav-link" :to="{name:'index'}">首页</nuxt-link>
            <nuxt-link class="nav-link" :to="{name:'user'}">用户</nuxt-link>
            <nuxt-link class="nav-link" to="/posts/book">专栏</nuxt-link>
            <nuxt-link class="nav-link" to="/study">课程</nuxt-link>
            <nuxt-link class="nav-link" to="/about">关于</nuxt-link>
          </nav>
          <nav v-if="!isAuth" class="nav nav-bar oeygame-bar">
            <nuxt-link class="nav-link" to="/auth/login">登录</nuxt-link>
            <nuxt-link class="nav-link" to="/auth/register">注册</nuxt-link>
          </nav>
          <nav v-if="isAuth" class="nav nav-bar oeygame-bar user-bar">
            <nuxt-link to="/post/writer" class="nav-link">写文章</nuxt-link>
            <div class="nav-link cursor-pointer avatar-box">
              <el-dropdown trigger="click">
                <div class="el-dropdown-link avatar-link">
                  <img :src="user.avatar" class="avatar" alt="">
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><i class="el-icon-printer"> </i> 我的主页</el-dropdown-item>
                  <el-dropdown-item><i class="el-icon-setting"> </i> 设置</el-dropdown-item>
                  <el-dropdown-item @click.native="logout">
                    <i class="el-icon-location"> </i> 注销退出
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <div class="main-body">
      <nuxt/>
    </div>
  </div>
</template>
<script>
  export default {
    created() {

    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      isAuth() {
        return this.$store.state.authenticated;
      }
    },
    methods: {
      async logout() {
        await this.$store.dispatch('logout');
      }
    }
  }
</script>
<style lang="scss">
  .nav-container {
    background: #fff;
  }

  .nav-wrapper {
    position: sticky;
    top: 0;
    z-index: 501;
    background: #fff;
    line-height: 40px;
    box-shadow: 0 2px 2px #eee;

  }

  .oeygame-bar {
    .nav-link {
      color: $grey-600;
      font-size: 18px;
      line-height: 50px;
      &:hover, &.active {
        color: $blue-500;
      }
    }
    .nuxt-link-exact-active {
      color: $blue-500;
    }
  }

  .user-bar {
    .avatar-box {
      line-height: 0;
      padding: 10px 5px;
      overflow: hidden;
    }
    .avatar-link {
      line-height: 0;
    }
    .avatar {
      height: 45px;
      width: 45px;
      border-radius: 50%;
    }
  }
</style>
