<template>
    <div class="post__container container__generale__router">
        <div class="post__principale">
            <h1>Octavian Fusari</h1>
            <h1 class="h1__big">Corfù, Grecia</h1>
            <div v-if="this.items != 0" class="container__image__post">
                <v-carousel :show-arrows="false">
                    <v-carousel-item v-for="item, index in items" :key="index" :src="item" cover >
                    </v-carousel-item>
                </v-carousel>
            </div>
            <div>
                <h1>Periodo</h1>
                <div style="display: flex;">
                    <div class="ods__mini__card">
                        <h2>12 - 7 - 2024</h2>
                    </div>
                    <div class="ods__mini__card">
                        <h2>18 - 7 - 2024</h2>
                    </div>
                </div>
            </div>
            <div>
                <h1>Descrizione</h1>
                <p></p>
            </div>
            <div>
                <h1>Alloggio</h1>
                <h2></h2>
            </div>
        </div>
        <div>
            <div class="navbar__laterale__post__inside">
                <div>
                    <h1>Piace a 100</h1>
                    <svg style="cursor:pointer" width="39" height="50" viewBox="0 0 39 50" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M29.25 10.5263L28.1775 11.9737C27.1538 13.3421 25.7888 13.9474 24.4238 13.9474C21.9375 13.9474 19.5 11.8947 19.5 8.68421V0C19.5 0 0 10.5263 0 28.9474C0 40.5789 8.72625 50 19.5 50C30.2738 50 39 40.5789 39 28.9474C39 21.1579 35.0756 14.1579 29.25 10.5263ZM19.5 44.7368C16.8187 44.7368 14.625 42.4474 14.625 39.6316C14.625 38.2895 15.1125 37.0263 16.0387 36.0526L19.5 32.3684L22.9856 36.0526C23.8875 37.0263 24.375 38.2895 24.375 39.6316C24.375 42.4474 22.1813 44.7368 19.5 44.7368ZM29.1525 40.7895C29.25 39.8421 29.6887 35.8158 26.3981 32.3158L19.5 25L12.6019 32.3158C9.28688 35.8421 9.75 39.8947 9.8475 40.7895C6.80062 37.8947 4.875 33.6579 4.875 28.9474C4.875 20.6316 10.0669 14.0789 14.6981 9.86842C15.2587 15.1053 19.4025 19.2105 24.4238 19.2105C26.325 19.2105 28.1775 18.6053 29.7375 17.4737C32.5163 20.4737 34.125 24.6053 34.125 28.9474C34.125 33.6579 32.1994 37.8947 29.1525 40.7895Z"
                            fill="#FFFFFF" />
                    </svg>
                </div>
                <div>
                    <div class="suggerimenti__account">
                        <h2>Commenti</h2>
                        <ul>
                            <li>
                                <section style="margin-bottom: 10px">
                                    <div style="margin-right: 10px"></div>
                                    <h3>Adrea Carlo Montin</h3>
                                </section>
                                <p>Bellissimo posto da visitare</p>
                            </li>
                            <li>
                                <section style="margin-bottom: 10px">
                                    <div style="margin-right: 10px"></div>
                                    <h3>Andrea Sartori</h3>
                                </section>
                                <p>Bella soprattutto la piazza principale e la spiaggia di Cazerta</p>
                            </li>
                        </ul>
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

/* .post__principale {
    display: flex;
    justify-content: center;
} */

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

.container__image__post{
    margin: 4vh 2vh 2vh 0
}
</style>

<script>
import DataService from "./../../dataservice.ts";
import { getStorage, ref, uploadBytes,getDownloadURL  } from 'firebase/storage';

const storage = getStorage();

export default {
    
    data() {
        return {
            sezione__post: 0,
            titolo: "",
            luogo: "",
            descrizione: "",
            alloggio: "",
            inizio: "",
            fine: "",
            preview: null,
            image: null,
            items: [],
        };
    },

    mounted(){
        this.Scarica__img()
    },
    methods: {
        async Scarica__img(){
            getDownloadURL(ref(storage, 'images/mountains.jpg'))
            .then((url) => {
                this.items.push(url);
                console.log(url)
            })
            .catch((error) => {
                console.log(error)
            });
        }
    }

}
</script>