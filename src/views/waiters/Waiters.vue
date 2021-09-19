<template>
  <v-container>
    <v-row>
      <waiter-card-category
      :itemSelects="itemSelects" 
      @updateSelectItems="updateSelectItems"
      />
      <waiters-form-order 
      :itemSelects="itemMenuOrder" 
      @clearitemSelects="clearitemSelects"
      />
    </v-row>
  </v-container>
</template>

<script>
import WaiterCardCategory from "../../components/WaitersCardCategory.vue";
import WaitersFormOrder from "../../components/WaitersFormOrder.vue";
export default {
  components: {
    WaiterCardCategory,
    WaitersFormOrder,
  },
  data() {
    return {
      itemSelects: [],
      itemMenuOrder: []
    };
  },
  methods: {
    updateSelectItems(items) {
      this.itemSelects = items;
      this.itemMenuOrder = items.map(item => ({
        nombre_Item: item.nombre_Item,
        id_item_name: item.id_item_name,
        precio: item.precio,
        cantidad: 1,
        importe: 0
      }));
    },
    clearitemSelects() {
      this.itemMenuOrder = [];
    },
  },
};
</script>


<style lang="css" scoped>
</style>