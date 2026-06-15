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
