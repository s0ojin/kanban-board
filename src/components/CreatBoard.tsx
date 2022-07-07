import { FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";


function CreateBoard() {
  const [input, setInput] = useState("");
  const setTodos = useSetRecoilState(toDoState);
  const onSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTodos((allBoards)=>{
      const boardCopy = {...allBoards};
      //object에 item 추가 object[key] = value
      boardCopy[input] = []
      return boardCopy;
    })
    setInput("")
  }
  const onChange = (event:FormEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value)
  }
  return(
    <form onSubmit={onSubmit}>
      <input value={input} onChange={onChange} placeholder="add board" />
    </form>
  )
}

export default CreateBoard;