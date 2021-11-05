<template>
  <div>
    <app-top-bar />
    <v-container>
      <v-row class="pb-xs-2 ma-sm-10 justify-center fill-height justify-center align-center">
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