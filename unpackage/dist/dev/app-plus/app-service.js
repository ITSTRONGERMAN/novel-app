if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  var _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H;
  const mpMixin = {};
  const ON_SHOW = "onShow";
  const ON_HIDE = "onHide";
  const ON_LAUNCH = "onLaunch";
  const ON_LOAD = "onLoad";
  const ON_UNLOAD = "onUnload";
  const ON_BACK_PRESS = "onBackPress";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onHide = /* @__PURE__ */ createHook(ON_HIDE);
  const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const onUnload = /* @__PURE__ */ createHook(ON_UNLOAD);
  const onBackPress = /* @__PURE__ */ createHook(ON_BACK_PRESS);
  function email(value2) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value2);
  }
  function mobile(value2) {
    return /^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(value2);
  }
  function url(value2) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value2);
  }
  function date(value2) {
    if (!value2)
      return false;
    if (number(value2))
      value2 = +value2;
    return !/Invalid|NaN/.test(new Date(value2).toString());
  }
  function dateISO(value2) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value2);
  }
  function number(value2) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value2);
  }
  function string(value2) {
    return typeof value2 === "string";
  }
  function digits(value2) {
    return /^\d+$/.test(value2);
  }
  function idCard(value2) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value2
    );
  }
  function carNo(value2) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value2.length === 7) {
      return creg.test(value2);
    }
    if (value2.length === 8) {
      return xreg.test(value2);
    }
    return false;
  }
  function amount(value2) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value2);
  }
  function chinese(value2) {
    const reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value2);
  }
  function letter(value2) {
    return /^[a-zA-Z]*$/.test(value2);
  }
  function enOrNum(value2) {
    const reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value2);
  }
  function contains(value2, param) {
    return value2.indexOf(param) >= 0;
  }
  function range$1(value2, param) {
    return value2 >= param[0] && value2 <= param[1];
  }
  function rangeLength(value2, param) {
    return value2.length >= param[0] && value2.length <= param[1];
  }
  function landline(value2) {
    const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value2);
  }
  function empty(value2) {
    switch (typeof value2) {
      case "undefined":
        return true;
      case "string":
        if (value2.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value2)
          return true;
        break;
      case "number":
        if (value2 === 0 || isNaN(value2))
          return true;
        break;
      case "object":
        if (value2 === null || value2.length === 0)
          return true;
        for (const i in value2) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value2) {
    if (typeof value2 === "string") {
      try {
        const obj = JSON.parse(value2);
        if (typeof obj === "object" && obj) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value2) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value2);
    }
    return Object.prototype.toString.call(value2) === "[object Array]";
  }
  function object(value2) {
    return Object.prototype.toString.call(value2) === "[object Object]";
  }
  function code(value2, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value2);
  }
  function func(value2) {
    return typeof value2 === "function";
  }
  function promise(value2) {
    return object(value2) && func(value2.then) && func(value2.catch);
  }
  function image(value2) {
    const newValue = value2.split("?")[0];
    const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
    return IMAGE_REGEXP.test(newValue);
  }
  function video(value2) {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
    return VIDEO_REGEXP.test(value2);
  }
  function regExp(o) {
    return o && Object.prototype.toString.call(o) === "[object RegExp]";
  }
  const test = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    amount,
    array,
    carNo,
    chinese,
    code,
    contains,
    date,
    dateISO,
    digits,
    email,
    empty,
    enOrNum,
    func,
    idCard,
    image,
    jsonString,
    landline,
    letter,
    mobile,
    number,
    object,
    promise,
    range: range$1,
    rangeLength,
    regExp,
    string,
    url,
    video
  }, Symbol.toStringTag, { value: "Module" }));
  function strip(num, precision = 15) {
    return +parseFloat(Number(num).toPrecision(precision));
  }
  function digitLength(num) {
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  }
  function float2Fixed(num) {
    if (num.toString().indexOf("e") === -1) {
      return Number(num.toString().replace(".", ""));
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  }
  function checkBoundary(num) {
    {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        formatAppLog("warn", "at uni_modules/uv-ui-tools/libs/function/digit.js:45", `${num} 超出了精度限制，结果可能不正确`);
      }
    }
  }
  function iteratorOperation(arr, operation) {
    const [num1, num2, ...others] = arr;
    let res = operation(num1, num2);
    others.forEach((num) => {
      res = operation(res, num);
    });
    return res;
  }
  function times(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, times);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    const baseNum = digitLength(num1) + digitLength(num2);
    const leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
  }
  function divide(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, divide);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
  }
  function round(num, ratio) {
    const base = Math.pow(10, ratio);
    let result = divide(Math.round(Math.abs(times(num, base))), base);
    if (num < 0 && result !== 0) {
      result = times(result, -1);
    }
    return result;
  }
  function range(min = 0, max = 0, value2 = 0) {
    return Math.max(min, Math.min(max, Number(value2)));
  }
  function getPx(value2, unit = false) {
    if (number(value2)) {
      return unit ? `${value2}px` : Number(value2);
    }
    if (/(rpx|upx)$/.test(value2)) {
      return unit ? `${uni.upx2px(parseInt(value2))}px` : Number(uni.upx2px(parseInt(value2)));
    }
    return unit ? `${parseInt(value2)}px` : parseInt(value2);
  }
  function sleep(value2 = 30) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, value2);
    });
  }
  function os() {
    return uni.getSystemInfoSync().platform.toLowerCase();
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      const gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    }
    return 0;
  }
  function guid(len = 32, firstU = true, radix = null) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return `u${uuid.join("")}`;
    }
    return uuid.join("");
  }
  function $parent(name2 = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name2) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function addStyle(customStyle, target = "object") {
    if (empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i = 0; i < styleArray.length; i++) {
        if (styleArray[i]) {
          const item = styleArray[i].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i in customStyle) {
      const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i]};`;
    }
    return trim(string2);
  }
  function addUnit$2(value2 = "auto", unit = ((_b) => (_b = ((_a) => (_a = uni == null ? void 0 : uni.$uv) == null ? void 0 : _a.config)()) == null ? void 0 : _b.unit)() ? ((_d) => (_d = ((_c) => (_c = uni == null ? void 0 : uni.$uv) == null ? void 0 : _c.config)()) == null ? void 0 : _d.unit)() : "px") {
    value2 = String(value2);
    return number(value2) ? `${value2}${unit}` : value2;
  }
  function deepClone(obj, cache = /* @__PURE__ */ new WeakMap()) {
    if (obj === null || typeof obj !== "object")
      return obj;
    if (cache.has(obj))
      return cache.get(obj);
    let clone;
    if (obj instanceof Date) {
      clone = new Date(obj.getTime());
    } else if (obj instanceof RegExp) {
      clone = new RegExp(obj);
    } else if (obj instanceof Map) {
      clone = new Map(Array.from(obj, ([key, value2]) => [key, deepClone(value2, cache)]));
    } else if (obj instanceof Set) {
      clone = new Set(Array.from(obj, (value2) => deepClone(value2, cache)));
    } else if (Array.isArray(obj)) {
      clone = obj.map((value2) => deepClone(value2, cache));
    } else if (Object.prototype.toString.call(obj) === "[object Object]") {
      clone = Object.create(Object.getPrototypeOf(obj));
      cache.set(obj, clone);
      for (const [key, value2] of Object.entries(obj)) {
        clone[key] = deepClone(value2, cache);
      }
    } else {
      clone = Object.assign({}, obj);
    }
    cache.set(obj, clone);
    return clone;
  }
  function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || target === null || typeof source !== "object" || source === null)
      return target;
    const merged = Array.isArray(target) ? target.slice() : Object.assign({}, target);
    for (const prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      const sourceValue = source[prop];
      const targetValue = merged[prop];
      if (sourceValue instanceof Date) {
        merged[prop] = new Date(sourceValue);
      } else if (sourceValue instanceof RegExp) {
        merged[prop] = new RegExp(sourceValue);
      } else if (sourceValue instanceof Map) {
        merged[prop] = new Map(sourceValue);
      } else if (sourceValue instanceof Set) {
        merged[prop] = new Set(sourceValue);
      } else if (typeof sourceValue === "object" && sourceValue !== null) {
        merged[prop] = deepMerge(targetValue, sourceValue);
      } else {
        merged[prop] = sourceValue;
      }
    }
    return merged;
  }
  function error$1(err) {
    {
      formatAppLog("error", "at uni_modules/uv-ui-tools/libs/function/index.js:250", `uvui提示：${err}`);
    }
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]") {
        throw new TypeError(
          "fillString must be String"
        );
      }
      const str = this;
      if (str.length >= maxLength)
        return String(str);
      const fillLength = maxLength - str.length;
      let times2 = Math.ceil(fillLength / fillString.length);
      while (times2 >>= 1) {
        fillString += fillString;
        if (times2 === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, formatStr = "yyyy-mm-dd") {
    let date2;
    if (!dateTime) {
      date2 = /* @__PURE__ */ new Date();
    } else if (/^\d{10}$/.test(dateTime == null ? void 0 : dateTime.toString().trim())) {
      date2 = new Date(dateTime * 1e3);
    } else if (typeof dateTime === "string" && /^\d+$/.test(dateTime.trim())) {
      date2 = new Date(Number(dateTime));
    } else if (typeof dateTime === "string" && dateTime.includes("-") && !dateTime.includes("T")) {
      date2 = new Date(dateTime.replace(/-/g, "/"));
    } else {
      date2 = new Date(dateTime);
    }
    const timeSource = {
      "y": date2.getFullYear().toString(),
      // 年
      "m": (date2.getMonth() + 1).toString().padStart(2, "0"),
      // 月
      "d": date2.getDate().toString().padStart(2, "0"),
      // 日
      "h": date2.getHours().toString().padStart(2, "0"),
      // 时
      "M": date2.getMinutes().toString().padStart(2, "0"),
      // 分
      "s": date2.getSeconds().toString().padStart(2, "0")
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const key in timeSource) {
      const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
      if (ret) {
        const beginIndex = key === "y" && ret.length === 2 ? 2 : 0;
        formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
      }
    }
    return formatStr;
  }
  function timeFrom(timestamp = null, format = "yyyy-mm-dd") {
    if (timestamp == null)
      timestamp = Number(/* @__PURE__ */ new Date());
    timestamp = parseInt(timestamp);
    if (timestamp.toString().length == 10)
      timestamp *= 1e3;
    let timer = (/* @__PURE__ */ new Date()).getTime() - timestamp;
    timer = parseInt(timer / 1e3);
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = `${parseInt(timer / 60)}分钟前`;
        break;
      case (timer >= 3600 && timer < 86400):
        tips = `${parseInt(timer / 3600)}小时前`;
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = `${parseInt(timer / 86400)}天前`;
        break;
      default:
        if (format === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = `${parseInt(timer / (86400 * 30))}个月前`;
          } else {
            tips = `${parseInt(timer / (86400 * 365))}年前`;
          }
        } else {
          tips = timeFormat(timestamp, format);
        }
    }
    return tips;
  }
  function trim(str, pos = "both") {
    str = String(str);
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    }
    if (pos == "left") {
      return str.replace(/^\s*/, "");
    }
    if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    }
    if (pos == "all") {
      return str.replace(/\s+/g, "");
    }
    return str;
  }
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    const prefix = isPrefix ? "?" : "";
    const _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (const key in data) {
      const value2 = data[key];
      if (["", void 0, null].indexOf(value2) >= 0) {
        continue;
      }
      if (value2.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value2.length; i++) {
              _result.push(`${key}[${i}]=${value2[i]}`);
            }
            break;
          case "brackets":
            value2.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
            break;
          case "repeat":
            value2.forEach((_value) => {
              _result.push(`${key}=${_value}`);
            });
            break;
          case "comma":
            let commaStr = "";
            value2.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(`${key}=${commaStr}`);
            break;
          default:
            value2.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
        }
      } else {
        _result.push(`${key}=${value2}`);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  function toast(title, duration = 2e3) {
    uni.showToast({
      title: String(title),
      icon: "none",
      duration
    });
  }
  function type2icon(type = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type) == -1)
      type = "success";
    let iconName = "";
    switch (type) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function priceFormat(number2, decimals = 0, decimalPoint = ".", thousandsSeparator = ",") {
    number2 = `${number2}`.replace(/[^0-9+-Ee.]/g, "");
    const n = !isFinite(+number2) ? 0 : +number2;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSeparator === "undefined" ? "," : thousandsSeparator;
    const dec = typeof decimalPoint === "undefined" ? "." : decimalPoint;
    let s = "";
    s = (prec ? round(n, prec) + "" : `${Math.round(n)}`).split(".");
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, `$1${sep}$2`);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  }
  function getDuration(value2, unit = true) {
    const valueNum = parseInt(value2);
    if (unit) {
      if (/s$/.test(value2))
        return value2;
      return value2 > 30 ? `${value2}ms` : `${value2}s`;
    }
    if (/ms$/.test(value2))
      return valueNum;
    if (/s$/.test(value2))
      return valueNum > 30 ? valueNum : valueNum * 1e3;
    return valueNum;
  }
  function padZero(value2) {
    return `00${value2}`.slice(-2);
  }
  function formValidate(instance, event) {
    const formItem = $parent.call(instance, "uv-form-item");
    const form = $parent.call(instance, "uv-form");
    if (formItem && form) {
      form.validateField(formItem.prop, () => {
      }, event);
    }
  }
  function getProperty(obj, key) {
    if (!obj) {
      return;
    }
    if (typeof key !== "string" || key === "") {
      return "";
    }
    if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      let firstObj = obj[keys[0]] || {};
      for (let i = 1; i < keys.length; i++) {
        if (firstObj) {
          firstObj = firstObj[keys[i]];
        }
      }
      return firstObj;
    }
    return obj[key];
  }
  function setProperty(obj, key, value2) {
    if (!obj) {
      return;
    }
    const inFn = function(_obj, keys, v) {
      if (keys.length === 1) {
        _obj[keys[0]] = v;
        return;
      }
      while (keys.length > 1) {
        const k = keys[0];
        if (!_obj[k] || typeof _obj[k] !== "object") {
          _obj[k] = {};
        }
        keys.shift();
        inFn(_obj[k], keys, v);
      }
    };
    if (typeof key !== "string" || key === "")
      ;
    else if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      inFn(obj, keys, value2);
    } else {
      obj[key] = value2;
    }
  }
  function page() {
    var _a;
    const pages2 = getCurrentPages();
    const route2 = (_a = pages2[pages2.length - 1]) == null ? void 0 : _a.route;
    return `/${route2 ? route2 : ""}`;
  }
  function pages() {
    const pages2 = getCurrentPages();
    return pages2;
  }
  function getHistoryPage(back = 0) {
    const pages2 = getCurrentPages();
    const len = pages2.length;
    return pages2[len - 1 + back];
  }
  function setConfig({
    props: props2 = {},
    config: config2 = {},
    color = {},
    zIndex = {}
  }) {
    const {
      deepMerge: deepMerge2
    } = uni.$uv;
    uni.$uv.config = deepMerge2(uni.$uv.config, config2);
    uni.$uv.props = deepMerge2(uni.$uv.props, props2);
    uni.$uv.color = deepMerge2(uni.$uv.color, color);
    uni.$uv.zIndex = deepMerge2(uni.$uv.zIndex, zIndex);
  }
  const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    $parent,
    addStyle,
    addUnit: addUnit$2,
    deepClone,
    deepMerge,
    error: error$1,
    formValidate,
    getDuration,
    getHistoryPage,
    getProperty,
    getPx,
    guid,
    os,
    padZero,
    page,
    pages,
    priceFormat,
    queryParams,
    random,
    randomArray,
    range,
    setConfig,
    setProperty,
    sleep,
    sys,
    timeFormat,
    timeFrom,
    toast,
    trim,
    type2icon
  }, Symbol.toStringTag, { value: "Module" }));
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false,
        // 是否需要拦截
        events: {}
        // 页面间通信接口，用于监听被打开页面发送到当前页面的数据。hbuilderx 2.8.9+ 开始支持。
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = queryParams(params, false);
        return url2 += `&${query}`;
      }
      query = queryParams(params);
      return url2 += query;
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig = {};
      if (typeof options === "string") {
        mergeConfig.url = this.mixinParam(options, params);
        mergeConfig.type = "navigateTo";
      } else {
        mergeConfig = deepMerge(this.config, options);
        mergeConfig.url = this.mixinParam(options.url, options.params);
      }
      if (mergeConfig.url === page())
        return;
      if (params.intercept) {
        mergeConfig.intercept = params.intercept;
      }
      mergeConfig.params = params;
      mergeConfig = deepMerge(this.config, mergeConfig);
      if (typeof mergeConfig.intercept === "function") {
        const isNext = await new Promise((resolve, reject2) => {
          mergeConfig.intercept(mergeConfig, resolve);
        });
        isNext && this.openPage(mergeConfig);
      } else {
        this.openPage(mergeConfig);
      }
    }
    // 执行路由跳转
    openPage(config2) {
      const {
        url: url2,
        type,
        delta,
        animationType,
        animationDuration,
        events
      } = config2;
      if (config2.type == "navigateTo" || config2.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration,
          events
        });
      }
      if (config2.type == "redirectTo" || config2.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config2.type == "switchTab" || config2.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config2.type == "reLaunch" || config2.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config2.type == "navigateBack" || config2.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  let timeout = null;
  function debounce(func2, wait2 = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait2);
      if (callNow)
        typeof func2 === "function" && func2();
    } else {
      timeout = setTimeout(() => {
        typeof func2 === "function" && func2();
      }, wait2);
    }
  }
  let flag;
  function throttle(func2, wait2 = 500, immediate = true) {
    if (immediate) {
      if (!flag) {
        flag = true;
        typeof func2 === "function" && func2();
        setTimeout(() => {
          flag = false;
        }, wait2);
      }
    } else if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
        typeof func2 === "function" && func2();
      }, wait2);
    }
  }
  const mixin = {
    // 定义每个组件都可能需要用到的外部样式以及类名
    props: {
      // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
      customStyle: {
        type: [Object, String],
        default: () => ({})
      },
      customClass: {
        type: String,
        default: ""
      },
      // 跳转的页面路径
      url: {
        type: String,
        default: ""
      },
      // 页面跳转的类型
      linkType: {
        type: String,
        default: "navigateTo"
      }
    },
    data() {
      return {};
    },
    onLoad() {
      this.$uv.getRect = this.$uvGetRect;
    },
    created() {
      this.$uv.getRect = this.$uvGetRect;
    },
    computed: {
      $uv() {
        var _a, _b;
        return {
          ...index,
          test,
          route,
          debounce,
          throttle,
          unit: (_b = (_a = uni == null ? void 0 : uni.$uv) == null ? void 0 : _a.config) == null ? void 0 : _b.unit
        };
      },
      /**
       * 生成bem规则类名
       * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
       * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
       * @param {String} name 组件名称
       * @param {Array} fixed 一直会存在的类名
       * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
       * @returns {Array|string}
       */
      bem() {
        return function(name2, fixed, change) {
          const prefix = `uv-${name2}--`;
          const classes = {};
          if (fixed) {
            fixed.map((item) => {
              classes[prefix + this[item]] = true;
            });
          }
          if (change) {
            change.map((item) => {
              this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
            });
          }
          return Object.keys(classes);
        };
      }
    },
    methods: {
      // 跳转某一个页面
      openPage(urlKey = "url") {
        const url2 = this[urlKey];
        if (url2) {
          uni[this.linkType]({
            url: url2
          });
        }
      },
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uvGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = {};
        this.parent = this.$uv.$parent.call(this, parentName);
        if (this.parent.children) {
          this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
        }
        if (this.parent && this.parentData) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && typeof e.stopPropagation === "function" && e.stopPropagation();
      },
      // 空操作
      noop(e) {
        this.preventEvent(e);
      }
    },
    onReachBottom() {
      uni.$emit("uvOnReachBottom");
    },
    beforeDestroy() {
      if (this.parent && array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    },
    // 兼容vue3
    unmounted() {
      if (this.parent && array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    }
  };
  const icons = {
    "uvicon-level": "e68f",
    "uvicon-checkbox-mark": "e659",
    "uvicon-folder": "e694",
    "uvicon-movie": "e67c",
    "uvicon-star-fill": "e61e",
    "uvicon-star": "e618",
    "uvicon-phone-fill": "e6ac",
    "uvicon-phone": "e6ba",
    "uvicon-apple-fill": "e635",
    "uvicon-backspace": "e64d",
    "uvicon-attach": "e640",
    "uvicon-empty-data": "e671",
    "uvicon-empty-address": "e68a",
    "uvicon-empty-favor": "e662",
    "uvicon-empty-car": "e657",
    "uvicon-empty-order": "e66b",
    "uvicon-empty-list": "e672",
    "uvicon-empty-search": "e677",
    "uvicon-empty-permission": "e67d",
    "uvicon-empty-news": "e67e",
    "uvicon-empty-history": "e685",
    "uvicon-empty-coupon": "e69b",
    "uvicon-empty-page": "e60e",
    "uvicon-empty-wifi-off": "e6cc",
    "uvicon-reload": "e627",
    "uvicon-order": "e695",
    "uvicon-server-man": "e601",
    "uvicon-search": "e632",
    "uvicon-more-dot-fill": "e66f",
    "uvicon-scan": "e631",
    "uvicon-map": "e665",
    "uvicon-map-fill": "e6a8",
    "uvicon-tags": "e621",
    "uvicon-tags-fill": "e613",
    "uvicon-eye": "e664",
    "uvicon-eye-fill": "e697",
    "uvicon-eye-off": "e69c",
    "uvicon-eye-off-outline": "e688",
    "uvicon-mic": "e66d",
    "uvicon-mic-off": "e691",
    "uvicon-calendar": "e65c",
    "uvicon-trash": "e623",
    "uvicon-trash-fill": "e6ce",
    "uvicon-play-left": "e6bf",
    "uvicon-play-right": "e6b3",
    "uvicon-minus": "e614",
    "uvicon-plus": "e625",
    "uvicon-info-circle": "e69f",
    "uvicon-info-circle-fill": "e6a7",
    "uvicon-question-circle": "e622",
    "uvicon-question-circle-fill": "e6bc",
    "uvicon-close": "e65a",
    "uvicon-checkmark": "e64a",
    "uvicon-checkmark-circle": "e643",
    "uvicon-checkmark-circle-fill": "e668",
    "uvicon-setting": "e602",
    "uvicon-setting-fill": "e6d0",
    "uvicon-heart": "e6a2",
    "uvicon-heart-fill": "e68b",
    "uvicon-camera": "e642",
    "uvicon-camera-fill": "e650",
    "uvicon-more-circle": "e69e",
    "uvicon-more-circle-fill": "e684",
    "uvicon-chat": "e656",
    "uvicon-chat-fill": "e63f",
    "uvicon-bag": "e647",
    "uvicon-error-circle": "e66e",
    "uvicon-error-circle-fill": "e655",
    "uvicon-close-circle": "e64e",
    "uvicon-close-circle-fill": "e666",
    "uvicon-share": "e629",
    "uvicon-share-fill": "e6bb",
    "uvicon-share-square": "e6c4",
    "uvicon-shopping-cart": "e6cb",
    "uvicon-shopping-cart-fill": "e630",
    "uvicon-bell": "e651",
    "uvicon-bell-fill": "e604",
    "uvicon-list": "e690",
    "uvicon-list-dot": "e6a9",
    "uvicon-zhifubao-circle-fill": "e617",
    "uvicon-weixin-circle-fill": "e6cd",
    "uvicon-weixin-fill": "e620",
    "uvicon-qq-fill": "e608",
    "uvicon-qq-circle-fill": "e6b9",
    "uvicon-moments-circel-fill": "e6c2",
    "uvicon-moments": "e6a0",
    "uvicon-car": "e64f",
    "uvicon-car-fill": "e648",
    "uvicon-warning-fill": "e6c7",
    "uvicon-warning": "e6c1",
    "uvicon-clock-fill": "e64b",
    "uvicon-clock": "e66c",
    "uvicon-edit-pen": "e65d",
    "uvicon-edit-pen-fill": "e679",
    "uvicon-email": "e673",
    "uvicon-email-fill": "e683",
    "uvicon-minus-circle": "e6a5",
    "uvicon-plus-circle": "e603",
    "uvicon-plus-circle-fill": "e611",
    "uvicon-file-text": "e687",
    "uvicon-file-text-fill": "e67f",
    "uvicon-pushpin": "e6d1",
    "uvicon-pushpin-fill": "e6b6",
    "uvicon-grid": "e68c",
    "uvicon-grid-fill": "e698",
    "uvicon-play-circle": "e6af",
    "uvicon-play-circle-fill": "e62a",
    "uvicon-pause-circle-fill": "e60c",
    "uvicon-pause": "e61c",
    "uvicon-pause-circle": "e696",
    "uvicon-gift-fill": "e6b0",
    "uvicon-gift": "e680",
    "uvicon-kefu-ermai": "e660",
    "uvicon-server-fill": "e610",
    "uvicon-coupon-fill": "e64c",
    "uvicon-coupon": "e65f",
    "uvicon-integral": "e693",
    "uvicon-integral-fill": "e6b1",
    "uvicon-home-fill": "e68e",
    "uvicon-home": "e67b",
    "uvicon-account": "e63a",
    "uvicon-account-fill": "e653",
    "uvicon-thumb-down-fill": "e628",
    "uvicon-thumb-down": "e60a",
    "uvicon-thumb-up": "e612",
    "uvicon-thumb-up-fill": "e62c",
    "uvicon-lock-fill": "e6a6",
    "uvicon-lock-open": "e68d",
    "uvicon-lock-opened-fill": "e6a1",
    "uvicon-lock": "e69d",
    "uvicon-red-packet": "e6c3",
    "uvicon-photo-fill": "e6b4",
    "uvicon-photo": "e60d",
    "uvicon-volume-off-fill": "e6c8",
    "uvicon-volume-off": "e6bd",
    "uvicon-volume-fill": "e624",
    "uvicon-volume": "e605",
    "uvicon-download": "e670",
    "uvicon-arrow-up-fill": "e636",
    "uvicon-arrow-down-fill": "e638",
    "uvicon-play-left-fill": "e6ae",
    "uvicon-play-right-fill": "e6ad",
    "uvicon-arrow-downward": "e634",
    "uvicon-arrow-leftward": "e63b",
    "uvicon-arrow-rightward": "e644",
    "uvicon-arrow-upward": "e641",
    "uvicon-arrow-down": "e63e",
    "uvicon-arrow-right": "e63c",
    "uvicon-arrow-left": "e646",
    "uvicon-arrow-up": "e633",
    "uvicon-skip-back-left": "e6c5",
    "uvicon-skip-forward-right": "e61f",
    "uvicon-arrow-left-double": "e637",
    "uvicon-man": "e675",
    "uvicon-woman": "e626",
    "uvicon-en": "e6b8",
    "uvicon-twitte": "e607",
    "uvicon-twitter-circle-fill": "e6cf"
  };
  const props$e = {
    props: {
      // 图标类名
      name: {
        type: String,
        default: ""
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: "#606266"
      },
      // 字体大小，单位px
      size: {
        type: [String, Number],
        default: "16px"
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: false
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [String, Number],
        default: null
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: "uvicon"
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: ""
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: "right"
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: "15px"
      },
      // label的颜色
      labelColor: {
        type: String,
        default: "#606266"
      },
      // label与图标的距离
      space: {
        type: [String, Number],
        default: "3px"
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: "aspectFit"
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: ""
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: ""
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: 0
      },
      // 是否阻止事件传播
      stop: {
        type: Boolean,
        default: false
      },
      ...(_f = (_e = uni.$uv) == null ? void 0 : _e.props) == null ? void 0 : _f.icon
    }
  };
  const _export_sfc = (sfc, props2) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props2) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$17 = {
    name: "uv-icon",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$e],
    data() {
      return {
        colorType: [
          "primary",
          "success",
          "info",
          "error",
          "warning"
        ]
      };
    },
    computed: {
      uClasses() {
        let classes = [];
        classes.push(this.customPrefix);
        classes.push(this.customPrefix + "-" + this.name);
        if (this.color && this.colorType.includes(this.color))
          classes.push("uv-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: this.$uv.addUnit(this.size),
          lineHeight: this.$uv.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$uv.addUnit(this.top)
        };
        if (this.color && !this.colorType.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        const isBase64 = this.name.indexOf("data:") > -1 && this.name.indexOf("base64") > -1;
        return this.name.indexOf("/") !== -1 || isBase64;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? this.$uv.addUnit(this.width) : this.$uv.addUnit(this.size);
        style.height = this.height ? this.$uv.addUnit(this.height) : this.$uv.addUnit(this.size);
        return style;
      },
      // 通过图标名，查找对应的图标
      icon() {
        const code2 = icons["uvicon-" + this.name];
        return code2 ? unescape(`%u${code2}`) : ["uvicon"].indexOf(this.customPrefix) > -1 ? this.name : "";
      }
    },
    methods: {
      clickHandler(e) {
        this.$emit("click", this.index);
        this.stop && this.preventEvent(e);
      }
    }
  };
  function _sfc_render$16(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-icon", ["uv-icon--" + _ctx.labelPos]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "uv-icon__img",
          src: _ctx.name,
          mode: _ctx.imgMode,
          style: vue.normalizeStyle([$options.imgStyle, _ctx.$uv.addStyle(_ctx.customStyle)])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("text", {
          key: 1,
          class: vue.normalizeClass(["uv-icon__icon", $options.uClasses]),
          style: vue.normalizeStyle([$options.iconStyle, _ctx.$uv.addStyle(_ctx.customStyle)]),
          "hover-class": _ctx.hoverClass
        }, vue.toDisplayString($options.icon), 15, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 '),
        _ctx.label !== "" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "uv-icon__label",
            style: vue.normalizeStyle({
              color: _ctx.labelColor,
              fontSize: _ctx.$uv.addUnit(_ctx.labelSize),
              marginLeft: _ctx.labelPos == "right" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginTop: _ctx.labelPos == "bottom" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginRight: _ctx.labelPos == "left" ? _ctx.$uv.addUnit(_ctx.space) : 0,
              marginBottom: _ctx.labelPos == "top" ? _ctx.$uv.addUnit(_ctx.space) : 0
            })
          },
          vue.toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_0$9 = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["render", _sfc_render$16], ["__scopeId", "data-v-b7a6dd5d"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-icon/components/uv-icon/uv-icon.vue"]]);
  const _sfc_main$16 = {
    __name: "top-tabbar",
    props: {
      value: {
        type: Number,
        default: 0
      },
      id: {
        type: String,
        default: ""
      },
      tabBarList: {
        type: Array,
        default: () => []
      }
    },
    emits: ["change"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props2 = __props;
      const emits = __emit;
      const handelChangeTabbarItem = (e) => {
        emits("change", e);
      };
      const __returned__ = { props: props2, emits, handelChangeTabbarItem, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$15(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      id: $props.id,
      class: "top-tapbar"
    }, [
      vue.createElementVNode("view", { class: "l" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.tabBarList, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass(["item", $props.value == index2 ? "active" : ""]),
              key: index2,
              onClick: ($event) => $setup.handelChangeTabbarItem({ name: item, index: index2 })
            }, vue.toDisplayString(item), 11, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ], 8, ["id"]);
  }
  const topTabbar = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["render", _sfc_render$15], ["__scopeId", "data-v-11dcda35"], ["__file", "D:/APP/novel-app/novel-app/components/common/top-tabbar/top-tabbar.vue"]]);
  const getSystemInfo = () => {
    return new Promise((resolve, reject2) => {
      uni.getSystemInfo({
        success(res) {
          resolve(res);
        }
      });
    });
  };
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = { ...defaultSettings };
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value2) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value2));
          } catch (e) {
          }
          currentSettings = value2;
        }
      };
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value2) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value2);
        }
      });
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(pluginDescriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * vuex v4.1.0
   * (c) 2022 Evan You
   * @license MIT
   */
  var storeKey = "store";
  function useStore(key) {
    if (key === void 0)
      key = null;
    return vue.inject(key !== null ? key : storeKey);
  }
  function forEachValue(obj, fn) {
    Object.keys(obj).forEach(function(key) {
      return fn(obj[key], key);
    });
  }
  function isObject$1(obj) {
    return obj !== null && typeof obj === "object";
  }
  function isPromise$1(val) {
    return val && typeof val.then === "function";
  }
  function assert(condition, msg) {
    if (!condition) {
      throw new Error("[vuex] " + msg);
    }
  }
  function partial(fn, arg) {
    return function() {
      return fn(arg);
    };
  }
  function genericSubscribe(fn, subs, options) {
    if (subs.indexOf(fn) < 0) {
      options && options.prepend ? subs.unshift(fn) : subs.push(fn);
    }
    return function() {
      var i = subs.indexOf(fn);
      if (i > -1) {
        subs.splice(i, 1);
      }
    };
  }
  function resetStore(store2, hot) {
    store2._actions = /* @__PURE__ */ Object.create(null);
    store2._mutations = /* @__PURE__ */ Object.create(null);
    store2._wrappedGetters = /* @__PURE__ */ Object.create(null);
    store2._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    var state = store2.state;
    installModule(store2, state, [], store2._modules.root, true);
    resetStoreState(store2, state, hot);
  }
  function resetStoreState(store2, state, hot) {
    var oldState = store2._state;
    var oldScope = store2._scope;
    store2.getters = {};
    store2._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    var wrappedGetters = store2._wrappedGetters;
    var computedObj = {};
    var computedCache = {};
    var scope = vue.effectScope(true);
    scope.run(function() {
      forEachValue(wrappedGetters, function(fn, key) {
        computedObj[key] = partial(fn, store2);
        computedCache[key] = vue.computed(function() {
          return computedObj[key]();
        });
        Object.defineProperty(store2.getters, key, {
          get: function() {
            return computedCache[key].value;
          },
          enumerable: true
          // for local getters
        });
      });
    });
    store2._state = vue.reactive({
      data: state
    });
    store2._scope = scope;
    if (store2.strict) {
      enableStrictMode(store2);
    }
    if (oldState) {
      if (hot) {
        store2._withCommit(function() {
          oldState.data = null;
        });
      }
    }
    if (oldScope) {
      oldScope.stop();
    }
  }
  function installModule(store2, rootState, path, module, hot) {
    var isRoot = !path.length;
    var namespace = store2._modules.getNamespace(path);
    if (module.namespaced) {
      if (store2._modulesNamespaceMap[namespace] && true) {
        console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
      }
      store2._modulesNamespaceMap[namespace] = module;
    }
    if (!isRoot && !hot) {
      var parentState = getNestedState(rootState, path.slice(0, -1));
      var moduleName2 = path[path.length - 1];
      store2._withCommit(function() {
        {
          if (moduleName2 in parentState) {
            console.warn(
              '[vuex] state field "' + moduleName2 + '" was overridden by a module with the same name at "' + path.join(".") + '"'
            );
          }
        }
        parentState[moduleName2] = module.state;
      });
    }
    var local = module.context = makeLocalContext(store2, namespace, path);
    module.forEachMutation(function(mutation, key) {
      var namespacedType = namespace + key;
      registerMutation(store2, namespacedType, mutation, local);
    });
    module.forEachAction(function(action, key) {
      var type = action.root ? key : namespace + key;
      var handler = action.handler || action;
      registerAction(store2, type, handler, local);
    });
    module.forEachGetter(function(getter, key) {
      var namespacedType = namespace + key;
      registerGetter(store2, namespacedType, getter, local);
    });
    module.forEachChild(function(child, key) {
      installModule(store2, rootState, path.concat(key), child, hot);
    });
  }
  function makeLocalContext(store2, namespace, path) {
    var noNamespace = namespace === "";
    var local = {
      dispatch: noNamespace ? store2.dispatch : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._actions[type]) {
            console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
            return;
          }
        }
        return store2.dispatch(type, payload);
      },
      commit: noNamespace ? store2.commit : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._mutations[type]) {
            console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
            return;
          }
        }
        store2.commit(type, payload, options);
      }
    };
    Object.defineProperties(local, {
      getters: {
        get: noNamespace ? function() {
          return store2.getters;
        } : function() {
          return makeLocalGetters(store2, namespace);
        }
      },
      state: {
        get: function() {
          return getNestedState(store2.state, path);
        }
      }
    });
    return local;
  }
  function makeLocalGetters(store2, namespace) {
    if (!store2._makeLocalGettersCache[namespace]) {
      var gettersProxy = {};
      var splitPos = namespace.length;
      Object.keys(store2.getters).forEach(function(type) {
        if (type.slice(0, splitPos) !== namespace) {
          return;
        }
        var localType = type.slice(splitPos);
        Object.defineProperty(gettersProxy, localType, {
          get: function() {
            return store2.getters[type];
          },
          enumerable: true
        });
      });
      store2._makeLocalGettersCache[namespace] = gettersProxy;
    }
    return store2._makeLocalGettersCache[namespace];
  }
  function registerMutation(store2, type, handler, local) {
    var entry = store2._mutations[type] || (store2._mutations[type] = []);
    entry.push(function wrappedMutationHandler(payload) {
      handler.call(store2, local.state, payload);
    });
  }
  function registerAction(store2, type, handler, local) {
    var entry = store2._actions[type] || (store2._actions[type] = []);
    entry.push(function wrappedActionHandler(payload) {
      var res = handler.call(store2, {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store2.getters,
        rootState: store2.state
      }, payload);
      if (!isPromise$1(res)) {
        res = Promise.resolve(res);
      }
      if (store2._devtoolHook) {
        return res.catch(function(err) {
          store2._devtoolHook.emit("vuex:error", err);
          throw err;
        });
      } else {
        return res;
      }
    });
  }
  function registerGetter(store2, type, rawGetter, local) {
    if (store2._wrappedGetters[type]) {
      {
        console.error("[vuex] duplicate getter key: " + type);
      }
      return;
    }
    store2._wrappedGetters[type] = function wrappedGetter(store22) {
      return rawGetter(
        local.state,
        // local state
        local.getters,
        // local getters
        store22.state,
        // root state
        store22.getters
        // root getters
      );
    };
  }
  function enableStrictMode(store2) {
    vue.watch(function() {
      return store2._state.data;
    }, function() {
      {
        assert(store2._committing, "do not mutate vuex store state outside mutation handlers.");
      }
    }, { deep: true, flush: "sync" });
  }
  function getNestedState(state, path) {
    return path.reduce(function(state2, key) {
      return state2[key];
    }, state);
  }
  function unifyObjectStyle(type, payload, options) {
    if (isObject$1(type) && type.type) {
      options = payload;
      payload = type;
      type = type.type;
    }
    {
      assert(typeof type === "string", "expects string as the type, but found " + typeof type + ".");
    }
    return { type, payload, options };
  }
  var LABEL_VUEX_BINDINGS = "vuex bindings";
  var MUTATIONS_LAYER_ID = "vuex:mutations";
  var ACTIONS_LAYER_ID = "vuex:actions";
  var INSPECTOR_ID = "vuex";
  var actionId = 0;
  function addDevtools(app, store2) {
    setupDevtoolsPlugin(
      {
        id: "org.vuejs.vuex",
        app,
        label: "Vuex",
        homepage: "https://next.vuex.vuejs.org/",
        logo: "https://vuejs.org/images/icons/favicon-96x96.png",
        packageName: "vuex",
        componentStateTypes: [LABEL_VUEX_BINDINGS]
      },
      function(api) {
        api.addTimelineLayer({
          id: MUTATIONS_LAYER_ID,
          label: "Vuex Mutations",
          color: COLOR_LIME_500
        });
        api.addTimelineLayer({
          id: ACTIONS_LAYER_ID,
          label: "Vuex Actions",
          color: COLOR_LIME_500
        });
        api.addInspector({
          id: INSPECTOR_ID,
          label: "Vuex",
          icon: "storage",
          treeFilterPlaceholder: "Filter stores..."
        });
        api.on.getInspectorTree(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            if (payload.filter) {
              var nodes = [];
              flattenStoreForInspectorTree(nodes, store2._modules.root, payload.filter, "");
              payload.rootNodes = nodes;
            } else {
              payload.rootNodes = [
                formatStoreForInspectorTree(store2._modules.root, "")
              ];
            }
          }
        });
        api.on.getInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            makeLocalGetters(store2, modulePath);
            payload.state = formatStoreForInspectorState(
              getStoreModule(store2._modules, modulePath),
              modulePath === "root" ? store2.getters : store2._makeLocalGettersCache,
              modulePath
            );
          }
        });
        api.on.editInspectorState(function(payload) {
          if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
            var modulePath = payload.nodeId;
            var path = payload.path;
            if (modulePath !== "root") {
              path = modulePath.split("/").filter(Boolean).concat(path);
            }
            store2._withCommit(function() {
              payload.set(store2._state.data, path, payload.state.value);
            });
          }
        });
        store2.subscribe(function(mutation, state) {
          var data = {};
          if (mutation.payload) {
            data.payload = mutation.payload;
          }
          data.state = state;
          api.notifyComponentUpdate();
          api.sendInspectorTree(INSPECTOR_ID);
          api.sendInspectorState(INSPECTOR_ID);
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: Date.now(),
              title: mutation.type,
              data
            }
          });
        });
        store2.subscribeAction({
          before: function(action, state) {
            var data = {};
            if (action.payload) {
              data.payload = action.payload;
            }
            action._id = actionId++;
            action._time = Date.now();
            data.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: action._time,
                title: action.type,
                groupId: action._id,
                subtitle: "start",
                data
              }
            });
          },
          after: function(action, state) {
            var data = {};
            var duration = Date.now() - action._time;
            data.duration = {
              _custom: {
                type: "duration",
                display: duration + "ms",
                tooltip: "Action duration",
                value: duration
              }
            };
            if (action.payload) {
              data.payload = action.payload;
            }
            data.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: Date.now(),
                title: action.type,
                groupId: action._id,
                subtitle: "end",
                data
              }
            });
          }
        });
      }
    );
  }
  var COLOR_LIME_500 = 8702998;
  var COLOR_DARK = 6710886;
  var COLOR_WHITE = 16777215;
  var TAG_NAMESPACED = {
    label: "namespaced",
    textColor: COLOR_WHITE,
    backgroundColor: COLOR_DARK
  };
  function extractNameFromPath(path) {
    return path && path !== "root" ? path.split("/").slice(-2, -1)[0] : "Root";
  }
  function formatStoreForInspectorTree(module, path) {
    return {
      id: path || "root",
      // all modules end with a `/`, we want the last segment only
      // cart/ -> cart
      // nested/cart/ -> cart
      label: extractNameFromPath(path),
      tags: module.namespaced ? [TAG_NAMESPACED] : [],
      children: Object.keys(module._children).map(
        function(moduleName2) {
          return formatStoreForInspectorTree(
            module._children[moduleName2],
            path + moduleName2 + "/"
          );
        }
      )
    };
  }
  function flattenStoreForInspectorTree(result, module, filter, path) {
    if (path.includes(filter)) {
      result.push({
        id: path || "root",
        label: path.endsWith("/") ? path.slice(0, path.length - 1) : path || "Root",
        tags: module.namespaced ? [TAG_NAMESPACED] : []
      });
    }
    Object.keys(module._children).forEach(function(moduleName2) {
      flattenStoreForInspectorTree(result, module._children[moduleName2], filter, path + moduleName2 + "/");
    });
  }
  function formatStoreForInspectorState(module, getters, path) {
    getters = path === "root" ? getters : getters[path];
    var gettersKeys = Object.keys(getters);
    var storeState = {
      state: Object.keys(module.state).map(function(key) {
        return {
          key,
          editable: true,
          value: module.state[key]
        };
      })
    };
    if (gettersKeys.length) {
      var tree = transformPathsToObjectTree(getters);
      storeState.getters = Object.keys(tree).map(function(key) {
        return {
          key: key.endsWith("/") ? extractNameFromPath(key) : key,
          editable: false,
          value: canThrow(function() {
            return tree[key];
          })
        };
      });
    }
    return storeState;
  }
  function transformPathsToObjectTree(getters) {
    var result = {};
    Object.keys(getters).forEach(function(key) {
      var path = key.split("/");
      if (path.length > 1) {
        var target = result;
        var leafKey = path.pop();
        path.forEach(function(p) {
          if (!target[p]) {
            target[p] = {
              _custom: {
                value: {},
                display: p,
                tooltip: "Module",
                abstract: true
              }
            };
          }
          target = target[p]._custom.value;
        });
        target[leafKey] = canThrow(function() {
          return getters[key];
        });
      } else {
        result[key] = canThrow(function() {
          return getters[key];
        });
      }
    });
    return result;
  }
  function getStoreModule(moduleMap, path) {
    var names = path.split("/").filter(function(n) {
      return n;
    });
    return names.reduce(
      function(module, moduleName2, i) {
        var child = module[moduleName2];
        if (!child) {
          throw new Error('Missing module "' + moduleName2 + '" for path "' + path + '".');
        }
        return i === names.length - 1 ? child : child._children;
      },
      path === "root" ? moduleMap : moduleMap.root._children
    );
  }
  function canThrow(cb) {
    try {
      return cb();
    } catch (e) {
      return e;
    }
  }
  var Module = function Module2(rawModule, runtime) {
    this.runtime = runtime;
    this._children = /* @__PURE__ */ Object.create(null);
    this._rawModule = rawModule;
    var rawState = rawModule.state;
    this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
  };
  var prototypeAccessors$1 = { namespaced: { configurable: true } };
  prototypeAccessors$1.namespaced.get = function() {
    return !!this._rawModule.namespaced;
  };
  Module.prototype.addChild = function addChild(key, module) {
    this._children[key] = module;
  };
  Module.prototype.removeChild = function removeChild(key) {
    delete this._children[key];
  };
  Module.prototype.getChild = function getChild(key) {
    return this._children[key];
  };
  Module.prototype.hasChild = function hasChild(key) {
    return key in this._children;
  };
  Module.prototype.update = function update(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced;
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions;
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations;
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters;
    }
  };
  Module.prototype.forEachChild = function forEachChild(fn) {
    forEachValue(this._children, fn);
  };
  Module.prototype.forEachGetter = function forEachGetter(fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn);
    }
  };
  Module.prototype.forEachAction = function forEachAction(fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn);
    }
  };
  Module.prototype.forEachMutation = function forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn);
    }
  };
  Object.defineProperties(Module.prototype, prototypeAccessors$1);
  var ModuleCollection = function ModuleCollection2(rawRootModule) {
    this.register([], rawRootModule, false);
  };
  ModuleCollection.prototype.get = function get(path) {
    return path.reduce(function(module, key) {
      return module.getChild(key);
    }, this.root);
  };
  ModuleCollection.prototype.getNamespace = function getNamespace(path) {
    var module = this.root;
    return path.reduce(function(namespace, key) {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + "/" : "");
    }, "");
  };
  ModuleCollection.prototype.update = function update$1(rawRootModule) {
    update2([], this.root, rawRootModule);
  };
  ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
    var this$1$1 = this;
    if (runtime === void 0)
      runtime = true;
    {
      assertRawModule(path, rawModule);
    }
    var newModule = new Module(rawModule, runtime);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      var parent = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rawModule.modules) {
      forEachValue(rawModule.modules, function(rawChildModule, key) {
        this$1$1.register(path.concat(key), rawChildModule, runtime);
      });
    }
  };
  ModuleCollection.prototype.unregister = function unregister(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    var child = parent.getChild(key);
    if (!child) {
      {
        console.warn(
          "[vuex] trying to unregister module '" + key + "', which is not registered"
        );
      }
      return;
    }
    if (!child.runtime) {
      return;
    }
    parent.removeChild(key);
  };
  ModuleCollection.prototype.isRegistered = function isRegistered(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    if (parent) {
      return parent.hasChild(key);
    }
    return false;
  };
  function update2(path, targetModule, newModule) {
    {
      assertRawModule(path, newModule);
    }
    targetModule.update(newModule);
    if (newModule.modules) {
      for (var key in newModule.modules) {
        if (!targetModule.getChild(key)) {
          {
            console.warn(
              "[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed"
            );
          }
          return;
        }
        update2(
          path.concat(key),
          targetModule.getChild(key),
          newModule.modules[key]
        );
      }
    }
  }
  var functionAssert = {
    assert: function(value2) {
      return typeof value2 === "function";
    },
    expected: "function"
  };
  var objectAssert = {
    assert: function(value2) {
      return typeof value2 === "function" || typeof value2 === "object" && typeof value2.handler === "function";
    },
    expected: 'function or object with "handler" function'
  };
  var assertTypes = {
    getters: functionAssert,
    mutations: functionAssert,
    actions: objectAssert
  };
  function assertRawModule(path, rawModule) {
    Object.keys(assertTypes).forEach(function(key) {
      if (!rawModule[key]) {
        return;
      }
      var assertOptions = assertTypes[key];
      forEachValue(rawModule[key], function(value2, type) {
        assert(
          assertOptions.assert(value2),
          makeAssertionMessage(path, key, type, value2, assertOptions.expected)
        );
      });
    });
  }
  function makeAssertionMessage(path, key, type, value2, expected) {
    var buf = key + " should be " + expected + ' but "' + key + "." + type + '"';
    if (path.length > 0) {
      buf += ' in module "' + path.join(".") + '"';
    }
    buf += " is " + JSON.stringify(value2) + ".";
    return buf;
  }
  function createStore(options) {
    return new Store(options);
  }
  var Store = function Store2(options) {
    var this$1$1 = this;
    if (options === void 0)
      options = {};
    {
      assert(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
      assert(this instanceof Store2, "store must be called with the new operator.");
    }
    var plugins = options.plugins;
    if (plugins === void 0)
      plugins = [];
    var strict = options.strict;
    if (strict === void 0)
      strict = false;
    var devtools = options.devtools;
    this._committing = false;
    this._actions = /* @__PURE__ */ Object.create(null);
    this._actionSubscribers = [];
    this._mutations = /* @__PURE__ */ Object.create(null);
    this._wrappedGetters = /* @__PURE__ */ Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    this._subscribers = [];
    this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    this._scope = null;
    this._devtools = devtools;
    var store2 = this;
    var ref = this;
    var dispatch2 = ref.dispatch;
    var commit2 = ref.commit;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch2.call(store2, type, payload);
    };
    this.commit = function boundCommit(type, payload, options2) {
      return commit2.call(store2, type, payload, options2);
    };
    this.strict = strict;
    var state = this._modules.root.state;
    installModule(this, state, [], this._modules.root);
    resetStoreState(this, state);
    plugins.forEach(function(plugin) {
      return plugin(this$1$1);
    });
  };
  var prototypeAccessors = { state: { configurable: true } };
  Store.prototype.install = function install(app, injectKey) {
    app.provide(injectKey || storeKey, this);
    app.config.globalProperties.$store = this;
    var useDevtools = this._devtools !== void 0 ? this._devtools : true;
    if (useDevtools) {
      addDevtools(app, this);
    }
  };
  prototypeAccessors.state.get = function() {
    return this._state.data;
  };
  prototypeAccessors.state.set = function(v) {
    {
      assert(false, "use store.replaceState() to explicit replace store state.");
    }
  };
  Store.prototype.commit = function commit(_type, _payload, _options) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;
    var mutation = { type, payload };
    var entry = this._mutations[type];
    if (!entry) {
      {
        console.error("[vuex] unknown mutation type: " + type);
      }
      return;
    }
    this._withCommit(function() {
      entry.forEach(function commitIterator(handler) {
        handler(payload);
      });
    });
    this._subscribers.slice().forEach(function(sub) {
      return sub(mutation, this$1$1.state);
    });
    if (options && options.silent) {
      console.warn(
        "[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
      );
    }
  };
  Store.prototype.dispatch = function dispatch(_type, _payload) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;
    var action = { type, payload };
    var entry = this._actions[type];
    if (!entry) {
      {
        console.error("[vuex] unknown action type: " + type);
      }
      return;
    }
    try {
      this._actionSubscribers.slice().filter(function(sub) {
        return sub.before;
      }).forEach(function(sub) {
        return sub.before(action, this$1$1.state);
      });
    } catch (e) {
      {
        console.warn("[vuex] error in before action subscribers: ");
        console.error(e);
      }
    }
    var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
      return handler(payload);
    })) : entry[0](payload);
    return new Promise(function(resolve, reject2) {
      result.then(function(res) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.after;
          }).forEach(function(sub) {
            return sub.after(action, this$1$1.state);
          });
        } catch (e) {
          {
            console.warn("[vuex] error in after action subscribers: ");
            console.error(e);
          }
        }
        resolve(res);
      }, function(error2) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.error;
          }).forEach(function(sub) {
            return sub.error(action, this$1$1.state, error2);
          });
        } catch (e) {
          {
            console.warn("[vuex] error in error action subscribers: ");
            console.error(e);
          }
        }
        reject2(error2);
      });
    });
  };
  Store.prototype.subscribe = function subscribe(fn, options) {
    return genericSubscribe(fn, this._subscribers, options);
  };
  Store.prototype.subscribeAction = function subscribeAction(fn, options) {
    var subs = typeof fn === "function" ? { before: fn } : fn;
    return genericSubscribe(subs, this._actionSubscribers, options);
  };
  Store.prototype.watch = function watch$1(getter, cb, options) {
    var this$1$1 = this;
    {
      assert(typeof getter === "function", "store.watch only accepts a function.");
    }
    return vue.watch(function() {
      return getter(this$1$1.state, this$1$1.getters);
    }, cb, Object.assign({}, options));
  };
  Store.prototype.replaceState = function replaceState(state) {
    var this$1$1 = this;
    this._withCommit(function() {
      this$1$1._state.data = state;
    });
  };
  Store.prototype.registerModule = function registerModule(path, rawModule, options) {
    if (options === void 0)
      options = {};
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
      assert(path.length > 0, "cannot register the root module by using registerModule.");
    }
    this._modules.register(path, rawModule);
    installModule(this, this.state, path, this._modules.get(path), options.preserveState);
    resetStoreState(this, this.state);
  };
  Store.prototype.unregisterModule = function unregisterModule(path) {
    var this$1$1 = this;
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    this._modules.unregister(path);
    this._withCommit(function() {
      var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
      delete parentState[path[path.length - 1]];
    });
    resetStore(this);
  };
  Store.prototype.hasModule = function hasModule(path) {
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    return this._modules.isRegistered(path);
  };
  Store.prototype.hotUpdate = function hotUpdate(newOptions) {
    this._modules.update(newOptions);
    resetStore(this, true);
  };
  Store.prototype._withCommit = function _withCommit(fn) {
    var committing = this._committing;
    this._committing = true;
    fn();
    this._committing = committing;
  };
  Object.defineProperties(Store.prototype, prototypeAccessors);
  const _sfc_main$15 = {};
  function _sfc_render$14(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "loader" }, [
      vue.createElementVNode("view", { class: "circle" }),
      vue.createElementVNode("view", { class: "circle" }),
      vue.createElementVNode("view", { class: "circle" }),
      vue.createElementVNode("view", { class: "circle" })
    ]);
  }
  const defaultLoadingVue = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["render", _sfc_render$14], ["__scopeId", "data-v-c11189f4"], ["__file", "D:/APP/novel-app/novel-app/components/common/loading/default-loading.vue"]]);
  const _sfc_main$14 = {};
  function _sfc_render$13(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", {
      "aria-label": "Orange and tan hamster running in a metal wheel",
      role: "img",
      class: "wheel-and-hamster"
    }, [
      vue.createElementVNode("div", { class: "wheel" }),
      vue.createElementVNode("div", { class: "hamster" }, [
        vue.createElementVNode("div", { class: "hamster__body" }, [
          vue.createElementVNode("div", { class: "hamster__head" }, [
            vue.createElementVNode("div", { class: "hamster__ear" }),
            vue.createElementVNode("div", { class: "hamster__eye" }),
            vue.createElementVNode("div", { class: "hamster__nose" })
          ]),
          vue.createElementVNode("div", { class: "hamster__limb hamster__limb--fr" }),
          vue.createElementVNode("div", { class: "hamster__limb hamster__limb--fl" }),
          vue.createElementVNode("div", { class: "hamster__limb hamster__limb--br" }),
          vue.createElementVNode("div", { class: "hamster__limb hamster__limb--bl" }),
          vue.createElementVNode("div", { class: "hamster__tail" })
        ])
      ]),
      vue.createElementVNode("div", { class: "spoke" })
    ]);
  }
  const pulldownLoadingVue = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["render", _sfc_render$13], ["__scopeId", "data-v-b14cb720"], ["__file", "D:/APP/novel-app/novel-app/components/common/loading/pulldown-loading.vue"]]);
  const _sfc_main$13 = {
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
    setup(__props, { expose: __expose }) {
      __expose();
      const __returned__ = { defaultLoadingVue, pulldownLoadingVue };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$12(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "loading-container",
        style: vue.normalizeStyle({ position: $props.type == "loading" ? "absolute" : "relative" })
      },
      [
        $props.type == "loading" ? (vue.openBlock(), vue.createBlock($setup["defaultLoadingVue"], { key: 0 })) : $props.type == "pulldown" ? (vue.openBlock(), vue.createBlock($setup["pulldownLoadingVue"], { key: 1 })) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    );
  }
  const loadingVue = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["render", _sfc_render$12], ["__scopeId", "data-v-028c4300"], ["__file", "D:/APP/novel-app/novel-app/components/common/loading/loading.vue"]]);
  const _sfc_main$12 = {
    __name: "mid-area",
    props: {
      length: {
        type: Number,
        required: true
      },
      current: {
        type: Number,
        default: 0
      },
      pageName: {
        type: String,
        default: " "
      },
      refresh: {
        type: Boolean,
        default: true
      },
      height: {
        type: Number,
        default: 0
      },
      background: {
        type: String,
        default: "#F6F6F6"
      },
      enableSlide: {
        type: Boolean,
        default: true
      }
    },
    emits: ["pageChange"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const store2 = useStore();
      const screenWidth = vue.ref(0);
      const fingerCoordinates = vue.reactive({
        x: 0,
        y: 0
      });
      const isMove = vue.ref(false);
      const moveDistance = vue.ref(0);
      const offset = vue.reactive({
        x: 9,
        y: 0
      });
      vue.onMounted(async () => {
        const info = await getSystemInfo();
        screenWidth.value = info.screenWidth;
      });
      const contentStyle = vue.computed(() => {
        return {
          width: screenWidth.value * props2.length + "px",
          transform: isMove.value ? `translate(${moveDistance.value}px,${offset.y}px)` : `translate(${-(props2.current * screenWidth.value)}px,${offset.y}px)`,
          transition: isMove.value ? "none" : "transform 0.3s"
        };
      });
      const props2 = __props;
      vue.watch(
        () => props2.current,
        // 使用 getter 函数来访问 props
        (newVal) => {
          offset.x = -(props2.current * screenWidth.value);
        },
        {
          immediate: true
          // 立即执行回调
        }
      );
      const emit = __emit;
      const handelTouchStart = (e) => {
        if (!props2.enableSlide)
          return;
        fingerCoordinates.x = e.changedTouches[0].pageX;
        fingerCoordinates.y = e.changedTouches[0].pageY;
      };
      const handelTouchEnd = (e) => {
        if (!props2.enableSlide)
          return;
        isMove.value = false;
        const moveY = e.changedTouches[0].pageY - fingerCoordinates.y;
        const moveX = e.changedTouches[0].pageX - fingerCoordinates.x;
        if (Math.abs(moveX) - Math.abs(moveY) < 50)
          return;
        if (moveX < -100 && props2.current < props2.length - 1) {
          emit("pageChange", "r");
        } else if (moveX > 100 && props2.current > 0) {
          emit("pageChange", "l");
        }
      };
      const handelTouchMove = (e) => {
        if (!props2.enableSlide)
          return;
        const moveX = e.changedTouches[0].pageX - fingerCoordinates.x;
        const moveY = e.changedTouches[0].pageY - fingerCoordinates.y;
        if (Math.abs(moveX) - Math.abs(moveY) < 50)
          return;
        if (moveX < 0 && props2.current == props2.length - 1 || moveX > 0 && props2.current == 0)
          return;
        isMove.value = true;
        moveDistance.value = offset.x + moveX;
      };
      const __returned__ = { store: store2, screenWidth, fingerCoordinates, isMove, moveDistance, offset, contentStyle, props: props2, emit, handelTouchStart, handelTouchEnd, handelTouchMove, ref: vue.ref, reactive: vue.reactive, onMounted: vue.onMounted, computed: vue.computed, watch: vue.watch, get getSystemInfo() {
        return getSystemInfo;
      }, get useStore() {
        return useStore;
      }, loadingVue };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$11(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "home-mid",
        style: vue.normalizeStyle({ height: `${$props.height}px`, background: $props.background })
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "content",
            style: vue.normalizeStyle($setup.contentStyle),
            onTouchstartCapture: $setup.handelTouchStart,
            onTouchmoveCapture: $setup.handelTouchMove,
            onTouchendCapture: $setup.handelTouchEnd
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          36
          /* STYLE, NEED_HYDRATION */
        )
      ],
      4
      /* STYLE */
    );
  }
  const ComponentsHomeMidAreaMidArea = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["render", _sfc_render$11], ["__scopeId", "data-v-126196ca"], ["__file", "D:/APP/novel-app/novel-app/components/home/mid-area/mid-area.vue"]]);
  const getSelectorInfo = (instance, selector) => {
    return new Promise((resolve, reject2) => {
      const query = uni.createSelectorQuery().in(instance.proxy);
      query.select(selector).boundingClientRect((data) => {
        resolve(data);
      }).exec();
    });
  };
  const props$d = {
    props: {
      color: {
        type: String,
        default: "#d6d7d9"
      },
      // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
      length: {
        type: [String, Number],
        default: "100%"
      },
      // 线条方向，col-竖向，row-横向
      direction: {
        type: String,
        default: "row"
      },
      // 是否显示细边框
      hairline: {
        type: Boolean,
        default: true
      },
      // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
      margin: {
        type: [String, Number],
        default: 0
      },
      // 是否虚线，true-虚线，false-实线
      dashed: {
        type: Boolean,
        default: false
      },
      ...(_h = (_g = uni.$uv) == null ? void 0 : _g.props) == null ? void 0 : _h.line
    }
  };
  const _sfc_main$11 = {
    name: "uv-line",
    mixins: [mpMixin, mixin, props$d],
    computed: {
      lineStyle() {
        const style = {};
        style.margin = this.margin;
        if (this.direction === "row") {
          style.borderBottomWidth = "1px";
          style.borderBottomStyle = this.dashed ? "dashed" : "solid";
          style.width = this.$uv.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleY(0.5)";
        } else {
          style.borderLeftWidth = "1px";
          style.borderLeftStyle = this.dashed ? "dashed" : "solid";
          style.height = this.$uv.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleX(0.5)";
        }
        style.borderColor = this.color;
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$10(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-line",
        style: vue.normalizeStyle([$options.lineStyle])
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_0$8 = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["render", _sfc_render$10], ["__scopeId", "data-v-dcf8cb8f"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-line/components/uv-line/uv-line.vue"]]);
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    const startRGB = hexToRgb(startColor, false);
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];
    const endRGB = hexToRgb(endColor, false);
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];
    const sR = (endR - startR) / step;
    const sG = (endG - startG) / step;
    const sB = (endB - startB) / step;
    const colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex(`rgb(${Math.round(sR * i + startR)},${Math.round(sG * i + startG)},${Math.round(sB * i + startB)})`);
      if (i === 0)
        hex = rgbToHex(startColor);
      if (i === step - 1)
        hex = rgbToHex(endColor);
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = String(sColor).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
      }
      if (!str) {
        return sColorChange;
      }
      return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
    }
    if (/^(rgb|RGB)/.test(sColor)) {
      const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    }
    return sColor;
  }
  function rgbToHex(rgb) {
    const _this = rgb;
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? `${0}${hex}` : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    }
    if (reg.test(_this)) {
      const aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      }
      if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  const props$c = {
    props: {
      // 是否显示组件
      show: {
        type: Boolean,
        default: true
      },
      // 颜色
      color: {
        type: String,
        default: "#909193"
      },
      // 提示文字颜色
      textColor: {
        type: String,
        default: "#909193"
      },
      // 文字和图标是否垂直排列
      vertical: {
        type: Boolean,
        default: false
      },
      // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
      mode: {
        type: String,
        default: "spinner"
      },
      // 图标大小，单位默认px
      size: {
        type: [String, Number],
        default: 24
      },
      // 文字大小
      textSize: {
        type: [String, Number],
        default: 15
      },
      // 文字样式
      textStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 文字内容
      text: {
        type: [String, Number],
        default: ""
      },
      // 动画模式 https://www.runoob.com/cssref/css3-pr-animation-timing-function.html
      timingFunction: {
        type: String,
        default: "linear"
      },
      // 动画执行周期时间
      duration: {
        type: [String, Number],
        default: 1200
      },
      // mode=circle时的暗边颜色
      inactiveColor: {
        type: String,
        default: ""
      },
      ...(_j = (_i = uni.$uv) == null ? void 0 : _i.props) == null ? void 0 : _j.loadingIcon
    }
  };
  const _sfc_main$10 = {
    name: "uv-loading-icon",
    mixins: [mpMixin, mixin, props$c],
    data() {
      return {
        // Array.form可以通过一个伪数组对象创建指定长度的数组
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
        array12: Array.from({
          length: 12
        }),
        // 这里需要设置默认值为360，否则在安卓nvue上，会延迟一个duration周期后才执行
        // 在iOS nvue上，则会一开始默认执行两个周期的动画
        aniAngel: 360,
        // 动画旋转角度
        webviewHide: false,
        // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗
        loading: false
        // 是否运行中，针对nvue使用
      };
    },
    computed: {
      // 当为circle类型时，给其另外三边设置一个更轻一些的颜色
      // 之所以需要这么做的原因是，比如父组件传了color为红色，那么需要另外的三个边为浅红色
      // 而不能是固定的某一个其他颜色(因为这个固定的颜色可能浅蓝，导致效果没有那么细腻良好)
      otherBorderColor() {
        const lightColor = colorGradient(this.color, "#ffffff", 100)[80];
        if (this.mode === "circle") {
          return this.inactiveColor ? this.inactiveColor : lightColor;
        } else {
          return "transparent";
        }
      }
    },
    watch: {
      show(n) {
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        setTimeout(() => {
          this.show && this.addEventListenerToWebview();
        }, 20);
      },
      // 监听webview的显示与隐藏
      addEventListenerToWebview() {
        const pages2 = getCurrentPages();
        const page2 = pages2[pages2.length - 1];
        const currentWebview = page2.$getAppWebview();
        currentWebview.addEventListener("hide", () => {
          this.webviewHide = true;
        });
        currentWebview.addEventListener("show", () => {
          this.webviewHide = false;
        });
      }
    }
  };
  function _sfc_render$$(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-loading-icon", [_ctx.vertical && "uv-loading-icon--vertical"]]),
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        !$data.webviewHide ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["uv-loading-icon__spinner", [`uv-loading-icon__spinner--${_ctx.mode}`]]),
            ref: "ani",
            style: vue.normalizeStyle({
              color: _ctx.color,
              width: _ctx.$uv.addUnit(_ctx.size),
              height: _ctx.$uv.addUnit(_ctx.size),
              borderTopColor: _ctx.color,
              borderBottomColor: $options.otherBorderColor,
              borderLeftColor: $options.otherBorderColor,
              borderRightColor: $options.otherBorderColor,
              "animation-duration": `${_ctx.duration}ms`,
              "animation-timing-function": _ctx.mode === "semicircle" || _ctx.mode === "circle" ? _ctx.timingFunction : ""
            })
          },
          [
            _ctx.mode === "spinner" ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList($data.array12, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index2,
                  class: "uv-loading-icon__dot"
                });
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "uv-loading-icon__text",
            style: vue.normalizeStyle([{
              fontSize: _ctx.$uv.addUnit(_ctx.textSize),
              color: _ctx.textColor
            }, _ctx.$uv.addStyle(_ctx.textStyle)])
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["render", _sfc_render$$], ["__scopeId", "data-v-29b619ea"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-loading-icon/components/uv-loading-icon/uv-loading-icon.vue"]]);
  const props$b = {
    props: {
      // 组件状态，loadmore-加载前的状态，loading-加载中的状态，nomore-没有更多的状态
      status: {
        type: String,
        default: "loadmore"
      },
      // 组件背景色
      bgColor: {
        type: String,
        default: "transparent"
      },
      // 是否显示加载中的图标
      icon: {
        type: Boolean,
        default: true
      },
      // 字体大小
      fontSize: {
        type: [String, Number],
        default: 14
      },
      // 图标大小
      iconSize: {
        type: [String, Number],
        default: 16
      },
      // 字体颜色
      color: {
        type: String,
        default: "#606266"
      },
      // 加载中状态的图标，spinner-花朵状图标，circle-圆圈状，semicircle-半圆
      loadingIcon: {
        type: String,
        default: "spinner"
      },
      // 加载前的提示语
      loadmoreText: {
        type: String,
        default: "加载更多"
      },
      // 加载中提示语
      loadingText: {
        type: String,
        default: "正在加载..."
      },
      // 没有更多的提示语
      nomoreText: {
        type: String,
        default: "没有更多了"
      },
      // 在“没有更多”状态下，是否显示粗点
      isDot: {
        type: Boolean,
        default: false
      },
      // 加载中图标的颜色
      iconColor: {
        type: String,
        default: "#b7b7b7"
      },
      // 上边距
      marginTop: {
        type: [String, Number],
        default: 10
      },
      // 下边距
      marginBottom: {
        type: [String, Number],
        default: 10
      },
      // 高度，单位px
      height: {
        type: [String, Number],
        default: "auto"
      },
      // 是否显示左边分割线
      line: {
        type: Boolean,
        default: false
      },
      // 线条颜色
      lineColor: {
        type: String,
        default: "#E6E8EB"
      },
      // 是否虚线，true-虚线，false-实线
      dashed: {
        type: Boolean,
        default: false
      },
      ...(_l = (_k = uni.$uv) == null ? void 0 : _k.props) == null ? void 0 : _l.loadmore
    }
  };
  const _sfc_main$$ = {
    name: "uv-loadmore",
    mixins: [mpMixin, mixin, props$b],
    data() {
      return {
        // 粗点
        dotText: "●"
      };
    },
    computed: {
      // 加载的文字显示的样式
      loadTextStyle() {
        return {
          color: this.color,
          fontSize: this.$uv.addUnit(this.fontSize),
          lineHeight: this.$uv.addUnit(this.fontSize),
          backgroundColor: this.bgColor
        };
      },
      // 显示的提示文字
      showText() {
        let text = "";
        if (this.status == "loadmore")
          text = this.loadmoreText;
        else if (this.status == "loading")
          text = this.loadingText;
        else if (this.status == "nomore" && this.isDot)
          text = this.dotText;
        else
          text = this.nomoreText;
        return text;
      }
    },
    methods: {
      loadMore() {
        if (this.status == "loadmore")
          this.$emit("loadmore");
      }
    }
  };
  function _sfc_render$_(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_0$8);
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-loadmore",
        style: vue.normalizeStyle([
          {
            backgroundColor: _ctx.bgColor,
            marginBottom: _ctx.$uv.addUnit(_ctx.marginBottom),
            marginTop: _ctx.$uv.addUnit(_ctx.marginTop),
            height: _ctx.$uv.addUnit(_ctx.height)
          },
          _ctx.$uv.addStyle(_ctx.customStyle)
        ])
      },
      [
        _ctx.line ? (vue.openBlock(), vue.createBlock(_component_uv_line, {
          key: 0,
          length: "140rpx",
          color: _ctx.lineColor,
          hairline: false,
          dashed: _ctx.dashed
        }, null, 8, ["color", "dashed"])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 加载中和没有更多的状态才显示两边的横线 "),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass([_ctx.status == "loadmore" || _ctx.status == "nomore" ? "uv-more" : "", "uv-loadmore__content"])
          },
          [
            _ctx.status === "loading" && _ctx.icon ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "uv-loadmore__content__icon-wrap"
            }, [
              vue.createVNode(_component_uv_loading_icon, {
                color: _ctx.iconColor,
                size: _ctx.iconSize,
                mode: _ctx.loadingIcon
              }, null, 8, ["color", "size", "mode"])
            ])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" 如果没有更多的状态下，显示内容为dot（粗点），加载特定样式 "),
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass(["uv-line-1", [_ctx.status == "nomore" && _ctx.isDot == true ? "uv-loadmore__content__dot-text" : "uv-loadmore__content__text"]]),
                style: vue.normalizeStyle([$options.loadTextStyle]),
                onClick: _cache[0] || (_cache[0] = (...args) => $options.loadMore && $options.loadMore(...args))
              },
              vue.toDisplayString($options.showText),
              7
              /* TEXT, CLASS, STYLE */
            )
          ],
          2
          /* CLASS */
        ),
        _ctx.line ? (vue.openBlock(), vue.createBlock(_component_uv_line, {
          key: 1,
          length: "140rpx",
          color: _ctx.lineColor,
          hairline: false,
          dashed: _ctx.dashed
        }, null, 8, ["color", "dashed"])) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["render", _sfc_render$_], ["__scopeId", "data-v-1078b33c"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-load-more/components/uv-load-more/uv-load-more.vue"]]);
  const zStatic = {
    base64Arrow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAD1BMVEVHcExRUVFMTExRUVFRUVE9CdWsAAAABHRSTlMAjjrY9ZnUjwAAAQFJREFUWMPt2MsNgzAMgGEEE1B1gKJmAIRYoCH7z9RCXrabh33iYktcIv35EEg5ZBh07pvxJU6MFSPOSRnjnBUjUsaciRUjMsb4xIoRCWNiYsUInzE5sWKEyxiYWDbyefqHx1zIeiYTk7mQYziTYecxHvEJjwmIT3hMQELCYSISEg4TkZj0mYTEpM8kJCU9JiMp6TEZyUmbAUhO2gxAQNJiIAKSFgMRmNQZhMCkziAEJTUGIyipMRjBSZkhCE7KDEFIUmTeGCHJxWz0zXaE0GTCG8ZFtEaS347r/1fe11YyHYVfubxayfjoHmc0YYwmmmiiiSaaaKLJ7ckyz5ve+dw3Xw2emdwm9xSbAAAAAElFTkSuQmCC",
    base64ArrowWhite: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAElBMVEVHcEz///////////////////+IGTx/AAAABnRSTlMA/dAkXZOhASU/AAABYElEQVRYw+2YwXLCIBCGsdAHWGbyAKZ4zxi9O017rxLf/1UaWFAgA1m8dcpedNSPf/l/Vh0Ya/Wn6hN0JcGvoCqRM4C8VBFiDwBqqNuJKV0rAnCgy3AUqZE57x0iqTL8Br4U3WBf/YWaIlTKfAcELU/h9w72CSVPa3C3OCDvhpHbRp/s2vq4fHhCeiCl2A3m4Qd71DQR257mFBlMcTlbFnFWzNtHxewYEfSiaLS4el8d8nyhmKJd1CF4eOS0keLMAuSxubLBIeIGQW8YHCFFo7EH9+YDcQt9FMZEswTheaNxTHwHT8SZorJjMrEVwo4Zo0U8HSEyZvJMOg4RjnmmRr8nDYeIz3OMkbfE/QhBo+U9RnZJxjGCRh/WKmHEMWLNkfPKsGh/CWJk1JjG0kcuJggTt34VDP8aWAFhp4nybVb5+9qQhjSkIQ1pSEMa8k+Q5U9rV3dF8MpFBK+/7miVq1/HZ2qmo9D+pAAAAABJRU5ErkJggg==",
    base64Flower: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAKlBMVEVHcEzDw8Ovr6+pqamUlJTCwsKenp61tbWxsbGysrLNzc2bm5u5ubmjo6MpovhuAAAACnRSTlMA/P79/sHDhiZS0DxZowAABBBJREFUWMPtl89rE0EUx7ctTXatB3MI1SWnDbUKPUgXqh4ED8Uf7KUVSm3ooVSpSii0Fn/gD4j4o+APiEoVmos9FO2celiqZVgwgaKHPQiCCkv+F99kM7Ozm5kxq1dfD91k9pPve9/3ZjbRNHHok/mKli4eIPNgSuRObuN9SqSEzM20iGnm0yIbqCuV7NSSSIV7uyPM6JMBYdeTOanh/QihJYZsUCSby+VkMj2AvOt0rAeQAwqE3lfKMZVlQCZk1QOCKkkVPadITCfIRNKxfoJI5+0OIFtJx14CMSg1mRSDko7VAfksRQzEbGYqxOJcVTWMCH2I1/IACNW0PWU2M8cmAVHtnH5mM1VRWtwKZjOd5JbF6s1IbaYqaotjNlPHgDAnlAizubTR6ovMYn052g/U5qcmOpi0WL8xTS/3IfSet5m8MEr5ajjF5le6dq/OJpobrdY0t3i9QgefWrxW9/1BLhk0E9m8FeUMhhXal499iD0eQRfDF+ts/tttORRerfp+oV7f4xJj82iUYm1Yzod+ZQEAlS/8mMBwKebVmCVp1f0JLS6zKd17+iwRKTARVg2SHtz3iEbBH+Q+U28zW2Jiza8Tjb1YFoYZMsJyjDqp3M9XBQdSdPLFdxEpvOB37JrHcmR/y9+LgoTlCFGZEa2sc6d4PGlweEa2JSVPoVm+IfGG3ZL037iV9oH+P+Jxc4HGVflNq1M0pivao/EopO4b/ojVCP9GjmiXOeS0DOn1o/iiccT4ORnyvBGF3yUywkQajW4Ti0SGuiy/wVSg/L8w+X/8Q+hvUx8Xd90z4oV5a1i88MbFWHz0WZZ1UrTwBGPX3Rat9AFiXRMRjoMdIdJLEOt2h7jrYOzgOamKZSWSNspOS0X8SAqRYmxRL7sg4eLzYmNehcxh3uoyud/BH2Udux4ywxFTc1xC7Mgf4vMhc5S+kSH3Y7yj+qpwIWSoPTVCOOPVthGx9FbGqrwFw6wSFxJr+17zeKcztt3u+2roAEVgUjDd+AHGuxHy2rZHaa8JMkTHEeyi85ANPO9j9BVuBRD2FY5LDMo/Sz/2hReqGIs/KiFin+CsPsYO/yvM3jL2vE8EbX7/Bf8ejtr2GLN65bioAdgLd8Bis/mD5GmP2qeqyo2ZwQEOtAjRIDH7mBKpUcMoApbZJ5UIxkEwxyMZyMxW/uKFvHCFR3SSmerHyDNQ2dF4JG6zIMpBgLfjSF9x1D6smFcYnGApjmSLICO3ecCDWrQ48geba9DI3STy2i7ax6WIB62fSyIZIiO3GFQqSURp8wCo7GhJBGwuSovJBNjb7kT6FPVnIa9qJ2Ko+l9mefGIdinaMp0yC1URYiwsdfNE45EuA5Cx9EhalfvN5s+UyItm81vaB3p4joniN+SCP7Qc1hblAAAAAElFTkSuQmCC",
    base64FlowerWhite: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAElBMVEX///9HcEz///////////////84chYNAAAABnRSTlP/AGzCOYZj5g1nAAACfklEQVRYw+2YTVPDIBCGtza9Jw25a0bvcax30o73OOr//yvma2F3YWlpPTijXNpAHrK8LLALVPFium2vNIFSbwGKTGQA2GUiHcD29yDNy3sMIdUBQl7r2H8mOEVqAHgPkYZUS6Qc2zYhQqtjyDZEximCZwWZLIBeIgYShs2NzxKpSUehYpMJhURGb+O+w5BpMCAREKPnCDHbIY20SzhM5yxziAXpOiBXydrekT9i5XDEq4NIIHHgyU5mRGqviII4mREJJA4QJzMiILwlRJzpKxJKvCBm8OsBBbLux0tsPl4RKYm5aPu6jw1U4mGxEUR9g8M1PcqBEp/WJliNgYOXueBzS4jZSIcgY5lCtevgDSgyzE+rAfuOTQMq0yzvoGH18qju27Mayzs4fPyMziCx81NJa5RNfW7vPYK9KOfDiVkBxFHG8hAj9txuoBuSWORsFfkpBf7xKFLSeaOefEojh5jz22DJEqMP8fUyaKdQx+RnG+yXMpe8Aars8ueR1pVH/bW3FyyvPRw90upLDHwpgBDtg4aUBNkxRLXMAi03IhcZtr1m+FeI/O/JNyDmmL1djLOauSlNflBpW18RQ2bPqXI22MXXEk75KRHTnkPkYbESbdKP2ZFk0r5sIwffAjy1lx+vx7NLjB6/E7Jfv5ERKhzpN0w8IDE8IGFDv5dhz10s7GFiXRZcUeLCEG5P5nDq9k4PFDcoMpE3GY4OuxuCXhmuyNB6k0RsLIAvqp9NE5r8ZCSS8gxnUp7ODdYhZTqxuiJ9uyJJtPmpqJ7wVj+XVieS903iViHziqAhchLEJAyb7jWU647EpUofQ0ziUuXXXhDddtlllSwjgSQu7r4BRWhQqfDPMVwAAAAASUVORK5CYII=",
    base64Success: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAElBMVEVRUVFHcExTU1NRUVFRUVFRUVFOSlSUAAAABnRSTlP/AI6+VySB3ZENAAACcElEQVRYw+2YyYKCMAyGI8hdpdxdZu7gcpdZ7jL6/s8yYheSNi0aPdqbwOffpGmaFOYPD3gj4bisN7vddv17N/JVgxn5x12IWgIaWTuO/IE3PseQbwjGPo2cgRmHFLJwdm/X643zwiqOKPPJ1nj3sjEP2iiifZWj5bhopSyGaEO2HX5fbQJzwJ+W7x/jw5ZFjsEU0PMph9xE8i5EqprKALW95eJQURkgzw98uJ/JvwGecR7bIjWWsUgVrrIfFZ2HlLy3sKETD1mmRLRMRhGVssRa0xJkdn3SpJBymBkM8+pSSDXMDNyDaToVHd2fgpNt0sjwiUZO19+jGQ+gQEg9Oq+bufmAVGihomNmjQG7UG3020vrlm7lkFnKFGU3kZ0KGAdmKe821pipQ+qEKcrZeTL2g5FsUks4cStjEZWwXg0b0n4GxmEpkWwIs5VBynjgK7xZaz1/0D7OxkVuLpsY5BQNFyLS84VBjjbg0iL2r2EQHBOxBhikuUOkdxODVF1cxHoWtPPsiyXO455Iv34hssCO8EV4ZIYTjS8SR4qYSHRiTiYQ4ZFbHi0iIhhBTi6dTCgSWRcnw4h4yGTuyTAiOGBIWGoZTgSHJQl+LcOJ4OCnW6yX2bMnJ9pidCOXtkTkTrIGpYuOynAiOF14SamMiOCk5Ke+mq8BcOrrvym8d0zKIQnWT+M1WwOQNO4fFiWb18hhERxJPx2fblbPHHyC41VyiAtKBUFBIih7JMWVoIQTFIr3lKPN80WvoLSWFPC653ioTZA0I0FrQ7qU6asaK0H7JmkSJa2ooOGVtNUsc3j9FYHkIkJy3SG6VHnfXKXGP9t4N9Q4Ye98AAAAAElFTkSuQmCC",
    base64SuccessWhite: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAGFBMVEVHcEz///////////////////////////8dS1W+AAAAB3RSTlMAiVYk6KvDHLfaegAAAo1JREFUWMPtWEtzmzAQNhCTq910ytXpiyvxTNOr60zrayepx9d02gnX4sTm7xcEiJX2gdnkGJ1A4tOnfWqXyeR1vMRYzrcPD9v5h5MBl3/Ldvx4cxIg/FWC8X0xjLjalM54uhhCfCrRuJURX0pi3EmIqZV7O59vrRZmguStHL9b7S7ftfLwOtiZDw7AHMtmquAQ12b5Wwbnordm8g9zLLO49qc/m2n6aKnhwPOGZ08hAiNHhheiHae1lOUPGZpQkPKa3q0mOUjaRzSRaGUjpy/mmWSwySSpllcEteBKAT52KEnSbblA51pJEPxBQoiH1FP4E3s5+FJv07h6/ylD6ui7B+9fq/ehrFB98ghec9EoVtyjK8pqCHLmCBOwMWSCeWFNN4MbPAk55NhsvoFHSSVR0k5TCTTEzlUGcqV/nVp7n9oIVkmtaqbAEqEgfdgHJPwsEAyZ9r4VAZXFjpEwyaw3+H2v42KYxKhs1XvY/gSSGv+IHyUSuHXCeZhLAgVI3EjgSGo1Fb3xO0tGGU9S2/KAIbtjxpJASG73qox6w5LUq0cEOa+iIONIWIilQSQ0pPa2jgaRQAgQP7c0mITRWGxpMAmEQFN2NAQJNCV0mI6GIIEO47hlQ0ORQLd0nL+hoUjg1m6I1TRr8uYEAriBHLcVFQ5UEMiBe3XkTBEG04WXlGKGxPnMS305XQPA1Ocn2JiuAZwE66fxnKwBnDTuXxZTMq85lwW6kt5ndLqZPefiU1yvmktcUSooChJF2aMprhQlnKJQ5FxRKkcVRa+itNYU8Io2oVkY14w0NMWYlqft91Bj9VHq+ca3b43BxjWJmla0sfKohlfTVpPN+93L/yLQ/IjQ/O5Q/VR5HdL4D7mlxmjwVdELAAAAAElFTkSuQmCC",
    base64Empty: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAALeGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDg4LCAyMDIwLzA3LzEwLTIyOjA2OjUzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTAyLTIyVDIxOjIxOjQ1KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTAxLTEzVDE5OjA5OjQwKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wMS0xM1QxOTowOTo0MCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZWQwMWYzNWQtOWRjOC00MDBiLWEyMmQtNjM5OGZiNzVhNGRiIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZDhlMzQ3ZmEtMDY2My1jYTRiLTgzNTctNTk4YjBkNGIzOTU2IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDA4MDI4MDItMzUyYS04NTRhLTkxYjctNmRlNmQ1MmViM2QwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6WVJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGV4aWY6Q29sb3JTcGFjZT0iMSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjMwMCIgZXhpZjpQaXhlbFlEaW1lbnNpb249IjMwMCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDA4MDI4MDItMzUyYS04NTRhLTkxYjctNmRlNmQ1MmViM2QwIiBzdEV2dDp3aGVuPSIyMDIyLTAyLTIyVDIxOjIxOjQ1KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQwNjg2NzJkLWY5NDMtOTU0Mi1iMDBiLTVlMDExNmE1NmIzZSIgc3RFdnQ6d2hlbj0iMjAyNC0wMS0xM1QxMDoyNjoxNiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphYmJkZmUyZC0xY2Q2LTJiNDgtYjUyNS05YzlhZjdlNjA4NDMiIHN0RXZ0OndoZW49IjIwMjQtMDEtMTNUMTE6MjM6NDArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YTQ5MjM5MDAtNDhiZC03YTQ1LWI4NGItYmVlZTVjOWUxYTM1IiBzdEV2dDp3aGVuPSIyMDI0LTAxLTEzVDExOjIzOjQwKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVkMDFmMzVkLTlkYzgtNDAwYi1hMjJkLTYzOThmYjc1YTRkYiIgc3RFdnQ6d2hlbj0iMjAyNC0wMS0xM1QxOTowOTo0MCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmFiYmRmZTJkLTFjZDYtMmI0OC1iNTI1LTljOWFmN2U2MDg0MyIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjM2ZGQ4NTQxLWQ0MWEtYmY0Yy1iZjA3LWNmNjZhNjZhMDg2MSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQwODAyODAyLTM1MmEtODU0YS05MWI3LTZkZTZkNTJlYjNkMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pm30U/gAAAAJcEhZcwAALiMAAC4jAXilP3YAAAA/UExURUdwTODg4O3t7e7u7unp6d7e3uTk5M/Pz8nJyePj4+jo6Pj4+MrKyszMzO7u7unp6fb29vLy8vr6+v7+/sHBweag3xAAAAAOdFJOUwAxia5pF0n+/vzX3KbULQ2DYQAACG1JREFUeNrtm4l2o7gShi20IWFrAd7/WUc7EosDWKZ976Hc7WTmdMKXv0qlqpLyeNx222233Xbbbbfddtv/mOHn8xexSNsiRH5PrbFtW4p+DetpsF4v8Gs+HA3WEwOAfwzriYxaLTVsP8X1QK0z+vqQCzewYogi60aL9SEX5oyxphYVCFTGjfSJCTmN1jBruN5KTGCUS8bhySQGHRaohmW4glwtldbOeYJYKlgvbyUuA8aFFEKc++aIM4hrRnyiMnIZKq1PrihcM3GNKboMF1Naa9X9+8T1KrxIlVbGjv3cAEHOYYMqqgUsVuJqqehV3+sjDwB+DTJp0lYtMCyZpxqjF4e+74+sRcQSFZO8UonUSEFzuUY+DKo59A2kZDatGCjzCauy/2AmhSyCq0WHEj0KTNJDmVeNhErMt1Q8W4xti4/FwMJ4jaxl05TKFiNtD3kBGrHnhiph9V0eXQc6DkyE2xX830AlKshFTErXeuCZXK/9m41wFsGSfZ4lcGeyZ98PrylJ7MWCojQZ3qSukL2QslgdngqJnTEPdTJhXvbNBoR/+7wabIxWduN/Ja5dWEivm4XSZ2uQckNzmRlHrn2lc6eiafvS4V2Hd12tesau8toZW0CtWoZYb9t+OqxdCYKYjVPF16pVbILIy/gR7MVaWMHYPCoa2VkzkX4Iry2rirXbumGyAjGC1h62YLw6ApsNKZph3fpIWHt08JovRWD62sejpXhTrhWrPpl6zZ6PW2oTG5ltlvgtF6weNYCWKeJJSfg4W6PNJlj3sVZgOXV4lc8n4RlkMTLEBDVoYc3nI09kpyzzfgWsjyzBZSNDKF2/wjh+sxYvn8Y1scxlfLF9T1RBO3wVHsnq8Fk4oGkEh/0KJPSa8T2CeWE5X9BPmgLsaRIGeNL2kshCsWoLBmdPJW5Wbz1ndAKUXjPwxXYAUpSV3fy5BJg1aa1tyVXHHMgVH31ewDVrleHr9XqC684SUF4mecR3+wW5SC2QNvxUizRv98mLDhPgYiMDb+v8g0OADxqxcnf9w01mZYJF0fUVP5LcdswbsMmy1DVs5PlE5NpNiTR8M8qAWZkOy6aN13VcoOF2/s3xn3Mes8Xza05tgR/BuNz69nlNzMR0fH45p+G4R9oxh2mKt9MF4J7K/lvWUojwF5nCgCpuRUptnZMQ3au0nSo2UsHgV3xpmeLYzGml3ZFBBzYGPCpOQRwXs1/GG1J74dlZc6JKUOtjBAz9XjVxucGWHbZVJDPJQGYDRl1Qmf1ovk2Sbghb6MQlnF7mBzM1bgOqJAPpoOQaVe+4Skcit3uqHMyG/Sh1rHNN0gAfM0nnPrmulfLVBSm20TSZSdWa0LJl2ukVyE4vTYCgP3uQkwv1TKtQWgxDzBSg80OQjCs4klKvuUzHLCfIbDKIE/S5VIGqD1iD2819pkAqTWdmeina+oZABi7X5B1MGoTJqJSchuk6JNHcgUPAcsVFk0+N0oDN68Vo7FQSmCXjx46OEtUk1lpY2ZFQGr/AcpqVato4wPUD+RhfAeyQI5sJ6l2sDwnKqNFSJvpiyJbFl3kTOjZ2ievwCR7hkUoWeV2vOLAXvB39AJoyqYa81A5cvaAidXYTFTycKDBcalVK5f3XS89kzLVl9txfL+K+p6NUnitz5KkKm7D3DrRPNq4bk7l20aFRppNilmuQI+uzTtj9wPBkTsVwM7HbJ5pwGgujyRyZDzQLNoiRFluRtQ+GzEguqRxUL+ZMFqulMzIfaP3ARj2k/txB8c+2HyjmDizCaVWtNoE5MvMlKs/4VQ7HUJZCrU6qCKcNJ2aSWUZhJZu4VI0LB4CHFdj77DRuGi28WKAxoRyZyzGVrmc0jmk1nP5QaxZo1puqq1YIAqgZb8e/rABZJWNCNxV7DSTpOO7Aail9J9nYHtua/4ouE/aS0X1qtXQzwGx+rnbi2vhF/TfZG52oc6DPo1WCi3RTDnRk7TEntoEp38gg+DjYs2opkR3JW5EpL9rU0XSK5/6LOTAVS+72x7pm60zSf5HMdldjhzJqw1FRcxXdS3ZNZp0s92FiyluUvBPoD9ynZNkBiu2NF11ofnlnQbZgKqvusj9R/f6DOzgVsahbNlXxlsxU8y7qrbTupitRyxFBKG6H3aEPUqj7YrzAymq41FXlZLlO4WLbvG2Kg4vYB+wPfWS2B5Rq8TW9ROpAZbiF6MmCTsx1NLLsx7NOoOiZup2CNbZ36xc96ErcxzuILGrmmFhimjtwKo/yTm7feTVwB61IzbnW4967Kt3cDDotGt8JKrTiUyO3Uy2PZZt9tapXEfXhWmTgcoB+JchFWsiCKvYnhmn/tKuJDbgly897FnFfkE1rQLKy810OU7xW3bEJHCD5gERtuTGuxoJqA6qI9TNMa6MbvZomsiubbPYx78YXDaaRqqsyqfSaLZdjYGHLu65rDgydXCWm1P5EvcQ828f9pcBapTILSMv1nZCAc0WzFIFsGfUi/kmAxc6cFqDSYuPSMIbs1OVrwITTQM9HVRFJ5JL56qcoFzzT1uVcd2v9jFw8BHlcWtmEI86hp5Dy/zOlK8cUp/rVseRUBqawz6kmAcPLM9l5m8h4V53Iz/2mFJaTCvF8JbsMvPjU/7crbUXart0v4WyE0LnDPcAX95Knj4VUE8HCdNdUP8BDcOXKdPl4uSWbh4LfOV0HDdfipOmu+eIRrDsNPkIT7np/8ZAzVdOd1u8wHIqeXt8VqtgiO50ePeNaGG+uO9rHiKdL71pnIun8jxEKXv2r2HYBzO/mz96vFKoMM5WLk7tQXS9U5kwCu5lk7n6++kdCFWRaTUzm0/5fClWGWTrM/AGhCrJO/ZBQhTPFLwmV7ebgcdttt91222233Xbbbf+H9h+2WEtdHVinLAAAAABJRU5ErkJggg==",
    base64Error: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAALeGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDg4LCAyMDIwLzA3LzEwLTIyOjA2OjUzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTAyLTIyVDIxOjIxOjQ1KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTAxLTEzVDE5OjEwOjEwKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wMS0xM1QxOToxMDoxMCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTQ3NTExNjAtZDY5MC00ZTkzLWFhNGUtNGMwYTViNGU1ZGFjIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YzRiNzlkYWMtZTJmYS1iNzQ0LWIxM2ItOWU1N2VjMDhhM2YwIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDA4MDI4MDItMzUyYS04NTRhLTkxYjctNmRlNmQ1MmViM2QwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6WVJlc29sdXRpb249IjMwMDAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGV4aWY6Q29sb3JTcGFjZT0iMSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjMwMCIgZXhpZjpQaXhlbFlEaW1lbnNpb249IjMwMCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDA4MDI4MDItMzUyYS04NTRhLTkxYjctNmRlNmQ1MmViM2QwIiBzdEV2dDp3aGVuPSIyMDIyLTAyLTIyVDIxOjIxOjQ1KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQwNjg2NzJkLWY5NDMtOTU0Mi1iMDBiLTVlMDExNmE1NmIzZSIgc3RFdnQ6d2hlbj0iMjAyNC0wMS0xM1QxMDoyNjoxNiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjZjk1NTE1OC04MjFiLTA4NDUtYWJmNS05YTE1NGM1ZTY4NjEiIHN0RXZ0OndoZW49IjIwMjQtMDEtMTNUMTE6MDQ6MDQrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZGM1Y2IyNWItZDZlNC0yZjQ2LTgyODQtZmUwOTNlY2M2ZTkxIiBzdEV2dDp3aGVuPSIyMDI0LTAxLTEzVDExOjA0OjA0KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjE0NzUxMTYwLWQ2OTAtNGU5My1hYTRlLTRjMGE1YjRlNWRhYyIgc3RFdnQ6d2hlbj0iMjAyNC0wMS0xM1QxOToxMDoxMCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmNmOTU1MTU4LTgyMWItMDg0NS1hYmY1LTlhMTU0YzVlNjg2MSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjM2ZGQ4NTQxLWQ0MWEtYmY0Yy1iZjA3LWNmNjZhNjZhMDg2MSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQwODAyODAyLTM1MmEtODU0YS05MWI3LTZkZTZkNTJlYjNkMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph2LDQsAAAAJcEhZcwAACxMAAAsTAQCanBgAAAA5UExURUdwTNra2s7Ozq2tre3t7dPT087OzuPj4+3t7dbW1u/v79bW1vz8/MrKytDQ0Nzc3MPDw/X19bi4uMZQDnEAAAAKdFJOUwBqEPywotz+wzqApqiTAAAHW0lEQVR42u1b25akIAwcbx2UFoj//7HLTQVBRcSZfTDnbM/uTl/KSlEkwf75eeONN95444033njjjTduR9/0/yOsbqoevObL7101tYX1HFs9QFtfZalRP+rpQVgdAFx990ZnT8L6eZItUl99jeGpf1DxdV/VP9fV1f/PFlF1bYHoVFSRC60IyVjrFRnuB8IoxpExSrstsErKHpJw1eqybNLbAQvAYkKjUrjoBgKRqAaeIjG5+qaps6hKcMWmcdSwqAJWBbAgCZZaIYbsqggqqlHNbFFa5yVR4jKvrKEErOEjNCqNSwHrfE8lpLsod/u+cOPPMPBJ+Gz5dM0cXNgclre+pSxhYI1WW5Tf9ENSMIdLCiWs6q9hwQprBVYKFqyPlx4WtoSvrT9lC/wkGt8qlkQooC3hi6sgW3Bb8gtdpSV/za/mn49pC0oYhONbfyd5hzDLFivKFpTS1gKM0we0tQCEncfgQn7Rt+DC/299i1MSRJcBC0r7VviG5KZvwV5WIUobxHyrJKy8VRjXVgFYsPu5kOtbxdhycCDuihziXVLoW7xwEiUmDgd544B46luWLW+nugMLB2BimmC3cxTNxCDg8xFtuUSNqoFsDKzY8psa+XtBNWXr74N6qxwsS5T6VL5robKl10+ZRu5S9qBvUYuJwVHzjwjrE3G33qKh+WXBgmkmCvHYquTvZ8oo7rLFA4PJgYW0MdePIRQIGUPNbSMw5lubJMKtJI6+Wk6cVFMmACO+VVryeL7ZgI8MhwS2fnNPPK0geHBRd11eJSiyL4KjrL2umm1XIpRii1MKB/mU/iCZwF+pt5z3UJ7UiF3nQqadAXC3T3xEW2IyuDBe3yDTe0+A64it2WTyYSGVHymUI/EduvSWKJ80Dtv2NbYSoQxbMkVC7yzNGIWFvDF7gRD79RYrWW/BDGti4wwLtgvO7gWKUZ8Mt94qX8vLJE70+xVNwzDm9ghNM+FX7p/jlZUId2HJD+Tf79hMe3WNrAK/30E+C8/6xOCqbqxE5JNMYrNbnaLUvJAewfCg8zF0Ba/tbviWLvPYfsGFA1PVD8ZdnjlVc/DS/o7LK4NHjOjKKbfCTSCo5XmwKbaZM4jlc9NGEYd9Ijd0QS5ZGaOR2O+DPlGyRb2nXZzgnI1GdFWF+0gh3ifyTRqvzpXI2eElk58FeHziCF5hY+hSMV9Ge/mohUTGuQ4vzHYe8bW5sNdFQ58St22Vcf5zzJbtcGT4iYQ7iz8dFuxoWRYMjAM7KCnypHOTLSqdUwYIFpndOD/6B2FBzNQxYmW/zxYE4j8yLHga1s2Rbm/O5PXtGcuNDIW1dTj5hpjGsO+7z2Kk9NP1JWDlnWKAM4H6zCUNM05KyVPHBclYzUbgjE3N3tP2JWHBmbqD4GLeCs2jhMT13lMVljwcEbetwZgtHUxVQ21ho3fE7inf2s8vzMWq0EWpfOBg5hcDSGwaF2+LaysRIzNFqRgBv2sMhi/Ix0WiW8rBKNBv4ExBI7eorx9ANazsPCb5FkSNH+Reacos+AYxaFzX76KMH65c8ytzZ40YvpFAqtgC/otn1eCmMI5K8yVRQVVwq3aVtU+jJktwjyP7x+BKv8vtoH098vXYSJcrWGJcAW11r8WVRxe5vgcuFbXqwnaEZejS6mrLwYKUg1ch2RJswTFYgMOwoau+AQsSp/FuDhVZi7J402ifgGla/GJIzGLYG5H4rnKMCUydL9wcsmZSuPikR2QmjQbWqaV2ob2RdMvaLEvFlRiXpYeTwqVOtMZF+qi0dS4uEjJKMvWuYK3S0jHZwaq7BylYp/O2uu3q04lNqudLWEJQd/3paTBz12IaLIPtzE5P1AUuW9TB8NVzaG9/TIfV+eXsWeezz6HWlptEbo4SIAeWur/Y/RZC/gmZTiLzUY2j5ct6fjKsFvxqgyQxE9sbmfYtnJMIciEKo6+FL0wziJmtkzspIcUl0PgWrL7VCKP7hl61U4WLeN+7Ieli2vZhmq0VgjDOgIyhJ62sSpDkWNZa1wiB8WoLlxzy29XpGVPgn1ut5VYcGyRLK7OCiJaDYMrAneJUkZWdw0yDgNm5nDowqLc0Kp581FO7QS4pC9S/YRW9xkVdNOj0ZHCp9anEZw3VEK/fopiDrkMObkcdJtT1g6+uzQ60bIdUPztdWZWy53m+v/zFYPOGHO4AZsalmtJNkyHrCAx1RXX7mt5g1L1pDezpkXv8wJwpVRSSaf2c26Y0rrXXxyWBptu/ovdak+VhkqjGBZUdvKygqANKA/MqZ/36kcGwFn90RnWp66ksKuHgitLFY8BU+F2ZvqpxpMY9qR3YwOUJ12fc0KUHVKdswcKXuwetErCnwvMKuXxfc/3RVJ2yFc+iosQd3X+WGSVz1UiuN2J156FyVyHbsOUp3krezaPUT/VxXqdfwvknb/Zgp+idTxTbrkLqYuKreRnhy65Gf4W0NsDoYiqf6uZsvr8V9eo6XWc5+3TVf/3N1TfeeOONN95444033njjjTfeSI1/IeOYOeO4fGAAAAAASUVORK5CYII=",
    base64BackToTop: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAElBMVEVRUVH+/v5HcEyZmZlRUVFRUVGm1ByOAAAABnRSTlPMzADMTZAJBBGsAAAEnElEQVR42t2cS27jMAyGf7/2U+QCQeDsbeQCgZDujaC5/1UmkzaJn+JDFGcw3LdfflKibJkkDnxrL7dbg7sNt6+L4O8OYBM+B0ys+QrGkHZG+OEEQ8g6go8Bx1GIGMdpNOQyIG6XdMgnSPtKhLQDGEZFBgYMkhKFtGBb0EIEjDgFRowoBVaMGAWpMedEfxMiZtwpUsgZCqtlkCNUdpVAWigtCCCDFtLwIWeoreZCWiRYYEKGFEjDg+yRZCUH0iLRAgNyToXUNCRZyMqWhGnUN2IPm3wSlwJ7IUspyCBkIQUZhCykIIeQuRTkEDKXAuM9srrtYbrZN7Y98giZSoFd+t1OxmMITG0dcrSFXFchZ1tIvQZpYWxhBbK3hpQrkMEa0iwh5t4a+QvZvDXyF7J5a+Qv5PPW21/I5623v5DPW29/IaO3Xv5Clrw1y1/Ikrdm+Qs5svw83yNnSJ5BQb4F/F7EIEJSnThGBAXxkFQfLOviQUE8JAUPsosHBfGQfDAtHhREQ1JxIV00KIgmrnRI84S0yAd5BAXxxJUck0f6Qnwr9qmr6xF5xLMjcwn/iudIEAdWnyjkEXlQKZiRVzoqRyLbgeUKKR8Q4alY7cSnoxzSf2ggsqehKr6YVpcXpOd7H93f60cKhOd7Re2LteUF4eLqiVS1mr0ge4io6C2+soaFkJ7MuuuQs1yITEp9hwwKISIpzR2iESKSIoT0rLNwuVHQqoSIpAQJpGce60vIUSdEIuUqgPTsJ5QFZK8UIpBS8iG94GFrDjlrhfCl8CG96Llxmle4kEr6vKWBPIVo9kqDQSRk9/3cWoikcCFPAd33v4dIChPyEvLzBA6RlEYWke4JEUnhKXkLeUEKxRHJFfKCQHGucIW8IdZSRkLeEGMpYyEjiK2UsZARxFTKRMgYYillImQMMZQyFTKB2EmZCplAuFLIHT8TMoWwpQwiIVMIUwqpZP5bp5CCvCTiQKr5f5lCQN+tPCBn2ZvVDFJwIDUP0m1BYAfZYRNSsCB7BqTbhoARePIxtZ9tgwWkoJcwCalmv3MBAemtO4R6dah2HaKQqj8Zvp9sQDjvJ21+SPCBHPJDDk6QITekEV7gqCC19CpKAym9IMfckKv4olMBCeIrWwVEfvkshzQekO9r9P1/ALk+IG1eSPCDiCJfyG+FyU+A6ZCa/piZDinpz7LpkCv5gdkAEshP5emQhv7onw6pGeULyZCSUYiRDAmMkpJkCKs4JhFSq8p8hJBSVbAkhARV6ZUQoisik0FqXTmcDHLVFfbJIEFXoiiCNMpiSxGkVJaNiiBBWQArgTTaUl4JpNQWJUsgQVteXQg+AKkLxQWFGKW+5J2+eVp4S168X3CF1CltCKdTJ8lb84YK2bUBO+wZW0Pqv9nk4tKu49N45NJC5dMM5tLW5tOg59Jq6NM06dL+abFXwr/RkuvTXJwae1abtE/Dt0/ruksTvs84AZ/BCC4jHnyGVfiM3VBQFANEXEah+Ax18RlP4zNox2dkkM/wI58xTn8yDCXGYCDV3W5RGSajtXyGhG1jbpbjzpwGt/0MJft8jqC7iUbQ/QZaxdnKqcIftwAAAABJRU5ErkJggg=="
  };
  const _sfc_main$_ = {
    name: "z-paging-empty-view",
    data() {
      return {};
    },
    props: {
      // 空数据描述文字
      emptyViewText: {
        type: String,
        default: "没有数据哦~"
      },
      // 空数据图片
      emptyViewImg: {
        type: String,
        default: ""
      },
      // 是否显示空数据图重新加载按钮
      showEmptyViewReload: {
        type: Boolean,
        default: false
      },
      // 空数据点击重新加载文字
      emptyViewReloadText: {
        type: String,
        default: "重新加载"
      },
      // 是否是加载失败
      isLoadFailed: {
        type: Boolean,
        default: false
      },
      // 空数据图样式
      emptyViewStyle: {
        type: Object,
        default: function() {
          return {};
        }
      },
      // 空数据图img样式
      emptyViewImgStyle: {
        type: Object,
        default: function() {
          return {};
        }
      },
      // 空数据图描述文字样式
      emptyViewTitleStyle: {
        type: Object,
        default: function() {
          return {};
        }
      },
      // 空数据图重新加载按钮样式
      emptyViewReloadStyle: {
        type: Object,
        default: function() {
          return {};
        }
      },
      // 空数据图z-index
      emptyViewZIndex: {
        type: Number,
        default: 9
      },
      // 空数据图片是否使用fixed布局并铺满z-paging
      emptyViewFixed: {
        type: Boolean,
        default: true
      },
      // 空数据图中布局的单位，默认为rpx
      unit: {
        type: String,
        default: "rpx"
      }
    },
    computed: {
      emptyImg() {
        return this.isLoadFailed ? zStatic.base64Error : zStatic.base64Empty;
      },
      finalEmptyViewStyle() {
        this.emptyViewStyle["z-index"] = this.emptyViewZIndex;
        return this.emptyViewStyle;
      }
    },
    methods: {
      // 点击了reload按钮
      reloadClick() {
        this.$emit("reload");
      },
      // 点击了空数据view
      emptyViewClick() {
        this.$emit("viewClick");
      }
    }
  };
  function _sfc_render$Z(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass({ "zp-container": true, "zp-container-fixed": $props.emptyViewFixed }),
        style: vue.normalizeStyle([$options.finalEmptyViewStyle]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.emptyViewClick && $options.emptyViewClick(...args))
      },
      [
        vue.createElementVNode("view", { class: "zp-main" }, [
          !$props.emptyViewImg.length ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 0,
            class: vue.normalizeClass({ "zp-main-image-rpx": $props.unit === "rpx", "zp-main-image-px": $props.unit === "px" }),
            style: vue.normalizeStyle([$props.emptyViewImgStyle]),
            src: $options.emptyImg
          }, null, 14, ["src"])) : (vue.openBlock(), vue.createElementBlock("image", {
            key: 1,
            class: vue.normalizeClass({ "zp-main-image-rpx": $props.unit === "rpx", "zp-main-image-px": $props.unit === "px" }),
            mode: "aspectFit",
            style: vue.normalizeStyle([$props.emptyViewImgStyle]),
            src: $props.emptyViewImg
          }, null, 14, ["src"])),
          vue.createElementVNode(
            "text",
            {
              class: vue.normalizeClass(["zp-main-title", { "zp-main-title-rpx": $props.unit === "rpx", "zp-main-title-px": $props.unit === "px" }]),
              style: vue.normalizeStyle([$props.emptyViewTitleStyle])
            },
            vue.toDisplayString($props.emptyViewText),
            7
            /* TEXT, CLASS, STYLE */
          ),
          $props.showEmptyViewReload ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 2,
              class: vue.normalizeClass({ "zp-main-error-btn": true, "zp-main-error-btn-rpx": $props.unit === "rpx", "zp-main-error-btn-px": $props.unit === "px" }),
              style: vue.normalizeStyle([$props.emptyViewReloadStyle]),
              onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.reloadClick && $options.reloadClick(...args), ["stop"]))
            },
            vue.toDisplayString($props.emptyViewReloadText),
            7
            /* TEXT, CLASS, STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["render", _sfc_render$Z], ["__scopeId", "data-v-b7999e14"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/z-paging/components/z-paging-empty-view/z-paging-empty-view.vue"]]);
  const c = {
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
  const zLocalConfig = {};
  const storageKey = "Z-PAGING-REFRESHER-TIME-STORAGE-KEY";
  let config = null;
  let configLoaded = false;
  const timeoutMap = {};
  function gc(key, defaultValue) {
    return () => {
      _handleDefaultConfig();
      if (!config)
        return defaultValue;
      const value2 = config[key];
      return value2 === void 0 ? defaultValue : value2;
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
    formatAppLog("error", "at uni_modules/z-paging/components/z-paging/js/z-paging-utils.js:76", `[z-paging]${err}`);
  }
  function delay(callback, ms = c.delayTime, key) {
    const timeout2 = setTimeout(callback, ms);
    if (!!key) {
      timeoutMap[key] && clearTimeout(timeoutMap[key]);
      timeoutMap[key] = timeout2;
    }
    return timeout2;
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
  function isPromise(func2) {
    return Object.prototype.toString.call(func2) === "[object Promise]";
  }
  function addUnit$1(value2, unit) {
    if (Object.prototype.toString.call(value2) === "[object String]") {
      let tempValue = value2;
      tempValue = tempValue.replace("rpx", "").replace("upx", "").replace("px", "");
      if (value2.indexOf("rpx") === -1 && value2.indexOf("upx") === -1 && value2.indexOf("px") !== -1) {
        tempValue = parseFloat(tempValue) * 2;
      }
      value2 = tempValue;
    }
    return unit === "rpx" ? value2 + "rpx" : value2 / 2 + "px";
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
    if (zLocalConfig && Object.keys(zLocalConfig).length) {
      config = zLocalConfig;
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
    const date2 = new Date(time);
    const currentDate = /* @__PURE__ */ new Date();
    const dateDay = new Date(time).setHours(0, 0, 0, 0);
    const currentDateDay = (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0);
    const disTime = dateDay - currentDateDay;
    let dayStr = "";
    const timeStr = _dateTimeFormat(date2);
    if (disTime === 0) {
      dayStr = textMap.today;
    } else if (disTime === -864e5) {
      dayStr = textMap.yesterday;
    } else {
      dayStr = _dateDayFormat(date2, date2.getFullYear() !== currentDate.getFullYear());
    }
    return `${dayStr} ${timeStr}`;
  }
  function _dateDayFormat(date2, showYear = true) {
    const year = date2.getFullYear();
    const month = date2.getMonth() + 1;
    const day = date2.getDate();
    return showYear ? `${year}-${_fullZeroToTwo(month)}-${_fullZeroToTwo(day)}` : `${_fullZeroToTwo(month)}-${_fullZeroToTwo(day)}`;
  }
  function _dateTimeFormat(date2) {
    const hour = date2.getHours();
    const minute = date2.getMinutes();
    return `${_fullZeroToTwo(hour)}:${_fullZeroToTwo(minute)}`;
  }
  function _fullZeroToTwo(str) {
    str = str.toString();
    return str.length === 1 ? "0" + str : str;
  }
  function _toCamelCase(value2) {
    return value2.replace(/-([a-z])/g, (_, group1) => group1.toUpperCase());
  }
  const u = {
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
    addUnit: addUnit$1,
    deepCopy,
    rpx2px
  };
  const Enum = {
    // 当前加载类型 refresher:下拉刷新 load-more:上拉加载更多
    LoadingType: {
      Refresher: "refresher",
      LoadMore: "load-more"
    },
    // 下拉刷新状态 default:默认状态 release-to-refresh:松手立即刷新 loading:刷新中 complete:刷新结束 go-f2:松手进入二楼
    Refresher: {
      Default: "default",
      ReleaseToRefresh: "release-to-refresh",
      Refreshing: "refreshing",
      Complete: "complete",
      GoF2: "go-f2"
    },
    // 底部加载更多状态 default:默认状态 loading:加载中 no-more:没有更多数据 fail:加载失败
    More: {
      Default: "default",
      Loading: "loading",
      NoMore: "no-more",
      Fail: "fail"
    },
    // @query触发来源 user-pull-down:用户主动下拉刷新 reload:通过reload触发 refresh:通过refresh触发 load-more:通过滚动到底部加载更多或点击底部加载更多触发
    QueryFrom: {
      UserPullDown: "user-pull-down",
      Reload: "reload",
      Refresh: "refresh",
      LoadMore: "load-more"
    },
    // 虚拟列表cell高度模式
    CellHeightMode: {
      // 固定高度
      Fixed: "fixed",
      // 动态高度
      Dynamic: "dynamic"
    },
    // 列表缓存模式
    CacheMode: {
      // 默认模式，只会缓存一次
      Default: "default",
      // 总是缓存，每次列表刷新(下拉刷新、调用reload等)都会更新缓存
      Always: "always"
    }
  };
  const _sfc_main$Z = {
    name: "z-paging-refresh",
    data() {
      return {
        R: Enum.Refresher,
        isIos: uni.getSystemInfoSync().platform === "ios",
        refresherTimeText: "",
        zTheme: {
          title: { white: "#efefef", black: "#555555" },
          arrow: { white: zStatic.base64ArrowWhite, black: zStatic.base64Arrow },
          flower: { white: zStatic.base64FlowerWhite, black: zStatic.base64Flower },
          success: { white: zStatic.base64SuccessWhite, black: zStatic.base64Success },
          indicator: { white: "#eeeeee", black: "#777777" }
        }
      };
    },
    props: [
      "status",
      "defaultThemeStyle",
      "defaultText",
      "pullingText",
      "refreshingText",
      "completeText",
      "goF2Text",
      "defaultImg",
      "pullingImg",
      "refreshingImg",
      "completeImg",
      "refreshingAnimated",
      "showUpdateTime",
      "updateTimeKey",
      "imgStyle",
      "titleStyle",
      "updateTimeStyle",
      "updateTimeTextMap",
      "unit"
    ],
    computed: {
      ts() {
        return this.defaultThemeStyle;
      },
      // 当前状态Map
      statusTextMap() {
        this.updateTime();
        const { R, defaultText, pullingText, refreshingText, completeText, goF2Text } = this;
        return {
          [R.Default]: defaultText,
          [R.ReleaseToRefresh]: pullingText,
          [R.Refreshing]: refreshingText,
          [R.Complete]: completeText,
          [R.GoF2]: goF2Text
        };
      },
      // 当前状态文字
      currentTitle() {
        return this.statusTextMap[this.status] || this.defaultText;
      },
      // 左侧图片class
      leftImageClass() {
        const preSizeClass = `zp-r-left-image-pre-size-${this.unit}`;
        if (this.status === this.R.Complete)
          return preSizeClass;
        return `zp-r-left-image ${preSizeClass} ${this.status === this.R.Default ? "zp-r-arrow-down" : "zp-r-arrow-top"}`;
      },
      // 左侧图片style
      leftImageStyle() {
        const showUpdateTime = this.showUpdateTime;
        const size = showUpdateTime ? u.addUnit(36, this.unit) : u.addUnit(34, this.unit);
        return { width: size, height: size, "margin-right": showUpdateTime ? u.addUnit(20, this.unit) : u.addUnit(9, this.unit) };
      },
      // 左侧图片src
      leftImageSrc() {
        const R = this.R;
        const status = this.status;
        if (status === R.Default) {
          if (!!this.defaultImg)
            return this.defaultImg;
          return this.zTheme.arrow[this.ts];
        } else if (status === R.ReleaseToRefresh) {
          if (!!this.pullingImg)
            return this.pullingImg;
          if (!!this.defaultImg)
            return this.defaultImg;
          return this.zTheme.arrow[this.ts];
        } else if (status === R.Refreshing) {
          if (!!this.refreshingImg)
            return this.refreshingImg;
          return this.zTheme.flower[this.ts];
        } else if (status === R.Complete) {
          if (!!this.completeImg)
            return this.completeImg;
          return this.zTheme.success[this.ts];
        } else if (status === R.GoF2) {
          return this.zTheme.arrow[this.ts];
        }
        return "";
      },
      // 右侧文字style
      rightTextStyle() {
        let stl = {};
        stl["color"] = this.zTheme.title[this.ts];
        stl["font-size"] = u.addUnit(30, this.unit);
        return stl;
      }
    },
    methods: {
      // 添加单位
      addUnit(value2, unit) {
        return u.addUnit(value2, unit);
      },
      // 更新下拉刷新时间
      updateTime() {
        if (this.showUpdateTime) {
          this.refresherTimeText = u.getRefesrherFormatTimeByKey(this.updateTimeKey, this.updateTimeTextMap);
        }
      }
    }
  };
  function _sfc_render$Y(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { style: { "height": "100%" } }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass($props.showUpdateTime ? "zp-r-container zp-r-container-padding" : "zp-r-container")
        },
        [
          vue.createElementVNode("view", { class: "zp-r-left" }, [
            vue.createCommentVNode(" 非加载中(继续下拉刷新、松手立即刷新状态图片) "),
            $props.status !== $data.R.Refreshing ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              class: vue.normalizeClass($options.leftImageClass),
              style: vue.normalizeStyle([$options.leftImageStyle, $props.imgStyle]),
              src: $options.leftImageSrc
            }, null, 14, ["src"])) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              [
                vue.createCommentVNode(" 加载状态图片 "),
                vue.createElementVNode("image", {
                  class: vue.normalizeClass({ "zp-line-loading-image": $props.refreshingAnimated, "zp-r-left-image": true, "zp-r-left-image-pre-size-rpx": $props.unit === "rpx", "zp-r-left-image-pre-size-px": $props.unit === "px" }),
                  style: vue.normalizeStyle([$options.leftImageStyle, $props.imgStyle]),
                  src: $options.leftImageSrc
                }, null, 14, ["src"])
              ],
              2112
              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
            )),
            vue.createCommentVNode(" 在nvue中，加载状态loading使用系统loading ")
          ]),
          vue.createCommentVNode(" 右侧文字内容 "),
          vue.createElementVNode("view", { class: "zp-r-right" }, [
            vue.createCommentVNode(" 右侧下拉刷新状态文字 "),
            vue.createElementVNode(
              "text",
              {
                class: "zp-r-right-text",
                style: vue.normalizeStyle([$options.rightTextStyle, $props.titleStyle])
              },
              vue.toDisplayString($options.currentTitle),
              5
              /* TEXT, STYLE */
            ),
            vue.createCommentVNode(" 右侧下拉刷新时间文字 "),
            $props.showUpdateTime && $data.refresherTimeText.length ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: vue.normalizeClass(["zp-r-right-text", { "zp-r-right-time-text-rpx": $props.unit === "rpx", "zp-r-right-time-text-px": $props.unit === "px" }]),
                style: vue.normalizeStyle([{ color: $data.zTheme.title[$options.ts] }, $props.updateTimeStyle])
              },
              vue.toDisplayString($data.refresherTimeText),
              7
              /* TEXT, CLASS, STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      )
    ]);
  }
  const zPagingRefresh = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["render", _sfc_render$Y], ["__scopeId", "data-v-00a16504"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/z-paging/components/z-paging/components/z-paging-refresh.vue"]]);
  const _sfc_main$Y = {
    name: "z-paging-load-more",
    data() {
      return {
        M: Enum.More,
        zTheme: {
          title: { white: "#efefef", black: "#a4a4a4" },
          line: { white: "#efefef", black: "#eeeeee" },
          circleBorder: { white: "#aaaaaa", black: "#c8c8c8" },
          circleBorderTop: { white: "#ffffff", black: "#444444" },
          flower: { white: zStatic.base64FlowerWhite, black: zStatic.base64Flower },
          indicator: { white: "#eeeeee", black: "#777777" }
        }
      };
    },
    props: ["zConfig"],
    computed: {
      ts() {
        return this.c.defaultThemeStyle;
      },
      // 底部加载更多配置
      c() {
        return this.zConfig || {};
      },
      // 底部加载更多文字
      ownLoadingMoreText() {
        return {
          [this.M.Default]: this.c.defaultText,
          [this.M.Loading]: this.c.loadingText,
          [this.M.NoMore]: this.c.noMoreText,
          [this.M.Fail]: this.c.failText
        }[this.finalStatus];
      },
      // 底部加载更多状态
      finalStatus() {
        if (this.c.defaultAsLoading && this.c.status === this.M.Default)
          return this.M.Loading;
        return this.c.status;
      },
      // 加载更多icon类型
      finalLoadingIconType() {
        return this.c.loadingIconType;
      }
    },
    methods: {
      // 点击了加载更多
      doClick() {
        this.$emit("doClick");
      }
    }
  };
  function _sfc_render$X(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["zp-l-container", { "zp-l-container-rpx": $options.c.unit === "rpx", "zp-l-container-px": $options.c.unit === "px" }]),
        style: vue.normalizeStyle([$options.c.customStyle]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.doClick && $options.doClick(...args))
      },
      [
        !$options.c.hideContent ? (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 0 },
          [
            vue.createCommentVNode(" 底部加载更多没有更多数据分割线 "),
            $options.c.showNoMoreLine && $options.finalStatus === $data.M.NoMore ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: vue.normalizeClass({ "zp-l-line-rpx": $options.c.unit === "rpx", "zp-l-line-px": $options.c.unit === "px" }),
                style: vue.normalizeStyle([{ backgroundColor: $data.zTheme.line[$options.ts] }, $options.c.noMoreLineCustomStyle])
              },
              null,
              6
              /* CLASS, STYLE */
            )) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" 底部加载更多loading "),
            $options.finalStatus === $data.M.Loading && !!$options.c.loadingIconCustomImage ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 1,
              src: $options.c.loadingIconCustomImage,
              style: vue.normalizeStyle([$options.c.iconCustomStyle]),
              class: vue.normalizeClass({ "zp-l-line-loading-custom-image": true, "zp-l-line-loading-custom-image-animated": $options.c.loadingAnimated, "zp-l-line-loading-custom-image-rpx": $options.c.unit === "rpx", "zp-l-line-loading-custom-image-px": $options.c.unit === "px" })
            }, null, 14, ["src"])) : vue.createCommentVNode("v-if", true),
            $options.finalStatus === $data.M.Loading && $options.finalLoadingIconType === "flower" && !$options.c.loadingIconCustomImage.length ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 2,
              class: vue.normalizeClass({ "zp-line-loading-image": true, "zp-line-loading-image-rpx": $options.c.unit === "rpx", "zp-line-loading-image-px": $options.c.unit === "px" }),
              style: vue.normalizeStyle([$options.c.iconCustomStyle]),
              src: $data.zTheme.flower[$options.ts]
            }, null, 14, ["src"])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" 底部加载更多文字 "),
            $options.finalStatus === $data.M.Loading && $options.finalLoadingIconType === "circle" && !$options.c.loadingIconCustomImage.length ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 3,
                class: vue.normalizeClass(["zp-l-circle-loading-view", { "zp-l-circle-loading-view-rpx": $options.c.unit === "rpx", "zp-l-circle-loading-view-px": $options.c.unit === "px" }]),
                style: vue.normalizeStyle([{ borderColor: $data.zTheme.circleBorder[$options.ts], borderTopColor: $data.zTheme.circleBorderTop[$options.ts] }, $options.c.iconCustomStyle])
              },
              null,
              6
              /* CLASS, STYLE */
            )) : vue.createCommentVNode("v-if", true),
            !$options.c.isChat || !$options.c.chatDefaultAsLoading && $options.finalStatus === $data.M.Default || $options.finalStatus === $data.M.Fail ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 4,
                class: vue.normalizeClass({ "zp-l-text-rpx": $options.c.unit === "rpx", "zp-l-text-px": $options.c.unit === "px" }),
                style: vue.normalizeStyle([{ color: $data.zTheme.title[$options.ts] }, $options.c.titleCustomStyle])
              },
              vue.toDisplayString($options.ownLoadingMoreText),
              7
              /* TEXT, CLASS, STYLE */
            )) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" 底部加载更多没有更多数据分割线 "),
            $options.c.showNoMoreLine && $options.finalStatus === $data.M.NoMore ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 5,
                class: vue.normalizeClass({ "zp-l-line-rpx": $options.c.unit === "rpx", "zp-l-line-px": $options.c.unit === "px" }),
                style: vue.normalizeStyle([{ backgroundColor: $data.zTheme.line[$options.ts] }, $options.c.noMoreLineCustomStyle])
              },
              null,
              6
              /* CLASS, STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ],
          64
          /* STABLE_FRAGMENT */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const zPagingLoadMore = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["render", _sfc_render$X], ["__scopeId", "data-v-8cc5c400"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/z-paging/components/z-paging/components/z-paging-load-more.vue"]]);
  const commonLayoutModule = {
    data() {
      return {
        systemInfo: null,
        cssSafeAreaInsetBottom: -1,
        isReadyDestroy: false
      };
    },
    computed: {
      // 顶部可用距离
      windowTop() {
        if (!this.systemInfo)
          return 0;
        return this.systemInfo.windowTop || 0;
      },
      // 底部安全区域高度
      safeAreaBottom() {
        if (!this.systemInfo)
          return 0;
        let safeAreaBottom = 0;
        safeAreaBottom = this.systemInfo.safeAreaInsets.bottom || 0;
        return safeAreaBottom;
      },
      // 是否是比较老的webview，在一些老的webview中，需要进行一些特殊处理
      isOldWebView() {
        try {
          const systemInfos = uni.getSystemInfoSync().system.split(" ");
          const deviceType = systemInfos[0];
          const version = parseInt(systemInfos[1]);
          if (deviceType === "iOS" && version <= 10 || deviceType === "Android" && version <= 6) {
            return true;
          }
        } catch (e) {
          return false;
        }
        return false;
      },
      // 当前组件的$slots，兼容不同平台
      zSlots() {
        return this.$slots;
      }
    },
    beforeDestroy() {
      this.isReadyDestroy = true;
    },
    unmounted() {
      this.isReadyDestroy = true;
    },
    methods: {
      // 更新fixed模式下z-paging的布局
      updateFixedLayout() {
        this.fixed && this.$nextTick(() => {
          this.systemInfo = uni.getSystemInfoSync();
        });
      },
      // 获取节点尺寸
      _getNodeClientRect(select, inDom = true, scrollOffset = false, inParent = false) {
        if (this.isReadyDestroy) {
          return Promise.resolve(false);
        }
        const inDomObj = inParent ? this.$parent : this;
        let res = inDom || inParent ? uni.createSelectorQuery().in(inDomObj) : uni.createSelectorQuery();
        scrollOffset ? res.select(select).scrollOffset() : res.select(select).boundingClientRect();
        return new Promise((resolve, reject2) => {
          res.exec((data) => {
            resolve(data && data != "" && data != void 0 && data.length ? data : false);
          });
        });
      },
      // 获取slot="left"和slot="right"宽度并且更新布局
      _updateLeftAndRightWidth(targetStyle, parentNodePrefix) {
        this.$nextTick(() => {
          let delayTime = 0;
          setTimeout(() => {
            ["left", "right"].map((position) => {
              this._getNodeClientRect(`.${parentNodePrefix}-${position}`).then((res) => {
                this.$set(targetStyle, position, res ? res[0].width + "px" : "0px");
              });
            });
          }, delayTime);
        });
      },
      // 通过获取css设置的底部安全区域占位view高度设置bottom距离（直接通过systemInfo在部分平台上无法获取到底部安全区域）
      _getCssSafeAreaInsetBottom(success) {
        this._getNodeClientRect(".zp-safe-area-inset-bottom").then((res) => {
          this.cssSafeAreaInsetBottom = res ? res[0].height : -1;
          res && success && success();
        });
      }
    }
  };
  const queryKey = "Query";
  const fetchParamsKey = "FetchParams";
  const fetchResultKey = "FetchResult";
  const language2LocalKey = "Language2Local";
  function handleQuery(callback) {
    _addHandleByKey(queryKey, callback);
    return this;
  }
  function _handleQuery(pageNo, pageSize, from, lastItem) {
    const callback = _getHandleByKey(queryKey);
    return callback ? callback(pageNo, pageSize, from, lastItem) : [pageNo, pageSize, from];
  }
  function handleFetchParams(callback) {
    _addHandleByKey(fetchParamsKey, callback);
    return this;
  }
  function _handleFetchParams(parmas, extraParams) {
    const callback = _getHandleByKey(fetchParamsKey);
    return callback ? callback(parmas, extraParams || {}) : { pageNo: parmas.pageNo, pageSize: parmas.pageSize, ...extraParams || {} };
  }
  function handleFetchResult(callback) {
    _addHandleByKey(fetchResultKey, callback);
    return this;
  }
  function _handleFetchResult(result, paging, params) {
    const callback = _getHandleByKey(fetchResultKey);
    callback && callback(result, paging, params);
    return callback ? true : false;
  }
  function handleLanguage2Local(callback) {
    _addHandleByKey(language2LocalKey, callback);
    return this;
  }
  function _handleLanguage2Local(language2, local) {
    const callback = _getHandleByKey(language2LocalKey);
    return callback ? callback(language2, local) : local;
  }
  function _getApp() {
    return getApp();
  }
  function _hasGlobalData() {
    return _getApp() && _getApp().globalData;
  }
  function _addHandleByKey(key, callback) {
    try {
      setTimeout(function() {
        if (_hasGlobalData()) {
          _getApp().globalData[`zp_handle${key}Callback`] = callback;
        }
      }, 1);
    } catch (_) {
    }
  }
  function _getHandleByKey(key) {
    return _hasGlobalData() ? _getApp().globalData[`zp_handle${key}Callback`] : null;
  }
  const interceptor = {
    handleQuery,
    _handleQuery,
    handleFetchParams,
    _handleFetchParams,
    handleFetchResult,
    _handleFetchResult,
    handleLanguage2Local,
    _handleLanguage2Local
  };
  const dataHandleModule = {
    props: {
      // 自定义初始的pageNo，默认为1
      defaultPageNo: {
        type: [Number, String],
        default: u.gc("defaultPageNo", 1),
        observer: function(newVal) {
          this.pageNo = newVal;
        }
      },
      // 自定义pageSize，默认为10
      defaultPageSize: {
        type: [Number, String],
        default: u.gc("defaultPageSize", 10),
        validator: (value2) => {
          if (value2 <= 0)
            u.consoleErr("default-page-size必须大于0！");
          return value2 > 0;
        }
      },
      // 为保证数据一致，设置当前tab切换时的标识key，并在complete中传递相同key，若二者不一致，则complete将不会生效
      dataKey: {
        type: [Number, String, Object],
        default: u.gc("dataKey", null)
      },
      // 使用缓存，若开启将自动缓存第一页的数据，默认为否。请注意，因考虑到切换tab时不同tab数据不同的情况，默认仅会缓存组件首次加载时第一次请求到的数据，后续的下拉刷新操作不会更新缓存。
      useCache: {
        type: Boolean,
        default: u.gc("useCache", false)
      },
      // 使用缓存时缓存的key，用于区分不同列表的缓存数据，useCache为true时必须设置，否则缓存无效
      cacheKey: {
        type: String,
        default: u.gc("cacheKey", null)
      },
      // 缓存模式，默认仅会缓存组件首次加载时第一次请求到的数据，可设置为always，即代表总是缓存，每次列表刷新(下拉刷新、调用reload等)都会更新缓存
      cacheMode: {
        type: String,
        default: u.gc("cacheMode", Enum.CacheMode.Default)
      },
      // 自动注入的list名，可自动修改父view(包含ref="paging")中对应name的list值
      autowireListName: {
        type: String,
        default: u.gc("autowireListName", "")
      },
      // 自动注入的query名，可自动调用父view(包含ref="paging")中的query方法
      autowireQueryName: {
        type: String,
        default: u.gc("autowireQueryName", "")
      },
      // 获取分页数据Function，功能与@query类似。若设置了fetch则@query将不再触发
      fetch: {
        type: Function,
        default: null
      },
      // fetch的附加参数，fetch配置后有效
      fetchParams: {
        type: Object,
        default: u.gc("fetchParams", null)
      },
      // z-paging mounted后自动调用reload方法(mounted后自动调用接口)，默认为是
      auto: {
        type: Boolean,
        default: u.gc("auto", true)
      },
      // 用户下拉刷新时是否触发reload方法，默认为是
      reloadWhenRefresh: {
        type: Boolean,
        default: u.gc("reloadWhenRefresh", true)
      },
      // reload时自动滚动到顶部，默认为是
      autoScrollToTopWhenReload: {
        type: Boolean,
        default: u.gc("autoScrollToTopWhenReload", true)
      },
      // reload时立即自动清空原list，默认为是，若立即自动清空，则在reload之后、请求回调之前页面是空白的
      autoCleanListWhenReload: {
        type: Boolean,
        default: u.gc("autoCleanListWhenReload", true)
      },
      // 列表刷新时自动显示下拉刷新view，默认为否
      showRefresherWhenReload: {
        type: Boolean,
        default: u.gc("showRefresherWhenReload", false)
      },
      // 列表刷新时自动显示加载更多view，且为加载中状态，默认为否
      showLoadingMoreWhenReload: {
        type: Boolean,
        default: u.gc("showLoadingMoreWhenReload", false)
      },
      // 组件created时立即触发reload(可解决一些情况下先看到页面再看到loading的问题)，auto为true时有效。为否时将在mounted+nextTick后触发reload，默认为否
      createdReload: {
        type: Boolean,
        default: u.gc("createdReload", false)
      },
      // 本地分页时上拉加载更多延迟时间，单位为毫秒，默认200毫秒
      localPagingLoadingTime: {
        type: [Number, String],
        default: u.gc("localPagingLoadingTime", 200)
      },
      // 自动拼接complete中传过来的数组(使用聊天记录模式时无效)
      concat: {
        type: Boolean,
        default: u.gc("concat", true)
      },
      // 请求失败是否触发reject，默认为是
      callNetworkReject: {
        type: Boolean,
        default: u.gc("callNetworkReject", true)
      },
      // 父组件v-model所绑定的list的值
      value: {
        type: Array,
        default: function() {
          return [];
        }
      },
      modelValue: {
        type: Array,
        default: function() {
          return [];
        }
      }
    },
    data() {
      return {
        currentData: [],
        totalData: [],
        realTotalData: [],
        totalLocalPagingList: [],
        dataPromiseResultMap: {
          reload: null,
          complete: null,
          localPaging: null
        },
        isSettingCacheList: false,
        pageNo: 1,
        currentRefreshPageSize: 0,
        isLocalPaging: false,
        isAddedData: false,
        isTotalChangeFromAddData: false,
        privateConcat: true,
        myParentQuery: -1,
        firstPageLoaded: false,
        pagingLoaded: false,
        loaded: false,
        isUserReload: true,
        fromEmptyViewReload: false,
        queryFrom: "",
        listRendering: false,
        isHandlingRefreshToPage: false,
        isFirstPageAndNoMore: false,
        totalDataChangeThrow: true
      };
    },
    computed: {
      pageSize() {
        return this.defaultPageSize;
      },
      finalConcat() {
        return this.concat && this.privateConcat;
      },
      finalUseCache() {
        if (this.useCache && !this.cacheKey) {
          u.consoleErr("use-cache为true时，必须设置cache-key，否则缓存无效！");
        }
        return this.useCache && !!this.cacheKey;
      },
      finalCacheKey() {
        return this.cacheKey ? `${c.cachePrefixKey}-${this.cacheKey}` : null;
      },
      isFirstPage() {
        return this.pageNo === this.defaultPageNo;
      }
    },
    watch: {
      totalData(newVal, oldVal) {
        this._totalDataChange(newVal, oldVal, this.totalDataChangeThrow);
        this.totalDataChangeThrow = true;
      },
      currentData(newVal, oldVal) {
        this._currentDataChange(newVal, oldVal);
      },
      useChatRecordMode(newVal, oldVal) {
        if (newVal) {
          this.nLoadingMoreFixedHeight = false;
        }
      },
      value: {
        handler(newVal) {
          if (newVal !== this.totalData) {
            this.totalDataChangeThrow = false;
            this.totalData = newVal;
          }
        },
        immediate: true
      },
      modelValue: {
        handler(newVal) {
          if (newVal !== this.totalData) {
            this.totalDataChangeThrow = false;
            this.totalData = newVal;
          }
        },
        immediate: true
      }
    },
    methods: {
      // 请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging处理，第一个参数为请求结果数组，第二个参数为是否成功(默认为是）
      complete(data, success = true) {
        this.customNoMore = -1;
        return this.addData(data, success);
      },
      //【保证数据一致】请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging处理，第一个参数为请求结果数组，第二个参数为dataKey，需与:data-key绑定的一致，第三个参数为是否成功(默认为是）
      completeByKey(data, dataKey = null, success = true) {
        if (dataKey !== null && this.dataKey !== null && dataKey !== this.dataKey) {
          this.isFirstPage && this.endRefresh();
          return new Promise((resolve) => resolve());
        }
        this.customNoMore = -1;
        return this.addData(data, success);
      },
      //【通过total判断是否有更多数据】请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging处理，第一个参数为请求结果数组，第二个参数为total(列表总数)，第三个参数为是否成功(默认为是）
      completeByTotal(data, total, success = true) {
        if (total == "undefined") {
          this.customNoMore = -1;
        } else {
          const dataTypeRes = this._checkDataType(data, success, false);
          data = dataTypeRes.data;
          success = dataTypeRes.success;
          if (total >= 0 && success) {
            return new Promise((resolve, reject2) => {
              this.$nextTick(() => {
                let nomore = false;
                const realTotalDataCount = this.pageNo == this.defaultPageNo ? 0 : this.realTotalData.length;
                const dataLength = this.privateConcat ? data.length : 0;
                let exceedCount = realTotalDataCount + dataLength - total;
                if (exceedCount >= 0) {
                  nomore = true;
                  exceedCount = this.defaultPageSize - exceedCount;
                  if (this.privateConcat && exceedCount > 0 && exceedCount < data.length) {
                    data = data.splice(0, exceedCount);
                  }
                }
                this.completeByNoMore(data, nomore, success).then((res) => resolve(res)).catch(() => reject2());
              });
            });
          }
        }
        return this.addData(data, success);
      },
      //【自行判断是否有更多数据】请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging处理，第一个参数为请求结果数组，第二个参数为是否没有更多数据，第三个参数为是否成功(默认是是）
      completeByNoMore(data, nomore, success = true) {
        if (nomore != "undefined") {
          this.customNoMore = nomore == true ? 1 : 0;
        }
        return this.addData(data, success);
      },
      // 请求结束且请求失败时调用，支持传入请求失败原因
      completeByError(errorMsg) {
        this.customerEmptyViewErrorText = errorMsg;
        return this.complete(false);
      },
      // 与上方complete方法功能一致，新版本中设置服务端回调数组请使用complete方法
      addData(data, success = true) {
        if (!this.fromCompleteEmit) {
          this.disabledCompleteEmit = true;
          this.fromCompleteEmit = false;
        }
        const currentTimeStamp = u.getTime();
        const disTime = currentTimeStamp - this.requestTimeStamp;
        let minDelay = this.minDelay;
        if (this.isFirstPage && this.finalShowRefresherWhenReload) {
          minDelay = Math.max(400, minDelay);
        }
        const addDataDalay = this.requestTimeStamp > 0 && disTime < minDelay ? minDelay - disTime : 0;
        this.$nextTick(() => {
          u.delay(() => {
            this._addData(data, success, false);
          }, this.delay > 0 ? this.delay : addDataDalay);
        });
        return new Promise((resolve, reject2) => {
          this.dataPromiseResultMap.complete = { resolve, reject: reject2 };
        });
      },
      // 从顶部添加数据，不会影响分页的pageNo和pageSize
      addDataFromTop(data, toTop = true, toTopWithAnimate = true) {
        let addFromTop = !this.isChatRecordModeAndNotInversion;
        data = Object.prototype.toString.call(data) !== "[object Array]" ? [data] : addFromTop ? data.reverse() : data;
        this.finalUseVirtualList && this._setCellIndex(data, "top");
        this.totalData = addFromTop ? [...data, ...this.totalData] : [...this.totalData, ...data];
        if (toTop) {
          u.delay(() => this.useChatRecordMode ? this.scrollToBottom(toTopWithAnimate) : this.scrollToTop(toTopWithAnimate));
        }
      },
      // 重新设置列表数据，调用此方法不会影响pageNo和pageSize，也不会触发请求。适用场景：当需要删除列表中某一项时，将删除对应项后的数组通过此方法传递给z-paging。(当出现类似的需要修改列表数组的场景时，请使用此方法，请勿直接修改page中:list.sync绑定的数组)
      resetTotalData(data) {
        this.isTotalChangeFromAddData = true;
        data = Object.prototype.toString.call(data) !== "[object Array]" ? [data] : data;
        this.totalData = data;
      },
      // 设置本地分页数据，请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging作分页处理（若调用了此方法，则上拉加载更多时内部会自动分页，不会触发@query所绑定的事件）
      setLocalPaging(data, success = true) {
        this.isLocalPaging = true;
        this.$nextTick(() => {
          this._addData(data, success, true);
        });
        return new Promise((resolve, reject2) => {
          this.dataPromiseResultMap.localPaging = { resolve, reject: reject2 };
        });
      },
      // 重新加载分页数据，pageNo会恢复为默认值，相当于下拉刷新的效果(animate为true时会展示下拉刷新动画，默认为false)
      reload(animate = this.showRefresherWhenReload) {
        if (animate) {
          this.privateShowRefresherWhenReload = animate;
          this.isUserPullDown = true;
        }
        if (!this.showLoadingMoreWhenReload) {
          this.listRendering = true;
        }
        this.$nextTick(() => {
          this._preReload(animate, false);
        });
        return new Promise((resolve, reject2) => {
          this.dataPromiseResultMap.reload = { resolve, reject: reject2 };
        });
      },
      // 刷新列表数据，pageNo和pageSize不会重置，列表数据会重新从服务端获取。必须保证@query绑定的方法中的pageNo和pageSize和传给服务端的一致
      refresh() {
        return this._handleRefreshWithDisPageNo(this.pageNo - this.defaultPageNo + 1);
      },
      // 刷新列表数据至指定页，例如pageNo=5时则代表刷新列表至第5页，此时pageNo会变为5，列表会展示前5页的数据。必须保证@query绑定的方法中的pageNo和pageSize和传给服务端的一致
      refreshToPage(pageNo) {
        this.isHandlingRefreshToPage = true;
        return this._handleRefreshWithDisPageNo(pageNo + this.defaultPageNo - 1);
      },
      // 手动更新列表缓存数据，将自动截取v-model绑定的list中的前pageSize条覆盖缓存，请确保在list数据更新到预期结果后再调用此方法
      updateCache() {
        if (this.finalUseCache && this.totalData.length) {
          this._saveLocalCache(this.totalData.slice(0, Math.min(this.totalData.length, this.pageSize)));
        }
      },
      // 清空分页数据
      clean() {
        this._reload(true);
        this._addData([], true, false);
      },
      // 清空分页数据
      clear() {
        this.clean();
      },
      // reload之前的一些处理
      _preReload(animate = this.showRefresherWhenReload, isFromMounted = true, retryCount = 0) {
        const showRefresher = this.finalRefresherEnabled && this.useCustomRefresher;
        if (this.customRefresherHeight === -1 && showRefresher) {
          u.delay(() => {
            retryCount++;
            if (retryCount % 10 === 0) {
              this._updateCustomRefresherHeight();
            }
            this._preReload(animate, isFromMounted, retryCount);
          }, c.delayTime / 2);
          return;
        }
        this.isUserReload = true;
        this.loadingType = Enum.LoadingType.Refresher;
        if (animate) {
          this.privateShowRefresherWhenReload = animate;
          if (this.useCustomRefresher) {
            this._doRefresherRefreshAnimate();
          } else {
            this.refresherTriggered = true;
          }
        } else {
          this._refresherEnd(false, false, false, false);
        }
        this._reload(false, isFromMounted);
      },
      // 重新加载分页数据
      _reload(isClean = false, isFromMounted = false, isUserPullDown = false) {
        this.isAddedData = false;
        this.insideOfPaging = -1;
        this.cacheScrollNodeHeight = -1;
        this.pageNo = this.defaultPageNo;
        this._cleanRefresherEndTimeout();
        !this.privateShowRefresherWhenReload && !isClean && this._startLoading(true);
        this.firstPageLoaded = true;
        this.isTotalChangeFromAddData = false;
        if (!this.isSettingCacheList) {
          this.totalData = [];
        }
        if (!isClean) {
          this._emitQuery(this.pageNo, this.defaultPageSize, isUserPullDown ? Enum.QueryFrom.UserPullDown : Enum.QueryFrom.Reload);
          let delay2 = 0;
          u.delay(this._callMyParentQuery, delay2);
          if (!isFromMounted && this.autoScrollToTopWhenReload) {
            this._scrollToTop(false);
          }
        }
      },
      // 处理服务端返回的数组
      _addData(data, success, isLocal) {
        this.isAddedData = true;
        this.fromEmptyViewReload = false;
        this.isTotalChangeFromAddData = true;
        this.refresherTriggered = false;
        this._endSystemLoadingAndRefresh();
        const tempIsUserPullDown = this.isUserPullDown;
        if (this.showRefresherUpdateTime && this.isFirstPage) {
          u.setRefesrherTime(u.getTime(), this.refresherUpdateTimeKey);
          this.$refs.refresh && this.$refs.refresh.updateTime();
        }
        if (!isLocal && tempIsUserPullDown && this.isFirstPage) {
          this.isUserPullDown = false;
        }
        if (!this.isFirstPage) {
          this.listRendering = true;
          this.$nextTick(() => {
            u.delay(() => this.listRendering = false);
          });
        } else {
          this.listRendering = false;
        }
        let dataTypeRes = this._checkDataType(data, success, isLocal);
        data = dataTypeRes.data;
        success = dataTypeRes.success;
        let delayTime = c.delayTime;
        if (this.useChatRecordMode)
          delayTime = 0;
        this.loadingForNow = false;
        u.delay(() => {
          this.pagingLoaded = true;
          this.$nextTick(() => {
            !isLocal && this._refresherEnd(delayTime > 0, true, tempIsUserPullDown);
          });
        });
        if (this.isFirstPage) {
          this.isLoadFailed = !success;
          this.$emit("isLoadFailedChange", this.isLoadFailed);
          if (this.finalUseCache && success && (this.cacheMode === Enum.CacheMode.Always ? true : this.isSettingCacheList)) {
            this._saveLocalCache(data);
          }
        }
        this.isSettingCacheList = false;
        if (success) {
          if (!(this.privateConcat === false && !this.isHandlingRefreshToPage && this.loadingStatus === Enum.More.NoMore)) {
            this.loadingStatus = Enum.More.Default;
          }
          if (isLocal) {
            this.totalLocalPagingList = data;
            const localPageNo = this.defaultPageNo;
            const localPageSize = this.queryFrom !== Enum.QueryFrom.Refresh ? this.defaultPageSize : this.currentRefreshPageSize;
            this._localPagingQueryList(localPageNo, localPageSize, 0, (res) => {
              u.delay(() => {
                this.completeByTotal(res, this.totalLocalPagingList.length);
              }, 0);
            });
          } else {
            let dataChangeDelayTime = 0;
            u.delay(() => {
              this._currentDataChange(data, this.currentData);
              this._callDataPromise(true, this.totalData);
            }, dataChangeDelayTime);
          }
          if (this.isHandlingRefreshToPage) {
            this.isHandlingRefreshToPage = false;
            this.pageNo = this.defaultPageNo + Math.ceil(data.length / this.pageSize) - 1;
            if (data.length % this.pageSize !== 0) {
              this.customNoMore = 1;
            }
          }
        } else {
          this._currentDataChange(data, this.currentData);
          this._callDataPromise(false);
          this.loadingStatus = Enum.More.Fail;
          this.isHandlingRefreshToPage = false;
          if (this.loadingType === Enum.LoadingType.LoadMore) {
            this.pageNo--;
          }
        }
      },
      // 所有数据改变时调用
      _totalDataChange(newVal, oldVal, eventThrow = true) {
        if ((!this.isUserReload || !this.autoCleanListWhenReload) && this.firstPageLoaded && !newVal.length && oldVal.length) {
          return;
        }
        this._doCheckScrollViewShouldFullHeight(newVal);
        if (!this.realTotalData.length && !newVal.length) {
          eventThrow = false;
        }
        this.realTotalData = newVal;
        if (eventThrow) {
          this.$emit("input", newVal);
          this.$emit("update:modelValue", newVal);
          this.$emit("update:list", newVal);
          this.$emit("listChange", newVal);
          this._callMyParentList(newVal);
        }
        this.firstPageLoaded = false;
        this.isTotalChangeFromAddData = false;
        this.$nextTick(() => {
          u.delay(() => {
            this._getNodeClientRect(".zp-paging-container-content").then((res) => {
              res && this.$emit("contentHeightChanged", res[0].height);
            });
          }, c.delayTime * (this.isIos ? 1 : 3));
        });
      },
      // 当前数据改变时调用
      _currentDataChange(newVal, oldVal) {
        newVal = [...newVal];
        this.finalUseVirtualList && this._setCellIndex(newVal, "bottom");
        if (this.isFirstPage && this.finalConcat) {
          this.totalData = [];
        }
        if (this.customNoMore !== -1) {
          if (this.customNoMore === 1 || this.customNoMore !== 0 && !newVal.length) {
            this.loadingStatus = Enum.More.NoMore;
          }
        } else {
          if (!newVal.length || newVal.length && newVal.length < this.defaultPageSize) {
            this.loadingStatus = Enum.More.NoMore;
          }
        }
        if (!this.totalData.length) {
          this.totalData = newVal;
        } else {
          if (this.finalConcat) {
            this.oldScrollTop;
            this.totalData = [...this.totalData, ...newVal];
          } else {
            this.totalData = newVal;
          }
        }
        this.privateConcat = true;
      },
      // 根据pageNo处理refresh操作
      _handleRefreshWithDisPageNo(pageNo) {
        if (!this.isHandlingRefreshToPage && !this.realTotalData.length)
          return this.reload();
        if (pageNo >= 1) {
          this.loading = true;
          this.privateConcat = false;
          const totalPageSize = pageNo * this.pageSize;
          this.currentRefreshPageSize = totalPageSize;
          if (this.isLocalPaging && this.isHandlingRefreshToPage) {
            this._localPagingQueryList(this.defaultPageNo, totalPageSize, 0, (res) => {
              this.complete(res);
            });
          } else {
            this._emitQuery(this.defaultPageNo, totalPageSize, Enum.QueryFrom.Refresh);
            this._callMyParentQuery(this.defaultPageNo, totalPageSize);
          }
        }
        return new Promise((resolve, reject2) => {
          this.dataPromiseResultMap.reload = { resolve, reject: reject2 };
        });
      },
      // 本地分页请求
      _localPagingQueryList(pageNo, pageSize, localPagingLoadingTime, callback) {
        pageNo = Math.max(1, pageNo);
        pageSize = Math.max(1, pageSize);
        const totalPagingList = [...this.totalLocalPagingList];
        const pageNoIndex = (pageNo - 1) * pageSize;
        const finalPageNoIndex = Math.min(totalPagingList.length, pageNoIndex + pageSize);
        const resultPagingList = totalPagingList.splice(pageNoIndex, finalPageNoIndex - pageNoIndex);
        u.delay(() => callback(resultPagingList), localPagingLoadingTime);
      },
      // 存储列表缓存数据
      _saveLocalCache(data) {
        uni.setStorageSync(this.finalCacheKey, data);
      },
      // 通过缓存数据填充列表数据
      _setListByLocalCache() {
        this.totalData = uni.getStorageSync(this.finalCacheKey) || [];
        this.isSettingCacheList = true;
      },
      // 修改父view的list
      _callMyParentList(newVal) {
        if (this.autowireListName.length) {
          const myParent = u.getParent(this.$parent);
          if (myParent && myParent[this.autowireListName]) {
            myParent[this.autowireListName] = newVal;
          }
        }
      },
      // 调用父view的query
      _callMyParentQuery(customPageNo = 0, customPageSize = 0) {
        if (this.autowireQueryName) {
          if (this.myParentQuery === -1) {
            const myParent = u.getParent(this.$parent);
            if (myParent && myParent[this.autowireQueryName]) {
              this.myParentQuery = myParent[this.autowireQueryName];
            }
          }
          if (this.myParentQuery !== -1) {
            customPageSize > 0 ? this.myParentQuery(customPageNo, customPageSize) : this.myParentQuery(this.pageNo, this.defaultPageSize);
          }
        }
      },
      // emit query事件
      _emitQuery(pageNo, pageSize, from) {
        this.queryFrom = from;
        this.requestTimeStamp = u.getTime();
        const [lastItem] = this.realTotalData.slice(-1);
        if (this.fetch) {
          const fetchParams = interceptor._handleFetchParams({ pageNo, pageSize, from, lastItem: lastItem || null }, this.fetchParams);
          const fetchResult = this.fetch(fetchParams);
          if (!interceptor._handleFetchResult(fetchResult, this, fetchParams)) {
            u.isPromise(fetchResult) ? fetchResult.then((res) => {
              this.complete(res);
            }).catch((err) => {
              this.complete(false);
            }) : this.complete(fetchResult);
          }
        } else {
          this.$emit("query", ...interceptor._handleQuery(pageNo, pageSize, from, lastItem || null));
        }
      },
      // 触发数据改变promise
      _callDataPromise(success, totalList) {
        for (const key in this.dataPromiseResultMap) {
          const obj = this.dataPromiseResultMap[key];
          if (!obj)
            continue;
          success ? obj.resolve({ totalList, noMore: this.loadingStatus === Enum.More.NoMore }) : this.callNetworkReject && obj.reject(`z-paging-${key}-error`);
        }
      },
      // 检查complete data的类型
      _checkDataType(data, success, isLocal) {
        const dataType = Object.prototype.toString.call(data);
        if (dataType === "[object Boolean]") {
          success = data;
          data = [];
        } else if (dataType !== "[object Array]") {
          data = [];
          if (dataType !== "[object Undefined]" && dataType !== "[object Null]") {
            u.consoleErr(`${isLocal ? "setLocalPaging" : "complete"}参数类型不正确，第一个参数类型必须为Array!`);
          }
        }
        return { data, success };
      }
    }
  };
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index2 = 0;
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index2 < tokens.length) {
      const token = tokens[index2];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index2++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
    if (messages2 && Object.keys(messages2).length > 0) {
      locales = Object.keys(messages2);
    }
    const lang = startsWith(locale, locales);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater: formater2 }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater2 || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index2 = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index2, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      const options = [
        messages2,
        locale
      ];
      locale = options[0];
      messages2 = options[1];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  const en = {
    "zp.refresher.default": "Pull down to refresh",
    "zp.refresher.pulling": "Release to refresh",
    "zp.refresher.refreshing": "Refreshing...",
    "zp.refresher.complete": "Refresh succeeded",
    "zp.refresher.f2": "Refresh to enter 2f",
    "zp.loadingMore.default": "Click to load more",
    "zp.loadingMore.loading": "Loading...",
    "zp.loadingMore.noMore": "No more data",
    "zp.loadingMore.fail": "Load failed,click to reload",
    "zp.emptyView.title": "No data",
    "zp.emptyView.reload": "Reload",
    "zp.emptyView.error": "Sorry,load failed",
    "zp.refresherUpdateTime.title": "Last update: ",
    "zp.refresherUpdateTime.none": "None",
    "zp.refresherUpdateTime.today": "Today",
    "zp.refresherUpdateTime.yesterday": "Yesterday",
    "zp.systemLoading.title": "Loading..."
  };
  const zhHans = {
    "zp.refresher.default": "继续下拉刷新",
    "zp.refresher.pulling": "松开立即刷新",
    "zp.refresher.refreshing": "正在刷新...",
    "zp.refresher.complete": "刷新成功",
    "zp.refresher.f2": "松手进入二楼",
    "zp.loadingMore.default": "点击加载更多",
    "zp.loadingMore.loading": "正在加载...",
    "zp.loadingMore.noMore": "没有更多了",
    "zp.loadingMore.fail": "加载失败，点击重新加载",
    "zp.emptyView.title": "没有数据哦~",
    "zp.emptyView.reload": "重新加载",
    "zp.emptyView.error": "很抱歉，加载失败",
    "zp.refresherUpdateTime.title": "最后更新：",
    "zp.refresherUpdateTime.none": "无",
    "zp.refresherUpdateTime.today": "今天",
    "zp.refresherUpdateTime.yesterday": "昨天",
    "zp.systemLoading.title": "加载中..."
  };
  const zhHant = {
    "zp.refresher.default": "繼續下拉重繪",
    "zp.refresher.pulling": "鬆開立即重繪",
    "zp.refresher.refreshing": "正在重繪...",
    "zp.refresher.complete": "重繪成功",
    "zp.refresher.f2": "鬆手進入二樓",
    "zp.loadingMore.default": "點擊加載更多",
    "zp.loadingMore.loading": "正在加載...",
    "zp.loadingMore.noMore": "沒有更多了",
    "zp.loadingMore.fail": "加載失敗，點擊重新加載",
    "zp.emptyView.title": "沒有數據哦~",
    "zp.emptyView.reload": "重新加載",
    "zp.emptyView.error": "很抱歉，加載失敗",
    "zp.refresherUpdateTime.title": "最後更新：",
    "zp.refresherUpdateTime.none": "無",
    "zp.refresherUpdateTime.today": "今天",
    "zp.refresherUpdateTime.yesterday": "昨天",
    "zp.systemLoading.title": "加載中..."
  };
  const messages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  const { t } = initVueI18n(messages);
  const language = uni.getSystemInfoSync().language;
  const i18nModule = {
    data() {
      return {
        language
      };
    },
    computed: {
      finalLanguage() {
        try {
          const local = uni.getLocale();
          const language2 = this.language;
          return local === "auto" ? interceptor._handleLanguage2Local(language2, this._language2Local(language2)) : local;
        } catch (e) {
          return "zh-Hans";
        }
      },
      // 最终的下拉刷新默认状态的文字
      finalRefresherDefaultText() {
        return this._getI18nText("zp.refresher.default", this.refresherDefaultText);
      },
      // 最终的下拉刷新下拉中的文字
      finalRefresherPullingText() {
        return this._getI18nText("zp.refresher.pulling", this.refresherPullingText);
      },
      // 最终的下拉刷新中文字
      finalRefresherRefreshingText() {
        return this._getI18nText("zp.refresher.refreshing", this.refresherRefreshingText);
      },
      // 最终的下拉刷新完成文字
      finalRefresherCompleteText() {
        return this._getI18nText("zp.refresher.complete", this.refresherCompleteText);
      },
      // 最终的下拉刷新上次更新时间文字
      finalRefresherUpdateTimeTextMap() {
        return {
          title: t("zp.refresherUpdateTime.title"),
          none: t("zp.refresherUpdateTime.none"),
          today: t("zp.refresherUpdateTime.today"),
          yesterday: t("zp.refresherUpdateTime.yesterday")
        };
      },
      // 最终的继续下拉进入二楼文字
      finalRefresherGoF2Text() {
        return this._getI18nText("zp.refresher.f2", this.refresherGoF2Text);
      },
      // 最终的底部加载更多默认状态文字
      finalLoadingMoreDefaultText() {
        return this._getI18nText("zp.loadingMore.default", this.loadingMoreDefaultText);
      },
      // 最终的底部加载更多加载中文字
      finalLoadingMoreLoadingText() {
        return this._getI18nText("zp.loadingMore.loading", this.loadingMoreLoadingText);
      },
      // 最终的底部加载更多没有更多数据文字
      finalLoadingMoreNoMoreText() {
        return this._getI18nText("zp.loadingMore.noMore", this.loadingMoreNoMoreText);
      },
      // 最终的底部加载更多加载失败文字
      finalLoadingMoreFailText() {
        return this._getI18nText("zp.loadingMore.fail", this.loadingMoreFailText);
      },
      // 最终的空数据图title
      finalEmptyViewText() {
        return this.isLoadFailed ? this.finalEmptyViewErrorText : this._getI18nText("zp.emptyView.title", this.emptyViewText);
      },
      // 最终的空数据图reload title
      finalEmptyViewReloadText() {
        return this._getI18nText("zp.emptyView.reload", this.emptyViewReloadText);
      },
      // 最终的空数据图加载失败文字
      finalEmptyViewErrorText() {
        return this.customerEmptyViewErrorText || this._getI18nText("zp.emptyView.error", this.emptyViewErrorText);
      },
      // 最终的系统loading title
      finalSystemLoadingText() {
        return this._getI18nText("zp.systemLoading.title", this.systemLoadingText);
      }
    },
    methods: {
      // 获取当前z-paging的语言
      getLanguage() {
        return this.finalLanguage;
      },
      // 获取国际化转换后的文本
      _getI18nText(key, value2) {
        const dataType = Object.prototype.toString.call(value2);
        if (dataType === "[object Object]") {
          const nextValue = value2[this.finalLanguage];
          if (nextValue)
            return nextValue;
        } else if (dataType === "[object String]") {
          return value2;
        }
        return t(key);
      },
      // 系统language转i18n local
      _language2Local(language2) {
        const formatedLanguage = language2.toLowerCase().replace(new RegExp("_", ""), "-");
        if (formatedLanguage.indexOf("zh") !== -1) {
          if (formatedLanguage === "zh" || formatedLanguage === "zh-cn" || formatedLanguage.indexOf("zh-hans") !== -1) {
            return "zh-Hans";
          }
          return "zh-Hant";
        }
        if (formatedLanguage.indexOf("en") !== -1)
          return "en";
        return language2;
      }
    }
  };
  const nvueModule = {
    props: {},
    data() {
      return {
        nRefresherLoading: false,
        nListIsDragging: false,
        nShowBottom: true,
        nFixFreezing: false,
        nShowRefresherReveal: false,
        nLoadingMoreFixedHeight: false,
        nShowRefresherRevealHeight: 0,
        nOldShowRefresherRevealHeight: -1,
        nRefresherWidth: u.rpx2px(750),
        nF2Opacity: 0
      };
    },
    computed: {},
    mounted() {
    },
    methods: {}
  };
  const emptyModule = {
    props: {
      // 是否强制隐藏空数据图，默认为否
      hideEmptyView: {
        type: Boolean,
        default: u.gc("hideEmptyView", false)
      },
      // 空数据图描述文字，默认为“没有数据哦~”
      emptyViewText: {
        type: [String, Object],
        default: u.gc("emptyViewText", null)
      },
      // 是否显示空数据图重新加载按钮(无数据时)，默认为否
      showEmptyViewReload: {
        type: Boolean,
        default: u.gc("showEmptyViewReload", false)
      },
      // 加载失败时是否显示空数据图重新加载按钮，默认为是
      showEmptyViewReloadWhenError: {
        type: Boolean,
        default: u.gc("showEmptyViewReloadWhenError", true)
      },
      // 空数据图点击重新加载文字，默认为“重新加载”
      emptyViewReloadText: {
        type: [String, Object],
        default: u.gc("emptyViewReloadText", null)
      },
      // 空数据图图片，默认使用z-paging内置的图片
      emptyViewImg: {
        type: String,
        default: u.gc("emptyViewImg", "")
      },
      // 空数据图“加载失败”描述文字，默认为“很抱歉，加载失败”
      emptyViewErrorText: {
        type: [String, Object],
        default: u.gc("emptyViewErrorText", null)
      },
      // 空数据图“加载失败”图片，默认使用z-paging内置的图片
      emptyViewErrorImg: {
        type: String,
        default: u.gc("emptyViewErrorImg", "")
      },
      // 空数据图样式
      emptyViewStyle: {
        type: Object,
        default: u.gc("emptyViewStyle", {})
      },
      // 空数据图容器样式
      emptyViewSuperStyle: {
        type: Object,
        default: u.gc("emptyViewSuperStyle", {})
      },
      // 空数据图img样式
      emptyViewImgStyle: {
        type: Object,
        default: u.gc("emptyViewImgStyle", {})
      },
      // 空数据图描述文字样式
      emptyViewTitleStyle: {
        type: Object,
        default: u.gc("emptyViewTitleStyle", {})
      },
      // 空数据图重新加载按钮样式
      emptyViewReloadStyle: {
        type: Object,
        default: u.gc("emptyViewReloadStyle", {})
      },
      // 空数据图片是否铺满z-paging，默认为否，即填充满z-paging内列表(滚动区域)部分。若设置为否，则为填铺满整个z-paging
      emptyViewFixed: {
        type: Boolean,
        default: u.gc("emptyViewFixed", false)
      },
      // 空数据图片是否垂直居中，默认为是，若设置为否即为从空数据容器顶部开始显示。emptyViewFixed为false时有效
      emptyViewCenter: {
        type: Boolean,
        default: u.gc("emptyViewCenter", true)
      },
      // 加载中时是否自动隐藏空数据图，默认为是
      autoHideEmptyViewWhenLoading: {
        type: Boolean,
        default: u.gc("autoHideEmptyViewWhenLoading", true)
      },
      // 用户下拉列表触发下拉刷新加载中时是否自动隐藏空数据图，默认为是
      autoHideEmptyViewWhenPull: {
        type: Boolean,
        default: u.gc("autoHideEmptyViewWhenPull", true)
      },
      // 空数据view的z-index，默认为9
      emptyViewZIndex: {
        type: Number,
        default: u.gc("emptyViewZIndex", 9)
      }
    },
    data() {
      return {
        customerEmptyViewErrorText: ""
      };
    },
    computed: {
      finalEmptyViewImg() {
        return this.isLoadFailed ? this.emptyViewErrorImg : this.emptyViewImg;
      },
      finalShowEmptyViewReload() {
        return this.isLoadFailed ? this.showEmptyViewReloadWhenError : this.showEmptyViewReload;
      },
      // 是否展示空数据图
      showEmpty() {
        if (this.refresherOnly || this.hideEmptyView || this.realTotalData.length)
          return false;
        if (this.autoHideEmptyViewWhenLoading) {
          if (this.isAddedData && !this.firstPageLoaded && !this.loading)
            return true;
        } else {
          return true;
        }
        return !this.autoHideEmptyViewWhenPull && !this.isUserReload;
      }
    },
    methods: {
      // 点击了空数据view重新加载按钮
      _emptyViewReload() {
        let callbacked = false;
        this.$emit("emptyViewReload", (reload) => {
          if (reload === void 0 || reload === true) {
            this.fromEmptyViewReload = true;
            this.reload().catch(() => {
            });
          }
          callbacked = true;
        });
        this.$nextTick(() => {
          if (!callbacked) {
            this.fromEmptyViewReload = true;
            this.reload().catch(() => {
            });
          }
        });
      },
      // 点击了空数据view
      _emptyViewClick() {
        this.$emit("emptyViewClick");
      }
    }
  };
  const refresherModule = {
    props: {
      // 下拉刷新的主题样式，支持black，white，默认black
      refresherThemeStyle: {
        type: String,
        default: u.gc("refresherThemeStyle", "")
      },
      // 自定义下拉刷新中左侧图标的样式
      refresherImgStyle: {
        type: Object,
        default: u.gc("refresherImgStyle", {})
      },
      // 自定义下拉刷新中右侧状态描述文字的样式
      refresherTitleStyle: {
        type: Object,
        default: u.gc("refresherTitleStyle", {})
      },
      // 自定义下拉刷新中右侧最后更新时间文字的样式(show-refresher-update-time为true时有效)
      refresherUpdateTimeStyle: {
        type: Object,
        default: u.gc("refresherUpdateTimeStyle", {})
      },
      // 在微信小程序和QQ小程序中，是否实时监听下拉刷新中进度，默认为否
      watchRefresherTouchmove: {
        type: Boolean,
        default: u.gc("watchRefresherTouchmove", false)
      },
      // 底部加载更多的主题样式，支持black，white，默认black
      loadingMoreThemeStyle: {
        type: String,
        default: u.gc("loadingMoreThemeStyle", "")
      },
      // 是否只使用下拉刷新，设置为true后将关闭mounted自动请求数据、关闭滚动到底部加载更多，强制隐藏空数据图。默认为否
      refresherOnly: {
        type: Boolean,
        default: u.gc("refresherOnly", false)
      },
      // 自定义下拉刷新默认状态下回弹动画时间，单位为毫秒，默认为100毫秒，nvue无效
      refresherDefaultDuration: {
        type: [Number, String],
        default: u.gc("refresherDefaultDuration", 100)
      },
      // 自定义下拉刷新结束以后延迟回弹的时间，单位为毫秒，默认为0
      refresherCompleteDelay: {
        type: [Number, String],
        default: u.gc("refresherCompleteDelay", 0)
      },
      // 自定义下拉刷新结束回弹动画时间，单位为毫秒，默认为300毫秒(refresherEndBounceEnabled为false时，refresherCompleteDuration为设定值的1/3)，nvue无效
      refresherCompleteDuration: {
        type: [Number, String],
        default: u.gc("refresherCompleteDuration", 300)
      },
      // 自定义下拉刷新中是否允许列表滚动，默认为是
      refresherRefreshingScrollable: {
        type: Boolean,
        default: u.gc("refresherRefreshingScrollable", true)
      },
      // 自定义下拉刷新结束状态下是否允许列表滚动，默认为否
      refresherCompleteScrollable: {
        type: Boolean,
        default: u.gc("refresherCompleteScrollable", false)
      },
      // 是否使用自定义的下拉刷新，默认为是，即使用z-paging的下拉刷新。设置为false即代表使用uni scroll-view自带的下拉刷新，h5、App、微信小程序以外的平台不支持uni scroll-view自带的下拉刷新
      useCustomRefresher: {
        type: Boolean,
        default: u.gc("useCustomRefresher", true)
      },
      // 自定义下拉刷新下拉帧率，默认为40，过高可能会出现抖动问题
      refresherFps: {
        type: [Number, String],
        default: u.gc("refresherFps", 40)
      },
      // 自定义下拉刷新允许触发的最大下拉角度，默认为40度，当下拉角度小于设定值时，自定义下拉刷新动画不会被触发
      refresherMaxAngle: {
        type: [Number, String],
        default: u.gc("refresherMaxAngle", 40)
      },
      // 自定义下拉刷新的角度由未达到最大角度变到达到最大角度时，是否继续下拉刷新手势，默认为否
      refresherAngleEnableChangeContinued: {
        type: Boolean,
        default: u.gc("refresherAngleEnableChangeContinued", false)
      },
      // 自定义下拉刷新默认状态下的文字
      refresherDefaultText: {
        type: [String, Object],
        default: u.gc("refresherDefaultText", null)
      },
      // 自定义下拉刷新松手立即刷新状态下的文字
      refresherPullingText: {
        type: [String, Object],
        default: u.gc("refresherPullingText", null)
      },
      // 自定义下拉刷新刷新中状态下的文字
      refresherRefreshingText: {
        type: [String, Object],
        default: u.gc("refresherRefreshingText", null)
      },
      // 自定义下拉刷新刷新结束状态下的文字
      refresherCompleteText: {
        type: [String, Object],
        default: u.gc("refresherCompleteText", null)
      },
      // 自定义继续下拉进入二楼文字
      refresherGoF2Text: {
        type: [String, Object],
        default: u.gc("refresherGoF2Text", null)
      },
      // 自定义下拉刷新默认状态下的图片
      refresherDefaultImg: {
        type: String,
        default: u.gc("refresherDefaultImg", null)
      },
      // 自定义下拉刷新松手立即刷新状态下的图片，默认与refresherDefaultImg一致
      refresherPullingImg: {
        type: String,
        default: u.gc("refresherPullingImg", null)
      },
      // 自定义下拉刷新刷新中状态下的图片
      refresherRefreshingImg: {
        type: String,
        default: u.gc("refresherRefreshingImg", null)
      },
      // 自定义下拉刷新刷新结束状态下的图片
      refresherCompleteImg: {
        type: String,
        default: u.gc("refresherCompleteImg", null)
      },
      // 自定义下拉刷新刷新中状态下是否展示旋转动画
      refresherRefreshingAnimated: {
        type: Boolean,
        default: u.gc("refresherRefreshingAnimated", true)
      },
      // 是否开启自定义下拉刷新刷新结束回弹效果，默认为是
      refresherEndBounceEnabled: {
        type: Boolean,
        default: u.gc("refresherEndBounceEnabled", true)
      },
      // 是否开启自定义下拉刷新，默认为是
      refresherEnabled: {
        type: Boolean,
        default: u.gc("refresherEnabled", true)
      },
      // 设置自定义下拉刷新阈值，默认为80rpx
      refresherThreshold: {
        type: [Number, String],
        default: u.gc("refresherThreshold", "80rpx")
      },
      // 设置系统下拉刷新默认样式，支持设置 black，white，none，none 表示不使用默认样式，默认为black
      refresherDefaultStyle: {
        type: String,
        default: u.gc("refresherDefaultStyle", "black")
      },
      // 设置自定义下拉刷新区域背景
      refresherBackground: {
        type: String,
        default: u.gc("refresherBackground", "transparent")
      },
      // 设置固定的自定义下拉刷新区域背景
      refresherFixedBackground: {
        type: String,
        default: u.gc("refresherFixedBackground", "transparent")
      },
      // 设置固定的自定义下拉刷新区域高度，默认为0
      refresherFixedBacHeight: {
        type: [Number, String],
        default: u.gc("refresherFixedBacHeight", 0)
      },
      // 设置自定义下拉刷新下拉超出阈值后继续下拉位移衰减的比例，范围0-1，值越大代表衰减越多。默认为0.65(nvue无效)
      refresherOutRate: {
        type: Number,
        default: u.gc("refresherOutRate", 0.65)
      },
      // 是否开启下拉进入二楼功能，默认为否
      refresherF2Enabled: {
        type: Boolean,
        default: u.gc("refresherF2Enabled", false)
      },
      // 下拉进入二楼阈值，默认为200rpx
      refresherF2Threshold: {
        type: [Number, String],
        default: u.gc("refresherF2Threshold", "200rpx")
      },
      // 下拉进入二楼动画时间，单位为毫秒，默认为200毫秒
      refresherF2Duration: {
        type: [Number, String],
        default: u.gc("refresherF2Duration", 200)
      },
      // 下拉进入二楼状态松手后是否弹出二楼，默认为是
      showRefresherF2: {
        type: Boolean,
        default: u.gc("showRefresherF2", true)
      },
      // 设置自定义下拉刷新下拉时实际下拉位移与用户下拉距离的比值，默认为0.75，即代表若用户下拉10px，则实际位移为7.5px(nvue无效)
      refresherPullRate: {
        type: Number,
        default: u.gc("refresherPullRate", 0.75)
      },
      // 是否显示最后更新时间，默认为否
      showRefresherUpdateTime: {
        type: Boolean,
        default: u.gc("showRefresherUpdateTime", false)
      },
      // 如果需要区别不同页面的最后更新时间，请为不同页面的z-paging的`refresher-update-time-key`设置不同的字符串
      refresherUpdateTimeKey: {
        type: String,
        default: u.gc("refresherUpdateTimeKey", "default")
      },
      // 下拉刷新时下拉到“松手立即刷新”或“松手进入二楼”状态时是否使手机短振动，默认为否（h5无效）
      refresherVibrate: {
        type: Boolean,
        default: u.gc("refresherVibrate", false)
      },
      // 下拉刷新时是否禁止下拉刷新view跟随用户触摸竖直移动，默认为否。注意此属性只是禁止下拉刷新view移动，其他下拉刷新逻辑依然会正常触发
      refresherNoTransform: {
        type: Boolean,
        default: u.gc("refresherNoTransform", false)
      },
      // 是否开启下拉刷新状态栏占位，适用于隐藏导航栏时，下拉刷新需要避开状态栏高度的情况，默认为否
      useRefresherStatusBarPlaceholder: {
        type: Boolean,
        default: u.gc("useRefresherStatusBarPlaceholder", false)
      }
    },
    data() {
      return {
        R: Enum.Refresher,
        //下拉刷新状态
        refresherStatus: Enum.Refresher.Default,
        refresherTouchstartY: 0,
        lastRefresherTouchmove: null,
        refresherReachMaxAngle: true,
        refresherTransform: "translateY(0px)",
        refresherTransition: "",
        finalRefresherDefaultStyle: "black",
        refresherRevealStackCount: 0,
        refresherCompleteTimeout: null,
        refresherCompleteSubTimeout: null,
        refresherEndTimeout: null,
        isTouchmovingTimeout: null,
        refresherTriggered: false,
        isTouchmoving: false,
        isTouchEnded: false,
        isUserPullDown: false,
        privateRefresherEnabled: -1,
        privateShowRefresherWhenReload: false,
        customRefresherHeight: -1,
        showCustomRefresher: false,
        doRefreshAnimateAfter: false,
        isRefresherInComplete: false,
        showF2: false,
        f2Transform: "",
        pullDownTimeStamp: 0,
        moveDis: 0,
        oldMoveDis: 0,
        currentDis: 0,
        oldCurrentMoveDis: 0,
        oldRefresherTouchmoveY: 0,
        oldTouchDirection: "",
        oldEmitedTouchDirection: "",
        oldPullingDistance: -1,
        refresherThresholdUpdateTag: 0
      };
    },
    watch: {
      refresherDefaultStyle: {
        handler(newVal) {
          if (newVal.length) {
            this.finalRefresherDefaultStyle = newVal;
          }
        },
        immediate: true
      },
      refresherStatus(newVal) {
        newVal === Enum.Refresher.Refreshing && this._cleanRefresherEndTimeout();
        this.refresherVibrate && (newVal === Enum.Refresher.ReleaseToRefresh || newVal === Enum.Refresher.GoF2) && this._doVibrateShort();
        this.$emit("refresherStatusChange", newVal);
        this.$emit("update:refresherStatus", newVal);
      },
      // 监听当前下拉刷新启用/禁用状态
      refresherEnabled(newVal) {
        !newVal && this.endRefresh();
      }
    },
    computed: {
      pullDownDisTimeStamp() {
        return 1e3 / this.refresherFps;
      },
      refresherThresholdUnitConverted() {
        return u.addUnit(this.refresherThreshold, this.unit);
      },
      finalRefresherEnabled() {
        if (this.useChatRecordMode)
          return false;
        if (this.privateRefresherEnabled === -1)
          return this.refresherEnabled;
        return this.privateRefresherEnabled === 1;
      },
      finalRefresherThreshold() {
        let refresherThreshold = this.refresherThresholdUnitConverted;
        let idDefault = false;
        if (refresherThreshold === u.addUnit(80, this.unit)) {
          idDefault = true;
          if (this.showRefresherUpdateTime) {
            refresherThreshold = u.addUnit(120, this.unit);
          }
        }
        if (idDefault && this.customRefresherHeight > 0)
          return this.customRefresherHeight + this.finalRefresherThresholdPlaceholder;
        return u.convertToPx(refresherThreshold) + this.finalRefresherThresholdPlaceholder;
      },
      finalRefresherF2Threshold() {
        return u.convertToPx(u.addUnit(this.refresherF2Threshold, this.unit));
      },
      finalRefresherThresholdPlaceholder() {
        return this.useRefresherStatusBarPlaceholder ? this.statusBarHeight : 0;
      },
      finalRefresherFixedBacHeight() {
        return u.convertToPx(this.refresherFixedBacHeight);
      },
      finalRefresherThemeStyle() {
        return this.refresherThemeStyle.length ? this.refresherThemeStyle : this.defaultThemeStyle;
      },
      finalRefresherOutRate() {
        let rate = this.refresherOutRate;
        rate = Math.max(0, rate);
        rate = Math.min(1, rate);
        return rate;
      },
      finalRefresherPullRate() {
        let rate = this.refresherPullRate;
        rate = Math.max(0, rate);
        return rate;
      },
      finalRefresherTransform() {
        if (this.refresherNoTransform || this.refresherTransform === "translateY(0px)")
          return "none";
        return this.refresherTransform;
      },
      finalShowRefresherWhenReload() {
        return this.showRefresherWhenReload || this.privateShowRefresherWhenReload;
      },
      finalRefresherTriggered() {
        if (!(this.finalRefresherEnabled && !this.useCustomRefresher))
          return false;
        return this.refresherTriggered;
      },
      showRefresher() {
        const showRefresher = this.finalRefresherEnabled || this.useCustomRefresher && !this.useChatRecordMode;
        this.active && this.customRefresherHeight === -1 && showRefresher && this.updateCustomRefresherHeight();
        return showRefresher;
      },
      hasTouchmove() {
        return this.watchRefresherTouchmove;
      }
    },
    methods: {
      // 终止下拉刷新状态
      endRefresh() {
        this.totalData = this.realTotalData;
        this._refresherEnd();
        this._endSystemLoadingAndRefresh();
        this._handleScrollViewBounce({ bounce: true });
        this.$nextTick(() => {
          this.refresherTriggered = false;
        });
      },
      // 手动更新自定义下拉刷新view高度
      updateCustomRefresherHeight() {
        u.delay(() => this.$nextTick(this._updateCustomRefresherHeight));
      },
      // 关闭二楼
      closeF2() {
        this._handleCloseF2();
      },
      // 自定义下拉刷新被触发
      _onRefresh(fromScrollView = false, isUserPullDown = true) {
        if (fromScrollView && !(this.finalRefresherEnabled && !this.useCustomRefresher))
          return;
        this.$emit("onRefresh");
        this.$emit("Refresh");
        if (this.loading || this.isRefresherInComplete)
          return;
        this.loadingType = Enum.LoadingType.Refresher;
        if (this.nShowRefresherReveal)
          return;
        this.isUserPullDown = isUserPullDown;
        this.isUserReload = !isUserPullDown;
        this._startLoading(true);
        this.refresherTriggered = true;
        if (this.reloadWhenRefresh && isUserPullDown) {
          this.useChatRecordMode ? this._onLoadingMore("click") : this._reload(false, false, isUserPullDown);
        }
      },
      // 自定义下拉刷新被复位
      _onRestore() {
        this.refresherTriggered = "restore";
        this.$emit("onRestore");
        this.$emit("Restore");
      },
      // 进一步处理touch开始结果
      _handleRefresherTouchstart(touch) {
        if (!this.loading && this.isTouchEnded) {
          this.isTouchmoving = false;
        }
        this.loadingType = Enum.LoadingType.Refresher;
        this.isTouchmovingTimeout && clearTimeout(this.isTouchmovingTimeout);
        this.isTouchEnded = false;
        this.refresherTransition = "";
        this.refresherTouchstartY = touch.touchY;
        this.$emit("refresherTouchstart", this.refresherTouchstartY);
        this.lastRefresherTouchmove = touch;
        this._cleanRefresherCompleteTimeout();
        this._cleanRefresherEndTimeout();
      },
      // 非app-ios/android或微信小程序或QQ小程序或h5平台，使用js控制下拉刷新
      // touch中
      _refresherTouchmove(e) {
        const currentTimeStamp = u.getTime();
        let touch = null;
        let refresherTouchmoveY = 0;
        if (this.watchTouchDirectionChange) {
          touch = u.getTouch(e);
          refresherTouchmoveY = touch.touchY;
          const direction = refresherTouchmoveY > this.oldRefresherTouchmoveY ? "top" : "bottom";
          if (direction === this.oldTouchDirection && direction !== this.oldEmitedTouchDirection) {
            this._handleTouchDirectionChange({ direction });
            this.oldEmitedTouchDirection = direction;
          }
          this.oldTouchDirection = direction;
          this.oldRefresherTouchmoveY = refresherTouchmoveY;
        }
        if (this.pullDownTimeStamp && currentTimeStamp - this.pullDownTimeStamp <= this.pullDownDisTimeStamp)
          return;
        if (this._touchDisabled())
          return;
        this.pullDownTimeStamp = Number(currentTimeStamp);
        touch = u.getTouch(e);
        refresherTouchmoveY = touch.touchY;
        let moveDis = refresherTouchmoveY - this.refresherTouchstartY;
        if (moveDis < 0)
          return;
        if (this.refresherMaxAngle >= 0 && this.refresherMaxAngle <= 90 && this.lastRefresherTouchmove && this.lastRefresherTouchmove.touchY <= refresherTouchmoveY) {
          if (!moveDis && !this.refresherAngleEnableChangeContinued && this.moveDis < 1 && !this.refresherReachMaxAngle)
            return;
          const x = Math.abs(touch.touchX - this.lastRefresherTouchmove.touchX);
          const y = Math.abs(refresherTouchmoveY - this.lastRefresherTouchmove.touchY);
          const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
          if ((x || y) && x > 1) {
            const angle = Math.asin(y / z) / Math.PI * 180;
            if (angle < this.refresherMaxAngle) {
              this.lastRefresherTouchmove = touch;
              this.refresherReachMaxAngle = false;
              return;
            }
          }
        }
        moveDis = this._getFinalRefresherMoveDis(moveDis);
        this._handleRefresherTouchmove(moveDis, touch);
        if (!this.disabledBounce) {
          this._handleScrollViewBounce({ bounce: false });
          this.disabledBounce = true;
        }
        this._emitTouchmove({ pullingDistance: moveDis, dy: this.moveDis - this.oldMoveDis });
      },
      // 进一步处理touch中结果
      _handleRefresherTouchmove(moveDis, touch) {
        this.refresherReachMaxAngle = true;
        this.isTouchmovingTimeout && clearTimeout(this.isTouchmovingTimeout);
        this.isTouchmoving = true;
        this.isTouchEnded = false;
        if (moveDis >= this.finalRefresherThreshold) {
          this.refresherStatus = this.refresherF2Enabled && moveDis >= this.finalRefresherF2Threshold ? Enum.Refresher.GoF2 : Enum.Refresher.ReleaseToRefresh;
        } else {
          this.refresherStatus = Enum.Refresher.Default;
        }
        this.moveDis = moveDis;
      },
      // 进一步处理touch结束结果
      _handleRefresherTouchend(moveDis) {
        this.isTouchmovingTimeout && clearTimeout(this.isTouchmovingTimeout);
        this.refresherReachMaxAngle = true;
        this.isTouchEnded = true;
        const refresherThreshold = this.finalRefresherThreshold;
        if (moveDis >= refresherThreshold && (this.refresherStatus === Enum.Refresher.ReleaseToRefresh || this.refresherStatus === Enum.Refresher.GoF2)) {
          if (this.refresherStatus === Enum.Refresher.GoF2) {
            this._handleGoF2();
            this._refresherEnd();
          } else {
            u.delay(() => {
              this._emitTouchmove({ pullingDistance: refresherThreshold, dy: this.moveDis - refresherThreshold });
            }, 0.1);
            this.moveDis = refresherThreshold;
            this.refresherStatus = Enum.Refresher.Refreshing;
            this._doRefresherLoad();
          }
        } else {
          this._refresherEnd();
          this.isTouchmovingTimeout = u.delay(() => {
            this.isTouchmoving = false;
          }, this.refresherDefaultDuration);
        }
        this.scrollEnable = true;
        this.$emit("refresherTouchend", moveDis);
      },
      // 处理列表触摸开始事件
      _handleListTouchstart() {
        if (this.useChatRecordMode && this.autoHideKeyboardWhenChat) {
          uni.hideKeyboard();
          this.$emit("hidedKeyboard");
        }
      },
      // 处理scroll-view bounce是否生效
      _handleScrollViewBounce({ bounce }) {
        if (!this.usePageScroll && !this.scrollToTopBounceEnabled) {
          if (this.wxsScrollTop <= 5) {
            this.refresherTransition = "";
            this.scrollEnable = bounce;
          } else if (bounce) {
            this.scrollEnable = bounce;
          }
        }
      },
      // wxs正在下拉状态改变处理
      _handleWxsPullingDownStatusChange(onPullingDown) {
        this.wxsOnPullingDown = onPullingDown;
        if (onPullingDown && !this.useChatRecordMode) {
          this.renderPropScrollTop = 0;
        }
      },
      // wxs正在下拉处理
      _handleWxsPullingDown({ moveDis, diffDis }) {
        this._emitTouchmove({ pullingDistance: moveDis, dy: diffDis });
      },
      // wxs触摸方向改变
      _handleTouchDirectionChange({ direction }) {
        this.$emit("touchDirectionChange", direction);
      },
      // wxs通知更新其props
      _handlePropUpdate() {
        this.wxsPropType = u.getTime().toString();
      },
      // 下拉刷新结束
      _refresherEnd(shouldEndLoadingDelay = true, fromAddData = false, isUserPullDown = false, setLoading = true) {
        if (this.loadingType === Enum.LoadingType.Refresher) {
          const refresherCompleteDelay = fromAddData && (isUserPullDown || this.showRefresherWhenReload) ? this.refresherCompleteDelay : 0;
          const refresherStatus = refresherCompleteDelay > 0 ? Enum.Refresher.Complete : Enum.Refresher.Default;
          if (this.finalShowRefresherWhenReload) {
            const stackCount = this.refresherRevealStackCount;
            this.refresherRevealStackCount--;
            if (stackCount > 1)
              return;
          }
          this._cleanRefresherEndTimeout();
          this.refresherEndTimeout = u.delay(() => {
            this.refresherStatus = refresherStatus;
            if (refresherStatus !== Enum.Refresher.Complete) {
              this.isRefresherInComplete = false;
            }
          }, this.refresherStatus !== Enum.Refresher.Default && refresherStatus === Enum.Refresher.Default ? this.refresherCompleteDuration : 0);
          if (refresherCompleteDelay > 0) {
            this.isRefresherInComplete = true;
          }
          this._cleanRefresherCompleteTimeout();
          this.refresherCompleteTimeout = u.delay(() => {
            let animateDuration = 1;
            const animateType = this.refresherEndBounceEnabled && fromAddData ? "cubic-bezier(0.19,1.64,0.42,0.72)" : "linear";
            if (fromAddData) {
              animateDuration = this.refresherEndBounceEnabled ? this.refresherCompleteDuration / 1e3 : this.refresherCompleteDuration / 3e3;
            }
            this.refresherTransition = `transform ${fromAddData ? animateDuration : this.refresherDefaultDuration / 1e3}s ${animateType}`;
            this.wxsPropType = this.refresherTransition + "end" + u.getTime();
            this.moveDis = 0;
            if (refresherStatus === Enum.Refresher.Complete) {
              if (this.refresherCompleteSubTimeout) {
                clearTimeout(this.refresherCompleteSubTimeout);
                this.refresherCompleteSubTimeout = null;
              }
              this.refresherCompleteSubTimeout = u.delay(() => {
                this.$nextTick(() => {
                  this.refresherStatus = Enum.Refresher.Default;
                  this.isRefresherInComplete = false;
                });
              }, animateDuration * 800);
            }
            this._emitTouchmove({ pullingDistance: 0, dy: this.moveDis });
          }, refresherCompleteDelay);
        }
        if (setLoading) {
          u.delay(() => this.loading = false, shouldEndLoadingDelay ? 10 : 0);
          isUserPullDown && this._onRestore();
        }
      },
      // 处理进入二楼
      _handleGoF2() {
        if (this.showF2 || !this.refresherF2Enabled)
          return;
        this.$emit("refresherF2Change", "go");
        if (!this.showRefresherF2)
          return;
        this.f2Transform = `translateY(${-this.superContentHeight}px)`;
        this.showF2 = true;
        u.delay(() => {
          this.f2Transform = "translateY(0px)";
        }, 100, "f2ShowDelay");
      },
      // 处理退出二楼
      _handleCloseF2() {
        if (!this.showF2 || !this.refresherF2Enabled)
          return;
        this.$emit("refresherF2Change", "close");
        if (!this.showRefresherF2)
          return;
        this.f2Transform = `translateY(${-this.superContentHeight}px)`;
        u.delay(() => {
          this.showF2 = false;
          this.nF2Opacity = 0;
        }, this.refresherF2Duration, "f2CloseDelay");
      },
      // 模拟用户手动触发下拉刷新
      _doRefresherRefreshAnimate() {
        this._cleanRefresherCompleteTimeout();
        const doRefreshAnimateAfter = !this.doRefreshAnimateAfter && this.finalShowRefresherWhenReload && this.customRefresherHeight === -1 && this.refresherThreshold === u.addUnit(80, this.unit);
        if (doRefreshAnimateAfter) {
          this.doRefreshAnimateAfter = true;
          return;
        }
        this.refresherRevealStackCount++;
        this.wxsPropType = "begin" + u.getTime();
        this.moveDis = this.finalRefresherThreshold;
        this.refresherStatus = Enum.Refresher.Refreshing;
        this.isTouchmoving = true;
        this.isTouchmovingTimeout && clearTimeout(this.isTouchmovingTimeout);
        this._doRefresherLoad(false);
      },
      // 触发下拉刷新
      _doRefresherLoad(isUserPullDown = true) {
        this._onRefresh(false, isUserPullDown);
        this.loading = true;
      },
      // 更新自定义下拉刷新view高度
      _updateCustomRefresherHeight() {
        this._getNodeClientRect(".zp-custom-refresher-slot-view").then((res) => {
          this.customRefresherHeight = res ? res[0].height : 0;
          this.showCustomRefresher = this.customRefresherHeight > 0;
          if (this.doRefreshAnimateAfter) {
            this.doRefreshAnimateAfter = false;
            this._doRefresherRefreshAnimate();
          }
        });
      },
      // emit pullingDown事件
      _emitTouchmove(e) {
        e.viewHeight = this.finalRefresherThreshold;
        e.rate = e.viewHeight > 0 ? e.pullingDistance / e.viewHeight : 0;
        this.hasTouchmove && this.oldPullingDistance !== e.pullingDistance && this.$emit("refresherTouchmove", e);
        this.oldPullingDistance = e.pullingDistance;
      },
      // 清除refresherCompleteTimeout
      _cleanRefresherCompleteTimeout() {
        this.refresherCompleteTimeout = this._cleanTimeout(this.refresherCompleteTimeout);
      },
      // 清除refresherEndTimeout
      _cleanRefresherEndTimeout() {
        this.refresherEndTimeout = this._cleanTimeout(this.refresherEndTimeout);
      }
    }
  };
  const loadMoreModule = {
    props: {
      // 自定义底部加载更多样式
      loadingMoreCustomStyle: {
        type: Object,
        default: u.gc("loadingMoreCustomStyle", {})
      },
      // 自定义底部加载更多文字样式
      loadingMoreTitleCustomStyle: {
        type: Object,
        default: u.gc("loadingMoreTitleCustomStyle", {})
      },
      // 自定义底部加载更多加载中动画样式
      loadingMoreLoadingIconCustomStyle: {
        type: Object,
        default: u.gc("loadingMoreLoadingIconCustomStyle", {})
      },
      // 自定义底部加载更多加载中动画图标类型，可选flower或circle，默认为flower
      loadingMoreLoadingIconType: {
        type: String,
        default: u.gc("loadingMoreLoadingIconType", "flower")
      },
      // 自定义底部加载更多加载中动画图标图片
      loadingMoreLoadingIconCustomImage: {
        type: String,
        default: u.gc("loadingMoreLoadingIconCustomImage", "")
      },
      // 底部加载更多加载中view是否展示旋转动画，默认为是
      loadingMoreLoadingAnimated: {
        type: Boolean,
        default: u.gc("loadingMoreLoadingAnimated", true)
      },
      // 是否启用加载更多数据(含滑动到底部加载更多数据和点击加载更多数据)，默认为是
      loadingMoreEnabled: {
        type: Boolean,
        default: u.gc("loadingMoreEnabled", true)
      },
      // 是否启用滑动到底部加载更多数据，默认为是
      toBottomLoadingMoreEnabled: {
        type: Boolean,
        default: u.gc("toBottomLoadingMoreEnabled", true)
      },
      // 滑动到底部状态为默认状态时，以加载中的状态展示，默认为否。若设置为是，可避免滚动到底部看到默认状态然后立刻变为加载中状态的问题，但分页数量未超过一屏时，不会显示【点击加载更多】
      loadingMoreDefaultAsLoading: {
        type: Boolean,
        default: u.gc("loadingMoreDefaultAsLoading", false)
      },
      // 滑动到底部"默认"文字，默认为【点击加载更多】
      loadingMoreDefaultText: {
        type: [String, Object],
        default: u.gc("loadingMoreDefaultText", null)
      },
      // 滑动到底部"加载中"文字，默认为【正在加载...】
      loadingMoreLoadingText: {
        type: [String, Object],
        default: u.gc("loadingMoreLoadingText", null)
      },
      // 滑动到底部"没有更多"文字，默认为【没有更多了】
      loadingMoreNoMoreText: {
        type: [String, Object],
        default: u.gc("loadingMoreNoMoreText", null)
      },
      // 滑动到底部"加载失败"文字，默认为【加载失败，点击重新加载】
      loadingMoreFailText: {
        type: [String, Object],
        default: u.gc("loadingMoreFailText", null)
      },
      // 当没有更多数据且分页内容未超出z-paging时是否隐藏没有更多数据的view，默认为否
      hideNoMoreInside: {
        type: Boolean,
        default: u.gc("hideNoMoreInside", false)
      },
      // 当没有更多数据且分页数组长度少于这个值时，隐藏没有更多数据的view，默认为0，代表不限制。
      hideNoMoreByLimit: {
        type: Number,
        default: u.gc("hideNoMoreByLimit", 0)
      },
      // 是否显示默认的加载更多text，默认为是
      showDefaultLoadingMoreText: {
        type: Boolean,
        default: u.gc("showDefaultLoadingMoreText", true)
      },
      // 是否显示没有更多数据的view
      showLoadingMoreNoMoreView: {
        type: Boolean,
        default: u.gc("showLoadingMoreNoMoreView", true)
      },
      // 是否显示没有更多数据的分割线，默认为是
      showLoadingMoreNoMoreLine: {
        type: Boolean,
        default: u.gc("showLoadingMoreNoMoreLine", true)
      },
      // 自定义底部没有更多数据的分割线样式
      loadingMoreNoMoreLineCustomStyle: {
        type: Object,
        default: u.gc("loadingMoreNoMoreLineCustomStyle", {})
      },
      // 当分页未满一屏时，是否自动加载更多，默认为否(nvue无效)
      insideMore: {
        type: Boolean,
        default: u.gc("insideMore", false)
      },
      // 距底部/右边多远时（单位px），触发 scrolltolower 事件，默认为100rpx
      lowerThreshold: {
        type: [Number, String],
        default: u.gc("lowerThreshold", "100rpx")
      }
    },
    data() {
      return {
        M: Enum.More,
        // 底部加载更多状态
        loadingStatus: Enum.More.Default,
        // 在渲染之后的底部加载更多状态
        loadingStatusAfterRender: Enum.More.Default,
        // 底部加载更多时间戳
        loadingMoreTimeStamp: 0,
        // 底部加载更多slot
        loadingMoreDefaultSlot: null,
        // 是否展示底部加载更多
        showLoadingMore: false,
        // 是否是开发者自定义的加载更多，-1代表交由z-paging自行判断；1代表没有更多了；0代表还有更多数据
        customNoMore: -1
      };
    },
    computed: {
      // 底部加载更多配置
      zLoadMoreConfig() {
        return {
          status: this.loadingStatusAfterRender,
          defaultAsLoading: this.loadingMoreDefaultAsLoading || this.useChatRecordMode && this.chatLoadingMoreDefaultAsLoading,
          defaultThemeStyle: this.finalLoadingMoreThemeStyle,
          customStyle: this.loadingMoreCustomStyle,
          titleCustomStyle: this.loadingMoreTitleCustomStyle,
          iconCustomStyle: this.loadingMoreLoadingIconCustomStyle,
          loadingIconType: this.loadingMoreLoadingIconType,
          loadingIconCustomImage: this.loadingMoreLoadingIconCustomImage,
          loadingAnimated: this.loadingMoreLoadingAnimated,
          showNoMoreLine: this.showLoadingMoreNoMoreLine,
          noMoreLineCustomStyle: this.loadingMoreNoMoreLineCustomStyle,
          defaultText: this.finalLoadingMoreDefaultText,
          loadingText: this.finalLoadingMoreLoadingText,
          noMoreText: this.finalLoadingMoreNoMoreText,
          failText: this.finalLoadingMoreFailText,
          hideContent: !this.loadingMoreDefaultAsLoading && this.listRendering,
          unit: this.unit,
          isChat: this.useChatRecordMode,
          chatDefaultAsLoading: this.chatLoadingMoreDefaultAsLoading
        };
      },
      // 最终的底部加载更多主题
      finalLoadingMoreThemeStyle() {
        return this.loadingMoreThemeStyle.length ? this.loadingMoreThemeStyle : this.defaultThemeStyle;
      },
      // 最终的底部加载更多触发阈值
      finalLowerThreshold() {
        return u.convertToPx(this.lowerThreshold);
      },
      // 是否显示默认状态下的底部加载更多
      showLoadingMoreDefault() {
        return this._showLoadingMore("Default");
      },
      // 是否显示加载中状态下的底部加载更多
      showLoadingMoreLoading() {
        return this._showLoadingMore("Loading");
      },
      // 是否显示没有更多了状态下的底部加载更多
      showLoadingMoreNoMore() {
        return this._showLoadingMore("NoMore");
      },
      // 是否显示加载失败状态下的底部加载更多
      showLoadingMoreFail() {
        return this._showLoadingMore("Fail");
      },
      // 是否显示自定义状态下的底部加载更多
      showLoadingMoreCustom() {
        return this._showLoadingMore("Custom");
      },
      // 底部加载更多固定高度
      loadingMoreFixedHeight() {
        return u.addUnit("80rpx", this.unit);
      }
    },
    methods: {
      // 页面滚动到底部时通知z-paging进行进一步处理
      pageReachBottom() {
        !this.useChatRecordMode && this.toBottomLoadingMoreEnabled && this._onLoadingMore("toBottom");
      },
      // 手动触发上拉加载更多(非必须，可依据具体需求使用)
      doLoadMore(type) {
        this._onLoadingMore(type);
      },
      // 通过@scroll事件检测是否滚动到了底部(顺带检测下是否滚动到了顶部)
      _checkScrolledToBottom(scrollDiff, checked = false) {
        if (this.cacheScrollNodeHeight === -1) {
          this._getNodeClientRect(".zp-scroll-view").then((res) => {
            if (res) {
              const scrollNodeHeight = res[0].height;
              this.cacheScrollNodeHeight = scrollNodeHeight;
              if (scrollDiff - scrollNodeHeight <= this.finalLowerThreshold) {
                this._onLoadingMore("toBottom");
              }
            }
          });
        } else {
          if (scrollDiff - this.cacheScrollNodeHeight <= this.finalLowerThreshold) {
            this._onLoadingMore("toBottom");
          } else if (scrollDiff - this.cacheScrollNodeHeight <= 500 && !checked) {
            u.delay(() => {
              this._getNodeClientRect(".zp-scroll-view", true, true).then((res) => {
                if (res) {
                  this.oldScrollTop = res[0].scrollTop;
                  const newScrollDiff = res[0].scrollHeight - this.oldScrollTop;
                  this._checkScrolledToBottom(newScrollDiff, true);
                }
              });
            }, 150, "checkScrolledToBottomDelay");
          }
          if (this.oldScrollTop <= 150 && this.oldScrollTop !== 0) {
            u.delay(() => {
              if (this.oldScrollTop !== 0) {
                this._getNodeClientRect(".zp-scroll-view", true, true).then((res) => {
                  if (res && res[0].scrollTop === 0 && this.oldScrollTop !== 0) {
                    this._onScrollToUpper();
                  }
                });
              }
            }, 150, "checkScrolledToTopDelay");
          }
        }
      },
      // 触发加载更多时调用,from:toBottom-滑动到底部触发；1、click-点击加载更多触发
      _onLoadingMore(from = "click") {
        if (this.isIos && from === "toBottom" && !this.scrollToBottomBounceEnabled && this.scrollEnable) {
          this.scrollEnable = false;
          this.$nextTick(() => {
            this.scrollEnable = true;
          });
        }
        this.$emit("scrolltolower", from);
        if (this.refresherOnly || !this.loadingMoreEnabled || !(this.loadingStatus === Enum.More.Default || this.loadingStatus === Enum.More.Fail) || this.loading || this.showEmpty)
          return;
        this._doLoadingMore();
      },
      // 处理开始加载更多
      _doLoadingMore() {
        if (this.pageNo >= this.defaultPageNo && this.loadingStatus !== Enum.More.NoMore) {
          this.pageNo++;
          this._startLoading(false);
          if (this.isLocalPaging) {
            this._localPagingQueryList(this.pageNo, this.defaultPageSize, this.localPagingLoadingTime, (res) => {
              this.completeByTotal(res, this.totalLocalPagingList.length);
              this.queryFrom = Enum.QueryFrom.LoadMore;
            });
          } else {
            this._emitQuery(this.pageNo, this.defaultPageSize, Enum.QueryFrom.LoadMore);
            this._callMyParentQuery();
          }
          this.loadingType = Enum.LoadingType.LoadMore;
        }
      },
      // (预处理)判断当没有更多数据且分页内容未超出z-paging时是否显示没有更多数据的view
      _preCheckShowNoMoreInside(newVal, scrollViewNode, pagingContainerNode) {
        if (this.loadingStatus === Enum.More.NoMore && this.hideNoMoreByLimit > 0 && newVal.length) {
          this.showLoadingMore = newVal.length > this.hideNoMoreByLimit;
        } else if (this.loadingStatus === Enum.More.NoMore && this.hideNoMoreInside && newVal.length || this.insideMore && this.insideOfPaging !== false && newVal.length) {
          this.$nextTick(() => {
            this._checkShowNoMoreInside(newVal, scrollViewNode, pagingContainerNode);
          });
          if (this.insideMore && this.insideOfPaging !== false && newVal.length) {
            this.showLoadingMore = newVal.length;
          }
        } else {
          this.showLoadingMore = newVal.length;
        }
      },
      // 判断当没有更多数据且分页内容未超出z-paging时是否显示没有更多数据的view
      async _checkShowNoMoreInside(totalData, oldScrollViewNode, oldPagingContainerNode) {
        try {
          const scrollViewNode = oldScrollViewNode || await this._getNodeClientRect(".zp-scroll-view");
          if (this.usePageScroll) {
            if (scrollViewNode) {
              const scrollViewTotalH = scrollViewNode[0].top + scrollViewNode[0].height;
              this.insideOfPaging = scrollViewTotalH < this.windowHeight;
              if (this.hideNoMoreInside) {
                this.showLoadingMore = !this.insideOfPaging;
              }
              this._updateInsideOfPaging();
            }
          } else {
            const pagingContainerNode = oldPagingContainerNode || await this._getNodeClientRect(".zp-paging-container-content");
            const pagingContainerH = pagingContainerNode ? pagingContainerNode[0].height : 0;
            const scrollViewH = scrollViewNode ? scrollViewNode[0].height : 0;
            this.insideOfPaging = pagingContainerH < scrollViewH;
            if (this.hideNoMoreInside) {
              this.showLoadingMore = !this.insideOfPaging;
            }
            this._updateInsideOfPaging();
          }
        } catch (e) {
          this.insideOfPaging = !totalData.length;
          if (this.hideNoMoreInside) {
            this.showLoadingMore = !this.insideOfPaging;
          }
          this._updateInsideOfPaging();
        }
      },
      // 是否要展示上拉加载更多view
      _showLoadingMore(type) {
        if (!this.showLoadingMoreWhenReload && (!(this.loadingStatus === Enum.More.Default ? this.nShowBottom : true) || !this.realTotalData.length))
          return false;
        if ((!this.showLoadingMoreWhenReload || this.isUserPullDown || this.loadingStatus !== Enum.More.Loading) && !this.showLoadingMore || !this.loadingMoreEnabled && (!this.showLoadingMoreWhenReload || this.isUserPullDown || this.loadingStatus !== Enum.More.Loading) || this.refresherOnly) {
          return false;
        }
        if (this.useChatRecordMode && type !== "Loading")
          return false;
        if (!this.zSlots)
          return false;
        if (type === "Custom") {
          return this.showDefaultLoadingMoreText && !(this.loadingStatus === Enum.More.NoMore && !this.showLoadingMoreNoMoreView);
        }
        const res = this.loadingStatus === Enum.More[type] && this.zSlots[`loadingMore${type}`] && (type === "NoMore" ? this.showLoadingMoreNoMoreView : true);
        return res;
      }
    }
  };
  const loadingModule = {
    props: {
      // 第一次加载后自动隐藏loading slot，默认为是
      autoHideLoadingAfterFirstLoaded: {
        type: Boolean,
        default: u.gc("autoHideLoadingAfterFirstLoaded", true)
      },
      // loading slot是否铺满屏幕并固定，默认为否
      loadingFullFixed: {
        type: Boolean,
        default: u.gc("loadingFullFixed", false)
      },
      // 是否自动显示系统Loading：即uni.showLoading，若开启则将在刷新列表时(调用reload、refresh时)显示，下拉刷新和滚动到底部加载更多不会显示，默认为false。
      autoShowSystemLoading: {
        type: Boolean,
        default: u.gc("autoShowSystemLoading", false)
      },
      // 显示系统Loading时是否显示透明蒙层，防止触摸穿透，默认为是(H5、App、微信小程序、百度小程序有效)
      systemLoadingMask: {
        type: Boolean,
        default: u.gc("systemLoadingMask", true)
      },
      // 显示系统Loading时显示的文字，默认为"加载中"
      systemLoadingText: {
        type: [String, Object],
        default: u.gc("systemLoadingText", null)
      }
    },
    data() {
      return {
        loading: false,
        loadingForNow: false
      };
    },
    watch: {
      // loading状态
      loadingStatus(newVal) {
        this.$emit("loadingStatusChange", newVal);
        this.$nextTick(() => {
          this.loadingStatusAfterRender = newVal;
        });
        if (this.useChatRecordMode) {
          if (this.isFirstPage && (newVal === Enum.More.NoMore || newVal === Enum.More.Fail)) {
            this.isFirstPageAndNoMore = true;
            return;
          }
        }
        this.isFirstPageAndNoMore = false;
      },
      loading(newVal) {
        if (newVal) {
          this.loadingForNow = newVal;
        }
      }
    },
    computed: {
      // 是否显示loading
      showLoading() {
        if (this.firstPageLoaded || !this.loading || !this.loadingForNow)
          return false;
        if (this.finalShowSystemLoading) {
          uni.showLoading({
            title: this.finalSystemLoadingText,
            mask: this.systemLoadingMask
          });
        }
        return this.autoHideLoadingAfterFirstLoaded ? this.fromEmptyViewReload ? true : !this.pagingLoaded : this.loadingType === Enum.LoadingType.Refresher;
      },
      // 最终的是否显示系统loading
      finalShowSystemLoading() {
        return this.autoShowSystemLoading && this.loadingType === Enum.LoadingType.Refresher;
      }
    },
    methods: {
      // 处理开始加载更多状态
      _startLoading(isReload = false) {
        if (this.showLoadingMoreWhenReload && !this.isUserPullDown || !isReload) {
          this.loadingStatus = Enum.More.Loading;
        }
        this.loading = true;
      },
      // 停止系统loading和refresh
      _endSystemLoadingAndRefresh() {
        this.finalShowSystemLoading && uni.hideLoading();
        !this.useCustomRefresher && uni.stopPullDownRefresh();
      }
    }
  };
  const chatRecordModerModule = {
    props: {
      // 使用聊天记录模式，默认为否
      useChatRecordMode: {
        type: Boolean,
        default: u.gc("useChatRecordMode", false)
      },
      // 使用聊天记录模式时滚动到顶部后，列表垂直移动偏移距离。默认0rpx。单位px（暂时无效）
      chatRecordMoreOffset: {
        type: [Number, String],
        default: u.gc("chatRecordMoreOffset", "0rpx")
      },
      // 使用聊天记录模式时是否自动隐藏键盘：在用户触摸列表时候自动隐藏键盘，默认为是
      autoHideKeyboardWhenChat: {
        type: Boolean,
        default: u.gc("autoHideKeyboardWhenChat", true)
      },
      // 使用聊天记录模式中键盘弹出时是否自动调整slot="bottom"高度，默认为是
      autoAdjustPositionWhenChat: {
        type: Boolean,
        default: u.gc("autoAdjustPositionWhenChat", true)
      },
      // 使用聊天记录模式中键盘弹出时占位高度偏移距离。默认0rpx。单位px
      chatAdjustPositionOffset: {
        type: [Number, String],
        default: u.gc("chatAdjustPositionOffset", "0rpx")
      },
      // 使用聊天记录模式中键盘弹出时是否自动滚动到底部，默认为否
      autoToBottomWhenChat: {
        type: Boolean,
        default: u.gc("autoToBottomWhenChat", false)
      },
      // 使用聊天记录模式中reload时是否显示chatLoading，默认为否
      showChatLoadingWhenReload: {
        type: Boolean,
        default: u.gc("showChatLoadingWhenReload", false)
      },
      // 在聊天记录模式中滑动到顶部状态为默认状态时，以加载中的状态展示，默认为是。若设置为否，则默认会显示【点击加载更多】，然后才会显示loading
      chatLoadingMoreDefaultAsLoading: {
        type: Boolean,
        default: u.gc("chatLoadingMoreDefaultAsLoading", true)
      }
    },
    data() {
      return {
        // 键盘高度
        keyboardHeight: 0,
        // 键盘高度是否未改变，此时占位高度变化不需要动画效果
        isKeyboardHeightChanged: false
      };
    },
    computed: {
      finalChatRecordMoreOffset() {
        return u.convertToPx(this.chatRecordMoreOffset);
      },
      finalChatAdjustPositionOffset() {
        return u.convertToPx(this.chatAdjustPositionOffset);
      },
      // 聊天记录模式旋转180度style
      chatRecordRotateStyle() {
        let cellStyle;
        cellStyle = this.useChatRecordMode ? { transform: "scaleY(-1)" } : {};
        this.$emit("update:cellStyle", cellStyle);
        this.$emit("cellStyleChange", cellStyle);
        this.$nextTick(() => {
          if (this.isFirstPage && this.isChatRecordModeAndNotInversion) {
            this.$nextTick(() => {
              this._scrollToBottom(false);
              u.delay(() => {
                this._scrollToBottom(false);
                u.delay(() => {
                  this._scrollToBottom(false);
                }, 50);
              }, 50);
            });
          }
        });
        return cellStyle;
      },
      // 是否是聊天记录列表并且有配置transform
      isChatRecordModeHasTransform() {
        return this.useChatRecordMode && this.chatRecordRotateStyle && this.chatRecordRotateStyle.transform;
      },
      // 是否是聊天记录列表并且列表未倒置
      isChatRecordModeAndNotInversion() {
        return this.isChatRecordModeHasTransform && this.chatRecordRotateStyle.transform === "scaleY(1)";
      },
      // 是否是聊天记录列表并且列表倒置
      isChatRecordModeAndInversion() {
        return this.isChatRecordModeHasTransform && this.chatRecordRotateStyle.transform === "scaleY(-1)";
      },
      // 最终的聊天记录模式中底部安全区域的高度，如果开启了底部安全区域并且键盘未弹出，则添加底部区域高度
      chatRecordModeSafeAreaBottom() {
        return this.safeAreaInsetBottom && !this.keyboardHeight ? this.safeAreaBottom : 0;
      }
    },
    mounted() {
      if (this.useChatRecordMode) {
        uni.onKeyboardHeightChange(this._handleKeyboardHeightChange);
      }
    },
    methods: {
      // 添加聊天记录
      addChatRecordData(data, toBottom = true, toBottomWithAnimate = true) {
        if (!this.useChatRecordMode)
          return;
        this.isTotalChangeFromAddData = true;
        this.addDataFromTop(data, toBottom, toBottomWithAnimate);
      },
      // 手动触发滚动到顶部加载更多，聊天记录模式时有效
      doChatRecordLoadMore() {
        this.useChatRecordMode && this._onLoadingMore("click");
      },
      // 处理键盘高度变化
      _handleKeyboardHeightChange(res) {
        this.$emit("keyboardHeightChange", res);
        if (this.autoAdjustPositionWhenChat) {
          this.isKeyboardHeightChanged = true;
          this.keyboardHeight = res.height > 0 ? res.height + this.finalChatAdjustPositionOffset : res.height;
        }
        if (this.autoToBottomWhenChat && this.keyboardHeight > 0) {
          u.delay(() => {
            this.scrollToBottom(false);
            u.delay(() => {
              this.scrollToBottom(false);
            });
          });
        }
      }
    }
  };
  const scrollerModule = {
    props: {
      // 使用页面滚动，默认为否，当设置为是时则使用页面的滚动而非此组件内部的scroll-view的滚动，使用页面滚动时z-paging无需设置确定的高度且对于长列表展示性能更高，但配置会略微繁琐
      usePageScroll: {
        type: Boolean,
        default: u.gc("usePageScroll", false)
      },
      // 是否可以滚动，使用内置scroll-view和nvue时有效，默认为是
      scrollable: {
        type: Boolean,
        default: u.gc("scrollable", true)
      },
      // 控制是否出现滚动条，默认为是
      showScrollbar: {
        type: Boolean,
        default: u.gc("showScrollbar", true)
      },
      // 是否允许横向滚动，默认为否
      scrollX: {
        type: Boolean,
        default: u.gc("scrollX", false)
      },
      // iOS设备上滚动到顶部时是否允许回弹效果，默认为否。关闭回弹效果后可使滚动到顶部与下拉刷新更连贯，但是有吸顶view时滚动到顶部时可能出现抖动。
      scrollToTopBounceEnabled: {
        type: Boolean,
        default: u.gc("scrollToTopBounceEnabled", false)
      },
      // iOS设备上滚动到底部时是否允许回弹效果，默认为是。
      scrollToBottomBounceEnabled: {
        type: Boolean,
        default: u.gc("scrollToBottomBounceEnabled", true)
      },
      // 在设置滚动条位置时使用动画过渡，默认为否
      scrollWithAnimation: {
        type: Boolean,
        default: u.gc("scrollWithAnimation", false)
      },
      // 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
      scrollIntoView: {
        type: String,
        default: u.gc("scrollIntoView", "")
      }
    },
    data() {
      return {
        scrollTop: 0,
        oldScrollTop: 0,
        scrollViewStyle: {},
        scrollViewContainerStyle: {},
        scrollViewInStyle: {},
        pageScrollTop: -1,
        scrollEnable: true,
        privateScrollWithAnimation: -1,
        cacheScrollNodeHeight: -1,
        superContentHeight: 0
      };
    },
    watch: {
      oldScrollTop(newVal) {
        !this.usePageScroll && this._scrollTopChange(newVal, false);
      },
      pageScrollTop(newVal) {
        this.usePageScroll && this._scrollTopChange(newVal, true);
      },
      usePageScroll: {
        handler(newVal) {
          this.loaded && this.autoHeight && this._setAutoHeight(!newVal);
        },
        immediate: true
      },
      finalScrollTop(newVal) {
        this.renderPropScrollTop = newVal < 6 ? 0 : 10;
      }
    },
    computed: {
      finalScrollWithAnimation() {
        if (this.privateScrollWithAnimation !== -1) {
          return this.privateScrollWithAnimation === 1;
        }
        return this.scrollWithAnimation;
      },
      finalScrollViewStyle() {
        if (this.superContentZIndex != 1) {
          this.scrollViewStyle["z-index"] = this.superContentZIndex;
          this.scrollViewStyle["position"] = "relative";
        }
        return this.scrollViewStyle;
      },
      finalScrollTop() {
        return this.usePageScroll ? this.pageScrollTop : this.oldScrollTop;
      },
      // 当前是否是旧版webview
      finalIsOldWebView() {
        return this.isOldWebView && !this.usePageScroll;
      },
      // 当前scroll-view/list-view是否允许滚动
      finalScrollable() {
        return this.scrollable && !this.usePageScroll && this.scrollEnable && (this.refresherCompleteScrollable ? true : this.refresherStatus !== Enum.Refresher.Complete) && (this.refresherRefreshingScrollable ? true : this.refresherStatus !== Enum.Refresher.Refreshing);
      }
    },
    methods: {
      // 滚动到顶部，animate为是否展示滚动动画，默认为是
      scrollToTop(animate, checkReverse = true) {
        if (this.useChatRecordMode && checkReverse && !this.isChatRecordModeAndNotInversion) {
          this.scrollToBottom(animate, false);
          return;
        }
        this.$nextTick(() => {
          this._scrollToTop(animate, false);
        });
      },
      // 滚动到底部，animate为是否展示滚动动画，默认为是
      scrollToBottom(animate, checkReverse = true) {
        if (this.useChatRecordMode && checkReverse && !this.isChatRecordModeAndNotInversion) {
          this.scrollToTop(animate, false);
          return;
        }
        this.$nextTick(() => {
          this._scrollToBottom(animate);
        });
      },
      // 滚动到指定view(vue中有效)。sel为需要滚动的view的id值，不包含"#"；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
      scrollIntoViewById(sel, offset, animate) {
        this._scrollIntoView(sel, offset, animate);
      },
      // 滚动到指定view(vue中有效)。nodeTop为需要滚动的view的top值(通过uni.createSelectorQuery()获取)；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
      scrollIntoViewByNodeTop(nodeTop, offset, animate) {
        this.scrollTop = this.oldScrollTop;
        this.$nextTick(() => {
          this._scrollIntoViewByNodeTop(nodeTop, offset, animate);
        });
      },
      // 滚动到指定位置(vue中有效)。y为与顶部的距离，单位为px；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
      scrollToY(y, offset, animate) {
        this.scrollTop = this.oldScrollTop;
        this.$nextTick(() => {
          this._scrollToY(y, offset, animate);
        });
      },
      // 滚动到指定view(nvue中和虚拟列表中有效)。index为需要滚动的view的index(第几个，从0开始)；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
      scrollIntoViewByIndex(index2, offset, animate) {
        if (index2 >= this.realTotalData.length) {
          u.consoleErr("当前滚动的index超出已渲染列表长度，请先通过refreshToPage加载到对应index页并等待渲染成功后再调用此方法！");
          return;
        }
        this.$nextTick(() => {
          if (this.finalUseVirtualList) {
            const isCellFixed = this.cellHeightMode === Enum.CellHeightMode.Fixed;
            u.delay(() => {
              if (this.finalUseVirtualList) {
                const scrollTop = isCellFixed ? this.virtualCellHeight * index2 : this.virtualHeightCacheList[index2].lastTotalHeight;
                this.scrollToY(scrollTop, offset, animate);
              }
            }, isCellFixed ? 0 : 100);
          }
        });
      },
      // 滚动到指定view(nvue中有效)。view为需要滚动的view(通过`this.$refs.xxx`获取)，不包含"#"；offset为偏移量，单位为px；animate为是否展示滚动动画，默认为否
      scrollIntoViewByView(view, offset, animate) {
        this._scrollIntoView(view, offset, animate);
      },
      // 当使用页面滚动并且自定义下拉刷新时，请在页面的onPageScroll中调用此方法，告知z-paging当前的pageScrollTop，否则会导致在任意位置都可以下拉刷新
      updatePageScrollTop(value2) {
        this.pageScrollTop = value2;
      },
      // 当使用页面滚动并且设置了slot="top"时，默认初次加载会自动获取其高度，并使内部容器下移，当slot="top"的view高度动态改变时，在其高度需要更新时调用此方法
      updatePageScrollTopHeight() {
        this._updatePageScrollTopOrBottomHeight("top");
      },
      // 当使用页面滚动并且设置了slot="bottom"时，默认初次加载会自动获取其高度，并使内部容器下移，当slot="bottom"的view高度动态改变时，在其高度需要更新时调用此方法
      updatePageScrollBottomHeight() {
        this._updatePageScrollTopOrBottomHeight("bottom");
      },
      // 更新slot="left"和slot="right"宽度，当slot="left"或slot="right"宽度动态改变时调用
      updateLeftAndRightWidth() {
        if (!this.finalIsOldWebView)
          return;
        this.$nextTick(() => this._updateLeftAndRightWidth(this.scrollViewContainerStyle, "zp-page"));
      },
      // 更新z-paging内置scroll-view的scrollTop
      updateScrollViewScrollTop(scrollTop, animate = true) {
        this._updatePrivateScrollWithAnimation(animate);
        this.scrollTop = this.oldScrollTop;
        this.$nextTick(() => {
          this.scrollTop = scrollTop;
          this.oldScrollTop = this.scrollTop;
        });
      },
      // 当滚动到顶部时
      _onScrollToUpper() {
        this.$emit("scrolltoupper");
        this.$emit("scrollTopChange", 0);
        this.$nextTick(() => {
          this.oldScrollTop = 0;
        });
      },
      // 当滚动到底部时
      _onScrollToLower(e) {
        (!e.detail || !e.detail.direction || e.detail.direction === "bottom") && this.toBottomLoadingMoreEnabled && this._onLoadingMore(this.useChatRecordMode ? "click" : "toBottom");
      },
      // 滚动到顶部
      _scrollToTop(animate = true, isPrivate = true) {
        if (this.usePageScroll) {
          this.$nextTick(() => {
            uni.pageScrollTo({
              scrollTop: 0,
              duration: animate ? 100 : 0
            });
          });
          return;
        }
        this._updatePrivateScrollWithAnimation(animate);
        this.scrollTop = this.oldScrollTop;
        this.$nextTick(() => {
          this.scrollTop = 0;
          this.oldScrollTop = this.scrollTop;
        });
      },
      // 滚动到底部
      async _scrollToBottom(animate = true) {
        if (this.usePageScroll) {
          this.$nextTick(() => {
            uni.pageScrollTo({
              scrollTop: Number.MAX_VALUE,
              duration: animate ? 100 : 0
            });
          });
          return;
        }
        try {
          this._updatePrivateScrollWithAnimation(animate);
          const pagingContainerNode = await this._getNodeClientRect(".zp-paging-container");
          const scrollViewNode = await this._getNodeClientRect(".zp-scroll-view");
          const pagingContainerH = pagingContainerNode ? pagingContainerNode[0].height : 0;
          const scrollViewH = scrollViewNode ? scrollViewNode[0].height : 0;
          if (pagingContainerH > scrollViewH) {
            this.scrollTop = this.oldScrollTop;
            this.$nextTick(() => {
              this.scrollTop = pagingContainerH - scrollViewH + this.virtualPlaceholderTopHeight;
              this.oldScrollTop = this.scrollTop;
            });
          }
        } catch (e) {
        }
      },
      // 滚动到指定view
      _scrollIntoView(sel, offset = 0, animate = false, finishCallback) {
        try {
          this.scrollTop = this.oldScrollTop;
          this.$nextTick(() => {
            this._getNodeClientRect("#" + sel.replace("#", ""), this.$parent).then((node) => {
              if (node) {
                let nodeTop = node[0].top;
                this._scrollIntoViewByNodeTop(nodeTop, offset, animate);
                finishCallback && finishCallback();
              }
            });
          });
        } catch (e) {
        }
      },
      // 通过nodeTop滚动到指定view
      _scrollIntoViewByNodeTop(nodeTop, offset = 0, animate = false) {
        if (this.isChatRecordModeAndInversion) {
          this._getNodeClientRect(".zp-scroll-view").then((sNode) => {
            if (sNode) {
              this._scrollToY(sNode[0].height - nodeTop, offset, animate, true);
            }
          });
        } else {
          this._scrollToY(nodeTop, offset, animate, true);
        }
      },
      // 滚动到指定位置
      _scrollToY(y, offset = 0, animate = false, addScrollTop = false) {
        this._updatePrivateScrollWithAnimation(animate);
        u.delay(() => {
          if (this.usePageScroll) {
            if (addScrollTop && this.pageScrollTop !== -1) {
              y += this.pageScrollTop;
            }
            const scrollTop = y - offset;
            uni.pageScrollTo({
              scrollTop,
              duration: animate ? 100 : 0
            });
          } else {
            if (addScrollTop) {
              y += this.oldScrollTop;
            }
            this.scrollTop = y - offset;
          }
        }, 10);
      },
      // scroll-view滚动中
      _scroll(e) {
        this.$emit("scroll", e);
        const scrollTop = e.detail.scrollTop;
        this.finalUseVirtualList && this._updateVirtualScroll(scrollTop, this.oldScrollTop - scrollTop);
        this.oldScrollTop = scrollTop;
        const scrollDiff = e.detail.scrollHeight - this.oldScrollTop;
        !this.isIos && this._checkScrolledToBottom(scrollDiff);
      },
      // 更新内置的scroll-view是否启用滚动动画
      _updatePrivateScrollWithAnimation(animate) {
        this.privateScrollWithAnimation = animate ? 1 : 0;
        u.delay(() => this.$nextTick(() => {
          this.privateScrollWithAnimation = -1;
        }), 100, "updateScrollWithAnimationDelay");
      },
      // 检测scrollView是否要铺满屏幕
      _doCheckScrollViewShouldFullHeight(totalData) {
        if (this.autoFullHeight && this.usePageScroll && this.isTotalChangeFromAddData) {
          this.$nextTick(() => {
            this._checkScrollViewShouldFullHeight((scrollViewNode, pagingContainerNode) => {
              this._preCheckShowNoMoreInside(totalData, scrollViewNode, pagingContainerNode);
            });
          });
        } else {
          this._preCheckShowNoMoreInside(totalData);
        }
      },
      // 检测z-paging是否要全屏覆盖(当使用页面滚动并且不满全屏时，默认z-paging需要铺满全屏，避免数据过少时内部的empty-view无法正确展示)
      async _checkScrollViewShouldFullHeight(callback) {
        try {
          const scrollViewNode = await this._getNodeClientRect(".zp-scroll-view");
          const pagingContainerNode = await this._getNodeClientRect(".zp-paging-container-content");
          if (!scrollViewNode || !pagingContainerNode)
            return;
          const scrollViewHeight = pagingContainerNode[0].height;
          const scrollViewTop = scrollViewNode[0].top;
          if (this.isAddedData && scrollViewHeight + scrollViewTop <= this.windowHeight) {
            this._setAutoHeight(true, scrollViewNode);
            callback(scrollViewNode, pagingContainerNode);
          } else {
            this._setAutoHeight(false);
            callback(null, null);
          }
        } catch (e) {
          callback(null, null);
        }
      },
      // 更新缓存中z-paging整个内容容器高度
      async _updateCachedSuperContentHeight() {
        const superContentNode = await this._getNodeClientRect(".z-paging-content");
        if (superContentNode) {
          this.superContentHeight = superContentNode[0].height;
        }
      },
      // scrollTop改变时触发
      _scrollTopChange(newVal, isPageScrollTop) {
        this.$emit("scrollTopChange", newVal);
        this.$emit("update:scrollTop", newVal);
        this._checkShouldShowBackToTop(newVal);
        const scrollTop = newVal > 5 ? 6 : 0;
        if (isPageScrollTop && this.wxsPageScrollTop !== scrollTop) {
          this.wxsPageScrollTop = scrollTop;
        } else if (!isPageScrollTop && this.wxsScrollTop !== scrollTop) {
          this.wxsScrollTop = scrollTop;
          if (scrollTop > 6) {
            this.scrollEnable = true;
          }
        }
      },
      // 更新使用页面滚动时slot="top"或"bottom"插入view的高度
      _updatePageScrollTopOrBottomHeight(type) {
        if (!this.usePageScroll)
          return;
        this._doCheckScrollViewShouldFullHeight(this.realTotalData);
        const node = `.zp-page-${type}`;
        const marginText = `margin${type.slice(0, 1).toUpperCase() + type.slice(1)}`;
        let safeAreaInsetBottomAdd = this.safeAreaInsetBottom;
        this.$nextTick(() => {
          let delayTime = 0;
          u.delay(() => {
            this._getNodeClientRect(node).then((res) => {
              if (res) {
                let pageScrollNodeHeight = res[0].height;
                if (type === "bottom") {
                  if (safeAreaInsetBottomAdd) {
                    pageScrollNodeHeight += this.safeAreaBottom;
                  }
                } else {
                  this.cacheTopHeight = pageScrollNodeHeight;
                }
                this.$set(this.scrollViewStyle, marginText, `${pageScrollNodeHeight}px`);
              } else if (safeAreaInsetBottomAdd) {
                this.$set(this.scrollViewStyle, marginText, `${this.safeAreaBottom}px`);
              }
            });
          }, delayTime);
        });
      }
    }
  };
  const backToTopModule = {
    props: {
      // 自动显示点击返回顶部按钮，默认为否
      autoShowBackToTop: {
        type: Boolean,
        default: u.gc("autoShowBackToTop", false)
      },
      // 点击返回顶部按钮显示/隐藏的阈值(滚动距离)，单位为px，默认为400rpx
      backToTopThreshold: {
        type: [Number, String],
        default: u.gc("backToTopThreshold", "400rpx")
      },
      // 点击返回顶部按钮的自定义图片地址，默认使用z-paging内置的图片
      backToTopImg: {
        type: String,
        default: u.gc("backToTopImg", "")
      },
      // 点击返回顶部按钮返回到顶部时是否展示过渡动画，默认为是
      backToTopWithAnimate: {
        type: Boolean,
        default: u.gc("backToTopWithAnimate", true)
      },
      // 点击返回顶部按钮与底部的距离，注意添加单位px或rpx，默认为160rpx
      backToTopBottom: {
        type: [Number, String],
        default: u.gc("backToTopBottom", "160rpx")
      },
      // 点击返回顶部按钮的自定义样式
      backToTopStyle: {
        type: Object,
        default: u.gc("backToTopStyle", {})
      },
      // iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向，默认为是
      enableBackToTop: {
        type: Boolean,
        default: u.gc("enableBackToTop", true)
      }
    },
    data() {
      return {
        // 点击返回顶部的class
        backToTopClass: "zp-back-to-top zp-back-to-top-hide",
        // 上次点击返回顶部的时间
        lastBackToTopShowTime: 0,
        // 点击返回顶部显示的class是否在展示中，使得按钮展示/隐藏过度效果更自然
        showBackToTopClass: false
      };
    },
    computed: {
      backToTopThresholdUnitConverted() {
        return u.addUnit(this.backToTopThreshold, this.unit);
      },
      backToTopBottomUnitConverted() {
        return u.addUnit(this.backToTopBottom, this.unit);
      },
      finalEnableBackToTop() {
        return this.usePageScroll ? false : this.enableBackToTop;
      },
      finalBackToTopThreshold() {
        return u.convertToPx(this.backToTopThresholdUnitConverted);
      },
      finalBackToTopStyle() {
        const backToTopStyle = this.backToTopStyle;
        if (!backToTopStyle.bottom) {
          backToTopStyle.bottom = this.windowBottom + u.convertToPx(this.backToTopBottomUnitConverted) + "px";
        }
        if (!backToTopStyle.position) {
          backToTopStyle.position = this.usePageScroll ? "fixed" : "absolute";
        }
        return backToTopStyle;
      },
      finalBackToTopClass() {
        return `${this.backToTopClass} zp-back-to-top-${this.unit}`;
      }
    },
    methods: {
      // 点击了返回顶部
      _backToTopClick() {
        let callbacked = false;
        this.$emit("backToTopClick", (toTop) => {
          (toTop === void 0 || toTop === true) && this._handleToTop();
          callbacked = true;
        });
        this.$nextTick(() => {
          !callbacked && this._handleToTop();
        });
      },
      // 处理滚动到顶部（聊天记录模式中为滚动到底部）
      _handleToTop() {
        !this.backToTopWithAnimate && this._checkShouldShowBackToTop(0);
        !this.useChatRecordMode ? this.scrollToTop(this.backToTopWithAnimate) : this.scrollToBottom(this.backToTopWithAnimate);
      },
      // 判断是否要显示返回顶部按钮
      _checkShouldShowBackToTop(scrollTop) {
        if (!this.autoShowBackToTop) {
          this.showBackToTopClass = false;
          return;
        }
        if (scrollTop > this.finalBackToTopThreshold) {
          if (!this.showBackToTopClass) {
            this.showBackToTopClass = true;
            this.lastBackToTopShowTime = (/* @__PURE__ */ new Date()).getTime();
            u.delay(() => {
              this.backToTopClass = "zp-back-to-top zp-back-to-top-show";
            }, 300);
          }
        } else {
          if (this.showBackToTopClass) {
            this.backToTopClass = "zp-back-to-top zp-back-to-top-hide";
            u.delay(() => {
              this.showBackToTopClass = false;
            }, (/* @__PURE__ */ new Date()).getTime() - this.lastBackToTopShowTime < 500 ? 0 : 300);
          }
        }
      }
    }
  };
  const virtualListModule = {
    props: {
      // 是否使用虚拟列表，默认为否
      useVirtualList: {
        type: Boolean,
        default: u.gc("useVirtualList", false)
      },
      // 在使用虚拟列表时，是否使用兼容模式，默认为否
      useCompatibilityMode: {
        type: Boolean,
        default: u.gc("useCompatibilityMode", false)
      },
      // 使用兼容模式时传递的附加数据
      extraData: {
        type: Object,
        default: u.gc("extraData", {})
      },
      // 是否在z-paging内部循环渲染列表(内置列表)，默认为否。若use-virtual-list为true，则此项恒为true
      useInnerList: {
        type: Boolean,
        default: u.gc("useInnerList", false)
      },
      // 强制关闭inner-list，默认为false，如果为true将强制关闭innerList，适用于开启了虚拟列表后需要强制关闭inner-list的情况
      forceCloseInnerList: {
        type: Boolean,
        default: u.gc("forceCloseInnerList", false)
      },
      // 内置列表cell的key名称，仅nvue有效，在nvue中开启use-inner-list时必须填此项
      cellKeyName: {
        type: String,
        default: u.gc("cellKeyName", "")
      },
      // innerList样式
      innerListStyle: {
        type: Object,
        default: u.gc("innerListStyle", {})
      },
      // innerCell样式
      innerCellStyle: {
        type: Object,
        default: u.gc("innerCellStyle", {})
      },
      // 预加载的列表可视范围(列表高度)页数，默认为12，即预加载当前页及上下各12页的cell。此数值越大，则虚拟列表中加载的dom越多，内存消耗越大(会维持在一个稳定值)，但增加预加载页面数量可缓解快速滚动短暂白屏问题
      preloadPage: {
        type: [Number, String],
        default: u.gc("preloadPage", 12),
        validator: (value2) => {
          if (value2 <= 0)
            u.consoleErr("preload-page必须大于0！");
          return value2 > 0;
        }
      },
      // 虚拟列表cell高度模式，默认为fixed，也就是每个cell高度完全相同，将以第一个cell高度为准进行计算。可选值【dynamic】，即代表高度是动态非固定的，【dynamic】性能低于【fixed】。
      cellHeightMode: {
        type: String,
        default: u.gc("cellHeightMode", Enum.CellHeightMode.Fixed)
      },
      // 固定的cell高度，cellHeightMode=fixed才有效，若设置了值，则不计算第一个cell高度而使用设置的cell高度
      fixedCellHeight: {
        type: [Number, String],
        default: u.gc("fixedCellHeight", 0)
      },
      // 虚拟列表列数，默认为1。常用于每行有多列的情况，例如每行有2列数据，需要将此值设置为2
      virtualListCol: {
        type: [Number, String],
        default: u.gc("virtualListCol", 1)
      },
      // 虚拟列表scroll取样帧率，默认为80，过低容易出现白屏问题，过高容易出现卡顿问题
      virtualScrollFps: {
        type: [Number, String],
        default: u.gc("virtualScrollFps", 80)
      },
      // 虚拟列表cell id的前缀，适用于一个页面有多个虚拟列表的情况，用以区分不同虚拟列表cell的id，注意：请勿传数字或以数字开头的字符串。如设置为list1，则cell的id应为：list1-zp-id-${item.zp_index}
      virtualCellIdPrefix: {
        type: String,
        default: u.gc("virtualCellIdPrefix", "")
      }
    },
    data() {
      return {
        virtualListKey: u.getInstanceId(),
        virtualPageHeight: 0,
        virtualCellHeight: 0,
        virtualScrollTimeStamp: 0,
        virtualList: [],
        virtualPlaceholderTopHeight: 0,
        virtualPlaceholderBottomHeight: 0,
        virtualTopRangeIndex: 0,
        virtualBottomRangeIndex: 0,
        lastVirtualTopRangeIndex: 0,
        lastVirtualBottomRangeIndex: 0,
        virtualItemInsertedCount: 0,
        virtualHeightCacheList: [],
        getCellHeightRetryCount: {
          fixed: 0,
          dynamic: 0
        },
        pagingOrgTop: -1,
        updateVirtualListFromDataChange: false
      };
    },
    watch: {
      // 监听总数据的改变，刷新虚拟列表布局
      realTotalData() {
        this.updateVirtualListRender();
      },
      // 监听虚拟列表渲染数组的改变并emit
      virtualList(newVal) {
        this.$emit("update:virtualList", newVal);
        this.$emit("virtualListChange", newVal);
      },
      // 监听虚拟列表顶部占位高度改变并emit
      virtualPlaceholderTopHeight(newVal) {
        this.$emit("virtualTopHeightChange", newVal);
      }
    },
    computed: {
      virtualCellIndexKey() {
        return c.listCellIndexKey;
      },
      finalUseVirtualList() {
        if (this.useVirtualList && this.usePageScroll) {
          u.consoleErr("使用页面滚动时，开启虚拟列表无效！");
        }
        return this.useVirtualList && !this.usePageScroll;
      },
      finalUseInnerList() {
        return this.useInnerList || this.finalUseVirtualList && !this.forceCloseInnerList;
      },
      finalCellKeyName() {
        return this.cellKeyName;
      },
      finalVirtualPageHeight() {
        return this.virtualPageHeight > 0 ? this.virtualPageHeight : this.windowHeight;
      },
      finalFixedCellHeight() {
        return u.convertToPx(this.fixedCellHeight);
      },
      fianlVirtualCellIdPrefix() {
        const prefix = this.virtualCellIdPrefix ? this.virtualCellIdPrefix + "-" : "";
        return prefix + "zp-id";
      },
      virtualRangePageHeight() {
        return this.finalVirtualPageHeight * this.preloadPage;
      },
      virtualScrollDisTimeStamp() {
        return 1e3 / this.virtualScrollFps;
      }
    },
    methods: {
      // 在使用动态高度虚拟列表时，若在列表数组中需要插入某个item，需要调用此方法；item:需要插入的item，index:插入的cell位置，若index为2，则插入的item在原list的index=1之后，index从0开始
      doInsertVirtualListItem(item, index2) {
        if (this.cellHeightMode !== Enum.CellHeightMode.Dynamic)
          return;
        this.realTotalData.splice(index2, 0, item);
        this.realTotalData = [...this.realTotalData];
        this.virtualItemInsertedCount++;
        if (!item || Object.prototype.toString.call(item) !== "[object Object]") {
          item = { item };
        }
        const cellIndexKey = this.virtualCellIndexKey;
        item[cellIndexKey] = `custom-${this.virtualItemInsertedCount}`;
        item[c.listCellIndexUniqueKey] = `${this.virtualListKey}-${item[cellIndexKey]}`;
        this.$nextTick(async () => {
          let retryCount = 0;
          while (retryCount <= 10) {
            await u.wait(c.delayTime);
            const cellNode = await this._getVirtualCellNodeByIndex(item[cellIndexKey]);
            if (!cellNode) {
              retryCount++;
              continue;
            }
            const currentHeight = cellNode ? cellNode[0].height : 0;
            const lastHeightCache = this.virtualHeightCacheList[index2 - 1];
            const lastTotalHeight = lastHeightCache ? lastHeightCache.totalHeight : 0;
            this.virtualHeightCacheList.splice(index2, 0, {
              height: currentHeight,
              lastTotalHeight,
              totalHeight: lastTotalHeight + currentHeight
            });
            for (let i = index2 + 1; i < this.virtualHeightCacheList.length; i++) {
              const thisNode = this.virtualHeightCacheList[i];
              thisNode.lastTotalHeight += currentHeight;
              thisNode.totalHeight += currentHeight;
            }
            this._updateVirtualScroll(this.oldScrollTop);
            break;
          }
        });
      },
      // 在使用动态高度虚拟列表时，手动更新指定cell的缓存高度(当cell高度在初始化之后再次改变后调用)；index:需要更新的cell在列表中的位置，从0开始
      didUpdateVirtualListCell(index2) {
        if (this.cellHeightMode !== Enum.CellHeightMode.Dynamic)
          return;
        const currentNode = this.virtualHeightCacheList[index2];
        this.$nextTick(() => {
          this._getVirtualCellNodeByIndex(index2).then((cellNode) => {
            const cellNodeHeight = cellNode ? cellNode[0].height : 0;
            const heightDis = cellNodeHeight - currentNode.height;
            currentNode.height = cellNodeHeight;
            currentNode.totalHeight = currentNode.lastTotalHeight + cellNodeHeight;
            for (let i = index2 + 1; i < this.virtualHeightCacheList.length; i++) {
              const thisNode = this.virtualHeightCacheList[i];
              thisNode.totalHeight += heightDis;
              thisNode.lastTotalHeight += heightDis;
            }
          });
        });
      },
      // 在使用动态高度虚拟列表时，若删除了列表数组中的某个item，需要调用此方法以更新高度缓存数组；index:删除的cell在列表中的位置，从0开始
      didDeleteVirtualListCell(index2) {
        if (this.cellHeightMode !== Enum.CellHeightMode.Dynamic)
          return;
        const currentNode = this.virtualHeightCacheList[index2];
        for (let i = index2 + 1; i < this.virtualHeightCacheList.length; i++) {
          const thisNode = this.virtualHeightCacheList[i];
          thisNode.totalHeight -= currentNode.height;
          thisNode.lastTotalHeight -= currentNode.height;
        }
        this.virtualHeightCacheList.splice(index2, 1);
      },
      // 手动触发虚拟列表渲染更新，可用于解决例如修改了虚拟列表数组中元素，但展示未更新的情况
      updateVirtualListRender() {
        if (this.finalUseVirtualList) {
          this.updateVirtualListFromDataChange = true;
          this.$nextTick(() => {
            this.getCellHeightRetryCount.fixed = 0;
            if (this.realTotalData.length) {
              this.cellHeightMode === Enum.CellHeightMode.Fixed && this.isFirstPage && this._updateFixedCellHeight();
            } else {
              this._resetDynamicListState(!this.isUserPullDown);
            }
            this._updateVirtualScroll(this.oldScrollTop);
          });
        }
      },
      // 初始化虚拟列表
      _virtualListInit() {
        this.$nextTick(() => {
          u.delay(() => {
            this._getNodeClientRect(".zp-scroll-view").then((node) => {
              if (node) {
                this.pagingOrgTop = node[0].top;
                this.virtualPageHeight = node[0].height;
              }
            });
          });
        });
      },
      // cellHeightMode为fixed时获取第一个cell高度
      _updateFixedCellHeight() {
        if (!this.finalFixedCellHeight) {
          this.$nextTick(() => {
            u.delay(() => {
              this._getVirtualCellNodeByIndex(0).then((cellNode) => {
                if (!cellNode) {
                  if (this.getCellHeightRetryCount.fixed > 10)
                    return;
                  this.getCellHeightRetryCount.fixed++;
                  this._updateFixedCellHeight();
                } else {
                  this.virtualCellHeight = cellNode[0].height;
                  this._updateVirtualScroll(this.oldScrollTop);
                }
              });
            }, c.delayTime, "updateFixedCellHeightDelay");
          });
        } else {
          this.virtualCellHeight = this.finalFixedCellHeight;
        }
      },
      // cellHeightMode为dynamic时获取每个cell高度
      _updateDynamicCellHeight(list, dataFrom = "bottom") {
        const dataFromTop = dataFrom === "top";
        const heightCacheList = this.virtualHeightCacheList;
        const currentCacheList = dataFromTop ? [] : heightCacheList;
        let listTotalHeight = 0;
        this.$nextTick(() => {
          u.delay(async () => {
            for (let i = 0; i < list.length; i++) {
              const cellNode = await this._getVirtualCellNodeByIndex(list[i][this.virtualCellIndexKey]);
              const currentHeight = cellNode ? cellNode[0].height : 0;
              if (!cellNode) {
                if (this.getCellHeightRetryCount.dynamic <= 10) {
                  heightCacheList.splice(heightCacheList.length - i, i);
                  this.getCellHeightRetryCount.dynamic++;
                  this._updateDynamicCellHeight(list, dataFrom);
                }
                return;
              }
              const lastHeightCache = currentCacheList.length ? currentCacheList.slice(-1)[0] : null;
              const lastTotalHeight = lastHeightCache ? lastHeightCache.totalHeight : 0;
              currentCacheList.push({
                height: currentHeight,
                lastTotalHeight,
                totalHeight: lastTotalHeight + currentHeight
              });
              if (dataFromTop) {
                listTotalHeight += currentHeight;
              }
            }
            if (dataFromTop && list.length) {
              for (let i = 0; i < heightCacheList.length; i++) {
                const heightCacheItem = heightCacheList[i];
                heightCacheItem.lastTotalHeight += listTotalHeight;
                heightCacheItem.totalHeight += listTotalHeight;
              }
              this.virtualHeightCacheList = currentCacheList.concat(heightCacheList);
            }
            this._updateVirtualScroll(this.oldScrollTop);
          }, c.delayTime, "updateDynamicCellHeightDelay");
        });
      },
      // 设置cellItem的index
      _setCellIndex(list, dataFrom = "bottom") {
        let currentItemIndex = 0;
        const cellIndexKey = this.virtualCellIndexKey;
        dataFrom === "bottom" && [Enum.QueryFrom.Refresh, Enum.QueryFrom.Reload].indexOf(this.queryFrom) >= 0 && this._resetDynamicListState();
        if (this.totalData.length && this.queryFrom !== Enum.QueryFrom.Refresh) {
          if (dataFrom === "bottom") {
            currentItemIndex = this.realTotalData.length;
            const lastItem = this.realTotalData.length ? this.realTotalData.slice(-1)[0] : null;
            if (lastItem && lastItem[cellIndexKey] !== void 0) {
              currentItemIndex = lastItem[cellIndexKey] + 1;
            }
          } else if (dataFrom === "top") {
            const firstItem = this.realTotalData.length ? this.realTotalData[0] : null;
            if (firstItem && firstItem[cellIndexKey] !== void 0) {
              currentItemIndex = firstItem[cellIndexKey] - list.length;
            }
          }
        } else {
          this._resetDynamicListState();
        }
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if (!item || Object.prototype.toString.call(item) !== "[object Object]") {
            item = { item };
          }
          if (item[c.listCellIndexUniqueKey]) {
            item = u.deepCopy(item);
          }
          item[cellIndexKey] = currentItemIndex + i;
          item[c.listCellIndexUniqueKey] = `${this.virtualListKey}-${item[cellIndexKey]}`;
          list[i] = item;
        }
        this.getCellHeightRetryCount.dynamic = 0;
        this.cellHeightMode === Enum.CellHeightMode.Dynamic && this._updateDynamicCellHeight(list, dataFrom);
      },
      // 更新scroll滚动（虚拟列表滚动时触发）
      _updateVirtualScroll(scrollTop, scrollDiff = 0) {
        const currentTimeStamp = u.getTime();
        scrollTop === 0 && this._resetTopRange();
        if (scrollTop !== 0 && this.virtualScrollTimeStamp && currentTimeStamp - this.virtualScrollTimeStamp <= this.virtualScrollDisTimeStamp) {
          return;
        }
        this.virtualScrollTimeStamp = currentTimeStamp;
        let scrollIndex = 0;
        const cellHeightMode = this.cellHeightMode;
        if (cellHeightMode === Enum.CellHeightMode.Fixed) {
          scrollIndex = parseInt(scrollTop / this.virtualCellHeight) || 0;
          this._updateFixedTopRangeIndex(scrollIndex);
          this._updateFixedBottomRangeIndex(scrollIndex);
        } else if (cellHeightMode === Enum.CellHeightMode.Dynamic) {
          const scrollDirection = scrollDiff > 0 ? "top" : "bottom";
          const rangePageHeight = this.virtualRangePageHeight;
          const topRangePageOffset = scrollTop - rangePageHeight;
          const bottomRangePageOffset = scrollTop + this.finalVirtualPageHeight + rangePageHeight;
          let virtualBottomRangeIndex = 0;
          let virtualPlaceholderBottomHeight = 0;
          let reachedLimitBottom = false;
          const heightCacheList = this.virtualHeightCacheList;
          const lastHeightCache = !!heightCacheList ? heightCacheList.slice(-1)[0] : null;
          let startTopRangeIndex = this.virtualTopRangeIndex;
          if (scrollDirection === "bottom") {
            for (let i = startTopRangeIndex; i < heightCacheList.length; i++) {
              const heightCacheItem = heightCacheList[i];
              if (heightCacheItem && heightCacheItem.totalHeight > topRangePageOffset) {
                this.virtualTopRangeIndex = i;
                this.virtualPlaceholderTopHeight = heightCacheItem.lastTotalHeight;
                break;
              }
            }
          } else {
            let topRangeMatched = false;
            for (let i = startTopRangeIndex; i >= 0; i--) {
              const heightCacheItem = heightCacheList[i];
              if (heightCacheItem && heightCacheItem.totalHeight < topRangePageOffset) {
                this.virtualTopRangeIndex = i;
                this.virtualPlaceholderTopHeight = heightCacheItem.lastTotalHeight;
                topRangeMatched = true;
                break;
              }
            }
            !topRangeMatched && this._resetTopRange();
          }
          for (let i = this.virtualTopRangeIndex; i < heightCacheList.length; i++) {
            const heightCacheItem = heightCacheList[i];
            if (heightCacheItem && heightCacheItem.totalHeight > bottomRangePageOffset) {
              virtualBottomRangeIndex = i;
              virtualPlaceholderBottomHeight = lastHeightCache.totalHeight - heightCacheItem.totalHeight;
              reachedLimitBottom = true;
              break;
            }
          }
          if (!reachedLimitBottom || this.virtualBottomRangeIndex === 0) {
            this.virtualBottomRangeIndex = this.realTotalData.length ? this.realTotalData.length - 1 : this.pageSize;
            this.virtualPlaceholderBottomHeight = 0;
          } else {
            this.virtualBottomRangeIndex = virtualBottomRangeIndex;
            this.virtualPlaceholderBottomHeight = virtualPlaceholderBottomHeight;
          }
          this._updateVirtualList();
        }
      },
      // 更新fixedCell模式下topRangeIndex&placeholderTopHeight
      _updateFixedTopRangeIndex(scrollIndex) {
        let virtualTopRangeIndex = this.virtualCellHeight === 0 ? 0 : scrollIndex - (parseInt(this.finalVirtualPageHeight / this.virtualCellHeight) || 1) * this.preloadPage;
        virtualTopRangeIndex *= this.virtualListCol;
        virtualTopRangeIndex = Math.max(0, virtualTopRangeIndex);
        this.virtualTopRangeIndex = virtualTopRangeIndex;
        this.virtualPlaceholderTopHeight = virtualTopRangeIndex / this.virtualListCol * this.virtualCellHeight;
      },
      // 更新fixedCell模式下bottomRangeIndex&placeholderBottomHeight
      _updateFixedBottomRangeIndex(scrollIndex) {
        let virtualBottomRangeIndex = this.virtualCellHeight === 0 ? this.pageSize : scrollIndex + (parseInt(this.finalVirtualPageHeight / this.virtualCellHeight) || 1) * (this.preloadPage + 1);
        virtualBottomRangeIndex *= this.virtualListCol;
        virtualBottomRangeIndex = Math.min(this.realTotalData.length, virtualBottomRangeIndex);
        this.virtualBottomRangeIndex = virtualBottomRangeIndex;
        this.virtualPlaceholderBottomHeight = (this.realTotalData.length - virtualBottomRangeIndex) * this.virtualCellHeight / this.virtualListCol;
        this._updateVirtualList();
      },
      // 更新virtualList
      _updateVirtualList() {
        const shouldUpdateList = this.updateVirtualListFromDataChange || (this.lastVirtualTopRangeIndex !== this.virtualTopRangeIndex || this.lastVirtualBottomRangeIndex !== this.virtualBottomRangeIndex);
        if (shouldUpdateList) {
          this.updateVirtualListFromDataChange = false;
          this.lastVirtualTopRangeIndex = this.virtualTopRangeIndex;
          this.lastVirtualBottomRangeIndex = this.virtualBottomRangeIndex;
          this.virtualList = this.realTotalData.slice(this.virtualTopRangeIndex, this.virtualBottomRangeIndex + 1);
        }
      },
      // 重置动态cell模式下的高度缓存数据、虚拟列表和滚动状态
      _resetDynamicListState(resetVirtualList = false) {
        this.virtualHeightCacheList = [];
        if (resetVirtualList) {
          this.virtualList = [];
        }
        this.virtualTopRangeIndex = 0;
        this.virtualPlaceholderTopHeight = 0;
      },
      // 重置topRangeIndex和placeholderTopHeight
      _resetTopRange() {
        this.virtualTopRangeIndex = 0;
        this.virtualPlaceholderTopHeight = 0;
        this._updateVirtualList();
      },
      // 检测虚拟列表当前滚动位置，如发现滚动位置不正确则重新计算虚拟列表相关参数(为解决在App中可能出现的长时间进入后台后打开App白屏的问题)
      _checkVirtualListScroll() {
        if (this.finalUseVirtualList) {
          this.$nextTick(() => {
            this._getNodeClientRect(".zp-paging-touch-view").then((node) => {
              const currentTop = node ? node[0].top : 0;
              if (!node || currentTop === this.pagingOrgTop && this.virtualPlaceholderTopHeight !== 0) {
                this._updateVirtualScroll(0);
              }
            });
          });
        }
      },
      // 获取对应index的虚拟列表cell节点信息
      _getVirtualCellNodeByIndex(index2) {
        let inParent = false;
        return this._getNodeClientRect(`#${this.fianlVirtualCellIdPrefix}-${index2}`, this.finalUseInnerList, false, inParent);
      },
      // 处理使用内置列表时点击了cell事件
      _innerCellClick(item, index2) {
        this.$emit("innerCellClick", item, index2);
      }
    }
  };
  const systemInfo = uni.getSystemInfoSync();
  const _sfc_main$X = {
    name: "z-paging",
    components: {
      zPagingRefresh,
      zPagingLoadMore,
      zPagingEmptyView: __easycom_0$5
    },
    mixins: [
      commonLayoutModule,
      dataHandleModule,
      i18nModule,
      nvueModule,
      emptyModule,
      refresherModule,
      loadMoreModule,
      loadingModule,
      chatRecordModerModule,
      scrollerModule,
      backToTopModule,
      virtualListModule
    ],
    data() {
      return {
        // --------------静态资源---------------
        base64BackToTop: zStatic.base64BackToTop,
        // -------------全局数据相关--------------
        // 当前加载类型
        loadingType: Enum.LoadingType.Refresher,
        requestTimeStamp: 0,
        wxsPropType: "",
        renderPropScrollTop: -1,
        checkScrolledToBottomTimeOut: null,
        cacheTopHeight: -1,
        statusBarHeight: systemInfo.statusBarHeight,
        // --------------状态&判断---------------
        insideOfPaging: -1,
        isLoadFailed: false,
        isIos: systemInfo.platform === "ios",
        disabledBounce: false,
        fromCompleteEmit: false,
        disabledCompleteEmit: false,
        pageLaunched: false,
        active: false,
        // ---------------wxs相关---------------
        wxsIsScrollTopInTopRange: true,
        wxsScrollTop: 0,
        wxsPageScrollTop: 0,
        wxsOnPullingDown: false
      };
    },
    props: {
      // 调用complete后延迟处理的时间，单位为毫秒，默认0毫秒，优先级高于minDelay
      delay: {
        type: [Number, String],
        default: u.gc("delay", 0)
      },
      // 触发@query后最小延迟处理的时间，单位为毫秒，默认0毫秒，优先级低于delay（假设设置为300毫秒，若分页请求时间小于300毫秒，则在调用complete后延迟[300毫秒-请求时长]；若请求时长大于300毫秒，则不延迟），当show-refresher-when-reload为true或reload(true)时，其最小值为400
      minDelay: {
        type: [Number, String],
        default: u.gc("minDelay", 0)
      },
      // 设置z-paging的style，部分平台(如微信小程序)无法直接修改组件的style，可使用此属性代替
      pagingStyle: {
        type: Object,
        default: u.gc("pagingStyle", {})
      },
      // z-paging的高度，优先级低于pagingStyle中设置的height；传字符串，如100px、100rpx、100%
      height: {
        type: String,
        default: u.gc("height", "")
      },
      // z-paging的宽度，优先级低于pagingStyle中设置的width；传字符串，如100px、100rpx、100%
      width: {
        type: String,
        default: u.gc("width", "")
      },
      // z-paging的最大宽度，优先级低于pagingStyle中设置的max-width；传字符串，如100px、100rpx、100%。默认为空，也就是铺满窗口宽度，若设置了特定值则会自动添加margin: 0 auto
      maxWidth: {
        type: String,
        default: u.gc("maxWidth", "")
      },
      // z-paging的背景色，优先级低于pagingStyle中设置的background。传字符串，如"#ffffff"
      bgColor: {
        type: String,
        default: u.gc("bgColor", "")
      },
      // 设置z-paging的容器(插槽的父view)的style
      pagingContentStyle: {
        type: Object,
        default: u.gc("pagingContentStyle", {})
      },
      // z-paging是否自动高度，若自动高度则会自动铺满屏幕
      autoHeight: {
        type: Boolean,
        default: u.gc("autoHeight", false)
      },
      // z-paging是否自动高度时，附加的高度，注意添加单位px或rpx，若需要减少高度，则传负数
      autoHeightAddition: {
        type: [Number, String],
        default: u.gc("autoHeightAddition", "0px")
      },
      // loading(下拉刷新、上拉加载更多)的主题样式，支持black，white，默认black
      defaultThemeStyle: {
        type: String,
        default: u.gc("defaultThemeStyle", "black")
      },
      // z-paging是否使用fixed布局，若使用fixed布局，则z-paging的父view无需固定高度，z-paging高度默认为100%，默认为是(当使用内置scroll-view滚动时有效)
      fixed: {
        type: Boolean,
        default: u.gc("fixed", true)
      },
      // 是否开启底部安全区域适配
      safeAreaInsetBottom: {
        type: Boolean,
        default: u.gc("safeAreaInsetBottom", false)
      },
      // 开启底部安全区域适配后，是否使用placeholder形式实现，默认为否。为否时滚动区域会自动避开底部安全区域，也就是所有滚动内容都不会挡住底部安全区域，若设置为是，则滚动时滚动内容会挡住底部安全区域，但是当滚动到底部时才会避开底部安全区域
      useSafeAreaPlaceholder: {
        type: Boolean,
        default: u.gc("useSafeAreaPlaceholder", false)
      },
      // z-paging bottom的背景色，默认透明，传字符串，如"#ffffff"
      bottomBgColor: {
        type: String,
        default: u.gc("bottomBgColor", "")
      },
      // slot="top"的view的z-index，默认为99，仅使用页面滚动时有效
      topZIndex: {
        type: Number,
        default: u.gc("topZIndex", 99)
      },
      // z-paging内容容器父view的z-index，默认为1
      superContentZIndex: {
        type: Number,
        default: u.gc("superContentZIndex", 1)
      },
      // z-paging内容容器部分的z-index，默认为1
      contentZIndex: {
        type: Number,
        default: u.gc("contentZIndex", 1)
      },
      // z-paging二楼的z-index，默认为100
      f2ZIndex: {
        type: Number,
        default: u.gc("f2ZIndex", 100)
      },
      // 使用页面滚动时，是否在不满屏时自动填充满屏幕，默认为是
      autoFullHeight: {
        type: Boolean,
        default: u.gc("autoFullHeight", true)
      },
      // 是否监听列表触摸方向改变，默认为否
      watchTouchDirectionChange: {
        type: Boolean,
        default: u.gc("watchTouchDirectionChange", false)
      },
      // z-paging中布局的单位，默认为rpx
      unit: {
        type: String,
        default: u.gc("unit", "rpx")
      }
    },
    created() {
      if (this.createdReload && !this.refresherOnly && this.auto) {
        this._startLoading();
        this.$nextTick(this._preReload);
      }
    },
    mounted() {
      this.active = true;
      this.wxsPropType = u.getTime().toString();
      this.renderJsIgnore;
      if (!this.createdReload && !this.refresherOnly && this.auto) {
        u.delay(() => this.$nextTick(this._preReload), 0);
      }
      this.finalUseCache && this._setListByLocalCache();
      this.$nextTick(() => {
        this.systemInfo = uni.getSystemInfoSync();
        !this.usePageScroll && this.autoHeight && this._setAutoHeight();
        this.loaded = true;
        u.delay(() => {
          this.updateFixedLayout();
          this._updateCachedSuperContentHeight();
        });
      });
      this.updatePageScrollTopHeight();
      this.updatePageScrollBottomHeight();
      this.updateLeftAndRightWidth();
      if (this.finalRefresherEnabled && this.useCustomRefresher) {
        this.$nextTick(() => {
          this.isTouchmoving = true;
        });
      }
      this._onEmit();
      this.finalUseVirtualList && this._virtualListInit();
    },
    destroyed() {
      this._handleUnmounted();
    },
    unmounted() {
      this._handleUnmounted();
    },
    watch: {
      defaultThemeStyle: {
        handler(newVal) {
          if (newVal.length) {
            this.finalRefresherDefaultStyle = newVal;
          }
        },
        immediate: true
      },
      autoHeight(newVal) {
        this.loaded && !this.usePageScroll && this._setAutoHeight(newVal);
      },
      autoHeightAddition(newVal) {
        this.loaded && !this.usePageScroll && this.autoHeight && this._setAutoHeight(newVal);
      }
    },
    computed: {
      // 当前z-paging的内置样式
      finalPagingStyle() {
        const pagingStyle = { ...this.pagingStyle };
        if (!this.systemInfo)
          return pagingStyle;
        const { windowTop, windowBottom } = this;
        if (!this.usePageScroll && this.fixed) {
          if (windowTop && !pagingStyle.top) {
            pagingStyle.top = windowTop + "px";
          }
          if (windowBottom && !pagingStyle.bottom) {
            pagingStyle.bottom = windowBottom + "px";
          }
        }
        if (this.bgColor.length && !pagingStyle["background"]) {
          pagingStyle["background"] = this.bgColor;
        }
        if (this.height.length && !pagingStyle["height"]) {
          pagingStyle["height"] = this.height;
        }
        if (this.width.length && !pagingStyle["width"]) {
          pagingStyle["width"] = this.width;
        }
        if (this.maxWidth.length && !pagingStyle["max-width"]) {
          pagingStyle["max-width"] = this.maxWidth;
          pagingStyle["margin"] = "0 auto";
        }
        return pagingStyle;
      },
      // 当前z-paging内容的样式
      finalPagingContentStyle() {
        if (this.contentZIndex != 1) {
          this.pagingContentStyle["z-index"] = this.contentZIndex;
          this.pagingContentStyle["position"] = "relative";
        }
        return this.pagingContentStyle;
      },
      renderJsIgnore() {
        if (this.usePageScroll && this.useChatRecordMode || !this.refresherEnabled && this.scrollable || !this.useCustomRefresher) {
          this.$nextTick(() => {
            this.renderPropScrollTop = 10;
          });
        }
        return 0;
      },
      windowHeight() {
        if (!this.systemInfo)
          return 0;
        return this.systemInfo.windowHeight || 0;
      },
      windowBottom() {
        if (!this.systemInfo)
          return 0;
        let windowBottom = this.systemInfo.windowBottom || 0;
        if (this.safeAreaInsetBottom && !this.useSafeAreaPlaceholder && !this.useChatRecordMode) {
          windowBottom += this.safeAreaBottom;
        }
        return windowBottom;
      },
      isIosAndH5() {
        return false;
      }
    },
    methods: {
      // 当前版本号
      getVersion() {
        return `z-paging v${c.version}`;
      },
      // 设置nvue List的specialEffects
      setSpecialEffects(args) {
        this.setListSpecialEffects(args);
      },
      // 与setSpecialEffects等效，兼容旧版本
      setListSpecialEffects(args) {
        this.nFixFreezing = args && Object.keys(args).length;
        if (this.isIos) {
          this.privateRefresherEnabled = 0;
        }
        !this.usePageScroll && this.$refs["zp-n-list"].setSpecialEffects(args);
      },
      // 当app长时间进入后台后进入前台，因系统内存管理导致app重新加载时，进行一些适配处理
      _handlePageLaunch() {
        if (this.pageLaunched) {
          this.refresherThresholdUpdateTag = 1;
          this.$nextTick(() => {
            this.refresherThresholdUpdateTag = 0;
          });
          this._checkVirtualListScroll();
        }
        this.pageLaunched = true;
      },
      // 使手机发生较短时间的振动（15ms）
      _doVibrateShort() {
        if (this.isIos) {
          const UISelectionFeedbackGenerator = plus.ios.importClass("UISelectionFeedbackGenerator");
          const feedbackGenerator = new UISelectionFeedbackGenerator();
          feedbackGenerator.init();
          setTimeout(() => {
            feedbackGenerator.selectionChanged();
          }, 0);
        } else {
          plus.device.vibrate(15);
        }
      },
      // 设置z-paging高度
      async _setAutoHeight(shouldFullHeight = true, scrollViewNode = null) {
        const heightKey = "min-height";
        try {
          if (shouldFullHeight) {
            let finalScrollViewNode = scrollViewNode || await this._getNodeClientRect(".zp-scroll-view");
            let finalScrollBottomNode = await this._getNodeClientRect(".zp-page-bottom");
            if (finalScrollViewNode) {
              const scrollViewTop = finalScrollViewNode[0].top;
              let scrollViewHeight = this.windowHeight - scrollViewTop;
              scrollViewHeight -= finalScrollBottomNode ? finalScrollBottomNode[0].height : 0;
              const additionHeight = u.convertToPx(this.autoHeightAddition);
              const finalHeight = scrollViewHeight + additionHeight - (this.insideMore ? 1 : 0) + "px !important";
              this.$set(this.scrollViewStyle, heightKey, finalHeight);
              this.$set(this.scrollViewInStyle, heightKey, finalHeight);
            }
          } else {
            this.$delete(this.scrollViewStyle, heightKey);
            this.$delete(this.scrollViewInStyle, heightKey);
          }
        } catch (e) {
        }
      },
      // 组件销毁后续处理
      _handleUnmounted() {
        this.active = false;
        this._offEmit();
        this.useChatRecordMode && uni.offKeyboardHeightChange(this._handleKeyboardHeightChange);
      },
      // 触发更新是否超出页面状态
      _updateInsideOfPaging() {
        this.insideMore && this.insideOfPaging === true && setTimeout(this.doLoadMore, 200);
      },
      // 清除timeout
      _cleanTimeout(timeout2) {
        if (timeout2) {
          clearTimeout(timeout2);
          timeout2 = null;
        }
        return timeout2;
      },
      // 添加全局emit监听
      _onEmit() {
        uni.$on(c.errorUpdateKey, (errorMsg) => {
          if (this.loading) {
            if (!!errorMsg) {
              this.customerEmptyViewErrorText = errorMsg;
            }
            this.complete(false).catch(() => {
            });
          }
        });
        uni.$on(c.completeUpdateKey, (data) => {
          setTimeout(() => {
            if (this.loading) {
              if (!this.disabledCompleteEmit) {
                const type = data.type || "normal";
                const list = data.list || data;
                const rule = data.rule;
                this.fromCompleteEmit = true;
                switch (type) {
                  case "normal":
                    this.complete(list);
                    break;
                  case "total":
                    this.completeByTotal(list, rule);
                    break;
                  case "nomore":
                    this.completeByNoMore(list, rule);
                    break;
                  case "key":
                    this.completeByKey(list, rule);
                    break;
                }
              } else {
                this.disabledCompleteEmit = false;
              }
            }
          }, 1);
        });
      },
      // 销毁全局emit和listener监听
      _offEmit() {
        uni.$off(c.errorUpdateKey);
        uni.$off(c.completeUpdateKey);
      }
    }
  };
  const block0 = (Comp) => {
    (Comp.$wxs || (Comp.$wxs = [])).push("pagingWxs");
    (Comp.$wxsModules || (Comp.$wxsModules = {}))["pagingWxs"] = "bca0bb86";
  };
  const block1 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("pagingRenderjs");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["pagingRenderjs"] = "a5d206f8";
  };
  function _sfc_render$W(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_z_paging_refresh = vue.resolveComponent("z-paging-refresh");
    const _component_z_paging_load_more = vue.resolveComponent("z-paging-load-more");
    const _component_z_paging_empty_view = resolveEasycom(vue.resolveDynamicComponent("z-paging-empty-view"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass({ "z-paging-content": true, "z-paging-content-full": !_ctx.usePageScroll, "z-paging-content-fixed": !_ctx.usePageScroll && _ctx.fixed, "z-paging-content-page": _ctx.usePageScroll, "z-paging-reached-top": _ctx.renderPropScrollTop < 1, "z-paging-use-chat-record-mode": _ctx.useChatRecordMode }),
        style: vue.normalizeStyle([_ctx.finalPagingStyle])
      },
      [
        vue.createCommentVNode(" 二楼view "),
        _ctx.showF2 && _ctx.showRefresherF2 ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            onTouchmove: _cache[0] || (_cache[0] = vue.withModifiers(() => {
            }, ["stop", "prevent"])),
            class: "zp-f2-content",
            style: vue.normalizeStyle([{ "transform": _ctx.f2Transform, "transition": `transform .2s linear`, "height": _ctx.superContentHeight + "px", "z-index": _ctx.f2ZIndex }])
          },
          [
            vue.renderSlot(_ctx.$slots, "f2", {}, void 0, true)
          ],
          36
          /* STYLE, NEED_HYDRATION */
        )) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 顶部固定的slot "),
        !_ctx.usePageScroll && _ctx.zSlots.top ? vue.renderSlot(_ctx.$slots, "top", { key: 1 }, void 0, true) : _ctx.usePageScroll && _ctx.zSlots.top ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 2,
            class: "zp-page-top",
            onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers(() => {
            }, ["stop", "prevent"])),
            style: vue.normalizeStyle([{ "top": `${_ctx.windowTop}px`, "z-index": _ctx.topZIndex }])
          },
          [
            vue.renderSlot(_ctx.$slots, "top", {}, void 0, true)
          ],
          36
          /* STYLE, NEED_HYDRATION */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass({ "zp-view-super": true, "zp-scroll-view-super": !_ctx.usePageScroll }),
            style: vue.normalizeStyle([_ctx.finalScrollViewStyle])
          },
          [
            _ctx.zSlots.left ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: vue.normalizeClass({ "zp-page-left": true, "zp-absoulte": _ctx.finalIsOldWebView })
              },
              [
                vue.renderSlot(_ctx.$slots, "left", {}, void 0, true)
              ],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass({ "zp-scroll-view-container": true, "zp-absoulte": _ctx.finalIsOldWebView }),
                style: vue.normalizeStyle([_ctx.scrollViewContainerStyle])
              },
              [
                vue.createElementVNode("scroll-view", {
                  ref: "zp-scroll-view",
                  class: vue.normalizeClass({ "zp-scroll-view": true, "zp-scroll-view-absolute": !_ctx.usePageScroll, "zp-scroll-view-hide-scrollbar": !_ctx.showScrollbar }),
                  style: vue.normalizeStyle([_ctx.chatRecordRotateStyle]),
                  "scroll-top": _ctx.scrollTop,
                  "scroll-x": _ctx.scrollX,
                  "scroll-y": _ctx.finalScrollable,
                  "enable-back-to-top": _ctx.finalEnableBackToTop,
                  "show-scrollbar": _ctx.showScrollbar,
                  "scroll-with-animation": _ctx.finalScrollWithAnimation,
                  "scroll-into-view": _ctx.scrollIntoView,
                  "lower-threshold": _ctx.finalLowerThreshold,
                  "upper-threshold": 5,
                  "refresher-enabled": _ctx.finalRefresherEnabled && !_ctx.useCustomRefresher,
                  "refresher-threshold": _ctx.finalRefresherThreshold,
                  "refresher-default-style": _ctx.finalRefresherDefaultStyle,
                  "refresher-background": _ctx.refresherBackground,
                  "refresher-triggered": _ctx.finalRefresherTriggered,
                  onScroll: _cache[12] || (_cache[12] = (...args) => _ctx._scroll && _ctx._scroll(...args)),
                  onScrolltolower: _cache[13] || (_cache[13] = (...args) => _ctx._onScrollToLower && _ctx._onScrollToLower(...args)),
                  onScrolltoupper: _cache[14] || (_cache[14] = (...args) => _ctx._onScrollToUpper && _ctx._onScrollToUpper(...args)),
                  onRefresherrestore: _cache[15] || (_cache[15] = (...args) => _ctx._onRestore && _ctx._onRestore(...args)),
                  onRefresherrefresh: _cache[16] || (_cache[16] = ($event) => _ctx._onRefresh(true))
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: "zp-paging-touch-view",
                      onTouchstart: _cache[4] || (_cache[4] = (...args) => _ctx.pagingWxs.touchstart && _ctx.pagingWxs.touchstart(...args)),
                      onTouchmove: _cache[5] || (_cache[5] = (...args) => _ctx.pagingWxs.touchmove && _ctx.pagingWxs.touchmove(...args)),
                      onTouchend: _cache[6] || (_cache[6] = (...args) => _ctx.pagingWxs.touchend && _ctx.pagingWxs.touchend(...args)),
                      onTouchcancel: _cache[7] || (_cache[7] = (...args) => _ctx.pagingWxs.touchend && _ctx.pagingWxs.touchend(...args)),
                      onMousedown: _cache[8] || (_cache[8] = (...args) => _ctx.pagingWxs.mousedown && _ctx.pagingWxs.mousedown(...args)),
                      onMousemove: _cache[9] || (_cache[9] = (...args) => _ctx.pagingWxs.mousemove && _ctx.pagingWxs.mousemove(...args)),
                      onMouseup: _cache[10] || (_cache[10] = (...args) => _ctx.pagingWxs.mouseup && _ctx.pagingWxs.mouseup(...args)),
                      onMouseleave: _cache[11] || (_cache[11] = (...args) => _ctx.pagingWxs.mouseleave && _ctx.pagingWxs.mouseleave(...args))
                    },
                    [
                      _ctx.finalRefresherFixedBacHeight > 0 ? (vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          key: 0,
                          class: "zp-fixed-bac-view",
                          style: vue.normalizeStyle([{ "background": _ctx.refresherFixedBackground, "height": `${_ctx.finalRefresherFixedBacHeight}px` }])
                        },
                        null,
                        4
                        /* STYLE */
                      )) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode("view", {
                        class: "zp-paging-main",
                        style: vue.normalizeStyle([_ctx.scrollViewInStyle, { "transform": _ctx.finalRefresherTransform, "transition": _ctx.refresherTransition }]),
                        "change:prop": _ctx.pagingWxs.propObserver,
                        prop: vue.wp(_ctx.wxsPropType),
                        "data-refresherThreshold": _ctx.finalRefresherThreshold,
                        "data-refresherF2Enabled": _ctx.refresherF2Enabled,
                        "data-refresherF2Threshold": _ctx.finalRefresherF2Threshold,
                        "data-isIos": _ctx.isIos,
                        "data-loading": _ctx.loading || _ctx.isRefresherInComplete,
                        "data-useChatRecordMode": _ctx.useChatRecordMode,
                        "data-refresherEnabled": _ctx.refresherEnabled,
                        "data-useCustomRefresher": _ctx.useCustomRefresher,
                        "data-pageScrollTop": _ctx.wxsPageScrollTop,
                        "data-scrollTop": _ctx.wxsScrollTop,
                        "data-refresherMaxAngle": _ctx.refresherMaxAngle,
                        "data-refresherNoTransform": _ctx.refresherNoTransform,
                        "data-refresherAecc": _ctx.refresherAngleEnableChangeContinued,
                        "data-usePageScroll": _ctx.usePageScroll,
                        "data-watchTouchDirectionChange": _ctx.watchTouchDirectionChange,
                        "data-oldIsTouchmoving": _ctx.isTouchmoving,
                        "data-refresherOutRate": _ctx.finalRefresherOutRate,
                        "data-refresherPullRate": _ctx.finalRefresherPullRate,
                        "data-hasTouchmove": _ctx.hasTouchmove,
                        "change:renderPropIsIosAndH5": _ctx.pagingRenderjs.renderPropIsIosAndH5Change,
                        renderPropIsIosAndH5: vue.wp(_ctx.isIosAndH5)
                      }, [
                        _ctx.showRefresher ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 0,
                            class: "zp-custom-refresher-view",
                            style: vue.normalizeStyle([{ "margin-top": `-${_ctx.finalRefresherThreshold + _ctx.refresherThresholdUpdateTag}px`, "background": _ctx.refresherBackground, "opacity": _ctx.isTouchmoving ? 1 : 0 }])
                          },
                          [
                            vue.createElementVNode(
                              "view",
                              {
                                class: "zp-custom-refresher-container",
                                style: vue.normalizeStyle([{ "height": `${_ctx.finalRefresherThreshold}px`, "background": _ctx.refresherBackground }])
                              },
                              [
                                _ctx.useRefresherStatusBarPlaceholder ? (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 0,
                                    class: "zp-custom-refresher-status-bar-placeholder",
                                    style: vue.normalizeStyle([{ "height": `${_ctx.statusBarHeight}px` }])
                                  },
                                  null,
                                  4
                                  /* STYLE */
                                )) : vue.createCommentVNode("v-if", true),
                                vue.createCommentVNode(" 下拉刷新view "),
                                vue.createElementVNode("view", { class: "zp-custom-refresher-slot-view" }, [
                                  !(_ctx.zSlots.refresherComplete && _ctx.refresherStatus === _ctx.R.Complete) && !(_ctx.zSlots.refresherF2 && _ctx.refresherStatus === _ctx.R.GoF2) ? vue.renderSlot(_ctx.$slots, "refresher", {
                                    key: 0,
                                    refresherStatus: _ctx.refresherStatus
                                  }, void 0, true) : vue.createCommentVNode("v-if", true)
                                ]),
                                _ctx.zSlots.refresherComplete && _ctx.refresherStatus === _ctx.R.Complete ? vue.renderSlot(_ctx.$slots, "refresherComplete", { key: 1 }, void 0, true) : _ctx.zSlots.refresherF2 && _ctx.refresherStatus === _ctx.R.GoF2 ? vue.renderSlot(_ctx.$slots, "refresherF2", { key: 2 }, void 0, true) : !_ctx.showCustomRefresher ? (vue.openBlock(), vue.createBlock(_component_z_paging_refresh, {
                                  key: 3,
                                  ref: "refresh",
                                  class: "zp-custom-refresher-refresh",
                                  style: vue.normalizeStyle([{ "height": `${_ctx.finalRefresherThreshold - _ctx.finalRefresherThresholdPlaceholder}px` }]),
                                  status: _ctx.refresherStatus,
                                  defaultThemeStyle: _ctx.finalRefresherThemeStyle,
                                  defaultText: _ctx.finalRefresherDefaultText,
                                  pullingText: _ctx.finalRefresherPullingText,
                                  refreshingText: _ctx.finalRefresherRefreshingText,
                                  completeText: _ctx.finalRefresherCompleteText,
                                  goF2Text: _ctx.finalRefresherGoF2Text,
                                  defaultImg: _ctx.refresherDefaultImg,
                                  pullingImg: _ctx.refresherPullingImg,
                                  refreshingImg: _ctx.refresherRefreshingImg,
                                  completeImg: _ctx.refresherCompleteImg,
                                  refreshingAnimated: _ctx.refresherRefreshingAnimated,
                                  showUpdateTime: _ctx.showRefresherUpdateTime,
                                  updateTimeKey: _ctx.refresherUpdateTimeKey,
                                  updateTimeTextMap: _ctx.finalRefresherUpdateTimeTextMap,
                                  imgStyle: _ctx.refresherImgStyle,
                                  titleStyle: _ctx.refresherTitleStyle,
                                  updateTimeStyle: _ctx.refresherUpdateTimeStyle,
                                  unit: _ctx.unit
                                }, null, 8, ["style", "status", "defaultThemeStyle", "defaultText", "pullingText", "refreshingText", "completeText", "goF2Text", "defaultImg", "pullingImg", "refreshingImg", "completeImg", "refreshingAnimated", "showUpdateTime", "updateTimeKey", "updateTimeTextMap", "imgStyle", "titleStyle", "updateTimeStyle", "unit"])) : vue.createCommentVNode("v-if", true)
                              ],
                              4
                              /* STYLE */
                            )
                          ],
                          4
                          /* STYLE */
                        )) : vue.createCommentVNode("v-if", true),
                        vue.createElementVNode(
                          "view",
                          {
                            class: "zp-paging-container",
                            style: vue.normalizeStyle([{ justifyContent: _ctx.useChatRecordMode ? "flex-end" : "flex-start" }])
                          },
                          [
                            vue.createCommentVNode(" 全屏Loading "),
                            _ctx.showLoading && _ctx.zSlots.loading && !_ctx.loadingFullFixed ? vue.renderSlot(_ctx.$slots, "loading", { key: 0 }, void 0, true) : vue.createCommentVNode("v-if", true),
                            vue.createCommentVNode(" 主体内容 "),
                            vue.createElementVNode(
                              "view",
                              {
                                class: "zp-paging-container-content",
                                style: vue.normalizeStyle([_ctx.finalPagingContentStyle])
                              },
                              [
                                vue.createCommentVNode(" 虚拟列表顶部占位view "),
                                _ctx.useVirtualList ? (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 0,
                                    class: "zp-virtual-placeholder",
                                    style: vue.normalizeStyle([{ height: _ctx.virtualPlaceholderTopHeight + "px" }])
                                  },
                                  null,
                                  4
                                  /* STYLE */
                                )) : vue.createCommentVNode("v-if", true),
                                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
                                vue.createCommentVNode(" 内置列表&虚拟列表 "),
                                _ctx.finalUseInnerList ? (vue.openBlock(), vue.createElementBlock(
                                  vue.Fragment,
                                  { key: 1 },
                                  [
                                    vue.renderSlot(_ctx.$slots, "header", {}, void 0, true),
                                    vue.createElementVNode(
                                      "view",
                                      {
                                        class: "zp-list-container",
                                        style: vue.normalizeStyle([_ctx.innerListStyle])
                                      },
                                      [
                                        _ctx.finalUseVirtualList ? (vue.openBlock(true), vue.createElementBlock(
                                          vue.Fragment,
                                          { key: 0 },
                                          vue.renderList(_ctx.virtualList, (item, index2) => {
                                            return vue.openBlock(), vue.createElementBlock("view", {
                                              class: "zp-list-cell",
                                              style: vue.normalizeStyle([_ctx.innerCellStyle]),
                                              id: `${_ctx.fianlVirtualCellIdPrefix}-${item[_ctx.virtualCellIndexKey]}`,
                                              key: item["zp_unique_index"],
                                              onClick: ($event) => _ctx._innerCellClick(item, _ctx.virtualTopRangeIndex + index2)
                                            }, [
                                              _ctx.useCompatibilityMode ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, "使用兼容模式请在组件源码z-paging.vue第101行中注释这一行，并打开下面一行注释")) : (vue.openBlock(), vue.createElementBlock(
                                                vue.Fragment,
                                                { key: 1 },
                                                [
                                                  vue.createCommentVNode(' <zp-public-virtual-cell v-if="useCompatibilityMode" :extraData="extraData" :item="item" :index="virtualTopRangeIndex+index" /> '),
                                                  vue.renderSlot(_ctx.$slots, "cell", {
                                                    item,
                                                    index: _ctx.virtualTopRangeIndex + index2
                                                  }, void 0, true)
                                                ],
                                                2112
                                                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                              ))
                                            ], 12, ["id", "onClick"]);
                                          }),
                                          128
                                          /* KEYED_FRAGMENT */
                                        )) : (vue.openBlock(true), vue.createElementBlock(
                                          vue.Fragment,
                                          { key: 1 },
                                          vue.renderList(_ctx.realTotalData, (item, index2) => {
                                            return vue.openBlock(), vue.createElementBlock("view", {
                                              class: "zp-list-cell",
                                              key: index2,
                                              onClick: ($event) => _ctx._innerCellClick(item, index2)
                                            }, [
                                              vue.renderSlot(_ctx.$slots, "cell", {
                                                item,
                                                index: index2
                                              }, void 0, true)
                                            ], 8, ["onClick"]);
                                          }),
                                          128
                                          /* KEYED_FRAGMENT */
                                        ))
                                      ],
                                      4
                                      /* STYLE */
                                    ),
                                    vue.renderSlot(_ctx.$slots, "footer", {}, void 0, true)
                                  ],
                                  64
                                  /* STABLE_FRAGMENT */
                                )) : vue.createCommentVNode("v-if", true),
                                vue.createCommentVNode(" 聊天记录模式加载更多loading "),
                                _ctx.useChatRecordMode && _ctx.realTotalData.length >= _ctx.defaultPageSize && (_ctx.loadingStatus !== _ctx.M.NoMore || _ctx.zSlots.chatNoMore) && (_ctx.realTotalData.length || _ctx.showChatLoadingWhenReload && _ctx.showLoading) && !_ctx.isFirstPageAndNoMore ? (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 2,
                                    style: vue.normalizeStyle([_ctx.chatRecordRotateStyle])
                                  },
                                  [
                                    _ctx.loadingStatus === _ctx.M.NoMore && _ctx.zSlots.chatNoMore ? vue.renderSlot(_ctx.$slots, "chatNoMore", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock(
                                      vue.Fragment,
                                      { key: 1 },
                                      [
                                        _ctx.zSlots.chatLoading ? vue.renderSlot(_ctx.$slots, "chatLoading", {
                                          key: 0,
                                          loadingMoreStatus: _ctx.loadingStatus
                                        }, void 0, true) : (vue.openBlock(), vue.createBlock(_component_z_paging_load_more, {
                                          key: 1,
                                          onDoClick: _cache[2] || (_cache[2] = ($event) => _ctx._onLoadingMore("click")),
                                          zConfig: _ctx.zLoadMoreConfig
                                        }, null, 8, ["zConfig"]))
                                      ],
                                      64
                                      /* STABLE_FRAGMENT */
                                    ))
                                  ],
                                  4
                                  /* STYLE */
                                )) : vue.createCommentVNode("v-if", true),
                                vue.createCommentVNode(" 虚拟列表底部占位view "),
                                _ctx.useVirtualList ? (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 3,
                                    class: "zp-virtual-placeholder",
                                    style: vue.normalizeStyle([{ height: _ctx.virtualPlaceholderBottomHeight + "px" }])
                                  },
                                  null,
                                  4
                                  /* STYLE */
                                )) : vue.createCommentVNode("v-if", true),
                                vue.createCommentVNode(" 上拉加载更多view "),
                                _ctx.showLoadingMoreDefault ? vue.renderSlot(_ctx.$slots, "loadingMoreDefault", { key: 4 }, void 0, true) : _ctx.showLoadingMoreLoading ? vue.renderSlot(_ctx.$slots, "loadingMoreLoading", { key: 5 }, void 0, true) : _ctx.showLoadingMoreNoMore ? vue.renderSlot(_ctx.$slots, "loadingMoreNoMore", { key: 6 }, void 0, true) : _ctx.showLoadingMoreFail ? vue.renderSlot(_ctx.$slots, "loadingMoreFail", { key: 7 }, void 0, true) : _ctx.showLoadingMoreCustom ? (vue.openBlock(), vue.createBlock(_component_z_paging_load_more, {
                                  key: 8,
                                  onDoClick: _cache[3] || (_cache[3] = ($event) => _ctx._onLoadingMore("click")),
                                  zConfig: _ctx.zLoadMoreConfig
                                }, null, 8, ["zConfig"])) : vue.createCommentVNode("v-if", true),
                                _ctx.safeAreaInsetBottom && _ctx.useSafeAreaPlaceholder && !_ctx.useChatRecordMode ? (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 9,
                                    class: "zp-safe-area-placeholder",
                                    style: vue.normalizeStyle([{ height: _ctx.safeAreaBottom + "px" }])
                                  },
                                  null,
                                  4
                                  /* STYLE */
                                )) : vue.createCommentVNode("v-if", true)
                              ],
                              4
                              /* STYLE */
                            ),
                            vue.createCommentVNode(" 空数据图 "),
                            _ctx.showEmpty ? (vue.openBlock(), vue.createElementBlock(
                              "view",
                              {
                                key: 1,
                                class: vue.normalizeClass({ "zp-empty-view": true, "zp-empty-view-center": _ctx.emptyViewCenter }),
                                style: vue.normalizeStyle([_ctx.emptyViewSuperStyle, _ctx.chatRecordRotateStyle])
                              },
                              [
                                _ctx.zSlots.empty ? vue.renderSlot(_ctx.$slots, "empty", {
                                  key: 0,
                                  isLoadFailed: _ctx.isLoadFailed
                                }, void 0, true) : (vue.openBlock(), vue.createBlock(_component_z_paging_empty_view, {
                                  key: 1,
                                  emptyViewImg: _ctx.finalEmptyViewImg,
                                  emptyViewText: _ctx.finalEmptyViewText,
                                  showEmptyViewReload: _ctx.finalShowEmptyViewReload,
                                  emptyViewReloadText: _ctx.finalEmptyViewReloadText,
                                  isLoadFailed: _ctx.isLoadFailed,
                                  emptyViewStyle: _ctx.emptyViewStyle,
                                  emptyViewTitleStyle: _ctx.emptyViewTitleStyle,
                                  emptyViewImgStyle: _ctx.emptyViewImgStyle,
                                  emptyViewReloadStyle: _ctx.emptyViewReloadStyle,
                                  emptyViewZIndex: _ctx.emptyViewZIndex,
                                  emptyViewFixed: _ctx.emptyViewFixed,
                                  unit: _ctx.unit,
                                  onReload: _ctx._emptyViewReload,
                                  onViewClick: _ctx._emptyViewClick
                                }, null, 8, ["emptyViewImg", "emptyViewText", "showEmptyViewReload", "emptyViewReloadText", "isLoadFailed", "emptyViewStyle", "emptyViewTitleStyle", "emptyViewImgStyle", "emptyViewReloadStyle", "emptyViewZIndex", "emptyViewFixed", "unit", "onReload", "onViewClick"]))
                              ],
                              6
                              /* CLASS, STYLE */
                            )) : vue.createCommentVNode("v-if", true)
                          ],
                          4
                          /* STYLE */
                        )
                      ], 12, ["change:prop", "prop", "data-refresherThreshold", "data-refresherF2Enabled", "data-refresherF2Threshold", "data-isIos", "data-loading", "data-useChatRecordMode", "data-refresherEnabled", "data-useCustomRefresher", "data-pageScrollTop", "data-scrollTop", "data-refresherMaxAngle", "data-refresherNoTransform", "data-refresherAecc", "data-usePageScroll", "data-watchTouchDirectionChange", "data-oldIsTouchmoving", "data-refresherOutRate", "data-refresherPullRate", "data-hasTouchmove", "change:renderPropIsIosAndH5", "renderPropIsIosAndH5"])
                    ],
                    32
                    /* NEED_HYDRATION */
                  )
                ], 46, ["scroll-top", "scroll-x", "scroll-y", "enable-back-to-top", "show-scrollbar", "scroll-with-animation", "scroll-into-view", "lower-threshold", "refresher-enabled", "refresher-threshold", "refresher-default-style", "refresher-background", "refresher-triggered"])
              ],
              6
              /* CLASS, STYLE */
            ),
            _ctx.zSlots.right ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 1,
                class: vue.normalizeClass({ "zp-page-right": true, "zp-absoulte zp-right": _ctx.finalIsOldWebView })
              },
              [
                vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
              ],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        ),
        vue.createCommentVNode(" 底部固定的slot "),
        vue.createElementVNode(
          "view",
          {
            class: "zp-page-bottom-container",
            style: vue.normalizeStyle({ "background": _ctx.bottomBgColor })
          },
          [
            !_ctx.usePageScroll && _ctx.zSlots.bottom ? vue.renderSlot(_ctx.$slots, "bottom", { key: 0 }, void 0, true) : _ctx.usePageScroll && _ctx.zSlots.bottom ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 1,
                class: "zp-page-bottom",
                onTouchmove: _cache[17] || (_cache[17] = vue.withModifiers(() => {
                }, ["stop", "prevent"])),
                style: vue.normalizeStyle([{ "bottom": `${_ctx.windowBottom}px` }])
              },
              [
                vue.renderSlot(_ctx.$slots, "bottom", {}, void 0, true)
              ],
              36
              /* STYLE, NEED_HYDRATION */
            )) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" 聊天记录模式底部占位 "),
            _ctx.useChatRecordMode && _ctx.autoAdjustPositionWhenChat ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 2 },
              [
                vue.createElementVNode(
                  "view",
                  {
                    style: vue.normalizeStyle([{ height: _ctx.chatRecordModeSafeAreaBottom + "px" }])
                  },
                  null,
                  4
                  /* STYLE */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: "zp-page-bottom-keyboard-placeholder-animate",
                    style: vue.normalizeStyle([{ height: _ctx.keyboardHeight + "px" }])
                  },
                  null,
                  4
                  /* STYLE */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        ),
        vue.createCommentVNode(" 点击返回顶部view "),
        _ctx.showBackToTopClass ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 3,
            class: vue.normalizeClass(_ctx.finalBackToTopClass),
            style: vue.normalizeStyle([_ctx.finalBackToTopStyle]),
            onClick: _cache[18] || (_cache[18] = vue.withModifiers((...args) => _ctx._backToTopClick && _ctx._backToTopClick(...args), ["stop"]))
          },
          [
            _ctx.zSlots.backToTop ? vue.renderSlot(_ctx.$slots, "backToTop", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock("image", {
              key: 1,
              class: vue.normalizeClass(["zp-back-to-top-img", { "zp-back-to-top-img-inversion": _ctx.useChatRecordMode && !_ctx.backToTopImg.length }]),
              src: _ctx.backToTopImg.length ? _ctx.backToTopImg : _ctx.base64BackToTop
            }, null, 10, ["src"]))
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 全屏Loading(铺满z-paging并固定) "),
        _ctx.showLoading && _ctx.zSlots.loading && _ctx.loadingFullFixed ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 4,
          class: "zp-loading-fixed"
        }, [
          vue.renderSlot(_ctx.$slots, "loading", {}, void 0, true)
        ])) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  if (typeof block0 === "function")
    block0(_sfc_main$X);
  if (typeof block1 === "function")
    block1(_sfc_main$X);
  const __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["render", _sfc_render$W], ["__scopeId", "data-v-1aa372d7"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/z-paging/components/z-paging/z-paging.vue"]]);
  const _sfc_main$W = {
    __name: "mid-area-item",
    props: {
      pageName: {
        type: String,
        default: ""
      },
      refresh: {
        type: Boolean,
        default: true
      },
      customStyle: {
        type: Object,
        default: () => {
        }
      }
    },
    emits: ["onRefresh", "onScrollToLower"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const emits = __emit;
      const page2 = vue.ref(null);
      const props2 = __props;
      const onRefresh = () => {
        emits("onRefresh");
      };
      const endRefresh = () => {
        page2.value.endRefresh();
      };
      const onScrollToLower = () => {
        emits("onScrollToLower");
      };
      __expose({
        endRefresh
      });
      const __returned__ = { emits, page: page2, props: props2, onRefresh, endRefresh, onScrollToLower, ref: vue.ref, loadingVue };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$V(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_load_more = resolveEasycom(vue.resolveDynamicComponent("uv-load-more"), __easycom_0$6);
    const _component_z_paging = resolveEasycom(vue.resolveDynamicComponent("z-paging"), __easycom_1$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "item" }, [
      vue.createVNode(_component_z_paging, {
        ref: "page",
        "refresher-enabled": $props.refresh,
        fixed: false,
        width: "100%",
        height: "100%",
        "refresher-only": "",
        onOnRefresh: $setup.onRefresh,
        onScrolltolower: $setup.onScrollToLower
      }, {
        refresher: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "loading" }, [
            vue.createVNode($setup["loadingVue"], { type: "pulldown" })
          ])
        ]),
        loadingMoreDefault: vue.withCtx(() => [
          vue.createVNode(_component_uv_load_more, {
            status: "loading",
            "loading-text": "努力加载中..."
          })
        ]),
        default: vue.withCtx(() => [
          vue.createElementVNode(
            "view",
            {
              class: "scroll-box",
              style: vue.normalizeStyle($props.customStyle)
            },
            [
              vue.createElementVNode("view", { class: "container" }, [
                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ])
            ],
            4
            /* STYLE */
          )
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["refresher-enabled"])
    ]);
  }
  const midAreaItemVue = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["render", _sfc_render$V], ["__scopeId", "data-v-ca4c25e2"], ["__file", "D:/APP/novel-app/novel-app/components/home/mid-area/mid-area-item.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config2 = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject2) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config2
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config: config2
        } = obj;
        this._animateRun(styles, config2).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config2 = {}) {
      this.animation.step(config2);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$V = {
    name: "uv-transition",
    mixins: [mpMixin, mixin],
    emits: ["click", "change"],
    props: {
      // 是否展示组件
      show: {
        type: Boolean,
        default: false
      },
      // 使用的动画模式
      mode: {
        type: [Array, String, null],
        default() {
          return "fade";
        }
      },
      // 动画的执行时间，单位ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 使用的动画过渡函数
      timingFunction: {
        type: String,
        default: "ease-out"
      },
      customClass: {
        type: String,
        default: ""
      },
      // nvue模式下 是否直接显示，在uv-list等cell下面使用就需要设置
      cellChild: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 初始化动画条件
      transformStyles() {
        const style = {
          transform: this.transform,
          opacity: this.opacity,
          ...this.$uv.addStyle(this.customStyle),
          "transition-duration": `${this.duration / 1e3}s`
        };
        return this.$uv.addStyle(style, "string");
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: this.timingFunction,
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config2 = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uv-transition/components/uv-transition/uv-transition.vue:166", `方法 ${i} 不存在`);
          }
        }
        this.animation.step(config2);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过渡动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.mode === "string") {
          buildStyle(type, this.mode);
        } else {
          this.mode.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.mode === "string") {
          buildTranfrom(type, this.mode);
        } else {
          this.mode.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 1 : 0,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name2) {
        return name2.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$U(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["render", _sfc_render$U], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-transition/components/uv-transition/uv-transition.vue"]]);
  const props$a = {
    props: {
      // 图片地址
      src: {
        type: String,
        default: ""
      },
      // 裁剪模式
      mode: {
        type: String,
        default: "aspectFill"
      },
      // 宽度，单位任意
      width: {
        type: [String, Number],
        default: "300"
      },
      // 高度，单位任意
      height: {
        type: [String, Number],
        default: "225"
      },
      // 图片形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: "square"
      },
      // 圆角，单位任意
      radius: {
        type: [String, Number],
        default: 0
      },
      // 是否懒加载，微信小程序、App、百度小程序、字节跳动小程序
      lazyLoad: {
        type: Boolean,
        default: true
      },
      // 是否开启observer懒加载，nvue不生效
      observeLazyLoad: {
        type: Boolean,
        default: false
      },
      // 开启长按图片显示识别微信小程序码菜单
      showMenuByLongpress: {
        type: Boolean,
        default: true
      },
      // 加载中的图标，或者小图片
      loadingIcon: {
        type: String,
        default: "photo"
      },
      // 加载失败的图标，或者小图片
      errorIcon: {
        type: String,
        default: "error-circle"
      },
      // 是否显示加载中的图标或者自定义的slot
      showLoading: {
        type: Boolean,
        default: true
      },
      // 是否显示加载错误的图标或者自定义的slot
      showError: {
        type: Boolean,
        default: true
      },
      // 是否需要淡入效果
      fade: {
        type: Boolean,
        default: true
      },
      // 只支持网络资源，只对微信小程序有效
      webp: {
        type: Boolean,
        default: false
      },
      // 过渡时间，单位ms
      duration: {
        type: [String, Number],
        default: 500
      },
      // 背景颜色，用于深色页面加载图片时，为了和背景色融合
      bgColor: {
        type: String,
        default: "#f3f4f6"
      },
      // nvue模式下 是否直接显示，在uv-list等cell下面使用就需要设置
      cellChild: {
        type: Boolean,
        default: false
      },
      ...(_n = (_m = uni.$uv) == null ? void 0 : _m.props) == null ? void 0 : _n.image
    }
  };
  const _sfc_main$U = {
    name: "uv-image",
    emits: ["click", "load", "error"],
    mixins: [mpMixin, mixin, props$a],
    data() {
      return {
        // 图片是否加载错误，如果是，则显示错误占位图
        isError: false,
        // 初始化组件时，默认为加载中状态
        loading: true,
        // 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
        backgroundStyle: {},
        // 用于fade模式的控制组件显示与否
        show: false,
        // 是否开启图片出现在可视范围进行加载（另一种懒加载）
        observeShow: !this.observeLazyLoad,
        elIndex: "",
        // 因为props的值无法修改，故需要一个中间值
        imgWidth: this.width,
        // 因为props的值无法修改，故需要一个中间值
        imgHeight: this.height,
        thresholdValue: 50
      };
    },
    watch: {
      src: {
        immediate: true,
        handler(n) {
          if (!n) {
            this.isError = true;
          } else {
            this.isError = false;
            this.loading = true;
          }
        }
      },
      width(newVal) {
        this.show = false;
        this.$uv.sleep(2).then((res) => {
          this.show = true;
        });
        this.imgWidth = newVal;
      },
      height(newVal) {
        this.show = false;
        this.$uv.sleep(2).then((res) => {
          this.show = true;
        });
        this.imgHeight = newVal;
      }
    },
    computed: {
      wrapStyle() {
        let style = {};
        if (this.mode !== "heightFix") {
          style.width = this.$uv.addUnit(this.imgWidth);
        }
        if (this.mode !== "widthFix") {
          style.height = this.$uv.addUnit(this.imgHeight);
        }
        style.borderRadius = this.shape == "circle" ? "10000px" : this.$uv.addUnit(this.radius);
        style.overflow = this.radius > 0 ? "hidden" : "visible";
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      imageStyle() {
        let style = {};
        style.borderRadius = this.shape == "circle" ? "10000px" : this.$uv.addUnit(this.radius);
        return style;
      }
    },
    created() {
      this.elIndex = this.$uv.guid();
      this.observer = {};
      this.observerName = "lazyLoadContentObserver";
    },
    mounted() {
      this.show = true;
      this.$nextTick(() => {
        if (this.observeLazyLoad)
          this.observerFn();
      });
    },
    methods: {
      // 点击图片
      onClick() {
        this.$emit("click");
      },
      // 图片加载失败
      onErrorHandler(err) {
        this.loading = false;
        this.isError = true;
        this.$emit("error", err);
      },
      // 图片加载完成，标记loading结束
      onLoadHandler(event) {
        if (this.mode == "widthFix")
          this.imgHeight = "auto";
        if (this.mode == "heightFix")
          this.imgWidth = "auto";
        this.loading = false;
        this.isError = false;
        this.$emit("load", event);
        this.removeBgColor();
      },
      // 移除图片的背景色
      removeBgColor() {
        this.backgroundStyle = {
          backgroundColor: "transparent"
        };
      },
      // 观察图片是否在可见视口
      observerFn() {
        this.$nextTick(() => {
          uni.$once("onLazyLoadReachBottom", () => {
            if (!this.observeShow)
              this.observeShow = true;
          });
        });
        setTimeout(() => {
          this.disconnectObserver(this.observerName);
          const contentObserver = uni.createIntersectionObserver(this);
          contentObserver.relativeToViewport({
            bottom: this.thresholdValue
          }).observe(`.uv-image--${this.elIndex}`, (res) => {
            if (res.intersectionRatio > 0) {
              this.observeShow = true;
              this.disconnectObserver(this.observerName);
            }
          });
          this[this.observerName] = contentObserver;
        }, 50);
      },
      disconnectObserver(observerName) {
        const observer = this[observerName];
        observer && observer.disconnect();
      }
    }
  };
  function _sfc_render$T(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_3);
    return $data.show ? (vue.openBlock(), vue.createBlock(_component_uv_transition, {
      key: 0,
      show: $data.show,
      mode: "fade",
      duration: _ctx.fade ? _ctx.duration : 0,
      "cell-child": _ctx.cellChild,
      "custom-style": $options.wrapStyle
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uv-image", [`uv-image--${$data.elIndex}`]]),
            onClick: _cache[2] || (_cache[2] = (...args) => $options.onClick && $options.onClick(...args)),
            style: vue.normalizeStyle([$options.wrapStyle, $data.backgroundStyle])
          },
          [
            !$data.isError && $data.observeShow ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              src: _ctx.src,
              mode: _ctx.mode,
              onError: _cache[0] || (_cache[0] = (...args) => $options.onErrorHandler && $options.onErrorHandler(...args)),
              onLoad: _cache[1] || (_cache[1] = (...args) => $options.onLoadHandler && $options.onLoadHandler(...args)),
              "show-menu-by-longpress": _ctx.showMenuByLongpress,
              "lazy-load": _ctx.lazyLoad,
              class: "uv-image__image",
              style: vue.normalizeStyle([$options.imageStyle]),
              webp: _ctx.webp
            }, null, 44, ["src", "mode", "show-menu-by-longpress", "lazy-load", "webp"])) : vue.createCommentVNode("v-if", true),
            _ctx.showLoading && $data.loading ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 1,
                class: "uv-image__loading",
                style: vue.normalizeStyle({
                  borderRadius: _ctx.shape == "circle" ? "50%" : _ctx.$uv.addUnit(_ctx.radius),
                  backgroundColor: _ctx.bgColor,
                  width: _ctx.$uv.addUnit(_ctx.width),
                  height: _ctx.$uv.addUnit(_ctx.height)
                })
              },
              [
                vue.renderSlot(_ctx.$slots, "loading", {}, () => [
                  vue.createVNode(_component_uv_icon, {
                    name: _ctx.loadingIcon,
                    width: _ctx.width,
                    height: _ctx.height
                  }, null, 8, ["name", "width", "height"])
                ], true)
              ],
              4
              /* STYLE */
            )) : vue.createCommentVNode("v-if", true),
            _ctx.showError && $data.isError && !$data.loading ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 2,
                class: "uv-image__error",
                style: vue.normalizeStyle({
                  borderRadius: _ctx.shape == "circle" ? "50%" : _ctx.$uv.addUnit(_ctx.radius),
                  width: _ctx.$uv.addUnit(_ctx.width),
                  height: _ctx.$uv.addUnit(_ctx.height)
                })
              },
              [
                vue.renderSlot(_ctx.$slots, "error", {}, () => [
                  vue.createVNode(_component_uv_icon, {
                    name: _ctx.errorIcon,
                    width: _ctx.width,
                    height: _ctx.height
                  }, null, 8, ["name", "width", "height"])
                ], true)
              ],
              4
              /* STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        )
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "duration", "cell-child", "custom-style"])) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["render", _sfc_render$T], ["__scopeId", "data-v-8fe9e33e"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-image/components/uv-image/uv-image.vue"]]);
  const _sfc_main$T = {
    __name: "recommed",
    props: {
      isLoaded: {
        default: false,
        type: Boolean
      },
      novelList: {
        default: () => [],
        type: Array
      },
      current: {
        type: Number,
        default: 0
      }
    },
    emits: ["changeRank"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const store2 = useStore();
      const props2 = __props;
      const emits = __emit;
      const rankList = vue.ref([
        "推荐榜",
        "点击榜",
        "完本榜"
      ]);
      const changeRank = (index2) => {
        emits("changeRank", index2);
      };
      const goToNovelDetail = (detail) => {
        store2.commit("setCurrentNovelDetail", {
          ...detail,
          type: "novel"
        });
        uni.navigateTo({
          url: "/pages/nove-detail/index",
          animationType: "slide-in-right"
        });
      };
      const __returned__ = { store: store2, props: props2, emits, rankList, changeRank, goToNovelDetail, ref: vue.ref, loadingVue, get useStore() {
        return useStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$S(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_image = resolveEasycom(vue.resolveDynamicComponent("uv-image"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "recommend" }, [
      vue.createElementVNode("view", { class: "title" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.rankList, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("text", {
              class: vue.normalizeClass([$props.current == index2 ? "active" : ""]),
              key: index2,
              onClick: ($event) => $setup.changeRank(index2)
            }, vue.toDisplayString(item), 11, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", { class: "list" }, [
        vue.withDirectives(vue.createVNode(
          $setup["loadingVue"],
          null,
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, !$props.isLoaded]
        ]),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.novelList, (item, index2) => {
            return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
              class: "list-item",
              onClick: ($event) => $setup.goToNovelDetail(item),
              key: item.id
            }, [
              vue.createElementVNode("view", { class: "l" }, [
                vue.createVNode(_component_uv_image, {
                  src: item.cover,
                  "lazy-load": "",
                  observeLazyLoad: "",
                  fade: "",
                  loadingIcon: "photo-fill",
                  duration: "450",
                  radius: "5",
                  width: "50",
                  height: "60"
                }, null, 8, ["src"])
              ]),
              vue.createElementVNode("view", { class: "r" }, [
                vue.createElementVNode("view", { class: "name" }, [
                  vue.createElementVNode(
                    "text",
                    {
                      class: vue.normalizeClass(["num", index2 < 3 ? "advanced" : ""])
                    },
                    vue.toDisplayString(index2 + 1),
                    3
                    /* TEXT, CLASS */
                  ),
                  vue.createTextVNode(
                    " " + vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "info" }, [
                  vue.createTextVNode(
                    vue.toDisplayString(item.genre) + " ",
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item.author),
                    1
                    /* TEXT */
                  ),
                  vue.createCommentVNode(" <text>{{item.status}}</text> "),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item.words_count),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ], 8, ["onClick"])), [
              [vue.vShow, $props.isLoaded]
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const recommedVue = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["render", _sfc_render$S], ["__scopeId", "data-v-abb1f8e2"], ["__file", "D:/APP/novel-app/novel-app/components/home/mid-area/recommed.vue"]]);
  const _sfc_main$S = {
    __name: "novel-list",
    props: {
      novelList: {
        type: Array,
        default: () => []
      }
    },
    emits: ["onLayout"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const store2 = useStore();
      const instance = vue.getCurrentInstance();
      const emits = __emit;
      const props2 = __props;
      const firtLayoutWatcher = vue.watch(() => props2.novelList, () => {
        vue.nextTick(async () => {
          const listInfo = await getSelectorInfo(instance, ".list");
          emits("onLayout", listInfo);
        });
        firtLayoutWatcher();
      });
      const goToNovelDetail = (detail) => {
        const removeHtmlTags = (str) => str.replace(/<[^>]+>/g, "");
        store2.commit("setCurrentNovelDetail", {
          ...detail,
          name: removeHtmlTags(detail.name)
        });
        uni.navigateTo({
          url: "/pages/nove-detail/index",
          animationType: "slide-in-right"
        });
      };
      const __returned__ = { store: store2, instance, emits, props: props2, firtLayoutWatcher, goToNovelDetail, get useStore() {
        return useStore;
      }, getCurrentInstance: vue.getCurrentInstance, watch: vue.watch, nextTick: vue.nextTick, get getSelectorInfo() {
        return getSelectorInfo;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$R(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_image = resolveEasycom(vue.resolveDynamicComponent("uv-image"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "list-container" }, [
      vue.createElementVNode("view", { class: "list" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.novelList, (novel) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "item",
              key: novel.id,
              onClick: ($event) => $setup.goToNovelDetail(novel)
            }, [
              vue.createElementVNode("view", { class: "l" }, [
                vue.createVNode(_component_uv_image, {
                  src: novel.cover,
                  "lazy-load": "",
                  observeLazyLoad: "",
                  fade: "",
                  radius: "5",
                  width: "90",
                  height: "120"
                }, null, 8, ["src"])
              ]),
              vue.createElementVNode("view", { class: "r" }, [
                vue.createElementVNode("view", {
                  class: "name",
                  innerHTML: novel.name
                }, null, 8, ["innerHTML"]),
                vue.createElementVNode(
                  "view",
                  { class: "info" },
                  vue.toDisplayString(novel.intro),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "b" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "status" },
                    vue.toDisplayString(novel.status),
                    1
                    /* TEXT */
                  ),
                  vue.createTextVNode(
                    " " + vue.toDisplayString(novel.words_count),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const novelList = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["render", _sfc_render$R], ["__scopeId", "data-v-092baf5a"], ["__file", "D:/APP/novel-app/novel-app/components/common/novel-list.vue"]]);
  const _sfc_main$R = {
    __name: "guessyoulike",
    props: {
      novelList: {
        default: () => [],
        type: Array
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const __returned__ = { novelListVue: novelList };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$Q(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "guess-like-container" }, [
      vue.createElementVNode("view", { class: "title" }, "猜你喜欢"),
      vue.createVNode($setup["novelListVue"], { novelList: $props.novelList }, null, 8, ["novelList"])
    ]);
  }
  const guessyoulikeVue = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$Q], ["__scopeId", "data-v-a81469f6"], ["__file", "D:/APP/novel-app/novel-app/components/home/mid-area/guessyoulike.vue"]]);
  const eventBus = vue.reactive({
    events: {}
  });
  const EventBus = {
    // 注册事件，只允许一个函数
    on(event, callback) {
      if (!eventBus.events[event]) {
        eventBus.events[event] = callback;
      } else {
        formatAppLog("warn", "at utiles/eventBus.js:16", `${event}事件已存在`);
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
  const BASEURL = "http://192.168.0.100";
  const server = (url2, method = "get", data = {}) => {
    return new Promise((resolve, reject2) => {
      uni.request({
        url: BASEURL + url2,
        data,
        method,
        timeout: 1e4,
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject2(err);
          throw new Error("网络请求失败");
        }
      });
    });
  };
  class DB {
    constructor() {
      this.name = "_localStorage_novel";
      this.path = "_doc/novel_app.db";
      this.init();
    }
    async init() {
      try {
        if (!this.isDatabaseOpen()) {
          await this.openDatabase();
        }
        await this.createChaptersTable();
        await this.createHistoryTable();
        await this.createBookShellTable();
      } catch (error2) {
        formatAppLog("error", "at api/utils/db.js:23", "数据库初始化失败:", error2.message);
      }
    }
    // 插入章节
    async insertChapter(params) {
      if (!params || params.length !== 3) {
        formatAppLog("error", "at api/utils/db.js:29", "参数无效");
        return;
      }
      const [chapter_name, novel_id, chapter_n] = params;
      return new Promise((resolve, reject2) => {
        plus.sqlite.executeSql({
          name: this.name,
          sql: `INSERT INTO chapters (chapter_name, novel_id, chapter_n) VALUES ("${chapter_name}", ${novel_id}, ${chapter_n})`,
          success(result) {
            formatAppLog("log", "at api/utils/db.js:38", "插入成功");
            resolve();
          },
          fail(error2) {
            formatAppLog("error", "at api/utils/db.js:42", "插入失败:" + error2.message);
            reject2();
          }
        });
      });
    }
    async openDatabase() {
      try {
        await plus.sqlite.openDatabase({
          name: this.name,
          path: this.path
        });
        formatAppLog("log", "at api/utils/db.js:54", "数据库打开成功");
      } catch (error2) {
        formatAppLog("error", "at api/utils/db.js:56", "数据库打开失败:", error2.message);
      }
    }
    // 创建章节表
    async createChaptersTable() {
      try {
        await plus.sqlite.executeSql({
          name: this.name,
          sql: `CREATE TABLE IF NOT EXISTS chapters (
					id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
					chapter_name TEXT DEFAULT NULL, 
					novel_id INTEGER NOT NULL, 
					chapter_n INTEGER NOT NULL);`
        });
        formatAppLog("log", "at api/utils/db.js:70", "章节表创建成功或已存在");
      } catch (error2) {
        formatAppLog("error", "at api/utils/db.js:72", "创建章节表失败:", error2.message);
      }
    }
    // 创建历史表
    async createHistoryTable() {
      try {
        await plus.sqlite.executeSql({
          name: this.name,
          sql: `
					CREATE TABLE IF NOT EXISTS history (
					    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
					    novel_id INTEGER NOT NULL UNIQUE,
						name TEXT NOT NULL,  -- 小说名称
						cover TEXT,
						author TEXT NOT NULL,
						intro TEXT,
						genre TEXT,
						status TEXT NOT NULL DEFAULT '连载中', 
						words_count TEXT,
					    offsetY INTEGER DEFAULT 0,
					    chapter_n INTEGER NOT NULL,
					    chapter_name TEXT NOT NULL,
						read_time DATETIME DEFAULT CURRENT_TIMESTAMP,
						type TEXT Default 'novel'
					);
				`
        });
        formatAppLog("log", "at api/utils/db.js:99", "历史记录表创建成功或已存在");
      } catch (error2) {
        formatAppLog("error", "at api/utils/db.js:101", "创建历史记录表失败:", error2.message);
      }
    }
    // 是否存在历史记录
    async isExistHistory(novel_id, type = "novel") {
      const res = await this.select(`
			select *
			from history 
			where novel_id=${novel_id} 
				and 
			type='${type}'
		 `);
      return res;
    }
    // 书架中添加书
    insterBookShell({
      novel_id,
      name: name2,
      author,
      intro,
      cover,
      genre,
      status,
      words_count,
      type = "novel"
    }) {
      return new Promise((resolve, reject2) => {
        plus.sqlite.executeSql({
          name: this.name,
          sql: `INSERT INTO bookshell (novel_id, name, author, intro, cover, genre, status, words_count,type) 
			          VALUES (${novel_id}, '${name2}', '${author}', '${intro}', '${cover}', '${genre}', '${status}', '${words_count}','${type}')`,
          success(result) {
            formatAppLog("log", "at api/utils/db.js:133", `《${name2}》添加到书架成功`);
            resolve();
          },
          fail(error2) {
            formatAppLog("error", "at api/utils/db.js:137", `《${name2}》添加到书架失败`);
            formatAppLog("log", "at api/utils/db.js:138", error2);
            reject2();
          }
        });
      });
    }
    // 插入历史记录
    insertHistory(params) {
      const {
        novel_id,
        offsetY,
        chapter_n,
        chapter_name,
        type = "novel",
        intro,
        name: name2,
        cover,
        status,
        words_count,
        author,
        genre
      } = params;
      return new Promise((resolve, reject2) => {
        plus.sqlite.executeSql({
          name: this.name,
          sql: `
			INSERT INTO history
			(
			novel_id,
			offsetY,
			chapter_n,
			chapter_name,
			type,
			name,
			cover,
			status,
			words_count,
			author,
			genre,
			intro
			) 
			VALUES(
			${novel_id}, ${offsetY}, ${chapter_n},
			'${chapter_name}','${type}','${name2}',
			'${cover}','${status}','${words_count}',
			 '${author}','${genre}','${intro}')`,
          success(result) {
            formatAppLog("log", "at api/utils/db.js:185", "插入历史成功");
            formatAppLog("log", "at api/utils/db.js:186", 23123);
            resolve();
          },
          fail(error2) {
            formatAppLog("error", "at api/utils/db.js:190", "插入历史失败:" + error2.message);
            reject2();
          }
        });
      });
    }
    // 数据库是否打开
    isDatabaseOpen() {
      return plus.sqlite.isOpenDatabase({
        name: this.name,
        path: this.path
      });
    }
    // 查找数据
    async select(sql) {
      return new Promise((resolve, reject2) => {
        plus.sqlite.selectSql({
          name: this.name,
          sql,
          success(result) {
            resolve(result);
          },
          fail(err) {
            formatAppLog("log", "at api/utils/db.js:213", "查询失败:" + err.message);
            reject2();
          }
        });
      });
    }
    // 创建书架表
    async createBookShellTable() {
      try {
        await plus.sqlite.executeSql({
          name: this.name,
          sql: `
                CREATE TABLE IF NOT EXISTS bookshell (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- 自动递增的主键 
                    novel_id INTEGER NOT NULL UNIQUE,  -- 小说id
                    name TEXT NOT NULL,  -- 小说名称 
                    author TEXT,  -- 小说作者 
                    intro TEXT NOT NULL,  -- 小说简介 
                    cover TEXT,  -- 小说封面 
                    genre TEXT NOT NULL,  -- 小说题材 
                    status TEXT NOT NULL DEFAULT '连载中',  -- 小说状态(使用TEXT代替ENUM) 
                    words_count TEXT DEFAULT NULL,  -- 小说字数 (改为 INTEGER)
					type TEXT Default 'novel'
                );
            `
        });
        formatAppLog("log", "at api/utils/db.js:240", "书架表创建成功或已存在");
      } catch (error2) {
        formatAppLog("error", "at api/utils/db.js:242", "创建书架表失败:", error2.message);
      }
    }
    //  执行sql语句
    executeSql(sql) {
      return new Promise((resolve, rejecy) => {
        plus.sqlite.executeSql({
          name: this.name,
          sql,
          success(res) {
            resolve(res);
          },
          fail(err) {
            formatAppLog("error", "at api/utils/db.js:255", err.message);
            reject();
          }
        });
      });
    }
    // 关闭数据库
    async closeDatabase() {
      try {
        await plus.sqlite.closeDatabase({
          name: this.name,
          path: this.path
        });
        formatAppLog("log", "at api/utils/db.js:268", "数据库关闭成功！");
      } catch (error2) {
        formatAppLog("error", "at api/utils/db.js:270", "数据库关闭失败:", error2.message);
      }
    }
  }
  const getRecommendRank = (data) => server("/rank/recommend");
  const getFinishedRank = (data) => server("/rank/finished");
  const getGuessYouLike = (data) => server("/guessyoulike");
  const calculateCoverMainColor = (url2) => server(`/covermaincolor?url=${url2}`);
  const getNovelChapters = (novel_id) => server(`/novel/chapters?novel_id=${novel_id}`);
  const getChapterContent = (novel_id, chapter_n) => server(
    `/novel/chapter/content?novel_id=${novel_id}&content_id=${chapter_n}`
  );
  const getHotNovelList = () => server("/novel/hotnovels");
  const getNovelDetai = (novel_id) => server(`/novel/detail?novel_id=${novel_id}`);
  const searchNovel = (novel_name, author, offset, size = 10) => server(
    `/novel/search?novel_name=${novel_name}&author=${author}&offset=${offset}&size=${size}`
  );
  const getNovelAllClass = () => server("/novel/class");
  const getNovelByGenre = (genre, size, offset) => server(
    `/novel/getBookByGenre?genre=${genre}&size=${size}&offset=${offset}`
  );
  const searchBook = (keyword) => server(`/book/search?keyword=${keyword}`);
  const comicBoyRank = (gender) => server(`/comic/rank?gender=${gender}`);
  const getComicByCategory = (categoryName, size = 10) => server(
    `/comic/category?className=${categoryName}&size=${size}`
  );
  const getYourPersionalRecommend = (size = 10, offset = 0) => server(
    `/comic/recommend?size=${size}&offset=${offset}`
  );
  const getComicContent = (comic_name, chapter_n, device_width = 375) => server(
    `/comic/content?name=${comic_name}&chapter_n=${chapter_n}&device_width=${device_width}`
  );
  const getComicChapters = (comic_name) => server(`/comic/chapters?name=${comic_name}`);
  const searchComic = (comic_name, offset, size) => server(
    `/comic/search?name=${comic_name}&offset=${offset}&size=${size}`
  );
  const getComicAllClass = () => server("/comic/class");
  const getComicByGenre = (genre, size, offset) => server(
    `/comic/getBookByGenre?genre=${genre}&size=${size}&offset=${offset}`
  );
  const db = new DB();
  const closeDatabase = () => db.closeDatabase();
  const executeSql = (sql) => db.executeSql(sql);
  const selectSql = (sql) => db.select(sql);
  const insertChapter = (params) => db.insertChapter(params);
  const insertHistory = (params) => db.insertHistory(params);
  const isExistHistory = (novel_id, type = "novle") => db.isExistHistory(novel_id, type);
  const updateHistory = (novel_id, chapter_n, chapter_name, offsetY, type = "novel") => db.executeSql(`
		update history
		set chapter_n=${chapter_n},chapter_name='${chapter_name}', offsetY=${offsetY}, read_time = CURRENT_TIMESTAMP
		where novel_id = ${novel_id} and type='${type}'
`);
  const insterBookShell = (option) => db.insterBookShell(option);
  const getBookShellList = (type = "novel") => {
    if (type !== "all")
      return db.select(`select * from bookshell where type='${type}'`);
    else
      return db.select("select * from bookshell");
  };
  const isInBookShell = async (novel_id, type = "novel") => {
    const result = await db.select(`select * from bookshell where novel_id=${novel_id} and type='${type}'`);
    return result.length > 0;
  };
  const deleteFromBookShell = (novel_id, type = "novel") => db.executeSql(
    `delete from bookshell where novel_id=${novel_id} and type='${type}'`
  );
  const getBookShellCount = () => db.select("select count(*) as 'collections' from bookshell");
  const getBrowseCount = () => db.select("select count(*) as 'browseCount' from history");
  const getHistoryList = (type = "all", size = 10, offset = 0) => db.select(
    type == "all" ? `
	SELECT *
	FROM history
	ORDER BY read_time DESC;						
	` : `
	SELECT *
	FROM history
	WHERE type='${type}'
	ORDER BY read_time DESC
	LIMIT ${size}
	OFFSET ${offset}
	`
  );
  const deleteHistoryListById = (id) => db.executeSql(`DELETE FROM history WHERE id = ${id}`);
  const _sfc_main$Q = {
    __name: "novel",
    setup(__props, { expose: __expose }) {
      __expose();
      const novelPage = vue.ref(null);
      const rankList = vue.ref([]);
      const rankLists = vue.ref([]);
      const currentRank = vue.ref(0);
      const isRankListLoaded = vue.ref(false);
      const guessYouLikeList = vue.ref([]);
      vue.onMounted(async () => {
        handelChangeRank(0);
        getLikes();
      });
      const handelScrollLower = () => {
        getLikes();
      };
      const handelChangeRank = async (index2 = 0) => {
        isRankListLoaded.value = false;
        currentRank.value = index2;
        try {
          if (rankLists.value[index2]) {
            rankList.value = rankLists.value[index2];
          } else {
            if (index2 == 0 || index2 == 1) {
              const {
                data: recommends
              } = await getRecommendRank();
              rankLists.value[index2] = recommends;
              rankList.value = recommends;
            } else {
              const {
                data: recommends
              } = await getFinishedRank();
              rankLists.value[index2] = recommends;
              rankList.value = recommends;
            }
          }
          isRankListLoaded.value = true;
        } catch (e) {
          formatAppLog("log", "at components/home/novel.vue:69", e.message);
        }
      };
      const getLikes = async () => {
        let {
          data: likes
        } = await getGuessYouLike();
        likes = likes.map((item) => ({
          ...item,
          type: "novel"
        }));
        guessYouLikeList.value = [...guessYouLikeList.value, ...likes];
      };
      const handelRefresh = async () => {
        rankLists.value = [];
        await handelChangeRank(0);
        guessYouLikeList.value = [];
        await getLikes();
        novelPage.value.endRefresh();
      };
      const __returned__ = { novelPage, rankList, rankLists, currentRank, isRankListLoaded, guessYouLikeList, handelScrollLower, handelChangeRank, getLikes, handelRefresh, onMounted: vue.onMounted, ref: vue.ref, midAreaItemVue, recommedVue, guessyoulikeVue, get EventBus() {
        return EventBus;
      }, get getFinishedRank() {
        return getFinishedRank;
      }, get getGuessYouLike() {
        return getGuessYouLike;
      }, get getRecommendRank() {
        return getRecommendRank;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$P(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_load_more = resolveEasycom(vue.resolveDynamicComponent("uv-load-more"), __easycom_0$6);
    return vue.openBlock(), vue.createBlock(
      $setup["midAreaItemVue"],
      {
        ref: "novelPage",
        pageName: "novel",
        onOnRefresh: $setup.handelRefresh,
        onOnScrollToLower: $setup.handelScrollLower
      },
      {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "novel-page" }, [
            vue.createVNode($setup["recommedVue"], {
              current: $setup.currentRank,
              novelList: $setup.rankList,
              isLoaded: $setup.isRankListLoaded,
              onChangeRank: $setup.handelChangeRank
            }, null, 8, ["current", "novelList", "isLoaded"]),
            vue.createVNode($setup["guessyoulikeVue"], { novelList: $setup.guessYouLikeList }, null, 8, ["novelList"]),
            vue.createVNode(_component_uv_load_more, {
              status: "loading",
              "loading-text": "努力加载中..."
            })
          ])
        ]),
        _: 1
        /* STABLE */
      },
      512
      /* NEED_PATCH */
    );
  }
  const novelVue = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$P], ["__scopeId", "data-v-6332fa14"], ["__file", "D:/APP/novel-app/novel-app/components/home/novel.vue"]]);
  const _sfc_main$P = {
    __name: "comic-gender-recommend",
    props: {
      rankList: {
        type: Array,
        default: () => []
      }
    },
    emits: ["changeRank", "changeAchange"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const rankTitle = ["男生精选", "女生精选"];
      const rankIndex = vue.ref(0);
      const emits = __emit;
      const changeRank = async (index2) => {
        rankIndex.value = index2;
        emits("changeRank", index2);
      };
      const changeAchange = () => {
        emits("changeAchange");
      };
      const __returned__ = { rankTitle, rankIndex, emits, changeRank, changeAchange, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$O(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_image = resolveEasycom(vue.resolveDynamicComponent("uv-image"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "gender-recommend" }, [
      vue.createElementVNode("view", { class: "recommend-top" }, [
        vue.createElementVNode("view", { class: "title-list" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.rankTitle, (item, index2) => {
              return vue.createElementVNode("view", {
                class: vue.normalizeClass($setup.rankIndex == index2 ? "active" : ""),
                onClick: ($event) => $setup.changeRank(index2),
                key: index2
              }, vue.toDisplayString(item), 11, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", {
          class: "more",
          onClick: $setup.changeAchange
        }, [
          vue.createElementVNode("view", null, "换一换"),
          vue.createVNode(_component_uv_icon, {
            name: "reload",
            color: "#000",
            size: "14",
            bold: ""
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "list" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.rankList, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "item",
              key: item.id
            }, [
              vue.createVNode(_component_uv_image, {
                src: `http://192.168.0.100/comic/cover/${item.name}.png`,
                "lazy-load": "",
                observeLazyLoad: "",
                fade: "",
                radius: "5",
                width: "100%",
                height: "200rpx"
              }, null, 8, ["src"]),
              vue.createElementVNode(
                "view",
                { class: "name" },
                vue.toDisplayString(item.name),
                1
                /* TEXT */
              )
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const comicGenderRecommendVue = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$O], ["__scopeId", "data-v-b4943163"], ["__file", "D:/APP/novel-app/novel-app/pages/home/components/comic-gender-recommend.vue"]]);
  const useComicGenderRank = () => {
    const ranks = vue.ref([]);
    const rankIndex = vue.ref(0);
    const rankList = vue.computed(() => ranks.value[rankIndex.value]);
    const changeRank = async (index2) => {
      rankIndex.value = index2;
      if (!ranks.value[index2]) {
        await getRankList(index2);
      }
    };
    const changeAchange = async () => {
      await getRankList(rankIndex.value);
    };
    const getRankList = async (index2) => {
      const res = await comicBoyRank(rankIndex.value == 0 ? "boy" : "girl");
      ranks.value[index2] = res.data.data;
    };
    return {
      ranks,
      rankIndex,
      rankList,
      changeRank,
      changeAchange,
      getRankList
    };
  };
  const _sfc_main$O = {
    __name: "comic-hot-recommend",
    props: {
      comicList: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: " "
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const __returned__ = { ref: vue.ref, onMounted: vue.onMounted };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_image = resolveEasycom(vue.resolveDynamicComponent("uv-image"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "hot" }, [
      vue.createElementVNode("view", { class: "hot-top" }, [
        vue.createElementVNode("view", { class: "l" }, [
          vue.createVNode(_component_uv_icon, {
            name: "fire",
            color: "red",
            "custom-prefix": "custom-icon",
            size: "16"
          }),
          vue.createTextVNode(
            " " + vue.toDisplayString($props.title),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "r" }, [
          vue.createTextVNode(" 更多 "),
          vue.createVNode(_component_uv_icon, {
            name: "arrow-right",
            color: "#000",
            size: "12",
            bold: ""
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "comic-list" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.comicList, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "comic-item",
              key: item.id * (index2 + 1)
            }, [
              vue.createVNode(_component_uv_image, {
                src: `http://192.168.0.100/comic/cover/${item.name}.png`,
                "lazy-load": "",
                observeLazyLoad: "",
                fade: "",
                radius: "5",
                width: "100%",
                height: "150"
              }, null, 8, ["src"]),
              vue.createElementVNode(
                "view",
                { class: "name" },
                vue.toDisplayString(item.name),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "genre-list" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(item.genre.split(",").slice(0, 3), (genre, index3) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        class: "genre-item",
                        key: index3
                      },
                      vue.toDisplayString(genre),
                      1
                      /* TEXT */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const comicHotRecommendVue = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$N], ["__scopeId", "data-v-c9c12e74"], ["__file", "D:/APP/novel-app/novel-app/pages/home/components/comic-hot-recommend.vue"]]);
  const _sfc_main$N = {
    __name: "comic-more-recomend",
    props: {
      comicList: {
        type: Array,
        default: () => []
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const store2 = useStore();
      const goToDetail = (detail) => {
        store2.commit("setCurrentNovelDetail", {
          ...detail,
          type: "comic"
        });
        uni.navigateTo({
          url: "/pages/nove-detail/index"
        });
      };
      const __returned__ = { store: store2, goToDetail, get useStore() {
        return useStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_image = resolveEasycom(vue.resolveDynamicComponent("uv-image"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "more-recomend" }, [
      vue.createElementVNode("view", { class: "title" }, "专属你的热门推荐"),
      vue.createElementVNode("view", { class: "comic-list" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.comicList, (item, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              onClick: ($event) => $setup.goToDetail(item),
              class: "comic-item",
              key: item.id
            }, [
              vue.createVNode(_component_uv_image, {
                bgColor: "#fff",
                src: `http://192.168.0.100/comic/cover/${item.name}.png`,
                "lazy-load": "",
                observeLazyLoad: "",
                fade: "",
                width: "100%",
                height: "250"
              }, null, 8, ["src"]),
              vue.createElementVNode("view", { class: "bottom" }, [
                vue.createElementVNode(
                  "view",
                  { class: "comic-name" },
                  vue.toDisplayString(item.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "comic-genre" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(item.genre.split(","), (genre, index3) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "view",
                        { key: index3 },
                        vue.toDisplayString(genre),
                        1
                        /* TEXT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const comicMoreRecomendVue = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$M], ["__scopeId", "data-v-a1596809"], ["__file", "D:/APP/novel-app/novel-app/pages/home/components/comic-more-recomend.vue"]]);
  const _sfc_main$M = {
    __name: "comic",
    setup(__props, { expose: __expose }) {
      __expose();
      const {
        ranks,
        rankIndex,
        rankList,
        changeRank,
        changeAchange,
        getRankList
      } = useComicGenderRank();
      const comicPage = vue.ref(null);
      const store2 = useStore();
      const isLoading = vue.ref(true);
      const nationalComicList = vue.ref([]);
      const japaneseComicList = vue.ref([]);
      const personalRecommenList = vue.reactive({
        offset: 0,
        size: 10,
        list: []
      });
      const getNationalComic = async () => {
        const res = await getComicByCategory("国漫", 6);
        nationalComicList.value = res.data.data;
      };
      const getJapaneseComicList = async () => {
        const res = await getComicByCategory("日漫", 6);
        japaneseComicList.value = res.data.data;
      };
      const getRecommendList = async () => {
        const res = await getYourPersionalRecommend(personalRecommenList.size, personalRecommenList.offset);
        personalRecommenList.list = [...personalRecommenList.list, ...res.data.data];
      };
      const refreshGenderRecommend = async () => {
        const res = await comicBoyRank(0);
        ranks.value = [];
        ranks.value[0] = res.data.data;
        rankIndex.value = 0;
      };
      const handelScrollLower = async () => {
        personalRecommenList.offset += personalRecommenList.size;
        await getRecommendList();
      };
      vue.onMounted(async () => {
        EventBus.on("comic_show", async () => {
          await getRankList(0);
          await getNationalComic();
          await getJapaneseComicList();
          await getRecommendList();
          isLoading.value = false;
        });
      });
      const handelRefresh = async () => {
        await refreshGenderRecommend();
        await getNationalComic();
        await getJapaneseComicList();
        personalRecommenList.list = [];
        await getRecommendList();
        isLoading.value = false;
        comicPage.value.endRefresh();
      };
      const __returned__ = { ranks, rankIndex, rankList, changeRank, changeAchange, getRankList, comicPage, store: store2, isLoading, nationalComicList, japaneseComicList, personalRecommenList, getNationalComic, getJapaneseComicList, getRecommendList, refreshGenderRecommend, handelScrollLower, handelRefresh, ref: vue.ref, onMounted: vue.onMounted, computed: vue.computed, reactive: vue.reactive, midAreaItemVue, get comicBoyRank() {
        return comicBoyRank;
      }, get getComicByCategory() {
        return getComicByCategory;
      }, get getYourPersionalRecommend() {
        return getYourPersionalRecommend;
      }, get EventBus() {
        return EventBus;
      }, loadingVue, comicGenderRecommendVue, get useComicGenderRank() {
        return useComicGenderRank;
      }, comicHotRecommendVue, comicMoreRecomendVue, get useStore() {
        return useStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_load_more = resolveEasycom(vue.resolveDynamicComponent("uv-load-more"), __easycom_0$6);
    return vue.openBlock(), vue.createBlock(
      $setup["midAreaItemVue"],
      {
        ref: "comicPage",
        onOnRefresh: $setup.handelRefresh,
        onOnScrollToLower: $setup.handelScrollLower
      },
      {
        default: vue.withCtx(() => [
          $setup.isLoading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "loading-box"
          }, [
            vue.createVNode($setup["loadingVue"])
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "comic-page"
          }, [
            vue.createCommentVNode(" 男女精选 "),
            vue.createVNode($setup["comicGenderRecommendVue"], {
              onChangeAchange: $setup.changeAchange,
              rankList: $setup.rankList,
              onChangeRank: $setup.changeRank
            }, null, 8, ["onChangeAchange", "rankList", "onChangeRank"]),
            vue.createCommentVNode(" 国漫也精彩 "),
            vue.createVNode($setup["comicHotRecommendVue"], {
              title: "国漫也精彩",
              comicList: $setup.nationalComicList
            }, null, 8, ["comicList"]),
            vue.createCommentVNode(" 日漫大世界 "),
            vue.createVNode($setup["comicHotRecommendVue"], {
              title: "日漫大世界",
              comicList: $setup.japaneseComicList
            }, null, 8, ["comicList"]),
            vue.createCommentVNode(" 专属热门推荐 "),
            vue.createVNode($setup["comicMoreRecomendVue"], {
              comicList: $setup.personalRecommenList.list
            }, null, 8, ["comicList"]),
            vue.createVNode(_component_uv_load_more, {
              status: "loading",
              "loading-text": "努力加载中..."
            })
          ]))
        ]),
        _: 1
        /* STABLE */
      },
      512
      /* NEED_PATCH */
    );
  }
  const comicVue = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$L], ["__scopeId", "data-v-4e181cd3"], ["__file", "D:/APP/novel-app/novel-app/pages/home/components/comic.vue"]]);
  const useSlide = () => {
    const currentActiveTabbar = vue.ref(0);
    const tabBarList = vue.computed(() => pageList.value.map((item) => item.alias));
    const pageList = vue.ref([{
      name: "novel",
      alias: "小说",
      hasShown: true
    }, {
      name: "comic",
      alias: "漫画",
      hasShown: false
    }]);
    const currentPage = vue.computed(() => pageList.value[currentActiveTabbar.value]);
    const pageChange = (e) => {
      if (e == "l") {
        currentActiveTabbar.value--;
      } else if (e == "r") {
        currentActiveTabbar.value++;
      }
    };
    const handelTopChange = (e) => {
      currentActiveTabbar.value = e.index;
    };
    return {
      currentActiveTabbar,
      pageChange,
      handelTopChange,
      tabBarList,
      pageList,
      currentPage
    };
  };
  const _sfc_main$L = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const {
        currentActiveTabbar,
        pageChange,
        tabBarList,
        pageList,
        handelTopChange
      } = useSlide();
      const store2 = useStore();
      const midAreaHeight = vue.ref(0);
      const curentPage = vue.computed(() => pageList.value[currentActiveTabbar.value]);
      const topBackground = vue.ref([
        "linear-gradient(45deg, rgba(250, 223, 209,0.5), rgba(205, 254, 209,0.5))",
        "linear-gradient(45deg, rgba(254, 205, 240,0.5), rgba(204, 255, 209,0.5))"
      ]);
      vue.watch(curentPage, (newVal) => {
        if (!newVal.hasShown) {
          EventBus.emit(`${newVal.name}_show`);
          pageList.value[currentActiveTabbar.value] = {
            ...newVal,
            hasShown: true
          };
        }
      });
      const searchRecommendList = vue.ref([]);
      vue.onMounted(async () => {
        getMidAreaHeight();
        const res = await getHotNovelList();
        searchRecommendList.value = res.data.data;
        currentNovel.value = searchRecommendList.value[0].name;
        EventBus.on("changeTab", (tab) => {
          currentActiveTabbar.value = tab;
        });
      });
      const getMidAreaHeight = async () => {
        const instance = await vue.getCurrentInstance();
        const systemInfo2 = await getSystemInfo();
        const topInfo = await getSelectorInfo(instance, ".home-top");
        midAreaHeight.value = systemInfo2.windowHeight - topInfo.height;
      };
      const currentNovel = vue.ref("");
      const handelSwiperChange = (e) => {
        currentNovel.value = searchRecommendList.value[e.detail.current].name;
      };
      const goToSearch = () => {
        uni.navigateTo({
          url: `/pages/search/search?novel_name=${currentNovel.value}`
        });
      };
      const __returned__ = { currentActiveTabbar, pageChange, tabBarList, pageList, handelTopChange, store: store2, midAreaHeight, curentPage, topBackground, searchRecommendList, getMidAreaHeight, currentNovel, handelSwiperChange, goToSearch, topTabbarVue: topTabbar, midAreaVue: ComponentsHomeMidAreaMidArea, get getSystemInfo() {
        return getSystemInfo;
      }, get getSelectorInfo() {
        return getSelectorInfo;
      }, novelVue, comicVue, get useStore() {
        return useStore;
      }, onMounted: vue.onMounted, ref: vue.ref, getCurrentInstance: vue.getCurrentInstance, provide: vue.provide, computed: vue.computed, watch: vue.watch, get getHotNovelList() {
        return getHotNovelList;
      }, get useSlide() {
        return useSlide;
      }, get EventBus() {
        return EventBus;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "home bcg-color-white" }, [
      vue.createElementVNode(
        "view",
        {
          class: "home-top",
          style: vue.normalizeStyle({ background: $setup.topBackground[$setup.currentActiveTabbar] })
        },
        [
          vue.createElementVNode("view", { class: "status-bar" }),
          vue.createElementVNode("view", {
            class: "search-box bcg-color-white",
            onClick: $setup.goToSearch
          }, [
            vue.createVNode(_component_uv_icon, {
              name: "search",
              color: "#989898",
              size: "24"
            }),
            vue.createElementVNode(
              "swiper",
              {
                onChange: $setup.handelSwiperChange,
                "disable-touch": "",
                "indicator-dots": false,
                autoplay: true,
                circular: "",
                vertical: "",
                interval: 3e3,
                duration: 1e3
              },
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.searchRecommendList, (item, index2) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "swiper-item",
                      {
                        key: item.id
                      },
                      vue.toDisplayString(item.name),
                      1
                      /* TEXT */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              32
              /* NEED_HYDRATION */
            )
          ]),
          vue.createCommentVNode(" 顶部导航栏 "),
          vue.createVNode($setup["topTabbarVue"], {
            tabBarList: $setup.tabBarList,
            value: $setup.currentActiveTabbar,
            onChange: $setup.handelTopChange
          }, null, 8, ["tabBarList", "value", "onChange"])
        ],
        4
        /* STYLE */
      ),
      vue.createCommentVNode(" 中部内容显示区 "),
      vue.createVNode($setup["midAreaVue"], {
        height: $setup.midAreaHeight,
        length: $setup.tabBarList.length,
        pageName: $setup.curentPage.name,
        current: $setup.currentActiveTabbar,
        onPageChange: $setup.pageChange
      }, {
        default: vue.withCtx(() => [
          vue.createCommentVNode(" 小说模块 "),
          vue.createVNode($setup["novelVue"]),
          vue.createCommentVNode(" 漫画模块 "),
          vue.createVNode($setup["comicVue"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["height", "length", "pageName", "current", "onPageChange"])
    ]);
  }
  const PagesHomeIndex = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$K], ["__scopeId", "data-v-4978fed5"], ["__file", "D:/APP/novel-app/novel-app/pages/home/index.vue"]]);
  const props$9 = {
    props: {
      // 文字颜色
      color: {
        type: String,
        default: ""
      },
      // 字体大小，单位px
      fontSize: {
        type: [String, Number],
        default: 14
      },
      // 是否显示下划线
      underLine: {
        type: Boolean,
        default: false
      },
      // 要跳转的链接
      href: {
        type: String,
        default: ""
      },
      // 小程序中复制到粘贴板的提示语
      mpTips: {
        type: String,
        default: "链接已复制，请在浏览器打开"
      },
      // 下划线颜色
      lineColor: {
        type: String,
        default: ""
      },
      // 超链接的问题，不使用slot形式传入，是因为nvue下无法修改颜色
      text: {
        type: String,
        default: ""
      },
      ...(_p = (_o = uni.$uv) == null ? void 0 : _o.props) == null ? void 0 : _p.link
    }
  };
  const _sfc_main$K = {
    name: "uv-link",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$9],
    computed: {
      linkStyle() {
        const style = {
          color: this.color,
          fontSize: this.$uv.addUnit(this.fontSize),
          // line-height设置为比字体大小多2px
          lineHeight: this.$uv.addUnit(this.$uv.getPx(this.fontSize) + 2),
          textDecoration: this.underLine ? "underline" : "none"
        };
        return style;
      }
    },
    methods: {
      openLink() {
        plus.runtime.openURL(this.href);
        this.$emit("click");
      }
    }
  };
  function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        class: "uv-link",
        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.openLink && $options.openLink(...args), ["stop"])),
        style: vue.normalizeStyle([$options.linkStyle, _ctx.$uv.addStyle(_ctx.customStyle)])
      },
      vue.toDisplayString(_ctx.text),
      5
      /* TEXT, STYLE */
    );
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$J], ["__scopeId", "data-v-86e87617"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-link/components/uv-link/uv-link.vue"]]);
  const value = {
    computed: {
      // 经处理后需要显示的值
      value() {
        const {
          text,
          mode,
          format,
          href
        } = this;
        if (mode === "price") {
          if (!/^\d+(\.\d+)?$/.test(text)) {
            error$1("金额模式下，text参数需要为金额格式");
          }
          if (func(format)) {
            return format(text);
          }
          return priceFormat(text, 2);
        }
        if (mode === "date") {
          !date(text) && error$1("日期模式下，text参数需要为日期或时间戳格式");
          if (func(format)) {
            return format(text);
          }
          if (format) {
            return timeFormat(text, format);
          }
          return timeFormat(text, "yyyy-mm-dd");
        }
        if (mode === "phone") {
          if (func(format)) {
            return format(text);
          }
          if (format === "encrypt") {
            return `${text.substr(0, 3)}****${text.substr(7)}`;
          }
          return text;
        }
        if (mode === "name") {
          !(typeof text === "string") && error$1("姓名模式下，text参数需要为字符串格式");
          if (func(format)) {
            return format(text);
          }
          if (format === "encrypt") {
            return this.formatName(text);
          }
          return text;
        }
        if (mode === "link") {
          !url(href) && error$1("超链接模式下，href参数需要为URL格式");
          return text;
        }
        return text;
      }
    },
    methods: {
      // 默认的姓名脱敏规则
      formatName(name2) {
        let value2 = "";
        if (name2.length === 2) {
          value2 = name2.substr(0, 1) + "*";
        } else if (name2.length > 2) {
          let char = "";
          for (let i = 0, len = name2.length - 2; i < len; i++) {
            char += "*";
          }
          value2 = name2.substr(0, 1) + char + name2.substr(-1, 1);
        } else {
          value2 = name2;
        }
        return value2;
      }
    }
  };
  const props$8 = {
    props: {
      // 主题颜色
      type: {
        type: String,
        default: ""
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },
      // 显示的值
      text: {
        type: [String, Number],
        default: ""
      },
      // 前置图标
      prefixIcon: {
        type: String,
        default: ""
      },
      // 后置图标
      suffixIcon: {
        type: String,
        default: ""
      },
      // 文本处理的匹配模式
      // text-普通文本，price-价格，phone-手机号，name-姓名，date-日期，link-超链接
      mode: {
        type: String,
        default: ""
      },
      // mode=link下，配置的链接
      href: {
        type: String,
        default: ""
      },
      // 格式化规则
      format: {
        type: [String, Function],
        default: ""
      },
      // mode=phone时，点击文本是否拨打电话
      call: {
        type: Boolean,
        default: true
      },
      // 小程序的打开方式
      openType: {
        type: String,
        default: ""
      },
      // 是否粗体，默认normal
      bold: {
        type: Boolean,
        default: false
      },
      // 是否块状
      block: {
        type: Boolean,
        default: false
      },
      // 文本显示的行数，如果设置，超出此行数，将会显示省略号
      lines: {
        type: [String, Number],
        default: ""
      },
      // 文本颜色
      color: {
        type: String,
        default: "#303133"
      },
      // 字体大小
      size: {
        type: [String, Number],
        default: 15
      },
      // 图标的样式
      iconStyle: {
        type: [Object, String],
        default: () => ({
          fontSize: "15px"
        })
      },
      // 文字装饰，下划线，中划线等，可选值 none|underline|line-through
      decoration: {
        type: String,
        default: "none"
      },
      // 外边距，对象、字符串，数值形式均可
      margin: {
        type: [Object, String, Number],
        default: 0
      },
      // 文本行高
      lineHeight: {
        type: [String, Number],
        default: ""
      },
      // 文本对齐方式，可选值left|center|right
      align: {
        type: String,
        default: "left"
      },
      // 文字换行，可选值break-word|normal|anywhere
      wordWrap: {
        type: String,
        default: "normal"
      },
      ...(_r = (_q = uni.$uv) == null ? void 0 : _q.props) == null ? void 0 : _r.text
    }
  };
  const _sfc_main$J = {
    name: "uv-text",
    emits: ["click"],
    mixins: [mpMixin, mixin, value, props$8],
    computed: {
      valueStyle() {
        const style = {
          textDecoration: this.decoration,
          fontWeight: this.bold ? "bold" : "normal",
          wordWrap: this.wordWrap,
          fontSize: this.$uv.addUnit(this.size)
        };
        !this.type && (style.color = this.color);
        this.isNvue && this.lines && (style.lines = this.lines);
        if (this.isNvue && this.mode != "price" && !this.prefixIcon && !this.suffixIcon) {
          style.flex = 1;
          style.textAlign = this.align === "left" ? "flex-start" : this.align === "center" ? "center" : "right";
        }
        this.lineHeight && (style.lineHeight = this.$uv.addUnit(this.lineHeight));
        !this.isNvue && this.block && (style.display = "block");
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      },
      isNvue() {
        let nvue = false;
        return nvue;
      },
      isMp() {
        let mp = false;
        return mp;
      }
    },
    data() {
      return {};
    },
    methods: {
      clickHandler() {
        if (this.call && this.mode === "phone") {
          uni.makePhoneCall({
            phoneNumber: this.text
          });
        }
        this.$emit("click");
      }
    }
  };
  function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_link = resolveEasycom(vue.resolveDynamicComponent("uv-link"), __easycom_1$2);
    return _ctx.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-text", []]),
        style: vue.normalizeStyle({
          margin: _ctx.margin,
          justifyContent: _ctx.align === "left" ? "flex-start" : _ctx.align === "center" ? "center" : "flex-end"
        }),
        onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        _ctx.mode === "price" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: vue.normalizeClass(["uv-text__price", _ctx.type && `uv-text__value--${_ctx.type}`]),
            style: vue.normalizeStyle([$options.valueStyle])
          },
          "￥",
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.prefixIcon ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "uv-text__prefix-icon"
        }, [
          vue.createVNode(_component_uv_icon, {
            name: _ctx.prefixIcon,
            customStyle: _ctx.$uv.addStyle(_ctx.iconStyle)
          }, null, 8, ["name", "customStyle"])
        ])) : vue.createCommentVNode("v-if", true),
        _ctx.mode === "link" ? (vue.openBlock(), vue.createBlock(_component_uv_link, {
          key: 2,
          text: _ctx.value,
          href: _ctx.href,
          underLine: ""
        }, null, 8, ["text", "href"])) : _ctx.openType && $options.isMp ? (vue.openBlock(), vue.createElementBlock("button", {
          key: 3,
          class: "uv-reset-button uv-text__value",
          style: vue.normalizeStyle([$options.valueStyle]),
          openType: _ctx.openType,
          onGetuserinfo: _cache[0] || (_cache[0] = (...args) => _ctx.onGetUserInfo && _ctx.onGetUserInfo(...args)),
          onContact: _cache[1] || (_cache[1] = (...args) => _ctx.onContact && _ctx.onContact(...args)),
          onGetphonenumber: _cache[2] || (_cache[2] = (...args) => _ctx.onGetPhoneNumber && _ctx.onGetPhoneNumber(...args)),
          onError: _cache[3] || (_cache[3] = (...args) => _ctx.onError && _ctx.onError(...args)),
          onLaunchapp: _cache[4] || (_cache[4] = (...args) => _ctx.onLaunchApp && _ctx.onLaunchApp(...args)),
          onOpensetting: _cache[5] || (_cache[5] = (...args) => _ctx.onOpenSetting && _ctx.onOpenSetting(...args)),
          lang: _ctx.lang,
          "session-from": _ctx.sessionFrom,
          "send-message-title": _ctx.sendMessageTitle,
          "send-message-path": _ctx.sendMessagePath,
          "send-message-img": _ctx.sendMessageImg,
          "show-message-card": _ctx.showMessageCard,
          "app-parameter": _ctx.appParameter
        }, vue.toDisplayString(_ctx.value), 45, ["openType", "lang", "session-from", "send-message-title", "send-message-path", "send-message-img", "show-message-card", "app-parameter"])) : (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 4,
            class: vue.normalizeClass(["uv-text__value", [
              _ctx.type && `uv-text__value--${_ctx.type}`,
              _ctx.lines && `uv-line-${_ctx.lines}`
            ]]),
            style: vue.normalizeStyle([$options.valueStyle])
          },
          vue.toDisplayString(_ctx.value),
          7
          /* TEXT, CLASS, STYLE */
        )),
        _ctx.suffixIcon ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 5,
          class: "uv-text__suffix-icon"
        }, [
          vue.createVNode(_component_uv_icon, {
            name: _ctx.suffixIcon,
            customStyle: _ctx.$uv.addStyle(_ctx.iconStyle)
          }, null, 8, ["name", "customStyle"])
        ])) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$I], ["__scopeId", "data-v-8da47eb3"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-text/components/uv-text/uv-text.vue"]]);
  const props$7 = {
    props: {
      // 默认的显示占位高度
      showHeight: {
        type: [String, Number],
        default: 400
      },
      // 展开后是否显示"收起"按钮
      toggle: {
        type: Boolean,
        default: false
      },
      // 关闭时的提示文字
      closeText: {
        type: String,
        default: "展开阅读全文"
      },
      // 展开时的提示文字
      openText: {
        type: String,
        default: "收起"
      },
      // 提示的文字颜色
      color: {
        type: String,
        default: "#2979ff"
      },
      // 提示文字的大小
      fontSize: {
        type: [String, Number],
        default: 14
      },
      // 是否显示阴影
      // 此参数不能写在props/readMore.js中进行默认配置，因为使用了条件编译，在外部js中
      // uni无法准确识别当前是否处于nvue还是非nvue下
      shadowStyle: {
        type: Object,
        default: () => ({
          backgroundImage: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)",
          paddingTop: "100px",
          marginTop: "-100px"
        })
      },
      // 段落首行缩进的字符个数
      textIndent: {
        type: String,
        default: "2em"
      },
      // open和close事件时，将此参数返回在回调参数中
      name: {
        type: [String, Number],
        default: ""
      },
      ...(_t = (_s = uni.$uv) == null ? void 0 : _s.props) == null ? void 0 : _t.readMore
    }
  };
  const _sfc_main$I = {
    name: "uv-read-more",
    mixins: [mpMixin, mixin, props$7],
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
  function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_text = resolveEasycom(vue.resolveDynamicComponent("uv-text"), __easycom_0$4);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uv-read-more" }, [
      vue.createElementVNode(
        "view",
        {
          class: "uv-read-more__content",
          style: vue.normalizeStyle({
            height: $data.isLongContent && $data.status === "close" ? _ctx.$uv.addUnit(_ctx.showHeight) : _ctx.$uv.addUnit($data.contentHeight, "px"),
            textIndent: _ctx.textIndent
          })
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uv-read-more__content__inner", [$data.elId]]),
              ref: "uv-read-more__content__inner"
            },
            [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ],
            2
            /* CLASS */
          )
        ],
        4
        /* STYLE */
      ),
      $data.isLongContent ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "uv-read-more__toggle",
          style: vue.normalizeStyle([$options.innerShadowStyle])
        },
        [
          vue.renderSlot(_ctx.$slots, "toggle", {}, () => [
            vue.createElementVNode("view", {
              class: "uv-read-more__toggle__text",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleReadMore && $options.toggleReadMore(...args))
            }, [
              vue.createVNode(_component_uv_text, {
                text: $data.status === "close" ? _ctx.closeText : _ctx.openText,
                color: _ctx.color,
                size: _ctx.fontSize,
                lineHeight: _ctx.fontSize,
                margin: "0 5px 0 0"
              }, null, 8, ["text", "color", "size", "lineHeight"]),
              vue.createElementVNode("view", { class: "uv-read-more__toggle__icon" }, [
                vue.createVNode(_component_uv_icon, {
                  color: _ctx.color,
                  size: _ctx.fontSize + 2,
                  name: $data.status === "close" ? "arrow-down" : "arrow-up"
                }, null, 8, ["color", "size", "name"])
              ])
            ])
          ], true)
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_2$3 = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$H], ["__scopeId", "data-v-d91f31a6"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-read-more/components/uv-read-more/uv-read-more.vue"]]);
  const _sfc_main$H = {
    __name: "page-loading",
    setup(__props, { expose: __expose }) {
      __expose();
      const __returned__ = { loadingVue };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page-loading" }, [
      vue.createVNode($setup["loadingVue"]),
      vue.createCommentVNode(' <image src="../../static/images/error.png" mode=""></image> ')
    ]);
  }
  const pageLoadingVue = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$G], ["__scopeId", "data-v-c3ec4776"], ["__file", "D:/APP/novel-app/novel-app/components/common/page-loading.vue"]]);
  const _sfc_main$G = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const store2 = useStore();
      const novel = vue.computed(() => store2.state.currentNovelDetail);
      const isLoading = vue.ref(true);
      const txtColor = vue.ref("");
      const novel_chapters = vue.ref([]);
      const isAdded = vue.ref(false);
      onShow(async () => {
        const addedVal = await isInBookShell(novel.value.id, novel.value.type);
        isAdded.value = addedVal;
      });
      vue.onMounted(async () => {
        await getCoverMainColor(novel.value.cover);
        await getChapters();
        isLoading.value = false;
      });
      const goBack = () => {
        uni.navigateBack();
      };
      const getCoverMainColor = async (cover_url) => {
        const {
          data: {
            data: maincolor
          }
        } = await calculateCoverMainColor(cover_url);
        txtColor.value = maincolor;
      };
      const getChapters = async () => {
        if (novel.value.type == "novel") {
          const {
            data: chapters
          } = await getNovelChapters(novel.value.id);
          novel_chapters.value = chapters;
        } else {
          const res = await getComicChapters(novel.value.name);
          novel_chapters.value = res.data.data;
        }
      };
      const goToChaptersPage = () => {
        if (novel_chapters.value.length > 0) {
          store2.commit("setCurrentNovelChapters", {
            novel_name: novel.value.name,
            chapters: novel_chapters.value
          });
          uni.navigateTo({
            url: "/pages/chapters/chapters"
          });
        } else {
          uni.showToast({
            icon: "none",
            title: "当前小说暂无章节内容"
          });
        }
      };
      const goToRead = () => {
        if (novel_chapters.value.length > 0) {
          uni.navigateTo({
            url: novel.value.type == "novel" ? `/pages/read/read?novel_id=${novel.value.id}&chapter_n=1` : `/pages/comic-read/comic-read?comic_id=${novel.value.id}&chapter_n=1`
          });
        } else {
          uni.showToast({
            icon: "none",
            title: "当前小说暂无章节内容"
          });
        }
      };
      const addBookShell = async () => {
        if (isAdded.value) {
          await deleteFromBookShell(store2.state.currentNovelDetail.id, novel.value.type);
          isAdded.value = false;
        } else {
          await insterBookShell(store2.state.currentNovelDetail, novel.value.type);
          isAdded.value = true;
        }
      };
      const __returned__ = { store: store2, novel, isLoading, txtColor, novel_chapters, isAdded, goBack, getCoverMainColor, getChapters, goToChaptersPage, goToRead, addBookShell, computed: vue.computed, onMounted: vue.onMounted, ref: vue.ref, get useStore() {
        return useStore;
      }, get calculateCoverMainColor() {
        return calculateCoverMainColor;
      }, get deleteFromBookShell() {
        return deleteFromBookShell;
      }, get getComicChapters() {
        return getComicChapters;
      }, get getNovelChapters() {
        return getNovelChapters;
      }, get getNovelDetai() {
        return getNovelDetai;
      }, get insterBookShell() {
        return insterBookShell;
      }, get isInBookShell() {
        return isInBookShell;
      }, get onLoad() {
        return onLoad;
      }, get onShow() {
        return onShow;
      }, pageLoadingVue };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_image = resolveEasycom(vue.resolveDynamicComponent("uv-image"), __easycom_1$3);
    const _component_uv_read_more = resolveEasycom(vue.resolveDynamicComponent("uv-read-more"), __easycom_2$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "nove-detail-container" }, [
      $setup.isLoading ? (vue.openBlock(), vue.createBlock($setup["pageLoadingVue"], { key: 0 })) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: "nove-detail-top",
          style: vue.normalizeStyle({ backgroundImage: `url(${$setup.novel.cover})` })
        },
        [
          vue.createElementVNode("view", { class: "frosted-glass" }),
          vue.createElementVNode("view", { class: "status-bar" }),
          vue.createElementVNode("view", { class: "back" }, [
            vue.createVNode(_component_uv_icon, {
              onClick: $setup.goBack,
              bold: "",
              name: "arrow-left",
              color: $setup.txtColor == "white" ? "black" : "white",
              size: "28"
            }, null, 8, ["color"])
          ]),
          vue.createElementVNode("view", { class: "info" }, [
            vue.createVNode(_component_uv_image, {
              src: $setup.novel.cover,
              "lazy-load": "",
              observeLazyLoad: "",
              fade: "",
              radius: "5",
              width: "90",
              height: "120"
            }, null, 8, ["src"]),
            vue.createElementVNode(
              "view",
              {
                class: "name",
                style: vue.normalizeStyle({ color: $setup.txtColor == "white" ? "black" : "white" })
              },
              vue.toDisplayString($setup.novel.name),
              5
              /* TEXT, STYLE */
            ),
            vue.createElementVNode(
              "view",
              {
                class: "author",
                style: vue.normalizeStyle({ color: $setup.txtColor == "white" ? "black" : "white" })
              },
              vue.toDisplayString($setup.novel.author) + " · " + vue.toDisplayString($setup.novel.genre),
              5
              /* TEXT, STYLE */
            )
          ])
        ],
        4
        /* STYLE */
      ),
      vue.createElementVNode("view", { class: "nove-detail-bottom" }, [
        vue.createElementVNode("view", { class: "info" }, [
          vue.createElementVNode("view", { class: "t" }, [
            vue.createElementVNode(
              "view",
              { class: "l" },
              vue.toDisplayString($setup.novel.type == "novel" ? $setup.novel.words_count : $setup.novel.genre),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "line" }, "|"),
            vue.createElementVNode(
              "view",
              { class: "r" },
              vue.toDisplayString($setup.novel.status),
              1
              /* TEXT */
            )
          ]),
          vue.createCommentVNode(" 小说简介 "),
          vue.createVNode(_component_uv_read_more, {
            "show-height": "200rpx",
            toggle: true,
            color: "#D33D22"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                { class: "intro" },
                vue.toDisplayString($setup.novel.intro),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createCommentVNode(" 小说目录 "),
          vue.createElementVNode("view", { class: "catalog" }, [
            vue.createElementVNode("text", { class: "txt" }, "目录"),
            vue.createElementVNode("view", {
              class: "catalog-name",
              onClick: $setup.goToChaptersPage
            }, [
              vue.createElementVNode(
                "text",
                null,
                " 连载至：" + vue.toDisplayString($setup.novel_chapters.length > 0 ? (_a = $setup.novel_chapters[$setup.novel_chapters.length - 1]) == null ? void 0 : _a.chapter_name : "当前小说暂无章节内容"),
                1
                /* TEXT */
              ),
              vue.createVNode(_component_uv_icon, { name: "arrow-right" })
            ])
          ])
        ])
      ]),
      vue.createCommentVNode(" 底部功能按钮 "),
      vue.createElementVNode("view", { class: "fun" }, [
        vue.createElementVNode("view", {
          class: "add-book",
          onClick: $setup.addBookShell
        }, [
          vue.createVNode(_component_uv_icon, {
            name: "bookshelfshujia",
            "custom-prefix": "custom-icon",
            size: "20",
            color: "#000"
          }),
          vue.createTextVNode(
            " " + vue.toDisplayString($setup.isAdded ? "已在书架" : "加入书架"),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "view download" }, "全本缓存"),
        vue.createElementVNode("view", {
          class: "read",
          onClick: $setup.goToRead
        }, "开始阅读")
      ])
    ]);
  }
  const PagesNoveDetailIndex = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$F], ["__scopeId", "data-v-2d6fc040"], ["__file", "D:/APP/novel-app/novel-app/pages/nove-detail/index.vue"]]);
  const _sfc_main$F = {
    __name: "chapters",
    setup(__props, { expose: __expose }) {
      __expose();
      const store2 = useStore();
      const novel = vue.computed(() => store2.state.currentNovelChapters);
      const latestChapter = vue.ref(null);
      const isReverse = vue.ref(false);
      vue.onMounted(() => {
        uni.setNavigationBarTitle({
          title: novel.value.novel_name
        });
        uni.setNavigationBarColor({
          backgroundColor: "#fff",
          frontColor: "#000"
        });
        latestChapter.value = novel.value.chapters[novel.value.chapters.length - 1].chapter_name;
      });
      const chapters_reverse = () => {
        novel.value.chapters = novel.value.chapters.reverse();
        isReverse.value = !isReverse.value;
      };
      const __returned__ = { store: store2, novel, latestChapter, isReverse, chapters_reverse, onMounted: vue.onMounted, computed: vue.computed, ref: vue.ref, get useStore() {
        return useStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "chapters_container" }, [
      vue.createElementVNode("view", { class: "order" }, [
        vue.createElementVNode(
          "view",
          { class: "l" },
          " 更新至" + vue.toDisplayString($setup.latestChapter),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", {
          class: "r",
          onClick: $setup.chapters_reverse
        }, [
          vue.createElementVNode("view", { class: "icon" }, [
            vue.createVNode(_component_uv_icon, {
              name: "arrow-up-fill",
              size: "12"
            }),
            vue.createVNode(_component_uv_icon, {
              name: "arrow-down-fill",
              size: "12"
            })
          ]),
          vue.createTextVNode(
            " " + vue.toDisplayString($setup.isReverse ? "逆序" : "正序"),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createElementVNode("view", { class: "chapter-list" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.novel.chapters, (item) => {
            return vue.openBlock(), vue.createElementBlock(
              "view",
              {
                class: "item",
                key: item.id
              },
              vue.toDisplayString(item.chapter_name),
              1
              /* TEXT */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesChaptersChapters = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$E], ["__scopeId", "data-v-275a8e90"], ["__file", "D:/APP/novel-app/novel-app/pages/chapters/chapters.vue"]]);
  const props$6 = {
    props: {
      // 提示内容
      loadingText: {
        type: [String, Number],
        default: ""
      },
      // 文字上方用于替换loading动画的图片
      image: {
        type: String,
        default: ""
      },
      // 加载动画的模式，circle-圆形，spinner-花朵形，semicircle-半圆形
      loadingMode: {
        type: String,
        default: "circle"
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: false
      },
      // 背景色
      bgColor: {
        type: String,
        default: "#fff"
      },
      // 文字颜色
      color: {
        type: String,
        default: "#C8C8C8"
      },
      // 文字大小
      fontSize: {
        type: [String, Number],
        default: 16
      },
      // 图标大小
      iconSize: {
        type: [String, Number],
        default: 26
      },
      // 加载中图标的颜色，只能rgb或者十六进制颜色值
      loadingColor: {
        type: String,
        default: "#C8C8C8"
      },
      // 过渡时间
      duration: {
        type: [String, Number],
        default: 300
      },
      ...(_v = (_u = uni.$uv) == null ? void 0 : _u.props) == null ? void 0 : _v.loadingPage
    }
  };
  const _sfc_main$E = {
    name: "uv-loading-page",
    mixins: [mpMixin, mixin, props$6],
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
  function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_0$7);
    return $data.showLoading ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: "uv-loading-page uv-flex-column",
        style: vue.normalizeStyle([$options.loadingPageStyle])
      },
      [
        _ctx.image != "" ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          src: _ctx.image,
          class: "uv-loading-page__img",
          mode: "widthFit",
          style: vue.normalizeStyle([{
            width: _ctx.$uv.addUnit(_ctx.iconSize),
            height: _ctx.$uv.addUnit(_ctx.iconSize)
          }])
        }, null, 12, ["src"])) : (vue.openBlock(), vue.createBlock(_component_uv_loading_icon, {
          key: 1,
          mode: _ctx.loadingMode,
          size: _ctx.iconSize,
          color: _ctx.loadingColor
        }, null, 8, ["mode", "size", "color"])),
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "text",
            {
              class: "uv-loading-page__text",
              style: vue.normalizeStyle([{
                fontSize: _ctx.$uv.addUnit(_ctx.fontSize),
                color: _ctx.color
              }])
            },
            vue.toDisplayString(_ctx.loadingText),
            5
            /* TEXT, STYLE */
          )
        ], true)
      ],
      4
      /* STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$D], ["__scopeId", "data-v-a1a98476"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-loading-page/components/uv-loading-page/uv-loading-page.vue"]]);
  const _sfc_main$D = {
    __name: "read-top",
    props: {
      theme: {
        type: Object,
        default: () => ({
          backgroundColor: "#F6F6F6",
          color: "#929292"
        })
      },
      chapterName: {
        type: String,
        default: ""
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const goBack = () => {
        uni.navigateBack();
      };
      const __returned__ = { goBack };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "status-bar" }),
        vue.createElementVNode("view", { class: "read-top" }, [
          vue.createVNode(_component_uv_icon, {
            name: "arrow-left",
            onClick: $setup.goBack,
            color: $props.theme.color
          }, null, 8, ["color"]),
          vue.createElementVNode(
            "text",
            {
              class: "chapter_name",
              style: vue.normalizeStyle({ color: $props.theme.color })
            },
            vue.toDisplayString($props.chapterName),
            5
            /* TEXT, STYLE */
          )
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const readTop = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$C], ["__scopeId", "data-v-a34bc4ca"], ["__file", "D:/APP/novel-app/novel-app/pages/read/components/read-top.vue"]]);
  const _sfc_main$C = {
    __name: "read-bottom",
    props: {
      theme: {
        type: Object,
        default: () => ({
          backgroundColor: "#F6F6F6",
          color: "#929292"
        })
      },
      currentPage: {
        type: Number,
        default: 1
      },
      totalPage: {
        type: Number,
        default: 1
      },
      currentTime: {
        type: String,
        default: "00:00"
      },
      batteryInfo: {
        type: Object,
        default: null
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const __returned__ = { ref: vue.ref, onMounted: vue.onMounted, onUnmounted: vue.onUnmounted };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "read-bottom",
        style: vue.normalizeStyle({ color: $props.theme.color })
      },
      [
        vue.createElementVNode(
          "view",
          { class: "time" },
          vue.toDisplayString($props.currentTime),
          1
          /* TEXT */
        ),
        $props.batteryInfo ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "battery"
        }, [
          $props.batteryInfo.level <= 10 ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 0,
            name: "battery-empty",
            "custom-prefix": "custom-icon",
            size: "14",
            color: $props.batteryInfo.isCharging ? "#77CA44" : $props.theme.color
          }, null, 8, ["color"])) : $props.batteryInfo.level > 10 && $props.batteryInfo.level < 30 ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 1,
            name: "battery-low",
            "custom-prefix": "custom-icon",
            size: "14",
            color: $props.batteryInfo.isCharging ? "#77CA44" : $props.theme.color
          }, null, 8, ["color"])) : $props.batteryInfo.level >= 30 && $props.batteryInfo.level < 50 ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 2,
            name: "battery-mid",
            "custom-prefix": "custom-icon",
            size: "14",
            color: $props.batteryInfo.isCharging ? "#77CA44" : $props.theme.color
          }, null, 8, ["color"])) : $props.batteryInfo.level >= 50 && $props.batteryInfo.level < 90 ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 3,
            name: "battery-most",
            "custom-prefix": "custom-icon",
            size: "14",
            color: $props.batteryInfo.isCharging ? "#77CA44" : $props.theme.color
          }, null, 8, ["color"])) : (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 4,
            name: "battery-full",
            "custom-prefix": "custom-icon",
            size: "14",
            color: $props.batteryInfo.isCharging ? "#77CA44" : $props.theme.color
          }, null, 8, ["color"]))
        ])) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    );
  }
  const readBottom = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$B], ["__scopeId", "data-v-abe564fd"], ["__file", "D:/APP/novel-app/novel-app/pages/read/components/read-bottom.vue"]]);
  const _sfc_main$B = {
    __name: "catalog-popup",
    props: {
      catalogShow: {
        // 目录弹出层是否显示
        type: Boolean,
        default: false
      },
      theme: {
        // 主题
        type: Object,
        default: () => ({
          backgroundColor: "#F6F6F6",
          color: "#929292",
          contentColor: "#000"
        })
      },
      currentChapter_n: {
        // 当前章节
        type: Number,
        default: 1
      },
      chapterNameList: {
        // 章节列表
        type: Array,
        default: () => []
      },
      chapterNameScrollHeight: {
        // 章节列表滚动区高度
        type: Number,
        default: 0
      }
    },
    emits: ["changeChapter"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const emit = __emit;
      const changeChapter = (chapter_n) => {
        emit("changeChapter", chapter_n);
      };
      const __returned__ = { emit, changeChapter };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["catalog", $props.catalogShow ? "show" : ""]),
        style: vue.normalizeStyle({ backgroundColor: $props.theme.backgroundColor })
      },
      [
        vue.createElementVNode("view", { class: "status-bar" }),
        vue.createElementVNode("scroll-view", {
          "scroll-into-view": $props.chapterNameList.length > 0 ? "chapter_" + $props.currentChapter_n : "",
          style: vue.normalizeStyle(`height:${$props.chapterNameScrollHeight}px`),
          class: "scroll-box",
          "scroll-y": true
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($props.chapterNameList, (item, index2) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                onClick: ($event) => $setup.changeChapter(item.chapter_n),
                id: "chapter_" + item.chapter_n,
                class: "item",
                key: item.id,
                style: vue.normalizeStyle({ color: $props.currentChapter_n == item.chapter_n ? "rgb(41, 121, 255)" : $props.theme.color })
              }, vue.toDisplayString(item.chapter_name.trim()), 13, ["onClick", "id"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ], 12, ["scroll-into-view"])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const catalogpopup = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$A], ["__scopeId", "data-v-c2994df9"], ["__file", "D:/APP/novel-app/novel-app/pages/read/components/catalog-popup.vue"]]);
  const props$5 = {
    props: {
      value: {
        type: [Number, String],
        default: 0
      },
      modelValue: {
        type: [Number, String],
        default: 0
      },
      // 最小可选值
      min: {
        type: [Number, String],
        default: 0
      },
      // 最大可选值
      max: {
        type: [Number, String],
        default: 100
      },
      // 步长，取值必须大于 0，并且可被(max - min)整除
      step: {
        type: [Number, String],
        default: 1
      },
      // 滑块右侧已选择部分的背景色
      activeColor: {
        type: String,
        default: "#2979ff"
      },
      // 滑块左侧未选择部分的背景色
      backgroundColor: {
        type: String,
        default: "#c0c4cc"
      },
      // 滑块的大小，取值范围为 12 - 28
      blockSize: {
        type: [Number, String],
        default: 18
      },
      // 滑块的颜色
      blockColor: {
        type: String,
        default: "#ffffff"
      },
      // 禁用状态
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否显示当前的选择值
      showValue: {
        type: Boolean,
        default: false
      },
      ...(_x = (_w = uni.$uv) == null ? void 0 : _w.props) == null ? void 0 : _x.slider
    }
  };
  const _sfc_main$A = {
    name: "uv-slider",
    mixins: [mpMixin, mixin, props$5],
    computed: {
      sliderValue() {
        return this.value || this.modelValue;
      }
    },
    methods: {
      // 拖动过程中触发
      changingHandler(e) {
        const { value: value2 } = e.detail;
        this.$emit("input", value2);
        this.$emit("update:modelValue", value2);
        this.$emit("changing", value2);
      },
      // 滑动结束时触发
      changeHandler(e) {
        const {
          value: value2
        } = e.detail;
        this.$emit("input", value2);
        this.$emit("update:modelValue", value2);
        this.$emit("change", value2);
      }
    }
  };
  function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-slider",
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        vue.createElementVNode("slider", {
          min: _ctx.min,
          max: _ctx.max,
          step: _ctx.step,
          value: $options.sliderValue,
          activeColor: _ctx.activeColor,
          backgroundColor: _ctx.backgroundColor,
          blockSize: _ctx.$uv.getPx(_ctx.blockSize),
          blockColor: _ctx.blockColor,
          showValue: _ctx.showValue,
          disabled: _ctx.disabled,
          onChanging: _cache[0] || (_cache[0] = (...args) => $options.changingHandler && $options.changingHandler(...args)),
          onChange: _cache[1] || (_cache[1] = (...args) => $options.changeHandler && $options.changeHandler(...args))
        }, null, 40, ["min", "max", "step", "value", "activeColor", "backgroundColor", "blockSize", "blockColor", "showValue", "disabled"])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$z], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-slider/components/uv-slider/uv-slider.vue"]]);
  const props$4 = {
    props: {
      // 是否显示遮罩
      show: {
        type: Boolean,
        default: false
      },
      // 层级z-index
      zIndex: {
        type: [String, Number],
        default: 10070
      },
      // 遮罩的过渡时间，单位为ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 不透明度值，当做rgba的第四个参数
      opacity: {
        type: [String, Number],
        default: 0.5
      },
      ...(_z = (_y = uni.$uv) == null ? void 0 : _y.props) == null ? void 0 : _z.overlay
    }
  };
  const _sfc_main$z = {
    name: "uv-overlay",
    emits: ["click"],
    mixins: [mpMixin, mixin, props$4],
    watch: {
      show(newVal) {
      }
    },
    computed: {
      overlayStyle() {
        const style = {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: this.zIndex,
          bottom: 0,
          "background-color": `rgba(0, 0, 0, ${this.opacity})`
        };
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    methods: {
      clickHandler() {
        this.$emit("click");
      },
      clear() {
      }
    }
  };
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_3);
    return vue.openBlock(), vue.createBlock(_component_uv_transition, {
      show: _ctx.show,
      mode: "fade",
      "custom-class": "uv-overlay",
      duration: _ctx.duration,
      "custom-style": $options.overlayStyle,
      onClick: $options.clickHandler,
      onTouchmove: vue.withModifiers($options.clear, ["stop", "prevent"])
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "duration", "custom-style", "onClick", "onTouchmove"]);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$y], ["__scopeId", "data-v-7303e1aa"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-overlay/components/uv-overlay/uv-overlay.vue"]]);
  const props$3 = {
    props: {
      bgColor: {
        type: String,
        default: "transparent"
      }
    }
  };
  const _sfc_main$y = {
    name: "uv-status-bar",
    mixins: [mpMixin, mixin, props$3],
    data() {
      return {};
    },
    computed: {
      style() {
        const style = {};
        style.height = this.$uv.addUnit(this.$uv.sys().statusBarHeight, "px");
        if (this.bgColor) {
          if (this.bgColor.indexOf("gradient") > -1) {
            style.backgroundImage = this.bgColor;
          } else {
            style.background = this.bgColor;
          }
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$options.style]),
        class: "uv-status-bar"
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$x], ["__scopeId", "data-v-f5bd6f5a"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-status-bar/components/uv-status-bar/uv-status-bar.vue"]]);
  const _sfc_main$x = {
    name: "uv-safe-bottom",
    mixins: [mpMixin, mixin],
    data() {
      return {
        safeAreaBottomHeight: 0,
        isNvue: false
      };
    },
    computed: {
      style() {
        const style = {};
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    mounted() {
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-safe-bottom", [!$data.isNvue && "uv-safe-area-inset-bottom"]]),
        style: vue.normalizeStyle([$options.style])
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$w], ["__scopeId", "data-v-560f16b2"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-safe-bottom/components/uv-safe-bottom/uv-safe-bottom.vue"]]);
  const _sfc_main$w = {
    name: "uv-popup",
    components: {},
    mixins: [mpMixin, mixin],
    emits: ["change", "maskClick"],
    props: {
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      mode: {
        type: String,
        default: "center"
      },
      // 动画时长，单位ms
      duration: {
        type: [String, Number],
        default: 300
      },
      // 层级
      zIndex: {
        type: [String, Number],
        default: 10075
      },
      bgColor: {
        type: String,
        default: "#ffffff"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      // 是否显示遮罩
      overlay: {
        type: Boolean,
        default: true
      },
      // 点击遮罩是否关闭弹窗
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 遮罩的透明度，0-1之间
      overlayOpacity: {
        type: [Number, String],
        default: 0.4
      },
      // 自定义遮罩的样式
      overlayStyle: {
        type: [Object, String],
        default: ""
      },
      // 是否为iPhoneX留出底部安全距离
      safeAreaInsetBottom: {
        type: Boolean,
        default: true
      },
      // 是否留出顶部安全距离（状态栏高度）
      safeAreaInsetTop: {
        type: Boolean,
        default: false
      },
      // 是否显示关闭图标
      closeable: {
        type: Boolean,
        default: false
      },
      // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
      closeIconPos: {
        type: String,
        default: "top-right"
      },
      // mode=center，也即中部弹出时，是否使用缩放模式
      zoom: {
        type: Boolean,
        default: true
      },
      round: {
        type: [Number, String],
        default: 0
      },
      ...(_B = (_A = uni.$uv) == null ? void 0 : _A.props) == null ? void 0 : _B.popup
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.mode]](true);
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        transitionStyle: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupClass: this.isDesktop ? "fixforpc-top" : "top",
        direction: ""
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.bgColor === "" || this.bgColor === "none" || this.$uv.getPx(this.round) > 0) {
          return "transparent";
        }
        return this.bgColor;
      },
      contentStyle() {
        const style = {};
        if (this.bgColor) {
          style.backgroundColor = this.bg;
        }
        if (this.round) {
          const value2 = this.$uv.addUnit(this.round);
          const mode = this.direction ? this.direction : this.mode;
          style.backgroundColor = this.bgColor;
          if (mode === "top") {
            style.borderBottomLeftRadius = value2;
            style.borderBottomRightRadius = value2;
          } else if (mode === "bottom") {
            style.borderTopLeftRadius = value2;
            style.borderTopRightRadius = value2;
          } else if (mode === "center") {
            style.borderRadius = value2;
          }
        }
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    created() {
      this.messageChild = null;
      this.clearPropagation = false;
    },
    methods: {
      setH5Visible() {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.mode;
        } else {
          this.direction = direction;
        }
        if (!this.config[direction]) {
          return this.$uv.error(`缺少类型：${direction}`);
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.mode
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.closeOnClickOverlay)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupClass = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.mode === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupClass = "bottom";
        this.ani = ["slide-bottom"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupClass = "center";
        this.ani = this.zoom ? ["zoom-in", "fade"] : ["fade"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupClass = "left";
        this.ani = ["slide-left"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupClass = "right";
        this.ani = ["slide-right"];
        this.transitionStyle = {
          position: "fixed",
          zIndex: this.zIndex,
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_overlay = resolveEasycom(vue.resolveDynamicComponent("uv-overlay"), __easycom_0$2);
    const _component_uv_status_bar = resolveEasycom(vue.resolveDynamicComponent("uv-status-bar"), __easycom_1$1);
    const _component_uv_safe_bottom = resolveEasycom(vue.resolveDynamicComponent("uv-safe-bottom"), __easycom_2$1);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_3);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uv-popup", [$data.popupClass, $options.isDesktop ? "fixforpc-z-index" : ""]]),
        style: vue.normalizeStyle([{ zIndex: $props.zIndex }])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[2] || (_cache[2] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            vue.createCommentVNode(" 遮罩层 "),
            $data.maskShow && $props.overlay ? (vue.openBlock(), vue.createBlock(_component_uv_overlay, {
              key: "1",
              show: $data.showTrans,
              duration: $props.duration,
              "custom-style": $props.overlayStyle,
              opacity: $props.overlayOpacity,
              zIndex: $props.zIndex,
              onClick: $options.onTap
            }, null, 8, ["show", "duration", "custom-style", "opacity", "zIndex", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uv_transition, {
              key: "2",
              mode: $data.ani,
              name: "content",
              "custom-style": $data.transitionStyle,
              duration: $props.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uv-popup__content", [$data.popupClass]]),
                    style: vue.normalizeStyle([$options.contentStyle]),
                    onClick: _cache[1] || (_cache[1] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    $props.safeAreaInsetTop ? (vue.openBlock(), vue.createBlock(_component_uv_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
                    $props.safeAreaInsetBottom ? (vue.openBlock(), vue.createBlock(_component_uv_safe_bottom, { key: 1 })) : vue.createCommentVNode("v-if", true),
                    $props.closeable ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 2,
                        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.close && $options.close(...args), ["stop"])),
                        class: vue.normalizeClass(["uv-popup__content__close", ["uv-popup__content__close--" + $props.closeIconPos]]),
                        "hover-class": "uv-popup__content__close--hover",
                        "hover-stay-time": "150"
                      },
                      [
                        vue.createVNode(_component_uv_icon, {
                          name: "close",
                          color: "#909399",
                          size: "18",
                          bold: ""
                        })
                      ],
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode", "custom-style", "duration", "show", "onClick"])
          ],
          32
          /* NEED_HYDRATION */
        )
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$v], ["__scopeId", "data-v-01a3ad6e"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-popup/components/uv-popup/uv-popup.vue"]]);
  const props$2 = {
    props: {
      // 标题
      title: {
        type: [String],
        default: ""
      },
      // 弹窗内容
      content: {
        type: String,
        default: ""
      },
      // 确认文案
      confirmText: {
        type: String,
        default: "确认"
      },
      // 取消文案
      cancelText: {
        type: String,
        default: "取消"
      },
      // 是否显示确认按钮
      showConfirmButton: {
        type: Boolean,
        default: true
      },
      // 是否显示取消按钮
      showCancelButton: {
        type: Boolean,
        default: false
      },
      // 确认按钮颜色
      confirmColor: {
        type: String,
        default: "#2979ff"
      },
      // 取消文字颜色
      cancelColor: {
        type: String,
        default: "#606266"
      },
      // 对调确认和取消的位置
      buttonReverse: {
        type: Boolean,
        default: false
      },
      // 是否开启缩放效果
      zoom: {
        type: Boolean,
        default: true
      },
      // 层级
      zIndex: {
        type: [String, Number],
        default: 10075
      },
      // 是否异步关闭，只对确定按钮有效
      asyncClose: {
        type: Boolean,
        default: false
      },
      // 是否允许点击遮罩关闭modal
      closeOnClickOverlay: {
        type: Boolean,
        default: true
      },
      // 给一个负的margin-top，往上偏移，避免和键盘重合的情况
      negativeTop: {
        type: [String, Number],
        default: 0
      },
      // modal宽度，不支持百分比，可以数值，px，rpx单位
      width: {
        type: [String, Number],
        default: "650rpx"
      },
      // 文本对齐方式，默认left
      align: {
        type: String,
        default: "left"
      },
      // 文本自定义样式
      textStyle: {
        type: [Object, String],
        default: ""
      },
      ...(_D = (_C = uni.$uv) == null ? void 0 : _C.props) == null ? void 0 : _D.modal
    }
  };
  const _sfc_main$v = {
    name: "uv-modal",
    mixins: [mpMixin, mixin, props$2],
    data() {
      return {
        loading: false
      };
    },
    computed: {
      nvueStyle() {
        const style = {};
        return style;
      }
    },
    methods: {
      open() {
        this.$refs.modalPopup.open();
        if (this.loading)
          this.loading = false;
      },
      close() {
        this.$refs.modalPopup.close();
      },
      popupChange(e) {
        if (!e.show)
          this.$emit("close");
      },
      // 点击确定按钮
      confirmHandler() {
        if (!this.loading) {
          this.$emit("confirm");
        }
        if (this.asyncClose) {
          this.loading = true;
        } else {
          this.close();
        }
      },
      // 点击取消按钮
      cancelHandler() {
        this.$emit("cancel");
        this.close();
      },
      closeLoading() {
        this.$nextTick(() => {
          this.loading = false;
        });
      }
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_0$8);
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_0$7);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_1);
    return vue.openBlock(), vue.createBlock(_component_uv_popup, {
      ref: "modalPopup",
      mode: "center",
      zoom: _ctx.zoom,
      zIndex: _ctx.zIndex,
      customStyle: {
        borderRadius: "6px",
        overflow: "hidden",
        marginTop: `-${_ctx.$uv.addUnit(_ctx.negativeTop)}`
      },
      closeOnClickOverlay: _ctx.closeOnClickOverlay,
      safeAreaInsetBottom: false,
      duration: 400,
      onChange: $options.popupChange
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode(
          "view",
          {
            class: "uv-modal",
            style: vue.normalizeStyle({
              width: _ctx.$uv.addUnit(_ctx.width)
            })
          },
          [
            _ctx.title ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                class: "uv-modal__title"
              },
              vue.toDisplayString(_ctx.title),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "view",
              {
                class: "uv-modal__content",
                style: vue.normalizeStyle({
                  paddingTop: `${_ctx.title ? 12 : 25}px`
                })
              },
              [
                vue.renderSlot(_ctx.$slots, "default", {}, () => [
                  vue.createElementVNode(
                    "text",
                    {
                      class: "uv-modal__content__text",
                      style: vue.normalizeStyle([
                        {
                          textAlign: _ctx.align
                        },
                        $options.nvueStyle,
                        _ctx.$uv.addStyle(_ctx.textStyle)
                      ])
                    },
                    vue.toDisplayString(_ctx.content),
                    5
                    /* TEXT, STYLE */
                  )
                ], true)
              ],
              4
              /* STYLE */
            ),
            vue.renderSlot(_ctx.$slots, "confirmButton", {}, () => [
              vue.createVNode(_component_uv_line),
              _ctx.showConfirmButton || _ctx.showCancelButton ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "uv-modal__button-group",
                  style: vue.normalizeStyle({
                    flexDirection: _ctx.buttonReverse ? "row-reverse" : "row"
                  })
                },
                [
                  _ctx.showCancelButton ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 0,
                      class: vue.normalizeClass(["uv-modal__button-group__wrapper uv-modal__button-group__wrapper--cancel", [_ctx.showCancelButton && !_ctx.showConfirmButton && "uv-modal__button-group__wrapper--only-cancel"]]),
                      "hover-stay-time": 150,
                      "hover-class": "uv-modal__button-group__wrapper--hover",
                      onClick: _cache[0] || (_cache[0] = (...args) => $options.cancelHandler && $options.cancelHandler(...args))
                    },
                    [
                      vue.createElementVNode(
                        "text",
                        {
                          class: "uv-modal__button-group__wrapper__text",
                          style: vue.normalizeStyle({
                            color: _ctx.cancelColor
                          })
                        },
                        vue.toDisplayString(_ctx.cancelText),
                        5
                        /* TEXT, STYLE */
                      )
                    ],
                    2
                    /* CLASS */
                  )) : vue.createCommentVNode("v-if", true),
                  _ctx.showConfirmButton && _ctx.showCancelButton ? (vue.openBlock(), vue.createBlock(_component_uv_line, {
                    key: 1,
                    direction: "column"
                  })) : vue.createCommentVNode("v-if", true),
                  _ctx.showConfirmButton ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 2,
                      class: vue.normalizeClass(["uv-modal__button-group__wrapper uv-modal__button-group__wrapper--confirm", [!_ctx.showCancelButton && _ctx.showConfirmButton && "uv-modal__button-group__wrapper--only-confirm"]]),
                      "hover-stay-time": 150,
                      "hover-class": "uv-modal__button-group__wrapper--hover",
                      onClick: _cache[1] || (_cache[1] = (...args) => $options.confirmHandler && $options.confirmHandler(...args))
                    },
                    [
                      $data.loading ? (vue.openBlock(), vue.createBlock(_component_uv_loading_icon, { key: 0 })) : (vue.openBlock(), vue.createElementBlock(
                        "text",
                        {
                          key: 1,
                          class: "uv-modal__button-group__wrapper__text",
                          style: vue.normalizeStyle({
                            color: _ctx.confirmColor
                          })
                        },
                        vue.toDisplayString(_ctx.confirmText),
                        5
                        /* TEXT, STYLE */
                      ))
                    ],
                    2
                    /* CLASS */
                  )) : vue.createCommentVNode("v-if", true)
                ],
                4
                /* STYLE */
              )) : vue.createCommentVNode("v-if", true)
            ], true)
          ],
          4
          /* STYLE */
        )
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["zoom", "zIndex", "customStyle", "closeOnClickOverlay", "onChange"]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u], ["__scopeId", "data-v-4b4aa5ec"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-modal/components/uv-modal/uv-modal.vue"]]);
  const _sfc_main$u = {
    __name: "bottom-popup",
    props: {
      menuShow: {
        // 底部弹出层是否显示
        type: Boolean,
        default: false
      },
      themeStyle: {
        // 主题
        type: Object,
        default: () => ({
          backgroundColor: "#F6F6F6",
          color: "#929292",
          contentColor: "#000"
        })
      },
      chapterNameList: {
        // 总章节数
        type: Array,
        default: () => []
      },
      currentChapterName: {
        // 当前章节名称
        type: String,
        default: ""
      },
      isDarkTheme: {
        // 是否黑夜主题
        type: Boolean,
        default: false
      },
      currentChapter_n: {
        type: Number,
        default: 1
      },
      novel_id: {
        type: Number,
        required: true
      }
    },
    emits: [
      "openConfig",
      "handelSliderChange",
      "nextChapter",
      "prevChapter",
      "openChapterContalog",
      "changeDarkOrBright"
    ],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const store2 = useStore();
      const modal = vue.ref(null);
      const emit = __emit;
      const isSlide = vue.ref(false);
      const currentChapterPercentage = vue.computed(() => {
        var _a;
        return (chapterSlideValue.value / ((_a = props2.chapterNameList) == null ? void 0 : _a.length) * 100).toFixed(2);
      });
      const tipShow = vue.ref(false);
      const isAdded = vue.ref(false);
      const chapterSlideValue = vue.ref(0);
      const props2 = __props;
      const openConfig = () => {
        emit("openConfig");
      };
      const sliderTimer = vue.ref(null);
      const handelSliderChange = (chapter_n) => {
        tipShow.value = true;
        isSlide.value = true;
        if (sliderTimer.value) {
          clearTimeout(sliderTimer.value);
        }
        sliderTimer.value = setTimeout(async () => {
          isSlide.value = false;
          emit("handelSliderChange", chapterSlideValue.value);
        }, 300);
      };
      const nextChapter = () => {
        emit("nextChapter");
      };
      const prevChapter = () => {
        emit("prevChapter");
      };
      const openChapterContalog = () => {
        emit("openChapterContalog");
      };
      const changeDarkOrBright = () => {
        emit("changeDarkOrBright", props2.isDarkTheme ? "bright" : "dark");
      };
      vue.watch(() => props2.currentChapter_n, (val) => {
        chapterSlideValue.value = val;
      });
      vue.onMounted(async () => {
        const res = await isInBookShell(store2.state.currentNovelDetail.id);
        isAdded.value = res;
      });
      const addBookShelf = async () => {
        if (isAdded.value) {
          modal.value.open();
        } else {
          await insterBookShell(store2.state.currentNovelDetail);
          isAdded.value = true;
        }
      };
      const confirm = async () => {
        await deleteFromBookShell(store2.state.currentNovelDetail.id);
        isAdded.value = false;
      };
      const __returned__ = { store: store2, modal, emit, isSlide, currentChapterPercentage, tipShow, isAdded, chapterSlideValue, props: props2, openConfig, sliderTimer, handelSliderChange, nextChapter, prevChapter, openChapterContalog, changeDarkOrBright, addBookShelf, confirm, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, watch: vue.watch, get useStore() {
        return useStore;
      }, get deleteFromBookShell() {
        return deleteFromBookShell;
      }, get insterBookShell() {
        return insterBookShell;
      }, get isInBookShell() {
        return isInBookShell;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    var _a, _b;
    const _component_uv_slider = resolveEasycom(vue.resolveDynamicComponent("uv-slider"), __easycom_2$2);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_modal = resolveEasycom(vue.resolveDynamicComponent("uv-modal"), __easycom_2);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["bottom-menu", $props.menuShow ? "show" : ""]),
            style: vue.normalizeStyle({ backgroundColor: $props.themeStyle.backgroundColor, color: $props.themeStyle.contentColor })
          },
          [
            vue.createCommentVNode(" 章节提示 "),
            $setup.tipShow && $setup.isSlide ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "chapter_tip"
            }, [
              vue.createElementVNode(
                "view",
                null,
                vue.toDisplayString($setup.currentChapterPercentage) + "% ",
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "chapter_name" },
                vue.toDisplayString((_a = $props.chapterNameList[$setup.chapterSlideValue]) == null ? void 0 : _a.chapter_name),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" 滑动切换章节 "),
            vue.createElementVNode("view", { class: "slide" }, [
              vue.createElementVNode("text", { onClick: $setup.prevChapter }, "上一章"),
              vue.createElementVNode("view", { class: "slide-box" }, [
                vue.createVNode(_component_uv_slider, {
                  modelValue: $setup.chapterSlideValue,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.chapterSlideValue = $event),
                  "block-size": "25",
                  min: "0",
                  max: ((_b = $props.chapterNameList) == null ? void 0 : _b.length) - 1,
                  onChanging: $setup.handelSliderChange,
                  onChange: $setup.handelSliderChange
                }, null, 8, ["modelValue", "max"])
              ]),
              vue.createElementVNode("text", { onClick: $setup.nextChapter }, "下一章")
            ]),
            vue.createElementVNode("view", { class: "icon-btn" }, [
              vue.createElementVNode("view", {
                class: "icon-item",
                onClick: $setup.openChapterContalog
              }, [
                vue.createVNode(_component_uv_icon, {
                  name: "content",
                  "custom-prefix": "custom-icon",
                  size: "20",
                  color: $props.themeStyle.contentColor
                }, null, 8, ["color"]),
                vue.createElementVNode(
                  "view",
                  {
                    style: vue.normalizeStyle({ color: $props.themeStyle.contentColor })
                  },
                  "目录",
                  4
                  /* STYLE */
                )
              ]),
              vue.createElementVNode("view", {
                class: "icon-item",
                onClick: $setup.addBookShelf
              }, [
                vue.createVNode(_component_uv_icon, {
                  name: !$setup.isAdded ? "plus" : "checkmark",
                  size: "20",
                  color: $props.themeStyle.contentColor
                }, null, 8, ["name", "color"]),
                vue.createElementVNode(
                  "view",
                  {
                    style: vue.normalizeStyle({ color: $props.themeStyle.contentColor })
                  },
                  vue.toDisplayString(!$setup.isAdded ? "加入书架" : "已加书架"),
                  5
                  /* TEXT, STYLE */
                )
              ]),
              vue.createElementVNode("view", {
                class: "icon-item",
                onClick: $setup.changeDarkOrBright
              }, [
                vue.createVNode(_component_uv_icon, {
                  name: $props.isDarkTheme ? "sun" : "moon",
                  "custom-prefix": "custom-icon",
                  size: "20",
                  color: $props.themeStyle.contentColor
                }, null, 8, ["name", "color"]),
                vue.createElementVNode(
                  "view",
                  {
                    style: vue.normalizeStyle({ color: $props.themeStyle.contentColor })
                  },
                  vue.toDisplayString($props.isDarkTheme ? "日间" : "夜间"),
                  5
                  /* TEXT, STYLE */
                )
              ]),
              vue.createElementVNode("view", {
                class: "icon-item",
                onClick: $setup.openConfig
              }, [
                vue.createVNode(_component_uv_icon, {
                  name: "setting",
                  color: $props.themeStyle.contentColor,
                  size: "24"
                }, null, 8, ["color"]),
                vue.createElementVNode(
                  "view",
                  {
                    style: vue.normalizeStyle({ color: $props.themeStyle.contentColor })
                  },
                  "设置",
                  4
                  /* STYLE */
                )
              ])
            ])
          ],
          6
          /* CLASS, STYLE */
        ),
        vue.createVNode(_component_uv_modal, {
          style: vue.normalizeStyle({ backgroundColor: $props.themeStyle.backgroundColor, color: $props.themeStyle.contentColor }),
          showCancelButton: "",
          closeOnClickOverlay: false,
          ref: "modal",
          content: "确认将本书从书架移除",
          onConfirm: $setup.confirm,
          confirmText: "移除"
        }, null, 8, ["style"])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const bottomPopup = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__scopeId", "data-v-0f744b74"], ["__file", "D:/APP/novel-app/novel-app/pages/read/components/bottom-popup.vue"]]);
  const _sfc_main$t = {
    __name: "config-popup",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      themeStyle: {
        // 主题
        type: Object,
        default: () => ({
          backgroundColor: "#F6F6F6",
          color: "#929292",
          contentColor: "#000"
        })
      },
      fontSize: {
        type: Number,
        default: 20
      },
      themeList: {
        type: Array,
        default: () => []
      },
      currentLineHeight: {
        type: Number,
        default: 2
      }
    },
    emits: ["changeFontSize", "changeTheme", "setLineHeight"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const space = vue.ref([{
        name: "小",
        value: 2
      }, {
        name: "较小",
        value: 2.5
      }, {
        name: "适中",
        value: 3
      }, {
        name: "大",
        value: 3.5
      }]);
      const emit = __emit;
      const brightnessValue = vue.ref(0);
      const handelChangeBrightness = (e) => {
        formatAppLog("log", "at pages/read/components/config-popup.vue:67", e);
      };
      const changeFontSize = (action) => {
        emit("changeFontSize", action);
      };
      const props2 = __props;
      vue.onMounted(async () => {
      });
      const selectTheme = (theme) => {
        emit("changeTheme", theme);
      };
      const setLineHeight = (val) => {
        emit("setLineHeight", val);
      };
      const __returned__ = { space, emit, brightnessValue, handelChangeBrightness, changeFontSize, props: props2, selectTheme, setLineHeight, ref: vue.ref, onMounted: vue.onMounted };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_slider = resolveEasycom(vue.resolveDynamicComponent("uv-slider"), __easycom_2$2);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["config", $props.show ? "show" : ""]),
        style: vue.normalizeStyle({
          backgroundColor: $props.themeStyle.backgroundColor,
          color: $props.themeStyle.contentColor
        })
      },
      [
        vue.createElementVNode("view", { class: "brightness" }, [
          vue.createElementVNode("view", { class: "config-name" }, "亮度"),
          vue.createElementVNode("view", { class: "slide-box" }, [
            vue.createVNode(_component_uv_slider, {
              modelValue: $setup.brightnessValue,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.brightnessValue = $event),
              "block-size": "25",
              min: 0,
              max: 100,
              onChanging: $setup.handelChangeBrightness
            }, null, 8, ["modelValue"])
          ])
        ]),
        vue.createElementVNode("view", { class: "font" }, [
          vue.createElementVNode("view", { class: "config-name" }, "字号"),
          vue.createElementVNode("view", { class: "change-font" }, [
            vue.createElementVNode(
              "view",
              {
                class: "btn",
                onClick: _cache[1] || (_cache[1] = ($event) => $setup.changeFontSize(0)),
                style: vue.normalizeStyle({ backgroundColor: $props.themeStyle.configBtnBcg })
              },
              "A-",
              4
              /* STYLE */
            ),
            vue.createElementVNode(
              "view",
              null,
              vue.toDisplayString($props.fontSize),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              {
                class: "btn",
                onClick: _cache[2] || (_cache[2] = ($event) => $setup.changeFontSize(1)),
                style: vue.normalizeStyle({ backgroundColor: $props.themeStyle.configBtnBcg })
              },
              "A+",
              4
              /* STYLE */
            )
          ])
        ]),
        vue.createElementVNode("view", { class: "background" }, [
          vue.createElementVNode("view", { class: "config-name" }, "背景"),
          vue.createElementVNode("view", { class: "themes-list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($props.themeList, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  onClick: ($event) => $setup.selectTheme(item.name),
                  class: "theme-item",
                  key: index2,
                  style: vue.normalizeStyle({ backgroundColor: item.backgroundColor, borderColor: $props.themeStyle.backgroundColor == item.backgroundColor ? $props.themeStyle.themeActive : "transparent" })
                }, null, 12, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.createElementVNode("view", { class: "space" }, [
          vue.createElementVNode("view", { class: "config-name" }, "间距"),
          vue.createElementVNode(
            "view",
            {
              class: "btn-group",
              style: vue.normalizeStyle({ backgroundColor: $props.themeStyle.configBtnBcg })
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.space, (item, index2) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    onClick: ($event) => $setup.setLineHeight(item.value),
                    style: vue.normalizeStyle({ backgroundColor: $props.currentLineHeight == item.value ? $props.themeStyle.backgroundColor : "transparent" }),
                    class: "btn",
                    key: index2
                  }, vue.toDisplayString(item.name), 13, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            4
            /* STYLE */
          )
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const configPopup = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__scopeId", "data-v-37310b6f"], ["__file", "D:/APP/novel-app/novel-app/pages/read/components/config-popup.vue"]]);
  const usePopup = () => {
    const catalogShow = vue.ref(false);
    const menuShow = vue.ref(false);
    const maskShow = vue.ref(false);
    const configShow = vue.ref(false);
    const handelShowMenu = async () => {
      maskShow.value = true;
      menuShow.value = true;
    };
    const closeMenu = () => {
      catalogShow.value = false;
      menuShow.value = false;
      maskShow.value = false;
      configShow.value = false;
    };
    const openConfigMenu = () => {
      menuShow.value = false;
      setTimeout(() => {
        configShow.value = true;
      }, 300);
    };
    return {
      catalogShow,
      menuShow,
      maskShow,
      handelShowMenu,
      closeMenu,
      configShow,
      openConfigMenu
    };
  };
  const { registerUTSInterface, initUTSProxyClass, initUTSProxyFunction, initUTSPackageName, initUTSIndexClassName, initUTSClassName } = uni;
  const name = "uniGetbatteryinfo";
  const moduleName = "uni-getbatteryinfo";
  const moduleType = "";
  const errMsg = ``;
  const is_uni_modules = true;
  const pkg = /* @__PURE__ */ initUTSPackageName(name, is_uni_modules);
  const cls = /* @__PURE__ */ initUTSIndexClassName(name, is_uni_modules);
  const getBatteryInfoSync = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "getBatteryInfoSyncByJs", keepAlive: false, params: [], return: "" });
  const getCurrentTime = () => {
    const time = /* @__PURE__ */ new Date();
    let hour = time.getHours();
    hour = hour >= 10 ? hour : "0" + hour;
    let minute = time.getMinutes();
    minute = minute >= 10 ? minute : "0" + minute;
    return `${hour}:${minute}`;
  };
  const getBottomInfo = () => {
    const store2 = useStore();
    const batteryInfo = vue.ref(null);
    batteryInfo.value = getBatteryInfoSync();
    const currentTime = vue.ref(getCurrentTime());
    const timeTimer = setInterval(() => {
      store2.commit("updateReadTime");
      currentTime.value = getCurrentTime();
      batteryInfo.value = getBatteryInfoSync();
    }, 6e4);
    vue.onUnmounted(() => {
      clearInterval(timeTimer);
    });
    return {
      currentTime,
      batteryInfo
    };
  };
  const useConfig = () => {
    const config2 = vue.reactive({
      novel_id: -1,
      // 当前小说id
      fontSize: uni.getStorageSync("read_fontSize") || 20,
      // 字体大小
      currentTheme: uni.getStorageSync("read_theme") || "bright",
      // 当前主题
      lineHeight: uni.getStorageSync("read_lineHeight") || 2,
      // 行高
      isAddBookShelf: false
      //是否已加入书架
    });
    const themeStyle = vue.reactive({
      bright: {
        backgroundColor: "#F6F6F6",
        color: "#929292",
        contentColor: "#000",
        configBtnBcg: "#EEEEEE",
        themeActive: "#000"
      },
      lightBrown: {
        backgroundColor: "#E8E3CF",
        color: "#929292",
        contentColor: "#000",
        configBtnBcg: "#D9D7C2",
        themeActive: "#000"
      },
      lightGreen: {
        backgroundColor: "#E4F0D8",
        color: "#929292",
        contentColor: "#000",
        configBtnBcg: "#DCE8D0",
        themeActive: "#000"
      },
      lightBlue: {
        backgroundColor: "#DAE4EE",
        color: "#929292",
        contentColor: "#000",
        configBtnBcg: "#D3DDE7",
        themeActive: "#000"
      },
      dark: {
        backgroundColor: "#0E0E0E",
        color: "#B8B8B8",
        contentColor: "#B6B6B6",
        configBtnBcg: "#202020",
        themeActive: "#888888"
      }
    });
    const theme = vue.computed(() => themeStyle[config2.currentTheme]);
    const themeNames = vue.computed(() => {
      const names = Object.keys(themeStyle);
      const result = names.map((item) => ({
        name: item,
        backgroundColor: themeStyle[item].backgroundColor
      }));
      return result;
    });
    const changeFontSize = (action) => {
      if (action == 1) {
        config2.fontSize = config2.fontSize + 2 >= 30 ? 30 : config2.fontSize + 2;
      } else if (action == 0) {
        config2.fontSize = config2.fontSize - 2 <= 12 ? 12 : config2.fontSize - 2;
      }
      uni.setStorageSync("read_fontSize", config2.fontSize);
    };
    const setLineHeight = (val) => {
      config2.lineHeight = val;
      uni.setStorageSync("read_lineHeight", config2.lineHeight);
    };
    const changeTheme = (theme2) => {
      config2.currentTheme = theme2;
      uni.setStorageSync("read_theme", config2.currentTheme);
    };
    return {
      config: config2,
      theme,
      changeFontSize,
      themeNames,
      setLineHeight,
      changeTheme
    };
  };
  const saveChapters = (chapters, novel_id) => {
    try {
      const promisePool = chapters.map((item) => {
        return insertChapter([item.chapter_name, novel_id, item.chapter_n]);
      });
      Promise.all(promisePool);
    } catch (err) {
      formatAppLog("error", "at pages/read/hook/useCache.js:18", "插入章节失败:" + error.message);
    }
  };
  const selectAllChapters = (novel_id) => selectSql(`select * from chapters where novel_id=${novel_id}`);
  const getChapterList = async (novel_id) => {
    const savedChapters = await selectAllChapters(novel_id);
    if (savedChapters.length === 0) {
      const {
        data: chapterList
      } = await getNovelChapters(novel_id);
      saveChapters(chapterList, novel_id);
      return chapterList;
    } else {
      formatAppLog("log", "at pages/read/hook/useCache.js:34", "当前章节已经存储在数据库中");
      return savedChapters;
    }
  };
  const _sfc_main$s = {
    __name: "read",
    setup(__props, { expose: __expose }) {
      __expose();
      const {
        catalogShow,
        menuShow,
        maskShow,
        configShow,
        handelShowMenu,
        closeMenu,
        openConfigMenu
      } = usePopup();
      const {
        currentTime,
        batteryInfo
      } = getBottomInfo();
      const {
        theme,
        config: config2,
        changeFontSize,
        themeNames,
        setLineHeight,
        changeTheme
      } = useConfig();
      const store2 = useStore();
      const novel = vue.computed(() => store2.state.currentNovelDetail);
      formatAppLog("log", "at pages/read/read.vue:111", novel.value);
      const isLoading = vue.ref(true);
      const contentWidth = vue.ref(0);
      const instance = vue.ref(null);
      const offsetY = vue.ref(0);
      const chapterInfo = vue.reactive({
        chapterList: [],
        currentIndex: 0,
        chapterNameList: []
      });
      const currentChapter = vue.computed(() => {
        return chapterInfo.chapterList[chapterInfo.currentIndex];
      });
      const chapterNameScrollHeight = vue.ref(0);
      onLoad(async ({
        novel_id,
        chapter_n
      }) => {
        let currentChapter_n = chapter_n;
        const result = await isExistHistory(novel_id, "novel");
        if (result.length != 0) {
          currentChapter_n = result[0].chapter_n;
          offsetY.value = result[0].offsetY;
        }
        config2.novel_id = novel_id;
        const res = await getChapterContent(config2.novel_id, currentChapter_n);
        chapterInfo.chapterList = res.data.data;
      });
      const contentHeight = vue.ref(0);
      vue.onMounted(async () => {
        plus.navigator.setFullscreen(true);
        instance.value = vue.getCurrentInstance();
        const sysInfo = await getSystemInfo();
        chapterNameScrollHeight.value = sysInfo.screenHeight - sysInfo.statusBarHeight;
        setTimeout(async () => {
          chapterInfo.chapterNameList = await getChapterList(config2.novel_id);
          await calculateContentHeight();
          isLoading.value = false;
        }, 1e3);
      });
      onUnload(() => {
        plus.navigator.setFullscreen(false);
        saveHistory();
      });
      const saveHistory = async () => {
        const result = await isExistHistory(config2.novel_id, "novel");
        if (result.length != 0) {
          await updateHistory(
            config2.novel_id,
            currentChapter.value.chapter_n,
            currentChapter.value.chapter_name,
            offsetY.value
          );
        } else {
          await insertHistory({
            novel_id: config2.novel_id,
            offsetY: offsetY.value,
            type: "novel",
            ...currentChapter.value,
            ...novel.value
          });
        }
      };
      onHide(async () => {
        saveHistory();
      });
      const calculateContentHeight = async () => {
        const info = await getSelectorInfo(instance.value, ".read-bottom");
        const info2 = await getSelectorInfo(instance.value, ".read-top");
        const sysInfo = await getSystemInfo();
        contentHeight.value = sysInfo.screenHeight - info.height - info2.height - sysInfo.statusBarHeight;
      };
      const prevChapter = async () => {
        if (chapterInfo.currentIndex == 0 && currentChapter.value.chapter_n != 1) {
          isLoading.value = true;
          const startChapter_n = currentChapter.value.chapter_n - 10 < 0 ? 1 : currentChapter.value.chapter_n - 10;
          const targetChapter_n = currentChapter.value.chapter_n - 1;
          const res = await getChapterContent(config2.novel_id, startChapter_n);
          chapterInfo.chapterList = res.data.data;
          const targetIndex = chapterInfo.chapterList.findIndex((item) => item.chapter_n == targetChapter_n);
          chapterInfo.currentIndex = targetIndex;
          isLoading.value = false;
        } else {
          if (currentChapter.value.chapter_n != 1) {
            chapterInfo.currentIndex -= 1;
          }
        }
        vue.nextTick(() => {
          offsetY.value = 0;
        });
      };
      const nextChapter = async () => {
        const lastChapter_n = chapterInfo.chapterNameList[chapterInfo.chapterNameList.length - 1].chapter_n;
        const targetChapter_n = currentChapter.value.chapter_n + 1;
        if (targetChapter_n > lastChapter_n) {
          uni.showToast({
            icon: "none",
            title: "已经是最后一章了"
          });
          return;
        }
        if (chapterInfo.currentIndex == 9) {
          isLoading.value = true;
          let startChapter_n = targetChapter_n;
          if (currentChapter.value.chapter_n + 10 >= lastChapter_n) {
            startChapter_n = lastChapter_n - 10;
          }
          const res = await getChapterContent(config2.novel_id, startChapter_n);
          chapterInfo.chapterList = res.data.data;
          const targetIndex = chapterInfo.chapterList.findIndex((item) => item.chapter_n == targetChapter_n);
          chapterInfo.currentIndex = targetIndex;
          isLoading.value = false;
        } else {
          chapterInfo.currentIndex += 1;
        }
        vue.nextTick(() => {
          offsetY.value = 0;
        });
      };
      const openChapterContalog = () => {
        menuShow.value = false;
        setTimeout(() => {
          catalogShow.value = true;
        }, 300);
      };
      const btnOpenChapterContalog = () => {
        catalogShow.value = true;
        maskShow.value = true;
      };
      const changeChapter = async (chapter_n) => {
        isLoading.value = true;
        const res = await getChapterContent(config2.novel_id, chapter_n);
        chapterInfo.chapterList = res.data.data;
        chapterInfo.currentIndex = 0;
        closeMenu();
        setTimeout(() => {
          isLoading.value = false;
          offsetY.value = 0;
        }, 300);
      };
      const handelSliderChange = async (chapter_n) => {
        isLoading.value = true;
        const res = await getChapterContent(config2.novel_id, chapter_n + 1);
        chapterInfo.chapterList = res.data.data;
        chapterInfo.currentIndex = 0;
        offsetY.value = 0;
        isLoading.value = false;
      };
      const scrollTimer = vue.ref(null);
      const handelScroll = (e) => {
        if (scrollTimer.value) {
          clearTimeout(scrollTimer.value);
        }
        scrollTimer.value = setTimeout(() => {
          offsetY.value = e.detail.scrollTop;
        }, 300);
      };
      const __returned__ = { catalogShow, menuShow, maskShow, configShow, handelShowMenu, closeMenu, openConfigMenu, currentTime, batteryInfo, theme, config: config2, changeFontSize, themeNames, setLineHeight, changeTheme, store: store2, novel, isLoading, contentWidth, instance, offsetY, chapterInfo, currentChapter, chapterNameScrollHeight, contentHeight, saveHistory, calculateContentHeight, prevChapter, nextChapter, openChapterContalog, btnOpenChapterContalog, changeChapter, handelSliderChange, scrollTimer, handelScroll, readTop, readBottom, catalogpopup, bottomPopup, configPopup, get usePopup() {
        return usePopup;
      }, get onLoad() {
        return onLoad;
      }, get onUnload() {
        return onUnload;
      }, get onHide() {
        return onHide;
      }, get executeSql() {
        return executeSql;
      }, get getChapterContent() {
        return getChapterContent;
      }, get getNovelChapters() {
        return getNovelChapters;
      }, get insertChapter() {
        return insertChapter;
      }, get insertHistory() {
        return insertHistory;
      }, get isExistHistory() {
        return isExistHistory;
      }, get updateHistory() {
        return updateHistory;
      }, get getSelectorInfo() {
        return getSelectorInfo;
      }, get getSystemInfo() {
        return getSystemInfo;
      }, ref: vue.ref, onMounted: vue.onMounted, getCurrentInstance: vue.getCurrentInstance, reactive: vue.reactive, nextTick: vue.nextTick, computed: vue.computed, watch: vue.watch, get getBottomInfo() {
        return getBottomInfo;
      }, get useConfig() {
        return useConfig;
      }, get useStore() {
        return useStore;
      }, get getChapterList() {
        return getChapterList;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    var _a, _b, _c, _d, _e2, _f2, _g2, _h2;
    const _component_uv_loading_page = resolveEasycom(vue.resolveDynamicComponent("uv-loading-page"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "read-page",
        style: vue.normalizeStyle({ backgroundColor: $setup.theme.backgroundColor })
      },
      [
        vue.createCommentVNode(" 遮罩 "),
        $setup.maskShow ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "mask",
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.closeMenu && $setup.closeMenu(...args))
        })) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 加载页 "),
        vue.createVNode(_component_uv_loading_page, {
          loading: $setup.isLoading,
          bgColor: $setup.theme.backgroundColor,
          color: $setup.theme.contentColor,
          loadingColor: $setup.theme.contentColor,
          "loading-text": "加载中...",
          "font-size": "24rpx"
        }, null, 8, ["loading", "bgColor", "color", "loadingColor"]),
        vue.createVNode($setup["readTop"], {
          chapterName: (_a = $setup.currentChapter) == null ? void 0 : _a.chapter_name
        }, null, 8, ["chapterName"]),
        vue.createCommentVNode(" 内容区 "),
        $setup.chapterInfo.chapterList.length > 0 ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
          key: 1,
          onScroll: $setup.handelScroll,
          "scroll-top": $setup.offsetY,
          class: "content-contanier",
          style: vue.normalizeStyle({ height: $setup.contentHeight + "px" }),
          "scroll-y": "true"
        }, [
          vue.createElementVNode(
            "view",
            {
              class: "content",
              style: vue.normalizeStyle({ lineHeight: $setup.config.lineHeight })
            },
            [
              vue.createElementVNode("view", {
                onClick: _cache[1] || (_cache[1] = (...args) => $setup.handelShowMenu && $setup.handelShowMenu(...args)),
                class: "read-content",
                style: vue.normalizeStyle({ color: $setup.theme.contentColor, fontSize: $setup.config.fontSize + "px" }),
                innerHTML: (_b = $setup.currentChapter) == null ? void 0 : _b.content
              }, null, 12, ["innerHTML"]),
              vue.createElementVNode("view", { class: "btn-group" }, [
                vue.createElementVNode("button", {
                  style: vue.normalizeStyle({ backgroundColor: $setup.theme.configBtnBcg, color: $setup.theme.contentColor }),
                  onClick: $setup.prevChapter,
                  disabled: ((_c = $setup.currentChapter) == null ? void 0 : _c.chapter_n) == 1
                }, "上一章", 12, ["disabled"]),
                vue.createElementVNode(
                  "button",
                  {
                    style: vue.normalizeStyle({ backgroundColor: $setup.theme.configBtnBcg, color: $setup.theme.contentColor }),
                    onClick: $setup.btnOpenChapterContalog
                  },
                  " 目录 ",
                  4
                  /* STYLE */
                ),
                vue.createElementVNode("button", {
                  style: vue.normalizeStyle({ backgroundColor: $setup.theme.configBtnBcg, color: $setup.theme.contentColor }),
                  onClick: $setup.nextChapter,
                  disabled: ((_d = $setup.currentChapter) == null ? void 0 : _d.chapter_n) >= ((_e2 = $setup.chapterInfo.chapterList[$setup.chapterInfo.chapterList.length - 1]) == null ? void 0 : _e2.chapter_n)
                }, "下一章", 12, ["disabled"])
              ])
            ],
            4
            /* STYLE */
          )
        ], 44, ["scroll-top"])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 目录弹出层 "),
        vue.createVNode($setup["catalogpopup"], {
          chapterNameScrollHeight: $setup.chapterNameScrollHeight,
          chapterNameList: $setup.chapterInfo.chapterNameList,
          catalogShow: $setup.catalogShow,
          theme: $setup.theme,
          currentChapter_n: (_f2 = $setup.currentChapter) == null ? void 0 : _f2.chapter_n,
          onChangeChapter: $setup.changeChapter
        }, null, 8, ["chapterNameScrollHeight", "chapterNameList", "catalogShow", "theme", "currentChapter_n"]),
        vue.createCommentVNode(" 底部弹出层 "),
        vue.createVNode($setup["bottomPopup"], {
          novel_id: Number($setup.config.novel_id),
          currentChapter_n: (_g2 = $setup.currentChapter) == null ? void 0 : _g2.chapter_n,
          onOpenConfig: $setup.openConfigMenu,
          onOpenChapterContalog: $setup.openChapterContalog,
          onNextChapter: $setup.nextChapter,
          onPrevChapter: $setup.prevChapter,
          onChangeDarkOrBright: $setup.changeTheme,
          onHandelSliderChange: $setup.handelSliderChange,
          menuShow: $setup.menuShow,
          themeStyle: $setup.theme,
          isDarkTheme: $setup.config.currentTheme == "dark",
          chapterNameList: $setup.chapterInfo.chapterNameList,
          currentChapterName: (_h2 = $setup.currentChapter) == null ? void 0 : _h2.chapter_name
        }, null, 8, ["novel_id", "currentChapter_n", "onOpenConfig", "onChangeDarkOrBright", "menuShow", "themeStyle", "isDarkTheme", "chapterNameList", "currentChapterName"]),
        vue.createCommentVNode(" 设置弹出层 "),
        vue.createVNode($setup["configPopup"], {
          fontSize: $setup.config.fontSize,
          show: $setup.configShow,
          themeStyle: $setup.theme,
          onChangeFontSize: $setup.changeFontSize,
          themeList: $setup.themeNames,
          onChangeTheme: $setup.changeTheme,
          onSetLineHeight: $setup.setLineHeight,
          currentLineHeight: $setup.config.lineHeight
        }, null, 8, ["fontSize", "show", "themeStyle", "onChangeFontSize", "themeList", "onChangeTheme", "onSetLineHeight", "currentLineHeight"]),
        vue.createVNode($setup["readBottom"], {
          theme: $setup.theme,
          currentTime: $setup.currentTime,
          batteryInfo: $setup.batteryInfo
        }, null, 8, ["theme", "currentTime", "batteryInfo"])
      ],
      4
      /* STYLE */
    );
  }
  const PagesReadRead = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__file", "D:/APP/novel-app/novel-app/pages/read/read.vue"]]);
  const _sfc_main$r = {
    __name: "row",
    props: {
      bookList: {
        default: Array,
        default: () => []
      }
    },
    emits: ["operate"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const emits = __emit;
      const operate = (info) => {
        emits("operate", info);
      };
      const __returned__ = { emits, operate };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_image = resolveEasycom(vue.resolveDynamicComponent("uv-image"), __easycom_1$3);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "book-list" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.bookList, (item) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "book-item",
            key: item.novel_id
          }, [
            vue.createVNode(_component_uv_image, {
              src: item.cover,
              "lazy-load": "",
              observeLazyLoad: "",
              fade: "",
              radius: "5",
              width: "80",
              height: "100",
              mode: "aspectCover"
            }, null, 8, ["src"]),
            vue.createElementVNode("view", { class: "info" }, [
              vue.createElementVNode(
                "view",
                { class: "name" },
                vue.toDisplayString(item.name),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "hasRead" },
                vue.toDisplayString(item.hasRead ? `读到：${item.hasRead}` : "未读"),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "status" },
                vue.toDisplayString(item.status),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "btn" }, [
              vue.createVNode(_component_uv_icon, {
                onClick: ($event) => $setup.operate(item),
                name: "more",
                "custom-prefix": "custom-icon",
                size: "20",
                color: "#989898"
              }, null, 8, ["onClick"])
            ])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const rowVue = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__scopeId", "data-v-ad543c46"], ["__file", "D:/APP/novel-app/novel-app/pages/bookshelf/components/row.vue"]]);
  const _sfc_main$q = {
    __name: "column",
    props: {
      bookList: {
        default: Array,
        default: () => []
      }
    },
    emits: ["operate"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const emits = __emit;
      const props2 = __props;
      const operate = (info) => {
        emits("operate", info);
      };
      const __returned__ = { emits, props: props2, operate, onMounted: vue.onMounted };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_image = resolveEasycom(vue.resolveDynamicComponent("uv-image"), __easycom_1$3);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "book-grid" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.bookList, (item, index2) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "book-item",
            key: item.novel_id
          }, [
            vue.createElementVNode("view", { class: "cover" }, [
              vue.createVNode(_component_uv_image, {
                src: item.cover,
                "lazy-load": "",
                observeLazyLoad: "",
                fade: "",
                radius: "5",
                width: "100%",
                height: "160"
              }, null, 8, ["src"]),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["finish", item.status == "完结" ? "" : "renew"])
                },
                vue.toDisplayString(item.status),
                3
                /* TEXT, CLASS */
              )
            ]),
            vue.createElementVNode(
              "view",
              { class: "name" },
              vue.toDisplayString(item.name),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "bottom" }, [
              vue.createElementVNode(
                "view",
                { class: "chapter" },
                vue.toDisplayString(item.hasRead ? `读到：${item.hasRead}` : "未读"),
                1
                /* TEXT */
              ),
              vue.createVNode(_component_uv_icon, {
                onClick: ($event) => $setup.operate(item),
                name: "more",
                "custom-prefix": "custom-icon",
                size: "14",
                color: "#989898"
              }, null, 8, ["onClick"])
            ])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const columnVue = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__scopeId", "data-v-2e360cc4"], ["__file", "D:/APP/novel-app/novel-app/pages/bookshelf/components/column.vue"]]);
  const _sfc_main$p = {
    __name: "modal",
    props: {
      title: {
        // modal标题
        default: "hello",
        type: String
      },
      // 确认按钮文字
      confirmText: {
        default: "确定",
        type: String
      },
      // 按钮是否反向排列
      btnReverse: {
        default: false,
        type: Boolean
      },
      // 是否点击遮罩关闭modal
      closeOnClickOverlay: {
        default: false,
        type: Boolean
      }
    },
    emits: ["confirm"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const modal = vue.ref(null);
      const emits = __emit;
      const open = () => {
        modal.value.open();
      };
      const cancel = () => {
        modal.value.close();
      };
      const confirm = () => {
        modal.value.close();
        emits("confirm");
      };
      __expose({
        open
      });
      const __returned__ = { modal, emits, open, cancel, confirm, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_1);
    return vue.openBlock(), vue.createBlock(_component_uv_popup, {
      round: 10,
      ref: "modal",
      bgColor: "#fff",
      closeOnClickOverlay: $props.closeOnClickOverlay
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("view", {
          class: "modal",
          mode: "center"
        }, [
          vue.createElementVNode("view", {
            class: "content",
            innerHTML: $props.title
          }, null, 8, ["innerHTML"]),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["btn", $props.btnReverse ? "reverse" : ""])
            },
            [
              vue.createElementVNode(
                "view",
                {
                  class: "btn-left",
                  onClick: $setup.confirm
                },
                vue.toDisplayString($props.confirmText),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", {
                class: "btn-right",
                onClick: $setup.cancel
              }, "取消")
            ],
            2
            /* CLASS */
          )
        ])
      ]),
      _: 1
      /* STABLE */
    }, 8, ["closeOnClickOverlay"]);
  }
  const modalVue = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-ef206254"], ["__file", "D:/APP/novel-app/novel-app/components/modal/modal.vue"]]);
  const _sfc_main$o = {
    __name: "operation",
    props: {
      currentBook: {
        required: true
      }
    },
    emits: ["confirmDelete"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const popup = vue.ref(null);
      const modal = vue.ref(null);
      const handelList = vue.ref([
        {
          icon: "zhiding",
          custom: true,
          size: 25,
          name: "置顶",
          onTap() {
            formatAppLog("log", "at pages/bookshelf/components/operation.vue:45", "content");
          }
        },
        {
          icon: "content",
          custom: true,
          size: 17,
          name: "目录",
          onTap() {
            formatAppLog("log", "at pages/bookshelf/components/operation.vue:54", "content");
          }
        },
        {
          icon: "download",
          custom: false,
          size: 25,
          name: "下载本书",
          onTap() {
            formatAppLog("log", "at pages/bookshelf/components/operation.vue:63", "dowload");
          }
        },
        {
          icon: "reload",
          custom: false,
          size: 25,
          name: "清除缓存",
          onTap() {
            formatAppLog("log", "at pages/bookshelf/components/operation.vue:72", "reload");
          }
        },
        {
          icon: "trash",
          custom: false,
          size: 25,
          name: "删除",
          onTap: () => {
            popup.value.close();
            modal.value.open();
          }
        }
      ]);
      const open = () => {
        popup.value.open();
      };
      const emits = __emit;
      const confirm = () => {
        emits("confirmDelete");
      };
      __expose({
        open
      });
      const __returned__ = { popup, modal, handelList, open, emits, confirm, ref: vue.ref, modalVue };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_image = resolveEasycom(vue.resolveDynamicComponent("uv-image"), __easycom_1$3);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createVNode(
          _component_uv_popup,
          {
            safeAreaInsetBottom: false,
            round: 10,
            ref: "popup",
            mode: "bottom",
            bgColor: "#F6F7F9"
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "handel-box" }, [
                vue.createElementVNode("view", { class: "top" }, [
                  vue.createVNode(_component_uv_image, {
                    src: $props.currentBook.cover,
                    "lazy-load": "",
                    observeLazyLoad: "",
                    fade: "",
                    radius: "5",
                    width: "70",
                    height: "90"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "r" }, [
                    vue.createElementVNode(
                      "view",
                      { class: "name" },
                      vue.toDisplayString($props.currentBook.name),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      { class: "author" },
                      vue.toDisplayString($props.currentBook.author),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { class: "handel-list" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($setup.handelList, (item, index2) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "handel-item",
                        key: index2
                      }, [
                        vue.createElementVNode("view", { class: "icon" }, [
                          !item.custom ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                            key: 0,
                            size: item.size,
                            name: item.icon,
                            onClick: item.onTap
                          }, null, 8, ["size", "name", "onClick"])) : (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                            key: 1,
                            name: item.icon,
                            "custom-prefix": "custom-icon",
                            onClick: item.onTap,
                            size: item.size
                          }, null, 8, ["name", "onClick", "size"]))
                        ]),
                        vue.createElementVNode(
                          "view",
                          { class: "name" },
                          vue.toDisplayString(item.name),
                          1
                          /* TEXT */
                        )
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              vue.createElementVNode("button", {
                style: { "margin": "10rpx" },
                onClick: _cache[0] || (_cache[0] = ($event) => $setup.popup.close())
              }, "取消")
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        ),
        vue.createVNode(
          $setup["modalVue"],
          {
            btnReverse: "",
            ref: "modal",
            title: "确认将本书从书架移除",
            onConfirm: $setup.confirm,
            confirmText: "移除"
          },
          null,
          512
          /* NEED_PATCH */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const operationVue = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-d7954f0b"], ["__file", "D:/APP/novel-app/novel-app/pages/bookshelf/components/operation.vue"]]);
  function isNumeric(value2) {
    return /^(-)?\d+(\.\d+)?$/.test(value2);
  }
  function isDef(value2) {
    return value2 !== void 0 && value2 !== null;
  }
  function addUnit(value2) {
    if (!isDef(value2)) {
      return null;
    }
    value2 = String(value2);
    return isNumeric(value2) ? `${value2}px` : value2;
  }
  const _sfc_main$n = vue.defineComponent({
    name: "l-empty",
    props: {
      description: String,
      imageSize: {
        type: [String, Number, Array]
      },
      image: {
        type: String,
        default: "default"
      }
    },
    setup(props2) {
      const PRESETS = ["error", "search", "default", "network", "cart", "404", "message", "coupon", "comment", "express", "order", "address"];
      const imageUrl = vue.computed(() => {
        if (PRESETS.includes(props2.image)) {
          return "/uni_modules/lime-empty/static/" + props2.image + ".png";
        }
        return props2.image;
      });
      const styles = vue.computed(() => {
        const style = {};
        const imageSize = props2.imageSize;
        if (imageSize == null) {
          return style;
        }
        if (Array.isArray(imageSize) && imageSize.length > 0) {
          const width2 = addUnit(imageSize[0]);
          addUnit(imageSize[1]);
          style["width"] = width2;
          style["height"] = addUnit(imageSize[1]);
          return style;
        }
        const width = addUnit(imageSize);
        style["width"] = width;
        return style;
      });
      return {
        styles,
        imageUrl
      };
    }
  });
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "l-empty" }, [
      _ctx.image ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 0,
        class: "l-empty__image",
        style: vue.normalizeStyle([_ctx.styles]),
        mode: "widthFix",
        src: _ctx.imageUrl
      }, null, 12, ["src"])) : vue.createCommentVNode("v-if", true),
      _ctx.description ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 1,
          class: "l-empty__description"
        },
        vue.toDisplayString(_ctx.description),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "l-empty__bottom" }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-569a5b26"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/lime-empty/components/l-empty/l-empty.vue"]]);
  const _sfc_main$m = {
    __name: "empty",
    props: {
      desc: {
        default: "",
        type: String
      }
    },
    emits: ["onNoDataBtn"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const emits = __emit;
      const onNoDataBtn = () => {
        uni.switchTab({
          url: "/pages/home/index"
        });
        emits("onNoDataBtn");
      };
      const __returned__ = { emits, onNoDataBtn };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_empty = resolveEasycom(vue.resolveDynamicComponent("l-empty"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "empty-container" }, [
      vue.createVNode(_component_l_empty, { description: $props.desc }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", {
            class: "nodata-btn",
            onClick: $setup.onNoDataBtn
          }, "去书城逛逛")
        ]),
        _: 1
        /* STABLE */
      }, 8, ["description"])
    ]);
  }
  const emptyVue = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-c668eefc"], ["__file", "D:/APP/novel-app/novel-app/pages/bookshelf/components/empty.vue"]]);
  const _sfc_main$l = {
    __name: "bookshelf",
    setup(__props, { expose: __expose }) {
      __expose();
      const {
        currentActiveTabbar,
        pageChange,
        handelTopChange
      } = useSlide();
      const isList = vue.ref(true);
      const popup = vue.ref(null);
      const confirm = async () => {
        const key = bookShellTitle.value[currentActiveTabbar.value].key;
        await deleteFromBookShell(currentBook.value.novel_id, key);
        const bookIndex = bookShellList[key].findIndex((item) => item.novel_id == currentBook.value.novel_id);
        bookShellList[key].splice(bookIndex, 1);
      };
      const bookShellTitle = vue.ref([{
        key: "novel",
        value: "小说"
      }, {
        key: "comic",
        value: "漫画"
      }]);
      const bookClasses = vue.computed(() => bookShellTitle.value.map((item) => item.value));
      const bookShellList = vue.reactive({
        novel: [],
        comic: []
      });
      const currentBookShell = vue.ref(0);
      onShow(async () => {
        const novelList2 = await getBookShellList();
        const comicList = await getBookShellList("comic");
        bookShellList.novel = await parseBookList(novelList2, "novel");
        bookShellList.comic = await parseBookList(comicList, "comic");
      });
      const bookShellContainerHeight = vue.ref(0);
      vue.onMounted(async () => {
        const instance = vue.getCurrentInstance();
        const headerInfo = await getSelectorInfo(instance, ".header");
        const systemInfo2 = await getSystemInfo();
        bookShellContainerHeight.value = systemInfo2.windowHeight - headerInfo.height;
      });
      const parseBookList = async (bookList, type) => {
        let newList = await Promise.all(bookList.map((item) => {
          return isExistHistory(item.novel_id, type).then((isExist) => {
            const hasRead = isExist.length > 0 ? isExist[0].chapter_name : null;
            const read_time = isExist.length > 0 ? isExist[0].read_time : 0;
            return {
              ...item,
              hasRead,
              read_time
            };
          });
        }));
        newList = newList.sort((a, b) => {
          const dateA = new Date(a.read_time);
          const dateB = new Date(b.read_time);
          return dateA - dateB;
        });
        return newList;
      };
      const currentBook = vue.ref(null);
      const handelAct = (info) => {
        currentBook.value = info;
        popup.value.open();
      };
      const changeLayoutStyle = () => {
        isList.value = !isList.value;
      };
      const goToSearch = () => {
        uni.navigateTo({
          url: "/pages/search/search"
        });
      };
      const onNoDataBtn = () => {
        EventBus.emit("changeTab", currentActiveTabbar.value);
      };
      const __returned__ = { currentActiveTabbar, pageChange, handelTopChange, isList, popup, confirm, bookShellTitle, bookClasses, bookShellList, currentBookShell, bookShellContainerHeight, parseBookList, currentBook, handelAct, changeLayoutStyle, goToSearch, onNoDataBtn, getCurrentInstance: vue.getCurrentInstance, onMounted: vue.onMounted, ref: vue.ref, reactive: vue.reactive, computed: vue.computed, get deleteFromBookShell() {
        return deleteFromBookShell;
      }, get getBookShellList() {
        return getBookShellList;
      }, get isExistHistory() {
        return isExistHistory;
      }, get getSystemInfo() {
        return getSystemInfo;
      }, get getSelectorInfo() {
        return getSelectorInfo;
      }, rowVue, columnVue, operationVue, emptyVue, midAreaVue: ComponentsHomeMidAreaMidArea, midAreaItemVue, get onShow() {
        return onShow;
      }, novelListVue: novelList, get useSlide() {
        return useSlide;
      }, get EventBus() {
        return EventBus;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "bookshell-page" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", { class: "status-bar" }),
        vue.createElementVNode("view", { class: "action-container" }, [
          vue.createElementVNode("view", { class: "class-list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.bookClasses, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  onClick: ($event) => $setup.currentActiveTabbar = index2,
                  class: vue.normalizeClass(["item", $setup.currentActiveTabbar == index2 ? "active" : ""]),
                  key: index2
                }, vue.toDisplayString(item), 11, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "btn" }, [
            vue.createVNode(_component_uv_icon, {
              onClick: $setup.goToSearch,
              size: "60rpx",
              name: "search",
              color: "#000"
            }),
            vue.createVNode(_component_uv_icon, {
              onClick: $setup.changeLayoutStyle,
              size: "60rpx",
              name: $setup.isList ? "list-dot" : "grid",
              color: "#000"
            }, null, 8, ["name"])
          ])
        ])
      ]),
      vue.createVNode($setup["midAreaVue"], {
        background: "#fff",
        height: $setup.bookShellContainerHeight,
        length: 2,
        current: $setup.currentActiveTabbar,
        onPageChange: $setup.pageChange
      }, {
        default: vue.withCtx(() => [
          vue.createVNode($setup["midAreaItemVue"], {
            refresh: false,
            customStyle: { padding: 0 }
          }, {
            default: vue.withCtx(() => [
              $setup.bookShellList.novel.length == 0 ? (vue.openBlock(), vue.createBlock($setup["emptyVue"], {
                key: 0,
                onOnNoDataBtn: $setup.onNoDataBtn,
                desc: "书架暂无书籍"
              })) : (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 1 },
                [
                  $setup.isList ? (vue.openBlock(), vue.createBlock($setup["rowVue"], {
                    key: 0,
                    bookList: $setup.bookShellList.novel,
                    onOperate: $setup.handelAct
                  }, null, 8, ["bookList"])) : (vue.openBlock(), vue.createBlock($setup["columnVue"], {
                    key: 1,
                    bookList: $setup.bookShellList.novel,
                    onOperate: $setup.handelAct
                  }, null, 8, ["bookList"]))
                ],
                64
                /* STABLE_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode($setup["midAreaItemVue"], {
            refresh: false,
            customStyle: { padding: 0 }
          }, {
            default: vue.withCtx(() => [
              $setup.bookShellList.comic.length == 0 ? (vue.openBlock(), vue.createBlock($setup["emptyVue"], {
                key: 0,
                onOnNoDataBtn: $setup.onNoDataBtn,
                desc: "书架暂无书籍"
              })) : (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 1 },
                [
                  $setup.isList ? (vue.openBlock(), vue.createBlock($setup["rowVue"], {
                    key: 0,
                    bookList: $setup.bookShellList.comic,
                    onOperate: $setup.handelAct
                  }, null, 8, ["bookList"])) : (vue.openBlock(), vue.createBlock($setup["columnVue"], {
                    key: 1,
                    bookList: $setup.bookShellList.comic,
                    onOperate: $setup.handelAct
                  }, null, 8, ["bookList"]))
                ],
                64
                /* STABLE_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["height", "current", "onPageChange"]),
      vue.createCommentVNode(" 书籍操作弹出层 "),
      vue.createVNode($setup["operationVue"], {
        ref: "popup",
        currentBook: $setup.currentBook,
        onConfirmDelete: $setup.confirm
      }, null, 8, ["currentBook"])
    ]);
  }
  const PagesBookshelfBookshelf = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-babe43ef"], ["__file", "D:/APP/novel-app/novel-app/pages/bookshelf/bookshelf.vue"]]);
  const _sfc_main$k = {
    __name: "classbody",
    props: {
      classContainerHeight: {
        type: Number,
        default: 0
      },
      classItemList: {
        type: Array,
        default: () => []
      },
      active: {
        type: Number,
        default: 0
      },
      bookList: {
        type: Array,
        default: () => []
      },
      loadingStatus: {
        type: String,
        default: "loading"
      }
    },
    emits: ["changeType", "scrolltolower", "onListLayout"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const emits = __emit;
      const store2 = useStore();
      const scrollTop = vue.ref(0);
      const props2 = __props;
      const instance = vue.getCurrentInstance();
      const isShowLoadingMore = vue.ref(true);
      vue.watch(() => props2.bookList, () => {
        vue.nextTick(async () => {
          const info = await getSelectorInfo(instance, ".book-list");
          isShowLoadingMore.value = props2.classContainerHeight < info.height;
        });
      });
      const changeGenre = (index2, className) => {
        scrollTop.value = 0;
        emits("changeType", {
          index: index2,
          className
        });
      };
      const scrolltolower = () => {
        emits("scrolltolower");
      };
      const scrollTimer = vue.ref(null);
      const handelScroll = (e) => {
        if (scrollTimer.value) {
          clearTimeout(scrollTimer.value);
        }
        scrollTimer.value = setTimeout(() => {
          scrollTop.value = 0;
        }, 300);
      };
      const goToDetail = (bookInfo) => {
        store2.commit("setCurrentNovelDetail", bookInfo);
        uni.navigateTo({
          url: "/pages/nove-detail/index",
          animationType: "slide-in-right"
        });
      };
      const __returned__ = { emits, store: store2, scrollTop, props: props2, instance, isShowLoadingMore, changeGenre, scrolltolower, scrollTimer, handelScroll, goToDetail, ref: vue.ref, watch: vue.watch, nextTick: vue.nextTick, getCurrentInstance: vue.getCurrentInstance, get useStore() {
        return useStore;
      }, loadingVue, get getSelectorInfo() {
        return getSelectorInfo;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_empty = resolveEasycom(vue.resolveDynamicComponent("l-empty"), __easycom_0$1);
    const _component_uv_image = resolveEasycom(vue.resolveDynamicComponent("uv-image"), __easycom_1$3);
    const _component_uv_load_more = resolveEasycom(vue.resolveDynamicComponent("uv-load-more"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "class-container" }, [
      vue.createElementVNode("view", { class: "l" }, [
        vue.createElementVNode("scroll-view", {
          "scroll-into-view": "classItem-" + $props.active,
          style: vue.normalizeStyle({ height: $props.classContainerHeight + "px" }),
          "scroll-y": "true"
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($props.classItemList, (className, index2) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                onClick: ($event) => $setup.changeGenre(index2, className),
                id: "classItem-" + index2,
                class: vue.normalizeClass(["class-item", index2 == $props.active ? "active" : ""]),
                key: index2
              }, vue.toDisplayString(className), 11, ["onClick", "id"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ], 12, ["scroll-into-view"])
      ]),
      vue.createElementVNode(
        "view",
        {
          class: "r",
          style: vue.normalizeStyle({ height: $props.classContainerHeight + "px" })
        },
        [
          $props.bookList.length == 0 ? (vue.openBlock(), vue.createBlock($setup["loadingVue"], { key: 0 })) : (vue.openBlock(), vue.createElementBlock("scroll-view", {
            key: 1,
            onScroll: $setup.handelScroll,
            onScrolltolower: $setup.scrolltolower,
            "lower-threshold": 300,
            "scroll-top": $setup.scrollTop,
            style: vue.normalizeStyle({ height: $props.classContainerHeight + "px" }),
            "scroll-y": "true"
          }, [
            $props.bookList.length === 0 ? (vue.openBlock(), vue.createBlock(_component_l_empty, {
              key: 0,
              description: "没有找到相关内容"
            })) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              [
                vue.createElementVNode("view", { class: "book-list" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($props.bookList, (book) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        onClick: ($event) => $setup.goToDetail(book),
                        class: "book-item",
                        key: book.id
                      }, [
                        vue.createElementVNode("view", { style: { "width": "70px", "height": "100px" } }, [
                          vue.createVNode(_component_uv_image, {
                            src: book.cover,
                            "lazy-load": "",
                            observeLazyLoad: "",
                            fade: "",
                            radius: "5",
                            width: "70",
                            height: "100"
                          }, null, 8, ["src"])
                        ]),
                        vue.createElementVNode("view", { class: "info" }, [
                          vue.createElementVNode(
                            "view",
                            { class: "name" },
                            vue.toDisplayString(book.name),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "view",
                            { class: "author" },
                            vue.toDisplayString(book.author),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "view",
                            { class: "intro" },
                            vue.toDisplayString(book.intro),
                            1
                            /* TEXT */
                          )
                        ])
                      ], 8, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                $setup.isShowLoadingMore ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  style: { "padding": "10rpx 0" }
                }, [
                  vue.createVNode(_component_uv_load_more, {
                    status: $props.loadingStatus,
                    loadingText: "努力加载中",
                    nomoreText: "实在没有了"
                  }, null, 8, ["status"])
                ])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ], 44, ["scroll-top"]))
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const classbodyVue = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-d8c501cb"], ["__file", "D:/APP/novel-app/novel-app/pages/class/components/classbody.vue"]]);
  const _sfc_main$j = {
    __name: "class",
    setup(__props, { expose: __expose }) {
      __expose();
      const {
        tabBarList,
        currentPage,
        currentActiveTabbar,
        pageChange,
        handelTopChange,
        pageList
      } = useSlide();
      const instance = vue.getCurrentInstance();
      const classContainerHeight = vue.ref(0);
      const novelClassList = vue.reactive({
        novel: {
          classItemList: [],
          active: 0,
          bookList: []
        },
        comic: {
          classItemList: [],
          active: 0,
          bookList: []
        }
      });
      vue.watch(currentPage, async (newVal) => {
        if (!newVal.hasShown) {
          if (newVal.name !== pageList.value[0].name) {
            await pageFirstShow();
          }
          pageList.value[currentActiveTabbar.value] = {
            ...newVal,
            hasShown: true
          };
        }
      });
      const novelList2 = vue.computed(() => {
        var _a;
        return (_a = novelClassList.novel.bookList[novelClassList.novel.active]) == null ? void 0 : _a.list;
      });
      const comicList = vue.computed(() => {
        var _a;
        return (_a = novelClassList.comic.bookList[novelClassList.comic.active]) == null ? void 0 : _a.list;
      });
      const loadingStatus = vue.computed(() => {
        var _a;
        const pageName = currentPage.value.name;
        const activeIndex = novelClassList[pageName].active;
        return (_a = novelClassList[pageName].bookList[activeIndex]) == null ? void 0 : _a.loadingStadus;
      });
      vue.onMounted(async () => {
        const sysInfo = await getSystemInfo();
        const headerInfo = await getSelectorInfo(instance, ".header");
        classContainerHeight.value = sysInfo.windowHeight - headerInfo.height;
        await pageFirstShow();
      });
      const pageFirstShow = async () => {
        let novelClassRes;
        let novelListRes;
        const currentPageName = currentPage.value.name;
        if (currentPageName == "novel") {
          novelClassRes = await getNovelAllClass();
          novelListRes = await getNovelByGenre(novelClassRes.data.data[0], 10, 0);
        } else if (currentPageName == "comic") {
          novelClassRes = await getComicAllClass();
          novelListRes = await getComicByGenre(novelClassRes.data.data[0], 10, 0);
        }
        novelClassList[currentPageName].classItemList = novelClassRes.data.data;
        novelClassList[currentPageName].bookList[novelClassList[currentPageName].active] = {
          size: 10,
          offset: 0,
          loadingStadus: "loading",
          list: novelListRes.data.data.map((item) => ({
            ...item,
            type: currentPageName
          }))
        };
      };
      const changeType = async ({
        index: index2,
        className
      }) => {
        const pageName = currentPage.value.name;
        novelClassList[pageName].active = index2;
        if (novelClassList[pageName].bookList[index2])
          return;
        let novelListRes;
        if (pageName == "novel") {
          novelListRes = await getNovelByGenre(className, 10, 0);
        } else if (pageName == "comic") {
          novelListRes = await getComicByGenre(className, 10, 0);
        }
        novelClassList[pageName].bookList[index2] = {
          size: 10,
          offset: 0,
          loadingStadus: "loading",
          list: novelListRes.data.data.map((item) => ({
            ...item,
            type: pageName
          }))
        };
      };
      const getMoreClassList = async () => {
        if (loadingStatus.value == "nomore")
          return;
        const pageName = currentPage.value.name;
        const activeIndex = novelClassList[pageName].active;
        const className = novelClassList[pageName].classItemList[activeIndex];
        novelClassList[pageName].bookList[activeIndex].offset += novelClassList[pageName].bookList[activeIndex].size;
        let novelListRes;
        if (pageName == "novel") {
          novelListRes = await getNovelByGenre(className, 10, novelClassList[pageName].bookList[activeIndex].offset);
        } else if (pageName == "comic") {
          novelListRes = await getComicByGenre(className, 10, novelClassList[pageName].bookList[activeIndex].offset);
        }
        if (novelListRes.data.data.length === 0) {
          novelClassList[pageName].bookList[activeIndex].loadingStadus = "nomore";
          return;
        }
        novelClassList[pageName].bookList[activeIndex].list = [
          ...novelClassList[pageName].bookList[activeIndex].list,
          ...novelListRes.data.data
        ];
      };
      const goToSearch = () => {
        uni.navigateTo({
          url: "/pages/search/search"
        });
      };
      const __returned__ = { tabBarList, currentPage, currentActiveTabbar, pageChange, handelTopChange, pageList, instance, classContainerHeight, novelClassList, novelList: novelList2, comicList, loadingStatus, pageFirstShow, changeType, getMoreClassList, goToSearch, topbar: topTabbar, get useSlider() {
        return useSlide;
      }, pageLoadingVue, midAreaVue: ComponentsHomeMidAreaMidArea, midAreaItemVue, getCurrentInstance: vue.getCurrentInstance, onMounted: vue.onMounted, ref: vue.ref, reactive: vue.reactive, computed: vue.computed, watch: vue.watch, get getSystemInfo() {
        return getSystemInfo;
      }, get getSelectorInfo() {
        return getSelectorInfo;
      }, classbodyVue, get getComicAllClass() {
        return getComicAllClass;
      }, get getComicByGenre() {
        return getComicByGenre;
      }, get getNovelAllClass() {
        return getNovelAllClass;
      }, get getNovelByGenre() {
        return getNovelByGenre;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "class-page" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", { class: "status-bar" }),
        vue.createElementVNode("view", { class: "action-container" }, [
          vue.createElementVNode("view", { class: "class-list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.tabBarList, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  onClick: ($event) => $setup.currentActiveTabbar = index2,
                  class: vue.normalizeClass(["item", $setup.currentActiveTabbar == index2 ? "active" : ""]),
                  key: index2
                }, vue.toDisplayString(item), 11, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "btn" }, [
            vue.createVNode(_component_uv_icon, {
              onClick: $setup.goToSearch,
              size: "60rpx",
              name: "search",
              color: "#000"
            })
          ])
        ])
      ]),
      vue.createVNode($setup["midAreaVue"], {
        height: $setup.classContainerHeight,
        length: $setup.tabBarList.length,
        pageName: $setup.currentPage.name,
        current: $setup.currentActiveTabbar,
        onPageChange: $setup.pageChange
      }, {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.pageList, (page2, index2) => {
              return vue.openBlock(), vue.createBlock(
                $setup["midAreaItemVue"],
                {
                  key: index2,
                  refresh: false,
                  customStyle: { padding: 0 }
                },
                {
                  default: vue.withCtx(() => [
                    vue.createVNode($setup["classbodyVue"], {
                      onScrolltolower: $setup.getMoreClassList,
                      onChangeType: $setup.changeType,
                      classContainerHeight: $setup.classContainerHeight,
                      classItemList: $setup.novelClassList[page2.name].classItemList,
                      active: $setup.novelClassList[page2.name].active,
                      bookList: page2.name == "novel" ? $setup.novelList : $setup.comicList,
                      loadingStatus: $setup.loadingStatus
                    }, null, 8, ["classContainerHeight", "classItemList", "active", "bookList", "loadingStatus"])
                  ]),
                  _: 2
                  /* DYNAMIC */
                },
                1024
                /* DYNAMIC_SLOTS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }, 8, ["height", "length", "pageName", "current", "onPageChange"])
    ]);
  }
  const PagesClassClass = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-23c40782"], ["__file", "D:/APP/novel-app/novel-app/pages/class/class.vue"]]);
  const _imports_0 = "/static/logo.png";
  const _sfc_main$i = {
    __name: "user",
    setup(__props, { expose: __expose }) {
      __expose();
      const store2 = useStore();
      const readInfo = vue.reactive({
        collectionCount: 0,
        browseCount: 0
      });
      onShow(async () => {
        const [{
          collections
        }] = await getBookShellCount();
        readInfo.collectionCount = collections;
        const [{
          browseCount
        }] = await getBrowseCount();
        readInfo.browseCount = browseCount;
      });
      const handelShareApp = () => {
        uni.shareWithSystem({
          summary: "番猫小说\n免费开源好用得阅读APP\n热门小说、漫画免费看\n官网地址：https://www.douyin.com/?recommend=1\ngithub地址：https://github.com/ITSTRONGERMAN/novel-app",
          success() {
          }
        });
      };
      const handelAboutApp = () => {
        uni.navigateTo({
          url: "/pages/aboutus/aboutus"
        });
      };
      const goToHistory = () => {
        uni.navigateTo({
          url: "/pages/history/history"
        });
      };
      const goToLogin = () => {
        uni.navigateTo({
          url: "/pages/login/login"
        });
      };
      const reward = () => {
      };
      const __returned__ = { store: store2, readInfo, handelShareApp, handelAboutApp, goToHistory, goToLogin, reward, ref: vue.ref, onMounted: vue.onMounted, reactive: vue.reactive, get EventBus() {
        return EventBus;
      }, get onShow() {
        return onShow;
      }, get useStore() {
        return useStore;
      }, get getBookShellCount() {
        return getBookShellCount;
      }, get getBrowseCount() {
        return getBrowseCount;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "user-contanier" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", { class: "status-bar" }),
        vue.createElementVNode("view", { class: "login-contanier" }, [
          vue.createElementVNode("image", {
            src: _imports_0,
            mode: "",
            class: "headImg"
          }),
          vue.createElementVNode("view", { class: "userInfo" }, [
            vue.createElementVNode("view", {
              class: "user-name",
              onClick: $setup.goToLogin
            }, "登录/注册"),
            vue.createCommentVNode("v-if", true)
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "readInfo" }, [
        vue.createElementVNode("view", { class: "readInfo-item" }, [
          vue.createElementVNode("view", { class: "t" }, [
            vue.createTextVNode(
              vue.toDisplayString($setup.readInfo.collectionCount) + " ",
              1
              /* TEXT */
            ),
            vue.createElementVNode("text", { class: "small-font" }, "个")
          ]),
          vue.createElementVNode("view", { class: "b" }, "我的收藏")
        ]),
        vue.createElementVNode("view", { class: "readInfo-item" }, [
          vue.createElementVNode("view", { class: "t" }, [
            vue.createTextVNode(
              vue.toDisplayString($setup.store.state.readTime) + " ",
              1
              /* TEXT */
            ),
            vue.createElementVNode("text", { class: "small-font" }, "分钟")
          ]),
          vue.createElementVNode("view", { class: "b" }, "阅读时长")
        ]),
        vue.createElementVNode("view", { class: "readInfo-item" }, [
          vue.createElementVNode("view", { class: "t" }, [
            vue.createTextVNode("0"),
            vue.createElementVNode("text", { class: "small-font" }, "个")
          ]),
          vue.createElementVNode("view", { class: "b" }, "我的评论")
        ]),
        vue.createElementVNode("view", { class: "readInfo-item" }, [
          vue.createElementVNode("view", { class: "t" }, [
            vue.createTextVNode(
              vue.toDisplayString($setup.readInfo.browseCount) + " ",
              1
              /* TEXT */
            ),
            vue.createElementVNode("text", { class: "small-font" }, "个")
          ]),
          vue.createElementVNode("view", { class: "b" }, "浏览历史")
        ])
      ]),
      vue.createElementVNode("view", { class: "config-list" }, [
        vue.createElementVNode("view", { class: "title" }, "常用功能"),
        vue.createElementVNode("view", { class: "inner-box" }, [
          vue.createElementVNode("view", {
            onClick: $setup.goToHistory,
            class: "config-list-item"
          }, [
            vue.createVNode(_component_uv_icon, {
              name: "history",
              "custom-prefix": "custom-icon",
              size: "30"
            }),
            vue.createElementVNode("view", { class: "txt" }, "浏览历史")
          ]),
          vue.createElementVNode("view", {
            class: "config-list-item",
            onClick: $setup.handelShareApp
          }, [
            vue.createVNode(_component_uv_icon, {
              name: "share",
              size: "26"
            }),
            vue.createElementVNode("view", { class: "txt" }, "分享应用")
          ]),
          vue.createElementVNode("view", {
            class: "config-list-item",
            onClick: $setup.handelAboutApp
          }, [
            vue.createVNode(_component_uv_icon, {
              name: "info-circle",
              size: "26"
            }),
            vue.createElementVNode("view", { class: "txt" }, "关于番猫")
          ]),
          vue.createElementVNode("view", { class: "config-list-item" }, [
            vue.createVNode(_component_uv_icon, {
              name: "clear",
              "custom-prefix": "custom-icon",
              size: "26"
            }),
            vue.createElementVNode("view", { class: "txt" }, "清除缓存")
          ]),
          vue.createElementVNode("view", { class: "config-list-item" }, [
            vue.createVNode(_component_uv_icon, {
              name: "setting",
              size: "26"
            }),
            vue.createElementVNode("view", { class: "txt" }, "设置")
          ]),
          vue.createElementVNode("view", { class: "config-list-item" }, [
            vue.createVNode(_component_uv_icon, {
              name: "bug",
              "custom-prefix": "custom-icon",
              size: "26"
            }),
            vue.createElementVNode("view", { class: "txt" }, "bug报错")
          ]),
          vue.createElementVNode("view", { class: "config-list-item" }, [
            vue.createVNode(_component_uv_icon, {
              name: "dashang",
              "custom-prefix": "custom-icon",
              size: "26"
            }),
            vue.createElementVNode("view", { class: "txt" }, "打赏作者")
          ])
        ])
      ])
    ]);
  }
  const PagesUserUser = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-0f7520f0"], ["__file", "D:/APP/novel-app/novel-app/pages/user/user.vue"]]);
  const props$1 = {
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 搜索框形状，round-圆形，square-方形
      shape: {
        type: String,
        default: "round"
      },
      // 搜索框背景色，默认值#f2f2f2
      bgColor: {
        type: String,
        default: "#f2f2f2"
      },
      // 占位提示文字
      placeholder: {
        type: String,
        default: "请输入关键字"
      },
      // 是否启用清除控件
      clearabled: {
        type: Boolean,
        default: true
      },
      // 是否自动聚焦
      focus: {
        type: Boolean,
        default: false
      },
      // 是否在搜索框右侧显示取消按钮
      showAction: {
        type: Boolean,
        default: true
      },
      // 右边控件的样式
      actionStyle: {
        type: Object,
        default: () => ({})
      },
      // 取消按钮文字
      actionText: {
        type: String,
        default: "搜索"
      },
      // 输入框内容对齐方式，可选值为 left|center|right
      inputAlign: {
        type: String,
        default: "left"
      },
      // input输入框的样式，可以定义文字颜色，大小等，对象形式
      inputStyle: {
        type: Object,
        default: () => ({})
      },
      // 是否禁用输入框
      disabled: {
        type: Boolean,
        default: false
      },
      // 边框颜色
      borderColor: {
        type: String,
        default: "transparent"
      },
      // 搜索图标的颜色，默认同输入框字体颜色
      searchIconColor: {
        type: String,
        default: "#909399"
      },
      // 输入框字体颜色
      color: {
        type: String,
        default: "#606266"
      },
      // placeholder的颜色
      placeholderColor: {
        type: String,
        default: "#909399"
      },
      // 左边输入框的图标，可以为uvui图标名称或图片路径
      searchIcon: {
        type: String,
        default: "search"
      },
      searchIconSize: {
        type: [Number, String],
        default: 22
      },
      // 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30px"、"30px 20px"等写法
      margin: {
        type: String,
        default: "0"
      },
      // 开启showAction时，是否在input获取焦点时才显示
      animation: {
        type: Boolean,
        default: false
      },
      // 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)
      maxlength: {
        type: [String, Number],
        default: -1
      },
      // 搜索框高度，单位px
      height: {
        type: [String, Number],
        default: 32
      },
      // 搜索框左侧文本
      label: {
        type: [String, Number, null],
        default: null
      },
      // 搜索框扩展样式
      boxStyle: {
        type: [String, Object],
        default: () => ({})
      },
      ...(_F = (_E = uni.$uv) == null ? void 0 : _E.props) == null ? void 0 : _F.search
    }
  };
  const _sfc_main$h = {
    name: "uv-search",
    emits: ["click", "input", "change", "clear", "search", "custom", "focus", "blur", "clickIcon", "update:modelValue"],
    mixins: [mpMixin, mixin, props$1],
    data() {
      return {
        keyword: "",
        showClear: false,
        // 是否显示右边的清除图标
        show: false,
        // 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
        focused: this.focus
      };
    },
    created() {
      this.keyword = this.modelValue;
    },
    watch: {
      value(nVal) {
        this.keyword = nVal;
      },
      modelValue(nVal) {
        this.keyword = nVal;
      }
    },
    computed: {
      showActionBtn() {
        return !this.animation && this.showAction;
      }
    },
    methods: {
      keywordChange() {
        this.$emit("input", this.keyword);
        this.$emit("update:modelValue", this.keyword);
        this.$emit("change", this.keyword);
      },
      // 目前HX2.6.9 v-model双向绑定无效，故监听input事件获取输入框内容的变化
      inputChange(e) {
        this.keyword = e.detail.value;
        this.keywordChange();
      },
      // 清空输入
      // 也可以作为用户通过this.$refs形式调用清空输入框内容
      clear() {
        this.keyword = "";
        this.$nextTick(() => {
          this.$emit("clear");
        });
        this.keywordChange();
      },
      // 确定搜索
      search(e) {
        this.$emit("search", e.detail.value);
        try {
          uni.hideKeyboard();
        } catch (e2) {
        }
      },
      // 点击右边自定义按钮的事件
      custom() {
        this.$emit("custom", this.keyword);
        try {
          uni.hideKeyboard();
        } catch (e) {
        }
      },
      // 获取焦点
      getFocus() {
        this.focused = true;
        if (this.animation && this.showAction)
          this.show = true;
        this.$emit("focus", this.keyword);
      },
      // 失去焦点
      blur() {
        setTimeout(() => {
          this.focused = false;
        }, 100);
        this.show = false;
        this.$emit("blur", this.keyword);
      },
      // 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
      clickHandler() {
        if (this.disabled)
          this.$emit("click");
      },
      // 点击左边图标
      clickIcon() {
        this.$emit("clickIcon");
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-search",
        onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args)),
        style: vue.normalizeStyle([{
          margin: _ctx.margin
        }, _ctx.$uv.addStyle(_ctx.customStyle)])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "uv-search__content",
            style: vue.normalizeStyle([{
              backgroundColor: _ctx.bgColor,
              borderRadius: _ctx.shape == "round" ? "100px" : "4px",
              borderColor: _ctx.borderColor
            }, _ctx.$uv.addStyle(_ctx.boxStyle)])
          },
          [
            _ctx.disabled ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "uv-search__content__disabled"
            })) : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "prefix", {}, () => [
              vue.createElementVNode("view", { class: "uv-search__content__icon" }, [
                vue.createVNode(_component_uv_icon, {
                  onClick: $options.clickIcon,
                  size: _ctx.searchIconSize,
                  name: _ctx.searchIcon,
                  color: _ctx.searchIconColor ? _ctx.searchIconColor : _ctx.color
                }, null, 8, ["onClick", "size", "name", "color"])
              ])
            ], true),
            vue.createElementVNode("input", {
              "confirm-type": "search",
              onBlur: _cache[0] || (_cache[0] = (...args) => $options.blur && $options.blur(...args)),
              value: $data.keyword,
              onConfirm: _cache[1] || (_cache[1] = (...args) => $options.search && $options.search(...args)),
              onInput: _cache[2] || (_cache[2] = (...args) => $options.inputChange && $options.inputChange(...args)),
              disabled: _ctx.disabled,
              onFocus: _cache[3] || (_cache[3] = (...args) => $options.getFocus && $options.getFocus(...args)),
              focus: _ctx.focus,
              maxlength: _ctx.maxlength,
              "placeholder-class": "uv-search__content__input--placeholder",
              placeholder: _ctx.placeholder,
              "placeholder-style": `color: ${_ctx.placeholderColor}`,
              class: "uv-search__content__input",
              type: "text",
              style: vue.normalizeStyle([{
                textAlign: _ctx.inputAlign,
                color: _ctx.color,
                backgroundColor: _ctx.bgColor,
                height: _ctx.$uv.addUnit(_ctx.height)
              }, _ctx.inputStyle])
            }, null, 44, ["value", "disabled", "focus", "maxlength", "placeholder", "placeholder-style"]),
            $data.keyword && _ctx.clearabled && $data.focused ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "uv-search__content__icon uv-search__content__close",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.clear && $options.clear(...args))
            }, [
              vue.createVNode(_component_uv_icon, {
                name: "close",
                size: "11",
                color: "#ffffff",
                customStyle: "line-height: 12px"
              })
            ])) : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode(
          "text",
          {
            style: vue.normalizeStyle([_ctx.actionStyle]),
            class: vue.normalizeClass(["uv-search__action", [($options.showActionBtn || $data.show) && "uv-search__action--active"]]),
            onClick: _cache[5] || (_cache[5] = vue.withModifiers((...args) => $options.custom && $options.custom(...args), ["stop", "prevent"]))
          },
          vue.toDisplayString(_ctx.actionText),
          7
          /* TEXT, CLASS, STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-46cbdd03"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-search/components/uv-search/uv-search.vue"]]);
  const _sfc_main$g = {
    __name: "default",
    props: {
      hotSearchList: {
        type: Array,
        default: () => []
      },
      historyList: {
        type: Array,
        default: () => []
      }
    },
    emits: ["clearHistory", "handelSearch"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const store2 = useStore();
      const clearModal = vue.ref(null);
      const isFold = vue.ref(true);
      const emits = __emit;
      const goToNovelDetail = (detail) => {
        store2.commit("setCurrentNovelDetail", detail);
        uni.navigateTo({
          url: `/pages/nove-detail/index`,
          animationType: "slide-in-right"
        });
      };
      const clearHistory = () => {
        isFold.value = true;
        emits("clearHistory");
      };
      const handelSearch = (keyword) => {
        emits("handelSearch", keyword);
      };
      const __returned__ = { store: store2, clearModal, isFold, emits, goToNovelDetail, clearHistory, handelSearch, ref: vue.ref, get useStore() {
        return useStore;
      }, modalVue };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 搜索历史 "),
        $props.historyList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "area"
        }, [
          vue.createElementVNode("view", { class: "area-top" }, [
            vue.createElementVNode("view", { class: "l" }, " 搜索历史 "),
            vue.createElementVNode("view", { class: "r" }, [
              $props.historyList.length > 3 ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createElementVNode("view", {
                    class: "btn",
                    onClick: _cache[0] || (_cache[0] = ($event) => $setup.isFold = !$setup.isFold)
                  }, [
                    vue.createTextVNode(
                      vue.toDisplayString($setup.isFold ? "展开" : "收起") + " ",
                      1
                      /* TEXT */
                    ),
                    vue.createVNode(_component_uv_icon, {
                      name: $setup.isFold ? "arrow-down" : "arrow-up",
                      color: "#989898",
                      size: "12"
                    }, null, 8, ["name"])
                  ]),
                  vue.createElementVNode("view", { class: "btn" }, "|")
                ],
                64
                /* STABLE_FRAGMENT */
              )) : vue.createCommentVNode("v-if", true),
              vue.createVNode(_component_uv_icon, {
                name: "trash",
                onClick: _cache[1] || (_cache[1] = ($event) => $setup.clearModal.open()),
                color: "#989898",
                size: "20"
              })
            ])
          ]),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["list", $setup.isFold ? "fold" : "unfold"])
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($props.historyList, (item, index2) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    onClick: ($event) => $setup.handelSearch(item),
                    class: "list-item",
                    key: index2
                  }, vue.toDisplayString(item), 9, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          )
        ])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 热门搜索 "),
        vue.createElementVNode("view", { class: "area" }, [
          vue.createElementVNode("view", { class: "area-top" }, [
            vue.createElementVNode("view", { class: "l" }, " 热门搜索 ")
          ]),
          vue.createElementVNode("view", {
            class: vue.normalizeClass(["list", "unfold"])
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($props.hotSearchList, (item, index2) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  onClick: ($event) => $setup.goToNovelDetail(item),
                  class: "list-item",
                  key: item.id
                }, vue.toDisplayString(item.name), 9, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.createCommentVNode(" 确认删除历史记录Modal "),
        vue.createVNode(
          $setup["modalVue"],
          {
            ref: "clearModal",
            title: "历史记录清除后无法恢复,是否清除全部历史记录",
            onConfirm: $setup.clearHistory,
            confirmText: "确认"
          },
          null,
          512
          /* NEED_PATCH */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const defaultVue = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-5a681c5c"], ["__file", "D:/APP/novel-app/novel-app/pages/search/components/default.vue"]]);
  const useSearchHistory = () => {
    const searchHistoryList = vue.ref(uni.getStorageSync("searchHistoryList") || []);
    const addSearchHistory = (value2) => {
      searchHistoryList.value = Array.from(/* @__PURE__ */ new Set([value2, ...searchHistoryList.value.slice(0, 10)]));
      uni.setStorageSync("searchHistoryList", searchHistoryList.value);
    };
    const clearHistory = () => {
      searchHistoryList.value = [];
      uni.setStorageSync("searchHistoryList", []);
    };
    return {
      searchHistoryList,
      addSearchHistory,
      clearHistory
    };
  };
  const parseSearchResult = (str, keyword) => {
    return str.replace(
      new RegExp(keyword, "gi"),
      (match) => `<text style="color:#D4AB63">${match}</text>`
    );
  };
  const _sfc_main$f = {
    __name: "result",
    props: {
      keyword: {
        type: String,
        default: ""
      },
      scrollHeight: {
        type: Number,
        default: 0
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const {
        currentActiveTabbar,
        pageChange,
        handelTopChange,
        tabBarList,
        pageList,
        currentPage
      } = useSlide();
      const searchResultList = vue.reactive({
        novel: {
          size: 10,
          offset: 0,
          list: [],
          listHeight: 0,
          loadingParam: {
            status: "loading",
            loadingText: "努力加载中",
            loadmoreText: "轻轻上拉",
            nomoreText: "实在没有了"
          }
        },
        comic: {
          size: 10,
          offset: 0,
          list: [],
          listHeight: 0,
          loadingParam: {
            status: "loading",
            loadingText: "努力加载中",
            loadmoreText: "轻轻上拉",
            nomoreText: "实在没有了"
          }
        }
      });
      const scrollViewHeight = vue.ref(0);
      vue.watch(currentPage, async (newVal) => {
        if (!newVal.hasShown) {
          if (newVal.name == "comic") {
            const searchComicRes = await searchComic(props2.keyword, 0, 10);
            searchResultList[newVal.name].list = searchComicRes.data.data.map((item) => ({
              ...item,
              name: parseSearchResult(item.name, props2.keyword),
              type: "comic"
            }));
          }
          pageList.value[currentActiveTabbar.value] = {
            ...newVal,
            hasShown: true
          };
        }
      });
      const props2 = __props;
      const init = async () => {
        const instance = vue.getCurrentInstance();
        const topbarInfo = await getSelectorInfo(instance, "#top_bar");
        scrollViewHeight.value = props2.scrollHeight - topbarInfo.height + 10;
      };
      vue.onMounted(async () => {
        await init();
        await getNovelList();
      });
      const getNovelList = async () => {
        const currentPageName = currentPage.value.name;
        if (searchResultList[currentPageName].loadingParam.status == "nomore")
          return;
        let searchRes = null;
        if (currentPageName == "novel") {
          searchRes = await searchNovel(
            props2.keyword,
            props2.keyword,
            searchResultList[currentPageName].offset,
            searchResultList[currentPageName].size
          );
        } else if (currentPageName == "novel") {
          searchRes = await searchComic();
        }
        const list = searchRes.data.data.map((item) => ({
          ...item,
          name: parseSearchResult(item.name, props2.keyword),
          type: currentPageName
        }));
        if (list.length == 0) {
          searchResultList[currentPageName].loadingParam.status = "nomore";
        }
        searchResultList[currentPageName].list = [...searchResultList[currentPageName].list, ...list];
      };
      const onReachBottom = async () => {
        searchResultList[currentPage.value.name].offset += searchResultList[currentPage.value.name].size;
        await getNovelList();
      };
      const onNovelListLayout = (e) => {
        searchResultList.novel.listHeight = e.height;
      };
      const onComicListLayout = (e) => {
        searchResultList.comic.listHeight = e.height;
      };
      const __returned__ = { currentActiveTabbar, pageChange, handelTopChange, tabBarList, pageList, currentPage, searchResultList, scrollViewHeight, props: props2, init, getNovelList, onReachBottom, onNovelListLayout, onComicListLayout, getCurrentInstance: vue.getCurrentInstance, onMounted: vue.onMounted, ref: vue.ref, reactive: vue.reactive, watch: vue.watch, topTabbar, novelList, get getSelectorInfo() {
        return getSelectorInfo;
      }, midArea: ComponentsHomeMidAreaMidArea, midAreaItem: midAreaItemVue, get useSlide() {
        return useSlide;
      }, get searchComic() {
        return searchComic;
      }, get searchNovel() {
        return searchNovel;
      }, get parseSearchResult() {
        return parseSearchResult;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_empty = resolveEasycom(vue.resolveDynamicComponent("l-empty"), __easycom_0$1);
    const _component_uv_load_more = resolveEasycom(vue.resolveDynamicComponent("uv-load-more"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "search-result-page" }, [
      vue.createElementVNode("view", { id: "top" }, [
        vue.createVNode($setup["topTabbar"], {
          tabBarList: $setup.tabBarList,
          value: $setup.currentActiveTabbar,
          onChange: $setup.handelTopChange,
          id: "top_bar"
        }, null, 8, ["tabBarList", "value", "onChange"])
      ]),
      vue.createVNode($setup["midArea"], {
        background: "#fff",
        height: $setup.scrollViewHeight,
        length: 2,
        current: $setup.currentActiveTabbar,
        onPageChange: $setup.pageChange
      }, {
        default: vue.withCtx(() => [
          vue.createCommentVNode(" 小说 "),
          vue.createVNode($setup["midAreaItem"], {
            refresh: false,
            onOnScrollToLower: $setup.getNovelList
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "result-container" }, [
                $setup.searchResultList.novel.list.length == 0 ? (vue.openBlock(), vue.createBlock(_component_l_empty, {
                  key: 0,
                  description: "没有找到相关内容"
                })) : (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createVNode($setup["novelList"], {
                      novelList: $setup.searchResultList.novel.list,
                      onOnLayout: $setup.onNovelListLayout
                    }, null, 8, ["novelList"]),
                    $setup.searchResultList.novel.listHeight > $setup.scrollViewHeight ? (vue.openBlock(), vue.createBlock(_component_uv_load_more, {
                      key: 0,
                      status: $setup.searchResultList.novel.loadingParam.status,
                      "loading-text": $setup.searchResultList.novel.loadingParam.loadingText,
                      "loadmore-text": $setup.searchResultList.novel.loadingParam.loadmoreText,
                      "nomore-text": $setup.searchResultList.novel.loadingParam.nomoreText
                    }, null, 8, ["status", "loading-text", "loadmore-text", "nomore-text"])) : vue.createCommentVNode("v-if", true)
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              ])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createCommentVNode(" 漫画区 "),
          vue.createVNode($setup["midAreaItem"], { refresh: false }, {
            default: vue.withCtx(() => [
              $setup.searchResultList.comic.list.length == 0 ? (vue.openBlock(), vue.createBlock(_component_l_empty, {
                key: 0,
                description: "没有找到相关内容"
              })) : (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 1 },
                [
                  vue.createVNode($setup["novelList"], {
                    novelList: $setup.searchResultList.comic.list,
                    onOnLayout: $setup.onComicListLayout
                  }, null, 8, ["novelList"]),
                  $setup.searchResultList.comic.listHeight > $setup.scrollViewHeight ? (vue.openBlock(), vue.createBlock(_component_uv_load_more, {
                    key: 0,
                    status: $setup.searchResultList.comic.loadingParam.status,
                    "loading-text": $setup.searchResultList.comic.loadingParam.loadingText,
                    "loadmore-text": $setup.searchResultList.comic.loadingParam.loadmoreText,
                    "nomore-text": $setup.searchResultList.comic.loadingParam.nomoreText
                  }, null, 8, ["status", "loading-text", "loadmore-text", "nomore-text"])) : vue.createCommentVNode("v-if", true)
                ],
                64
                /* STABLE_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["height", "current", "onPageChange"])
    ]);
  }
  const resultVue = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-755e7dbf"], ["__file", "D:/APP/novel-app/novel-app/pages/search/components/result.vue"]]);
  const _sfc_main$e = {
    __name: "search",
    setup(__props, { expose: __expose }) {
      __expose();
      const {
        searchHistoryList,
        addSearchHistory,
        clearHistory
      } = useSearchHistory();
      const placeholder = vue.ref("");
      const searchVal = vue.ref("");
      const searchResultHeight = vue.ref(0);
      const showResult = vue.ref(false);
      onLoad(async ({
        novel_name = ""
      }) => {
        placeholder.value = novel_name;
        const hotRes = await getHotNovelList();
        hotSearchList.value = hotRes.data.data;
      });
      vue.onMounted(async () => {
        const instance = vue.getCurrentInstance();
        const systemInfo2 = await getSystemInfo();
        const headerInfo = await getSelectorInfo(instance, ".search-box");
        searchResultHeight.value = systemInfo2.windowHeight - headerInfo.height - 10;
      });
      onBackPress((e) => {
        if (showResult.value) {
          showResult.value = false;
          searchVal.value = "";
          searchResult.value = [];
          return true;
        }
      });
      const hotSearchList = vue.ref([]);
      const issearchValEmpty = vue.computed(() => {
        return searchVal.value.length == 0 && searchVal.value.trim() == "";
      });
      const handelSearch = (keyword) => {
        if (keyword.length == 0 && keyword.trim() == "") {
          if (placeholder.value.length == 0 && placeholder.value.trim() == "")
            return;
          searchVal.value = keyword;
          addSearchHistory(placeholder.value);
        } else {
          const removeHtmlTags = (str) => str.replace(/<[^>]+>/g, "");
          const newKeyword = removeHtmlTags(keyword);
          searchVal.value = newKeyword;
          addSearchHistory(newKeyword);
        }
        showResult.value = true;
      };
      const searchResult = vue.ref([]);
      const handelChange = async () => {
        showResult.value = false;
        const searchRes = await searchBook(searchVal.value, searchVal.value);
        searchResult.value = searchRes.data.data.map((item) => {
          return {
            ...item,
            name: parseSearchResult(item.name, searchVal.value)
          };
        });
      };
      const __returned__ = { searchHistoryList, addSearchHistory, clearHistory, placeholder, searchVal, searchResultHeight, showResult, hotSearchList, issearchValEmpty, handelSearch, searchResult, handelChange, ref: vue.ref, computed: vue.computed, onMounted: vue.onMounted, getCurrentInstance: vue.getCurrentInstance, watch: vue.watch, get onLoad() {
        return onLoad;
      }, get onBackPress() {
        return onBackPress;
      }, get getHotNovelList() {
        return getHotNovelList;
      }, get searchBook() {
        return searchBook;
      }, get searchNovel() {
        return searchNovel;
      }, defaultVue, get getSystemInfo() {
        return getSystemInfo;
      }, get getSelectorInfo() {
        return getSelectorInfo;
      }, get useSearchHistory() {
        return useSearchHistory;
      }, resultVue, get parseSearchResult() {
        return parseSearchResult;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_search = resolveEasycom(vue.resolveDynamicComponent("uv-search"), __easycom_0);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "search-page" }, [
      vue.createElementVNode("view", { class: "search-box" }, [
        vue.createElementVNode("view", { class: "status-bar" }),
        vue.createVNode(_component_uv_search, {
          onChange: $setup.handelChange,
          height: "38",
          clearabled: "",
          onCustom: $setup.handelSearch,
          onSearch: $setup.handelSearch,
          focus: "",
          placeholder: $setup.placeholder,
          modelValue: $setup.searchVal,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.searchVal = $event)
        }, null, 8, ["placeholder", "modelValue"])
      ]),
      vue.createCommentVNode(" 搜索提示内容区 "),
      $setup.searchResult.length > 0 && !$setup.issearchValEmpty && !$setup.showResult ? (vue.openBlock(), vue.createElementBlock(
        "scroll-view",
        {
          key: 0,
          "scroll-y": true,
          class: "search-result",
          style: vue.normalizeStyle({ height: $setup.searchResultHeight + "px" })
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.searchResult, (item) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                onClick: ($event) => $setup.handelSearch(item.name),
                class: "search-item",
                key: item.id
              }, [
                vue.createVNode(_component_uv_icon, {
                  size: "22",
                  name: "search",
                  color: "#ccc"
                }),
                vue.createElementVNode("view", {
                  class: "name",
                  innerHTML: item.name
                }, null, 8, ["innerHTML"]),
                vue.createElementVNode(
                  "view",
                  { class: "type" },
                  vue.toDisplayString(item.type),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 默认显示 "),
      !$setup.showResult && $setup.searchResult.length == 0 || $setup.issearchValEmpty ? (vue.openBlock(), vue.createBlock($setup["defaultVue"], {
        key: 1,
        onHandelSearch: $setup.handelSearch,
        onClearHistory: $setup.clearHistory,
        hotSearchList: $setup.hotSearchList,
        historyList: $setup.searchHistoryList
      }, null, 8, ["onClearHistory", "hotSearchList", "historyList"])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 搜索结果 "),
      $setup.showResult ? (vue.openBlock(), vue.createBlock($setup["resultVue"], {
        key: 2,
        keyword: $setup.issearchValEmpty ? $setup.placeholder : $setup.searchVal,
        scrollHeight: $setup.searchResultHeight
      }, null, 8, ["keyword", "scrollHeight"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesSearchSearch = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-c10c040c"], ["__file", "D:/APP/novel-app/novel-app/pages/search/search.vue"]]);
  const _sfc_main$d = {
    __name: "comic-image",
    props: {
      imgInfo: {
        required: true,
        type: Object
      },
      isLazyLoad: {
        type: Boolean,
        default: true
      }
    },
    emits: ["intoView"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props2 = __props;
      const comicImageRef = vue.ref(null);
      const instance = vue.getCurrentInstance();
      const emits = __emit;
      let observer;
      const loadParameter = vue.reactive({
        show: false,
        loaded: false,
        loadError: false,
        loading: true
      });
      vue.onMounted(() => {
        if (props2.isLazyLoad) {
          observer = uni.createIntersectionObserver(instance);
          observer.relativeToViewport({
            bottom: 500
          }).observe(".comic-image", (res) => {
            if (res.intersectionRatio > 0 && props2.isLazyLoad) {
              loadParameter.show = true;
              emits("intoView", {
                imgNum: props2.imgInfo.pageNum
              });
            }
          });
        }
      });
      const handelLoad = () => {
        loadParameter.loaded = true;
      };
      const handelLoadError = () => {
        loadParameter.loadError = true;
      };
      const handelReload = () => {
        loadParameter.loadError = false;
      };
      const __returned__ = { props: props2, comicImageRef, instance, emits, get observer() {
        return observer;
      }, set observer(v) {
        observer = v;
      }, loadParameter, handelLoad, handelLoadError, handelReload, getCurrentInstance: vue.getCurrentInstance, onMounted: vue.onMounted, reactive: vue.reactive, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "comic-image-container" }, [
      vue.createElementVNode(
        "view",
        {
          class: "comic-image",
          style: vue.normalizeStyle({ height: $props.imgInfo.height + "px", width: $props.imgInfo.width + "px" })
        },
        [
          $setup.loadParameter.show && !$setup.loadParameter.loadError ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 0,
            draggable: false,
            onLoad: $setup.handelLoad,
            onError: $setup.handelLoadError,
            class: "img",
            src: $props.imgInfo.url,
            "lazy-load": $props.isLazyLoad,
            style: vue.normalizeStyle({ opacity: $setup.loadParameter.loaded ? 1 : 0 }),
            mode: "widthFix"
          }, null, 44, ["src", "lazy-load"])) : vue.createCommentVNode("v-if", true),
          !$setup.loadParameter.loaded && !$setup.loadParameter.loadError ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 1,
              class: "loading"
            },
            vue.toDisplayString($props.imgInfo.pageNum),
            1
            /* TEXT */
          )) : vue.createCommentVNode("v-if", true),
          $setup.loadParameter.loadError ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            onClick: $setup.handelReload,
            class: "load-error"
          }, [
            vue.createTextVNode(" 加载失败 "),
            vue.createElementVNode("br"),
            vue.createTextVNode(" 请点击重试 ")
          ])) : vue.createCommentVNode("v-if", true)
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const comicImageVue = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-72a5e1d2"], ["__file", "D:/APP/novel-app/novel-app/pages/comic-read/components/comic-image.vue"]]);
  const _sfc_main$c = {
    __name: "comic-chapter",
    props: {
      chapter: {
        type: Object,
        default: () => {
        }
      },
      id: {
        required: true
      }
    },
    emits: ["changeChapterInfo"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props2 = __props;
      const emits = __emit;
      const observer = vue.ref(null);
      const handelImageIntoView = ({
        imgNum
      }) => {
        emits("changeChapterInfo", {
          chapter_name: props2.chapter.chapter_name,
          chapter_n: props2.chapter.chapter_n,
          curentImgNum: imgNum,
          totalImage: props2.chapter.imgUrlList.length
        });
      };
      const __returned__ = { props: props2, emits, observer, handelImageIntoView, getCurrentInstance: vue.getCurrentInstance, ref: vue.ref, comicImageVue };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "comic-chapter-content" }, [
      vue.createElementVNode("view", { class: "image-container" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.chapter.imgUrlList, (item, index2) => {
            return vue.openBlock(), vue.createBlock($setup["comicImageVue"], {
              onIntoView: $setup.handelImageIntoView,
              key: index2,
              imgInfo: item
            }, null, 8, ["imgInfo"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const comicChapterContentVue = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__file", "D:/APP/novel-app/novel-app/pages/comic-read/components/comic-chapter.vue"]]);
  const _sfc_main$b = {
    __name: "time",
    props: {
      zIndex: {
        default: 0,
        type: Number
      },
      chapterImageInfo: {
        type: Object,
        default: () => ({
          curentImgNum: 1,
          totalImage: 1
        })
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const {
        currentTime,
        batteryInfo
      } = getBottomInfo();
      const __returned__ = { currentTime, batteryInfo, get getBottomInfo() {
        return getBottomInfo;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "right-bottom",
        style: vue.normalizeStyle({ zIndex: $props.zIndex })
      },
      [
        vue.createElementVNode(
          "view",
          null,
          vue.toDisplayString($props.chapterImageInfo.curentImgNum) + "/" + vue.toDisplayString($props.chapterImageInfo.totalImage),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "time" }, [
          vue.createTextVNode(
            vue.toDisplayString($setup.currentTime) + " ",
            1
            /* TEXT */
          ),
          $setup.batteryInfo.level <= 10 ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 0,
            name: "battery-empty",
            "custom-prefix": "custom-icon",
            size: "14",
            color: "#fff"
          })) : vue.createCommentVNode("v-if", true),
          $setup.batteryInfo.level <= 10 ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 1,
            name: "battery-empty",
            "custom-prefix": "custom-icon",
            size: "14",
            color: $setup.batteryInfo.isCharging ? "#77CA44" : "#fff"
          }, null, 8, ["color"])) : $setup.batteryInfo.level > 10 && $setup.batteryInfo.level < 30 ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 2,
            name: "battery-low",
            "custom-prefix": "custom-icon",
            size: "14",
            color: $setup.batteryInfo.isCharging ? "#77CA44" : "#fff"
          }, null, 8, ["color"])) : $setup.batteryInfo.level >= 30 && $setup.batteryInfo.level < 50 ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 3,
            name: "battery-mid",
            "custom-prefix": "custom-icon",
            size: "14",
            color: $setup.batteryInfo.isCharging ? "#77CA44" : "#fff"
          }, null, 8, ["color"])) : $setup.batteryInfo.level >= 50 && $setup.batteryInfo.level < 90 ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 4,
            name: "battery-most",
            "custom-prefix": "custom-icon",
            size: "14",
            color: $setup.batteryInfo.isCharging ? "#77CA44" : "#fff"
          }, null, 8, ["color"])) : (vue.openBlock(), vue.createBlock(_component_uv_icon, {
            key: 5,
            name: "battery-full",
            "custom-prefix": "custom-icon",
            size: "14",
            color: $setup.batteryInfo.isCharging ? "#77CA44" : "#fff"
          }, null, 8, ["color"]))
        ])
      ],
      4
      /* STYLE */
    );
  }
  const timeVue = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-9cc39fa6"], ["__file", "D:/APP/novel-app/novel-app/pages/comic-read/components/time.vue"]]);
  const props = {
    props: {
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      modelValue: {
        type: [Boolean, String, Number],
        default: false
      },
      // 是否为加载中状态
      loading: {
        type: Boolean,
        default: false
      },
      // 是否为禁用装填
      disabled: {
        type: Boolean,
        default: false
      },
      // 开关尺寸，单位px
      size: {
        type: [String, Number],
        default: 25
      },
      // 打开时的背景颜色
      activeColor: {
        type: String,
        default: "#2979ff"
      },
      // 关闭时的背景颜色
      inactiveColor: {
        type: String,
        default: "#fff"
      },
      // switch打开时的值
      activeValue: {
        type: [String, Number, Boolean],
        default: true
      },
      // switch关闭时的值
      inactiveValue: {
        type: [String, Number, Boolean],
        default: false
      },
      // 是否开启异步变更，开启后需要手动控制输入值
      asyncChange: {
        type: Boolean,
        default: false
      },
      // 圆点与外边框的距离
      space: {
        type: [String, Number],
        default: 0
      },
      ...(_H = (_G = uni.$uv) == null ? void 0 : _G.props) == null ? void 0 : _H.switch
    }
  };
  const _sfc_main$a = {
    name: "uv-switch",
    mixins: [mpMixin, mixin, props],
    data() {
      return {
        bgColor: "#ffffff",
        innerValue: false
      };
    },
    watch: {
      modelValue: {
        immediate: true,
        handler(newVal) {
          if (newVal !== this.inactiveValue && newVal !== this.activeValue) {
            return this.$uv.error("v-model绑定的值必须为inactiveValue、activeValue二者之一");
          }
          this.innerValue = newVal;
        }
      }
    },
    created() {
      this.innerValue = this.value || this.modelValue;
    },
    computed: {
      isActive() {
        return this.innerValue === this.activeValue;
      },
      switchStyle() {
        let style = {};
        style.width = this.$uv.addUnit(this.$uv.getPx(this.size) * 2 + 2);
        style.height = this.$uv.addUnit(this.$uv.getPx(this.size) + 2);
        if (this.customInactiveColor) {
          style.borderColor = "rgba(0, 0, 0, 0)";
        }
        style.backgroundColor = this.isActive ? this.activeColor : this.inactiveColor;
        return style;
      },
      nodeStyle() {
        let style = {};
        style.width = this.$uv.addUnit(this.$uv.getPx(this.size) - this.space);
        style.height = this.$uv.addUnit(this.$uv.getPx(this.size) - this.space);
        const translateX = this.isActive ? this.$uv.addUnit(this.space) : this.$uv.addUnit(this.$uv.getPx(this.size));
        style.transform = `translateX(-${translateX})`;
        return style;
      },
      bgStyle() {
        let style = {};
        style.width = this.$uv.addUnit(this.$uv.getPx(this.size) * 2 - this.$uv.getPx(this.size) / 2);
        style.height = this.$uv.addUnit(this.$uv.getPx(this.size));
        style.backgroundColor = this.inactiveColor;
        style.transform = `scale(${this.isActive ? 0 : 1})`;
        return style;
      },
      customInactiveColor() {
        return this.inactiveColor !== "#fff" && this.inactiveColor !== "#ffffff";
      }
    },
    methods: {
      clickHandler() {
        if (!this.disabled && !this.loading) {
          const oldValue = this.isActive ? this.inactiveValue : this.activeValue;
          if (!this.asyncChange) {
            this.$emit("input", oldValue);
            this.$emit("update:modelValue", oldValue);
          }
          this.$nextTick(() => {
            this.$emit("change", oldValue);
          });
        }
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_loading_icon = resolveEasycom(vue.resolveDynamicComponent("uv-loading-icon"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uv-switch", [_ctx.disabled && "uv-switch--disabled"]]),
        style: vue.normalizeStyle([$options.switchStyle, _ctx.$uv.addStyle(_ctx.customStyle)]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.clickHandler && $options.clickHandler(...args))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "uv-switch__bg",
            style: vue.normalizeStyle([$options.bgStyle])
          },
          null,
          4
          /* STYLE */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uv-switch__node", [$data.innerValue && "uv-switch__node--on"]]),
            style: vue.normalizeStyle([$options.nodeStyle]),
            ref: "uv-switch__node"
          },
          [
            vue.createVNode(_component_uv_loading_icon, {
              show: _ctx.loading,
              mode: "circle",
              timingFunction: "linear",
              color: $data.innerValue ? _ctx.activeColor : "#AAABAD",
              size: _ctx.size * 0.6
            }, null, 8, ["show", "color", "size"])
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-c713e4c9"], ["__file", "D:/APP/novel-app/novel-app/uni_modules/uv-switch/components/uv-switch/uv-switch.vue"]]);
  const useAddBookShell = (modal) => {
    const store2 = useStore();
    const isAdd = vue.ref(false);
    vue.onMounted(async () => {
      isAdd.value = await isInBookShell(store2.state.currentNovelDetail.id, "comic");
    });
    const addBookShell = async () => {
      if (isAdd.value) {
        modal.value.open();
      } else {
        await insterBookShell({
          ...store2.state.currentNovelDetail,
          type: "comic"
        });
        isAdd.value = true;
      }
    };
    const confirmRemove = async () => {
      await deleteFromBookShell(store2.state.currentNovelDetail.id, "comic");
      isAdd.value = false;
    };
    return {
      addBookShell,
      isAdd,
      confirmRemove
    };
  };
  const _sfc_main$9 = {
    __name: "comic-menu",
    props: {
      title: {
        default: "",
        type: String
      },
      chapterList: {
        default: () => [],
        type: Array
      },
      currentChapter_n: {
        default: 1,
        type: Number
      }
    },
    emits: ["changeChapter", "reverseChapter"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const removeFromBookShellModal = vue.ref(null);
      const {
        addBookShell,
        isAdd,
        confirmRemove
      } = useAddBookShell(removeFromBookShellModal);
      const popupTop = vue.ref(null);
      const popupBottom = vue.ref(null);
      const popupChapterShow = vue.ref(false);
      const configPopup2 = vue.ref(null);
      const isDark = vue.computed(() => brightness.value > 40);
      const premitScale = vue.ref(false);
      let isOpen = false;
      const emits = __emit;
      const props2 = __props;
      const openMenu = () => {
        if (!isOpen) {
          popupTop.value.open();
          popupBottom.value.open();
        } else {
          popupTop.value.close();
          popupBottom.value.close();
        }
      };
      const back = () => {
        uni.navigateBack();
      };
      const goToDetail = () => {
        formatAppLog("log", "at pages/comic-read/components/comic-menu.vue:168", "前往详情页");
      };
      const handelChange = ({
        show
      }) => {
        isOpen = show;
        plus.navigator.setFullscreen(!show);
      };
      const brightness = vue.ref(1);
      const changeDark = () => {
        if (isDark.value) {
          brightness.value = 0;
        } else {
          brightness.value = 50;
        }
        setTimeout(() => {
          openMenu();
        }, 100);
      };
      const showChapter = () => {
        openMenu();
        setTimeout(() => {
          popupChapterShow.value = true;
        }, 300);
      };
      const configShow = vue.ref(false);
      const openConfigPopup = () => {
        openMenu();
        configShow.value = true;
        configPopup2.value.open();
      };
      const tapMask = () => {
        popupChapterShow.value = false;
        configShow.value && configPopup2.value.close();
        configShow.value = false;
      };
      const chaperListHeight = vue.ref(0);
      vue.onMounted(async () => {
        const instance = vue.getCurrentInstance();
        const chapterTopInfo = await getSelectorInfo(instance, ".chapter-popup .top");
        const sysInfo = await getSystemInfo();
        chaperListHeight.value = sysInfo.windowHeight - chapterTopInfo.height;
      });
      const changeChapter = (chapter_n) => {
        const lastChapter_n = props2.chapterList[props2.chapterList.length - 1].chapter_n;
        if (props2.currentChapter_n == chapter_n || chapter_n > lastChapter_n)
          return;
        popupChapterShow.value = false;
        emits("changeChapter", chapter_n);
      };
      const isReverse = vue.ref(false);
      const reverseChapter = () => {
        isReverse.value = !isReverse.value;
        emits("reverseChapter");
      };
      const chapterSlideValue = vue.ref(0);
      const sliderTiimer = vue.ref(null);
      vue.watch(() => props2.currentChapter_n, (newVal) => {
        chapterSlideValue.value = newVal;
      });
      const handelSliderChange = (val) => {
        if (sliderTiimer.value)
          clearTimeout(sliderTiimer.value);
        sliderTiimer.value = setTimeout(() => {
          changeChapter(props2.chapterList[val - 1].chapter_n);
        }, 300);
      };
      __expose({
        openMenu
      });
      const __returned__ = { removeFromBookShellModal, addBookShell, isAdd, confirmRemove, popupTop, popupBottom, popupChapterShow, configPopup: configPopup2, isDark, premitScale, get isOpen() {
        return isOpen;
      }, set isOpen(v) {
        isOpen = v;
      }, emits, props: props2, openMenu, back, goToDetail, handelChange, brightness, changeDark, showChapter, configShow, openConfigPopup, tapMask, chaperListHeight, changeChapter, isReverse, reverseChapter, chapterSlideValue, sliderTiimer, handelSliderChange, ref: vue.ref, onMounted: vue.onMounted, getCurrentInstance: vue.getCurrentInstance, watch: vue.watch, computed: vue.computed, get getSystemInfo() {
        return getSystemInfo;
      }, get getSelectorInfo() {
        return getSelectorInfo;
      }, get useAddBookShell() {
        return useAddBookShell;
      }, modal: modalVue };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    const _component_uv_popup = resolveEasycom(vue.resolveDynamicComponent("uv-popup"), __easycom_1);
    const _component_uv_slider = resolveEasycom(vue.resolveDynamicComponent("uv-slider"), __easycom_2$2);
    const _component_uv_transition = resolveEasycom(vue.resolveDynamicComponent("uv-transition"), __easycom_3);
    const _component_uv_switch = resolveEasycom(vue.resolveDynamicComponent("uv-switch"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode(
          "view",
          {
            class: "mask",
            style: vue.normalizeStyle({ backgroundColor: `rgba(0,0,0,${$setup.brightness / 100})` })
          },
          null,
          4
          /* STYLE */
        ),
        vue.createCommentVNode(" 顶部弹出层 "),
        vue.createVNode(
          _component_uv_popup,
          {
            overlay: false,
            bgColor: "#fff",
            ref: "popupTop",
            mode: "top",
            overlayOpacity: 0,
            onChange: $setup.handelChange
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "comic-menu-top" }, [
                vue.createElementVNode("view", { class: "status-bar" }),
                vue.createElementVNode("view", { class: "action" }, [
                  vue.createElementVNode("view", { class: "action-left" }, [
                    vue.createVNode(_component_uv_icon, {
                      name: "arrow-left",
                      color: "#000",
                      bold: "",
                      size: "20",
                      onClick: $setup.back
                    }),
                    vue.createElementVNode(
                      "view",
                      { class: "title" },
                      vue.toDisplayString($props.title),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "action-right" }, [
                    vue.createElementVNode(
                      "view",
                      {
                        onClick: _cache[0] || (_cache[0] = (...args) => $setup.addBookShell && $setup.addBookShell(...args))
                      },
                      vue.toDisplayString($setup.isAdd ? "已加入书架" : "加入书架"),
                      1
                      /* TEXT */
                    ),
                    vue.createVNode(_component_uv_icon, {
                      onClick: $setup.goToDetail,
                      name: "xiang",
                      color: "#2c2c2c",
                      "custom-prefix": "custom-icon",
                      size: "20"
                    })
                  ])
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        ),
        vue.createCommentVNode(" 底部弹出层 "),
        vue.createVNode(
          _component_uv_popup,
          {
            overlay: false,
            bgColor: "#fff",
            ref: "popupBottom",
            mode: "bottom",
            overlayOpacity: 0
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "slider-box" }, [
                vue.createElementVNode("view", {
                  class: "btn",
                  onClick: _cache[1] || (_cache[1] = ($event) => $setup.changeChapter($props.currentChapter_n - 1))
                }, "上一话"),
                vue.createElementVNode("view", { class: "mid" }, [
                  vue.createVNode(_component_uv_slider, {
                    activeColor: "#F59F70",
                    modelValue: $setup.chapterSlideValue,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.chapterSlideValue = $event),
                    "block-size": "25",
                    min: 1,
                    max: $props.chapterList[$props.chapterList.length - 1].chapter_n,
                    onChanging: $setup.handelSliderChange,
                    onChange: $setup.handelSliderChange
                  }, null, 8, ["modelValue", "max"])
                ]),
                vue.createElementVNode("view", {
                  class: "btn",
                  onClick: _cache[3] || (_cache[3] = ($event) => $setup.changeChapter($props.currentChapter_n + 1))
                }, "下一话")
              ]),
              vue.createElementVNode("view", { class: "comic-popup-bottom" }, [
                vue.createElementVNode("view", {
                  class: "item",
                  onClick: $setup.showChapter
                }, [
                  vue.createVNode(_component_uv_icon, {
                    name: "content",
                    "custom-prefix": "custom-icon",
                    size: "20",
                    color: "#000"
                  }),
                  vue.createTextVNode(" 目录 ")
                ]),
                vue.createElementVNode("view", {
                  class: "item",
                  onClick: $setup.changeDark
                }, [
                  vue.createVNode(_component_uv_icon, {
                    name: $setup.brightness >= 50 ? "sun" : "moon",
                    "custom-prefix": "custom-icon",
                    size: "20",
                    color: "#000"
                  }, null, 8, ["name"]),
                  vue.createTextVNode(
                    " " + vue.toDisplayString($setup.brightness >= 50 ? "日间" : "夜间"),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", {
                  class: "item",
                  onClick: $setup.openConfigPopup
                }, [
                  vue.createVNode(_component_uv_icon, {
                    name: "setting",
                    color: "#000",
                    size: "24"
                  }),
                  vue.createTextVNode(" 设置 ")
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        ),
        vue.createCommentVNode(" 目录弹层 "),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["chapter-popup", $setup.popupChapterShow ? "show" : ""])
          },
          [
            vue.createElementVNode("view", { class: "top" }, [
              vue.createElementVNode("view", { class: "status-bar" }),
              vue.createElementVNode("view", { class: "comic-name" }, "狐妖小红娘"),
              vue.createElementVNode("view", { class: "info" }, [
                vue.createElementVNode(
                  "view",
                  { class: "info-left" },
                  " 共" + vue.toDisplayString($props.chapterList.length) + "话 连载中 ",
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", {
                  class: "info-right",
                  onClick: $setup.reverseChapter
                }, [
                  vue.createElementVNode("view", { class: "icon" }, [
                    vue.createVNode(_component_uv_icon, {
                      name: "arrow-up-fill",
                      size: "10"
                    }),
                    vue.createVNode(_component_uv_icon, {
                      name: "arrow-down-fill",
                      size: "10"
                    })
                  ]),
                  vue.createTextVNode(
                    " " + vue.toDisplayString($setup.isReverse ? "逆序" : "正序"),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ]),
            vue.createElementVNode("scroll-view", {
              "scroll-into-view": "chapter-" + $props.currentChapter_n,
              "scroll-y": "true",
              style: vue.normalizeStyle({ height: $setup.chaperListHeight + "px" }),
              class: "scroll-box"
            }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($props.chapterList, (item, index2) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "chapter-item",
                    style: vue.normalizeStyle({ color: $props.currentChapter_n == item.chapter_n ? "#F59F70" : "" }),
                    id: "chapter-" + item.chapter_n,
                    onClick: ($event) => $setup.changeChapter(item.chapter_n),
                    key: index2
                  }, vue.toDisplayString(item.chapter_name), 13, ["id", "onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ], 12, ["scroll-into-view"])
          ],
          2
          /* CLASS */
        ),
        vue.createVNode(_component_uv_transition, {
          show: $setup.popupChapterShow || $setup.configShow,
          "custom-class": "chapter-mask",
          onClick: $setup.tapMask
        }, null, 8, ["show"]),
        vue.createCommentVNode(" 设置弹出层 "),
        vue.createVNode(
          _component_uv_popup,
          {
            round: "10",
            overlay: false,
            bgColor: "#fff",
            ref: "configPopup",
            mode: "bottom",
            overlayOpacity: 0
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "config-popup" }, [
                vue.createElementVNode("view", { class: "config-list" }, [
                  vue.createElementVNode("view", { class: "config-item" }, [
                    vue.createElementVNode("view", { class: "name" }, "亮度"),
                    vue.createElementVNode("view", { class: "action" }, [
                      vue.createVNode(_component_uv_icon, {
                        name: "moon",
                        "custom-prefix": "custom-icon",
                        size: "20",
                        color: "#8A8A8A"
                      }),
                      vue.createElementVNode("view", { class: "mid" }, [
                        vue.createVNode(_component_uv_slider, {
                          modelValue: $setup.brightness,
                          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.brightness = $event),
                          activeColor: "#F59F70",
                          "block-size": "20",
                          min: 1,
                          max: 80
                        }, null, 8, ["modelValue"])
                      ]),
                      vue.createVNode(_component_uv_icon, {
                        name: "sun",
                        "custom-prefix": "custom-icon",
                        size: "20",
                        color: "#8A8A8A"
                      })
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "config-item" }, [
                    vue.createElementVNode("view", { class: "name" }, "允许缩放"),
                    vue.createElementVNode("view", { class: "action" }, [
                      vue.createVNode(_component_uv_switch, {
                        modelValue: $setup.premitScale,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.premitScale = $event),
                        inactiveColor: "#8A8A8A",
                        activeColor: "#F59F70"
                      }, null, 8, ["modelValue"])
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        ),
        vue.createVNode($setup["modal"], {
          ref: "removeFromBookShellModal",
          title: "确认将本书从书架移除？",
          onConfirm: $setup.confirmRemove
        }, null, 8, ["onConfirm"])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const comicMenuVue = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-5e557fb9"], ["__file", "D:/APP/novel-app/novel-app/pages/comic-read/components/comic-menu.vue"]]);
  const _sfc_main$8 = {
    __name: "comic-read",
    setup(__props, { expose: __expose }) {
      __expose();
      const store2 = useStore();
      const virtualList = vue.ref(null);
      const comic = vue.computed(() => store2.state.currentNovelDetail);
      const curentComicName = vue.ref(comic.value.name);
      const comicImageList = vue.ref([]);
      const listLen = vue.ref(0);
      const device_width = vue.ref(0);
      const popMenu = vue.ref(null);
      const isLoaded = vue.ref(false);
      const currentChapter_n = vue.ref(0);
      const currentChapterTitle = vue.ref("");
      const chapterList = vue.ref([]);
      const screenHeight = vue.ref(0);
      const scrollTop = vue.ref(0);
      onLoad(async ({
        comic_id
      }) => {
        const res = await isExistHistory(comic_id, "comic");
        currentChapter_n.value = (res.length != 0 ? res[0].chapter_n : 1) - 1;
      });
      vue.onMounted(async () => {
        const sysInfo = await getSystemInfo();
        device_width.value = sysInfo.windowWidth;
        screenHeight.value = sysInfo.screenHeight;
        const chapterRes = await getComicChapters(curentComicName.value);
        chapterList.value = chapterRes.data.data;
        plus.navigator.setFullscreen(true);
        plus.key.addEventListener("keydown", onVolumeKeyDown);
      });
      vue.onUnmounted(() => {
        plus.navigator.setFullscreen(false);
        plus.key.removeEventListener("keydown", onVolumeKeyDown);
        plus.screen.lockOrientation("portrait-primary");
        saveHistory();
      });
      const saveHistory = async () => {
        const res = await isExistHistory(comic.value.id, "comic");
        if (res.length == 0) {
          await insertHistory({
            novel_id: comic.value.id,
            offsetY: 0,
            chapter_n: currentChapter_n.value,
            chapter_name: chapterList.value[currentChapter_n.value - 1].chapter_name,
            type: "comic",
            ...comic.value
          });
        } else {
          await updateHistory(
            comic.value.id,
            currentChapter_n.value,
            chapterList.value[currentChapter_n.value - 1].chapter_name,
            0,
            "comic"
          );
        }
      };
      onHide(() => {
        saveHistory();
      });
      const queryList = async (pageNo, pageSize) => {
        currentChapter_n.value += 1;
        const res = await getComicContent(curentComicName.value, currentChapter_n.value, device_width.value);
        if (res.data.status == 1) {
          const resLen = res.data.data.imgUrlList.length;
          await virtualList.value.completeByNoMore([res.data.data], resLen == 0);
          if (resLen < 3 && resLen != 0) {
            await queryList();
          }
        }
        setTimeout(() => {
          isLoaded.value = true;
        }, 500);
      };
      const onVolumeKeyDown = ({
        keyCode
      }) => {
        if (keyCode == 24) {
          virtualList.value.scrollToY(scrollTop.value - 500, 0, true);
        } else if (keyCode == 25) {
          virtualList.value.scrollToY(scrollTop.value + 500, 0, true);
        }
      };
      const handelOpenMenu = (e) => {
        const y = e.changedTouches[0].pageY;
        if (y <= screenHeight.value / 3) {
          virtualList.value.scrollToY(scrollTop.value - 500, 0, true);
        } else if (y >= screenHeight.value / 3 && y <= screenHeight.value / 3 * 2) {
          popMenu.value.openMenu();
        } else if (y >= screenHeight.value / 3 * 2) {
          virtualList.value.scrollToY(scrollTop.value + 500, 0, true);
        }
      };
      const chapterImageInfo = vue.ref({});
      const changeChapterInfo = ({
        chapter_name,
        chapter_n,
        curentImgNum,
        totalImage
      }) => {
        currentChapter_n.value = chapter_n;
        currentChapterTitle.value = chapter_name;
        chapterImageInfo.value = {
          curentImgNum,
          totalImage
        };
      };
      const changeChapter = async (targetChapter_n) => {
        currentChapter_n.value = targetChapter_n;
        isLoaded.value = false;
        comicImageList.value = [];
        const res = await getComicContent(curentComicName.value, currentChapter_n.value, device_width.value);
        if (res.data.status == 1) {
          const resLen = res.data.data.imgUrlList.length;
          await virtualList.value.completeByNoMore([res.data.data], resLen == 0);
          if (resLen < 3 && resLen != 0) {
            await queryList();
          }
        }
        isLoaded.value = true;
      };
      let hasChangedChapter = vue.ref(true);
      const scrollTopChange = async (top) => {
        if (top <= 500 && currentChapter_n.value !== 1 && hasChangedChapter.value) {
          hasChangedChapter.value = false;
          currentChapter_n.value -= 1;
          const res = await getComicContent(curentComicName.value, currentChapter_n.value, device_width.value);
          await virtualList.value.addDataFromTop([res.data.data], false);
          setTimeout(() => {
            hasChangedChapter.value = true;
          }, 500);
        }
        scrollTop.value = top;
      };
      const reverseChapter = () => {
        chapterList.value.reverse();
      };
      const __returned__ = { store: store2, virtualList, comic, curentComicName, comicImageList, listLen, device_width, popMenu, isLoaded, currentChapter_n, currentChapterTitle, chapterList, screenHeight, scrollTop, saveHistory, queryList, onVolumeKeyDown, handelOpenMenu, chapterImageInfo, changeChapterInfo, changeChapter, get hasChangedChapter() {
        return hasChangedChapter;
      }, set hasChangedChapter(v) {
        hasChangedChapter = v;
      }, scrollTopChange, reverseChapter, get onUnload() {
        return onUnload;
      }, get onHide() {
        return onHide;
      }, get onLoad() {
        return onLoad;
      }, get useStore() {
        return useStore;
      }, computed: vue.computed, getCurrentInstance: vue.getCurrentInstance, onMounted: vue.onMounted, ref: vue.ref, watch: vue.watch, onUnmounted: vue.onUnmounted, comicImageVue, comicChapterContentVue, pageLoadingVue, timeVue, comicMenuVue, get getComicChapters() {
        return getComicChapters;
      }, get getComicContent() {
        return getComicContent;
      }, get insertHistory() {
        return insertHistory;
      }, get isExistHistory() {
        return isExistHistory;
      }, get updateHistory() {
        return updateHistory;
      }, get getSystemInfo() {
        return getSystemInfo;
      }, get getSelectorInfo() {
        return getSelectorInfo;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_load_more = resolveEasycom(vue.resolveDynamicComponent("uv-load-more"), __easycom_0$6);
    const _component_z_paging = resolveEasycom(vue.resolveDynamicComponent("z-paging"), __easycom_1$4);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createVNode($setup["comicMenuVue"], {
          onChangeChapter: $setup.changeChapter,
          onReverseChapter: $setup.reverseChapter,
          currentChapter_n: $setup.currentChapter_n,
          chapterList: $setup.chapterList,
          title: $setup.currentChapterTitle,
          ref: "popMenu"
        }, null, 8, ["currentChapter_n", "chapterList", "title"]),
        vue.createVNode($setup["timeVue"], {
          zIndex: $setup.isLoaded ? 9 : 0,
          chapterImageInfo: $setup.chapterImageInfo
        }, null, 8, ["zIndex", "chapterImageInfo"]),
        !$setup.isLoaded ? (vue.openBlock(), vue.createBlock($setup["pageLoadingVue"], { key: 0 })) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", {
          class: "page",
          onClick: vue.withModifiers($setup.handelOpenMenu, ["stop"])
        }, [
          vue.createVNode(_component_z_paging, {
            "show-scrollbar": false,
            fixed: false,
            onScrollTopChange: $setup.scrollTopChange,
            "lower-threshold": "500px",
            "cell-height-mode": "dynamic",
            "refresher-enabled": false,
            ref: "virtualList",
            modelValue: $setup.comicImageList,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.comicImageList = $event),
            "use-virtual-list": "",
            onQuery: $setup.queryList
          }, {
            default: vue.withCtx(() => [
              $setup.currentChapter_n != 1 && !$setup.hasChangedChapter ? (vue.openBlock(), vue.createBlock(_component_uv_load_more, {
                key: 0,
                status: "loading",
                "loading-text": "努力加载中..."
              })) : vue.createCommentVNode("v-if", true),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.comicImageList, (chapter, index2) => {
                  return vue.openBlock(), vue.createBlock($setup["comicChapterContentVue"], {
                    onChangeChapterInfo: $setup.changeChapterInfo,
                    id: `zp-id-${chapter == null ? void 0 : chapter.zp_index}`,
                    key: chapter == null ? void 0 : chapter.zp_index,
                    chapter
                  }, null, 8, ["id", "chapter"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesComicReadComicRead = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-e33e18a0"], ["__file", "D:/APP/novel-app/novel-app/pages/comic-read/comic-read.vue"]]);
  const parseTime = (time) => {
    const newTimestamp = new Date(time).getTime() + 8 * 60 * 60 * 1e3;
    const newDate = new Date(newTimestamp);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const day = newDate.getDate();
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();
    return `${year}年${month}月${day} ${hour}时${minute}分`;
  };
  const _sfc_main$7 = {
    __name: "history-list",
    props: {
      historyList: {
        type: Array,
        default: () => []
      },
      isEditMode: {
        type: Boolean,
        default: false
      },
      operationContanierHeight: {
        type: Number,
        default: 0
      }
    },
    emits: ["selectBook", "handelLongPress", "addToBookShell"],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const typeStyle = vue.reactive({
        comic: {
          name: "漫画",
          style: {
            backgroundColor: "#D9F0E9",
            color: "#386E5E"
          }
        },
        novel: {
          name: "小说",
          style: {
            backgroundColor: "#E6E7EB",
            color: "#444246"
          }
        }
      });
      const props2 = __props;
      const emits = __emit;
      const selectBook = (index2) => {
        emits("selectBook", index2);
      };
      const handelLongPress = (index2) => {
        emits("handelLongPress", index2);
      };
      const addToBookShell = (book) => {
        if (book.isInBookShell)
          return;
        emits("addToBookShell", book);
      };
      const __returned__ = { typeStyle, props: props2, emits, selectBook, handelLongPress, addToBookShell, get parseTime() {
        return parseTime;
      }, reactive: vue.reactive };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_empty = resolveEasycom(vue.resolveDynamicComponent("l-empty"), __easycom_0$1);
    const _component_uv_image = resolveEasycom(vue.resolveDynamicComponent("uv-image"), __easycom_1$3);
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "history-list",
        style: vue.normalizeStyle({ paddingBottom: $props.isEditMode ? $props.operationContanierHeight + "px" : 0 })
      },
      [
        $props.historyList.length === 0 ? (vue.openBlock(), vue.createBlock(_component_l_empty, {
          key: 0,
          description: "没有找到相关内容"
        })) : (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          { key: 1 },
          vue.renderList($props.historyList, (book, index2) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              onClick: ($event) => $setup.selectBook(index2),
              onLongpress: ($event) => $setup.handelLongPress(index2),
              class: "history-list-item",
              key: book.id
            }, [
              vue.createElementVNode("view", { class: "cover" }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "type",
                    style: vue.normalizeStyle($setup.typeStyle[book.type].style)
                  },
                  vue.toDisplayString($setup.typeStyle[book.type].name),
                  5
                  /* TEXT, STYLE */
                ),
                vue.createVNode(_component_uv_image, {
                  src: book.cover,
                  "lazy-loade": "",
                  observeLazyLoad: "",
                  fade: "",
                  radius: "5",
                  width: "140rpx",
                  height: "200rpx"
                }, null, 8, ["src"])
              ]),
              vue.createElementVNode("view", { class: "info" }, [
                vue.createElementVNode(
                  "view",
                  { class: "name" },
                  vue.toDisplayString(book.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "b" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "chapter" },
                    vue.toDisplayString(book.chapter_name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "time" },
                    "浏览时间：" + vue.toDisplayString($setup.parseTime(book.read_time)),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              $props.isEditMode ? (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                key: 0,
                color: book.checked ? "#F66B32" : "#7E7E7E",
                name: "checkmark-circle-fill",
                size: "24"
              }, null, 8, ["color"])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                onClick: ($event) => $setup.addToBookShell({ index: index2, ...book }),
                class: vue.normalizeClass(["addBookShell", book.isInBookShell ? "hasAdded" : ""])
              }, vue.toDisplayString(book.isInBookShell ? "已加" : "加入") + "书架 ", 11, ["onClick"]))
            ], 40, ["onClick", "onLongpress"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      4
      /* STYLE */
    );
  }
  const historyListVue = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-144ace82"], ["__file", "D:/APP/novel-app/novel-app/pages/history/components/history-list.vue"]]);
  const _sfc_main$6 = {
    __name: "history",
    setup(__props, { expose: __expose }) {
      __expose();
      const {
        tabBarList,
        currentPage,
        currentActiveTabbar,
        pageChange,
        handelTopChange,
        pageList
      } = useSlide();
      const modal = vue.ref(null);
      pageList.value = [{
        name: "all",
        alias: "全部",
        hasShown: true
      }, {
        name: "novel",
        alias: "小说",
        hasShown: false
      }, {
        name: "comic",
        alias: "漫画",
        hasShown: false
      }];
      const listHeight = vue.ref(0);
      const operationContanierHeight = vue.ref(0);
      const instance = vue.getCurrentInstance();
      const historyList = vue.reactive({
        all: {
          size: 10,
          offset: 0,
          list: []
        },
        novel: {
          size: 10,
          offset: 0,
          list: []
        },
        comic: {
          size: 10,
          offset: 0,
          list: []
        }
      });
      const checkedCount = vue.computed(() => historyList[currentPage.value.name].list.filter((item) => item.checked).length);
      vue.watch(currentPage, async (newVal) => {
        if (!newVal.hasShown) {
          if (newVal.name !== pageList.value[0].name) {
            await getHistories();
          }
          pageList.value[currentActiveTabbar.value] = {
            ...newVal,
            hasShown: true
          };
        }
      });
      const isEditMode = vue.ref(false);
      vue.watch(isEditMode, (newVal) => {
        if (!newVal) {
          historyList[currentPage.value.name].list = historyList[currentPage.value.name].list.map((item) => ({
            ...item,
            checked: false
          }));
        }
      });
      const isMounted = vue.ref(false);
      vue.onMounted(async () => {
        const sysInfo = await getSystemInfo();
        const headerInfo = await getSelectorInfo(instance, ".header");
        const operationInfo = await getSelectorInfo(instance, ".operation-contaniner");
        operationContanierHeight.value = operationInfo.height;
        listHeight.value = sysInfo.windowHeight - headerInfo.height;
        isMounted.value = true;
        await getHistories();
      });
      const getHistories = async () => {
        const pageName = currentPage.value.name;
        const {
          size,
          offset
        } = historyList[pageName];
        const list = await getHistoryList(pageName, size, offset);
        const newList = await Promise.all(list.map(async (item) => {
          const isIn = await isInBookShell(item.novel_id, item.type);
          return {
            ...item,
            checked: false,
            isInBookShell: isIn
          };
        }));
        historyList[pageName].list = [...historyList[pageName].list, ...newList];
      };
      onBackPress(() => {
        if (isEditMode.value) {
          isEditMode.value = false;
          return true;
        }
      });
      const handelLongPress = (index2) => {
        if (!isEditMode.value) {
          historyList[currentPage.value.name].list[index2].checked = true;
          isEditMode.value = true;
          uni.vibrateShort();
        }
      };
      const handelSelectAll = () => {
        const pageName = currentPage.value.name;
        const checked = checkedCount.value == historyList[pageName].list.length;
        historyList[pageName].list = historyList[pageName].list.map((item) => ({
          ...item,
          checked: !checked
        }));
      };
      const selectBook = (index2) => {
        if (isEditMode.value) {
          historyList[currentPage.value.name].list[index2].checked = !historyList[currentPage.value.name].list[index2].checked;
        }
      };
      const deleteHistoryList = async () => {
        const pageName = currentPage.value.name;
        const selectedBookId = historyList[pageName].list.filter((item) => item.checked).map((item) => item.id);
        for await (const id of selectedBookId) {
          await deleteHistoryListById(id);
        }
        for (const className of Object.keys(historyList)) {
          historyList[className].list = historyList[className].list.filter((item) => !selectedBookId.includes(item.id));
        }
        isEditMode.value = false;
        uni.showToast({
          icon: "none",
          title: "删除成功"
        });
      };
      const addToBookShell = async (book = null, action = 0) => {
        let finished = false;
        const pageName = currentPage.value.name;
        if (action === 0) {
          await insterBookShell({
            ...book
          });
          historyList[pageName].list[book.index].isInBookShell = true;
          finished = true;
        } else if (action === 1) {
          const selectedBook = historyList[pageName].list.filter((item) => item.checked);
          const isAllInBookShell = selectedBook.every((item) => item.isInBookShell);
          if (!isAllInBookShell) {
            for await (const book2 of selectedBook) {
              const index2 = historyList[pageName].list.findIndex((item) => item.id == book2.id);
              if (!book2.isInBookShell) {
                await insterBookShell({
                  ...book2
                });
              }
              historyList[pageName].list[index2].isInBookShell = true;
            }
          }
          finished = !isAllInBookShell;
          isEditMode.value = false;
        }
        if (finished) {
          uni.showToast({
            icon: "none",
            title: "加入书架成功"
          });
        } else {
          uni.showToast({
            icon: "none",
            title: "当前已在书架"
          });
        }
      };
      const back = () => {
        uni.navigateBack();
      };
      const enterEditMode = () => {
        if (historyList[currentPage.value.name].list.length == 0)
          return;
        isEditMode.value = true;
      };
      const __returned__ = { tabBarList, currentPage, currentActiveTabbar, pageChange, handelTopChange, pageList, modal, listHeight, operationContanierHeight, instance, historyList, checkedCount, isEditMode, isMounted, getHistories, handelLongPress, handelSelectAll, selectBook, deleteHistoryList, addToBookShell, back, enterEditMode, getCurrentInstance: vue.getCurrentInstance, onMounted: vue.onMounted, reactive: vue.reactive, ref: vue.ref, computed: vue.computed, watch: vue.watch, get onBackPress() {
        return onBackPress;
      }, get deleteHistoryListById() {
        return deleteHistoryListById;
      }, get getHistoryList() {
        return getHistoryList;
      }, get insterBookShell() {
        return insterBookShell;
      }, get isInBookShell() {
        return isInBookShell;
      }, get useSlider() {
        return useSlide;
      }, get getSystemInfo() {
        return getSystemInfo;
      }, get getSelectorInfo() {
        return getSelectorInfo;
      }, midAreaVue: ComponentsHomeMidAreaMidArea, midAreaItemVue, historyListVue, modalVue };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "browse-history-contanier" }, [
          vue.createCommentVNode(" header "),
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode("view", { class: "status-bar" }),
            vue.createElementVNode("view", { class: "action-list" }, [
              vue.createElementVNode("view", { class: "btn" }, [
                $setup.isEditMode ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  onClick: _cache[0] || (_cache[0] = ($event) => $setup.isEditMode = false)
                }, "取消")) : (vue.openBlock(), vue.createBlock(_component_uv_icon, {
                  key: 1,
                  name: "arrow-left",
                  size: "48rpx",
                  onClick: $setup.back
                }))
              ]),
              vue.createElementVNode("view", { class: "title" }, "浏览历史"),
              vue.createElementVNode("view", {
                class: "btn",
                style: { "text-align": "right" }
              }, [
                $setup.isEditMode ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 0,
                    onClick: $setup.handelSelectAll
                  },
                  vue.toDisplayString($setup.checkedCount == $setup.historyList[$setup.currentPage.name].list.length ? "取消" : "") + "全选 ",
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ])
            ]),
            !$setup.isEditMode ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "class-list"
            }, [
              vue.createElementVNode("view", { class: "l" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.tabBarList, (className, index2) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      onClick: ($event) => $setup.currentActiveTabbar = index2,
                      class: vue.normalizeClass(["class-item", $setup.currentActiveTabbar == index2 ? "active" : ""]),
                      key: index2
                    }, vue.toDisplayString(className), 11, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: "r",
                  style: vue.normalizeStyle({ color: $setup.historyList[$setup.currentPage.name].list.length == 0 ? "#989898" : "#000" }),
                  onClick: $setup.enterEditMode
                },
                "编辑",
                4
                /* STYLE */
              )
            ])) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createVNode($setup["midAreaVue"], {
            enableSlide: !$setup.isEditMode,
            background: "#fff",
            height: $setup.listHeight,
            length: $setup.tabBarList.length,
            current: $setup.currentActiveTabbar,
            onPageChange: $setup.pageChange
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.pageList, (page2, index2) => {
                  return vue.openBlock(), vue.createBlock(
                    $setup["midAreaItemVue"],
                    {
                      refresh: false,
                      key: index2
                    },
                    {
                      default: vue.withCtx(() => [
                        vue.createVNode($setup["historyListVue"], {
                          onAddToBookShell: $setup.addToBookShell,
                          onSelectBook: $setup.selectBook,
                          onHandelLongPress: $setup.handelLongPress,
                          isEditMode: $setup.isEditMode,
                          historyList: $setup.historyList[page2.name].list
                        }, null, 8, ["isEditMode", "historyList"])
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["enableSlide", "height", "length", "current", "onPageChange"]),
          vue.createCommentVNode(" 底部操纵栏 "),
          !$setup.isMounted || $setup.isEditMode ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "operation-contaniner"
          }, [
            vue.createElementVNode("view", {
              class: "l",
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.addToBookShell(null, 1))
            }, [
              vue.createVNode(_component_uv_icon, {
                name: "jiarushujia",
                color: "#000",
                "custom-prefix": "custom-icon",
                size: "48rpx"
              }),
              vue.createElementVNode("view", { class: "txt" }, " 加入书架 "),
              vue.createElementVNode(
                "view",
                { class: "count" },
                "(" + vue.toDisplayString($setup.checkedCount) + ")",
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", {
              class: "r",
              onClick: _cache[2] || (_cache[2] = ($event) => $setup.modal.open())
            }, [
              vue.createVNode(_component_uv_icon, {
                name: "trash",
                size: "52rpx",
                color: "#F66B32"
              }),
              vue.createElementVNode("view", {
                class: "txt",
                style: { "color": "#F66B32" }
              }, " 删除 "),
              vue.createElementVNode(
                "view",
                {
                  style: { "color": "#F66B32" },
                  class: "count"
                },
                "(" + vue.toDisplayString($setup.checkedCount) + ")",
                1
                /* TEXT */
              )
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createVNode(
          $setup["modalVue"],
          {
            btnReverse: "",
            ref: "modal",
            title: "确认删除浏览历史吗<br/>删除浏览历史将丢失你的阅读记录",
            onConfirm: $setup.deleteHistoryList,
            confirmText: "确认"
          },
          null,
          512
          /* NEED_PATCH */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesHistoryHistory = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-b2d018fa"], ["__file", "D:/APP/novel-app/novel-app/pages/history/history.vue"]]);
  const _sfc_main$5 = {
    __name: "aboutus",
    setup(__props, { expose: __expose }) {
      __expose();
      const appVersion = vue.ref("");
      vue.onMounted(async () => {
        const sysInfo = await getSystemInfo();
        appVersion.value = sysInfo.appVersion;
      });
      const back = () => {
        uni.navigateBack();
      };
      const goToGitHub = () => {
        plus.runtime.openURL(encodeURI("https://github.com/ITSTRONGERMAN/novel-app"));
      };
      const goToDisclaimer = () => {
        uni.navigateTo({
          url: "/pages/aboutus/childpage/disclaimer/disclaimer"
        });
      };
      const __returned__ = { appVersion, back, goToGitHub, goToDisclaimer, ref: vue.ref, onMounted: vue.onMounted, get getSystemInfo() {
        return getSystemInfo;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "about-contanier bcg-color" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", { class: "status-bar" }),
        vue.createElementVNode("view", { class: "inner-box" }, [
          vue.createVNode(_component_uv_icon, {
            onClick: $setup.back,
            color: "#000",
            name: "arrow-left",
            size: "50rpx"
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "icon-box" }, [
        vue.createElementVNode("image", {
          src: _imports_0,
          mode: ""
        }),
        vue.createElementVNode("view", { class: "name" }, "番猫免费小说 ")
      ]),
      vue.createElementVNode("view", { class: "about-list" }, [
        vue.createElementVNode("view", { class: "about-item" }, [
          vue.createElementVNode(
            "view",
            { class: "name" },
            "版本信息：" + vue.toDisplayString($setup.appVersion),
            1
            /* TEXT */
          ),
          vue.createVNode(_component_uv_icon, {
            color: "#000",
            name: "arrow-right",
            size: "32rpx"
          })
        ]),
        vue.createElementVNode("view", {
          class: "about-item",
          onClick: $setup.goToGitHub
        }, [
          vue.createElementVNode("view", { class: "name" }, " github地址： "),
          vue.createElementVNode("view", { class: "content" }, " https://github.com/ITSTRONGERMAN/novel-app ")
        ]),
        vue.createElementVNode("view", {
          class: "about-item",
          onClick: $setup.goToDisclaimer
        }, [
          vue.createElementVNode("view", { class: "name" }, " 免责声明 "),
          vue.createVNode(_component_uv_icon, {
            color: "#000",
            name: "arrow-right",
            size: "32rpx"
          })
        ])
      ])
    ]);
  }
  const PagesAboutusAboutus = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-5c2e2cf7"], ["__file", "D:/APP/novel-app/novel-app/pages/aboutus/aboutus.vue"]]);
  const _sfc_main$4 = {};
  function _sfc_render$3(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "disclaimer-container" }, [
      vue.createElementVNode("view", { class: "h1" }, "《番猫免费小说 开源免责声明》"),
      vue.createElementVNode("p", { class: "h2" }, "尊敬的读者："),
      vue.createElementVNode("p", { class: "content" }, " 欢迎阅读由 PIONEER.JU 创作并开源的小说软件《番猫免费小说》。在此，特向您阐明相关事宜，请您在阅读前仔细阅读本免责声明。"),
      vue.createElementVNode("p", { class: "h2" }, "一、内容性质"),
      vue.createElementVNode("p", { class: "content" }, "本小说为虚构创作，所有人物、情节、场景等均源自作者的想象与构思，与现实中的个人、团体、事件无直接关联，如有雷同，纯属巧合。"),
      vue.createElementVNode("p", { class: "h2" }, "二、开源许可"),
      vue.createElementVNode("p", { class: "content" }, " 本小说依据MIT开源协议进行发布，这意味着您有权在遵循该协议条款的前提下，对本小说进行合理使用、分享、改编等操作。但未经作者书面许可，不得用于任何商业盈利目的，包括但不限于出版印刷、影视改编盈利、网络付费阅读等商业行为。 "),
      vue.createElementVNode("p", { class: "h2" }, "三、风险提示"),
      vue.createElementVNode("p", { class: "content" }, " 阅读小说是一种个人娱乐行为，由于个人理解、心理承受能力等差异，若您在阅读过程中因小说内容产生任何不适、精神压力或其他负面情绪，作者及相关开源平台不承担任何责任。请您依据自身情况，谨慎选择阅读。"),
      vue.createElementVNode("p", { class: "h2" }, "四、版权归属"),
      vue.createElementVNode("p", { class: "content" }, "本小说的版权归属于 PIONEER.JU，虽开源供公众阅读与交流，但作者始终保留对小说的最终解释权以及对违反开源协议行为追究法律责任的权利。"),
      vue.createElementVNode("p", { class: "h2" }, "五、更新与维护"),
      vue.createElementVNode("p", { class: "content" }, " 作者将尽力按照既定计划更新小说内容，但因不可预见的个人原因、技术问题等因素，可能导致更新延迟或中断，望您理解，并不对此追究作者责任。"),
      vue.createElementVNode("p", { class: "h2" }, "六、外部链接与引用"),
      vue.createElementVNode("p", { class: "content" }, "小说中可能包含指向外部网站、资料的链接，作者不对这些外部资源的安全性、准确性、合法性负责，您点击访问这些链接所产生的一切后果自行承担。"),
      vue.createElementVNode("p", { class: "content" }, "再次感谢您对本开源小说的关注与支持，希望您享受阅读过程，若您有任何疑问或建议，欢迎通过与作者沟通。"),
      vue.createElementVNode("p", { class: "content" }, "PIONEER.JU"),
      vue.createElementVNode("p", { class: "content" }, "邮箱：2929727886@qq.com")
    ]);
  }
  const PagesAboutusChildpageDisclaimerDisclaimer = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-d1873373"], ["__file", "D:/APP/novel-app/novel-app/pages/aboutus/childpage/disclaimer/disclaimer.vue"]]);
  const _sfc_main$3 = {
    __name: "input",
    props: {
      modelValue: {
        type: String,
        default: ""
      },
      type: {
        type: String,
        default: "text"
      },
      placeholder: {
        type: String,
        default: ""
      }
    },
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose();
      const props2 = __props;
      const emit = __emit;
      const inputTypeConfig = vue.ref({
        text: {
          rightIcon: "close",
          rightIconClick() {
            emit("update:modelValue", "");
          }
        },
        password: {
          rightIcon: "eye-fill",
          rightIconClick() {
            formatAppLog("log", "at pages/login/components/input.vue:51", "Password icon clicked");
          }
        }
      });
      const handleInput = (event) => {
        emit("update:modelValue", event.target.value);
      };
      const __returned__ = { props: props2, emit, inputTypeConfig, handleInput, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "input" }, [
      vue.createCommentVNode(" input组件绑定v-model "),
      vue.createElementVNode("input", {
        onInput: $setup.handleInput,
        value: $props.modelValue,
        type: $props.type,
        placeholder: $props.placeholder
      }, null, 40, ["value", "type", "placeholder"]),
      vue.createElementVNode("view", { class: "icon" }, [
        vue.createCommentVNode(" 根据当前类型配置右侧图标点击事件 "),
        vue.createVNode(_component_uv_icon, {
          onClick: $setup.inputTypeConfig[$props.type].rightIconClick,
          name: $setup.inputTypeConfig[$props.type].rightIcon,
          color: "#868684",
          size: "14",
          bold: ""
        }, null, 8, ["onClick", "name"])
      ])
    ]);
  }
  const inputVue = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-021724e2"], ["__file", "D:/APP/novel-app/novel-app/pages/login/components/input.vue"]]);
  const _sfc_main$2 = {
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      const accountVal = vue.ref("21313");
      const back = () => {
        uni.navigateBack();
      };
      const onSubmit = () => {
        formatAppLog("log", "at pages/login/login.vue:38", 123);
      };
      const __returned__ = { accountVal, back, onSubmit, ref: vue.ref, inputVue };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = resolveEasycom(vue.resolveDynamicComponent("uv-icon"), __easycom_0$9);
    return vue.openBlock(), vue.createElementBlock("view", { class: "login-container" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", { class: "status-bar" }),
        vue.createElementVNode("view", { class: "inner-box" }, [
          vue.createVNode(_component_uv_icon, {
            onClick: $setup.back,
            color: "#000",
            name: "arrow-left",
            size: "50rpx"
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "icon-box" }, [
        vue.createElementVNode("image", {
          src: _imports_0,
          mode: ""
        })
      ]),
      vue.createElementVNode(
        "form",
        {
          class: "form",
          onSubmit: vue.withModifiers($setup.onSubmit, ["prevent"])
        },
        [
          vue.createElementVNode("view", { class: "inner-box" }, [
            vue.createVNode($setup["inputVue"], {
              type: "text",
              placeholder: "请输入您的账号",
              modelValue: $setup.accountVal,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.accountVal = $event)
            }, null, 8, ["modelValue"]),
            vue.createElementVNode("view", { class: "btn-group" }, [
              vue.createElementVNode("button", {
                "open-type": "submit",
                class: "btn"
              }, "登录")
            ])
          ])
        ],
        32
        /* NEED_HYDRATION */
      )
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-e4e4508d"], ["__file", "D:/APP/novel-app/novel-app/pages/login/login.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesRewardReward = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/APP/novel-app/novel-app/pages/reward/reward.vue"]]);
  __definePage("pages/home/index", PagesHomeIndex);
  __definePage("components/home/mid-area/mid-area", ComponentsHomeMidAreaMidArea);
  __definePage("pages/nove-detail/index", PagesNoveDetailIndex);
  __definePage("pages/chapters/chapters", PagesChaptersChapters);
  __definePage("pages/read/read", PagesReadRead);
  __definePage("pages/bookshelf/bookshelf", PagesBookshelfBookshelf);
  __definePage("pages/class/class", PagesClassClass);
  __definePage("pages/user/user", PagesUserUser);
  __definePage("pages/search/search", PagesSearchSearch);
  __definePage("pages/comic-read/comic-read", PagesComicReadComicRead);
  __definePage("pages/history/history", PagesHistoryHistory);
  __definePage("pages/aboutus/aboutus", PagesAboutusAboutus);
  __definePage("pages/aboutus/childpage/disclaimer/disclaimer", PagesAboutusChildpageDisclaimerDisclaimer);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/reward/reward", PagesRewardReward);
  const _sfc_main = {
    __name: "App",
    setup(__props, { expose: __expose }) {
      __expose();
      onLaunch(() => {
        plus.screen.lockOrientation("portrait-primary");
      });
      onUnload(() => {
        closeDatabase();
      });
      const __returned__ = { get onUnload() {
        return onUnload;
      }, get onLaunch() {
        return onLaunch;
      }, get closeDatabase() {
        return closeDatabase;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/APP/novel-app/novel-app/App.vue"]]);
  const store = createStore({
    state() {
      return {
        // 中部区域高度
        midAreaHeight: 0,
        readTime: uni.getStorageSync("readTime") || 0,
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
      },
      // 更新阅读时间
      updateReadTime(state) {
        state.readTime = state.readTime + 1;
        uni.setStorageSync("readTime", state.readTime);
      }
    }
  });
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(store);
    return {
      app,
      store
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
