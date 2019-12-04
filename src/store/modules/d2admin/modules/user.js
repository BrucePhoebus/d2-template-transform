export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {},
    permissions: {},

  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} context
     * @param {*} info info
     */
    setUserInfo ({ state, dispatch }, userInfo = {}) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = userInfo;
        // 持久化
        await dispatch('d2admin/db/set', {
          dbName: 'sys',
          path: 'user.info',
          value: userInfo,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 设置用户权限
     * @param {Object} context
     * @param {*} permissions permissions
     */
    setPermissions ({ state, dispatch }, permissions = {}) {
      return new Promise(async resolve => {
        // 转数组为对象存储
        let authorities = {};
        if (permissions instanceof Array) {
          permissions.map(item => {
            authorities[item] = true;
          })
        }
        // store 赋值
        state.permissions = authorities;
        // 持久化
        await dispatch('d2admin/db/set', {
          dbName: 'sys',
          path: 'user.permissions',
          value: authorities,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} context
     */
    load ({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = await dispatch('d2admin/db/get', {
          dbName: 'sys',
          path: 'user.info',
          defaultValue: {},
          user: true
        }, { root: true })

        state.permissions = await dispatch('d2admin/db/get', {
          dbName: 'sys',
          path: 'user.permissions',
          defaultValue: {},
          user: true
        }, { root: true })

        // end
        resolve()
      })
    }
  }
}
