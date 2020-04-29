<template>
    <div class="trend">
        <TrandNormal v-if="!$store.state.searchFlag"></TrandNormal>
        <SearchModal v-else></SearchModal>
    </div>
</template>


<style lang="scss">
    
</style>


<script>
    import TrandNormal from '@/views/TrandNormal.vue'
    import SearchModal from '@/views/SearchModal.vue'

    export default {
        name: 'trend',
        components: {
            TrandNormal,
            SearchModal
        },
    }

</script>
