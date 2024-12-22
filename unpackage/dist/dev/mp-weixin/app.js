"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/home/index.js";
  "./components/home/mid-area/mid-area.js";
  "./pages/nove-detail/index.js";
  "./pages/chapters/chapters.js";
  "./pages/read/read.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(store_index.store);
  return {
    app,
    store: store_index.store
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
