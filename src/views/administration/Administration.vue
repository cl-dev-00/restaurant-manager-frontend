<template>
    <h2>Modulo de Administracion</h2>
</template>

<script>
export default {
    setup() {
        
    },
    mounted() {
        console.log(this.$services)

        console.log(this.$store.getters.user)
        console.log(this.$store.getters.isLoggedIn)

        this.$store.dispatch('loginSignAction');
        this.$store.dispatch('setUserAction', {
            name: 'juan',
            email: 'example@email.com'
        });

        const user = this.$store.getters.user;

        console.log(user);
        console.log(user.email);
        console.log(this.$store.getters.isLoggedIn)
    }
}
</script>