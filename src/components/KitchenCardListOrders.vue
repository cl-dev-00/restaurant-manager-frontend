<template>
  <v-list-item :key="order.idPedido">
    <template v-slot:default="{ active }">
      <v-list-item-action>
        <v-list-item-title class=" font-weight-bold">
          {{ order.cantidad }}
        </v-list-item-title>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title
          style="white-space: normal; word-wrap: break-word; width: 60px; font-weight: bold;"
        >
          {{ order.menu_item.nombre_Item }}
        </v-list-item-title>
        <v-list-item-subtitle class="text--primary">
          {{ order.menu_item.detalles_item }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon v-if="!active" color="grey lighten-1" small>
          mdi-thumb-up
        </v-icon>
        <v-icon v-else color="green darken-3"> mdi-thumb-up </v-icon>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script>
export default {
  name: "KitchenCardListOrders",
  props: {
    order: {
      type: Object,
    },
  },
};
</script>