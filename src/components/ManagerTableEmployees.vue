<template>
  <v-card elevation="10">
    <v-card-title class="justify-center pt-8">
      Registro de Empleados
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        outlined
        clearable
        color="brown"
        single-line
        hide-details
        class="mr-2"
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="employees.items"
      :search="search"
      :height="500"
      class="justify-center ma-3 elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Está seguro que quiere eliminar este empleado?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Aceptar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-4" color="indigo accent-3" @click="editItem(item.idEmpleado)">
          mdi-pencil
        </v-icon>
        <v-icon @click="deleteItem(item.idEmpleado)" color="deep-orange accent-3">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { Rules } from "../helpers/rules.js";

export default {
  name: "TableEmployees",
  mounted() {
    this.$services.manager.getEmployees()
    .then(response => {
        this.employees = response.data.collection;
    })
    .catch(error => {
      console.log(error)
    })
  },
  data: () => ({
    employees: {},
    isFormValid: false,
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Nombre", align: "start", sortable: true, value: "nombre" },
      { text: "Apellido", align: "start", sortable: true, value: "apellido" },
      { text: "Rol", align: "start", sortable: true, value: "role.nombreRol", width: "90px" },
      { text: "Usuario", align: "start", sortable: true, value: "username" },
      { text: "Edad", align: "start", sortable: true, value: "edad" },
      { text: "Telefono", align: "start", sortable: true, value: "telefono" },
      { text: "Dirección", align: "start", sortable: true, value: "direccion" },
      { text: "Email", align: "start", sortable: true, value: "email" },

      { text: "Acciones", value: "actions", sortable: false, width: "100px" },
    ],
    editedIndex: -1,

    editedItem: {
      name: "",
      lastname: "",
      rol: "",
      user: "",
      pass: "",
      age: "",
      phonenumber: "",
      address: "",
      email: "",
    },
    defaultItem: {
      name: "",
      lastname: "",
      rol: "",
      user: "",
      pass: "",
      age: "",
      phonenumber: "",
      address: "",
      email: "",
    },

    /**
     * Reglas para los Inputs
     */
    ruleRequired: Rules.required,
    ruleAge: Rules.integer,
    ruleOnlyAlpha: Rules.alpha,
    rulePass: Rules.password,
    ruleEmail: Rules.email,
    rulePhoneS: Rules.phonesize,
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nuevo Empleado"
        : "Editar Info del Empleado";
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
  methods: {
    editItem(id) {
      this.$router.push(`/manager/employees/${id}/edit`);
    },
    deleteItem(id) {

      this.$services.manager.deleteEmployee(id)
      .then(response => {
        console.log(response.data);
        this.employees.items.filter(employee => employee.id === id);
      })
      .catch(error => {
        console.log(error)
      })

      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.employees.items.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>

<style  scoped>
</style>
