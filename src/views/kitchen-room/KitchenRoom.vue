<template>
  <div class="orders">
    <v-container fluid class="black">
      <!--   <v-row class="mb-0 mt-0">
       Columnas de Cards, responsivo 
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="4"
          xl="4"
          v-for="account in accounts"
          :key="account.idCuenta"
        >-->
      <!-- Configuracion de Card 
          <kitchen-card-order
            :nombreCliente="account.nombreCliente"
            :nombreMesero="account.employee.nombre"
            :orders="account.orders"
            @doneOrderEmit="() => doneOrder(account.idCuenta)"
          />
        </v-col>
      </v-row>
-->
      <masonry
        :cols="{ default: 3, 1000: 3, 700: 2, 400: 1 }"
        :gutter="{ default: '10px', 700: '10px' }"
      >
        <div v-for="account in accounts" :key="account.idCuenta" class="mb-3 zoomInUp " id="items" >
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
</template>

<script>
import KitchenCardOrder from "../../components/KitchenCardOrder.vue";
import Vue from "vue";
import VueMasonry from "vue-masonry-css";

Vue.use(VueMasonry);
const el = document.getElementById('items'); 


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
  -webkit-transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);
  transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);
  -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
  animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
  }
  60% {
  opacity: 1;
  -webkit-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
  transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
  -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
  animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
  }
  }
  @keyframes zoomInUp {
  0% {
  opacity: 0;
  -webkit-transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);
  transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0);
  -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
  animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
  }
  60% {
  opacity: 1;
  -webkit-transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
  transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0);
  -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
  animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
  }
  } 
   
</style>