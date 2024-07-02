<template>
  <div>
    <input type="text" v-model="query" @input="fetchPlacePredictions" placeholder="Enter a destination" />
    <ul>
      <li v-for="prediction in predictions" :key="prediction.formatted">{{ prediction.formatted }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      predictions: []
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

<style scoped>
/* Add your styles here */
</style>