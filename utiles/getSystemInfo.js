const getSystemInfo = () => {
	return new Promise((resolve, reject) => {
		uni.getSystemInfo({
			success(res) {
				resolve(res)
			}
		});
	})
}
export default getSystemInfo