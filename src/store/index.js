import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './pokemon';

export default configureStore({
    reducer: {
        pokemons: pokemonsReducer
    }
})