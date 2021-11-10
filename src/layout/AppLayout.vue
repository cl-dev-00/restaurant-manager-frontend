<template>
  <div>
    <app-top-bar />
    <v-container fluid>
      <v-row no-gutters class="pb-xs-2 ma-sm-5 justify-center fill-height align-center">
          <slot></slot>      
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AppTopBar from "../components/AppTopBar.vue";

export default {
  name: "AppLayout",
  components: {
    AppTopBar,
  },
};
</script>