<template>
    <div class="thumbnail">
        <router-link :to="{ name: 'home', params: { content_id:this.content_id }}">
            <img :src="src">
            <div class="title">
                {{ title }}
            </div>
        </router-link>
    </div>
</template>


<style lang="scss">
    .thumbnail {
        width: 150px;
        float: left;
        
        a {
            text-decoration: none;
            
            img {
                width: 150px;
                height: 200px;
                border-radius: 5px;
                object-fit: cover;
            }

            .title {
                font-size: 15px;
                color: #4d4d4d;
            }
        } 
    }
    
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
            content_id: {
                type: String,
                require: true,
                default: '',
            }
        }
    }

</script>
