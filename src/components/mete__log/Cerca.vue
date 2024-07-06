<template>
  <div class="cerca__destinazioni container__generale__router">
    <div class="cd__container__interno">
      <div>
        <h1>Cerca destinazione</h1>
      </div>
      <div class="combobox__modify">
        <div>
          <input type="text" v-model="query" @input="fetchPlacePredictions" placeholder="Enter a destination" />
            <div v-if="predictions.length != 0" class="ods__mini__card">
              <div class="destination__for" v-for="prediction in predictions" :key="prediction.formatted"><h3>{{ prediction.formatted }}</h3></div>
            </div>
          
        </div>
      </div>
      <div>
        
      </div>
<!--       <div class="ricerca__suggerimenti">
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
      </div> -->
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
      query: '',
      predictions: [],
        destinazioni: ['Roma', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'],
        selectedDestinazione: null,
      };
    },
  methods: {
    async fetchPlacePredictions() {
      if (this.query.length > 2) {
        const apiKey = 'c1602b8f21be428f83fdd2855f31ff2a';
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(this.query)}&key=${apiKey}&limit=5`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.status.code === 200) {
            this.predictions = data.results;
          } else {
            console.error('Error fetching place predictions:', data.status.message);
            this.predictions = [];
          }
        } catch (error) {
          console.error('Error fetching place predictions:', error);
          this.predictions = [];
        }
      } else {
        this.predictions = [];
      }
      
      console.log(this.predictions)
    }
  }
};
  </script>
  
  <style>

  .destination__for{
    border-bottom: 1px solid var(--vt-c-text-dark-2); 
    border-radius: 1.5rem; 
    padding: 3vh;
    cursor: pointer;
    background-color: 1px solid var(--vt-c-white); 
  }

.ricerca__suggerimenti{
    display: flex;
    flex-direction: row; 
    flex-wrap:wrap; 
    margin-top: 5vh;
}

.ced__container__interno{
  margin-top: 10vh;
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