<template>
    <div class="log-in">
        <div class="top">
            ログイン
        </div>
        <div class="contents">
            <div class="id content">
                <div class="title">
                    ユーザーID
                </div>
                <div class="input">
                    <input type="text">
                </div>
            </div>

            <div class="password content">
                <div class="title">
                    パスワード
                </div>
                <div class="input">
                    <input :type="passwordType">
                    <div class="td-button" @click="toggleDisplay">{{ tdText }}</div>
                </div>
            </div>
        </div>
        <div class="submit">
            <router-link to="/my-page">
                <TextButton name="ログインする" class="with-color"></TextButton>
            </router-link>
        </div>
        <div class="forgot">
            <a href="">
                パスワードを忘れた場合はこちら
            </a>
        </div>
    </div>
</template>


<style lang="scss">
    .log-in {
        color: #4d4d4d;

        .top {
            background: #fafafa;
            padding: 5vw 3vw;
            font-size: 4vw;
            border-bottom: solid thin #ccc;
        }

        .contents {
            margin: 20vw 3vw 0;

            .content {
                width: 100%;
                margin-top: 7vw;

                .title {
                    margin-bottom: 0.7vw;
                    font-size: 4vw;
                }

                .input {
                    position: relative;

                    input {
                        border: solid thin #4d4d4d;
                        border-radius: 1vw;
                        padding: 3vw 3vw 2.8vw;
                        width: calc(100% - 3vw * 2);
                        font-size: 4.5vw;
                    }

                    .td-button {
                        font-size: 3.5vw;
                        position: absolute;
                        top: 3.5vw;
                        right: 3vw;
                    }
                }
            }
        }

        .submit {
            text-align: center;
            margin-top: 20vw;

            .text-button {
                padding: 3vw 10vw;

                &.with-color {
                    color: #fbfbfb;
                }
            }
        }
        
        .forgot {
            font-size: 3.6vw;
            margin-top: 10vw;
            text-align: center;
            
            a {
                border-bottom: solid thin $light-color;
                color: $light-color;
                padding-bottom: 0.2vw;
            }
        }
    }

</style>


<script>
    import TextButton from '@/components/TextButton.vue'

    export default {
        components: {
            TextButton
        },
        data() {
            return {
                isDisplay: false,
                passwordType: 'password',
                tdText: '表示'
            }
        },
        methods: {
            toggleDisplay() {
                this.isDisplay = !this.isDisplay
                if (this.isDisplay) {
                    this.passwordType = 'text'
                    this.tdText = '非表示'
                } else {
                    this.passwordType = 'password'
                    this.tdText = '表示'
                }
            }
        }
    }

</script>
