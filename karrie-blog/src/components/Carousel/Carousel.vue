<template>
  <div class="carousel">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in dataList" :key="item.id">
        <div
          style="width: 100%; height: 100%; cursor: pointer"
          @click="toArticleDetailHandle(item.id)"
        >
          <el-image
            style="width: 100%; height: 100%"
            fit="contain"
            :src="item.imgSrc"
            alt=""
          />

          <div class="carousel-title">
            <span>{{ item.title }}</span>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      dataList: [
               {
          id: "54",
          title: "深入理解BFC以及BFC的作用",
          imgSrc:
            "http://120.25.227.65:8005/moment/images/32759210e1ff4e028063aa7593184bc9",
        },
        {
          id: "36",
          title: "python自动喷人工具or自动无限回复工具",
          imgSrc:
            "http://120.25.227.65:8005/moment/images/262720d3d7ed1bb8d36eb6b0ab0007db",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    toArticleDetailHandle(momentId) {
      const routerData = this.$router.resolve({
        path: `/moment/${momentId}`,
      });
      window.open(routerData.href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "Carousel";
</style>