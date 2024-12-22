"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  novelListVue();
}
const novelListVue = () => "../../common/novel-list.js";
const _sfc_main = {
  __name: "guessyoulike",
  props: {
    novelList: {
      default: () => [],
      type: Array
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.novelList, (item, k0, i0) => {
          return {
            a: item.id,
            b: "a81469f6-0-" + i0,
            c: common_vendor.p({
              novel: item
            })
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a81469f6"]]);
wx.createComponent(Component);
