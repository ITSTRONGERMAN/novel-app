/**
 * 打开数据库
 */
const openDb = (name) => {
	//如果数据库存在则打开，不存在则创建。
	return new Promise((resolve, reject) => {
		plus.sqlite.openDatabase({
			name: name, //数据库名称
			path: `_doc/${name}.db`, //数据库地址
			success(e) {
				console.info("11", e)
				resolve(e);
			},
			fail(e) {
				console.info("22", e)
				reject(e);
			}
		})
	})
}

const init = (name, tableSqls) => {
		console.info("数据库："+name)
	for (let i = 0; i < tableSqls.length; i++) {
		let data = tableSqls[i];
		//习惯表，用来记录要养成的习惯
		isTable(name, data.tableName).then(res => {
			console.info("表已存在res："+res)
			console.info("表已存在："+data.tableName)
			if(!res){
				console.info("初始化表：",data.tableName)
				addTab(name, data.sql);
			}
		}).catch(e => {
			console.info("初始化表：",data.tableName)
			addTab(name, data.sql);
		})
	}

}

/**
 * 查询所有数据表名
 * @param {Object} name数据库名称
 */
const getTable = (name) => {
	return new Promise((resolve, reject) => {
		plus.sqlite.selectSql({
			name: name,
			sql: "select * FROM sqlite_master where type='table'",
			success(e) {
				console.log("getTable", e)
				resolve(e);
			},
			fail(e) {
				console.log(e)
				reject(e);
			}
		})
	})
}
// 查询表数据总条数
const getCount = (name, tabName) => {
	return new Promise((resolve, reject) => {
		plus.sqlite.selectSql({
			name: name,
			sql: "select count(*) as num from " + tabName,
			success(e) {
				resolve(e);
			},
			fail(e) {
				reject(e);
			}
		})
	})
}

// 查询表是否存在
const isTable = (name, tabName) => {
	console.info("name  tabName  ", name, tabName)
	return new Promise((resolve, reject) => {
		plus.sqlite.selectSql({
			name: name,
			sql: `select count(*) as isTable FROM sqlite_master where type='table' and name='${tabName}'`,
			success(e) {
				resolve(e[0].isTable ? true : false);
			},
			fail(e) {
				console.log(e)
				reject(e);
			}
		})
	})
}
// 修改数据,(库名,表名,要更新的数据,条件字段 如id,条件 值)
const updateSQL = (name, tabName, setData, setName, setVal) => {
	if (JSON.stringify(setData) !== '{}') {
		let dataKeys = Object.keys(setData)
		let setStr = ''
		dataKeys.forEach((item, index) => {
			console.log(setData[item])
			setStr += (
				`${item} = ${JSON.stringify(setData[item])}${dataKeys.length - 1 !== index ? "," : ""}`)
		})
		return new Promise((resolve, reject) => {
			plus.sqlite.executeSql({
				name: name,
				sql: `update ${tabName} set ${setStr} where ${setName} = "${setVal}"`,
				success(e) {
					resolve(e);
				},
				fail(e) {
					console.log(e)
					reject(e);
				}
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			reject("错误")
		});
	}
}

//删除数据库数据（库名，表名，条件对象）
const delData = (name, tabName, setData) => {
	if (JSON.stringify(setData) !== '{}') {
		let dataKeys = Object.keys(setData)
		let setStr = ''
		dataKeys.forEach((item, index) => {
			console.log(setData[item])
			setStr += (
				`${item}=${JSON.stringify(setData[item])}${dataKeys.length - 1 !== index ? " and " : ""}`
			)
		})
		return new Promise((resolve, reject) => {
			console.info(`delete from ${tabName} where ${setStr}`)
			plus.sqlite.executeSql({
				name: name,
				sql: `delete from ${tabName} where ${setStr}`,
				success(e) {
					resolve(e);
				},
				fail(e) {
					reject(e);
				}
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			reject("错误")
		});
	}
}

//关闭数据库
const closeSQL = (name) => {
	return new Promise((resolve, reject) => {
		plus.sqlite.closeDatabase({
			name: 'pop',
			success(e) {
				resolve(e);
			},
			fail(e) {
				reject(e);
			}
		})
	})
}

//监听数据库是否开启
const isOpen = (name) => {
	let open = plus.sqlite.isOpenDatabase({
		name: name,
		path: `_doc/${name}.db`,
	})
	return open;
}
/**
 * 删除表
 */
const delTable = (name, tabName) => {
	return new Promise((resolve, reject) => {
		plus.sqlite.executeSql({
			name: name,
			sql: `DROP TABLE ${tabName}`,
			success(e) {
				resolve(e);
			},
			fail(e) {
				console.log(e)
				reject(e);
			}
		})
	})
}
// 创建表
const addTab = (name, sql) => {
	// tabName不能用数字作为表格名的开头
	return new Promise((resolve, reject) => {
		plus.sqlite.executeSql({
			name: name,
			// sql: 'create table if not exists dataList("list" INTEGER PRIMARY KEY AUTOINCREMENT,"id" TEXT,"name" TEXT,"gender" TEXT,"avatar" TEXT)',
			// sql: `create table if not exists ${tabName}("chat_i" INTEGER PRIMARY KEY AUTOINCREMENT,"local_id" TEXT NOT NULL UNIQUE,"id" TEXT,"chat_friend_id" TEXT,"content" INTEGER)`,
			sql: sql,
			success(e) {
				resolve(e);
			},
			fail(e) {
				console.log(e)
				reject(e);
			}
		})
	})
}
/**
 * 添加数据
 * name:数据库名
 * tabname:表名
 * obj:存储对象
 */
const addTabItem = (name, tabName, obj) => {
	if (obj) {
		let keys = Object.keys(obj)
		let keyStr = keys.toString()
		let valStr = ''
		keys.forEach((item, index) => {
			if (keys.length - 1 == index) {
				valStr += ('"' + obj[item] + '"')
			} else {
				valStr += ('"' + obj[item] + '",')
			}
		})
		console.log(valStr)
		let sqlStr = `insert into ${tabName}(${keyStr}) values(${valStr})`
		console.log(sqlStr)
		return new Promise((resolve, reject) => {
			plus.sqlite.executeSql({
				name: name,
				sql: sqlStr,
				success(e) {
					resolve(e);
				},
				fail(e) {
					console.log(e)
					reject(e);
				}
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			reject("错误")
		})
	}
}
// 合并数据
const mergeSql = (name, tabName, tabs) => {
	if (!tabs || tabs.length == 0) {
		return new Promise((resolve, reject) => {
			reject("错误")
		})
	}
	let itemValStr = ''
	tabs.forEach((item, index) => {
		let itemKey = Object.keys(item)
		let itemVal = ''
		itemKey.forEach((key, i) => {
			if (itemKey.length - 1 == i) {
				if (typeof item[key] == 'object') {
					itemVal += (`'${JSON.stringify(item[key])}'`)
				} else {
					itemVal += (`'${item[key]}'`)
				}
			} else {
				if (typeof item[key] == 'object') {
					itemVal += (`'${JSON.stringify(item[key])}',`)
				} else {
					itemVal += (`'${item[key]}',`)
				}
			}
		})
		if (tabs.length - 1 == index) {
			itemValStr += ('(' + itemVal + ')')
		} else {
			itemValStr += ('(' + itemVal + '),')
		}
	})
	let keys = Object.keys(tabs[0])
	let keyStr = keys.toString()
	return new Promise((resolve, reject) => {
		plus.sqlite.executeSql({
			name: name,
			sql: `insert or ignore into ${tabName} (${keyStr}) values ${itemValStr}`,
			success(e) {
				resolve(e);
			},
			fail(e) {
				console.log(e)
				reject(e);
			}
		})
	})
}
// 获取分页数据库数据（库名，表名，第几页，每页条数，排序字段，排序类型）
const getDataList = async (name, tabName, num, size, byName, byType) => {
	let count = 0
	let sql = ''
	let numindex = 0
	await getCount(name, tabName).then((resNum) => {
		count = Math.ceil(resNum[0].num / size)
	})
	if (((num - 1) * size) == 0) {
		numindex = 0
	} else {
		numindex = ((num - 1) * size) + 1
	}
	sql = `select * from ${tabName}`
	if (byName && byType) {
		// desc asc
		sql += ` order by ${byName} ${byType}`
	}
	sql += ` limit ${numindex},${size}`
	if (count < num - 1) {
		return new Promise((resolve, reject) => {
			reject("无数据")
		});
	} else {
		return new Promise((resolve, reject) => {
			plus.sqlite.selectSql({
				name: name,
				// sql: "select * from userInfo limit 3 offset 3",
				sql: sql,
				success(e) {
					resolve(e);
				},
				fail(e) {
					reject(e);
				}
			})
		})
	}
}
//查询数据库数据（库名，表名，条件，排序字段，排序类型）
const selectDataList = (name, tabName, setData, byName, byType) => {
	let setStr = '';
	let sql = '';
	if (JSON.stringify(setData) !== '{}') {
		let dataKeys = Object.keys(setData)
		dataKeys.forEach((item, index) => {
			console.log(setData[item])
			setStr += (
				`${item}=${JSON.stringify(setData[item])}${dataKeys.length - 1 !== index ? " and " : ""}`
			)
		})
		sql = `select * from ${tabName} where ${setStr}`
	} else {
		sql = `select * from ${tabName}`
	}
	if (byName && byType) {
		// desc asc
		sql += ` order by ${byName} ${byType}`
	}
	if (tabName !== undefined) {
		return new Promise((resolve, reject) => {
			plus.sqlite.selectSql({
				name: name,
				sql: sql,
				success(e) {
					resolve(e);
				},
				fail(e) {
					console.log(e)
					reject(e);
				}
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			reject("错误")
		});
	}
}
//查询数据库数据（库名，表名，条件，排序字段，排序类型）
const selectCount = (name, tabName, setData) => {
	let setStr = ''
	let sql = ''
	if (JSON.stringify(setData) !== '{}') {
		let dataKeys = Object.keys(setData)
		dataKeys.forEach((item, index) => {
			console.log(setData[item])
			setStr += (
				`${item}=${JSON.stringify(setData[item])}${dataKeys.length - 1 !== index ? " and " : ""}`
			)
		})
		sql = `SELECT COUNT(*) AS count FROM ${tabName} where ${setStr}`
	} else {
		sql = `SELECT COUNT(*) AS count FROM ${tabName}`
	}

	if (tabName !== undefined) {
		return new Promise((resolve, reject) => {
			plus.sqlite.selectSql({
				name: name,
				sql: sql,
				success(e) {
					resolve(e);
				},
				fail(e) {
					console.log(e)
					reject(e);
				}
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			reject("错误")
		});
	}
}

export default {
	openDb, //打开数据库
	init, //初始化数据库
	getTable, //获取所有的表信息
	getCount, //查询表数据总条数
	isTable, //表是否存在
	updateSQL, //修改数据
	delData, //删除数据库数据
	closeSQL, //关闭数据库
	isOpen, //监听数据库是否开启
	delTable, //删除表
	addTab, //创建表
	addTabItem, //添加数据
	mergeSql, //合并数据
	getDataList, //获取分页数据库数据
	selectDataList, //查询数据库数据
	selectCount, //查询数据条数
}