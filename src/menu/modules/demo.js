/*
* demo
* */
export default {
    path: '/demo',
    title: 'demo',
    icon: '',
    children: (pre => [
        {
            path: `${pre}1`,
            title: 'demo01',
            icon: ''
        },
        {
            path: `${pre}2`,
            title: 'demo02',
            icon: ''
        },
        {
            path: `${pre}3`,
            title: 'demo03',
            icon: ''
        },
    ])('/demo/')
}
