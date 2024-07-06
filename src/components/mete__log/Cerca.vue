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
            <div class="destination__for" v-for="prediction in predictions" :key="prediction.formatted">
              <h3 @click="takePosts(prediction.formatted)">{{ prediction.formatted }}</h3>
            </div>
          </div>
        </div>
        <div class="navbar__laterale__home__inside__buttons">
          <section>
            <input type="date" v-model="inizio" @input="filtroData" :rules="rules" placeholder="Inizio"
              label="postForm">
          </section>
          <section>
            <input type="date" v-model="fine" @input="filtroData" :rules="rules" placeholder="Fine" label="postForm">
          </section>
        </div>
      </div>
      <div>
        <div class="ods__mini__card">
          <div>
            <h1>{{this.destinationQuery}}</h1>
          </div>
          
          <v-sheet class="mx-auto">
            <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
              <v-slide-group-item v-for="file in arrayPosts" :key="file.id"
                v-slot="{ isSelected, toggle, selectedClass }">



                <div class="ods__card ods__card__little" @click="$router.push({ path: '/post:' + file.id })"
                  :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(201, 201, 201, 0.73)), url(' + file.img + ')' }">
                  <div class="ods__card__inside">
                    <div class="ods__card__inside__uno">
                      <div>
                        <img>
                        <h4>{{ file.username }}</h4>
                      </div>
                      <h3>{{ file.titolo }}</h3>
                      <h43>{{ file.luogo }}</h43>
                    </div>
                    <div class="ods__card__inside__due">
      <!--                 <div style="text-align: center; margin-bottom: 3vh;">
                        <div>
                          <svg style="cursor: pointer;" width="30" height="34" viewBox="0 0 30 34" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M21.9375 7.15789L21.1331 8.14211C20.3653 9.07263 19.3416 9.48421 18.3178 9.48421C16.4531 9.48421 14.625 8.08842 14.625 5.90526V0C14.625 0 0 7.15789 0 19.6842C0 27.5937 6.54469 34 14.625 34C22.7053 34 29.25 27.5937 29.25 19.6842C29.25 14.3874 26.3067 9.62737 21.9375 7.15789ZM14.625 30.4211C12.6141 30.4211 10.9688 28.8642 10.9688 26.9495C10.9688 26.0368 11.3344 25.1779 12.0291 24.5158L14.625 22.0105L17.2392 24.5158C17.9156 25.1779 18.2812 26.0368 18.2812 26.9495C18.2812 28.8642 16.6359 30.4211 14.625 30.4211ZM21.8644 27.7368C21.9375 27.0926 22.2666 24.3547 19.7986 21.9747L14.625 17L9.45141 21.9747C6.96516 24.3726 7.3125 27.1284 7.38562 27.7368C5.10047 25.7684 3.65625 22.8874 3.65625 19.6842C3.65625 14.0295 7.55016 9.57368 11.0236 6.71053C11.4441 10.2716 14.5519 13.0632 18.3178 13.0632C19.7438 13.0632 21.1331 12.6516 22.3031 11.8821C24.3872 13.9221 25.5938 16.7316 25.5938 19.6842C25.5938 22.8874 24.1495 25.7684 21.8644 27.7368Z"
                              fill="white" />
                          </svg>
                        </div>
                      </div> -->
                      <div style="text-align: center;">
                        <v-bottom-sheet>
                          <template v-slot:activator="{ props }" style="cursor: pointer;">
                            <svg @click="TakeCommenti(file.id)" v-bind="props" width="30" height="32"
                              viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M14.625 0C6.56741 0 0 6.06223 0 13.5C0 20.9378 6.56741 27 14.625 27V31.6377L17.126 30.1582C20.7592 28.0072 27.3846 23.363 28.9231 16.3242C29.1337 15.4163 29.25 14.4716 29.25 13.5C29.25 6.06223 22.6826 0 14.625 0ZM14.625 3C20.9259 3 26 7.68377 26 13.5C26 14.2563 25.91 14.9931 25.7429 15.709L25.7397 15.7207L25.7366 15.7295C24.7711 20.1516 21.0789 23.4078 17.875 25.708V23.6982L16.0469 23.9092C15.5578 23.9656 15.0864 24 14.625 24C8.32409 24 3.25 19.3162 3.25 13.5C3.25 7.68377 8.32409 3 14.625 3Z"
                                fill="#FF5400" />
                            </svg>

                          </template>

                          <v-card>
                            <div class="commenti__container">
                              <div>
                                <h2>Commenti</h2>
                              </div>
                              <div class="commenti__container__inside">
                                <div class="ods__mini__card" v-if="this.arrayCommenti.length != 0"
                                  v-for="commento in arrayCommenti" :key="commento.id">
                                  <div>
                                    <h4 v-if="user == commento.utente__id"
                                      @click="DeleteCom(commenti_t, commento.id, commento.post__id)">Elimina
                                    </h4>
                                    <h3>{{ commento.username }}</h3>
                                  </div>
                                  <div>
                                    <p>{{ commento.contenuto }}</p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <input v-model="commentotxt" placeholder="Aggiungi commento" label="postForm">
                                <button @click="CreaCommento(file.id)">Posta</button>
                              </div>
                            </div>
                          </v-card>
                        </v-bottom-sheet>
                      </div>
                    </div>
                  </div>
                </div>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </div>
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
  </div>

</template>

<script>
import DataService from "../../dataservice";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { ref as refFire } from 'firebase/storage';
import { onMounted } from 'vue';
import { ref as refVue } from 'vue';
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  and,
  writeBatch,
  setDoc,
  getDoc,
} from "firebase/firestore";
export default {
  data() {
    return {
      query: '',
      destinationQuery: "",
      predictions: [],
      selectedDestinazione: null,
      commentotxt: "",
      arrayCommenti: [] = [],
      arrayPosts: [] = [],
      arrayUtenti: [] = [],
      user: localStorage.getItem("login"),
      commenti_t: "Commenti",
      inizio: new Date,
      fine: new Date,
      filtro__attivo: 0
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
            this.predictions = [];
          }
        } catch (error) {
          this.predictions = [];
        }
      } else {
        this.predictions = [];
      }
    },


    async filtroData() {
      this.filtro__attivo = 1
    },

    takeUsers: async function () {
      const querySnapshot = await getDocs(collection(DataService.dbEx(), "utenti"));
      querySnapshot.forEach((doc) => {
        this.arrayUtenti.push({ id: doc.id, ...doc.data() })
      });
    },

    TakeCommenti: async function (post__id) {
      this.arrayCommenti = []
      const querySnapshot = await getDocs(collection(DataService.dbEx(), "Commenti"));
      querySnapshot.forEach((doc) => {
        if (post__id == doc.data().post__id) {
          this.arrayCommenti.push({ id: doc.id, ...doc.data() })
        }
      });
      console.log(post__id)
    },
    CreaCommento: async function (post__id) {

      const docRefUt = doc(DataService.dbEx(), "utenti", localStorage.getItem("login"));
      const docSnap = await getDoc(docRefUt);

      if (docSnap.exists()) {
        const docRef = await addDoc(collection(DataService.dbEx(), "Commenti"), {
          utente__id: localStorage.getItem("login"),
          username: docSnap.data().username,
          post__id: post__id,
          contenuto: this.commentotxt,
        })
        this.TakeCommenti(docRef.id)
      } else {
      }

    },
    DeleteCom: function (sezione, id__commento, post__id) {
      DataService.deleteCommenti(sezione, id__commento)
      this.TakeCommenti(post__id)
    },
    takePosts: async function (destinazione) {
      this.arrayPosts = []
      const querySnapshot = await getDocs(collection(DataService.dbEx(), "Posts"));
      const querySnapshot2 = await getDocs(collection(DataService.dbEx(), "utenti"));
      let dataAPI = []
      const storage = getStorage();
      querySnapshot.forEach(async (doccolo) => {
        if (destinazione) {

          const apiKey = 'c1602b8f21be428f83fdd2855f31ff2a';
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(doccolo.data().luogo)}&key=${apiKey}&limit=5`;

          try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status.code === 200) {
              dataAPI = data.results;
              if (dataAPI[0].formatted == destinazione) {
                getDownloadURL(refFire(storage, "posts/" + doccolo.data().utente__id + "/" + doccolo.id + "/immagine0"
                ))
                  .then((url) => {
                    if (url) {
                      let usernameUser = ""
                      querySnapshot2.forEach((doc) => {
                        if (doccolo.data().utente__id == doc.id) {
                          usernameUser = doc.data().username
                        }
                      })
                        
                      this.arrayPosts.push({ id: doccolo.id, username: usernameUser, img: url, ...doccolo.data() });
                      this.destinationQuery = destinazione
                    }
                  }).catch((error) => {

                  });
              }
            } else {
              dataAPI = [];
            }
          } catch (error) {
            dataAPI = [];
          }
        } else {
          dataAPI = [];
        }
      });
    }
  },
  mounted() {
    this.takeUsers()
    this.takePosts()
  },

};
</script>

<style>
.destination__for {
  border-bottom: 1px solid var(--vt-c-text-dark-2);
  border-radius: 1.5rem;
  padding: 3vh;
  cursor: pointer;
  background-color: 1px solid var(--vt-c-white);
}

.ricerca__suggerimenti {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 5vh;
}

.ced__container__interno {
  margin-top: 10vh;
}

.rsi1 {
  background-image: linear-gradient(to bottom, #ff550000, rgba(201, 201, 201, 0.73)), url("../../assets/immagini__statiche/hotmomento.jpg");
}

.rsi2 {
  background-image: linear-gradient(to bottom, #ff550000, rgba(201, 201, 201, 0.73)), url("../../assets/immagini__statiche/vicino.jpg");
}

.rsi3 {
  background-image: linear-gradient(to bottom, #ff550000, rgba(201, 201, 201, 0.73)), url("../../assets/immagini__statiche/coppie.jpg");
}

.rsi4 {
  background-image: linear-gradient(to bottom, #ff550000, rgba(201, 201, 201, 0.73)), url("../../assets/immagini__statiche/gruupoamici.jpg");
}

.ricerca__suggerimenti div {
  background-size: cover;
  display: flex;
  justify-content: bottom;
  ;
  align-items: end;
  padding: 0vw 6vw 2vw 1vw;
  margin: 1vw;
  width: 18vw;
  height: 26vh;
  border-radius: 1.5rem;
  cursor: pointer;
  transition-duration: .2s;
}

.ricerca__suggerimenti div:hover {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

}

.ricerca__suggerimenti h3 {

  font-weight: 800 !important;
}

.cerca__destinazioni {
  display: grid;
  grid-template-columns: 1fr .5fr;
  grid-template-rows: 1fr;
  grid-template-areas: ". .";
}

.destinazioni {
  border-left: 1px solid var(--vt-c-divider-dark-1);
  border-bottom-left-radius: 1.5rem;
  margin-top: 5vh;
  padding: 0vw 3vw 1vw 3vw;
}

.combobox__modify {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: ". .";
}
</style>