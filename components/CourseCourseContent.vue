<template>
<div>
    <h2>Course Content</h2>
    <v-expansion-panels
      multiple
      style = 'margin: 10px'
    >
    <v-expansion-panel>
        <v-expansion-panel-header>Introduction To Database</v-expansion-panel-header>  
        <v-expansion-panel-content>
            
            Introduction
        </v-expansion-panel-content>         
    </v-expansion-panel>
      <v-expansion-panel
        v-for="(i) in 5"
        :key="i"
      >
        <v-expansion-panel-header>Course {{ i }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          Course {{ i }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-divider></v-divider>
</div>

</template>
<script>
export default {
    
}
</script>


