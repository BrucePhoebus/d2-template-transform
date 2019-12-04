<template>
	<d2-container class="page">
		<div class="title">
			<div class="content">
				d2模板改造
			</div>
		</div>
	</d2-container>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				filename: __filename
			}
		}
	}
</script>

<style lang="scss" type="text/scss" scoped>
	.page {

		.title {
			font-size: 48px;
			text-align: center;

			.content {
				margin-top: 250px;
			}
		}
	}
</style>
