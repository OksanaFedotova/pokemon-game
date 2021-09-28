import { useContext, useEffect, useState } from 'react/cjs/react.development';
import { useHistory } from 'react-router-dom';
import { pokemonContext } from '../../../../context/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard';
import s from './style.module.css';
import PlayerBoard from './components/PlayerBoard';

const counterWin = (board, player1, player2) => {
    let player1Count = player1.length;
    let player2Count = player2.length;

    board.forEach(element => {
        if(element.card.possession === 'red') {
            player2Count++;
        }
        if(element.card.possession === 'blue') {
            player1Count++;
        }
    });

    return [player1Count, player2Count];
}

const BoardPage = () => {
    const { pokemons } = useContext(pokemonContext);
    const pokemonsContext = useContext(pokemonContext);

    const [board, setBoard] = useState([]);
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemons).map(item => ({
            ...item,
            possession: 'blue'
        }))
    }); 

    const [player2, setPlayer2] = useState([]); 
    const [choiceCard, setChoiceCard] = useState(null);
    const [steps, setSteps] = useState(0);

    
    const history = useHistory();


    useEffect(() => {
        async function fetchData() {
            const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
            const boardRequest = await boardResponse.json();
            setBoard(boardRequest.data);

            const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
            const player2Request = await player2Response.json();
            setPlayer2(() => {
                return player2Request.data.map(item => ({
                    ...item,
                    possession: 'red',
                }))
            });
        }
        fetchData();
    }, [])

    

    if(Object.keys(pokemons).length === 0) {
        history.replace('/game');
    };
    
  const [turn, setTurn] = useState(1); //выбор очередности

    const handleClickBoardPlate = async (position) => {
      const isDuplicate = board.some(({card}) => {
          return card?.id === choiceCard?.id;
      })
      if (isDuplicate) return;
        if(choiceCard) {
            const params = {
                position,
                card: choiceCard,
                board,
            }
            
            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
            
            const request = await res.json();
            console.log(choiceCard, request);
            if(choiceCard.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id));
               setTurn((prevState) => prevState + 1) //если ходил первый, то очередь второго
            }
            if(choiceCard.player === 2) {
                setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id));
               setTurn((prevState) => prevState - 1) //если ходил второй, то очередь первого
            }
    
            setBoard(request.data);
            setSteps(prevState => {
                const count = prevState + 1;
                return count;
            })
        }
    }
    useEffect(() => {
        if(steps === 9) {
            
            const [count1, count2] = counterWin(board, player1, player2);
            board.forEach((card) => {
                if(card.card.possession === 'blue') {
                    pokemonsContext.addPlayer1Pokemons(card.card);//добаление карт для Finish Board
                } else {
                    pokemonsContext.addPlayer2Pokemons(card.card);
                }
            });
            if (player1.length !== 0) {
                pokemonsContext.addPlayer1Pokemons(...player1);
            } 
            if (player2.length !== 0) {
                pokemonsContext.addPlayer2Pokemons(...player2);
            }
            if(count1 > count2) {
                alert('WIN');
            } else if (count1 < count2) {
                alert('LOSE');
            } else {
                alert('DRAW');
            }
            pokemonsContext.pokemons = {};
            history.replace('/game/finish');
        }
    }, [steps]);


        return (
            <div className={s.root}>
				<div className={s.playerOne}>
                    <PlayerBoard
                    turn={turn} //очередность
                    player={1}
                    cards={player1} 
                    onClickCard={(card) => setChoiceCard(card)}
                    />
				</div>
            <div className={s.board}>
                {
                    board.map((item) => {
                        return (
                            <div 
                                key={item.position}
                                className={s.boardPlate}
                                onClick={() => !item.card && handleClickBoardPlate(item.position)}
                                >
                                {item.card && <PokemonCard {...item.card} isActive minimize/>}
                            </div>
                            )
                        })
                }
            </div>
            <div className={s.playerTwo}>
                <PlayerBoard
                    turn={turn}
                    player={2} 
                    cards={player2}
                    onClickCard={(card) => setChoiceCard(card)}
                />
            </div>
        </div>
    );
};

export default BoardPage;