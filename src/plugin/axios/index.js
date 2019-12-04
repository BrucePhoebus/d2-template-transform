import store from '@/store'
import router from '@/router'
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import util from '@/libs/util'

// 创建一个错误
function errorCreate (msg) {
	const error = new Error(msg)
	errorLog(error)
	throw error
}

// 记录和显示错误
function errorLog (error) {
	// 添加到日志
	store.dispatch('d2admin/log/push', {
		message: '数据请求异常',
		type: 'danger',
		meta: {
			error
		}
	})
	// 打印到控制台
	if (process.env.NODE_ENV === 'development') {
		util.log.danger('>>>>>> Error >>>>>>')
		console.log(error)
	}
	// 显示提示
	Message({
		message: error.message,
		type: 'error',
		duration: 5 * 1000
	})
}

// 创建一个 axios 实例
const service = axios.create({
	baseURL: process.env.VUE_APP_API,
	timeout: 15000 // 请求超时时间
})

// 添加post请求默认请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
service.interceptors.request.use(
	config => {
		// 对请求参数序列化处理
		if (config.method === 'get' || config.method === 'delete') {
			config.params = {data: JSON.stringify(config.params)};
		} else {
			config.data = qs.stringify({data: JSON.stringify(config.data)});
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
)

// 响应拦截器
service.interceptors.response.use(
	response => {
		// resData 是 axios 返回数据中的 data
		const resData = response.data;
		// 这个状态码是和后端约定的
		const { code } = resData;
		// 根据 code 进行判断请求状态
		if (code === undefined) {
			return resData;
		} else {
			// 有 code 代表这是一个后端接口
			switch (code) {
				case 0:
					// code === 0 代表请求成功
					return resData;
					break;
				case -1:
					// 不知名错误
					Message({
						// message: `[ code: -1 ] ${resData.message}: ${response.config.url}`,
						message: `${resData.message}`,
						type: 'error',
						duration: 5 * 1000
					})
					break
				case -10:
					// code === -10 表示参数不正确
					// errorCreate(`[ code: -10 ] ${resData.message}: ${response.config.url}`);
					errorCreate(`${resData.message}`);
					break;
				case -15:
					// code === -15 表示未登录
					Message({
						// message: `[ code: -15 ] ${resData.message}: ${response.config.url}`,
						message: `${resData.message}`,
						type: 'error',
						duration: 5 * 1000
					})
					store.dispatch('d2admin/account/logout', {
						confirm: false
					})
					break;
				default:
					// 不是正确的 code
					// errorCreate(`[ code: ${code} ] ${resData.message}: ${response.config.url}`);
					errorCreate(`${resData.message}`);
					break;
			}
		}
	},
	error => {
		if (error && error.response) {
			switch (error.response.status) {
				case 400:
					error.message = '请求错误'
					break
				case 401:
					error.message = '未授权，请登录'
					break
				case 403:
					error.message = '拒绝访问'
					break
				case 404:
					error.message = `请求地址出错: ${error.response.config.url}`
					break
				case 408:
					error.message = '请求超时'
					break
				case 500:
					error.message = '服务器内部错误'
					break
				case 501:
					error.message = '服务未实现'
					break
				case 502:
					error.message = '网关错误'
					break
				case 503:
					error.message = '服务不可用'
					break
				case 504:
					error.message = '网关超时'
					break
				case 505:
					error.message = 'HTTP版本不受支持'
					break
				default:
					break
			}
		}
		errorLog(error)
		return Promise.reject(error)
	}
)

export default service
