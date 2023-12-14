<template>
  <div class="articles">
    <article v-for="item in blogList" :key="item.uid">
      <h3 @click="toArticleDetailHandle(item.id)">{{ item.title }}</h3>
      <div class="info-box">
        <!--    摘要      -->
        <p
          class="content"
          v-html="item.content"
          v-lazy-container="{ selector: 'img' }"
        ></p>

        <ul class="infoList">
          <!--    作者        -->
          <li class="infoItem" v-if="item.author.name">
            <svg-icon icon-class="author"></svg-icon>
            <span>{{ item.author.name }}</span>
          </li>

          <!--    创建时间        -->
          <li class="infoItem">
            <svg-icon icon-class="clock"></svg-icon>
            <span>{{ formDataFn(item.createTime) }}</span>
          </li>

          <!--    创建时间        -->
          <li class="infoItem">
            <svg-icon icon-class="comment"></svg-icon>
            <span>{{ item.comentCount }}</span>
          </li>
        </ul>
      </div>
    </article>

    <div v-if="hasMore" class="load-more-container">
      <el-button
        @click="loadMoreHandle"
        type="primary"
        :loading="isShowLoading"
      >
        查看更多
      </el-button>
    </div>

    <div v-else class="no-more-container">
      <el-button type="info" disabled>已加载全部博客</el-button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Articles",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    blogList: {
      type: Array,
      default: () => [],
    },
    isShowLoading: false, // 当用户点击查看更多的时候，把按钮转变为加载形态
  },
  data() {
    return {};
  },
  computed: {
    // 判断当前数组的长度和总的博客数量大小关系
    hasMore() {
      return this.blogList.length < this.total;
    },
  },
  mounted() {
  },
  methods: {
    // 把momentId传给父组件
    toArticleDetailHandle(momentId) {
      this.$emit("toArticleDetailHandle", momentId);
    },
    loadMoreHandle() {
      this.$emit("loadMoreHandle");
    },
    // 用于返回发布时间距离现在多久
    formDataFn(targetDate) {
      moment.locale("zh-cn"); // 转为为汉语
      return moment(targetDate).from(new Date()); // 格式 多久以前
    },

  },
};
</script>

<style lang="scss" scoped>
@import "Articles";
</style>
