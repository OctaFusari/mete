<template>
    <div>

        <v-form @submit.prevent="updateUtente" v-model="valid">
                <v-text-field v-model="username" :rules="rules" label="username"></v-text-field>
                <v-text-field v-model="bio" :rules="rules" label="bio"></v-text-field>
                <v-text-field v-model="email" :rules="rules" label="Email"></v-text-field>
                <v-text-field v-model="userName" :rules="rules" label="Username"></v-text-field>
                <v-text-field v-model="email" :rules="rules" label="Email"></v-text-field>

                <v-btn class="mt-2" type="submit" block>Registrati</v-btn>
            </v-form>
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
            bio: "",
            email: "",
            idutente: "",
            profile_picture_url: "",
            username: "",
            arrayUtenti: [] = []
        };
    },
    methods: {
        takeUsers: async function () {
            const querySnapshot = await getDocs(collection(DataService.dbEx(), "utenti"));
            querySnapshot.forEach((doc) => {
                var route__dot = this.$route.params.userId;
                var route__nodot = route__dot.substring(1);
                if (doc.id == route__nodot) {
                    this.arrayUtenti.push({ id: doc.id, ...doc.data() })
                }
            }); 
        },
        updateUtente: function () {
            let user = localStorage.getItem("login")
            setDoc(doc(db, "utenti", user), {
                bio: this.arrayUtenti[0].bio,
                email:this.arrayUtenti[0].email,
                idutente:this.arrayUtenti[0].idutente,
                profile_picture_url: this.arrayUtenti[0].profile_picture_url,
                username:this.arrayUtenti[0].username,
            });

        }
    },
        mounted() {
            this.takeUsers()
        },

}

</script>