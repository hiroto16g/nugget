<template>
    <div class="log-in">
        <div class="explain">
            まだログインしていないため<br>
            マイページがありません
        </div>
        <img src="@/assets/login-dog.png" alt="">
        <div class="buttons">
            <TextButton class="with-color" name="アカウントを作る"></TextButton>
            <TextButton name="ログインする"></TextButton>
        </div>
    </div>
</template>


<style lang="scss">
    .log-in {
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
                width: 50vw;
                padding: 2vw 0;
                margin: 5vw auto 0;
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