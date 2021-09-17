<template>
  <v-card class="mb-0" min-height="400" max-height="400">
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
    <v-responsive class="overflow-y-auto" max-height="250">
      <v-list two-line height="">
        <v-list-item-group active-class="green--text" multiple>
          <template v-for="order in orders">
            <v-list-item :key="order.idPedido">
              <template v-slot:default="{ active }">
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
      <v-btn class="mx-2" fab dark color="success" @click='doneOrderEmit'>
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
    }
  }
};
</script>

