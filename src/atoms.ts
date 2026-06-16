import { atom } from "recoil";
import type { IBoard } from "./types";

export const boardsState = atom<IBoard>({
    key: "boardsState",
    default: {
        "TO DO": [
            { id: 1, text: "영어단어 외우기" },
            { id: 2, text: "독서하기" },
            { id: 3, text: "산책하기" },
        ],
        "DOING": [{ id: 4, text: "운동하기" }],
        "DONE": [{ id: 5, text: "밥먹기" }],
    },
});

// {
//   draggableId: "1",          // 어떤 카드를 끌었나 (카드 id)
//   source: {                  // 출발지
//     droppableId: "TO DO",    //   어느 보드에서
//     index: 0                 //   몇 번째였나
//   },
//   destination: {             // 도착지 (보드 밖에 놓으면 null)
//     droppableId: "DOING",    //   어느 보드에
//     index: 2                 //   몇 번째에 놓았나
//   },
//   // 이 외에 reason, type, combine 등도 있지만 우리는 안 씀
// }