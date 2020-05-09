<template>
    <div class="trend">
        <div class="search-wrapper" :class="{'search': search_flag}">
            <div class="head">
                <input type="search" inputmode="search" class="input-keywords" placeholder="キーワードで検索" @click="click_search" v-model="keywords" @input="input_keyword">
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
    .trend {
        .search-wrapper {
            padding-top: 5vw;
            background-color: #FAFAFA;
            
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
                this.$store.commit('trend/cancel_search')
                this.keywords = ''
            },
            input_keyword() {
                this.$store.commit('trend/display_pred', this.keywords)
            }
        },
        mounted(){
            if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                //統合モード
                var now_category = this.$store.state.trend.now_category;
                this.$store.dispatch('trend/get_user_recommend', now_category);
                this.$store.dispatch('trend/get_popular', now_category);
                this.$store.dispatch('trend/get_rapid_rise', now_category);
            }
        }
    }

</script>
