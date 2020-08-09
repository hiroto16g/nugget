<template>
    <div class="text-button" @click="click">
        {{ name }}
    </div>
</template>


<style lang="scss">
    @media screen and (max-width: 767px) {
        .text-button {
            text-align: center;
            display: inline-block;
            border: solid thin #ccc;
            border-radius: 5px;
            letter-spacing: 0.08em;

            &:hover {
                cursor: pointer;
            }

            &.with-color {
                border: none;
                background-color: #ffc814;
            }
        }
    }

    @media screen and (min-width: 768px) {
        .text-button {
            text-align: center;
            display: inline-block;
            border: solid thin #ccc;
            border-radius: 5px;
            letter-spacing: 0.08em;

            &:hover {
                cursor: pointer;
            }

            &.with-color {
                border: none;
                background-color: #ffc814;
            }
        }
    }
    
</style>


<script>
    export default {
        props: {
            name: {
                type: String,
                require: true,
                default: 'BUTTON'
            }
        },
        methods: {
            click: function() {
                this.$emit('tbClick')
            }
        }
    }

</script>
