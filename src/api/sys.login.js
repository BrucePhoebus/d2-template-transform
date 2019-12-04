import request from '@/plugin/axios'

/*
* 账号密码登录
* */
export function accountLogin (data) {
	return request({
		url: '/front/login/normal',
		method: 'post',
		data
	})
}

