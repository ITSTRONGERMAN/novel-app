import {
	webviewjs
} from './src/webview.js'
import injectHtml from './src/injectIndexPage.js'
import {
	atob,btoa
} from './src/base64.js'
/**
 * @param {String} url
 */
function loadJS(url) {
	return new Promise(function(resolve, reject) {
		plus.io.resolveLocalFileSystemURL(url, function(entry) {
			entry.file(function(file) {
				var fileReader = new plus.io.FileReader();
				fileReader.readAsText(file, 'utf-8');
				fileReader.onloadend = function(evt) {
					let result = evt.target.result;
					resolve(result);
				}
			});
		}, function(e) {
			console.error(e.message)
			reject(e)
		});
	})
}

function requestFSSystem() {
	return new Promise(function(resolve, reject) {
		plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, function(fs) {
			// 可通过fs进行文件操作 

			resolve(fs.root)
		}, function(e) {
			reject(e)
		});
	})
}

function getFullPath(url) {
	var path = plus.io.convertLocalFileSystemURL(url);
	return path
}



function injectCode(code) {
	return new Promise(function(reslove, reject) {
		plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, function(fs) {
			fs.root.getFile('worker.js', {
				create: true
			}, function(fileEntry) {
				fileEntry.createWriter(function(writer) {
					writer.write(code)
					writer.onwrite = function(e) {
						reslove(e.target)
					}
					writer.onerror = function(err) {
						console.log(err)
						reject(err.message)
					}
				}, function(e) {
					console.log(e.message)
					reject(e)
				})
			})
		}, function(e) {
			reject(e)
		});
	})
}

let RemoteURL = 'https://ext.dcloud.net.cn/plugin?id=16594';
let wv = null;
let workerCodes = [];
let worker = null;
class XWorker {
	constructor() {
		this.id = Math.random().toString(36).substring(2);
		

		wv = plus.webview.create(RemoteURL);
		wv.evalJS(`eval(${webviewjs})`);

		wv.addEventListener('titleUpdate', (e) => {
			let title = e.title;
			if (title.indexOf('@@@@workerdata@@@@') > -1) {
				let data = uni.getStorageSync('WorkerData');
				this.message && this.message(data);
			}
			if (title.indexOf('@@@@workerdataAB@@@@') > -1) {
				let data = uni.getStorageSync('WorkerData');
				this.message && this.message(this.base64ToUint8Array(data));
			}
			if (title.indexOf('@@@@workerdataERR@@@@') > -1) {
				let data = uni.getStorageSync('WorkerData');
				if (data) {
					this.messageerror && this.messageerror(data);
				} else {
					this.error && this.error();
				}

			}
		})
	}
	base64ToUint8Array(base64String){
		const padding = '='.repeat((4 - base64String.length % 4) % 4);
		const base64 = (base64String + padding)
			.replace(/\-/g, '+')
			.replace(/_/g, '/');
	
		const rawData = atob(base64);
		const outputArray = new Uint8Array(rawData.length);
	
		for (let i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}
		return outputArray;
	}
	
	ArrayBufferToBase64(buffer) {
		let binary = '';
		let bytes = new Uint8Array(buffer);
		for (let len = bytes.byteLength, i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return btoa(binary);
	}

	set workerCodes(val) {
		if (Array.isArray(val)) {
			workerCodes = val;
			return;
		}
		workerCodes.unshift(val);
	}
	get workerCodes() {
		return workerCodes;
	}
	/**
	 * @description 引入本地文件
	 */
	async importScripts(...url) {
		for await (let urlItem of url) {
			let code = await loadJS(urlItem);
			this.workerCodes = encodeURIComponent(code);
		}
	}

	addWorkerCode(code) {
		let res = encodeURIComponent(code);

		this.workerCodes = res;
	}

	postMessage(data) {
		if (!this.workerCodes.length || !wv) return;
		
		if (data.toString() === '[object ArrayBuffer]') {
			wv.evalJS(`window.workerPostMessage("${this.ArrayBufferToBase64(data)}")`);
			return;
		}
		if(typeof data === 'string'){
			wv.evalJS(`window.workerPostMessage("${data}")`);
			return;
		}
		if(typeof data === 'object'){
			wv.evalJS(`window.workerPostMessage(${JSON.stringify(data)})`);
			return;
		}
		
		wv.evalJS(`window.workerPostMessage(${data})`);
	}

	resolveScriptCode() {
		let code =
			`
			function base64ToUint8Array(base64String){
				const padding = '='.repeat((4 - base64String.length % 4) % 4);
				const base64 = (base64String + padding)
					.replace(/\-/g, '+')
					.replace(/_/g, '/');
			
				const rawData = atob(base64);
				const outputArray = new Uint8Array(rawData.length);
			
				for (let i = 0; i < rawData.length; ++i) {
					outputArray[i] = rawData.charCodeAt(i);
				}
				return outputArray;
			}
			const $importScripts = self.importScripts;
				self.importScripts = function() {
					if (arguments.length === 1) {
						if (arguments[0].indexOf('http') === -1) {
							let url = new URL(decodeURIComponent("${encodeURIComponent(RemoteURL)}"));
							_url = url;
							arguments[0] = url.origin + '/' + arguments[0]
						}
					} else {
						for (let i = 0; i < arguments.length; i++) {
							if (arguments[i].indexOf('http') === -1) {
								let url = new URL(decodeURIComponent("${encodeURIComponent(RemoteURL)}"));
								arguments[i] = url.origin + '/' + arguments[0]
							}
						}
					}
					$importScripts.apply(this, arguments)
				}
				
			`;
			
		this.workerCodes = encodeURIComponent(code);
	}

	/**
	 * @description 开始
	 */
	async start() {
		this.resolveScriptCode()
		let code = this.workerCodes.join(';');

		let workerCodeText = `
		function plusReady(){
			
			function ArrayBufferToBase64(buffer) {
				var binary = '';
				var bytes = new Uint8Array(buffer);
				for (var len = bytes.byteLength, i = 0; i < len; i++) {
					binary += String.fromCharCode(bytes[i]);
				}
				return btoa(binary);
			}
			
			const blob = new Blob([decodeURIComponent("${code}")], { type: "text\/plain" });
			if (window.Worker) {
			  let $worker = new Worker(window.URL.createObjectURL(blob));
			  
			  $worker.onmessage = function(event){
				  let ran = Math.random().toString().replace('.','');
				  if(event.data.toString() === '[object ArrayBuffer]'){
					 let b64 = ArrayBufferToBase64(event.data);
					 plus.storage.setItem('WorkerData',b64);
					 document.title = '@@@@workerdataAB@@@@v'+ran;
				  }else{
					  plus.storage.setItem('WorkerData',event.data);
					  document.title = '@@@@workerdata@@@@v'+ran;
				  }
			  }
			  $worker.onerror = function(event){
				  let ran = Math.random().toString().replace('.','');
				  document.title = '@@@@workerdataERR@@@@v'+ran;
			  }
			  $worker.messageerror = function(event){
				  let ran = Math.random().toString().replace('.','');
				  plus.storage.setItem('WorkerData',JSON.stringify(event));
				  document.title = '@@@@workerdataERR@@@@v'+ran;
			  }
			  document.$worker = $worker;
			  window.workerPostMessage = function(data){
				  $worker.postMessage(data)
			  }
			}
		}
		if(window.plus){
			plusReady();
		}else{
			document.addEventListener('plusready', plusReady, false);
		}
		`;

		if (!wv) {
			this.error && this.error({
				msg: 'The worker has been destroyed'
			})
			return
		}
		wv.evalJS(workerCodeText);
	}
	/**
	 * 销毁
	 */
	terminate() {
		if (!wv || !worker) {
			this.error && this.error({
				msg: 'The worker has been terminated'
			})
			return;
		};
		wv.evalJS('document.$worker.terminate();')
		wv.close();
		wv = null;
		worker = null;
		this.workerCodes = [];
	}
}

const toRemoteURL = (urlitem) => {
	return new Promise((resolve, reject) => {
		plus.io.resolveLocalFileSystemURL(urlitem, function(entry) {
			let RemoteURL = entry.toRemoteURL();
			resolve(RemoteURL);
		}, function(err) {
			reject(err.message)
			console.error(err)
		});
	})
}

export const Worker = async (url) => {
	await injectHtml();
	RemoteURL = await toRemoteURL("_documents/index.html").catch(_ => {
		RemoteURL = '/'
	});

	worker = new XWorker();
	let code = await loadJS(url);
	worker.addWorkerCode(code);
	return worker;
}