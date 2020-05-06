import axios from 'axios'

/* eslint-disable no-console */

//仮置き
var user_id = 'snack-pesto-clots';

export default {
    namespaced: true,
    
    state: {
        video_count: 0,
        comment: '',
        videos: [
            {
                content_id: '',
                src: require('../../assets/猫は液体なのか.mp4'),
                title: '猫は液体なのか？物理学の盲点',
                image: 'https://cdn.vuetifyjs.com/images/john.jpg',
                poster_id: '',
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
                content_id: '',
                src: require('../../assets/動画.mp4'),
                title: '0は自然数ということにしたい',
                image: 'https://cdn.vuetifyjs.com/images/john.jpg',
                poster_id: '',
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
        comments: [
            {
                image: 'https://cdn.vuetifyjs.com/images/john.jpg',
                name: '食べられそうなラー油',
                comment: '辛そうで辛くない、ちょっと辛いコメント'
            }
        ],
        recommend_thumbs: [
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
            }
        ]
    },
    actions:{
        //動画の取得
        init_video(context, content_id){
            //POSTデータ
            var formData = new FormData();
            formData.append('ContentId', content_id);
            formData.append('UserId', user_id);
            //動画の取得
            axios
            .post('http://localhost:8080/watch-content-json', formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                }
                //動画のセット
                context.commit('init_video', payload);
            });
        },
        //コメントの取得
        init_comment(context, content_id){
            //POSTデータ
            var formData = new FormData();
            formData.append('ContentId', content_id);
            formData.append('UserId', user_id);
            //コメントの取得
            axios
            .post('http://localhost:8080/get-comments', formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                }
                //コメントのセット
                context.commit('init_comment', payload);
            });
        },
        //コメントの送信
        post_comment(context, comment){
            var videos = context.state.videos;
            var video_count = context.state.video_count;
            var content_id = videos[video_count].content_id;
            //POSTデータ
            var formData = new FormData();
            formData.append('ContentId', content_id);
            formData.append('UserId', user_id);
            formData.append("Text", comment);
            //コメントの取得
            axios
            .post('http://localhost:8080/post-comment', formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                }
                //コメントのセット
                context.commit('post_comment', payload);
            });
        },
        //ジーニアスの押下
        click_like(context){
            var videos = context.state.videos;
            var video_count = context.state.video_count;
            var content_id = videos[video_count].content_id;
            var liked = videos[video_count].this_audience.liked;
            //POSTデータ
            var formData = new FormData();
            formData.append('ContentId', content_id);
            formData.append('UserId', user_id);
            //コールバック転送データ
            var payload = {
                video_count: video_count,
                liked: liked,
            }

            if(liked){
                axios
                .post('http://localhost:8080/remove-genius', formData)
                .then(function(){
                    context.commit('click_like', payload);
                });
            }else{
                axios
                .post('http://localhost:8080/add-genius', formData)
                .then(function(){
                    context.commit('click_like', payload);
                });
            }
        },
        //フォローの切り替え
        toggle_follow(context){
            var videos = context.state.videos;
            var video_count = context.state.video_count;
            var poster_id = videos[video_count].poster_id;
            var followed = videos[video_count].this_audience.followed;
            //POSTデータ
            var formData = new FormData();
            formData.append('PosterId', poster_id);
            formData.append('UserId', user_id);
            //コールバック転送データ
            var payload = {
                video_count: video_count,
                followed: followed,
            }

            if(followed){
                axios
                .post('http://localhost:8080/cancel-follow-json', formData)
                .then(function(){
                    context.commit('toggle_follow', payload);
                });
            }else{
                axios
                .post('http://localhost:8080/follow-json', formData)
                .then(function(){
                    context.commit('toggle_follow', payload);
                });
            }
        },
    },
    mutations: {
        init_video(state, payload){
            var contentDataList = payload.data;

            //動画
            var videos = [];
            //おすすめ（サムネイル）
            var recommend_thumbs = [];

            var i = 0
            contentDataList.forEach(function(contentData){
                //表示動画
                videos.push(
                    {
                        content_id: contentData.content.contentid,
                        src: contentData.content.contentpath,
                        title: contentData.content.title,
                        image: contentData.content.postericon,
                        poster_id: contentData.content.posterid,
                        name: contentData.content.postername,
                        n_likes: contentData.content.genius,
                        n_comments: contentData.content.commentcount,
                        this_audience: {
                            looked: false,
                            liked: contentData.isgenius,
                            followed: contentData.isfollow,
                        },
                    }
                );
                if(i != 0){
                   //サムネイル
                   recommend_thumbs.push(
                        {
                            content_id: contentData.content.contentid,
                            src: contentData.content.thumbnailpath,
                            title: contentData.content.title,
                        }
                    )
                }

                i++;
            });
            state.videos = videos;
            state.recommend_thumbs = recommend_thumbs;
        },
        init_comment(state, payload){
            var comments = payload.data.list;
            state.comments = [];
            comments.forEach(function(comment){
                state.comments.push(
                    {
                        image: comment.icon,
                        name: comment.username,
                        comment: comment.text,
                    }
                );
            });
        },
        next_slide(state) {
            state.video_count++
            state.video_count %= state.videos.length
        },
        prev_slide(state) {
            if (state.video_count > 0) {
                state.video_count--
                state.video_count %= state.videos.length - 1
            } else if (state.video_count <= 0) {
                state.video_count = state.videos.length - 1
            }
        },
        toggle_follow(state, payload) {
            if(this.state.config.RUN_SYSTEM_MODE == this.state.config.SYSTEM_MODE_BOTH){
                //統合モード
                var followed = payload.followed;
                var video_count = payload.video_count;
                state.videos[video_count].this_audience.followed = !followed;
            } else{
                //その他
                state.videos[state.video_count].this_audience.followed = !state.videos[state.video_count].this_audience.followed
            }
        },
        post_comment(state, payload) {
            if(this.state.config.RUN_SYSTEM_MODE == this.state.config.SYSTEM_MODE_BOTH){
                //統合モード
                var comment = payload.data.detail;
                //追加コメントの表示
                state.comments.unshift(
                    {
                        image: comment.icon,
                        name: comment.username,
                        comment: comment.text,
                    }
                );
                //コメント総数の加算
                var video_count = state.video_count;
                state.videos[video_count].n_comments++;

                //入力中のコメントを初期化
            } else{
                //その他
                state.comment = comment
            }
        },
        click_like(state, payload) {
            if(this.state.config.RUN_SYSTEM_MODE == this.state.config.SYSTEM_MODE_BOTH){
                //統合モード
                var liked = payload.liked;
                var video_count = payload.video_count;
                state.videos[video_count].this_audience.liked = !liked
                
                if (liked) {
                    state.videos[video_count].n_likes--
                } else {
                    state.videos[video_count].n_likes++
                }
            } else{
                //その他
                let liked = state.videos[state.video_count].this_audience.liked
                state.videos[state.video_count].this_audience.liked = !liked
                
                if (liked) {
                    state.videos[state.video_count].n_likes--
                } else {
                    state.videos[state.video_count].n_likes++
                }
            }
        }
    }
}