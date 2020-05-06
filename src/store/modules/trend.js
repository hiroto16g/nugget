import axios from 'axios'

/* eslint-disable no-console */

//仮置き
var user_id = 'snack-pesto-clots';

export default {
    namespaced: true,

    state: {
        search_tag: '',
        search_flag: false,
        keywords: '',
        now_category: 'おすすめ',
        categories: [
            'おすすめ',
            //'応用化学',
            '社会科学',
            '自然科学',
            '哲学・心理学',
            '言語',
            '工学',
            '歴史・地理',
            '文学',
            '芸術美術'
        ],
        choiced_tags: [
            'テスタグ',
            '心理学', '教育学', 'ディープラーニング', '社会学', '理学', '英語', '哲学', '経済学', '工学'
        ],
        history: [
            '心理学', '教育学', 'ディープラーニング', '社会学', '理学', '英語', '哲学', '経済学', '工学'
        ],
        pred_words: [
            'apple',
            'gorilla',
            'rap',
            'りんご'
        ],
        recommends: [
            {
                head: 'おすすめ',
                thumbSrc: [
                    {
                        src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                        title: 'ここにはスライドのタイトルが入ります',
                        content_id: '',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                        title: 'ここにはスライドのタイトルが入ります',
                        content_id: '',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                        title: 'ここにはスライドのタイトルが入ります',
                        content_id: '',
                    },
                ]
            },
            {
                head: '人気',
                thumbSrc: [
                    {
                        src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                        title: 'ここにはスライドのタイトルが入ります',
                        content_id: '',
                     },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                        title: 'ここにはスライドのタイトルが入ります',
                        content_id: '',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                        title: 'ここにはスライドのタイトルが入ります',
                        content_id: '',
                    },
               ]
             },
            {
                head: '急上昇',
                thumbSrc: [
                    {
                        src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                        title: 'ここにはスライドのタイトルが入ります',
                        content_id: '',
                     },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                        title: 'ここにはスライドのタイトルが入ります',
                        content_id: '',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                        title: 'ここにはスライドのタイトルが入ります',
                        content_id: '',
                    },
                ]
             }
        ]
    },
    actions:{
        //おすすめの取得
        get_user_recommend(context, now_category){
            //POSTデータ
            var formData = new FormData();
            formData.append('UserId', user_id);
            formData.append('Category', now_category);
            //おすすめの取得
            axios
            .post('http://localhost:8080/get-user-recommend', formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                }
                //おすすめのセット
                context.commit('get_user_recommend', payload);
            });
        },
        //人気の取得
        get_popular(context, now_category){
            //POSTデータ
            var formData = new FormData();
            formData.append('UserId', user_id);
            formData.append('Category', now_category);
            //人気の取得
            axios
            .post('http://localhost:8080/get-popular', formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                }
                //人気のセット
                context.commit('get_popular', payload);
            });
        },
        //急上昇の取得
        get_rapid_rise(context, now_category){
            //POSTデータ
            var formData = new FormData();
            formData.append('UserId', user_id);
            formData.append('Category', now_category);
            //急上昇の取得
            axios
            .post('http://localhost:8080/get-rapid-rise', formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                }
                //急上昇のセット
                context.commit('get_rapid_rise', payload);
            });
        },
        //タグ検索
        search_by_tag(context, tag){
            //POSTデータ
            var formData = new FormData();
            formData.append('Tag', tag);
            //タグ検索
            axios
            .post('http://localhost:8080/search-by-tag', formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                }
                //タグ検索のセット
                context.commit('search_by_tag', payload);
            });
        },
    },
    mutations: {
        //おすすめのセット
        get_user_recommend(state, payload){
            var thumbSrc = [];
            payload.data.forEach(function(tmpContent){
                thumbSrc.push(
                    {
                        src:tmpContent.thumbnailpath,
                        title:tmpContent.title,
                        content_id:String(tmpContent.contentid),
                    }
                );
            });
            state.recommends[0].thumbSrc = thumbSrc;
        },
        //人気のセット
        get_popular(state, payload){
            var thumbSrc = [];
            payload.data.forEach(function(tmpContent){
                thumbSrc.push(
                    {
                        src:tmpContent.thumbnailpath,
                        title:tmpContent.title,
                        content_id:String(tmpContent.contentid),
                    }
                );
            });
            state.recommends[1].thumbSrc = thumbSrc;
        },
        //急上昇のセット
        get_rapid_rise(state, payload){
            var thumbSrc = [];
            payload.data.forEach(function(tmpContent){
                thumbSrc.push(
                    {
                        src:tmpContent.thumbnailpath,
                        title:tmpContent.title,
                        content_id:String(tmpContent.contentid),
                    }
                );
            });
            state.recommends[2].thumbSrc = thumbSrc;
        },
        determine_keywords(state, keywords) {
            state.keywords = keywords
        },
        /*
        search_by_tag(state, clicked_tag) {
            state.search_tag = clicked_tag
        },
        */
       search_by_tag(state, payload) {
            console.log(state);
            console.log(payload);
        },
        cancel_search(state) {
            state.keywords = ''
            state.search_flag = false
        },
        will_search(state) {
            state.search_flag = true
        },
        switch_category(state, category) {
            state.now_category = category
        },
        display_pred(state, keywords) {
            state.keywords = keywords
        }
    }
}
