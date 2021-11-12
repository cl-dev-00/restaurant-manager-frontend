<template>
  <v-container>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" class="elevation-3">
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
                  @click="reset()"
                >
                  Registrar Accion
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Registrar Accion</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-form v-model="accionEnable" ref="form">
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.descripcion"
                            label="Descripcion"
                            :rules="ruleRequired"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            :items="tipos"
                            label="Tipo"
                            v-model="select"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="monto"
                            label="Monto"
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
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Resetear </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script >
import { Rules } from "../helpers/rules.js";

export default {
  name: "TableCashActions",
  data: () => ({
    accionEnable: false,

    dialog: false,
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

    rulesCash: Rules.decimal2,
    ruleRequired: Rules.required,
    tipos: ["Ingreso", "Gasto"],
    monto: "",
    select: "",
  }),
  computed: {
    
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },

    initialize() {
      this.desserts = [
        {
          descripcion: "Compra de verduras",
          entrada: 0,
          salida: 30,
          fecha: "11/11/2021 12:55:36",
        },
        {
          descripcion: "Compra de 2 sartenes",
          entrada: 0,
          salida: 40,
          fecha: "11/11/2021 12:55:36",
        },
        {
          descripcion: "Pago de X",
          entrada: 546,
          salida: 0,
          fecha: "11/11/2021 12:55:36",
        },
        {
          descripcion: "Pago de Y",
          entrada: 65,
          salida: 0,
          fecha: "11/11/2021 12:55:36 ",
        },
        {
          descripcion: "PAgo de Z",
          entrada: 743,
          salida: 0,
          fecha: "11/11/2021 12:55:36",
        },
      ];
    },
    close() {
      this.dialog = false;
    },
    save() {
     
        var currentDate = new Date();

        if (this.select === "Ingreso") {
          this.editedItem.entrada = this.monto;
          this.editedItem.salida = "";
        } else {
          this.editedItem.entrada = "";
          this.editedItem.salida = this.monto;
        }

        this.editedItem.fecha = this.getFechaHora();
        this.desserts.push(this.editedItem);
        this.editedItem = [];
      

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