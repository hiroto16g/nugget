<template>
    <div class="tagged-screen">
        <div class="fixed">
            <div class="head">
                <div class="back sp" @click="click_back">
                    戻る
                </div>
                <div class="title">
                    ＃ {{ tag }}
                </div>
            </div>
        </div>

        <div class="thumbnails">
            <div v-for="(r, i) in $store.state.tagged_screen.recommends" :key="i"  @click="click_thumb">
                <router-link :to="{ name: 'home', params: { videoID:r.videoID }}">
                    <img class="image" :src="r.image" alt="">
                </router-link>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
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

    }

    @media screen and (min-width: 768px) {
        .tagged-screen {
            .fixed {
                .head {
                    font-size: 30px;
                    color: $normal-color;
                    margin-left: 50px; 
                }
            }
            
            .thumbnails {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                margin: 50px 0 0;

                .image {
                    width: calc((85vw - 92px) / 3.01);
                    height: calc((85vw - 92px) / 3.01 / 3 * 4);
                    object-fit: cover;
                    display: block;
                    margin-bottom: 0.8vw;
                }
            }
        }
    }
    
    @media screen and (min-width: 1051px) {
        .tagged-screen {
            .fixed {
                .head {
                    font-size: 30px;
                    color: $normal-color;
                    margin-left: 50px; 
                }
            }
            
            .thumbnails {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                margin: 50px 0 0;

                .image {
                    width: calc((85vw - 92px) / 4.01);
                    height: calc((85vw - 92px) / 4.01 / 3 * 4);
                    object-fit: cover;
                    display: block;
                    margin-bottom: 0.8vw;
                }
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
            },
            click_thumb() {
                this.$router.push('/')
            }
        }
    }

</script>
