import { Draggable } from "@hello-pangea/dnd";
import type { ICard } from "../types";
import { useSetRecoilState } from "recoil";
import { boardsState } from "../atoms";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { IForm } from "./Board";

interface ICardProps {
  card: ICard;
  index: number;
  boardName: string;
}

function Card({card, index, boardName}:ICardProps){
    const [isEditing, setIsEditing] = useState(false);
    const setBoards = useSetRecoilState(boardsState);
    const { register, handleSubmit } = useForm<IForm>({
        defaultValues: { text: card.text },
    });
    const onDelete = () => {
        setBoards((prev) => ({
            ...prev,
            [boardName] : prev[boardName].filter((c) => c.id !== card.id)
        }))
    }
    const onEdit = (data:IForm) => {
        setBoards((prev) => ({
            ...prev,
            [boardName]: prev[boardName].map((c) => 
                c.id === card.id ? {...c, text: data.text} : c
            ),
        }));
        setIsEditing(false);
    }
    return(
    <Draggable draggableId={card.id} index={index}>
        {(provided) => (
            <div
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                ref={provided.innerRef}
            >
                {isEditing ? (
                    <form onSubmit={handleSubmit(onEdit)}>
                        <input {...register("text", { required: true })}/>
                        <button>저장</button>
                    </form>
                ):(
                    <div>
                        {card.text}
                        <button onClick={() => setIsEditing(true)}>수정</button>
                        <button onClick={onDelete}>삭제</button>
                    </div>
                )}
            </div>
        )}
    </Draggable>
    );
}

export default Card;