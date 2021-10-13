import { useContext, useState } from 'react/cjs/react.development';
import { useHistory } from 'react-router-dom';
import { pokemonContext } from '../../../../context/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard';
import { FireBaseContext } from '../../../../context/FireBaseContext';
import { selectLocalId } from '../../../../store/user';
import { useSelector } from 'react-redux';

import s from './style.module.css';

const deleteExcessProperties = (obj, properties) => {
    properties.forEach(prop => delete obj[prop]);
}

const FinishPage = () => {
    const firebase = useContext(FireBaseContext);
    const pokemonsContext = useContext(pokemonContext);
    const localId = useSelector(selectLocalId);

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
    const [cardIsntChoosen, setCardIsChoosen] = useState(true); //флаг, что карточка еще не выбрана
    
    const [pokemons2, selectCard] = useState(pokemons2Init); //начальное состояние - массив покемонов врага, обновленное состояние - массив с выбранной карточкой

    const handleClickCard = (index) => {
      if(cardIsntChoosen  && pokemons1.length > pokemons2.length) {   //если карточка не выбрана и игрок победил, то он забирает карточку врага
        deleteExcessProperties(pokemons2[index], ['possession', 'player']) //мне не очень нравится такое решение, но пока другое не придумала
        firebase.addPokemons(pokemons2[index], localId, alert('Вы получили новую карточку!'));

        selectCard(prevState => prevState.map((card, i) => {
            if(i === index) {
                card.selected = true;
            }
            return card;
        })); //обновление массива
       setCardIsChoosen((prevState) => {
        const newState = false;
        return newState;
       })//карточка выбрана  
      }   
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
          onClickCard={() => {handleClickCard(index)}}
          />
          )
          )}
         </div>
        </>
        )
}

export default FinishPage;