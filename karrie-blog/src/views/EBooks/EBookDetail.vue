<template>
  <div class="ebook">
    <TitleBar :show="ifTilteAndMenuShow" />
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleTitleAndMenuShow"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <MenuBar
      :show="ifTilteAndMenuShow"
      :fontSizeList="fontSizeList"
      :defaultFontSize="defaultFontSize"
      @setFontSize="setFontSize"
      :themeList="themeList"
      :defaultTheme="defaultTheme"
      @setTheme="setTheme"
      :bookAvailable="bookAvailable"
      @onProgressChange="onProgressChange"
    />
  </div>
</template>
<script>
import Epub from "epubjs";
import TitleBar from "@/components/TitleBar";
import MenuBar from "@/components/MenuBar";
const DOWNLOAD_URL = "";
global.ePub = Epub;
export default {
  name: "EbookDetail",
  components: {
    TitleBar,
    MenuBar,
  },
  data() {
    return {
      filename: "",
      loading: null,
      ifTilteAndMenuShow: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 },
      ],
      defaultFontSize: 16,
      themeList: [
        {
          name: "default",
          style: {
            body: {
              color: "#000",
              background: "#fff",
            },
          },
        },
        {
          name: "eye",
          style: {
            body: {
              color: "#000",
              background: "#ceeaba",
            },
          },
        },
        {
          name: "night",
          style: {
            body: {
              color: "#fff",
              background: "#000",
            },
          },
        },
        {
          name: "gold",
          style: {
            body: {
              color: "#000",
              background: "rgb(241, 236, 226)",
            },
          },
        },
      ],
      defaultTheme: 0,
      bookAvailable: false,
    };
  },
  methods: {
    onProgressChange(progress) {
      const percentage = progress / 100;
      const location =
        percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
      this.rendition.display(location);
    },
    setTheme(index) {
      this.themes.select(this.themeList[index].name);
      this.defaultTheme = index;
    },
    registerTheme() {
      this.themeList.forEach((theme) => {
        this.themes.register(theme.name, theme.style);
      });
    },
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize;
      if (this.themes) {
        this.themes.fontSize(this.defaultFontSize + "px");
      }
    },
    toggleTitleAndMenuShow() {
      this.ifTilteAndMenuShow = !this.ifTilteAndMenuShow;
    },
    // 电子书的解释和渲染
    showEpub() {
      // 生成Book
      let url = `http://120.25.227.65:8006/books/${this.filename}`;
      this.book = new Epub(url);
      console.log(url);
      // 生成Rendition, 通过Book.renderTo
      this.rendition = this.book.renderTo("read", {
        // width: window.innerWidth,
        // height: window.innerHeight,
        width: "100%",
        height: "100%",
        // width: "100vw",
        // height: "100vh",
        boxSizing: "border-box",
        backgroundColor: "pink",
      });
      // 通过Rendtion.display 渲染电子书
      this.rendition.display();
      // 获取Theme对象
      this.themes = this.rendition.themes;
      // 设置默认字体
      this.setFontSize(this.defaultFontSize);
      // this.themes.register(name, styles) 注册字体
      // this.themes.select(name) 选择字体
      this.registerTheme();
      this.setTheme(this.defaultTheme);
      // 获取Locations对象 Locations 默认不生成
      // console.log(this.book.locations)
      this.book.ready
        .then(() => {
          // 通过Rendtion.display 渲染电子书
          this.loading.close();
          return this.book.locations.generate();
        })
        .then(() => {
          this.locations = this.book.locations;
          this.bookAvailable = true;
        });
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next();
      }
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev();
      }
    },
  },
  mounted() {
    this.filename = this.$route.query.filename;
    const loading = this.$loading({
      lock: true,
      text: "加载大约需要两分钟,请耐心等候",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    this.loading = loading;
    this.showEpub();
  },
  beforeDestroy() {
    this.loading.close();
  },
};
</script>
<style lang="scss" scoped>
.ebook {
  position: relative;
  overflow: hidden;
  .read-wrapper {
    .mask {
      display: flex;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      .left,
      .right {
        flex: 0 0 15%;
      }
      .center {
        flex: 1;
      }
    }
  }
}
</style>
