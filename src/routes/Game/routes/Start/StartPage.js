import { useHistory } from 'react-router';
import { useState, useEffect } from 'react/cjs/react.development';
import { useDispatch, useSelector } from 'react-redux';
import {  getPokemonsAsync, selectPokemonsData} from '../../../../store/pokemons';
import { selectPlayer1Data, getSelectedPokemons } from '../../../../store/pokemonsSelect';

import PokemonCard from '../../../../components/PokemonCard';

import cn from 'classnames';

import s from './style.module.css';

const StartPage = () => {

  const pokemonsRedux = useSelector(selectPokemonsData);
  const selectedPokemons = useSelector(selectPlayer1Data);

  const dispatch = useDispatch()
  const history = useHistory();
  const [pokemons, setPokemons] = useState({});


  useEffect(() => {
    dispatch(getPokemonsAsync());
  }, []);

  useEffect(() => {
    setPokemons(pokemonsRedux);
  }, [pokemonsRedux]);

  const  handleChageSelect = (key) => {
    const pokemon = {...pokemons[key]};
    dispatch(getSelectedPokemons({key, pokemon}))
    setPokemons(prevState => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
        }
      }));
  }
 
  
  const handleClick = () => {
    history.push('/');
  };
  const startGame = () => {
    history.push('/game/board');
  };
  const getSize = (obj) => {
     const size = obj? Object.keys(obj).length: 0;
     return size;
  }

    return (
    <>
    <button className={s.button} 
      onClick={startGame}
      disabled={getSize(selectedPokemons) < 5}
    >
      Start Game</button>
    <div className={s.flex}>
      {
      Object.entries(pokemons).map(([key, {name, img, id, type, values, selected}]) => 
      (
      <PokemonCard 
      className={s.card}
      key={key} 
      name={name} 
      img={img}
      id={id}
      type={type} 
      values={values}  
      isActive={true}
      isSelected={selected}
      onClickCard={() => {
        
          if (getSize(selectedPokemons) < 5 || selected) {
            handleChageSelect(key);
          }

        
      }}
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