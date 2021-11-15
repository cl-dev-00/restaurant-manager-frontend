<template>
  <v-row class="fill-height justify-center align-center">
    <v-col>
      <v-card>
        <v-card-title class="justify-center">
          <span class="text-h4 pt-10">Cuenta de Usuario</span>
        </v-card-title>

        <v-card-text>
          <!-- <v-row align="center" justify="center">
              <v-col cols="2" sm="4"></v-col>
              <v-col cols="8" sm="4" class="">
                <img :src="avatar" class="avatar d-flex justify-center" />
                <v-btn
                  color="success"
                  small
                  block
                  class="mt-1 mb-5"
                  @click="changeTrigger()"
                >
                  Cambiar Imagen</v-btn
                >
                <div class="text-muted">{{ message }}</div>
             
                <avatar-cropper
                  @uploading="handleUploading"
                  @uploaded="handleUploaded"
                  @completed="handleCompleted"
                  @error="handlerError"
                  v-model="trigger"
                  upload-url="/files/upload"
                />
               
              </v-col>
              <v-col cols="2" sm="4"></v-col>
            </v-row>
 -->
          <v-container>
            <v-form
              v-model="isFormValid"
              class="mx-auto"
              style="max-width: 600px"
            >
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    outlined
                    v-model="editedItem.nombre"
                    label="Nombres"
                    :rules="ruleOnlyAlpha"
                    :disabled="notvalid"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    outlined
                    v-model="editedItem.apellido"
                    label="Apellidos"
                    :rules="ruleOnlyAlpha"
                    :disabled="notvalid"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    outlined
                    v-model="editedItem.email"
                    label="Email"
                    :rules="ruleEmail"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    outlined
                    v-model="editedItem.username"
                    label="Nombre de usuario"
                    :rules="ruleRequired"
                    :disabled="notvalid"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    outlined
                    v-model="editedItem.telefono"
                    label="Telefono"
                    v-mask="'####-####'"
                    :rules="rulePhoneS"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="3" md="3">
                  <v-text-field
                    outlined
                    v-model.number="editedItem.edad"
                    label="Edad"
                    :rules="ruleAge"
                    v-mask="'##'"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="5" md="5">
                  <v-text-field
                    outlined
                    v-model.number="editedItem.rol"
                    label="Edad"
                    :rules="ruleRequired"
                    :disabled="notvalid"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    rows="2"
                    outlined
                    v-model="editedItem.direccion"
                    label="Dirección"
                    :rules="ruleRequired"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" sm="12" md="12">
                  <v-btn
                    x-large
                    block
                    depressed
                    :disabled="!isFormValid"
                    color="primary"
                    @click="save"
                  >
                    Guardar
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { Rules } from "../helpers/rules";
import { toastMessage } from "../helpers/messages";

export default {
  name: "MyAccount",

  mounted() {
    // console.log(this.$store.getters.user);

    this.$services.shareds
      .getEmployee(this.$store.getters.user.idEmpleado)
      .then((response) => {
        if (response.data.ok) {
          const employee = response.data.employee;

          this.llenarEditedItem(employee);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  data: () => ({
    isFormValid: false,
    editedItem: {
      nombre: "",
      apellido: "",
      username: "",
      edad: "",
      telefono: "",
      direccion: "",
      email: "",
      rol: "",
      idRol: -1,
    },

    ruleRequired: Rules.required,
    ruleAge: Rules.integer,
    ruleOnlyAlpha: Rules.alpha,
    ruleEmail: Rules.email,
    rulePhoneS: Rules.phonesize,
    ruleVePass: [],
    //imagen ****************************************
    trigger: false,
    message: "",

    notvalid: true,

    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPNbOneenDa9mbmD7tjFZgsWnd1BhhAPA5GUwBvtAm9ANMe-_PN1lQL3W2FSPq7J2iXDU&usqp=CAU",
  }),

  //created(){
  //},
  methods: {
    //metodos para la imagen ***************************************
    changeTrigger() {
      this.trigger = true;
    },
    handleUploading(form, xhr) {
      this.message = "Subiendo...";
    },
    handleUploaded(response) {
      if (response.status === "success") {
        this.user.avatar = response.url;
        // Maybe you need call vuex action to
        // update user avatar, for example:
        // this.$dispatch('updateUser', {avatar: response.url})
        this.message = "Imagen de perfil cambiada";
      }
    },
    handleCompleted(response, form, xhr) {
      this.message = "Se completó la subida";
    },
    handlerError(message, type, xhr) {
      this.message = "Oops! Un error ocurrió...";
    },

    //************************************************************** */

    save() {
      const { nombreRol, ...props } = this.editedItem;

      const employee = { ...props };

      employee.idComercial = this.$store.getters.user.idComercial;
      
      this.$services.manager
        .updateEmployee(this.$store.getters.user.idEmpleado, employee)
        .then((response) => {
          if (response.data.ok) {
            this.llenarEditedItem(response.data.employee);

            toastMessage(
              "success",
              "Exito",
              "Se actualizo el empleado correctamente"
            );
          }
        })
        .catch((error) => {
          console.log(error);
          toastMessage(
            "error",
            "Error :(",
            "No se pudo actualizar el empleado"
          );
        });
    },

    llenarEditedItem(employee) {
      this.editedItem.nombre = employee.nombre;
      this.editedItem.apellido = employee.apellido;
      this.editedItem.username = employee.username;
      this.editedItem.edad = employee.edad;
      this.editedItem.telefono = employee.telefono;
      this.editedItem.direccion = employee.direccion;
      this.editedItem.email = employee.email;
      this.editedItem.rol = employee.role.nombreRol;
      this.editedItem.idRol = employee.role.idRol;
    },
  },
};
</script>


<style scoped>
</style>