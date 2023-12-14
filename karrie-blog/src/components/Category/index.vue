<template>
  <div class="article-catalog">
    <div class="catalog__title">目录</div>
    <div class="catalog__body">
      <div
        v-for="(item, index) in h1__TitleList"
        class="catalog__item"
        :class="{
          activeTitle: currentTitleIndex == index,
        }"
        @click="goToTitle(index)"
      >
        {{ index + 1 }}、{{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log(this)
  },
  methods: {
   getDom(){
     console.log( document.getElementsByClassName("h1__title"))
    
   }
  }
}
</script>


<style lang="scss"  scoped>
// 文章目录
.article-catalog {
  position: fixed;
  top: 100px;
  right: 50px;

  z-index: 100;
  width: 260px;
  // background-color: #d8d8d8;
  background-color: #888888;
  .catalog__title {
    font-weight: 500;
    padding: 15px 0;
    margin: 0 20px;
    font-size: 16px;
    color: #1d2129;
    border-bottom: 1px solid #e4e6eb;
  }
  .catalog__body {
    max-height: 600px;
    overflow-y: auto;
  }
  .catalog__item {
    height: 45px;
    padding: 0px 15px;
    margin-top: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height: 45px;
    cursor: pointer;
    // background-color: pink;
    &:hover {
      background-color: #666666;
    }
  }
}
// 目录激活样式
.activeTitle {
  color: #007fff;
}
</style>