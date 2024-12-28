const BASEURL = "http://192.168.0.100"
const server = (
	url,
	method = "get",
	data = {},
) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASEURL + url,
			method,
			data,
			timeout: 5000,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
				throw new Error('网络请求失败：' + err.message);
			}
		})
	})
}
export default server