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
    path: '/introduce',
    name: 'introduce',
    meta,
    component: layoutHeaderAside,
    redirect: { name: 'introduce-project' },
    children: (pre => [
        {
            path: 'project',
            name: `${pre}project`,
            meta: {
                ...meta,
                title: '项目介绍',
            },
            component: _import('introduce/project'),
        },
    ])('introduce-')
}
