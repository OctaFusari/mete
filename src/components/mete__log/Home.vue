<template>
  <div class="container__generale__router home__container">
    <div class="feed__container">

      <div v-if="this.filtro__attivo == 0">
        <v-skeleton-loader
          v-if="files.length == 0"
          type="list-item-avatar"
        ></v-skeleton-loader>
        <div v-for="file in files" :key="file.id">
          

          <div class="ods__card ods__card__big" @click="$router.push({ path: '/post:' + file.id })"
            :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(201, 201, 201, 0.73)), url(' + file.img + ')' }">
            <div class="ods__card__inside">
              <div class="ods__card__inside__uno">
                <div>
                  <img>
                  <h3>{{ file.username }}</h3>
                </div>
                <h2>{{ file.titolo }}</h2>
                <h3>{{ file.luogo }}</h3>
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
                      <svg @click="TakeCommenti(file.id)" v-bind="props" width="30" height="32" viewBox="0 0 30 32"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </div>
      </div>

      <div v-if="this.filtro__attivo == 1">
        <v-skeleton-loader
          v-if="files.length == 0"
          type="list-item-avatar"
        ></v-skeleton-loader>
        <div v-for="file in files" :key="file.id">
          <div class="ods__card ods__card__big" 
            v-if="(new Date(file.inizio) > new Date(this.inizio) && new Date(file.fine) < new Date(this.fine))"
            :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(201, 201, 201, 0.73)), url(' + file.img + ')' }">
            <div class="ods__card__inside">
              <div class="ods__card__inside__uno">
                <div>
                  <img>
                  <h3>{{ file.username }}</h3>
                </div>
                <h2>{{ file.titolo }}</h2>
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
                      <svg @click="TakeCommenti(file.id)" v-bind="props" width="30" height="32" viewBox="0 0 30 32"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
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
                          <div class="ods__mini__card"
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
        </div>
      </div>
    </div>
    <div class="navbar__laterale__home">
      <div class="navbar__laterale__home__inside">
        <div class="navbar__laterale__home__inside__buttons">
          <section>
            <h4>Da</h4>
            <input type="date" v-model="inizio" @input="filtroData" :rules="rules" placeholder="Inizio"
              label="postForm">
          </section>
          <section>
            <h4>A</h4>
            <input type="date" v-model="fine" @input="filtroData" :rules="rules" placeholder="Fine" label="postForm">
          </section>
        </div>
        <div class="suggerimenti__account">
          <h2>Suggerimenti per te</h2>

          <ul >
            <li v-for="utente in arrayUtenti" :key="utente.id">
              <a>
                <div></div>
                <h3 @click="$router.push({ path: '/profilo:' + utente.id})">{{utente.username}}</h3><span>Apri</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../../dataservice";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
import dataservice from "../../dataservice";
export default {
  data() {
    return {
      commentotxt: "",
      arrayCommenti: [] = [],
      arrayUtenti: [] = [],
      user: localStorage.getItem("login"),
      commenti_t: "Commenti",
      inizio: new Date,
      fine: new Date,
      filtro__attivo: 0
    };
  },
  methods: {

    async filtroData() {
      this.filtro__attivo = 1
    },

    takeUsers: async function (){
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
  },

  

// Lifecycle hooks are called at different stages
// of a component's lifecycle.
// This function will be called when the component is mounted.
mounted() {
  this.takeUsers()
},


  setup() {

    const files = refVue([]);
    const storage = getStorage();
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(DataService.dbEx(), 'Posts'));
      const querySnapshot2 = await getDocs(collection(DataService.dbEx(), "utenti"));
      let user = "";
      querySnapshot.forEach((doccolo) => {

        /*       var words = doccolo.data().descrizione.split(" ");
              for (let i = 0; i < 30; i++) {
                doccolo.data().descrizione += words[i] + " ";
              }
              doccolo.data().descrizione += "...";
        
              console.log(doccolo.data().descrizione) */

        getDownloadURL(refFire(storage, "posts/" + doccolo.data().utente__id + "/" + doccolo.id + "/immagine0"
        ))
          .then((url) => {
            if (url) {
              querySnapshot2.forEach((doc) => {
                if (doccolo.data().utente__id == doc.id) {
                  user = doc.data().username
                }
              });

              files.value.push({ id: doccolo.id, username: user, img: url, ...doccolo.data() });

            }
          }).catch((error) => {

          });
      });
    };

    onMounted(() => {
      fetchData();
    });

    return {
      files,
    };
  },
};
</script>


<style>
.navbar__laterale__home__inside {
  position: fixed;
}

.feed__container {
  grid-area: feed__container;
  display: block;
  justify-content: center;
}

.suggerimenti__account {
  margin-top: 8vh;
}

.navbar__laterale__home {
  margin-top: 10vh;
  grid-area: navbar__laterale__home;
}

.navbar__laterale__home__inside__buttons {
  display: flex;
}

.home__container {
  display: grid;
  grid-template-columns: 1fr .5fr;
  grid-template-rows: 1fr;
  grid-template-areas: "feed__container navbar__laterale__home";
}

@media only screen and (max-width: 1250px) {
  .home__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      "feed__container navbar__laterale__home";
  }
}

@media only screen and (max-width: 800px) {
  .home__container {
    display: block;
  }

  .navbar__laterale__home__inside {
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #ffffff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    width: 100%;
    padding: 1.5vh 2vh 4vh 2vh
  }

  .navbar__laterale__home {
    margin-top: 0;
  }

  .suggerimenti__account {
    display: none;
  }
}


.suggerimenti__account ul li {
  position: relative;
  width: 100%;
  list-style: none;
  margin: 5vh 0 5vh 0;
}

.suggerimenti__account ul li path {
  transition-duration: .2s;
}

.suggerimenti__account ul li a {
  position: relative;
  display: block;
  width: 100%;
  display: grid;
  grid-template-columns: 40px 200px 20px;
  grid-template-rows: 1fr;
  grid-template-areas: ". . .";
  text-decoration: none;
  color: var(--color-text);
}

.suggerimenti__account div {
  background-color: var(--color-text);
  width: 30px;
  height: 30px;
  border-radius: 30px;
}

.suggerimenti__account ul li a * {
  margin-right: 10px;
}

.suggerimenti__account ul li a span {
  color: #FF5400;
}

.commenti__container {
  padding: 4vh 4vw 4vh 4vw;
}

.commenti__container__inside {
  padding: 2vh 2vh 2vh 2vh;
}
</style>
