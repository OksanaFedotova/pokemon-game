import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './pokemons';

export default configureStore({
    reducer: {
        pokemons: pokemonsReducer
    }
})