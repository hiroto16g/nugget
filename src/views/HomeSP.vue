<template>
    <div class="home-sp container">
        <div class="slide-wrapper">
            <VideoShow :src="video.src"></VideoShow>
            <div class="icon-wrapper">
                <IconButton class="like" :icon="icons.like.icon" :value="video.n_likes" @ib_click="click_like" :class="{'with-color': video.this_audience.liked}" ></IconButton>
                <IconButton class="comment" :icon="icons.comments.icon" :value="video.n_comments"></IconButton>
                <IconButton class="share" :icon="icons.share.icon" :name="icons.share.name"></IconButton>
            </div>
        </div>
        
        <div class="slide-info-wrapper">
            <div class="title">{{ video.title }}</div>
            <div class="account-info">
                <AvatarImage :src="video.image"></AvatarImage>
                <div class="account-name">{{ video.name }}</div>
                <TextButton :class="{'with-color': !video.this_audience.followed}" @tbClick='click_follow' :name="fbText"></TextButton>
            </div>
        </div>
        
        <div class="thumbnail-wrapper">
            <div class="wrapper-name">おすすめ</div>
            <div class="thumbnails">
                <div v-for="(t, i) in $store.state.home.recommend_thumbs" :key="i" class="item">
                    <Thumbnail :src="t.src" :title="t.title"></Thumbnail>
                </div>
            </div>
        </div>
        
        <div class="comment-wrapper">
            <div class="wrapper-name">コメント</div>
            <textarea class="input-comment" placeholder="コメントを投稿" @change="change_comment" v-model="comment"></textarea>
            <div class="comment" v-for="(c, i) in comments" :key="i">
                <div class="left">
                    <AvatarImage :src="c.image"></AvatarImage>
                </div>
                <div class="right">
                    <div class="commentator">{{ c.name }}</div>
                    <div class="text">{{ c.comment }}</div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
        .slide-wrapper {
            width: 100vw;
            margin-bottom: 2.5vw;
            display: inline-block;
            text-align: center;

            .icon-wrapper {
                font-size: 3.4vw;
                margin: 3.4vw 0 2vw;
                color: #888;

                .icon-button {
                    width: 25vw;
                    vertical-align: top;

                    &.share .mdi {
                        margin-bottom: -0.6vw;
                    }
                    
                    &.comment {
                        margin-top: 0.1vw;
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
                color: $normal-color;
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
                    color: $normal-color;
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
                font-size: 4vw;
                margin: 0 0 3vw 3vw;
                color: $normal-color;
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
                color: $normal-color;
                font-size: 4vw;
            }
            .input-comment {
                width: 65vw;
                display: block;
                margin: 0 auto 7vw;
                font-size: 3.4vw;
                padding: 3vw;
                border: solid thin $border;
                border-radius: 2.5vw;
                height: 1em;
                color: $normal-color;
                line-height: 1.7;
                
                &::placeholder {
                    font-size: 3.4vw;
                    color: $light-color;
                    line-height: 1;
                }
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


<script>
    // @ is an alias to /src
    import IconButton from '@/components/IconButton.vue'
    import TextButton from '@/components/TextButton.vue'
    import AvatarImage from '@/components/AvatarImage.vue'
    import Thumbnail from '@/components/Thumbnail.vue'
    import VideoShow from '@/components/VideoShow.vue'

    export default {
        name: 'home_sp',
        components: {
            IconButton,
            TextButton,
            AvatarImage,
            Thumbnail,
            VideoShow
        },
        data() {
            return {
                icons: {
                    like: {
                        icon: 'mdi-thumb-up-outline'
                    },
                    share: {
                        icon: 'mdi-link',
                        name: '共有'
                    },
                    comments: {
                        icon: 'mdi-comment-processing-outline'
                    }
                },
                fbText: 'フォローする',
                comment: ''
            }
        },
        computed: {
            video() {
                let home = this.$store.state.home
                return home.videos[home.video_count]
            },
            comments() {
                return this.$store.state.home.comments
            }
        },
        methods: {
            click_follow() {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    this.$store.dispatch('home/toggle_follow');
                } else{
                    //その他
                    if (this.$store.state.userInfo.log_in) {
                        this.$store.commit('home/toggle_follow')
                        this.fbText = this.followed ? 'フォロー中' : 'フォローする'
                    }
                }
            },
            change_comment() {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    this.$store.dispatch('home/post_comment', this.comment);
                } else{
                    //その他
                    this.$store.commit('home/post_comment', this.comment)
                }
            },
            click_like() {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    this.$store.dispatch('home/click_like');
                } else{
                    //その他
                    this.$store.commit('home/click_like');
                }
            }
        }
    }

</script>
