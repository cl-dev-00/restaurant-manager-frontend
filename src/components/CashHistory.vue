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

export default {
  name: "CashHistory",
  data: () => ({
   
    headers: [
      {
        text: "Fecha",
        align: "start",
        value: "fecha",
      },
      { text: "Efectivo", value: "efectivo" },
      { text: "Crédito", value: "credito" },
      { text: "Ingresos", value: "ingresos" },
      { text: "Salidas", value: "salidas" },
      { text: "Total", value: "total" },
      { text: "Faltante", value: "faltante" },
    ],
    desserts: [],
  }),

  created() {
    this.initialize();
  },
  methods: {
   
    initialize() {
      this.desserts = [
        {
          fecha: "08/11/2021",
          efectivo: "200.00",
          credito: "35.00",
          ingresos: "12.00",
          salidas: "24.00",
          total: "345.45",
          faltante: "34.54",
        },
        {
          fecha: "09/11/2021",
          efectivo: "200.00",
          credito: "35.00",
          ingresos: "12.00",
          salidas: "24.00",
          total: "345.45",
          faltante: "34.54",
        },
        {
          fecha: "10/11/2021",
          efectivo: "200.00",
          credito: "35.00",
          ingresos: "12.00",
          salidas: "24.00",
          total: "345.45",
          faltante: "34.54",
        },
        {
          fecha: "11/11/2021",
          efectivo: "200.00",
          credito: "35.00",
          ingresos: "12.00",
          salidas: "24.00",
          total: "345.45",
          faltante: "34.54",
        },
        {
          fecha: "12/11/2021",
          efectivo: "200.00",
          credito: "35.00",
          ingresos: "12.00",
          salidas: "24.00",
          total: "345.45",
          faltante: "34.54",
        },
        
        
      ];
    },
   
  },
};
</script>