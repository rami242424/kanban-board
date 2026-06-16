import { useRecoilState } from "recoil";
import { boardsState } from "./atoms";
import Board from "./components/Board";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";

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
    }
  }

  return(
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.keys(boards).map((boardName) => (
        <Board key={boardName} boardName={boardName} cards={boards[boardName]}/>
      ))}
    </DragDropContext>
  );
}

export default App;