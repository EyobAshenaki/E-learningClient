<template>
  <v-card>
    <v-card-title><span class="text-body-1">Import Users from Spreadsheet</span></v-card-title>
    <v-card-text>
      <v-container>
        <v-form v-model="valid">
          <v-row>
            <v-col md="8" sm="12">
              <v-file-input v-model="file" show-size :truncate-length="15" accept=".csv,.xlsx" required />
            </v-col>
          </v-row>
            <v-row>
              <v-col cols="4">
                <v-checkbox v-model="useDefaultPassword" label="Default Password" />
              </v-col>
              <v-col v-if="useDefaultPassword" md="8" sm="12">
                <v-text-field
                 v-model="defaultPassword"
                        label="Default Password"
                        :type="passwordVisible ? 'text' : 'password'"
                        append-icon="mdi-eye"
                        prepend-icon="mdi-autorenew"
                        @click:prepend="generatePassword"
                        @click:append="passwordVisible = !passwordVisible"
                ></v-text-field>
              </v-col>
            </v-row>
        </v-form>
      </v-container>
      <v-divider class="my-2"/>
      <v-container>
        <RoleSelectSingle v-model="role" />
      </v-container>
      <v-card-actions>
        <v-btn color="blue darken-1" text :disabled="loading" :loading="loading" @click="importStudents">Import</v-btn>
        <v-spacer />
        <v-btn color="blue darken-1" text :disabled="loading"  @click="$emit('close')">Cancel</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
  import randomString from 'randomstring'
  import RoleSelectSingle from './RoleSelectSingle.vue'
  import { multipleUserCreate } from '~/utils/queries'
  export default {
    components: { RoleSelectSingle },
    data() {
      return {
        valid: false,
        loading: false,
        file: null,
        useDefaultPassword: false,
        defaultPassword: '',
        passwordVisible: false,
        role: '',
      }
    },
    methods: {
      async importStudents() {
        this.loading = true
        const query = multipleUserCreate(this.role, this.defaultPassword)
        const formData = new FormData()
        formData.append('operations', query.operations)
        formData.append('map', query.map)
        formData.append('0', this.file)

        try {
          const { data } = await this.$axios.post('/graphql', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          if (data.errors) {
            this.$toast.error(data.errors[0].message)
          } else {
            this.$toast.success(`${data.data} accounts imported`)
            this.$emit('save')
          }
        } catch (error) {
          if (error.isAxiosError && error.response) {
            this.$toast.error(error.response.data.errors[0].message)
          } else {
            this.$toast.error(error.message)
          }
        } finally {
          this.loading = false
        }
      },
      generatePassword() {
        this.defaultPassword = randomString.generate({
          length: 10,
          capitalization: 'uppercase',
        })
      },
    },
  }
</script>