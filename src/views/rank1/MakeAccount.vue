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
            <div class="pass-confirm content">
                <div class="title">
                    パスワード（確認用）
                </div>
                <div class="input">
                    <input :type="passwordType">
                    <div class="td-button" @click="toggleDisplay">{{ tdText }}</div>
                </div>
            </div>
            <div class="mail-address content">
                <div class="title">
                    メールアドレス
                </div>
                <div class="input">
                    <input type="email">
                </div>
            </div>
        </div>
        <div class="note">
            ユーザーIDはアカウント作成後に自動で振り分けられます
        </div>
        <div class="submit">
            <router-link to="/my-page">
                <TextButton name="アカウントを作る" class="with-color"></TextButton>
            </router-link>
        </div>
    </div>
</template>


<style lang="scss">
    .make-account {
        color: #4d4d4d;

        .top {
            background: #fafafa;
            padding: 5vw 3vw;
            font-size: 4vw;
            border-bottom: solid thin #ccc;
        }

        .contents {
            margin: 10vw 3vw 0;
            font-size: 12px;

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
        
        .note {
            font-size: 3.6vw;
            padding: 10vw 3vw;
        }
        
        .submit {
            text-align: center;
            
            .text-button {
                padding: 3vw 10vw;
                
                &.with-color {
                    color: #fbfbfb;
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
