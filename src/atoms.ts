import { atom } from "recoil";
import type { IBoard } from "./types";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist();

export const boardsState = atom<IBoard>({
    key: "boardsState",
    default: {
        "TO DO": [
            { id: 1, text: "영어단어 외우기" },
            { id: 2, text: "독서하기" },
            { id: 3, text: "산책하기" },
        ],
        "DOING": [
            { id: 4, text: "운동하기" },
            { id: 5, text: "조깅하기"}
        ],
        "DONE": [{ id: 6, text: "밥먹기" }],
    },
    effects_UNSTABLE: [persistAtom],
});