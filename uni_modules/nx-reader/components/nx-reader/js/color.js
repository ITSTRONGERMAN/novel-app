/**
 * 颜色混合算法
 * @param color1 
 * @param color2 
 * @param weight 合并的比例（选择权重），默认值为 50%（0.5），其取值范围是 0~1 之间。它是每个 RGB 的百分比来衡量，如果指定的比例是 25%，意味着第一个颜色所占比例为 25%，第二个颜色所占比例为75%
 */
export const mixColor = (color1, color2, weight = 0.5) => {
	let rgb1 = toRgb(color1);
	let rgb2 = toRgb(color2);
	if (!rgb1 || !rgb2) return null; // 验证输入是否有效
	// 混合颜色
	var r3 = Math.round(rgb1[0] * weight + rgb2[0] * (1 - weight));
	var g3 = Math.round(rgb1[1] * weight + rgb2[1] * (1 - weight));
	var b3 = Math.round(rgb1[2] * weight + rgb2[2] * (1 - weight));
	// 返回混合后的颜色
	return rgbToHex([r3, g3, b3]);
}

// 将颜色字符串转换为RGB数组
const toRgb = (hexColor) => {
	const hexReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	const rgbReg = /^(rgb|RGB)/;
	hexColor = String(hexColor).toLowerCase();
	if (hexColor && hexReg.test(hexColor)) {
	    if (hexColor.length === 4) {
	        let newHexColor = '#';
	        for (let i = 1; i < 4; i += 1) {
	            newHexColor += hexColor.slice(i, i + 1).concat(hexColor.slice(i, i + 1));
	        }
	        hexColor = newHexColor;
	    }
	    // 处理六位的颜色值
	    const rgbColorArr = [];
	    for (let i = 1; i < 7; i += 2) {
	        rgbColorArr.push(parseInt(hexColor.slice(i, i + 2), 16));
	    }
		return rgbColorArr
	}
	if (rgbReg.test(sColor)) {
	    const rgbColorArr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
	    return rgbColorArr.map((val) => Number(val))
	}
	return null;
}

// 将RGB数组转换回hex表示方式颜色字符串
const rgbToHex = (rgb) => {
	return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}