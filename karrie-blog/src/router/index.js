import Vue from "vue";
import Router from "vue-router";
import cookies from "vue-cookies";
import { Message } from "element-ui";
const Login = () =>
  import(/* webpackChunkName: 'Login' */ "@/views/Login/Login");
const Setting = () =>
  import(/* webpackChunkName: 'Setting' */ "@/views/Setting/Setting");

const Layout = () =>
  import(/* webpackChunkName: 'Layout' */ "@/views/Layout/Layout");

const Home = () => import(/* webpackChunkName: 'Home' */ "@/views/Home/Home");
const Moment = () =>
  import(/*webpackChunkName: 'Moment'*/ "@/views/Moment/Moment");
const PublishBlog = () =>
  import(/*webpackChunkName: 'PublishBlog'*/ "@/views/PublishBlog/PublishBlog");
const Category = () =>
  import(/*webpackChunkName: 'Category'*/ "@/views/Category/Category");
const EBooks = () =>
  import(/*webpackChunkName: 'Ebooks'*/ "@/views/EBooks/EBooks");
const EBookDetail = () =>
  import(/*webpackChunkName: 'EBookDetail'*/ "@/views/EBooks/EBookDetail");
const Film = () => import(/*webpackChunkName: 'Film'*/ "@/views/Film/Film");
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Layout",
      component: Layout,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "Home",
          meta: {
            title: "首页",
          },
          isNavigationBar: true,
          component: Home,
        },
        {
          path: "/moment/:momentId",
          name: "moment",
          meta: {
            title: "博客详情",
          },
          component: Moment,
        },
        {
          path: "/setting",
          name: "Setting",
          meta: {
            requiresAuth: true,
          },
          component: Setting,
        },
        {
          path: "/publishBlog",
          name: "PublishBlog",
          meta: {
            requiresAuth: true,
          },
          component: PublishBlog,
        },
        {
          path: "/category",
          name: "Category",
          component: Category,
        },
        {
          path: "/ebooks",
          name: "EBooks",
          component: EBooks,
        },
        {
          path: "/bookDetail",
          name: "bookDetail",
          component: EBookDetail,
        },
        {
          path: "/film",
          name: "film",
          component: Film,
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !cookies.get("KarrieToken")) {
    console.log(to);
    next({
      path: "/login", //返回登录界面
      // query: {redirect: to.fullPath}
    });
    Message({
      message: "请先登录",
      center: true,
      type: "warning",
    });
  } else {
    next();
  }
});
export default router;
