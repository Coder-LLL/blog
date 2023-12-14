const app = require("./app/index.js");
const config = require("./app/config.js");
require("./app/database.js");

app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}启动成功~`);
});

// -----------------
const path = require("path");
const Koa = require("koa");
const staticAssets = require("koa-static");
var cors = require("koa2-cors");
const app2 = new Koa();
app2.use(cors());

app2.use(staticAssets(path.resolve(__dirname, "../build")));

app2.listen(8006, () => {
  console.log("koa静态服务器启动成功~");
});
