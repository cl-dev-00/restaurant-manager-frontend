<template>
  <app-layout>
    <v-container>
      <v-row class="mt-5 mb-5 align-center justify-center">
        <v-btn-toggle
          v-model="step"
          shaped
          borderless
          mandatory
          color="green accent-4"
          id="toggle1"
          class="justify-center mr-0 pr-0 pl-0 ml-0 green--text"
        >
          <v-btn class="btn1">
            <v-icon
              size="28"
              class="mr-1"
              :color="step === 0 ? 'green accent-4' : 'black'"
              >mdi-new-box</v-icon
            >
            <span class="hidden-xs-only">Ordenes Entrantes</span>
          </v-btn>

          <v-btn class="btn1">
            <v-icon
              size="28"
              class="mr-1"
              :color="step === 1 ? 'green accent-4' : 'black'"
              >mdi-menu</v-icon
            >
            <span class="hidden-xs-only">Estado de Platillos</span>
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row class="align-center justify-center">
        <v-window v-model="step" class="col-12">
          <v-window-item :value="0">
            <div class="orders col-12">
              <v-container fluid>
                <app-container-cards-orders :tipoCard="'Cocina'" />
              </v-container>
            </div>
          </v-window-item>

          <v-window-item :value="1">
            <v-row class="justify-center">
              <v-col cols="12" sm="10" md="8">
                <div>
                  <div class="text-center mb-4 d-block">
                    <span class="text-h5 mr-2"
                      >Establecer el estado de los platillos</span
                    >
                  </div>
                  <v-alert
                    outlined
                    type="warning"
                    prominent
                    border="left"
                    transition="scale-transition"
                  >
                    Puede Cambiar el estado de los platillos del menú, considere
                    que al establecerlos como No disponibles el mesero no podrá
                    verlos el menú. <br />
                    <br />Marca con un check
                    <v-icon color="orange">mdi-checkbox-outline</v-icon> los
                    items disponibles <br />
                    <br />Los items con check vacío
                    <v-icon color="orange">mdi-checkbox-blank-outline</v-icon>
                    No estarán disponibles <br />
                  </v-alert>
                </div>
              </v-col>
              <v-col cols="12" sm="10" md="8">
                <kitchen-items-state />
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-row>
    </v-container>
  </app-layout>
</template>

<script>
import AppLayout from "../../layout/AppLayout.vue";
import AppContainerCardsOrders from "../../components/AppContainerCardsOrders.vue";
import KitchenItemsState from "../../components/KitchenItemsState.vue";

export default {
  name: "KitchenRoom",
  components: {
    AppLayout,
    AppContainerCardsOrders,
    KitchenItemsState,
  },
  mounted() {
    this.step = parseInt(localStorage.getItem(this.$route.name)) || 0;
  },

  data() {
    return {
      show: false,
      step: 0,
      tCocina: "Cocina",
    };
  },
  watch: {
    step: function () {
      localStorage.setItem(this.$route.name, this.step);
    },
  },
};
</script>