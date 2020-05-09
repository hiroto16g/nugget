<template>
    <div class="video">
        <transition name="slide">
            <video :src="src" ref="video" controls playsinline webkit-playsinline autoplay muted></video>
        </transition>
        <div class="overlay" v-show="!play">
            <IconButton class="left" icon="mdi-chevron-left"></IconButton>
            <IconButton icon="mdi-play"></IconButton>
            <IconButton class="right" icon="mdi-chevron-right"></IconButton>
        </div>
        <div class="prev control-panel" @click="toPrev"></div>
        <div class="play control-panel" @click="togglePlay"></div>
        <div class="next control-panel" @click="toNext"></div>
    </div>
</template>


<style lang="scss">
    .video {
        position: relative;
        
        video {
            display: block;
            width: 100vw;
            height: calc(100vw * 4 / 3);
        }
        
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            height: calc(100vw * 4 / 3 - 23vw);
            width: 100vw;
            background: linear-gradient(rgba(10, 10, 10, 0.2), rgba(10, 10, 10, 0));
            display: flex;
            align-items: center;
            justify-content: center;
            
            .left {
                margin-right: auto;
            }
            
            .right {
                margin-left: auto;
            }
            
            .icon-button {
                color: rgba(255, 255, 255, 0.9);
                
                .mdi {
                    font-size: 15vw;
                }
            }
        }
        
        .control-panel {
            position: absolute;
            top: 0;
            height: calc(100vw * 4 / 3 - 23vw);
            
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
                play: true
            }
        },
        methods: {
            togglePlay() {
                var video = this.$refs.video
                
                if (video.paused) {
                    video.play()
                } else {
                    video.pause()
                }
                
                this.play = !this.play
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
                    }
                } else{
                    //その他
                    this.$store.commit('home/next_slide')
                }
            }
        }
    }
</script>