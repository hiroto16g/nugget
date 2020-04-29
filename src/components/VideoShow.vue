<template>
    <div class="video">
        <transition name="slide">
                <video :src="src" :key="keyValue" v-toggleplay="play" controls playsinline webkit-playsinline autoplay muted></video>
        </transition>
        <div class="overlay" v-show="!play">
            <IconButton class="left" icon="mdi-chevron-left"></IconButton>
            <IconButton icon="mdi-play"></IconButton>
            <IconButton class="right" icon="mdi-chevron-right"></IconButton>
        </div>
        <div class="control-panel" @click="play=!play"></div>
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
            left: 20vw;
            height: calc(100vw * 4 / 3);
            width: 60vw;
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
        directives: {
            toggleplay(el, binding) {
                binding.value ? el.play() : el.pause();
            }
        }
    }
</script>