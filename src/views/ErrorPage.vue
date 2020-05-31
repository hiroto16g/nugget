<template>
    <div class="error-page">
        <img :src="error.image" alt="">
        <div class="explain">
            {{ error.explain }}
        </div>
        <div class="next-action">
            {{ error.action }}
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
        .error-page {
            text-align: center;

            img {
                margin: 20vh auto 0;
                width: 50vw;
            }

            .explain {
                font-size: 5vw;
                margin-top: 10vw;
                color: $normal-color;
            }

            .next-action {
                font-size: 3.4vw;
                margin-top: 5vw;
                color: $light-color;
            }
        }

    }

    @media screen and (min-width: 768px) {

    }
</style>


<script>
    export default {
        computed: {
            error() {
                return this.$store.state.common.error
            }
        }
    }

</script>
