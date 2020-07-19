<template>
    <div class="chip">
        <div class="text">
            {{ name }}
        </div>
    </div>
</template>


<style lang="scss">
    .chip {
        height: 25px;
        font-size: 12px;
        padding: 0 12px;
        border: solid thin #ccc;
        border-radius: 13px;
        white-space: nowrap;
        vertical-align: middle;
        display: flex;
        align-items: center;
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