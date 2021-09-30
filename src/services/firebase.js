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

class Firebase {
  constructor() {
    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonSoket = (cb) => {
    this.database.ref('pokemons').on('value', (snapshot) => {
      cb(snapshot.val());
    })
  }

  offPokemonSoket = () => {
    this.database.ref('pokemons').off();
  }
  getPokemonsOnce = async () => {
    return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
  };

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  }
  
  addPokemons = (data, cb) => {
    const newKey = this.database.ref().child('pokemons').push().key;
    this.database.ref('pokemons/' + newKey).set(data).then(() => cb);
  }
}


export default Firebase;
