<template>
    <div class="upload-video">
        <div class="video--thumb content">
            <div class="video">
                <div class="content__title">
                    動画
                </div>
                <input type="file">
            </div>
            <div class="thumb content">
                <div class="content__title">
                    サムネイル
                </div>
                <input type="file">
            </div>
        </div>
        <div class="video-title content">
            <div class="content__title">
                タイトル
            </div>
            <input type="text">
        </div>
        <div class="category content">
            <div class="content__title">
                カテゴリ
            </div>
            <select name="" id="">
                <option :value="c" v-for="(c, i) in $store.state.upload_video.categories" :key="i">{{ c }}</option>
            </select>
        </div>
        <div class="tags content">
            <div class="content__title">
                タグ
            </div>
            <div class="input-tag" v-for="(t, i) in tags" :key="i">
                <input type="text" :value="t">
            </div>
        </div>
        <div class="overview content">
            <div class="content__title">
                概要やリンクなど
            </div>
            <textarea name="" id=""></textarea>
        </div>
        <div class="submit">
            <button>動画をナゲる</button>
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 768px) {
        .upload-video {
            padding: 4vw;
            color: $normal-color;
            
            .content {
                margin-top: 7vw;
                
                .content__title {
                    margin-bottom: 0vw;
                    font-size: 4vw;
                }
                
                input[type="text"],
                textarea,
                select {
                    font-size: 3.6vw;
                }

                input[type="text"], textarea {
                    border: solid thin $normal-color;
                    border-radius: 1vw;
                    padding: 3vw 3vw 2.8vw;
                    width: calc(100% - 3vw * 2);
                }
                
                textarea {
                    height: 30vw;
                }
                
                select {
                    padding: 3vw;
                }
                
                &.tags {
                    position: relative;
                    
                    input {
                        margin-bottom: 0.5vw;
                    }
                    
                    .add_tag {
                        position: absolute;
                        right: 1.9vw;
                        top: 0;
                        width: 5vw;
                        height: 5vw;
                        
                        &::before, &::after {
                            content: '';
                            background: $light-color;
                            width: 5vw;
                            height: 0.6vw;
                            position: absolute;
                            top: 2.5vw;
                            
                        }

                        &::before {
                            transform: rotate(90deg);
                        }
                    }
                    
                    .input-tag {
                        position: relative;
                        
                        .delete_tag {
                            width: 5vw;
                            height: 7vw;
                            position: absolute;
                            right: 2vw;
                            top: 50%;
                            transform: translate(0, -50%);
                            
                            &::before {
                                content: '';
                                position: absolute;
                                right: 0;
                                top: 50%;
                                transform: translate(0, calc(-50% - 0.3vw));
                                width: 5vw;
                                height: 0.6vw;
                                background: $light-color;
                            }
                        }
                    }
                }
            }
            
            .submit {
                text-align: center;
                margin-top: 8vw;
                
                button {
                    background: $brand-color;
                    color: white;
                    border: none;
                    font-size: 5vw;
                    padding: 1.5vw 8vw;
                    border-radius: 6vw;
                }
            }
        }
    }
</style>


<script>
export default {
    data() {
        return {
            tags: ['', '', '', '', '']
        }
    },
    methods: {
        add_tag() {
            this.tags.push('')
        },
        delete_tag(num) {
            this.tags.splice(num, 1)
        }
    }
}
</script>