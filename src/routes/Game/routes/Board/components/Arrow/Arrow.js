import s from './style.module.css';
import arrow from './assets/arrow.png';
import cn from 'classnames';

const Arrow = ({turn, isHidden}) => {
    return (
        <>
        <img className={cn({[s.turn1]: turn === 1}, {[s.turn2]: turn === 2}, {[s.hidden]: isHidden})} src={arrow} alt={"arrow"}/> 
        </>
    )
};
export default Arrow