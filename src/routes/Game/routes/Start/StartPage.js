import { useHistory } from 'react-router';
import { useState, useEffect, useContext } from 'react/cjs/react.development';
import PokemonCard from '../../../../components/PokemonCard';
import POKEMONS from '../../../../components/PokemonCard/pokemons.json';

import cn from 'classnames';


import s from './style.module.css';
import { FireBaseContext } from '../../../../context/FireBaseContext';
import { pokemonContext } from '../../../../context/pokemonContext';


const StartPage = () => {

  const firebase = useContext(FireBaseContext);
  const pokemonsContext = useContext(pokemonContext);

  useEffect(() => {
    firebase.getPokemonSoket((pokemons) => {
      getPokemons(pokemons);
    });
    return () => firebase.offPokemonSoket();
  });

  const [pokemons, setActive] = useState(POKEMONS);

  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };
  const startGame = () => {
    history.push('/game/board')
  }

  const getPokemons = async () => {
    const response = await firebase.getPokemonsOnce();
    setActive(response);
  }; 

  const onClickCard = (key) => {
    const pokemon = {...pokemons[key]};
    pokemonsContext.onSelectPokemon(key, pokemon);
    getPokemons(prevState => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      }
    }))
  }

    return (
    <>
    <button className={s.button} 
      onClick={startGame}
      disabled={Object.keys(pokemonsContext.pokemons).lenght < 5}
    >
      Start Game</button>
    <div className={s.flex}>
      {
      Object.entries(pokemons).map(([key, {name, img, id, type, values, selected}]) => 
      (
      <PokemonCard 
      key={key} 
      name={name} 
      img={img}
      id={id}
      type={type} 
      values={values}  
      isActive={true}
      isSelected={selected}
      onClickCard={() => {
        if (Object.keys(pokemonsContext.pokemons).length < 5 || selected) {
          onClickCard(key);
        }
      }}
      className={s.card}
      />
      )
      )}
     </div>
        <div>
            <button className={cn(s.separator)} onClick={handleClick}>
                Home
            </button>
        </div>
    </>
    )
};

export default StartPage;