<template>
    <div class="not-log-in">
        <img src="@/assets/login-dog.png" alt="">
        <div class="explain">
            まだログインしていないため<br>
            マイページがありません
        </div>
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
        img {
            display: block;
            margin: 15vh auto 0;
            width: 50vw;
        }
        
        .explain {
            font-size: 5vw;
            text-align: center;
            margin-top: 5vw;
            color: $normal-color;
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
                border-radius: 7vw;
                
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