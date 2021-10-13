import {createSlice} from '@reduxjs/toolkit';
import FirebaseClass from '../services/firebase';
import { selectLocalId } from './user';

export const slice = createSlice({
    name: 'pokemon',
    initialState: {
        isLoading: true,
        data: {},
        error: null,
    },
    reducers: {
        fetchPokemons: state => ({
            ...state,
            isLoading: true,
        }),
        fetchPokemonsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),
        fetchPokemonsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        })
    }
});


export const {fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject} = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.isLoading
export const selectPokemonsData = state => state.pokemons.data;

export const getPokemonsAsync = () => async (dispatch, getState) => {
    const localId = selectLocalId(getState()); //получение localId из стора
    console.log(localId);
    dispatch(fetchPokemons());
    const data = await fetch(`https://pokemon-game-d7cd7-default-rtdb.firebaseio.com/${localId}/pokemons.json`).then(res => res.json());
    console.log(data);
    dispatch(fetchPokemonsResolve(data));
}

export default slice.reducer;