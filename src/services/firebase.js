class Firebase {
  constructor() {
    this.host = 'https://pokemon-game-d7cd7-default-rtdb.firebaseio.com/';
    this.localId = null;
  }

  token = () => localStorage.getItem('idToken');

  setLocalId = (localId) => {
    this.localId = localId;
  }  

  checkLocalId() {
    if(!this.localId) {
      throw new Error ('Local ID doesn\'t exist');
    }
  }

  getPokemons = async () => {
    try {
      this.checkLocalId();
      const res = await fetch(`${this.host}/${this.localId}/pokemons.json?auth=${this.token}`).then(res => res.json());
      return res;
    } catch (e) {
      alert (e)
    }
  }

  addPokemons = async (data, cb) => {
    const res = await fetch(`${this.host}/${this.localId}/pokemons.json?auth=${this.token}`, {
      method: "POST",
      body: JSON.stringify(data)
    }).then(res => res.json());
    console.log(res)
    return res;
  }

}

const FirebaseClass = new Firebase();
export default FirebaseClass;
