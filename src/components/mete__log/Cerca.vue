<template>
  <div class="cerca__destinazioni container__generale__router">
    <div class="cd__container__interno">
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
      <div class="ricerca__suggerimenti">
        <div class="rsi1">
          <h3>Scopri le destinazioni hot del momento</h3>
        </div>
        <div class="rsi2">
          <h3>Esplora le destinazioni vicino a te</h3>
        </div>
        <div class="rsi3">
          <h3>Luoghi incantevoli per le coppie</h3>
        </div>
        <div class="rsi4">
          <h3>Viaggi insieme al tuo gruppo di amici</h3>
        </div>
      </div>
    </div>
    
    <div class="ced__container__interno">
      <div>
        <h2>Destinazioni di interesse</h2>
      </div>
      
      <div class="destinazioni">
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

.ricerca__suggerimenti{
    display: flex;
    flex-direction: row; 
    flex-wrap:wrap; 
    margin-top: 5vh;
}

.rsi1{
  background-image: linear-gradient(to bottom, #ff550000, rgba(201, 201, 201, 0.73)), url("../../assets/immagini__statiche/hotmomento.jpg");
}
.rsi2{
  background-image: linear-gradient(to bottom, #ff550000, rgba(201, 201, 201, 0.73)), url("../../assets/immagini__statiche/vicino.jpg");
}
.rsi3{
  background-image: linear-gradient(to bottom, #ff550000, rgba(201, 201, 201, 0.73)), url("../../assets/immagini__statiche/coppie.jpg");
}
.rsi4{
  background-image: linear-gradient(to bottom, #ff550000, rgba(201, 201, 201, 0.73)), url("../../assets/immagini__statiche/gruupoamici.jpg");
}

.ricerca__suggerimenti div{
  background-size: cover;
  display: flex;
  justify-content: bottom;;
  align-items: end;
  padding:  0vw 6vw 2vw 1vw;
  margin: 1vw;
  width: 18vw;
  height: 26vh;
  border-radius: 1.5rem;
  cursor: pointer;
  transition-duration: .2s;
}

.ricerca__suggerimenti div:hover{
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  
}

.ricerca__suggerimenti h3{
  
  font-weight: 800 !important;
}

  .cerca__destinazioni{
    display: grid;
    grid-template-columns: 1fr .5fr;
    grid-template-rows: 1fr;
    grid-template-areas: ". .";
  }

  .destinazioni{
    border-left: 1px solid var(--vt-c-divider-dark-1);
    border-bottom-left-radius: 1.5rem;
    margin-top: 5vh;
    padding: 0vw 3vw 1vw 3vw; 
  }

  .combobox__modify{
    max-width: 70%;
  }

  .cd__container__interno{
    margin: 1vw 4vw 1vw 4vw;
  }
  
  
  </style>