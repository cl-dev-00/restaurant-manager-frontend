<template>

  <manager-layout v-if="tipo==='Gerente'"> 
    <my-account/>
  </manager-layout>
  <app-layout v-else>
    <my-account/>
  </app-layout>

</template>

<script>
import ManagerLayout from "../layout/ManagerLayout.vue";
import AppLayout from "../layout/AppLayout.vue"
import MyAccount from "../views/MyAccount.vue"
export default {
  name: "MyAccountSetLayout",
  components: {
    ManagerLayout,
    AppLayout, 
    MyAccount, 
  },
    
  mounted() {
    this.$services.shareds
      .getEmployee(this.$store.getters.user.idEmpleado)
      .then((response) => {
        if (response.data.ok) {
          const employee = response.data.employee;
          this.tipo = employee.role.nombreRol;
         // console.log(employee.role.nombreRol);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data: () => ({
    tipo: "",
  }),
};
</script>

<style scoped>
</style>