export default {
    namespaced: true,
    
    state: {
        name: 'のび太さんのエッジ',
        id: 'nobitasedge',
        bio: '「素人質問で申し訳ない」の対偶は「お灸をすえる玄人回答」',
        show_content: '通知',
        contents: [
            '通知', '投稿', 'ジーニアス', '履歴'
        ],
        notif: [
            {
                image: "https://cdn.vuetifyjs.com/images/john.jpg",
                name: '食べられそうなラー油',
                date: '2020/3/16(月)',
                content: '辛そうで辛くない、ちょっと辛いコメント'
            },
            {
                image: "https://cdn.vuetifyjs.com/images/john.jpg",
                name: '食べられそうなラー油',
                date: '2020/3/16(月)',
                content: '辛そうで辛くない、ちょっと辛いコメント'
            },
            {
                image: "https://cdn.vuetifyjs.com/images/john.jpg",
                name: '食べられそうなラー油',
                date: '2020/3/16(月)',
                content: '辛そうで辛くない、ちょっと辛いコメント'
            },
            {
                image: "https://cdn.vuetifyjs.com/images/john.jpg",
                name: '食べられそうなラー油',
                date: '2020/3/16(月)',
                content: '辛そうで辛くない、ちょっと辛いコメント'
            },
        ],
        thumbSrc: [
            {
                src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                title: 'ここにはスライドのタイトルが入ります'
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                title: 'ここにはスライドのタイトルが入ります'
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                title: 'ここにはスライドのタイトルが入ります'
            },
        ],
        follows: [
            {
                image: 'https://cdn.vuetifyjs.com/images/john.jpg',
                name: '生き様辣油の如し',
                id: '@rayu',
                bio: '花粉のように舞い、カプサイシンのように刺す',
                following: false
            },
            {
                image: 'https://cdn.vuetifyjs.com/images/john.jpg',
                name: '生き様辣油の如し',
                id: '@rayu',
                bio: '花粉のように舞い、カプサイシンのように刺す',
                following: false
            }
        ]
    },
    mutations: {
        switch_content(state, content_name) {
            state.show_content = content_name
        },
        toggle_follow(state, index) {
            state.follows[index].following = !state.follows[index].following
        }
    }
}