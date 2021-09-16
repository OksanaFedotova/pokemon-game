import { useHistory } from 'react-router';
import { useState } from 'react/cjs/react.development';
import PokemonCard from '../../components/PokemonCard';
import POKEMONS from '../../components/PokemonCard/pokemons.json';
import cn from 'classnames';

import s from './style.module.css';


const GamePage = () => {
    const history = useHistory();
    const handleClick = () => {
      history.push('/');
  }

  const [pokemons, setActive] = useState(POKEMONS);

  const onClickCard = (id) => {
      setActive(pokemons.map((pokemon) => {
        if (pokemon.id === id) {
            pokemon.active = !pokemon.active
        }
        return pokemon;
      }));
  }

    return (
    <>
    <div className={s.flex}>
         
      {
      POKEMONS.map((pokemon) => <PokemonCard 
      key={pokemon.id} 
      type={pokemon.type} 
      values={pokemon.values} 
      img={pokemon.img} 
      name={pokemon.name} 
      id={pokemon.id}
      isActive ={pokemon.active}
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