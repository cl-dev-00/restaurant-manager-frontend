<template>
  <manager-layout>
    <v-row class="fill-height justify-center align-center">
        <v-col cols="12" sm="12" md="10">
        <info-restaurant />
      </v-col>
    </v-row>
  </manager-layout>
</template>

<script>
import InfoRestaurant from "../../components/InfoRestaurant.vue"
import ManagerLayout from '../../layout/ManagerLayout.vue';

export default {
   name: 'Manager',
   components: {
   InfoRestaurant,
   ManagerLayout 
  },

};
</script>


<style scoped>
</style>