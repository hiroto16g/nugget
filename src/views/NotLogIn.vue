<template>
    <div class="not-log-in">
        <img src="@/assets/login-dog.png" alt="">
        <div class="explain">
            まだログインしていないため<br>
            マイページがありません
        </div>
        <div class="buttons">
            <router-link to="/make-account" class="buttons__a">
                <TextButton class="with-color" name="アカウントを作る"></TextButton>
            </router-link>
            <router-link to="/log-in" class="buttons__a">
                <TextButton name="ログインする"></TextButton>
            </router-link>
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
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
                    font-size: 3.6vw;

                    &.with-color {
                        color: white;
                    }
                }
            }
        }
    }

    @media screen and (min-width: 768px) {
        .not-log-in {
            img {
                display: block;
                margin: 150px auto 0;
                width: 200px;
            }

            .explain {
                font-size: 20px;
                text-align: center;
                margin-top: 30px;
                color: $normal-color;
            }

            .buttons {
                display: flex;
                justify-content: space-between;
                margin: 80px auto;
                width: 500px;
                
                .buttons__a {
                    text-decoration: none;
                }

                .text-button {
                    display: block;
                    padding: 11px 30px 10px;
                    margin: 0 auto;
                    color: $normal-color;
                    border-radius: 30px;
                    font-size: 20px;

                    &.with-color {
                        color: white;
                    }
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