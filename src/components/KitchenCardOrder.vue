<template>

  <v-card id="card" min-height="auto" max-height="auto">
    <!-- Header de las Card -->
    <v-list-item three-line class="pink">
      <v-list-item-content class="white--text">
        <v-list-item-title class="text-h5">{{
          nombreCliente
        }}</v-list-item-title>
        <v-list-item-subtitle class="white--text"
          >Nombre de la orden</v-list-item-subtitle
        >
        <v-list-item-subtitle class="white--text">{{
          nombreMesero
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <!-- Listado de items de la orden -->
    <v-responsive max-height="auto">
      <v-list two-line height="">
        <v-list-item-group active-class="green--text" multiple>
          <template v-for="order in orders">
            <v-list-item :key="order.idPedido">
              <template >
                <kitchen-card-list-orders :order="order" />
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-responsive>
    <!-- Boton para completads -->
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class=" mb-4" fab dark color="success" @click='doneOrderEmit'>
        <v-icon dark> mdi-check </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import KitchenCardListOrders from "../components/KitchenCardListOrders.vue";

export default {
  name: "KitchenCardOrder",
  components: {
    KitchenCardListOrders,
  },
  props: {
    nombreCliente: {
      type: String,
      required: true,
    },
    nombreMesero: {
      type: String,
      required: true,
    },
    orders: {
      type: Array,
      // required: true
    },
  },

  methods: {
    doneOrderEmit() {
      this.$emit('doneOrderEmit');
      this.toggleClass();
    },

    toggleClass () {
        const el = document.getElementById('card')
        el.classList.toggle('fadeOut')
    }
  }

  
};
</script>

<style scoped>
.fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  }
  @-webkit-keyframes fadeOut {
  0% {opacity: 1;}
  100% {opacity: 0;}
  }
  @keyframes fadeOut {
  0% {opacity: 1;}
  100% {opacity: 0;}
  } 
</style>