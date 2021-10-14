<template>
  <v-card class="pb-2 ma-3" elevation="10">
    <v-card-title class="justify-center pt-8">
      Items del Menu
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
                <span class="hidden-xs-only ml-1">Nuevo Item</span>
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
                    <v-col cols="12" sm="7" md="7">
                      <v-text-field
                        outlined
                        v-model="editedItem.name"
                        label="Nombre del Item"
                        :rules="ruleRequired"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5" md="5">
                      <v-select
                        :items="SelectCategorias"
                        label="Categorias"
                        outlined
                        v-model="editedItem.categoria"
                        :rules="ruleRequired"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="5" md="5">
                      <v-text-field
                        outlined
                        v-model="editedItem.precio"
                        label="Precio del Item"
                        :rules="ruleDecimal"
                      ></v-text-field>
                    </v-col>
                    
                    <v-col cols="12" sm="7" md="7">
                      <v-textarea
                        outlined
                        v-model="editedItem.detalles"
                        label="Detalles del item"
                        :rules="ruleRequired"
                        rows="3"
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12" sm="7" md="7">
                      <v-select
                        :items="SelectDisp"
                        label="Disponibilidad"
                        outlined
                        v-model="editedItem.disponibilidad"
                        :rules="ruleRequired"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-subheader class="pl-0">
                        Seleccione el Porcentaje de Descuento: {{editedItem.descuento}} %
                      </v-subheader>
                      <v-slider v-model="editedItem.descuento" thumb-label></v-slider>
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
                >¿Está seguro que quiere eliminar este item?</v-card-title
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
import {Rules} from "../rules.js"
export default {
  name: "TableItemsMenu",
  data: () => ({
    isFormValid: false,
    slider: 0 ,
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Categoria", value: "categoria" },
      { text: "Precio", value: "precio", width: "90px" },
      { text: "Detalles", value: "detalles" },
      { text: "Disponibilidad", value: "disponibilidad" },
      { text: "Descuento (%)", value: "descuento" },

      { text: "Acciones", value: "actions", sortable: false, width: "100px" },
    ],
    desserts: [],
    SelectCategorias: [
      "Desayuno",
      "Almuerzo",
      "Comida Rapida",
      "Cena",
      "Postre",
      "Bebida",
    ],
    SelectDisp: ["Disponible", "No disponible"],

    editedIndex: -1,
    editedItem: {
      name: "",
      categoria: "",
      precio: "",
      detalles: "",
      disponibilidad: "",
      descuento: 0.0,
    },
    defaultItem: {
      name: "",
      categoria: "",
      precio: "",
      detalles: "",
      disponibilidad: "",
      descuento: 0.0,
    },
    ruleRequired: Rules.required,
    ruleDecimal: Rules.decimal,
    
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Item" : "Editar Item";
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
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          categoria: "Postre",
          precio: 21.23,
          detalles: "lorem hsdasdasdibsdhsds dosudbojsdboasd asodisd",
          disponibilidad: "Disponible",
          descuento: 0.0,
        },
        {
          name: "Ice cream sandwich",
          categoria: "Cena",
          precio: 2.5,
          detalles: "lorem hsdasdasdibsdhsds dosudbojsdboasd asodisd",
          disponibilidad: "Disponible",
          descuento: 0.0,
        },
        {
          name: "Eclair",
          categoria: "Almuerzo",
          precio: 1.21,
          detalles: "lorem hsdasdasdibsdhsds dosudbojsdboasd asodisd",
          disponibilidad: "Disponible",
          descuento: 0.0,
        },
        {
          name: "Cupcake",
          categoria: "Cena",
          precio: 21.23,
          detalles: "lorem hsdasdasdibsdhsds dosudbojsdboasd asodisd",
          disponibilidad: "Disponible",
          descuento: 0.0,
        },
        {
          name: "Gingerbread",
          categoria: "Bebida",
          precio: 21.23,
          detalles: "lorem hsdasdasdibsdhsds dosudbojsdboasd asodisd",
          disponibilidad: "Disponible",
          descuento: 0.0,
        },
        {
          name: "Jelly bean",
          categoria: "Bebida",
          precio: 21.23,
          detalles: "lorem hsdasdasdibsdhsds dosudbojsdboasd asodisd",
          disponibilidad: "Disponible",
          descuento: 0.0,
        },
        {
          name: "Lollipop",
          categoria: "Cena",
          precio: 21.23,
          detalles: "lorem hsdasdasdibsdhsds dosudbojsdboasd asodisd",
          disponibilidad: "Disponible",
          descuento: 0.0,
        },
        {
          name: "Honeycomb",
          categoria: "Almuerzo",
          precio: 21.23,
          detalles: "lorem hsdasdasdibsdhsds dosudbojsdboasd asodisd",
          disponibilidad: "Disponible",
          descuento: 0.0,
        },
        {
          name: "Donut",
          categoria: "Comida Rapida",
          precio: 21.23,
          detalles: "lorem hsdasdasdibsdhsds dosudbojsdboasd asodisd",
          disponibilidad: "Disponible",
          descuento: 0.0,
        },
        {
          name: "KitKat",
          categoria: "Desayuno",
          precio: 21.23,
          detalles: "lorem hsdasdasdibsdhsds dosudbojsdboasd asodisd",
          disponibilidad: "Disponible",
          descuento: 0.0,
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
