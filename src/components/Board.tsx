import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  width:300px;
  padding: 20px 0px;
  padding-top: 20px; 
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
`;

const DroppableArea = styled.div<IDroppableAreaProps>`
  background-color: ${(props) => props.isDraggingOver ? "#d1c4e9" : props.isDraggingFromThis ? "#ede7f6" : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  input {
    width: 90%;
    border: none;
    border-radius: 5px;
    padding: 5px;
    text-align: center;
  }
`;

const DelBtn = styled.button``;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  index:number;
}

interface IDroppableAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IForm {
  toDo: string;
}

function Board({toDos, boardId, index}:IBoardProps) {
  const { register, setValue:setForm, handleSubmit } = useForm<IForm>();
  const setTodos = useSetRecoilState(toDoState);
  const onValid = ({toDo}:IForm) => {
    const newTodo = {
      id:Date.now(),
      text:toDo
    }
    setTodos((allBoards) => {
      return {
        ...allBoards,
        [boardId] : [...allBoards[boardId], newTodo],
      }
    })
    setForm("toDo", "")
  }
  const onDeleteHandler = (boardId:string) => {
    setTodos((allBoards) => {
      const boardList = {...allBoards};
      //object에서 item삭제 delete object[key]
      delete boardList[boardId]
      return boardList;
    })
  }

  return( 
    <Draggable key={boardId} draggableId={boardId} index={index}>
      {(provided) => 
        <Wrapper 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DelBtn onClick={() => onDeleteHandler(boardId)}/>
          <Title>{boardId}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input {...register("toDo", {required:true})} type="text" placeholder={`add task on ${boardId}`} />
          </Form>
          <Droppable droppableId={boardId}>
            {(provided, snapshot)=>
              <DroppableArea 
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                  {toDos.map((toDo, index) => (
                    <DraggableCard key={toDo.id} toDoId={toDo.id} toDoText={toDo.text} index={index} />
                    )
                    )}
                    {provided.placeholder}
              </DroppableArea>
            }
          </Droppable>
        </Wrapper>
      }
    </Draggable>
  )
}

export default Board;