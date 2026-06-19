import { atom } from "recoil";
import type { IBoard } from "./types";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist();

export const boardsState = atom<IBoard>({
    key: "boardsState",
    default: {
        "TO DO": [],
        "DOING": [],
        "DONE": [],
    },
    effects_UNSTABLE: [persistAtom],
});

