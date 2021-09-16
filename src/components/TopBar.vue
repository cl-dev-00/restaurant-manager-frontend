<template>
  <div>
    <!--Barra de navegacion superior-->
    <v-app-bar color="black accent-4" dark>
      <!--Icono para menu desplegale-->
      <v-app-bar-nav-icon 
      @click.stop="drawer = !drawer"> 
      </v-app-bar-nav-icon>

      <v-toolbar-title>POS</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu left bottom><!--Icono para opciones de barra superior-->
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list><!--Lista de elementos opciones, boton barra superior-->
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- SlideBar de navegacion izquierdo -->
    <v-navigation-drawer
      v-model="drawer"
      dark
      src="../assets/unnamed.jpg"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="../assets/logo.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Restaurante</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list><!-- Lista de Items del Menu -->
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default{
    name: "TopBar",
    mounted(){
        console.log(this.$services);
    },
    data:()=>({ 
      drawer: null,
        items: [
          { title: 'Inicio', icon: 'mdi-view-dashboard' },
          { title: 'Caja', icon: 'mdi-forum' },
          { title: 'Cocina', icon: 'mdi-forum' },
          { title: 'Administracion', icon: 'mdi-forum' },
        ],  
    })
}
</script>