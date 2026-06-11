import type { IBoard } from "./types";

const initialBoards:IBoard = {
  "TO DO": [{ id: 1, text: "영어단어 외우기" }],
  "DOING": [{ id: 2, text: "운동하기" }],
  "DONE": [{ id: 3, text: "밥먹기" }],
};


function App(){
  return(
    <>
      {Object.keys(initialBoards).map((boardName) => (
        <>
          <h2 key={boardName}>{boardName}</h2>
          {initialBoards[boardName].map((board) => (
            <div key={board.id}>{board.text}</div>
          ))}
        </>
      ))}
    </>
  );
}

export default App;