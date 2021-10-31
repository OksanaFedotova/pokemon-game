import { useEffect, useState } from 'react/cjs/react.development';
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard';
//import { FireBaseContext } from '../../../../context/FireBaseContext';
import  FirebaseClass  from '../../../../services/firebase2'
import { selectLocalId } from '../../../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlayerPokemons, clearPlayerPokemons } from '../../../../store/playerPokemons';
import { selectEnemyPokemons, clearEnemyPokemons } from '../../../../store/enemyPokemons';


import s from './style.module.css';



const FinishPage = () => {
    const firebase = FirebaseClass; 
   // console.log(firebase)
    const dispatch = useDispatch();
    const localId = useSelector(selectLocalId);

    const pokemons1 = useSelector(selectPlayerPokemons); //массив своих покемонов 
    const pokemonsEnemy = useSelector(selectEnemyPokemons); //массив покемонов врага
    const [pokemons2, setPokemons] = useState([]);
    useEffect(() => {
      setPokemons(pokemonsEnemy);
    }, [pokemonsEnemy]);
    //навигация
    const history = useHistory();

    if(pokemons1.length === 0) {
        history.replace('/game'); 
    }

    const startGame = () => {
        dispatch(clearPlayerPokemons(pokemons1));
        dispatch(clearEnemyPokemons(pokemons2));
        history.push('/game')
      }

    //выбор карточки врага
    const [cardIsntChoosen, setCardIsChoosen] = useState(true); //флаг, что карточка еще не выбрана
   
    const handleClickCard = (index) => {
     if(cardIsntChoosen && pokemons1.length > pokemons2.length) {   //если карточка не выбрана и игрок победил, то он забирает карточку врага
       setPokemons(prevState => {
         const newState = prevState.map((pokemon, i) => {
           if(i === index) {
            pokemon = {
              ...pokemon,
              selected: !pokemon.selected
            }
            delete(pokemon['possession']);
           }
           return pokemon;
         })
         return newState;
       })
       firebase.addPokemons(pokemons2[index], localId, setTimeout(() => {alert("Вы получили новую карточку!")}, 500));
       setCardIsChoosen(prevState => false)//карточка выбрана  
    }   
    }


    return (
        <>
        <div className={s.flex}>
          {
          pokemons1.map(({name, img, id, type, values}) => 
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