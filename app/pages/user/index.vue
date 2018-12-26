<template>
  <div class="user-page">
    <div class="container">
      <div class="user-wrapper">
        <div class="user-item" v-for="u in users" :key="u._id">
          <div class="user-avatar-wrapper">
            <img class="avatar" :src="u.avatar" alt>
          </div>
          <p>
            <span>
              <span class="count">{{u.counter.follower||0}}</span>粉丝
            </span>
            &nbsp;
            <span>
              <span class="count">{{u.counter.posts||0}}</span>文章
            </span>
          </p>
          <p class="desc">{{u.desc||'该用户太懒了，什么痕迹都没有留下'}}</p>
          <p class="username">{{u.nickname||u.username}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-page",
  head() {
    return {
      title: "用户"
    };
  },
  data() {
    return {
      isLoading: false,
      page: {
        current: 1,
        limit: 20,
        total: 20
      },
      users: []
    };
  },
  methods: {
    async loadUsers() {
      this.isLoading = true;
      let res = await this.$axios.get(`user/list?p=${this.page.current}`);
      this.isLoading = false;
      if (res.ok) {
        this.users = this.users.concat(res.data);
      } else {
      }
    }
  },
  created() {
    this.loadUsers();
  }
};
</script>

<style scoped lang="scss">
.user-wrapper {
  background: #fff;
  margin: 1rem;
  min-height: 700px;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  height: auto;
  flex-wrap: wrap;
  justify-content: flex-start;
  .user-item {
    cursor: pointer;
    text-align: center;
    width: 240px;
    padding: 0.5rem 1rem;
    border: 1px solid $grey-200;
    height: 280px;
    margin: 0 0.5rem 0.5rem;
    transition: 0.288s all;
    &:hover {
      box-shadow: 2px 2px 1px $grey-200;
    }
    .avatar {
      height: 140px;
      width: 140px;
      border-radius: 50%;
      margin-bottom: 1rem;
    }
    p {
      line-height: 30px;
    }
    .desc {
      margin: 0.5rem 0;
      font-size: 12px;
      color: $grey-500;
      line-height: 20px;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .count {
      font-weight: 600;
      margin: 0 2px;
      font-size: 16px;
    }
    .username {
      font-size: 20px;
      line-height: 30px;
    }
  }
}
</style>
