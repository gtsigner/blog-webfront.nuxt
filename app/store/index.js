/**
 * Created by zhaojunlike on 11/6/2017.
 */
import Vuex from 'vuex';
import Vue from 'vue'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

const store = () => {
    return new Vuex.Store({
        state: {
            isLoading: true,
            configs: {},
            //是否已经登录
            authenticated: false,
            //token
            accessToken: null,
            user: {
                username: '', nickname: '', avatar: ''
            },
            currentGame: {},//当前游戏
            position: {
                latitude: '', // 当前位置纬度
                longitude: '', // 当前位置经度
            },
            local: null,
            dev: false,
            games: [],
            myGames: [],
        },
        getters: getters,
        mutations: mutations,
        actions: actions
    });

};

export default store;
