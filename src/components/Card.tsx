import { Draggable } from "@hello-pangea/dnd";
import type { ICard } from "../types";
import { useSetRecoilState } from "recoil";
import { boardsState } from "../atoms";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { IForm } from "./Board";
import styled from "styled-components";

const Wrapper = styled.div<{ $isDragging:boolean }>`
  background: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.cardTextColor};
  border-radius: 8px;
  padding: 10px 12px;
  box-shadow: ${(props) => 
    props.$isDragging 
      ? "0 12px 28px rgba(0, 0, 0, 0.55)"
      : "0 1px 3px rgba(0, 0, 0, 0.25)"
  };
  transform: ${(props) => (props.$isDragging ? "scale(1.02)" : "none")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const Text = styled.span`
  font-size: 14px;
  flex: 1;
`;

const Buttons = styled.div`
  display: flex;
  gap: 4px;
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  background: #f1f3f5;
  color: #495057;
  &:hover {
    background: #e9ecef;
  }
`;

const EditForm = styled.form`
  display: flex;
  gap: 6px;
  width: 100%;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 6px 8px;
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 4px;
  font-size: 14px;
`;

interface ICardProps {
  card: ICard;
  index: number;
  boardName: string;
}

function Card({ card, index, boardName }: ICardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const setBoards = useSetRecoilState(boardsState);
  const { register, handleSubmit } = useForm<IForm>({
    defaultValues: { text: card.text },
  });
  const onDelete = () => {
    setBoards((prev) => ({
      ...prev,
      [boardName]: prev[boardName].filter((c) => c.id !== card.id),
    }));
  };
  const onEdit = (data: IForm) => {
    setBoards((prev) => ({
      ...prev,
      [boardName]: prev[boardName].map((c) =>
        c.id === card.id ? { ...c, text: data.text } : c
      ),
    }));
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <Wrapper
          $isDragging={snapshot.isDragging}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {isEditing ? (
            <EditForm onSubmit={handleSubmit(onEdit)}>
              <EditInput {...register("text", { required: true })} />
              <ActionButton>저장</ActionButton>
            </EditForm>
          ) : (
            <>
              <Text>{card.text}</Text>
              <Buttons>
                <ActionButton onClick={() => setIsEditing(true)}>수정</ActionButton>
                <ActionButton onClick={onDelete}>삭제</ActionButton>
              </Buttons>
            </>
          )}
        </Wrapper>
      )}
    </Draggable>
  );
}

export default Card;