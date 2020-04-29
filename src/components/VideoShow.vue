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
        
/*
        .slide-enter-active {
            transition: transform 1s;
        }

        .slide-enter {
            transform: translateX(110vw);
        }

        .slide-leave-active {
            transform: translateX(-100vw);
            transition: transform 1s;
            z-index: -101;
        }
*/
        
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
                this.$store.commit('prev_slide')
            },
            toNext() {
                this.$store.commit('next_slide')
            }
        }
    }
</script>