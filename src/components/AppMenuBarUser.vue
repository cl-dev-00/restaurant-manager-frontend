<template>
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

    <v-card dark max-width="290">
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <!--<img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPNbOneenDa9mbmD7tjFZgsWnd1BhhAPA5GUwBvtAm9ANMe-_PN1lQL3W2FSPq7J2iXDU&usqp=CAU"
              alt="User"
            />-->
            <v-icon color="cyan accent-2" size="40">{{avatar}}</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ nombre }}</v-list-item-title>
            <v-list-item-subtitle>{{ rol }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          @click="item.click"
          v-for="item in items_usuario"
          :key="item.title"
          link
          :to="item.path"
        >
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
    </v-card>
  </v-menu>
</template>

<script>
import routersInfo from "../router/routers-info";

export default {
  name: "AppMenuBarUser",

  mounted() {
    this.nombre =
      this.$store.getters.user.nombre + " " + this.$store.getters.user.apellido;
    this.rol = this.$store.getters.user.role.nombreRol;

    switch (this.rol) {
      case "Administrador":
        this.avatar = "account-key"; 
        break;
      case "Gerente":
        this.avatar = "mdi-account-tie";
        break;
      case "Personal de cocina":
        this.avatar = "mdi-chef-hat";
        break;
      case "Cajero":
        this.avatar = "mdi-cash-register";
        break;
      case "Mesero":
        this.avatar = "mdi-table-chair";
        break;
      default:
        this.avatar = "mdi-account";
    }

  },
  data() {
    return {
      nombre: "",
      rol: "",
      avatar: "",
      items_usuario: [
        {
          title: "Mi Cuenta",
          icon: "mdi-account-details",
          path: routersInfo.myaccount.path,

          click: () => {},
        },
        {
          title: "Salir",
          icon: "mdi-exit-to-app",
          click: () => this.signOut(),
        },
      ],
    };
  },
  methods: {
    signOut() {
      localStorage.removeItem("token");
      this.$store.dispatch("setUserAction", null);
      this.$store.dispatch("setLoginSignAction", false);
      this.$router.push("/");
    },
  },
};
</script>