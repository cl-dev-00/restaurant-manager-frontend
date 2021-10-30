<template>
  <div>
    <manager-top-bar />
    <v-container>
      <v-row class="pb-xs-2 ma-sm-10 justify-center fill-height justify-center align-center">
        <slot></slot>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ManagerTopBar from "../components/ManagerTopBar.vue";

export default {
  name: "ManagerLayout",
  components: {
    ManagerTopBar,
  },
};
</script>