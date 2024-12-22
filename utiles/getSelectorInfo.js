const getSelectorInfo = (instance, selector) => {
	return new Promise((resolve, reject) => {
		const query = uni.createSelectorQuery().in(instance.proxy);
		query
			.select(selector)
			.boundingClientRect((data) => {
				resolve(data)
			})
			.exec();
	})
}
export default getSelectorInfo