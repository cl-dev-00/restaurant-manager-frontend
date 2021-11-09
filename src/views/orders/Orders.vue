<template>
  <app-layout>
    <v-container fluid style="max-width: 1300px">
      <v-row class="mt-3 align-center justify-center">
        <v-btn-toggle
          v-model="step"
          shaped
          borderless
          mandatory
          color="green accent-4"
          id="toggle1"
          class="justify-center mr-0 pr-0 pl-0 ml-0 green--text"
        >
          <v-btn class="btn1">
            <v-icon
              size="28"
              class="mr-1"
              :color="step === 0 ? 'green accent-4' : 'black'"
              >mdi-hamburger-plus</v-icon
            >
            <span class="hidden-xs-only">Nueva Orden</span>
          </v-btn>

          <v-btn class="btn1">
            <v-icon
              size="28"
              class="mr-1"
              :color="step === 1 ? 'green accent-4' : 'black'"
              >mdi-format-list-bulleted-square</v-icon
            >
            <span class="hidden-xs-only">Ver Ordenes</span>
          </v-btn>
          <v-btn v-if="isCashier" class="btn1">
            <v-icon
              size="28"
              class="mr-1"
              :color="step === 2 ? 'green accent-4' : 'black'"
              >mdi-cash-register</v-icon
            >
            <span class="hidden-xs-only">Opciones de Caja</span>
          </v-btn>
        </v-btn-toggle>
      </v-row>

      <v-row class="align-center justify-center">
        <v-window v-model="step" class="col-12">
          <v-window-item :value="0">
            <orders-create-or-edit />
          </v-window-item>

          <v-window-item :value="1">
            <v-row
              class="
                pt-8
                pl-8
                pr-8
                pb-8
                fill-height
                align-center
                justify-center
              "
            >
              <v-col v-if="isCashier" class="col-12">
                <app-container-cards-orders :tipoCard="'CajeroPay'" />
              </v-col>
              <v-col v-else class="col-12">
                <app-container-cards-orders
                  :orders="orders.items"
                  :tipoCard="'Mesero'"
                />
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item v-if="isCashier" :value="2">
            <h4 class="ml-16">Estadisticas</h4>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="5"
              class="elevation-1 ma-16 mt-5"
            ></v-data-table>
          </v-window-item>
        </v-window>
      </v-row>
    </v-container>
  </app-layout>
</template>

<script>
import AppLayout from "../../layout/AppLayout.vue";
import OrdersCreateOrEdit from "../../components/OrdersCreateOrEdit.vue";

import AppContainerCardsOrders from "../../components/AppContainerCardsOrders.vue";

import FormPay from "../../components/FormPay.vue";

export default {
  name: "Orders",
  components: {
    AppLayout,
    OrdersCreateOrEdit,
    AppContainerCardsOrders,
    FormPay,
  },

  mounted() {
    this.isCashier =
      this.$store.getters.user.role.user_level.nivel_usuario === 3;
    this.$store.dispatch("itemsMenuSelectAction", []);

    this.step = parseInt(localStorage.getItem(this.$route.name)) || 0;
  },

  data() {
    return {
      isCashier: false,
      switch1: true,
      step: 0,

      orders: {
        items: [],
        hasItems: false,
      },

      show: false,

      //Tipos
      tCocina: "Cocina",
      tMesero: "Mesero",
      tCajero: "Cajero",
      tCajeroPay: "CajeroPay",

      headers: [
        {
          text: "Nombre del Cliente",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Tomada en", value: "calories" },
        { text: "Por", value: "fat" },
        { text: "Hora", value: "carbs" },
        { text: "Total", value: "protein" },
        { text: "-", value: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
  watch: {
    step: function () {
      localStorage.setItem(this.$route.name, this.step);
    },
  },
};
</script>


<style lang="css" scoped>
@media only screen and (max-width: 600px) {
  .col-menu {
    visibility: hidden;
    height: 0;
    padding: 0;
    margin: 0;
  }
}
#toggle1 {
  width: 700px;
}

.btn1 {
  width: 31%;
}
</style>