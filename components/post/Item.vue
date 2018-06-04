<template>
  <div class="post-item">
    <div class="post-item-wrapper d-flex">
      <div class="flex-fill post-content">
        <div class="line-user">
          <span class="badge badge-danger">置顶</span>
          *
          <span class="badge badge-danger">{{post.creator.nickname||post.creator.username}}</span>
          *
          <span class="badge badge-danger">2分钟前</span>
          *
          <span class="badge badge-danger">{{post.tags}}</span>
        </div>
        <div class="line-title">
          <span class="title">{{post.title}}</span>
        </div>
        <div class="line-desc">
          <span>发布于2天前</span>
        </div>
      </div>
      <div class="img-wrapper">
        <div class="img-box">
          <img class="img-thumbnail" src="/images/pubg.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Item",
    props: {
      post: {}
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  .post-item {
    cursor: pointer;
    min-height: 100px;
    border-bottom: 1px solid rgba(178, 186, 194, .15);
    &:hover {
      background: #f9fafd;
    }
    &:hover .line-title {
      color: #000;
    }
    .line-title {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 50px;
    }
    .post-content {
      padding: 1rem 1rem;
    }
    .img-wrapper {
      padding: 1rem;
      width: 10rem;
      flex: none;
      flex-direction: column;
      .img-box {
        height: 100%;
        flex: auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
