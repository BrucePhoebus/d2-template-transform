export default {
    namespaced: true,
    state: {
        // 列表信息
        filterData: {},
    },
    mutations:{
        set(state,data){
            state.filterData = data;
            console.log('标记点'+data)
        }
    },

}
