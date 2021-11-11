<template>
  <v-container>
    <v-row class="mt-6" justify="center" align="center">
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

          <v-col cols="4">
            Efectivo: <br />
            <span class="font-weight-bold text-body-1">$00.00</span>
          </v-col>
          <v-col cols="4">
            Tarjetas de Crédito: <br />
            <span class="font-weight-bold text-body-1">$00.00</span>
          </v-col>
          <v-col cols="4">
            Retiros: <br />
            <span class="font-weight-bold text-body-1 red--text">$00.00</span>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="desserts"
          sort-by="fecha"
          :sort-desc="true"
        >
          <template v-slot:top>
            <!-- REGISTRAR ACCION -->
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2 ml-2 mt-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Registrar Accion
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                       <v-form v-model="accionEnable"> 
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.descripcion"
                          label="Descripcion"
                          :rules="ruleRequired"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.entrada"
                          label="Entrada"
                          prepend-inner-icon="mdi-currency-usd"
                          single-line
                          type="number"
                         :rules="rulesCash"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.salida"
                          label="Salida"
                          prepend-inner-icon="mdi-currency-usd"
                          single-line
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
                  <v-btn color="orange darken-1" @click="close" class=" white--text">
                    Cancelar
                  </v-btn>
                  <v-btn :disabled="!accionEnable" color="blue darken-1" class=" white--text" @click="save">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- CERRAR CAJA -->
            <v-dialog v-model="dialogCaja" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="red lighten-1"
                  dark
                  class="mb-2 ml-6 mt-2"
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
                      <v-form v-model="cerrarEnable">
                    <v-row no-gutters>
                      <v-col cols="12" class="mb-2">
                        <span class="text-h6"
                          >Fecha de caja Actual:
                          <span class="font-weight-black"
                            >{{ getFecha() }} </span
                          ></span>
                      </v-col>
                      <v-col cols="12">
                        <h3>Informe de saldo final en caja</h3>
                        <v-text-field
                          prepend-inner-icon="mdi-currency-usd"
                          v-model="formCaja.saldofinal"
                          outlined
                          dense
                          type="number"
                          :rules="rulesCash"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <h3>Saldo totalizado en el sistema</h3>
                        <v-text-field
                          prepend-inner-icon="mdi-currency-usd"
                          v-model="formCaja.saldodelsistema"
                          outlined
                          dense
                          type="number"
                          :rules="rulesCash"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <h3>Diferencia de saldo (faltante)</h3>
                        <v-text-field
                          prepend-inner-icon="mdi-currency-usd"
                          v-model="formCaja.diferencia"
                          outlined
                          dense
                          type="number"
                          :rules="rulesCash"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <h3>Detalles y Obsevaciones</h3>
                        <v-textarea
                          v-model="formCaja.descripcion"
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
                  <v-btn color="orange darken-1" class=" white--text" @click="closeCierre">
                    Cancelar
                  </v-btn>
                  <v-btn :disabled="!cerrarEnable" color="green darken-1" class=" white--text" @click="cerrarCaja">
                    Cerrar Caja
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:[getitemcontrols()]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
              color="indigo accent-3"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
              color="deep-orange accent-3"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Resetear </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { Rules } from "../helpers/rules.js";

export default {
  name: "CashRegister",
  data: () => ({

    accionEnable: false, 
    cerrarEnable:false,   
    estado: "Abierta", //Abierta, Cerrada

    dialog: false,
    dialogCaja: false,
    headers: [
      {
        text: "Descripcion",
        align: "start",
        sortable: false,
        value: "descripcion",
      },
      { text: "Entrada", value: "entrada" },
      { text: "Salida", value: "salida" },
      { text: "Fecha", value: "fecha" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      descripcion: "",
      entrada: "",
      salida: "",
      fecha: "",
    },
    defaultItem: {
      descripcion: "",
      entrada: "",
      salida: "",
      fecha: "",
    },

    formCaja: {
      saldofinal: "",
      saldodelsistema: "",
      diferencia: "",
      detalles: "",
    },

    rulesCash: Rules.decimal2,
    ruleRequired: Rules.required, 
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Accion" : "Editar Accion";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    getitemcontrols() {
      return `item.actions`;
    },

    initialize() {
      this.desserts = [
        {
          descripcion: "Orden: (Nombre del cliente)",
          entrada: 30,
          salida: 20,
          fecha: "11/11/2021 12:55:36",
        },
        {
          descripcion: "Orden: (Nombre del cliente)",
          entrada: 45,
          salida: 33,
          fecha: "11/11/2021 12:55:36",
        },
        {
          descripcion: "Orden: (Nombre del cliente)",
          entrada: 546,
          salida: 23,
          fecha: "11/11/2021 12:55:36",
        },
        {
          descripcion: "Orden: (Nombre del cliente)",
          entrada: 65,
          salida: 75,
          fecha: "11/11/2021 12:55:36 ",
        },
        {
          descripcion: "Orden: (Nombre del cliente)",
          entrada: 743,
          salida: 76,
          fecha: "11/11/2021 12:55:36",
        },
        {
          descripcion: "Orden: (Nombre del cliente)",
          entrada: 87,
          salida: 33,
          fecha: "11/11/2021 12:55:36",
        },
      ];
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.desserts.splice(this.editedIndex, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        var currentDate = new Date();
        this.editedItem.fecha = this.getFechaHora();
        this.desserts.push(this.editedItem);
      }
      this.close();
    },

    closeCierre() {
      this.dialogCaja = false;
    },
    cerrarCaja() {
      this.desserts = [];
      this.dialogCaja = false;
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