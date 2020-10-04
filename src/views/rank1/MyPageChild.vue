<template>
    <div class="my-page-child">
        <div class="user-info">
            <div class="top">
                <AvatarImage :src="$store.state.mypage.image"></AvatarImage>
                <router-link to="/edit-profile" v-show="this_is_me">
                    プロフィールを変更
                </router-link>
                <IconButton icon="mdi-cog" @click.native="click_open_modal" v-show="this_is_me"></IconButton>
                <div class="modal--bg" v-if="modal_is_open" @click="click_close_modal">
                    <div class="modal">
                        <div class="modal__close" @click="click_close_modal"></div>
                        <div class="modal__main">
                            <div class="m__main__btn log-out" @click="click_log_out">
                                ログアウトする
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="middle">
                <div class="user-name">
                    {{ $store.state.mypage.name }}
                </div>
                <div class="user-id" v-if="this_is_me">
                    @{{ $store.state.mypage.id }}
                </div>
                <div class="user-id" v-else>
                    @{{ $store.state.clicked_userID }}
                </div>
            </div>
            <div class="bottom">
                <div class="bio">
                    {{ $store.state.mypage.bio }}
                </div>
            </div>
        </div>
        <div class="switch-bar">
            <div v-for="(c, i) in contents" :key="i" @click="click_content(c)">
                <div class="item" :class="{'show': $store.state.mypage.show_content == c}">
                    {{ c }}
                </div>
            </div>
        </div>
        <div class="contents">
            <div class="ntf-wrapper" v-if="is_notifications">
                <div class="ntf" v-for="(n, i) in $store.state.mypage.notif" :key="i">
                    <div class="left" @click="click_user_link(n.id)">
                        <AvatarImage :src="n.image"></AvatarImage>
                    </div>
                    <div class="right">
                        <div class="top">
                            <div class="ntfor" @click="click_user_link(n.id)">{{ n.name }}</div>
                            <div class="date">{{ n.date }}</div>
                        </div>
                        <div class="text">{{ n.content }}</div>
                    </div>
                </div>
            </div>
            <div class="follow-wrapper" v-else-if="is_follows">
                <div class="follow" v-for="(f, i) in $store.state.mypage.follows" :key="i">
                    <div class="image" @click="click_user_link(f.id)">
                        <AvatarImage :src="f.image"></AvatarImage>
                    </div>
                    <div class="text">
                        <div class="top">
                            <div class="name" @click="click_user_link(f.id)">{{ f.name }}</div>
                            <div class="id" @click="click_user_link(f.id)">@{{ f.id }}</div>
                            <div class="btn" @click="click_f_btn(i)" :class="{following: f.following}" v-show="this_is_me">
                                {{ fb_text(f.following) }}
                            </div>
                        </div>
                        <div class="bio">{{ f.bio }}</div>
                    </div>
                </div>
            </div>
            <div class="thumbnail-wrapper" v-else>
                <div class="thumbnails">
                    <div v-for="(t, i) in $store.state.mypage.thumbSrc" :key="i" class="item">
                        <Thumbnail :src="t.src" :title="t.title" :videoID="t.videoID"></Thumbnail>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
        .my-page-child {
            .user-info {
                padding: 15vw 5vw 10vw;
                background-color: $tabbar;

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
                        padding: 1vw 5vw;
                        font-size: 3.4vw;
                        border: solid thin $light-color;
                        border-radius: 5vw;
                    }
                    
                    .icon-button {
                        position: absolute;
                        right: 4vw;
                        top: 15vw;
                        color: $normal-color;
                        
                        .mdi {
                            font-size: 5vw;
                        }
                    }
                    
                    .modal--bg {
                        background: rgba(0, 0, 0, 0.2);
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100vw;
                        height: 100vh;
                        display: flex;
                        align-items: bottom;
                        
                        .modal {
                            background: white;
                            width: 100vw;
                            margin: auto auto 0;
                            color: $normal-color;
                            position: relative;
                            border-radius: 5vw;
                            
                            .modal__close {
                                position: absolute;
                                background: rgba(0, 0, 0, 0.2);
                                right: 4vw;
                                top: 2vw;
                                width: 8vw;
                                height: 8vw;
                                border-radius: 50%;
                                cursor: pointer;

                                &::after, &::before {
                                    content: '';
                                    position: absolute;
                                    width: 5vw;
                                    height: 0.5vw;
                                    background: white;
                                    top: 48%;
                                    left: 20%;
                                    
                                }

                                &::after {
                                    transform: rotate(45deg);
                                }

                                &::before {
                                    transform: rotate(-45deg);
                                }
                            }
                            
                            .modal__main {
                                text-align: center;
                                padding: 8vw 0 50vw;
                                
                                .m__main__btn {
                                    display: inline;
                                    font-size: 4vw;
                                    
                                    &.log-out {
                                        color: $attention-color;
                                    }
                                }
                            }
                        }
                    }
                }

                .middle {
                    margin-bottom: 3vw;

                    .user-name {
                        font-size: 5vw;
                        margin-bottom: 0.2vw;
                        color: $normal-color;
                    }

                    .user-id {
                        font-size: 3.4vw;
                        color: $light-color;
                    }
                }

                .bottom {
                    text-align: center;

                    .bio {
                        text-align: left;
                        font-size: 3.6vw;
                        color: $normal-color;
                    }

                    .icon-button {
                        margin: auto;
                        color: #888;
                    }
                }
            }

            .switch-bar {
                font-size: 4vw;
                color: #888;
                display: flex;
                border-top: solid thin $border;
                overflow-x: scroll;

                .item {
                    padding: 1.5vw 5.5vw 1.6vw;
                    white-space: nowrap;
                    border-bottom: solid thin $border;

                    &.show {
                        color: $normal-color;
                        font-weight: 400;
                        border-bottom: solid thin $brand-color;
                    }
                }

                &:first-child {
                    padding-left: 5vw;
                }
            }

            .contents {
                padding: 5vw 0;

                .ntf-wrapper {
                    margin: 0 4vw;

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

                .follow-wrapper {
                    .follow {
                        display: flex;
                        margin: 5.5vw 4vw;

                        .image {
                            margin-right: 1.5vw;

                            .avatar-image {
                                width: 12vw;
                            }
                        }

                        .text {
                            .top {
                                display: grid;
                                grid:
                                    "name btn"4vw "id   btn"4vw / 1fr 28vw;
                                grid-row-gap: 1vw;
                                grid-column-gap: 3vw;

                                .name {
                                    grid-area: name;
                                    font-size: 3.4vw;
                                    color: $normal-color;
                                    font-weight: 400;
                                }

                                .id {
                                    grid-area: id;
                                    font-size: 3.2vw;
                                    color: $light-color;
                                }

                                .btn {
                                    grid-area: btn;
                                    margin: auto;
                                    background: $brand-color;
                                    color: white;
                                    width: 100%;
                                    text-align: center;
                                    border-radius: 1.5vw;
                                    padding: 1vw 0;
                                    font-size: 3vw;

                                    &.following {
                                        background: white;
                                        color: $normal-color;
                                        border: solid thin $border;
                                    }
                                }
                            }

                            .bio {
                                font-size: 3.6vw;
                                color: $normal-color;
                                margin-top: 1.2vw;
                            }
                        }
                    }
                }

                .thumbnail-wrapper {
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

    }

    @media screen and (min-width: 768px) {
        .my-page-child {
            padding-left: 210px;
            position: relative;

            .user-info {
                .top {
                    display: flex;
                    align-items: flex-end;

                    .avatar-image {
                        width: 150px;
                    }

                    a {
                        color: $light-color;
                        border: solid thin $light-color;
                        text-decoration: none;
                        padding: 5px 15px;
                        margin: 0 0 10px 20px;
                        border-radius: 20px;
                    }

                    .icon-button {
                        font-size: 28px;
                        margin: 0 0 10px 15px;
                    }
                    
                    .modal--bg {
                        background: rgba(0, 0, 0, 0.2);
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100vw;
                        height: 100vh;
                        
                        .modal {
                            background: white;
                            width: 400px;
                            margin: 20vh auto 0;
                            color: $normal-color;
                            position: relative;
                            border-radius: 5px;
                            
                            .modal__close {
                                position: absolute;
                                background: rgba(0, 0, 0, 0.2);
                                right: 2px;
                                top: 2px;
                                width: 35px;
                                height: 35px;
                                border-radius: 50%;
                                cursor: pointer;

                                &::after, &::before {
                                    content: '';
                                    position: absolute;
                                    width: 21px;
                                    height: 2px;
                                    background: white;
                                    top: 17px;
                                    right: 7px;
                                }

                                &::after {
                                    transform: rotate(45deg);
                                }

                                &::before {
                                    transform: rotate(-45deg);
                                }
                            }
                            
                            .modal__main {
                                padding: 45px 30px 20px;
                                text-align: center;
                                
                                .m__main__btn {
                                    cursor: pointer;
                                    
                                    &.log-out {
                                        color: $attention-color;
                                    }
                                }
                            }
                        }
                    }
                }

                .middle {
                    position: absolute;
                    top: 10px;
                    left: calc(210px + 150px + 20px);
                    white-space: nowrap;

                    .user-name {
                        font-size: 25px;
                        color: $normal-color;
                        text-overflow: ellipsis;
                        -webkit-text-overflow: ellipsis;
                    }

                    .user-id {
                        font-size: 15px;
                        color: $light-color;
                    }
                }

                .bottom {
                    font-size: 18px;
                    margin-top: 20px;
                }
            }

            .switch-bar {
                display: inline-block;
                font-size: 18px;
                padding: 0 30px 0 30px;
                margin-top: 43px;
                position: fixed;
                top: 139px;
                left: calc(8vw + 103px);

                .item {
                    padding: 5px 15px;
                    display: inline-block;
                    color: $light-color;
                    border-radius: 30px;
                    cursor: pointer;
                    margin: 5px 0;

                    &.show {
                        background: $brand-color;
                        color: white;
                    }
                }
            }

            .contents {
                margin-top: 80px;
                width: calc(65vw - 150px);
                max-width: 900px;

                .ntf-wrapper {
                    .ntf {
                        display: flex;
                        margin-bottom: 30px;

                        .left {
                            .avatar-image {
                                width: 60px;
                            }
                        }

                        .right {
                            margin-left: 10px;
                            width: calc(65vw - 150px - 70px);
                            max-width: 900px;

                            .top {
                                display: flex;
                                align-items: center;
                                margin-bottom: 3px;

                                .date {
                                    margin-left: auto;
                                    font-size: 14px;
                                    color: $light-color;
                                }
                            }
                        }
                    }
                }

                .follow-wrapper {
                    .follow {
                        display: flex;
                        margin-bottom: 30px;

                        .image {
                            .avatar-image {
                                width: 60px;
                            }
                        }

                        .text {
                            margin-left: 10px;
                            width: calc(100% - 60px - 10px);

                            .top {
                                display: grid;
                                grid:
                                    "name btn"22px "id   btn"16px / 1fr 155px;
                                grid-row-gap: 3px;
                                grid-column-gap: 10px;
                                white-space: nowrap;

                                .name {
                                    grid-area: name;
                                    font-size: 18px;
                                    color: $normal-color;
                                    font-weight: 400;
                                    text-overflow: ellipsis;
                                    -webkit-text-overflow: ellipsis;
                                }

                                .id {
                                    grid-area: id;
                                    font-size: 14px;
                                    color: $light-color;
                                }

                                .btn {
                                    grid-area: btn;
                                    margin: auto;
                                    background: $brand-color;
                                    color: white;
                                    width: 100%;
                                    text-align: center;
                                    border-radius: 5px;
                                    padding: 8px 0;
                                    font-size: 18px;

                                    &.following {
                                        background: white;
                                        color: $normal-color;
                                        border: solid thin $border;
                                    }
                                }
                            }

                            .bio {
                                font-size: 18px;
                                color: $normal-color;
                                margin-top: 5px;
                            }
                        }
                    }
                }

                .thumbnail-wrapper {
                    width: calc(65vw - 150px);
                    max-width: 900px;
                    color: $normal-color;

                    .recommend-name {
                        font-size: 18px;
                    }

                    .thumbnails {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 30px;

                        .thumbnail {
                            font-size: 15px;
                            margin-bottom: 15px;

                            img {
                                width: calc((65vw - 150px) / 3.02);
                                max-width: calc(900px / 3.02);
                                height: calc((65vw - 150px) / 3.02 / 3 * 4);
                                max-height: calc(900px / 3.02 / 3 * 4);
                            }
                        }
                    }
                }
            }
        }
    }

</style>


<script>
    import AvatarImage from '@/components/AvatarImage.vue'
    import IconButton from '@/components/IconButton.vue'
    import Thumbnail from '@/components/Thumbnail.vue'
    //    import BaseModal from '@/components/BaseModal.vue'

    export default {
        components: {
            AvatarImage,
            IconButton,
            Thumbnail,
            //            BaseModal
        },
        data() {
            return {
                modal_is_open: false
            }
        },
        computed: {
            is_notifications() {
                return this.$store.state.mypage.show_content === '通知'
            },
            is_follows() {
                return this.$store.state.mypage.show_content === 'フォロー中' || this.$store.state.mypage.show_content === 'フォロワー'
            },
            this_is_me() {
                return this.$store.state.userInfo.id == this.$store.state.clicked_userID
            },
            contents() {
                if (this.$store.state.userInfo.id == this.$store.state.clicked_userID) {
                    return ['通知', '投稿', 'ナルホド', '履歴', 'フォロー中', 'フォロワー']
                } else {
                    return ['投稿', 'ナルホド', 'フォロー中', 'フォロワー']
                }
            },
        },
        methods: {
            click_content(content_name) {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    this.$store.dispatch('mypage/switch_content', content_name)
                }else{
                    //その他
                    this.$store.commit('mypage/switch_content', content_name)
                }
            },
            click_f_btn(i) {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    this.$store.dispatch('mypage/toggle_follow', i)
                }else{
                    //その他
                    this.$store.commit('mypage/toggle_follow', i)
                }
            },

            fb_text(following) {
                return following ? 'フォロー中' : 'フォローする'
            },
            click_open_modal() {
                this.modal_is_open = true
            },
            click_close_modal() {
                this.modal_is_open = false
            },
            click_log_out() {
                this.$store.commit('RESET_VUEX_STATE')
                this.$router.push('/')
            },
            click_user_link(user_id) {
                this.$store.commit('click_user', user_id)
                this.$router.push('/my-page/' + user_id)
            }
        },
        watch: {
            contents() {
                this.$store.commit('mypage/switch_content', this.contents[0])
            }
        },
        created() {
            if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                //統合モード
                this.$store.dispatch('mypage/get_profile');
                this.$store.dispatch('mypage/switch_content', "通知")
            }else{
                //その他
                this.$store.commit('mypage/switch_content', this.contents[0])
            }
        },
        mounted(){
            /*
            if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                //統合モード
                this.$store.dispatch('mypage/get_profile');
                this.$store.dispatch('mypage/switch_content', "通知")
            }
            */
        },
    }

</script>
