<template>
    <div>
      <h1>Cerca destinazione</h1>
      <div>
        <h3>Destinazioni di interesse</h3>
      </div>
      <div v-for="destinazione in destinazioni" :key="destinazione">
        <h5>{{ destinazione }}</h5>
      </div>
      <v-combobox
        clearable
        label="Combobox"
        v-model="selectedDestinazione"
        :items="destinazioni"
      ></v-combobox>
    </div>
  </template>
  
  <script>
      import DataService from "../../dataservice.ts";
  export default {
    data() {
      return {
        destinazioni: ['le mie palle', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'],
        selectedDestinazione: null,
      };
    },
  };
  </script>
  
  <style>
  h1 {
    color: #2c3e50;
    font-family: Arial, sans-serif;
  }
  h3 {
    color: #34495e;
    font-family: Arial, sans-serif;
  }
  h5 {
    color: #7f8c8d;
    font-family: Arial, sans-serif;
  }
  </style>