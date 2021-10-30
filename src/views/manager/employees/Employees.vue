<template>
  <manager-layout>
    <manager-table-employees />
  </manager-layout>
</template>

<script>
import ManagerTableEmployees from "../../../components/ManagerTableEmployees.vue";
import ManagerLayout from "../../../layout/ManagerLayout.vue";

export default {
  name: "Employees",
  components: {
    ManagerTableEmployees,
    ManagerLayout,
  },
};
</script>
