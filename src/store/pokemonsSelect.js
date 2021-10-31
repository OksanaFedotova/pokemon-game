import {createSlice} from '@reduxjs/toolkit';


const handleSelectedPokemons = (state, { payload: { key, pokemon } }) => {
    if(state.selectedPokemons[key]) {
        const copyState = {...state,
            selectedPokemons: {
                ...state.selectedPokemons, 
            }
        };
        delete copyState.selectedPokemons[key];

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

export const slice = createSlice({
    name: 'pokemonsSelect',
    initialState: {
        selectedPokemons: {}
    },
    reducers: {
        getSelectedPokemons: handleSelectedPokemons,
        clear: state => ({...state, selectedPokemons: {}})
    }
});


export const {getSelectedPokemons, clear} = slice.actions;

export const selectPlayer1Data = state => state.pokemonsSelect?.selectedPokemons;


export default slice.reducer;

