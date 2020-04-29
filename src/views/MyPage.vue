<template>
    <div class="my-page">
        <div class="user-info">
            <div class="top">
                <router-link to="/log-in">ログイン</router-link>
                <AvatarImage :src="icon"></AvatarImage>
                <router-link to="/edit-profile">
                    <TextButton name="プロフィールを変更"></TextButton>
                </router-link>
            </div>
            <div class="middle">
                <div class="user-name">
                    {{ userName }}
                </div>
                <div class="user-id">
                    @{{ userID }}
                </div>
            </div>
            <div class="bottom">
                <div class="bio">
                    {{ bio }}
                </div>
                <IconButton icon="mdi-chevron-down"></IconButton>
            </div>
        </div>
        <div class="switch-bar">
            <div @click="toNotifications" :class="{'show': showContents==='notifications'}">通知</div>
            <div @click="toNageta" :class="{'show': showContents==='nageta'}">投稿</div>
            <div @click="toGenius" :class="{'show': showContents==='genius'}">ジーニアス</div>
            <div @click="toHistory" :class="{'show': showContents==='history'}">履歴</div>
        </div>
        <div class="contents ntf-wrapper" v-if="showContents==='notifications'">
            <div class="ntf" v-for="(n, i) in notifications" :key="i">
                <div class="left">
                    <AvatarImage :src="n.ntforImage"></AvatarImage>
                </div>
                <div class="right">
                    <div class="top">
                        <div class="ntfor">{{ n.ntforName}}</div>
                        <div class="date">{{ n.date }}</div>
                    </div>
                    <div class="text">{{ n.content }}</div>
                </div>
            </div>
        </div>
        <div class="contents thumbnail-wrapper" v-else>
            <div class="thumbnails">
                <div v-for="(t, i) in thumbSrc" :key="i" class="item">
                    <Thumbnail :src="t.src" :title="t.title"></Thumbnail>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .my-page {
        .user-info {
            padding: 15vw 5vw 0;
            background-color: #fafafa;

            .top {
                height: 22vw;
                margin-bottom: 3vw;
                display: flex;
                align-items: center;

                .avatar-image {
                    width: 22vw;
                }

                a {
                    margin-left: auto;
                    color: #888;

                    .text-button {
                        padding: 1vw 5vw;
                        font-size: 3.4vw;
                    }
                }
            }

            .middle {
                margin-bottom: 3vw;

                .user-name {
                    font-size: 5vw;
                    margin-bottom: 0.2vw;
                }

                .user-id {
                    font-size: 3.4vw;
                    color: #888888;
                }
            }

            .bottom {
                text-align: center;

                .bio {
                    text-align: left;
                    font-size: 3.6vw;
                }

                .icon-button {
                    margin: auto;
                    color: #888;
                }
            }
        }

        .switch-bar {
            font-size: 15px;
            padding: 5px 0 4px;
            color: #888;
            display: flex;
            justify-content: space-evenly;
            border-bottom: solid thin #ccc;
            border-top: solid thin #ccc;
            
            .show {
                color: $normal-color;
                font-weight: 400;
            }
        }
        
        .contents {
            &.ntf-wrapper {
                margin: 0 4vw;
                padding: 5vw 0;
                

                .ntf {
                    display: flex;
                    border-bottom: solid thin #ccc;
                    padding: 5vw 0;

                    .avatar-image {
                        width: 10vw;
                    }

                    .right {
                        margin-left: 2vw;
                        width: calc(100vw - 4vw * 2 - 2vw);
                        
                        .top {
                            margin-bottom: 1.5vw;
                            width: 100%;
                            display: flex;
                            
                            .ntfor {
                                font-size: 3.4vw;
                                color: $normal-color;
                            }
                            
                            .date {
                                font-size: 3.4vw;
                                color: $light-color;
                                margin-left: auto;
                            }
                        }

                        .text {
                            font-size: 4vw;
                        }
                    }
                }
            }
            
            &.thumbnail-wrapper {
                padding: 5vw 0;

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
        }
    }

</style>


<script>
    import AvatarImage from '@/components/AvatarImage.vue'
    import TextButton from '@/components/TextButton.vue'
    import IconButton from '@/components/IconButton.vue'
<<<<<<< HEAD
    import axios from 'axios'
=======
    import Thumbnail from '@/components/Thumbnail.vue'
>>>>>>> upstream/master

    export default {
        components: {
            AvatarImage,
            TextButton,
            IconButton,
            Thumbnail
        },
        data() {
            return {
                /*
                userName: 'のび太さんのエッジ',
                userID: 'nobitasedge',
<<<<<<< HEAD
                bio: 'プログラミングとかの入門書って絶対入門じゃないよね。「素人質問で申し訳ないのですが」と同じだよねああああああああああああああああああああああああああああああああああああああああああああああああ'
                */
               icon:null,
               userName:null,
               userID:null,
               bio:null,
=======
                bio: '「素人質問で申し訳ない」の対偶は「お灸をすえる玄人回答」',
                showContents: 'notifications',
                notifications: [
                    {
                        ntforImage: "https://cdn.vuetifyjs.com/images/john.jpg",
                        ntforName: '食べられそうなラー油',
                        date: '2020/3/16(月)',
                        content: '辛いそうで辛くない、ちょっと辛いコメント'
                    },
                    {
                        ntforImage: "https://cdn.vuetifyjs.com/images/john.jpg",
                        ntforName: '食べられそうなラー油',
                        date: '2020/3/16(月)',
                        content: '辛いそうで辛くない、ちょっと辛いコメント'
                    },
                    {
                        ntforImage: "https://cdn.vuetifyjs.com/images/john.jpg",
                        ntforName: '食べられそうなラー油',
                        date: '2020/3/16(月)',
                        content: '辛いそうで辛くない、ちょっと辛いコメント'
                    },
                    {
                        ntforImage: "https://cdn.vuetifyjs.com/images/john.jpg",
                        ntforName: '食べられそうなラー油',
                        date: '2020/3/16(月)',
                        content: '辛いそうで辛くない、ちょっと辛いコメント'
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
                ]
            }
        },
        methods: {
            toNotifications: function() {
                this.showContents = 'notifications'
            },
            toNageta: function() {
                this.showContents = 'nageta'
            },
            toGenius: function() {
                this.showContents = 'genius'
            },
            toHistory: function() {
                this.showContents = 'history'
>>>>>>> upstream/master
            }
        },
        mounted(){
            var self = this;

            //仮データ
            const formData = new FormData();
            formData.append('UserId', 'test2');

            axios
            .post('http://localhost:8080/my-page-json', formData)
            .then(function (response) {
                var user = response.data.user;
                self.icon = user.icon;
                self.userName = user.username;
                self.userID = user.userid;
                self.bio = user.selfintro;
            })
        }
    }
</script>
