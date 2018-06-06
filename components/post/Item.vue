<template>
  <div class="post-item">
    <div class="post-item-wrapper d-flex">
      <div class="flex-fill post-content">
        <div class="line-user d-flex justify-content-between">
          <div class="base-wrapper">
            <img class="avatar" :src="post.creator.avatar" alt="">
            <span class="badge badge-danger mr-2 ml-2">{{post.creator.nickname||post.creator.username}}</span>
            <span class="star">
            <i class="el-icon-star-on"></i> {{post.counter.star}}
          </span>
            <div class="tags ml-3">
              <el-tag size="small mr-2" v-if="post.position">置顶</el-tag>
              <el-tag size="small" class="el-tag mr-2" v-for="(t,i) in post.tags" :key="i">{{t}}</el-tag>
            </div>
          </div>
          <div class="right-action">
            <span class="star" @click="star"><i class="el-icon-star-off"></i><small>Star</small></span>
          </div>
        </div>
        <div class="line-title">
          <span class="title">{{post.title}}</span>
        </div>
        <div class="line-desc">
          {{post.desc}}
        </div>
      </div>
      <div class="img-wrapper">
        <div class="img-box">
          <img v-if="post.pics.length>0" class="img-thumbnail" :src="post.pics[0]" alt="">
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
    },
    methods: {
      async star(e) {
        e.stopPropagation();
      }
    }
  }
</script>

<style scoped lang="scss">
  .post-item {
    cursor: pointer;
    min-height: 100px;
    border-bottom: 1px solid $grey-200;
    &:hover {
      background: #f9fafd;
    }
    &:hover .line-title {
      color: #000;
    }
    .line-user {
      .avatar {
        height: 30px;
        width: 30px;
      }
      line-height: 30px;
      * {
        display: inline-block;
      }
      .right-action {
        .star {
          font-size: 20px;
        }
      }
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
    .line-desc {
      height: 30px;
      display: flex;
    }
  }
</style>
