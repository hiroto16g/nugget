<template>
    <div id="footer">
        <div class="link">
            <router-link to="/">
                <IconButton :icon="home.icon" :name="home.name"></IconButton>
            </router-link>
            <router-link to="/search">
                <IconButton :icon="search.icon" :name="search.name"></IconButton>
            </router-link>
            <router-link to="/my-page">
                <IconButton :icon="mypage.icon" :name="mypage.name"></IconButton>
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

        a {
            margin: 0 10px;
            font-weight: bold;
            color: #888;
            text-decoration: none;

            &.router-link-exact-active {
                color: #4d4d4d;
            }
            
            .icon-button {
                width: 20vw;
                font-size: 10px;
                
                .mdi {
                    margin-bottom: -5px;
                }
            }
        }
    }

    @media screen and (min-height: 701px) {
        #footer {
            height: 55px;
            height: calc(55px + env(safe-area-inset-bottom));
        }
    }

    @media screen and (max-height: 700px) {
        #footer {
            height: 50px;
        }
    }

</style>


<script>
    import IconButton from '@/components/IconButton.vue'

    export default {
        components: {
            IconButton
        },
        data() {
            return {
                home: {
                    icon: 'mdi-home',
                    name: 'ホーム'
                },
                search: {
                    icon: 'mdi-magnify',
                    name: 'さがす'
                },
                mypage: {
                    icon: 'mdi-account',
                    name: 'マイページ'
                }
            }
        }
    }

</script>
