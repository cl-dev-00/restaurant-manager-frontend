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
      <v-window v-model="step" class="col-12">
        <v-window-item :value="1">
          <div class="orders col-12">
            <v-container fluid>
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
                    :order="account"
                    :tipoCard="tCocina"
                    @doneOrderEmit="() => doneOrder(account.idOrden)"
                  />
                </div>
              </masonry>
            </v-container>
          </div>
        </v-window-item>

        <v-window-item :value="2">
          <v-row class="justify-center">
            <v-col cols="12" sm="10" md="8">
              <div>
                <div class="text-center mb-4 d-block">
                  <span class="text-h5 mr-2"
                    >Establecer el estado de los platillos</span
                  >

                  <v-btn color="primary" fab x-small>
                    <v-icon>mdi-help</v-icon>
                  </v-btn>
                </div>
                <v-alert
                  outlined
                  type="warning"
                  prominent
                  border="left"
                  transition="scale-transition"
                >
                  Puede Cambiar el estado de los platillos del menú, considere
                  que al establecerlos como No disponibles el mesero no podrá
                  verlos el menú. <br />
                  <br />Marca con un check
                  <v-icon color="orange">mdi-checkbox-outline</v-icon> los items
                  disponibles <br />
                  <br />Los items con check vacío
                  <v-icon color="orange">mdi-checkbox-blank-outline</v-icon> No
                  estarán disponibles <br />
                </v-alert>
              </div>
            </v-col>
            <v-col cols="12" sm="10" md="8">
              <kitchen-items-state />
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-row>
  </v-container>
</template>

<script>
import CardOrder from "../../components/CardOrder.vue";
import KitchenItemsState from "../../components/KitchenItemsState.vue";

import { toastMessage} from '../../helpers/messages';

export default {
  components: {
    CardOrder,
    KitchenItemsState,
  },
  mounted() {
    this.$services.kitchenRoom.getOrdersUndone().then((response) => {
      if (response.data.ok) {
        this.hasItems = response.data.collection.hasItems;
        this.total = response.data.collection.total;
        this.accounts = response.data.collection.items;
      }
    });

    this.$services.socketioService.getSendOrder((payload) => {
      this.accounts = [...this.accounts, payload];
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
      tCocina: "Cocina",
    };
  },
  methods: {
    doneOrder(id) {

      const account = this.accounts.find((account) => account.idOrden === id);
      account.done = true;

      const sendOrder = { ...account };

      account.idEmpleado = account.employee.idEmpleado;

      delete account.orders;
      delete account.employee;

      this.$services.kitchenRoom
        .updateOrder(id, {
          ...account,
          newMenuItems: [],
          itemsMenuEdit: [],
          itemsMenuRemove: [],
        })
        .then((response) => {
          if (response.data.ok) {
            this.$services.socketioService.doneOrder(sendOrder);
            this.accounts = this.accounts.filter(
              (order) => order.idOrden !== response.data.order.idOrden
            );

            toastMessage('success', 'Exito', 'Se realizo la orden correctamente');  
          }
        })
        .catch((error) => {
          console.log(error);

          toastMessage('error', 'Error :(', 'No se pudo realizar la orden');  
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

.orders {
  min-width: 500px;
}
</style>