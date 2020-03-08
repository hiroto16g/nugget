<template>
    <div class="input-bar">
        <input type="text" :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)" @keydown.enter="$emit('enter', $event.target.value)">
    </div>
</template>


<style lang="scss">
    .input-bar {
        input {
            height: 30px;
            width: 300px;
            color: #888888;
            background-color: #F0F0F0;
            border: none;
            border-radius: 10px;
            padding-left: 10px;
            font-size: 15px;
        }
    }
</style>


<script>
export default {
    props: {
        placeholder: {
            type: String,
            require: false,
        },
        value: {
            type: String,
            require: false,
        },
    }
}
</script>