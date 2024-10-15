const PI = Math.PI;
/**
 * 90度角弧度值
 */
const A90 = PI / 2;

let pageNumber = 0;

let pageCount = -1;

let moving = false;

export const point2D = (x, y) => {
	return {
		x: x,
		y: y
	};
}

export const setPageNumber = (number) => {
	pageNumber = number;
}

export const setPageCount = (count) => {
	pageCount = count;
}

let staticParam = {
	mode: 'half',
	page: {
		width: 0,
		height: 0
	},
	startPoint: point2D(0, 0),
	pointVerticalPosition: "c",
	moveHorizontalPosition: 'r',
	pageCorner: null
}

const reset = () => {
	staticParam = {
		mode: staticParam.mode,
		page: staticParam.page,
		startPoint: point2D(0, 0),
		pointVerticalPosition: "c",
		moveHorizontalPosition: 'r',
		pageCorner: null
	}
	moving = false;
	ending = false;
	return {
		wrapper: {},
		content: {},
		bwrapper: {},
		bcontent: {},
		gradient: {},
		bgradient: {}
	};
}

/**
 * 触摸开始事件
 * @param page 包含页面的长和宽：{ width: w, height: h }
 * @param startPoint 起始触摸点：{ x: x, y: y }
 */
export const touchStartEvent = (page, startPoint) => {
	staticParam.page = page;
	staticParam.startPoint = startPoint;
	setVerticalPosition(page);
}

/**
 * 触摸移动事件
 * @param point 移动时触摸点：{ x: x, y: y }
 * @returns Translate样式
 */
export const touchMoveEvent = (point) => {
	getCornerPosition(point);
	let style = {};
	/*
	 * 满足以下条件，样式进行变化
	 * 
	 * 从右翻页（向下一页）并且存在下一页
	 * 		pageCount == -1 表示 不限制向下翻页，即：永远存在下一页
	 * 		pageNumber < pageCount - 1 表示 当前页不是最后一页
	 * 或者
	 * 从左翻页（向上一页）并且存在上一页
	 * 		pageNumber > 0 表示 当前页不是第一页
	 * 		moving 表示 正在进行翻页动作（非第一次触摸移动）
	 */
	if (
			(staticParam.moveHorizontalPosition == 'r' && (pageCount == -1 || pageNumber < pageCount - 1)) 
			|| ((staticParam.moveHorizontalPosition == 'l') && (pageNumber > 0 || moving))
	) {
		style = getTranslateStyle(point);
		if (staticParam.moveHorizontalPosition == 'l' && !moving) {
			// 向上一页翻并且第一次触摸移动，翻动页面应展示上一页的数据
			pageNumber--;
		}
		moving = true;
	}
	return {
		style: style,
		pageNumber: pageNumber
	};
}
let ending = false;
/**
 * 触摸结束事件
 * @param point 结束时触摸点：{ x: x, y: y }
 * @returns Translate样式
 */
export const touchEndEvent = (point, cb, stop, clickCenter) => {
	if(ending) {
		return;
	}
	ending = true;
	let o;
	let endPosition;
	let turn = false;
	let isClick = false;
	// 取消从左翻页
	let isCancel4l = false;
	if (staticParam.pageCorner) {
		endPosition = getEndPointPosition(point);
	} else if (staticParam.mode == "half") {
		// staticParam.pageCorner不存在，说明触摸点未移动，即：点击
		isClick = true;
		// 点击水平位置
		staticParam.moveHorizontalPosition = getPointHorizontalPosition(point);
		if (staticParam.moveHorizontalPosition != "c") {
			// 点击右边向左翻页，反之
			endPosition = staticParam.moveHorizontalPosition == "r" ? "l" : "r";
			staticParam.pageCorner = "r";
			staticParam.pointVerticalPosition = "c";
		} else {
			// 点击中间
			reset();
			clickCenter && clickCenter();
			return;
		}
	}
	// 翻页方向（从哪个方向翻页）
	let pointHorizontalPosition = staticParam.moveHorizontalPosition;
	// 如果是展示半本书模式，且从左翻页，设定为从右翻页
	if (staticParam.mode == "half" && staticParam.moveHorizontalPosition == "l") {
		pointHorizontalPosition = "r";
	}

	if (endPosition == pointHorizontalPosition) { // 触摸结束点位置与翻页方向相同
		// 获取页面角落的坐标
		o = getPageCornersCoordinates(staticParam.pageCorner, staticParam.page);
		if (staticParam.moveHorizontalPosition == "l") {
			if (!moving) {
				// 向上翻页并且是首页
				if (pageNumber == 0) {
					staticParam.pageCorner = null;
					if (stop) stop({
						...animationOverStyle(),
						isFirst: true
					});
					return;
				}
				pageNumber--;
			}
		}
	} else { // 触摸结束点位置与翻页方向不同
		// 获取结束点（翻开书页的书角顶点最终的位置）
		o = getEndingPoint(staticParam.pageCorner, staticParam.page);
		if (staticParam.moveHorizontalPosition == "r") {
			if(pageCount != -1 && pageNumber >= pageCount - 1) {
				staticParam.pageCorner = null;
				if (stop) stop({
					...animationOverStyle(),
					isLast: true
				});
				return;
			}
			turn = true;
		} else { // 取消翻页（从左翻页）
			isCancel4l = true;
		}
	}
	if (o) {
		const to = [o.x, o.y];
		createAnimation({
			from: [point.x, point.y],
			to: to,
			duration: 500,
			frame: (value) => {
				if (cb) cb({
					style: getTranslateStyle(point2D(value[0], value[1])),
					pageNumber: pageNumber
				});
			},
			complete: () => {
				if ((staticParam.moveHorizontalPosition == "r" && turn) || isCancel4l) {
					pageNumber++;
				}
				if (stop) stop(animationOverStyle());
			}
		});
	}
}

const animationOverStyle = () => {
	return {
		style: reset(),
		pageNumber: pageNumber
	}
}

/**
 * 获取页面对角线长度
 * @param page 包含页面的长和宽：{ width: w, height: h }
 */
export const getPageDiagonalLength = (page) => {
	return Math.sqrt(Math.pow(page.width, 2) + Math.pow(page.height, 2));
}
/**
 * 获取Translate样式
 * @param point 移动时触摸点：{ x: x, y: y }
 */
const getTranslateStyle = (point) => {
	let computeResult, a, tr, position, origin;
	/**
	 * 结束点（翻开书页的书角顶点最终的位置）
	 */
	const endingPoint = getEndingPoint(staticParam.pageCorner, staticParam.page);
	switch (staticParam.pageCorner) {
		case 'l':
			return;
		case 'r':
			point.x = Math.max(Math.min(point.x, staticParam.page.width - 1), endingPoint.x);
			computeResult = compute(point);
			a = -radians2degrees(computeResult.alpha);
			tr = point2D(-computeResult.tr.x, computeResult.tr.y);
			position = [0, 0, 0, 1];
			origin = [0, 0];
			break;
		case 'tl':
			// point.x = Math.max(point.x, 1);
			return;
		case 'tr':
			point.x = Math.max(Math.min(point.x, staticParam.page.width - 1), endingPoint.x);
			computeResult = compute(point);
			a = -radians2degrees(computeResult.alpha);
			tr = point2D(-computeResult.tr.x, computeResult.tr.y);
			position = [0, 0, 0, 1];
			origin = [0, 0];
			break;
		case 'bl':
			// point.x = Math.max(point.x, 1);
			return;
		case 'br':
			point.x = Math.max(Math.min(point.x, staticParam.page.width - 1), endingPoint.x);
			computeResult = compute(point);
			a = radians2degrees(computeResult.alpha);
			tr = point2D(-computeResult.tr.x, -computeResult.tr.y);
			position = [0, 1, 1, 0]
			origin = [0, 100];
			break;
	}
	return transformStyle(a, tr, computeResult, position, origin);
}

/**
 * 设置触摸在页面的上中下的位置，'t'、'c'、'b'，分别代表上部、中部、下部。
 * @param page 包含页面的长和宽：{ width: w, height: h }
 * @param startPoint 起始触摸点：{ x: x, y: y }
 */
const setVerticalPosition = (page) => {
	if (page.height * 0.3 > staticParam.startPoint.y) {
		staticParam.pointVerticalPosition = 't';
	} else if (page.height * 0.7 > staticParam.startPoint.y) {
		staticParam.pointVerticalPosition = 'c';
	} else if (page.height > staticParam.startPoint.y) {
		staticParam.pointVerticalPosition = 'b';
	}
}

/**
 * 设置翻开页面页角的位置，'tl'、'tr'、'bl'、'br'、'l' 和 'r'，分别代表左上角、右上角、左下角、右下角、左边和右边。
 * @param point 移动触摸点：{ x: x, y: y }
 */
const setCornerPosition = (point) => {
	if (staticParam.startPoint.x >= point.x) {
		staticParam.moveHorizontalPosition = 'r';
	} else {
		staticParam.moveHorizontalPosition = 'l';
	}
	if (staticParam.moveHorizontalPosition == 'l' && staticParam.mode == 'half') {
		staticParam.pageCorner = "r";
		staticParam.pointVerticalPosition = "c";
	} else if (staticParam.pointVerticalPosition == 'c') {
		staticParam.pageCorner = staticParam.moveHorizontalPosition;
	} else {
		staticParam.pageCorner = staticParam.pointVerticalPosition + staticParam.moveHorizontalPosition;
	}
}

/**
 * 获取翻开页面页角的位置，'tl'、'tr'、'bl'、'br'、'l' 和 'r'，分别代表左上角、右上角、左下角、右下角、左边和右边。
 * @param point 移动触摸点：{ x: x, y: y }
 */
const getCornerPosition = (point) => {
	if (!staticParam.pageCorner) {
		setCornerPosition(point);
	}
	return staticParam.pageCorner;
}

/**
 * 获取结束触摸点在页面的位置，'l'、'r'，分别代表左边和右边。
 * @param point 结束触摸点：{ x: x, y: y }
 */
const getEndPointPosition = (point) => {
	let middle;
	if (staticParam.mode == 'half') {
		if (staticParam.moveHorizontalPosition == 'l') {
			middle = staticParam.page.width * 0.2
		} else {
			middle = staticParam.page.width * 0.8
		}
	}
	if (middle > point.x) {
		return 'l';
	} else {
		return 'r';
	}
}

/**
 * 获取触摸点在页面的位置，'l'、'c'、'r'，分别代表左边，中间和右边。
 * @param point 触摸点：{ x: x, y: y }
 */
const getPointHorizontalPosition = (point) => {
	if (staticParam.page.width * 0.3 > point.x) {
		return 'l';
	}
	if (staticParam.page.width * 0.7 > point.x) {
		return 'c';
	} else {
		return 'r';
	}
}

const compute = (point) => {
	const page = staticParam.page;
	const top = staticParam.pointVerticalPosition == 't';
	const center = staticParam.pointVerticalPosition == "c"
	const left = staticParam.mode != 'half' && staticParam.moveHorizontalPosition == 'l';
	const pageCorner = getCornerPosition(point);
	// 获取页面角落的坐标
	const o = getPageCornersCoordinates(pageCorner, page);
	const pageDiagonalLength = getPageDiagonalLength(page);
	// 触摸/鼠标点相对于页面角落的坐标
	const rel = point2D(0, 0);
	rel.x = (o.x) ? o.x - point.x : point.x;
	rel.y = (o.y) ? o.y - point.y : point.y;
	// 触摸/鼠标点与页面角落的中间点坐标
	const middle = point2D(0, 0);
	middle.x = (left) ? page.width - rel.x / 2 : point.x + rel.x / 2;
	middle.y = rel.y / 2;

	/**
	 * 计算触摸/鼠标点与y轴的夹角弧度值alpha(α)。
	 * 其中，
	 * A90是一个常量，表示90度的角度弧度值，
	 * Math.atan2函数返回由两个参数(y和x)确定的点与x轴的夹角弧度值，范围为[-π, π]。
	 */
	const alpha = center ? A90 : A90 - Math.atan2(rel.y, rel.x);

	/** ??
	 * 计算弧度值gamma(γ)，gamma的计算方式为alpha减去middle点与x轴的夹角弧度值(反正切值, (0,0)为原点)
	 */
	const gamma = alpha - Math.atan2(middle.y, middle.x);

	// console.log("gamma:", gamma)

	/** ??
	 * 计算动态的距离，其中点middle的坐标为(x, y)，gamma为一个角度值。具体实现过程如下：
	 * 首先，根据middle点的坐标，计算出该点到原点(0,0)的距离，即sqrt(x^2 + y^2)。
	 * 然后，根据gamma的正弦值，计算出一个缩放因子，即sin(gamma)。
	 * 最后，将距离与缩放因子相乘，并取最大值为0，得到最终的距离值。
	 * 作用是根据给定的角度和一个点的坐标，计算出一个距离值，该距离值表示了该点到原点的最远距离。
	 */
	const distance = Math.max(0, Math.sin(gamma) * Math.sqrt(Math.pow(middle.x, 2) + Math.pow(middle.y, 2)));

	// console.log("distance:", distance)


	/** ??
	 * 根据middle点到原点的距离和alpha角度计算并返回一个二维点。
	 */
	const tr = point2D(distance * Math.sin(alpha), distance * Math.cos(alpha));
	// console.log("tr:", tr)

	if (alpha > A90) {
		tr.x = tr.x + Math.abs(tr.y * rel.y / rel.x);
		tr.y = 0;
		if (Math.round(tr.x * Math.tan(PI - alpha)) < page.height) {
			point.y = Math.sqrt(Math.pow(page.height, 2) + 2 * middle.x * rel.x);
			if (top) point.y = page.height - point.y;
			return compute(point);
		}
	}

	const mv = point2D(0, 0);

	if (alpha > A90) {
		const beta = PI - alpha;
		const dd = pageDiagonalLength - page.height / Math.sin(beta);
		mv.x = Math.round(dd * Math.cos(beta));
		mv.y = Math.round(dd * Math.sin(beta));
		if (left) mv.x = -mv.x;
		if (top) mv.y = -mv.y;
	}

	/**
	 * 中缝（订口边）与上边（从上翻）或下边（从下翻）（书顶或书底）未翻开的长度
	 */
	const px = Math.round(tr.y / Math.tan(alpha) + tr.x);

	/**
	 * 上边（从上翻）或下边（从下翻）（书顶或书底）翻开的长度
	 */
	const side = page.width - px;
	/**
	 * 翻开书页的书角顶点与上边（从上翻）或下边（从下翻）（书顶或书底）的距离
	 */
	const sideX = side * Math.cos(alpha * 2);
	/**
	 * 翻开书页的顶点与翻口的距离
	 */
	const sideY = side * Math.sin(alpha * 2);
	/**
	 * 翻开书页的书角顶点与中缝（订口边）和上边（从下翻）或下边（从上翻）（书顶或书底）的相对距离
	 */
	const df = point2D(
		Math.round((left ? side - sideX : px + sideX)),
		Math.round(top ? sideY : center ? 0 : page.height - sideY)
	);
	/**
	 * 翻开的斜边长度
	 */
	const gradientSize = side * Math.sin(alpha);
	/**
	 * 结束点（翻开书页的书角顶点最终的位置）
	 */
	const endingPoint = getEndingPoint(pageCorner, page);

	const far = Math.sqrt(Math.pow(endingPoint.x - point.x, 2) + (center ? 0 : Math.pow(endingPoint.y - point.y,
		2))) / page.width;
	/**
	 * 翻开书角的阴影透明度
	 */
	const shadowVal = Math.sin(A90 * ((far > 1) ? 2 - far : far));
	/**
	 * 翻开书角的斜边阴影透明度
	 */
	const gradientOpacity = Math.min(far, 1);
	/**
	 * 翻开书角的斜边阴影颜色初始透明度
	 */
	const gradientStartVal = gradientSize > 100 ? (gradientSize - 100) / gradientSize : 0;
	/**
	 * 
	 */
	const gradientEndPointA = point2D(
		gradientSize * Math.sin(alpha) / page.width * 100,
		gradientSize * Math.cos(alpha) / page.height * 100);

	if (center) gradientEndPointA.y = 100 - gradientEndPointA.y;
	/**
	 * 
	 */
	const gradientEndPointB = point2D(
		gradientSize * 1.2 * Math.sin(alpha) / page.width * 100,
		gradientSize * 1.2 * Math.cos(alpha) / page.height * 100);

	if (!left) gradientEndPointB.x = 100 - gradientEndPointB.x;
	if (!top) gradientEndPointB.y = 100 - gradientEndPointB.y;

	tr.x = Math.round(tr.x);
	tr.y = Math.round(tr.y);
	return {
		alpha: alpha,
		df: df,
		tr: tr,
		mv: mv,
		shadowVal: shadowVal,
		gradientOpacity: gradientOpacity,
		gradientStartVal: gradientStartVal,
		gradientEndPointA: gradientEndPointA,
		gradientEndPointB: gradientEndPointB
	}
}
/**
 * 转换样式
 * @param page 包含页面的长和宽：{ width: w, height: h }
 * @param a 角度
 * @param tr 
 * @param computeResult 计算结果
 * @param position 定位，数字数组：[left, top, right, bootom]，取值（0，1）0：0，1：auto
 * @param origin 变换原点，数字数组：[x, y]
 */
const transformStyle = (a, tr, computeResult, position, origin) => {
	const top = staticParam.pointVerticalPosition == 't';
	const center = staticParam.pointVerticalPosition == "c"
	const left = staticParam.mode != 'half' && staticParam.moveHorizontalPosition == 'l';
	const page = staticParam.page;
	const {
		df,
		mv,
		shadowVal,
		gradientOpacity,
		gradientStartVal,
		gradientEndPointA,
		gradientEndPointB
	} = computeResult;
	// 获取页面对角线长度
	const pageDiagonalLength = getPageDiagonalLength(page);
	// 定位选项
	const positionOpt = ['0', 'auto'];
	const mvW = (page.width - pageDiagonalLength) * origin[0] / 100;
	const mvH = (page.height - pageDiagonalLength) * origin[1] / 100;
	const positionStyle = {
		left: positionOpt[position[0]],
		top: positionOpt[position[1]],
		right: positionOpt[position[2]],
		bottom: positionOpt[position[3]]
	};
	const aliasingFk = (a != 90 && a != -90) ? 1 : 0;
	const transformOrigin = origin[0] + '% ' + origin[1] + '%';

	const style = {};

	// 页面正面外框样式
	style.wrapper = {
		transform: translate(-tr.x + mvW - aliasingFk, -tr.y + mvH) + rotate(-a),
		transformOrigin: transformOrigin,
	};
	// 页面正面内容框样式
	style.content = {
		...positionStyle,
		transform: rotate(a) + translate(tr.x + aliasingFk, tr.y),
		transformOrigin: transformOrigin,
	};
	// 页面背面外框样式
	style.bwrapper = {
		transform: translate(-tr.x + mv.x + mvW, -tr.y + mv.y + mvH) + rotate(-a),
		transformOrigin: transformOrigin,
	};
	// 页面背面内容框样式
	style.bcontent = {
		...positionStyle,
		transform: rotate(a) +
			translate(tr.x + df.x - mv.x - page.width * origin[0] / 100, tr.y + df.y - mv.y - page.height *
				origin[1] /
				100) +
			rotate((180 / a - 2) * a),
		transformOrigin: transformOrigin,
		boxShadow: '0 0 20px rgba(0,0,0,' + Math.max(0.3, 0.5 * shadowVal) + ')'
	};


	if (origin[0])
		gradientEndPointA.x = 100 - gradientEndPointA.x;

	if (origin[1])
		gradientEndPointA.y = 100 - gradientEndPointA.y;

	// 翻开斜边样式
	style.gradient = gradientStyle(page,
		point2D(left ? 0 : 100, top ? 0 : 100),
		point2D(gradientEndPointB.x, gradientEndPointB.y),
		[
			[0.6, 'rgba(0,0,0,0)'],
			[0.8, 'rgba(0,0,0,' + (0.3 * gradientOpacity) + ')'],
			[1, 'rgba(0,0,0,0)']
		],
		3);

	// 翻开背面斜边样式
	style.bgradient = gradientStyle(page,
		point2D(left ? 100 : 0, top ? 0 : 100),
		point2D(gradientEndPointA.x, gradientEndPointA.y),
		[
			[gradientStartVal, 'rgba(0,0,0,0)'],
			[((1 - gradientStartVal) * 0.8) + gradientStartVal, 'rgba(0,0,0,' + (0.2 * gradientOpacity) +
				')'
			],
			[1, 'rgba(255,255,255,' + (0.2 * gradientOpacity) + ')']
		],
		3);

	return style;
}

const gradientStyle = (page, p0, p1, colors, numColors) => {

	let j;
	const cols = [];

	// for (j = 0; j < numColors; j++) {
	// 	cols.push('color-stop(' + colors[j][0] + ', ' + colors[j][1] + ')');
	// }
	// return {
	// 	backgroundImage: '-webkit-gradient(linear, ' +
	// 		p0.x + '% ' +
	// 		p0.y + '%,' +
	// 		p1.x + '% ' +
	// 		p1.y + '%, ' +
	// 		cols.join(',') + ' )'
	// }
	p0 = {
		x: p0.x / 100 * page.width,
		y: p0.y / 100 * page.height
	};
	p1 = {
		x: p1.x / 100 * page.width,
		y: p1.y / 100 * page.height
	};

	const dx = p1.x - p0.x;
	const dy = p1.y - p0.y;
	const angle = Math.atan2(dy, dx);
	const angle2 = angle - Math.PI / 2;
	const diagonal = Math.abs(page.width * Math.sin(angle2)) + Math.abs(page.height * Math.cos(angle2));
	const gradientDiagonal = Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2));
	const corner = point2D((p1.x < p0.x) ? page.width : 0, (p1.y <= p0.y) ? page.height : 0);
	const slope = Math.tan(angle);
	const inverse = slope == 0 ? 0 : -1 / slope;
	const x = inverse - slope == 0 ? 0 : (inverse * corner.x - corner.y - slope * p0.x + p0.y) / (inverse - slope);
	const c = {
		x: x,
		y: inverse * x - inverse * corner.x + corner.y
	};
	const segA = (Math.sqrt(Math.pow(c.x - p0.x, 2) + Math.pow(c.y - p0.y, 2)));
	for (j = 0; j < numColors; j++) {
		cols.push(' ' + colors[j][1] + ' ' + ((segA + gradientDiagonal * colors[j][0]) * 100 / diagonal) + '%');
	}
	return {
		backgroundImage: 'linear-gradient(' + (Math.PI / 2 + angle) + 'rad,' + cols.join(',') + ')'
	}
}
/**
 * 将角度从弧度转换为度
 * @param radians
 */
const radians2degrees = (radians) => {
	return radians / PI * 180;
}
/**
 * 返回CSS旋转值
 */
const rotate = (degrees) => {
	return ' rotate(' + degrees + 'deg) ';
}
/**
 * 返回CSS变换值
 */
const translate = (x, y) => {
	return ' translate(' + x + 'px, ' + y + 'px) ';
}
/**
 * 获取页面角落坐标
 * @param corner 角落位置，'tl'、'tr'、'bl'、'br'、'l' 和 'r'，分别代表左上角、右上角、左下角、右下角、左边和右边。
 * @param page 包含页面的长和宽：{ width: w, height: h }
 * @param opts 偏移量
 */
const getPageCornersCoordinates = (corner, page, opts) => {
	opts = opts || 0;
	switch (corner) {
		case 'tl': // 左上角
			return point2D(opts, opts);
		case 'tr': // 右上角
			return point2D(page.width - opts, opts);
		case 'bl': // 左下角
			return point2D(opts, page.height - opts);
		case 'br': // 右下角
			return point2D(page.width - opts, page.height - opts);
		case 'l': // 左边
			return point2D(opts, 0);
		case 'r': // 右边
			return point2D(page.width - opts, 0);
	}
}

/**
 * 获取结束点（翻开书页的书角顶点最终的位置）
 * @param corner 角落位置，'tl'、'tr'、'bl'、'br'、'l' 和 'r'，分别代表左上角、右上角、左下角、右下角、左边和右边。
 * @param page 包含页面的长和宽：{ width: w, height: h }
 */
const getEndingPoint = (corner, page) => {

	switch (corner) {
		case 'tl':
			return point2D(page.width * 2, 0);
		case 'tr':
			return point2D(-page.width, 0);
		case 'bl':
			return point2D(page.width * 2, page.height);
		case 'br':
			return point2D(-page.width, page.height);
		case 'l':
			if (staticParam.mode == 'half') {
				return point2D(page.width, 0);
			} else {
				return point2D(page.width * 2, 0);
			}
		case 'r':
			return point2D(-page.width, 0);
	}

}

const requestAnimation = (callback) => {
	let windowRequestAnimationFrame;
	if (window) {
		windowRequestAnimationFrame = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame;
	}
	if (windowRequestAnimationFrame) {
		windowRequestAnimationFrame(callback);
	} else {
		setTimeout(callback, 1000 / 60);
	}
}

/**
 * 创建动画
 */
const createAnimation = (param) => {
	if (param) {
		// 动画开始时间
		const startTime = new Date().getTime();
		param.duration = param.duration || 0;
		param.count = 0;
		animationFun(startTime, param);
	}
}

const animationFun = (startTime, param) => {
	// 动画已执行时间
	let timeDiff = Math.min(param.duration, (new Date()).getTime() - startTime);
	// 变化值
	const transformValues = [];
	if (param.from && param.to) {
		if (!param.from.length) param.from = [param.from];
		if (!param.to.length) param.to = [param.to];
		// 最小变换参数长度
		const valueLength = Math.min(param.from.length, param.to.length);
		// 计算当前执行的参数值
		for (let i = 0; i < valueLength; i++) {
			transformValues.push(easing(timeDiff, param.from[i], param.to[i], param.duration));
		}
	}
	if (param.frame) param.frame((transformValues.length == 1) ? transformValues[0] : transformValues);
	// 判断动画是否结束
	if (timeDiff == param.duration) {
		if (param.complete) param.complete();
	} else {
		requestAnimation(() => {
			animationFun(startTime, param);
		});
	}
}

const easing = (timeDiff, from, to, duration) => {
	const t = timeDiff / duration - 1;
	return (to - from) * Math.sqrt(1 - Math.pow(t, 2)) + from;
}