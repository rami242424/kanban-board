import { DragDropContext } from "@hello-pangea/dnd";
import Board from "./components/Board";
import { useRecoilState } from "recoil";
import { boardsState } from "./atoms";


function App(){
  const [boards, setBoards] = useRecoilState(boardsState);
  const onDragEnd = () => {
    // 드래그가 끝났을 때 할 일
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