import { Droppable } from "@hello-pangea/dnd";
import type { ICard } from "../types";
import Card from "./Card";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { boardsState } from "../atoms";

interface IBoardProps {
  boardName: string;
  cards: ICard[];
}

interface IForm {
  text: string;
}

function Board({boardName, cards}:IBoardProps){
  const setBoards = useSetRecoilState(boardsState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    const newCard = {
      id: Date.now(),
      text: data.text
    }
    setBoards((prev) => ({
      ...prev,
      [boardName]:[...prev[boardName], newCard]
    }));
    setValue("text","");
  }
  return(
    <div>
      <h2>{boardName}</h2>
      <Droppable droppableId={boardName}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} boardName={boardName}/>
            ))}
            {provided.placeholder}
          </div>
        )}

      </Droppable>
    </div>
  );
}

export default Board;