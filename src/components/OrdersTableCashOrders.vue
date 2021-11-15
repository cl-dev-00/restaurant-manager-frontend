<template>
  <v-container>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" class="elevation-3">
        <v-data-table
          :headers="headers"
          :items="orders.items"
          sort-by="fecha"
          :sort-desc="true"
        >
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script >
import { toastMessage } from "../helpers/messages";

export default {
  name: "OrdersTableCashOrders",
  mounted() {
    this.$services.orders
      .getOrdersPaidout()
      .then((response) => {
        if (response.data.ok) {
          this.orders = response.data.collection;
         
          const totales = this.orders.items.reduce((acc, order) => {
            return order.total + acc;
          }, 0);

          this.$emit('totalOrdersEmit', totales);
        }
      })
      .catch((error) => {
        toastMessage("error", "Error :(", "No se cargar las ordenes");
        console.log(error);
      });

    this.$services.socketioService.getPaidoutOrder((order) => {
      const { order_details, fechaOrden, ...props } = order;

      this.$emit('totalOrdersEmit', order.total);
      this.orders.items = [
        ...this.orders.items,
        {
          ...props,
          fechaOrden: fechaOrden.slice(0, 19).replace("T", " ").split(","),
        },
      ];
    });
  },
  data: () => ({
    headers: [
      {
        text: "Cliente",
        align: "start",
        value: "nombreCliente",
      },
      { text: "Total ($ USD)", value: "total" },
      { text: "Fecha", value: "fechaOrden" },
    ],
    orders: {
      items: [],
      hasItems: false,
    },
  }),
};
</script>