<template>
    <div class="imgContent">
        <div class="imagePreview">
            <div class="originalFileBtn">
                新しいアイコンを設定
                <input type="file" accept="image/*" @change="change">
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .imgContent{
        margin-top:0;
        padding-top:0;
        margin-bottom:2.5rem;
        text-align:center;
    }
    .originalFileBtn {
        border: 2px solid;
        display: inline-block;
        padding: 2px 1em;
        position: relative;
        color: #fff;
        font-size: 1rem;
        background-color: #5bc0de;
        border-radius: 30px;
    }
    .originalFileBtn input[type="file"] {
        height: 100%;
        left: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }
</style>


<script>
export default {
   methods: {
        change: function(e) {
            this.$emit('iiChange', e)
        }
    }
}
</script>