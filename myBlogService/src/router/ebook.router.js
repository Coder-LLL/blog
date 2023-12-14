const Router = require("koa-router");
const Multer = require("koa-multer");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware.js");
const { addBook, getAllBook } = require("../controller/ebook.controller.js");
// const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware.js");
const bookRouter = new Router({
  prefix: "/ebook",
});

const avatarUpload = Multer({
  dest: "./build",
});
const avatarHandler = avatarUpload.single("file");
// bookRouter.post("/addBook", verifyAuth, addBook);
bookRouter.post("/addBook", avatarHandler, addBook);
bookRouter.get("/getAllBook", getAllBook);
module.exports = bookRouter;
