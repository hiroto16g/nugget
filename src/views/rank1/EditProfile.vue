<template>
    <div class="edit-profile">
        <div class="top">
            <div class="cancel">
                <router-link to="/mypage">キャンセル</router-link>
            </div>
            <div class="title">
                プロフィールを変更
            </div>
            <div class="save" @click="changeProfile">
                保存
            </div>
        </div>
        <div class="edit">
            <div class="open">
                <div class="image content">
                    <div class="left">
                        画像
                    </div>
                    <div class="right">
                        <AvatarImage :src="icon.src"></AvatarImage>
                        <InputImage @iiChange="onFileChange"></InputImage>
                    </div>
                </div>
                <div class="name content">
                    <div class="left">
                        名前
                    </div>
                    <div class="right">
                        <InputBar v-model="openValue.name"></InputBar>
                    </div>
                </div>
                <div class="user-id content">
                    <div class="left">
                        ユーザーID
                    </div>
                    <div class="right">
                       <span>@</span>
                       <InputBar v-model="openValue.userID"></InputBar>
                    </div>
                </div>
                <div class="bio content">
                    <div class="left">
                        自己紹介
                    </div>
                    <div class="right">
                        <InputBar v-model="openValue.bio"></InputBar>
                    </div>
                </div>
            </div>
            <div class="private">
                <div class="mail content">
                    <div class="left">
                        メール
                    </div>
                    <div class="right">
                        <InputBar v-model="privateValue.mail"></InputBar>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .edit-profile {        
        .top {
            padding: 10px 3vw;
            display: flex;
            justify-content: center;
            font-size: 15px;
            background-color: #fafafa;
            border-bottom: solid thin #ccc;

            .cancel {
                width: 25vw;
                text-align: left;
                
                a {
                    text-decoration: none;
                    color: #888;
                }
            }

            .title {
                width: calc(100vw - 25vw * 2 - 3vw * 2);
                text-align: center;
            }

            .save {
                margin-left: auto;
                width: 25vw;
                text-align: right;
            }
        }

        .edit {
            margin: 0 3vw;
            font-size: 12px;

            .content {
                width: 100%;
                padding: 5px 0;
                display: flex;
                border-bottom: solid thin #ccc;

                .left {
                    width: 20vw;
                    margin-right: 3vw;
                    margin-top: 8px;
                }

                .right {
                    .input-bar {
                        input {
                            width: calc(100vw - 3vw * 2 - 20vw - 3vw);
                        }
                    }
                }
                
                &:nth-child(3) .right {
                    margin-left: auto;
                    display: flex;
                    
                    span {
                        margin-top: 9px;
                        margin-right: 5px;
                    }
                    
                    .input-bar {
                        input {
                            width: calc(100vw - 3vw * 2 - 20vw - 3vw - 5.3vw);
                        }
                    }
                }
            }
        }
    }

</style>

<script>
    import AvatarImage from '@/components/AvatarImage.vue'
    import InputBar from '@/components/InputBar.vue'
    import InputImage from '@/components/InputImage.vue'
    import axios from 'axios'

    export default {
        components: {
            AvatarImage,
            InputBar,
            InputImage,
        },
        data() {
            return {
                openValue: {
                    name: null,
                    userID: null,
                    bio: null,
                },
                privateValue: {
                    mail: null
                },
                icon:{
                    data: new File([], null) ,
                    src: null,
                },
            }
        },
        methods:{
            //画像を選択
            onFileChange: function(e) {
                var files = e.target.files || e.dataTransfer.files;
                this.createImage(files[0]);
                this.icon.data = files[0];
            },
            // アップロードした画像を表示
            createImage: function(file) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.icon.src = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            //プロフィールを変更
            changeProfile: function(){
                var self = this;

                var formData = new FormData();
                formData.append("UserId", 'test2');//仮データ
                formData.append("Icon", self.icon.data);
                formData.append("UserName", self.openValue.name);
                formData.append("SelfIntro", self.openValue.bio);
                formData.append("Email", self.privateValue.mail);
                axios
                    .post('http://localhost:8080/change-profile-json', formData)
                    .then(function () {
                        self.$router.push('/mypage')
                    })
            }
        },
        mounted: function(){
            var self = this;

            //仮データ
            var formData = new FormData();
            formData.append('UserId', 'test2');

            //プロフィール取得
            axios
            .post('http://localhost:8080/edit-profile-json', formData)
            .then(function (response) {
                self.icon.src = response.data.icon;
                self.openValue.name = response.data.username;
                self.openValue.bio = response.data.selfintro;

                self.privateValue.mail = response.data.email; 
            })
        }
    }

</script>
