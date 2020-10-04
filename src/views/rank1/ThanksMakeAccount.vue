<template>
    <div class="thanks-make-account">
        <div class="welcome">
            nuggetへようこそ！
            <div class="name">
                {{ user_info.name }} <span>さん</span>
            </div>
        </div>
        
        <div class="sent-mail text">
            <div class="main">
                {{ user_info.mail_address }} にメールをお送りいたしました
            </div>
            <router-link class="fix help" to="/edit-profile">
                入力情報を修正する
            </router-link>
        </div>
        
        <div class="mail-check text">
            <div class="main">
                <span class="top">届いたメールを確認して</span><br>
                <span class="bottom">サクッと知識を身につけましょう！</span>
            </div>
            <div class="resend help" @click="click_resend">
                もう一度送信する
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
        .thanks-make-account {
            text-align: center;
            padding: 20vh 5vw 0;
            line-height: 1.7;
            letter-spacing: 0.08em;
            color: $normal-color;

            .welcome {
                font-size: 5.5vw;

                .name span {
                    font-size: 4.5vw;
                }
            }

            .text {
                font-size: 4.5vw;
                margin-top: 7vw;

                .help {
                    font-size: 3.2vw;
                    margin-top: 1.5vw;
                    color: $light-color;
                    border-bottom: solid thin $border;
                    display: inline-block;
                }
            }

            .mail-check .main span {
                background: $brand-color;
                display: inline-block;

                &.top {
                    padding: 3vw 3vw 1vw;
                    border-radius: 1.5vw 1.5vw 1vw 1vw;
                }

                &.bottom {
                    padding: 3vw 4vw 2.5vw;
                    border-radius: 1.5vw;
                    margin-bottom: 1vw;
                }
            }
        }

    }

    @media screen and (min-width: 768px) {
        .thanks-make-account {
            text-align: center;
            line-height: 1.7;
            letter-spacing: 0.08em;
            color: $normal-color;

            .welcome {
                font-size: 30px;
                margin-top: 100px;

                .name span {
                    font-size: 20px;
                }
            }

            .text {
                font-size: 20px;
                margin-top: 20px;

                .help {
                    font-size: 16px;
                    margin-top: 20px;
                    color: $light-color;
                    border-bottom: solid thin $border;
                    display: inline-block;
                    text-decoration: none;
                }
            }

            .mail-check {
                margin-top: 50px;
                
                .main span {
                    background: $brand-color;
                    display: inline-block;
                    font-size: 22px;

                    &.top {
                        padding: 15px 30px 8px;
                        border-radius: 8px 8px 3px 3px;
                    }

                    &.bottom {
                        padding: 15px 30px 14px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                    }
                }
            }   
        }

    }
</style>


<script>
    import axios from 'axios'
    export default {
        computed: {
            user_info() {
                return this.$store.state.mkacc.inputs
            }
        },
        methods: {
            click_resend() {
                if(this.$store.state.config.RUN_SYSTEM_MODE == this.$store.state.config.SYSTEM_MODE_BOTH){
                    //統合モード
                    //POSTデータ

                    var formData = new FormData();
                    formData.append('Email', this.user_info.mail_address);
                    formData.append('UserName', this.user_info.name);
                    //プロフィールの変更
                    axios
                    .post(this.$store.state.config.SECOND_SERVER + '/respend-email-create-user', formData)
                    .then(function () {
                         alert('メールを送信しました！\n届かない場合はメールアドレスや迷惑設定を確認してください')
                    });
                }else{
                    //その他
                    alert('メールを送信しました！\n届かない場合はメールアドレスや迷惑設定を確認してください')
                }
            }
        }
    }
</script>