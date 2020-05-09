<template>
    <div class="search-modal">
        <div class="history-wrapper" v-if="!$store.state.trend.keywords">
            <div class="wrapper-name">
                検索履歴
            </div>
            <div class="tags">
                <div v-for="(name, i) in $store.state.trend.history" :key="i" class="tag" @click="clickTag(name)">
                    <router-link to="/tagged-screen">
                        <Chip :name="name"></Chip>
                    </router-link>
                </div>
            </div>
        </div>
        
        <div class="pred-wrapper" v-else>
            <div class="word" v-for="(w, i) in $store.state.trend.pred_words" :key="i" @click="clickTag(w)">
                <router-link to="/tagged-screen">
                    {{ w }}
                </router-link>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .search-modal {
        .history-wrapper {
            margin-top: 8vw;

            .wrapper-name {
                margin: 0 0 1vw 3vw;
                font-size: 3.6vw;
            }

            .tags {
                margin: 0 3vw 0 6vw;
                overflow-x: scroll;
                display: flex;
                flex-wrap: wrap;

                .tag {
                    margin: 0 0.5vw 1vw 0;
                    display: inline-block;
                }
            }
        }
        
        .pred-wrapper {
            margin-top: 5vw;
            
            .word {
                padding: 2vw 8vw;
                font-size: 4vw;
                
                a {
                    color: $normal-color;
                }
            }
        }
    }

</style>


<script>
    import Chip from '@/components/Chip.vue'

    export default {
        name: 'search-modal',
        components: {
            Chip
        },
        methods: {
            clickTag(tag) {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    this.$store.commit('trend/search_by_tag', tag);
                }
                else{
                    this.$store.commit('trend/search_by_tag', tag)
                }
            }
        }
    }

</script>
