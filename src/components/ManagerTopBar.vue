<template>
  <div>
    <!--Barra de navegacion superior-->
    <v-app-bar
      color="black"
      dark
      shrink-on-scroll
      src="../assets/background2.png"
    >
      <!--Icono para menu desplegale-->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>

      <v-toolbar-title>{{ currentRouteName }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <!--Icono para opciones de barra superior   -->
      <v-menu
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

        <v-card dark max-width="00">
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
              <v-list-item-icon>
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
            <v-btn color="primary"> Cerrar </v-btn>
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
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="../assets/logo1.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Restaurant Manager</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <div v-for="(item, i) in items" :key="item.title + i">
          <v-list-item
            v-if="!item.subLinks"
            :to="item.path"
            class="v-list-item"
          >
            <v-list-item-icon class="mr-2">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title v-text="item.title" />
          </v-list-item>

          <v-list-group
            v-else
            :key="item.title"
            no-action
            :prepend-icon="item.icon"
            :value="false"
            class="mr-1"
          >
            <template v-slot:activator>
              <v-list-item-title style="margin-left: -23px">{{
                item.title
              }}</v-list-item-title>
            </template>
            <template v-for="sublink in item.subLinks">
              <v-list-item
                :to="sublink.path"
                :key="sublink.title"
                style="margin-left: -40px"
              >
                <v-list-item-icon>
                  <v-icon>{{ sublink.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title
                  style="
                    margin-left: -23px;
                    white-space: normal;
                    word-wrap: break-word;
                    width: 80px;
                  "
                  >{{ sublink.title }}</v-list-item-title
                >
              </v-list-item>
            </template>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import routersInfo from "../router/routers-info";

export default {
  name: "ManagerTopBar",
  mounted() {},
  data: () => ({
    drawer: null,
    model: null,
    items: [
      {
        title: routersInfo.manager.title,
        icon: "mdi-view-dashboard",
        path: routersInfo.manager.path,
      },
      {
        title: "Empleados",
        icon: "mdi-card-account-details",
        subLinks: [
          {
            title: routersInfo.employees.title,
            icon: "mdi-format-list-bulleted",
            path: routersInfo.employees.path,
          },
          {
            title: routersInfo.employeeCreate.title,
            icon: "mdi-plus-circle",
            path: routersInfo.employeeCreate.path,
          },
        ],
      },
      {
        title: "Items del Menu",
        icon: "mdi-food-fork-drink",
        subLinks: [
          {
            title: routersInfo.menuItems.title,
            icon: "mdi-format-list-bulleted",
            path: routersInfo.menuItems.path,
          },
          {
            title: routersInfo.menuItemCreate.title,
            icon: "mdi-plus-circle",
            path: routersInfo.menuItemCreate.path,
          },
        ],
      },
      {
        title: "Categorias del Menu",
        icon: "mdi-alpha-c-circle",
        path: routersInfo.categories.path,
      },
      {
        title: "Mesas de la Sucursal",
        icon: "mdi-table-chair",
        subLinks: [
          {
            title: routersInfo.tables.title,
            icon: "mdi-format-list-bulleted",
            path: routersInfo.tables.path,
          },
          {
            title: routersInfo.tableCreate.title,
            icon: "mdi-plus-circle",
            path: routersInfo.tableCreate.path,
          },
        ],
      },
      // {
      //   title: "Impuestos",
      //   icon: "mdi-sack-percent",
      //   subLinks: [
      //     {
      //       title: routersInfo.taxes.title,
      //       icon: "mdi-format-list-bulleted",
      //       path: routersInfo.taxes.path,
      //     },
      //     {
      //       title: routersInfo.taxeCreate.title,
      //       icon: "mdi-plus-circle",
      //       path: routersInfo.taxeCreate.path,
      //     },
      //   ],
      // },
    ],

    // routersKeys: Object.values(this.items),

    items_usuario: [
      { title: "Configuración", icon: "mdi-cog" },
      { title: "Mi Cuenta", icon: "mdi-account-details" },
      { title: "Salir", icon: "mdi-exit-to-app" },
    ],

    datos_usuario: [{ nombre: "Tu papi chulo", rol: "Dueño de tu corazón bb" }],

    nombre: "Nombre: Tu papi chulo",
    rol: "Rol: Dueño de tu corazón bb",
    valuesRouter: Object.values(routersInfo),
  }),
  computed: {
    currentRouteName() {
      const title = this.valuesRouter.find(
        (valueRouter) => valueRouter.name === this.$route.name
      ).title;

      return title;
    },
  },
};
</script>