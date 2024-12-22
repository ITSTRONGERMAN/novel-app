"use strict";
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvLoadingPage_components_uvLoadingPage_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uv-loading-page",
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvLoadingPage_components_uvLoadingPage_props.props],
  data() {
    return {
      showLoading: false,
      opacity: 1
    };
  },
  watch: {
    loading: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.showLoading = true;
          this.opacity = 1;
        } else {
          this.opacity = 0;
          this.$nextTick(() => {
            this.$uv.sleep(this.duration).then((res) => {
              this.showLoading = false;
            });
          });
        }
      }
    }
  },
  computed: {
    loadingPageStyle() {
      const style = {
        "position": "fixed",
        "top": "0",
        "left": "0",
        "right": "0",
        "bottom": "0",
        "zIndex": "999",
        "background-color": this.bgColor,
        "transition-duration": `${this.duration}ms`,
        "opacity": this.opacity
      };
      return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
    }
  }
};
if (!Array) {
  const _easycom_uv_loading_icon2 = common_vendor.resolveComponent("uv-loading-icon");
  _easycom_uv_loading_icon2();
}
const _easycom_uv_loading_icon = () => "../../../uv-loading-icon/components/uv-loading-icon/uv-loading-icon.js";
if (!Math) {
  _easycom_uv_loading_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showLoading
  }, $data.showLoading ? common_vendor.e({
    b: _ctx.image != ""
  }, _ctx.image != "" ? {
    c: _ctx.image,
    d: common_vendor.s({
      width: _ctx.$uv.addUnit(_ctx.iconSize),
      height: _ctx.$uv.addUnit(_ctx.iconSize)
    })
  } : {
    e: common_vendor.p({
      mode: _ctx.loadingMode,
      size: _ctx.iconSize,
      color: _ctx.loadingColor
    })
  }, {
    f: common_vendor.t(_ctx.loadingText),
    g: common_vendor.s({
      fontSize: _ctx.$uv.addUnit(_ctx.fontSize),
      color: _ctx.color
    }),
    h: common_vendor.s($options.loadingPageStyle)
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a1a98476"]]);
wx.createComponent(Component);
