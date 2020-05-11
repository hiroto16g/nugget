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
                videoID: '',
                userID: 'tsibo',
                category: '自然科学',
                tags: ['物理', '定義', 'レオロジー', '非ニュートン流体', '猫'],
                src: require('../../assets/猫は液体なのか.mp4'),
                title: '猫は液体なのか？物理学の盲点',
                image: 'https://cdn.vuetifyjs.com/images/john.jpg',
                name: '働きすぎたT細胞',
                text: '形あるものはやがて崩れる。それは猫も例外ではない。暑い夏の昼下がり。風鈴と蝉が、北風と太陽のように争っている。童話の通り、勝ったのは太陽の方だ。僕は滝にならんと流れ出る汗を抑えようと図書館に涼みに出かける。悲しいかな、僕の家にはクーラーがないのだ。ふと見やると三色の毛むくじゃらが日陰に溶けていた。猫だ！普段は凛として人間など興味ないような態度をとる彼らも、この暑さにはだらけてしまうらしい。働かなくても食えるなんて羨ましいなあ、なんて溶けた頭で考えていると、突然、ひらめいた。「猫は液体なのではないだろうか」。このとんでもない疑問が、僕の夏休みのテーマになった。',
                n_likes: 1234,
                n_comments: 1234,
                n_views: 1234,
                this_audience: {
                    looked: false,
                    liked: false,
                    followed: false,
                }
            },
            {
                videoID: '',
                userID: 'tsibo',
                category: '自然科学',
                tags: ['数学', '定義', '基礎数学', 'zfc'],
                src: require('../../assets/動画.mp4'),
                title: '0は自然数ということにしたい',
                image: 'https://cdn.vuetifyjs.com/images/john.jpg',
                name: '働かないB細胞',
                text: '自然数ってなんじゃらほい。',
                n_likes: 4321,
                n_comments: 4321,
                n_views: 4321,
                this_audience: {
                    looked: false,
                    liked: false,
                    followed: false,
                }
            },
        ],
        followed: false,
        comments: [
            {
                image: 'https://cdn.vuetifyjs.com/images/john.jpg',
                name: '食べられそうなラー油',
                comment: '辛そうで辛くない、ちょっと辛いコメント',
                id: 'karame'
            },
            {
                image: 'https://cdn.vuetifyjs.com/images/john.jpg',
                name: '食べられそうなラー油',
                comment: '辛そうで辛くない、ちょっと辛いコメント',
                id: 'karame'
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
        init_video(context, videoID){
            //POSTデータ
            var formData = new FormData();
            formData.append('ContentId', videoID);
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
                //再生回数の加算
                context.dispatch('add_watch');
            });
        },
        //コメントの取得
        init_comment(context, videoID){
            //POSTデータ
            var formData = new FormData();
            formData.append('ContentId', videoID);
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
            var videoID = videos[video_count].videoID;
            //POSTデータ
            var formData = new FormData();
            formData.append('ContentId', videoID);
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
            var videoID = videos[video_count].videoID;
            var liked = videos[video_count].this_audience.liked;
            //POSTデータ
            var formData = new FormData();
            formData.append('ContentId', videoID);
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
            var userID = videos[video_count].userID;
            var followed = videos[video_count].this_audience.followed;
            //POSTデータ
            var formData = new FormData();
            formData.append('PosterId', userID);
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
        //視聴回数の加算
        add_watch(context){
            var videos = context.state.videos;
            var video_count = context.state.video_count;
            var videoID = videos[video_count].videoID;
            //POSTデータ
            var formData = new FormData();
            formData.append('ContentId', videoID);
            formData.append('UserId', user_id);
            //コールバック転送データ
            var payload = {
                video_count: video_count,
            }
            //加算
            axios
                .post('http://localhost:8080/add-watch', formData)
                .then(function(){
                    context.commit('add_watch', payload);
                });
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
                //タグの抽出
                var tagList = [];
                contentData.tags.forEach(function(tagClass){
                    tagList.push(tagClass.tag);
                });
                //表示動画
                videos.push(
                    {
                        videoID: contentData.content.contentid,
                        src: contentData.content.contentpath,
                        title: contentData.content.title,
                        category: contentData.content.category,
                        tags: tagList,
                        text: contentData.content.comment,
                        image: contentData.content.postericon,
                        userID: contentData.content.posterid,
                        name: contentData.content.postername,
                        n_likes: contentData.content.genius,
                        n_comments: contentData.content.commentcount,
                        n_views: contentData.content.watch,
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
                            videoID: contentData.content.contentid,
                            src: contentData.content.thumbnailpath,
                            title: contentData.content.title,
                            count: i,
                        }
                    )
                }

                i++;
            });
            state.video_count = 0;
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
        },
        add_watch(state, payload){
            if(this.state.config.RUN_SYSTEM_MODE == this.state.config.SYSTEM_MODE_BOTH){
                //統合モード
                var video_count = payload.video_count;
                state.videos[video_count].n_views++;
            } else{
                //その他
            }
        },
        click_thumbnail(state, count){
            state.video_count = count;
        }
    }
}