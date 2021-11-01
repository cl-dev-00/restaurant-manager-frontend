<template>
  <v-row>
    <v-col cols="12" sm="6" md="6" class="pr-0 pl-3">
      <orders-card-category class="col-menu" />
      <!-- @updateSelectItems="updateSelectItems" -->
      <!-- :itemSelects="itemSelects" -->
    </v-col>
    <!-- @clearitemSelects="clearitemSelects"
        @removeItemEmit="removeItem" -->
    <!-- :itemSelects="itemMenuOrder" -->
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
  // mounted() {
  // this.$store.dispatch("itemsMenuSelectAction", []);
  // this.$store.dispatch("setOrderSelectAction", {
  //   nombreCliente: "",
  //   idMesa: null,
  // });
  // const { id } = this.$route.params;
  // if (id) {
  //   this.$services.orders
  //     .getOrder(id)
  //     .then((response) => {
  //       const { order } = response.data;
  //       this.$store.dispatch("setOrderSelectAction", {
  //         nombreCliente: order.nombreCliente,
  //         idMesa: order.table? order.table.idMesa : null,
  //       });
  //       const orderDetailsStore = order.order_details.map(
  //         ({
  //           menu_item: {
  //             id_menu_item,
  //             nombre_item,
  //             disponibilidad,
  //             idCategoria,
  //             url,
  //           },
  //           ...props
  //         }) => ({
  //           ...props,
  //           id_menu_item,
  //           nombre_item,
  //           disponibilidad,
  //           idCategoria,
  //           idComercial: order.idComercial,
  //           url,
  //         })
  //       );
  //       // const orderDetails = order.order_details.map(
  //       //   ({ menu_item, ...props }) => ({
  //       //     ...props,
  //       //     id_menu_item: menu_item.id_menu_item,
  //       //     idOrden: order.idOrden,
  //       //     nombre_item: menu_item.nombre_item,
  //       //     precio: menu_item.precio,
  //       //   })
  //       // );
  //       this.$store.dispatch("itemsMenuSelectAction", [...orderDetailsStore]);
  //       // this.itemMenuOrder = [...orderDetails];
  //       // this.itemSelects = [...orderDetails];
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  // },
  // data: () => ({
  // itemSelects: [],
  // itemMenuOrder: [],
  // }),
  // methods: {
  // updateSelectItems(items) {
  //   this.$store.dispatch("itemsMenuSelectAction", items);
  //   this.itemMenuOrder = items.map((item) => ({
  //     nombre_item: item.nombre_item,
  //     id_menu_item: item.id_menu_item,
  //     precio: item.precio,
  //     cantidad: item.cantidad || 1,
  //     importe: item.cantidad || 0,
  //     comentario: "",
  //   }));
  // },
  // clearitemSelects() {
  //   this.itemMenuOrder = [];
  // },
  // removeItem(id) {
  //   const orderDetails = this.$store.getters.itemsMenuSelect.filter(
  //     (item) => item.id_menu_item !== id
  //   );
  //   this.$store.dispatch("itemsMenuSelectAction", orderDetails);
  //   this.itemSelects = this.itemSelects.filter(item => item.id_menu_item !== id);
  //   this.itemMenuOrder = this.itemMenuOrder.filter(
  //     (item) => item.id_menu_item !== id
  //   );
  // },
  // },
};
</script>