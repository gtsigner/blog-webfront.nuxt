import * as types from './mutation-types'
import { Http, Codes } from '../plugins/utils/api'
import Auth from '../plugins/utils/auth'

export default {
  async nuxtServerInit({ commit }, { req, res }) {
    //  await this.dispatch('loadMyProfile');
  },
  async loadBaseConfig({ commit }) {
    let configs = await Http.get('config/all');
  },

  async loadMyProfile({ commit }) {
    let res = await Http.get('my/profile');
    if (res.code === Codes.SUCCESS) {
      const user = res.data;
      commit(types.UPDATE_USER, user);
      commit(types.UPDATE_AUTH, true);
    }
  },

  async login({ commit }, user) {
    let res = await Http.post(`portal/login`, user);
    if (res.code === Codes.SUCCESS) {
      const ret = res.data;
      commit(types.UPDATE_LOGIN, {
        user: ret.user,
        accessToken: ret.accessToken,
        authenticated: true
      });
    }
    return res;
  },
  async register({ commit }, user) {
    let res = await Http.post(`portal/register`, user);
    if (res.code === Codes.SUCCESS) {
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
    let res = await Http.post(`portal/logout`);
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
    let games = await Http.get('games/all');
    commit(types.SET_GAMES, games);
    commit(types.SET_CURRENT_GAME, games[0]);
  },
  async createBlog({ commit }, newTeam) {
    let res = await Http.post('team/create', newTeam);
    //
    if (res.code === Codes.FAIL) {
      //失败
    }
    return res;
  },

}
