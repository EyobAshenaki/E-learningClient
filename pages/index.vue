<template>
  <v-row
    justify="center"
    align="center"
    class="d-flex"
    style="
      background-image: linear-gradient(135deg, #0156d2, #d201bf);
      opacity: 0.8;
      position: absolute;
    "
  >
    <v-col cols="12" class="mx-auto">
      <v-row class="mt-4 ml-15">
        <v-col cols="5" class="">
          <p
            class="text-h2 orange--text text--lighten-4"
            style="
              margin-top: 100px;
              font-family: 'Lucida Handwriting', cursive !important;
            "
          >
            Welcome To The AASTU <br />
            E-learning Portal
          </p>
          <p
            class="text-h4 orange--text text--lighten-4"
            style="
              margin-top: 30px;
              margin-bottom: 100px;
              font-family: 'Lucida Handwriting', cursive !important;
            "
          >
            Take the steps necessary to digitalize your learning experience!
          </p>
          <v-btn
            elevation="24"
            x-large
            color="orange lighten-4"
            style="font-family: 'Lucida Handwriting', cursive !important"
            :to="{ name: 'login' }"
            >LOG IN</v-btn
          >
        </v-col>
        <v-col cols="7">
          <img src="~@/assets/img/guy-girl-in-library.png" width="100%" />
        </v-col>
      </v-row>
      <!-- <v-row>
          <v-col cols="6">
            <img src="~@/assets/guy-girl-in-library.png" width="100%" />
          </v-col>
          <v-col cols="6">
            <h1>banana</h1>
          </v-col>
        </v-row> -->
    </v-col>
  </v-row>
</template>
<script>
  export default {
    name: 'IndexPage',
    layout: 'guest',
  }
</script>
