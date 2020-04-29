<template>
    <div class="trend-normal">
        <div class="search-wrapper">
            <InputBar placeholder="検索" name="keywords" @click.native="clickInput"></InputBar>
            <div class="categories">
                <div class="category" v-for="(name, i) in categories" :key="i" @click="clickCategory(name)">
                    <div class="item" :class="{'choiced': nowCategory === name}">
                        {{ name }}
                    </div>
                </div>
            </div>
        </div>
        <div class="tag-wrapper" v-if="nowCategory === 'おすすめ'">
            <div class="wrapper-name">
                タグ
            </div>
            <div class="tags">
                <div v-for="(name, i) in choicedTags" :key="i" class="tag" @click="clickTag(name)">
                    <router-link to="/tagged-screen">
                        <Chip :name="name"></Chip>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="thumbnail-wrapper">
            <div v-for="(r, i) in recommends" :key="i">
                <div class="recommend-name">
                    {{ r.head }}
                </div>
                <div class="thumbnails">
                    <div v-for="(t, j) in r.thumbSrc" :key="j" class="item">
                        <Thumbnail :src="t.src" :title="t.title"></Thumbnail>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .trend-normal {
        .search-wrapper {
            padding-top: 5vw;
            background-color: #FAFAFA;

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

            .categories {
                margin: 8px 0 0;
                overflow-x: scroll;
                display: flex;

                .category {
                    display: inline-block;

                    .item {
                        height: 3vw;
                        font-size: 3.4vw;
                        padding: 0.7vw 5vw 0.3vw;
                        white-space: nowrap;
                        vertical-align: middle;
                        display: flex;
                        align-items: center;
                        color: $normal-color;
                        padding-bottom: 2.5vw;
                        border-bottom: solid thin $border;

                        &.choiced {
                            border-bottom: solid thin $brand-color;
                        }
                    }
                }
            }

        }

        .tag-wrapper {
            margin-top: 8vw;

            .wrapper-name {
                margin: 0 0 1vw 3vw;
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

        .thumbnail-wrapper {
            padding: 0 0 5vw;

            .recommend-name {
                margin: 8vw 0 1.5vw 3vw;
            }
        }
    }

</style>


<script>
    import Thumbnail from '@/components/Thumbnail.vue'
    import InputBar from '@/components/InputBar.vue'
    import Chip from '@/components/Chip.vue'

    export default {
        name: 'trend-normal',
        components: {
            Thumbnail,
            InputBar,
            Chip
        },
        data() {
            return {
                keywords: '',
                categories: [
                    'おすすめ',
                    '社会科学',
                    '自然科学',
                    '哲学・心理学',
                    '言語',
                    '工学',
                    '歴史・地理',
                    '文学',
                    '芸術美術'
                ],
                nowCategory: 'おすすめ',
                choicedTags: [
                    '心理学', '教育学', 'ディープラーニング', '社会学', '理学', '英語', '哲学', '経済学', '工学'
                ],
                recommends: [{
                        head: 'おすすめ',
                        thumbSrc: [{
                                src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                                title: 'ここにはスライドのタイトルが入ります'
                            },
                            {
                                src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                                title: 'ここにはスライドのタイトルが入ります'
                            },
                            {
                                src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                                title: 'ここにはスライドのタイトルが入ります'
                            },
                        ]
                    },
                    {
                        head: '人気',
                        thumbSrc: [{
                                src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                                title: 'ここにはスライドのタイトルが入ります'
                            },
                            {
                                src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                                title: 'ここにはスライドのタイトルが入ります'
                            },
                            {
                                src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                                title: 'ここにはスライドのタイトルが入ります'
                            },
                        ]
                    },
                    {
                        head: '急上昇',
                        thumbSrc: [{
                                src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                                title: 'ここにはスライドのタイトルが入ります'
                            },
                            {
                                src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                                title: 'ここにはスライドのタイトルが入ります'
                            },
                            {
                                src: 'https://cdn.vuetifyjs.com/images/cards/store.jpg',
                                title: 'ここにはスライドのタイトルが入ります'
                            },
                        ]
                    },
                ]

            }
        },
        methods: {
            clickCategory(category) {
                this.nowCategory = category
            },
            clickTag(tag) {
                this.$store.commit('searchByTag', tag)
            },
            clickInput() {
                this.$store.commit('willSearch')
            }
        }
    }

</script>
