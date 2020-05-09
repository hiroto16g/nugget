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
            <a class="fix help" href="">
                修正はこちら
            </a>
        </div>
        
        <div class="mail-check text">
            <div class="main">
                <span class="top">届いたメールを確認して<br></span>
                <span class="bottom">サクッと知識を身につけましょう！</span>
            </div>
            <a class="dont-receive help" href="">
                届かない場合はこちら
            </a>
        </div>
    </div>
</template>


<style lang="scss">
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
</style>


<script>
    export default {
        computed: {
            user_info() {
                return this.$store.state.mkacc.inputs
            }
        }
    }
</script>