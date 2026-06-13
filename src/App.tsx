import Board from "./components/Board";
import type { IBoard } from "./types";

const initialBoards: IBoard = {
  "TO DO": [{ id: 1, text: "영어단어 외우기" }],
  "DOING": [{ id: 2, text: "운동하기" }],
  "DONE": [{ id: 3, text: "밥먹기" }],
}


function App(){
  return(
    <>
      {Object.keys(initialBoards).map((boardName) => (
        <Board boardName={boardName} cards={initialBoards[boardName]}/>
      ))}
    </>
  );
}

export default App;