import s from './style.module.css';
import arrow from './assets/arrow.png';
import cn from 'classnames';

const Arrow = ({turn, isFirstMove}) => {
    const text = turn === 1? 'Choose card': 'Click on board to start'
    return (
        <>
        <img className={cn({[s.turn1]: turn === 1}, {[s.turn2]: turn === 2})} src={arrow} alt={"arrow"}/> 
        <h1 className={s.text}>{
            isFirstMove? text: '' 
            }</h1>
        </>
    )
};
export default Arrow