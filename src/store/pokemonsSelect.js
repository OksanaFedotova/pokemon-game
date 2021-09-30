import {createSlice} from '@reduxjs/toolkit';


const handleSelectedPokemons = (state, { payload: { key, pokemon } }) => {
    if(state.selectedPokemons[key]) {
        const copyState = {...state.selectedPokemons};
        delete copyState[key];

        return copyState
    }
    return {
        ...state,
       selectedPokemons: {
           ...state.selectedPokemons, 
           [key]: {
               ...pokemon
            }}
    }
}

export const slice2 = createSlice({
    name: 'pokemonsSelected',
    initialState: {
        selectedPokemons: {}
    },
    reducers: {
        getSelectedPokemons: handleSelectedPokemons,
        clean: (state) => ({...state, initialState: {}})
    }
});


export const {getSelectedPokemons, clean} = slice2.actions;

export const selectPokemonsData = state => state.pokemons.selectedPokemons;


export default slice2.reducer;

