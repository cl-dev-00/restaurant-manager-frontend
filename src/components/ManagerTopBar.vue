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


      <app-menu-bar-user />

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
            <v-img src="../assets/logopng1.png"></v-img>
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
import AppMenuBarUser from "../components/AppMenuBarUser.vue";

import routersInfo from "../router/routers-info";

export default {
  name: "ManagerTopBar",
  components: {
    AppMenuBarUser,
  },
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