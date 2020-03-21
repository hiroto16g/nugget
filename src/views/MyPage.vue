<template>
    <div class="my-page">
        <div class="user-info">
            <div class="top">
                <router-link to="/log-in">ログイン</router-link>
                <AvatarImage :src="icon"></AvatarImage>
                <router-link to="/edit-profile">
                    <TextButton name="プロフィールを変更"></TextButton>
                </router-link>
            </div>
            <div class="middle">
                <div class="user-name">
                    {{ userName }}
                </div>
                <div class="user-id">
                    @{{ userID }}
                </div>
            </div>
            <div class="bottom">
                <div class="bio">
                    {{ bio }}
                </div>
                <IconButton icon="mdi-chevron-down"></IconButton>
            </div>
        </div>
        <div class="switch-bar">
            <div>通知</div>
            <div>投稿</div>
            <div>ジーニアス</div>
            <div>履歴</div>
        </div>
    </div>
</template>


<style lang="scss">
    .my-page {
        .user-info {
            padding: 50px 3vw 0;
            background-color: #fafafa;
            
            .top {
                height: 80px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                
                .avatar-image {
                    width: 80px;
                }
                
                a {
                    margin-left: auto;
                    color: #888;
                    
                    .text-button {
                        padding: 4px 20px;
                        font-size: 12px;
                    }
                }
            }
            
            .middle {
                margin-bottom: 10px;
                
                .user-name {
                    font-size: 17px;
                }
                
                .user-id {
                    font-size: 12px;
                    color: #888888;
                }
            }
            
            .bottom {
                text-align: center;
                
                .bio {
                    text-align: left;
                    font-size: 13px;
                }
                
                .icon-button {
                    margin: auto;
                    color: #888;
                }
            }
        }
        
        .switch-bar {
            font-size: 15px;
            padding: 5px 0 4px;
            color: #888;
            display: flex;
            justify-content: space-evenly;
            border-bottom: solid thin #ccc;
            border-top: solid thin #ccc;
        }
    }

</style>


<script>
    import AvatarImage from '@/components/AvatarImage.vue'
    import TextButton from '@/components/TextButton.vue'
    import IconButton from '@/components/IconButton.vue'
    import axios from 'axios'

    export default {
        components: {
            AvatarImage,
            TextButton,
            IconButton
        },
        data() {
            return {
                /*
                userName: 'のび太さんのエッジ',
                userID: 'nobitasedge',
                bio: 'プログラミングとかの入門書って絶対入門じゃないよね。「素人質問で申し訳ないのですが」と同じだよねああああああああああああああああああああああああああああああああああああああああああああああああ'
                */
               icon:null,
               userName:null,
               userID:null,
               bio:null,
            }
        },
        mounted(){
            var self = this;

            //仮データ
            const formData = new FormData();
            formData.append('UserId', 'test2');

            axios
            .post('http://localhost:8080/my-page-json', formData)
            .then(function (response) {
                var user = response.data.user;
                self.icon = user.icon;
                self.userName = user.username;
                self.userID = user.userid;
                self.bio = user.selfintro;
            })
        }
    }
</script>
