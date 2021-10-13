<template>
  <v-card class="pb-2 ma-3 " elevation="10">
    <v-card-title class="justify-center pt-8">
      Mesas del Restaurante
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        outlined
        clearable
        color="orange"
        label="Buscar"
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
                <span class="hidden-xs-only ml-1">Nueva Mesa</span>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="8" md="8">
                      <v-text-field
                        outlined
                        v-model="editedItem.num"
                        label="Numero de Mesa"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        outlined
                        v-model="editedItem.capacidad"
                        label="Capacidad"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        :items="SelectDispMesa"
                        label="Disponibilidad"
                        outlined
                        v-model="editedItem.dispmesa"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Está seguro que quiere eliminar esta categoria?</v-card-title
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
export default {
  name: "TableMesas",
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Numero de Mesa",
        align: "start",
        sortable: true,
        value: "num",
      },
      { text: "Capacidad (Personas)", value: "capacidad" },
      { text: "Disponibilidad", value: "dispmesa" },
      { text: "Acciones", value: "actions", sortable: false, width: "100px" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      num: 0,
      capacidad: 0,
      dispmesa: "",
    },
    defaultItem: {
      num: 0,
      capacidad: 0,
      dispmesa: "",
    },

    SelectDispMesa: ["Disponible", "No disponible"],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Categoria" : "Editar Categoria";
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
          num: 1,
          capacidad: 4,
          dispmesa: "Disponible",
        },
        {
          num: 2,
          capacidad: 2,
          dispmesa: "Disponible",
        },
        {
          num: 3,
          capacidad: 6,
          dispmesa: "No disponible",
        },
        {
          num: 4,
          capacidad: 4,
          dispmesa: "Disponible",
        },
        {
          num: 5,
          capacidad: 4,
          dispmesa: "No disponible",
        },
        {
          num: 6,
          capacidad: 2,
          dispmesa: "Disponible",
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
