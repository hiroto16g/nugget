<template>
    <div class="icon-button" @click="click">
        <span class="mdi" :class="icon"></span>
        <span class="text">{{ name }}</span>
        <span class="text">{{ value }}</span>
    </div>
</template>


<style>
    .icon-button {
        text-align: center;
        display: inline-block;
    }

    .icon-button .mdi {
        display: block;
        font-size: 30px;
    }

    .icon-button .text {
        letter-spacing: 0.08em;
    }

    .icon-button-selected {
        color: #33CC33;
    }

</style>


<script>
    export default {
        props: {
            icon: {
                type: String,
                require: true,
                default: 'mdi-thumb-up-outline'
            },
            name: {
                type: String,
                require: false
            },
            value: {
                type: Number,
                require: false
            }
        },
        methods: {
            click: function() {
                this.$emit('ibClick')
            }
        }
    }

</script>
