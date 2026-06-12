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
        <h2>{boardName}</h2>
        {initialBoards[boardName].map((cards) => (
          <div key={cards.id}>{cards.text}</div>
        ))}
      </>
      ))}
    </>
  );
}

export default App;