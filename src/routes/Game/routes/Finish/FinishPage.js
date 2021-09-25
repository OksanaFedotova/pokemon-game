import { useContext, useEffect, useState } from 'react/cjs/react.development';
import { useHistory } from 'react-router-dom';
import { pokemonContext } from '../../../../context/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard';
import { FireBaseContext } from '../../../../context/FireBaseContext';

import s from './style.module.css';

const FinishPage = () => {
    const firebase = useContext(FireBaseContext);
    const pokemonsContext = useContext(pokemonContext);

    const pokemons1 = pokemonsContext.player1Pokemons; //массив своих покемонов 
    const pokemons2Init = pokemonsContext.player2Pokemons; //массив покемонов врага
    
    //навигация
    const history = useHistory();

    if(pokemons1.length === 0) {
        history.replace('/game'); 
    }

    const startGame = () => {
        pokemonsContext.clearContext([pokemons1, pokemons2]) //сброс контекста
        history.push('/game')
      }

    //выбор карточки врага
    let cardIsSelected = 0; //флаг, что карточка еще не выбрана
    const [pokemons2, selectCard] = useState(pokemons2Init); //начальное состояние - массив покемонов врага, обновленное состояние - массив с выбранной карточкой

    const takeCard = (index) => {
        console.log(index)
        selectCard(prevState => prevState.map((card, i) => {
            if(i === index) {
                card.selected = true;
            }
            return card;
        })); //обновление массива
        cardIsSelected = true; //карточка выбрана;
        firebase.addPokemons(pokemons2[index], console.log('success'))
    }

    return (
        <>
        <div className={s.flex}>
          {
          pokemons1.map(({name, img, id, type, values, selected}) => 
          (
          <PokemonCard 
          className={s.card}
          key={id} 
          name={name} 
          img={img}
          id={id}
          type={type} 
          values={values}  
          isActive={true}
          />
          )
          )}
         </div>
         <button className={s.button}
         onClick={startGame}
        >
          END GAME</button>

          <div className={s.flex}>
          {
          pokemons2.map(({name, img, id, type, values, selected}, index) => 
          (
          <PokemonCard 
          className={s.card}
          key={id} 
          name={name} 
          img={img}
          id={id}
          type={type} 
          values={values}  
          isActive={true}
          isSelected={selected}
          onClickCard={() => {
              if(!cardIsSelected && pokemons1.length > pokemons2.length) { //если карточка не выбрана и игрок победил, то он забирает карточку врага
                takeCard(index)
              }
        }}
          />
          )
          )}
         </div>
        </>
        )
}

export default FinishPage;