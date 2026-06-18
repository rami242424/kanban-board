import { useRecoilState } from "recoil";
import { boardsState } from "./atoms";
import Board from "./components/Board";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 40px 20px;
  background: ${(props) => props.theme.bgColor};
`;
const Boards = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

function App(){
  const [boards, setBoards] = useRecoilState(boardsState);
  const onDragEnd = (info:DropResult) => {
    const {source, destination} = info;
    if(!destination) return;
    if(source.droppableId === destination.droppableId){
      const copyBoard = [...boards[source.droppableId]];
      const [card] = copyBoard.splice(source.index, 1);
      copyBoard.splice(destination.index, 0, card);
      setBoards({
        ...boards,
        [source.droppableId] : copyBoard
      });
    } else {
      const copySourceBoard = [...boards[source.droppableId]];
      const copyDestinationBoard = [...boards[destination.droppableId]];
      const [card] = copySourceBoard.splice(source.index, 1);
      copyDestinationBoard.splice(destination.index, 0, card);
      setBoards({
        ...boards,
        [source.droppableId] : copySourceBoard,
        [destination.droppableId] : copyDestinationBoard
      })
    }
  }

  return(
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(boards).map((boardName) => (
            <Board key={boardName} boardName={boardName} cards={boards[boardName]}/>
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;