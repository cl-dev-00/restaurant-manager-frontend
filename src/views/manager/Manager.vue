<template>
  <manager-layout>
    <v-row class="fill-height justify-center align-center">
      <h2 class="black--text">
        Configuracion del Restaurante: Información General, Empleados
      </h2>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="10">
        <info-restaurant />
      </v-col>
      <v-col cols="12" sm="12" md="10">
        <menu-config />
      </v-col>
    </v-row>
  </manager-layout>
</template>

<script>
import InfoRestaurant from "../../components/InfoRestaurant.vue"
import MenuConfig from "../manager/MenuConfig.vue";
import ManagerLayout from '../../layout/ManagerLayout.vue';

export default {
   name: 'Manager',
   components: {
   InfoRestaurant,
   MenuConfig,
   ManagerLayout 
  },

};
</script>


<style scoped>
</style>