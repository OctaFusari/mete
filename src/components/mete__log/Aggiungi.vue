<template>
    <div class="container__generale__router">
        <div class="post__container__interno">
            <div>
                <h2>Nuova destinazione</h2>
            </div>
            <div class="post__sezione__uno">
                <div>
                    <div>
                        <div>
                            <div class="add__before" v-if="this.preview_list.length == 0" for="actual-btn">
                                <label for="actual-btn" style="
                                height: 100%;
                                width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;">
                                    <a style="margin-right: 8px;">Aggiungi immagini</a>
                                    <svg width="31" height="30" viewBox="0 0 31 30" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17.05 7.5H13.95V13.5H7.75V16.5H13.95V22.5H17.05V16.5H23.25V13.5H17.05V7.5ZM15.5 0C6.944 0 0 6.72 0 15C0 23.28 6.944 30 15.5 30C24.056 30 31 23.28 31 15C31 6.72 24.056 0 15.5 0ZM15.5 27C8.6645 27 3.1 21.615 3.1 15C3.1 8.385 8.6645 3 15.5 3C22.3355 3 27.9 8.385 27.9 15C27.9 21.615 22.3355 27 15.5 27Z"
                                            fill="#FF5400" />
                                    </svg>
                                </label>
                                <input hidden type="file" accept="image/*" multiple="multiple" id="actual-btn"
                                    @change="previewImmagini">
                            </div>
                            <div v-if="this.preview_list.length != 0">
                                <v-carousel class="post__img" :show-arrows="false">
                                    <v-carousel-item v-for="item, index in preview_list" :key="index" :src="item" cover>
                                        <svg style="cursor: pointer; margin: 3vw;"
                                            @click="this.preview_list.splice(index, 1);" width="33" height="33"
                                            viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M33 3.32357L29.6764 0L16.5 13.1764L3.32357 0L0 3.32357L13.1764 16.5L0 29.6764L3.32357 33L16.5 19.8236L29.6764 33L33 29.6764L19.8236 16.5L33 3.32357Z"
                                                fill="#FF5400" />
                                        </svg>
                                    </v-carousel-item>
                                </v-carousel>
                                <div class="post__interno__aggiungi" for="actual-btn">
                                    <label for="actual-btn">Aggiungi</label>
                                    <input hidden type="file" accept="image/*" multiple="multiple" id="actual-btn"
                                        @change="previewImmagini">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ods__form">
                    <div class="ods__form__input">
                        <section>
                            <input type="text" v-model="titolo" :rules="rules" placeholder="Titolo" label="postForm"
                                value="">
                        </section>
                        <section>
                            <input type="text" v-model="luogo" :rules="rules" placeholder="Luogo" label="postForm">
                        </section>
                        <section>
                            <input type="text" v-model="alloggio" :rules="rules" placeholder="Dove avete alloggiato"
                                label="postForm">
                        </section>
                    </div>
                    <div class="ods__form__date">
                        <section>
                            <h4>Arrivo</h4>
                            <input type="date" v-model="inizio" :rules="rules" placeholder="Inizio" label="postForm">
                        </section>
                        <section>
                            <h4>Partenza</h4>
                            <input type="date" v-model="fine" :rules="rules" placeholder="Fine" label="postForm">
                        </section>
                    </div>
                    <div class="ods__form__input">
                        <section>
                            <a>Descrizione</a>
                            <textarea v-model="descrizione" :rules="rules" placeholder="Descrizione" label="postForm">
                            </textarea>
                        </section>
                    </div>
                </div>
            </div>
            <div class="ods__form__buttons">
                <div class="button__container">
                    <button class="buttonheavy" type="submit" @click="postFormCheck()">Carica post</button>
                    <!-- <button class="buttonheavy" type="submit" @click="DataService.createPosts(this.titolo, this.luogo, this.alloggio, this.descrizione, this.inizio, this.fine, this.immagini)">Continua</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.post__container__interno {
    margin: 0vw 8vw 0 8vw;
}

.post__img {
    border: 5px solid #D9D9D9 !important;
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
}

.post__sezione__uno {
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-template-rows: 1fr;
    grid-template-areas: ". .";
    margin: 2vw 0 2vw 0;

}

.post__interno__aggiungi {
    width: 100%;
    padding: 2vh;
    border-bottom-left-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
    background-color: #D9D9D9;
}

.post__interno__aggiungi label {
    display: inline-block;
    cursor: pointer;
    width: 100%;
    height: 100%;
    transition-duration: .2s;
}

.post__interno__aggiungi label:hover {
    color: #FF5400;
}

.add__before {
    border-radius: 20px !important;
    border: 5px solid #D9D9D9 !important;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media only screen and (max-width: 1280px) {
    .post__container__interno {
        margin: 0vw 0vw 0 0vw;
    }
}

@media only screen and (max-width: 1000px) {
    .post__sezione__uno {
        display: block;
    }
}
</style>

<script>
import DataService from "./../../dataservice.ts";

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
            preview_list: [],
            image_list: [],
            rules: [
                (value) => {
                    if (value) return true;

                    return "Devi sinserire questi campi";
                },
            ],
        };
    },
    methods: {
        postFormCheck: function () {
            DataService.createPosts(this.titolo, this.luogo, this.descrizione, this.alloggio, this.inizio, this.fine, this.image_list);
        },
        previewImmagini: function (event) {
            var input = event.target;
            var immaginiSelezionate = input.files.length;
            var index = 0;
            if (input.files) {
                while (immaginiSelezionate--) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        this.preview_list.push(e.target.result);
                    };
                    this.image_list.push(input.files[index]);
                    reader.readAsDataURL(input.files[index]);
                    index++;
                }
            }

            return this.preview_list;
        },
    }

}
</script>