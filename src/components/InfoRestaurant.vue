<template>
  <v-card class="ma-3" elevation="10">
    <v-card-title class="justify-center pt-8">
      Informacion del Restaurante
      <v-spacer></v-spacer>
      <v-btn color="orange" dark fab small @click="enableInputs()">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-title>

    <v-row>
      <v-card-text>
        <v-container>
          <v-form v-model="isFormValid">
            <v-row>
              <v-col cols="12" sm="7" md="7">
                <v-text-field
                  outlined
                  label="Nombre"
                  v-model="name"
                  :rules="ruleRequired"
                  :disabled="!enableinput"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="5" md="5">
                <v-text-field
                  outlined
                  label="Numero de Telefono"
                  v-mask="'####-####'"
                  v-model="phone"
                  :rules="rulePhoneS"
                  :disabled="!enableinput"
                ></v-text-field>
              </v-col>

              <v-col class="col-12">
                <v-textarea
                  outlined
                  label="Direccion"
                  rows="2"
                  v-model="address"
                  :rules="ruleRequired"
                  :disabled="!enableinput"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>

        <v-row class="justify-end">
          <v-col  cols="12" sm="5" md="3">
            <v-btn :disabled="!isFormValid" color="green" dark block @click="saveData">
              <v-icon>mdi-content-save</v-icon>
              <span class="hidden-xs-only ml-1">Guardar</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-row>
  </v-card>
</template>

<script>
import { Rules } from "../helpers/rules.js";
export default {
  name: "InfoRestaurant",
  data() {
    return {
      isFormValid: false,
      enableinput: false,

      ruleRequired: Rules.required,
      rulePhoneS: Rules.phonesize,

      name: "Restaurante Palomadas",
      phone: "1234-5678",
      address: "Alameda Roosevelt, Centro Comercial Granada S.S RBD SALVADOR MUNDO",
    };
  },
  methods:{
      enableInputs(){

          if(this.enableinput === false){
              this.enableinput = true;
          }else{
           this.enableinput = false;
          }
     
      },
      
      saveData(){
      this.enableinput = false;
      },
  },
};
</script>