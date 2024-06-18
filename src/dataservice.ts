import axios from 'axios';

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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
} from "firebase/firestore";

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

const searchFlights = async (origin: any, destination: any, departureDate: any) => {
  if (!accessToken) {
    await authenticate();
  }

  const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
    params: {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults: 1,
      max: 5,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.data;
};

/* const utentiRef = collection(db, "utenti"); */

export default { 
  searchFlights,

  registrazione: function (username:any,email:any, password:any) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential:any) => {
      // Signed up 
      const user = userCredential.user;
      return setDoc(doc(db, "utenti", user.uid), {
        idutente: user.uid,
        username:username,
        email:email,
      });
/*       return addDoc(utentiRef, {
        idutente: user.uid,
        nome:nome,
        cognome:cognome,
        email:email,
      }); */
    })
    .catch((error:any) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Account già esistente");
    });
  },

  login:function (email:any, password:any){
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Email o password errate");
      });
  }


};