const opinionData = [
    {
        id: '0120180010100003',
        content: '横县到宾阳的县级公路经过青桐村有1300米都很烂，下雨天路面都是泥水，晴天也有很大的灰尘，对周边居民造成很大的影响，希望政府部门2019年内重新规划该路段，铺好道路。',
        city: '南宁市',
        year: '@date(yyyy)',
        isHasSuggestion: '建议性意见',
        state: '待整改'
    },
    {
        id: '0120180010100003',
        content: '横县到宾阳的县级公路经过青桐村有1300米都很烂，下雨天路面都是泥水，晴天也有很大的灰尘，对周边居民造成很大的影响，希望政府部门2019年内重新规划该路段，铺好道路。',
        city: '南宁市',
        year: '@date(yyyy)',
        isHasSuggestion: '建议性意见',
        state: '待整改'
    },
    {
        id: '0120180010100003',
        content: '横县到宾阳的县级公路经过青桐村有1300米都很烂，下雨天路面都是泥水，晴天也有很大的灰尘，对周边居民造成很大的影响，希望政府部门2019年内重新规划该路段，铺好道路。',
        city: '南宁市',
        year: '@date(yyyy)',
        isHasSuggestion: '建议性意见',
        state: '待整改'
    },
    {
        id: '0120180010100003',
        content: '横县到宾阳的县级公路经过青桐村有1300米都很烂，下雨天路面都是泥水，晴天也有很大的灰尘，对周边居民造成很大的影响，希望政府部门2019年内重新规划该路段，铺好道路。',
        city: '南宁市',
        year: '@date(yyyy)',
        isHasSuggestion: '建议性意见',
        state: '待整改'
    },
    {
        id: '0120180010100003',
        content: '横县到宾阳的县级公路经过青桐村有1300米都很烂，下雨天路面都是泥水，晴天也有很大的灰尘，对周边居民造成很大的影响，希望政府部门2019年内重新规划该路段，铺好道路。',
        city: '南宁市',
        year: '@date(yyyy)',
        isHasSuggestion: '建议性意见',
        state: '待整改'
    },
    {
        id: '0120180010100003',
        content: '横县到宾阳的县级公路经过青桐村有1300米都很烂，下雨天路面都是泥水，晴天也有很大的灰尘，对周边居民造成很大的影响，希望政府部门2019年内重新规划该路段，铺好道路。',
        city: '南宁市',
        year: '@date(yyyy)',
        isHasSuggestion: '建议性意见',
        state: '待整改'
    },
    {
        id: '0120180010100003',
        content: '横县到宾阳的县级公路经过青桐村有1300米都很烂，下雨天路面都是泥水，晴天也有很大的灰尘，对周边居民造成很大的影响，希望政府部门2019年内重新规划该路段，铺好道路。',
        city: '南宁市',
        year: '@date(yyyy)',
        isHasSuggestion: '建议性意见',
        state: '待整改'
    },
    {
        id: '0120180010100003',
        content: '横县到宾阳的县级公路经过青桐村有1300米都很烂，下雨天路面都是泥水，晴天也有很大的灰尘，对周边居民造成很大的影响，希望政府部门2019年内重新规划该路段，铺好道路。',
        city: '南宁市',
        year: '@date(yyyy)',
        isHasSuggestion: '建议性意见',
        state: '待整改'
    },
    {
        id: '0120180010100003',
        content: '横县到宾阳的县级公路经过青桐村有1300米都很烂，下雨天路面都是泥水，晴天也有很大的灰尘，对周边居民造成很大的影响，希望政府部门2019年内重新规划该路段，铺好道路。',
        city: '南宁市',
        year: '@date(yyyy)',
        isHasSuggestion: '建议性意见',
        state: '待整改'
    }
]

export default [
    {
        path: '/api/getOpinionData',
        method: 'get',
        handle () {
            return {
                code: 0,
                msg: '获取数据成功',
                data: {
                    list: opinionData
                }
            }
        }
    }
]
