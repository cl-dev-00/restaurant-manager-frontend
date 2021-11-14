<template>
  <masonry
    :cols="{ default: 3, 1266: 2, 700: 1 }"
    :gutter="{ default: '10px', 700: '10px' }"
  >
    <div
      v-for="order in orders.items"
      :key="order.idOrden"
      class="mb-10 mt-1 zoomInUp"
      id="items"
    >
      <app-card-order
        :order="order"
        :tipoCard="tipoCard"
        @doneOrderEmit="doneOrder"
        @paymentOrderEmit="paymentOrder"
        @deliveryOrderEmit="deliveryOrder"
      />
    </div>
  </masonry>
</template>

<script>
import AppCardOrder from "./AppCardOrder.vue";
import { toastMessage } from "../helpers/messages";

export default {
  name: "AppContainerCardsOrders",
  components: {
    AppCardOrder,
  },
  props: {
    tipoCard: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    orders: {
      items: [],
      hasItems: false,
    },
    
  }),
  mounted() {
     var total = 0;
     
    this.$services.shareds.getOrdersUndone().then((response) => {
      if (response.data.ok) {
        this.orders = response.data.collection;
       console.log(response.data.collection);

        var n = 3;
         console.log("Mesero: " + response.data.collection.items[n].employee.nombre);
        //console.log("Mesa: " + this.orders.items[n].table.numero);
        //console.log("Cliente: " + this.orders.items[n].nombreCliente);
        //  console.log("-------------------------");
        var size = Object.keys(response.data.collection.items[n].order_details).length;   
       for (let i = 0; i <= size; i++) {
          var cantidad = this.orders.items[n].order_details[i].cantidad; 
          var nombre = this.orders.items[n].order_details[i].menu_item.nombre_item;  
          var importe = this.orders.items[n].order_details[i].importe;  
          
            console.log("Items: " + cantidad +" -- " +nombre +" -- $" +importe); 
       // total += parseFloat(response.data.collection.items[n].order_details[i].importe);
        }
        //  console.log("-------------------------");
        console.log("Total: " + total);
        console.log("SubTotal: " + data);
        console.log("Impuestos: ");
      }
        
    });

    if (this.tipoCard === "Cocina") {
      this.$services.socketioService.getSendOrder((payload) => {
        this.orders.items = [...this.orders.items, payload];
      });
    } else if (this.tipoCard === "Mesero") {
      this.$services.socketioService.getDoneOrder((payload) => {
        this.orders.items = [...this.orders.items, payload];
      });
    } else if (this.tipoCard === "CajeroPay") {
      this.$services.socketioService.getDeliveryOrder((payload) => {
        this.orders.items = [...this.orders.items, payload];
      });
    }
  },
  methods: {
    doneOrder(id) {
      this.$services.shareds
        .changeStateOrder(id)
        .then((response) => {
          if (response.data.ok) {
            if (response.data.isCashier) {
              this.$services.socketioService.deliveryOrder(response.data.order);
            } else {
              this.$services.socketioService.doneOrder(response.data.order);
            }

            this.orders.items = this.orders.items.filter(
              (order) => order.idOrden !== id
            );

            toastMessage(
              "success",
              "Exito",
              "Se realizo la orden correctamente"
            );
          }
        })
        .catch((error) => {
          console.log(error);

          toastMessage("error", "Error :(", "No se pudo realizar la orden");
        });
    },

    paymentOrder(id) {
      this.$services.shareds
        .changeStateOrder(id)
        .then((response) => {
          if (response.data.ok) {
            this.orders.items = this.orders.items.filter(
              (order) => order.idOrden !== id
            );

            toastMessage(
              "success",
              "Exito",
              "Se realizo la orden correctamente"
            );
          }
        })
        .catch((error) => {
          console.log(error);

          toastMessage("error", "Error :(", "No se pudo realizar la orden");
        });
    },
    deliveryOrder(id) {
      this.$services.shareds
        .changeStateOrder(id)
        .then((response) => {
          if (response.data.ok) {
            this.$services.socketioService.deliveryOrder(response.data.order);
            this.orders.items = this.orders.items.filter(
              (order) => order.idOrden !== id
            );

            toastMessage(
              "success",
              "Exito",
              "Se realizo la orden correctamente"
            );
          }
        })
        .catch((error) => {
          console.log(error);

          toastMessage("error", "Error :(", "No se pudo realizar la orden");
        });
    },
  },
};
</script>

<style scoped>
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