import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './pokemons';
import pokemonsSelectReducer from './pokemonsSelect';
import userReducer from './user';

export default configureStore({
    reducer: {
        pokemons: pokemonsReducer,
        pokemonsSelected: pokemonsSelectReducer,
        user: userReducer
    }
})
