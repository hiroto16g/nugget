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
            log_in: true,
            name: 'のび太さんのエッジ',
            id: 'nobitasedge',
            image: '',
            bio: '「素人質問で申し訳ない」の対偶は「お灸をすえる玄人回答」',
            mail_address: 'info@nuggets.tokyo'
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
