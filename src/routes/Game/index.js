import { useRouteMatch, Route, Switch } from "react-router-dom";
import { useState } from "react";
import { pokemonContext } from '../../context/pokemonContext';

import StartPage from './routes/Start/StartPage.js';
import BoardPage from './routes/Board/BoardPage.js';
import FinishPage from './routes/Finish/FinishPage.js';



const GamePage = () => {
    const match = useRouteMatch();

    const [player1Pokemons, setPlayer1Pokemons] = useState([]);
    const [player2Pokemons, setPlayer2Pokemons] = useState([]);
   

    const handlePlayer1Pokemons = (pokemon) => {
        setPlayer1Pokemons((prevState) => {
            prevState.push(pokemon);
            return prevState;
        });
    }

    const handlePlayer2Pokemons = (pokemon) => {
        setPlayer2Pokemons((prevState) => {
            prevState.push(pokemon);
            return prevState;
        });
    }
 
    const [selectedPokemons, setSelectedPokemons] = useState({});
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

    const clearContext = ((context1,context2)  => {
        context1 = [];
        context2 = [];
    });


    return (
        <pokemonContext.Provider value={{
            player1Pokemons: player1Pokemons,
            addPlayer1Pokemons: handlePlayer1Pokemons,

            player2Pokemons: player2Pokemons,
            addPlayer2Pokemons: handlePlayer2Pokemons,

            pokemons: selectedPokemons,
            onSelectPokemon: handleSelectedPokemons,

            clearContext: clearContext


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