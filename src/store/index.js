import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate";

import home from './modules/home'
import trend from './modules/trend'
import upload_video from './modules/upload_video'
import mypage from './modules/mypage'
import common from './modules/common'
import make_account from './modules/make_account'
import login from './modules/login'
import tagged_screen from './modules/tagged_screen'

Vue.use(Vuex)

export const initialState = {
    userInfo: {
        log_in: false,
        name: '',
        id: 'system_user',
        image: '',
        bio: '',
        mail_address: ''
    },
    config: {
        SYSTEM_MODE_FRONTEND: 1,
        SYSTEM_MODE_BOTH: 2,
        RUN_SYSTEM_MODE: 2,
        SECOND_SERVER: "http://localhost:8081",
    },
    clicked_userID: ''
}

export default new Vuex.Store({
    state: initialState,
    mutations: {
        click_user(state, userID) {
            state.clicked_userID = userID
        },
        RESET_VUEX_STATE(state) {
            Object.assign(state, JSON.parse(localStorage.getItem('initialState')));
        }
    },
    actions: {},
    modules: {
        home,
        trend,
        upload_video,
        mypage,
        common,
        mkacc: make_account,
        login,
        tagged_screen
    },
    plugins: [createPersistedState()]
})
