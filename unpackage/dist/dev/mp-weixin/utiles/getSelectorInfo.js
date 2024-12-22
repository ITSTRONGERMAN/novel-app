"use strict";
const common_vendor = require("../common/vendor.js");
const getSelectorInfo = (instance, selector) => {
  return new Promise((resolve, reject) => {
    const query = common_vendor.index.createSelectorQuery().in(instance.proxy);
    query.select(selector).boundingClientRect((data) => {
      resolve(data);
    }).exec();
  });
};
exports.getSelectorInfo = getSelectorInfo;
