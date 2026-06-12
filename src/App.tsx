import { DragDropContext } from "@hello-pangea/dnd";
import Board from "./components/Board";
import type { IBoard } from "./types";

const initialBoards:IBoard = {
  "TO DO": [{ id: 1, text: "영어단어 외우기" }],
  "DOING": [{ id: 2, text: "운동하기" }],
  "DONE": [{ id: 3, text: "밥먹기" }],
};

function App(){
  const onDragEnd = () => {
    // 드래그가 끝났을 때 할 일
  }
  return(
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.keys(initialBoards).map((boardName) => (
      <Board boardName={boardName} cards={initialBoards[boardName]}/>
      ))}
    </DragDropContext>
  );
}

export default App;