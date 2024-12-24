<template>
	<l-empty v-if="searchResultList[page.name].list.length==0" description="没有找到相关内容" />
</template>

<script>
	export default {
		name: "loadError",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">

</style>