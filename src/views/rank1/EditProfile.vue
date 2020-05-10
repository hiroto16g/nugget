<template>
    <div class="edit-profile">
        <div class="top">
            <div class="cancel" @click="click_cancel">
                キャンセル
            </div>
            <div class="title">
                プロフィールを変更
            </div>
            <div class="save" @click="click_save">
                保存
            </div>
        </div>
        <div class="edit">
            <div class="open">
                <div class="image content">
                    <div class="user-image">
                        <AvatarImage></AvatarImage>
                    </div>
                    <div class="input">
<!--                        <input type="file">-->
                    </div>
                </div>
                <div class="content">
                    <input class="name" type="text" @keyup="keyup_name">
                </div>
                <div class="content">
                    <textarea class="bio" rows="3" placeholder="自己紹介" @keyup="keyup_bio"></textarea>
                </div>
            </div>
            <div class="private">
                <div class="content">
                    <input class="mail" type="email" @keyup="keyup_mail">
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .edit-profile {
        .top {
            padding: 3.6vw 3vw 3vw;
            display: flex;
            justify-content: center;
            font-size: 4vw;
            background: $tabbar;
            border-bottom: solid thin $border;
            color: $normal-color;

            .cancel {
                width: 25vw;
                text-align: left;
                color: $light-color;
            }

            .title {
                width: calc(100vw - (25vw + 3vw) * 2);
                text-align: center;
            }

            .save {
                width: 25vw;
                text-align: right;
            }
        }

        .edit {
            margin: 0 3vw;
            font-size: 5vw;

            .content {
                width: calc(100vw - 3vw * 2);
                
                &.image {
                    margin: 10vw 0 7vw;
                }
                
                .user-image {
                    text-align: center;
                    img {
                        width: 22vw;
                    }
                }
                
                input,
                textarea {
                    border: none;
                    border-bottom: solid thin $border;
                    width: calc(100% - 3vw * 2);
                    font-size: 4.5vw;
                    padding: 3.6vw 3vw 3vw;
                    margin-bottom: 0.3vw;
                }
            }
        }
    }

</style>


<script>
    import AvatarImage from '@/components/AvatarImage.vue'

    export default {
        components: {
            AvatarImage
        },
        data() {
            return {
                openValue: {
                    name: '名前',
                    bio: '',
                },
                privateValue: {
                    mail: 'nugget@gmail.com'
                }
            }
        },
        methods: {
            click_cancel() {
                this.$router.go(-1)
            },
            click_save() {
                this.$router.go(-1)
            },
            keyup_name() {
                this.openValue.name = document.getElementsByClassName('name')[0].value
            },
            keyup_bio() {
                this.openValue.bio = document.getElementsByClassName('bio')[0].value
            },
            keyup_mail() {
                this.privateValue.mail = document.getElementsByClassName('mail')[0].value
            }
        }
    }

</script>
