<template>
	<blog-smart-refresh @onRefreshListener="onRefresh">
		<template v-slot:header>
			加载中。。。
		</template>
		123123123123
	</blog-smart-refresh>12
</template>

<script setup>
	const onRefresh = () => {
		console.log(2123);
	}
</script>

<style lang="scss">

</style>