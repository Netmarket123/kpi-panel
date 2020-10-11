<template>
    
</template>

<script>
    export default {
        name: "logout",
        created() {
            this.$store.dispatch('salir')
        }
    }
</script>

<style scoped>

</style>