import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
    auth: true,
    cache: true, // 缓存页面
}

/*
* 数据分析模块
* */
export default {
    path: '/demo',
    name: 'demo',
    meta,
    component: layoutHeaderAside,
    redirect: { name: 'demo-1' },
    children: (pre => [
        {
            path: '1',
            name: `${pre}1`,
            meta: {
                ...meta,
                title: 'demo01',
            },
            component: _import('demo/demo03'),
        },
        {
            path: '2',
            name: `${pre}2`,
            meta: {
                ...meta,
                title: 'demo02',
            },
            component: _import('demo/demo03'),
        },
        {
            path: '3',
            name: `${pre}3`,
            meta: {
                ...meta,
                title: 'demo03',
            },
            component: _import('demo/demo03'),
        },
    ])('demo-')
}
