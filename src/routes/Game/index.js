import { useHistory } from 'react-router';
import { useState, useEffect } from 'react/cjs/react.development';
import PokemonCard from '../../components/PokemonCard';
import POKEMONS from '../../components/PokemonCard/pokemons.json';

import cn from 'classnames';
import database from '../../services/firebase';

import s from './style.module.css';


const GamePage = () => {
    const history = useHistory();
    const handleClick = () => {
      history.push('/');
  };

  const [pokemons, setActive] = useState(POKEMONS);
  

  useEffect(() => {
    database.ref('pokemons').once('value', (snapshot) => {
      setActive(snapshot.val());
    })
  }, [pokemons]);

  const onClickCard = (id) => {
      setActive(prevState => {
        const prevPokemons = Object.entries(prevState);
        return prevPokemons.reduce((acc, item) => {
          const pokemon = {...item[1]};
          if (pokemon.id === id) {
            pokemon.active = !pokemon.active;
            database.ref('pokemons/' + item[0]).set({
              ...pokemon
            });
          
          };
          acc[item[0]] = pokemon;
          return acc;
        }, {})
    });
  };

  let index = 0;

  const addPokemon = () => {
  const newPokemon = POKEMONS[index];
  newPokemon.id += 1;
  index++;
  const newKey = database.ref().child('pokemons').push().key;
  database.ref('pokemons/' + newKey).set(newPokemon);
  }


    return (
    <>
    <button className={s.button} onClick={addPokemon}>Добавить покемона</button>
    <div className={s.flex}>
      {
      Object.entries(pokemons).map(([key, {name, img, id, type, values, active}]) => 
      <PokemonCard 
      key={key} 
      name={name} 
      img={img}
      id={id}
      type={type} 
      values={values}  
      isActive ={active}
      onClickCard={onClickCard}
      />)
    }
     </div>
        <div>
            <button className={cn(s.separator)} onClick={handleClick}>
                Home
            </button>
        </div>
    </>
    );
};

export default GamePage;