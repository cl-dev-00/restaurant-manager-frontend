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
            v-if="!isEdit"
            color="purple darken-2"
            label="Nombre cliente"
            v-model="nombreCliente"
            required
            clearable
            :rules="rulesText"
          ></v-text-field>
          <v-text-field
            v-else
            color="purple darken-2"
            label="Nombre cliente"
            v-model="NombreCliente"
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
              v-if="!isEdit"
            >
              <v-slide-item
                v-for="mesa in mesas.items"
                :key="mesa.idMesa"
                v-model="mesaSelect"
              >
                <v-card
                  :color="
                    mesa.idMesa === mesaSelect
                      ? 'green lighten-1'
                      : 'grey lighten-1'
                  "
                  class="ma-1 rounded-circle"
                  height="40"
                  width="40"
                  @click="mesaSelect = mesa.idMesa"
                >
                  <v-row
                    class="fill-height mt-0 pt-0"
                    align="center"
                    justify="center"
                  >
                    {{ mesa.numero }}
                  </v-row>
                </v-card>
              </v-slide-item>
            </v-slide-group>
            <v-slide-group
              v-model="model"
              class="pa-0"
              active-class="success"
              show-arrows
              v-else
            >
              <v-slide-item
                v-for="mesa in mesas.items"
                :key="mesa.idMesa"
                v-model="MesaSelect"
              >
                <v-card
                  :color="
                    mesa.idMesa === MesaSelect
                      ? 'green lighten-1'
                      : 'grey lighten-1'
                  "
                  class="ma-1 rounded-circle"
                  height="40"
                  width="40"
                  @click="MesaSelect = mesa.idMesa"
                >
                  <v-row
                    class="fill-height mt-0 pt-0"
                    align="center"
                    justify="center"
                  >
                    {{ mesa.numero }}
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
      <v-row v-for="(menu, index) in ItemSelects" :key="menu.id_menu_item">
        <v-col class="col-4">{{ menu.nombre_item }}</v-col>
        <v-col class="col-5 pl-4 pr-4" style="margin-top: -20px">
          <v-text-field
            v-model.number="menu.cantidad"
            :rules="rulesCantidad"
            type="number"
            append-outer-icon="mdi-plus"
            @click:append-outer="increment(menu.cantidad, index)"
            prepend-icon="mdi-minus"
            @click:prepend="decrement(menu.cantidad, index)"
            @input="changeCantidad(menu.cantidad, index)"
          ></v-text-field>
        </v-col>
        <v-col class="col-3">$ {{ menu.precio }}</v-col>
        <v-col
          class="col-3"
          v-if="
            isEdit &&
            ItemSelectsEdit.some(
              (item) => item.id_menu_item === menu.id_menu_item
            )
          "
        >
          <v-btn
            @click="removeItem(menu.id_menu_item, index)"
            class="mx-2"
            fab
            dark
            small
            color="pink"
          >
            <v-icon dark> mdi-close-thick </v-icon>
          </v-btn>
        </v-col>
        <v-col
          :class="{
            'col-9':
              isEdit &&
              ItemSelectsEdit.some(
                (item) => item.id_menu_item === menu.id_menu_item
              ),
            'col-12': !isEdit,
          }"
          ><v-textarea
            class="ml-3 mr-3"
            outlined
            name="input-2-4"
            label="Comentario (Opcional)"
            v-model="menu.comentario"
            @input="changeComment(menu.comentario, index)"
            prepend-icon="mdi-comment-text-multiple"
            clearable
            rows="1"
            value=""
          ></v-textarea>
          <v-divider class="mt-6 mb-1"></v-divider>
        </v-col>
      </v-row>

      <!-- TOTALES -->
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
      <v-row v-if="!isEdit">
        <v-col class="col-12">
          <v-dialog transition="dialog-top-transition" max-width="90%">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="success"
                v-bind="attrs"
                v-on="on"
                block
                x-large
                :disabled="!validarEnvio"
                ><v-icon>mdi-currency-usd</v-icon> Pagar</v-btn
              >
            </template>
            <template v-slot:default="dialog">
              <v-row class="justify-center white" dense>
                <v-col class="col-12">
                  <v-btn
                    color="primary"
                    block
                    depressed
                    large
                    @click="dialog.value = false"
                    >Cerrar</v-btn
                  >
                  <form-pay />
                </v-col>
              </v-row>
            </template>
          </v-dialog>
        </v-col>
        <v-col class="col-12">
          <v-btn
            x-large
            color="success"
            @click="addOrder"
            block
            class="mb-5"
            :disabled="!validarEnvio"
          >
            Enviar a Cocina</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-col>
</template>

<script>
import WaiterCardCategory from "./OrdersCardCategory.vue";

import FormPay from "./FormPay.vue";
import { rulesText, rulesCantidad } from "../helpers/rules";

export default {
  name: "OrdersFormData",
  components: {
    WaiterCardCategory,
    FormPay,
  },
  mounted() {
    this.isEdit = this.$route.params.id ? true : false;

    this.$services.orders
      .getTablesAvailable()
      .then((response) => {
        if (response.data.ok) {
          this.mesas = response.data.collection;
          this.mesas.items = [
            { idMesa: null, numero: "N/A" },
            ...this.mesas.items,
          ];
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      hasItems: false,
      accounts: [],

      icon1: "mdi-arrow-right-box",

      mesas: {
        hasItems: false,
        items: [],
      },

      model: null,
      nombreCliente: "",
      mesaSelect: null,
      nombre_valido: false,
      isEdit: false,
    };
  },
  computed: {
    rulesText,
    rulesCantidad,
    total() {
      return (parseFloat(this.subTotal) + parseFloat(this.impuestos)).toFixed(
        2
      );
    },
    subTotal() {
      return this.ItemSelects.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
      ).toFixed(2);
    },
    impuestos() {
      return this.ItemSelects.reduce(
        (acc, item) => acc + item.cantidad * (item.precio * 0.13),
        0
      ).toFixed(2);
    },

    NombreCliente: {
      set(nombreCliente) {
        this.$store.dispatch("setOrderSelectAction", {
          ...this.$store.getters.orderSelect,
          nombreCliente,
        });
      },

      get() {
        return this.$store.getters.orderSelect.nombreCliente;
      },
    },

    MesaSelect: {
      set(idMesa) {
        this.$store.dispatch("setOrderSelectAction", {
          ...this.$store.getters.orderSelect,
          idMesa,
        });
      },

      get() {
        return this.$store.getters.orderSelect.idMesa;
      },
    },

    ItemSelects: {
      get() {
        return this.$store.getters.itemsMenuSelect.map((item) => ({
          nombre_item: item.nombre_item,
          id_menu_item: item.id_menu_item,
          precio: item.precio,
          cantidad: item.cantidad ? item.cantidad : 1,
          comentario: item.comentario,
        }));
      },
    },

    ItemSelectsEdit: {
      get() {
        return this.$store.getters.itemsMenuSelectEdit;
      },
    },

    ItemSelectsRemove: {
      set(items) {
        this.$store.dispatch("setItemsMenuSelectRemoveAction", [...items]);
      },

      get() {
        return this.$store.getters.itemsMenuSelectRemove;
      },
    },

    validarEnvio() {
      if (
        (this.nombreCliente.trim() === "") ||
        (this.nombreCliente === null) ||
        (this.nombreCliente.trim().length < 3) ||
        this.ItemSelects.length < 1 ||
        !this.$refs.form.validate()
      ) {
        return false;
      }

      return true;
    },
  },

  methods: {
    increment(cantidad, index) {
      const payload = {
        field: "cantidad",
        value: cantidad + 1,
      };

      this.$store.dispatch("setItemMenuFieldAction", {
        payload,
        index,
      });
    },
    decrement(cantidad, index) {
      const payload = {
        field: "cantidad",
        value: cantidad - 1,
      };
      if (cantidad > 1) {
        this.$store.dispatch("setItemMenuFieldAction", {
          payload,
          index,
        });
      }
    },

    changeCantidad(cantidad, index) {
      const payload = {
        field: "cantidad",
        value: cantidad,
      };

      this.$store.dispatch("setItemMenuFieldAction", {
        payload,
        index,
      });
    },

    changeComment(comentario, index) {
      const payload = {
        field: "comentario",
        value: comentario,
      };
      this.$store.dispatch("setItemMenuFieldAction", {
        payload,
        index,
      });
    },

    removeItem(id, index) {
      if (
        this.isEdit &&
        this.ItemSelectsEdit.some((item) => item.id_menu_item === id)
      ) {
        const item = this.ItemSelects[index];
        this.ItemSelectsRemove = [...this.ItemSelectsRemove, item];

        this.$store.dispatch(
          "setItemsMenuSelectEditAction",
          this.$store.getters.itemsMenuSelectEdit.filter(
            (item) => item.id_menu_item !== id
          )
        );
      }

      this.$store.dispatch(
        "itemsMenuSelectAction",
        this.$store.getters.itemsMenuSelect.filter(
          (item) => item.id_menu_item !== id
        )
      );
    },

    addOrder() {
      const { idComercial } = this.$store.getters.user;

      const order_details = this.ItemSelects.map(
        ({  precio, ...item }) => ({
          ...item,
          importe: item.cantidad * precio,
        })
      );

      const order = {
        nombreCliente: this.nombreCliente,
        fechaOrden: new Date().toJSON().slice(0, 19).replace("T", " "),
        idComercial,
        idEmpleado: this.$store.getters.user.idEmpleado,
        idMesa: this.mesaSelect,
        order_details,
      };

      this.$services.orders
        .createOrder(order)
        .then((response) => {
          if (response.data.ok) {
            this.$services.socketioService.sendOrderKitchroom(response.data.order);
            this.clearFormOrder();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearFormOrder() {
      this.nombreCliente = "";
      this.$store.dispatch("itemsMenuSelectAction", []);
      this.mesaSelect = null;
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