<template>
  <div class="orders">
    <v-container fluid class="black">
      <v-row>
        <!-- Columnas de Cards, responsivo -->
        <v-col
          xs="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          class="mb-0"
          v-for="account in accounts"
          :key="account.idCuenta"
        >
          <!-- Configuracion de Card -->
          <kitchen-card-order
            :nombreCliente="account.nombreCliente"
            :nombreMesero="account.employee.nombre"
            :orders="account.orders"
            @doneOrderEmit='() => doneOrder(account.idCuenta)'
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import KitchenCardOrder from "../../components/KitchenCardOrder.vue";

export default {
  components: {
    KitchenCardOrder,
  },
  mounted() {
    this.$services.kitchenRoom.getAccounts().then((response) => {
      if (response.data.ok) {
        this.hasItems = response.data.collection.hasItems;
        this.total = response.data.collection.total;
        this.accounts = response.data.collection.items;
      }
    });
  },

  data() {
    return {
      hasItems: false,
      accounts: [],
      total: 0,
      orders: [
        { name: "Jose Adolfo", product: "Salchipapa", state: "true" },
        { name: "Martin Fierro", product: "Papitas", state: "true" },
        { name: "Dario Barassi", product: "Milanessa", state: "true" },
        { name: "Jose Adolfo", product: "Salchipapa", state: "true" },
        { name: "Martin Fierro", product: "Papitas", state: "true" },
        { name: "Dario Barassi", product: "Milanessa", state: "true" },
        { name: "Chele Ibañez", product: "Mesa 2", state: "false" },
      ],

      items: [
        {
          amount: "1",
          notes: "No tomate",
          order: "Hamburguesa de Res",
        },
        {
          amount: "2",
          notes: "Con pepinillos",
          order: "Sub de Pavo",
        },
        {
          amount: "6",
          notes: "Sin azucar",
          order: "Cafe Americano",
        },
        {
          amount: "6",
          notes: "",
          order: "Cafe Americano",
        },
      ],
    };
  },
  methods: {
    doneOrder(id) {
      const account = this.accounts.find(account => account.idCuenta === id);
      account.done = true;
      account.idEmpleado = account.employee.idEmpleado;

      delete account.orders;
      delete account.employee;

      this.$services.kitchenRoom.updateAccount(id, account)
        .then(response => {
          if(response.data.ok) {
            this.accounts = this.accounts.filter(account => account.done !== true);
            console.log(this.accounts)
          }
        })
        .catch(error => {
          console.log(error)
        })

    }
  }
};
</script>
