<template>
    <div class="home-pc container">
        <div class="video-and-info">
            <div class="video-wrapper">
                <video :src="video.src" controls playsinline webkit-playsinline></video>
            </div>

            <div class="video-info-wrapper">
                <div class="title" @click="click_detail_btn">
                    {{ video.title }}
                    <IconButton class="detail-btn" icon="mdi-chevron-down" :class="{rotate: show_detail}"></IconButton>
                </div>
                <div class="views">
                    再生回数：{{ video.n_views }} 回
                </div>
                <div class="account-info">
                    <div @click="click_user(video.userID)" class="btn">
                        <AvatarImage :src="video.image"></AvatarImage>
                    </div>
                    <div @click="click_user(video.userID)" class="account-name btn">
                        {{ video.name }}
                    </div>
                    <TextButton :class="{'with-color': !video.this_audience.followed}" @tbClick='click_follow' :name="fbText"></TextButton>
                    <PromoteLoginModal v-show="show_follow_modal" do_text="このユーザーをフォロー" @click_PLM_close="toggle_SFM"></PromoteLoginModal>
                </div>
                <div class="video-detail" v-show="show_detail">
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
        </div>

        <div class="thumb-and-comment">
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
                    <textarea class="input-comment" placeholder="コメントを投稿" @keyup="keyup_comment"></textarea>
                    <IconButton :class="{'can-send': comment}" icon="mdi-send" @click.native="post_comment"></IconButton>
                </div>
                <div class="comment" v-for="(c, i) in comments" :key="i">
                    <div class="left">
                        <div @click="click_user(c.id)" class="btn">
                            <AvatarImage :src="c.image"></AvatarImage>
                        </div>
                    </div>
                    <div class="right">
                        <div @click="click_user(c.id)" class="btn">
                            <div class="commentator">{{ c.name }}</div>
                        </div>
                        <div class="text">{{ c.comment }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (min-width: 768px) {
        @keyframes rotate_0_180 {
            0% {
                transform: rotate(0);
            }
            100% {
                transform: rotate(180deg);
            }
        }
        
        @keyframes rotate_180_0 {
            0% {
                transform: rotate(180deg);
            }
            100% {
                transform: rotate(0);
            }
        }
        
        .home-pc {
            margin: 0 20px;
            
            .btn {
                cursor: pointer;
            }

            .video-and-info {
                display: flex;
                flex-wrap: wrap;
                margin: 0 auto 80px;
                max-width: 950px;
                justify-content: space-around;

                .video-wrapper {
                    // margin: 0 5vw 80px 0;
                    margin-bottom: 25px;

                    video {
                        width: 450px;
                        height: 600px;
                        object-fit: cover;
                    }
                }

                .video-info-wrapper {
                    width: 450px;

                    .title {
                        font-size: 30px;
                        position: relative;
                        width: 400px;
                        line-height: 1.2;
                        margin-bottom: 5px;
                        
                        .detail-btn {
                            position: absolute;
                            right: -45px;
                            top: 0;
                            cursor: pointer;
                            animation: rotate_180_0 0.3s;
                            
                            &.rotate {
                                transform: rotate(180deg);
                                animation: rotate_0_180 0.3s;
                            }
                        }
                    }
                    
                    .views {
                        margin-bottom: 30px;
                        color: $light-color;
                    }

                    .account-info {
                        display: flex;

                        .avatar-image {
                            width: 50px;
                            margin-right: 10px;
                        }

                        .account-name {
                            color: $normal-color;
                            font-size: 15px;
                            text-decoration: none;
                        }

                        .text-button {
                            margin-left: auto;
                            background: $brand-color;
                            border-radius: 5px;
                            color: white;
                            align-self: center;
                            padding: 6px 0 5px;
                            text-align: center;
                            width: 140px;
                        }
                    }
                    
                    .video-detail {
                        .video-category {
                            font-size: 14px;
                            margin: 20px 0 10px;
                            
                            span {
                                border-bottom: solid thin $light-color;
                                color: $light-color;
                                cursor: pointer;
                            }
                        }
                        
                        .tag-wrapper {
                            .tags {
                                display: flex;
                                flex-wrap: wrap;
                                margin-bottom: 15px;
                                
                                .tag {
                                    height: 25px;
                                    font-size: 14px;
                                    padding: 5px 15px 2px;
                                    border: solid thin #ccc;
                                    border-radius: 20px;
                                    white-space: nowrap;
                                    vertical-align: middle;
                                    display: flex;
                                    align-items: center;
                                    color: $normal-color;
                                    margin-right: 5px;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
            }
            
            .thumb-and-comment {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                max-width: 950px;
                margin: 0 auto;
                
                .wrapper-name {
                    font-size: 25px;
                    margin-bottom: 10px;
                }
                
                .thumbnail-wrapper {
                    width: 450px;
                    
                    .thumbnails {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        
                        .thumbnail {
                            width: 224px;
                            margin-bottom: 40px;

                            img {
                                width: 224px;
                                height: calc(224px / 3 * 4);
                            }
                        }
                    }
                }
                
                .comment-wrapper {
                    width: 450px;
                    
                    .avatar-image {
                        width: 45px;
                    }
                    
                    .input-area {
                        display: flex;
                        align-items: center;
                        margin-bottom: 30px;
                        
                        .input-comment {
                            width: 310px;
                            margin: auto;
                            border-radius: 10px;
                            padding: 5px 10px;
                            font-size: 15px;
                            
                            ::placeholder {
                                font-size: 15px;
                            }
                        }
                        
                        .icon-button {
                            margin-left: auto;
                            
                            .mdi {
                                font-size: 25px;
                            }
                        }
                    }
                    
                    .comment {
                        display: flex;
                        margin-bottom: 25px;
                        
                        .left {
                            margin-right: 16px;
                        }
                        
                        .right {
                            margin-top: 3px;
                            a {
                                font-size: 12px;
                                color: $light-color;
                                text-decoration: none;
                            }
                            
                            .text {
                                font-size: 15px;
                                color: $normal-color;
                                margin-top: 3px;
                            }
                        }
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
    import PromoteLoginModal from '@/components/PromoteLoginModal.vue'

    export default {
        name: 'home_sp',
        components: {
            IconButton,
            TextButton,
            AvatarImage,
            Thumbnail,
            PromoteLoginModal
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
                show_follow_modal: false
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
            click_follow() {
                if (this.$store.state.userInfo.log_in) {
                    this.$store.commit('home/toggle_follow')
                    this.fbText = this.video.this_audience.followed ? 'フォロー中' : 'フォローする'
                } else {
                    this.toggle_SFM();
                }
            },
            */
            keyup_comment() {
                this.comment = document.getElementsByClassName('input-comment')[0].value
            },
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
            /*
            post_comment() {
                this.$store.commit('home/post_comment', this.comment)
                this.comment = ''
                document.getElementsByClassName('input-comment')[0].value = ''
            },
            */
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
            /*
            click_like() {
                this.$store.commit('home/click_like')
            },
            */
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
            toggle_SFM() {
                this.show_follow_modal = !this.show_follow_modal
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
