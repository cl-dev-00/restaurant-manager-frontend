<template>
  <v-container fluid>
    <v-row class="fill-height" style="height: 800px">
      <v-col cols="12" sm="4" class="fill-height grey lighten-3 d-inline">
        <v-btn
          depressed
          min-height="80"
          block
          color="indigo darken-2"
          class="my-4 white--text"
        >
          <v-avatar> <v-icon> mdi-silverware </v-icon></v-avatar>

          Items del Menu
        </v-btn>
        <v-btn
          depressed
          min-height="80"
          
          block
          color="indigo darken-2"
          class="my-4 white--text"
        >
        <v-avatar> <v-icon> mdi-table-furniture </v-icon></v-avatar>
          Registro de Mesas
        </v-btn>

        <v-btn style="width: 100%; height: 80px" color="indigo darken-2" class="my-1">
          <v-col cols="12" style="margin-top: -12px;">
            <v-row width="100%" style="place-content: center" class="my-0">
              <v-icon large color="white"> mdi-silverware </v-icon>
            </v-row>
            <v-row width="100%" style="place-content: center; margin-top: -2px;">
              <span class="white--text"> Items del Menu </span>
            </v-row>
          </v-col>
        </v-btn>

        <v-btn style="width: 100%; height: 80px" color="indigo darken-2" class="my-4">
          <v-col cols="12" style="margin-top: -12px;">
            <v-row width="100%" style="place-content: center" class="my-0">
              <v-icon large color="white"> mdi-table-furniture </v-icon>
            </v-row>
            <v-row width="100%" style="place-content: center; margin-top: -2px;">
              <span class=" white--text"> Registro de Mesas </span>
            </v-row>
          </v-col>
        </v-btn>

      </v-col>
      <v-col cols="12" sm="8" class="fill-height grey"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  setup() {},
  mounted() {},
};
</script>


<style scoped>
</style>