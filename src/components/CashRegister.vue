<template>
  <v-container>
    <v-row class="mt-6" justify="center" align="center">
      <v-col cols="12" class="mb-5">
        <v-btn
          color="grey darken-4"
          large
          class="white--text"
          @click="historial()"
          ><v-icon>mdi-history</v-icon> &nbsp; Ver Historial</v-btn
        >
        <v-row
          :class="verhistorial === false ? 'd-none' : ''"
          justify="center"
          class="mt-5 grey lighten-3"
        >
          <h2 class="pa-5">
            <span><v-icon color="black" size="32">mdi-history</v-icon></span>
            Historial de Arqueo de Caja
          </h2>
          <cash-history />
        </v-row>
      </v-col>

      <v-col cols="12" class="elevation-3">
        <v-row class="mb-1 grey lighten-3 pb-5 pt-2">
          <v-col cols="12">
            <h2 class="font-weight-bold text-wrap mb-3">Arqueo de Caja</h2>
            <span class="text-body-1"
              >Fecha de caja Actual:
              <span class="font-weight-black">{{ getFecha() }} </span><br />
              Estado de caja Actual:
              <span
                class="font-weight-bold"
                :class="estado === 'Abierta' ? 'green--text' : 'red--text'"
                >{{ estado }}</span
              ></span
            >
          </v-col>
        </v-row>

        <v-row :class="estado === 'Cerrada' ? 'd-none' : ''">
          <v-col cols="4">
            Efectivo: <br />
            <span class="font-weight-bold text-body-1">${{ efectivo }}</span>
          </v-col>
          <v-col cols="4">
            Tarjetas de Crédito: <br />
            <span class="font-weight-bold text-body-1">${{ credito }}</span>
          </v-col>
          <v-col cols="4">
            Retiros: <br />
            <span class="font-weight-bold text-body-1 red--text"
              >${{ retiros }}</span
            >
          </v-col>

          <v-col cols="12" class="d-flex justify-center">
            <v-btn-toggle
              v-model="step"
              group
              mandatory
              color="light-blue darken-3"
              class="justify-center mr-0 pr-0 pl-0 ml-0"
            >
              <v-btn text class="btn1">
                <v-icon
                  size="28"
                  class="mr-1"
                  :color="step === 0 ? 'light-blue darken-3' : 'black'"
                  >mdi-clipboard-list</v-icon
                >
                <span class="hidden-xs-only">Registro de Ordenes</span>
              </v-btn>

              <v-btn class="btn1">
                <v-icon
                  size="28"
                  class="mr-1"
                  :color="step === 1 ? 'light-blue darken-3' : 'black'"
                  >mdi-hand-coin</v-icon
                >
                <span class="hidden-xs-only">Registros Manuales</span>
              </v-btn>
            </v-btn-toggle>
          </v-col>

          <v-col cols="12">
            <v-window v-model="step">
              <v-window-item :value="0">
                <table-cash-orders />
              </v-window-item>
              <v-window-item :value="1">
                <table-cash-actions />
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
        <v-row class="align-center justify-center my-10">
          <!-- CERRAR CAJA -->
          <v-dialog
            v-model="dialogCaja"
            max-width="500px"
            v-if="estado === 'Abierta'"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                x-large
                class="white--text text-h6"
                color="red"
                v-bind="attrs"
                v-on="on"
              >
                Cerrar Caja
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="black">
                <span class="text-h5 white--text">Cierre de Caja</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form v-model="cerrarEnable" ref="form2">
                    <v-row no-gutters>
                      <v-col cols="12" class="mb-2">
                        <span class="text-h6"
                          >Fecha de caja Actual:
                          <span class="font-weight-black"
                            >{{ getFecha() }}
                          </span></span
                        >
                      </v-col>
                      <v-col cols="12">
                        <h3>Informe de saldo final en caja</h3>
                        <v-text-field
                          prepend-inner-icon="mdi-currency-usd"
                          v-model="dinerofisico"
                          outlined
                          dense
                          type="number"
                          :rules="rulesCash"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <h3>Saldo totalizado en el sistema</h3>
                        <h4 class="font-weight-bold">
                          $ {{ saldodelsistema }}
                        </h4>
                      </v-col>
                      <v-col cols="12">
                        <h3>Diferencia de saldo (faltante)</h3>
                        <h4 class="font-weight-bold">$ {{ diferencia }}</h4>
                      </v-col>
                      <v-col cols="12">
                        <h3>Detalles y Obsevaciones</h3>
                        <v-textarea
                          v-model="descripcion"
                          outlined
                          dense
                          rows="3"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="orange darken-1"
                  class="white--text"
                  @click="closeCierre"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  :disabled="!cerrarEnable"
                  color="red darken-1"
                  class="white--text"
                  @click="cerrarCaja"
                >
                  Cerrar Caja
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- ABRIR CAJA -->
          <v-dialog
            v-model="dialog"
            max-width="500px"
            v-if="estado === 'Cerrada'"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="green"
                x-large
                class="mb-2 ml-2 mt-2 white--text text-h6"
                v-bind="attrs"
                v-on="on"
              >
                Abrir Caja
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Abrir Caja</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form v-model="accionEnable" ref="form">
                    <v-row>
                      <v-col cols="12" sm="8" md="8">
                        <v-text-field
                          v-model="monto"
                          label="Monto"
                          prepend-inner-icon="mdi-currency-usd"
                          single-line
                          outlined
                          type="number"
                          :rules="rulesCash"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="orange darken-1"
                  @click="close"
                  class="white--text"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  :disabled="!accionEnable"
                  color="blue darken-1"
                  class="white--text"
                  @click="save"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script >
import { Rules } from "../helpers/rules.js";
import TableCashOrders from "../components/TableCashOrders.vue";
import TableCashActions from "../components/TableCashActions.vue";
import CashHistory from "../components/CashHistory.vue";

export default {
  name: "CashRegister",
  components: {
    TableCashOrders,
    TableCashActions,
    CashHistory,
  },
  data: () => ({
    estado: "Cerrada", //Abierta, Cerrada
    efectivo: "200.00",
    credito: "70.25",
    retiros: "80.00",
    step: 0,
    dialog: false,
    accionEnable: false,
    monto: "",
    rulesCash: Rules.decimal2,
    cerrar: false,
    dinerofisico: "",
    descripcion: "",
    diferencia: "00.00",
    saldodelsistema: "00.00",
    dialogCaja: false,
    cerrarEnable: false,

    verhistorial: false,
  }),

  computed: {},
  watch: {
     dialog(val) {
      val || this.close();
    },
    dialogCaja(val) {
      val || this.close();
    },
  },

  methods: {
    historial() {
      if (this.verhistorial === false) {
        this.verhistorial = true;
      } else {
        this.verhistorial = false;
      }
    },
    close() {
      this.dialog = false;
    },
    save() {
      /*
     if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        var currentDate = new Date();
        this.editedItem.fecha = this.getFechaHora();
        this.desserts.push(this.editedItem);
      }
      */
      this.estado = "Abierta";
      this.dialogCaja = false;
      this.close();
    },

    closeCierre() {
      this.dialogCaja = false;
    },
    cerrarCaja() {
      this.dialog = false;
      this.estado = "Cerrada";
      this.close();
    },
    getFechaHora() {
      var currentDate = new Date();
      return currentDate.toLocaleString();
    },
    getFecha() {
      var currentDate = new Date();
      var dias = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
      return (
        dias[currentDate.getDay()] +
        " " +
        currentDate.getDate() +
        "/" +
        currentDate.getMonth() +
        "/" +
        currentDate.getFullYear()
      );
    },
  },
};
</script>