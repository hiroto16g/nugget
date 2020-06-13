<template>
    <div class="trend-normal">
        <div class="categories">
            <div class="category" v-for="(name, i) in $store.state.trend.categories" :key="i" @click="clickCategory(name)">
                <div class="item" :class="{'choiced': $store.state.trend.now_category === name}">
                    {{ name }}
                </div>
            </div>
        </div>
        <div class="tag-wrapper sp" v-if="$store.state.trend.now_category === 'おすすめ'">
            <div class="wrapper-name">
                タグ
            </div>
            <div class="tags">
                <div v-for="(name, i) in $store.state.trend.choiced_tags" :key="i" class="tag" @click="clickTag(name)">
                    <!--<router-link to="/tagged-screen">-->
                        <Chip :name="name"></Chip>
                    <!--</router-link>-->
                </div>
            </div>
        </div>
        <div class="thumbnail-wrapper">
            <div v-for="(r, i) in $store.state.trend.recommends" :key="i">
                <div class="recommend-name">
                    {{ r.head }}
                </div>
                <div class="thumbnails">
                    <div v-for="(t, j) in r.thumbSrc" :key="j" class="item">
                        <Thumbnail :src="t.src" :title="t.title" :videoID="t.videoID"></Thumbnail>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
        .trend-normal {
            .categories {
                overflow-x: scroll;
                display: flex;
                background: $tabbar;

                .category {
                    display: inline-block;

                    .item {
                        font-size: 3.4vw;
                        padding: 2vw 5.5vw;
                        white-space: nowrap;
                        vertical-align: middle;
                        color: $normal-color;
                        border-bottom: solid thin $border;

                        &.choiced {
                            border-bottom: solid thin $brand-color;
                        }
                    }
                }
            }

            .tag-wrapper {
                margin-top: 8vw;

                .wrapper-name {
                    margin: 0 0 1vw 3vw;
                    color: $normal-color;
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

    }

    @media screen and (min-width: 768px) {
        .trend-normal {
            .categories {
                display: inline-block;
                font-size: 18px;
                padding: 0 30px 0 30px;
                margin-top: 43px;
                
                .item {
                    padding: 5px 15px;
                    display: inline-block;
                    color: $light-color;
                    border-radius: 30px;
                    cursor: pointer;
                    margin: 5px 0;
                    
                    &.choiced {
                        background: $brand-color;
                        color: white;
                    }
                }
            }
            
            .thumbnail-wrapper {
                position: absolute;
                top: 98px;
                left: calc(8vw + 300px);
                width: calc(65vw - 150px);
                max-width: 900px;
                color: $normal-color;
                
                .recommend-name {
                    font-size: 18px;
                }
                
                .thumbnails {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 30px;
                    
                    .thumbnail {
                        font-size: 15px;
                        margin-bottom: 15px;
                        
                        img {
                            width: calc((65vw - 150px) / 3.02);
                            max-width: calc(900px / 3.02);
                            height: calc((65vw - 150px) / 3.02 / 3 * 4);
                            max-height: calc(900px / 3.02 / 3 * 4);
                        }
                    }
                }
            }
        }
    }

</style>


<script>
    import Thumbnail from '@/components/Thumbnail.vue'
    import Chip from '@/components/Chip.vue'

    export default {
        name: 'trend-normal',
        components: {
            Thumbnail,
            Chip
        },
        methods: {
            clickCategory(category) {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    this.$store.dispatch('trend/get_user_recommend', category);
                    this.$store.dispatch('trend/get_popular', category);
                    this.$store.dispatch('trend/get_rapid_rise', category);

                    this.$store.commit('trend/switch_category', category)
                }
                else{
                    //その他
                    this.$store.commit('trend/switch_category', category)
                }
            },
            clickTag(tag) {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    
                    this.$router.push('tagged-screen');
                    this.$store.dispatch('tagged_screen/search_by_tag', tag);
                }
                else{
                    //その他
                    this.$store.commit('trend/search_by_tag', tag)
                }
            }
        }
    }

</script>
