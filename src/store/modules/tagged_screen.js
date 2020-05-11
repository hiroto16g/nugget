import axios from 'axios'

/* eslint-disable no-console */

//仮置き
var user_id = 'snack-pesto-clots';

export default {
    namespaced: true,
    
    state: {
        recommends: [
            {
                image: require('@/assets/thumbs/3d.png'),
                title: 'ここにはスライドのタイトルが入ります'
            },
            {
                image: require('@/assets/thumbs/biseki.png'),
                title: 'ここにはスライドのタイトルが入ります'
            },
            {
                image: require('@/assets/thumbs/flow.png'),
                title: 'ここにはスライドのタイトルが入ります'
            },
            {
                image: require('@/assets/thumbs/kondo.png'),
                title: 'ここにはスライドのタイトルが入ります'
            },
            {
                image: require('@/assets/thumbs/napo.jpg'),
                title: 'ここにはスライドのタイトルが入ります'
            },
            {
                image: require('@/assets/thumbs/neko.png'),
                title: 'ここにはスライドのタイトルが入ります'
            },
            {
                image: require('@/assets/thumbs/saigo.jpg'),
                title: 'ここにはスライドのタイトルが入ります'
            },
            {
                image: require('@/assets/thumbs/shizensu.png'),
                title: 'ここにはスライドのタイトルが入ります'
            },
            {
                image: require('@/assets/thumbs/sonshi.jpg'),
                title: 'ここにはスライドのタイトルが入ります'
            },
            {
                image: require('@/assets/thumbs/yousho.png'),
                title: 'ここにはスライドのタイトルが入ります'
            }
        ]
    },
    actions:{
        //タグ検索
        search_by_tag(context, tag){
            //POSTデータ
            var formData = new FormData();
            formData.append('UserId', user_id);
            formData.append('Tag', tag);
            //タグ検索
            axios
            .post('http://localhost:8080/search-by-tag', formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                }
                //タグ検索のセット
                context.commit('search', payload);
            });
        },
        //通常検索
        search_normal(context, keyword) {
            //POSTデータ
            var formData = new FormData();
            formData.append('Keyword', keyword);
            formData.append('UserId', user_id);
            //検索結果の取得
            axios
            .post('http://localhost:8080/search-content-json', formData)
            .then(function (response) {
                var payload = {
                    data:response.data,
                    keyword: keyword,
                }
                //検索結果のセット
                context.commit('search', payload);
            });
        }
    },
    mutations: {
        search(state, payload) {
             var recommends = [];
             payload.data.forEach(function(tmpContent){
                 recommends.push(
                     {
                         image:tmpContent.thumbnailpath,
                         title:tmpContent.title,
                         videoID:tmpContent.contentid,
                     }
                 );
             });

             state.recommends = recommends;
         }
    }
}