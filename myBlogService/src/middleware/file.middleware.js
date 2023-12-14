const Multer = require("koa-multer");
const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file-path.js");
const Jimp = require("jimp");
const path = require("path");

const avatarUpload = Multer({
  dest: AVATAR_PATH,
});
// const avatarHandler = avatarUpload.single('avatar')
const avatarHandler = avatarUpload.single("avatar");

const pictureUpload = Multer({
  dest: PICTURE_PATH,
});
// // 第二个参数表示最大上传的数量
const pictureHandler = pictureUpload.array("picture", 9);

const pictureResize = async (ctx, next) => {
  // 1.获取所有的图像信息
  // const files = ctx.req.files;
  console.log(ctx.request.files.picture);
  // const files = Array.from(ctx.request.files.picture);
  // // 对图片进行处理 sharp/jump
  // for (let file of files) {
  //   // const image = await Jimp.read(file.path);
  //   let fileNameArr = file.originalFilename.split(".");
  //   let fileName = `${fileNameArr[0]}_hash-${randomString(6)}.${
  //     fileNameArr[1]
  //   }`;
  //   file.originalFilename = fileName;
  //   console.log(file.originalFilename);
  //   console.log(fileName);
  //   const destPath = path.join("./upload/picture", file.originalFilename);
  //   Jimp.read(file.filepath).then((image) => {
  //     image.resize(1280, Jimp.AUTO).write(`${destPath}`);
  //     image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
  //     image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
  //   });
  // }

  const file = ctx.request.files.picture;
  // 对图片进行处理 sharp/jump
  // const image = await Jimp.read(file.path);
  let fileNameArr = file.originalFilename.split(".");
  let fileName = `${fileNameArr[0]}_hash-${randomString(6)}.${fileNameArr[1]}`;
  file.originalFilename = fileName;
  console.log(file.originalFilename);
  console.log(fileName);
  const destPath = path.join("./upload/picture", file.originalFilename);
  Jimp.read(file.filepath).then((image) => {
    image.resize(1280, Jimp.AUTO).write(`${destPath}`);
    image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
    image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
  });
  await next();

  function randomString(length) {
    let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let res = "";
    for (let i = length; i > 0; i--) {
      res += str[Math.floor(Math.random() * str.length)];
    }
    return res;
  }
};

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize,
};
