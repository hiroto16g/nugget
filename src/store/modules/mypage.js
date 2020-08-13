import axios from 'axios'

/* eslint-disable no-console */

export default {
    namespaced: true,
    
    state: {
        name: 'のび太さんのエッジ',
        id: 'nobitasedge',
        bio: '「素人質問で申し訳ない」の対偶は「お灸をすえる玄人回答」',
        image: '',
        show_content: '通知',
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
        ],
    },
    actions:{
        //プロフィールの取得
        get_profile(context){
            //POSTデータ
            var formData = new FormData();
            formData.append('UserId', this.state.clicked_userID);
            //プロフィールの取得
            axios
            .post(this.state.config.SECOND_SERVER + '/my-page-profile', formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                }

                //プロフィールのセット
                context.commit('get_profile', payload);
            });
        },
        //詳細の取得
        switch_content(context, content_name){
            //POSTデータ
            var formData = new FormData();
            formData.append('UserId', this.state.clicked_userID);

            var action_name;
            switch(content_name){
                case "通知":
                    action_name = "/my-page-news";
                    break;
                case "投稿":
                    action_name = "/my-page-post-content-list";
                    break;
                case "ナルホド":
                    action_name = "/my-page-genius-content-list";
                    break;
                case "履歴":
                    action_name = "/my-page-watch-content-list";
                    break;
                case "フォロー中":
                    action_name = "/my-page-follow";
                    break;
                case "フォロワー":
                    action_name = "/my-page-follower";
                    break;
            }
            //詳細の取得
            axios
            .post(this.state.config.SECOND_SERVER + action_name, formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                    content_name:content_name,
                }
                //詳細のセット
                context.commit('switch_content', payload);
            });
        },
        //フォローの切り替え
        toggle_follow(context, index){
            var id = context.state.follows[index].id;
            var following = context.state.follows[index].following;
            //POSTデータ
            var formData = new FormData();
            formData.append('PosterId', id);
            formData.append('UserId', this.state.userInfo.id);
            //コールバック転送データ
            var payload = {
                following: following,
                index: index,
            }

            if(following){
                axios
                .post(this.state.config.SECOND_SERVER + '/cancel-follow-json', formData)
                .then(function(){
                    context.commit('toggle_follow', payload);
                });
            }else{
                axios
                .post(this.state.config.SECOND_SERVER + '/follow-json', formData)
                .then(function(){
                    context.commit('toggle_follow', payload);
                });
            }
        },
    },
    mutations: {
        switch_content(state, payload) {
            if(this.state.config.RUN_SYSTEM_MODE == this.state.config.SYSTEM_MODE_BOTH){
                //統合モード
                state.show_content = payload.content_name;

                var contentList;
                var followList;
                //セットモード 1=通知 2=動画 3=フォロー/フォロワー
                var mode;
                switch(payload.content_name){
                    case "通知":
                        mode = "1";
                        break;
                    case "投稿":
                        contentList = payload.data.postContentList;
                        mode = "2";
                        break;
                    case "ナルホド":
                        contentList = payload.data.geniusContentList;
                        mode = "2";
                        break;
                    case "履歴":
                        contentList = payload.data.watchContentList;
                        mode = "2";
                        break;
                    case "フォロー中":
                        followList = payload.data.follow;
                        mode = "3";
                        break;
                    case "フォロワー":
                        followList = payload.data.follower;
                        mode = "3";
                        break;
                }
                if(mode == "1"){
                    //通知
                    state.notif = [];
                }else if(mode == "2"){
                    //投稿・ナルホド・履歴
                    var thumbSrc = [];
                    if(contentList != null && contentList.length > 0){
                        contentList.forEach(function(tmpContent){
                            thumbSrc.push(
                                {
                                    src:tmpContent.thumbnailpath,
                                    title:tmpContent.title,
                                    videoID:String(tmpContent.contentid),
                                }
                            );
                        });
                    }
                    state.thumbSrc = thumbSrc;
                }else if(mode == "3"){
                    //フォロー中・フォロワー
                    var follows = [];
                    if(followList != null && followList.length > 0){
                        followList.forEach(function(follow){
                            follows.push(
                                {
                                    image: follow.user.icon,
                                    name: follow.user.username,
                                    id: follow.user.userid,
                                    bio: follow.user.selfintro,
                                    following: follow.follow,
                                }
                            );
                        });
                    }
                    state.follows = follows;
                }
            }else{
                //その他
                state.show_content = payload
            }
        },
        toggle_follow(state, payload) {
            if(this.state.config.RUN_SYSTEM_MODE == this.state.config.SYSTEM_MODE_BOTH){
                //統合モード
                var following = payload.following;
                var index = payload.index;
                state.follows[index].following = !following;
            } else{
                //その他
                state.follows[payload].following = !state.follows[payload].following
            }
        },
        get_profile(state, payload){
            var user = payload.data.user;
            state.id = user.userid;
            state.name = user.username;
            state.bio = user.selfintro;
            state.image = user.icon;
        }
    }
}