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
            <router-link to="/forgot-password">
                パスワードを忘れた場合はこちら
            </router-link>
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
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
            }

            .submit {
                text-align: center;
                margin-top: 20vw;

                .text-button {
                    padding: 3vw 10vw;
                    border-radius: 7vw;
                    font-size: 3.6vw;

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

    }


    @media screen and (min-width: 768px) {
        .log-in {
            color: $normal-color;

            .top {
                background: white;
                padding-left: 50px;
                font-size: 25px;
            }

            .contents {
                margin: 100px auto 0;
                width: 500px;

                .content {
                    margin-top: 50px;

                    .title {
                        margin-bottom: 5px;
                        font-size: 22px;
                    }

                    .input {
                        position: relative;

                        input {
                            border: solid thin $normal-color;
                            border-radius: 5px;
                            padding: 15px 15px 10px;
                            width: calc(500px - 15px * 2);
                            font-size: 22px;
                        }

                        .td-button {
                            font-size: 18px;
                            position: absolute;
                            top: 15px;
                            right: 10px;
                            color: $normal-color;
                            cursor: pointer;
                        }
                    }

                    .error-text {
                        font-size: 16px;
                        margin-top: 8px;
                        color: $attention-color;
                    }
                }
            }

            .submit {
                text-align: center;

                .text-button {
                    font-size: 22px;
                    padding: 14px 30px 10px;
                    border-radius: 5px;
                    margin: 80px 0 50px;

                    &.with-color {
                        color: #fbfbfb;
                    }
                }
            }
            
            .forgot {
                text-align: center;
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
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    var mail_address = this.$store.state.login.inputs.mail_address
                    var password = this.$store.state.login.inputs.password
                    var inputs = {
                        mail_address: mail_address,
                        password:password,
                    }
                    this.$store.dispatch('login/click_submit', inputs)
                }else{
                    //その他
                    this.$store.commit('login/click_submit')
                }
            }
        },
        watch: {
            submitting(new_val) {
                if (new_val) {
                //if (!new_val) {
                    //if (this.login_state.error_text) {
                    if (this.login_state.error_text == "") {
                        this.$store.state.clicked_userID = this.$store.state.userInfo.id;
                        this.$router.push('my-page/' + this.$store.state.userInfo.id)
                    }
                }
            }
        }
    }

</script>
