<template>
  <v-container>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" class="elevation-3">
        <v-data-table
          :headers="headers"
          :items="cashRegisters.items"
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
  name: "OrdersCashHistory",
  props: {
    cashRegisters: {
      type: Object,
      required: true
    }
  },
  data: () => ({
   
    headers: [
      {
        text: "Fecha",
        align: "start",
        value: "fecha",
      },
      { text: "Efectivo", value: "efectivo" },
      // { text: "Crédito", value: "credito" },
      { text: "Ingresos", value: "ingresos" },
      { text: "Gastos", value: "gastos" },
      { text: "Total", value: "saldo_final" },
      { text: "Faltante", value: "faltante" },
    ],
    
  }),
};
</script>