import request from "../../utils/request";

// 上传电子书
export const uploadBook = (data) => {
  return request({
    url: "/ebook/addBook",
    method: "post",
    data,
  });
};

// 获取电子书列表
export const getAllBook = () => {
  return request({
    url: "/ebook/getAllBook",
    method: "get",
  });
};
