<template>
  <div>
    <!--Barra de navegacion superior-->
    <v-app-bar color="black accent-4" dark>
      <!--Icono para menu desplegale-->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>

      <v-toolbar-title>POS</v-toolbar-title>

      <v-spacer></v-spacer>

      <!--Icono para opciones de barra superior   -->
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="100"
        offset-x
        transition="slide-y-transition"
       
        >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon size="35">mdi-account-circle-outline</v-icon>
          </v-btn>
        </template>

        <v-card dark max-width="300">
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPNbOneenDa9mbmD7tjFZgsWnd1BhhAPA5GUwBvtAm9ANMe-_PN1lQL3W2FSPq7J2iXDU&usqp=CAU"
                  
                  alt="User"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ nombre }}</v-list-item-title>
                <v-list-item-subtitle>{{ rol }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

         <v-list>
          <v-list-item v-for="item in items_usuario" :key="item.title" link>
            <v-list-item-icon >
              <v-icon size="30">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <!-- <router-link :to="item.path">{{ item.title }}</router-link> -->
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="menu = false"> Cerrar </v-btn>
          </v-card-actions>
        </v-card>
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

      <v-list
        ><!-- Lista de Items del Menu -->
        <v-list-item
          :to="item.path"
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <!-- <router-link :to="item.path">{{ item.title }}</router-link> -->
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import routersInfo from "../router/routers-info";

export default {
  name: "TopBar",
  mounted() {},
  data: () => ({
    drawer: null,
    items: [
      {
        title: "Inicio",
        icon: "mdi-view-dashboard",
        path: routersInfo.home.path,
      },
      {
        title: "Cocina",
        icon: "mdi-chef-hat",
        path: routersInfo.kitchenroom.path,
      },
      {
        title: "Ordenes",
        icon: "mdi-cash-register",
        path: routersInfo.orders.path,
      },

    ],

    items_usuario: [
      { title: "Mi Cuenta", icon: "mdi-account-details" },
      { title: "Configuración", icon: "mdi-cog" },
      { title: "Salir", icon: "mdi-exit-to-app" },
    ],

   datos_usuario:[
      {nombre: "Tu papi chulo", rol: "Dueño de tu corazón bb"},
   ],

    menu: false,
    nombre: "Nombre: Tu papi chulo", 
    rol: "Rol: Dueño de tu corazón bb",
    
  }),
};
</script>