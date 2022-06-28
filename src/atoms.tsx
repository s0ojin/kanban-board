import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string] : ITodo[];
}
export const toDoState = atom<IToDoState>({
  key: "toDos",
  default: {
    TODO: [],
    DOING: [],
    DONE: []
  },
  effects_UNSTABLE: [persistAtom]
})
