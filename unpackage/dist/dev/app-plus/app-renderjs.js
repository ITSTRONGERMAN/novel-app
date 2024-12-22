var __renderjsModules={};

__renderjsModules.a5d206f8 = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <stdin>
  var stdin_exports = {};
  __export(stdin_exports, {
    default: () => stdin_default
  });

  // D:/APP/novel-app/novel-app/uni_modules/z-paging/components/z-paging/config/index.js
  var config_default = {};

  // D:/APP/novel-app/novel-app/uni_modules/z-paging/components/z-paging/js/z-paging-constant.js
  var z_paging_constant_default = {
    // 当前版本号
    version: "2.8.3",
    // 延迟操作的通用时间
    delayTime: 100,
    // 请求失败时候全局emit使用的key
    errorUpdateKey: "z-paging-error-emit",
    // 全局emit complete的key
    completeUpdateKey: "z-paging-complete-emit",
    // z-paging缓存的前缀key
    cachePrefixKey: "z-paging-cache",
    // 虚拟列表中列表index的key
    listCellIndexKey: "zp_index",
    // 虚拟列表中列表的唯一key
    listCellIndexUniqueKey: "zp_unique_index"
  };

  // D:/APP/novel-app/novel-app/uni_modules/z-paging/components/z-paging/js/z-paging-utils.js
  var storageKey = "Z-PAGING-REFRESHER-TIME-STORAGE-KEY";
  var config = null;
  var configLoaded = false;
  var timeoutMap = {};
  var screenWidth = 0;
  function gc(key, defaultValue) {
    return () => {
      _handleDefaultConfig();
      if (!config)
        return defaultValue;
      const value = config[key];
      return value === void 0 ? defaultValue : value;
    };
  }
  function getTouch(e) {
    let touch = null;
    if (e.touches && e.touches.length) {
      touch = e.touches[0];
    } else if (e.changedTouches && e.changedTouches.length) {
      touch = e.changedTouches[0];
    } else if (e.datail && e.datail != {}) {
      touch = e.datail;
    } else {
      return { touchX: 0, touchY: 0 };
    }
    return {
      touchX: touch.clientX,
      touchY: touch.clientY
    };
  }
  function getTouchFromZPaging(target) {
    if (target && target.tagName && target.tagName !== "BODY" && target.tagName !== "UNI-PAGE-BODY") {
      const classList = target.classList;
      if (classList && classList.contains("z-paging-content")) {
        return {
          isFromZp: true,
          isPageScroll: classList.contains("z-paging-content-page"),
          isReachedTop: classList.contains("z-paging-reached-top"),
          isUseChatRecordMode: classList.contains("z-paging-use-chat-record-mode")
        };
      } else {
        return getTouchFromZPaging(target.parentNode);
      }
    } else {
      return { isFromZp: false };
    }
  }
  function getParent(parent) {
    if (!parent)
      return null;
    if (parent.$refs.paging)
      return parent;
    return getParent(parent.$parent);
  }
  function consoleErr(err) {
    console.error(`[z-paging]${err}`);
  }
  function delay(callback, ms = z_paging_constant_default.delayTime, key) {
    const timeout = setTimeout(callback, ms);
    ;
    if (!!key) {
      timeoutMap[key] && clearTimeout(timeoutMap[key]);
      timeoutMap[key] = timeout;
    }
    return timeout;
  }
  function setRefesrherTime(time, key) {
    const datas = getRefesrherTime() || {};
    datas[key] = time;
    uni.setStorageSync(storageKey, datas);
  }
  function getRefesrherTime() {
    return uni.getStorageSync(storageKey);
  }
  function getRefesrherTimeByKey(key) {
    const datas = getRefesrherTime();
    return datas && datas[key] ? datas[key] : null;
  }
  function getRefesrherFormatTimeByKey(key, textMap) {
    const time = getRefesrherTimeByKey(key);
    const timeText = time ? _timeFormat(time, textMap) : textMap.none;
    return `${textMap.title}${timeText}`;
  }
  function convertToPx(text) {
    const dataType = Object.prototype.toString.call(text);
    if (dataType === "[object Number]")
      return text;
    let isRpx = false;
    if (text.indexOf("rpx") !== -1 || text.indexOf("upx") !== -1) {
      text = text.replace("rpx", "").replace("upx", "");
      isRpx = true;
    } else if (text.indexOf("px") !== -1) {
      text = text.replace("px", "");
    }
    if (!isNaN(text)) {
      if (isRpx)
        return Number(rpx2px(text));
      return Number(text);
    }
    return 0;
  }
  function rpx2px(rpx) {
    if (!screenWidth) {
      screenWidth = uni.getSystemInfoSync().screenWidth;
    }
    return screenWidth * Number.parseFloat(rpx) / 750;
    return uni.upx2px(rpx);
  }
  function getTime() {
    return (/* @__PURE__ */ new Date()).getTime();
  }
  function getInstanceId() {
    const s = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 10; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 16), 1);
    }
    return s.join("") + getTime();
  }
  function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  function isPromise(func) {
    return Object.prototype.toString.call(func) === "[object Promise]";
  }
  function addUnit(value, unit) {
    if (Object.prototype.toString.call(value) === "[object String]") {
      let tempValue = value;
      tempValue = tempValue.replace("rpx", "").replace("upx", "").replace("px", "");
      if (value.indexOf("rpx") === -1 && value.indexOf("upx") === -1 && value.indexOf("px") !== -1) {
        tempValue = parseFloat(tempValue) * 2;
      }
      value = tempValue;
    }
    return unit === "rpx" ? value + "rpx" : value / 2 + "px";
  }
  function deepCopy(obj) {
    if (typeof obj !== "object" || obj === null)
      return obj;
    let newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepCopy(obj[key]);
      }
    }
    return newObj;
  }
  function _handleDefaultConfig() {
    if (configLoaded)
      return;
    if (config_default && Object.keys(config_default).length) {
      config = config_default;
    }
    if (!config && uni.$zp) {
      config = uni.$zp.config;
    }
    config = config ? Object.keys(config).reduce((result, key) => {
      result[_toCamelCase(key)] = config[key];
      return result;
    }, {}) : null;
    configLoaded = true;
  }
  function _timeFormat(time, textMap) {
    const date = new Date(time);
    const currentDate = /* @__PURE__ */ new Date();
    const dateDay = new Date(time).setHours(0, 0, 0, 0);
    const currentDateDay = (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0);
    const disTime = dateDay - currentDateDay;
    let dayStr = "";
    const timeStr = _dateTimeFormat(date);
    if (disTime === 0) {
      dayStr = textMap.today;
    } else if (disTime === -864e5) {
      dayStr = textMap.yesterday;
    } else {
      dayStr = _dateDayFormat(date, date.getFullYear() !== currentDate.getFullYear());
    }
    return `${dayStr} ${timeStr}`;
  }
  function _dateDayFormat(date, showYear = true) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return showYear ? `${year}-${_fullZeroToTwo(month)}-${_fullZeroToTwo(day)}` : `${_fullZeroToTwo(month)}-${_fullZeroToTwo(day)}`;
  }
  function _dateTimeFormat(date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${_fullZeroToTwo(hour)}:${_fullZeroToTwo(minute)}`;
  }
  function _fullZeroToTwo(str) {
    str = str.toString();
    return str.length === 1 ? "0" + str : str;
  }
  function _toCamelCase(value) {
    return value.replace(/-([a-z])/g, (_, group1) => group1.toUpperCase());
  }
  var z_paging_utils_default = {
    gc,
    setRefesrherTime,
    getRefesrherFormatTimeByKey,
    getTouch,
    getTouchFromZPaging,
    getParent,
    convertToPx,
    getTime,
    getInstanceId,
    consoleErr,
    delay,
    wait,
    isPromise,
    addUnit,
    deepCopy,
    rpx2px
  };

  // D:/APP/novel-app/novel-app/uni_modules/z-paging/components/z-paging/wxs/z-paging-renderjs.js
  var data = {
    startY: 0,
    isTouchFromZPaging: false,
    isUsePageScroll: false,
    isReachedTop: true,
    isIosAndH5: false,
    useChatRecordMode: false,
    appLaunched: false
  };
  var z_paging_renderjs_default = {
    mounted() {
      if (window) {
        this._handleTouch();
        this.$ownerInstance.callMethod("_handlePageLaunch");
      }
    },
    methods: {
      // 接收逻辑层发送的数据（是否是ios+h5）
      renderPropIsIosAndH5Change(newVal) {
        if (newVal === -1)
          return;
        data.isIosAndH5 = newVal;
      },
      // 拦截处理touch事件
      _handleTouch() {
        if (!window.$zPagingRenderJsInited) {
          window.$zPagingRenderJsInited = true;
          window.addEventListener("touchstart", this._handleTouchstart, { passive: true });
          window.addEventListener("touchmove", this._handleTouchmove, { passive: false });
        }
      },
      // 处理touch开始
      _handleTouchstart(e) {
        const touch = z_paging_utils_default.getTouch(e);
        data.startY = touch.touchY;
        const touchResult = z_paging_utils_default.getTouchFromZPaging(e.target);
        data.isTouchFromZPaging = touchResult.isFromZp;
        data.isUsePageScroll = touchResult.isPageScroll;
        data.isReachedTop = touchResult.isReachedTop;
        data.useChatRecordMode = touchResult.isUseChatRecordMode;
      },
      // 处理touch中
      _handleTouchmove(e) {
        const touch = z_paging_utils_default.getTouch(e);
        const moveY = touch.touchY - data.startY;
        if (data.isTouchFromZPaging && (data.isReachedTop && (data.useChatRecordMode ? moveY < 0 : moveY > 0) || !data.useChatRecordMode && data.isIosAndH5 && !data.isUsePageScroll && moveY < 0)) {
          if (e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
          }
        }
      },
      // 移除touch相关事件监听
      _removeAllEventListener() {
        window.removeEventListener("touchstart");
        window.removeEventListener("touchmove");
      }
    }
  };

  // <stdin>
  var stdin_default = {
    name: "z-paging",
    mixins: [z_paging_renderjs_default]
  };
  return __toCommonJS(stdin_exports);
})();
