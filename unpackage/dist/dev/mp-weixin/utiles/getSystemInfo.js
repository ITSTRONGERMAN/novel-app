"use strict";
const common_vendor = require("../common/vendor.js");
const getSystemInfo = () => {
  return new Promise((resolve, reject) => {
    common_vendor.index.getSystemInfo({
      success(res) {
        resolve(res);
      }
    });
  });
};
exports.getSystemInfo = getSystemInfo;
