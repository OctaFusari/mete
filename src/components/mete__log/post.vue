<template>
    <div class="post__container container__generale__router">
        <div class="post__principale">
            <h2>{{ this.arrayUtente.username }}</h2>
            <h1 class="h1__big">{{ this.arrayUtente.luogo }}</h1>
            <div v-if="this.arrayImmagini.length != 0" class="container__image__post">
                <v-carousel :show-arrows="false">
                    <v-carousel-item v-for="arrayImmagini, index in this.arrayImmagini" :key="index" :src="arrayImmagini" cover>
                    </v-carousel-item>
                </v-carousel>
            </div>
            <div>
                <h1>{{this.arrayUtente.titolo}}</h1>
                <div  class="ods__mini__card">
                <h2>Periodo</h2>
                <div style="display: flex;">
                    <div  class="ods__mini__card" v-if="this.arrayUtente.inizio != ''">
                        <h2>{{this.arrayUtente.inizio}}</h2>
                    </div>
                    <div  class="ods__mini__card" v-if="this.arrayUtente.fine != ''">
                        <h2>{{this.arrayUtente.fine}}</h2>
                    </div>
                </div>
                </div>
            </div>
            <div  class="ods__mini__card">
                <h2>Descrizione</h2>
                <p>{{ this.arrayUtente.descrizione }}</p>
            </div>
            <div  class="ods__mini__card">
                <h2>Alloggio</h2>
                <h3>{{ this.arrayUtente.alloggio }}</h3>
            </div>
        </div>
        <div>
            <div class="navbar__laterale__post__inside ods__mini__card">
                <div style="display: flex;">
                    <h2>Piace a 100</h2>
                    <svg style="margin-left: 4vw; cursor: pointer" width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.9375 7.15789L21.1331 8.14211C20.3653 9.07263 19.3416 9.48421 18.3178 9.48421C16.4531 9.48421 14.625 8.08842 14.625 5.90526V0C14.625 0 0 7.15789 0 19.6842C0 27.5937 6.54469 34 14.625 34C22.7053 34 29.25 27.5937 29.25 19.6842C29.25 14.3874 26.3067 9.62737 21.9375 7.15789ZM14.625 30.4211C12.6141 30.4211 10.9688 28.8642 10.9688 26.9495C10.9688 26.0368 11.3344 25.1779 12.0291 24.5158L14.625 22.0105L17.2392 24.5158C17.9156 25.1779 18.2812 26.0368 18.2812 26.9495C18.2812 28.8642 16.6359 30.4211 14.625 30.4211ZM21.8644 27.7368C21.9375 27.0926 22.2666 24.3547 19.7986 21.9747L14.625 17L9.45141 21.9747C6.96516 24.3726 7.3125 27.1284 7.38562 27.7368C5.10047 25.7684 3.65625 22.8874 3.65625 19.6842C3.65625 14.0295 7.55016 9.57368 11.0236 6.71053C11.4441 10.2716 14.5519 13.0632 18.3178 13.0632C19.7438 13.0632 21.1331 12.6516 22.3031 11.8821C24.3872 13.9221 25.5938 16.7316 25.5938 19.6842C25.5938 22.8874 24.1495 25.7684 21.8644 27.7368Z" fill="var(--color-text)"/>
                        </svg>

                </div>
                <div>
                    <div class="suggerimenti__account">
                        <h2>Commenti</h2>
                        <ul 
                        v-for="commento in arrayCommenti" :key="commento.id">
                            <li class="ods__mini__card">
                                <section style="margin-bottom: 10px">
                                    <h3>{{ commento.username }}</h3>
                                <a style="margin: 2px 0px 0 30px" v-if="user == commento.utente__id"
                                  @click="DeleteCom(commenti_t, commento.id, commento.post__id)">Elimina
                                </a>
                                </section>
                                <p>{{ commento.contenuto }}</p>
                            </li>
                        </ul>
                    </div>
                        <div>
                          <input v-model="commentotxt" placeholder="Aggiungi commento" label="postForm">
                          <button @click="CreaCommento(this.$route.params.postId), TakeCommenti(this.$route.params.postId)">Posta</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.navbar__laterale__post__inside {
    position: fixed;
}

.suggerimenti__account ul li {
    position: relative;
    width: 14vw;
    list-style: none;
    margin: 5vh 0 5vh 0;
}

.suggerimenti__account ul li section {
    width: max-content;
    position: relative;
    display: block;
    width: 100%;
    display: flex;
    text-decoration: none;
    color: var(--color-text);
}

.post__container {
    display: grid;
    grid-template-columns: 1fr .5fr;
    grid-template-rows: 1fr;
    grid-template-areas: ". .";
}

.container__image__post {
    margin: 4vh 2vh 2vh 0
}
</style>

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
import dataservice from "../../dataservice";
export default {
    data() {
        return {
            commentotxt: "",
            arrayCommenti: [] = [],
            arrayUtenti: [] = [],
            arrayImmagini: [] = [],
            arrayUtente: {},
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

        takeUsers: async function () {
            const querySnapshot = await getDocs(collection(DataService.dbEx(), "utenti"));
            querySnapshot.forEach((doc) => {
                this.arrayUtenti.push({ id: doc.id, ...doc.data() })
            });
        },

        TakeCommenti: async function (post__id) {
            var route__dot = post__id;
            var route__nodot = route__dot.substring(1);
            const querySnapshot = await getDocs(collection(DataService.dbEx(), "Commenti"));
            querySnapshot.forEach((doc) => {
                if (route__nodot == doc.data().post__id) {
                    this.arrayCommenti.push({ id: doc.id, ...doc.data() })
                }
            });
            console.log(this.arrayCommenti)
        },
        CreaCommento: async function (post__id) {
            this.arrayCommenti = []
            var route__dot = post__id;
            var route__nodot = route__dot.substring(1);
            const docRefUt = doc(DataService.dbEx(), "utenti", localStorage.getItem("login"));
            const docSnap = await getDoc(docRefUt);

            if (docSnap.exists()) {
                const docRef = await addDoc(collection(DataService.dbEx(), "Commenti"), {
                    utente__id: localStorage.getItem("login"),
                    username: docSnap.data().username,
                    post__id: route__nodot,
                    contenuto: this.commentotxt,
                })
                this.TakeCommenti(":"+docRef.id)
            } else {
            }

        },
        DeleteCom: function (sezione, id__commento, post__id) {
            this.arrayCommenti = []
            DataService.deleteCommenti(sezione, id__commento)
            this.TakeCommenti(":"+post__id)
        },
    },

    // Lifecycle hooks are called at different stages
    // of a component's lifecycle.
    // This function will be called when the component is mounted.
    mounted() {
        this.takeUsers()
        this.TakeCommenti(this.$route.params.postId)
        DataService.takeDataPost(this.$route.params.postId).then(async response => {
            
            const querySnapshot2 = await getDocs(collection(DataService.dbEx(), "utenti"));
            let user = ""
            querySnapshot2.forEach((doc) => {
                if (response.data().utente__id == doc.id) {
                  user = doc.data().username
                }
              });
            this.arrayUtente = {id:response.id, username: user, ...response.data()}
            this.arrayUtente = JSON.parse(JSON.stringify(this.arrayUtente));
            const storage = getStorage();
            const listRef = ref(storage, 'posts/' + response.data().utente__id + "/" + response.id);

            listAll(listRef)
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        getDownloadURL(ref(storage, itemRef.fullPath))
                            .then((url) => {
                                this.arrayImmagini.push(url)
                            })
                    });
                }).catch((error) => {
                    console.log("errore nel caricamento delle immagini")
                });
        })
    },

    
};
</script>