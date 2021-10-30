<template>
  <v-container fluid style="max-width: 1300px">
    <v-row class="fill-height justify-center align-center">
      <h2 class="ma-6 black--text">
        Configuracion del menú: Categorias, Items, Mesas
      </h2>
    </v-row>

    <v-row class="justify-center align-center">
      <v-col cols="12" md="6">
        <table-categories />
      </v-col>
      <v-col cols="12" md="6">
        <table-mesas />
      </v-col>
      <v-col class="col-12">
        <table-items-menu />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TableCategories from "../../components/TableCategories.vue";
import TableItemsMenu from "../../components/TableItemsMenu.vue";
import TableMesas from "../../components/TableMesas.vue";

export default {
  name: "MenuConfig",
  components: {
    TableCategories,
    TableItemsMenu,
    TableMesas,
  },
  data() {
    return {};
  },
};
</script>


<style scoped>
</style>