<template>
  <v-container fluid style=" max-width:1200px">
    <v-row class="fill-height justify-center align-center" >
      <h2 class="ma-6 black--text">Configuracion del Restaurante: Información General, Empleados</h2>
     </v-row>
      <v-row class=" justify-center"> 
       <v-col cols="12" sm="12" md="10">
        <info-restaurant/>
       </v-col>
     </v-row>
     <v-row class=" justify-center"> 
       <v-col class="col-12">
         <table-employees/>
       </v-col>
     </v-row>
  </v-container>
</template>

<script>
import InfoRestaurant from "../../components/InfoRestaurant.vue"
import TableEmployees from "../../components/TableEmployees.vue"
export default {
   name: 'Administration',

   components: {
   InfoRestaurant,
   TableEmployees,
  },

   data() {
    return {
       
    };
  },

};
</script>


<style scoped>
</style>