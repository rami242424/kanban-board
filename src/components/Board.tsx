import type { ICard } from "../types";
import Card from "./Card";

interface IBoardprops{
    boardName: string;
    cards: ICard[];
}

function Board({boardName, cards}:IBoardprops){
    return(
        <div>
          <h2>{boardName}</h2>
          {cards.map((card) => (
            <Card key={card.id} card={card}/>
          ))}
        </div>
    );
}

export default Board;