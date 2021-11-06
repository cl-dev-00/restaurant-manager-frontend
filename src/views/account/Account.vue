<template>
  <manager-layout>
    <v-row class="fill-height justify-center align-center">
      <h2 class="black--text">Configuracion Cuenta de Usuario</h2>

      <v-col>
        
       
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="10">
        <info-restaurant />
      </v-col>
    </v-row>
  </manager-layout>
</template>

<script>
import InfoRestaurant from "../../components/InfoRestaurant.vue";
import ManagerLayout from "../../layout/ManagerLayout.vue";


export default {
  name: "Account",

 
  components: {
    InfoRestaurant,
    ManagerLayout,
  },
  
   data: () => ({
 
  }),

  methods: {
    
  },
};
</script>


<style scoped>
</style>