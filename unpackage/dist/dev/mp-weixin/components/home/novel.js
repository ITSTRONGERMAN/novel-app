"use strict";
const common_vendor = require("../../common/vendor.js");
const utiles_eventBus = require("../../utiles/eventBus.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_loading_icon2 = common_vendor.resolveComponent("uv-loading-icon");
  _easycom_uv_loading_icon2();
}
const _easycom_uv_loading_icon = () => "../../uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon.js";
if (!Math) {
  (recommedVue + guessyoulikeVue + _easycom_uv_loading_icon + midAreaItemVue)();
}
const midAreaItemVue = () => "./mid-area/mid-area-item.js";
const recommedVue = () => "./mid-area/recommed.js";
const guessyoulikeVue = () => "./mid-area/guessyoulike.js";
const _sfc_main = {
  __name: "novel",
  setup(__props) {
    const rankList = common_vendor.ref([]);
    const rankLists = common_vendor.ref([]);
    const isRankListLoaded = common_vendor.ref(false);
    const guessYouLikeList = common_vendor.ref([]);
    common_vendor.onMounted(async () => {
      handelChangeRank(0);
      getLikes();
      registerPullDownEvent();
    });
    const handelScrollLower = () => {
      getLikes();
    };
    const handelChangeRank = async (index = 0) => {
      isRankListLoaded.value = false;
      try {
        if (rankLists.value[index]) {
          rankList.value = rankLists.value[index];
        } else {
          if (index == 0 || index == 1) {
            const {
              data: recommends
            } = await api_index.getRecommendRank();
            rankLists.value[index] = recommends;
            rankList.value = recommends;
          } else {
            const {
              data: recommends
            } = await api_index.getFinishedRank();
            rankLists.value[index] = recommends;
            rankList.value = recommends;
          }
        }
        isRankListLoaded.value = true;
      } catch (e) {
        console.log(e);
        console.log(12321);
      }
    };
    const getLikes = async () => {
      const {
        data: likes
      } = await api_index.getGuessYouLike();
      guessYouLikeList.value = [...guessYouLikeList.value, ...likes];
    };
    const registerPullDownEvent = () => {
      utiles_eventBus.EventBus.on("pullDownFresh_novel_Home", (data) => {
        return new Promise(async (resolve, reject) => {
          rankLists.value = [];
          await handelChangeRank(0);
          guessYouLikeList.value = [];
          await getLikes();
          resolve(true);
        });
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handelChangeRank),
        b: common_vendor.p({
          novelList: rankList.value,
          isLoaded: isRankListLoaded.value
        }),
        c: common_vendor.p({
          novelList: guessYouLikeList.value
        }),
        d: common_vendor.o(handelScrollLower)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6332fa14"]]);
wx.createComponent(Component);
