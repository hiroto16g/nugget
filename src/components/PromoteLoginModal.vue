<template>
    <div class="promote-login-modal">
        <div class="modal">
            <div class="modal__close"></div>
            <img src="" alt="" class="modal__illustration">
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
    @media screen and (min-width: 768px) {
        .promote-login-modal {
            background: rgba(0, 0, 0, 0.2);
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            
            .modal {
                background: white;
                width: 550px;
                margin: 20vh auto 0;
                color: $normal-color;
                position: relative;
                border-radius: 5px;
                
                .modal__close {
                    position: absolute;
                    background: rgba(0, 0, 0, 0.2);
                    right: 2px;
                    top: 2px;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;

                    &::after, &::before {
                        content: '';
                        position: absolute;
                        width: 25px;
                        height: 2px;
                        background: white;
                        top: 25px;
                        right: 15px;
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
                            width: 300px;
                            border-radius: 30px;
                            font-size: 20px;
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
    }
}
</script>