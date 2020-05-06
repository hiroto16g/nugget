<template>
    <div class="tagged-screen">
        <div class="head">
            <div class="back" @click="click_back">
                戻る
            </div>
            <div class="title">
                ＃ {{ tag }}
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
    .tagged-screen {
        .head {
            padding: 3.6vw 3vw 3vw;
            display: flex;
            justify-content: center;
            font-size: 4vw;
            background: $tabbar;
            border-bottom: solid thin $border;
            color: $normal-color;

            .back {
                position: absolute;
                left: 3vw;
                color: $light-color;
            }

            .title {
                text-align: center;
            }
        }

        .thumbnail-wrapper {
            .recommend-name {
                margin: 8vw 0 1.5vw 3vw;
            }
        }
    }

</style>


<script>
    import Thumbnail from '@/components/Thumbnail.vue'

    export default {
        components: {
            Thumbnail
        },
        data() {
            return {
                recommends: [
                    {
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
        computed: {
            tag() {
                return this.$store.state.trend.search_tag
            }
        },
        methods: {
            click_back() {
                this.$router.go(-1)
            }
        }
    }

</script>
