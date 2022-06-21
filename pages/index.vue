<template>
  <v-row
    justify="center"
    align="center"
    class="landing d-flex justify-center align-center"
  >
    <v-col cols="11" lg="10">
      <v-row align="center" justify="space-around">
        <v-col cols="12" md="5">
          <h2
            class="
              text-md-h2 text-sm-h3
              orange--text
              text--lighten-4
              font-weight-medium
              mb-4
            "
          >
            Welcome To The AASTU
            <span class="text-no-wrap">E-learning</span> Portal
          </h2>
          <p class="text-md-h4 text-sm-h5 orange--text text--lighten-4 mb-2">
            Take the steps necessary to digitalize your learning experience!
          </p>
          <v-btn
            x-large
            color="orange lighten-4"
            :to="{ name: 'login' }"
            class="mt-8"
            elevation="24"
            ><span
              class="
                text-md-h4 text-sm-h5
                mx-sm-2 mx-md-4 mx-lg-4 mx-
                text-capitalize
              "
              >Login</span
            ></v-btn
          >
        </v-col>
        <v-col cols="12" md="6" order="first" order-md="last">
          <img
            src="~@/assets/img/guy-girl-in-library.png"
            width="100%"
            height="100%"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    name: 'IndexPage',
    layout: 'guest',
  }
</script>
<style lang="scss" scoped>
  .landing {
    background-image: linear-gradient(135deg, #0156d2, #d201bf);
    opacity: 0.8;
    width: 100vw;
    height: 100vh;
  }
</style>