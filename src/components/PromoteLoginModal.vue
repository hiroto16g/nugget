<template>
    <div class="promote-login-modal">
        <div class="modal">
            <div class="modal__close" @click="click_close"></div>
            <img src="@/assets/gold.png" alt="" class="modal__illustration">
            <div class="modal__main">
                <div class="m__main__explain">
                    アカウントを作ると、{{ do_text }}できます！
                </div>
                <div class="m__main__btns">
                    <router-link to="/make-account" class="make-acc">
                        アカウントを作る
                    </router-link>
                    <router-link to="/log-in" class="log-in">
                        ログインする
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
        .promote-login-modal {
            background: rgba(0, 0, 0, 0.2);
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 99999;

            .modal {
                background: white;
                width: 90vw;
                margin: 20vh auto 0;
                color: $normal-color;
                position: relative;
                border-radius: 5px;

                .modal__close {
                    position: absolute;
                    background: rgba(0, 0, 0, 0.4);
                    right: 3vw;
                    top: 2vw;
                    width: 8vw;
                    height: 8vw;
                    border-radius: 50%;
                    cursor: pointer;

                    &::after, &::before {
                        content: '';
                        position: absolute;
                        width: 5vw;
                        height: 0.5vw;
                        background: white;
                        top: 47%;
                        left: 20%;
                    }

                    &::after {
                        transform: rotate(45deg);
                    }

                    &::before {
                        transform: rotate(-45deg);
                    }
                }

                .modal__illustration {
                    width: 100%;
                }

                .modal__main {
                    padding: 3vw 5vw 1vw;

                    .m__main__explain {
                        font-size: 4vw;
                    }

                    .m__main__btns {
                        a {
                            width: 50vw;
                            border-radius: 10vw;
                            font-size: 3.6vw;
                            padding: 2.5vw 0;
                            text-align: center;
                            display: block;
                            margin: 5vw auto;
                            text-decoration: none;

                            &.make-acc {
                                background: $brand-color;
                                color: white;
                            }

                            &.log-in {
                                border: solid thin $light-color;
                                color: $normal-color;
                            }
                        }
                    }
                }
            }
        }
    }
    
    @media screen and (min-width: 767px) {
        .promote-login-modal {
            background: rgba(0, 0, 0, 0.2);
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9999;
            
            .modal {
                background: white;
                width: 550px;
                margin: 20vh auto 0;
                color: $normal-color;
                position: relative;
                border-radius: 5px;
                
                .modal__close {
                    position: absolute;
                    background: rgba(0, 0, 0, 0.4);
                    right: 2px;
                    top: 2px;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    cursor: pointer;

                    &::after, &::before {
                        content: '';
                        position: absolute;
                        width: 21px;
                        height: 2px;
                        background: white;
                        top: 17px;
                        right: 7px;
                    }
                    
                    &::after {
                        transform: rotate(45deg);
                    }
                    
                    &::before {
                        transform: rotate(-45deg);
                    }
                }
                
                .modal__illustration {
                    width: 100%;
                }
                
                .modal__main {
                    padding: 10px 30px 20px;
                    
                    .m__main__explain {
                        font-size: 22px;
                    }
                    
                    .m__main__btns {
                        a {
                            width: 250px;
                            border-radius: 30px;
                            font-size: 18px;
                            padding: 10px 0;
                            text-align: center;
                            display: block;
                            margin: 20px auto;
                            text-decoration: none;
                            
                            &.make-acc {
                                background: $brand-color;
                                color: white;
                            }
                            
                            &.log-in {
                                border: solid thin $light-color;
                                color: $normal-color;
                            }
                        }
                    }
                }
            }
        }
    }
</style>


<script>
export default {
    props: {
        do_text: {
            require: true,
            default: '',
            type: String
        }
    },
    methods: {
        click_close() {
            this.$emit('click_PLM_close')
        }
    }
}
</script>