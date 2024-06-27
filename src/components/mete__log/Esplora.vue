<template>
    <div>
      <header>
        <h1>Esplora Destinazioni di Viaggio</h1>
      </header>
      <main>
        <!-- Carosello -->
        <v-carousel>
          <v-carousel-item v-for="(item, i) in caroselloImmagini" :key="i">
            <v-img :src="item.src" :alt="item.alt"></v-img>
          </v-carousel-item>
        </v-carousel>
  
        <!-- Sezione Filtri -->
        <section class="filters">
          <v-combobox
            clearable
            label="Filtra per attività"
            v-model="selectedAttivita"
            :items="attivitaOptions"
            multiple
          ></v-combobox>
          <v-date-picker
            v-model="selectedPeriodo"
            label="Seleziona il periodo"
            range
          ></v-date-picker>
        </section>
  
        <!-- Lista di destinazioni -->
        <section>
          <v-list>
            <v-list-item v-for="(destinazione, index) in filteredDestinazioni" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ destinazione.nome }}</v-list-item-title>
                <v-list-item-subtitle>{{ destinazione.descrizione }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-img :src="destinazione.img" :alt="destinazione.nome" class="dest-img"></v-img>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        caroselloImmagini: [
          { src: 'https://example.com/image1.jpg', alt: 'Destinazione 1' },
          { src: 'https://example.com/image2.jpg', alt: 'Destinazione 2' },
          { src: 'https://example.com/image3.jpg', alt: 'Destinazione 3' }
        ],
        attivitaOptions: ['Escursionismo', 'Nuoto', 'Cultura', 'Relax'],
        selectedAttivita: [],
        selectedPeriodo: null,
        destinazioni: [
          { nome: 'Roma', descrizione: 'La città eterna', img: 'https://example.com/rome.jpg', attivita: ['Cultura'] },
          { nome: 'Alpi', descrizione: 'Ideale per escursioni', img: 'https://example.com/alps.jpg', attivita: ['Escursionismo', 'Relax'] },
          { nome: 'Maldives', descrizione: 'Spiagge meravigliose', img: 'https://example.com/maldives.jpg', attivita: ['Nuoto', 'Relax'] }
        ],
      };
    },
    computed: {
      filteredDestinazioni() {
        return this.destinazioni.filter(dest => {
          const matchesAttivita = !this.selectedAttivita.length || this.selectedAttivita.every(att => dest.attivita.includes(att));
          // Aggiungi logica di filtraggio per il periodo se necessario
          return matchesAttivita;
        });
      }
    }
  };
  </script>
  
  <style>
  header {
    text-align: center;
    margin: 20px;
  }
  .filters {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
  }
  .dest-img {
    width: 100px;
    height: 100px;
  }
  main {
    padding: 0 20px;
  }
  </style>