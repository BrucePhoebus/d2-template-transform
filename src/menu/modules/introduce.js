/*
* demo
* */
export default {
    path: '/introduce',
    title: 'introduce',
    icon: '',
    children: (pre => [
        {
            path: `${pre}project`,
            title: '项目介绍',
            icon: ''
        },
    ])('/introduce/')
}
