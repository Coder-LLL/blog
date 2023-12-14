const Koa = require("koa");

// 启动跨域
var cors = require("koa2-cors");
//

// const userRouter = require('../router/user.router.js')
// const authRouter = require('../router/auth.router.js')
const errHandler = require("./error.handle.js");
const useRouter = require("../router/index.js");

const app = new Koa();

app.use(cors());
const koaBody = require("koa-body");
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      maxFieldsSize: 20 * 1024 * 1024, // 最大文件为2兆
      multipart: true, // 是否支持 multipart-formdate 的表单
    },
  })
);
// const bodyParser = require("koa-bodyparser");
// app.use(bodyParser());
// 如果每个路由都要这样自己导入太麻烦了，所以在router文件夹下创建了一个index.js文件用于动态导入创建的router
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods()) // 判断某个请求的方法是否存在，如果不存在则返回找不到方法，或者不允许
// app.use(authRouter.routes())
// app.use(authRouter.allowedMethods())
useRouter(app);

app.on("error", errHandler);

module.exports = app;
