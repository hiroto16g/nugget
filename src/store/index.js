import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            log_in: false,
            display_name: '',
            id: ''
        },
        keywords: '',
        comment: '',
        slideCount: 0,
        homeSlides: [
            {
                slideID: '',
                src: require('../assets/猫は液体なのか.mp4'),
                title: '猫は液体なのか？物理学の盲点',
                image: 'https://cdn.vuetifyjs.com/images/john.jpg',
                name: '働きすぎたT細胞',
                n_likes: 1234,
                n_comments: 1234,
                this_audience: {
                    looked: false,
                    liked: false,
                    followed: false,
                }
            },
            {
                slideID: '',
                src: require('../assets/動画.mp4'),
                title: '0は自然数ということにしたい',
                image: 'https://cdn.vuetifyjs.com/images/john.jpg',
                name: '働きすぎたT細胞',
                n_likes: 4321,
                n_comments: 4321,
                this_audience: {
                    looked: false,
                    liked: false,
                    followed: false,
                }
            },
        ],
        searchTag: '',
        searchFlag: false,
        comments: [
            {
                image: '',
                name: '',
                comment: ''
            }
        ]
    },
    mutations: {
        update_keywords(state, keywords) {
            state.keywords = keywords
        },
        update_comment(state, comment) {
            state.comment = comment
        },
        next_slide(state) {
            state.slideCount++
            state.slideCount %= state.homeSlides.length
        },
        prev_slide(state) {
            if (state.slideCount > 0) {
                state.slideCount--
            }
        },
        searchByTag(state, clickedTag) {
            state.searchTag = clickedTag
        },
        cancelSearch(state) {
            state.keywords = ''
            state.searchFlag = false
        },
        willSearch(state) {
            state.searchFlag = true
        }
    },
    actions: {},
    modules: {}
})
