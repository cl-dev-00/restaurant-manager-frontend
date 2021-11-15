<template>
  <manager-layout>
    <manager-table-categories />
  </manager-layout>
</template>

<script>
import ManagerTableCategories from "../../components/ManagerTableCategories.vue";
import ManagerLayout from "../../layout/ManagerLayout.vue";

export default {
    name: 'Categories',
    components:{
        ManagerTableCategories,
        ManagerLayout,
    }    
}
</script>