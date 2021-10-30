<template>
  <v-card :id="order.idOrden" min-height="auto" max-height="auto">
    <!-- Header de las Card -->
    <v-list-item three-line :class="color">
      <v-list-item-content class="white--text">
        <v-list-item-title class="text-h5">{{
          order.nombreCliente
        }}</v-list-item-title>
        <v-list-item-subtitle class="white--text"
          >Mesero - Numero de Mesa</v-list-item-subtitle
        >
        <v-list-item-subtitle class="white--text"
          >{{ order.employee.nombre }} {{ order.employee.apellido }} - 
          {{ order.table? 'Mesa ' + order.table.numero : 'Para llevar' }}
          </v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>

    <!-- Listado de items de la orden   <waiter-card-list-orders :order="order" /> -->
    <v-responsive max-height="auto">
      <v-list two-line height="">
        <v-list-item-group
          v-model="selected"
          active-class="green--text"
          multiple
        >
          <template v-for="orderDetail in order.order_details">
            <v-list-item
              :key="orderDetail.idOrderDetail"
              @click="changeDoneOrderDetail(orderDetail.idOrderDetail)"
            >
              <template v-slot:default="{ active = true }">
                <!-- Cantidad -->
                <v-list-item-action>
                  <v-list-item-title class="font-weight-bold">
                    {{ orderDetail.cantidad }}
                  </v-list-item-title>
                </v-list-item-action>

                <!-- Titulo y Subtitulo -->
                <v-list-item-content>
                  <v-list-item-title
                    style="
                      white-space: normal;
                      word-wrap: break-word;
                      width: 60px;
                      font-weight: bold;
                    "
                  >
                    {{ orderDetail.menu_item.nombre_item }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    class="text--primary"
                    style="
                      white-space: normal;
                      word-wrap: break-word;
                      width: 60px;
                    "
                  >
                    {{ orderDetail.comentario }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <!-- Like o Precio (Sub Total por item) -->
                <!-- Like para Cocina -->
                <v-list-item-action v-if="tipoCard === 'Cocina'">
                  <v-icon v-if="!active" color="grey lighten-1" small>
                    mdi-thumb-up
                  </v-icon>
                  <v-icon v-else color="green darken-3"> mdi-thumb-up </v-icon>
                </v-list-item-action>
                <!-- Precio para los demás -->
                <v-list-item-action v-if="tipoCard !== 'Cocina'">
                  <span>$ {{ orderDetail.importe }}</span>
                </v-list-item-action>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
      <v-spacer></v-spacer>

      <v-row
        class="mt-0 mb-1 align-center justify-center d-block"
        v-if="tipoCard !== 'Cocina'"
      >
        <v-divider></v-divider>
        <br />
        <span class="ml-12 font-weight-bold d-block">
          Total : Aqui va el total</span
        >
      </v-row>
    </v-responsive>

    <!-- Boton Cards -->

    <!-- MESERO -->
    <v-card-actions v-if="tipoCard === 'Mesero'" class="mt-5">
      <v-btn
        class="mb-1"
        small
        absolute
        bottom
        left
        fab
        dark
        color="orange darken-2"
      >
        <v-icon size="20"> mdi-pencil </v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn
        class="mb-1"
        absolute
        bottom
        right
        fab
        dark
        color="success"
        @click="doneOrderEmit"
      >
        <v-icon dark> mdi-check </v-icon>
      </v-btn>
    </v-card-actions>

    <!-- COCINA -->
    <v-card-actions v-if="tipoCard === 'Cocina'">
      <v-spacer></v-spacer>
      <v-btn
        class="mb-1"
        absolute
        bottom
        right
        fab
        dark
        color="success"
        @click="doneOrderEmit"
      >
        <v-icon dark> mdi-food </v-icon>
      </v-btn>
    </v-card-actions>

    <!-- CAJERO -->
    <v-card-actions v-if="tipoCard === 'Mesero'" class="mt-5">
      <v-btn
        class="mb-1"
        small
        absolute
        bottom
        left
        fab
        dark
        @click="editOrder()"
        color="orange darken-2"
      >
        <v-icon size="20"> mdi-pencil </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        class="mb-1"
        absolute
        bottom
        right
        fab
        dark
        color="success"
        @click="deliveryOrderEmit()"
      >
        <v-icon dark> mdi-check </v-icon>
      </v-btn>
    </v-card-actions>

    <!-- CAJERO PAGAR-->

    <v-card-actions v-if="tipoCard === 'CajeroPay'">
      <v-spacer></v-spacer>
      <v-btn
        class="mb-1"
        absolute
        bottom
        right
        fab
        dark
        color="success"
        @click="paymentOrderEmit()"
      >
        <v-icon dark> mdi-cash </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CardOrder",
  components: {},
  data() {
    return {
      color: "black",
      selected: [],
    };
  },
  mounted() {
     this.order.order_details.forEach((orderDetail, index) => {

      if(orderDetail.done) {
        this.selected = [...this.selected, index];
      }
    });


    switch (this.tipoCard) {
      case "Cocina":
        this.color = "pink";
        break;

      case "Mesero":
        this.color = "blue darken-2";
        break;

      case "Cajero":
        this.color = "indigo";
        break;

      case "CajeroPay":
        this.color = "teal darken-2";
        break;

      default:
        this.color = "black";
    }
  },

  props: {
    order: {
      type: Object,
      required: true,
    },

    tipoCard: {
      type: String,
      required: true,
    },

    //PROPIEDADES PARA LOS TIPOS: COCINA, MESERO, CAJERO, CAJERO PARA PAGAR

    /*  

    COCINA
    
    Color: pink
    
    Elementos de la lista de items para Cocina
    Estructura: 
    ----------------------------------------------
    | Cantidad  |  Titulo / Subtitulo  |  Like   |
    ----------------------------------------------
    |    1      | Cipitio              |  Like   |
    |           | Comentario de pedido |         |
    ----------------------------------------------
    
    Boton: Check para marcar como lista

    */
    /*  
    
    MESERO, 
    
    Color: indigo
    
    Elementos de la lista de items para los que no son cocina
    Estructura: 
    ----------------------------------------------
    | Cantidad  |  Titulo / Subtitulo  |  Precio |
    ----------------------------------------------
    |    1      | Cipitio              |  $ 2.5  |
    |           | Comentario de pedido |         |
    ----------------------------------------------
    
    Boton: Check para marcar como entregado

    */
  },

  methods: {
    doneOrderEmit() {
      // this.toggleClass();
      this.$emit("doneOrderEmit");
    },
    paymentOrderEmit() {
      console.log('payment')
      // this.toggleClass();
      this.$emit("paymentOrderEmit");
    },
    deliveryOrderEmit() {
      console.log('delivery')
      // this.toggleClass();
      this.$emit("deliveryOrderEmit");
    },
    editOrder() {
      this.$emit('editOrderEmit', this.order.idOrden);
    },

    toggleClass() {
      const el = document.getElementById(`${this.order.idOrden}`);
      el.classList.add("fadeOut");
    },

    changeDoneOrderDetail(id) {
      this.$services.socketioService.changeDoneOrderDetail(id);
    },
  },
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
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>