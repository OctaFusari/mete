<template>
  <div class="container__generale__router ">
    <div>
        <h1>Modifica profilo {{ this.arrayUtenti.username }}</h1>
        <h3>{{this.arrayUtenti.email}}</h3>
        <div class="ods__mini__card" style="margin: 6vh 0 6vh 0;">
            <div>
                <h2>Upload Profile Image</h2>
                <input type="file" @change="onFileChange" />
                <button @click="uploadImage">Upload</button>
                <div v-if="imageUrl">
                <h3>Preview:</h3>
                <img :src="imageUrl" alt="Profile Image" width="100" />
                </div>
            </div>
            <div>
                <v-form @submit.prevent="updateUtente" v-model="valid">
                <v-text-field v-model="this.arrayUtenti.username" :rules="rules" label="username"></v-text-field>
                <v-text-field v-model="this.arrayUtenti.bio" label="bio"></v-text-field>

                <button class="buttonheavy" type="submit" block>Salva modifiche</button>
            </v-form>
            </div>
        </div>
        <button class="buttonlight__little" @click="logOut()">Logout</button>
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
            bio: "",
            email: "",
            idutente: "",
            profile_picture_url: "",
            username: "",
            arrayUtenti: {} = {},
            image: null,
            imageUrl: null,
        };
    },
    methods: {
        takeUsers: async function () {
            console.log(this.$route.params.userId)
            const querySnapshot = await getDocs(collection(DataService.dbEx(), "utenti"));
            querySnapshot.forEach((doc) => {
                var route__dot = this.$route.params.userId;
                var route__nodot = route__dot.substring(1);
                if (doc.id == route__nodot) {
                    this.arrayUtenti = { id: doc.id, ...doc.data() }
                }
            }); 
        },
        updateUtente: function () {
            console.log(this.arrayUtenti.profile_picture_url)
            let user = localStorage.getItem("login")
            setDoc(doc(DataService.dbEx(), "utenti", user), {
                bio: this.arrayUtenti.bio,
                email:this.arrayUtenti.email,
                idutente:this.arrayUtenti.idutente,
                profile_picture_url: this.arrayUtenti.profile_picture_url,
                username:this.arrayUtenti.username,
            });
        },

        logOut: function (){
            dataservice.logout()
            window.location.reload();
        },
        
    onFileChange(e) {
      const file = e.target.files[0];
      this.image = file;
      this.imageUrl = URL.createObjectURL(file);
    },
    async uploadImage() {
      if (!this.image) {
        alert('Please select an image first.');
        return;
      }

      const storageRef = storage.ref();
      const profileImageRef = storageRef.child(`profile_images/${localStorage.getItem("login")}`);

      try {
        await profileImageRef.put(this.image);
        const imageUrl = await profileImageRef.getDownloadURL();
        await             setDoc(doc(DataService.dbEx(), "utenti", user), {
                bio: this.arrayUtenti.bio,
                email:this.arrayUtenti.email,
                idutente:this.arrayUtenti.idutente,
                profile_picture_url: imageUrl,
                username:this.arrayUtenti.username,
            });

        alert('Profile image uploaded successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      }
    },
    },
        mounted() {
            this.takeUsers()
        },

}

</script>