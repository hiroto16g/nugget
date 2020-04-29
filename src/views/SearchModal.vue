<template>
    <div class="search-modal">
        <div class="search-wrapper">
            <InputBar name="keywords"></InputBar>
            <div class="cancel" @click="clickCancel">
                キャンセル
            </div>
        </div>
        
        <div class="history-wrapper" v-if="!$store.state.keywords">
            <div class="wrapper-name">
                検索履歴
            </div>
            <div class="tags">
                <div v-for="(name, i) in choicedTags" :key="i" class="tag" @click="clickTag(name)">
                    <router-link to="/tagged-screen">
                        <Chip :name="name"></Chip>
                    </router-link>
                </div>
            </div>
        </div>
        
        <div class="pred-wrapper" v-else>
            <div class="word" v-for="(w, i) in pred_words" :key="i">
                {{ w }}
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .search-modal {
        .search-wrapper {
            padding: 5vw 0 3vw;
            background-color: #FAFAFA;
            display: flex;
            align-items: center;
            border-bottom: solid thin $border;

            .input-bar {
                width: 70vw;
                margin-left: 3vw;

                input {
                    padding: 3vw;
                    width: calc(100% - 3vw * 2);

                    &[type="text"]:focus {
                        border: none;
                        outline: none;
                    }
                }
            }
            
            .cancel {
                font-size: 3.6vw;
                margin: 0 auto;
                color: $light-color;
            }
        }

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
                color: $normal-color;
                font-size: 4vw;
            }
        }
    }

</style>


<script>
    import InputBar from '@/components/InputBar.vue'
    import Chip from '@/components/Chip.vue'

    export default {
        name: 'search-modal',
        components: {
            InputBar,
            Chip
        },
        data() {
            return {
                keywords: '',
                choicedTags: [
                    '心理学', '教育学', 'ディープラーニング', '社会学', '理学', '英語', '哲学', '経済学', '工学'
                ],
                pred_words: [
                    'apple',
                    'gorilla',
                    'rap',
                    'りんご'
                ]
            }
        },
        methods: {
            clickTag(tag) {
                this.$store.commit('searchByTag', tag)
            },
            clickCancel() {
                this.$store.commit('cancelSearch')
            }
        }
    }

</script>
