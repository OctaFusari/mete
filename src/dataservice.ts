import axios from 'axios';

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import {
  collection,
  getFirestore,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes  } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBBLjN5pUazHaVxMd71_jJcEdiNvTmHCnA",

  authDomain: "mete-79363.firebaseapp.com",

  projectId: "mete-79363",

  storageBucket: "mete-79363.appspot.com",

  messagingSenderId: "144672915169",

  appId: "1:144672915169:web:130aae5c1f6d97651081a0"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


const clientId = '0YymVenSpYZ0STqcIxP4FbwS4r0qtbGm';  // API KEY (octavian.fusari@unitn.studenti.it)
const clientSecret = 'DTLTJB7ll2tWGVcC';  // API Secret (octavian.fusari@unitn.studenti.it)

let accessToken = '';

const authenticate = async () => {
  const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token',
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    })
  );

  accessToken = response.data.access_token;
};

 const getCityCode = async (cityName:any) => {
  try {
  let cityTradotto = ""
  const tranApi = 'https://libretranslate.com/translate';
      
        let responseTran = await axios.post(tranApi, {
          q: cityName,
          source: 'auto',
          target: 'en',
          format: 'text'
        });
        cityTradotto = responseTran.data.translatedText;
        console.log(responseTran.data.translatedText)

  const endpoint = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${cityTradotto}`;


    const response = await axios.get(endpoint, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    return response.data.data[0].iataCode;
  } catch (error) {
    console.error('Error fetching city code:', error);
    return null;
  }
}

const searchFlights = async (origin: any, destination: any, departureDate: any) => {
  if (!accessToken) {
    await authenticate();
  }
    const fromCode = await getCityCode(origin);
    const toCode = await getCityCode(destination);
    
    

  const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
    params: {
      originLocationCode: fromCode,
      destinationLocationCode: toCode,
      departureDate,
      adults: 1,
      max: 5,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log(response.data.data)

  return response.data.data;
};

export default {
  dbEx: function(){
    return db
  },

  getUserName: function () {
    return localStorage.getItem("login");
  },
  getUserData: async function (user: string) {

      const docRef = doc(db, "utenti", user);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log(docSnap.data().username)
        return docSnap.data().username
      } else {
      }
  },
  logout: function () {
    localStorage.removeItem("login");
  },
  isAuthenticated: function () {
    return Boolean(localStorage.getItem("login"));
  },
  createPosts: async function (titolo: any, luogo: any, descrizione: any, alloggio: any, inizio: any, fine: any, imageFile: any) {

    const storage = getStorage();
    const newCityRef = doc(collection(db, "Posts"));
    console.log(imageFile)
    await setDoc(newCityRef, {
      utente__id: localStorage.getItem("login"),
      titolo: titolo,
      luogo: luogo,
      descrizione: descrizione,
      alloggio: alloggio,
      inizio: inizio,
      fine: fine,
      likes: "",
    }).then(() => {
      for (let i = 0; i < imageFile.length; i++) {
        const mountainImagesRef = ref(storage, 'posts/' + localStorage.getItem("login") + "/" + newCityRef.id + "/immagine" + i);
        uploadBytes(mountainImagesRef, imageFile[i]).then((snapshot: any) => {
        });
      }
      alert("Post caricato");
    });


  },

  searchFlights,

  createCommenti: function (post__id: any, contenuto: any) {

    return setDoc(doc(db, "Commenti"), {
      utente__id: localStorage.getItem("login"),
      post__id: post__id,
      contenuto: contenuto,
    })
  },

  getCommenti: async function(){
    const querySnapshot = await getDocs(collection(db, "Commenti"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

    return querySnapshot
  },

  deleteCommenti: async function(sezione:any, id__commento:any){
    const cityRef = doc(db, sezione, id__commento);
    console.log(sezione, id__commento)
    await updateDoc(cityRef, {
      post__id: deleteField()
    });
  },

  registrazione: function (username: any, email: any, password: any) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        // Signed up 
        const user = userCredential.user;
        return setDoc(doc(db, "utenti", user.uid), {
          idutente: user.uid,
          username: username,
          email: email,
          bio: "",
          profile_picture_url: "",
        });
      })
      .catch((error: any) => {
        alert("Account già esistente");
      });
  },

  login: function (email: any, password: any) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user
        localStorage.setItem("login", user.uid)
        this.isAuthenticated 
        window.location.reload();
      })
      .catch((error) => {
        alert("Email o password errate");
      });
  },

  takeDataPost: async function (route:any){
    var route__dot:string = route;
    var route__nodot:string = route__dot.substring(1);
    const docRef = doc(db, "Posts/" + route__nodot)

    const docSnap = await getDoc(docRef);

    return docSnap
  },

  takePosts: async function (){
    const querySnapshot = await getDocs(collection(db, "Posts"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }

};