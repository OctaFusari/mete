<template>
    <div>
    <div class="template__outside template__outside__registrati" v-if="this.sezione__accesso == 0">
        <div class="template__inside">
            <div @click="$router.push({ path: '/' })"  class="back__arrow">
                <svg width="38" height="16" viewBox="0 0 38 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM38 7L1 7V9L38 9V7Z"
                        fill="#FF5400" />
                </svg>
                <a>Torna alla home</a>
            </div>
            <div style="margin: 4vh 0vh 4vh 0vh;">
                <h1 class="h1__big">
                    Registrati
                </h1>
                <h2>
                    Compila il form con i tuoi dati per scoprire la tua prossima meta di viaggio.
                </h2>
            </div>
            <a>Hai un account mete? <a style="color: #FF5400; cursor: pointer;"
                    @click="this.sezione__accesso = 1">Accedi</a></a>
        </div>
        <div class="template__inside">

            <v-form @submit.prevent="submit" v-model="valid">
                <v-text-field v-model="userName" :rules="rules" label="Username"></v-text-field>
                <v-text-field v-model="email" :rules="rules" label="Email"></v-text-field>
                <v-text-field v-model="password" :rules="rules" label="Password"
                    :type="showPassword ? 'text' : 'password'" @click="showPassword = !showPassword"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"></v-text-field>
                <v-btn class="mt-2" type="submit" block>Registrati</v-btn>
            </v-form>
        </div>
    </div>
    <div class="template__outside template__outside__accedi" v-if="this.sezione__accesso != 0">
        <div class="template__inside">
            <div @click="$router.push({ path: '/' })" class="back__arrow">
                <svg width="38" height="16" viewBox="0 0 38 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM38 7L1 7V9L38 9V7Z"
                        fill="#FF5400" />
                </svg>
                <a>Torna alla home</a>
            </div>
            <div style="margin: 4vh 0vh 4vh 0vh;">
                <h1 class="h1__big">
                    Accedi
                </h1>
                <h2>
                    Inserisci la tua mail e la tua password per scoprire la tua prossima meta di viaggio.
                </h2>
            </div>
            <a>
                Non hai un account mete? <a style="color: #FF5400; cursor: pointer;"
                    @click="this.sezione__accesso = 0">Registrati</a></a>
        </div>
        <div class="template__inside">

            <v-form @submit.prevent="submit__accesso" v-model="valid">
                <v-text-field v-model="email" :rules="rules" label="Email"></v-text-field>
                <v-text-field v-model="password" :rules="rules" label="Password"
                    :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"></v-text-field>
                <v-btn class="mt-2" type="submit__accesso" block>Accedi</v-btn>
            </v-form>
            <a class="errors">{{ this.errore }}</a>
        </div>
    </div>
        
    </div>
</template>
<style> 
.template__outside {
    margin-left: -250px;
    margin-top: 26vh;
    display: grid;
    grid-template-columns: 1fr 1fr .5fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: ". template__inside1 . template__inside2 .";
}

.template__inside:first-of-type {
    grid-area: template__inside1;
}

.template__inside:last-of-type {
    grid-area: template__inside2;
    margin-top: 4vh
}

.v-field__input {
    align-items: center;
    color: inherit;
    column-gap: 2px;
    display: flex;
    flex-wrap: wrap;
    letter-spacing: 0.009375em;
    opacity: #ffffff00 !important;
    min-height: max(var(--v-input-control-height, 56px), 1.5rem + var(--v-field-input-padding-top) + var(--v-field-input-padding-bottom));
    min-width: 0;
    padding-inline: var(--v-field-padding-start) var(--v-field-padding-end);
    padding-top: var(--v-field-input-padding-top);
    padding-bottom: var(--v-field-input-padding-bottom);
    position: relative;
    width: 100%;
}
</style>

<script>
import DataService from "../dataservice.ts";

export default {
    data() {
        return {
            sezione__accesso: 0,
            errore: "",
            userName: "",
            email: "",
            password: "",
            showPassword: false,
            valid: false,
            rules: [
                (value) => {
                    if (value) return true;

                    return "Devi sinserire questi campi";
                },
            ],
        };
    },
    methods: {
        submit: function () {
            if (this.valid) {
                DataService.registrazione(this.userName, this.email, this.password);
            }
        },
        submit__accesso: function () {
            if (this.valid) {
                DataService.login(this.email, this.password);
            }
        }

    },
};
</script>