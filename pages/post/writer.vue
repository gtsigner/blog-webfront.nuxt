<template>
  <div class="post-create">
    <div class="draft-wrapper thin-scroll">
      <p class="title">草稿箱 <i class="el-icon-tickets"></i></p>
      <div class="draft-list list-group">
        <loading v-if="draftLoading"></loading>
        <div v-if="drafts.length===0" class="none-wrapper text-center">
          <p>暂无数据，您可以创建草稿</p>
          <p><i class="el-icon-caret-bottom"></i></p>
        </div>
        <div
          @click="chooseDraft(dt)"
          class="list-group-item"
          :class="{'active':dt._id===post._id}"
          v-for="dt in drafts"
          :key="dt._id">
          <span class="d-title">{{dt.title}}</span>
          <p class="create-date">创建时间：{{ dt.createAt | formatDate }}</p>
        </div>
      </div>
      <div class="text-center mt-2 p-2">
        <p @click="createDrafts" class="create-btn el-button btn-block">
          <i class="el-icon-plus"></i> 创建草稿
        </p>
      </div>
    </div>
    <div class="editor-wrapper">
      <div class="row-1">
        <input
          v-model="post.title"
          placeholder="请输入文章标题"
          type="text"
          class="input-title">
      </div>
      <textarea
        placeholder="请输入文章内容"
        v-model="post.content"
        name=""
        class="input-content content-wrapper thin-scroll"
        id="" cols="30" rows="100"></textarea>
      <div class="tags-wrapper">
        <div class="tag-list">
          <div class="el-tag mr-2" v-for="(t,i) in post.tags" :key="i">
            <span>{{t}}<i @click="removeTag(t)" class="el-icon-close"></i></span>
          </div>
        </div>
        <div class="tag-input-wrapper">
          <input v-model="newTag.tag" placeholder="创建标签" type="text" class="tag-input">
          <button @click="createTag" class="submit-tag">确定</button>
        </div>
      </div>
      <div class="footer-wrapper">
        <div class="left-f">
          <el-select v-model="post._categoryId" placeholder="请选择发布位置">
            <el-option value="个人专栏">个人专栏</el-option>
          </el-select>
        </div>
        <div class="right-f">
          <el-button
            @click="save"
            type="info">保存
          </el-button>
          <el-button
            :disabled="publishing"
            @click="publish"
            type="primary">
            <i class="el-icon-loading" v-if="publishing"></i>发布文章
          </el-button>
        </div>
      </div>
    </div>
    <div v-if="editor.show"
         class="review-wrapper thin-scroll">
      <h3 class="title">{{post.title}}</h3>
      <vue-markdown
        class="markdown-body"
        :source="post.content"
        :show="editor.show"
        :html="editor.html" :breaks="editor.breaks" :linkify="editor.linkify"
        :emoji="editor.emoji" :typographer="editor.typographer" :toc="editor.toc" toc-id="editor.toc">
      </vue-markdown>
    </div>
  </div>
</template>

<script>
  import DayJs from 'dayjs';
  import Loading from '../../components/Loading'
  import {Http, Codes} from '../../plugins/utils/api'
  import VueMarkdown from 'vue-markdown'
  import _ from 'lodash';

  export default {
    name: "create",
    components: {
      Loading, VueMarkdown
    },
    head() {
      return {
        title: '写文章',
        links: [],
        scripts: [],
      }
    },
    middleware: ['base', 'auth'],
    data() {
      return {
        draftLoading: true,
        publishing: false,
        drafts: [],//草稿
        post: {
          _id: '',
          title: '',
          content: '',
          tags: ['Android开发', 'Jenkins'],
          version: '0.0.1',
        },
        newTag: {
          creating: true,
          tag: ''
        },
        editor: {
          show: true,
          html: true,
          breaks: true,
          linkify: true,
          emoji: true,
          typographer: true,
          toc: false
        }
      }
    },
    methods: {
      async save() {

      },
      /*发布草稿*/
      async publish() {
        this.publishing = true;
        let res = await Http.put(`post/${this.post._id}/publish`, this.post);

        this.publishing = false;
      },
      async remove() {

      },
      //创建标签
      async createTag() {
        //判断长度
        let tagLen = this.newTag.tag.length;
        if (tagLen <= 0 || tagLen > 30) {
          this.$message.error('标签长度0~30位字符');
          return false;
        }
        //判断postTags
        let pTagCount = this.post.tags.length;
        if (pTagCount > 5) {
          this.$message.error('最多添加3个标签');
          return false;
        }
        //判断重复
        if (_.findIndex(this.post.tags, (x) => (x === this.newTag.tag)) !== -1) {
          this.$message.error('已经存在的标签');
          return false;
        }
        this.newTag.creating = true;
        let res = await Http.post(`tag/create`, this.newTag);
        this.post.tags.push(this.newTag.tag);
        this.newTag.tag = '';
        this.newTag.creating = false;
      },
      //从Post里面移除一个Tag
      removeTag(tag) {
        let ix = _.findIndex(this.post.tags, (x) => (x === tag));
        this.post.tags.splice(ix, 1);
      },
      /**
       * 选择草稿
       * @param draft
       * @returns {Promise<void>}
       */
      async chooseDraft(draft) {
        if (false === _.isArray(draft.tags)) {
          draft.tags = ['默认标签'];
        }
        this.post = {...draft};
      },
      /**
       * 创建一个草稿
       * @returns {Promise<void>}
       */
      async createDrafts() {
        let draft = {
          title: DayJs().format('YYYY-MM-DD'),
          createAt: DayJs().format('YYYY-MM-DD HH:mm')
        };
        //创建一个草稿
        draft = await Http.post(`posts/create`, {
          published: false,
          ...draft
        });
        this.loadDrafts();
      },
      /**
       * 获取草稿
       * @returns {Promise<void>}
       */
      async loadDrafts() {
        this.draftLoading = true;
        //获取草稿箱
        let drafts = await Http.get(`posts/drafts`);
        this.drafts = [...drafts];
        if (drafts.length > 0) {
          this.chooseDraft(drafts[0]);
        } else {
          //如果没有的话创建一个
          await this.createDrafts();
          this.loadDrafts();
        }
        this.draftLoading = false;
      }
    },
    created() {
      this.loadDrafts();
    }
  }
</script>

<style scoped lang="scss">
  .post-create {
    margin: 1rem 1rem;
    display: flex;
    flex-direction: row;
    position: fixed;
    width: 100%;
    bottom: 0;
    top: 65px;
  }

  .draft-wrapper {
    width: 300px;
    background: #fff;
    padding: 0 0 10px;
    overflow-y: auto;
    .title {
      font-size: 20px;
      line-height: 30px;
      padding: 1rem 2rem;
      text-align: left;
    }
    .create-btn {
      text-align: center;
      cursor: pointer;
      font-size: 16px;
      &:hover {
        color: $blue-500;
      }
    }
    .draft-list {
      .list-group-item {
        border-right: 0;
        border-left: 0;
        border-radius: 0;
        cursor: pointer;
        line-height: 50px;
        border-left: 8px solid transparent;
        transition: .25s all;
        &:hover, &.active {
          background: transparent;
          color: #000;
          border-bottom: 1px solid rgba(0, 0, 0, .125);
          border-top: 1px solid rgba(0, 0, 0, .125);
          border-radius: 0;
        }
        &:hover {
          background: $grey-50;
        }
        &.active {
          border-left: 8px solid $blue-500;
        }
        .d-title {
          font-size: 18px;
        }
        .create-date {
          line-height: 15px;
          font-size: 14px;
          color: $grey-600;
        }
      }

    }
    .none-wrapper {
      color: $grey-500;
    }
  }

  .editor-wrapper {
    margin-left: 1rem;
    background: #fff;
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    .content-wrapper {
      margin: 1rem 0;
      flex: 1 1 auto;
      flex-direction: column;
      overflow-y: auto;
    }
    .input-title {
      width: 100%;
      line-height: 50px;
      border: none;
      font-size: 20px;
      padding: 0 1rem;
      border-bottom: 1px solid $grey-200;
    }
    .input-content {
      width: 100%;
      height: 100%;
      display: block;
      flex: auto;
      padding: 0 1rem;
      border: none;
      border-bottom: 1px solid $grey-200;
      resize: none;
    }
    .footer-wrapper {
      border-top: 1px solid $grey-200;
      padding-top: 1rem;
      display: flex;
      flex: none;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .tags-wrapper {
    height: 50px;
    flex: none;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    .tag-list {
      display: flex;
      width: 100%;
      flex-direction: row;
    }
    .tag-input {
      border: none;
      border-bottom: 1px solid $grey-200;
      padding: 5px;
      width: 160px;
      flex: none;
      text-align: left;
    }
    .tag-input-wrapper {
      position: relative;
      .submit-tag {
        position: absolute;
        right: 0;
        border: 1px solid $grey-200;
        background: $blue-500;
        color: #fff;
        cursor: pointer;
        line-height: 28px;
      }
    }
  }

  .review-wrapper {
    flex: 1;
    margin: 0 1rem;
    background: #fff;
    padding: 1rem;
    overflow-y: auto;
    &.active {

    }
    .title {
      line-height: 50px;
      border-bottom: 1px solid $grey-200;
    }
  }
</style>
