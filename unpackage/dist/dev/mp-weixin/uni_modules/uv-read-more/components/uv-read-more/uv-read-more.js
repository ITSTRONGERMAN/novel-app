"use strict";
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvReadMore_components_uvReadMore_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uv-read-more",
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvReadMore_components_uvReadMore_props.props],
  data() {
    return {
      isLongContent: false,
      // 是否需要隐藏一部分内容
      status: "close",
      // 当前隐藏与显示的状态，close-收起状态，open-展开状态
      elId: "",
      // 生成唯一class
      contentHeight: 100
      // 内容高度
    };
  },
  computed: {
    // 展开后无需阴影，收起时才需要阴影样式
    innerShadowStyle() {
      if (this.status === "open")
        return {};
      else
        return this.shadowStyle;
    }
  },
  created() {
    this.elId = this.$uv.guid();
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.getContentHeight().then((height) => {
        this.contentHeight = height;
        if (height > this.$uv.getPx(this.showHeight)) {
          this.isLongContent = true;
          this.status = "close";
        }
      });
    },
    // 获取内容的高度
    async getContentHeight() {
      await this.$uv.sleep(30);
      return new Promise((resolve) => {
        this.$uvGetRect("." + this.elId).then((res) => {
          resolve(res.height);
        });
      });
    },
    // 展开或者收起
    toggleReadMore() {
      this.status = this.status === "close" ? "open" : "close";
      if (this.toggle == false)
        this.isLongContent = false;
      this.$emit(this.status, this.name);
    }
  }
};
if (!Array) {
  const _easycom_uv_text2 = common_vendor.resolveComponent("uv-text");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  (_easycom_uv_text2 + _easycom_uv_icon2)();
}
const _easycom_uv_text = () => "../../../uv-text/components/uv-text/uv-text.js";
const _easycom_uv_icon = () => "../../../uv-icon/components/uv-icon/uv-icon.js";
if (!Math) {
  (_easycom_uv_text + _easycom_uv_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n($data.elId),
    b: $data.isLongContent && $data.status === "close" ? _ctx.$uv.addUnit(_ctx.showHeight) : _ctx.$uv.addUnit($data.contentHeight, "px"),
    c: _ctx.textIndent,
    d: $data.isLongContent
  }, $data.isLongContent ? {
    e: common_vendor.p({
      text: $data.status === "close" ? _ctx.closeText : _ctx.openText,
      color: _ctx.color,
      size: _ctx.fontSize,
      lineHeight: _ctx.fontSize,
      margin: "0 5px 0 0"
    }),
    f: common_vendor.p({
      color: _ctx.color,
      size: _ctx.fontSize + 2,
      name: $data.status === "close" ? "arrow-down" : "arrow-up"
    }),
    g: common_vendor.o((...args) => $options.toggleReadMore && $options.toggleReadMore(...args)),
    h: common_vendor.s($options.innerShadowStyle)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d91f31a6"]]);
wx.createComponent(Component);
