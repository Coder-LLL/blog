<template>
  <div class="second-recommend">
    <ul>
      <li
        v-for="item in blogList"
        :key="item.id"
        @click="toArticleDetailHandle(item.imgSrc)"
      >
        <div class="mask"></div>
        <el-image
          style="width: 100%; height: 100%"
          :src="srcFormat(item.imgSrc)"
          :alt="item.title"
        />
        <h2>{{ item.title }}</h2>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSrc } from "../../utils/getSrc.js";
export default {
  name: "SecondRecommend",
  data() {
    return {
      blogList: [
        {
          id: 1,
          title: "二叉树",
          imgSrc: "/moment/images/20210118093812348_hash-JQOBG1.png",
        },
        {
          id: 2,
          title: "深度学习",
          imgSrc: "/moment/images/1591423-20210204215412337-835259907_hash-myIWp7.png",
        },
      ],
    };
  },
  methods: {
    toArticleDetailHandle(imgSrc) {
      window.open(getSrc(imgSrc) + "?type=middle", "_blank");
    },
    srcFormat(src) {
      return getSrc(src,"small");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "SecondRecommend";
</style>
