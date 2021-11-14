<template>
  <!-- SECCION DE ORDEN category.nombreCategoria  -->
  <v-col class="col-12">
    <v-form v-model="isFormValid" class="mx-2">
      <!-- TEXTO DE ORDEN -->
      <v-row>
        <h3 class="ml-4 mt-4 mb-0 display-1">Orden</h3>
      </v-row>
      <!-- Orden -->
      <v-row no-gutters class="mt-5">
        <v-col cols="8">
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
        <!--<v-col cols="7" md="7" class="mt-5 h4 align-center">
          <label>#000000</label>
          LABEL
        </v-col> -->
        <v-col cols="2" class="ml-5 mt-3">
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
        <h4 class="mt-0 mb-3">Items:</h4>
      </v-row>
      <!-- ITEMS SELECCIONADOS -->
      <v-row
        v-for="(menu, index) in ItemSelects"
        :key="menu.id_menu_item"
        no-gutters
        align="center"
        justify="center"
      >
        <v-card class="mb-5" elevation="6" max-width="470px" min-width="200px">
          <v-card-text>
            <v-row no-gutters align="center" justify="center">
              <v-col
                cols="11"
                sm="11"
                class="mt-n3 pa-2 text-h6 font-weight-bold"
              >
                {{ menu.nombre_item }}</v-col
              >
              <v-col
                cols="12"
                sm="12"
                class="mt-0 pl-1 pr-1 d-flex justify-center"
              >
                <v-text-field
                  dense
                  filled
                  rounded
                  v-model.number="menu.cantidad"
                  :rules="rulesCantidad"
                  type="number"
                  append-outer-icon="mdi-plus"
                  @click:append-outer="increment(menu.cantidad, index)"
                  prepend-icon="mdi-minus"
                  @click:prepend="decrement(menu.cantidad, index)"
                  @input="changeCantidad(menu.cantidad, index)"
                  :suffix="'* $' + menu.precio.toString()"
                  style="max-width: 220px"
                ></v-text-field>
              </v-col>
              <!--
              <v-col
                cols="12"
                md="2"
                class="d-flex justify-center mt-2 text-body-1 font-weight-bold"
              >
                <span class="">Precio: &nbsp; </span>
                ${{ menu.precio }}</v-col
              >
              -->
              <v-col
                class="col-12"
                v-if="
                  isEdit &&
                  ItemSelectsEdit.some(
                    (item) => item.id_menu_item === menu.id_menu_item
                  )
                "
              >
                <v-btn
                  @click="removeItem(menu.id_menu_item, index)"
                  style="margin-right: -12px; margin-top: 20px"
                  fab
                  dark
                  x-small
                  color="pink"
                  absolute
                  top
                  right
                >
                  <v-icon dark> mdi-close-thick </v-icon>
                </v-btn>
              </v-col>
              <v-col
                :class="{
                  'col-12':
                    isEdit &&
                    ItemSelectsEdit.some(
                      (item) => item.id_menu_item === menu.id_menu_item
                    ),
                  'col-12': !isEdit,
                }"
              >
                <v-divider class="mt-n1 mb-2"></v-divider>
                <v-textarea
                  dense
                  class="ml-3 mr-3 mb-n8 pb-3"
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
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-row>

      <!-- TOTALES -->
      <v-divider class="mt-5"></v-divider>
      <v-list>
        <v-list-item class="mr-n3">
          <v-list-item-title class="ml-n5 text-h6">
            Sub Total
          </v-list-item-title>
          <v-list-item-action-text>
            <span class="green--text text-h6 font-weight-bold text-no-wrap">
              $ {{ subTotal }}
            </span>
          </v-list-item-action-text>
        </v-list-item>
        <v-list-item class="mt-n5 mr-n3">
          <v-list-item-title class="ml-n5 text-h6">
            Impuestos
          </v-list-item-title>
          <v-list-item-action-text>
            <span class="green--text text-h6 font-weight-bold text-no-wrap">
              $ {{ impuestos }}
            </span>
          </v-list-item-action-text>
        </v-list-item>
        <v-list-item class="mt-n5 mr-n3">
          <v-list-item-title class="ml-n5 text-h6"> Total </v-list-item-title>
          <v-list-item-action-text>
            <span class="green--text text-h6 font-weight-bold text-no-wrap">
              $ {{ total }}
            </span>
          </v-list-item-action-text>
        </v-list-item>
      </v-list>
      <!-- BOTON COCINA-->
      <v-row v-if="!isEdit">
        <v-col v-if="isCashier" class="col-12">
          <template>
            <v-btn
              color="success"
              block
              x-large
              :disabled="!validarEnvio"
              @click="dialog = true"
              ><v-icon>mdi-currency-usd</v-icon> Pagar</v-btn
            >
          </template>
          <v-dialog
            v-model="dialog"
            transition="dialog-top-transition"
            max-width="90%"
          >
            <template>
              <v-row class="justify-center white" dense>
                <v-col class="col-12">
                  <v-btn
                    color="primary"
                    block
                    depressed
                    large
                    @click="dialog = false"
                    >Cerrar</v-btn
                  >
                  <orders-form-pay
                    :createOrder="createOrder"
                    :order="Order"
                    :total="total"
                    :subTotal="subTotal"
                    :impuestos="impuestos"
                    
                  />
                </v-col>
              </v-row>
            </template>
          </v-dialog>
        </v-col>
        <v-col v-else class="col-12">
          <v-btn
            x-large
            color="success"
            @click="save"
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

import OrdersFormPay from "./OrdersFormPay.vue";
import { rulesText, rulesCantidad } from "../helpers/rules";

import { toastMessage } from "../helpers/messages";

import { print } from "../helpers/printticket"

export default {
  name: "OrdersFormData",
  components: {
    WaiterCardCategory,
    OrdersFormPay,
  },
  mounted() {
    this.isCashier =
      this.$store.getters.user.role.user_level.nivel_usuario === 3;
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

    this.$services.socketioService.getChangeMenuItems(
      (menuItemsChangedState) => {
        menuItemsChangedState.forEach(({ id_menu_item, disponibilidad }) => {
          if (
            !disponibilidad &&
            this.$store.getters.itemsMenuSelect.some(
              (item) => item.id_menu_item === id_menu_item
            )
          ) {
            this.$store.dispatch(
              "itemsMenuSelectAction",
              this.$store.getters.itemsMenuSelect.filter(
                (item) => item.id_menu_item !== id_menu_item
              )
            );
          }
        });
      }
    );
  },
  data() {
    return {
      hasItems: false,
      accounts: [],
      isCashier: false,
      isFormValid: false,
      dialog: false,

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
  watch: {
    isFormValid: function () {
      if (this.isEdit) {
        this.$store.dispatch("setIsValidEditFormAction", this.isFormValid);
      }
    },
  },
  computed: {
    Order() {
      const { idComercial } = this.$store.getters.user;

      const order_details = this.ItemSelects.map(({ precio, ...item }) => ({
        ...item,
        importe: item.cantidad * precio,
      }));

      const order = {
        nombreCliente: this.nombreCliente,
        fechaOrden: new Date().toJSON().slice(0, 19).replace("T", " "),
        idComercial,
        idEmpleado: this.$store.getters.user.idEmpleado,
        nombreEmpleado: this.$store.getters.user.nombre, 
        idMesa: this.mesaSelect,
        order_details,
      };

      return order;
    },
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
        this.nombreCliente.trim() === "" ||
        this.nombreCliente === null ||
        this.nombreCliente.trim().length < 3 ||
        this.ItemSelects.length < 1 ||
        !this.isFormValid
      ) {
        return false;
      }

      return true;
    },
  },

  methods: {


    pdf(emp, m){
      
       print( emp, m);
    },

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

    save() {
      this.createOrder({
        ...this.Order,
        importe: 0,
      });
      
    },

    createOrder(order) {
      this.$services.orders
        .createOrder(order)
        .then((response) => {
          if (response.data.ok) {
            this.$services.socketioService.sendOrderKitchroom(
              response.data.order
            );
           
            this.clearFormOrder();

            toastMessage("success", "Exito", "Se creo la orden correctamente");

            this.dialog = false;
          }
        })
        .catch((error) => {
          console.log(error);
          toastMessage("error", "Error :(", "No se pudo crear la orden");
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