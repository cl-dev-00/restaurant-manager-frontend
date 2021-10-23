<template>
  <v-card class="pb-2 ma-3" elevation="10">
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
      :items="desserts"
      :search="search"
      :height="500"
      class="justify-center ma-3 elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="green" dark class="mb-2" v-bind="attrs" v-on="on">
                <v-icon>mdi-plus-box</v-icon>
                <span class="hidden-xs-only ml-1">Nuevo Empleado</span>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                   <v-form v-model="isFormValid">
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        outlined
                        v-model="editedItem.name"
                        label="Nombres"
                        :rules="ruleOnlyAlpha"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        outlined
                        v-model="editedItem.lastname"
                        label="Apellidos"
                        :rules="ruleOnlyAlpha"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="5" md="5">
                      <v-select
                        :items="SelectRol"
                        label="Rol"
                        outlined
                        v-model="editedItem.rol"
                        :rules="ruleRequired"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="7" md="7">
                      <v-text-field
                        outlined
                        v-model="editedItem.user"
                        label="Usuario"
                        :rules="ruleRequired"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="8" md="8">
                      <v-text-field
                        outlined
                        v-model="editedItem.pass"
                        label="Contraseña"
                        :rules="rulePass"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        outlined
                        v-model="editedItem.age"
                        label="Edad"
                        :rules="ruleAge"
                        v-mask="'##'"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        outlined
                        v-model="editedItem.phonenumber"
                        label="Numero de Telefono"
                        v-mask="'####-####'"
                        :rules="rulePhoneS"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        rows="2"
                        outlined
                        v-model="editedItem.address"
                        label="Dirección"
                        :rules="ruleRequired"
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        outlined
                        v-model="editedItem.email"
                        label="Email"
                        :rules="ruleEmail"
                      ></v-text-field>
                    </v-col>
                   
                  </v-row>
                   </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn :disabled="!isFormValid" color="blue darken-1" text @click="save"> Guardar </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
                <v-btn  color="blue darken-1" text @click="deleteItemConfirm"
                  >Aceptar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-4" color="indigo accent-3" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon @click="deleteItem(item)" color="deep-orange accent-3">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

import {Rules} from "../helpers/rules.js"

export default {
  name: "TableEmployees",
 
  data: () => ({
    isFormValid: false,
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Nombre", align: "start", sortable: true, value: "name" },
      { text: "Apellido", value: "lastname" },
      { text: "Rol", value: "rol", width: "90px" },
      { text: "Usuario", value: "user" },
      { text: "Contraseña", value: "pass" },
      { text: "Edad", value: "age" },
      { text: "Telefono", value: "phonenumber" },
      { text: "Dirección", value: "address" },
      { text: "Email", value: "email" },

      { text: "Acciones", value: "actions", sortable: false, width: "100px" },
    ],
    desserts: [],
    SelectRol: ["Gerente", "Cajero", "Cocinero", "Mesero"],

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
  created() {
    this.initialize();
  //  console.log(Rules);
//    console.log("sdasd");
    
  },
  methods: {
    initialize() {
      this.desserts = [
        {
          name: "La mera",
          lastname: "Palomada",
          rol: "Administrador",
          user: "palomada69",
          pass: "lameraverga",
          age: 25,
          phonenumber: "6969 6969",
          address: "fdfdfsdf, sdfsdfsdf, sdfsdfsdfsdf",
          email: "palomada@gmail.com",
        },
        {
          name: "Chele",
          lastname: "Pajero",
          rol: "Gerente",
          user: "palomada69",
          pass: "lameraverga",
          age: 25,
          phonenumber: "6969 6969",
          address: "fdfdfsdf, sdfsdfsdf, sdfsdfsdfsdf",
          email: "palomada@gmail.com",
        },
        {
          name: "La mera",
          lastname: "Palomada",
          rol: "Cajero",
          user: "palomada69",
          pass: "lameraverga",
          age: 21,
          phonenumber: "6969 6969",
          address: "fdfdfsdf, sdfsdfsdf, sdfsdfsdfsdf",
          email: "palomada@gmail.com",
        },
        {
          name: "La mera",
          lastname: "Palomada",
          rol: "Mesero",
          user: "palomada69",
          pass: "lameraverga",
          age: 22,
          phonenumber: "6969 6969",
          address: "fdfdfsdf, sdfsdfsdf, sdfsdfsdfsdf",
          email: "palomada@gmail.com",
        },
        {
          name: "La mera",
          lastname: "Palomada",
          rol: "Mesero",
          user: "palomada69",
          pass: "lameraverga",
          age: 30,
          phonenumber: "6969 6969",
          address: "fdfdfsdf, sdfsdfsdf, sdfsdfsdfsdf",
          email: "palomada@gmail.com",
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
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
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
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style  scoped>
</style>
