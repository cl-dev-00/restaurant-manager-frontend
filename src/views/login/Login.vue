<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-form v-model="isFormValid">
            <v-row>
              <!-- Left div section -->
              <v-col cols="12" sm="6">
                <v-card-text class="mt-12">
                  <h2 class="text-center">Bienvenido</h2>
                  <h4 class="text-center grey--text">
                    Ingresa tus credenciales
                  </h4>

                  <v-row align="center" justify="center">
                    <v-col cols="8" sm="8">
                      <v-text-field
                        v-model="user.username"
                        :rules="userRules"
                        label="Nombre de Usuario"
                        outlined
                        dense
                        color="blue"
                        aria-autocomplete="false"
                        class="mt-16"
                        required
                      ></v-text-field>

                      <v-text-field
                        v-model="user.password"
                        :rules="passwordRules"
                        label="Clave"
                        outlined
                        dense
                        color="blue"
                        aria-autocomplete="false"
                        type="password"
                        required
                      ></v-text-field>
                      <v-btn
                        :disabled="!isFormValid"
                        class="white--text"
                        color="blue"
                        @click="login"
                        block
                      >
                        Ingresar
                      </v-btn>
                      <div
                        class="
                          d-flex
                          justify-space-between
                          align
                          center
                          mx-10
                          mb-16
                        "
                      ></div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-col>

              <!-- Rigth div section -->
              <v-col cols="12" sm="6" class="blue rounded-bl-xl">
                <div class="centerIcon">
                  <v-btn class="text-center">POS RESAURANT</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { decodeJWT } from "../../helpers/decode-jwt";

export default {
  name: "Login",
  data: () => ({
    isFormValid: false,
    user: { username: "", password: "" },
    userRules: [(v) => !!v || "Ingresa tu nombre de usuario"],
    passwordRules: [(v) => !!v || "Ingrese tu clave"],
  }),
  methods: {
    login() {
      this.$services.auth
        .login(this.user)
        .then((response) => {
          if (response.data.ok) {
            const token = response.data.token;

            localStorage.setItem("token", token);

            const employee = decodeJWT(token).data;

            this.$store.dispatch("setUserAction", employee);
            this.$store.dispatch("setLoginSignAction", true);
            console.log()
            switch (this.$store.getters.user.role.user_level.nivel_usuario) {
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}

.centerIcon {
  text-align: center;
  padding: 180px 0;
}
</style>
