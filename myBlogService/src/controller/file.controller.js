const { AVATAR_PATH } = require("../constants/file-path.js");
const userService = require("../service/user.service.js");
const fileService = require("../service/file.service.js");
const { APP_HOST, APP_PORT } = require("../app/config");
const Jimp = require("jimp");
const path = require("path");
class FileController {
  // async saveAvatarInfo(ctx, next) {
  //   // 1.获取图像相关的信息
  //   const {
  //     filename,
  //     mimetype,
  //     size
  //   } = ctx.req.file
  //   const {
  //     id
  //   } = ctx.user
  //   console.log(filename,
  //     mimetype,
  //     size)

  //   // 2.将图像信息保存到数据库中
  //   const result = await fileService.createAvatar(filename, mimetype, size, id)
  //   ctx.request.files.file
  //   console.log(555)
  //   // 3.将图片地址保存到user表中
  //   const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
  //   await userService.updateAvatarUrlById(avatarUrl, id)

  //   ctx.body = "上传头像成功"
  // }
  // async saveAvatarInfo(ctx, next) {
  //   console.log(4333)

  //   // 1.获取图像相关的信息
  //   const {
  //     filename,
  //     mimetype,
  //     size
  //   } = ctx.req.file;
  //   const {
  //     id
  //   } = ctx.user;
  //   // 2.将图像信息数据保存到数据库中
  //   const result = await fileService.createAvatar(filename, mimetype, size, id);

  //   // 3.将图片地址保存到user表中
  //   const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
  //   await userService.updateAvatarUrlById(avatarUrl, id);

  //   // 4.返回结果
  //   ctx.body = '上传头像成功~';
  // }

  async saveAvatarInfo(ctx, next) {
    // console.log(ctx.req);
    // 1.获取图像相关的信息
    console.log(ctx.request.files.avatar);
    const { originalFilename, mimetype, size, filepath } =
      ctx.request.files.avatar;
    // const { filename, mimetype, size } = ctx.req.file;
    console.log(ctx.req);
    const { id } = ctx.user;
    let fileNameArr = originalFilename.split(".");
    let fileName = `${fileNameArr[0]}_hash-${randomString(6)}.${
      fileNameArr[1]
    }`;
    console.log(fileName);
    // 2.将图像信息数据保存到数据库中
    const result = await fileService.createAvatar(fileName, mimetype, size, id);
    const destPath = path.join(__dirname, `../../upload/avatar/${fileName}`);
    console.log(destPath);
    Jimp.read(filepath).then((image) => {
      image.resize(320, Jimp.AUTO).write(destPath);
    });
    // 3.将图片地址保存到user表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    console.log(avatarUrl);
    await userService.updateAvatarUrlById(avatarUrl, id);
    // 4.返回结果
    ctx.body = "上传头像成功~";

    function randomString(length) {
      let str =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let res = "";
      for (let i = length; i > 0; i--) {
        res += str[Math.floor(Math.random() * str.length)];
      }
      return res;
    }
  }

  async savePictureInfo(ctx, next) {
    try {
      // 1.获取图像信息,因为这里是多张图片，所以files是一个数组
      // const files = ctx.req.files;
      // const { id } = ctx.user;
      // const files = Array.from(ctx.request.files.picture);
      // let resultList = [];
      // // console.log(files);
      // // 2.将所有的文件信息保存到数据库里
      // for (let file of files) {
      //   const { originalFilename, mimetype, size } = file;
      //   // let fileNameArr = originalFilename.split(".");
      //   // let fileName = `${fileNameArr[0]}_hash-${randomString(6)}.${
      //   //   fileNameArr[1]
      //   // }`;
      //   // console.log(fileName);
      //   await fileService.createPicture(originalFilename, mimetype, size, id);
      //   resultList.push(
      //     `${APP_HOST}:${APP_PORT}/moment/images/` + originalFilename
      //   );
      // }

      const { id } = ctx.user;
      const file = ctx.request.files.picture;
      let resultList = [];
      // console.log(files);
      // 2.将所有的文件信息保存到数据库里
      const { originalFilename, mimetype, size } = file;
      // let fileNameArr = originalFilename.split(".");
      // let fileName = `${fileNameArr[0]}_hash-${randomString(6)}.${
      //   fileNameArr[1]
      // }`;
      // console.log(fileName);
      await fileService.createPicture(originalFilename, mimetype, size, id);
      resultList.push(
        `${APP_HOST}:${APP_PORT}/moment/images/` + originalFilename
      );
      ctx.body = resultList;
    } catch (error) {
      console.log("图片上传失败");
    }

    function randomString(length) {
      let str =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let res = "";
      for (let i = length; i > 0; i--) {
        res += str[Math.floor(Math.random() * str.length)];
      }
      return res;
    }
  }
}

module.exports = new FileController();
