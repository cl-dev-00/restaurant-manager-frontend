<template>
  <manager-layout>
    <manager-table-mesas />
  </manager-layout>
</template>

<script>
import ManagerTableMesas from "../../../components/ManagerTableMesas.vue";
import ManagerLayout from "../../../layout/ManagerLayout.vue";

export default {
  name: "Table",
  components: {
    ManagerLayout,
    ManagerTableMesas,
  },
};
</script>
