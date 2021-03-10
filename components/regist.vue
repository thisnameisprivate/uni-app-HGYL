<template>
	<view>
		<el-form :model="loginFrom" :rules="rules">
			<el-form-item prop="username">
				<el-input prefix-icon="el-icon-user" type="text" v-model="loginFrom.username" placeholder="请输入用户名"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input prefix-icon="el-icon-unlock" type="text" v-model="loginFrom.password" placeholder="请输入密码" show-password></el-input>
			</el-form-item>
			<el-form-item prop="passcheck">
				<el-input prefix-icon="el-icon-unlock" type="password" v-model="loginFrom.passcheck" placeholder="请重复密码"></el-input>
			</el-form-item>
		<el-button @click="regist" v-loading.fullscreen.lock="fullscreenLoading" class="login-click" type="warning">注册</el-button>
		</el-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginFrom: {
					username: '',
					password: '',
					passcheck: '',
				},
				// input框验证
				rules: {
					username:[
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 6, max: 11, message: '长度在6-11个字符', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '密码不能为空', trigger: 'blur' },
						{ min:6, message: '密码不能小于6位', trigger:'blur' },
						{ max:18, message: '密码不能大于18位', trigger:'blur' }
					],
					passcheck: [
						{required:true, message: '请重复输入密码', trigger:'blur'},
					],
				},
				// 用户token信息
				userinfo: '',
				// 按钮点击加载状态
				fullscreenLoading: false,
			};
		},
		methods: {
			blur: function () {
				console.log("用户名失去焦点");
			},
			regist: function () {
				let _this = this;
				if (this.loginFrom.username == '' || this.loginFrom.password == '') {
					console.log("账号或密码不能为空");
					return;
				} else if (this.loginFrom.passcheck == '' || this.loginFrom.passcheck != this.loginFrom.password) {
					console.log("两次密码必须相同");
					return;
				} else {
					this.axios({
						url: 'http://localhost/uni-app/index/login/regist',
						method: 'post',
						data: _this.loginFrom
					})
					.then(response => {
						if (response.data.msg == 'success') {
							console.log("注册成功");
						} else if (response.data.msg == 'error') {
							console.log("注册失败");
						}
					})
					.catch(error => console.log(error));
				}
			}
		}
	}
</script>

<style>
	.login-click {
		width:100%;
	}
	/* 账号注册链接 */
	.login-register-font {
		width:100%;
		text-align:center;
	}
</style>
