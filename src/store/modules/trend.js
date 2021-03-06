import axios from 'axios'

/* eslint-disable no-console */

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
            '芸術・美術'
        ],
        choiced_tags: [
            /*'テスタグ',
            '心理学', '教育学', 'ディープラーニング', '社会学', '理学', '英語', '哲学', '経済学', '工学'*/
        ],
        history: [
            /*
            '心理学', '教育学', 'ディープラーニング', '社会学', '理学', '英語', '哲学', '経済学', '工学'
            */
        ],
        pred_words: [
            /*
            'apple',
            'gorilla',
            'rap',
            'りんご'
            */
        ],
        recommends: [
            {
                head: 'おすすめ',
                thumbSrc: [
                    {
                        src: require('@/assets/thumbs/sonshi.jpg'),
                        title: '孫氏はぶっちゃけどこがすごい！？',
                        videoID: '',
                    },
                    {
                        src: require('../../assets/thumbs/yousho.png'),
                        title: '幼少期の自然体験と科学への関心',
                        videoID: '',
                    },
                    {
                        src: require('../../assets/thumbs/saigo.jpg'),
                        title: '教えて！西郷さん',
                        videoID: '',
                    },
                ]
            },
            {
                head: '人気',
                thumbSrc: [
                    {
                        src: require('../../assets/thumbs/flow.png'),
                        title: 'ここにはスライドのタイトルが入ります',
                        videoID: '',
                     },
                    {
                        src: require('../../assets/thumbs/shizensu.png'),
                        title: 'ここにはスライドのタイトルが入ります',
                        videoID: '',
                    },
                    {
                        src: require('../../assets/thumbs/napo.jpg'),
                        title: 'ここにはスライドのタイトルが入ります',
                        videoID: '',
                    },
               ]
             },
            {
                head: '急上昇',
                thumbSrc: [
                    {
                        src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                        title: 'ここにはスライドのタイトルが入ります',
                        videoID: '',
                     },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                        title: 'ここにはスライドのタイトルが入ります',
                        videoID: '',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                        title: 'ここにはスライドのタイトルが入ります',
                        videoID: '',
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
            formData.append('UserId', this.state.userInfo.id);
            formData.append('Category', now_category);
            //おすすめの取得
            axios
            .post(this.state.config.SECOND_SERVER + '/get-user-recommend', formData)
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
            formData.append('UserId', this.state.userInfo.id);
            formData.append('Category', now_category);
            //人気の取得
            axios
            .post(this.state.config.SECOND_SERVER + '/get-popular', formData)
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
            formData.append('UserId', this.state.userInfo.id);
            formData.append('Category', now_category);
            //急上昇の取得
            axios
            .post(this.state.config.SECOND_SERVER + '/get-rapid-rise', formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                }
                //急上昇のセット
                context.commit('get_rapid_rise', payload);
            });
        },
        //初期表示タグの取得
        get_tags_home(context){
            //POSTデータ
            var formData = new FormData();
            //formData.append('UserId', this.state.userInfo.id);
            //初期表示タグの取得
            axios
            .post(this.state.config.SECOND_SERVER + '/get-tags-home', formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                }
                //初期表示タグのセット
                context.commit('get_tags_home', payload);
            });
        },
        //検索履歴の取得
        get_search_history(context){
            //POSTデータ
            var formData = new FormData();
            formData.append('UserId', this.state.userInfo.id);
            //検索履歴の取得
            axios
            .post(this.state.config.SECOND_SERVER + '/get-search-history', formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                }
                //検索履歴のセット
                context.commit('get_search_history', payload);
            });
        },
        //予想タグの取得
        display_pred(context, keyword) {
            //POSTデータ
            var formData = new FormData();
            formData.append('Keyword', keyword);
            formData.append('Filter', 0);
            //予想タグの取得
            axios
            .post(this.state.config.SECOND_SERVER + '/search-tag', formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                    keyword: keyword,
                }
                //予想タグのセット
                context.commit('display_pred', payload);
            });
        }
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
                        videoID:String(tmpContent.contentid),
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
                        videoID:String(tmpContent.contentid),
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
                        videoID:String(tmpContent.contentid),
                    }
                );
            });
            state.recommends[2].thumbSrc = thumbSrc;
        },
        //初期表示タグのセット
        get_tags_home(state, payload){
            var choiced_tags = [];
            payload.data.forEach(function(tag){
                choiced_tags.push(tag);
            });
            state.choiced_tags = choiced_tags;
        },
        //検索履歴のセット
        get_search_history(state, payload){
            var history = [];
            payload.data.forEach(function(search_history){
                history.push(
                    search_history.word,
                );
            });
            state.history = history;
        },
        determine_keywords(state, keywords) {
            state.keywords = keywords
        },
        search_by_tag(state, clicked_tag) {//未使用
            state.search_tag = clicked_tag
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
        display_pred(state, payload) {
            var pred_words = [];
            payload.data.list.forEach(function(tag){
                pred_words.push(tag.tag);
            });
            state.keywords = payload.keyword;
            state.pred_words = pred_words;
        },
        //state.keywords = keywords
        input_keywords(state, keywords) {
            state.keywords = keywords
        }
    }
}
