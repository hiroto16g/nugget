<template>
    <div class="log-in" :class="{submitting: submitting}">
        <div class="top">
            ログイン
        </div>
        <div class="contents">
            <div class="id content">
                <div class="title">
                    メールアドレス
                </div>
                <div class="input">
                    <input type="text" v-model="$store.state.login.inputs.mail_address">
                </div>
            </div>

            <div class="password content">
                <div class="title">
                    パスワード
                </div>
                <div class="input">
                    <input :type="passwordType" v-model="$store.state.login.inputs.password">
                    <div class="td-button" @click="toggleDisplay">
                        {{ tdText }}
                    </div>
                </div>
            </div>
        </div>
        <div class="error-text">
            {{ login_state.error_text }}
        </div>
        <div class="submit">
            <TextButton name="ログインする" class="with-color" @click.native="click_submit"></TextButton>
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
        color: $normal-color;
        
        &.submitting {
            display: none;
        }

        .top {
            background: #fafafa;
            padding: 5vw 3vw;
            font-size: 4vw;
            border-bottom: solid thin $border;
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
                        border: solid thin $normal-color;
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
        
        .error-text {
            margin: 10vw 4vw 0;
            text-align: center;
            font-size: 3.2vw;
            color: $attention-color;
            display: none;
            
            &.error {
                display: block;
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
            font-size: 3.2vw;
            margin-top: 10vw;
            text-align: center;
            
            a {
                border-bottom: solid thin $border;
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
                passwordType: 'password',
                tdText: '表示',
            }
        },
        computed: {
            login_state() {
                return this.$store.state.login
            },
            submitting() {
                return this.$store.state.login.submitting
            }
        },
        methods: {
            toggleDisplay() {
                if (this.passwordType == 'password') {
                    this.passwordType = 'text'
                    this.tdText = '非表示'
                } else {
                    this.passwordType = 'password'
                    this.tdText = '表示'
                }
            },
            click_submit() {
                this.$store.commit('login/click_submit')
            }
        },
        watch: {
            submitting(new_val) {
                if (!new_val) {
                    if (this.login_state.error_text) {
                        this.$router.push('my-page/' + this.$store.state.userInfo.id)
                    }
                }
            }
        }
    }

</script>
