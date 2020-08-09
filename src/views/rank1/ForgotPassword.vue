<template>
    <div class="forgot-password">
        <div class="top">
            パスワード再設定の申請
        </div>

        <div class="content">
            <div class="title">
                登録済みのメールアドレス
            </div>
            <div class="input">
                <input type="email" v-model="$store.state.mkacc.inputs.mail_address">
            </div>
        </div>

        <div class="submit">
            <TextButton name="再設定用のURLを送信する" class="with-color" @click.native="click_submit_btn"></TextButton>
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
        .forgot-password {
            .top {
                background: #fafafa;
                padding: 5vw 3vw;
                font-size: 4vw;
                border-bottom: solid thin #ccc;
            }

            .content {
                width: 94vw;
                margin: 40vw auto 0;

                .title {
                    margin-bottom: 0.7vw;
                    font-size: 4vw;
                }

                .input {
                    position: relative;

                    input {
                        border: solid thin $normal-color;
                        border-radius: 1vw;
                        padding: 3vw 3vw 2.8vw;
                        width: calc(100% - 3vw * 2);
                        font-size: 4.5vw;
                    }

                    .td-button {
                        font-size: 3.5vw;
                        position: absolute;
                        top: 0.5vw;
                        right: 3vw;
                        color: $normal-color;
                        padding: 3vw 0;
                    }
                }

                .error-text {
                    font-size: 3.2vw;
                    margin-top: 1vw;
                    color: $attention-color;
                }
            }

            .submit {
                text-align: center;
                margin-top: 20vw;

                .text-button {
                    padding: 3vw 10vw;
                    border-radius: 7vw;

                    &.with-color {
                        color: #fbfbfb;
                    }
                }
            }
        }

    }

    @media screen and (min-width: 768px) {
        .forgot-password {
            color: $normal-color;

            .top {
                background: white;
                padding-left: 50px;
                font-size: 25px;
            }

            .content {
                margin: 100px auto 0;
                width: 500px;

                .title {
                    margin-bottom: 0.7vw;
                    font-size: 4vw;
                }

                .input {
                    position: relative;

                    input {
                        border: solid thin $normal-color;
                        border-radius: 1vw;
                        padding: 3vw 3vw 2.8vw;
                        width: calc(100% - 3vw * 2);
                        font-size: 4.5vw;
                    }

                    .td-button {
                        font-size: 3.5vw;
                        position: absolute;
                        top: 0.5vw;
                        right: 3vw;
                        color: $normal-color;
                        padding: 3vw 0;
                    }
                }

                .error-text {
                    font-size: 3.2vw;
                    margin-top: 1vw;
                    color: $attention-color;
                }
            }

            .submit {
                text-align: center;
                margin-top: 20vw;

                .text-button {
                    padding: 3vw 10vw;
                    border-radius: 7vw;

                    &.with-color {
                        color: #fbfbfb;
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
        },
        methods: {
            click_submit_btn() {
                alert('パスワード再設定用のURLを送信しました')
            }
        }
    }
</script>