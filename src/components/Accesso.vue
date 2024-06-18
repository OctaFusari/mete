<template>
    <div class="template__outside">
        <div class="template__inside">
            <h1 style="color: white;">
                Accedi
            </h1>
            <h2 style="color: #002026;">
                Inserisci la tua mail e la tua password per scoprire la tua prossima meta di viaggio.
            </h2>
            <h3 style="color: #002026;">
                Non hai un account meta? Registrati</h3>
        </div>
        <div class="template__inside">

            <v-form @submit.prevent="submit" v-model="valid">
                <v-text-field v-model="userName" :rules="rules" label="name"></v-text-field>
                <v-text-field v-model="userSurname" :rules="rules" label="surname"></v-text-field>
                <v-text-field v-model="email" :rules="rules" label="email"></v-text-field>
                <v-text-field v-model="password" :rules="rules" label="Password" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"></v-text-field>
                <v-btn class="mt-2" type="submit" block>Invia</v-btn>
              </v-form>
        </div>
    </div>
</template>
<style>
.template__outside{
    margin-top: 20vh;
    display: grid;
    grid-template-columns:1fr 1fr .5fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: ". template__inside1 . template__inside2 .";
}
.template__inside:first-of-type{
    grid-area: template__inside1;
}

.template__inside:last-of-type{
    grid-area: template__inside2;
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
            userName: "",
            userSurname: "",
            email: "",
            password: "",
            showPassword: false,
            valid: false,
            rules: [
                (value) => {
                    if (value) return true;

                    return "You must enter this field.";
                },
            ],
        };
    },
    methods: {
        submit: function () {
            if (this.valid) {
                DataService.login(this.userName, this.userSurname,this.email, this.password);
            }
        },
    },
};
</script>