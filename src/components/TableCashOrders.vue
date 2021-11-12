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
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script >

import { Rules } from "../helpers/rules.js";

export default {

   name: "TableCashOrders",
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
      reset () {
        this.$refs.form.reset()
      },
      reset2 () {
        this.$refs.form2.reset()
      },
     initialize() {
      this.desserts = [
        {
          descripcion: "Orden: (Nombre del cliente)",
          entrada: 30,
          salida: 0,
          fecha: "11/11/2021 12:55:36",
        },
        {
          descripcion: "Orden: (Nombre del cliente)",
          entrada: 45,
          salida: 0,
          fecha: "11/11/2021 12:55:36",
        },
        {
          descripcion: "Orden: (Nombre del cliente)",
          entrada: 546,
          salida: 0,
          fecha: "11/11/2021 12:55:36",
        },
        {
          descripcion: "Orden: (Nombre del cliente)",
          entrada: 65,
          salida: 0,
          fecha: "11/11/2021 12:55:36 ",
        },
        {
          descripcion: "Orden: (Nombre del cliente)",
          entrada: 743,
          salida: 0,
          fecha: "11/11/2021 12:55:36",
        },
        {
          descripcion: "Orden: (Nombre del cliente)",
          entrada: 87,
          salida: 0,
          fecha: "11/11/2021 12:55:36",
        },
      ];
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