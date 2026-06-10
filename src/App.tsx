import Card from "./components/Card";
import type { IBoard } from "./types";

const initialBoards: IBoard = {
  "TO DO": [{ id: 1, text: "영어단어 외우기" }],
  "DOING": [{ id: 2, text: "운동하기" }],
  "DONE": [{ id: 3, text: "밥먹기" }],
};


function App(){
  return(
    <div>
      {
        Object.keys(initialBoards).map((boardName) => (
          <div key={boardName}>
            <h2>{boardName}</h2>
            {initialBoards[boardName].map((card) => (
              <Card card={card}/>
            ))}
          </div>
        ))}
    </div>
  );
}

export default App;