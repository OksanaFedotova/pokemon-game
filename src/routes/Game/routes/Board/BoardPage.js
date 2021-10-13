import PlayerBoard from './components/PlayerBoard';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react/cjs/react.development';
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard';
import s from './style.module.css';
import { selectPlayer1Data, clear } from '../../../../store/pokemonsSelect';
import { selectPokemonsData } from '../../../../store/pokemons';
import request from '../../../../services/request';
import { addPlayerPokemons } from '../../../../store/playerPokemons';
import { addEnemyPokemons } from '../../../../store/enemyPokemons';


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
};

const returnBoard = (board) => {
    return board.map((item, index) => {
        let card = null;
        if (typeof item === 'object') {
            card = {
                ...item.poke,
                possession: item.holder === 'p1' ? 'blue' : 'red',
            }
        }

        return {
            position: index + 1,
            card,
        }
    })
}

const BoardPage = () => {
    const pokemons  = useSelector(selectPlayer1Data);  //выбранные покемоны игрока
    const dispatch = useDispatch();
    const pokemonsSelector = useSelector(selectPokemonsData) //все покемоны игрока
   // const pokemonsContext = useContext(pokemonContext);

    const [startSide, setStartSide] = useState([]); //выбор, кто начинает
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
            const boardRequest = await request.getBoard();
            console.log(boardRequest.data);
            setBoard(boardRequest.data);

           // const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
            //const player2Request = await player2Response.json();

            const player2Request = await request.gameStart({
                pokemons: Object.values(pokemonsSelector),
            });
            setTimeout(() => {
                setStartSide(1)
            }, 2000);

            console.log(player2Request); 
            
            dispatch((addEnemyPokemons(player2Request.data)))
            
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

  const [serverBoard, setServerBoard] = useState([0,0,0, 0,0,0, 0,0,0])

    const handleClickBoardPlate = async (position) => {
        //проверка на дубликат
        const isDuplicate = board.some(({card}) => {
            return card?.id === choiceCard?.id;
        })
        if (isDuplicate) return; 

        if (typeof choiceCard === 'object') {
            const params = {
                currentPlayer: 'p1',
                hands: {
                    p1: player1,
                    p2: player2
                },
                move: {
                    poke: {
                        ...choiceCard,
                    },
                    position,
                },
                board: serverBoard,
            }
       
        if(choiceCard.player === 1) {
            setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id));
            setTurn((prevState) => prevState + 1) //если ходил первый, то очередь второго
        }
        
        /*
        if(choiceCard.player === 2) {
            setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id));
            setTurn((prevState) => prevState - 1) //если ходил второй, то очередь первого
        }
    */
        setBoard(prevState => prevState.map(item => {
            if (item.position === position) {
                return {
                    ...item,
                    card: choiceCard,
                }
            }
            return item;
        }));

        const game = await request.game(params);
        console.log(game);

        setBoard(returnBoard(game.oldBoard));

        setSteps(prevState => {
            const count = prevState + 1;
            return count;
        });

        if (game.move !== null) {
            const idAi = game.move.poke.id; 

            setTimeout(() => {
                setPlayer2(prevState => prevState.map(item => {
                    if(item.id === idAi) {
                        return {
                            ...item,
                            active: true,
                        }
                    }
                    return item
                }));
            }, 1000)
            setTimeout(() => {
                setPlayer2(() => game.hands.p2.pokes.map(item => item.poke));
                setServerBoard(game.board);
                setBoard(returnBoard(game.board));
                
            setSteps(prevState => {
            const count = prevState + 1;
            return count;
        });
            }, 1500)
            
        }
        }
    }
    
    useEffect(() => {
        if(steps === 9) {
            
            const [count1, count2] = counterWin(board, player1, player2);
            board.forEach((card) => {
                if(card.card.possession === 'blue') {
                    dispatch(addPlayerPokemons(card.card));//добаление карт для Finish Board
                } else {
                    dispatch(addEnemyPokemons(card.card));
                }
            });
            if (player1.length !== 0) {
                dispatch(addPlayerPokemons(...player1));
            } 
            if (player2.length !== 0) {
                dispatch(addEnemyPokemons(...player2));
            }
            if(count1 > count2) {
                alert('WIN');
            } else if (count1 < count2) {
                alert('LOSE');
            } else {
                alert('DRAW');
            }
            dispatch(clear(pokemons));
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