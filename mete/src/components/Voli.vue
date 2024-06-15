<template>
    <div>
      <h1>Flight Search</h1>
      <form @submit.prevent="searchFlights">
        <label for="origin">Origin:</label>
        <input type="text" v-model="origin" id="origin" required />
        
        <label for="destination">Destination:</label>
        <input type="text" v-model="destination" id="destination" required />
        
        <label for="departureDate">Departure Date:</label>
        <input type="date" v-model="departureDate" id="departureDate" required />
        
        <button type="submit">Search</button>
      </form>
      
      <div v-if="flights && flights.length > 0">
        <h2>Flight Results</h2>
        <ul>
          <li v-for="(flight, index) in flights" :key="index">
            Flight from {{ flight.itineraries[0].segments[0].departure.iataCode }} to {{ flight.itineraries[0].segments[0].arrival.iataCode }} - Price: {{ flight.price.total }} {{ flight.price.currency }}
          </li>
        </ul>
      </div>
      <div v-else-if="flights && flights.length === 0">
        <p>No flights found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { searchFlights } from '../dataservice';
  
  export default {
    data() {
      return {
        origin: '',
        destination: '',
        departureDate: '',
        flights: null,
      };
    },
    methods: {
      async searchFlights() {
        try {
          this.flights = await searchFlights(this.origin, this.destination, this.departureDate);
        } catch (error) {
          console.error('Error fetching flight data:', error);
          this.flights = [];
        }
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-top: 10px;
  }
  
  button {
    margin-top: 20px;
  }
  </style>