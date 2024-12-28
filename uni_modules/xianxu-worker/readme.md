# xianxu-worker

## 介绍
本项目通过webview实现的多线程，所以目前只支持在app中使用

## 快速入门

引入文件
```
import {Worker} from '@/uni_modules/xianxu-worker/js_sdk/index.js'
```

导入要在线程中执行的文件
```
Worker('_www/static/test.js')
```

import本地文件
```
importScripts('_www/static/test2.js');
```

或者通过```worker.importScripts()```方法导入
```
this.worker = await Worker('_www/static/test.js')

this.worker.importScripts('_www/static/test2.js')

```

注意：```importScripts```直接导入本地文件时需要带上```_www```,_www对应的是app的根目录，安卓9.0在文件内无法执行importScripts导入的本地文件，需要外部调用```this.worker.importScripts('_www/static/test2.js')```导入本地文件

由于模拟器限制，使用```importScripts```导入内部文件只有真机运行有效

启动线程,通过```worker.start()```启动
```
this.worker = await Worker('_www/static/test.js');
this.worker.start();
```

发送消息到线程中```worker.postMessage(123)```

```
this.worker = await Worker('_www/static/test.js')
this.worker.postMessage(123)
```

接收线程消息
```
worker.message = (e)=>{
		console.log(e)
	}
```


线程执行发生错误时

```
this.worker = await Worker('_www/static/test.js');
// 线程发生错误消息
this.worker.messageerror = (evet)=>{
	console.error(evet)
}
```

插件运行发生错误
```
this.worker = await Worker('_www/static/test.js');
// 发生错误
this.worker.error = (event)=>{
	console.error(event)
}

```

销毁线程```worker.terminate()```,使用完成后记得调用销毁，否则容易导致内存泄露