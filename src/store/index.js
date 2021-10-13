import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './pokemons';
import pokemonsSelectReducer from './pokemonsSelect';
import userReducer from './user';
import playerPokemonsReducer from './playerPokemons';
import enemyPokemonsReducer from './enemyPokemons';

export default configureStore({
    reducer: {
        pokemons: pokemonsReducer,
        pokemonsSelect: pokemonsSelectReducer,
        user: userReducer,
        playerPokemons: playerPokemonsReducer,
        enemyPokemons: enemyPokemonsReducer
    }
})
