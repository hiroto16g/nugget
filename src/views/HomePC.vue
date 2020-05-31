<template>
    <div class="home-pc container">
        <div class="video-and-info">
            <div class="video-wrapper">
                <video :src="video.src"></video>
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
                    <router-link :to="'/my-page/' + video.userID" @click.native="click_user(video.userID)">
                        <AvatarImage :src="video.image"></AvatarImage>
                    </router-link>
                    <router-link :to="'/my-page/' + video.userID" @click.native="click_user(video.userID)" class="account-name">
                        {{ video.name }}
                    </router-link>
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
        </div>

        <div class="thumb-and-comment">
            <div class="thumbnail-wrapper">
                <div class="wrapper-name">おすすめ</div>
                <div class="thumbnails">
                    <div v-for="(t, i) in $store.state.home.recommend_thumbs" :key="i" class="item">
                        <Thumbnail :src="t.src" :title="t.title"></Thumbnail>
                    </div>
                </div>
            </div>

            <div class="comment-wrapper">
                <div class="wrapper-name">
                    コメント：{{ video.n_comments }}
                </div>
                <div class="input-area" v-show="$store.state.userInfo.log_in">
                    <AvatarImage></AvatarImage>
                    <textarea class="input-comment" placeholder="コメントを投稿" @keyup="keyup_comment"></textarea>
                    <IconButton :class="{'can-send': comment}" icon="mdi-send" @click.native="post_comment"></IconButton>
                </div>
                <div class="comment" v-for="(c, i) in comments" :key="i">
                    <div class="left">
                        <router-link :to="'/my-page/' + c.id" @click.native="click_user(c.id)">
                            <AvatarImage :src="c.image"></AvatarImage>
                        </router-link>
                    </div>
                    <div class="right">
                        <router-link :to="'/my-page/' + c.id" @click.native="click_user(c.id)">
                            <div class="commentator">{{ c.name }}</div>
                        </router-link>
                        <div class="text">{{ c.comment }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (min-width: 768px) {
        .home-pc {
            margin: 0 20px;

            .video-and-info {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;

                .video-wrapper {
                    margin: 0 5vw 80px 0;

                    video {
                        width: 450px;
                        height: 600px;
                        object-fit: cover;
                    }
                }

                .video-info-wrapper {
                    width: 450px;
                    height: 600px;

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
                                }
                            }
                        }
                    }
                }
            }
            
            .thumb-and-comment {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                
                .wrapper-name {
                    font-size: 25px;
                    margin-bottom: 10px;
                }
                
                .thumbnail-wrapper {
                    width: 450px;
                    margin-right: 5vw;
                    
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

    export default {
        name: 'home_sp',
        components: {
            IconButton,
            TextButton,
            AvatarImage,
            Thumbnail,
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
                show_detail: false
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
                if (this.$store.state.userInfo.log_in) {
                    this.$store.commit('home/toggle_follow')
                    this.fbText = this.video.this_audience.followed ? 'フォロー中' : 'フォローする'
                }
            },
            keyup_comment() {
                this.comment = document.getElementsByClassName('input-comment')[0].value
            },
            post_comment() {
                this.$store.commit('home/post_comment', this.comment)
                this.comment = ''
                document.getElementsByClassName('input-comment')[0].value = ''
            },
            click_like() {
                this.$store.commit('home/click_like')
            },
            click_user(userID) {
                this.$store.commit('click_user', userID)
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
            }
        }
    }

</script>
