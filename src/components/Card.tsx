import { Draggable } from "@hello-pangea/dnd";
import type { ICard } from "../types";

interface ICardProps {
  card: ICard;
  index: number;
}

function Card({card, index}:ICardProps){
  return(
    <Draggable draggableId={String(card.id)} index={index}>
        {(provided) => (
            <div
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                ref={provided.innerRef}
            >
                <div>{card.text}</div>
            </div>
        )}
    </Draggable>
  );
}

export default Card;