<template>
    <div class="home-sp container">
        <div class="slide-wrapper">
            <SlideShow :src="slideSrc[slideCount%2]"></SlideShow>
            <div class="icon-wrapper">
                <IconButton :icon="like.icon" :value="like.value" @ibClick='toggleLike' :class="{'icon-button-selected': isLike}"></IconButton>
                <IconButton :icon="share.icon" :name="share.name"></IconButton>
                <IconButton :icon="comments.icon" :value="comments.value"></IconButton>
            </div>
            <button @click="slideCount++">a</button>
        </div>
        <div class="slide-info-wrapper">
            <div class="title">{{ slideInfo.title }}</div>
            <div class="account-info">
                <AvatarImage :src="slideInfo.nagenusiImage"></AvatarImage>
                <div class="account-name">{{ slideInfo.nagenusiName }}</div>
                <TextButton :class="{'with-color': isntFollow}" @tbClick='toggleFollow' :name="fbText"></TextButton>
            </div>
        </div>
        <div class="thumbnail-wrapper">
            <div class="wrapper-name">おすすめ</div>
            <div class="thumbnails">
                <div v-for="(t, i) in thumbSrc" :key="i" class="item">
                    <Thumbnail :src="t.src" :title="t.title"></Thumbnail>
                </div>
            </div>
        </div>
        <div class="comment-wrapper">
            <div class="wrapper-name">コメント</div>
            <InputBar placeholder="コメントを投稿" v-model="newComment"></InputBar>
            <button @click="postComment">送信</button>
            <div class="comment" v-for="(ci, i) in commentInfo" :key="i">
                <div class="left">
                    <AvatarImage :src="ci.commentatorImage"></AvatarImage>
                </div>
                <div class="right">
                    <div class="commentator">{{ ci.commentatorName}}</div>
                    <div class="text">{{ ci.comment }}</div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 480px) {
        .slide-wrapper {
            width: 100vw;
            margin-bottom: 10px;
            display: inline-block;
            text-align: center;

            video {
                width: 100vw;
                height: calc(100vw * 4 / 3);
            }

            .icon-wrapper {
                font-size: 12px;
                height: 60px;
                margin-top: 12px;
                color: #888;

                .icon-button {
                    width: 25vw;
                    vertical-align: top;

                    &:nth-child(2) .mdi {
                        margin-bottom: -2px;
                    }
                    
                    &:nth-child(3) {
                        margin-top: 1px;
                    }
                }
            }
        }

        .slide-info-wrapper {
            width: 94vw;
            height: 100px;
            margin: 0 3vw;
            display: inline-block;
            border-bottom: solid 1px #ccc;

            .title {
                font-size: 20px;
                margin-bottom: 10px;
                letter-spacing: 0.06em;
            }

            .account-info {
                img {
                    width: 40px;
                    margin-right: 10px;
                    border-radius: 50%;
                    float: left;
                }

                .account-name {
                    font-size: 12px;
                    letter-spacing: 0.03em;
                    float: left;
                }

                .text-button {
                    width: 110px;
                    font-size: 12px;
                    padding: 4px 5px;
                    float: right;
                    margin-top: 7px;
                }

                .with-color {
                    color: #fdfdfd;
                }
            }
        }
        
        .thumbnail-wrapper {
            padding: 5vw 0;
            
            .wrapper-name {
                font-size: 15px;
                margin: 0 0 3vw 3vw;
            }
            
            .thumbnails {
                overflow-x: scroll;
                display: flex;
                
                .thumbnail {
                    margin-left: 1vw;
                }

                .item {
                    &:nth-child(1) {
                        margin-left: 5vw;
                    }
                    
                    &:last-child {
                        padding-right: 5vw;
                    }
                }
            }
        }
        
        .comment-wrapper {
            margin: 0 3vw;
            padding: 5vw 0;
            border-top: solid thin #ccc;
            
            .wrapper-name {
                margin-bottom: 3vw;
            }
            
            .input-bar {
                width: 310px;
                margin: 0 auto 4vw;
            }
            
            .comment {
                display: flex;
                
                .avatar-image {
                    width: 35px;
                }
                
                .right {
                    margin-left: 2vw;
                    
                    .commentator {
                        font-size: 12px;
                        color: #888;
                        margin-bottom: 1.5vw;
                    }
                    
                    .text {
                        font-size: 15px;
                    }
                }
            }
        }
    }
</style>

<script src="js/vue.js"></script>
<script>
    // @ is an alias to /src
    import IconButton from '@/components/IconButton.vue'
    import TextButton from '@/components/TextButton.vue'
    import AvatarImage from '@/components/AvatarImage.vue'
    import Thumbnail from '@/components/Thumbnail.vue'
    import InputBar from '@/components/InputBar.vue'
    import SlideShow from '@/components/SlideShow.vue'
    import axios from 'axios'

    export default {
        name: 'home_sp',
        components: {
            IconButton,
            TextButton,
            AvatarImage,
            Thumbnail,
            InputBar,
            SlideShow
        },
        data() {
            return {
                slideCount: 0,
                slideSrc: [
                ],
                like: {
                    icon: 'mdi-thumb-up-outline',
                    value: null
                },
                share: {
                    icon: 'mdi-link',
                    name: '共有'
                },
                comments: {
                    icon: 'mdi-comment-processing-outline',
                    value: null
                },
                slideInfo: {
                    title: null,
                    nagenusiImage: 'https://cdn.vuetifyjs.com/images/john.jpg',
                    nagenusiName: null,
                    nagenusiId: null
                },
                isLike: null,
                isntFollow: null,
                fbText: null,
                thumbSrc: [
                    /*
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
                    */
                ],
                commentInfo: [
                ], 
                contentId: null,
                newComment: "",
            }
        },
        methods: {
            //ジーニアス切り替え
            toggleLike: function() {
                var self = this;
                var formData = new FormData();
                formData.append('ContentId', self.contentId);
                formData.append('UserId', 'test2');

                if (this.isLike == false) {
                    axios
                    .post('http://localhost:8080/add-genius', formData)
                    .then(function(){
                        self.like.value = Number(self.like.value) + 1;
                        self.isLike = !self.isLike;
                    });
                } else {
                    axios
                    .post('http://localhost:8080/remove-genius', formData)
                    .then(function(){
                        self.like.value = Number(self.like.value) - 1;
                        self.isLike = !self.isLike;
                    });
                }
            },
            //フォロー切り替え
            toggleFollow: function() {
                var self = this;
                var formData = new FormData();
                formData.append('PosterId', self.slideInfo.nagenusiId);
                formData.append('UserId', 'test2');

                this.isntFollow = !this.isntFollow

                if (this.isntFollow) {
                    axios
                    .post('http://localhost:8080/cancel-follow-json', formData)
                    .then(function(){
                        self.fbText = 'フォローする'
                    });
                } else {
                    axios
                    .post('http://localhost:8080/follow-json', formData)
                    .then(function(){
                        self.fbText = 'フォロー中'
                    });
                }
            },
            //コメント送信
            postComment: function(){
                var self = this;

                //仮データ
                var formData = new FormData();
                formData.append('ContentId', self.contentId);
                formData.append('UserId', 'test2');
                formData.append("Text", self.newComment);

                axios
                .post('http://localhost:8080/post-comment', formData)
                .then(function(response){
                    var comment = response.data.detail;
                    //追加コメントの表示
                    self.commentInfo.unshift({
                        commentatorImage: comment.icon,
                        commentatorName: comment.username,
                        comment: comment.text,
                    });
                    //コメント総数の加算
                    self.comments.value++;
                });
            }
        },
        mounted () {

            var self = this;

            //仮データ
            var formData = new FormData();
            //formData.append('ContentId', '1');
            formData.append('ContentId', this.$route.params.id);
            formData.append('UserId', 'test2');

            //コンテンツ取得
            axios
            .post('http://localhost:8080/watch-content-json', formData)
            .then(function (response) {
                var content = response.data.content;
                self.slideSrc[0] = content.contentpath;
                self.like.value = content.genius;
                self.comments.value = content.commentcount;
                self.slideInfo.title = content.title;
                self.slideInfo.nagenusiId = content.posterid;
                self.slideInfo.nagenusiName = content.postername;
                self.slideInfo.nagenusiImage = content.postericon;
                
                response.data.recommend.forEach(function(tmpContent){
                    self.thumbSrc.push({
                        src:tmpContent.thumbnailpath, 
                        title:tmpContent.title,
                    });
                });

                self.isLike = response.data.isgenius;

                self.isntFollow = !response.data.isfollow;
                if (self.isntFollow) {
                    self.fbText = 'フォローする'
                } else {
                    self.fbText = 'フォロー中'
                }

                self.contentId = content.contentid;
            })

            //コメント取得
            axios
            .post('http://localhost:8080/get-comments', formData)
            .then(function (response) {
                var list = response.data.list;

                list.forEach(function(detail){
                    self.commentInfo.push({
                        commentatorImage: detail.icon,
                        commentatorName: detail.username,
                        comment: detail.text,
                    });
                }); 
            })
        }
    }
    
</script>
