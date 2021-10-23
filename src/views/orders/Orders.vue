<template>
  <v-container style="max-width: 1200px">
    <v-row class="mt-5 mb-5 align-center justify-center">
      <v-btn-toggle
        v-model="step"
        shaped
        borderless
        mandatory
        color="green accent-4"
        id="toggle1"
        class="justify-center mr-0 pr-0 pl-0 ml-0 green--text"
      >
        <v-btn  class="btn1">
          <v-icon
            size="28"
            class="mr-1"
            :color="this.step === 0 ? 'green accent-4' :  'black'"
            
            >mdi-hamburger-plus</v-icon
          >
          <span class="hidden-xs-only">Nueva Orden</span>
        </v-btn>

        <v-btn class="btn1">
          <v-icon
            size="28"
            class="mr-1"
            :color="this.step === 1 ? 'green accent-4' :  'black'"
            >mdi-format-list-bulleted-square</v-icon
          >
          <span class="hidden-xs-only">Ver Ordenes</span>
        </v-btn>
        <v-btn  class="btn1">
          <v-icon
            size="28"
            class="mr-1"
            :color="this.step === 2 ? 'green accent-4' :  'black'"
            >mdi-cash-register</v-icon
          >
          <span class="hidden-xs-only">Opciones de Caja</span>
        </v-btn>
      </v-btn-toggle>
    </v-row>

    <v-row class="align-center justify-center">
      <v-window v-model="step" class="col-12">
        <v-window-item :value="0">
          <v-row>
            <v-col cols="12" sm="6" md="6" class="pr-0 pl-3">
              <waiter-card-category
                class="col-menu"
                :itemSelects="itemSelects"
                @updateSelectItems="updateSelectItems"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <waiters-form-order
                :itemSelects="itemMenuOrder"
                @clearitemSelects="clearitemSelects"
              />
            </v-col>
            <v-col class="hidden-sm-and-up">
              <v-dialog transition="dialog-top-transition" max-width="400">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    dark
                    color="success"
                    fixed
                    right
                    top
                    style="margin-top: 410px"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark size="40">mdi-plus</v-icon>
                  </v-btn>
                </template>
                <template v-slot:default="dialog">
                  <v-btn
                    color="primary"
                    block
                    depressed
                    height="50"
                    @click="dialog.value = false"
                    >Cerrar</v-btn
                  >
                  <waiter-card-category
                    style="background-color: white"
                    :itemSelects="itemSelects"
                    @updateSelectItems="updateSelectItems"
                  />
                </template>
              </v-dialog>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item :value="1">
          <v-row
            class="pt-8 pl-8 pr-8 pb-8 fill-height align-center justify-center"
          >
            <v-col class="col-12">
              <h2>Cards Cocina, platos cocinados</h2>
              <masonry
                :cols="{ default: 3, 1266: 2, 700: 1 }"
                :gutter="{ default: '10px', 700: '10px' }"
              >
                <div
                  v-for="account in accounts"
                  :key="account.idCuenta"
                  class="mb-10 mt-1 zoomInUp"
                  id="items"
                >
                  <card-order
                    :tipoCard="tCocina"
                    :nombreCliente="account.nombreCliente"
                    :nombreMesero="account.employee.nombre"
                    :orders="account.orders"
                    @doneOrderEmit="() => doneOrder(account.idCuenta)"
                  />
                </div>
              </masonry>
            </v-col>

            <v-col class="col-12">
              <h2>Cards Mesero, listas para entregar a mesa</h2>
              <masonry
                :cols="{ default: 3, 1266: 2, 700: 1 }"
                :gutter="{ default: '10px', 700: '10px' }"
              >
                <div
                  v-for="account in accounts"
                  :key="account.idCuenta"
                  class="mb-10 mt-1 zoomInUp"
                  id="items"
                >
                  <card-order
                    :tipoCard="tMesero"
                    :nombreCliente="account.nombreCliente"
                    :nombreMesero="account.employee.nombre"
                    :orders="account.orders"
                    @doneOrderEmit="() => doneOrder(account.idCuenta)"
                  />
                </div>
              </masonry>
            </v-col>

            <v-col class="col-12">
              <h2>Cards Cajero, ordenes para llevar</h2>
              <masonry
                :cols="{ default: 3, 1266: 2, 700: 1 }"
                :gutter="{ default: '10px', 700: '10px' }"
              >
                <div
                  v-for="account in accounts"
                  :key="account.idCuenta"
                  class="mb-10 mt-1 zoomInUp"
                  id="items"
                >
                  <card-order
                    :tipoCard="tCajero"
                    :nombreCliente="account.nombreCliente"
                    :nombreMesero="account.employee.nombre"
                    :orders="account.orders"
                    @doneOrderEmit="() => doneOrder(account.idCuenta)"
                  />
                </div>
              </masonry>
            </v-col>

            <v-col class="col-12">
              <h2>Cards Cajero, Listas para Pagar</h2>
              <masonry
                :cols="{ default: 3, 1266: 2, 700: 1 }"
                :gutter="{ default: '10px', 700: '10px' }"
              >
                <div
                  v-for="account in accounts"
                  :key="account.idCuenta"
                  class="mb-10 mt-1 zoomInUp"
                  id="items"
                >
                  <card-order
                    :tipoCard="tCajeroPay"
                    :nombreCliente="account.nombreCliente"
                    :nombreMesero="account.employee.nombre"
                    :orders="account.orders"
                    @doneOrderEmit="() => doneOrder(account.idCuenta)"
                  />
                </div>
              </masonry>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item :value="2">
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
    <v-row class="justify-center">
      <v-col class="col-12">
        <form-pay />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WaiterCardCategory from "../../components/WaitersCardCategory.vue";
import WaitersFormOrder from "../../components/WaitersFormOrder.vue";

//Cards de prueba
import CardOrder from "../../components/CardOrder.vue";
//*********************** */

import FormPay from "../../components/FormPay.vue";

import Vue from "vue";
import VueMasonry from "vue-masonry-css";

Vue.use(VueMasonry);

export default {
  name: "Orders",
  components: {
    WaiterCardCategory,
    WaitersFormOrder,
    CardOrder,
    FormPay,
  },

  mounted() {
    this.$services.kitchenRoom.getAccounts().then((response) => {
      if (response.data.ok) {
        this.hasItems = response.data.collection.hasItems;
        this.total = response.data.collection.total;
        this.accounts = response.data.collection.items;
      }
    });
  },

  data() {
    return {
      itemSelects: [],
      itemMenuOrder: [],
      switch1: true,
      step: 0,
      toggle_one: 0,
      active_1: false,
      active_2: true,
      active_3: true,

      hasItems: false,
      accounts: [],
      total: 0,

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
  methods: {
    updateSelectItems(items) {
      this.itemSelects = items;
      this.itemMenuOrder = items.map((item) => ({
        nombre_Item: item.nombre_Item,
        id_item_name: item.id_item_name,
        precio: item.precio,
        cantidad: 1,
        importe: 0,
      }));
    },

    clearitemSelects() {
      this.itemMenuOrder = [];
    },

    updateOrders() {
      this.$services.kitchenRoom.getAccounts().then((response) => {
        if (response.data.ok) {
          this.hasItems = response.data.collection.hasItems;
          this.total = response.data.collection.total;
          this.accounts = response.data.collection.items;
        }
      });
    },
/*
    selectWindow(op) {
      if (op === 1) {
        this.active_1 = false;
        this.active_2 = true;
        this.active_3 = true;

        this.step = 1;
      } else if (op === 2) {
        this.active_1 = true;
        this.active_2 = false;
        this.active_3 = true;

        this.updateOrders();
        this.step = 2;
      } else {
        this.active_1 = true;
        this.active_2 = true;
        this.active_3 = false;

        this.step = 3;
      }
    },*/

    doneOrder(id) {
      const account = this.accounts.find((account) => account.idCuenta === id);
      account.done = true;
      account.idEmpleado = account.employee.idEmpleado;

      delete account.orders;
      delete account.employee;

      this.$services.kitchenRoom
        .updateAccount(id, account)
        .then((response) => {
          if (response.data.ok) {
            this.accounts = this.accounts.filter(
              (account) => account.done !== true
            );
            console.log(this.accounts);
          }
        })
        .catch((error) => {
          console.log(error);
        });
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