<template>
  <v-col cols="12" sm="7" class="col-menu">
    <v-row style="margin-bottom: -40px">
      <v-col>
        <v-text-field label="Buscar" outlined clearable v-model="txt_buscar" ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="col-12 ml-0 mr-0 pl-0 pr-0">
      <v-card class="mx-auto col-12" color="rgb(247, 247, 247)">
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
          <v-btn :disabled="step === 1" text @click="seleccionarCategoria(1)">
            Back
          </v-btn>
          <span>{{ cat }}</span>
        </v-card-title>
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-row class="ml-2">
              <v-col
                v-for="item in items"
                :key="item.nombre"
                xs="12"
                sm="4"
                md="4"
                lg="3"
                xl="2"
                class="mb-4"
              >
                <v-btn
                  min-height="120"
                  max-height="120"
                  min-width="90%"
                  max-width="90%"
                  class="caption mx-auto"
                  color="#222"
                  id="boton_categoria"
                  :disabled="step === 2"
                  depressed
                  @click="seleccionarCategoria(item.nombre)"
                >
                  <span class="boton_a">{{ item.nombre }}</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="2">
            <v-row class="ml-2">
              <v-col class="col-12 mx-auto">
                <v-list-item-group>
                  <v-list-item v-for="itm in items_menu" :key="itm.name">
                    <v-list-item-icon>
                      <v-icon dark color="#7E6990" v-text="icon1"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ itm.name }}
                    </v-list-item-title>
                    <v-list-item-avatar>
                      {{ itm.precio }}
                    </v-list-item-avatar>
                  </v-list-item>
                </v-list-item-group>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "WaitersCardCategory",
  components: {},

  data() {
    return {
      hasItems: false,
      accounts: [],
      total: 0,
      txt_buscar:''  ,

      step: 1,
      message4: "Buscar",
      message_comentarios: "Comentarios",
      total_sample: "0.00",
      c1: "rgb(52, 166, 186)",
      icon1: "mdi-arrow-right-box",
      cat: "Categorias",

      items_menu: [
        { name: "Hamburguesa", precio: "6.99" },
        { name: "Pollo Frito", precio: "5.99" },
        { name: "Pastel de Chocolate", precio: "2.99" },
        { name: "Coca cola 300ml", precio: "1.99" },
      ],

      items: [
        { id: "0", nombre: "Entradas", color: "rgb(212, 144, 42)" },
        { id: "1", nombre: "Carnes", color: "rgb(165, 201, 46)" },
        { id: "2", nombre: "Pollo", color: "rgb(62, 166, 46)" },
        { id: "3", nombre: "Comida Mexicana", color: "rgb(65, 181, 117)" },
        { id: "4", nombre: "Hamburguesas", color: "rgb(52, 166, 186)" },
        { id: "5", nombre: "Ensaladas", color: "rgb(156, 100, 245)" },
        { id: "6", nombre: "Postres", color: "rgb(56, 118, 194)" },
        { id: "7", nombre: "Bebidas Alcoholicas", color: "rgb(106, 79, 196)" },
        { id: "8", nombre: "Bebidas sin Alcohol", color: "rgb(195, 10, 201)" },
      ],
      
    };
  },
  methods: {

    seleccionarCategoria(categoria_clickeada) {
     var nombre_categoria; 

     this.items.forEach(nombre => {       
       if(nombre = categoria_clickeada){
        nombre_categoria = categoria_clickeada;
       }    
     });
    
     switch(categoria_clickeada){
         case 1:
             this.cat="Categorías"
             this.step--
             break
         case nombre_categoria:
             this.cat=categoria_clickeada
             this.step++
             break
         default:

     }
    },

    
  },

};

</script>

<style lang="css" scoped>
@media only screen and (max-width: 600px) {
  .col-menu {
    visibility: hidden;
    height: 0;
    padding: 0;
    margin: 0;
  }
}

#boton_categoria .boton_a {
  font-size: 2ch;
  white-space: normal;
  word-wrap: break-word;
  width: 100px;
  align-content: center;
  color: white;
  padding: 10px;
}
</style>