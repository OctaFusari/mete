<template>
    <div class="home__page">
        <section>
          <div class="home__page__inside">
            <div>
              <h1 class="h1__large" style="color: #002026; margin: 2vw 0vw 2vw 0vw ">Scopri la tua prossima grande avventura con l'ispirazione di una vasta comunity!</h1>
              <RouterLink to="/accesso"><h1 class="h1__large" style="color: #FF5400; margin: 2vw 0vw 2vw 0vw; cursor: pointer;" >Prova ora</h1></RouterLink>
              
            </div>
          </div>
          <div class="home__page__inside">
            <img src="../assets/iPhone15.png" class="img__iphone15">
          </div>
        </section>
      </div>
</template>

<style>
  .home__page{
    margin-left: -250px;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  }

.home__page section {
  display: grid;
  grid-template-columns: 30vw max-content;
  grid-template-rows: 1fr;
}

.home__page__inside {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2vw 5vw 2vw 5vw
}

.img__iphone15 {
  width: 30vh;
}
</style>


<script>
import DataService from "../dataservice.ts";

export default {
    data() {
        return {
            sezione__accesso: 0,
            errore:"",
            username: "",
            email: "",
            password: "",
            showPassword: false,
            valid: false,
            rules: [
                (value) => {
                    if (value) return true;

                    return "Inserisci questo campo";
                },
            ],
        };
    },
    methods: {
        
    },
};
</script>