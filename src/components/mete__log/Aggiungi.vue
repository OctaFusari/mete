<template>
    <div class="post__container">
        <div class="post__container__interno">
            <div>
                <h1>Crea nuova destinazione</h1>
            </div>
            <div class="post__sezione__uno">
                <div>
                    <div>
                        <div>
                            <v-carousel class="post__img" :show-arrows="false">
                                <v-carousel-item v-if="this.preview_list.length != 0" v-for="item, index in preview_list" :key="index" :src="item" cover >
                                    <svg style="cursor: pointer; margin: 3vw;" @click="this.preview_list.splice(index, 1);" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M33 3.32357L29.6764 0L16.5 13.1764L3.32357 0L0 3.32357L13.1764 16.5L0 29.6764L3.32357 33L16.5 19.8236L29.6764 33L33 29.6764L19.8236 16.5L33 3.32357Z" fill="#FF5400"/>
                                    </svg>
                                </v-carousel-item>
                            </v-carousel>
                            <div class="post__interno__aggiungi" for="actual-btn">
                                <label for="actual-btn">Aggiungi</label>
                                <input hidden type="file" accept="image/*" multiple="multiple"id="actual-btn" @change="previewImmagini">
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
                        <section>
                            <input type="text" v-model="descrizione" :rules="rules" placeholder="Descrizione"
                                label="postForm">
                        </section>
                    </div>
                    <div class="ods__form__date">
                        <section>
                            <a>Arrivo</a>
                            <input type="date" v-model="inizio" :rules="rules" placeholder="Inizio" label="postForm">
                        </section>
                        <section>
                            <a>Partenza</a>
                            <input type="date" v-model="fine" :rules="rules" placeholder="Fine" label="postForm">
                        </section>
                    </div>
                    <div class="ods__form__input">
                        <section>
                            <a>Descrizione</a>
                            <textarea placeholder="Descrizione">
                            </textarea>
                        </section>
                    </div>
                </div>
            </div>
            <div class="ods__form__buttons">
                <div class="button__container">
                    <button class="buttonlight">Annulla</button>
                    <button class="buttonheavy" type="submit" @click="DataService.createPosts(this.titolo, this.luogo, this.alloggio, this.descrizione, this.inizio, this.fine, this.immagini)">Continua</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

.post__container__interno{
    margin: 0vw 8vw 0 8vw;
}

.post__img{
    border: 5px solid #D9D9D9 !important;
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
}
.post__container {
    margin: 2vw 4vw 2vw 4vw;
}

.post__sezione__uno {
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-template-rows: 1fr;
    grid-template-areas: ". .";
    margin-bottom: 2vw;

}

.post__interno__aggiungi{
    width: 100%;
    padding: 2vh;
    border-bottom-left-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
    background-color: #D9D9D9;
}

.post__interno__aggiungi label{
    display:inline-block;
    cursor: pointer;
    width: 100%;
    height: 100%;
    transition-duration: .2s;
}

.post__interno__aggiungi label:hover{
    color: #FF5400;
}

.ods__form__buttons{
    width: 100%;
    display: flex ;
    align-items: center;
  justify-content: center;
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
            DataService.createPosts(this.titolo, this.luogo, this.descrizione, this.alloggio, this.inizio, this.fine, this.immagini);
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
            /* BUG QUANDO SI CARICA LA FOTO NON SI VEDE FINCHE' NON SCHIACCIA IL BOTTONE */
            console.log(this.preview_list)
            console.log(this.image_list)

            return this.preview_list;
        },
    }

}
</script>