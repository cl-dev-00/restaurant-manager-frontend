<template>
  <v-container fill-heigth fluid class="bg">
    <v-row align="center" justify="center" style="margin-top:5%; ">
 
      <v-col cols="12" sm="11" md="10" lg="8" xl="6">
        <v-card class="elevation-6 mt-10">
          <v-form v-model="isFormValid">
            <v-row justify="center" >    
              <v-col cols="11" sm="6" class="back rounded-bl-xl pa-5">
                   <v-img
                    min-height="100px"
                    max-height="100%"
                    max-width="290px"
                    src="../../assets/posrelogopng.png"
                    class=" mt-sm-10 "
                  ></v-img>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-text class="mt-5">
                  <h2 class="text-center">Bienvenido</h2>
                  <h4 class="text-center grey--text">
                    Ingresa tus credenciales
                  </h4>

                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="11">
                      <v-text-field
                        v-model="user.username"
                        :rules="userRules"
                        label="Nombre de Usuario"
                        outlined
                        color="blue"
                        aria-autocomplete="false"
                        class="mt-12"
                        required
                      ></v-text-field>

                      <v-text-field
                        v-model="user.password"
                        :rules="passwordRules"
                        label="Clave"
                        outlined
                        color="blue"
                        aria-autocomplete="false"
                        type="password"
                        required
                      ></v-text-field>
                      <v-btn
                        :disabled="!isFormValid"
                        class="white--text mb-5"
                        color="blue"
                        @click="login"
                        block
                        x-large
                      >
                        Ingresar
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
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

<style lang="scss" scoped>
.v-application .rounded-bl-xl {
  border-bottom-right-radius: 50% !important;
  border-bottom-left-radius: 10px !important;
  border-top-left-radius: 10px !important;
 
  /*max-height: 320px;*/
}

.back {
  background: rgb(22, 22, 21);
  background: linear-gradient(
    29deg,
    rgba(22, 22, 21, 1) 0%,
    rgba(81, 59, 37, 1) 100%
  );
}
.bg {
  background: url("../../assets/background2.png") repeat-y center center fixed ;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 100vh;
 
 #app{
  background: url('../../assets/background2.png') no-repeat center center fixed !important;
  background-size: cover;
}
}
</style>
