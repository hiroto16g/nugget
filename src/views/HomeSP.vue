<template>
    <div class="home-sp container">
        <div class="slide-wrapper">
            <VideoShow :src="video.src"></VideoShow>
            <div class="icon-wrapper">
                <IconButton class="like" :icon="icons.like.icon" :value="video.n_likes" @ib_click="click_like" :class="{'with-color': video.this_audience.liked}"></IconButton>
<!--                <IconButton class="comment" :icon="icons.comments.icon" :value="video.n_comments"></IconButton>-->
                <IconButton class="share" :icon="icons.share.icon" :name="icons.share.name"></IconButton>
            </div>
        </div>

        <div class="slide-info-wrapper">
            <div class="title" @click="click_detail_btn">
                {{ video.title }}
                <IconButton class="detail-btn" icon="mdi-chevron-down" :class="{rotate: show_detail}"></IconButton>
            </div>
            <div class="views">
                再生回数：{{ video.n_views }} 回
            </div>
            <div class="account-info">
                <div @click="click_user(video.userID)">
                    <AvatarImage :src="video.image"></AvatarImage>
                </div>
                <div @click="click_user(video.userID)" class="account-name">
                    {{ video.name }}
                </div>
                <TextButton :class="{'with-color': !video.this_audience.followed}" @tbClick='click_follow' :name="fbText"></TextButton>
            </div>
            <div class="video-detail" :class="{show: show_detail}">

                <div class="video-category">
                    カテゴリー：
                    <span class="category-link" @click="click_c_link(video.category)">
                        {{ video.category }}
                    </span>
                </div>
                <div class="tag-wrapper">
                    <div class="tags">
                        <div class="tag" v-for="(t, i) in video.tags" :key="i" @click="click_tag(t)">
                            {{ t }}
                        </div>
                    </div>
                </div>
                <div class="text">
                    {{ video.text }}
                </div>
            </div>
        </div>

        <div class="thumbnail-wrapper">
            <div class="wrapper-name">おすすめ</div>
            <div class="thumbnails">
                <div v-for="(t, i) in $store.state.home.recommend_thumbs" :key="i" class="item">
                    <Thumbnail :src="t.src" :title="t.title" @click.native="click_thumbnail(t.count)"></Thumbnail>
                </div>
            </div>
        </div>

        <div class="comment-wrapper">
            <div class="wrapper-name">
                コメント：{{ video.n_comments }}
            </div>
            <div class="input-area" v-show="$store.state.userInfo.log_in">
                <AvatarImage :src="$store.state.userInfo.image"></AvatarImage>
                <textarea class="input-comment" id="h__c__input-area__input-comment" placeholder="コメントを投稿" @keyup="keyup_comment"></textarea>
                <IconButton :class="{'can-send': comment}" icon="mdi-send" @click.native="post_comment"></IconButton>
            </div>
            <div class="comment" v-for="(c, i) in comments" :key="i">
                <div class="left">
                    <div @click="click_user(c.id)">
                        <AvatarImage :src="c.image"></AvatarImage>
                    </div>
                </div>
                <div class="right">
                    <div @click="click_user(c.id)">
                        <div class="commentator">{{ c.name }}</div>
                    </div>
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
/*                    width: 25vw;*/
                    width: 35vw;
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
            margin: 0 3vw;
            display: inline-block;
            border-bottom: solid thin $border;

            .title {
                font-size: 4.5vw;
                margin-bottom: 0vw;
                letter-spacing: 0.06em;
                color: $normal-color;
                width: 86vw;
                position: relative;

                .detail-btn {
                    position: absolute;
                    right: -8vw;
                    top: -0.3vw;
                    line-height: 1;

                    .mdi {
                        color: $light-color;
                        transition: 0.2s;
                    }

                    &.rotate .mdi {
                        transform: rotate(180deg);
                    }
                }
            }

            .views {
                font-size: 3.2vw;
                color: $light-color;
                margin-bottom: 5vw;
            }

            .account-info {
                display: flex;
                align-items: center;
                padding-bottom: 3vw;

                img {
                    width: 10vw;
                    margin: 0 1.5vw 0 0;
                    border-radius: 50%;
                }

                .account-name {
                    font-size: 3.2vw;
                    letter-spacing: 0.03em;
                    color: $normal-color;
                    align-self: end;
                }

                .text-button {
                    width: 28vw;
                    font-size: 3vw;
                    padding: 1.5vw 0;
                    margin-left: auto;

                    &.with-color {
                        color: white;
                    }
                }
            }

            .video-detail {
                display: none;

                &.show {
                    display: block;
                }

                .video-category {
                    font-size: 3.2vw;
                    margin-top: 5vw;
                    color: $light-color;
                    
                    .category-link {
                        border-bottom: solid thin $border;
                    }
                }

                .tag-wrapper {
                    .tags {
                        font-size: 3.2vw;
                        display: flex;
                        flex-wrap: wrap;
                        margin-top: 5vw;

                        .tag {
                            border: solid thin $border;
                            align-items: center;
                            line-height: 1;
                            padding: 2vw 3vw 1.5vw;
                            border-radius: 4vw;
                            margin: 0 0.5vw 1vw 0;
                            color: $normal-color;
                        }
                    }
                }

                .text {
                    font-size: 3.6vw;
                    color: $normal-color;
                    margin: 5vw 0;
                    line-height: 1.7;
                    letter-spacing: 0.08em;
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

            .input-area {
                display: flex;
                align-items: center;
                margin-bottom: 8vw;

                .avatar-image {
                    width: 9vw;
                    height: 9vw;
                }

                .input-comment {
                    width: 65vw;
                    display: block;
                    margin: 0 4vw 0 2vw;
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

                .icon-button {
                    .mdi {
                        font-size: 6vw;
                        height: 6vw;
                        line-height: 1;
                        color: $light-color;
                    }

                    &.can-send {
                        .mdi {
                            color: $brand-color;
                        }
                    }
                }
            }

            .comment {
                display: flex;
                margin-bottom: 5vw;

                .avatar-image {
                    width: 9vw;
                }

                .right {
                    margin-left: 2vw;

                    .commentator {
                        font-size: 3.4vw;
                        color: #888;
                        margin-bottom: 1.5vw;
                    }

                    .text {
                        font-size: 3.6vw;
                        color: $normal-color;
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
                comment: '',
                show_detail: false,
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
                    if (this.$store.state.userInfo.log_in) {
                        this.$store.dispatch('home/toggle_follow');
                        this.fbText = this.video.this_audience.followed ? 'フォローする' : 'フォロー中'
                    }
                } else{
                    //その他
                    if (this.$store.state.userInfo.log_in) {
                        this.$store.commit('home/toggle_follow')
                        this.fbText = this.video.this_audience.followed ? 'フォロー中' : 'フォローする'
                    }
                }
            },
            /*
            post_comment() {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    this.$store.dispatch('home/post_comment', this.comment);
                } else{
                    //その他
                    this.$store.commit('home/post_comment', this.comment)
                }
            }
            */
            post_comment() {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    this.$store.dispatch('home/post_comment', this.comment);
                    //コメント初期化
                    this.comment = ''
                    document.getElementById('h__c__input-area__input-comment').value = ''
                } else{
                    //その他
                    this.$store.commit('home/post_comment', this.comment)
                    this.comment = ''
                    document.getElementById('h__c__input-area__input-comment').value = ''
                    document.getElementsByClassName('input-comment')[0].value = ''
                }
            },
            keyup_comment() {
                this.comment = document.getElementById('h__c__input-area__input-comment').value
            },
            click_like() {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    if (this.$store.state.userInfo.log_in) {
                        this.$store.dispatch('home/click_like');
                    }
                } else{
                    //その他
                    if (this.$store.state.userInfo.log_in) {
                        this.$store.commit('home/click_like');
                    }
                }
            },
            click_user(userID) {
                this.$store.commit('click_user', userID)
                this.$router.push('/my-page/' + userID)
            },
            click_detail_btn() {
                this.show_detail = !this.show_detail
            },
            click_tag(tag) {
                this.$store.commit('trend/search_by_tag', tag)
                this.$router.push('tagged-screen')
            },
            click_c_link(category) {
                this.$router.push('trend')
                this.$store.commit('trend/switch_category', category)
            },
            click_thumbnail(count){
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード

                    //表示動画の指定
                    this.$store.commit('home/click_thumbnail', count);
                    //視聴回数の加算
                    this.$store.dispatch('home/add_watch');

                    var videoID = this.$store.state.home.videos[this.$store.state.home.video_count].videoID;
                    //コメントの初期化
                    this.$store.dispatch('home/init_comment', videoID);
                    if (this.$store.state.userInfo.log_in) {
                        this.fbText = this.video.this_audience.followed ? 'フォローする' : 'フォロー中'
                    }
                } else{
                    //その他
                }
            }
        }
    }

</script>
