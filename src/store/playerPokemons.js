import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'playerPokemons',
    initialState: {
        data: []
    },
    reducers: {
        addPlayerPokemons: (state, action) => {
            console.log(action.payload);
            return { 
                ...state,
                data: state.data.concat(action.payload)
            }
        },
        clearPlayerPokemons: state => ({...state, data: []})
    }
})

export const { addPlayerPokemons, clearPlayerPokemons } = slice.actions;
export const selectPlayerPokemons = state => state.playerPokemons.data;

export default slice.reducer;