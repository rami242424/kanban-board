import type { ICard } from "../types";

interface ICardProps {
    card : ICard;
}
function Card({card}:ICardProps){
    return(
        <div key={card.id}>{card.text}</div>
    );
}

export default Card;