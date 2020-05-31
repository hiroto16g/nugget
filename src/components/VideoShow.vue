<template>
    <div class="video">
        <transition name="slide">
            <video :src="src" ref="video" @ended="end_video" controls playsinline webkit-playsinline autoplay muted></video>
        </transition>
        <transition name="t-overlay" @appear="appear_method">
            <div class="overlay" v-show="!play">
                <IconButton class="left" icon="mdi-chevron-left"></IconButton>
                <IconButton icon="mdi-play"></IconButton>
                <IconButton class="right" icon="mdi-chevron-right"></IconButton>
            </div>
        </transition>
        <div class="prev control-panel" @click="toPrev"></div>
        <div class="play control-panel" @click="togglePlay"></div>
        <div class="next control-panel" @click="toNext"></div>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
        .video {
            position: relative;

            video {
                display: block;
                width: 100vw;
                height: calc(100vw * 4 / 3);
            }

            .t-overlay-enter-active {
                transition: all 0.2s ease;
                opacity: 1;
            }

            .t-overlay-leave-active {
                transition: all 0.2s ease;
                opacity: 0;
            }

            .overlay {
                position: absolute;
                top: 15vw;
                left: 0;
                height: 90vw;
                width: 100vw;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(rgba(0, 0, 0, 0), rgba(100, 100, 100, 0.2), rgba(0, 0, 0, 0));

                .left {
                    margin-right: auto;
                }

                .right {
                    margin-left: auto;
                }

                .icon-button {
                    .mdi {
                        font-size: 15vw;
                        text-shadow: 10px $normal-color;
                        color: white;
                    }
                }
            }

            .control-panel {
                position: absolute;
                top: 15vw;
                height: 90vw;

                &.prev {
                    width: 20vw;
                    left: 0;
                }

                &.play {
                    width: 60vw;
                    left: 20vw;
                }

                &.next {
                    width: 20vw;
                    right: 0;
                }
            }
        }

    }

    @media screen and (min-width: 768px) {

    }

</style>


<script>
    import IconButton from '@/components/IconButton.vue'

    /* eslint-disable no-console */
    
    export default {
        components: {
            IconButton
        },
        props: {
            src: {
                type: String,
                require: false
            },
            keyValue: {
                type: Number,
                require: false
            }
        },
        data() {
            return {
                play: false
            }
        },
        methods: {
            togglePlay() {
                if (this.$refs.video.paused) {
                    this.$refs.video.play()
                } else {
                    this.$refs.video.pause()
                }

                this.play = !this.$refs.video.paused
            },
            toPrev() {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    var video_count = this.$store.state.home.video_count;
                    var videos = this.$store.state.home.videos;
                    if(!(typeof videos[(video_count - 1)] === "undefined")){
                        //前の動画が存在する時
                        var prev_content_id = videos[(video_count - 1)].videoID;
                    
                        this.$store.dispatch('home/init_comment', prev_content_id);
                        this.$store.commit('home/prev_slide')
                        this.$store.dispatch('home/add_watch');
                    }
                } else{
                    //その他
                    this.$store.commit('home/prev_slide')
                }
            },
            toNext() {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    var video_count = this.$store.state.home.video_count;
                    var videos = this.$store.state.home.videos;
                    if(!(typeof videos[(video_count + 1)] === "undefined")){
                        //次の動画が存在する時
                        var next_content_id = videos[(video_count + 1)].videoID;

                        this.$store.dispatch('home/init_comment', next_content_id);
                        this.$store.commit('home/next_slide');
                        this.$store.dispatch('home/add_watch');
                    }
                } else{
                    //その他
                    this.$store.commit('home/next_slide')
                }
            },
            for_appear() {
                this.play = true
            },
            appear_method() {
                setTimeout(this.for_appear, 700)
            },
            end_video() {
                this.$refs.video.currentTime = 0
                this.$refs.video.play()
            }
        }
    }

</script>
