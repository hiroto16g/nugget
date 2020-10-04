<template>
    <div class="base-modal">
        <div class="modal">
            <slot></slot>
        </div>
    </div> 
</template>


<style lang="scss">
    @media screen and (min-width: 768px) {
        .base-modal {
            background: rgba(0, 0, 0, 0.2);
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;

            .modal {
                background: white;
                width: 550px;
                margin: 20vh auto 0;
                color: $normal-color;
                position: relative;
                border-radius: 5px;
            }
        }
    }
</style>