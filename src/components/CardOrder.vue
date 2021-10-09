<template>
  <v-card id="card" min-height="auto" max-height="auto">
   
    <!-- Header de las Card -->
    <v-list-item three-line :class="color">
      <v-list-item-content class="white--text">
        <v-list-item-title class="text-h5">{{
          nombreCliente
        }}</v-list-item-title>
        <v-list-item-subtitle class="white--text"
          >Mesero - Numero de Mesa</v-list-item-subtitle
        >
        <v-list-item-subtitle class="white--text">{{
          nombreMesero
        }} - Nº Mesa</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  
    <!-- Listado de items de la orden   <waiter-card-list-orders :order="order" /> -->
    <v-responsive max-height="auto">
      <v-list two-line height="">
        <v-list-item-group active-class="green--text" multiple>
          <template v-for="order in orders">
            <v-list-item :key="order.idPedido">
              <template>
                <v-list-item>
                  <template v-slot:default="{ active }">
                  
                     <!-- Cantidad -->
                    <v-list-item-action>
                      <v-list-item-title class="font-weight-bold">
                        {{ order.cantidad }}
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
                        {{ order.menu_item.nombre_Item }}
                      </v-list-item-title>
                      <v-list-item-subtitle 
                      class="text--primary"
                          style=" 
                          white-space: normal;
                          word-wrap: break-word;
                          width: 60px;                          
                          ">
                        Comentario: {{ order.menu_item.detalles_item }}
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <!-- Like o Precio (Sub Total por item) -->
                    <!-- Like para Cocina -->
                    <v-list-item-action v-if="tipoCard === 'Cocina'" >
                      <v-icon v-if="!active" color="grey lighten-1" small>
                        mdi-thumb-up
                      </v-icon>
                      <v-icon v-else color="green darken-3">
                        mdi-thumb-up
                      </v-icon>
                    </v-list-item-action>
                    <!-- Precio para los demás -->
                    <v-list-item-action v-if="tipoCard !== 'Cocina'" >
                      <span>$ {{ order.importe}}</span>  
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
     <v-spacer></v-spacer>

     <v-row class="mt-0 mb-1 align-center justify-center d-block" v-if="tipoCard !== 'Cocina'"> 
     <v-divider></v-divider>
     <br>
    <span class="ml-12 font-weight-bold d-block"> Total : Aqui va el total</span>
    <br>
    <v-divider></v-divider>
    </v-row>
     
    </v-responsive>

    <!-- Boton Cards -->

    <!-- MESERO -->
    <v-card-actions  v-if="tipoCard === 'Mesero'">
      <v-spacer></v-spacer>
      <v-btn class="mb-1" fab dark color="success" @click="doneOrderEmit">
        <v-icon dark> mdi-check </v-icon>
      </v-btn>
    </v-card-actions>

    <!-- COCINA -->
    <v-card-actions  v-if="tipoCard === 'Cocina'">
      <v-spacer></v-spacer>
      <v-btn class="mb-1" fab dark color="success" @click="doneOrderEmit">
        <v-icon dark> mdi-food </v-icon>
      </v-btn>
    </v-card-actions>

    <!-- CAJERO -->
    <v-card-actions  v-if="tipoCard === 'Cajero'">
      <v-spacer></v-spacer>
      <v-btn class="mb-1" fab dark color="success" @click="doneOrderEmit">
        <v-icon dark> mdi-hand-okay </v-icon>
      </v-btn>
    </v-card-actions>

     <!-- CAJERO PAGAR-->

    <v-card-actions  v-if="tipoCard === 'CajeroPay'">
      <v-spacer></v-spacer>
      <v-btn class="mb-1" fab dark color="success" @click="doneOrderEmit">
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
     
    };
  },

  props: {
     tipoCard: {
      type: String,
      required: true,
    },

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
      this.$emit("doneOrderEmit");
      this.toggleClass();
    },

    toggleClass() {
      const el = document.getElementById("card");
      el.classList.toggle("fadeOut");
    },
  },

  mounted() {

    
    switch(this.tipoCard){
     
     case "Cocina":
     this.color = "pink"
     break;

     case "Mesero":
     this.color = "blue darken-2"
     break;

     case "Cajero":
     this.color = "indigo"
     break;

     case "CajeroPay":
     this.color = "teal darken-2"
     break;

    default: 
    this.color = "black"; 
    };

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