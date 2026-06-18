import { Droppable } from "@hello-pangea/dnd";
import type { ICard } from "../types";
import Card from "./Card";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { boardsState } from "../atoms";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 280px;
  background: ${(props) => props.theme.boardColor};
  border-radius: 12px;
  padding: 16px;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.boardTextColor};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 14px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  gap: 6px;
  margin-bottom: 14px;
`;

const Input = styled.input`
  flex: 1;
  padding:8px 10px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
`;

const AddButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background: ${(props) => props.theme.accentColor};
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;


interface IBoardProps {
  boardName: string;
  cards: ICard[];
}

export interface IForm {
  text: string;
}

function Board({boardName, cards}:IBoardProps){
  const setBoards = useSetRecoilState(boardsState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    const newCard = {
      id: crypto.randomUUID(),
      text: data.text
    }
    setBoards((prev) => ({
      ...prev,
      [boardName]:[...prev[boardName], newCard]
    }));
    setValue("text","");
  }
  return(
    <Wrapper>
      <Title>{boardName}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input 
          {...register("text", { required: true })}
          placeholder={`${boardName}에 추가`}
        />
        <AddButton>추가</AddButton>
      </Form>
      <Droppable droppableId={boardName}>
        {(provided) => (
          <CardList ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} boardName={boardName}/>
            ))}
            {provided.placeholder}
          </CardList>
        )}

      </Droppable>
    </Wrapper>
  );
}

export default Board;