<template>
  <v-container>
    <v-row class="mt-5 mb-5 align-center justify-center">
      <v-btn-toggle
        v-model="toggle_one"
        shaped
        borderless
        mandatory
        color="green accent-4"
        id="toggle1"
        class="justify-center mr-0 pr-0 pl-0 ml-0"
      >
        <v-btn @click="selectWindow(1)" class="btn1">
          <v-icon
            size="28"
            class="mr-1"
            :color="active_1 ? undefined : 'green accent-4'"
            >mdi-hamburger-plus</v-icon
          >
          <span class="hidden-xs-only">Nueva Orden</span>
        </v-btn>

        <v-btn @click="selectWindow(2)" class="btn1">
          <v-icon
            size="28"
            class="mr-1"
            :color="active_2 ? undefined : 'green accent-4'"
            >mdi-format-list-bulleted-square</v-icon
          >
          <span class="hidden-xs-only">Ver Ordenes</span>
        </v-btn>
        <v-btn @click="selectWindow(3)" class="btn1">
          <v-icon
            size="28"
            class="mr-1"
            :color="active_3 ? undefined : 'green accent-4'"
            >mdi-cash-register</v-icon
          >
          <span class="hidden-xs-only">Opciones de Caja</span>
        </v-btn>
      </v-btn-toggle>
    </v-row>

    <v-row class="align-center justify-center">
      <v-window v-model="step" class="col-12">
        <v-window-item :value="1">
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

        <v-window-item :value="2">
          <v-row
            class="pt-8 pl-8 pr-8 pb-8 fill-height align-center justify-center"
          >
            <v-col class="col-12">
              <masonry
                :cols="{ default: 3, 1266: 2, 700: 1 }"
                :gutter="{ default: '10px', 700: '10px' }"
              >
                <div
                  v-for="account in accounts"
                  :key="account.idCuenta"
                  class="mb-3 zoomInUp"
                  id="items"
                >
                  <kitchen-card-order
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

        <v-window-item :value="3">
          <v-card class="mx-auto" max-width="344">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>
            <v-card-title> Aqui van las opciones de Caja </v-card-title>
            <v-card-subtitle> a </v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange lighten-2" text> Abrir </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                <v-card-text> puto el que lo lea </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-window-item>
      </v-window>
    </v-row>
  </v-container>
</template>

<script>
import WaiterCardCategory from "../../components/WaitersCardCategory.vue";
import WaitersFormOrder from "../../components/WaitersFormOrder.vue";

import KitchenCardOrder from "../../components/KitchenCardOrder.vue";
import Vue from "vue";
import VueMasonry from "vue-masonry-css";

Vue.use(VueMasonry);

export default {
  name: 'Orders',
  components: {
    WaiterCardCategory,
    WaitersFormOrder,

    KitchenCardOrder,
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
      step: 1,
      toggle_one: 0,
      active_1: false,
      active_2: true,
      active_3: true,

      hasItems: false,
      accounts: [],
      total: 0,

      show: false,
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

        this.step = 2;
      } else {
        this.active_1 = true;
        this.active_2 = true;
        this.active_3 = false;

        this.step = 3;
      }
    },

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