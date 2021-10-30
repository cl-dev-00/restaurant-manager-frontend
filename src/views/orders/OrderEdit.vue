<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Editar Orden</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="save" :disabled="validarEnvio">
              Guardar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader class="pa-10">
          <orders-create-or-edit />
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import OrdersCreateOrEdit from "../../components/OrdersCreateOrEdit.vue";
import equalObjet from "../../helpers/equal-objet";

export default {
  name: "OrderEdit",
  components: {
    OrdersCreateOrEdit,
  },
  mounted() {
    const { id } = this.$route.params;

    if (!id) {
      this.$router.push("/orders");
    }

    this.dialog = true;

    this.$store.dispatch("itemsMenuSelectAction", []);
    this.$store.dispatch("setItemsMenuSelectEditAction", []);
    this.$store.dispatch("setItemsMenuSelectRemoveAction", []);
    this.$store.dispatch("setOrderSelectAction", {
      nombreCliente: "",
      idMesa: null,
    });

    this.$services.orders
      .getOrder(id)
      .then((response) => {
        const { employee, table, order_details, idComercial, ...order } =
          response.data.order;

        this.$store.dispatch("setOrderSelectAction", {
          ...order,
          idComercial,
          idEmpleado: employee.idEmpleado,
          idMesa: table ? table.idMesa : null,
        });

        const orderDetailsStore = order_details.map(
          ({
            menu_item: {
              id_menu_item,
              nombre_item,
              disponibilidad,
              idCategoria,
              url,
              precio,
            },
            importe,
            ...props
          }) => ({
            ...props,
            id_menu_item,
            nombre_item,
            disponibilidad,
            idCategoria,
            idComercial,
            precio,
            url,
          })
        );

        const orderDetailsStoreEdit = order_details.map(
          ({
            menu_item: {
              id_menu_item,
              nombre_item,
              disponibilidad,
              idCategoria,
              url,
              precio,
            },
            importe,
            ...props
          }) => ({
            ...props,
            id_menu_item,
            nombre_item,
            disponibilidad,
            idCategoria,
            idComercial,
            precio,
            url,
          })
        );

        this.$store.dispatch("itemsMenuSelectAction", [...orderDetailsStore]);
        this.$store.dispatch("setItemsMenuSelectEditAction", [
          ...orderDetailsStoreEdit,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false,
      dialog: false,
    };
  },
  computed: {
    validarEnvio() {
      if (
        this.$store.getters.orderSelect.nombreCliente.trim() === "" ||
        this.$store.getters.orderSelect.nombreCliente === null ||
        this.$store.getters.orderSelect.nombreCliente.trim().length < 3 ||
        this.$store.getters.itemsMenuSelect.length < 1
      ) {
        return true;
      }

      return false;
    },
  },
  methods: {
    close() {
      this.dialog = false;
      this.$router.push("/orders");
    },

    save() {
      let itemsMenuEdit = [];
      let newMenuItems = [...this.$store.getters.itemsMenuSelect];

      const itemsMenuRemove = this.$store.getters.itemsMenuSelectRemove.map(
        (itemRemove) => itemRemove.id_menu_item
      );

      this.$store.getters.itemsMenuSelectEdit.forEach((itemEdit) => {
        const itemMenu = this.$store.getters.itemsMenuSelect.find(
          (item) => item.id_menu_item === itemEdit.id_menu_item
        );

        if (!equalObjet(itemEdit, itemMenu)) {
          itemsMenuEdit = [...itemsMenuEdit, itemMenu];
        }

        if (
          newMenuItems.some(
            (itemMenu) => itemMenu.id_menu_item === itemEdit.id_menu_item
          )
        ) {
          newMenuItems = newMenuItems.filter(
            (itemMenu) => itemMenu.id_menu_item !== itemEdit.id_menu_item
          );
        }
      });

      let orderUpdate = { ...this.$store.getters.orderSelect };

      newMenuItems = newMenuItems.map(
        ({ disponibilidad, url, precio, idCategoria, ...item }) => ({
          ...item,
          idOrden: orderUpdate.idOrden,
          importe: item.cantidad * precio,
        })
      );
      itemsMenuEdit = itemsMenuEdit.map(
        ({ disponibilidad, url, precio, idCategoria, ...item }) => ({
          ...item,
          idOrden: orderUpdate.idOrden,
          importe: item.cantidad * precio,
        })
      );

      orderUpdate = {
        ...orderUpdate,
        newMenuItems,
        itemsMenuEdit,
        itemsMenuRemove,
      };

      // console.log(orderUpdate);

      this.$services.orders
        .updateOrder(orderUpdate, orderUpdate.idOrden)
        .then((response) => {
          if (response.data.ok) {
            this.$services.socketioService.sendOrderKitchroom(
              response.data.order
            );

            this.$store.dispatch("itemsMenuSelectAction", []);
            this.$store.dispatch("setItemsMenuSelectEditAction", []);
            this.$store.dispatch("setItemsMenuSelectRemoveAction", []);
            this.$store.dispatch("setOrderSelectAction", {
              nombreCliente: "",
              idMesa: null,
            });

            this.$router.push("/orders");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>