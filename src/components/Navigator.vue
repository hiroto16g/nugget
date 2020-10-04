<template>
    <div id="navigator">
        <router-link class="logo" to="/">
            <img src="@/assets/logo.svg" alt="">
            nugget
        </router-link>
        <div class="navs">
            <router-link to="/">ホーム</router-link><br>
            <router-link to="/trend">トレンド</router-link><br>
<!--            <router-link to="/upload-video">投稿</router-link><br>-->
            <router-link :to="this.$store.state.userInfo.log_in ? '/my-page/' + this.$store.state.userInfo.id : '/not-log-in'" @click.native="click_mypage">
                マイページ
            </router-link>
        </div>
    </div>
</template>


<style lang="scss">
    #navigator {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;

        .logo {
            display: flex;
            position: absolute;
            top: 10px;
            left: 50px;
            font-size: 25px;
            align-items: center;
            color: $normal-color;
            text-decoration: none;

            img {
                width: 40px;
                margin-right: 10px;
            }
        }
        
        .navs {
            background-color: $tabbar;
            height: 100vh;
            display: inline-block;
            border-right: solid thin $border;
            padding: 100px calc(4vw - 20px) 0 calc(4vw - 20px);
            font-size: 18px;

            a {
                font-weight: bold;
                color: $light-color;
                text-decoration: none;
                display: inline-block;
                margin-bottom: 20px;
                border-radius: 30px;
                padding: 8px 20px;
                margin: 0 auto;

                &.router-link-exact-active {
                    color: $tabbar;
                    background: $normal-color;
                }
            }
        }
    }

</style>


<script>
    export default {
        methods: {
            click_mypage() {
                this.$store.commit('click_user', this.$store.state.userInfo.id)
            }
        }
    }
</script>
