import { useState } from "react";
import PokemonCard from "../../../../../../components/PokemonCard";
import cn from 'classnames';
import s from "./style.module.css";

const PlayerBoard = ({turn, player, cards, onClickCard}) => {
    const [isSelected, setSelected] = useState(null);

    return (
        <>
             {
                cards.map((item) => (
                    <div className={cn(s.cardBoard, {
                        [s.selected]: isSelected === item.id
                    })} 
                    onClick={() => {
                       if(turn === player) {
                        //проверка очередности
                        console.log(turn, player, isSelected)
                        setSelected(item.id);
                        onClickCard && onClickCard({
                            player,
                            ...item})
                        }
                    }
                    }
                    key={item.id} //пришлось добавить, так как иначе была ошибка.
                    >
                        <PokemonCard 
                            key={item.id} 
                            name={item.name} 
                            img={item.img}
                            id={item.id}
                            type={item.type} 
                            values={item.values}
                            minimize  
                            isActive
                    />
                    </div>
                ))
            }
        </>
    );
};

export default PlayerBoard;
