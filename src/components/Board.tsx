import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
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

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

interface IDroppableAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

function Board({toDos, boardId}:IBoardProps) {
  return(    
    <Wrapper>
      <Title>{boardId}</Title>      
      <Droppable droppableId={boardId}>
        {(provided, snapshot)=>
          <DroppableArea 
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
              {toDos.map((toDo, index) => (
                <DraggableCard key={toDo} toDo={toDo} index={index} />
                )
              )}
              {provided.placeholder}
          </DroppableArea>
        }
      </Droppable>
    </Wrapper>
  )
}

export default Board;