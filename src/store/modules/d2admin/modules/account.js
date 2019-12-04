import { Message, MessageBox } from 'element-ui'
import util from '@/libs/util.js'
import router from '@/router'
import { accountLogin, tokenLogin } from '@/api/sys.login'

export default {
	namespaced: true,
	actions: {
		/**
		 * @description 登录
		 * @param {Object} context
		 * @param {Object} payload username {String} 用户账号
		 * @param {Object} payload password {String} 密码
		 * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
		 */
		login ({ dispatch }, {
			loginKey = '',
			password = ''
		} = {}) {
			return new Promise((resolve, reject) => {
				// 开始请求登录接口
				accountLogin({
					loginKey,
					password
				})
					.then(async res => {
						const data = res.data;
						console.log(data);

						const group = data.groups[0] ? data.groups[0].group : '';

						// 设置 vuex 用户信息
						await dispatch('d2admin/user/setUserInfo', {
							name: data.userName,
							group: group
						}, { root: true });

						// 设置用户权限数据
						await dispatch('d2admin/user/setPermissions', data.authorities, { root: true });

						// 用户登录后从持久化数据加载一系列的设置
						await dispatch('load');

						resolve();
					})
					.catch(err => {
						console.log('err: ', err)
						reject(err)
					})
			})
		},
		/**
		 * @description 带token登录
		 * @param {Object} context
		 * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
		 */
		tokenLogin ({ dispatch }, tokenObj = {}) {
			return new Promise((resolve, reject) => {
				// 开始请求token登录接口
				tokenLogin(tokenObj)
					.then(async res => {
						const data = res.data;
						console.log(data);

						const group = data.groups[0] ? data.groups[0].group : '';

						// 设置 vuex 用户信息
						await dispatch('d2admin/user/setUserInfo', {
							name: data.userName,
							group: group
						}, { root: true });

						// 设置用户权限数据
						await dispatch('d2admin/user/setPermissions', data.authorities, { root: true });

						// 用户登录后从持久化数据加载一系列的设置
						await dispatch('load');

						resolve();
					})
					.catch(err => {
						console.log('err: ', err)
						reject(err)
					})
			})
		},
		/**
		 * @description 注销用户并返回登录页面
		 * @param {Object} context
		 * @param {Object} payload confirm {Boolean} 是否需要确认
		 */
		logout ({ commit, dispatch }, { confirm = false } = {}) {
			/**
			 * @description 注销
			 */
			async function logout () {
				// 清空 vuex 用户信息
				await dispatch('d2admin/user/setUserInfo', {}, { root: true })
				await dispatch('d2admin/user/setPermissions', {}, { root: true })
				// 跳转路由
				router.push({
					name: 'login'
				})
			}

			// 判断是否需要确认
			if (confirm) {
				commit('d2admin/gray/set', true, { root: true })
				MessageBox.confirm('确定要注销当前用户吗', '注销用户', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(() => {
						commit('d2admin/gray/set', false, { root: true })
						logout()
					})
					.catch(() => {
						commit('d2admin/gray/set', false, { root: true })
					})
			} else {
				logout()
			}
		},
		/**
		 * @description 用户登录后从持久化数据加载一系列的设置
		 * @param {Object} context
		 */
		load ({ dispatch }) {
			return new Promise(async resolve => {
				// DB -> store 加载用户名
				await dispatch('d2admin/user/load', null, { root: true })
				// DB -> store 加载主题
				await dispatch('d2admin/theme/load', null, { root: true })
				// DB -> store 加载页面过渡效果设置
				await dispatch('d2admin/transition/load', null, { root: true })
				// DB -> store 持久化数据加载上次退出时的多页列表
				await dispatch('d2admin/page/openedLoad', null, { root: true })
				// DB -> store 持久化数据加载侧边栏折叠状态
				await dispatch('d2admin/menu/asideCollapseLoad', null, { root: true })
				// DB -> store 持久化数据加载全局尺寸
				await dispatch('d2admin/size/load', null, { root: true })
				// end
				resolve()
			})
		}
	}
}
