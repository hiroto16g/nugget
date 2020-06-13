import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home'
import trend from './modules/trend'
import mypage from './modules/mypage'
import common from './modules/common'
import make_account from './modules/make_account'
import login from './modules/login'
import tagged_screen from './modules/tagged_screen'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            log_in: false,
            name: 'のび太さんのエッジ',
            id: 'nobitasedge',
            image: 'https://cdn.vuetifyjs.com/images/john.jpg',
            bio: '「素人質問で申し訳ない」の対偶は「お灸をすえる玄人回答」',
            mail_address: 'info@nuggets.tokyo'
        },
        config: {
            SYSTEM_MODE_FRONTEND: 1,
            SYSTEM_MODE_BOTH: 2,
            RUN_SYSTEM_MODE: 2,
        },
        clicked_userID: ''
    },
    mutations: {
        click_user(state, userID) {
            state.clicked_userID = userID
        }
    },
    actions: {},
    modules: {
        home,
        trend,
        mypage,
        common,
        mkacc: make_account,
        login,
        tagged_screen
    }
})
