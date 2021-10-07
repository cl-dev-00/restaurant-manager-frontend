<template>
  <!-- SECCION DE ORDEN category.nombreCategoria  -->
  <v-col class="col-orden col-12">
    <v-form ref="form" class="mx-2" lazy-validation>
      <!-- TEXTO DE ORDEN -->
      <v-row>
        <h3 class="ml-4 mt-4 mb-0 display-1">Orden</h3>
      </v-row>
      <!-- Orden -->
      <v-row class="mt-0">
        <v-col cols="6" sm="6">
          <!-- Input de la orden -->
          <v-text-field
            color="purple darken-2"
            label="Nombre cliente"
            v-model="nombreCliente"
            required
            clearable
            :rules="rulesText"
          ></v-text-field>
        </v-col>
        <v-col cols="3" sm="3" class="mt-5 h4 align-center">
          <label>#000000</label>
          <!-- LABEL -->
        </v-col>
        <v-col cols="3" sm="3" class="mt-3">
          <v-btn
            @click="clearFormOrder"
            fab
            dark
            small
            color="rgb(204, 66, 39)"
          >
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
      <v-row v-for="menu in itemSelects" :key="menu.id_nombre_item">
        <v-col class="col-4">{{ menu.nombre_Item }}</v-col>
        <v-col class="col-5 pl-4 pr-4" style="margin-top: -20px">
          <v-text-field
            v-model.number="menu.cantidad"
            :rules="rulesCantidad"
            type="number"
            append-outer-icon="mdi-plus"
            @click:append-outer="increment(menu)"
            prepend-icon="mdi-minus"
            @click:prepend="decrement(menu)"
          ></v-text-field>
        </v-col>
        <v-col class="col-3">$ {{ menu.precio }}</v-col>
        <v-col class="col-12"
          ><v-textarea
            class="ml-3 mr-3"
            outlined
            name="input-2-4"
            label="Comentario Opcional"
            v-model="comentarios"
            prepend-icon="mdi-comment-text-multiple"
            clearable
            rows="1"
          ></v-textarea>
        </v-col>
      </v-row>

      <!-- TOTALES -->
      <v-divider class="mt-6 mb-2"></v-divider>
      <v-row style="margin-bottom: -25px" class="mt-2">
        <!-- Sub Total -->
        <v-col class="col-8"><h4>Sub Total</h4></v-col>
        <v-col class="col-4">$ {{ subTotal }}</v-col>
      </v-row>
      <v-row style="margin-bottom: -25px">
        <!-- Impuestos -->
        <v-col class="col-8"><h4>Impuestos</h4></v-col>
        <v-col class="col-4">$ {{ impuestos }}</v-col>
      </v-row>
      <v-row>
        <!-- Total-->
        <v-col class="col-8"><h4>Total</h4></v-col>
        <v-col class="col-4">$ {{ total }}</v-col>
      </v-row>
      <!-- BOTON COCINA-->
      <v-row>
        <v-col cols="col-12">
          <v-dialog transition="dialog-bottom-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                x-large
                color="success"
                @click="addOrder"
                block
                class="mb-5"
                :disabled="itemSelects.length < 1"
              >
                Enviar a Cocina</v-btn
              >
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar color="success" dark
                  >Orden Enviada</v-toolbar
                >
                <v-card-text>
                  <div class="text-h6 mt-6">Tu orden ha sido enviada a cocina correctamente.</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog.value = false">Cerrar</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>
    </v-form>
  </v-col>
</template>

<script>
import WaiterCardCategory from "../components/WaitersCardCategory.vue";

export default {
  name: "WaitersFormOrder",
  props: {
    itemSelects: {
      type: Array,
      required: true,
    },
  },
  components: {
    WaiterCardCategory,
  },

  data() {
    return {
      hasItems: false,
      accounts: [],

      message4: "Buscar",
      message_comentarios: "Comentarios",
      icon1: "mdi-arrow-right-box",

      itemsOrder: [],

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
      nombreCliente: "",
      comentarios: "",
      minLenght: 3,
      minNum: 1,
    };
  },
  computed: {
    total() {
      return (parseFloat(this.subTotal) + parseFloat(this.impuestos)).toFixed(
        2
      );
    },
    subTotal() {
      return this.itemSelects
        .reduce((acc, item) => acc + item.precio * item.cantidad, 0)
        .toFixed(2);
    },
    impuestos() {
      return this.itemSelects
        .reduce((acc, item) => acc + item.cantidad * (item.precio * 0.13), 0)
        .toFixed(2);
    },

    rulesText() {
      const rules = [];

      if (this.minLenght) {
        const rule = (v) =>
          (v || "").length >= this.minLenght ||
          `Se necesitan al menos ${this.minLenght} caracteres`;

        rules.push(rule);
      }

      return rules;
    },
    rulesCantidad() {
      const rules = [];

      if (this.minNum) {
        const rule = (v) => {
          if (!isNaN(parseFloat(v)) && v >= this.minNum) return true;

          return "La cantidad debe ser mayor a cero";
        };

        rules.push(rule);
      }

      return rules;
    },
  },
  methods: {
    increment(menu) {
      menu.cantidad = parseInt(menu.cantidad, 10) + 1;
    },
    decrement(menu) {
      if (menu.cantidad > 1) {
        menu.cantidad = parseInt(menu.cantidad, 10) - 1;
      }
    },

    addOrder() {
      if (!this.$refs.form.validate()) {
        return;
      }

      const account = {
        nombreCliente: this.nombreCliente,
        comentarios: this.comentarios,
        fechaCuenta: new Date().toJSON().slice(0, 10),
        idEmpleado: this.$store.getters.user.idEmpleado,
      };

      this.$services.orders
        .createAccount(account)
        .then((response) => {
          if (response.data.ok) {
            const idCuenta = response.data.account.idCuenta;

            const orders = this.itemSelects.map(
              ({ nombre_Item, precio, ...item }) => ({
                ...item,
                importe: item.cantidad * precio,
                idCuenta,
              })
            );

            this.$services.orders
              .createOrders({ orders })
              .then((response) => {
                if (response.data.ok) {
                  !this.$refs.form.reset();
                  this.$emit("clearitemSelects");
                  console.log("orders preview", orders);
                  console.log("response", response.data);
                  console.log("Ah perro se logro xdxd");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearFormOrder() {
      console.log("click");
      !this.$refs.form.reset();
      this.$emit("clearitemSelects");
    },
  },
};
</script>

<style lang="css" scoped>
@media screen and (min-width: 600px) {
  .buscar_en_responsivo {
    visibility: hidden;
    height: 0;
    padding: 0;
    margin: 0;
  }
}
</style>