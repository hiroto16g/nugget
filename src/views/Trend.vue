<template>
    <div class="trend">
        <div class="search-wrapper sp" :class="{'search': search_flag}">
            <div class="head">
                <input type="search" inputmode="search" class="input-keywords" placeholder="キーワードで検索" @click="click_search" @keyup="keyup_keyword" @keyup.enter="enter_keyword">
                <div class="cancel" @click="clickCancel" v-if="search_flag">
                    キャンセル
                </div>
            </div>
        </div>
        <TrendNormal v-if="!search_flag"></TrendNormal>
        <SearchModal v-else></SearchModal>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
        .trend {
            .search-wrapper {
                padding-top: 5vw;
                background-color: $tabbar;

                .head {
                    display: flex;
                    align-items: center;

                    .input-keywords {
                        display: block;
                        width: 70vw;
                        margin-left: 3vw;
                        padding: 3vw;
                        border: none;
                        border-radius: 2.5vw;
                        background: #f0f0f0;
                        font-size: 3.6vw;
                        color: $normal-color;

                        &::placeholder {
                            font-size: 3.6vw;
                            color: $light-color
                        }

                        &[type="search"]:focus {
                            border: none;
                            outline: none;
                        }

                        &::-webkit-search-cancel-button {
                            -webkit-appearance: none;
                        }
                    }

                    .cancel {
                        font-size: 3.6vw;
                        margin: 0 auto;
                        color: $light-color;
                    }
                }

                &.search {
                    border-bottom: solid thin $border;
                    padding-bottom: 3vw;
                }
            }
        }

    }

    @media screen and (min-width: 768px) {

    }

</style>


<script>
    import TrendNormal from '@/views/TrendNormal.vue'
    import SearchModal from '@/views/SearchModal.vue'
    
    /* eslint-disable no-console */

    export default {
        name: 'trend',
        components: {
            TrendNormal,
            SearchModal
        },
        data() {
            return {
                keywords: ''
            }
        },
        computed: {
            search_flag() {
                return this.$store.state.trend.search_flag
            }
        },
        methods: {
            click_search() {
                this.$store.commit('trend/will_search')

                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    this.$store.dispatch('trend/get_search_history');
                }

            },
            clickCancel() {
                document.getElementsByClassName('input-keywords')[0].value = ''
                this.$store.commit('trend/cancel_search')
            },
            input_keyword() {   //使わないかも・・・keyup_keywordに移植
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    this.$store.dispatch('trend/display_pred', document.getElementsByClassName('input-keywords')[0].value);
                } else{
                    //その他
                    this.$store.commit('trend/display_pred', document.getElementsByClassName('input-keywords')[0].value)
                }
            },
            enter_keyword(){
               if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    this.$router.push('tagged-screen');
                    this.$store.dispatch('tagged_screen/search_normal', document.getElementsByClassName('input-keywords')[0].value);
                } else{
                    //その他
                } 
            },
            keyup_keyword() {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    this.$store.dispatch('trend/display_pred', document.getElementsByClassName('input-keywords')[0].value);
                } else{
                    //その他
                    this.$store.commit('trend/input_keywords', document.getElementsByClassName('input-keywords')[0].value)
                } 
            }
        },
        mounted(){
            if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                //統合モード
                var now_category = this.$store.state.trend.now_category;
                this.$store.dispatch('trend/get_user_recommend', now_category);
                this.$store.dispatch('trend/get_popular', now_category);
                this.$store.dispatch('trend/get_rapid_rise', now_category);
                this.$store.dispatch('trend/get_tags_home');
            }
        }
    }

</script>
