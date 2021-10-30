<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10">
                <v-card class="elevation-6 mt-10">
                    <v-window v-model="step">
                        <v-window-item :value="1">
                            <v-row>
                                <!-- Left div section -->
                                <v-col cols="12" sm="6">
                                    <v-card-text class="mt-12">
                                        <h2 class="text-center">Bienvenido</h2>
                                        <h4 class="text-center grey--text">Ingresa con tus credenciales</h4>

                                        <v-row align="center" justify="center">    
                                            <v-col cols="8" sm="8">
                                                <v-text-field
                                                    v-model="credential"
                                                    :rules="userRules"
                                                    label="Credencial"
                                                    outlined
                                                    dense
                                                    color="blue"
                                                    aria-autocomplete="false"
                                                    class="mt-16"
                                                    required
                                                ></v-text-field>

                                                <v-text-field
                                                    v-model="password"
                                                    :rules="passwordRules"
                                                    :counter="10"
                                                    label="Clave"
                                                    outlined
                                                    dense
                                                    color="blue"
                                                    aria-autocomplete="false"
                                                    type="password"
                                                    required
                                                ></v-text-field>
                                                <v-btn color="blue" dark block > Ingresar </v-btn>
                                                <div class="d-flex justify-space-between align center mx-10 mb-16"></div>
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
                        </v-window-item>
                    </v-window>                    
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default({
    name: 'Login',
    data: () => ({
      valid: false,
      credential: '',
      password: '',
      userRules: [
        v => !!v || 'Obiigatorio ingresar su credencial',
      ],
      passwordRules: [
        v => !!v || 'Ingrese su clave',
        v => v.length <= 10 || 'Su clave excede el numero de digitos',
      ],
    }),
})
</script>

<style scoped>
.v-application .rounded-bl-xl{
    border-bottom-left-radius: 300px !important;
}

.centerIcon{
    text-align: center;
    padding: 180px 0;
}
</style>
