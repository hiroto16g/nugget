<template>
    <div class="not-log-in">
        <div class="explain">
            まだログインしていないため<br>
            マイページがありません
        </div>
        <img src="@/assets/login-dog.png" alt="">
        <div class="buttons">
            <router-link to="/make-account">
                <TextButton class="with-color" name="アカウントを作る"></TextButton>
            </router-link>
            <router-link to="/log-in">
                <TextButton name="ログインする"></TextButton>
            </router-link>
        </div>
    </div>
</template>


<style lang="scss">
    .not-log-in {
        .explain {
            font-size: 5vw;
            text-align: center;
            margin-top: 20vh;
        }
        
        img {
            display: block;
            margin: 3vw auto;
            width: 50vw;
        }
        
        .buttons {
            position: absolute;
            bottom: 12vh;
            left: 0;
            right: 0;
            
            .text-button {
                display: block;
                width: 55vw;
                padding: 2vw 0;
                margin: 5vw auto 0;
                color: $normal-color;
                
                &.with-color {
                    color: white;
                }
            }
        }
    }
</style>


<script>
    import TextButton from '@/components/TextButton.vue'
    
    export default {
        components: {
            TextButton
        }
    }
</script>