<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { decodeJWT } from "./helpers/decode-jwt";

export default {
  name: "App",
  mounted() {
    const token = localStorage.getItem("token");

    if (token) {
      const employee = decodeJWT(token).data;

      this.$store.dispatch("setUserAction", employee);
      this.$store.dispatch("setLoginSignAction", true);

      const nivelAcceso =
        this.$store.getters.user.role.user_level.nivel_usuario;

      switch (nivelAcceso) {
        case 2:
          this.$router.push("/manager");
          break;
        case 3:
          this.$router.push("/orders");
          break;
        case 4:
          this.$router.push("/orders");
          break;
        case 5:
          this.$router.push("/kitchen-room");
          break;

        default:
          this.$router.push("/");
          break;
      }
    }
  },
};
</script>
