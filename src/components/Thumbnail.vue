<template>
    <div class="thumbnail">
        <router-link :to="{ name: 'home', params: { id: this.id }}">
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
            id: {
                type: String,
                require: true,
                default: '',
            }
        }
    }

</script>
