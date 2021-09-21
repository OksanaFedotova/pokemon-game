import firebase from 'firebase/compat/app';
import "firebase/compat/database"

const firebaseConfig = {
    apiKey: "AIzaSyAFfakVfKBqJlmGqcUJE7ar-UaarQuY4IY",
    authDomain: "pokemon-game-d7cd7.firebaseapp.com",
    databaseURL: "https://pokemon-game-d7cd7-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-d7cd7",
    storageBucket: "pokemon-game-d7cd7.appspot.com",
    messagingSenderId: "418744436137",
    appId: "1:418744436137:web:e78e1330fe6dfc722030b8",
    measurementId: "G-EG2CZBPQSH"
  };

firebase.initializeApp(firebaseConfig);

const database = firebase.database();


export default database;
