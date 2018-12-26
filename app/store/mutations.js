import * as types from './mutation-types'

export default {

  /**
   * 设置登录
   * @param state
   * @param user
   * @param accessToken
   * @param authenticated
   */
  [types.UPDATE_LOGIN](state, { user, accessToken, authenticated }) {
    state.accessToken = accessToken;
    state.authenticated = authenticated;
    state.user = user;
  },
  [types.SET_GAMES](state, games) {
    state.games = [...games];
  },
  [types.SET_CURRENT_GAME](state, game) {
    state.currentGame = game;
  },
  /**
   * 用户信息
   * @param state
   * @param user
   */
  [types.UPDATE_USER](state, user) {
    state.user = user;
  },
  [types.UPDATE_AUTH](state, authenicated) {
    state.authenticated = authenicated;
  },
  [types.SET_ACCESS_TOKEN](state, at) {
    state.accessToken = at;
  }
}
