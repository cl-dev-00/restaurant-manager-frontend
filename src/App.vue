<template>
  <v-app>

    <top-bar/>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TopBar from './components/TopBar.vue'

export default {
  name: "App",
  components:{TopBar},
  data: () => ({
    //
  }),
};
</script>
