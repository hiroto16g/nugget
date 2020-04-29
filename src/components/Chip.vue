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