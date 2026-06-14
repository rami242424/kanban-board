import type { IBoard } from "./types";

const initialBoard:IBoard = {
  "TO DO": [{ id: 1, text: "영어단어 외우기" }],
  "DOING": [{ id: 2, text: "운동하기" }],
  "DONE": [{ id: 3, text: "밥먹기" }],
}

function App(){
  return (
    <>
      {Object.keys(initialBoard).map((boardName) => (
        <>
          <h2>{boardName}</h2>
          {initialBoard[boardName].map((card) => (
            <div key={card.id}>{card.text}</div>
          ))}
        </>
      ))}
    </>
  );
}

export default App;