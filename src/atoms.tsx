import { atom } from "recoil";


interface IToDoState {
  [key: string] : string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDos",
  default: {
    TODO: ["a", "b"],
    DOING: ["c", "d"],
    DONE: ["e", "f"]
  }
})