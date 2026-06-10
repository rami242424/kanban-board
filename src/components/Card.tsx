import type { ICard } from "../types";
interface ICardProps {
    card: ICard;
}

function Card({card}:ICardProps){
    return(
        <div>{card.text}</div>
    );
}

export default Card;