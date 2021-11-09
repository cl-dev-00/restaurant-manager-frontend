<template>
  <v-row>
    <v-col cols="12" sm="6" md="6" class="pr-1 pl-1 ">
      <orders-card-category class="" />
    </v-col>
    <v-col cols="12" sm="6" md="6">
      <orders-form-data />
    </v-col>
    <v-col class="hidden-sm-and-up">
      <v-dialog transition="dialog-top-transition" max-width="400">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            color="success"
            fixed
            right
            top
            style="margin-top: 410px"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon dark size="40">mdi-plus</v-icon>
          </v-btn>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import OrdersCardCategory from "./OrdersCardCategory.vue";
import OrdersFormData from "./OrdersFormData.vue";

export default {
  name: "OrdersCreateOrder",
  props: {
    idOrder: {
      type: Number,
      required: false,
    },
  },
  components: {
    OrdersCardCategory,
    OrdersFormData,
  },
};
</script>