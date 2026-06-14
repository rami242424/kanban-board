import type { ICard } from "../types";
import Card from "./Card";

interface IBoardProps {
  boardName: string;
  cards: ICard[];
}
function Board({boardName, cards}:IBoardProps){
  return(
    <>
      <h2>{boardName}</h2>
        {cards.map((card) => (
          <Card card={card}/>
        ))}
    </>
  );
}

export default Board;