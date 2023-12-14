import request from "../../utils/request";

export const uploadPicture = (data) => {
  return request({
    url: "/upload/picture",
    method: "post",
    data,
  });
};
