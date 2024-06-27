<template>
    <div class="container__titoli__esplora">
      <div>
        <h2>Periodo</h2>
        <input type="date">
        <input type="date">
      </div>
      <div>
        <div style="display: flex;
    align-items: center;">
          <h2>Filtri</h2><a style="margin-left: 3vh;">Modifica</a>
        </div>
        <button class="buttonheavy__little">Party</button>
        <button class="buttonheavy__little">Cultura</button>
        <button class="buttonheavy__little">snorkeling</button>
      </div>
    </div>
    <div>
      
    </div>
    <div>
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
      };
    },
    computed: {
    }
  };
  </script>
  
  <style>

  .container__titoli__esplora{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: ". .";
  }
  </style>