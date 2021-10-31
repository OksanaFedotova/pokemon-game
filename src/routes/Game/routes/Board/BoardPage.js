import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react/cjs/react.development';
import { useHistory } from 'react-router-dom';
import { selectPlayer1Data, clear } from '../../../../store/pokemonsSelect';
import { selectPokemonsData } from '../../../../store/pokemons';
import { addPlayerPokemons } from '../../../../store/playerPokemons';
import { addEnemyPokemons } from '../../../../store/enemyPokemons';
import PlayerBoard from './components/PlayerBoard';
import Arrow from './components/Arrow/Arrow';
import PokemonCard from '../../../../components/PokemonCard';
import request from '../../../../services/request';

import s from './style.module.css';



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

const getStartSide = () => {
   return Math.floor(Math.random() * 2 + 1)
   //return 2;
}


let game;

const BoardPage = () => {
    const dispatch = useDispatch();

    const pokemonsSelector = useSelector(selectPokemonsData) //все покемоны игрока
    const pokemons  = useSelector(selectPlayer1Data);  //выбранные покемоны игрока
    const history = useHistory();
    const [turn, setTurn] = useState([]);
    const [board, setBoard] = useState([]);
    const [isHidden, setHidden] = useState(false)
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemons).map(item => ({
                ...item,
                possession: 'blue'
            }))
    }); 
    const [player2, setPlayer2] = useState([]); 
    const [choiceCard, setChoiceCard] = useState(null);
    const [steps, setSteps] = useState(0);

    if(Object.keys(pokemons).length === 0) {
        history.replace('/game');
    };

    //получение карт второго игрока и доски
    useEffect(() => {
        async function fetchData() {
            const boardRequest = await request.getBoard();
            setBoard(boardRequest.data);

            const player2Request = await request.gameStart({
                pokemons: Object.values(pokemonsSelector),
            });

            setPlayer2(() => {
                return player2Request.data.map(item => ({
                    ...item,
                    possession: 'red',
                }))
            });
   
        }
    fetchData();
    }, []);

    useEffect(() => {
        setTurn(getStartSide());
    }, [])
    

    const [serverBoard, setServerBoard] = useState([0,0,0, 0,0,0, 0,0,0]);

  
    //клик на доску
    const handleClickBoardPlate = async (position) => {
        setHidden(() => true);
        //параметры для запроса для получения первого хода от АИ
        let params = {
        currentPlayer: 'p2',
        hands: {
            p1: player1,
            p2: player2
        },
        move: null,
        board: serverBoard,
    }

    //опеределение функции хода АИ
    const getAiMove = () => {
        const idAi = game.move.poke.id; 
            setPlayer2(prevState => prevState.map(item => {
                if(item.id === idAi) {
                    return {
                        ...item,
                        isSelected: true,
                    }
                }
                return item
                }));
        
        if (idAi) {
            setTurn(turn => 1);
            setPlayer2(() => game.hands.p2.pokes.map(item => item.poke));
            setServerBoard(game.board);
            setTimeout(() => setBoard(returnBoard(game.board)), 500);
            setSteps(prevState => {
            const count = prevState + 1;
            return count;
            });
        }}

        //если первый ход АИ
        if (steps === 0 && turn === 2) {
            game = await request.game(params);
            getAiMove();
            
        }

        //проверка на дубликат
        const isDuplicate = board.some(({card}) => {
            return card?.id === choiceCard?.id;
        })
        if (isDuplicate) return; 

        //ход игрока
        if (choiceCard) {
            setTurn(turn => 2);
            setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id));
            setBoard(prevState => prevState.map(item => {
                if (item.position === position) {
                    return {
                        ...item,
                        card: choiceCard,
                    }
                }
                return item;
                }));
            params = {
                ...params,
                currentPlayer: 'p1',
                move: {
                    poke: {
                        ...choiceCard,
                    },
                    position,
                },
            }
            
            game = await request.game(params);
                setBoard(returnBoard(game.oldBoard))
                setSteps(prevState => {
                    const count = prevState + 1;
                    return count;
                });

            if (steps < 8) {
                getAiMove()
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
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
    }, 500)
    }, [steps]);


        return (
            <div className={s.root}>
				<div className={s.playerOne}>
                    <PlayerBoard
                    turn={turn} //очередность
                    player={1}
                    cards={player1}
                    onClickCard={(card) => {
                        setChoiceCard(card)
                    }}/>
				</div>
            <div className={s.board}>
                <Arrow
                turn={turn}
                isHidden={isHidden}
                />
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
                />
            </div>
        </div>
    );
};

export default BoardPage;