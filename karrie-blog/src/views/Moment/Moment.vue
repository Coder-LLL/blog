<template>
  <div class="moment">
    <el-tabs v-model="activeName" type="card" :before-leave="beforeLeaveHandle">
      <el-tab-pane label="网站首页" name="home">网站首页</el-tab-pane>
      <el-tab-pane label="文章详情" name="comment">
        <ArticleAsideBtn
          class="asideBtn"
          @commentSvgClick="commentSvgClick"
        ></ArticleAsideBtn>
        <!-- <main> -->
        <header>
          <!--     文章标题       -->
          <h2>{{ momentInfo.title }}</h2>

          <!--      文章作者信息、点击量、分类、点赞数      -->
          <ul class="infoList">
            <!--    作者        -->
            <li class="infoItem author">
              <svg-icon icon-class="author"></svg-icon>
              <span>{{ authorInfo.name }}</span>
            </li>
            <!--    创建时间        -->
            <li class="infoItem createTime">
              <svg-icon icon-class="clock"></svg-icon>
              <span>{{ momentInfo.createTime | dateStrFormat }}</span>
            </li>
          </ul>

          <!--      标签      -->
          <div class="tags-box">
            <el-tag
              v-for="label in labelsList"
              type="warning"
              :key="label.id"
              @click="toArticleListHandle(label.id, 'blogTag')"
            >
              {{ label.name }}
            </el-tag>
          </div>
        </header>

        <article>
          <el-image
            style="display: none"
            ref="previewImg"
            :src="activeImg"
            :preview-src-list="[activeImg]"
          ></el-image>
          <div v-html="content" v-highlight></div>
        </article>
      <!-- 当有h系列的标题时才展示目录 -->
        <div class="article-catalog" v-if="h1__TitleList.length!=0">
          <div class="catalog__title">
            目录
          </div>
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
        <footer>
          <hr />
          <h3 ref="comment" style="margin-bottom: 20px">
            留言（{{ comments.length }}）
          </h3>
          <CommentBox
            @sendComment="sendComment"
            :loginUserInfo="momentInfo"
          ></CommentBox>

          <div class="comment-message-list">
            <CommentMessageList
              @newReply="getComment"
              :commentsList="comments"
            ></CommentMessageList>
          </div>
        </footer>
        <!-- </main> -->
      </el-tab-pane>
    </el-tabs>
    <!-- <Category ref="category"></Category> -->
  </div>
</template>

<script>
import ArticleAsideBtn from "../../components/ArticleAsideBtn/ArticleAsideBtn.vue";
import CommentMessageList from "../../components/CommentMessageList/CommentMessageList.vue";
import CommentBox from "../../components/CommentBox/CommentBox.vue";
import { getMomentByIdApi } from "../../api/moment/index.js";
import { getCommentByMomentId } from "../../api/comment/index.js";
// import Category from '../../components/Category/index.vue'
export default {
  name: "Moment",
  components: {
    ArticleAsideBtn,
    CommentBox,
    CommentMessageList,
  },
  data() {
    return {
      momentId: 0,
      momentInfo: {},
      authorInfo: {},
      content: "",
      activeName: "comment",
      labelsList: [],
      comments: [],
      activeImg: "",
      h1__TitleList: [],
      currentTitleIndex: null,
      domList: [],
      timer:null
    };
  },
  created() {
    // 拿到momentId然后去后台获取数据
    let { momentId } = this.$route.params;
    this.momentId = momentId;
    this.getComment();
  },
  async mounted() {
    await this.getMoment();
    Array.from(document.querySelectorAll(".preview-img")).forEach((img) => {
      img.addEventListener("click", this.previewImgClickHandler, true);
    });
    // this.getTitle()
    let h1_TitleList = [...document.getElementsByClassName("h1__title")];
    this.domList = h1_TitleList;
    window.addEventListener("scroll", this.getTitle);

    this.$nextTick(()=>{
      this.$refs.category.getDom()
    })
  },
  methods: {
    async getMoment() {
      const result = await getMomentByIdApi(this.momentId);
      this.momentInfo = result.data;
      this.content = result.data.content.replace(
        //用正则筛选出富文本编辑器中的img标签
        /(\<img [^\<\>]*src=\"[^\"]+\")([^\<\>]*\/\>)/g,
        (a, p1, p2, c, d) => {
          //给图片标签加上自定义类名
          return `${p1} class="preview-img" ${p2}`;
        }
      );
      let index = 0;
      this.content = this.content.replace(
        /(<h1.*?)(>)([\s\S]+?)(<\/h1>)/g,
        ($1, $2, $3, $4, $5) => {
          this.h1__TitleList.push($4);
          return `${$2} class='h1__title' data-index='${index++}' ${$3}${$4}${$5}`;
        }
      );
      this.authorInfo = result.data.author;
      this.labelsList = result.data.labels;
    },
    previewImgClickHandler(event) {
      this.previewImg(event.target.getAttribute("src"));
    },
    previewImg(img) {
      this.activeImg = img;
      this.$refs.previewImg.clickHandler();
    },
    async getComment() {
      const result = await getCommentByMomentId({ momentId: this.momentId });
      this.comments = result.data;
    },
    beforeLeaveHandle(activeName, oldActiveName) {
      if (activeName === "home") {
        this.$router.push("/");
        return false;
      }
    },
    toArticleListHandle() {},
    showBigPic() {},
    commentSvgClick() {
      const commentBox = this.$refs["comment"];
      commentBox.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    },
    sendComment() {
      this.getComment();
    },

    getTitle() {
      let list = this.domList;
      for (let i = 0; i < list.length; i++) {
        // 最后一个
        if (
          i === list.length - 1 &&
          document.documentElement.scrollTop >= list[i].offsetTop
        ) {
          this.currentTitleIndex = list[i].dataset.index;
        } else if (
          i === 0 &&
          document.documentElement.scrollTop < list[i].offsetTop
        ) {
          // 第一个
          this.currentTitleIndex = null;
        } else {
          if (
            document.documentElement.scrollTop >= list[i].offsetTop &&
            document.documentElement.scrollTop <= list[i + 1].offsetTop
          ) {
            this.currentTitleIndex = list[i].dataset.index;
          }
        }
      }
    },
    goToTitle(index){
      let target = this.domList[index].offsetTop
      let currentTop = document.documentElement.scrollTop
      let topOrBottom = currentTop >= target ? 'top' : 'bottom'
      cancelAnimationFrame(this.timer);
      const self = this;
      self.timer = requestAnimationFrame(function fn() {
        if(topOrBottom == 'top'){
        const oTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > target) {
          document.body.scrollTop = document.documentElement.scrollTop =
            oTop - 50;
          self.timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(self.timer);
        }
        }else if (topOrBottom =='bottom'){
                  const oTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop < target) {
          document.body.scrollTop = document.documentElement.scrollTop =
            oTop + 50;
          self.timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(self.timer);
        }
        }

      });
    }
  },
  filters: {
    // 格式化时间字符串
    dateStrFormat(time) {
      let dt = new Date(time);
      const y = dt.getFullYear();
      const m = (dt.getMonth() + 1 + "").padStart(2, "0");
      const d = (dt.getDate() + "").padStart(2, "0");
      const hh = (dt.getHours() + "").padStart(2, "0");
      const mm = (dt.getMinutes() + "").padStart(2, "0");
      const ss = (dt.getSeconds() + "").padStart(2, "0");
      return `${y}.${m}.${d} ${hh}:${mm}:${ss}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets//styles/global.scss";
// @import "Moment";
.asideBtn {
  position: fixed;
  left: 50px;
  top: 100px;
}
.moment {
  // position: relative;

  margin-top: $marginTopMain;
  // position: relative;
  ::v-deep #tab-home {
    @include tabHome;
  }

  .el-tab-pane {
    background-color: yellow;
    @include clearfix;
    position: static;
    width: 100%;
    padding: 30px 30px 300px;
    box-sizing: border-box;
    background: #ffffff;
    @include boxShadow;

    header {
      h2 {
        margin: 20px 0;
        color: $textColor3;
      }

      .infoList {
        display: flex;
        padding-left: 20px;

        .infoItem {
          margin-right: 20px;
          color: $textColor;
          font-size: 14px;
          span {
            margin-left: 3px;
          }
        }

        .author span {
          cursor: pointer;

          &:hover {
            color: $textHoverColor3;
          }
        }
      }

      .tags-box {
        margin: 20px 0;

        .el-tag {
          cursor: pointer;
          margin-right: 5px;
        }
      }
    }

    article {
      text-align: justify;
      font-size: 16px;
      line-height: 1.8;

      .momentImageList {
        margin: 20px 0;

        .el-image {
          width: 45%;
          margin-left: 5%;
          background-color: pink;
        }
      }
    }

    footer {
      .extra-feature-btn-box {
        margin: 20px 0;
        text-align: center;

        .el-button:first-child {
          margin-right: 20px;
        }
      }
    }
  }
}
// 文章目录
.article-catalog {
  position: fixed;
  top: 100px;
  right: 50px;

  z-index: 100;
  width: 260px;
  // background-color: #d8d8d8;
  background-color: #888888;

  // padding: 20px 0;
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
