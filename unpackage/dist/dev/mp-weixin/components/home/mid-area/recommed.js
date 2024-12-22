"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  _easycom_uv_image2();
}
const _easycom_uv_image = () => "../../../uni_modules/uv-image/components/uv-image/uv-image.js";
if (!Math) {
  (loadingVue + _easycom_uv_image)();
}
const loadingVue = () => "../../common/loading/loading.js";
const _sfc_main = {
  __name: "recommed",
  props: {
    isLoaded: {
      default: false,
      type: Boolean
    },
    novelList: {
      default: () => [],
      type: Array
    }
  },
  emits: ["changeRank"],
  setup(__props, { emit: __emit }) {
    const store = common_vendor.useStore();
    const emits = __emit;
    const current = common_vendor.ref(0);
    const rankList = common_vendor.ref([
      "推荐榜",
      "点击榜",
      "完本榜"
    ]);
    const changeRank = (index) => {
      current.value = index;
      emits("changeRank", index);
    };
    const goToNovelDetail = (detail) => {
      store.commit("setCurrentNovelDetail", detail);
      common_vendor.index.navigateTo({
        url: "/pages/nove-detail/index",
        animationType: "fade-in"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(rankList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.n(current.value == index ? "active" : ""),
            c: index,
            d: common_vendor.o(($event) => changeRank(index), index)
          };
        }),
        b: !__props.isLoaded,
        c: common_vendor.f(__props.novelList, (item, index, i0) => {
          return {
            a: "abb1f8e2-1-" + i0,
            b: common_vendor.p({
              src: item.cover,
              ["lazy-load"]: true,
              observeLazyLoad: true,
              fade: true,
              loadingIcon: "photo-fill",
              duration: "450",
              radius: "5",
              width: "50",
              height: "60"
            }),
            c: common_vendor.t(index + 1),
            d: common_vendor.t(item.name),
            e: common_vendor.t(item.genre),
            f: common_vendor.t(item.author),
            g: common_vendor.t(item.status),
            h: common_vendor.t(item.words_count),
            i: common_vendor.o(($event) => goToNovelDetail(item), item.id),
            j: item.id
          };
        }),
        d: __props.isLoaded
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-abb1f8e2"]]);
wx.createComponent(Component);
