<template>
    <div class="make-account">
        <div class="top">
            アカウントの作成
        </div>

        <div class="contents">
            <div class="name content">
                <div class="title">
                    表示名
                </div>
                <div class="input">
                    <input type="text" class="ep__name" @keyup="keyup_name">
                </div>
                <div class="error-text">
                    {{ error_texts.name }}
                </div>
            </div>

            <div class="password content">
                <div class="title">
                    パスワード
                </div>
                <div class="input">
                    <input :type="password_type" v-model="$store.state.mkacc.inputs.password">
                    <div class="td-button" @click="toggleDisplay">
                        {{ db_text }}
                    </div>
                </div>
                <div class="hint">
                    半角英数字で8文字以上にしてください
                </div>
                <div class="error-text">
                    {{ error_texts.password }}
                </div>
            </div>

            <div class="mail-address content">
                <div class="title">
                    メールアドレス
                </div>
                <div class="input">
                    <input type="email" v-model="$store.state.mkacc.inputs.mail_address">
                </div>
                <div class="error-text">
                    {{ error_texts.mail }}
                </div>
            </div>
        </div>

        <div class="note">
            ユーザーIDはアカウント作成後に自動で振り分けられます
        </div>

        <div class="submit">
            <TextButton name="アカウントを作る" class="with-color" @click.native="click_submit_btn"></TextButton>
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
        .make-account {
            color: $normal-color;

            .top {
                background: #fafafa;
                padding: 5vw 3vw;
                font-size: 4vw;
                border-bottom: solid thin #ccc;
            }

            .contents {
                margin: 10vw 3vw 0;

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
                            top: 0.5vw;
                            right: 3vw;
                            color: $normal-color;
                            padding: 3vw 0;
                        }
                    }

                    .hint {
                        font-size: 3.2vw;
                        margin-top: 1vw;
                        color: $light-color;
                    }

                    .error-text {
                        font-size: 3.2vw;
                        margin-top: 1vw;
                        color: $attention-color;
                    }
                }
            }

            .note {
                font-size: 3.6vw;
                padding: 10vw 3vw;
            }

            .submit {
                text-align: center;

                .text-button {
                    padding: 3vw 10vw;
                    border-radius: 7vw;
                    font-size: 3.6vw;

                    &.with-color {
                        color: #fbfbfb;
                    }
                }
            }
        }

    }

    @media screen and (min-width: 768px) {
        .make-account {
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

                    .hint {
                        font-size: 16px;
                        margin-top: 8px;
                        color: $light-color;
                    }

                    .error-text {
                        font-size: 16px;
                        margin-top: 8px;
                        color: $attention-color;
                    }
                }
            }

            .note {
                font-size: 20px;
                padding: 80px 0;
                text-align: center;
            }

            .submit {
                text-align: center;

                .text-button {
                    font-size: 22px;
                    padding: 14px 30px 10px;
                    border-radius: 5px;

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
    import axios from 'axios'

    export default {
        components: {
            TextButton
        },
        data() {
            return {
                password_type: 'password',
                db_text: '表示',
                name: ''
            }
        },
        computed: {
            is_error() {
                return this.$store.state.mkacc.is_error
            },
            error_texts() {
                return this.$store.state.mkacc.error_texts
            }
        },
        methods: {
            toggleDisplay() {
                if (this.password_type == 'password') {
                    this.password_type = 'text'
                    this.db_text = '非表示'
                } else {
                    this.password_type = 'password'
                    this.db_text = '表示'
                }
            },
            keyup_name() {
                this.name = document.getElementsByClassName('ep__name')[0].value
            },
            click_submit_btn() {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    
                    //POSTデータ
                    var formData = new FormData();
                    formData.append('UserName', this.name);
                    formData.append('Password', this.$store.state.mkacc.inputs.password);
                    formData.append('Email', this.$store.state.mkacc.inputs.mail_address);
                    //入力情報送信
                    var callback_this = this;
                    axios
                    .post(this.state.config.SECOND_SERVER + '/make-account-json', formData)
                    .then(function (response) {
                        var error_messages = response.data;

                        if(error_messages.isError == false){
                            //成功
                            callback_this.$router.push('thanks-mkacc')
                        }else{
                            //失敗
                            var error_texts = {
                                name: error_messages.username,
                                password: error_messages.password,
                                mail: error_messages.email,
                            };

                            callback_this.$store.state.mkacc.error_texts = error_texts;
                        }
                    });
                } else{
                    //その他   
                    this.$store.state.mkacc.inputs.name = this.name
                
                    if (this.is_error) {
                        const duration = 100;
                        const interval = 10;
                        const step = -window.scrollY / Math.ceil(duration / interval);
                        const timer = setInterval(() => {
                            window.scrollBy(0, step);

                            if (window.scrollY <= 0) {
                                clearInterval(timer);
                            }

                        }, interval);
                    } else {
                        this.$router.push('thanks-mkacc')
                    }
                }
            }
        }
    }

</script>
