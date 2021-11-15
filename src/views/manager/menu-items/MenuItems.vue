<template>
  <manager-layout>
    <manager-table-menu-items />
  </manager-layout>
</template>

<script>
import ManagerTableMenuItems from '../../../components/ManagerTableMenuItems.vue';
import ManagerLayout from '../../../layout/ManagerLayout.vue';

export default {
    name: 'MenuItems',
    components: {
        ManagerTableMenuItems,
        ManagerLayout,
    }    
}
</script>