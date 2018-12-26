<template>
  <div class="body-box">
    <div class="index-page container">
      <div class="card page-content">
        <div class="blog-container">
          <div class="filter-header">
            <div class="d-flex justify-content-between">
              <ul class="nav">
                <li class="nav-item" v-for="(ft,i) in filters" :key="i">
                  <div
                    :class="{'active':ft.key===filter}"
                    @click="filter=ft.key"
                    class="nav-link cursor-pointer"
                  >{{ft.name}}</div>
                </li>
              </ul>
              <ul class="nav">
                <li class="nav-item">
                  <a class="nav-link active" href="#">点赞最多</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">评论最多</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">评分最高</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="post-list-wrapper">
            <post-item
              @click.native="view(post)"
              v-for="post in posts"
              :post="post"
              :key="post._id"
            ></post-item>
            <no-ssr>
              <infinite-loading ref="loadMore" @infinite="loadMoreHandle"></infinite-loading>
            </no-ssr>
          </div>
        </div>
      </div>
      <div style="display: none" class="card navigation">
        <div class="nav-widget"></div>
        <div class="nav-widget"></div>
        <div class="nav-widget"></div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import Loading from "../components/Loading";
import PostItem from "../components/post/Item";
import qs from "qs";
import InfiniteLoading from "vue-infinite-loading";

export default {
  head() {
    return { title: "首页" };
  },
  data() {
    return {
      isLoading: false,
      filter: "star",
      filters: [
        { name: "最热", key: "star" },
        { name: "最新", key: "createAt" },
        { name: "推荐", key: "recommend" }
      ],
      posts: [],
      page: {
        p: 0,
        limit: 10
      }
    };
  },
  components: { Loading, InfiniteLoading, PostItem },
  activated() {},
  watch: {
    filter(n, o) {
      this.page.p = 0;
      this.posts = [];
      //重置
      this.$refs.loadMore.$emit("$InfiniteLoading:reset");
    }
  },
  computed: {
    games() {
      return this.$store.state.games;
    },
    currentGame() {
      return this.$store.state.currentGame;
    }
  },
  methods: {
    async loadMoreHandle($state) {
      this.isLoading = true;
      this.page.p++;
      let res = await this.$axios.get(
        "posts?" + qs.stringify({ filter: this.filter, ...this.page })
      );
      let posts = [];
      if (res.ok) {
        posts = res.data;
      }
      $state.loaded();
      let itemCount = posts.length;
      if (itemCount !== this.page.limit) {
        $state.complete();
      }
      this.posts = this.posts.concat(posts);
      this.isLoading = false;
    },
    view(post) {
      //return window.open(`/post/${post._id}/view`);
      return this.$router.push(`/post/${post._id}/view`);
    },
    async loadPosts() {}
  },
  mounted() {
    this.loadPosts();
  }
};
</script>

<style scoped lang="scss">
.filter-header {
  border-bottom: 1px solid $grey-100;
  padding: 0.5rem;
  .nav {
    .nav-link {
      color: $grey-600;
      padding: 0.3rem 1rem;
      border-right: 1px solid $grey-100;
      &.active {
        color: $blue-500;
      }
    }
  }
}

.index-page {
  display: flex;
  margin-top: 1rem;
  .card {
    background: #fff;
    min-height: 700px;
    border: none;
    border-radius: 0;
  }
  .card.navigation {
    width: 240px;
    flex: none;
    background: transparent;
    letter-spacing: 0.5px;
    .nav-widget {
      min-height: 240px;
      background: #fff;
      margin-bottom: 1rem;
    }
  }
  .page-content {
    flex: auto;
    margin: 0 1rem;
  }
}
</style>
