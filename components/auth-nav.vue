<template>
  <AppNav>
    <v-menu offset-y rounded transition="slide-y-transition" nudge-bottom="10">
      <template #activator="{ on, attrs }">
        <div class="avatar-wrapper">
          <span class="user-name text-truncate">{{ name }}</span>
          <!-- Todo: This Button will be changed to an avatar down the line which contains the users photo -->
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </div>
      </template>

      <v-list>
        <LogoutButton />
      </v-list>
    </v-menu>
  </AppNav>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({ name: 'auth/name' }),
    },
  }
</script>
<style lang="scss" scoped>
  .avatar-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    .user-name {
      max-width: 100px;
      display: inline-block;
    }
  }
</style>
