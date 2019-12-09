import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

import store from '@/store/index'

import util from '@/libs/util.js'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 路由数据
import routes from './routes'

Vue.use(VueRouter)

const mode = process.env.NODE_ENV === 'production' ? 'history' : 'hash'

// 导出路由 在 main.js 里使用
const router = new VueRouter({
	base: "/d2-template/",
	mode: mode,
	routes
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
	// 进度条
	NProgress.start();

	// 确认已经加载多标签页数据
	await store.dispatch('d2admin/page/isLoaded');
	// 确认已经加载组件尺寸设置
	await store.dispatch('d2admin/size/isLoaded');
	// 关闭搜索面板
	store.commit('d2admin/search/set', false);

	next();
})

router.afterEach(to => {
	// 进度条
	NProgress.done()
	// 多页控制 打开新的页面
	store.dispatch('d2admin/page/open', to)
	// 更改标题
	util.title(to.meta.title)
})

export default router
