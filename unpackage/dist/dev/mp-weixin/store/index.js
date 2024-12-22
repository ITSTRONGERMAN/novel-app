"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state() {
    return {
      // 中部区域高度
      midAreaHeight: 0,
      // 当前浏览的小说详情内容
      currentNovelDetail: {},
      // 当前浏览的小说章节
      currentNovelChapters: []
    };
  },
  mutations: {
    // 设置中部区域高度
    setMidAreaHeight(state, num) {
      state.midAreaHeight = num;
    },
    // 设置当前小说详情内容
    setCurrentNovelDetail(state, detail) {
      state.currentNovelDetail = detail;
    },
    // 设置当前小说章节列表
    setCurrentNovelChapters(state, chapters) {
      state.currentNovelChapters = chapters;
    }
  }
});
exports.store = store;
