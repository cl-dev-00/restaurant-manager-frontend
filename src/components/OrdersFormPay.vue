<template>
  <v-card class="ma-3" elevation="10">
    <v-card-title class="pt-8">
      Cancelar orden de
      <span class="red--text ml-2">{{ order.nombreCliente }}</span>
      <br />
    </v-card-title>
    <v-row class="ma-1">
      <v-card-text>
        <!-- ITEMS SELECCIONADOS -->
        <v-row class="overflow-x-auto">
          <v-col cols="12">
            <v-list height="">
              <template v-for="item in order.order_details">
                <v-list-item :key="item.OrderDetial">
                  <!-- Cantidad -->
                  <v-list-item-action>
                    <v-list-item-title class="font-weight-bold">
                      {{ item.cantidad }}
                    </v-list-item-title>
                  </v-list-item-action>

                  <!-- Titulo -->
                  <v-list-item-content>
                    <v-list-item-title
                      style="
                        white-space: normal;
                        word-wrap: break-word;
                        width: 60px;
                        font-weight: bold;
                      "
                    >
                      {{ item.nombre_item }}
                    </v-list-item-title>
                  </v-list-item-content>

                  <!-- SubTotal -->
                  <v-list-item-action>
                    <span class="font-weight-bold">$ {{ item.importe }}</span>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-list>
          </v-col>
        </v-row>
        <v-row class="justify-center ma-2">
          <v-col cols="12" sm="6" md="4">
            <h3>Sub Total:</h3>
            <h4>$ {{ subTotal }}</h4>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <h3>Impuestos (13%):</h3>
            <h4>$ {{ impuestos }}</h4>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <h3>Total:</h3>
            <h4>$ {{ total }}</h4>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-btn-toggle
              v-model="step"
              borderless
              mandatory
              id="toggle1"
              class="justify-center mr-0 pr-0 pl-0 ml-0"
            >
              <v-btn
                class="ma-1"
                :class="this.step === 0 ? 'green--text' : 'grey--text'"
              >
                <v-icon
                  size="28"
                  class="mr-1"
                  :class="this.step === 0 ? 'green--text' : 'grey--text'"
                  >mdi-cash</v-icon
                >
                <span class="text-h6 hidden-xs-only">Efectivo</span>
              </v-btn>
              <v-btn
                class="ma-1"
                :class="this.step === 1 ? 'orange--text' : 'grey--text'"
              >
                <v-icon
                  size="28"
                  class="mr-1"
                  :class="this.step === 1 ? 'orange--text' : 'grey--text'"
                  >mdi-credit-card</v-icon
                >
                <span class="text-h6 hidden-xs-only">Tarjeta</span>
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row class="align-center justify-center">
          <v-window v-model="step" class="col-12">
            <v-window-item :value="0">
              <v-row class="">
                <v-form v-model="btnPayEnableCash" class="col-12">
                  <v-row dense class="ma-0 pa-0">
                    <v-col cols="12" class="green white--text title py-4 pl-5">
                      Detalles del Pago en Efectivo <br />
                    </v-col>
                  </v-row>
                  <v-row dense class="ma-0 pa-5">
                    <v-col cols="12">
                      <v-subheader class="grey--text text--lighten-1 pl-0"
                        >IMPORTE REALIZADO</v-subheader
                      >
                      <v-text-field
                        prepend-inner-icon="mdi-currency-usd"
                        single-line
                        outlined
                        :rules="ruleTest"
                        v-model="cashAmount"
                        placeholder="##.##"
                        @keypress.enter="Calculate()"
                      />
                    </v-col>
                    <v-col cols="12">
                      <p :hidden="!valid" class="red--text">
                        Monto insuficiente
                      </p>
                      <v-subheader class="grey--text text--lighten-1 pl-0"
                        >CAMBIO</v-subheader
                      >
                      <v-text-field
                        single-line
                        outlined
                        v-model="cashBack"
                        placeholder="##.##"
                        disabled
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    :disabled="!btnPayEnableCash"
                    color="green"
                    class="white--text"
                    block
                    x-large
                    @click="save"
                  >
                    <v-icon>mdi-cash-check</v-icon>
                    <span class="hidden-xs-only ml-1">Pagar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item :value="1">
              <v-row class="">
                <v-form v-model="btnPayEnable" class="col-12">
                  <v-row dense class="ma-0 pa-0">
                    <v-col
                      cols="12"
                      class="blue darken-1 white--text title py-4 pl-5"
                    >
                      Detalles del Pago con Tarjeta <br />
                    </v-col>
                  </v-row>
                  <v-row dense class="ma-0 pa-5">
                    <v-col cols="12" sm="6">
                      <v-subheader class="grey--text text--lighten-1 pl-0"
                        >NOMBRE EN LA TARJETA</v-subheader
                      >
                      <v-text-field
                        single-line
                        outlined
                        label="Juan Rodriguez"
                        v-model="cardName"
                        :rules="ruleOnlyAlpha"
                      />
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-subheader class="grey--text text--lighten-1 pl-0"
                        >NUMERO DE TARJETA</v-subheader
                      >
                      <v-text-field
                        prepend-inner-icon="mdi-credit-card"
                        single-line
                        outlined
                        v-mask="'#### #### #### ####'"
                        :rules="ruleCard"
                        v-model="cardString"
                        color="blue"
                        placeholder="•••• •••• •••• ••••"
                      />
                    </v-col>
                    <v-col cols="6" sm="4">
                      <v-subheader class="grey--text text--lighten-1 pl-0"
                        >FECHA DE EXPIRACION</v-subheader
                      >
                      <v-select
                        :items="months"
                        label="Mes"
                        outlined
                        append-icon="mdi-chevron-down"
                        v-model="cardMonth"
                        :rules="ruleRequired"
                      />
                    </v-col>

                    <v-col cols="6" sm="4">
                      <v-subheader
                        class="grey--text text--lighten-1 pl-0"
                      ></v-subheader>
                      <v-select
                        :items="years"
                        label="Año"
                        outlined
                        append-icon="mdi-chevron-down"
                        v-model="cardYear"
                        :rules="ruleRequired"
                      />
                    </v-col>

                    <v-col cols="6" sm="4">
                      <v-subheader class="grey--text text--lighten-1 pl-0"
                        >CVV</v-subheader
                      >
                      <v-text-field
                        single-line
                        outlined
                        v-model="cardCVV"
                        :rules="ruleCVV"
                        v-mask="'###'"
                        placeholder="•••"
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    :disabled="!btnPayEnable"
                    color="green"
                    class="white--text"
                    block
                    x-large
                  >
                    <v-icon>mdi-cash-check</v-icon>
                    <span class="hidden-xs-only ml-1">Pagar ${{ total }}</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-row>
      </v-card-text>
    </v-row>
  </v-card>
</template>

<script>
import { Rules } from "../helpers/rules.js";

export default {
  name: "OrdersFormPay",
  props: {
    order: {
      type: Object,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    subTotal: {
      type: String,
      required: true,
    },
    impuestos: {
      type: String,
      required: true,
    },
    createOrder: {
      type: Function,
    },
    changeState: {
      type: Function,
    },
  },
  data() {
    return {
      btnPayEnable: false,
      btnPayEnableCash: false,
      valid: false,

      step: 0,

      years: ["2022", "2021", "2023", "2024", "2025", "2026", "2027", "2028"],
      months: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],

      cardName: "",
      cardString: "",
      cardMonth: "",
      cardYear: "",
      cardCVV: "",

      ruleRequired: Rules.required,
      ruleOnlyAlpha: Rules.alpha,
      ruleCard: Rules.cardsize,
      ruleCVV: Rules.cvvsize,
      ruleDecimal: Rules.decimal,

      ruleTest: "",

      //Pago en efectivo

      cashName: "",
      cashAmount: "",
      cashBack: "",
    };
  },
  created() {
    this.setRule();
  },
  watch: {
    cashAmount: {
      handler: function (value, oldVal) {
        const amount = value - this.total;
        this.cashBack = amount >= 0 ? amount.toFixed(2) : (amount * -1).toFixed(2);
      },
      // return console.log(amount)
    },
  },
  methods: {
    setRule() {
      this.ruleTest = Rules.test(this.total);
    },
    save() {

      if (typeof this.createOrder === "function") {
        const order = {
          ...this.order,
          importe: this.cashAmount,
        };
        this.createOrder(order);
      } else if (typeof this.changeState === "function") {
        this.changeState(this.cashAmount);
      }
    },

    Calculate() {
      const value = parseFloat(this.cashAmount) - parseFloat(this.total);

      if (isNaN(value)) {
        this.cashBack = "";
      } else {
        if (value.toFixed(2) < 0) {
          this.valid = true;
          this.cashBack = "";
        } else {
          this.valid = false;
          this.cashBack = value.toFixed(2);
        }
      }
    },
  },
};
</script>
