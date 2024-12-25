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
			// await this.executeSql('DROP TABLE IF EXISTS history;')
			// console.log(await this.select("SELECT * from history"));
			// await this.executeSql("DELETE FROM history;")
			// await this.select("SELECT datetime('now', '+8 hours');")
			// const fileds = await this.select("PRAGMA table_info(history);")
			// console.log(fileds.map(item => item.name));
			await this.createChaptersTable();
			await this.createHistoryTable();
			await this.createBookShellTable()
		} catch (error) {
			console.error('数据库初始化失败:', error.message);
		}
	}
	// 插入章节
	async insertChapter(params) {
		if (!params || params.length !== 3) {
			console.error('参数无效');
			return;
		}
		const [chapter_name, novel_id, chapter_n] = params
		return new Promise((resolve, reject) => {
			plus.sqlite.executeSql({
				name: this.name,
				sql: `INSERT INTO chapters (chapter_name, novel_id, chapter_n) VALUES ("${chapter_name}", ${novel_id}, ${chapter_n})`,
				success(result) {
					console.log("插入成功");
					resolve()
				},
				fail(error) {
					console.error("插入失败:" + error.message);
					reject()
				}
			});
		})
	}
	async openDatabase() {
		try {
			await plus.sqlite.openDatabase({
				name: this.name,
				path: this.path,
			});
			console.log("数据库打开成功");
		} catch (error) {
			console.error("数据库打开失败:", error.message);
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
					chapter_n INTEGER NOT NULL);`,
			});
			console.log('章节表创建成功或已存在');
		} catch (error) {
			console.error("创建章节表失败:", error.message);
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
				`,
			});
			console.log('历史记录表创建成功或已存在');
		} catch (error) {
			console.error("创建历史记录表失败:", error.message);
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
		 `)
		return res
	}
	// 书架中添加书
	insterBookShell({
		novel_id,
		name,
		author,
		intro,
		cover,
		genre,
		status,
		words_count,
		type = "novel"
	}) {
		return new Promise((resolve, reject) => {
			plus.sqlite.executeSql({
				name: this.name,
				sql: `INSERT INTO bookshell (novel_id, name, author, intro, cover, genre, status, words_count,type) 
			          VALUES (${novel_id}, '${name}', '${author}', '${intro}', '${cover}', '${genre}', '${status}', '${words_count}','${type}')`,
				success(result) {
					console.log(`《${name}》添加到书架成功`);
					resolve();
				},
				fail(error) {
					console.error(`《${name}》添加到书架失败`);
					console.log(error);
					reject();
				}
			});
		})
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
			name,
			cover,
			status,
			words_count,
			author,
			genre
		} = params
		return new Promise((resolve, reject) => {
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
			'${chapter_name}','${type}','${name}',
			'${cover}','${status}','${words_count}',
			 '${author}','${genre}','${intro}')`,
				success(result) {
					console.log("插入历史成功");
					resolve()
				},
				fail(error) {
					console.error("插入历史失败:" + error.message);
					reject()
				}
			});
		})
	}
	// 数据库是否打开
	isDatabaseOpen() {
		return plus.sqlite.isOpenDatabase({
			name: this.name,
			path: this.path,
		});
	}
	// 查找数据
	async select(sql) {
		return new Promise((resolve, reject) => {
			plus.sqlite.selectSql({
				name: this.name,
				sql: sql,
				success(result) {
					resolve(result)
				},
				fail(err) {
					console.log("查询失败:" + err.message);
					reject()
				}
			});

		})
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
            `,
			});
			console.log('书架表创建成功或已存在');
		} catch (error) {
			console.error("创建书架表失败:", error.message);
		}
	}
	//  执行sql语句
	executeSql(sql) {
		return new Promise((resolve, rejecy) => {
			plus.sqlite.executeSql({
				name: this.name,
				sql: sql,
				success(res) {
					resolve(res)
				},
				fail(err) {
					console.error(err.message);
					reject()
				}
			});
		})
	}
	// 关闭数据库
	async closeDatabase() {
		try {
			await plus.sqlite.closeDatabase({
				name: this.name,
				path: this.path,
			});
			console.log('数据库关闭成功！');
		} catch (error) {
			console.error('数据库关闭失败:', error.message);
		}
	}
}

export default DB;