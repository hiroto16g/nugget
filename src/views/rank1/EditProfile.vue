<template>
    <div class="edit-profile">
        <div class="top">
            <div class="cancel">
                <router-link to="/my-page">キャンセル</router-link>
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
                    <div class="user-image">
                        <AvatarImage></AvatarImage>
                    </div>
<<<<<<< HEAD
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
                <div class="bio content">
                    <div class="left">
                        自己紹介
                    </div>
                    <div class="right">
                        <InputBar v-model="openValue.bio"></InputBar>
                    </div>
=======
                    <div class="input">
<!--                        <input type="file">-->
                    </div>
                </div>
                <div class="name content">
                    <input type="text" v-model="openValue.name">
                </div>
                <div class="bio content">
                    <textarea rows="3" placeholder="自己紹介" v-model="openValue.bio"></textarea>
>>>>>>> upstream/master
                </div>
            </div>
            <div class="private">
                <div class="mail content">
<<<<<<< HEAD
                    <div class="left">
                        メール
                    </div>
                    <div class="right">
                        <InputBar v-model="privateValue.mail"></InputBar>
                    </div>
=======
                    <input type="text" v-model="privateValue.mail">
>>>>>>> upstream/master
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
                
                a {
                    color: $light-color;
                }
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
                    border-bottom: solid thin #ccc;
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
<<<<<<< HEAD
    import InputBar from '@/components/InputBar.vue'
    import InputImage from '@/components/InputImage.vue'
    import axios from 'axios'

    export default {
        components: {
            AvatarImage,
            InputBar,
            InputImage,
=======

    export default {
        components: {
            AvatarImage
>>>>>>> upstream/master
        },
        data() {
            return {
                openValue: {
<<<<<<< HEAD
                    name: null,
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
                        self.$router.push('/my-page')
                    })
=======
                    name: '名前',
                    bio: '',
                },
                privateValue: {
                    mail: 'nugget@gmail.com'
                }
>>>>>>> upstream/master
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
