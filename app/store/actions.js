import * as types from './mutation-types'

export default {
    async nuxtServerInit({ commit }, { req, res }) {
        //  await this.dispatch('loadMyProfile');
    },
    async loadBaseConfig({ commit }) {
        let configs = await this.$axios.get('config/all');
    },

    async loadMyProfile({ commit }) {
        let res = await this.$axios.get('my/profile');
        if (res.ok) {
            const user = res.data;
            commit(types.UPDATE_USER, user);
            commit(types.UPDATE_AUTH, true);
        }
    },

    async login({ commit }, user) {
        let res = await this.$axios.post(`portal/login`, user);
        if (res.ok) {
            const ret = res.data;
            commit(types.UPDATE_LOGIN, { user: ret.user, accessToken: ret.accessToken, authenticated: true });
        }
        return res;
    },
    async register({ commit }, user) {
        let res = await this.$axios.post(`portal/register`, user);
        if (res.ok) {
            const ret = res.data;
            commit(types.UPDATE_LOGIN, {
                user: ret.user,
                accessToken: ret.accessToken,
                authenticated: true
            });
        }
        return res;
    },
    /**
     * 退出登录
     * @param commit
     * @returns {Promise<void>}
     */
    async logout({ commit }) {
        Auth.setAccessToken(null);
        let res = await this.$axios.post(`portal/logout`);
        if (res.ok) {

        }
        commit(types.UPDATE_LOGIN, {
            user: {},
            accessToken: null,
            authenticated: false
        });
    },
    /**
     * 获取所有游戏信息
     * @param commit
     * @returns {Promise<void>}
     */
    async loadCategories({ commit }) {
        let games = await this.$axios.get('games/all');
        if (res.ok) {

        }
        commit(types.SET_GAMES, games);
        commit(types.SET_CURRENT_GAME, games[0]);
    },
    async createBlog({ commit }, newTeam) {
        let res = await this.$axios.post('team/create', newTeam);
        //
        if (res.code === Codes.FAIL) {
            //失败
        }
        return res;
    },

}
