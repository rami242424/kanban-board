import { useRecoilState } from "recoil";
import Board from "./components/Board";
import { boardsState } from "./atoms";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";

function App(){
  const [boards, setBoards] = useRecoilState(boardsState);
  const onDragEnd = (info:DropResult) => {
    const {source, destination} = info;
    if(!destination) return;
    const copyBoard = [...boards[source.droppableId]];
    const [card] = copyBoard.splice(source.index, 1);
    copyBoard.splice(destination.index, 0, card);
    setBoards({
      ...boards,
      [source.droppableId]: copyBoard,
    });

  }
  return(
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.keys(boards).map((boardName) => (
        <Board boardName={boardName} cards={boards[boardName]}/>
      ))}
    </DragDropContext>
  );
}

export default App;