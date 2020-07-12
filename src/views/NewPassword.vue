<template>
    <div class="new-password">
        <div class="top">
            新しいパスワードの設定
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
        </div>

        <div class="submit">
            <TextButton name="新しいパスワードを設定する" class="with-color" @click.native="click_submit_btn"></TextButton>
        </div>
    </div>
</template>


<style lang="scss">
@media screen and (max-width: 767px) {
    .new-password {
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
</style>


<script>
    import TextButton from '@/components/TextButton.vue'
    
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
        methods: {
            click_submit_btn() {
                this.$router.push('log-in')
            },
            toggleDisplay() {
                if (this.password_type == 'password') {
                    this.password_type = 'text'
                    this.db_text = '非表示'
                } else {
                    this.password_type = 'password'
                    this.db_text = '表示'
                }
            }
        }
    }
</script>