import { Droppable } from "@hello-pangea/dnd";
import type { ICard } from "../types";
import Card from "./Card";


interface IBoardProps {
  boardName: string;
  cards: ICard[];
}

function Board({boardName, cards}:IBoardProps){
  return(
    <div>
      <h2>{boardName}</h2>
      <Droppable droppableId={boardName}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card) => (
              <Card key={card.id} card={card}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Board;