const indexHtml = `<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
</body>
</html>`



export default async function() {
	return new Promise(function(reslove, reject) {
		plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, function(fs) {
			fs.root.getFile('index.html', {
				create: true
			}, function(fileEntry) {
				fileEntry.createWriter(function(writer) {
					writer.write(indexHtml)
					writer.onwrite = function(e){
						reslove(e.target)
					}
					writer.onerror = function(err){
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