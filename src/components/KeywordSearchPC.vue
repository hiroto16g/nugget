<template>
    <div class="keyword-search-pc" v-show="is_display">
        <div class="keyword-search">
            <input class="ksp__input" type="ksp__search" placeholder="キーワードで検索" @keyup="keyup_input" @focus="focus_input" @blur="blur_input">
            <div class="search-btn" @click="click_search_btn">
                検索
            </div>
        </div>
        <div class="modal" :class="{'show-modal': show_modal}">
            <div class="pred" v-if="$store.state.trend.keywords">
                <div class="word" v-for="(word, i) in $store.state.trend.pred_words" :key="i" @click="click_word(word)" @mousedown="mousedown_word(word)">
                    {{ word }}
                </div>
            </div>
            <div class="history" v-else>
                検索履歴
                <div class="words">
                    <div class="word" v-for="(word, i) in $store.state.trend.history" :key="i" @mousedown="mousedown_word(word)">
                        {{ word }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (min-width: 768px) {
        .keyword-search-pc {
            margin: 10px 0 0 calc(3vw + 93px);
            position: relative;
            
            .keyword-search {
                position: relative;
                width: 400px;
                margin: 0 auto;
                
                input {
                    border: solid thin $border;
                    padding: 10px 15px;
                    font-size: 15px;
                    color: $normal-color;
                    border-radius: 5px;
                    width: 400px;

                    ::placeholder {
                        font-size: 15px;
                        color: $light-color;
                    }
                }

                .search-btn {
                    position: absolute;
                    right: -33px;
                    top: 0px;
                    background: #4D4D4D;
                    color: white;
                    padding: 8px 15px;
                    font-size: 15px;
                    border-radius: 0 5px 5px 0;
                    cursor: pointer;
                }
            }
            
            .modal {
                width: 500px;
                position: absolute;
                top: 50px;
                left: 0;
                right: 0;
                margin: auto;
                border-radius: 5px;
                border: solid thin $border;
                padding: 15px 20px;
                background: white;
                z-index: 999;
                display: none;
                color: $normal-color;

                &.show-modal {
                    display: block;
                }
                
                .history {
                    .words {
                        margin: 10px 5px;
                        line-height: 1.8;
                    }
                }
                
                .pred {
                    line-height: 1.8;
                }
                
                .word {
                    cursor: pointer;
                    padding: 3px 11px;

                    &:hover {
                        background: #eee;
                    }
                }
            }
        }
    }

</style>


<script>
    export default {
        data() {
            return {
                show_modal: false
            }
        },
        computed: {
            is_display() {
                const path = this.$route.path;
                if (path === '/make-account') {
                    return false
                } else if (path === '/log-in') {
                    return false
                } else if (path === '/thanks-mkacc') {
                    return false
                } else if (path === '/edit-profile') {
                    return false
                } else if (path === '/not-log-in') {
                    return false
                } else if (path === '/forgot-password') {
                    return false
                } else if (path === '/new-password') {
                    return false
                } else {
                    return true
                }
            }
        },
        methods: {
            keyup_input() {
                this.$store.commit('trend/input_keywords', document.getElementsByClassName('ksp__input')[0].value)
            },
            mousedown_word(word) {
                this.$store.commit('trend/search_by_tag', word)
                this.$router.push('tagged-screen')
            },
            focus_input() {
                this.$store.commit('trend/input_keywords', document.getElementsByClassName('ksp__input')[0].value)
                this.show_modal = true
            },
            blur_input() {
                this.$store.commit('trend/cancel_search')
                this.show_modal = false
            },
            click_search_btn() {
                this.$store.commit('trend/search_by_tag', document.getElementsByClassName('ksp__input')[0].value)
                this.$router.go('/tagged-screen')
            }
        },
        watch: {
            '$route': function(to, from) {
                if (to.path != from.path) {
                    document.getElementsByClassName('ksp__input')[0].value = ''
                    this.blur_input()
                }
            }
        }
    }

</script>
