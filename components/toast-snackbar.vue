<template>
  <v-snackbar v-model="display" :color="statusColor">
    {{ message || 'Unknown Error' }}
    <template #action="{ attrs }">
      <v-btn v-bind="attrs" icon @click="display = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    activator: {
      type: Boolean,
      required: true,
    },
    content: {
      type: Object,
      required: true,
    },
  },
  computed: {
    display: {
      get() {
        return this.activator
      },
      set(value) {
        this.$emit('update:activator', value)
      },
    },
    message() {
      return this.content.message
    },
    statusColor() {
      let color
      switch (this.content.status) {
        case 'SUCCESS': {
          color = 'green'
          break
        }
        case 'WARNING': {
          color = 'orange lighten-1'
          break
        }
        case 'ERROR': {
          color = 'red lighten-2'
          break
        }
        default: {
          color = 'red'
        }
      }
      return color
    },
  },
}
</script>
