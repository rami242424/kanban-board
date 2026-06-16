import { useRecoilState } from "recoil";
import { boardsState } from "./atoms";
import Board from "./components/Board";
import { DragDropContext } from "@hello-pangea/dnd";

function App(){
  const [boards, setBoards] = useRecoilState(boardsState);
  const onDragEnd = () => {

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