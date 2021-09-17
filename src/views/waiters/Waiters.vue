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
        <!-- BOTONES DE CATEGORIAS  category in categories.items category.nombreCategoria -->
        <!--
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
              color="#222"
              id="boton_categoria"
            >
              <span class="boton_a">{{ item.nombre }}</span>
            </v-btn>
          </v-col>
        </v-row>

        -->
        <v-row class="col-12 ml-0 mr-0 pl-0 pr-0">
          <v-card class="mx-auto col-12" color="rgb(247, 247, 247)">
            <v-card-title
              class="text-h6 font-weight-regular justify-space-between"
            >
              <v-btn
                :disabled="step === 1"
                text
                @click="seleccionarCategoria(1)"
              >
                Back
              </v-btn>
              <span>{{ cat }}</span>
              <!--
              <v-avatar
                color="primary lighten-2"
                class="subheading white--text"
                size="24"
                v-text="step"
              ></v-avatar>
              -->
            </v-card-title>

            <v-window v-model="step">
              <v-window-item :value="1">
                <!--
        <v-card-text>
          <v-text-field
            label="Email"
            value="john@vuetifyjs.com"
          ></v-text-field>
          <span class="text-caption grey--text text--darken-1">
            This is the email you will use to login to your Vuetify account
          </span>
        </v-card-text>
 -->
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
                <!--
        <v-card-text>
          <v-text-field
            label="Password"
            type="password"
          ></v-text-field>
          <v-text-field
            label="Confirm Password"
            type="password"
          ></v-text-field>
          <span class="text-caption grey--text text--darken-1">
            Please enter a password for your account
          </span>
        </v-card-text>
        -->
                <v-row class="ml-2">
                  <v-col class="col-12 mx-auto">
                    <v-list-item-group>
                      <v-list-item v-for="itm in items_menu" :key="itm.name">
                        <v-list-item-icon>
                          <v-icon dark color="#7E6990" v-text="icon1"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-title
                          >{{ itm.name }} ........................{{
                            itm.precio
                          }}
                        </v-list-item-title>
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

      <!-- SECCION DE ORDEN category.nombreCategoria  -->
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
                    class="ma-1 rounded-circle"
                    height="40"
                    width="40"
                    @click="toggle"
                  >
                    <v-row
                      class="fill-height mt-0 pt-0"
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
  mounted() {
    this.$services.waiters
      .getCategories()
      .then((response) => {
        if (response.data.ok) {
          this.categories = response.data.collection;
        } else {
          console.log("El servidor revento");
        }

        console.log(this.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      categories: {
        collection: {
          hasItems: false,
          items: [],
          total: 0,
        },
      },

      step: 1,
      message4: "Buscar",
      message_comentarios: "Comentarios",
      total_sample: "0.00",
      c1: "rgb(52, 166, 186)",
      icon1: "mdi-arrow-right-box",
      cat: "Categoria",

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
    
    seleccionarCategoria(w) {
      switch (w) {
          case 1:
          this.cet = 0;
          this.step--;
           this.cat = "Categorías";
          break;
        case "Entradas":
          this.cat = "Entradas";
          this.step++;
          break;
        case "Carnes":
          this.cat = "Carnes";
          this.step++;
          break;
          case "Pollo":
          this.cat = "Pollo";
          this.step++;
          break;
        case "Comida Mexicana":
          this.cat = "Comida Mexicana";
          this.step++;
          break;  
        default:
          this.cat = "Categorías";
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
@media screen and (min-width: 600px) {
  .buscar_en_responsivo {
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