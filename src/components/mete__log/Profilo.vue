<template>
  <div class="container__generale__router profilo__container">
    <div>
      <div class="profilo__upper">
        <div class="profilo__upper__sez__uno" :style="{ backgroundImage: 'url('+this.arrayUtenti.profile_picture_url+')'}">

        </div>
        <div class="profilo__upper__sez__due">
          <div v-if="this.arrayUtenti != {}">
            <h1>{{ this.arrayUtenti.username }}</h1><span style="margin-left: 3vw;color: #FF5400" v-if="user == (':'+user__local)" @click="$router.push({ name: 'modificaProfilo'})">Modifica profilo</span>
            
          </div>
          <div>
            <h3>{{ this.arrayUtenti.bio }}</h3>
          </div>
          <!--           <div style="display: flex;">
            <div class="ods__mini__card"><a><strong>150</strong> seguiti</a></div>
            <div class="ods__mini__card"><a><strong>50</strong> seguaci</a> </div>
          </div> -->
        </div>
      </div>
      <div class="profilo__centro">
        <div class="ods__form__buttons">
          <button @click="this.sezione__centrale = 1, this.takePosts()"
            :class="{ 'buttonlight': this.sezione__centrale == 0, 'buttonheavy': this.sezione__centrale == 1 }">Posti
            visitati</button>
          <button @click="this.sezione__centrale = 0, this.takePosts()"
            :class="{ 'buttonlight': this.sezione__centrale == 1, 'buttonheavy': this.sezione__centrale == 0 }">Posti
            salvati</button>
        </div>
        <div class="container__post__inside" v-if="this.sezione__centrale == 1">
          <v-skeleton-loader v-if="arrayPosts.length == 0" type="list-item-avatar"></v-skeleton-loader>
          <div v-for="file in arrayPosts" :key="file.id">


            <div class="ods__card ods__card__little" @click="$router.push({ path: '/post:' + file.id })"
              :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(201, 201, 201, 0.73)), url(' + file.img + ')' }">
              <div class="ods__card__inside">
                <div class="ods__card__inside__uno">
                  <div>
                    <img>
                    <h4>{{ file.username }}</h4>
                  </div>
                  <h3 style="font-weight: 800;">{{ file.titolo }}</h3>
                  <h3>{{ file.luogo }}</h3>
                </div>
                <div class="ods__card__inside__due">
                  <!--                   <div style="text-align: center; margin-bottom: 3vh;">
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
        <div class="container__post__inside" v-if="this.sezione__centrale == 0">
          <v-skeleton-loader v-if="arrayPosts.length == 0" type="list-item-avatar"></v-skeleton-loader>
          <div v-for="file in arrayPosts" :key="file.id">


            <div class="ods__card ods__card__little" @click="$router.push({ path: '/post:' + file.id })"
              :style="{ backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(201, 201, 201, 0.73)), url(' + file.img + ')' }">
              <div class="ods__card__inside">
                <div class="ods__card__inside__uno">
                  <div>
                    <img>
                    <h4>{{ file.username }}</h4>
                  </div>
                  <h3 style="font-weight: 800;">{{ file.titolo }}</h3>
                  <h3>{{ file.luogo }}</h3>
                </div>
                <div class="ods__card__inside__due">
                  <!--                   <div style="text-align: center; margin-bottom: 3vh;">
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
      </div>
    </div>
    <div class="profilo__lato">

    </div>
  </div>
</template>

<style>
.profilo__upper {
  display: flex;
}

.profilo__upper div {
  margin: 1vw;
}

.profilo__container {
  display: grid;
  grid-template-columns: 1fr .5fr;
  grid-template-rows: 1fr;
  grid-template-areas: ". .";
  margin-top: 3vw;
}

.profilo__upper__sez__uno {
  background-size: cover;
  border: 1px solid var(--color-text);
  width: 100px;
  height: 100px;
  border-radius: 100px;
}

.profilo__upper__sez__due div:first-of-type {
  display: flex;
  align-items: center;
}

.container__post__inside {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: ". . .";
}

@media only screen and (max-width: 600px) {
  .profilo__upper__sez__due div:first-of-type {
    display: block;
    align-items: center;
  }
}

@media only screen and (max-width: 1200px) {
  
  
  .profilo__upper__sez__due span{
    margin-left: 0vw !important;
  }

 
  .profilo__uppersez__due div:first-of-type {
    display: block;
    align-items: center;
  }
  .ods__form__buttons{
    width: 100%;
    display: flex;
  }
  
  .container__post__inside {
    display: grid !important; 
    grid-template-columns: 1fr 1fr !important;
    grid-template-rows: 1fr;
    grid-template-areas:". .";
 }
}


</style>

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
export default {
  data() {
    return {
      sezione__centrale: 1,
      commentotxt: "",
      arrayCommenti: [] = [],
      arrayUtenti: {} = {},
      arrayPosts: [] = [],
      user: this.$route.params.userId,
      user__local: localStorage.getItem("login"),
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

    takeUsers: async function () {
      const querySnapshot = await getDocs(collection(DataService.dbEx(), "utenti"));
      querySnapshot.forEach((doc) => {
        var route__dot = this.$route.params.userId;
        var route__nodot = route__dot.substring(1);
        if(doc.id == route__nodot){
          this.arrayUtenti = { id: doc.id, ...doc.data() }
        }
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
    takePosts: async function () {
      this.arrayPosts = []
      const querySnapshot = await getDocs(collection(DataService.dbEx(), "Posts"));
      const querySnapshot2 = await getDocs(collection(DataService.dbEx(), "utenti"));

      const storage = getStorage();
      querySnapshot.forEach((doccolo) => {

        getDownloadURL(refFire(storage, "posts/" + doccolo.data().utente__id + "/" + doccolo.id + "/immagine0"
        ))
          .then(async (url) => {
            if (url) {
              let usernameUser = ""
              querySnapshot2.forEach((doc) => {
                if (doccolo.data().utente__id == doc.id) {
                  usernameUser = doc.data().username
                }
              })
              var route__dot = this.$route.params.userId;
              var route__nodot = route__dot.substring(1);
              if ((doccolo.data().utente__id == route__nodot) && this.sezione__centrale == 1) {
                this.arrayPosts.push({ id: doccolo.id, username: usernameUser, img: url, ...doccolo.data() });
              }
              else if (this.sezione__centrale == 0) {
                const docRefUt = doc(DataService.dbEx(), 'likes', route__nodot + "_" + doccolo.id);
                const docSnap = await getDoc(docRefUt);

                if (docSnap.exists()) {
                  this.arrayPosts.push({ id: doccolo.id, username: usernameUser, img: url, ...doccolo.data() });
                }
              }


            }
          }).catch((error) => {
            
          });
      });
    },
  },

  mounted() {
    this.takeUsers()
    this.takePosts()
  },


};
</script>