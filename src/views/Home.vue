<template>

  <v-row align="center" justify="center" class="bg">
    <v-col class="col-12 mt-5 fadeInUpBig" align="center" justify="center">
      <!-- AQUI PONER EL LOGO -->
      <v-img
        max-height="400"
        max-width="600"
        src="../assets/logo1.png"
      ></v-img>
    </v-col>

    <!-- BOTONES -->
    <v-col
      class="mt-5 zoomInDown btn_home"
      cols="12"
      sm="6"
      align="center"
      justify="center"
      v-for="item in items"
      :key="item.title"
    >
      <v-btn
        min-height="120"
        max-height="120"
        min-width="90%"
        max-width="90%"
        class="mx-auto"
        color="#fff"
        :to="item.path"
        outlined
      >
        <v-icon left color="white" size="40"> {{ item.icon }}</v-icon>
        <span class="white--text ml-5 txt_btn" > {{ item.title }}</span>
      </v-btn>
    </v-col>
    <v-col cols="12" md="6"></v-col>
  </v-row>

</template>

<script>
import routersInfo from "../router/routers-info";

export default {
  mounted() {},
  data: () => ({
    drawer: null,
    items: [
      {
        title: "Módulo Cocina",
        icon: "mdi-chef-hat",
        path: routersInfo.kitchenroom.path,
      },
       {
        title: "Módulo Cajero",
        icon: "mdi-cash-register",
        path: routersInfo.order.path,
      },
        
    ],
  }),
};
</script>

<style lang="scss" scoped>

.bg{
   background: url("../assets/background2.png") repeat-y center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 100%;
  margin-right: 1px;
  margin-top: 1px;
}

.btn_home .v-btn--outlined {
    
    border-width: thick;
  }

.txt_btn{
  font-size: 17pt;
  white-space: normal;
  width: 150px;
} 


.zoomInDown {
  -webkit-animation-name: zoomInDown;
  animation-name: zoomInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  }
  @-webkit-keyframes zoomInDown {
  0% {
  opacity: 0;
  -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
  transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
  -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
  animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
  }
  60% {
  opacity: 1;
  -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
  transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
  -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
  animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
  }
  }
  @keyframes zoomInDown {
  0% {
  opacity: 0;
  -webkit-transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
  transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
  -webkit-animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
  animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
  }
  60% {
  opacity: 1;
  -webkit-transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
  transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
  -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
  animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
  }
  } 

   .fadeInUpBig {
  -webkit-animation-name: fadeInUpBig;
  animation-name: fadeInUpBig;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  }
  @-webkit-keyframes fadeInUpBig {
  0% {
  opacity: 0;
  -webkit-transform: translate3d(0, 2000px, 0);
  transform: translate3d(0, 2000px, 0);
  }
  100% {
  opacity: 1;
  -webkit-transform: none;
  transform: none;
  }
  }
  @keyframes fadeInUpBig {
  0% {
  opacity: 0;
  -webkit-transform: translate3d(0, 2000px, 0);
  transform: translate3d(0, 2000px, 0);
  }
  100% {
  opacity: 1;
  -webkit-transform: none;
  transform: none;
  }
  } 
</style>