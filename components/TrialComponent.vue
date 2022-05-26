<template>
  <v-col cols="11" class="mx-auto">
    <v-container>
      <v-row dense>
        <v-col v-for="(item, i) in items" :key="i" cols="12">
          <NuxtLink
            to="/administrator/_id/department"
            class="text-decoration-none"
          >
            <v-card color="#385F73" dark>
              <v-card-title class="text-h5">
                {{ item.code }}: {{ item.name }}
              </v-card-title>

              <v-card-subtitle>
                Credit Hours: {{ item.creditHour }}
              </v-card-subtitle>
              <v-card-text>
                {{ item.description }}
              </v-card-text>

              <v-card-actions>
                <v-btn text> Enroll Student </v-btn>
                <v-btn text> Assign Class </v-btn>
                <v-spacer></v-spacer>
                <v-btn>Details</v-btn>
              </v-card-actions>
            </v-card>
          </NuxtLink>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        code: 'SWEG',
        name: 'Digital Logic Design',
        creditHour: 2,
        description:
          'Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate consectetur nam repellat, earum accusamus possimquo? Ipsam aliquid praesentium nemo officia beatae, ad dolducimus debitis facere odit? Perspiciatis, officiis!',
      },
      {
        code: 'SWEG',
        name: 'Digital Logic Design',
        creditHour: 2,
        description:
          'Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate consectetur nam repellat, earum accusamus possimquo? Ipsam aliquid praesentium nemo officia beatae, ad dolducimus debitis facere odit? Perspiciatis, officiis!',
      },
      {
        code: 'SWEG',
        name: 'Digital Logic Design',
        creditHour: 2,
        description:
          'Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate consectetur nam repellat, earum accusamus possimquo? Ipsam aliquid praesentium nemo officia beatae, ad dolducimus debitis facere odit? Perspiciatis, officiis!',
      },
    ],
  }),
}
</script>
