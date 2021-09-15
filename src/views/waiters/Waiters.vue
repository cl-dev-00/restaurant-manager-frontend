<template>
  <v-container>
    <v-row>
      <!-- SECCION DE MENU -->
      <v-col cols="12" sm="7" class="col-menu">
        <v-row>
          <v-col>
            <v-text-field label="Buscar" outlined clearable></v-text-field>
          </v-col>
        </v-row>
        <!-- TEXTO DE CATEGORIAS -->
        <v-row>
          <h4 class="ml-4">Categorías</h4>
        </v-row>
        <!-- BOTONES DE CATEGORIAS -->
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.nombre"
            xs="12"
            sm="4"
            md="4"
            lg="3"
            xl="2"
            class="mb-0"
          >
            <v-btn
              min-height="120"
              max-height="120"
              min-width="120"
              max-width="120"
              class="caption"
              color="rgb(165, 201, 46)"
              id="boton_categoria"
            >
            <span class="boton_a">{{ item.nombre }}</span>
              
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <!-- SECCION DE ORDEN -->
      <v-col cols="12" sm="5" class="col-orden">
        <!-- TEXTO DE ORDEN -->
        <v-row>
          <h4 class="ml-4 mt-4 mb-0">Orden</h4>
        </v-row>
        <!-- Orden -->
        <v-row class="mt-0">
          <v-col cols="6" sm="6">
            <!-- Input de la orden -->
            <v-text-field
              color="purple darken-2"
              label="Nueva Orden"
              required
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="3" sm="3" class="mt-5 h4 align-center">
            <label>#000000</label>
            <!-- LABEL -->
          </v-col>
          <v-col cols="3" sm="3" class="mt-3">
            <v-btn fab dark small color="rgb(204, 66, 39)">
              <!-- boton borrar -->
              <v-icon dark> mdi-delete </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <!-- TEXTO DE NUMERO DE MESA -->
        <v-row>
          <h4 class="ml-4 mt-0 mb-0">Numero de mesa</h4>
        </v-row>
        <!-- SELECTOR DE MESA -->
        <v-row>
          <v-col sm="12">
            <v-sheet class="mx-auto" elevation="8">
              <v-slide-group
                v-model="model"
                class="pa-0"
                active-class="success"
                show-arrows
              >
                <v-slide-item
                  v-for="n in mesas"
                  :key="n.numero"
                  v-slot="{ active, toggle }"
                >
                  <v-card
                    :color="active ? undefined : 'grey lighten-1'"
                    class="ma-1"
                    height="40"
                    width="40"
                    @click="toggle"
                  >
                    <v-row
                      class="fill-height mt-1 pt-0"
                      align="center"
                      justify="center"
                    >
                      {{ n.numero }}
                    </v-row>
                  </v-card>
                </v-slide-item>
              </v-slide-group>
            </v-sheet>
          </v-col>
        </v-row>
        <!-- TEXTO DE ITEMS -->
        <v-divider class="mt-5"></v-divider>
        <v-row class="mt-4">
          <h4 class="ml-4 mt-0 mb-0">Items:</h4>
        </v-row>
        <!-- ITEMS SELECCIONADOS -->
        <v-row v-for="menu in items_menu" :key="menu.name">
          <v-col class="col-4">{{ menu.name }}</v-col>
          <v-col class="col-5 pl-4 pr-4" style="margin-top: -20px">
            <v-text-field
              v-model="foo"
              type="number"
              append-outer-icon="mdi-plus"
              @click:append-outer="increment"
              prepend-icon="mdi-minus"
              @click:prepend="decrement"
            ></v-text-field>
          </v-col>
          <v-col class="col-3">$ {{ menu.precio }}</v-col>
        </v-row>

        <v-row class="buscar_en_responsivo">
          <v-text-field
            class="ml-3 mr-3"
            label="Buscar"
            block
            outlined
            clearable
            prepend-inner-icon="mdi-magnify-plus"
          ></v-text-field>
        </v-row>

        <!-- INPUT PARA COMENTARIOS -->
        <v-divider class="mt-2"></v-divider>
        <v-row class="mt-3">
          <h4 class="ml-2 mt-0 mb-2 col-12">Comentarios o Indicaciones</h4>
          <v-textarea
            class="ml-3 mr-3"
            outlined
            name="input-2-4"
            label="Opcional"
            value="Indicaciones de la orden..."
            prepend-icon="mdi-comment-text-multiple"
            clearable
          ></v-textarea>
        </v-row>
        <!-- TOTALES -->
        <v-divider></v-divider>
        <v-row style="margin-bottom: -25px">
          <!-- Sub Total -->
          <v-col class="col-8"><h4>Sub Total</h4></v-col>
          <v-col class="col-4">$ {{ total_sample }}</v-col>
        </v-row>
        <v-row style="margin-bottom: -25px">
          <!-- Impuestos -->
          <v-col class="col-8"><h4>Impuestos</h4></v-col>
          <v-col class="col-4">$ {{ total_sample }}</v-col>
        </v-row>
        <v-row>
          <!-- Total-->
          <v-col class="col-8"><h4>Total</h4></v-col>
          <v-col class="col-4">$ {{ total_sample }}</v-col>
        </v-row>
        <!-- BOTON COCINA-->
        <v-row>
          <v-btn x-large color="success" dark block class="mb-5">
            Enviar a Cocina
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      message4: "Buscar",
      message_comentarios: "Comentarios",
      total_sample: "0.00",

      items_menu: [
        { name: "Hamburguesa", precio: "6.99" },
        { name: "Pollo Frito", precio: "5.99" },
        { name: "Pastel de Chocolate", precio: "2.99" },
        { name: "Coca cola 300ml", precio: "1.99" },
      ],

      items: [
        { nombre: "Entradas" },
        { nombre: "Carnes" },
        { nombre: "Pollo" },
        { nombre: "Comida Mexicana" },
        { nombre: "Hamburguesas" },
        { nombre: "Ensaladas" },
        { nombre: "Postres" },
        { nombre: "Bebidas Alcoholicas" },
        { nombre: "Bebidas sin Alcohol" },
      ],

      colores: [
        { color: "rgb(209, 53, 42)" },
        { color: "rgb(212, 144, 42)" },
        { color: "rgb(165, 201, 46)" },
        { color: "rgb(62, 166, 46)" },
        { color: "rgb(65, 181, 117)" },
        { color: "rgb(52, 166, 186)" },
        { color: "rgb(56, 118, 194)" },
        { color: "rgb(106, 79, 196)" },
      ],

      mesas: [
        { numero: "N/A" },
        { numero: "1" },
        { numero: "2" },
        { numero: "3" },
        { numero: "4" },
        { numero: "5" },
        { numero: "6" },
        { numero: "7" },
        { numero: "8" },
        { numero: "9" },
        { numero: "10" },
        { numero: "11" },
        { numero: "12" },
        { numero: "13" },
        { numero: "14" },
        { numero: "15" },
      ],

      model: null,

      foo: 0,
    };
  },
  methods: {
    increment() {
      this.foo = parseInt(this.foo, 10) + 1;
    },
    decrement() {
      this.foo = parseInt(this.foo, 10) - 1;
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
@media screen and (min-width: 600px) {
  .buscar_en_responsivo {
    visibility: hidden;
    height: 0;
    padding: 0;
    margin: 0;
  }
}

#boton_categoria .boton_a{
 font-size: 12pt; 
 white-space: normal;
 word-wrap: break-word;
 width: 100px;
 align-content: center;
  
}
</style>