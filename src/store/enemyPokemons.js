import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'enemyPokemons',
    initialState: {
        data: []
    },
    reducers: {
        addEnemyPokemons: (state, action) => ({
            ...state,
            data: state.data.concat(action.payload)
        }),
        clearEnemyPokemons: state => ({...state, data: []})
    }
})

export const { addEnemyPokemons, clearEnemyPokemons } = slice.actions;
export const selectEnemyPokemons = state => state.enemyPokemons.data;

export default slice.reducer;