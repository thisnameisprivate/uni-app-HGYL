<template>
	<view>
		<el-tabs v-model="activeTabbar" type="card">
			<el-tab-pane label="登录" name="login-template" :gotoregist="activeTabbar" v-on:selectActive="select($event)"></el-tab-pane>
			<el-tab-pane label="新商家入驻" name="regist-template"></el-tab-pane>
		</el-tabs>
		<view :is="activeTabbar" keep-alive></view>
	</view>
</template>
<script>
	import login from '../../components/login.vue'
	export default {
		data () {
			return {
				activeTabbar: 'login-template',
			}
		},
		components: {
			'login-template': login,
			// 懒加载
			'regist-template': resolve => {
				require(['../../components/regist.vue'], resolve)
			},
		},
		methods: {
			select: function (msg) {
				console.log(msg);
				this.activeTabbar = 'regist-template'
				console.log(this.activeTabbar)
			}
		}
	}
</script>

<style>
	
</style>
