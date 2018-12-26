<template>
  <div class="post-page">
    <div class="container">
      <div class="post-content">
        <div class="post-header d-flex justify-content-between">
          <div class="title-wrapper">
            <h3 class="title">{{post.title}}</h3>
          </div>
          <div class="action-menu d-flex">
            <div class="common-list">
              <span @click="collect" class="cursor-pointer color-primary mr-3">
                <i class="el-icon-star-off"></i> 收藏
              </span>
            </div>
            <div class="self-list" v-if="post._creatorId===user._id">
              <nuxt-link :to="`/post/${post._id}/edit`">
                <i class="el-icon-edit"></i> 编辑
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="content-wrapper">
          <vue-markdown
            class="markdown-body"
            :source="post.content"
            :show="show"
            :html="html"
            :breaks="breaks"
            :linkify="linkify"
            :emoji="emoji"
            :typographer="typographer"
            :toc="toc"
            toc-id="toc"
          ></vue-markdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  head() {
    return {
      title: this.post.title,
      link: [
        {
          rel: "stylesheet",
          href:
            "//cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css"
        }
      ]
    };
  },
  name: "Post",
  components: {
    VueMarkdown
  },
  data() {
    return {
      show: true,
      html: true,
      breaks: true,
      linkify: true,
      emoji: true,
      typographer: true,
      toc: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    postId() {
      return this.$route.params.id;
    }
  },
  created() {},
  /*服务端渲染*/
  async asyncData({ params, redirect, $axios }) {
    const res = await $axios.get(`post/${params.id}/show`);
    if (!res.ok) {
      //如果未找到文章
      return redirect("/404");
    }
    return { post: res.data };
  },
  methods: {
    async loadPost() {},
    async collect() {}
  }
};
</script>

<style scoped lang="scss">
.post-page {
  margin: 1rem;
  .post-content {
    background: #fff;
    padding: 1rem;
  }
  .post-header {
    border-bottom: 1px solid $grey-300;
    padding: 1rem 1rem 1rem;
    line-height: 40px;
    .title {
      line-height: 40px;
    }
  }
  .content-wrapper {
    padding: 2rem 0.5rem;
  }
}
</style>
