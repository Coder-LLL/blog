const fs = require("fs");
const path = require("path");
var sha1 = require("sha1");
const ebookService = require("../service/ebook.service");
const uploadUrl = "http://localhost:5000/books";
class BookController {
  async addBook(ctx, next) {
    const file = ctx.request.files.file;
    console.log(ctx.user);
    console.log(file);
    console.log(file.originalFilename.split("."));
    let fileNameArr = file.originalFilename.split(".");
    let fileName = `${fileNameArr[0]}_hash-${randomString(6)}.${
      fileNameArr[1]
    }`;

    console.log(fileName);
    // 读取文件流
    const fileReader = fs.createReadStream(file.filepath);
    const filePath = path.join(__dirname, "../../build/books/");
    randomString(6);
    // 组装成绝对路径
    const fileResource = filePath + `/${fileName}`;
    /*
       使用 createWriteStream 写入数据，然后使用管道流pipe拼接
    */
    const writeStream = fs.createWriteStream(fileResource);
    // 判断 /static/upload 文件夹是否存在，如果不在的话就创建一个
    fileReader.pipe(writeStream);
    console.log(file.originalFilename, file.mimetype, file.size);

    await ebookService.create(fileName, file.mimetype, file.size, "4");
    ctx.body = {
      name: fileName,
      url: uploadUrl + `/${fileName}`,
      message: "上传成功",
      code: 200,
    };

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
  async getAllBook(ctx) {
    const res = await ebookService.get();
    console.log(res);
    ctx.body = {
      data: res,
      code: 200,
    };
  }
}

module.exports = new BookController();
