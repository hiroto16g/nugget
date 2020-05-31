<template>
    <div class="thumbnail">
        <router-link :to="{ name: 'home', params: { videoID:this.videoID }}">
            <img :src="src">
            <div class="title">
                {{ title }}
            </div>
        </router-link>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
        .thumbnail {
            width: 36vw;
            float: left;

            a {
                text-decoration: none;

                img {
                    width: 36vw;
                    height: 48vw;
                    border-radius: 5px;
                    object-fit: cover;
                }

                .title {
                    font-size: 3.6vw;
                    color: $normal-color;
                }
            } 
        }
    }
    
    @media screen and (min-width: 768px) {
        .thumbnail {
            display: inline-block;

            a {
                text-decoration: none;

                img {
                    border-radius: 5px;
                    object-fit: cover;
                }

                .title {
                    font-size: 15px;
                    color: $normal-color;
                }
            } 
        }
    }
</style>


<script>
    export default {
        props: {
            src: {
                type: String,
                require: true,
                default: ''
            },
            title: {
                type: String,
                require: true,
                default: 'ここにはスライドのタイトルが入ります'
            },
            videoID: {
                type: String,
                require: true,
                default: '',
            }
        }
    }

</script>
