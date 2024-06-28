<template>
  <div class="Cerca_e_destinazioni">
    <div class="ced__container__interno">
      <div>
        <h1>Cerca destinazione</h1>
      </div>
      <div class="combobox__modify">
        <v-combobox
        clearable
        label="cerca"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        variant="solo"
        ></v-combobox>
      </div>
    </div>
    
    <div class="ced__container__interno">
      <div>
        <h2>Destinazioni di interesse</h2>
      </div>
      
      <div class="Destinazioni">
        <div v-for="destinazione in destinazioni" :key="destinazione">
        <h3 style="margin: 1vw 0 1vw 0;">{{ destinazione }}</h3>
        </div>
      </div>
    </div>
  </div>
  
  </template>
  
  <script>
      import DataService from "../../dataservice.ts";
  export default {
    data() {
      return {
        destinazioni: ['Roma', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'],
        selectedDestinazione: null,
      };
    },
  };
  </script>
  
  <style>
  .Cerca_e_destinazioni{

    margin: 4vw 4vw 1vw 4vw;
    display: grid;
    grid-template-columns: 1fr .5fr;
    grid-template-rows: 1fr;
    grid-template-areas: ". .";
  } 
  .Destinazioni{
    border-left: 1px solid var(--vt-c-black-soft);
    border-bottom-left-radius: 1.5rem;
    margin-top: 5vh;
    padding: 0vw 3vw 1vw 3vw; 
  }

  .combobox__modify{
    max-width: 70%;
  }

  .ced__container__interno{
    margin: 1vw 4vw 1vw 4vw;
  }
  
  
  </style>