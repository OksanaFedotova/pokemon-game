import { useRouteMatch, Route, Switch } from "react-router-dom";
import { useState } from "react";
import { pokemonContext } from '../../context/pokemonContext';

import StartPage from './routes/Start/StartPage.js';
import BoardPage from './routes/Board/BoardPage.js';
import FinishPage from './routes/Finish/FinishPage.js';



const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({});
    const match = useRouteMatch();
 
    const handleSelectedPokemons = (key, pokemon) => {
       setSelectedPokemons(prevState => {
           if (prevState[key]) {
               const copyState = {...prevState};
               delete copyState[key];

               return copyState;
           }
           return {
              ...prevState,
              [key]: pokemon, 
           }
       })
    }
    return (
        <pokemonContext.Provider value={{
            pokemons: selectedPokemons,
            onSelectPokemon: handleSelectedPokemons
        }}>
        <Switch>
            <Route path={`${match.path}/`} exact component={StartPage} />
            <Route path={`${match.path}/board`} component={BoardPage} />
            <Route path={`${match.path}/finish`} component={FinishPage} />
        </Switch>
        </pokemonContext.Provider>
    );
};

export default GamePage;