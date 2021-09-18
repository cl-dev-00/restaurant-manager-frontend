<template>
  <v-container>
    <v-row>
      <waiter-card-category />
      <waiters-form-order />
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
  mounted() {
    this.$services.waiters
      .getCategories()
      .then((response) => {
        if (response.data.ok) {
          this.categories = response.data.collection;
        } else {
          console.log("El servidor revento");
        }
        console.log(this.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      categories: {
        collection: {
          hasItems: false,
          items: [],
          total: 0,
        },
      },
    };
  },
  methods: {},
};
</script>


<style lang="css" scoped>
</style>