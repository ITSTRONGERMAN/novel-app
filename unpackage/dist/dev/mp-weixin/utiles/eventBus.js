"use strict";
const common_vendor = require("../common/vendor.js");
const eventBus = common_vendor.reactive({
  events: {}
});
const EventBus = {
  // 注册事件，只允许一个函数
  on(event, callback) {
    if (!eventBus.events[event]) {
      eventBus.events[event] = callback;
    } else {
      console.warn(`${event}事件已存在`);
    }
  },
  // 触发事件
  emit(event, data) {
    if (eventBus.events[event]) {
      return eventBus.events[event](data);
    }
  },
  // 注销事件
  off(event) {
    if (eventBus.events[event]) {
      delete eventBus.events[event];
    }
  }
};
exports.EventBus = EventBus;
