<template>
    <div class="chip">
        <div class="text">
            {{ name }}
        </div>
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
        .chip {
            height: 25px;
            font-size: 3.4vw;
            padding: 0.7vw 3.5vw 0.3vw;
            border: solid thin #ccc;
            border-radius: 20px;
            white-space: nowrap;
            vertical-align: middle;
            display: flex;
            align-items: center;
            color: $normal-color;
        }
    }

    @media screen and (min-width: 768px) {
        .chip {
            height: 25px;
            font-size: 15px;
            padding: 5px 15px 2px;
            border: solid thin #ccc;
            border-radius: 20px;
            white-space: nowrap;
            vertical-align: middle;
            display: flex;
            align-items: center;
            color: $normal-color;
            cursor: pointer;
        }
    }
</style>


<script>
    export default {
        props: {
            name: {
                type: String,
                require: true,
                default: 'tag'
            }
        }
    }
</script>