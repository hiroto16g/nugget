<template>
    <div id="navigator">
        <div class="navs">
            <router-link to="/">ホーム</router-link>
            <router-link to="/trend">トレンド</router-link>
            <router-link :to="this.$store.state.userInfo.log_in ? '/my-page/' + this.$store.state.userInfo.id : 'not-log-in'" @click="click_mypage">
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
        
        .navs {
            background-color: $tabbar;
            height: 100vh;
            display: inline-block;
            border-right: solid thin $border;
            padding: 100px 4vw 0 4vw;
            font-size: 18px;

            a {
                font-weight: bold;
                color: $light-color;
                text-decoration: none;
                vertical-align: middle;
                display: block;
                margin-bottom: 20px;

                &.router-link-exact-active {
                    color: $normal-color;
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
