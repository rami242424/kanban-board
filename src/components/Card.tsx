import { Draggable } from "@hello-pangea/dnd";
import type { ICard } from "../types";
import { useRecoilState } from "recoil";
import { boardsState } from "../atoms";

interface ICardProps {
  card: ICard;
  index: number;
  boardName: string;
}

function Card({card, index, boardName}:ICardProps){
    const [boards, setBoards] = useRecoilState(boardsState);
    const onDelete = () => {
        setBoards((prev) => ({
            ...prev,
            [boardName] : prev[boardName].filter((c) => c.id !== card.id)
        }))
    }
    return(
    <Draggable draggableId={String(card.id)} index={index}>
        {(provided) => (
            <div
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                ref={provided.innerRef}
            >
                <div>{card.text}<button onClick={onDelete}>삭제</button></div>
            </div>
        )}
    </Draggable>
    );
}

export default Card;