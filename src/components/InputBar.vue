<template>
    <div class="input-bar">
        <input type="text" :placeholder="placeholder" v-model="inputValue" @input="update">
    </div>
</template>


<style lang="scss">
    .input-bar {
        input {
            color: $normal-color;
            background-color: #F0F0F0;
            border: none;
            border-radius: 10px;
            padding-left: 10px;
            
            &::placeholder {
                color: $light-color;
            }
        }
    }
    
    @media screen and (max-width: 767px) {
        .input-bar {
            input {
                color: $normal-color;
                background-color: $input;
                border: none;
                border-radius: 10px;
                padding-left: 3vw;
                font-size: 3.6vw;

                &::placeholder {
                    color: $light-color;
                }
            }
        }
    }

    @media screen and (min-width: 768px) {

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
        name: {
            type: String,
            require: false,
        }
    },
    data() {
        return {
            mutationName: 'update_' + this.name,
            inputValue: this.value
        }
    },
    methods: {
        update() {
            this.$store.commit(this.mutationName, this.inputValue)
        }
    }
}
</script>