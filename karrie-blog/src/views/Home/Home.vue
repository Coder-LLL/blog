<template>
  <div class="home">
    <main>
      <Carousel></Carousel>
      <Articles
        :total="totalMomentsCount"
        :blogList="momentList"
        @loadMoreHandle="loadMoreHandle"
        @toArticleDetailHandle="toArticleDetailHandle"
      ></Articles>
    </main>
    <aside>
      <SecondRecommend></SecondRecommend>
      <FollowUs title="关注我"></FollowUs>
    </aside>

    <BackToTop v-show="isShowBackToTop" @backTop="backTop"></BackToTop>
  </div>
</template>

<script>
import Carousel from "../../components/Carousel/Carousel.vue";
import Articles from "../../components/Articles/Articles.vue";

import SecondRecommend from "../../components/SecondRecommend/SecondRecommend.vue";
import FollowUs from "../../components/FollowUs/FollowUs";
import BackToTop from "../../components/backToTop/BackToTop.vue";

import { getMomentListApi } from "../../api/moment";
export default {
  name: "Home",
  components: {
    Carousel,
    Articles,
    SecondRecommend,
    FollowUs,
    BackToTop,
  },
  data() {
    return {
      momentList: [], // 文章列表
      totalMomentsCount: 0, // 文章列表总条数
      currentPage: 0,
      searchParam: {
        offset: 0, // 当前页
        size: 10, // 列表总条数
      },
      isShowBackToTop: false,
      clientHeight: 0,
    };
  },
  mounted() {
    this.getMomentList();
    this.clientHeight = document.body.clientHeight;
    window.addEventListener("scroll", this.scrollToTop);
  },
  methods: {
    // 获取博客数据
    async getMomentList() {
      this.searchParam.offset = this.currentPage * 10;
      const result = await getMomentListApi(this.searchParam);
      result.data.forEach((item) => {
        item.content = item.content.replace(
          //用正则筛选出富文本编辑器中的img标签
          /(\<img )([^>]*)(src=")([^"]*)("[^>]*\>)/g,
          function (match, p1, p2, p3, p4, p5) {
            return p1 + p2 + 'data-src="' + p4 + "?type=mini" + p5 ;
          }
        );
      });

      this.momentList.push.apply(this.momentList, result.data);
      this.totalMomentsCount = this.momentList[0].totalMomentsCount;
    },
    // 加载更多
    loadMoreHandle() {
      this.currentPage++;
      this.getMomentList();
    },
    // 跳转到某个博客页面
    toArticleDetailHandle(momentId) {
      const routerData = this.$router.resolve({
        path: `/moment/${momentId}`,
      });
      window.open(routerData.href, "_blank");
    },
    // 判断是否显示回到顶部
    scrollToTop() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      this.isShowBackToTop = scrollTop > this.clientHeight ? true : false;
    },
    backTop() {
      cancelAnimationFrame(this.timer);
      const self = this;
      self.timer = requestAnimationFrame(function fn() {
        const oTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop =
            oTop - 50;
          self.timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(self.timer);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "Home";
</style>
