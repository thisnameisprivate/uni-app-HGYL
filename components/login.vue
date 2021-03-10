<template>
	<view>
		<el-form :model="loginFrom" :rules="rules">
			<el-form-item prop="username">
				<el-input prefix-icon="el-icon-user" type="text" v-model="loginFrom.username" placeholder="请输入用户名"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input prefix-icon="el-icon-unlock" type="text" v-model="loginFrom.password" placeholder="请输入密码" show-password></el-input>
			</el-form-item>
			<el-button @click="login" v-loading.fullscreen.lock="fullscreenLoading" class="login-click" type="primary">登录</el-button>
		</el-form>
		<view class="login-register-font">
			<el-link type="warning" @click="handleLoginregist">还没有注册账号？点击注册{{ gotoregist }}</el-link>
		</view>
	</view>
</template>

<script>
	export default {
		props:['gotoregist'],
		data () {
			return {
				loginFrom: {
					username: '',
					password: ''
				},
				// 用户token信息
				userinfo: '',
				// 按钮点击加载状态
				fullscreenLoading: false,
				// input框验证
				rules: {
					username: [
						{ required:true, message: '用户名不能为空', trigger: 'blur' },
					],
					password: [
						{ required:true, message: '密码不能为空', trigger: 'blur' }
					],
				},
			};
		},
		methods: {
			// 登录
			login: function () {
				let _this = this;
				if (this.loginFrom.username == '' || this.loginFrom.password == '') {
					console.log("账号或密码不能为空");
					return;
				} else {
					this.fullscreenLoading = true;
					this.axios ({
						method: 'post',
						url:'http://localhost/uniapp-php/public/index/login/index',
						data: _this.loginFrom
					})
					.then(response => {
						// 验证登录成功提取token并储存到localStorage
						if (response.data.msg == 'success') {
							_this.userinfo = response.data.token;
							localStorage.setItem('token', _this.userinfo);
							console.log("登录成功");
							_this.fullscreenLoading = false;
						} else if (response.data.msg == 'error') {
							_this.fullscreenLoading = false;
							console.log("登录失败，账号或密码错误");
						}
					})
					.catch(error => console.log(error));
				}
			},
			// 点击注册链接
			handleLoginregist: function () {
				this.$emit('selectActive', 'regist-template')
				console.log(this.$props)
			}
		}
	}
</script>

<style>
	/* 首页登录样式 */
	.login-click {
		width:100%;
	}
	/* 账号注册链接 */
	.login-register-font {
		width:100%;
		text-align:center;
	}
</style>
