import { atom } from "recoil";



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
  }
})

export const TrashCanState = atom<Boolean>({
  key: "trash",
  default: false
})