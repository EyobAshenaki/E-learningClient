<template>
<div >
    <br><br><br>
    <v-responsive class="ml-15" max-width="800" >
    <v-banner single-line>Classes
        <template v-slot:actions>
        <v-btn
          text
          color="deep-purple accent-4"
        >
          Add Class
        </v-btn>
        </template>
    </v-banner>

  <v-data-table
    :headers="headers"
    :items="classes"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</v-responsive>
</div>   
</template>
<script>
export default {
    data () {
      return {
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Class Name', value: 'className' },
          { text: 'Year', value: 'year' },
          { text: 'Room', value: 'room' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        classes: [
          {
            id: 1,
            className: 'A',
            year: 4,
            room: 309,
            protein: 4.0,
            iron: '1%',
          },
          {
            id: 2,
            className: 'B',
            year: 4,
            room: 310,
            protein: 4.3,
            iron: '1%',
          },
          {
            id: 'Eclair',
            className: 262,
            year: 16.0,
            room: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            id: 'Cupcake',
            className: 305,
            year: 3.7,
            room: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            id: 'Gingerbread',
            className: 356,
            year: 16.0,
            room: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            id: 'Jelly bean',
            className: 375,
            year: 0.0,
            room: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            id: 'Lollipop',
            className: 392,
            year: 0.2,
            room: 98,
            protein: 0,
            iron: '2%',
          },
          {
            id: 'Honeycomb',
            className: 408,
            year: 3.2,
            room: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            id: 'Donut',
            className: 452,
            year: 25.0,
            room: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            id: 'KitKat',
            className: 518,
            year: 26.0,
            room: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      }
    },
}
</script>