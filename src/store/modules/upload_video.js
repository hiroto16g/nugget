export default {
    namespaced: true,

    state: {
        categories: [
            '社会科学',
            '自然科学',
            '哲学・心理学',
            '言語',
            '工学',
            '歴史・地理',
            '文学',
            '芸術・美術'
        ],
        data: {
            video: '',
            thumb: '',
            title: '',
            category: '',
            tags: [],
            overview: ''
        }
    },
    mutations: {
    }
}