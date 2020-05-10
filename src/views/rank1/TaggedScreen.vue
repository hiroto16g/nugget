<template>
    <div class="tagged-screen">
        <div class="fixed">
            <div class="head">
                <div class="back" @click="click_back">
                    戻る
                </div>
                <div class="title">
                    ＃ {{ tag }}
                </div>
            </div>
        </div>

        <div class="thumbnails">
            <div v-for="(r, i) in $store.state.tagged_screen.recommends" :key="i">
                <img class="image" :src="r.image" alt="">
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .tagged-screen {
        .fixed {
            .head {
                padding: 3.6vw 3vw 3vw;
                display: flex;
                justify-content: center;
                font-size: 4vw;
                background: $tabbar;
                border-bottom: solid thin $border;
                color: $normal-color;
                position: fixed;
                width: 94vw;
                top: 0;

                .back {
                    position: absolute;
                    left: 3vw;
                    color: $light-color;
                }

                .title {
                    text-align: center;
                }
            }
        }


        .thumbnails {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin: 15vw 0 30vw;

            .image {
                width: calc(100vw / 2.02);
                height: calc(100vw / 2.02 / 3 * 4);
                object-fit: cover;
                display: block;
                margin-bottom: 0.8vw;
            }
        }
    }

</style>


<script>
    export default {
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
