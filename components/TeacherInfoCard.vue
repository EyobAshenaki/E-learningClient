<template>
  <v-card elevation="0">
    <v-card-text>
      <v-row>
        <v-col cols="3" class="d-flex justify-end align-center">
          <v-avatar size="70" color="orange lighten-4">
            <v-icon size="50" color="orange darken-2">mdi-account</v-icon>
          </v-avatar>
        </v-col>

        <v-col cols="9">
          <v-row>
            <v-col class="pa-2 pb-0" cols="12">
              <v-card-title class="pa-0">
                {{ fullName(teacher) }}
              </v-card-title>
            </v-col>
            <!-- Card Body section -->
            <v-col class="py-5" cols="12">
              <v-row>
                <!-- First Section -->
                <v-col cols="12">
                  <v-row>
                    <v-col
                      class="pa-1 d-flex align-center justify-center mr-1"
                      cols="2"
                    >
                      <v-icon size="28" color="orange darken-2">
                        mdi-clipboard-text-outline
                      </v-icon>
                    </v-col>
                    <v-col class="pa-2 d-flex align-center" cols="9">
                      <v-row class="pl-1">
                        <v-col class="pa-0" cols="12">
                          <span class="text-subtitle-1 font-weight-bold">
                            Email
                          </span>
                        </v-col>
                        <v-col class="pa-0 mt-n2 mb-1" cols="12">
                          <span>
                            {{ teacher.email }}
                          </span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>

                <!-- Secondary section -->
                <v-col v-if="teacher.department" class="mt-1" cols="12">
                  <v-row>
                    <v-col
                      class="pa-1 d-flex align-center justify-center mr-1"
                      cols="2"
                    >
                      <v-icon size="28" color="orange darken-2">
                        mdi-timer-outline
                      </v-icon>
                    </v-col>
                    <v-col class="pa-2 d-flex align-center" cols="9">
                      <v-row class="pl-1">
                        <v-col class="pa-0" cols="12">
                          <span class="text-subtitle-1 font-weight-bold">
                            Department
                          </span>
                        </v-col>
                        <v-col class="pa-0 mt-n1 mb-1" cols="12">
                          <span>
                            {{ teacher.department.name }}
                          </span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    teacher: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {}
  },

  methods: {
    fullName(item) {
      return (
        `${item.firstName.substr(0, 1).toUpperCase()}${item.firstName
          .substr(1)
          .toLowerCase()}` +
        ` ${item.middleName.substr(0, 1).toUpperCase()}${item.middleName
          .substr(1)
          .toLowerCase()}` +
        ` ${item.lastName.substr(0, 1).toUpperCase()}${item.lastName
          .substr(1)
          .toLowerCase()}`
      )
    },
  },
}
</script>
