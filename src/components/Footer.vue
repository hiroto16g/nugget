<template>
    <div id="footer">
        <div class="link" v-for="(i, j) in icons" :key="j" @[get_event(i)]="click_mypage">
            <router-link :to="i.url">
                <IconButton :icon="i.icon" :name="i.name"></IconButton>
            </router-link>
        </div>
    </div>
</template>


<style lang="scss">
    #footer {
        width: 100%;
        background-color: #fafafa;
        position: fixed;
        bottom: 0;
        border-top: solid thin #ccc;
        text-align: center;

        .link {
            display: contents;
        }

        a {
            margin: 0 2.8vw;
            font-weight: bold;
            color: $light-color;
            text-decoration: none;

            &.router-link-exact-active {
                .icon-button {
                    .mdi {
                        color: $normal-color;
                    }
                    
                    .text {
                        color: $normal-color;
                    }
                }
            }

            .icon-button {
                width: 20vw;
                font-size: 2.5vw;

                .mdi {
                    margin-bottom: -1.2vw;
                }
            }
        }
    }

    @media screen and (min-height: 701px) {
        #footer {
            height: 7vh;
            height: calc(7vh + env(safe-area-inset-bottom));
        }
    }

    @media screen and (max-height: 700px) {
        #footer {
            height: 55px;
        }
    }

</style>


<script>
    import IconButton from '@/components/IconButton.vue'

    export default {
        components: {
            IconButton
        },
        computed: {
            icons() {
                return [
                    {
                        url: '/',
                        icon: 'mdi-home',
                        name: 'ホーム'
                    },
                    {
                        url: '/trend',
                        icon: 'mdi-magnify',
                        name: 'トレンド'
                    },
                    {
                        url: this.$store.state.userInfo.log_in ? '/my-page/' + this.$store.state.userInfo.id : '/not-log-in',
                        icon: 'mdi-account',
                        name: 'マイページ'
                    }
                ]
            }
        },
        methods: {
            get_event(icon) {
                return icon.name == 'マイページ' ? 'click' : ''
            },
            click_mypage() {
                this.$store.commit('click_user', this.$store.state.userInfo.id)
            }
        }
    }

</script>
