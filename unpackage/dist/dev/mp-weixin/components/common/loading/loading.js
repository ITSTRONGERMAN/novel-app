"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "loading",
  props: {
    type: {
      type: String,
      default: "loading"
    },
    animation: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.type == "loading"
      }, __props.type == "loading" ? {
        b: common_assets._imports_0
      } : __props.type == "pulldown" ? {
        d: common_vendor.n(__props.animation ? "pulldown-active" : "")
      } : {}, {
        c: __props.type == "pulldown"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-028c4300"]]);
wx.createComponent(Component);
