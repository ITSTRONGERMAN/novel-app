"use strict";
const common_vendor = require("../common/vendor.js");
const BASEURL = "http://192.168.0.100";
const server = (url, method = "get", data = {}) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: BASEURL + url,
      data,
      method,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
        throw new Error("网络请求失败");
      }
    });
  });
};
exports.server = server;
