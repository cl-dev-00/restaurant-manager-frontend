<template>
  <v-col cols="12" sm="7" class="col-menu">
    <v-row style="margin-bottom: -40px">
      <v-col class=" col-10  ">
        <v-text-field
          label="Buscar"
          outlined
          clearable
          v-model="txt_buscar"
        
        ></v-text-field>
        
      </v-col>
      <v-col class=" col-2">
        <v-btn
        color="#222"
        outlined
        depressed
        min-height="63%"
        min-width="100%"
        class=" mx-auto" 
        @click="filterMenuByName()">
          <v-icon size="35">mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="col-12 ml-0 mr-0 pl-0 pr-0">
      <v-card class="mx-auto col-12" color="rgb(247, 247, 247)">
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
          <v-btn
            :disabled="step === 1"
            text
            @click="seleccionarCategoria(null)"
          >
            Back
          </v-btn>
          <span>{{ cat }}</span>
        </v-card-title>
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-row class="ml-2">
              <v-col
                v-for="category in categories.items"
                :key="category.idCategoria"
                xs="12"
                sm="4"
                md="4"
                lg="3"
                xl="2"
                class="mb-4"
              >
                <v-btn
                  min-height="120"
                  max-height="120"
                  min-width="90%"
                  max-width="90%"
                  class="caption mx-auto"
                  color="#222"
                  id="boton_categoria"
                  :disabled="step === 2"
                  depressed
                  @click="() => seleccionarCategoria(category.idCategoria)"
                >
                  <span class="boton_a">{{ category.nombreCategoria }}</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="2">
            <v-row class="ml-2">
              <v-col class="col-12 mx-auto">
                <v-list subheader two-line flat color="rgb(247, 247, 247)">
                  <v-list-item-group v-model="ItemSelectsMenu" multiple>
                    <template v-for="item in items_menu">
                      <v-list-item :key="item.id_nombre_item" :value="item">
                        <template v-slot:default="{ active }">
                          <v-list-item-action>
                            <v-checkbox
                              color="primary"
                              :input-value="active"
                            ></v-checkbox>
                          </v-list-item-action>
                          <v-list-item-title>
                            {{ item.nombre_Item }}
                            <v-list-item-subtitle>
                              {{ item.detalles_item }}
                            </v-list-item-subtitle>
                          </v-list-item-title>
                          <v-list-item-avatar>
                            <span class="green--text font-weight-bold">
                              $ {{ item.precio }}
                            </span>
                          </v-list-item-avatar>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "WaitersCardCategory",
  props: {
    itemSelects: {
      type: Array,
      required: true,
    },
  },
  components: {},
  mounted() {
    this.$services.waiters
      .getCategories()
      .then((response) => {
        if (response.data.ok) {
          this.categories = response.data.collection;
        } else {
          console.log("El servidor revento");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    this.$services.waiters
      .getMenuItems()
      .then((response) => {
        if (response.data.ok) {
          this.menuItems = response.data.collection;
        } else {
          console.log("El servidor revento");
        }
      })
      .catch((error) => {
        console.log(error);
      });

  },
  // computed: {
  //   itemSelectsLocal: {
  //     set(value) {
  //       console.log(this.itemSelectsLocal)
  //       this.$emit('itemSelectsChange', value);
  //     },
  //     get() {
  //       return this.itemSelects;
  //     },
  //   },
  // },
  data() {
    return {
      categories: {
        hasItems: false,
        items: [],
        total: 0,
      },
      menuItems: {
        hasItems: false,
        items: [],
        total: 0,
      },
      txt_buscar: "",

      step: 1,
      message4: "Buscar",
      message_comentarios: "Comentarios",
      total_sample: "0.00",
      c1: "rgb(52, 166, 186)",
      icon1: "mdi-arrow-right-box",
      cat: "Categorias",

      items_menu: [],
      items_menu_for_filter: this.menuItems,
      itemMenuSelects: this.itemSelects
    };
  },
  computed: {
    ItemSelectsMenu: {
      set(value) {
        this.$emit('updateSelectItems', value);
        this.itemMenuSelects = value;
      },
      get() {
        return this.itemMenuSelects;
      }
    },

 

  },
  methods: {

    seleccionarCategoria(idCategory) {
      // var nombre_categoria;

      // this.categories.items.forEach((nombre) => {
      //   if ((nombre = categoria_clickeada)) {
      //     nombre_categoria = categoria_clickeada;
      //   }
      // });

      if (idCategory) {
        this.items_menu = this.menuItems.items.filter(
          (menu_item) => menu_item.idCategoria === idCategory
        );

        this.cat = idCategory;
        this.step++;
      } else if(idCategory === null){
        this.txt_buscar = ""; 
        this.step=1;
      }else{
        this.cat = "Categorías";
        this.step--;
      }

    },
   filterMenuByName() {
    
   if (this.txt_buscar === '' || this.txt_buscar === null || this.txt_buscar.value === 0 || this.txt_buscar.value === "" ){
   
     this.step--;
     return ;
   }else{

  const search = this.txt_buscar.toLowerCase().trim();
  this.items_menu = this.menuItems.items.filter(f => f.nombre_Item.toLowerCase().indexOf(search) > -1)
     this.step = 2;
    return this.items_menu;
    
   
   } 
 },

  },
};
</script>

<style lang="css" scoped>
@media only screen and (max-width: 600px) {
  .col-menu {
    visibility: hidden;
    height: 0;
    padding: 0;
    margin: 0;
  }
}

#boton_categoria .boton_a {
  font-size: 2ch;
  white-space: normal;
  word-wrap: break-word;
  width: 100px;
  align-content: center;
  color: white;
  padding: 10px;
}
</style>