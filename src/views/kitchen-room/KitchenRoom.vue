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
        class="justify-center"
      >
        <v-btn @click="selectWindow(1)" class="btn1">
          <v-icon
            size="28"
            class="mr-1"
            :color="active_1 ? undefined : 'green accent-4'"
            >mdi-new-box</v-icon
          >
          <span class="hidden-xs-only">Ordenes Entrantes</span>
        </v-btn>

        <v-btn @click="selectWindow(2)" class="btn1">
          <v-icon
            size="28"
            class="mr-1"
            :color="active_2 ? undefined : 'green accent-4'"
            >mdi-menu</v-icon
          >
          <span class="hidden-xs-only">Estado de Platillos</span>
        </v-btn>
      </v-btn-toggle>
    </v-row>
    <v-row class="align-center justify-center">
      <v-window v-model="step" class="">
        <v-window-item :value="1">
          <div class="orders">
            <v-container fluid>
              <masonry
                :cols="{ default: 3, 1000: 3, 700: 2, 550: 1 }"
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
            </v-container>
          </div>
        </v-window-item>

        <v-window-item :value="2">
          <v-card class="mx-auto" max-width="344">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>
            <v-card-title>
              Aqui va lo de cambiar el estado de los items
            </v-card-title>
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
import KitchenCardOrder from "../../components/KitchenCardOrder.vue";
import Vue from "vue";
import VueMasonry from "vue-masonry-css";

Vue.use(VueMasonry);
const el = document.getElementById("items");

export default {
  components: {
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
      hasItems: false,
      accounts: [],
      total: 0,

      show: false,
      active_1: false,
      active_2: true,
      step: 1,
      toggle_one: 0,
    };
  },
  methods: {
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

    selectWindow(op) {
      if (op === 1) {
        this.active_1 = false;
        this.active_2 = true;
        this.step = 1;
      } else {
        this.active_1 = true;
        this.active_2 = false;
        this.step = 2;
      }
    },
  },
};
</script>


<style lang="css" scoped>
.zoomInUp {
  -webkit-animation-name: zoomInUp;
  animation-name: zoomInUp;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes zoomInUp {
  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);
    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  60% {
    opacity: 1;
    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);
    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}
@keyframes zoomInUp {
  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);
    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  60% {
    opacity: 1;
    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);
    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}
</style>